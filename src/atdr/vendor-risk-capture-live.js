import { analyzeRecommendation } from './atdr-engine.js';
import { VENDOR_RISK_CONTRADICTORY_DEMO } from './atdr-demo-data.js';
import { REPORT_CAPTURE_ENDPOINT, CRM_SHEET_ID, REPORT_CAPTURE_MODE } from './report-capture-config.js';

const STATE_KEY = 'cybershield_vendor_risk_guided_2026061029';
const FALLBACK_STATE = { firstName: '', company: '', vendor: 'Vendor X', contradiction: 'all', email: '' };
const CONTRADICTION_LABELS = {
  all: 'Show all evidence issues',
  soc2: 'SOC 2 scope conflict',
  data_use: 'Data-use conflict',
  subprocessors: 'Subprocessor gap',
  incident: 'Incident notification weakness',
  self_attested: 'Self-attested evidence'
};

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

function status(message) {
  const el = document.querySelector('#captureStatus');
  if (!el) return;
  el.style.display = 'block';
  el.textContent = message;
}

function markConnected() {
  document.querySelectorAll('input[readonly]').forEach(input => {
    if (input.value && input.value.toLowerCase().includes('google sheets')) input.value = REPORT_CAPTURE_ENDPOINT ? 'Connected to Google Sheets' : 'Google Sheets connection pending';
  });
}

async function saveFollowUp(event) {
  const button = event.target.closest?.('#capture');
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  const email = document.querySelector('#email')?.value?.trim() || '';
  saveState({ email });
  if (!email) {
    status('Enter an email before saving follow-up.');
    return;
  }
  if (!REPORT_CAPTURE_ENDPOINT) {
    status('Google Sheets endpoint is not configured yet.');
    return;
  }

  button.disabled = true;
  const originalText = button.textContent;
  button.textContent = 'Saving...';
  try {
    const response = await fetch(REPORT_CAPTURE_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload())
    });
    const text = await response.text();
    status(response.ok ? 'Follow-up saved to Google Sheets.' : `Google Sheets save failed with status ${response.status}: ${text}`);
  } catch (error) {
    status(`Google Sheets save failed: ${String(error)}`);
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

document.addEventListener('click', saveFollowUp, true);
new MutationObserver(markConnected).observe(document.body, { childList: true, subtree: true });
markConnected();
