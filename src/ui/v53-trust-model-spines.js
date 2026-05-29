const V53_SCENARIOS = {
  cmmc_applicability: {
    label: 'CMMC Applicability Trust Check',
    family: 'DoD Supplier / Federal Contractor',
    action: 'Determine whether the organization likely needs CMMC Level 1 or Level 2',
    information: ['DoD contracts', 'prime/customer flow-downs', 'FAR/DFARS clauses', 'FCI handling', 'CUI handling', 'system scope', 'MSP/vendor claims'],
    trustStatus: 'Needs Verification',
    decision: 'Escalate',
    owner: 'CEO / COO / CIO / vCISO / Contracts Lead',
    consequence: ['missed contract requirement', 'wasted certification spend', 'contract eligibility risk', 'false confidence'],
    path: ['Contract / customer requirement', 'FCI/CUI indicator', 'system scope', 'likely CMMC level', 'applicability decision', 'certification / contract consequence'],
    report: 'CMMC Applicability Trust Report',
    offer: 'CyberShield Operational Trust Assessment: CMMC Track',
    next: 'Verify contract clauses, customer flow-downs, FCI/CUI handling, and system scope before deciding the CMMC path.',
    scoreTitle: 'Applicability Confidence',
    score: 72,
    secondaryScoreTitle: 'Likely CMMC Path',
    secondaryScore: 'Level 2 Needs Verification',
    blocker: 'Contract clauses, CUI handling, and system scope are not trusted enough yet.',
    verify: 'Confirm whether FCI/CUI is received, created, stored, transmitted, or protected, and verify customer flow-downs.',
    movement: 'Needs Verification → Approved With Conditions',
    cmmc: true
  },
  cmmc_readiness: {
    label: 'CMMC Readiness Trust Check',
    family: 'DoD Supplier / Federal Contractor',
    action: 'Determine whether current CMMC readiness information can be trusted before certification planning or spend',
    information: ['SSP', 'POA&M', 'CUI boundary', 'asset inventory', 'MFA status', 'access-control evidence', 'MSP/vendor claims', 'policies', 'training records'],
    trustStatus: 'Needs Verification',
    decision: 'Escalate',
    owner: 'CIO / vCISO / IT Director',
    consequence: ['failed assessment', 'wasted certification spend', 'contract risk', 'false confidence'],
    path: ['MSP/vendor claim', 'CUI boundary', 'system inventory', 'control evidence', 'readiness decision', 'certification spend / contract risk'],
    report: 'CMMC Readiness Trust Report',
    offer: 'CyberShield Operational Trust Assessment: CMMC Track',
    next: 'Verify CUI scope, system boundary, evidence freshness, and control ownership before certification planning.',
    scoreTitle: 'Readiness Trust Score',
    score: 41,
    secondaryScoreTitle: 'CUI Scope Confidence',
    secondaryScore: 'Low / Needs Verification',
    blocker: 'CUI boundary and SSP freshness are not trusted enough yet.',
    verify: 'Confirm CUI scope, system boundary, control ownership, SSP freshness, and POA&M reliability.',
    movement: 'Escalate → Needs Verification → Approved With Conditions',
    cmmc: true
  },
  payment_trust: {
    label: 'Community Bank Payment Trust Verification',
    family: 'Community Bank / Financial Institution',
    action: 'Vendor requests payment destination change',
    information: ['vendor email', 'payment instructions', 'vendor record', 'approver authority', 'payment policy', 'prior payment history', 'audit trail'],
    trustStatus: 'Needs Verification',
    decision: 'Escalate',
    owner: 'CFO / Controller / Compliance Officer',
    consequence: ['unauthorized payment', 'audit exposure', 'vendor trust loss', 'possible fraud'],
    path: ['Vendor request', 'vendor identity', 'payment destination', 'approver authority', 'payment action', 'financial / audit exposure'],
    report: 'Payment Trust Verification Report',
    offer: 'Payment & Vendor Trust Review',
    next: 'Verify payment destination through approved vendor contact on file before approval.',
    scoreTitle: 'Payment Trust Status',
    score: 46,
    secondaryScoreTitle: 'Approved Contact Confidence',
    secondaryScore: 'Needs Verification',
    blocker: 'Payment destination was requested by email but not confirmed through an approved vendor contact.',
    verify: 'Confirm destination change through an approved contact already on file, not through the requesting email thread.',
    movement: 'Escalate → Approved With Conditions'
  },
  vendor_ai_access: {
    label: 'Manufacturing Vendor AI Access Trust',
    family: 'Manufacturing SMB',
    action: 'Vendor or AI-enabled maintenance tool requests access to production systems or operational data',
    information: ['vendor identity', 'maintenance ticket', 'access scope', 'system owner approval', 'affected production system', 'maintenance window', 'data classification'],
    trustStatus: 'Conditionally Trusted',
    decision: 'Approved With Conditions',
    owner: 'COO / Plant Manager / IT Director',
    consequence: ['production disruption', 'unauthorized access', 'operational data exposure', 'downtime'],
    path: ['Maintenance vendor', 'AI-assisted tool', 'production system access', 'operational data', 'production continuity risk'],
    report: 'Vendor Access Trust Report',
    offer: 'Vendor Access Trust Review',
    next: 'Limit access scope, verify maintenance window, document system owner approval, and log the access decision.',
    scoreTitle: 'Access Trust Score',
    score: 68,
    secondaryScoreTitle: 'Operational Continuity Risk',
    secondaryScore: 'Conditional',
    blocker: 'Access scope and production-system owner approval need tighter verification.',
    verify: 'Confirm the maintenance window, limit access scope, and record system owner approval before enabling access.',
    movement: 'Approved With Conditions → Approved'
  },
  healthcare_data: {
    label: 'Healthcare Data / Vendor / AI Trust',
    family: 'Healthcare Provider / Health System',
    action: 'Healthcare provider, vendor, or AI-enabled workflow wants to use patient, staff, operational, or clinical-adjacent data',
    information: ['data source', 'permitted use', 'vendor identity', 'access request', 'patient-data classification', 'policy requirement', 'owner approval', 'audit trail'],
    trustStatus: 'Needs Verification',
    decision: 'Escalate',
    owner: 'CIO / Compliance Officer / Privacy Officer / Department Leader',
    consequence: ['patient data exposure', 'compliance issue', 'clinical workflow disruption', 'patient trust damage', 'reputational harm'],
    path: ['Vendor or AI workflow', 'healthcare data source', 'permitted-use claim', 'access approval', 'patient / operational workflow', 'privacy, compliance, or trust consequence'],
    report: 'Healthcare Data Trust Report',
    offer: 'Healthcare Data Trust Review',
    next: 'Verify permitted use, data owner approval, vendor authorization, access scope, and audit trail before allowing the workflow.',
    scoreTitle: 'Healthcare Data Trust Score',
    score: 44,
    secondaryScoreTitle: 'Permitted Use Confidence',
    secondaryScore: 'Needs Verification',
    blocker: 'Permitted use, owner approval, and vendor authorization are not trusted enough yet.',
    verify: 'Confirm permitted use, authorization source, data owner approval, and access scope.',
    movement: 'Escalate → Needs Verification → Approved With Conditions'
  },
  ai_output: {
    label: 'AI Output Trust',
    family: 'AI-Enabled SMB / Professional Services',
    action: 'Employee or business unit wants to act on AI-generated analysis, recommendation, document, or client-facing output',
    information: ['AI output', 'source data', 'prompt/context', 'reviewer notes', 'policy constraints', 'business owner approval'],
    trustStatus: 'Conditionally Trusted',
    decision: 'Needs Verification',
    owner: 'Business Owner / CIO / Compliance / Department Lead',
    consequence: ['bad decision', 'client harm', 'reputational damage', 'policy violation', 'operational error'],
    path: ['AI-generated output', 'source data', 'business context', 'human reviewer', 'business action', 'customer / operational consequence'],
    report: 'AI Output Trust Report',
    offer: 'AI Output Trust Review',
    next: 'Verify source data, confirm human review, document intended use, and constrain use if uncertainty remains.',
    scoreTitle: 'AI Output Trust Score',
    score: 57,
    secondaryScoreTitle: 'Source Data Confidence',
    secondaryScore: 'Conditional',
    blocker: 'Source data and human review are not strong enough to support unrestricted action.',
    verify: 'Confirm source data, document review, and constrain downstream use until uncertainty is reduced.',
    movement: 'Needs Verification → Approved With Conditions'
  }
};

const V53_ORDER = ['cmmc_applicability','cmmc_readiness','payment_trust','vendor_ai_access','healthcare_data','ai_output'];
const CMMC_QUESTIONS = [
  'Do you sell to the DoD, a prime contractor, or defense supplier?',
  'Do you handle Federal Contract Information?',
  'Do you handle Controlled Unclassified Information?',
  'Do your contracts or customers mention FAR, DFARS, CMMC, or NIST SP 800-171?',
  'Do you know where FCI or CUI lives in your systems?',
  'Do you rely on an MSP, IT provider, or consultant for cybersecurity readiness?',
  'Do you have a System Security Plan?',
  'Do you have a POA&M?',
  'Do you have an asset inventory?',
  'Do you use MFA?'
];

let activeScenarioId = localStorage.getItem('cyberShieldV53Scenario') || 'cmmc_applicability';
let cmmcAnswers = JSON.parse(localStorage.getItem('cyberShieldV53CmmcAnswers') || '{}');

function $(selector) { return document.querySelector(selector); }
function $$(selector) { return Array.from(document.querySelectorAll(selector)); }
function esc(value) { return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }
function scenario() { return V53_SCENARIOS[activeScenarioId] || V53_SCENARIOS.cmmc_applicability; }
function statusClass(status) { const s = String(status).toLowerCase(); if (s.includes('trusted') && !s.includes('needs') && !s.includes('not')) return 'good'; if (s.includes('condition')) return 'warn'; if (s.includes('needs') || s.includes('escalate') || s.includes('stale') || s.includes('conflict')) return 'warn'; return 'bad'; }

function installStyles() {
  if ($('#v53-trust-model-style')) return;
  const style = document.createElement('style');
  style.id = 'v53-trust-model-style';
  style.textContent = `
    .v53-scenario-bar{margin:16px 0;display:grid;grid-template-columns:minmax(260px,1fr) auto;gap:12px;align-items:end}.v53-scenario-bar .panel{padding:14px}.v53-mini{font-size:.84rem;color:#d8ecf8}.v53-dashboard-title{font-size:clamp(1.8rem,3vw,2.8rem);line-height:1.05;margin:.35rem 0}.v53-card{position:relative;overflow:hidden}.v53-card:before{content:"";position:absolute;left:0;top:0;bottom:0;width:6px;background:var(--blue)}.v53-card.good:before{background:var(--green)}.v53-card.warn:before{background:var(--amber)}.v53-card.bad:before{background:var(--red)}.v53-card .metric{font-size:clamp(1.1rem,2vw,1.65rem)}.v53-meter{height:10px;background:rgba(255,255,255,.12);border:1px solid rgba(66,215,255,.25);border-radius:999px;overflow:hidden}.v53-meter span{display:block;height:100%;background:linear-gradient(90deg,#ff7474,#ffd166,#76e4a1)}.v53-trust-explain,.v53-improve,.v53-cmmc-branch,.v53-record,.v53-report-preview{margin-top:16px;border:1px solid rgba(66,215,255,.28);background:rgba(0,0,0,.18);border-radius:18px;padding:16px}.v53-path{display:flex;gap:10px;align-items:stretch;min-width:980px;padding:20px}.v53-path-node{width:170px;min-height:158px;border:1px solid rgba(66,215,255,.38);border-radius:20px;padding:12px;background:linear-gradient(180deg,rgba(18,58,90,.96),rgba(7,28,49,.99));display:grid;gap:7px;box-shadow:0 18px 36px rgba(0,0,0,.26)}.v53-path-node .status{font-weight:900;color:var(--amber)}.v53-arrow{display:grid;place-items:center;font-size:1.8rem;color:var(--blue);text-shadow:0 0 12px rgba(66,215,255,.75)}.v53-break{border-color:var(--amber);box-shadow:0 0 0 3px rgba(255,209,102,.12),0 0 24px rgba(255,209,102,.2)}.v53-report-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.v53-report-card{border:1px solid rgba(66,215,255,.28);border-radius:16px;padding:13px;background:rgba(255,255,255,.06);cursor:pointer}.v53-report-card:hover{border-color:var(--blue);box-shadow:0 0 18px rgba(66,215,255,.2)}.v53-contact-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.v53-report-doc{background:#071827;border:1px solid rgba(66,215,255,.3);border-radius:14px;padding:14px;white-space:pre-wrap;color:#e2f8ff}.v53-cmmc-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.v53-q{border:1px solid rgba(66,215,255,.2);border-radius:14px;padding:12px;background:rgba(255,255,255,.055)}.v53-q .actions{margin-top:8px}.v53-q button.active{border-color:var(--blue);background:rgba(66,215,255,.18)}.summary-card,.row,.v53-path-node{cursor:pointer}.map-panel{max-height:78vh;overflow:auto!important;overscroll-behavior:contain}.trustmap-canvas{min-width:1120px!important;min-height:560px!important;overflow:visible!important}.edge{stroke-width:1!important}.edge.active{stroke-width:2!important}@media(max-width:720px){.v53-scenario-bar,.v53-report-grid,.v53-contact-grid,.v53-cmmc-grid{grid-template-columns:1fr}.v53-path{min-width:1040px}.v53-path-node{width:160px}}
  `;
  document.head.appendChild(style);
}

function adminState() {
  try { return JSON.parse($('#adminPayload')?.textContent || '{}'); } catch { return {}; }
}
function orgName() { return adminState().state?.org || $('#setOrg')?.value || $('#obOrg')?.value || 'Selected Company'; }
function leaderName() { return adminState().state?.leader || $('#setLeader')?.value || 'Leader'; }

function enhanceOnboarding() {
  const panel = $('#onboardingPanel');
  if (!panel) return;
  const title = panel.querySelector('h1')?.textContent || '';
  if (title.includes('kind of organization')) {
    const grid = panel.querySelector('.option-grid');
    if (grid && !grid.dataset.v53Industry) {
      grid.dataset.v53Industry = 'true';
      const extra = document.createElement('button');
      extra.type = 'button';
      extra.className = 'option-card';
      extra.dataset.key = 'industry';
      extra.dataset.value = 'DoD Supplier / Federal Contractor';
      extra.innerHTML = '<strong>DoD Supplier / Federal Contractor</strong><span>CMMC applicability, readiness, and contract-risk trust checks.</span>';
      extra.onclick = () => { extra.classList.add('active'); };
      grid.prepend(extra);
    }
  }
  if (title.includes('risk are we evaluating')) {
    const grid = panel.querySelector('.option-grid');
    if (grid && !grid.dataset.v53Scenario) {
      grid.dataset.v53Scenario = 'true';
      grid.innerHTML = V53_ORDER.map(id => `<button type="button" class="option-card" data-v53-onboard-scenario="${id}"><strong>${esc(V53_SCENARIOS[id].label)}</strong><span>${esc(V53_SCENARIOS[id].action)}</span></button>`).join('');
      grid.querySelectorAll('[data-v53-onboard-scenario]').forEach(btn => btn.addEventListener('click', () => { activeScenarioId = btn.dataset.v53OnboardScenario; localStorage.setItem('cyberShieldV53Scenario', activeScenarioId); grid.querySelectorAll('.option-card').forEach(x => x.classList.remove('active')); btn.classList.add('active'); }));
    }
  }
}

function scenarioSelectorHtml() {
  return `<section class="v53-scenario-bar"><article class="panel"><span class="chip">Current Scenario</span><label>Scenario selector<select id="v53ScenarioSelect">${V53_ORDER.map(id => `<option value="${id}" ${id === activeScenarioId ? 'selected' : ''}>${esc(V53_SCENARIOS[id].label)}</option>`).join('')}</select></label><p class="v53-mini">Change the scenario without restarting onboarding. Dashboard, TrustMap, Decision Record, reports, and trust-status language update.</p></article><article class="panel"><span class="chip">Commercial path</span><h3>${esc(scenario().offer)}</h3><p class="v53-mini">Cross-industry by design. Coherence comes from Trust Before Action.</p></article></section>`;
}

function renderDashboard() {
  const s = scenario();
  const executiveFirst = $('#briefing .executive-first');
  if (executiveFirst) {
    executiveFirst.innerHTML = `<div class="executive-copy"><span class="chip">Trust Model Dashboard</span><h1 class="v53-dashboard-title">Can we trust the information behind this action?</h1><p class="lede">Executives rarely have perfect information. CyberShield evaluates whether what the organization has, sees, and thinks it knows is reliable enough to support action before consequence occurs.</p></div><div class="decision-card"><span class="label">Decision Recommendation</span><strong class="${statusClass(s.decision)}">${esc(s.decision)}</strong><p>Consequence first: ${esc(s.consequence[0])}. Governance mechanics come after the business consequence is understood.</p></div>`;
  }
  const summary = $('#executiveSummary');
  if (summary) {
    summary.innerHTML = [
      card('Action Under Review', s.action, 'This is the action CyberShield is evaluating before the business acts.', 'warn'),
      card('Information Relied On', s.information.slice(0,4).join(', '), 'These are the claims, records, systems, and signals currently being relied on.', 'warn'),
      card('Information Trust Status', s.trustStatus, 'Trust status reflects reliability of what is currently known, not perfect evidence.', statusClass(s.trustStatus)),
      card('Decision Recommendation', s.decision, 'Approved, Approved With Conditions, Needs Verification, Escalate, or Blocked.', statusClass(s.decision)),
      card('Decision Owner', s.owner, 'A trust decision is not defensible unless ownership is clear.', 'warn'),
      card('Consequence If Wrong', s.consequence.join(', '), 'CyberShield shows what happens if the information behind the action is wrong.', 'bad')
    ].join('');
  }
  const split = $('#briefing .split-layout');
  if (split && !$('#v53ScenarioSelect')) split.insertAdjacentHTML('beforebegin', scenarioSelectorHtml());
  const why = $('#whyItMatters');
  if (why) why.innerHTML = rows([
    ['Consequence first', `If this information is wrong: ${s.consequence.join(', ')}.`, 'Before governance'],
    ['How CyberShield determines trust', 'Source reliability, authority, freshness, consistency, scope, owner accountability, consequence if wrong, and verification path.', 'Trust basis'],
    ['Trust propagation', `${s.path.join(' → ')}`, 'Path']
  ]);
  const next = $('#nextActions');
  if (next) next.innerHTML = rows([
    ['Improve this trust score', `${s.blocker} Verification action: ${s.verify}`, s.movement],
    ['Decision Record', 'Open the runtime/decision view to see what information was relied on, what remains uncertain, and who owns the decision.', s.decision],
    ['Scenario report', `${s.report} is the primary report for this scenario.`, 'Proof Pack']
  ]);
  renderCmmcBranch();
}

function card(label, metric, body, cls) {
  const score = typeof scenario().score === 'number' ? scenario().score : 50;
  return `<article class="summary-card v53-card ${cls}"><span class="label">${esc(label)}</span><div class="metric ${cls}">${esc(metric)}</div><div class="v53-meter"><span style="width:${Math.max(10, Math.min(100, score))}%"></span></div><p>${esc(body)}</p><span class="cs-route-note">Tap to drill down</span></article>`;
}
function rows(items) { return items.map(i => `<button class="row" type="button"><strong>${esc(i[0])}</strong><span>${esc(i[1])}</span><span class="status">${esc(i[2] || '')}</span></button>`).join(''); }

function renderCmmcBranch() {
  const existing = $('#v53CmmcBranch');
  if (existing) existing.remove();
  if (!scenario().cmmc) return;
  const split = $('#briefing .split-layout');
  if (!split) return;
  const html = `<section class="v53-cmmc-branch" id="v53CmmcBranch"><span class="chip">CMMC Applicability Questions</span><h2>Yes / No / I don’t know</h2><p>“I don’t know” is not a failure. It is where CyberShield identifies trust uncertainty and verification work.</p><div class="v53-cmmc-grid">${CMMC_QUESTIONS.map((q, index) => `<div class="v53-q"><strong>${esc(q)}</strong><div class="actions">${['Yes','No','I don’t know'].map(a => `<button type="button" data-cmmc-q="${index}" data-cmmc-a="${esc(a)}" class="${cmmcAnswers[index] === a ? 'active' : ''}">${esc(a)}</button>`).join('')}</div></div>`).join('')}</div></section>`;
  split.insertAdjacentHTML('afterend', html);
}

function renderTrustMap() {
  const canvas = $('#trustCanvas');
  if (!canvas) return;
  const s = scenario();
  const nodeHtml = s.path.map((p, i) => `<div class="v53-path-node ${i === 1 || i === 2 ? 'v53-break' : ''}" data-v53-path-index="${i}"><span class="label">${i === 0 ? 'Information source' : i === s.path.length - 1 ? 'Consequence' : 'Trust step'}</span><strong>${esc(p)}</strong><span class="status">${i < s.path.length - 1 ? esc(s.trustStatus) : 'If wrong'}</span><small>Owner: ${esc(i === s.path.length - 1 ? s.owner : s.owner.split('/')[0].trim())}</small><small>${i === s.path.length - 1 ? esc(s.consequence.join(', ')) : 'Trust can improve through verification.'}</small></div>${i < s.path.length - 1 ? '<div class="v53-arrow">→</div>' : ''}`).join('');
  canvas.innerHTML = `<div class="v53-path">${nodeHtml}</div>`;
  const detail = $('#selectedDetail');
  if (detail) detail.innerHTML = `<span class="chip">TrustMap Trust Path</span><h3>${esc(s.label)}</h3><p><strong>Where trust may break:</strong> ${esc(s.blocker)}</p><p><strong>Trust propagation:</strong> ${esc(s.path.join(' → '))}</p><p><strong>Consequence if wrong:</strong> ${esc(s.consequence.join(', '))}</p><p><strong>Improve this trust score:</strong> ${esc(s.verify)}</p><div class="actions"><button class="primary" type="button" data-v53-open="record">Open Decision Record</button><button type="button" data-v53-open="report">Open Scenario Report</button></div>`;
  const risk = $('#riskDrivers');
  if (risk) risk.innerHTML = rows([
    [s.scoreTitle, `${s.score}%`, s.trustStatus],
    [s.secondaryScoreTitle, String(s.secondaryScore), 'Scenario metric'],
    ['How to improve', s.verify, s.movement]
  ]);
}

function renderRuntime() {
  const s = scenario();
  const q = $('#scenarioQueue');
  if (q) q.innerHTML = rows([
    ['Action Trust Check', s.action, s.decision],
    ['Information relied on', s.information.join(', '), s.trustStatus],
    ['Consequence if wrong', s.consequence.join(', '), 'Consequence first']
  ]);
  const feed = $('#decisionFeed');
  if (feed) feed.innerHTML = rows([
    ['How CyberShield Determines Trust', 'CyberShield evaluates source reliability, authority, freshness, consistency, scope, owner accountability, consequence if wrong, and available verification path.', 'Trust basis'],
    ['Decision Record', `Decision: ${s.decision}. Owner: ${s.owner}. Residual uncertainty: ${s.blocker}`, s.report],
    ['Boundary', 'Static advisory prototype. No legal determination, live enforcement, live email, live CRM sync, or certification guarantee is claimed.', 'Prototype']
  ]);
}

function decisionRecordText() {
  const s = scenario();
  return `Decision Record\n\nScenario: ${s.label}\nOrganization: ${orgName()}\nLeader: ${leaderName()}\n\nAction under review:\n${s.action}\n\nInformation relied on:\n${s.information.map(x => '- ' + x).join('\n')}\n\nInformation trust status:\n${s.trustStatus}\n\nReason for trust rating:\n${s.blocker}\n\nDecision state:\n${s.decision}\n\nDecision owner:\n${s.owner}\n\nTimestamp:\n${new Date().toLocaleString()}\n\nConsequence if wrong:\n${s.consequence.map(x => '- ' + x).join('\n')}\n\nVerification action:\n${s.verify}\n\nExpected decision movement:\n${s.movement}\n\nReport route:\n${s.report}\n\nHow CyberShield determines trust:\nCyberShield evaluates source reliability, authority, freshness, consistency, scope, owner accountability, consequence if wrong, and available verification path.\n\nBoundary:\nCyberShield is a static advisory prototype. It does not make legal determinations, guarantee certification, validate healthcare compliance, send email, sync CRM data, or perform live enforcement.`;
}

function renderEvidence() {
  const s = scenario();
  const req = $('#requiredEvidence');
  if (req) req.innerHTML = rows(s.information.slice(0,5).map((item, i) => [item, `Trust status: ${i < 2 ? s.trustStatus : 'Conditionally Trusted'}. If wrong: ${s.consequence[0]}.`, i < 2 ? 'Needs Verification' : 'Conditional']));
  const reg = $('#evidenceRegister');
  if (reg) reg.innerHTML = rows([
    ['Information reliability', 'Evidence supports the Trust Model, but evidence volume is not the point. Reliability, source confidence, owner accountability, verification path, and consequence are the point.', 'Doctrine'],
    ['What would change this decision?', `${s.verify}. Expected movement: ${s.movement}.`, 'Improvement path']
  ]);
}

function reportText(reportTitle = scenario().report) {
  const s = scenario();
  return `${reportTitle}\n\nPrepared by: CyberShield / Aegis\nHuman review: Dr. Max Justice signature is applied only after human review.\nOrganization: ${orgName()}\n\nExecutive Summary\nCyberShield evaluated whether the information behind this critical action can be trusted before the business acts.\n\nAction Reviewed\n${s.action}\n\nInformation Relied On\n${s.information.map(x => '- ' + x).join('\n')}\n\nInformation Trust Status\n${s.trustStatus}\n\nDecision Recommendation\n${s.decision}\n\nDecision Owner\n${s.owner}\n\nConsequence If Wrong\n${s.consequence.map(x => '- ' + x).join('\n')}\n\nVerification Required\n${s.verify}\n\nImprove This Trust Score\nCurrent blocker: ${s.blocker}\nExpected movement: ${s.movement}\n\nRecommended Next Action\n${s.next}\n\nMJC Advisory Path\n${s.offer}\n\nHow CyberShield Determines Trust\nCyberShield evaluates source reliability, authority, freshness, consistency, scope, owner accountability, consequence if wrong, and available verification path.\n\nBoundary Language\nThis is a CyberShield static advisory prototype report. It does not represent a legal determination, CMMC certification result, healthcare compliance validation, live monitoring, live enforcement, live email delivery, CRM sync, or production integration.`;
}

function renderProof() {
  const s = scenario();
  const output = $('#proofOutput');
  if (output) output.textContent = reportText('Executive Brief');
  const panel = $('#proof .panel');
  if (panel && !$('#v53ReportLibrary')) {
    panel.insertAdjacentHTML('beforeend', `<section class="v53-report-preview" id="v53ReportLibrary"><span class="chip">Scenario Reports</span><h3>Trust Model report options</h3><p>Board reports remain secondary in V53. Board-ready MJC letterhead reports are in the V54-V58 path.</p><div class="v53-report-grid">${['Executive Brief', s.report, 'Runtime Decision Record', 'Remediation Roadmap'].map((r, i) => `<article class="v53-report-card" tabindex="0" data-v53-report="${esc(r)}"><strong>${esc(r)}</strong><p>${i === 0 ? 'Primary commercial artifact.' : 'Scenario-driven output based on Trust Model results.'}</p></article>`).join('')}</div></section>`);
  }
}

function showReport(title) {
  let panel = $('#v53ActiveReport');
  if (!panel) {
    panel = document.createElement('section');
    panel.id = 'v53ActiveReport';
    panel.className = 'v53-report-preview';
    $('#proof .panel')?.appendChild(panel);
  }
  panel.innerHTML = `<span class="chip">Report Preview</span><h3>${esc(title)}</h3><pre class="v53-report-doc">${esc(reportText(title))}</pre><h4>Required before download or print</h4><div class="v53-contact-grid"><label>Sender name<input id="v53SenderName"></label><label>Sender email<input id="v53SenderEmail"></label><label>Sender organization<input id="v53SenderOrg" value="${esc(orgName())}"></label><label>Sender role<input id="v53SenderRole"></label><label>Recipient name<input id="v53RecipientName"></label><label>Recipient email<input id="v53RecipientEmail"></label><label>Recipient role<input id="v53RecipientRole"></label><label>Recipient organization / department<input id="v53RecipientOrg"></label></div><div class="actions"><button class="primary" type="button" data-v53-download="${esc(title)}">Download report</button><button type="button" data-v53-print="${esc(title)}">Print report</button><button type="button" disabled>Email delivery requires backend integration</button></div>`;
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function contactComplete() { return ['v53SenderName','v53SenderEmail','v53SenderOrg','v53SenderRole','v53RecipientName','v53RecipientEmail','v53RecipientRole','v53RecipientOrg'].every(id => $(`#${id}`)?.value?.trim()); }
function downloadReport(title) { if (!contactComplete()) { alert('Sender and recipient information is required before download or print.'); return; } const blob = new Blob([reportText(title)], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.txt`; a.click(); URL.revokeObjectURL(url); }
function printReport() { if (!contactComplete()) { alert('Sender and recipient information is required before download or print.'); return; } window.print(); }

function renderArchitecture() {
  const cards = $('#architectureCards');
  if (!cards) return;
  cards.innerHTML = [
    card('Trust Model Doctrine', 'TRUST', 'CyberShield evaluates whether information behind a critical action can be trusted before the business acts.', 'good'),
    card('Six Deep Scenario Spines', '6 PATHS', 'CMMC Applicability, CMMC Readiness, Payment Trust, Vendor Access, Healthcare Data, and AI Output.', 'warn'),
    card('Board-Ready Reports Path', 'NEXT', 'Board reports are secondary in V53 and must mature into MJC letterhead, signature-ready reports in later versions.', 'warn'),
    card('No Overclaim Boundary', 'BOUNDARY', 'No legal determination, certification guarantee, healthcare validation, live email, CRM sync, or enforcement claim.', 'bad')
  ].join('');
}

function renderAll() {
  installStyles();
  enhanceOnboarding();
  if ($('#app')?.hidden) return;
  renderDashboard();
  renderTrustMap();
  renderRuntime();
  renderEvidence();
  renderProof();
  renderArchitecture();
  const trace = $('#tracePanel');
  if (trace) trace.innerHTML = `<pre>${esc(JSON.stringify({ build: 'V53 Trust Model and Deep Scenario Spine Build', scenario: scenario(), cmmcAnswers, boundary: 'Static advisory prototype. No unsupported legal/certification/healthcare/live integration claims.' }, null, 2))}</pre>`;
}

function routeForText(text) {
  const lower = text.toLowerCase();
  if (lower.includes('report') || lower.includes('proof')) return 'proof';
  if (lower.includes('trustmap') || lower.includes('path') || lower.includes('break')) return 'trustmap';
  if (lower.includes('decision') || lower.includes('action trust') || lower.includes('runtime')) return 'runtime';
  if (lower.includes('information') || lower.includes('verification') || lower.includes('evidence')) return 'evidence';
  return null;
}

function installHandlers() {
  document.addEventListener('change', e => {
    if (e.target?.id === 'v53ScenarioSelect') { activeScenarioId = e.target.value; localStorage.setItem('cyberShieldV53Scenario', activeScenarioId); renderAll(); }
  });
  document.addEventListener('click', e => {
    const cmmc = e.target.closest('[data-cmmc-q]');
    if (cmmc) { cmmcAnswers[cmmc.dataset.cmmcQ] = cmmc.dataset.cmmcA; localStorage.setItem('cyberShieldV53CmmcAnswers', JSON.stringify(cmmcAnswers)); renderAll(); return; }
    const report = e.target.closest('[data-v53-report]');
    if (report) { showReport(report.dataset.v53Report); return; }
    const dl = e.target.closest('[data-v53-download]');
    if (dl) { downloadReport(dl.dataset.v53Download); return; }
    const pr = e.target.closest('[data-v53-print]');
    if (pr) { printReport(); return; }
    const open = e.target.closest('[data-v53-open]');
    if (open) { const target = open.dataset.v53Open === 'report' ? 'proof' : 'runtime'; document.querySelector(`#mainNav button[data-view="${target}"]`)?.click(); setTimeout(renderAll, 80); return; }
    const clickable = e.target.closest('.summary-card,.row,.v53-path-node');
    if (clickable) { const route = routeForText(clickable.textContent || ''); if (route) { document.querySelector(`#mainNav button[data-view="${route}"]`)?.click(); setTimeout(renderAll, 80); } }
  }, true);
  document.addEventListener('click', e => {
    if (e.target.closest('#mainNav button,#nextStep,#skipDemo,#restartAssessment,#trustBack,#trustDomain,#trustDetail,.node,#layerFilters .row')) setTimeout(renderAll, 140);
  }, true);
}

installHandlers();
window.addEventListener('load', () => setTimeout(renderAll, 250), { once: true });
setInterval(() => { if (!$('#app')?.hidden) renderAll(); }, 2000);
