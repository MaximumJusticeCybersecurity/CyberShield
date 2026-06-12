import { analyzeRecommendation } from './atdr-engine.js';
import { VENDOR_RISK_CONTRADICTORY_DEMO } from './atdr-demo-data.js';
import { REPORT_CAPTURE_ENDPOINT, CRM_SHEET_ID, REPORT_CAPTURE_MODE } from './report-capture-config.js';

const STATE_KEY = 'cybershield_vendor_risk_guided_2026061029';
const CAPTURE_AUDIT_KEY = 'cybershield_capture_audit_2026061125';
const FALLBACK_STATE = { firstName: '', company: '', vendor: 'Vendor X', contradiction: 'all', email: '' };
const CONTRADICTION_LABELS = {
  all: 'Show all evidence issues',
  soc2: 'SOC 2 scope conflict',
  data_use: 'Data-use conflict',
  subprocessors: 'Subprocessor gap',
  incident: 'Incident notification weakness',
  self_attested: 'Self-attested evidence'
};
const CONTRADICTION_SUMMARIES = {
  all: 'SOC 2 scope, data-use terms, subprocessors, incident notification, self-attestation, and business pressure all need review.',
  soc2: 'SOC 2 exists, but the evaluated AI service is not clearly included in scope.',
  data_use: 'Data-use language allows service improvement and derived use, so privacy and legal review are required.',
  subprocessors: 'AI analytics subprocessors are not fully identified in the evidence package.',
  incident: 'Incident notification language lacks a fixed timeline.',
  self_attested: 'Encryption and questionnaire evidence are vendor assertions, not independent proof.'
};
const CAPTURE_STATES = {
  ready: { label: 'Ready', className: 'good' },
  blocked: { label: 'Blocked', className: 'bad' },
  saving: { label: 'Saving', className: 'warn' },
  submitted_for_verification: { label: 'Submitted, verify row', className: 'warn' },
  failed: { label: 'Failed', className: 'bad' },
  simulated: { label: 'Simulated only', className: 'warn' }
};

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function state() {
  try { return { ...FALLBACK_STATE, ...JSON.parse(localStorage.getItem(STATE_KEY) || '{}') }; }
  catch { return { ...FALLBACK_STATE }; }
}

function saveState(next) {
  localStorage.setItem(STATE_KEY, JSON.stringify({ ...state(), ...next }));
}

function evidenceText() {
  return VENDOR_RISK_CONTRADICTORY_DEMO.evidence_repository.map(e => `[${e.evidence_name}] ${e.text_extract}`).join('\n');
}

function recommendation(s) {
  return `AI recommends approving ${s.vendor || 'Vendor X'} because they have a SOC 2 report, encrypt customer data, and appear low risk.`;
}

function makeRecord(s) {
  return analyzeRecommendation({
    recommendation: recommendation(s),
    domain: 'vendor-risk',
    evidence: evidenceText(),
    aiSource: 'User-pasted AI recommendation',
    sourceModel: 'Unknown',
    intendedUse: 'Vendor approval recommendation review before enterprise action',
    context: VENDOR_RISK_CONTRADICTORY_DEMO.decision_context,
    decisionOwner: s.firstName ? `${s.firstName} or pending vendor-risk owner assignment` : 'Pending vendor-risk owner assignment',
    createdBy: s.firstName || 'Demo user'
  });
}

function payload(eventType = 'guided_report_capture_live') {
  const s = state();
  const record = makeRecord(s);
  return {
    event_type: eventType,
    capture_timestamp: new Date().toISOString(),
    first_name: s.firstName,
    company: s.company,
    vendor: s.vendor,
    email: s.email,
    contradiction_type: s.contradiction,
    contradiction_label: CONTRADICTION_LABELS[s.contradiction] || CONTRADICTION_LABELS.all,
    report_capture_endpoint_configured: Boolean(REPORT_CAPTURE_ENDPOINT),
    report_capture_mode: REPORT_CAPTURE_MODE,
    crm_sheet_id: CRM_SHEET_ID,
    record_id: record.record_id,
    recommended_action: record.recommended_action,
    risk_if_wrong: record.risk_if_wrong.band,
    confidence_band: record.confidence_band,
    human_review_required: record.human_review.required,
    structured_record_json: record
  };
}

function installCaptureStyles() {
  if (document.querySelector('#captureValidationStyles')) return;
  const style = document.createElement('style');
  style.id = 'captureValidationStyles';
  style.textContent = `
    .capture-status-card{border-left:5px solid var(--amber);background:rgba(255,209,102,.08);border-radius:12px;padding:10px 12px;margin:10px 0;color:var(--muted)}
    .capture-status-card.good{border-left-color:var(--green);background:rgba(119,225,161,.08)}
    .capture-status-card.bad{border-left-color:var(--red);background:rgba(255,116,116,.08)}
    .capture-status-card .capture-state-label{font-weight:800;color:var(--text)}
    .capture-audit-list{max-height:220px;overflow:auto;font-size:.86rem;margin-top:8px}
    .capture-audit-list code{white-space:normal;word-break:break-word}
    @media print{.capture-status-card{display:none!important}}
  `;
  document.head.appendChild(style);
}

function auditEntries() {
  try { return JSON.parse(localStorage.getItem(CAPTURE_AUDIT_KEY) || '[]'); }
  catch { return []; }
}

function writeAudit(entry) {
  const entries = [entry, ...auditEntries()].slice(0, 10);
  localStorage.setItem(CAPTURE_AUDIT_KEY, JSON.stringify(entries));
  renderCaptureAudit();
}

function stateConfig(stateKey) {
  return CAPTURE_STATES[stateKey] || CAPTURE_STATES.ready;
}

function setCaptureStatus(stateKey, message, detail = '') {
  installCaptureStyles();
  let el = document.querySelector('#captureStatus');
  if (!el) {
    const captureButton = document.querySelector('#capture');
    if (captureButton?.parentElement) {
      el = document.createElement('div');
      el.id = 'captureStatus';
      captureButton.parentElement.insertAdjacentElement('afterend', el);
    }
  }
  if (!el) return;
  const cfg = stateConfig(stateKey);
  el.className = `capture-status-card ${cfg.className}`;
  el.style.display = 'block';
  el.innerHTML = `<span class="capture-state-label">${escapeHtml(cfg.label)}:</span> ${escapeHtml(message)}${detail ? `<br><small>${escapeHtml(detail)}</small>` : ''}`;
}

function renderCaptureAudit() {
  installCaptureStyles();
  const side = document.querySelector('#side');
  if (!side) return;
  let panel = document.querySelector('#captureAuditPanel');
  if (!panel) {
    panel = document.createElement('section');
    panel.id = 'captureAuditPanel';
    panel.className = 'brief-card';
    side.appendChild(panel);
  }
  const entries = auditEntries();
  panel.innerHTML = `
    <span class="label">Capture Audit</span>
    <p><span class="tag ${REPORT_CAPTURE_ENDPOINT ? 'good' : 'warn'}">${REPORT_CAPTURE_ENDPOINT ? 'Endpoint configured' : 'Endpoint not configured'}</span><span class="tag warn">Prototype capture</span></p>
    <p>Capture status is auditable here, but Google Sheets row verification remains the final proof.</p>
    <div class="capture-audit-list">${entries.length ? entries.map(entry => `<p><strong>${escapeHtml(entry.status)}</strong> · ${escapeHtml(entry.timestamp)}<br><code>${escapeHtml(entry.record_id || 'no-record-id')}</code><br>${escapeHtml(entry.message)}</p>`).join('') : '<p>No capture attempts in this browser.</p>'}</div>
  `;
}

function markConnected() {
  document.querySelectorAll('input[readonly]').forEach(input => {
    if (input.value && input.value.toLowerCase().includes('google sheets')) input.value = REPORT_CAPTURE_ENDPOINT ? 'Connected to Google Sheets endpoint, verify submitted rows' : 'Google Sheets endpoint not configured';
    if (input.value && input.value.toLowerCase().includes('connected')) input.value = REPORT_CAPTURE_ENDPOINT ? 'Connected to Google Sheets endpoint, verify submitted rows' : 'Google Sheets endpoint not configured';
  });
}

function claimsRows(record) {
  return record.extracted_claims.slice(0, 10).map(claim => `<tr><td>${escapeHtml(claim.claim_id)}</td><td>${escapeHtml(claim.normalized_claim)}</td><td>${escapeHtml(claim.materiality)}</td><td>${escapeHtml(claim.conflict_status)}</td></tr>`).join('');
}

function evidenceRows() {
  return [
    ['Current SOC 2 report and scope confirmation', 'Needed to prove the evaluated AI service is actually covered.'],
    ['AI service/system description inclusion', 'Needed to verify the recommendation applies to the system being approved.'],
    ['DPA/customer data-use restriction', 'Needed to confirm customer data is not reused beyond approved purposes.'],
    ['Complete subprocessor list', 'Needed to identify AI analytics providers and downstream access.'],
    ['Incident notification timeline', 'Needed to confirm timely notice obligations.'],
    ['Independent encryption/key-management evidence', 'Needed because vendor assertions alone are weak evidence.'],
    ['Vendor-risk owner, Security SME, Legal/Privacy, and Business Owner review', 'Needed because the decision has security, legal, operational, and business consequences.']
  ].map(row => `<tr><td>${escapeHtml(row[0])}</td><td>${escapeHtml(row[1])}</td></tr>`).join('');
}

function executiveReportHtml() {
  const s = state();
  const record = makeRecord(s);
  const contradiction = s.contradiction || 'all';
  const contradictionLabel = CONTRADICTION_LABELS[contradiction] || CONTRADICTION_LABELS.all;
  const contradictionSummary = CONTRADICTION_SUMMARIES[contradiction] || CONTRADICTION_SUMMARIES.all;
  return `
    <h1>AI Trust Decision Record</h1>
    <p><strong>Record ID:</strong> ${escapeHtml(record.record_id)}<br><strong>Vendor:</strong> ${escapeHtml(s.vendor || 'Vendor X')}<br><strong>Prepared for:</strong> ${escapeHtml(s.company || 'Demo organization')}<br><strong>Reviewer:</strong> ${escapeHtml(s.firstName || 'Pending reviewer')}</p>
    <div class="brief-card"><h2>Executive Decision Summary</h2><p><strong>CyberShield Recommended Action:</strong> ${escapeHtml(record.recommended_action)}<br><strong>Risk If Wrong:</strong> ${escapeHtml(record.risk_if_wrong.band)}<br><strong>Confidence Band:</strong> ${escapeHtml(record.confidence_band)}<br><strong>Human Review Required:</strong> ${record.human_review.required ? 'Yes' : 'No'}<br><strong>Record Defensibility:</strong> ${escapeHtml(record.record_defensibility_band || 'Not defensible without additional evidence')}</p><p>CyberShield does not recommend approving this vendor based on the AI recommendation as written. The strongest defensible action is <strong>Request Evidence</strong>. The recommendation depends on material claims that are unsupported, partially supported, self-attested, or contradicted by available evidence.</p></div>
    <div class="brief-card"><h2>Original AI Recommendation</h2><p>${escapeHtml(recommendation(s))}</p></div>
    <div class="brief-card"><h2>Why the AI Recommendation Fails</h2><p>The AI recommendation treats SOC 2 and encryption as sufficient approval evidence. CyberShield found this conclusion is not defensible because the evidence does not fully prove service scope, customer data-use limits, subprocessor transparency, incident notification timing, or accountable human approval.</p><p><strong>Evidence issue focus:</strong> ${escapeHtml(contradictionLabel)}. ${escapeHtml(contradictionSummary)}</p></div>
    <h2>Material Claims and Evidence Conflicts</h2><p>CyberShield separated the recommendation into material claims and identified what evidence would be needed before the recommendation could support a defensible approval decision.</p><table><thead><tr><th>ID</th><th>Claim</th><th>Materiality</th><th>Conflict</th></tr></thead><tbody>${claimsRows(record)}</tbody></table>
    <h2>Required Evidence Before Approval</h2><table><thead><tr><th>Required Evidence</th><th>Why It Matters</th></tr></thead><tbody>${evidenceRows()}</tbody></table>
    <h2>Candidate Action Comparison</h2><table><thead><tr><th>Candidate Action</th><th>Defensibility</th><th>Reason</th></tr></thead><tbody><tr><td>Approve</td><td>Not defensible</td><td>Material evidence gaps and conflicts remain.</td></tr><tr><td>Accept with Caveat</td><td>Premature</td><td>Caveats are unresolved and material.</td></tr><tr><td>Escalate for Review</td><td>Required but incomplete</td><td>Human review is required, but evidence is still needed.</td></tr><tr><td>Request Evidence</td><td>Strongest defensible action</td><td>Preserves decision defensibility before approval.</td></tr></tbody></table>
    <h2>Human Review Requirement</h2><p>Human review is required because the recommendation could create vendor-risk, legal, security, operational, and reputational consequences if wrong.</p><ul><li>Vendor-Risk Owner</li><li>Security SME</li><li>Legal/Privacy reviewer when data terms are implicated</li><li>Business Owner</li></ul>
    <h2>Limitations</h2><ul><li>Static prototype using deterministic analysis logic.</li><li>No live LLM-backed analyzer, production authentication, tenant isolation, malware scanning, or production archive.</li><li>No server-side PDF/DOCX generation. Browser Print / Save PDF is the current export path.</li><li>Framework mappings are relevance mappings only and are not compliance proof.</li><li>Google Sheets capture is prototype-grade and is not production CRM infrastructure.</li></ul>
    <p><strong>Prepared by CyberShield, powered by Maximum Justice Cybersecurity.</strong></p>
  `;
}

function updatePrintReport() {
  const printReport = document.querySelector('#printReport');
  if (!printReport) return;
  printReport.innerHTML = executiveReportHtml();
}

async function saveFollowUp(event) {
  const button = event.target.closest?.('#capture');
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  const email = document.querySelector('#email')?.value?.trim() || '';
  saveState({ email });
  const attempt = payload('guided_report_capture_attempt');
  if (!email) {
    setCaptureStatus('blocked', 'Enter an email before saving follow-up.', 'No payload was submitted.');
    writeAudit({ timestamp: new Date().toISOString(), status: 'blocked_missing_email', record_id: attempt.record_id, message: 'Capture blocked because email was missing.' });
    return;
  }
  if (!REPORT_CAPTURE_ENDPOINT) {
    setCaptureStatus('simulated', 'Google Sheets endpoint is not configured. No follow-up was submitted.', 'This is safe prototype behavior.');
    writeAudit({ timestamp: new Date().toISOString(), status: 'simulated_no_endpoint', record_id: attempt.record_id, message: 'Endpoint not configured. Capture was not submitted.' });
    return;
  }

  button.disabled = true;
  const originalText = button.textContent;
  button.textContent = 'Saving...';
  setCaptureStatus('saving', 'Sending follow-up payload to configured endpoint.', 'Do not close the page until the send attempt finishes.');
  writeAudit({ timestamp: new Date().toISOString(), status: 'saving', record_id: attempt.record_id, message: 'Capture send started.' });
  try {
    await fetch(REPORT_CAPTURE_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({ ...attempt, event_type: 'guided_report_capture_live' })
    });
    setCaptureStatus('submitted_for_verification', 'Payload was submitted to the configured endpoint.', 'Because this prototype uses no-cors, browser success only means the request was sent. Verify the Google Sheet row before claiming capture success.');
    writeAudit({ timestamp: new Date().toISOString(), status: 'submitted_for_verification', record_id: attempt.record_id, message: 'Request sent. Sheet row verification required.' });
  } catch (error) {
    setCaptureStatus('failed', 'Google Sheets send failed before submission.', String(error));
    writeAudit({ timestamp: new Date().toISOString(), status: 'failed_before_submission', record_id: attempt.record_id, message: String(error) });
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

document.addEventListener('click', saveFollowUp, true);
new MutationObserver(() => { markConnected(); updatePrintReport(); renderCaptureAudit(); }).observe(document.body, { childList: true, subtree: true });
installCaptureStyles();
markConnected();
updatePrintReport();
renderCaptureAudit();
