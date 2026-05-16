(function(){
  'use strict';
  var STORAGE='cybershield.v5.6.payload';
  var state={step:0,payload:null,report:'executive'};
  var $=function(id){return document.getElementById(id)};
  var routes=['overview','assessment','executive','dashboard','actions','reports','botBrief'];
  var reports={
    executive:['Executive Risk Summary','Board-ready decision brief with posture, exposure range, risks, actions, and assumptions'],
    board:['Board Report','Compressed oversight summary for governance and fiduciary review'],
    roadmap:['Security Roadmap','Prioritized 30, 60, and 90 day execution sequence'],
    compliance:['Compliance Gap Assessment','Framework lens, evidence gaps, and audit readiness concerns'],
    incident:['Incident Response Plan','Ownership, escalation, containment, and communications readiness'],
    vendor:['Vendor Risk Report','Third-party exposure and governance recommendations'],
    audit:['Audit Readiness Summary','Evidence maturity, owner accountability, and review posture'],
    policy:['Policy Package','Starter policy pathway mapped to gaps found']
  };
  function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
  function html(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function readPayload(){try{return JSON.parse(localStorage.getItem(STORAGE)||'null')}catch(e){return null}}
  function savePayload(p){try{localStorage.setItem(STORAGE,JSON.stringify(p))}catch(e){}}
  function clearPayload(){try{localStorage.removeItem(STORAGE)}catch(e){}}
  function getInputs(){
    return {
      orgName:($('orgName').value||'Your Organization').trim(),industry:$('industry').value,valueRange:$('valueRange').value,
      compliance:$('compliance').value,concern:$('concern').value,evidence:$('evidence').value,controls:$('controls').value,
      aiUsage:$('aiUsage').value,dataSensitivity:$('dataSensitivity').value,incident:$('incident').value,ownerClarity:$('ownerClarity').value,
      owner:$('owner').value,reviewGoal:$('reviewGoal').value,date:new Date().toLocaleDateString()
    };
  }
  var vmap={weak:18,partial:50,strong:84,low:25,moderate:55,high:84,baseline:72,regulated:52,'highly-regulated':35};
  function score(i){
    var evidence=vmap[i.evidence], controls=vmap[i.controls], incident=vmap[i.incident], owner=vmap[i.ownerClarity];
    var aiPenalty=(i.aiUsage==='high'?32:i.aiUsage==='moderate'?16:4)+(i.dataSensitivity==='high'?24:i.dataSensitivity==='moderate'?10:2);
    var compliancePenalty=(i.compliance==='highly-regulated'?18:i.compliance==='regulated'?10:2);
    var trust=clamp(Math.round((evidence*.28)+(controls*.24)+(incident*.24)+(owner*.24)-compliancePenalty),8,96);
    var ai=clamp(Math.round(92-aiPenalty+(controls-55)*.22+(evidence-50)*.18),6,94);
    var confidence=clamp(Math.round((evidence*.55)+(owner*.25)+(controls*.2)),10,94);
    var exposure=clamp(Math.round(100-((trust+ai+confidence)/3)+compliancePenalty+(i.concern==='incident'?9:0)+(i.concern==='vendor'?7:0)),5,96);
    return {trust:trust,ai:ai,confidence:confidence,exposure:exposure};
  }
  function band(value,invert){
    if(invert){ if(value>=67)return ['Elevated','red']; if(value>=38)return ['Developing','yellow']; return ['Controlled','green']; }
    if(value>=75)return ['Resilient','green']; if(value>=45)return ['Developing','yellow']; return ['Elevated','red'];
  }
  function ownerFor(i,type){
    if(i.owner && i.owner!=='Auto-recommend')return i.owner;
    if(type==='ai')return 'CIO / vCISO'; if(type==='money')return 'CFO'; if(type==='legal')return 'General Counsel'; if(type==='incident')return 'COO / vCISO'; return 'CEO';
  }
  function exposureRange(i,s){
    var base={ 'Under $10M':[25000,125000], '$10M - $50M':[90000,450000], '$50M - $250M':[350000,1800000], '$250M+':[1200000,7500000] }[i.valueRange]||[50000,250000];
    var mult=0.6+(s.exposure/100)*1.8+(i.compliance==='highly-regulated'?.55:i.compliance==='regulated'?.25:0)+(i.dataSensitivity==='high'?.25:0);
    var lo=Math.round(base[0]*mult/10000)*10000, hi=Math.round(base[1]*mult/10000)*10000;
    return [lo,hi];
  }
  function money(n){return '$'+n.toLocaleString();}
  function framework(i){
    if(i.industry.indexOf('Defense')>=0)return ['CMMC / NIST 800-171','Defense and federal contractor pressure points require evidence discipline, access controls, and contract-ready security posture.'];
    if(i.industry==='Healthcare')return ['HIPAA / NIST CSF','Healthcare environments need privacy, availability, third-party oversight, incident readiness, and defensible evidence.'];
    if(i.industry==='Financial Services')return ['GLBA / NIST CSF','Financial exposure requires vendor governance, data protection, auditability, and operational resilience.'];
    if(i.compliance==='highly-regulated')return ['NIST CSF + Control Evidence','The organization needs a control language that leadership, IT, legal, and auditors can share.'];
    return ['NIST CSF Executive Lens','Use a practical governance framework without creating compliance theater.'];
  }
  function riskItems(i,s){
    var risks=[];
    if(s.exposure>48)risks.push({title:'Operational exposure may exceed leadership tolerance',body:'Likely exposure range is high enough to require executive review and risk treatment.',owner:ownerFor(i,'money'),sev:band(s.exposure,true)[1],route:'dashboard'});
    if(s.ai<66)risks.push({title:'AI usage is outside a mature control boundary',body:'AI adoption may be moving faster than policy, evidence, ownership, and data handling controls.',owner:ownerFor(i,'ai'),sev:band(s.ai)[1],route:'dashboard'});
    if(s.confidence<70)risks.push({title:'Evidence confidence is not strong enough for defensible decisions',body:'Leadership may be making cyber decisions from partial, stale, or scattered evidence.',owner:ownerFor(i,'legal'),sev:band(s.confidence)[1],route:'dashboard'});
    if(i.incident!=='high')risks.push({title:'Incident response ownership is not executive-ready',body:'A real incident will stress decision rights, communications, legal review, and operational continuity.',owner:ownerFor(i,'incident'),sev:i.incident==='low'?'red':'yellow',route:'actions'});
    if(i.concern==='vendor')risks.push({title:'Vendor exposure lacks decision-grade visibility',body:'Third-party failure can create operational and compliance exposure without appearing in internal dashboards.',owner:'CFO / General Counsel',sev:'yellow',route:'actions'});
    while(risks.length<3){risks.push({title:'Governance rhythm needs formalization',body:'Cyber decisions need a repeatable cadence, owners, evidence, and review points.',owner:'CEO / vCISO',sev:'yellow',route:'actions'});} return risks.slice(0,3);
  }
  function actions(i,s){
    var f=framework(i)[0];
    return [
      {title:'Run a 30-day evidence validation sprint',body:'Confirm what is documented, current, owned, and defensible. Separate verified facts from assumptions.',owner:ownerFor(i,'legal'),reduction:'12-18%',sev:s.confidence<60?'red':'yellow'},
      {title:'Define AI governance boundary and approved-use rules',body:'Map AI tools, data sensitivity, acceptable use, review rights, and owner accountability.',owner:ownerFor(i,'ai'),reduction:'10-22%',sev:s.ai<55?'red':'yellow'},
      {title:'Assign executive risk owners for top three exposure areas',body:'Every high-value risk needs an accountable owner, decision path, and treatment choice.',owner:'CEO',reduction:'8-14%',sev:i.ownerClarity==='low'?'red':'yellow'},
      {title:'Build a short '+f+' roadmap',body:'Translate framework expectations into a practical 30, 60, and 90 day operating plan.',owner:'vCISO / CIO',reduction:'10-16%',sev:'green'},
      {title:'Test incident decision rights with tabletop exercise',body:'Validate who calls legal, who speaks for the company, who authorizes containment, and who reports status.',owner:ownerFor(i,'incident'),reduction:'9-15%',sev:i.incident==='low'?'red':'yellow'}
    ];
  }
  function bubbles(i,s){
    var exp=exposureRange(i,s), f=framework(i)[0];
    return [
      ['Operational Trust Posture',s.trust,'%',band(s.trust),'Measures how ready leadership is to make defensible cyber decisions from evidence, owners, controls, and incident readiness.','posture'],
      ['AI Governance Boundary',s.ai,'%',band(s.ai),'Measures whether AI usage, data sensitivity, and controls sit inside a governed operating boundary.','ai'],
      ['Score Confidence',s.confidence,'%',band(s.confidence),'Measures how much the generated output depends on current evidence instead of assumptions.','confidence'],
      ['Operational Exposure',s.exposure,'%',band(s.exposure,true),'Higher means greater likely business exposure from cyber, AI, compliance, or incident gaps.','exposure'],
      ['Likely Cost Exposure',null,'',band(100-s.exposure),'Estimated range: '+money(exp[0])+' to '+money(exp[1])+' based on value range, exposure, compliance, and data sensitivity.','cost'],
      ['Evidence Maturity',vmap[i.evidence],'%',band(vmap[i.evidence]),'How organized, current, and reviewable the cyber evidence appears from submitted inputs.','evidence'],
      ['Incident Readiness',vmap[i.incident],'%',band(vmap[i.incident]),'Ability to coordinate leadership, containment, communications, and recovery during disruption.','incident'],
      ['Ownership Clarity',vmap[i.ownerClarity],'%',band(vmap[i.ownerClarity]),'Whether cyber, AI, and operational risk decisions have named accountable owners.','ownership'],
      ['Control Documentation',vmap[i.controls],'%',band(vmap[i.controls]),'Whether policies and controls are generic, partial, or owned and reviewable.','controls'],
      ['Compliance Lens',i.compliance==='baseline'?70:i.compliance==='regulated'?55:38,'%',band(i.compliance==='baseline'?70:i.compliance==='regulated'?55:38),f+' is the recommended operating lens from the submitted context.','compliance'],
      ['Data Sensitivity',i.dataSensitivity==='low'?28:i.dataSensitivity==='moderate'?58:86,'%',band(100-(i.dataSensitivity==='low'?28:i.dataSensitivity==='moderate'?58:86)),'Higher sensitivity increases consequence if AI, vendor, identity, or access controls fail.','data'],
      ['Decision Velocity',Math.round((s.trust+s.confidence)/2),'%',band(Math.round((s.trust+s.confidence)/2)),'How quickly leadership can move without creating chaos, guessing, or bypassing controls.','velocity']
    ];
  }
  function makePayload(){var i=getInputs(), s=score(i); return {inputs:i,scores:s,risks:riskItems(i,s),actions:actions(i,s),range:exposureRange(i,s),framework:framework(i),created:new Date().toISOString()};}
  function setRoute(route){
    if(routes.indexOf(route)<0)route='overview';
    if(!state.payload && ['executive','dashboard','actions','reports'].indexOf(route)>=0)route='assessment';
    routes.forEach(function(r){var el=$(r); if(el)el.classList.toggle('active',r===route)});
    document.querySelectorAll('[data-route]').forEach(function(a){a.classList.toggle('active',a.getAttribute('data-route')===route)});
    history.replaceState(null,'','#'+route); $('app').focus({preventScroll:true}); window.scrollTo({top:0,behavior:'smooth'});
  }
  function renderStep(){
    document.querySelectorAll('.step').forEach(function(el,i){el.classList.toggle('active',i===state.step)});
    $('stepLabel').textContent='Step '+(state.step+1)+' of 6'; $('progressBar').style.width=((state.step+1)/6*100)+'%';
    $('prevStep').disabled=state.step===0; $('nextStep').classList.toggle('hidden',state.step===5);
  }
  function setAdvisor(title,means,matters,action,mjc){
    $('advisorTitle').textContent=title; $('advisorMeans').textContent=means; $('advisorMatters').textContent=matters; $('advisorAction').textContent=action; $('advisorMJC').textContent=mjc;
  }
  function attachRouteClicks(){document.querySelectorAll('[data-route]').forEach(function(el){el.addEventListener('click',function(e){e.preventDefault();setRoute(el.getAttribute('data-route'))})})}
  function renderAll(){
    var p=state.payload; document.querySelectorAll('.requires-data').forEach(function(el){el.classList.toggle('disabled',!p)});
    $('assessmentNav').classList.toggle('hidden',!!p);
    if(!p){setAdvisor('Awaiting assessment','No executive output has been generated yet.','CyberShield does not infer posture before inputs are submitted.','Complete the assessment.','MJC can facilitate a vCISO-led CyberShield review once inputs exist.');return;}
    var i=p.inputs,s=p.scores, exp=p.range;
    $('execTitle').textContent=i.orgName+' Executive Decision Brief';
    $('execSub').textContent='Generated '+i.date+' using submitted inputs. Likely exposure range: '+money(exp[0])+' to '+money(exp[1])+'. Framework lens: '+p.framework[0]+'.';
    var core=[['Operational Trust',s.trust,'posture'],['AI Governance',s.ai,'ai'],['Confidence',s.confidence,'confidence'],['Exposure',s.exposure,'exposure']];
    $('execMetrics').innerHTML=core.map(function(m){var b=band(m[1],m[0]==='Exposure'); return metricHtml(m[0],m[1],b,m[2]);}).join('');
    $('execRisks').innerHTML=p.risks.map(function(r,idx){return '<button class="risk-pill '+r.sev+'" data-risk="'+idx+'"><h3>'+html(r.title)+'</h3><p>'+html(r.body)+'</p><span class="pill '+r.sev+'">Owner: '+html(r.owner)+'</span></button>'}).join('');
    $('bubbleGrid').innerHTML=bubbles(i,s).map(function(b){return bubbleHtml(b)}).join('');
    $('actionList').innerHTML=p.actions.map(function(a,idx){return '<button class="action-card '+a.sev+'" data-action="'+idx+'"><h3>'+html(a.title)+'</h3><p>'+html(a.body)+'</p><span class="pill '+a.sev+'">Owner: '+html(a.owner)+'</span> <span class="pill green">Risk reduction '+html(a.reduction)+'</span></button>'}).join('');
    renderReports(); bindGeneratedClicks();
    setAdvisor('Executive View','This screen is the compressed decision brief, designed to avoid long scrolling.','Executives need the smallest useful picture: posture, AI governance, confidence, exposure, top risks, owner, and next action.','Click any metric or risk to drill into the dashboard, action engine, or report.','MJC converts this brief into an Executive CyberShield Review and governed execution plan.');
  }
  function metricHtml(label,val,b,type){return '<button class="metric-card" data-panel="'+type+'"><small>'+html(label)+'</small><div class="value">'+val+'%</div><div class="heat" aria-hidden="true"><span class="heat-dot" style="left:'+val+'%"></span></div><div class="range-label"><span>Red</span><span>Yellow</span><span>Green</span></div><span class="pill '+b[1]+'">'+b[0]+'</span></button>'}
  function bubbleHtml(b){var label=b[0],val=b[1],unit=b[2],bandObj=b[3],body=b[4],key=b[5]; var dot=val===null?50:val; var value=val===null?'Range':val+unit; return '<button class="bubble '+bandObj[1]+'" data-bubble="'+key+'"><div class="bubble-top"><h2>'+html(label)+'</h2><span class="pill '+bandObj[1]+'">'+bandObj[0]+'</span></div><div class="value">'+html(value)+'</div><div class="heat" aria-hidden="true"><span class="heat-dot" style="left:'+dot+'%"></span></div><div class="range-label"><span>Red</span><span>Yellow</span><span>Green</span></div><p>'+html(body)+'</p></button>'}
  function renderReports(){
    $('reportSelector').innerHTML=Object.keys(reports).map(function(k){return '<button class="report-card '+(k===state.report?'active':'')+'" data-report="'+k+'"><h3>'+reports[k][0]+'</h3><p>'+reports[k][1]+'</p></button>'}).join('');
    var text=reportText(state.report); $('reportTitle').textContent=reports[state.report][0]; $('reportText').textContent=text; $('emailReport').href='mailto:?subject='+encodeURIComponent('CyberShield '+reports[state.report][0])+'&body='+encodeURIComponent(text.slice(0,1800));
  }
  function reportText(type){var p=state.payload;if(!p)return '';var i=p.inputs,s=p.scores,exp=p.range;return 'CYBERSHIELD '+reports[type][0].toUpperCase()+'\nPrepared for: '+i.orgName+'\nPrepared by: Maximum Justice Cybersecurity\nDate: '+i.date+'\n\nEXECUTIVE SUMMARY\nCyberShield generated this report from user-submitted inputs. It does not claim verified telemetry ingestion. Current posture: Operational Trust '+s.trust+'%, AI Governance '+s.ai+'%, Confidence '+s.confidence+'%, Operational Exposure '+s.exposure+'%. Likely exposure range: '+money(exp[0])+' to '+money(exp[1])+'.\n\nWHAT THIS MEANS\n'+i.orgName+' needs a tighter operating model for cyber decisions, AI governance, evidence maturity, ownership, and executive reporting. Recommended framework lens: '+p.framework[0]+'. '+p.framework[1]+'\n\nTOP RISKS\n'+p.risks.map(function(r,n){return (n+1)+'. '+r.title+'\n   Owner: '+r.owner+'\n   Why it matters: '+r.body}).join('\n')+'\n\nNEXT-BEST ACTIONS\n'+p.actions.map(function(a,n){return (n+1)+'. '+a.title+'\n   Owner: '+a.owner+'\n   Expected risk reduction: '+a.reduction+'\n   Rationale: '+a.body}).join('\n')+'\n\nASSUMPTIONS AND LIMITATIONS\nThis prototype uses submitted answers only. It does not collect sensitive production data, ingest live telemetry, validate evidence, provide legal advice, or make autonomous decisions. Customer-entered data is separate from inferred analysis.\n\nMJC SUPPORT PATH\nRecommended next step: '+i.reviewGoal+'. MJC can support vCISO advisory, security assessment, AI governance implementation, incident readiness, compliance readiness, and executive reporting.';}
  function bindGeneratedClicks(){
    document.querySelectorAll('[data-panel]').forEach(function(el){el.onclick=function(){var key=el.dataset.panel;var p=state.payload;setRoute('dashboard');advisorFor(key,p)}});
    document.querySelectorAll('[data-risk]').forEach(function(el){el.onclick=function(){var r=state.payload.risks[Number(el.dataset.risk)];setRoute(r.route);setAdvisor(r.title,'This is one of the top three executive risks generated from the assessment.',r.body,'Assign '+r.owner+' and select a risk treatment path: mitigate, transfer, accept, escalate, or investigate.','MJC can validate evidence, define decision rights, and create a 30-day remediation sprint.')}});
    document.querySelectorAll('[data-bubble]').forEach(function(el){el.onclick=function(){advisorFor(el.dataset.bubble,state.payload)}});
    document.querySelectorAll('[data-action]').forEach(function(el){el.onclick=function(){var a=state.payload.actions[Number(el.dataset.action)];setAdvisor(a.title,'This is a ranked next-best action from the CyberShield Action Engine.',a.body,'Give '+a.owner+' a deadline, evidence requirement, and review cadence.','MJC can convert this action into a governed execution plan with measurable outcomes.')}});
    document.querySelectorAll('[data-report]').forEach(function(el){el.onclick=function(){state.report=el.dataset.report;renderReports();setAdvisor(reports[state.report][0],'This report packages the assessment into an executive-ready artifact.',reports[state.report][1],'Preview it, print/save PDF, download TXT, or email it for review.','MJC can tailor this report for board, audit, compliance, legal, or leadership use.')}});
  }
  function advisorFor(key,p){var map={
    posture:['Operational Trust Posture','This is not a technical health score. It estimates leadership readiness to make defensible cyber decisions.','A high number means evidence, controls, owners, and readiness are aligned. A low number means leadership may be guessing under pressure.','Open the top risks and assign treatment owners.','MJC provides vCISO-led operating model design and evidence validation.'],
    ai:['AI Governance Boundary','This estimates whether AI use is inside a defined control boundary.','AI risk grows when sensitive data, autonomy, shadow usage, and weak policies combine.','Create approved AI use rules and map sensitive data handling.','MJC can build AI governance, acceptable use, and trust controls.'],
    confidence:['Score Confidence','This estimates how much the output depends on current evidence versus assumptions.','Low confidence does not mean low risk. It means the organization cannot prove enough yet.','Run a 30-day evidence validation sprint.','MJC can separate verified facts from inferred gaps and build audit-ready evidence.'],
    exposure:['Operational Exposure','This estimates relative exposure from the submitted gaps.','Higher exposure means higher probable disruption, cost, compliance, and executive decision pressure.','Choose risk treatment: mitigate, transfer, accept, escalate, or investigate.','MJC can quantify and sequence risk reduction.'],
    cost:['Likely Cost Exposure','This is a range, not a precise actuarial calculation. It reflects value range, exposure, compliance pressure, and data sensitivity.','Executives need ranges because ranges drive decisions without pretending false precision.','Use this range to justify a remediation sprint or CyberShield review.','MJC can refine the range with evidence, control validation, and business context.'],
    evidence:['Evidence Maturity','This reflects how current, organized, and reviewable cyber evidence appears.','Evidence is what converts opinion into defensible governance.','Inventory policies, controls, incident artifacts, vendor evidence, and AI usage records.','MJC can build the evidence map and reporting cadence.'],
    incident:['Incident Readiness','This reflects leadership ability to coordinate during disruption.','Most incidents fail at ownership, communications, legal review, and sequencing, not only technical response.','Run an executive tabletop and confirm decision rights.','MJC can facilitate tabletop exercises and incident playbooks.'],
    ownership:['Ownership Clarity','This reflects whether named people own risk treatment decisions.','Unowned risk becomes unresolved risk.','Assign one executive owner per top risk and action.','MJC can define RACI, governance cadence, and executive accountability.'],
    controls:['Control Documentation','This reflects whether control language is real, current, and owned.','Generic policies do not create resilience or audit defensibility.','Replace generic policies with role-owned controls.','MJC can build practical policy and control packages.'],
    compliance:['Compliance Lens','This identifies the operating framework that best matches the context.','Frameworks help leadership share a common control language without creating checkbox theater.','Build a practical roadmap around the selected lens.','MJC can align NIST, CMMC, HIPAA, GLBA, and customer security expectations.'],
    data:['Data Sensitivity','This reflects the potential consequence of mishandling data.','Sensitive data increases AI, vendor, legal, and incident exposure.','Map sensitive data flows and AI/tool access.','MJC can support data governance and AI boundary design.'],
    velocity:['Decision Velocity','This estimates how quickly leadership can act without chaos.','Fast bad decisions and slow good decisions both create operational risk.','Create decision gates and escalation thresholds.','MJC can define decision gates, authority, and board reporting.']}; var a=map[key]||map.posture; setAdvisor(a[0],a[1],a[2],a[3],a[4]);}
  function boot(){
    state.payload=readPayload(); renderStep(); attachRouteClicks(); renderAll();
    var initial=(location.hash||'#overview').slice(1); if(state.payload && initial==='assessment')initial='executive'; setRoute(initial);
    $('nextStep').onclick=function(){state.step=clamp(state.step+1,0,5);renderStep()}; $('prevStep').onclick=function(){state.step=clamp(state.step-1,0,5);renderStep()};
    $('assessmentForm').onsubmit=function(e){e.preventDefault();state.payload=makePayload();savePayload(state.payload);renderAll();setRoute('executive')};
    $('resetBtn').onclick=function(){clearPayload();state={step:0,payload:null,report:'executive'};renderStep();renderAll();setRoute('assessment')};
    $('printReport').onclick=function(){window.print()};
    $('downloadReport').onclick=function(){var text=$('reportText').textContent||'';var blob=new Blob([text],{type:'text/plain'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='CyberShield-'+reports[state.report][0].replace(/\s+/g,'-')+'.txt';document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},0)};
  }
  try{if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot()}catch(err){document.body.innerHTML='<main style="max-width:900px;margin:4rem auto;padding:2rem;color:white;background:#07111f;border:1px solid #74d7ff;border-radius:24px;font-family:Arial,sans-serif"><h1>CyberShield Recovery Mode</h1><p>The app caught a startup error instead of showing a blank white screen.</p><pre style="white-space:pre-wrap;color:#ffd5d5">'+html(err&&err.message?err.message:err)+'</pre><button onclick="localStorage.clear();location.reload()" style="min-height:44px;padding:12px 18px;border-radius:999px;border:0;background:#74d7ff;font-weight:800">Clear Local Data and Reload</button></main>'}
})();
