const EVIDENCE_ISSUE_TAXONOMY = [
  {
    id: 'missing',
    label: 'Missing',
    definition: 'Required evidence is absent from the record.',
    vendor_risk_example: 'No complete subprocessor list is provided for the AI analytics service.',
    decision_effect: 'Blocks approval until evidence is supplied.'
  },
  {
    id: 'weak',
    label: 'Weak',
    definition: 'Evidence exists but is not strong enough to support the claim by itself.',
    vendor_risk_example: 'A vendor questionnaire asserts encryption but provides no independent proof.',
    decision_effect: 'Supports Request Evidence rather than approval.'
  },
  {
    id: 'stale',
    label: 'Stale',
    definition: 'Evidence may be outdated relative to the current system, service, or decision date.',
    vendor_risk_example: 'A prior SOC 2 report does not cover current AI service changes.',
    decision_effect: 'Requires updated evidence or bridge letter.'
  },
  {
    id: 'self_attested',
    label: 'Self-attested',
    definition: 'Evidence comes from the vendor or interested party without independent validation.',
    vendor_risk_example: 'The vendor states customer data is encrypted without external validation.',
    decision_effect: 'Raises review burden and limits defensibility.'
  },
  {
    id: 'contradictory',
    label: 'Contradictory',
    definition: 'Available evidence conflicts with the AI recommendation or another material claim.',
    vendor_risk_example: 'The recommendation says low risk, but the DPA allows broad service-improvement data use.',
    decision_effect: 'Requires escalation and evidence reconciliation.'
  },
  {
    id: 'scope_mismatch',
    label: 'Scope mismatch',
    definition: 'Evidence applies to a different system, service, control, period, or organization than the decision requires.',
    vendor_risk_example: 'SOC 2 covers the corporate platform but not the AI analytics module under review.',
    decision_effect: 'Blocks reliance on the evidence for approval.'
  },
  {
    id: 'not_independently_verified',
    label: 'Not independently verified',
    definition: 'A claim has not been validated by a sufficiently independent source or reviewer.',
    vendor_risk_example: 'Security posture is based only on vendor-provided materials.',
    decision_effect: 'Requires independent review or stronger corroborating evidence.'
  },
  {
    id: 'reviewer_authority_missing',
    label: 'Reviewer authority missing',
    definition: 'The record does not show accountable review or approval by the required human owner.',
    vendor_risk_example: 'A business owner likes the vendor, but the vendor-risk owner has not approved the risk.',
    decision_effect: 'Requires human review before decision closure.'
  }
];

function issueById(id) {
  return EVIDENCE_ISSUE_TAXONOMY.find(issue => issue.id === id) || null;
}

function issueLabels() {
  return EVIDENCE_ISSUE_TAXONOMY.map(issue => issue.label);
}

export { EVIDENCE_ISSUE_TAXONOMY, issueById, issueLabels };
