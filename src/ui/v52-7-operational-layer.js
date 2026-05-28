const REPORTS = {
  executive: { title: 'Executive Brief', owner: 'Executive sponsor', purpose: 'Summarize the decision, risk, evidence gaps, and next action for leadership.' },
  board: { title: 'Board Oversight Report', owner: 'Board / Advisor', purpose: 'Show unresolved risk, governance posture, and oversight questions.' },
  evidence: { title: 'Evidence Gap Report', owner: 'CISO / Compliance', purpose: 'List missing evidence, why it matters, and who should resolve it.' },
  tasking: { title: 'Control Owner Tasking', owner: 'Control owner', purpose: 'Turn CyberShield findings into assigned operational work.' },
  runtime: { title: 'Runtime Decision Record', owner: 'CIO / CTO', purpose: 'Record whether the action should be allowed, constrained, escalated, or blocked.' },
  vendor: { title: 'Vendor / Payment Trust Report', owner: 'Finance / Vendor Management', purpose: 'Validate vendor authority, payment destination, and external trust dependencies.' },
  compliance: { title: 'Compliance Mapping Summary', owner: 'Compliance lead', purpose: 'Map advisory decision context to evidence and control expectations.' },
  roadmap: { title: 'Remediation Roadmap', owner: 'Program owner', purpose: 'Prioritize next actions, evidence capture, and improvement path.' }
};

const EVIDENCE_EXPLAINERS = {
  'Policy lineage': 'CyberShield needs to know which policy, standard, contract, or executive rule governs the action.',
  'Data lineage': 'CyberShield cannot prove where the data came from, whether it is permitted for this use, or who owns the source.',
  'System identity': 'CyberShield needs to know which system, agent, vendor, or integration is attempting the action.',
  'Control mapping': 'CyberShield needs a control or governance anchor so the decision can be defended.',
  'Human owner': 'CyberShield needs a named accountable person or role before trust can be operationalized.'
};

const ARCHITECTURE_ROUTES = {
  'Overview Map': ['trustmap', 'Overview Map', 'The overview map shows people, systems, data, vendors, policy, evidence, proof, and consequence before action.'],
  'Domain Layer': ['trustmap', 'Domain Layer', 'A domain layer focuses on one trust object, such as Data, AI Systems, Vendor, Identity, Policy, Evidence, or Proof Pack.'],
  'Detail / Action Layer': ['evidence', 'Detail / Action Layer', 'The action layer turns a gap into owner, evidence needed, operational consequence, and next action.'],
  'Proof Route': ['proof', 'Proof Route', 'The proof route turns the decision and evidence trail into a role-tailored report.']
};

function $(selector) { return document.querySelector(selector); }
function $$(selector) { return Array.from(document.querySelectorAll(selector)); }
function esc(value) { return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

function getAdminState() {
  try {
    const payload = JSON.parse($('#adminPayload')?.textContent || '{}');
    return { state: payload.state || {}, decision: payload.decision || {} };
  } catch {
    return { state: {}, decision: {} };
  }
}

function orgName() {
  const { state } = getAdminState();
  return state.org || $('#setOrg')?.value || $('#obOrg')?.value || 'Selected Company';
}

function addStyles() {
  if ($('#v52-7-operational-style')) return;
  const style = document.createElement('style');
  style.id = 'v52-7-operational-style';
  style.textContent = `
    .option-card strong{display:block;margin-bottom:8px;line-height:1.18}.option-card span{display:block;line-height:1.35;color:#d8ecf8}.map-panel{max-height:78vh;overflow:auto!important;overscroll-behavior:contain}.trustmap-canvas{min-width:1180px!important;min-height:820px!important}.edge{stroke-width:1!important;filter:drop-shadow(0 0 2px rgba(66,215,255,.24))}.edge.active{stroke-width:2!important;filter:drop-shadow(0 0 5px rgba(66,215,255,.75))}.summary-card,.row,.cs-report-card{cursor:pointer;transition:border-color .16s,box-shadow .16s,transform .16s}.summary-card:hover,.row:hover,.cs-report-card:hover{border-color:rgba(66,215,255,.95);box-shadow:0 0 0 3px rgba(66,215,255,.12),0 0 22px rgba(66,215,255,.2);transform:translateY(-1px)}.cs-meter{height:9px;border-radius:999px;background:rgba(255,255,255,.12);overflow:hidden;border:1px solid rgba(66,215,255,.22);margin-top:4px}.cs-meter>span{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#ff7474,#ffd166,#76e4a1);box-shadow:0 0 12px rgba(66,215,255,.3)}.cs-route-note{font-size:.78rem;color:#42d7ff;text-transform:uppercase;letter-spacing:.07em;font-weight:900}.node{width:126px!important;min-height:104px!important;font-size:.78rem!important;padding:9px!important}.node .node-art svg{width:54px!important;height:44px!important}.node[data-node="record"]{top:10%!important;left:50%!important}.node[data-node="ai"]{top:27%!important;left:35%!important}.node[data-node="vendor"]{top:34%!important;left:81%!important}.node[data-node="policy"]{top:35%!important;left:17%!important}.node[data-node="proof"]{top:58%!important;left:17%!important}.node[data-node="identity"]{top:76%!important;left:31%!important}.node[data-node="data"]{top:73%!important;left:70%!important}.node[data-node="evidence"]{top:89%!important;left:52%!important}.node[data-node="exposure"]{top:62%!important;left:87%!important}.node[data-node="core"]{width:194px!important;min-height:184px!important;top:51%!important;left:50%!important;background:radial-gradient(circle at 50% 18%,rgba(66,215,255,.28),rgba(7,28,49,.98) 58%);border-color:rgba(66,215,255,.85)!important}.cs-core-anchor{display:grid;place-items:center;gap:5px;width:100%}.cs-core-logo{width:78px;height:78px;object-fit:contain;filter:drop-shadow(0 0 14px rgba(66,215,255,.85));z-index:2}.cs-core-portal{position:relative;width:130px;height:34px;border:1px solid rgba(66,215,255,.58);border-radius:50%;background:radial-gradient(ellipse at center,rgba(66,215,255,.30),rgba(6,23,38,.08) 62%,transparent 70%);box-shadow:0 0 20px rgba(66,215,255,.35);margin-top:-10px;overflow:hidden}.cs-core-role{font-size:.76rem;color:#42d7ff;font-weight:900;text-transform:uppercase;letter-spacing:.06em}.cs-core-company{font-weight:950;color:#f5fbff;line-height:1.12;text-shadow:0 0 10px rgba(66,215,255,.45);max-width:170px}.node[data-node="core"] .node-art{display:none}.cs-detail-panel,.cs-report-preview,.cs-report-library{margin-top:14px;border:1px solid rgba(66,215,255,.25);background:rgba(0,0,0,.18);border-radius:18px;padding:14px}.cs-report-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cs-report-card{border:1px solid rgba(66,215,255,.28);border-radius:16px;padding:12px;background:rgba(255,255,255,.06)}.cs-contact-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cs-report-doc{background:#071827;border:1px solid rgba(66,215,255,.3);border-radius:14px;padding:14px;white-space:pre-wrap;color:#e2f8ff}@media(max-width:720px){.trustmap-canvas{min-width:1080px!important}.cs-report-grid,.cs-contact-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
}

function navTo(view, detail) {
  $(`#mainNav button[data-view="${view}"]`)?.click();
  setTimeout(() => {
    if (detail) showDetail(detail.title, detail.body, detail.route);
    enhanceAll();
    $(`#${view}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

function showDetail(title, body, route) {
  const active = $('.view.active .section-head, .view.active .panel');
  if (!active) return;
  let panel = $('.view.active .cs-detail-panel');
  if (!panel) { panel = document.createElement('section'); panel.className = 'cs-detail-panel'; active.insertAdjacentElement('afterend', panel); }
  panel.innerHTML = `<span class="chip">Drilldown</span><h3>${esc(title)}</h3><p>${esc(body)}</p>${route ? `<div class="actions"><button class="primary" type="button" data-route="${esc(route)}">Open related workspace</button></div>` : ''}`;
}

function patchCoreLogo() {
  const core = $('.node[data-node="core"]');
  if (!core) return;
  if (core.dataset.logoPatched !== 'true') {
    core.dataset.logoPatched = 'true';
    core.innerHTML = `<span class="cs-core-anchor"><img class="cs-core-logo" src="assets/mjc-logo-2026.png" alt="MJC CyberShield logo" onerror="this.style.display='none'"><span class="cs-core-portal" aria-hidden="true"></span><strong>CyberShield Core</strong><small class="cs-core-role">Executive Core</small><small class="cs-core-company"></small></span>`;
  }
  const company = core.querySelector('.cs-core-company');
  if (company) company.textContent = `${orgName()} Control Plane`;
}

function addDashboardMeters() {
  $$('#briefing .summary-card').forEach(card => {
    if (card.dataset.v527Meter === 'true') return;
    card.dataset.v527Meter = 'true';
    card.tabIndex = 0;
    const metric = card.querySelector('.metric');
    const text = metric?.textContent || '';
    const numeric = parseInt(text.match(/\d+/)?.[0] || '60', 10);
    const width = Math.max(12, Math.min(100, numeric));
    metric?.insertAdjacentHTML('afterend', `<div class="cs-meter" aria-hidden="true"><span style="width:${width}%"></span></div><span class="cs-route-note">Tap to drill down</span>`);
  });
}

function explainEvidence(label, status) {
  const why = EVIDENCE_EXPLAINERS[label] || 'CyberShield needs this evidence to produce a defensible decision.';
  return `${label} is marked ${status}. ${why} What good evidence looks like: source, owner, approval path, freshness, and control context. Next action: assign an accountable owner and attach or confirm the artifact before relying on the decision.`;
}

function routeFromCardText(text) {
  const lower = text.toLowerCase();
  if (lower.includes('overview map')) return ['trustmap', { title: 'Overview Map', body: ARCHITECTURE_ROUTES['Overview Map'][2] }];
  if (lower.includes('domain layer')) return ['trustmap', { title: 'Domain Layer', body: ARCHITECTURE_ROUTES['Domain Layer'][2] }];
  if (lower.includes('detail') || lower.includes('action layer')) return ['evidence', { title: 'Detail / Action Layer', body: ARCHITECTURE_ROUTES['Detail / Action Layer'][2] }];
  if (lower.includes('proof route')) return ['proof', { title: 'Proof Route', body: ARCHITECTURE_ROUTES['Proof Route'][2] }];
  if (lower.includes('runtime control') || lower.includes('risky action') || lower.includes('primary next action')) return ['runtime', { title: 'Runtime Control', body: 'Operational admissibility shows whether the action should be allowed, constrained, escalated, or blocked before consequence.' }];
  if (lower.includes('trust posture') || lower.includes('dashboard routing')) return ['trustmap', { title: 'Trust Posture', body: 'Trust posture depends on connected relationships among AI systems, data, vendors, identity, evidence, policy, and proof.' }];
  if (lower.includes('proof status') || lower.includes('proof pack')) return ['proof', { title: 'Proof Status', body: 'Proof status shows whether the record can be defended and which report output should be generated.' }];
  if (lower.includes('evidence') || lower.includes('gap') || lower.includes('required')) return ['evidence', { title: 'Evidence Detail', body: 'Evidence details explain why a required or missing artifact matters to the decision.' }];
  if (lower.includes('exposure')) return ['runtime', { title: 'Exposure Detail', body: 'Exposure is directional. It shows what consequence may occur before the action executes, not a validated FAIR calculation.' }];
  return null;
}

function ensureReportLibrary() {
  const proofPanel = $('#proof .panel');
  if (!proofPanel || proofPanel.querySelector('.cs-report-library')) return;
  const cards = Object.entries(REPORTS).map(([id, r]) => `<article class="cs-report-card" tabindex="0" data-report-id="${id}"><strong>${esc(r.title)}</strong><p>${esc(r.purpose)}</p></article>`).join('');
  proofPanel.insertAdjacentHTML('beforeend', `<section class="cs-report-library"><span class="chip">Report Library</span><h3>Proof Pack report options</h3><p>Preview is open. Download or print requires sender and recipient information.</p><div class="cs-report-grid">${cards}</div></section>`);
}

function reportText(reportId) {
  const report = REPORTS[reportId] || REPORTS.executive;
  const { state, decision } = getAdminState();
  const gaps = decision.evidence_gaps?.length ? decision.evidence_gaps.map(g => `- ${g}`).join('\n') : '- No major modeled evidence gaps';
  return `${report.title}\n\nOrganization: ${state.org || orgName()}\nIndustry: ${state.industry || 'Not specified'}\nScenario: ${state.scenario || 'Not specified'}\nPriority: ${state.priority || 'Not specified'}\nAudience: ${state.audience || 'Not specified'}\n\nCyberShield decision: ${decision.label || 'Conditional Approval'}\nTrust posture: ${decision.score || 'N/A'}\nEvidence confidence: ${decision.evidence_confidence || 'Medium'}\n\nPurpose:\n${report.purpose}\n\nRecommended owner:\n${report.owner}\n\nEvidence gaps:\n${gaps}\n\nRecommended next action:\n${decision.next_action || 'Assign an accountable owner and attach evidence before approval.'}\n\nBoundary:\nThis is a CyberShield static advisory prototype report. It does not represent live enforcement, live monitoring, live email delivery, live ticketing, live CRM sync, or production integration.\n`;
}

function showReport(reportId) {
  const report = REPORTS[reportId] || REPORTS.executive;
  let panel = $('#proof .cs-report-preview');
  if (!panel) { panel = document.createElement('section'); panel.className = 'cs-report-preview'; $('#proof .panel')?.appendChild(panel); }
  panel.dataset.reportId = reportId;
  panel.innerHTML = `<span class="chip">Report Preview</span><h3>${esc(report.title)}</h3><pre class="cs-report-doc">${esc(reportText(reportId))}</pre><h4>Required before download or print</h4><div class="cs-contact-grid"><label>Sender name<input id="senderName"></label><label>Sender email<input id="senderEmail"></label><label>Sender organization<input id="senderOrg" value="${esc(orgName())}"></label><label>Sender role<input id="senderRole"></label><label>Recipient name<input id="recipientName"></label><label>Recipient email<input id="recipientEmail"></label><label>Recipient role<input id="recipientRole"></label><label>Recipient department / organization<input id="recipientOrg"></label></div><div class="actions"><button class="primary" type="button" id="downloadScenarioReport">Download report</button><button type="button" id="printScenarioReport">Print report</button><button type="button" disabled>Email delivery requires backend integration</button></div>`;
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function contactComplete() {
  return ['senderName','senderEmail','senderOrg','senderRole','recipientName','recipientEmail','recipientRole','recipientOrg'].every(id => $(`#${id}`)?.value?.trim());
}

function downloadReport() {
  if (!contactComplete()) { alert('Sender and recipient information is required before download or print.'); return; }
  const id = $('.cs-report-preview')?.dataset.reportId || 'executive';
  const blob = new Blob([reportText(id)], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${id}-cybershield-report.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function printReport() {
  if (!contactComplete()) { alert('Sender and recipient information is required before download or print.'); return; }
  window.print();
}

function enhanceAll() {
  addStyles();
  addDashboardMeters();
  ensureReportLibrary();
  patchCoreLogo();
}

function installHandlers() {
  document.addEventListener('click', event => {
    const routeBtn = event.target.closest('[data-route]');
    if (routeBtn) { navTo(routeBtn.dataset.route); return; }
    const reportCard = event.target.closest('.cs-report-card');
    if (reportCard?.dataset.reportId) { showReport(reportCard.dataset.reportId); return; }
    if (event.target.closest('#downloadScenarioReport')) { downloadReport(); return; }
    if (event.target.closest('#printScenarioReport')) { printReport(); return; }
    const target = event.target.closest('.summary-card,.row');
    if (!target) return;
    const text = target.textContent || '';
    const evidenceLabel = Object.keys(EVIDENCE_EXPLAINERS).find(label => text.includes(label));
    if (evidenceLabel) { showDetail(evidenceLabel, explainEvidence(evidenceLabel, text.includes('Gap') ? 'Gap' : 'Required'), 'evidence'); return; }
    const route = routeFromCardText(text);
    if (route) navTo(route[0], route[1]);
  }, true);

  document.addEventListener('click', event => {
    if (event.target.closest('#mainNav button,#nextStep,#skipDemo,#restartAssessment,#trustBack,#trustDomain,#trustDetail,.node,#layerFilters .row')) setTimeout(enhanceAll, 120);
  }, true);

  document.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target.closest?.('.summary-card,.row,.cs-report-card');
    if (!target) return;
    event.preventDefault();
    target.click();
  });
}

addStyles();
installHandlers();
window.addEventListener('load', () => setTimeout(enhanceAll, 180), { once: true });
setTimeout(enhanceAll, 300);
