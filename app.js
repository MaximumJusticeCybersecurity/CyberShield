(function(){
  'use strict';

  var STORAGE_KEY = 'cybershield-os-v5-5-assessment';
  var state = { step: 0, submitted: false, activeReport: 'executive' };

  var frameworks = {
    SMB: { short:'CIS', long:'CIS Controls', reason:'Practical baseline for SMB and mid-market cyber hygiene' },
    Healthcare: { short:'HIPAA', long:'HIPAA Security Rule + NIST CSF', reason:'Health data, privacy exposure, and operational continuity require executive-level control evidence' },
    Defense: { short:'CMMC', long:'CMMC / NIST 800-171', reason:'Contractual control evidence and controlled information requirements are central to defensibility' },
    Financial: { short:'FTC', long:'FTC Safeguards + NIST CSF', reason:'Customer data protection, vendor oversight, and governance evidence drive risk treatment' },
    Manufacturing: { short:'NIST', long:'NIST CSF + CIS Controls', reason:'Operational continuity and production dependencies require resilience-focused prioritization' },
    Technology: { short:'SOC 2', long:'SOC 2 Trust Services + CIS Controls', reason:'Customer trust, evidence readiness, and secure operating practices shape the review path' },
    Nonprofit: { short:'CIS', long:'CIS Controls + Privacy Basics', reason:'Lean governance, practical controls, and donor/customer trust are the fastest path to maturity' }
  };

  var advisorLibrary = {
    profile: ['Profile', 'Business context changes the meaning of cyber risk.', 'A healthcare AI workflow, a defense contractor evidence gap, and an SMB ownership gap should not be scored or handled the same way.', 'Complete the profile before interpreting readiness.', 'MJC translates cyber inputs into executive decision context.'],
    trust: ['Trust State', 'Trust posture is not a vanity score.  It is a decision-confidence indicator.', 'Weak evidence lowers confidence even when controls sound mature.', 'Separate verified facts from assumptions before choosing actions.', 'MJC brings vCISO and Security SME discipline to evidence-based governance.'],
    actions: ['Action Engine', 'CyberShield ranks work by decision value, not dashboard noise.', 'Executives need the next decision, owner, and sequencing, not a long list of generic fixes.', 'Prioritize the top three actions before expanding the roadmap.', 'MJC helps convert action lists into governed execution.'],
    report: ['Reporting', 'A report is useful only if it is defensible, concise, and decision-ready.', 'Board and customer-facing reports should expose assumptions, evidence, ownership, and risk treatment.', 'Use the report as the meeting artifact for the next executive review.', 'MJC turns findings into board-ready narratives and operating plans.'],
    posture: ['Operational Trust Posture', 'This is a maturity-band indicator generated from your submitted inputs.', 'It summarizes whether leadership has enough evidence, ownership, and readiness to make defensible cyber decisions.', 'Review the top risks and assign owners before expanding scope.', 'MJC can validate the posture through an Executive CyberShield Review.'],
    ai: ['AI Governance Boundary', 'This indicates whether AI usage appears inside or outside a defensible control boundary.', 'Shadow AI, sensitive data exposure, and unclear review authority create legal, operational, and trust risk.', 'Define approved AI use, evidence retention, and decision review rules.', 'MJC provides AI Governance Boundary Reviews and control design.'],
    confidence: ['Score Confidence', 'Confidence reflects evidence quality, not optimism.', 'A low-confidence score means leadership should avoid overclaiming readiness.', 'Refresh evidence, document ownership, and test decision rights.', 'MJC can build the evidence package and governance cadence.'],
    exposure: ['Operational Exposure', 'Exposure estimates operational risk pressure from compliance, AI, incident readiness, and ownership gaps.', 'The higher the exposure, the more leadership needs sequencing and accountability.', 'Treat elevated exposure through mitigation, escalation, or investigation.', 'MJC provides vCISO-led risk treatment planning.']
  };

  var reports = {
    executive: { title:'Executive Risk Summary', desc:'Top risks, ownership gaps, decision implications, and next-best actions.' },
    board: { title:'Board Report', desc:'Board-ready summary of posture, assumptions, governance gaps, and recommended decisions.' },
    roadmap: { title:'Security Roadmap', desc:'90-day action sequence with owner, rationale, effort, and expected risk reduction.' },
    compliance: { title:'Compliance Gap Assessment', desc:'Framework lens, control pressure, evidence maturity, and audit-readiness concerns.' },
    incident: { title:'Incident Response Plan', desc:'Decision rights, containment authority, communications, and escalation readiness.' },
    vendor: { title:'Vendor Risk Report', desc:'Third-party exposure, ownership, monitoring, and risk treatment pathway.' },
    audit: { title:'Audit Readiness Summary', desc:'Evidence maturity, documentation gaps, confidence labels, and limitations.' },
    policy: { title:'Policy Package', desc:'Starter governance package for AI, incident response, acceptable use, and executive reporting.' }
  };

  function $(id){ return document.getElementById(id); }
  function clamp(n,min,max){ return Math.max(min, Math.min(max, n)); }
  function safeJson(value){ try { return JSON.parse(value); } catch(e) { return null; } }
  function band(score, inverse){
    if(inverse){ if(score>=70) return ['Elevated','red']; if(score>=45) return ['Developing','yellow']; return ['Controlled','green']; }
    if(score>=78) return ['Resilient','green']; if(score>=60) return ['Developing','yellow']; return ['Elevated','red'];
  }
  function getForm(){
    return {
      orgName: $('orgName').value.trim() || 'Your organization', industry: $('industry').value, valueRange: $('valueRange').value,
      compliance: $('compliance').value, concern: $('concern').value, evidence: $('evidence').value, controls: $('controls').value,
      aiUsage: $('aiUsage').value, dataSensitivity: $('dataSensitivity').value, irReadiness: $('irReadiness').value,
      ownerClarity: $('ownerClarity').value, execOwner: $('execOwner').value, supportPath: $('supportPath').value
    };
  }
  function score(inputs){
    var trust = 64, ai = 66, confidence = 58, exposure = 42;
    if(inputs.evidence==='strong'){ trust+=12; confidence+=20; exposure-=8; }
    if(inputs.evidence==='weak'){ trust-=14; confidence-=18; exposure+=14; }
    if(inputs.controls==='high'){ trust+=9; confidence+=8; exposure-=6; }
    if(inputs.controls==='low'){ trust-=10; confidence-=8; exposure+=9; }
    if(inputs.aiUsage==='high'){ ai-=24; trust-=7; exposure+=18; }
    if(inputs.aiUsage==='low'){ ai+=13; exposure-=6; }
    if(inputs.dataSensitivity==='high'){ ai-=12; exposure+=12; }
    if(inputs.dataSensitivity==='low'){ ai+=7; exposure-=4; }
    if(inputs.irReadiness==='high'){ trust+=10; confidence+=7; exposure-=10; }
    if(inputs.irReadiness==='low'){ trust-=12; confidence-=6; exposure+=12; }
    if(inputs.ownerClarity==='high'){ trust+=9; confidence+=7; exposure-=8; }
    if(inputs.ownerClarity==='low'){ trust-=13; confidence-=8; exposure+=13; }
    if(inputs.compliance==='regulated'){ exposure+=7; confidence-=2; }
    if(inputs.compliance==='highly-regulated'){ exposure+=14; confidence-=4; trust-=4; }
    if(['Healthcare','Defense','Financial'].indexOf(inputs.industry)>-1){ exposure+=7; ai-=4; }
    return { trust:clamp(trust,18,94), ai:clamp(ai,18,94), confidence:clamp(confidence,18,94), exposure:clamp(exposure,8,92) };
  }
  function owner(inputs, issue){
    if(inputs.execOwner && inputs.execOwner !== 'Auto-recommend owner') return inputs.execOwner;
    if(issue==='AI') return 'CIO + Legal + vCISO';
    if(issue==='Compliance') return inputs.industry==='Defense' ? 'CEO + Contracts + vCISO' : 'CEO + Compliance + vCISO';
    if(issue==='Incident') return 'COO + CIO + General Counsel';
    if(issue==='Evidence') return 'Security Lead + Operations';
    return 'CEO + vCISO';
  }
  function framework(inputs){ return frameworks[inputs.industry] || frameworks.SMB; }

  function buildRisks(inputs, scores){
    var list = [];
    if(inputs.aiUsage==='high' || inputs.dataSensitivity==='high') list.push({sev:'red', title:'AI activity may be outside the control boundary', why:'AI usage and data sensitivity increase risk of leakage, weak evidence retention, and decision defensibility gaps.', owner:owner(inputs,'AI'), treatment:'Mitigate / Escalate'});
    if(inputs.evidence==='weak' || inputs.controls==='low') list.push({sev:'red', title:'Evidence maturity does not support confident claims', why:'Controls may exist informally, but stale or scattered evidence weakens audit, customer, and board defensibility.', owner:owner(inputs,'Evidence'), treatment:'Investigate / Mitigate'});
    if(inputs.irReadiness==='low') list.push({sev:'red', title:'Incident response decision rights are not ready', why:'If containment, legal notification, and executive communications are unclear, response speed will degrade under pressure.', owner:owner(inputs,'Incident'), treatment:'Mitigate'});
    if(inputs.ownerClarity!=='high') list.push({sev:'yellow', title:'Ownership gaps create decision latency', why:'Cybersecurity work stalls when risk has no named business owner, decision authority, or escalation path.', owner:owner(inputs,'General'), treatment:'Mitigate'});
    if(inputs.compliance!=='baseline') list.push({sev:'yellow', title:'Compliance pressure requires a defensible framework lens', why:framework(inputs).long + ' should shape evidence, reporting, and roadmap sequencing.', owner:owner(inputs,'Compliance'), treatment:'Mitigate'});
    list.push({sev:scores.exposure>65?'red':'green', title:'Leadership needs a 90-day cyber decision roadmap', why:'The organization needs the next few decisions sequenced by risk, confidence, owner, effort, and expected reduction.', owner:'CEO + vCISO', treatment:'Mitigate'});
    return list.slice(0,3);
  }
  function buildActions(inputs, scores){
    var actions = [];
    if(inputs.aiUsage==='high' || inputs.dataSensitivity==='high') actions.push({sev:'red', title:'Define and enforce the AI control boundary', rationale:'Document approved tools, prohibited data, review rules, evidence retention, and owner accountability.', owner:owner(inputs,'AI'), effort:'Medium', reduction:'High'});
    if(inputs.evidence==='weak' || inputs.controls==='low') actions.push({sev:'red', title:'Refresh evidence and control documentation', rationale:'Replace informal claims with current policies, inventories, screenshots, test records, and owner attestations.', owner:owner(inputs,'Evidence'), effort:'Medium', reduction:'High'});
    if(inputs.irReadiness!=='high') actions.push({sev:'yellow', title:'Run an executive incident decision drill', rationale:'Validate who can authorize containment, legal escalation, customer communications, and recovery sequencing.', owner:owner(inputs,'Incident'), effort:'Low', reduction:'High'});
    actions.push({sev:'yellow', title:'Create a 90-day CyberShield roadmap', rationale:'Sequence the highest-value fixes instead of spreading leadership attention across every possible weakness.', owner:'CEO + vCISO', effort:'Low', reduction:'High'});
    actions.push({sev:'green', title:'Prepare board-ready risk narrative', rationale:'Translate cyber, AI, compliance, and ownership findings into concise leadership language.', owner:'CEO + vCISO', effort:'Low', reduction:'Medium'});
    return actions.slice(0,5);
  }
  function servicePath(inputs, scores){
    var services = [];
    services.push({title:inputs.supportPath, body:'Primary recommended pathway based on the final assessment preference and generated posture.'});
    if(scores.ai<62) services.push({title:'AI Governance Boundary Review', body:'Define approved AI use, data rules, evidence retention, and executive accountability.'});
    if(scores.confidence<62) services.push({title:'Cyber Readiness Diagnostic', body:'Validate evidence maturity, control ownership, and customer or audit defensibility.'});
    services.push({title:'vCISO Advisory', body:'Ongoing executive security leadership from Dr. Max Justice, vCISO, Security SME, Cybersecurity SME, U.S. veteran, and creator of CHN vCISO GPT powered by Cyber Shield.'});
    return services.slice(0,4);
  }
  function reportText(kind, inputs, scores, risks, actions){
    var f = framework(inputs); var today = new Date().toLocaleDateString();
    var title = reports[kind].title;
    return title + '\nCyberShield OS v5.5 | Maximum Justice Cybersecurity\nPrepared for: ' + inputs.orgName + '\nDate: ' + today + '\n\nEXECUTIVE SUMMARY\nBased on submitted inputs, CyberShield generated an operational trust posture of ' + scores.trust + '%, an AI governance boundary score of ' + scores.ai + '%, score confidence of ' + scores.confidence + '%, and operational exposure of ' + scores.exposure + '%.  These values are assessment-derived indicators, not externally verified audit findings.\n\nFRAMEWORK LENS\nRecommended lens: ' + f.long + '.  Rationale: ' + f.reason + '.\n\nTOP RISKS\n' + risks.map(function(r,i){return (i+1)+'. '+r.title+'\n   Why it matters: '+r.why+'\n   Recommended owner: '+r.owner+'\n   Treatment: '+r.treatment;}).join('\n') + '\n\nNEXT-BEST ACTIONS\n' + actions.map(function(a,i){return (i+1)+'. '+a.title+'\n   Owner: '+a.owner+'\n   Effort: '+a.effort+'\n   Expected risk reduction: '+a.reduction+'\n   Rationale: '+a.rationale;}).join('\n') + '\n\nASSUMPTIONS AND LIMITATIONS\nThis prototype uses user-submitted inputs only.  It does not ingest telemetry, validate control evidence, store sensitive production data, or provide legal advice.  Customer-entered data is separated from inferred analysis.\n\nRECOMMENDED MJC SUPPORT PATH\nReview these findings through an Executive CyberShield Review with Maximum Justice Cybersecurity.  For elevated AI, evidence, or compliance gaps, prioritize vCISO advisory support, AI governance implementation, incident readiness, and compliance readiness sequencing.';
  }

  function setAdvisor(key, override){
    var data = override || advisorLibrary[key] || advisorLibrary.posture;
    $('advisorTitle').textContent = data[0]; $('advisorMeans').textContent = data[1]; $('advisorMatters').textContent = data[2]; $('advisorAction').textContent = data[3]; $('advisorMJC').textContent = data[4];
  }
  function renderStep(){
    var steps = Array.prototype.slice.call(document.querySelectorAll('.wizard-step'));
    steps.forEach(function(el,i){ el.classList.toggle('active', i===state.step); });
    $('stepLabel').textContent = 'Step ' + (state.step+1) + ' of ' + steps.length;
    $('progressBar').style.width = (((state.step+1)/steps.length)*100) + '%';
    $('prevStep').disabled = state.step===0;
    document.querySelector('.wizard-shell').classList.toggle('is-last', state.step===steps.length-1);
    $('scoreLock').textContent = 'Scoring locked until submission';
  }
  function unlockSections(){
    Array.prototype.slice.call(document.querySelectorAll('.gated')).forEach(function(el){ el.classList.remove('hidden'); });
  }
  function renderResults(payload){
    var inputs = payload.inputs, scores = payload.scores, risks = payload.risks, actions = payload.actions;
    unlockSections();
    $('dashboardTitle').textContent = inputs.orgName + ' Operational Trust Posture';
    var tb=band(scores.trust), ab=band(scores.ai), cb=band(scores.confidence), eb=band(scores.exposure,true);
    $('trustScore').textContent = scores.trust + '%'; $('trustBand').textContent = tb[0];
    $('aiScore').textContent = scores.ai + '%'; $('aiBand').textContent = ab[0];
    $('confidenceScore').textContent = scores.confidence + '%'; $('confidenceBand').textContent = cb[0];
    $('exposureScore').textContent = scores.exposure + '%'; $('exposureBand').textContent = eb[0];
    var f=framework(inputs); $('frameworkBadge').textContent = f.short + ' recommended'; $('frameworkBadge').className = 'pill ' + (inputs.compliance==='highly-regulated'?'red':inputs.compliance==='regulated'?'yellow':'green');
    $('riskList').innerHTML = risks.map(function(r){ return '<article class="risk-card" tabindex="0" data-title="'+escapeHtml(r.title)+'" data-why="'+escapeHtml(r.why)+'" data-owner="'+escapeHtml(r.owner)+'"><div class="panel-head"><h4>'+escapeHtml(r.title)+'</h4><span class="pill '+r.sev+'">'+r.treatment+'</span></div><p>'+escapeHtml(r.why)+'</p><div class="card-meta"><span class="pill neutral">Owner: '+escapeHtml(r.owner)+'</span></div></article>'; }).join('');
    $('actionList').innerHTML = actions.map(function(a){ return '<article class="action-card" tabindex="0" data-title="'+escapeHtml(a.title)+'" data-rationale="'+escapeHtml(a.rationale)+'" data-owner="'+escapeHtml(a.owner)+'"><div class="panel-head"><h4>'+escapeHtml(a.title)+'</h4><span class="pill '+a.sev+'">'+a.reduction+' reduction</span></div><p>'+escapeHtml(a.rationale)+'</p><div class="card-meta"><span class="pill neutral">Owner: '+escapeHtml(a.owner)+'</span><span class="pill neutral">Effort: '+a.effort+'</span></div></article>'; }).join('');
    var memories = ['Unresolved risks: '+risks.length+' active leadership items','Roadmap history: new assessment baseline created','Evidence age: '+(inputs.evidence==='strong'?'current':'requires validation'),'Ownership continuity: '+(inputs.ownerClarity==='high'?'named owners':'gaps remain'),'Compliance progression: '+f.long,'Historical posture: stored locally for prototype use'];
    $('memoryList').innerHTML = memories.map(function(m){return '<article class="memory-card"><h3>'+escapeHtml(m.split(':')[0])+'</h3><p>'+escapeHtml(m.split(':').slice(1).join(':').trim())+'</p></article>';}).join('');
    $('serviceList').innerHTML = servicePath(inputs,scores).map(function(s){return '<article class="glass service-card" tabindex="0" data-title="'+escapeHtml(s.title)+'" data-body="'+escapeHtml(s.body)+'"><h3>'+escapeHtml(s.title)+'</h3><p>'+escapeHtml(s.body)+'</p></article>';}).join('');
    renderReportCards(payload); attachDynamicAdvisor(); setAdvisor('posture');
  }
  function renderReportCards(payload){
    $('reportCards').innerHTML = Object.keys(reports).map(function(k){return '<article class="report-card '+(k===state.activeReport?'active':'')+'" tabindex="0" data-report="'+k+'"><h3>'+reports[k].title+'</h3><p>'+reports[k].desc+'</p></article>';}).join('');
    updateReport(payload);
  }
  function updateReport(payload){
    var text = reportText(state.activeReport, payload.inputs, payload.scores, payload.risks, payload.actions);
    $('reportTitle').textContent = reports[state.activeReport].title; $('reportPreview').textContent = text;
    var subject = encodeURIComponent('CyberShield ' + reports[state.activeReport].title + ' - ' + payload.inputs.orgName);
    $('emailReport').href = 'mailto:?subject=' + subject + '&body=' + encodeURIComponent(text.slice(0,1800));
  }
  function escapeHtml(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function payloadFromInputs(inputs){ var scores=score(inputs); return { inputs:inputs, scores:scores, risks:buildRisks(inputs,scores), actions:buildActions(inputs,scores) }; }
  function savePayload(payload){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); }catch(e){} }
  function loadPayload(){ return safeJson(localStorage.getItem(STORAGE_KEY)); }
  function attachDynamicAdvisor(){
    Array.prototype.slice.call(document.querySelectorAll('.metric')).forEach(function(el){ el.onclick=function(){ setAdvisor(el.dataset.panel); }; });
    Array.prototype.slice.call(document.querySelectorAll('.method-card')).forEach(function(el){ el.onclick=function(){ setAdvisor(el.dataset.advisor); }; });
    Array.prototype.slice.call(document.querySelectorAll('.risk-card')).forEach(function(el){ el.onclick=function(){ setAdvisor(null,[el.dataset.title,'This risk is high enough to require leadership interpretation.',el.dataset.why,'Assign '+el.dataset.owner+' and choose a treatment path before expanding scope.','MJC can validate the risk, evidence, and owner pathway.']); }; });
    Array.prototype.slice.call(document.querySelectorAll('.action-card')).forEach(function(el){ el.onclick=function(){ setAdvisor(null,[el.dataset.title,'This is a ranked next-best action from the Action Engine.',el.dataset.rationale,'Give '+el.dataset.owner+' a deadline and evidence requirement.','MJC can convert this action into a governed 90-day execution plan.']); }; });
    Array.prototype.slice.call(document.querySelectorAll('.service-card')).forEach(function(el){ el.onclick=function(){ setAdvisor(null,[el.dataset.title,'This service pathway maps the generated finding into an engagement path.',el.dataset.body,'Use this as the next conversation after report generation.','MJC provides the advisory, implementation, and executive reporting support.']); }; });
    Array.prototype.slice.call(document.querySelectorAll('.report-card')).forEach(function(el){ el.onclick=function(){ var payload=loadPayload(); if(!payload) return; state.activeReport=el.dataset.report; renderReportCards(payload); setAdvisor('report'); }; });
  }
  function boot(){
    renderStep(); attachDynamicAdvisor();
    var prior = loadPayload(); if(prior && prior.inputs && prior.scores){ state.submitted=true; renderResults(prior); }
    $('nextStep').onclick=function(){ state.step=clamp(state.step+1,0,5); renderStep(); };
    $('prevStep').onclick=function(){ state.step=clamp(state.step-1,0,5); renderStep(); };
    $('assessmentForm').addEventListener('submit',function(e){ e.preventDefault(); var payload=payloadFromInputs(getForm()); savePayload(payload); state.submitted=true; renderResults(payload); location.hash='#dashboard'; });
    $('resetBtn').onclick=function(){ localStorage.removeItem(STORAGE_KEY); state={step:0,submitted:false,activeReport:'executive'}; Array.prototype.slice.call(document.querySelectorAll('.gated')).forEach(function(el){el.classList.add('hidden');}); renderStep(); location.hash='#assessment'; };
    $('printReport').onclick=function(){ window.print(); };
    $('downloadReport').onclick=function(){ var text=$('reportPreview').textContent || ''; var blob=new Blob([text],{type:'text/plain'}); var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='CyberShield-'+reports[state.activeReport].title.replace(/\s+/g,'-')+'.txt'; document.body.appendChild(a); a.click(); setTimeout(function(){URL.revokeObjectURL(a.href); a.remove();},0); };
  }
  try{ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',boot); } else { boot(); } }
  catch(error){ document.body.innerHTML='<main style="max-width:900px;margin:4rem auto;padding:2rem;color:white;background:#111827;border:1px solid #55c7ff;border-radius:24px;font-family:sans-serif"><h1>CyberShield Recovery Mode</h1><p>The app caught a startup error instead of showing a blank screen.</p><pre style="white-space:pre-wrap;color:#fecaca">'+String(error&&error.message?error.message:error)+'</pre><button onclick="localStorage.clear();location.reload()" style="padding:.8rem 1rem;border-radius:999px;border:0;background:#67e8f9;font-weight:800">Clear Local Data and Reload</button></main>'; }
})();
