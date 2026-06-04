import { analyzeRecommendation, exportJson } from './atdr-engine.js';
import { VENDOR_RISK_CONTRADICTORY_DEMO } from './atdr-demo-data.js';
import { validateTrustDecisionRecord } from './atdr-schema.js';

function evidenceText() {
  return VENDOR_RISK_CONTRADICTORY_DEMO.evidence_repository
    .map(e => `[${e.evidence_name}] ${e.text_extract}`)
    .join('\n');
}

function assert(name, condition, details = '') {
  return {
    name,
    status: condition ? 'pass' : 'fail',
    details
  };
}

function runSmokeTest() {
  const record = analyzeRecommendation({
    recommendation: VENDOR_RISK_CONTRADICTORY_DEMO.original_ai_recommendation,
    domain: VENDOR_RISK_CONTRADICTORY_DEMO.domain,
    evidence: evidenceText(),
    aiSource: VENDOR_RISK_CONTRADICTORY_DEMO.ai_source,
    sourceModel: VENDOR_RISK_CONTRADICTORY_DEMO.source_model_if_known,
    intendedUse: VENDOR_RISK_CONTRADICTORY_DEMO.intended_use,
    context: VENDOR_RISK_CONTRADICTORY_DEMO.decision_context,
    decisionOwner: VENDOR_RISK_CONTRADICTORY_DEMO.decision_owner,
    createdBy: 'Smoke test'
  });

  const validation = validateTrustDecisionRecord(record);
  let jsonParseable = false;
  try {
    JSON.parse(exportJson(record));
    jsonParseable = true;
  } catch {
    jsonParseable = false;
  }

  const tests = [
    assert('Record is created', Boolean(record.record_id), record.record_id),
    assert('Default demo atomizes into seven claims', record.extracted_claims.length === 7, `${record.extracted_claims.length} claims found`),
    assert('Risk If Wrong is High or Severe', ['High', 'Severe'].includes(record.risk_if_wrong.band), record.risk_if_wrong.band),
    assert('Confidence is conservative', ['Low confidence', 'Contradicted'].includes(record.confidence_band), record.confidence_band),
    assert('Human review is required', record.human_review.required === true, record.human_review.triggers.join('; ')),
    assert('Recommended action is conservative', ['Request Evidence', 'Escalate for Review', 'Quarantine'].includes(record.recommended_action), record.recommended_action),
    assert('Unsupported leap is detected', record.extracted_claims.some(c => c.claim_type === 'Unsupported leap'), 'Unsupported leap claim present'),
    assert('Framework warnings are present', record.applicable_framework_references.every(f => f.compliance_warning_text.includes('Not verified as compliant')), `${record.applicable_framework_references.length} mappings`),
    assert('JSON export is parseable', jsonParseable, 'exportJson(record) parsed successfully'),
    assert('Limitations are included', record.limitations.length >= 3, `${record.limitations.length} limitations found`),
    assert('Schema validation passes', validation.valid, validation.findings.map(f => `${f.code}: ${f.message}`).join('; ') || 'No schema findings')
  ];

  return { record, validation, tests, passed: tests.filter(t => t.status === 'pass').length, failed: tests.filter(t => t.status === 'fail').length };
}

function render() {
  const result = runSmokeTest();
  const rows = result.tests.map(test => `<tr class="${test.status}"><td>${test.status.toUpperCase()}</td><td>${test.name}</td><td>${test.details}</td></tr>`).join('');
  const findings = result.validation.findings.length
    ? result.validation.findings.map(item => `<li>${item.severity.toUpperCase()} ${item.path}: ${item.message}</li>`).join('')
    : '<li>No validation findings.</li>';
  document.querySelector('#result').innerHTML = `
    <section class="summary ${result.failed ? 'fail' : 'pass'}">
      <h2>${result.failed ? 'Smoke test failed' : 'Smoke test passed'}</h2>
      <p>${result.passed} passed. ${result.failed} failed.</p>
    </section>
    <table>
      <thead><tr><th>Status</th><th>Check</th><th>Details</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <h2>Schema Findings</h2>
    <ul>${findings}</ul>
    <h2>Record Snapshot</h2>
    <pre>${JSON.stringify({ record_id: result.record.record_id, claims: result.record.extracted_claims.length, action: result.record.recommended_action, risk: result.record.risk_if_wrong.band, confidence: result.record.confidence_band, review_required: result.record.human_review.required, schema_valid: result.validation.valid }, null, 2)}</pre>`;
}

render();
