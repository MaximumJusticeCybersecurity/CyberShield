(function(){
  'use strict';
  var VERSION='CyberShield OS v6.2 Operational Trust Infrastructure';
  var STORAGE='cybershield_os_v6_2_payload';
  var HISTORY='cybershield_os_v6_2_history';
  var routes=['overview','assessment','briefing','dashboard','orchestration','memory','reports','locked'];
  var state={step:0,payload:null,report:'executive'};
  var reports={
    executive:['Executive Risk Summary','One-page leadership brief for operational trust posture, priorities, exposure, and confidence.'],
    board:['Board Report','Governance-oriented summary for board or ownership review.'],
    roadmap:['Security Roadmap','30, 60, and 90-day operating priorities.'],
    compliance:['Compliance Gap Assessment','Framework lens and evidence maturity notes.'],
    ai:['AI Governance Review','Boundary, autonomy, data sensitivity, and admissibility concerns.'],
    incident:['Incident Readiness Summary','Decision rights, escalation, response, and recovery readiness.'],
    vendor:['Vendor Governance Review','Third-party oversight, dependency, and review cadence.'],
    audit:['Audit Readiness Report','Evidence confidence and control ownership summary.'],
    policy:['Policy Package','Policy and control documentation starter structure.']
  };
  var frameworkMap={
    'Healthcare':['HIPAA / NIST CSF','Healthcare context usually requires privacy, incident response, vendor oversight, and evidence discipline.'],
    'Defense / Federal Contractor':['CMMC / NIST SP 800-171','Defense and federal contractor environments require control ownership, evidence maturity, and audit readiness.'],
    'Financial Services':['GLBA / FFIEC / NIST CSF','Financial environments require governance, vendor controls, access control, incident readiness, and executive risk reporting.'],
    'Manufacturing':['NIST CSF / CIS Controls','Manufacturing exposure often centers on uptime, vendor dependencies, identity, backups, and operational continuity.'],
    'Technology / SaaS':['SOC 2 / ISO 27001 / NIST CSF','SaaS environments require customer-facing trust evidence, data governance, incident readiness, and AI boundaries.'],
    'Nonprofit / Association':['NIST CSF / CIS Controls','Nonprofit environments often need practical governance, vendor oversight, incident readiness, and leadership visibility.'],
    'SMB / Mid-Market':['NIST CSF / CIS Controls','SMB and mid-market environments need pragmatic governance, ownership, evidence, and prioritized risk reduction.']
  };
  function $(id){return document.getElementById(id)}
  function qsa(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel))}
  function clamp(n,min,max){return Math.max(min,Math.min(max,n))}
  function html(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function money(n){return '$'+Math.round(n).toLocaleString()}
  function pct(n){return clamp(Math.round(n),0,100)}
  function status(score){if(score<58)return ['Elevated','state-red']; if(score<76)return ['Developing','state-yellow']; return ['Controlled','state-green']}
  function dotStyle(score){return 'left:'+pct(score)+'%'}
  function readPayload(){try{return JSON.parse(localStorage.getItem(STORAGE)||'null')}catch(e){return null}}
  function savePayload(p){localStorage.setItem(STORAGE,JSON.stringify(p)); addHistory(p)}
  function clearPayload(){localStorage.removeItem(STORAGE)}
  function history(){try{return JSON.parse(localStorage.getItem(HISTORY)||'[]')}catch(e){return []}}
  function addHistory(p){var h=history(); h.unshift({date:p.inputs.date,org:p.inputs.orgName,goal:p.inputs.reviewGoalLabel,trust:p.scores.trust,ai:p.scores.ai,confidence:p.scores.confidence,exposure:p.scores.exposure,top:p.briefing.whatChanged}); localStorage.setItem(HISTORY,JSON.stringify(h.slice(0,8)))}
  function val(id){var el=$(id);return el?el.value:''}
  function scorePick(value,map,def){return map[value]||def}
  function firstName(raw){var s=(raw||'Executive').trim();return s.split(/\s+/)[0]||'Executive'}
  function ownerFromInputs(inputs){if(inputs.owner&&inputs.owner!=='Unassigned')return inputs.owner; if(inputs.concern==='audit')return 'CFO'; if(inputs.concern==='incident')return 'COO'; if(inputs.concern==='ai')return 'CIO / CTO'; if(inputs.concern==='vendor')return 'COO'; if(inputs.concern==='continuity')return 'CEO / President'; return 'vCISO / Advisor'}
  function makePayload(){
    var inputs={
      personName:firstName(val('personName')),
      orgName:(val('orgName')||'Your Organization').trim(),
      industry:val('industry')||'SMB / Mid-Market',
      valueRange:val('valueRange')||'Under $10M',
      reviewGoal:val('reviewGoal')||'executive',
      concern:val('concern')||'uncertainty',
      compliance:val('compliance')||'baseline',
      evidence:val('evidence')||'partial',
      aiUsage:val('aiUsage')||'moderate',
      dataSensitivity:val('dataSensitivity')||'moderate',
      incident:val('incident')||'moderate',
      controls:val('controls')||'moderate',
      owner:val('owner')||'Unassigned',
      cadence:val('cadence')||'monthly',
      date:new Date().toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})
    };
    var goalLabels={executive:'Executive CyberShield Review',trust:'Operational Trust Assessment',ai:'AI Governance Boundary Review',readiness:'Cyber Readiness Diagnostic',resilience:'Operational Resilience Diagnostic'};
    inputs.reviewGoalLabel=goalLabels[inputs.reviewGoal]||goalLabels.executive;
    inputs.recommendedOwner=ownerFromInputs(inputs);
    var trust=72;
    trust+=scorePick(inputs.evidence,{weak:-16,partial:-4,strong:10},0);
    trust+=scorePick(inputs.controls,{low:-12,moderate:-2,high:9},0);
    trust+=scorePick(inputs.incident,{low:-12,moderate:-3,high:8},0);
    trust+=scorePick(inputs.owner,{'':-8,'Unassigned':-12},0);
    trust+=scorePick(inputs.cadence,{reactive:-10,monthly:2,quarterly:-2,continuous:9},0);
    trust+=scorePick(inputs.compliance,{baseline:0,regulated:-3,'highly-regulated':-6},0);
    var ai=78;
    ai+=scorePick(inputs.aiUsage,{low:8,moderate:-2,high:-18},0);
    ai+=scorePick(inputs.dataSensitivity,{low:6,moderate:-4,high:-14},0);
    ai+=scorePick(inputs.controls,{low:-10,moderate:-2,high:7},0);
    ai+=inputs.reviewGoal==='ai'?-3:0;
    var confidence=70;
    confidence+=scorePick(inputs.evidence,{weak:-22,partial:-5,strong:15},0);
    confidence+=scorePick(inputs.controls,{low:-10,moderate:-2,high:8},0);
    confidence+=scorePick(inputs.cadence,{reactive:-8,monthly:2,quarterly:0,continuous:8},0);
    var exposure=100-Math.round((pct(trust)*.35+pct(ai)*.25+pct(confidence)*.25+scorePick(inputs.incident,{low:45,moderate:65,high:85},65)*.15));
    exposure=clamp(exposure+scorePick(inputs.compliance,{baseline:0,regulated:8,'highly-regulated':14},0)+scorePick(inputs.valueRange,{'Under $10M':-3,'$10M - $50M':4,'$50M - $250M':12,'$250M+':18},0),18,91);
    var valueBase={'Under $10M':350000,'$10M - $50M':1100000,'$50M - $250M':2900000,'$250M+':7600000}[inputs.valueRange]||350000;
    var multiplier=exposure/50;
    var range=[valueBase*multiplier*.55,valueBase*multiplier*1.55];
    var scores={trust:pct(trust),ai:pct(ai),confidence:pct(confidence),exposure:pct(exposure)};
    var framework=frameworkMap[inputs.industry]||frameworkMap['SMB / Mid-Market'];
    var briefing=buildBriefing(inputs,scores,range,framework);
    var actions=buildActions(inputs,scores,range);
    var risks=buildRisks(inputs,scores,range);
    var bubbles=buildBubbles(inputs,scores,range,framework,actions);
    var memory=buildMemory(inputs,scores,range,actions,risks);
    var journey=buildJourney(inputs,scores,actions);
    return {version:VERSION,createdAt:new Date().toISOString(),inputs:inputs,scores:scores,range:range,framework:framework,briefing:briefing,actions:actions,risks:risks,bubbles:bubbles,memory:memory,journey:journey};
  }
  function buildBriefing(i,s,range,framework){
    var concern={
      uncertainty:'Cyber priorities are fragmented and leadership decision confidence is constrained by incomplete governance evidence.',
      ai:'AI adoption appears to be moving faster than the current governance boundary.',
      audit:'Customer, audit, or contractual security pressure is increasing faster than evidence maturity.',
      incident:'Incident response ownership and executive decision rights need stronger operational validation.',
      vendor:'Vendor and third-party governance visibility appears incomplete.',
      continuity:'Leadership needs clearer continuity and survivability visibility across cyber operations.'
    }[i.concern];
    var why={
      executive:'Leadership needs a concise operational picture that translates cyber ambiguity into decisions, owners, and next actions.',
      trust:'Operational trust depends on evidence, ownership, control maturity, and governance continuity working together.',
      ai:'AI risk becomes operational risk when sensitive data, autonomy, and shadow usage exist outside a defined control boundary.',
      readiness:'Cyber readiness depends on tested response, evidence maturity, and control ownership, not policy documents alone.',
      resilience:'Operational resilience depends on recovery confidence, decision velocity, vendor governance, and continuity under pressure.'
    }[i.reviewGoal];
    var impact='Estimated exposure range is '+money(range[0])+' to '+money(range[1])+'. This is a directional planning range, not a verified actuarial calculation.';
    var recommendations=[];
    if(s.confidence<72)recommendations.push('Run a 30-day evidence validation sprint');
    if(s.ai<72||i.concern==='ai')recommendations.push('Define the AI governance boundary and approved-use rules');
    if(i.incident!=='high')recommendations.push('Run an executive incident escalation tabletop');
    if(i.owner==='Unassigned'||!i.owner)recommendations.push('Assign named executive owners for the top three risks');
    if(recommendations.length<3)recommendations.push('Convert the current posture into a 30, 60, and 90-day security roadmap');
    var continuity='Current governance state should be reviewed on a '+(i.cadence==='continuous'?'continuous cadence':i.cadence+' cadence')+'. Open items should remain visible until accepted, mitigated, transferred, escalated, or investigated.';
    return {whatChanged:concern,whyMatters:why,operationalImpact:impact,recommendations:recommendations.slice(0,4),continuity:continuity,confidence:'Confidence is '+s.confidence+'% based on evidence maturity, control documentation, and review cadence.',framework:'Recommended framework lens: '+framework[0]+'. '+framework[1]};
  }
  function buildActions(i,s,range){
    var items=[];
    function add(title,body,owner,severity,age,stage,score,confidence){items.push({title:title,body:body,owner:owner,severity:severity,age:age,stage:stage,score:score,confidence:confidence})}
    if(s.confidence<75)add('Run a 30-day evidence validation sprint','Separate verified facts from inferred gaps. Collect policy, control, incident, vendor, AI usage, and recovery evidence before leadership accepts the posture.',i.recommendedOwner,'High',31,'Evidence Maturity',96,'Moderate');
    if(s.ai<76)add('Define the AI governance boundary','Identify approved tools, prohibited data, human approval points, prompt handling rules, and model use restrictions before AI use scales further.','CIO / CTO','High',24,'AI Governance',91,'Moderate');
    if(i.incident!=='high')add('Test the executive incident escalation chain','Run a tabletop focused on who decides, who communicates, who contacts counsel, who approves downtime decisions, and who owns recovery sequencing.','COO','High',42,'Incident Readiness',89,'High');
    if(!i.owner||i.owner==='Unassigned')add('Assign risk treatment owners','Each top risk needs one accountable executive owner. Unowned risk becomes unresolved risk.','CEO / President','High',18,'Ownership',88,'High');
    if(i.concern==='vendor'||i.compliance!=='baseline')add('Complete vendor governance review','Identify critical vendors, security evidence gaps, contract exposure, continuity dependencies, and annual review cadence.','COO','Moderate',63,'Third-Party Governance',83,'Moderate');
    if(i.controls!=='high')add('Replace generic policies with owned controls','Map policies to named owners, review dates, evidence requirements, and executive reporting cadence.','vCISO / Advisor','Moderate',57,'Control Ownership',78,'Moderate');
    if(i.evidence==='weak')add('Create an audit-ready evidence index','Build a simple evidence register for controls, policies, response artifacts, vendor reviews, risk decisions, and AI governance artifacts.','CISO / Security Lead','High',45,'Audit Readiness',86,'Limited');
    if(i.cadence==='reactive')add('Establish monthly operational trust review','Move cybersecurity governance from event-driven reaction to recurring executive operating rhythm.','CEO / President','Moderate',30,'Governance Cadence',74,'High');
    add('Generate executive briefing artifact','Produce a concise board-ready summary covering what changed, why it matters, business impact, confidence, and recommended decisions.',i.recommendedOwner,'Moderate',0,'Executive Reporting',70,'High');
    return items.sort(function(a,b){return b.score-a.score}).slice(0,8);
  }
  function buildRisks(i,s,range){
    var risks=[];
    function add(title,body,owner,state){risks.push({title:title,body:body,owner:owner,state:state})}
    if(s.confidence<72)add('Evidence confidence below executive decision threshold','Leadership may be forced to make risk decisions without enough current, organized, and reviewable evidence.',i.recommendedOwner,'state-red');
    if(s.ai<75||i.concern==='ai')add('AI activity outside a mature governance boundary','Sensitive data, unclear approved-use rules, and incomplete oversight can create trust-state drift.','CIO / CTO','state-yellow');
    if(i.incident!=='high')add('Incident escalation chain not sufficiently tested','During a high-consequence event, delay in authority, communication, or recovery sequencing can increase disruption.','COO','state-red');
    if(i.concern==='vendor')add('Third-party exposure visibility incomplete','Vendor dependencies can create cascading operational risk when ownership and evidence are weak.','COO','state-yellow');
    if(risks.length<3)add('Operational exposure requires executive treatment','The directional exposure range is high enough to require explicit risk treatment and ownership.',i.recommendedOwner,'state-yellow');
    if(risks.length<3)add('Governance cadence may not match risk velocity','Cyber, AI, vendor, and compliance risks can move faster than quarterly review cycles.','CEO / President','state-yellow');
    return risks.slice(0,3);
  }
  function buildBubbles(i,s,range,framework,actions){
    var control=scorePick(i.controls,{low:42,moderate:68,high:86},68);
    var incident=scorePick(i.incident,{low:44,moderate:66,high:88},66);
    var evidence=scorePick(i.evidence,{weak:38,partial:67,strong:90},67);
    var ownership=(!i.owner||i.owner==='Unassigned')?45:82;
    var compliance=scorePick(i.compliance,{baseline:72,regulated:68,'highly-regulated':61},68)+(i.evidence==='strong'?10:0);
    var data=scorePick(i.dataSensitivity,{low:84,moderate:66,high:48},66);
    var velocity=scorePick(i.cadence,{reactive:43,monthly:72,quarterly:62,continuous:88},72);
    var load=100-Math.min(90,actions.reduce(function(n,a){return n+(a.severity==='High'?9:6)},0));
    return [
      ['posture','Operational Trust',s.trust,'Leadership readiness to make defensible cyber decisions'],
      ['ai','AI Governance',s.ai,'AI use inside or outside defined control boundaries'],
      ['confidence','Evidence Confidence',s.confidence,'How much depends on evidence versus assumptions'],
      ['exposure','Exposure Control',100-s.exposure,'Directional exposure pressure requiring treatment'],
      ['evidence','Evidence Maturity',evidence,'Current, organized, and reviewable evidence'],
      ['incident','Incident Readiness',incident,'Executive escalation and recovery confidence'],
      ['ownership','Ownership Clarity',ownership,'Named decision owners for unresolved risk'],
      ['controls','Control Ownership',control,'Policies and controls that are real, current, and owned'],
      ['compliance','Compliance Lens',pct(compliance),'Framework alignment: '+framework[0]],
      ['data','Data Sensitivity',data,'Operational consequence of sensitive data exposure'],
      ['velocity','Decision Velocity',velocity,'Speed of leadership action without chaos'],
      ['orchestration','Orchestration Load',load,'Remaining governance work requiring sequencing']
    ];
  }
  function buildMemory(i,s,range,actions,risks){
    return [
      {label:'Baseline briefing',value:i.date,body:i.orgName+' generated a '+i.reviewGoalLabel+' under '+i.industry+' context.'},
      {label:'Accepted evidence state',value:i.evidence,body:'Evidence maturity directly affects score confidence and audit defensibility.'},
      {label:'Unresolved risk count',value:String(risks.length),body:'Top risks remain visible until treated, accepted, transferred, escalated, or investigated.'},
      {label:'Open orchestration items',value:String(actions.length),body:'Action queue persists locally to support governance continuity.'},
      {label:'Exposure range',value:money(range[0])+' to '+money(range[1]),body:'Range is directional and based only on submitted inputs.'},
      {label:'Recommended owner',value:i.recommendedOwner,body:'Owner selection should be validated during executive review.'}
    ];
  }
  function buildJourney(i,s,actions){
    return [
      ['Assessment','Complete','Submitted operating context generated the current trust baseline.'],
      ['Executive Briefing','Active','Leadership has a what changed, why it matters, and what to do next briefing.'],
      ['Risk Prioritization','Active','Top risks and action queue are ranked by the orchestration engine.'],
      ['Roadmap Generation',actions.length>3?'Active':'Next','Convert the priority queue into 30, 60, and 90-day execution.'],
      ['Compliance Mapping',i.compliance==='baseline'?'Next':'Active','Align evidence and controls to the recommended framework lens.'],
      ['Incident Readiness',i.incident==='high'?'Complete':'Active','Validate escalation, communications, legal, and recovery decision rights.'],
      ['Executive Reporting','Active','Generate board-ready artifacts for leadership review.'],
      ['Continuous Governance',i.cadence==='continuous'?'Active':'Next','Preserve organizational memory and track drift over time.']
    ];
  }
  function routeAllowed(route){return ['overview','assessment','locked'].indexOf(route)>=0||!!state.payload}
  function setRoute(route){route=routes.indexOf(route)>=0?route:'overview'; if(!routeAllowed(route))route='locked'; qsa('.view').forEach(function(v){v.classList.toggle('active',v.id===route)}); qsa('[data-route]').forEach(function(a){a.classList.toggle('active',a.getAttribute('data-route')===route)}); location.hash=route; var app=$('app'); if(app)app.focus({preventScroll:true}); window.scrollTo({top:0,behavior:'smooth'}); if(route==='dashboard')advisorFor('posture')}
  function attachRouteClicks(){qsa('[data-route]').forEach(function(el){el.addEventListener('click',function(e){e.preventDefault(); setRoute(el.getAttribute('data-route'))})}); qsa('[data-topic]').forEach(function(el){el.addEventListener('click',function(){showDetail('Operating Doctrine',el.querySelector('b').textContent,el.querySelector('span').textContent,'Use this doctrine to keep CyberShield out of commodity cybersecurity positioning.','MJC applies governance-first cybersecurity leadership, vCISO judgment, and operational trust architecture.')})})}
  function renderStep(){var steps=qsa('.step'); steps.forEach(function(s,i){s.classList.toggle('active',i===state.step)}); var bar=$('progressBar'); if(bar)bar.style.width=((state.step+1)/6*100)+'%'; var label=$('stepLabel'); if(label)label.textContent='Step '+(state.step+1)+' of 6'; var prev=$('prevStep'),next=$('nextStep'),submit=$('submitAssessment'); if(prev)prev.disabled=state.step===0; if(next)next.style.display=state.step===5?'none':'inline-flex'; if(submit)submit.style.display=state.step===5?'inline-flex':'none'}
  function renderAll(){state.payload=state.payload||readPayload(); document.body.classList.toggle('has-data',!!state.payload); qsa('.requires-data').forEach(function(el){el.classList.toggle('disabled',!state.payload); el.setAttribute('aria-disabled',!state.payload)}); var nav=$('assessmentNav'); if(nav&&state.payload){nav.textContent='Assessment Complete'} else if(nav){nav.textContent='Assessment'}; if(!state.payload)return; renderBriefing(); renderDashboard(); renderActions(); renderMemory(); renderReports();}
  function renderBriefing(){var p=state.payload,i=p.inputs,s=p.scores,st=status(s.trust),ai=status(s.ai),conf=status(s.confidence),exp=status(100-s.exposure); var shell=$('briefingShell'); if(!shell)return; shell.innerHTML=''
    +'<div class="briefing-top">'
    +'<section class="panel brief-hero"><p class="eyebrow">Executive Operational Briefing</p><h1 id="briefingTitle">'+html(i.orgName)+' Executive Decision Brief</h1><p class="lead">'+html(i.personName)+', CyberShield generated this briefing from submitted inputs. It translates cyber, AI, evidence, and ownership ambiguity into operational decisions.</p><div class="meta"><span class="pill available">Available Now</span><span class="pill assisted">Executive Cyber Decision Intelligence</span><span class="pill boundary-label">'+html(i.reviewGoalLabel)+'</span><span class="pill boundary-label">'+html(i.date)+'</span></div></section>'
    +'<aside class="panel"><p class="eyebrow">Likely Exposure Range</p><h2>'+money(p.range[0])+' to '+money(p.range[1])+'</h2><p>Directional planning range based on submitted inputs. This is not verified telemetry, legal advice, or actuarial precision.</p><button class="btn secondary" data-route="reports" type="button">Open Reports</button></aside></div>'
    +'<section class="kpi-grid">'+kpi('Operational Trust',s.trust,st[0],st[1],'posture')+kpi('AI Governance',s.ai,ai[0],ai[1],'ai')+kpi('Confidence',s.confidence,conf[0],conf[1],'confidence')+kpi('Exposure Control',100-s.exposure,exp[0],exp[1],'exposure')+'</section>'
    +'<section class="briefing-grid">'
    +briefCard('What changed',p.briefing.whatChanged,'state-yellow','brief-what')
    +briefCard('Why it matters',p.briefing.whyMatters,'state-green','brief-why')
    +briefCard('Operational impact',p.briefing.operationalImpact,'state-red','brief-impact')
    +briefList('What leadership should do',p.briefing.recommendations,'priority-card','brief-decisions')
    +briefCard('Governance continuity',p.briefing.continuity,'state-yellow','brief-continuity')
    +briefCard('Confidence and framework',p.briefing.confidence+' '+p.briefing.framework,'state-green','brief-confidence')
    +'</section>';
    attachRouteClicks(); bindGeneratedClicks();
  }
  function kpi(title,score,label,cls,key){return '<button class="kpi '+cls+'" data-panel="'+key+'"><h3>'+html(title)+'</h3><div class="num">'+pct(score)+'%</div><p>'+html(label)+'</p><div class="heat"><span class="dot" style="'+dotStyle(score)+'"></span></div></button>'}
  function briefCard(title,body,cls,key){return '<button class="brief-card '+cls+'" data-brief="'+key+'"><h2>'+html(title)+'</h2><p>'+html(body)+'</p></button>'}
  function briefList(title,list,cls,key){return '<button class="brief-card '+cls+'" data-brief="'+key+'"><h2>'+html(title)+'</h2><ul>'+list.map(function(x){return '<li>'+html(x)+'</li>'}).join('')+'</ul></button>'}
  function renderDashboard(){var p=state.payload; var mode=$('dashboardMode'); if(mode)mode.textContent=p.inputs.reviewGoalLabel; var grid=$('bubbleGrid'); if(!grid)return; grid.innerHTML=p.bubbles.map(function(b){var st=status(b[2]); return '<button class="bubble '+st[1]+'" data-bubble="'+b[0]+'"><h3>'+html(b[1])+'</h3><div class="score">'+pct(b[2])+'%</div><div class="status">'+html(st[0])+'</div><div class="heat"><span class="dot" style="'+dotStyle(b[2])+'"></span></div><p>'+html(b[3])+'</p></button>'}).join(''); bindGeneratedClicks()}
  function renderActions(){var p=state.payload; var q=$('actionQueue'); if(q)q.innerHTML=p.actions.map(function(a,n){var cls=a.severity==='High'?'state-red':(a.severity==='Moderate'?'state-yellow':'state-green'); return '<button class="action-card '+cls+'" data-action="'+n+'"><h3>'+html(a.title)+'</h3><p>'+html(a.body)+'</p><div class="card-meta"><span class="pill severity">'+html(a.severity)+'</span><span class="pill">Age: '+a.age+' days</span><span class="pill">Stage: '+html(a.stage)+'</span><span class="pill owner">Owner: '+html(a.owner)+'</span><span class="pill">Confidence: '+html(a.confidence)+'</span></div></button>'}).join(''); var js=$('journeyList'); if(js)js.innerHTML=p.journey.map(function(j,n){var c=j[1]==='Complete'?'done':(j[1]==='Active'?'active':''); return '<button class="journey-item '+c+'" data-journey="'+n+'"><h3>'+html(j[0])+'</h3><p><b>'+html(j[1])+':</b> '+html(j[2])+'</p></button>'}).join(''); var sum=$('queueSummary'); if(sum)sum.textContent=p.actions.length+' ranked actions'; bindGeneratedClicks()}
  function renderMemory(){var p=state.payload; var ledger=$('memoryLedger'); if(ledger)ledger.innerHTML=p.memory.map(function(m,n){return '<button class="memory-card" data-memory="'+n+'"><h3>'+html(m.label)+'</h3><p><b>'+html(m.value)+':</b> '+html(m.body)+'</p></button>'}).join(''); var mc=$('memoryCount'); if(mc)mc.textContent=p.memory.length+' memory items'; var h=history(); var snaps=$('snapshotList'); if(snaps)snaps.innerHTML=h.length?h.map(function(x,n){return '<button class="memory-card" data-snapshot="'+n+'"><h3>'+html(x.org)+' | '+html(x.date)+'</h3><p><b>'+html(x.goal)+':</b> Operational Trust '+x.trust+'%, AI '+x.ai+'%, Confidence '+x.confidence+'%, Exposure '+x.exposure+'%.</p><p>'+html(x.top)+'</p></button>'}).join(''):'<p>No prior local snapshots yet.</p>'; bindGeneratedClicks()}
  function renderReports(){var list=$('reportList'); if(!list)return; list.innerHTML=Object.keys(reports).map(function(k){return '<button class="report-option '+(state.report===k?'active':'')+'" data-report="'+k+'"><h3>'+html(reports[k][0])+'</h3><p>'+html(reports[k][1])+'</p></button>'}).join(''); var title=$('reportTitle'); if(title)title.textContent=reports[state.report][0]; var text=reportText(state.report); var rt=$('reportText'); if(rt)rt.textContent=text; var email=$('emailReport'); if(email)email.href='mailto:?subject='+encodeURIComponent('CyberShield '+reports[state.report][0])+'&body='+encodeURIComponent(text.slice(0,1800)); bindReportClicks()}
  function reportText(type){var p=state.payload;if(!p)return ''; var i=p.inputs,s=p.scores,range=p.range; var label=reports[type][0]; var head='CYBERSHIELD '+label.toUpperCase()+'\n'+i.orgName+' | '+i.personName+' | '+i.date+'\nPrepared by Maximum Justice Cybersecurity\nPlatform: '+VERSION+'\n\n'; var body='EXECUTIVE BRIEFING\nWhat changed: '+p.briefing.whatChanged+'\nWhy it matters: '+p.briefing.whyMatters+'\nOperational impact: '+p.briefing.operationalImpact+'\nConfidence: '+p.briefing.confidence+'\n\nCURRENT OPERATIONAL STATE\nOperational Trust: '+s.trust+'%\nAI Governance: '+s.ai+'%\nEvidence Confidence: '+s.confidence+'%\nExposure Pressure: '+s.exposure+'%\nLikely Exposure Range: '+money(range[0])+' to '+money(range[1])+'\nFramework Lens: '+p.framework[0]+'\n\nWHAT LEADERSHIP SHOULD DO\n'+p.briefing.recommendations.map(function(x,n){return (n+1)+'. '+x}).join('\n')+'\n\nACTION ORCHESTRATION QUEUE\n'+p.actions.map(function(a,n){return (n+1)+'. '+a.title+'\n   Severity: '+a.severity+' | Age: '+a.age+' days | Stage: '+a.stage+' | Confidence: '+a.confidence+'\n   Owner: '+a.owner+'\n   Rationale: '+a.body}).join('\n')+'\n\nORGANIZATIONAL MEMORY\n'+p.memory.map(function(m){return '- '+m.label+': '+m.value+' | '+m.body}).join('\n')+'\n\nTOP EXECUTIVE RISKS\n'+p.risks.map(function(r,n){return (n+1)+'. '+r.title+'\n   Owner: '+r.owner+'\n   Why it matters: '+r.body}).join('\n')+'\n\nASSUMPTIONS AND LIMITATIONS\nThis static GitHub Pages prototype uses submitted inputs and local browser storage only. It does not ingest live telemetry, verify customer evidence, provide legal advice, or make autonomous decisions. Customer-entered information is separated from inferred analysis. Exposure ranges are directional planning ranges, not actuarial certainty.\n\nMJC SUPPORT PATH\nMaximum Justice Cybersecurity can provide vCISO advisory, security assessment, AI governance implementation, incident readiness, compliance readiness, evidence validation, and executive reporting support.\n';
    var add={
      board:'\nBOARD EMPHASIS\nFocus on governance accountability, exposure treatment, confidence limits, and executive cadence.\n',
      roadmap:'\n30, 60, 90-DAY ROADMAP\n30 days: validate evidence and assign owners.\n60 days: close highest-priority governance gaps.\n90 days: institutionalize review cadence and board reporting.\n',
      compliance:'\nCOMPLIANCE EMPHASIS\nMap controls, evidence, owners, and review dates against '+p.framework[0]+'. Avoid checkbox theater by linking each control to operational consequence.\n',
      ai:'\nAI GOVERNANCE EMPHASIS\nDefine approved tools, prohibited data, human approval points, prompt handling requirements, and escalation paths for AI-related incidents.\n',
      incident:'\nINCIDENT READINESS EMPHASIS\nValidate executive escalation, legal notification, customer communications, downtime decision rights, and recovery sequencing.\n',
      vendor:'\nVENDOR GOVERNANCE EMPHASIS\nRank critical vendors, collect evidence, map continuity dependencies, and assign annual review ownership.\n',
      audit:'\nAUDIT READINESS EMPHASIS\nCreate a current evidence register with owner, date, source confidence, and control mapping.\n',
      policy:'\nPOLICY PACKAGE EMPHASIS\nPrioritize access control, incident response, AI acceptable use, vendor management, data handling, backup validation, and executive reporting policies.\n'
    }[type]||'';
    return head+body+add;
  }
  function bindGeneratedClicks(){
    qsa('[data-panel]').forEach(function(el){el.onclick=function(){advisorFor(el.dataset.panel);setRoute('dashboard')}});
    qsa('[data-bubble]').forEach(function(el){el.onclick=function(){advisorFor(el.dataset.bubble)}});
    qsa('[data-action]').forEach(function(el){el.onclick=function(){var a=state.payload.actions[Number(el.dataset.action)]; showDetail(a.title,'Action Orchestration Item','Why this matters: '+a.body,'Owner: '+a.owner+' | Age: '+a.age+' days | Stage: '+a.stage+' | Confidence: '+a.confidence,'Next step: assign deadline, evidence requirement, and review cadence. MJC can convert this into a 30-day execution sprint.')}});
    qsa('[data-memory]').forEach(function(el){el.onclick=function(){var m=state.payload.memory[Number(el.dataset.memory)]; showDetail(m.label,'Organizational Memory',m.body,'Current value: '+m.value,'Use memory items to avoid one-time assessments and create governance continuity.')}});
    qsa('[data-journey]').forEach(function(el){el.onclick=function(){var j=state.payload.journey[Number(el.dataset.journey)]; showDetail(j[0],'Governance Journey',j[2],'Current state: '+j[1],'Move the organization through assessment, prioritization, roadmap, compliance, readiness, reporting, and continuous governance.')}});
    qsa('[data-brief]').forEach(function(el){el.onclick=function(){showDetail(el.querySelector('h2').textContent,'Executive Operational Briefing',el.innerText.replace(el.querySelector('h2').textContent,'').trim(),'This briefing format is the signature workflow: what changed, why it matters, operational impact, decisions, continuity, and confidence.','Use this format for executive reviews and board-ready reporting.')}});
    bindReportClicks(); attachRouteClicks();
  }
  function bindReportClicks(){qsa('[data-report]').forEach(function(btn){btn.onclick=function(e){e.preventDefault();state.report=btn.dataset.report;renderReports();}})}
  function advisorFor(key){var map={
    posture:['Operational Trust Posture','This is leadership readiness to make defensible cyber decisions, not a generic technical score.','Trust posture reflects evidence, owners, controls, response maturity, and cadence.','Work the top three orchestration items and assign risk treatment owners.','MJC can build the governance operating model and vCISO cadence.'],
    ai:['AI Governance Boundary','This estimates whether AI use is inside an intentional control boundary.','AI risk grows when sensitive data, autonomy, shadow usage, and weak policies combine.','Define approved tools, prohibited data, human review points, and escalation paths.','MJC can build AI governance and trust-state control boundaries.'],
    confidence:['Evidence Confidence','This estimates how much the output depends on reviewable evidence versus assumptions.','Low confidence does not mean low risk. It means leadership cannot prove enough yet.','Run a 30-day evidence validation sprint.','MJC can build audit-ready evidence and separate fact from inference.'],
    exposure:['Exposure Control','This converts submitted gaps into directional exposure pressure.','Ranges help executives act without pretending false precision.','Select risk treatment: mitigate, transfer, accept, escalate, or investigate.','MJC can refine exposure with business context and control validation.'],
    evidence:['Evidence Maturity','This reflects whether cyber evidence is current, organized, and reviewable.','Evidence converts opinion into defensible governance.','Create an evidence register with owners and review dates.','MJC can build evidence maps and board-ready reporting.'],
    incident:['Incident Readiness','This reflects executive ability to coordinate under disruption.','Most incidents fail through decision delay, unclear ownership, poor communication, and recovery confusion.','Run an executive tabletop.','MJC can facilitate incident readiness and escalation playbooks.'],
    ownership:['Ownership Clarity','This shows whether named people own risk treatment decisions.','Unowned risk becomes unresolved risk.','Assign a named executive owner to each top risk.','MJC can define RACI, governance cadence, and executive accountability.'],
    controls:['Control Ownership','This reflects whether policies and controls are real, current, and owned.','Generic policies create false confidence.','Replace generic language with owned controls and evidence requirements.','MJC can build policy and control packages.'],
    compliance:['Compliance Lens','This maps the organization to a practical framework lens.','Frameworks should create shared control language, not checkbox theater.','Map evidence, owners, and review dates to the framework.','MJC can align NIST, CMMC, HIPAA, GLBA, ISO, and customer requirements.'],
    data:['Data Sensitivity','This reflects operational consequence of sensitive data exposure.','Sensitive data amplifies AI, vendor, legal, and incident risk.','Map sensitive data flows and AI access.','MJC can support data governance and AI boundary design.'],
    velocity:['Decision Velocity','This estimates how quickly leadership can act without chaos.','Fast bad decisions and slow good decisions both create risk.','Create decision gates and escalation thresholds.','MJC can define authority, escalation, and reporting thresholds.'],
    orchestration:['Orchestration Load','This estimates how much governance work still requires leadership sequencing.','The platform becomes infrastructure when it creates operational momentum.','Work the top queue items before adding initiatives.','MJC can turn the queue into an execution sprint.']
  }; var a=map[key]||map.posture; var t=$('advisorTitle'),m=$('advisorMeaning'),w=$('advisorWhy'),ac=$('advisorAction'),mj=$('advisorMjc'); if(t)t.textContent=a[0]; if(m)m.textContent=a[1]; if(w)w.textContent=a[2]; if(ac)ac.textContent=a[3]; if(mj)mj.textContent=a[4];}
  function showDetail(title,kicker,meaning,why,action){$('detailKicker').textContent=kicker||'Operational Detail'; $('detailTitle').textContent=title||'Detail'; $('detailBody').innerHTML='<h3>What this means</h3><p>'+html(meaning)+'</p><h3>Why this matters</h3><p>'+html(why)+'</p><h3>Next best action</h3><p>'+html(action)+'</p>'; $('detailModal').hidden=false; $('closeDetail').focus()}
  function closeDetail(){$('detailModal').hidden=true}
  function boot(){state.payload=readPayload(); renderStep(); attachRouteClicks(); renderAll(); var initial=(location.hash||'#overview').slice(1); if(state.payload&&initial==='assessment')initial='briefing'; setRoute(initial); $('nextStep').onclick=function(){state.step=clamp(state.step+1,0,5);renderStep()}; $('prevStep').onclick=function(){state.step=clamp(state.step-1,0,5);renderStep()}; $('assessmentForm').onsubmit=function(e){e.preventDefault();state.payload=makePayload();savePayload(state.payload);renderAll();setRoute('briefing')}; $('resetBtn').onclick=function(){clearPayload();state={step:0,payload:null,report:'executive'};renderStep();renderAll();setRoute('assessment')}; $('printReport').onclick=function(){window.print()}; $('downloadReport').onclick=function(){var text=$('reportText').textContent||'';var blob=new Blob([text],{type:'text/plain'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='CyberShield-'+reports[state.report][0].replace(/\s+/g,'-')+'.txt';document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},0)}; $('closeDetail').onclick=closeDetail; $('detailOk').onclick=closeDetail; $('detailModal').addEventListener('click',function(e){if(e.target===$('detailModal'))closeDetail()}); window.addEventListener('hashchange',function(){setRoute((location.hash||'#overview').slice(1))});}
  try{if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot()}catch(err){document.body.innerHTML='<main style="max-width:900px;margin:4rem auto;padding:2rem;color:white;background:#07111f;border:1px solid #74d7ff;border-radius:24px;font-family:Arial,sans-serif"><h1>CyberShield Recovery Mode</h1><p>The app caught a startup error instead of showing a blank white screen.</p><pre style="white-space:pre-wrap;color:#ffd5d5">'+html(err&&err.message?err.message:err)+'</pre><button onclick="localStorage.clear();location.reload()" style="min-height:44px;padding:12px 18px;border-radius:999px;border:0;background:#74d7ff;font-weight:800">Clear Local Data and Reload</button></main>'}
})();
