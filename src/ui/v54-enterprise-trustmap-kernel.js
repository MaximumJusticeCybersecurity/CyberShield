const V54_SCENARIOS = {
  cmmc_applicability: {
    label: 'CMMC Applicability Trust Check',
    orgScore: 72,
    movement: '+8%',
    distribution: { strong: 32, moderate: 46, weak: 15, critical: 7 },
    drivers: ['Unknown CUI/FCI handling', 'Unverified contract flow-downs', 'System scope uncertainty', 'MSP claim dependency'],
    risks: [
      ['CUI / FCI Indicator', 'High'], ['Contract Flow-Down', 'High'], ['System Scope', 'Medium'], ['Likely CMMC Level', 'Medium']
    ],
    domains: [
      { id:'cmmc', name:'CMMC & Compliance', icon:'shield', score:68, status:'Moderate', assets:[['clauses','Contract Clauses','Moderate'],['fci','FCI Handling','Weak'],['cui','CUI Indicator','Weak'],['level','Likely Level','Moderate']] },
      { id:'data', name:'Data & Information', icon:'database', score:61, status:'Moderate', assets:[['cuiData','CUI Data','Weak'],['fciData','FCI Data','Moderate'],['scopeData','System Scope Data','Weak'],['records','Contract Records','Strong']] },
      { id:'third', name:'Third Parties', icon:'handshake', score:58, status:'Moderate', assets:[['prime','Prime Contractor','Moderate'],['msp','MSP / IT Provider','Weak'],['vendor','Vendor Claims','Weak'],['advisor','vCISO Review','Strong']] },
      { id:'identity', name:'Identity & Access', icon:'identity', score:74, status:'Strong', assets:[['mfa','MFA','Moderate'],['admin','Privileged Accounts','Weak'],['owner','Accountable Owner','Strong'],['approver','Approver Authority','Moderate']] },
      { id:'infra', name:'Cloud & Infrastructure', icon:'cloud', score:70, status:'Strong', assets:[['network','Network Boundary','Moderate'],['devices','Managed Devices','Moderate'],['cloud','Cloud Apps','Strong'],['backup','Backup Systems','Moderate']] },
      { id:'reports', name:'Proof & Reports', icon:'report', score:66, status:'Moderate', assets:[['appReport','Applicability Report','Moderate'],['decision','Decision Record','Strong'],['verification','Verification Actions','Moderate'],['roadmap','30/60/90 Roadmap','Moderate']] }
    ]
  },
  cmmc_readiness: {
    label: 'CMMC Readiness Trust Check', orgScore: 54, movement: '-6%', distribution:{strong:18, moderate:42, weak:27, critical:13}, drivers:['CUI boundary uncertainty','Stale SSP','Unverified control evidence','Control owner gaps'], risks:[['CUI Boundary','Critical'],['SSP Freshness','High'],['Control Evidence','High'],['POA&M Reliability','Medium']], domains:[
      {id:'cmmc',name:'CMMC & Compliance',icon:'shield',score:49,status:'Weak',assets:[['ssp','SSP','Weak'],['poam','POA&M','Weak'],['controls','Control Evidence','Critical'],['owners','Control Owners','Moderate']]},
      {id:'data',name:'Data & Information',icon:'database',score:44,status:'Weak',assets:[['cui','CUI Boundary','Critical'],['assets','Asset Inventory','Weak'],['lineage','Data Lineage','Weak'],['classification','Classification','Moderate']]},
      {id:'identity',name:'Identity & Access',icon:'identity',score:62,status:'Moderate',assets:[['mfa','MFA Coverage','Moderate'],['admin','Privileged Accounts','Weak'],['users','User Inventory','Moderate'],['service','Service Accounts','Weak']]},
      {id:'infra',name:'Cloud & Infrastructure',icon:'cloud',score:58,status:'Moderate',assets:[['endpoints','Endpoints','Moderate'],['cloud','Cloud Systems','Moderate'],['logging','Logging','Weak'],['backup','Backup Validation','Weak']]},
      {id:'third',name:'Third Parties',icon:'handshake',score:51,status:'Weak',assets:[['msp','MSP Claims','Weak'],['vendors','Vendor Evidence','Weak'],['contracts','Contracts','Moderate'],['shared','Shared Responsibility','Weak']]},
      {id:'reports',name:'Proof & Reports',icon:'report',score:55,status:'Moderate',assets:[['readiness','Readiness Report','Moderate'],['decision','Decision Record','Moderate'],['roadmap','Remediation Roadmap','Moderate'],['budget','Spend Decision','Weak']]}
    ]
  },
  payment_trust: {
    label:'Community Bank Payment Trust Verification', orgScore:49, movement:'-11%', distribution:{strong:16, moderate:34, weak:31, critical:19}, drivers:['Unverified payment destination','Vendor identity uncertainty','Approver authority gap','Audit trail weakness'], risks:[['Payment Destination','Critical'],['Vendor Identity','High'],['Approver Authority','High'],['Audit Trail','Medium']], domains:[
      {id:'payments',name:'Payments & Finance',icon:'money',score:39,status:'Critical',assets:[['destination','Payment Destination','Critical'],['instructions','Payment Instructions','Weak'],['history','Prior Payment History','Moderate'],['wire','Payment Action','Critical']]},
      {id:'identity',name:'Identity & Access',icon:'identity',score:46,status:'Weak',assets:[['vendorId','Vendor Identity','Weak'],['approver','Approver Authority','Weak'],['contact','Approved Contact','Critical'],['mfa','MFA','Moderate']]},
      {id:'third',name:'Third Parties',icon:'handshake',score:42,status:'Weak',assets:[['vendor','Vendor','Weak'],['bank','Banking Partner','Moderate'],['ap','AP Workflow','Weak'],['contract','Contract Owner','Moderate']]},
      {id:'data',name:'Data & Information',icon:'database',score:55,status:'Moderate',assets:[['record','Vendor Record','Moderate'],['email','Email Request','Weak'],['audit','Audit Trail','Moderate'],['policy','Payment Policy','Moderate']]},
      {id:'reports',name:'Proof & Reports',icon:'report',score:60,status:'Moderate',assets:[['payReport','Payment Trust Report','Moderate'],['decision','Decision Record','Moderate'],['verification','Call-Back Evidence','Weak'],['roadmap','Control Tasking','Moderate']]},
      {id:'infra',name:'Cloud & Infrastructure',icon:'cloud',score:68,status:'Strong',assets:[['mail','Email Security','Moderate'],['erp','ERP / Accounting','Strong'],['logs','System Logs','Moderate'],['archive','Archive','Strong']]}
    ]
  },
  vendor_ai_access: {
    label:'Manufacturing Vendor AI Access Trust', orgScore:76, movement:'+14%', distribution:{strong:42, moderate:38, weak:14, critical:6}, drivers:['Access scope still conditional','Operational data sensitivity','Maintenance-window dependency','AI tool boundary'], risks:[['Access Scope','Medium'],['Production Data','High'],['AI Tool Boundary','Medium'],['Maintenance Window','Medium']], domains:[
      {id:'endpoints',name:'Endpoints',icon:'endpoint',score:78,status:'Strong',assets:[['workstations','Workstations','Strong'],['servers','Servers','Moderate'],['mobile','Mobile Devices','Strong'],['iot','IoT Devices','Weak']]},
      {id:'automation',name:'AI & Automation',icon:'ai',score:69,status:'Moderate',assets:[['aiTool','AI Tool','Moderate'],['llm','LLM Access','Moderate'],['agent','AI Agent','Weak'],['automation','Automations','Moderate']]},
      {id:'third',name:'Third Parties',icon:'handshake',score:73,status:'Strong',assets:[['vendor','Maintenance Vendor','Strong'],['contractor','Contractor','Moderate'],['partner','Partner','Strong'],['integration','Integration','Moderate']]},
      {id:'data',name:'Data & Information',icon:'database',score:64,status:'Moderate',assets:[['ops','Operational Data','Weak'],['maintenance','Maintenance Ticket','Strong'],['classification','Data Classification','Moderate'],['logs','Access Logs','Moderate']]},
      {id:'infra',name:'Cloud & Infrastructure',icon:'cloud',score:81,status:'Strong',assets:[['prod','Production System','Moderate'],['network','Network Segment','Strong'],['vpn','Vendor VPN','Moderate'],['monitoring','Monitoring','Strong']]},
      {id:'reports',name:'Proof & Reports',icon:'report',score:74,status:'Strong',assets:[['accessReport','Vendor Access Report','Strong'],['decision','Decision Record','Strong'],['conditions','Access Conditions','Moderate'],['owner','System Owner Approval','Strong']]}
    ]
  },
  healthcare_data: {
    label:'Healthcare Data / Vendor / AI Trust', orgScore:52, movement:'-4%', distribution:{strong:21, moderate:41, weak:25, critical:13}, drivers:['Permitted-use uncertainty','Vendor authorization gap','Patient-data exposure consequence','Audit trail weakness'], risks:[['Permitted Use','Critical'],['Vendor Authorization','High'],['Patient Data Source','High'],['Access Scope','Medium']], domains:[
      {id:'health',name:'Healthcare Data Trust',icon:'health',score:43,status:'Weak',assets:[['patient','Patient Data','Critical'],['clinical','Clinical-Adjacent Data','Weak'],['ops','Operational Data','Moderate'],['staff','Staff Data','Moderate']]},
      {id:'third',name:'Third Parties',icon:'handshake',score:48,status:'Weak',assets:[['vendor','Vendor','Weak'],['workflow','AI Workflow','Weak'],['baa','Agreement / Authorization','Moderate'],['support','Support Access','Weak']]},
      {id:'identity',name:'Identity & Access',icon:'identity',score:58,status:'Moderate',assets:[['approval','Data Owner Approval','Weak'],['user','User Access','Moderate'],['priv','Privileged Access','Weak'],['audit','Access Review','Moderate']]},
      {id:'data',name:'Data & Information',icon:'database',score:45,status:'Weak',assets:[['permitted','Permitted Use Claim','Critical'],['source','Data Source','Weak'],['lineage','Data Lineage','Weak'],['retention','Retention Context','Moderate']]},
      {id:'automation',name:'AI & Automation',icon:'ai',score:55,status:'Moderate',assets:[['ai','AI Workflow','Weak'],['model','Model Output','Moderate'],['review','Human Review','Moderate'],['guardrail','Use Constraint','Moderate']]},
      {id:'reports',name:'Proof & Reports',icon:'report',score:61,status:'Moderate',assets:[['healthReport','Healthcare Data Report','Moderate'],['decision','Decision Record','Moderate'],['verification','Verification Path','Weak'],['roadmap','Remediation Roadmap','Moderate']]}
    ]
  },
  ai_output: {
    label:'AI Output Trust', orgScore:63, movement:'+5%', distribution:{strong:28, moderate:48, weak:18, critical:6}, drivers:['Source data confidence','Human review depth','Policy-use boundary','Client-facing consequence'], risks:[['Source Data','High'],['Human Review','Medium'],['Client-Facing Output','Medium'],['Policy Boundary','Medium']], domains:[
      {id:'automation',name:'AI & Automation',icon:'ai',score:57,status:'Moderate',assets:[['output','AI Output','Moderate'],['llm','LLM Access','Moderate'],['agent','AI Agent','Weak'],['prompt','Prompt Context','Moderate']]},
      {id:'data',name:'Data & Information',icon:'database',score:52,status:'Moderate',assets:[['source','Source Data','Weak'],['context','Business Context','Moderate'],['client','Client Data','Moderate'],['citation','Citation / Source','Weak']]},
      {id:'identity',name:'Identity & Access',icon:'identity',score:66,status:'Moderate',assets:[['reviewer','Human Reviewer','Moderate'],['owner','Business Owner','Strong'],['authority','Approval Authority','Moderate'],['usage','User Role','Strong']]},
      {id:'reports',name:'Proof & Reports',icon:'report',score:70,status:'Strong',assets:[['aiReport','AI Output Report','Strong'],['decision','Decision Record','Moderate'],['constraints','Use Constraints','Moderate'],['roadmap','Safe-Use Path','Strong']]},
      {id:'third',name:'Third Parties',icon:'handshake',score:60,status:'Moderate',assets:[['vendorModel','AI Vendor','Moderate'],['plugin','Plugin / Connector','Weak'],['client','Client Stakeholder','Moderate'],['advisor','Reviewer','Strong']]},
      {id:'infra',name:'Cloud & Infrastructure',icon:'cloud',score:67,status:'Moderate',assets:[['app','AI App','Moderate'],['logs','Output Logs','Moderate'],['storage','Storage','Strong'],['guardrails','Guardrails','Moderate']]}
    ]
  }
};

const V54_ORDER = ['cmmc_applicability','cmmc_readiness','payment_trust','vendor_ai_access','healthcare_data','ai_output'];
let v54Scale = Number(sessionStorage.getItem('v54Scale') || 0.82);
let v54Pan = JSON.parse(sessionStorage.getItem('v54Pan') || '{"x":0,"y":0}');
let v54Mode = sessionStorage.getItem('v54Mode') || 'kernel';
let v54Domain = sessionStorage.getItem('v54Domain') || null;
let v54Asset = sessionStorage.getItem('v54Asset') || null;
let v54Trend = sessionStorage.getItem('v54Trend') || 'Daily';
let v54Dragging = false;
let v54DragStart = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
const esc = (value) => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
const activeScenarioId = () => localStorage.getItem('cyberShieldV53Scenario') || 'cmmc_applicability';
const activeScenario = () => V54_SCENARIOS[activeScenarioId()] || V54_SCENARIOS.cmmc_applicability;

function orgName() {
  try {
    return JSON.parse($('#adminPayload')?.textContent || '{}')?.state?.org || $('#setOrg')?.value || $('#obOrg')?.value || 'Your Organization';
  } catch { return $('#setOrg')?.value || $('#obOrg')?.value || 'Your Organization'; }
}

function statusClass(status) {
  const s = String(status).toLowerCase();
  if (s.includes('critical')) return 'critical';
  if (s.includes('weak')) return 'weak';
  if (s.includes('moderate') || s.includes('conditional')) return 'moderate';
  if (s.includes('strong') || s.includes('trusted')) return 'strong';
  return 'moderate';
}
function statusColor(status) {
  return { strong:'#18d486', moderate:'#f4b625', weak:'#ff7a22', critical:'#ff3c35' }[statusClass(status)] || '#42d7ff';
}
function activeDomain() {
  const s = activeScenario();
  return s.domains.find(d => d.id === v54Domain) || s.domains[0];
}
function activeAsset() {
  const d = activeDomain();
  return d.assets.find(a => a[0] === v54Asset) || d.assets[0];
}
function saveViewState() {
  sessionStorage.setItem('v54Scale', String(v54Scale));
  sessionStorage.setItem('v54Pan', JSON.stringify(v54Pan));
  sessionStorage.setItem('v54Mode', v54Mode);
  sessionStorage.setItem('v54Trend', v54Trend);
  if (v54Domain) sessionStorage.setItem('v54Domain', v54Domain); else sessionStorage.removeItem('v54Domain');
  if (v54Asset) sessionStorage.setItem('v54Asset', v54Asset); else sessionStorage.removeItem('v54Asset');
}

function installV54Styles() {
  if ($('#v54-trustmap-style')) return;
  const style = document.createElement('style');
  style.id = 'v54-trustmap-style';
  style.textContent = `
    #trustmap .section-head{display:none!important}.v54-shell{display:grid;grid-template-columns:340px minmax(720px,1fr) 340px;gap:14px;align-items:stretch}.v54-panel{background:linear-gradient(180deg,rgba(8,29,49,.98),rgba(4,14,24,.99));border:1px solid rgba(66,215,255,.28);border-radius:22px;padding:18px;box-shadow:0 18px 44px rgba(0,0,0,.34);min-width:0}.v54-title{font-size:1.8rem;line-height:1.05;margin:0 0 7px}.v54-sub{color:#8fd6ff;font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;font-weight:900}.v54-score-ring{width:170px;height:170px;border-radius:50%;display:grid;place-items:center;margin:16px auto;background:conic-gradient(#18d486 calc(var(--score)*1%),rgba(9,31,53,.9) 0);box-shadow:0 0 28px rgba(24,212,134,.18)}.v54-score-inner{width:126px;height:126px;border-radius:50%;display:grid;place-items:center;text-align:center;background:#061726;border:1px solid rgba(66,215,255,.25)}.v54-score-inner strong{font-size:2.6rem}.v54-list{display:grid;gap:9px}.v54-row{display:grid;grid-template-columns:auto 1fr auto;gap:9px;align-items:center;border-bottom:1px solid rgba(66,215,255,.12);padding:8px 0;color:#f5fbff}.v54-dot{width:13px;height:13px;border-radius:50%;box-shadow:0 0 12px currentColor}.v54-risk-level{font-weight:900}.v54-map-panel{position:relative;min-height:760px;overflow:hidden;background:radial-gradient(circle at 50% 50%,rgba(66,215,255,.18),transparent 15rem),linear-gradient(145deg,rgba(4,14,24,.98),rgba(6,23,38,.99));border:1px solid rgba(66,215,255,.25);border-radius:24px}.v54-map-head{position:absolute;top:10px;left:16px;right:16px;z-index:20;display:flex;justify-content:space-between;gap:10px;align-items:flex-start;pointer-events:none}.v54-map-head h2{margin:0;text-align:center;font-size:1.08rem;color:#42d7ff;letter-spacing:.08em;text-transform:uppercase}.v54-map-head span{display:block;text-align:center;color:#76e4a1;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase}.v54-controls{position:absolute;left:16px;bottom:16px;z-index:30;display:flex;gap:7px;flex-wrap:wrap}.v54-controls button,.v54-time button{padding:7px 10px;border-radius:999px;background:rgba(6,23,38,.88);border:1px solid rgba(66,215,255,.35);color:#f5fbff}.v54-controls button.active,.v54-time button.active{background:rgba(66,215,255,.2);border-color:#42d7ff}.v54-viewport{position:absolute;inset:0;overflow:hidden;cursor:grab}.v54-viewport.dragging{cursor:grabbing}.v54-world{position:absolute;left:50%;top:50%;width:1280px;height:920px;transform-origin:center center;transition:transform .18s ease}.v54-stars{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(66,215,255,.55) 1px,transparent 1.7px),linear-gradient(rgba(66,215,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(66,215,255,.035) 1px,transparent 1px);background-size:54px 54px,52px 52px,52px 52px;opacity:.62}.v54-ring{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border:1px solid rgba(66,215,255,.16);border-radius:50%;pointer-events:none}.v54-ring.r1{width:310px;height:310px;background:rgba(66,215,255,.035)}.v54-ring.r2{width:560px;height:560px}.v54-ring.r3{width:820px;height:820px}.v54-kernel{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:210px;height:190px;z-index:12;display:grid;place-items:center;text-align:center;padding:16px;background:radial-gradient(circle at 50% 20%,rgba(66,215,255,.34),rgba(5,18,32,.98));border:1px solid rgba(66,215,255,.85);clip-path:polygon(50% 0,86% 12%,95% 45%,78% 78%,50% 100%,22% 78%,5% 45%,14% 12%);box-shadow:0 0 34px rgba(66,215,255,.65)}.v54-kernel img{width:72px;height:72px;object-fit:contain;filter:drop-shadow(0 0 14px rgba(66,215,255,.85))}.v54-kernel strong{font-size:1rem}.v54-kernel small{display:block;color:#d8ecf8}.v54-domain,.v54-asset{position:absolute;transform:translate(-50%,-50%);z-index:10;border:1px solid rgba(66,215,255,.36);background:linear-gradient(180deg,rgba(14,54,84,.96),rgba(5,20,36,.99));border-radius:18px;padding:10px;text-align:center;color:#f5fbff;box-shadow:0 18px 36px rgba(0,0,0,.28);cursor:pointer;transition:transform .16s,border-color .16s,box-shadow .16s}.v54-domain{width:150px;min-height:126px}.v54-asset{width:126px;min-height:96px;font-size:.82rem;z-index:9}.v54-domain:hover,.v54-domain.active,.v54-asset:hover,.v54-asset.active{transform:translate(-50%,-50%) scale(1.07);border-color:#42d7ff;box-shadow:0 0 0 3px rgba(66,215,255,.15),0 0 28px rgba(66,215,255,.32)}.v54-icon{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;margin:0 auto 6px;border:1px solid rgba(66,215,255,.55);background:rgba(66,215,255,.12);font-size:1.25rem}.v54-status{font-size:.72rem;font-weight:900;text-transform:uppercase}.v54-edge-layer{position:absolute;inset:0;z-index:4;pointer-events:none}.v54-edge-layer path{fill:none;stroke-width:1.55;filter:drop-shadow(0 0 4px currentColor);opacity:.82}.v54-edge-layer path.strong{stroke:#18d486}.v54-edge-layer path.moderate{stroke:#f4b625}.v54-edge-layer path.weak{stroke:#ff7a22}.v54-edge-layer path.critical{stroke:#ff3c35}.v54-edge-layer path.neutral{stroke:#42d7ff;stroke-dasharray:4 5;opacity:.45}.v54-distribution{height:152px}.v54-trend{height:150px;width:100%}.v54-time{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0 10px}.v54-detail{margin-top:12px;border:1px solid rgba(66,215,255,.22);border-radius:16px;padding:13px;background:rgba(0,0,0,.18)}.v54-legend{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v54-legend span{font-size:.72rem;border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:5px 8px}.v54-card{background:rgba(255,255,255,.06);border:1px solid rgba(66,215,255,.2);border-radius:16px;padding:12px;margin-top:10px}.v54-card strong{display:block}.v54-scroll-note{position:absolute;right:18px;bottom:18px;color:#8fd6ff;font-size:.72rem;z-index:22}.summary-card .v54-mini-scale{height:12px;border:1px solid rgba(255,255,255,.22);border-radius:999px;background:linear-gradient(90deg,#ff7474 0 33%,#ffd166 33% 67%,#76e4a1 67% 100%);position:relative;margin:7px 0}.summary-card .v54-mini-scale span{position:absolute;top:50%;width:16px;height:16px;border-radius:50%;background:#061726;border:3px solid #f5fbff;transform:translate(-50%,-50%);box-shadow:0 0 12px rgba(66,215,255,.65)}.option-card strong{display:block!important;margin-bottom:8px!important}.option-card span{display:block!important}@media(max-width:1180px){.v54-shell{grid-template-columns:1fr}.v54-map-panel{min-height:720px}.v54-world{width:1200px;height:860px}}@media(max-width:720px){.v54-map-panel{min-height:680px}.v54-world{width:1120px;height:820px}.v54-domain{width:140px}.v54-asset{width:118px}.v54-controls{left:10px;bottom:10px}.v54-panel{padding:14px}}
  `;
  document.head.appendChild(style);
}

function applyWorldTransform() {
  const world = $('#v54World');
  if (!world) return;
  world.style.transform = `translate(calc(-50% + ${v54Pan.x}px), calc(-50% + ${v54Pan.y}px)) scale(${v54Scale})`;
  $$('.v54-controls [data-v54-mode]').forEach(b => b.classList.toggle('active', b.dataset.v54Mode === v54Mode));
}

function domainPosition(index, total=6, radius=300) {
  const start = -90;
  const angle = (start + index * (360 / total)) * Math.PI / 180;
  return { x: 640 + Math.cos(angle) * radius, y: 460 + Math.sin(angle) * radius };
}
function assetPosition(domainIndex, assetIndex, totalAssets=4) {
  const d = domainPosition(domainIndex, 6, 300);
  const angleBase = (-90 + domainIndex * 60) * Math.PI / 180;
  const offset = (assetIndex - (totalAssets - 1) / 2) * 0.33;
  const angle = angleBase + offset;
  return { x: d.x + Math.cos(angle) * 130, y: d.y + Math.sin(angle) * 130 };
}
function pathBetween(a,b, cls='neutral', dash=false) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const cx = 640 + (mx - 640) * 0.12;
  const cy = 460 + (my - 460) * 0.12;
  return `<path class="${cls}" ${dash ? 'stroke-dasharray="5 5"' : ''} d="M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}"/>`;
}
function icon(type) {
  return { identity:'◉', cloud:'☁', handshake:'◇', ai:'◎', database:'▣', endpoint:'▤', shield:'⬟', report:'▨', money:'$', health:'✚' }[type] || '◇';
}

function adjustedScore(base) {
  const payload = (() => { try { return JSON.parse($('#adminPayload')?.textContent || '{}'); } catch { return {}; } })();
  const ev = payload?.state?.evidence || '';
  const cmmcAnswers = (() => { try { return JSON.parse(localStorage.getItem('cyberShieldV53CmmcAnswers') || '{}'); } catch { return {}; } })();
  let score = base;
  if (ev === 'high') score += 7;
  if (ev === 'low') score -= 9;
  const unknownCount = Object.values(cmmcAnswers).filter(v => String(v).toLowerCase().includes('don')).length;
  if (activeScenarioId().includes('cmmc')) score -= unknownCount * 2;
  return Math.max(15, Math.min(95, Math.round(score)));
}
function scenarioWithAdjustedScore() {
  const s = activeScenario();
  return { ...s, orgScore: adjustedScore(s.orgScore) };
}

function distributionSvg(s) {
  const parts = [s.distribution.strong, s.distribution.moderate, s.distribution.weak, s.distribution.critical];
  const colors = ['#18d486','#f4b625','#ff7a22','#ff3c35'];
  let offset = 25;
  const circles = parts.map((p,i) => { const c = p; const el = `<circle cx="76" cy="76" r="52" fill="none" stroke="${colors[i]}" stroke-width="18" stroke-dasharray="${c} ${100-c}" stroke-dashoffset="${offset}" pathLength="100" transform="rotate(-90 76 76)"/>`; offset -= c; return el; }).join('');
  return `<svg class="v54-distribution" viewBox="0 0 152 152" aria-hidden="true"><circle cx="76" cy="76" r="52" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="18"/>${circles}<text x="76" y="72" text-anchor="middle" fill="#d8ecf8" font-size="10">TOTAL ASSETS</text><text x="76" y="94" text-anchor="middle" fill="#f5fbff" font-size="28" font-weight="900">46</text></svg>`;
}
function trendSvg(score, period) {
  const count = {Hourly:12,Daily:16,Weekly:14,Monthly:12}[period] || 16;
  const points = Array.from({length:count}, (_,i) => {
    const wave = Math.sin(i * 1.3) * 5;
    const drift = (i - count/2) * (score >= 70 ? .5 : score < 55 ? -.1 : .25);
    return Math.max(20, Math.min(92, score - 5 + wave + drift));
  });
  const path = points.map((v,i) => `${i===0?'M':'L'}${10 + i*(280/(count-1))} ${110 - v}`).join(' ');
  return `<svg class="v54-trend" viewBox="0 0 310 130"><path d="M10 110H300M10 85H300M10 60H300M10 35H300" stroke="rgba(66,215,255,.1)"/><path d="${path}" fill="none" stroke="#42d7ff" stroke-width="3"/><circle cx="${10+(count-1)*(280/(count-1))}" cy="${110-points[count-1]}" r="5" fill="#42d7ff"/></svg>`;
}

function leftPanel(s) {
  return `<aside class="v54-panel"><h1 class="v54-title">TRUST MAP</h1><div class="v54-sub">real-time operational trust visibility</div><section class="v54-card"><div class="v54-sub">Organizational Trust Score</div><div class="v54-score-ring" style="--score:${s.orgScore}"><div class="v54-score-inner"><strong>${s.orgScore}</strong><span>/100</span></div></div><div class="v54-list"><div class="v54-row"><span class="v54-dot" style="color:#18d486;background:#18d486"></span><span>Strong</span><strong>${s.distribution.strong}%</strong></div><div class="v54-row"><span class="v54-dot" style="color:#f4b625;background:#f4b625"></span><span>Moderate</span><strong>${s.distribution.moderate}%</strong></div><div class="v54-row"><span class="v54-dot" style="color:#ff7a22;background:#ff7a22"></span><span>Weak</span><strong>${s.distribution.weak}%</strong></div><div class="v54-row"><span class="v54-dot" style="color:#ff3c35;background:#ff3c35"></span><span>Critical</span><strong>${s.distribution.critical}%</strong></div></div></section><section class="v54-card"><div class="v54-sub">Current Trust Movement</div><h3>${esc(s.movement)} since last demo period</h3><p>Scenario and onboarding answers change this trust picture.</p></section><section class="v54-card"><div class="v54-sub">Top Trust Break Drivers</div><div class="v54-list">${s.drivers.map((d,i)=>`<div class="v54-row"><span class="v54-dot" style="color:${['#ff3c35','#ff7a22','#f4b625','#42d7ff'][i]};background:currentColor"></span><span>${esc(d)}</span><strong>${i===0?'Critical':i<2?'High':'Medium'}</strong></div>`).join('')}</div></section></aside>`;
}
function rightPanel(s) {
  const selectedD = activeDomain();
  const selectedA = activeAsset();
  const detail = v54Mode === 'object' ? selectedA : null;
  return `<aside class="v54-panel"><section><div class="v54-sub">Trust Level Distribution</div>${distributionSvg(s)}</section><section class="v54-card"><div class="v54-sub">Active Risks</div><div class="v54-list">${s.risks.map(([n,l])=>`<div class="v54-row"><span class="v54-dot" style="color:${statusColor(l)};background:currentColor"></span><span>${esc(n)}</span><strong class="v54-risk-level" style="color:${statusColor(l)}">${esc(l)}</strong></div>`).join('')}</div></section><section class="v54-card"><div class="v54-sub">Trend Line Over Time</div><div class="v54-time">${['Hourly','Daily','Weekly','Monthly'].map(p=>`<button type="button" data-v54-trend="${p}" class="${v54Trend===p?'active':''}">${p}</button>`).join('')}</div>${trendSvg(s.orgScore, v54Trend)}</section><section class="v54-detail"><div class="v54-sub">${detail ? 'Layer 3 Object Detail' : 'Selected Detail'}</div><h3>${detail ? esc(detail[1]) : esc(selectedD.name)}</h3><p><strong>Status:</strong> ${detail ? esc(detail[2]) : esc(selectedD.status)}</p><p><strong>Owner:</strong> ${detail ? 'Assigned owner / scenario lead' : 'CyberShield owner / domain owner'}</p><p><strong>If wrong:</strong> ${esc(s.risks[0][0])} can drive ${esc(s.consequence || 'operational consequence')}.</p><p><strong>Improve:</strong> verify owner, source, scope, freshness, and decision record before action.</p><div class="v54-legend"><span>Green strong</span><span>Yellow moderate</span><span>Orange weak</span><span>Red critical</span></div></section></aside>`;
}

function mapCenter(s) {
  const center = {x:640,y:460};
  const domains = s.domains.map((d,i)=>({d,i,...domainPosition(i)}));
  const assets = domains.flatMap(({d,i}) => d.assets.map((a,j)=>({a,d,i,j,...assetPosition(i,j,d.assets.length)})));
  const showAssets = v54Mode === 'fit' || v54Mode === 'domain' || v54Mode === 'object';
  const activeId = activeDomain().id;
  const edgeDomain = domains.map(p => pathBetween(center,p,statusClass(p.d.status))).join('');
  const edgeAssets = showAssets ? assets.filter(p => v54Mode === 'fit' || p.d.id === activeId).map(p => pathBetween(domainPosition(p.i),p,statusClass(p.a[2]), true)).join('') : '';
  const domainHtml = domains.map(p => `<button class="v54-domain ${statusClass(p.d.status)} ${p.d.id===activeId?'active':''}" data-v54-domain="${esc(p.d.id)}" style="left:${p.x}px;top:${p.y}px"><span class="v54-icon">${icon(p.d.icon)}</span><strong>${esc(p.d.name)}</strong><span class="v54-status" style="color:${statusColor(p.d.status)}">${esc(p.d.status)}</span><small>${p.d.score}/100</small></button>`).join('');
  const assetHtml = showAssets ? assets.filter(p => v54Mode === 'fit' || p.d.id === activeId).map(p => `<button class="v54-asset ${statusClass(p.a[2])} ${p.a[0]===v54Asset?'active':''}" data-v54-domain="${esc(p.d.id)}" data-v54-asset="${esc(p.a[0])}" style="left:${p.x}px;top:${p.y}px"><strong>${esc(p.a[1])}</strong><span class="v54-status" style="color:${statusColor(p.a[2])}">${esc(p.a[2])}</span><small>Layer 2 object</small></button>`).join('') : '';
  return `<main class="v54-map-panel"><div class="v54-map-head"><div></div><div><h2>Enterprise Trust Map</h2><span>Kernel-centered view • ${esc(s.label)}</span></div><div></div></div><div class="v54-viewport" id="v54Viewport"><div class="v54-world" id="v54World"><div class="v54-stars"></div><div class="v54-ring r3"></div><div class="v54-ring r2"></div><div class="v54-ring r1"></div><svg class="v54-edge-layer" viewBox="0 0 1280 920">${edgeDomain}${edgeAssets}</svg><button class="v54-kernel" type="button" data-v54-mode="kernel"><img src="assets/mjc-logo-2026.png" alt="MJC logo"><strong>CyberShield Core</strong><small>${esc(orgName())}</small><small>Trust Kernel</small></button>${domainHtml}${assetHtml}</div></div><div class="v54-controls"><button type="button" data-v54-mode="fit">Fit Map</button><button type="button" data-v54-mode="kernel">Kernel View</button><button type="button" data-v54-mode="domain">Domain View</button><button type="button" data-v54-mode="object">Object View</button><button type="button" data-v54-zoom="out">−</button><button type="button" data-v54-zoom="in">+</button><button type="button" data-v54-reset>Reset</button></div><div class="v54-scroll-note">Drag to pan • wheel or buttons to zoom</div></main>`;
}

function renderTrustMap() {
  const trust = $('#trustmap');
  if (!trust || !trust.classList.contains('active')) return;
  const s = scenarioWithAdjustedScore();
  trust.innerHTML = `<section class="v54-shell">${leftPanel(s)}${mapCenter(s)}${rightPanel(s)}</section>`;
  applyWorldTransform();
}

function patchBriefingScores() {
  const cards = $$('#executiveSummary .summary-card');
  if (!cards.length) return;
  const s = scenarioWithAdjustedScore();
  const scorePattern = {
    cmmc_applicability:[84,76,66,58,72,32],
    cmmc_readiness:[72,54,44,36,58,26],
    payment_trust:[68,48,38,31,52,22],
    vendor_ai_access:[88,79,72,68,82,46],
    healthcare_data:[70,52,41,34,58,24],
    ai_output:[78,64,56,49,67,35]
  }[activeScenarioId()] || [78,62,55,46,66,30];
  cards.forEach((card,i) => {
    card.classList.remove('good','warn','bad');
    const val = scorePattern[i] ?? s.orgScore;
    card.classList.add(val >= 67 ? 'good' : val >= 40 ? 'warn' : 'bad');
    card.querySelector('.v53-meter')?.remove();
    card.querySelector('.v531-scale')?.remove();
    if (!card.querySelector('.v54-mini-scale')) {
      card.querySelector('.metric')?.insertAdjacentHTML('afterend', `<div class="v54-mini-scale"><span style="left:${val}%"></span></div>`);
    }
  });
}

function normalizeOnboarding() {
  $$('#onboardingPanel .option-card').forEach(card => {
    const strong = card.querySelector('strong');
    const span = card.querySelector('span');
    if (strong) strong.style.display = 'block';
    if (span) span.style.display = 'block';
  });
  const h = $('#onboardingPanel h1')?.textContent || '';
  if (h.includes('evidence')) {
    const grid = $('#onboardingPanel .option-grid');
    if (grid && !grid.dataset.v54EvidenceOrder) {
      const cards = $$('.option-card', grid);
      ['low','medium','high'].forEach(v => {
        const c = cards.find(card => (card.dataset.value || '').toLowerCase() === v);
        if (c) grid.appendChild(c);
      });
      grid.dataset.v54EvidenceOrder = 'true';
    }
  }
}

function activateMode(mode) {
  v54Mode = mode;
  if (mode === 'fit') { v54Scale = 0.56; v54Pan = {x:0,y:0}; }
  if (mode === 'kernel') { v54Scale = 0.92; v54Pan = {x:0,y:0}; v54Asset = null; }
  if (mode === 'domain') { v54Scale = 1.18; const d=domainPosition(activeScenario().domains.findIndex(x=>x.id===activeDomain().id)); v54Pan={x:(640-d.x)*0.5,y:(460-d.y)*0.5}; v54Asset = null; }
  if (mode === 'object') { v54Scale = 1.55; const idx=activeScenario().domains.findIndex(x=>x.id===activeDomain().id); const assetIdx=activeDomain().assets.findIndex(a=>a[0]===activeAsset()[0]); const p=assetPosition(idx, Math.max(0,assetIdx), activeDomain().assets.length); v54Pan={x:(640-p.x)*0.75,y:(460-p.y)*0.75}; }
  saveViewState(); renderTrustMap();
}

function installHandlers() {
  if (window.__v54KernelHandlersInstalled) return;
  window.__v54KernelHandlersInstalled = true;
  document.addEventListener('click', e => {
    const domain = e.target.closest('[data-v54-domain]:not([data-v54-asset])');
    if (domain) { e.preventDefault(); e.stopPropagation(); v54Domain = domain.dataset.v54Domain; v54Asset = null; activateMode('domain'); return; }
    const asset = e.target.closest('[data-v54-asset]');
    if (asset) { e.preventDefault(); e.stopPropagation(); v54Domain = asset.dataset.v54Domain; v54Asset = asset.dataset.v54Asset; activateMode('object'); return; }
    const mode = e.target.closest('[data-v54-mode]');
    if (mode) { e.preventDefault(); e.stopPropagation(); activateMode(mode.dataset.v54Mode); return; }
    const zoom = e.target.closest('[data-v54-zoom]');
    if (zoom) { e.preventDefault(); e.stopPropagation(); v54Scale += zoom.dataset.v54Zoom === 'in' ? .12 : -.12; v54Scale = Math.max(.38, Math.min(2.4, v54Scale)); saveViewState(); applyWorldTransform(); return; }
    if (e.target.closest('[data-v54-reset]')) { e.preventDefault(); e.stopPropagation(); v54Scale=.82; v54Pan={x:0,y:0}; v54Mode='kernel'; v54Asset=null; saveViewState(); renderTrustMap(); return; }
    const trend = e.target.closest('[data-v54-trend]');
    if (trend) { e.preventDefault(); e.stopPropagation(); v54Trend = trend.dataset.v54Trend; saveViewState(); renderTrustMap(); return; }
    if (e.target.closest('#mainNav button,#v53ScenarioSelect,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-cmmc-q]')) setTimeout(renderV54, 130);
  }, true);
  document.addEventListener('mousedown', e => {
    const vp = e.target.closest('#v54Viewport');
    if (!vp || e.target.closest('button')) return;
    v54Dragging = true; v54DragStart = { x:e.clientX, y:e.clientY, pan:{...v54Pan} }; vp.classList.add('dragging'); e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!v54Dragging || !v54DragStart) return;
    v54Pan = { x: v54DragStart.pan.x + (e.clientX - v54DragStart.x), y: v54DragStart.pan.y + (e.clientY - v54DragStart.y) };
    applyWorldTransform();
  });
  document.addEventListener('mouseup', () => {
    if (!v54Dragging) return;
    v54Dragging = false; v54DragStart = null; $('#v54Viewport')?.classList.remove('dragging'); saveViewState();
  });
  document.addEventListener('wheel', e => {
    if (!e.target.closest('#v54Viewport')) return;
    e.preventDefault();
    v54Scale += e.deltaY < 0 ? .08 : -.08;
    v54Scale = Math.max(.38, Math.min(2.4, v54Scale)); saveViewState(); applyWorldTransform();
  }, { passive:false });
}

function patchMetadata() {
  document.title = 'CyberShield V54 Enterprise TrustMap';
  const admin = $('#adminPayload');
  if (!admin) return;
  try {
    const payload = JSON.parse(admin.textContent || '{}');
    payload.build = 'V54 Enterprise TrustMap Kernel Rebuild';
    payload.version = 'V54';
    payload.trustmap = 'Kernel-centered enterprise TrustMap with zoom, pan, layer depth, scenario-aware scoring, and trust propagation.';
    admin.textContent = JSON.stringify(payload, null, 2);
  } catch {}
}

function renderV54() {
  installV54Styles();
  normalizeOnboarding();
  patchBriefingScores();
  renderTrustMap();
  patchMetadata();
}

installHandlers();
window.addEventListener('load', () => setTimeout(renderV54, 500), { once:true });
setTimeout(renderV54, 700);
