import { analyzeRecommendation, classifyDomainFit, exportJson } from './atdr-engine.js';
import { DEMO_MODES } from './atdr-demo-data.js';
import { validateTrustDecisionRecord } from './atdr-schema.js';

function evidenceText(demo) {
  return demo.evidence_repository
    .map(e => `[${e.evidence_name}] ${e.text_extract}`)
    .join('\n');
}

function assert(name, condition, details = '') {
  return { name, status: condition ? 'pass' : 'fail', details };
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
  record.cyberShield_recommended_action = record.recommended_action;
  record.human_decisions = [];
  record.override_events = [];
  record.human_selected_action = '';
  record.override_status = 'No human decision recorded';
  const validation = validateTrustDecisionRecord(record);
  let jsonParseable = false;
  try { JSON.parse(exportJson(record)); jsonParseable = true; } catch { jsonParseable = false; }
  return { mode, demo, record, validation, jsonParseable };
}

function simulatedOverrideRecord(record) {
  const humanDecision = {
    human_decision_id: 'HD-SMOKE-001',
    record_id: record.record_id,
    cyberShield_recommended_action: record.cyberShield_recommended_action,
    human_selected_action: 'Accept with Caveat',
    override_status: 'Override recorded',
    reviewer_role: 'Vendor-Risk Owner',
    reviewer_name: 'Smoke Test Reviewer',
    override_reason: 'Accepted with caveat for smoke-test validation only.',
    residual_risk_acknowledgment: 'Residual risk acknowledged for smoke-test validation.',
    reviewer_notes: 'Smoke-test override event preserves CyberShield recommendation separately.',
    decision_timestamp: new Date().toISOString()
  };
  return {
    ...record,
    human_decisions: [humanDecision],
    override_events: [{
      override_event_id: 'OVR-HD-SMOKE-001',
      record_id: record.record_id,
      cyberShield_recommended_action: record.cyberShield_recommended_action,
      human_selected_action: humanDecision.human_selected_action,
      reviewer_role: humanDecision.reviewer_role,
      reviewer_name: humanDecision.reviewer_name,
      override_reason: humanDecision.override_reason,
      residual_risk_acknowledgment: humanDecision.residual_risk_acknowledgment,
      timestamp: humanDecision.decision_timestamp
    }],
    human_selected_action: humanDecision.human_selected_action,
    override_status: humanDecision.override_status,
    record_defensibility_band: 'Export-ready with caveat'
  };
}

function runSmokeTest() {
  const analyses = DEMO_MODES.map(analyzeDemo);
  const defaultDemo = analyses[0];
  const vendorClaims = defaultDemo.record.extracted_claims;
  const vendorConflicts = vendorClaims.filter(c => c.conflict_status === 'Material conflict');
  const overrideRecord = simulatedOverrideRecord(defaultDemo.record);
  let overrideJsonParseable = false;
  try { JSON.parse(exportJson(overrideRecord)); overrideJsonParseable = true; } catch { overrideJsonParseable = false; }

  const humanityRecord = analyzeRecommendation({ recommendation: 'Humanity is not worth saving.', context: 'Is this true?', intendedUse: 'understand the meaning of life', decisionOwner: 'me', domain: 'mixed', createdBy: 'Smoke test' });
  const humanityValidation = validateTrustDecisionRecord(humanityRecord);
  let humanityJsonParseable = false;
  try { JSON.parse(exportJson(humanityRecord)); humanityJsonParseable = true; } catch { humanityJsonParseable = false; }

  const supportedFit = [
    classifyDomainFit({ recommendation: 'AI recommends approving ApexAI Cloud Services because they have SOC 2, encrypt customer data, and appear low risk.' }),
    classifyDomainFit({ recommendation: 'AI recommends accepting this vulnerability as low risk because exploitation is unlikely.' }),
    classifyDomainFit({ recommendation: 'AI says this control satisfies NIST 800-53 based on the current policy.' })
  ];
  const unsupportedFit = [
    classifyDomainFit({ recommendation: 'AI recommends hiring this candidate because they seem like a good culture fit.' }),
    classifyDomainFit({ recommendation: 'AI says our company should support this political position.' }),
    classifyDomainFit({ recommendation: 'AI says humanity should slow down AI development for moral reasons.' })
  ];

  const tests = [
    assert('All demo modes analyze', analyses.length === 3 && analyses.every(a => a.record.record_id), `${analyses.length} demo modes analyzed`),
    assert('Default vendor-risk demo atomizes into ten claims', vendorClaims.length === 10, `${vendorClaims.length} claims found`),
    assert('Vendor evidence repository includes nine synthetic documents', defaultDemo.demo.evidence_repository.length === 9, `${defaultDemo.demo.evidence_repository.length} evidence items found`),
    assert('Vendor demo detects material contradictions', vendorConflicts.length >= 3, `${vendorConflicts.length} material conflicts found`),
    assert('Vendor demo recommends Request Evidence', defaultDemo.record.recommended_action === 'Request Evidence', defaultDemo.record.recommended_action),
    assert('Vendor demo preserves CyberShield recommendation field', defaultDemo.record.cyberShield_recommended_action === defaultDemo.record.recommended_action, defaultDemo.record.cyberShield_recommended_action),
    assert('Vendor demo is High Risk If Wrong', defaultDemo.record.risk_if_wrong.band === 'High', defaultDemo.record.risk_if_wrong.band),
    assert('Vendor demo requires human review', defaultDemo.record.human_review.required === true, defaultDemo.record.human_review.required_reviewer_role),
    assert('Every demo has claims', analyses.every(a => a.record.extracted_claims.length > 0), analyses.map(a => `${a.mode.label}: ${a.record.extracted_claims.length}`).join('; ')),
    assert('Every demo has Risk If Wrong', analyses.every(a => ['High', 'Severe', 'Moderate', 'Low', 'Minimal', 'Unknown'].includes(a.record.risk_if_wrong.band)), analyses.map(a => `${a.mode.label}: ${a.record.risk_if_wrong.band}`).join('; ')),
    assert('Every demo has conservative action', analyses.every(a => ['Request Evidence', 'Escalate for Review', 'Quarantine', 'Accept with Caveat'].includes(a.record.recommended_action)), analyses.map(a => `${a.mode.label}: ${a.record.recommended_action}`).join('; ')),
    assert('Vendor demo detects unsupported leap', vendorClaims.some(c => c.claim_type === 'Unsupported leap'), 'Unsupported leap claim present'),
    assert('Framework warnings are present where mappings exist', analyses.every(a => a.record.applicable_framework_references.every(f => f.compliance_warning_text.includes('Not verified as compliant'))), 'Framework warnings checked'),
    assert('Every JSON export is parseable', analyses.every(a => a.jsonParseable), 'exportJson(record) parsed for all demos'),
    assert('Override JSON remains parseable', overrideJsonParseable, 'Simulated override export parsed'),
    assert('Override preserves original CyberShield recommendation', overrideRecord.cyberShield_recommended_action === 'Request Evidence' && overrideRecord.human_selected_action === 'Accept with Caveat', `${overrideRecord.cyberShield_recommended_action} -> ${overrideRecord.human_selected_action}`),
    assert('Override event captures rationale', overrideRecord.override_events.length === 1 && overrideRecord.override_events[0].override_reason.length > 0, `${overrideRecord.override_events.length} override event(s)`),
    assert('Every record includes limitations', analyses.every(a => a.record.limitations.length >= 3), analyses.map(a => `${a.mode.label}: ${a.record.limitations.length}`).join('; ')),
    assert('Every record passes schema validation', analyses.every(a => a.validation.valid), analyses.flatMap(a => a.validation.findings.map(f => `${a.mode.label}: ${f.code}: ${f.message}`)).join('; ') || 'No schema findings'),
    assert('Supported domain-fit cases continue', supportedFit[0].supported_domain === 'vendor_risk' && supportedFit[1].supported_domain === 'security_risk' && supportedFit[2].supported_domain === 'compliance_control' && supportedFit.every(f => f.allowed_to_continue), supportedFit.map(f => `${f.supported_domain}/${f.allowed_to_continue}`).join('; ')),
    assert('Unsupported domain-fit cases are blocked', unsupportedFit.every(f => f.domain_fit_status === 'unsupported' && f.supported_domain === 'none' && f.allowed_to_continue === false), unsupportedFit.map(f => `${f.domain_fit_status}/${f.supported_domain}/${f.allowed_to_continue}`).join('; ')),
    assert('Unsupported cases include expected reasons', unsupportedFit[0].detection_reasons.includes('HR decision') && unsupportedFit[1].detection_reasons.includes('political opinion or persuasion') && unsupportedFit[2].detection_reasons.includes('moral/existential/philosophical'), unsupportedFit.map(f => f.detection_reasons.join(', ')).join('; ')),
    assert('Humanity case returns out-of-scope domain', humanityRecord.domain === 'out-of-scope', humanityRecord.domain),
    assert('Humanity case uses Unknown confidence', humanityRecord.confidence_band === 'Unknown confidence', humanityRecord.confidence_band),
    assert('Humanity case does not produce Medium confidence', humanityRecord.confidence_band !== 'Medium confidence', humanityRecord.confidence_band),
    assert('Humanity case recommends scope finding', humanityRecord.recommended_action === 'Out of Scope for Current Review', humanityRecord.recommended_action),
    assert('Humanity case requires human review', humanityRecord.human_review.required === true, humanityRecord.human_review.required_reviewer_role),
    assert('Humanity case is not defensible', humanityRecord.record_defensibility_band === 'Not defensible', humanityRecord.record_defensibility_band),
    assert('Humanity case has no framework mapping', humanityRecord.applicable_framework_references.length === 0, `${humanityRecord.applicable_framework_references.length} mappings`),
    assert('Humanity record passes schema validation', humanityValidation.valid, humanityValidation.findings.map(f => `${f.code}: ${f.message}`).join('; ') || 'No schema findings'),
    assert('Humanity JSON export is parseable', humanityJsonParseable, 'Out-of-scope export parsed')
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
    <table><thead><tr><th>Demo</th><th>Claims</th><th>Risk</th><th>Confidence</th><th>Action</th><th>Review</th><th>Schema</th></tr></thead><tbody>${demoRows}</tbody></table>
    <h2>Readiness Checks</h2>
    <table><thead><tr><th>Status</th><th>Check</th><th>Details</th></tr></thead><tbody>${rows}</tbody></table>
    <h2>Schema Findings</h2>
    <section class="card"><ul>${findings}</ul></section>`;
}

render();