import { analyzeRecommendation } from './atdr-engine.js';
import { VENDOR_RISK_CONTRADICTORY_DEMO } from './atdr-demo-data.js';
import { REPORT_CAPTURE_ENDPOINT, CRM_SHEET_ID, REPORT_CAPTURE_MODE } from './report-capture-config.js';

const STATE_KEY = 'cybershield_vendor_risk_stable_2026061142';
const PENDING_KEY = 'cybershield_vendor_risk_stable_pending_captures_2026061142';
const STEPS = ['Identify', 'Recommend', 'Contradict', 'Review', 'Decide', 'Record'];
const DEFAULT_STATE = { step: 0, firstName: '', company: '', vendor: 'Vendor X', contradiction: 'all', email: '' };

const CONTRADICTIONS = {
  all: ['Show all evidence issues', 'SOC 2 scope, data-use terms, subprocessors, incident notification, self-attestation, and business pressure all need review.'],
  soc2: ['SOC 2 scope conflict', 'SOC 2 exists, but the evaluated AI service is not clearly included in scope.'],
  data_use: ['Data-use conflict', 'DPA language allows service improvement and derived data use, so approval needs privacy/legal review.'],
  subprocessors: ['Subprocessor gap', 'AI analytics subprocessors are not fully identified in the evidence package.'],
  incident: ['Incident notification weakness', 'Incident notification language lacks a fixed timeline.'],
  self_attested: ['Self-attested evidence', 'Encryption and questionnaire evidence are vendor assertions, not independent proof.']
};

const esc = value => String(value ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));

function readState() {
  try { return { ...DEFAULT_STATE, ...JSON.parse(sessionStorage.getItem(STATE_KEY) || '{}') }; }
  catch { return { ...DEFAULT_STATE }; }
}

function saveState(next) {
  const state = { ...readState(), ...next };
  sessionStorage.setItem(STATE_KEY, JSON.stringify(state));
  return state;
}

function evidenceText() {
  return VENDOR_RISK_CONTRADICTORY_DEMO.evidence_repository.map(e => `[${e.evidence_name}] ${e.text_extract}`).join('\n');
}

function recommendation(state = readState()) {
  return `AI recommends approving ${state.vendor || 'Vendor X'} because they have a SOC 2 report, encrypt customer data, and appear low risk.`;
}

function buildRecord(state = readState()) {
  return analyzeRecommendation({
    recommendation: recommendation(state),
    domain: 'vendor-risk',
    evidence: evidenceText(),
    aiSource: 'User-pasted AI recommendation',
    sourceModel: 'Unknown',
    intendedUse: 'Vendor approval recommendation review before enterprise action',
    context: `${state.company || 'The organization'} is reviewing ${state.vendor || 'Vendor X'} for an AI-assisted customer support analytics service. ${VENDOR_RISK_CONTRADICTORY_DEMO.decision_context}`,
    decisionOwner: state.firstName ? `${state.firstName} or pending vendor-risk owner assignment` : 'Pending vendor-risk owner assignment',
    createdBy: state.firstName || 'Demo user'
  });
}

function metrics(state = readState()) {
  const record = buildRecord(state);
  return {
    record,
    claims: record.extracted_claims.length,
    conflicts: record.extracted_claims.filter(c => c.conflict_status === 'Material conflict').length,
    missing: record.missing_support.filter(m => m.severity === 'High').length,
    action: record.recommended_action,
    risk: record.risk_if_wrong.band,
    confidence: record.confidence_band,
    review: record.human_review.required ? 'Yes' : 'No'
  };
}

function stepper(state) {
  return `<div class="stepper">${STEPS.map((step, index) => `<button class="step ${state.step === index ? 'active' : ''}" data-step="${index}" type="button"><span class="chip">${index + 1}</span><br>${esc(step)}</button>`).join('')}</div>`;
}

function identify(state) {
  return `<h1>Start with the reviewer, company, and vendor.</h1><p>This stable fallback route proves one workflow: AI-generated vendor recommendation in, defensible AI Trust Decision Record out.</p><div class="grid3"><label>First name<input id="firstName" value="${esc(state.firstName)}" placeholder="Jane"></label><label>Company, optional<input id="company" value="${esc(state.company)}" placeholder="Acme Health"></label><label>Vendor, optional<input id="vendor" value="${esc(state.vendor)}" placeholder="Vendor X"></label></div><div class="callout"><strong>Goal:</strong> show why the AI recommendation is not enough to approve a vendor handling customer data.</div>`;
}

function recommend(state) {
  return `<h1>AI-generated vendor recommendation</h1><p>The recommendation sounds reasonable because it mentions SOC 2, encryption, and low risk.</p><div class="brief-card"><span class="label">Original AI Recommendation</span><h2>${esc(recommendation(state))}</h2></div><div class="grid3"><article class="brief-card"><span class="label">Apparent support</span><p>SOC 2 exists.</p></article><article class="brief-card"><span class="label">Apparent support</span><p>Encryption is claimed.</p></article><article class="brief-card"><span class="label">Unsupported leap</span><p>Appears low risk.</p></article></div>`;
}

function contradict(state) {
  const selected = CONTRADICTIONS[state.contradiction] || CONTRADICTIONS.all;
  const options = Object.entries(CONTRADICTIONS).map(([key, item]) => `<option value="${key}" ${state.contradiction === key ? 'selected' : ''}>${esc(item[0])}</option>`).join('');
  const cards = VENDOR_RISK_CONTRADICTORY_DEMO.evidence_repository.slice(0, 6).map(item => `<article class="brief-card"><span class="label">${esc(item.evidence_name)}</span><p>${esc(item.caveat || item.text_extract)}</p><p><span class="tag ${item.contradiction_flag ? 'bad' : 'warn'}">${item.contradiction_flag ? 'Contradiction' : 'Caveat'}</span><span class="tag ${item.self_attestation_flag ? 'bad' : 'warn'}">${item.self_attestation_flag ? 'Self-attested' : item.source_authority_band}</span></p></article>`).join('');
  return `<h1>Select the contradiction to expose.</h1><label>Contradiction type<select id="contradiction">${options}</select></label><div class="brief-card"><span class="label">Selected Focus</span><h2>${esc(selected[0])}</h2><p>${esc(selected[1])}</p></div><div class="grid3">${cards}</div>`;
}

function review(state) {
  const s = metrics(state);
  const rows = s.record.extracted_claims.map(c => `<tr><td>${esc(c.claim_id)}</td><td>${esc(c.normalized_claim)}</td><td>${esc(c.materiality)}</td><td>${esc(c.conflict_status)}</td></tr>`).join('');
  return `<h1>CyberShield extracts claims and evidence gaps.</h1><div class="grid3"><article class="brief-card"><span class="label">Claims</span><div class="metric">${s.claims}</div></article><article class="brief-card"><span class="label">Conflicts</span><div class="metric bad">${s.conflicts}</div></article><article class="brief-card"><span class="label">Missing support</span><div class="metric warn">${s.missing}</div></article></div><div class="table-wrap"><table><thead><tr><th>ID</th><th>Claim</th><th>Materiality</th><th>Conflict</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function decide(state) {
  const s = metrics(state);
  return `<h1>CyberShield compares candidate actions.</h1><p>The recommendation is not defensible as written. Request Evidence is the strongest defensible action, with escalation required before approval.</p><div class="grid3"><article class="brief-card"><span class="label">Recommended Action</span><div class="metric warn">${esc(s.action)}</div></article><article class="brief-card"><span class="label">Risk If Wrong</span><div class="metric bad">${esc(s.risk)}</div></article><article class="brief-card"><span class="label">Confidence</span><div class="metric warn">${esc(s.confidence)}</div></article></div><div class="table-wrap"><table><thead><tr><th>Candidate Action</th><th>Defensibility</th><th>Why</th></tr></thead><tbody><tr><td>Approve</td><td><span class="tag bad">Not defensible</span></td><td>SOC 2 plus encryption does not prove AI-service scope, data-use terms, subprocessors, or review authority.</td></tr><tr><td>Escalate for Review</td><td><span class="tag warn">Required</span></td><td>Human review is required but does not supply evidence.</td></tr><tr><td>Request Evidence</td><td><span class="tag good">Strongest</span></td><td>Preserves decision defensibility before approval.</td></tr></tbody></table></div>`;
}

function capturePayload(state, eventType) {
  const record = buildRecord(state);
  return {
    event_type: eventType,
    capture_timestamp: new Date().toISOString(),
    first_name: state.firstName,
    company: state.company,
    vendor: state.vendor,
    email: state.email,
    contradiction_type: state.contradiction,
    recommendation_text: recommendation(state),
    report_capture_endpoint_configured: Boolean(REPORT_CAPTURE_ENDPOINT),
    crm_sheet_id: CRM_SHEET_ID,
    report_capture_mode: REPORT_CAPTURE_MODE,
    record_id: record.record_id,
    recommended_action: record.recommended_action,
    risk_if_wrong: record.risk_if_wrong.band,
    confidence_band: record.confidence_band,
    human_review_required: record.human_review.required,
    structured_record_json: record
  };
}

function recordStep(state) {
  const s = metrics(state);
  return `<h1>Generate the AI Trust Decision Record.</h1><p>Enter an email for report follow-up, then save the follow-up record, print the executive brief, or download the structured JSON.</p><div id="captureStatus" class="callout" style="display:none"></div><div class="grid2"><label>Email for report follow-up<input id="email" type="email" value="${esc(state.email)}" placeholder="name@company.com"></label><label>Capture status<input readonly value="${REPORT_CAPTURE_ENDPOINT ? 'Endpoint configured, verify row' : 'Simulation only'}"></label></div><div class="grid3"><article class="brief-card"><span class="label">Record ID</span><p>${esc(s.record.record_id)}</p></article><article class="brief-card"><span class="label">Action</span><div class="metric warn">${esc(s.action)}</div></article><article class="brief-card"><span class="label">Human Review Required</span><div class="metric bad">${esc(s.review)}</div></article></div><div class="actions"><button id="capture" class="primary" type="button">Save Follow-Up</button><button id="print" type="button">Print / Save PDF</button><button id="download" type="button">Download JSON</button></div>`;
}

function printReport(state) {
  const s = metrics(state);
  const rows = s.record.extracted_claims.slice(0, 10).map(c => `<tr><td>${esc(c.claim_id)}</td><td>${esc(c.normalized_claim)}</td><td>${esc(c.materiality)}</td><td>${esc(c.conflict_status)}</td></tr>`).join('');
  return `<h1>AI Trust Decision Record</h1><p><strong>Record ID:</strong> ${esc(s.record.record_id)}<br><strong>Vendor:</strong> ${esc(state.vendor || 'Vendor X')}<br><strong>Prepared for:</strong> ${esc(state.company || 'Demo organization')}<br><strong>Reviewer:</strong> ${esc(state.firstName || 'Pending reviewer')}</p><div class="brief-card"><h2>Executive Decision</h2><p><strong>Recommended Action:</strong> ${esc(s.action)}<br><strong>Risk If Wrong:</strong> ${esc(s.risk)}<br><strong>Confidence Band:</strong> ${esc(s.confidence)}<br><strong>Human Review Required:</strong> ${esc(s.review)}</p><p>The AI recommendation sounded reasonable, but CyberShield showed why approving the vendor without more evidence and human review would be risky and hard to defend.</p></div><h2>Claims and Conflicts</h2><table><thead><tr><th>ID</th><th>Claim</th><th>Materiality</th><th>Conflict</th></tr></thead><tbody>${rows}</tbody></table><h2>Limitations</h2><p>Static prototype. Browser Print / Save PDF export path. Google Sheet capture is prototype-grade and must be verified by row inspection.</p>`;
}

function side(state) {
  const s = metrics(state);
  return `<div class="brief-card"><span class="label">Stable Fallback</span><p><span class="tag good">No add-on route layers</span><span class="tag ${REPORT_CAPTURE_ENDPOINT ? 'good' : 'warn'}">${REPORT_CAPTURE_ENDPOINT ? 'Endpoint configured' : 'Simulation only'}</span></p><p><strong>Action:</strong> ${esc(s.action)}<br><strong>Risk If Wrong:</strong> ${esc(s.risk)}<br><strong>Confidence:</strong> ${esc(s.confidence)}<br><strong>Human Review:</strong> ${esc(s.review)}</p><p><strong>Sheet ID:</strong><br><code>${esc(CRM_SHEET_ID)}</code></p></div>`;
}

function render() {
  const state = readState();
  const panels = [identify, recommend, contradict, review, decide, recordStep];
  document.querySelector('#app').innerHTML = stepper(state) + panels[state.step](state) + (state.step < 5 ? `<div class="actions"><button id="back" ${state.step <= 0 ? 'disabled' : ''}>Back</button><button id="next" class="primary">Next</button></div>` : '');
  document.querySelector('#side').innerHTML = side(state);
  document.querySelector('#printReport').innerHTML = printReport(state);
  bind();
}

function setStatus(text) {
  const el = document.querySelector('#captureStatus');
  if (el) { el.style.display = 'block'; el.textContent = text; }
}

async function capture(eventType) {
  const state = readState();
  const payload = capturePayload(state, eventType);
  if (!state.email) { setStatus('Enter an email before saving follow-up.'); return payload; }
  if (!REPORT_CAPTURE_ENDPOINT) {
    const pending = JSON.parse(sessionStorage.getItem(PENDING_KEY) || '[]');
    pending.push(payload);
    sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending.slice(-10)));
    setStatus('Report prepared. Capture simulated honestly because endpoint is not configured.');
    return payload;
  }
  try {
    await fetch(REPORT_CAPTURE_ENDPOINT, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });
    setStatus('Payload submitted to configured endpoint. Verify the Google Sheet row before claiming capture success.');
  } catch {
    setStatus('Capture failed before submission. Report remains available.');
  }
  return payload;
}

function downloadJson() {
  const payload = capturePayload(readState(), 'download_json');
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cybershield-ai-trust-decision-record-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function bind() {
  ['firstName', 'company', 'vendor', 'contradiction', 'email'].forEach(id => {
    const el = document.querySelector(`#${id}`);
    if (el) el.onchange = event => { saveState({ [id]: event.target.value }); render(); };
  });
  document.querySelectorAll('[data-step]').forEach(button => button.onclick = () => { saveState({ step: Number(button.dataset.step) }); render(); });
  document.querySelector('#back')?.addEventListener('click', () => { saveState({ step: Math.max(0, readState().step - 1) }); render(); });
  document.querySelector('#next')?.addEventListener('click', () => { saveState({ step: Math.min(5, readState().step + 1) }); render(); });
  document.querySelector('#capture')?.addEventListener('click', () => capture('save_follow_up'));
  document.querySelector('#print')?.addEventListener('click', async () => { await capture('print_report'); window.print(); });
  document.querySelector('#download')?.addEventListener('click', async () => { await capture('download_json'); downloadJson(); });
}

document.querySelector('#resetDemo')?.addEventListener('click', () => { sessionStorage.removeItem(STATE_KEY); render(); });
document.querySelector('#regenerateTop')?.addEventListener('click', () => { saveState({ step: 5 }); render(); });
document.querySelector('#printTop')?.addEventListener('click', async () => { await capture('top_print_report'); window.print(); });

sessionStorage.removeItem(STATE_KEY);
render();
