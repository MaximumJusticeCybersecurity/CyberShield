import { analyzeRecommendation, exportJson } from './atdr-engine.js';
import { VENDOR_RISK_CONTRADICTORY_DEMO } from './atdr-demo-data.js';

function esc(value) { return String(value ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
function check(name, pass, detail = '') { return { name, pass, detail }; }
function evidenceText() { return VENDOR_RISK_CONTRADICTORY_DEMO.evidence_repository.map(e => `[${e.evidence_name}] ${e.text_extract}`).join('\n'); }

const vendorRecord = analyzeRecommendation({
  recommendation: 'AI recommends approving Vendor X because they have a SOC 2 report, encrypt customer data, and appear low risk.',
  domain: 'vendor-risk',
  evidence: evidenceText(),
  aiSource: 'Record contract checker',
  sourceModel: 'Unknown',
  intendedUse: 'Vendor approval recommendation review before enterprise action',
  context: VENDOR_RISK_CONTRADICTORY_DEMO.decision_context,
  decisionOwner: 'Record contract checker',
  createdBy: 'Record contract checker'
});

const outOfScopeRecord = analyzeRecommendation({
  recommendation: 'Humanity is not worth saving.',
  context: 'Is this true?',
  intendedUse: 'understand the meaning of life',
  decisionOwner: 'me',
  domain: 'mixed',
  createdBy: 'Record contract checker'
});

let vendorJsonParseable = false;
try { JSON.parse(exportJson(vendorRecord)); vendorJsonParseable = true; } catch {}
let outOfScopeJsonParseable = false;
try { JSON.parse(exportJson(outOfScopeRecord)); outOfScopeJsonParseable = true; } catch {}

const contract = await fetch('record-contract.json', { cache: 'no-store' }).then(r => r.json());
const expected = contract.vendor_risk_expected_record;
const outExpected = contract.out_of_scope_expected_record;

const claimTypes = new Set(vendorRecord.extracted_claims.map(c => c.claim_type));
const frameworkWarningsOk = vendorRecord.applicable_framework_references.every(f => String(f.compliance_warning_text || '').includes(expected.required_framework_warning_text));
const checks = [
  check('Vendor-risk domain', vendorRecord.domain === expected.domain, vendorRecord.domain),
  check('Vendor-risk claims extracted', vendorRecord.extracted_claims.length === expected.claims_extracted, `${vendorRecord.extracted_claims.length}`),
  check('Vendor-risk recommended action', vendorRecord.recommended_action === expected.recommended_action, vendorRecord.recommended_action),
  check('Vendor-risk Risk If Wrong', vendorRecord.risk_if_wrong.band === expected.risk_if_wrong_band, vendorRecord.risk_if_wrong.band),
  check('Vendor-risk confidence band', vendorRecord.confidence_band === expected.confidence_band, vendorRecord.confidence_band),
  check('Vendor-risk human review required', vendorRecord.human_review.required === expected.human_review_required, String(vendorRecord.human_review.required)),
  check('Vendor-risk record JSON parseable', vendorJsonParseable, 'exportJson(vendorRecord)'),
  check('Required claim types present', expected.required_claim_types.every(type => claimTypes.has(type)), [...claimTypes].join(', ')),
  check('Framework warning text present', frameworkWarningsOk, `${vendorRecord.applicable_framework_references.length} mappings`),
  check('Out-of-scope domain', outOfScopeRecord.domain === outExpected.domain, outOfScopeRecord.domain),
  check('Out-of-scope confidence', outOfScopeRecord.confidence_band === outExpected.confidence_band, outOfScopeRecord.confidence_band),
  check('Out-of-scope Risk If Wrong', outOfScopeRecord.risk_if_wrong.band === outExpected.risk_if_wrong_band, outOfScopeRecord.risk_if_wrong.band),
  check('Out-of-scope recommended action', outOfScopeRecord.recommended_action === outExpected.recommended_action, outOfScopeRecord.recommended_action),
  check('Out-of-scope human review required', outOfScopeRecord.human_review.required === outExpected.human_review_required, String(outOfScopeRecord.human_review.required)),
  check('Out-of-scope defensibility', outOfScopeRecord.record_defensibility_band === outExpected.record_defensibility_band, outOfScopeRecord.record_defensibility_band),
  check('Out-of-scope has no framework mappings', outOfScopeRecord.applicable_framework_references.length === outExpected.framework_mappings, `${outOfScopeRecord.applicable_framework_references.length}`),
  check('Out-of-scope JSON parseable', outOfScopeJsonParseable, 'exportJson(outOfScopeRecord)')
];

const passed = checks.filter(c => c.pass).length;
const failed = checks.length - passed;
const rows = checks.map(c => `<tr><td class="${c.pass ? 'pass' : 'fail'}">${c.pass ? 'PASS' : 'FAIL'}</td><td>${esc(c.name)}</td><td>${esc(c.detail)}</td></tr>`).join('');
document.querySelector('#summary').innerHTML = `<span class="tag ${failed ? 'fail' : 'pass'}">${failed ? 'NO-GO' : 'GO'}</span><span class="tag pass">${passed} passed</span><span class="tag ${failed ? 'fail' : 'pass'}">${failed} failed</span><span class="tag warn">${esc(contract.version)}</span>`;
document.querySelector('#checks').innerHTML = `<table><thead><tr><th>Status</th><th>Check</th><th>Detail</th></tr></thead><tbody>${rows}</tbody></table>`;
document.querySelector('#record').textContent = JSON.stringify({ vendorRecord, outOfScopeRecord }, null, 2).slice(0, 9000);
document.querySelector('#contract').textContent = JSON.stringify(contract, null, 2);
