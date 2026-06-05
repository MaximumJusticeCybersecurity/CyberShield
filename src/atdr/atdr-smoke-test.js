import { analyzeRecommendation, exportJson } from './atdr-engine.js';
import { DEMO_MODES } from './atdr-demo-data.js';
import { validateTrustDecisionRecord } from './atdr-schema.js';

function evidenceText(demo) {
  return demo.evidence_repository
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

function analyzeDemo(mode) {
  const demo = mode.demo;
  const record = analyzeRecommendation({
    recommendation: demo.original_ai_recommendation,
    domain: demo.domain,
    evidence: evidenceText(demo),
    aiSource: demo.ai_source,
    sourceModel: demo.source_model_if_known,
    intendedUse: demo.intended_use,
    context: demo.decision_context,
    decisionOwner: demo.decision_owner,
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
  return { mode, demo, record, validation, jsonParseable };
}

function runSmokeTest() {
  const analyses = DEMO_MODES.map(analyzeDemo);
  const defaultDemo = analyses[0];
  const vendorClaims = defaultDemo.record.extracted_claims;
  const vendorConflicts = vendorClaims.filter(c => c.conflict_status === 'Material conflict');
  const tests = [
    assert('All demo modes analyze', analyses.length === 3 && analyses.every(a => a.record.record_id), `${analyses.length} demo modes analyzed`),
    assert('Default vendor-risk demo atomizes into ten claims', vendorClaims.length === 10, `${vendorClaims.length} claims found`),
    assert('Vendor evidence repository includes nine synthetic documents', defaultDemo.demo.evidence_repository.length === 9, `${defaultDemo.demo.evidence_repository.length} evidence items found`),
    assert('Vendor demo detects material contradictions', vendorConflicts.length >= 3, `${vendorConflicts.length} material conflicts found`),
    assert('Vendor demo recommends Request Evidence', defaultDemo.record.recommended_action === 'Request Evidence', defaultDemo.record.recommended_action),
    assert('Vendor demo is High Risk If Wrong', defaultDemo.record.risk_if_wrong.band === 'High', defaultDemo.record.risk_if_wrong.band),
    assert('Vendor demo requires human review', defaultDemo.record.human_review.required === true, defaultDemo.record.human_review.required_reviewer_role),
    assert('Every demo has claims', analyses.every(a => a.record.extracted_claims.length > 0), analyses.map(a => `${a.mode.label}: ${a.record.extracted_claims.length}`).join('; ')),
    assert('Every demo has Risk If Wrong', analyses.every(a => ['High', 'Severe', 'Moderate', 'Low', 'Minimal'].includes(a.record.risk_if_wrong.band)), analyses.map(a => `${a.mode.label}: ${a.record.risk_if_wrong.band}`).join('; ')),
    assert('Every demo has conservative action', analyses.every(a => ['Request Evidence', 'Escalate for Review', 'Quarantine', 'Accept with Caveat'].includes(a.record.recommended_action)), analyses.map(a => `${a.mode.label}: ${a.record.recommended_action}`).join('; ')),
    assert('Vendor demo detects unsupported leap', vendorClaims.some(c => c.claim_type === 'Unsupported leap'), 'Unsupported leap claim present'),
    assert('Framework warnings are present where mappings exist', analyses.every(a => a.record.applicable_framework_references.every(f => f.compliance_warning_text.includes('Not verified as compliant'))), 'Framework warnings checked'),
    assert('Every JSON export is parseable', analyses.every(a => a.jsonParseable), 'exportJson(record) parsed for all demos'),
    assert('Every record includes limitations', analyses.every(a => a.record.limitations.length >= 3), analyses.map(a => `${a.mode.label}: ${a.record.limitations.length}`).join('; ')),
    assert('Every record passes schema validation', analyses.every(a => a.validation.valid), analyses.flatMap(a => a.validation.findings.map(f => `${a.mode.label}: ${f.code}: ${f.message}`)).join('; ') || 'No schema findings')
  ];
  return { analyses, tests, passed: tests.filter(t => t.status === 'pass').length, failed: tests.filter(t => t.status === 'fail').length };
}

function render() {
  const result = runSmokeTest();
  const goNoGo = result.failed ? 'NO-GO' : 'GO';
  const totalClaims = result.analyses.reduce((sum, item) => sum + item.record.extracted_claims.length, 0);
  const reviewRequired = result.analyses.filter(item => item.record.human_review.required).length;
  const conservativeActions = result.analyses.filter(item => ['Request Evidence', 'Escalate for Review', 'Quarantine', 'Accept with Caveat'].includes(item.record.recommended_action)).length;
  const rows = result.tests.map(test => `<tr class="${test.status}"><td>${test.status.toUpperCase()}</td><td>${test.name}</td><td>${test.details}</td></tr>`).join('');
  const demoRows = result.analyses.map(item => `<tr><td>${item.mode.label}</td><td>${item.record.extracted_claims.length}</td><td>${item.record.risk_if_wrong.band}</td><td>${item.record.confidence_band}</td><td>${item.record.recommended_action}</td><td>${item.record.human_review.required ? 'Required' : 'Not Required'}</td><td>${item.validation.valid ? 'Valid' : 'Invalid'}</td></tr>`).join('');
  const findings = result.analyses.flatMap(item => item.validation.findings.map(f => `<li>${item.mode.label}: ${f.severity.toUpperCase()} ${f.path}: ${f.message}</li>`)).join('') || '<li>No validation findings.</li>';
  document.querySelector('#result').innerHTML = `
    <section class="summary ${result.failed ? 'fail' : 'pass'}">
      <div class="eyebrow">Demo Readiness Decision</div>
      <h2>${goNoGo}: ${result.failed ? 'Fix before showing' : 'Ready for controlled demo'}</h2>
      <p>${result.passed} checks passed. ${result.failed} checks failed.</p>
    </section>
    <section class="kpis">
      <div class="kpi"><span>Demo Modes</span><strong>${result.analyses.length}</strong></div>
      <div class="kpi"><span>Total Claims</span><strong>${totalClaims}</strong></div>
      <div class="kpi"><span>Review Required</span><strong>${reviewRequired}/${result.analyses.length}</strong></div>
      <div class="kpi"><span>Conservative Actions</span><strong>${conservativeActions}/${result.analyses.length}</strong></div>
    </section>
    <h2>Demo Scenario Results</h2>
    <table>
      <thead><tr><th>Demo</th><th>Claims</th><th>Risk</th><th>Confidence</th><th>Action</th><th>Review</th><th>Schema</th></tr></thead>
      <tbody>${demoRows}</tbody>
    </table>
    <h2>Readiness Checks</h2>
    <table>
      <thead><tr><th>Status</th><th>Check</th><th>Details</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <h2>Schema Findings</h2>
    <section class="card"><ul>${findings}</ul></section>`;
}

render();