const V531_SCENARIOS = {
  cmmc_applicability: {
    label: 'CMMC Applicability Trust Check',
    action: 'Determine whether the organization likely needs CMMC Level 1 or Level 2',
    score: 72,
    status: 'Needs Verification',
    decision: 'Escalate',
    owner: 'CEO / COO / CIO / vCISO / Contracts Lead',
    consequence: 'missed contract requirement, wasted certification spend, contract eligibility risk',
    nodes: [
      ['contract', 'Contract / Customer Requirement', 'Trusted', 'Contracts lead', 'missed requirement'],
      ['fci', 'FCI / CUI Indicator', 'Needs Verification', 'vCISO', 'wrong CMMC level'],
      ['scope', 'System Scope', 'Needs Verification', 'CIO', 'false confidence'],
      ['level', 'Likely CMMC Level', 'Conditional', 'Executive team', 'wasted certification spend'],
      ['decision', 'Applicability Decision', 'Escalate', 'CEO / COO', 'contract eligibility risk'],
      ['report', 'CMMC Applicability Report', 'Report Route', 'MJC', 'action plan']
    ],
    improve: 'Verify contract clauses, customer flow-downs, FCI/CUI handling, and system scope.'
  },
  cmmc_readiness: {
    label: 'CMMC Readiness Trust Check',
    action: 'Determine whether current CMMC readiness information can be trusted before certification planning or spend',
    score: 41,
    status: 'Needs Verification',
    decision: 'Escalate',
    owner: 'CIO / vCISO / IT Director',
    consequence: 'failed assessment, wasted certification spend, contract risk',
    nodes: [
      ['msp', 'MSP / Vendor Claim', 'Conditional', 'vCISO', 'bad readiness advice'],
      ['cui', 'CUI Boundary', 'Needs Verification', 'CIO', 'failed assessment'],
      ['inventory', 'System Inventory', 'Stale', 'IT Director', 'wrong scope'],
      ['controls', 'Control Evidence', 'Needs Verification', 'Control owners', 'audit failure'],
      ['readiness', 'Readiness Decision', 'Escalate', 'Executive sponsor', 'wasted spend'],
      ['report', 'CMMC Readiness Report', 'Report Route', 'MJC', '30/60/90 path']
    ],
    improve: 'Verify CUI scope, system boundary, evidence freshness, and control ownership.'
  },
  payment_trust: {
    label: 'Community Bank Payment Trust Verification',
    action: 'Vendor requests payment destination change',
    score: 46,
    status: 'Needs Verification',
    decision: 'Escalate',
    owner: 'CFO / Controller / Compliance Officer',
    consequence: 'unauthorized payment, audit exposure, vendor trust loss',
    nodes: [
      ['request', 'Vendor Request', 'Conditional', 'Controller', 'social engineering'],
      ['identity', 'Vendor Identity', 'Needs Verification', 'AP owner', 'impersonation'],
      ['destination', 'Payment Destination', 'Needs Verification', 'Controller', 'unauthorized payment'],
      ['authority', 'Approver Authority', 'Conditional', 'CFO', 'audit exposure'],
      ['payment', 'Payment Action', 'Escalate', 'CFO', 'funds loss'],
      ['report', 'Payment Trust Report', 'Report Route', 'MJC', 'verification plan']
    ],
    improve: 'Confirm the payment destination through approved vendor contact already on file.'
  },
  vendor_ai_access: {
    label: 'Manufacturing Vendor AI Access Trust',
    action: 'Vendor or AI-enabled maintenance tool requests access to production systems or operational data',
    score: 68,
    status: 'Conditionally Trusted',
    decision: 'Approved With Conditions',
    owner: 'COO / Plant Manager / IT Director',
    consequence: 'production disruption, unauthorized access, operational data exposure',
    nodes: [
      ['vendor', 'Maintenance Vendor', 'Trusted', 'Plant manager', 'bad access request'],
      ['tool', 'AI-Assisted Tool', 'Conditional', 'IT Director', 'uncontrolled automation'],
      ['access', 'Production Access', 'Conditional', 'System owner', 'downtime'],
      ['data', 'Operational Data', 'Needs Verification', 'Operations', 'data exposure'],
      ['continuity', 'Production Continuity', 'Conditional', 'COO', 'disruption'],
      ['report', 'Vendor Access Report', 'Report Route', 'MJC', 'limited access plan']
    ],
    improve: 'Limit access scope, verify the maintenance window, and document system owner approval.'
  },
  healthcare_data: {
    label: 'Healthcare Data / Vendor / AI Trust',
    action: 'Healthcare provider, vendor, or AI-enabled workflow wants to use patient, staff, operational, or clinical-adjacent data',
    score: 44,
    status: 'Needs Verification',
    decision: 'Escalate',
    owner: 'CIO / Compliance Officer / Privacy Officer / Department Leader',
    consequence: 'patient data exposure, compliance issue, clinical workflow disruption',
    nodes: [
      ['workflow', 'Vendor / AI Workflow', 'Conditional', 'Department leader', 'workflow misuse'],
      ['source', 'Healthcare Data Source', 'Needs Verification', 'Data owner', 'privacy exposure'],
      ['use', 'Permitted Use Claim', 'Needs Verification', 'Privacy officer', 'policy breach'],
      ['approval', 'Access Approval', 'Conditional', 'CIO', 'unauthorized access'],
      ['patient', 'Patient / Operational Workflow', 'Escalate', 'Compliance', 'trust damage'],
      ['report', 'Healthcare Data Report', 'Report Route', 'MJC', 'verification path']
    ],
    improve: 'Verify permitted use, data owner approval, vendor authorization, access scope, and audit trail.'
  },
  ai_output: {
    label: 'AI Output Trust',
    action: 'Employee or business unit wants to act on AI-generated analysis, recommendation, document, or client-facing output',
    score: 57,
    status: 'Conditionally Trusted',
    decision: 'Needs Verification',
    owner: 'Business Owner / CIO / Compliance / Department Lead',
    consequence: 'bad decision, client harm, reputational damage, policy violation',
    nodes: [
      ['output', 'AI Output', 'Conditional', 'Business owner', 'wrong recommendation'],
      ['source', 'Source Data', 'Needs Verification', 'Data owner', 'bad source'],
      ['context', 'Business Context', 'Conditional', 'Department lead', 'wrong use'],
      ['reviewer', 'Human Reviewer', 'Conditional', 'Reviewer', 'missed error'],
      ['action', 'Business Action', 'Needs Verification', 'Executive owner', 'client harm'],
      ['report', 'AI Output Report', 'Report Route', 'MJC', 'safe-use path']
    ],
    improve: 'Verify source data, confirm human review, document intended use, and constrain use while uncertainty remains.'
  }
};

const ORDER = ['cmmc_applicability','cmmc_readiness','payment_trust','vendor_ai_access','healthcare_data','ai_output'];
let selectedTrustNode = null;
function $(s){return document.querySelector(s)}
function $$(s){return Array.from(document.querySelectorAll(s))}
function esc(v){return String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}
function activeScenarioId(){return localStorage.getItem('cyberShieldV53Scenario') || 'cmmc_applicability'}
function activeScenario(){return V531_SCENARIOS[activeScenarioId()] || V531_SCENARIOS.cmmc_applicability}

function addRecoveryStyles(){
  if($('#v531-recovery-style')) return;
  const style=document.createElement('style');
  style.id='v531-recovery-style';
  style.textContent=`
    .option-card strong{display:block!important;margin-bottom:8px!important;line-height:1.16!important}.option-card span{display:block!important;line-height:1.34!important;color:#d8ecf8!important}.v53-card.good:before{background:var(--green)!important}.v53-card.good .metric{color:var(--green)!important}.v53-card.warn .metric{color:var(--amber)!important}.v53-card.bad .metric{color:var(--red)!important}.v531-scale{position:relative;height:12px;border-radius:999px;margin-top:7px;background:linear-gradient(90deg,#ff7474 0 33%,#ffd166 33% 67%,#76e4a1 67% 100%);border:1px solid rgba(255,255,255,.22);box-shadow:inset 0 0 8px rgba(0,0,0,.35)}.v531-dot{position:absolute;top:50%;width:16px;height:16px;border-radius:50%;background:#061726;border:3px solid #f5fbff;transform:translate(-50%,-50%);box-shadow:0 0 12px rgba(66,215,255,.65)}.v531-map{position:relative;min-width:1120px;min-height:720px;border-radius:24px;background:radial-gradient(circle at 50% 50%,rgba(66,215,255,.22),transparent 10rem),linear-gradient(145deg,rgba(7,27,48,.98),rgba(4,14,24,.99));border:1px solid rgba(146,205,232,.28);overflow:hidden}.v531-map:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(66,215,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(66,215,255,.045) 1px,transparent 1px);background-size:48px 48px}.v531-ring{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border:1px solid rgba(66,215,255,.22);border-radius:50%;pointer-events:none}.v531-ring.r1{width:260px;height:260px;background:rgba(66,215,255,.04)}.v531-ring.r2{width:470px;height:470px}.v531-ring.r3{width:690px;height:690px}.v531-core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:190px;min-height:165px;z-index:6;border:1px solid rgba(66,215,255,.8);border-radius:24px;background:radial-gradient(circle at 50% 20%,rgba(66,215,255,.3),rgba(7,28,49,.98));display:grid;place-items:center;text-align:center;padding:13px;box-shadow:0 0 30px rgba(66,215,255,.35)}.v531-core img{width:70px;height:70px;object-fit:contain;filter:drop-shadow(0 0 14px rgba(66,215,255,.85))}.v531-node{position:absolute;width:158px;min-height:132px;z-index:7;transform:translate(-50%,-50%);border:1px solid rgba(66,215,255,.42);border-radius:20px;background:linear-gradient(180deg,rgba(19,67,101,.97),rgba(7,28,49,.99));padding:11px;text-align:center;display:grid;gap:6px;box-shadow:0 18px 36px rgba(0,0,0,.3);cursor:pointer}.v531-node:hover,.v531-node.active{border-color:var(--blue);box-shadow:0 0 0 3px rgba(66,215,255,.16),0 0 26px rgba(66,215,255,.3);transform:translate(-50%,-50%) scale(1.05)}.v531-node.good{border-color:rgba(118,228,161,.65)}.v531-node.warn{border-color:rgba(255,209,102,.75)}.v531-node.bad{border-color:rgba(255,116,116,.8)}.v531-node .status{font-weight:900;color:var(--amber)}.v531-node.good .status{color:var(--green)}.v531-node.bad .status{color:var(--red)}.v531-edge{position:absolute;inset:0;z-index:3;pointer-events:none}.v531-edge path{stroke:rgba(66,215,255,.42);stroke-width:1.5;fill:none;filter:drop-shadow(0 0 4px rgba(66,215,255,.4))}.v531-edge path.active{stroke:var(--blue);stroke-width:2.4;filter:drop-shadow(0 0 10px rgba(66,215,255,.9))}.v531-detail-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v531-boundary{margin-top:14px;border:1px solid rgba(66,215,255,.28);background:rgba(0,0,0,.18);border-radius:18px;padding:16px}.v531-legend{position:absolute;left:16px;bottom:16px;z-index:8;display:flex;gap:7px;flex-wrap:wrap}.v531-legend span{border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:5px 8px;background:rgba(6,23,38,.85);font-size:.74rem;font-weight:900}.trustmap-canvas{min-width:1120px!important;min-height:720px!important}.map-panel{overflow:auto!important;max-height:78vh}@media(max-width:720px){.v531-map{min-width:1080px}.v531-node{width:148px}}
  `;
  document.head.appendChild(style);
}

function reorderEvidenceOptions(){
  const h=$('#onboardingPanel h1')?.textContent||'';
  if(!h.includes('evidence')) return;
  const grid=$('#onboardingPanel .option-grid');
  if(!grid || grid.dataset.v531Ordered) return;
  const cards=$$('.option-card', grid);
  ['low','medium','high'].forEach(v=>{const card=cards.find(c=>(c.dataset.value||'').toLowerCase()===v); if(card) grid.appendChild(card)});
  grid.dataset.v531Ordered='true';
}

function normalizeOnboardingCards(){
  $$('#onboardingPanel .option-card').forEach(card=>{
    const strong=card.querySelector('strong');
    const span=card.querySelector('span');
    if(strong) strong.style.display='block';
    if(span) span.style.display='block';
  });
  reorderEvidenceOptions();
}

function scoreClass(score){return score>=67?'good':score>=40?'warn':'bad'}
function statusClass(status){const s=String(status).toLowerCase(); if(s.includes('trusted')&&!s.includes('needs')&&!s.includes('not')) return 'good'; if(s.includes('escalate')||s.includes('not')) return 'bad'; return 'warn'}
function scale(score){return `<div class="v531-scale"><span class="v531-dot" style="left:${Math.max(3,Math.min(97,score))}%"></span></div>`}

function rebalanceBriefing(){
  const cards=$$('#executiveSummary .summary-card');
  if(cards.length<6) return;
  const s=activeScenario();
  cards[0].classList.remove('warn','bad'); cards[0].classList.add('good');
  cards[1].classList.remove('warn','bad'); cards[1].classList.add('good');
  const values=[88,76,Math.max(40,s.score),Math.max(35,s.score-8),62,28];
  cards.forEach((card,i)=>{
    const old=card.querySelector('.v53-meter,.cs-meter'); if(old) old.remove();
    if(!card.querySelector('.v531-scale')) card.querySelector('.metric')?.insertAdjacentHTML('afterend', scale(values[i]));
  });
}

function mapPositions(){return [[50,16],[78,30],[79,67],[50,85],[22,67],[22,30]]}
function buildMap(){
  const canvas=$('#trustCanvas'); if(!canvas) return;
  const s=activeScenario(); const pos=mapPositions();
  const paths=s.nodes.map((n,i)=>{const [x,y]=pos[i]; return {n,x,y}});
  const pathSvg=paths.map((p,i)=>`<path class="${selectedTrustNode===p.n[0]?'active':''}" d="M50 50 Q ${p.x} ${p.y} ${p.x} ${p.y}"/>`).join('') + paths.map((p,i)=>{ if(i===paths.length-1) return ''; const q=paths[i+1]; return `<path class="${selectedTrustNode===p.n[0]||selectedTrustNode===q.n[0]?'active':''}" d="M${p.x} ${p.y} Q50 50 ${q.x} ${q.y}"/>`;}).join('');
  const nodeHtml=paths.map((p,i)=>{const cls=statusClass(p.n[2]); return `<button class="v531-node ${cls} ${selectedTrustNode===p.n[0]?'active':''}" data-v531-node="${esc(p.n[0])}" style="left:${p.x}%;top:${p.y}%"><span class="label">${i===0?'Information Source':i===paths.length-1?'Report Route':'Trust Layer'}</span><strong>${esc(p.n[1])}</strong><span class="status">${esc(p.n[2])}</span><small>Owner: ${esc(p.n[3])}</small><small>If wrong: ${esc(p.n[4])}</small></button>`}).join('');
  canvas.innerHTML=`<div class="v531-map"><div class="v531-ring r3"></div><div class="v531-ring r2"></div><div class="v531-ring r1"></div><svg class="v531-edge" viewBox="0 0 100 100" preserveAspectRatio="none">${pathSvg}</svg><div class="v531-core"><img src="assets/mjc-logo-2026.png" alt="MJC logo"><strong>CyberShield Core</strong><small>${esc(s.label)}</small><small>Trust Before Action</small></div>${nodeHtml}<div class="v531-legend"><span>Green: trusted enough</span><span>Yellow: improve/verify</span><span>Red: break/escalate</span></div></div>`;
  updateTrustDetail();
}

function updateTrustDetail(){
  const detail=$('#selectedDetail'); if(!detail) return;
  const s=activeScenario(); const node=s.nodes.find(n=>n[0]===selectedTrustNode) || s.nodes[0];
  detail.innerHTML=`<span class="chip">TrustMap Layer Drilldown</span><h3>${esc(node[1])}</h3><p><strong>Status:</strong> ${esc(node[2])}</p><p><strong>Owner:</strong> ${esc(node[3])}</p><p><strong>If wrong:</strong> ${esc(node[4])}</p><p><strong>Trust propagation:</strong> ${esc(s.nodes.map(n=>n[1]).join(' → '))}</p><p><strong>How to improve:</strong> ${esc(s.improve)}</p><div class="v531-detail-actions"><button class="primary" type="button" data-v531-layer="detail">Open detail layer</button><button type="button" data-v531-layer="report">Open report route</button></div>`;
}

function patchArchitectureBoundary(){
  const cards=$$('#architectureCards .summary-card');
  cards.forEach(card=>{
    if((card.textContent||'').toLowerCase().includes('boundary')){
      card.dataset.v531Boundary='true';
      card.querySelector('p') && (card.querySelector('p').textContent='Tap to view the current advisory boundary, prototype limits, and unsupported claims.');
    }
  });
}

function showBoundary(){
  const arch=$('#architecture .panel') || $('#architecture'); if(!arch) return;
  let box=$('#v531BoundaryPanel');
  if(!box){box=document.createElement('section'); box.id='v531BoundaryPanel'; box.className='v531-boundary'; arch.appendChild(box)}
  box.innerHTML=`<span class="chip">Prototype Boundary</span><h3>Current advisory boundary</h3><p>This demonstration models trust recommendations. It does not make legal determinations, certify CMMC readiness, validate healthcare compliance, send email, sync CRM data, or perform live enforcement.</p><p><strong>What it should show:</strong> what information the organization is relying on, where trust may break, what consequence follows if the information is wrong, and what should be verified next.</p><p><strong>Human review path:</strong> Aegis can generate a report draft. Dr. Max Justice applies a human-reviewed signature only after review.</p>`;
  box.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function renderRecovery(){
  addRecoveryStyles(); normalizeOnboardingCards();
  if($('#app')?.hidden) return;
  rebalanceBriefing(); buildMap(); patchArchitectureBoundary();
}

document.addEventListener('click',e=>{
  const node=e.target.closest('[data-v531-node]');
  if(node){selectedTrustNode=node.dataset.v531Node; buildMap(); return;}
  const layer=e.target.closest('[data-v531-layer]');
  if(layer){ if(layer.dataset.v531Layer==='report') document.querySelector('#mainNav button[data-view="proof"]')?.click(); else { const box=$('#selectedDetail'); if(box) box.insertAdjacentHTML('beforeend',`<div class="v531-boundary"><span class="chip">Detail Layer</span><p>This second-click layer explains how this trust object affects the decision, what improves it, and what report/action follows. V54 should make this a richer dedicated object detail view.</p></div>`);} setTimeout(renderRecovery,80); return;}
  const boundary=e.target.closest('[data-v531-boundary="true"]');
  if(boundary){showBoundary(); return;}
  if(e.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,#v53ScenarioSelect,[data-cmmc-q]')) setTimeout(renderRecovery,160);
},true);

window.addEventListener('load',()=>setTimeout(renderRecovery,500),{once:true});
setTimeout(renderRecovery,800);
