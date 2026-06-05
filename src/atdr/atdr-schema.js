const REQUIRED_TOP_LEVEL_FIELDS = [
  'record_id',
  'record_type',
  'created_timestamp',
  'original_ai_recommendation',
  'domain',
  'recommendation_type',
  'extracted_claims',
  'evidence_provided',
  'missing_support',
  'risk_if_wrong',
  'confidence_band',
  'human_review',
  'recommended_action',
  'required_next_step',
  'record_defensibility_band',
  'limitations',
  'analysis_version',
  'export_version'
];

const REQUIRED_CLAIM_FIELDS = [
  'claim_id',
  'original_sentence',
  'normalized_claim',
  'claim_type',
  'domain',
  'required_evidence_type',
  'materiality',
  'unsupported_flag',
  'evidence_sufficiency_band',
  'missing_support_severity',
  'conflict_status',
  'confidence_band',
  'risk_if_wrong_band'
];

const ALLOWED_ACTIONS = [
  'Accept',
  'Accept with Caveat',
  'Request Evidence',
  'Revise Recommendation',
  'Escalate for Review',
  'Reject',
  'Quarantine'
];

const ALLOWED_CONFIDENCE_BANDS = [
  'High confidence',
  'Medium confidence',
  'Low confidence',
  'Unknown confidence',
  'Contradicted'
];

const ALLOWED_RISK_BANDS = ['Severe', 'High', 'Moderate', 'Low', 'Minimal'];

function hasValue(record, key) {
  const value = record?.[key];
  if (Array.isArray(value)) return true;
  if (typeof value === 'object' && value !== null) return true;
  return value !== undefined && value !== null && String(value).trim() !== '';
}

function finding(code, severity, message, path) {
  return { code, severity, message, path };
}

export function validateTrustDecisionRecord(record) {
  const findings = [];

  REQUIRED_TOP_LEVEL_FIELDS.forEach(field => {
    if (!hasValue(record, field)) findings.push(finding('missing-required-field', 'error', `Missing required field: ${field}`, field));
  });

  if (!Array.isArray(record?.extracted_claims)) {
    findings.push(finding('claims-not-array', 'error', 'extracted_claims must be an array.', 'extracted_claims'));
  } else {
    record.extracted_claims.forEach((claim, index) => {
      REQUIRED_CLAIM_FIELDS.forEach(field => {
        if (!hasValue(claim, field)) findings.push(finding('claim-missing-field', 'error', `Claim ${index + 1} missing ${field}`, `extracted_claims.${index}.${field}`));
      });
      if (!Array.isArray(claim.required_evidence_type) || claim.required_evidence_type.length === 0) {
        findings.push(finding('claim-missing-required-evidence', 'error', `Claim ${claim.claim_id || index + 1} has no required evidence list.`, `extracted_claims.${index}.required_evidence_type`));
      }
    });
  }

  if (!Array.isArray(record?.limitations) || record.limitations.length === 0) {
    findings.push(finding('missing-limitations', 'error', 'Record must include limitations before export.', 'limitations'));
  }

  if (!ALLOWED_ACTIONS.includes(record?.recommended_action)) {
    findings.push(finding('invalid-recommended-action', 'error', `Recommended action is not allowed: ${record?.recommended_action}`, 'recommended_action'));
  }

  if (!ALLOWED_CONFIDENCE_BANDS.includes(record?.confidence_band)) {
    findings.push(finding('invalid-confidence-band', 'error', `Confidence band is not allowed: ${record?.confidence_band}`, 'confidence_band'));
  }

  if (!ALLOWED_RISK_BANDS.includes(record?.risk_if_wrong?.band)) {
    findings.push(finding('invalid-risk-band', 'error', `Risk If Wrong band is not allowed: ${record?.risk_if_wrong?.band}`, 'risk_if_wrong.band'));
  }

  const mappings = record?.applicable_framework_references || [];
  mappings.forEach((mapping, index) => {
    if (!String(mapping.compliance_warning_text || '').includes('Not verified as compliant')) {
      findings.push(finding('framework-warning-missing', 'error', 'Framework mappings must include non-compliance-proof warning language.', `applicable_framework_references.${index}.compliance_warning_text`));
    }
  });

  if (record?.human_review?.required && !record.human_review.required_reviewer_role) {
    findings.push(finding('reviewer-role-missing', 'error', 'Human review is required but no reviewer role is specified.', 'human_review.required_reviewer_role'));
  }

  if (record?.recommended_action === 'Accept' && record?.human_review?.required) {
    findings.push(finding('accept-with-required-review', 'error', 'Record cannot recommend Accept while human review is required.', 'recommended_action'));
  }

  if (record?.recommended_action === 'Accept' && ['High', 'Severe'].includes(record?.risk_if_wrong?.band)) {
    findings.push(finding('accept-high-risk', 'error', 'Record cannot recommend Accept for High or Severe Risk If Wrong without documented review.', 'recommended_action'));
  }

  if (record?.extracted_claims?.some(claim => claim.unsupported_flag && claim.materiality === 'High') && record?.can_act) {
    findings.push(finding('can-act-with-unsupported-material-claim', 'error', 'Record cannot be actionable while high-materiality claims remain unsupported.', 'can_act'));
  }

  return {
    valid: findings.filter(item => item.severity === 'error').length === 0,
    findings
  };
}

export { ALLOWED_ACTIONS, ALLOWED_CONFIDENCE_BANDS, ALLOWED_RISK_BANDS };
