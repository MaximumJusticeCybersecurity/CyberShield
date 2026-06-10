import { VENDOR_RISK_CONTRADICTORY_DEMO } from './atdr-demo-data.js';

const REPORT_CAPTURE_ENDPOINT = '';
const STATE_KEY = 'cybershield_vendor_risk_loop_2026061015';
const CAPTURE_KEY = 'cybershield_pending_report_captures_2026061015';
const PANEL_ID = 'vendorRiskLoopPanel';
const BRIEF_ID = 'vendorRiskLoopBrief';
const CONTRADICTIONS = {
  all: {
    label: 'Show all evidence issues',
    summary: 'SOC 2 scope, data use, subprocessors, incident notification, self-attestation, and business pressure all need review.',
    evidence: ['SOC 2 scope mismatch', 'DPA data-use caveat', 'Incomplete AI subprocessors', 'Weak incident notice', 'Self-attested security evidence']
  },
  soc2: {
    label: 'SOC 2 scope conflict',
    summary: 'SOC 2 exists, but the evaluated AI service is not clearly included in scope.',
    evidence: ['SOC 2 report exists', 'AI analytics modules not expressly listed', 'Scope validation required before approval']
  },
  data_use: {
    label: 'Data-use conflict',
    summary: 'DPA language allows service improvement and derived data use, so approval needs privacy/legal review.',
    evidence: ['DPA permits service improvement', 'Product analytics language requires review', 'Customer data use restriction missing']
  },
  subprocessors: {
    label: 'Subprocessor gap',
    summary: 'AI analytics subprocessors are available upon request but not fully identified in the evidence package.',
    evidence: ['Primary subprocessors listed', 'AI service providers not named', 'Subprocessor change notice review required']
  },
  incident: {
    label: 'Incident notification weakness',
    summary: 'Incident notification says without undue delay but does not define a fixed timeline.',
    evidence: ['Notification clause exists', 'Specific timeline missing', 'Sensitive-data use case requires stronger terms']
  },
  self_attested: {
    label: 'Self-attested evidence',
    summary: 'Encryption and questionnaire evidence are vendor assertions and should not be treated as independent proof.',
    evidence: ['Encryption note is vendor assertion', 'Questionnaire is self-attested', 'Independent validation required']
  }
};

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function loadState() {
  try { return { contradiction: 'all', firstName: '', company: '', vendor: 'Vendor X', email: '', ...JSON.parse(localStorage.getItem(STATE_KEY) || '{}') }; }
  catch { return { contradiction: 'all', firstName: '', company: '', vendor: 'Vendor X', email: '' }; }
}

function saveState(next) {
  const state = { ...loadState(), ...next };
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
  return state;
}

function currentRecordFromDom() {
  const pre = document.querySelector('#workspace pre');
  if (!pre) return null;
  try { return JSON.parse(pre.textContent); } catch { return null; }
}

function generatedRecommendation(vendor = 'Vendor X') {
  const safeVendor = vendor?.trim() || 'Vendor X';
  return `AI recommends approving ${safeVendor} because they have a SOC 2 report, encrypt customer data, and appear low risk.`;
}

function setField(selector, value) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.value = value;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}

function click(selector) {
  document.querySelector(selector)?.click();
}

function buildPanel() {
  const state = loadState();
  const active = CONTRADICTIONS[state.contradiction] || CONTRADICTIONS.all;
  const options = Object.entries(CONTRADICTIONS).map(([value, item]) => `<option value="${escapeHtml(value)}" ${state.contradiction === value ? 'selected' : ''}>${escapeHtml(item.label)}</option>`).join('');
  return `
    <section id="${PANEL_ID}" class="panel">
      <span class="chip">Vendor-Risk Demo First</span>
      <h1>One Complete Vendor-Risk Trust Decision Loop</h1>
      <p>The proof is one end-to-end path: an AI vendor approval recommendation sounds reasonable, then CyberShield shows why approval without evidence and human review is risky and hard to defend.</p>
      <div class="notice"><strong>Build rule:</strong> vendor-risk loop first. Secondary screens and future-state concepts are subordinate until this path is complete.</div>
      <div class="grid3" style="margin-top:14px">
        <label>First name<input id="vrFirstName" autocomplete="given-name" placeholder="Jane" value="${escapeHtml(state.firstName)}"></label>
        <label>Company, optional<input id="vrCompany" autocomplete="organization" placeholder="Acme Health" value="${escapeHtml(state.company)}"></label>
        <label>Vendor, optional<input id="vrVendor" placeholder="Vendor X" value="${escapeHtml(state.vendor)}"></label>
      </div>
      <label>Contradiction type<select id="vrContradiction">${options}</select></label>
      <div class="brief-card">
        <span class="label">Selected contradiction focus</span>
        <h3>${escapeHtml(active.label)}</h3>
        <p>${escapeHtml(active.summary)}</p>
        <p>${active.evidence.map(item => `<span class="tag warn">${escapeHtml(item)}</span>`).join('')}</p>
      </div>
      <div class="actions">
        <button id="vrGenerate" class="primary" type="button">Generate Vendor-Risk Recommendation</button>
        <button id="vrLoad" type="button">Load Vendor-Risk Sample</button>
        <button id="vrJumpReport" type="button">Go to Report Generation</button>
      </div>
      <div class="grid3" style="margin-top:14px">
        <article class="brief-card"><span class="label">Strongest defensible action</span><div class="metric warn">Request Evidence</div><p>Approval is not defensible until scope, data use, subprocessors, and reviewer authority are resolved.</p></article>
        <article class="brief-card"><span class="label">Escalation</span><div class="metric bad">Review Required</div><p>Vendor-Risk Owner, Security SME, Legal Counsel, and Business Owner must review before approval.</p></article>
        <article class="brief-card"><span class="label">Buyer takeaway</span><p>The recommendation sounds reasonable, but SOC 2 plus encryption is not enough to approve an AI vendor.</p></article>
      </div>
    </section>
  `;
}

function buildBrief() {
  const state = loadState();
  const active = CONTRADICTIONS[state.contradiction] || CONTRADICTIONS.all;
  return `
    <section id="${BRIEF_ID}" class="brief-card">
      <span class="label">Vendor-Risk Loop Status</span>
      <h3>End-to-end proof path</h3>
      <ol style="padding-left:18px;color:var(--muted)">
        <li>Enter first name, optional company, optional vendor.</li>
        <li>Generate or load the AI vendor-risk recommendation.</li>
        <li>Select contradiction type: <strong>${escapeHtml(active.label)}</strong>.</li>
        <li>Review claims, evidence, gaps, validators, and actions.</li>
        <li>Generate report, enter email, print or download.</li>
      </ol>
      <div class="brief-card"><span class="label">Validator checks</span><ul style="padding-left:18px;color:var(--muted)"><li>SOC 2 is not automatic approval.</li><li>Framework relevance is not compliance proof.</li><li>Self-attested evidence is weak.</li><li>Scope mismatch blocks defensibility.</li><li>Human review is required.</li></ul></div>
      <div class="brief-card"><span class="label">Candidate action comparison</span><table style="min-width:0"><tbody><tr><td>Approve</td><td><span class="tag bad">Not defensible</span></td></tr><tr><td>Accept with caveat</td><td><span class="tag warn">Premature</span></td></tr><tr><td>Escalate</td><td><span class="tag warn">Required</span></td></tr><tr><td>Request Evidence</td><td><span class="tag good">Strongest</span></td></tr></tbody></table></div>
    </section>
  `;
}

function buildReportCaptureCard() {
  const state = loadState();
  return `
    <section id="vendorRiskReportCapture" class="panel">
      <span class="chip">Report Generation</span>
      <h2>Email Capture and CRM Payload</h2>
      <p>Enter email only when generating the report. If a report capture endpoint is configured later, CyberShield will submit metadata plus structured record JSON. This static prototype does not store Google credentials.</p>
      <div class="grid2"><label>Email for report follow-up<input id="vrEmail" type="email" autocomplete="email" placeholder="name@company.com" value="${escapeHtml(state.email)}"></label><label>Capture endpoint status<input readonly value="${REPORT_CAPTURE_ENDPOINT ? 'Configured' : 'Not configured. Capture will be simulated honestly.'}"></label></div>
      <div class="actions"><button id="vrPrepareCapture" class="primary" type="button">Prepare Report Capture Payload</button></div>
      <pre id="vrCapturePreview" style="white-space:pre-wrap;max-height:260px;overflow:auto"></pre>
    </section>
  `;
}

function renderLoop() {
  const workspace = document.querySelector('#workspace');
  const brief = document.querySelector('#decisionBrief');
  if (!workspace || !brief) return;
  if (!document.querySelector(`#${PANEL_ID}`)) workspace.insertAdjacentHTML('afterbegin', buildPanel());
  if (!document.querySelector(`#${BRIEF_ID}`)) brief.insertAdjacentHTML('afterbegin', buildBrief());
  if (document.querySelector('#stageRail button.active')?.textContent?.includes('Export') && !document.querySelector('#vendorRiskReportCapture')) {
    workspace.insertAdjacentHTML('afterbegin', buildReportCaptureCard());
  }
  wireHandlers();
}

function updateLoopPanels() {
  document.querySelector(`#${PANEL_ID}`)?.remove();
  document.querySelector(`#${BRIEF_ID}`)?.remove();
  document.querySelector('#vendorRiskReportCapture')?.remove();
  renderLoop();
}

function wireHandlers() {
  const first = document.querySelector('#vrFirstName');
  const company = document.querySelector('#vrCompany');
  const vendor = document.querySelector('#vrVendor');
  const contradiction = document.querySelector('#vrContradiction');
  first && (first.onchange = e => saveState({ firstName: e.target.value }));
  company && (company.onchange = e => saveState({ company: e.target.value }));
  vendor && (vendor.onchange = e => saveState({ vendor: e.target.value }));
  contradiction && (contradiction.onchange = e => { saveState({ contradiction: e.target.value }); updateLoopPanels(); });
  document.querySelector('#vrLoad') && (document.querySelector('#vrLoad').onclick = () => click('#loadDemoTop'));
  document.querySelector('#vrGenerate') && (document.querySelector('#vrGenerate').onclick = () => {
    const state = saveState({
      firstName: document.querySelector('#vrFirstName')?.value || '',
      company: document.querySelector('#vrCompany')?.value || '',
      vendor: document.querySelector('#vrVendor')?.value || 'Vendor X',
      contradiction: document.querySelector('#vrContradiction')?.value || 'all'
    });
    setField('#demoMode', 'vendor-risk-contradictory-evidence');
    setField('#domain', 'vendor-risk');
    setField('#recommendation', generatedRecommendation(state.vendor));
    setField('#context', `${state.company ? `${state.company} is reviewing` : 'The organization is reviewing'} ${state.vendor || 'Vendor X'} for an AI-assisted customer support analytics service. Contradiction focus: ${CONTRADICTIONS[state.contradiction]?.label || CONTRADICTIONS.all.label}. ${VENDOR_RISK_CONTRADICTORY_DEMO.decision_context}`);
    setField('#intendedUse', 'Vendor approval recommendation review before enterprise action');
    setField('#decisionOwner', state.firstName ? `${state.firstName} or pending vendor-risk owner assignment` : 'Pending vendor-risk owner assignment');
    click('#analyze');
  });
  document.querySelector('#vrJumpReport') && (document.querySelector('#vrJumpReport').onclick = () => [...document.querySelectorAll('[data-stage]')].find(button => button.dataset.stage === 'Export')?.click());
  document.querySelector('#vrEmail') && (document.querySelector('#vrEmail').onchange = e => saveState({ email: e.target.value }));
  document.querySelector('#vrPrepareCapture') && (document.querySelector('#vrPrepareCapture').onclick = prepareCapture);
}

function capturePayload(eventType = 'report_capture_prepared') {
  const state = loadState();
  const record = currentRecordFromDom();
  return {
    event_type: eventType,
    capture_timestamp: new Date().toISOString(),
    first_name: state.firstName,
    company: state.company,
    vendor: state.vendor,
    email: state.email,
    contradiction_type: state.contradiction,
    contradiction_label: CONTRADICTIONS[state.contradiction]?.label || CONTRADICTIONS.all.label,
    report_capture_endpoint_configured: Boolean(REPORT_CAPTURE_ENDPOINT),
    crm_sheet_id: '1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw',
    record_id: record?.record_id || '',
    recommended_action: record?.recommended_action || 'Request Evidence',
    risk_if_wrong: record?.risk_if_wrong?.band || 'High',
    confidence_band: record?.confidence_band || 'Low confidence',
    human_review_required: record?.human_review?.required ?? true,
    structured_record_json: record || null
  };
}

function persistPendingCapture(payload) {
  const existing = JSON.parse(localStorage.getItem(CAPTURE_KEY) || '[]');
  existing.push(payload);
  localStorage.setItem(CAPTURE_KEY, JSON.stringify(existing.slice(-20)));
}

async function prepareCapture(eventType = 'report_capture_prepared') {
  const email = document.querySelector('#vrEmail')?.value || loadState().email;
  saveState({ email });
  const payload = capturePayload(eventType);
  if (!REPORT_CAPTURE_ENDPOINT) {
    persistPendingCapture(payload);
    console.info('CyberShield report capture simulated. Configure REPORT_CAPTURE_ENDPOINT to submit to CRM/Google Sheet.', payload);
    const preview = document.querySelector('#vrCapturePreview');
    if (preview) preview.textContent = JSON.stringify({ status: 'simulated_not_submitted', reason: 'REPORT_CAPTURE_ENDPOINT is blank', payload }, null, 2);
    return payload;
  }
  try {
    const res = await fetch(REPORT_CAPTURE_ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
    const preview = document.querySelector('#vrCapturePreview');
    if (preview) preview.textContent = JSON.stringify({ status: res.ok ? 'submitted' : 'failed', http_status: res.status, payload }, null, 2);
  } catch (error) {
    persistPendingCapture({ ...payload, error: String(error) });
    const preview = document.querySelector('#vrCapturePreview');
    if (preview) preview.textContent = JSON.stringify({ status: 'failed_pending_retry', error: String(error), payload }, null, 2);
  }
  return payload;
}

function installReportCaptureListeners() {
  document.addEventListener('click', event => {
    const id = event.target?.id;
    if (['printPdf', 'printTop', 'downloadJson', 'downloadJsonTop'].includes(id)) prepareCapture(`${id}_clicked`);
  }, true);
}

const observer = new MutationObserver(renderLoop);
observer.observe(document.body, { childList: true, subtree: true });
installReportCaptureListeners();
renderLoop();

export { renderLoop, prepareCapture };