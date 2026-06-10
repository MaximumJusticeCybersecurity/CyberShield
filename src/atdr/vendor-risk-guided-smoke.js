import { analyzeRecommendation, exportJson } from './atdr-engine.js';
import { VENDOR_RISK_CONTRADICTORY_DEMO } from './atdr-demo-data.js';

const evidenceText = VENDOR_RISK_CONTRADICTORY_DEMO.evidence_repository.map(e => `[${e.evidence_name}] ${e.text_extract}`).join('\n');
const recommendation = 'AI recommends approving Vendor X because they have a SOC 2 report, encrypt customer data, and appear low risk.';
const record = analyzeRecommendation({ recommendation, domain: 'vendor-risk', evidence: evidenceText, aiSource: 'Static guided route smoke test', sourceModel: 'Unknown', intendedUse: 'Vendor approval recommendation review before enterprise action', context: VENDOR_RISK_CONTRADICTORY_DEMO.decision_context, decisionOwner: 'Guided route QA', createdBy: 'Guided route smoke test' });
let jsonParseable = false;
try { JSON.parse(exportJson(record)); jsonParseable = true; } catch { jsonParseable = false; }
const payload = { event_type: 'guided_route_smoke_capture', capture_timestamp: new Date().toISOString(), first_name: 'QA', company: 'Demo Company', vendor: 'Vendor X', email: 'qa@example.invalid', contradiction_type: 'all', contradiction_label: 'Show all evidence issues', report_capture_endpoint_configured: false, crm_sheet_id: '1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw', record_id: record.record_id, recommended_action: record.recommended_action, risk_if_wrong: record.risk_if_wrong.band, confidence_band: record.confidence_band, human_review_required: record.human_review.required, structured_record_json: record };

function check(name, pass, detail = '') { return { name, pass, detail }; }
const checks = [
  check('Vendor-risk record is created', Boolean(record.record_id), record.record_id),
  check('Domain remains vendor-risk', record.domain === 'vendor-risk', record.domain),
  check('Claims extracted equals 10', record.extracted_claims.length === 10, `${record.extracted_claims.length} claims`),
  check('Recommended action is Request Evidence', record.recommended_action === 'Request Evidence', record.recommended_action),
  check('Risk If Wrong is High', record.risk_if_wrong.band === 'High', record.risk_if_wrong.band),
  check('Confidence is Low confidence', record.confidence_band === 'Low confidence', record.confidence_band),
  check('Human review is required', record.human_review.required === true, String(record.human_review.required)),
  check('Framework mappings warn not verified compliant', record.applicable_framework_references.every(f => f.compliance_warning_text.includes('Not verified as compliant')), `${record.applicable_framework_references.length} mapping(s)`),
  check('JSON export is parseable', jsonParseable, 'exportJson(record)'),
  check('CRM payload includes structured record JSON', payload.structured_record_json?.record_id === record.record_id, payload.record_id),
  check('CRM endpoint remains explicitly not configured', payload.report_capture_endpoint_configured === false, String(payload.report_capture_endpoint_configured))
];

const passed = checks.filter(c => c.pass).length;
const failed = checks.length - passed;
const rows = checks.map(c => `<tr><td class="${c.pass ? 'pass' : 'fail'}">${c.pass ? 'PASS' : 'FAIL'}</td><td>${c.name}</td><td>${c.detail}</td></tr>`).join('');
document.querySelector('#result').innerHTML = `<h2>${failed ? 'NO-GO' : 'GO'}: Guided vendor-risk route contract</h2><p><span class="tag pass">${passed} passed</span><span class="tag ${failed ? 'fail' : 'pass'}">${failed} failed</span></p><table><thead><tr><th>Status</th><th>Check</th><th>Detail</th></tr></thead><tbody>${rows}</tbody></table><h2>Payload Preview</h2><pre>${JSON.stringify(payload, null, 2).slice(0, 2200)}\n...</pre>`;
