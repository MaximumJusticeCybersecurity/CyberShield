// CyberShield Trust Decision Record schema mapper
// Maps the current deterministic engine output into the target AI Trust Decision Record payload shape.

function reportId(now = new Date()) {
  return `CS-${now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 12)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function mapClaims(engineRecord = {}) {
  return (engineRecord.extracted_claims || []).map(claim => ({
    claim_id: claim.claim_id || '',
    record_id: engineRecord.record_id || '',
    original_sentence: claim.original_sentence || claim.normalized_claim || '',
    normalized_claim: claim.normalized_claim || '',
    claim_type: claim.claim_type || '',
    materiality: claim.materiality || 'unknown',
    required_evidence_type: claim.required_evidence || claim.required_evidence_type || '',
    evidence_status: claim.evidence_status || claim.evidence_sufficiency || 'unknown',
    unsupported_leap_flag: Boolean(claim.unsupported_leap_flag || claim.conflict_status === 'Material conflict'),
    evidence_sufficiency_band: claim.evidence_sufficiency || '',
    missing_support_severity: claim.missing_support_severity || '',
    conflict_status: claim.conflict_status || 'none',
    confidence_band: claim.confidence_band || engineRecord.confidence_band || 'Unknown Confidence',
    risk_if_wrong_band: claim.risk_if_wrong_band || engineRecord.risk_if_wrong?.band || 'Unknown'
  }));
}

function mapEvidenceItems(evidenceItems = [], recordId = '') {
  return evidenceItems.map((item, index) => ({
    evidence_id: item.evidence_id || `E-${String(index + 1).padStart(3, '0')}`,
    record_id: recordId,
    evidence_title: item.evidence_name || item.evidence_title || `Evidence ${index + 1}`,
    evidence_type: item.evidence_type || item.type || 'synthetic_demo',
    source_type: item.source_type || 'synthetic_demo',
    date: item.date || item.evidence_date || 'unknown',
    freshness: item.freshness || item.freshness_band || 'unknown',
    scope_status: item.scope_status || 'unclear',
    independence_status: item.independence_status || item.source_authority_band || 'unknown',
    self_attestation_flag: Boolean(item.self_attestation_flag),
    synthetic_demo_data_flag: item.synthetic_demo_data_flag !== false,
    relevant_claims: item.relevant_claims || item.claim_ids || [],
    contradiction_flag: Boolean(item.contradiction_flag),
    evidence_summary: item.caveat || item.text_extract || item.evidence_summary || ''
  }));
}

function mapValidators(validators = [], recordId = '') {
  return validators.map((validator, index) => ({
    validator_result_id: validator.validator_result_id || `VR-${String(index + 1).padStart(3, '0')}`,
    record_id: recordId,
    validator_id: validator.validator_id || `validator_${index + 1}`,
    validator_name: validator.validator_name || validator.name || '',
    status: validator.status || 'Requires Human Review',
    severity: validator.severity || (validator.status === 'Fail' || validator.status === 'Failed' ? 'High' : 'Medium'),
    explanation: validator.explanation || validator.reason || '',
    affected_claim_ids: validator.affected_claim_ids || [],
    required_action: validator.required_action || 'Request Evidence'
  }));
}

function mapCandidateActions(candidateActions = [], recordId = '') {
  return candidateActions.map((candidate, index) => ({
    candidate_action_id: candidate.candidate_action_id || `CA-${String(index + 1).padStart(3, '0')}`,
    record_id: recordId,
    action_label: candidate.action_label || candidate.action || '',
    rationale: candidate.rationale || candidate.reason || '',
    evidence_sufficiency_summary: candidate.evidence_sufficiency_summary || '',
    missing_support_summary: candidate.missing_support_summary || '',
    conflict_summary: candidate.conflict_summary || '',
    validator_summary: candidate.validator_summary || '',
    risk_if_wrong_band: candidate.risk_if_wrong_band || '',
    confidence_band: candidate.confidence_band || '',
    human_review_required: candidate.human_review_required !== false,
    defensibility_rank: candidate.defensibility_rank || index + 1,
    selected_as_recommendation: Boolean(candidate.selected_as_recommendation || candidate.action_label === 'Request Evidence' || candidate.action === 'Request Evidence'),
    rejection_reason_if_not_selected: candidate.rejection_reason_if_not_selected || ''
  }));
}

function buildTrustDecisionRecord({
  engineRecord,
  state = {},
  evidenceItems = [],
  validators = [],
  candidateActions = [],
  reportAction = 'view_report',
  captureConfig = {},
  now = new Date()
} = {}) {
  const record = engineRecord || {};
  const recordId = record.record_id || `ATDR-${now.getTime()}`;
  return {
    record_id: recordId,
    report_id: reportId(now),
    created_timestamp: record.created_at || now.toISOString(),
    export_timestamp: now.toISOString(),
    first_name: state.firstName || '',
    company_or_organization: state.company || 'your company name would go here',
    vendor_name: state.vendor || 'vendor name would go here',
    decision_title: `AI Trust Decision Record for ${state.vendor || 'vendor name would go here'} Vendor-Risk Recommendation`,
    decision_owner: record.decision_owner || state.firstName || 'Pending vendor-risk owner assignment',
    decision_domain: 'vendor_risk',
    selected_contradiction_type: state.contradiction || 'all',
    original_ai_recommendation: state.recommendation || '',
    ai_source: record.ai_source || 'User-pasted AI recommendation',
    ai_influence_type: 'AI-generated recommendation',
    recommendation_type: 'vendor-risk approval recommendation',
    decision_context: record.decision_context || '',
    claims: mapClaims(record),
    evidence_items: mapEvidenceItems(evidenceItems, recordId),
    validator_results: mapValidators(validators, recordId),
    candidate_actions: mapCandidateActions(candidateActions, recordId),
    risk_if_wrong_band: record.risk_if_wrong?.band || 'Unknown',
    confidence_band: record.confidence_band || 'Unknown Confidence',
    evidence_sufficiency: record.evidence_sufficiency || 'Insufficient',
    cyberShield_recommended_action: record.recommended_action || 'Request Evidence',
    escalation_triggered: true,
    human_review_required: record.human_review?.required !== false,
    required_reviewer_roles: record.human_review?.required_reviewers || ['Vendor-Risk Owner', 'Security SME', 'Legal/Privacy Reviewer', 'Business Owner'],
    human_decision: {},
    override_event: {},
    vendor_dependency: state.vendor || '',
    model_provider_dependency: 'Unknown',
    data_exposure: 'Customer data and possible regulated data depending on buyer context',
    exit_path: 'Require evidence before approval; preserve ability to reject or replace vendor if evidence fails.',
    residual_risk: 'Not accepted yet. Residual risk requires accountable human review.',
    limitations: [
      'Static prototype',
      'Synthetic demo evidence',
      'Browser Print / Save PDF export path',
      'Google Sheet capture is prototype-grade only'
    ],
    record_defensibility_band: record.record_defensibility_band || 'Not defensible yet without additional evidence',
    visitor_email: state.email || '',
    export_metadata: {
      report_action: reportAction,
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      browser_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      crm_sheet_id: captureConfig.crm_sheet_id || captureConfig.CRM_SHEET_ID || '',
      report_capture_mode: captureConfig.report_capture_mode || captureConfig.REPORT_CAPTURE_MODE || 'unknown'
    }
  };
}

function validateTrustDecisionRecordShape(record = {}) {
  const required = [
    'record_id',
    'report_id',
    'created_timestamp',
    'export_timestamp',
    'vendor_name',
    'decision_domain',
    'original_ai_recommendation',
    'claims',
    'evidence_items',
    'validator_results',
    'candidate_actions',
    'risk_if_wrong_band',
    'confidence_band',
    'cyberShield_recommended_action',
    'human_review_required',
    'required_reviewer_roles',
    'limitations',
    'record_defensibility_band',
    'export_metadata'
  ];
  const missing = required.filter(key => !(key in record));
  return {
    ok: missing.length === 0 && Array.isArray(record.claims) && Array.isArray(record.evidence_items) && Array.isArray(record.validator_results) && Array.isArray(record.candidate_actions),
    missing
  };
}

export {
  buildTrustDecisionRecord,
  validateTrustDecisionRecordShape,
  mapClaims,
  mapEvidenceItems,
  mapValidators,
  mapCandidateActions
};
