const MATURITY_ORDER = [
  'Claimed',
  'Observed',
  'Tested',
  'Independently validated',
  'Outcome validated',
];

const CEILING_ORDER = [
  'Do not proceed',
  'Defer',
  'Continue investigation',
  'Obtain specified missing evidence',
  'Conditional review',
  'Constrained pilot',
  'Approval within verified scope and conditions',
  'Broader approval with monitoring',
];

function clean(value) {
  return String(value || '').trim();
}

function lower(value) {
  return clean(value).toLowerCase();
}

function includesAny(text, terms) {
  const value = lower(text);
  return terms.some(term => value.includes(term));
}

function evidenceText(evidence = {}) {
  return [
    evidence.evidence_name,
    evidence.evidence_type,
    evidence.source_type,
    evidence.source_authority_band,
    evidence.independence_band,
    evidence.text_extract,
  ].map(clean).filter(Boolean).join(' ');
}

function hasExplicitOutcomeEvidence(text) {
  return includesAny(text, [
    'subsequent outcome',
    'post-decision result',
    'measured after implementation',
    'later operational result',
    'observed outcome after',
    'follow-up result',
  ]) && includesAny(text, [
    'measured',
    'confirmed',
    'result',
    'outcome',
    'reduced',
    'increased',
    'remained',
  ]);
}

function hasIndependentValidation(text, evidence = {}) {
  return evidence.independence_band === 'Independent or contractual' && includesAny(text, [
    'independent assessment',
    'independent validation',
    'external penetration test',
    'third-party report',
    'auditor',
    'soc 2',
    'internal audit',
  ]);
}

function hasPerformedTest(text) {
  return includesAny(text, [
    'test result',
    'tested on',
    'restore test',
    'penetration test',
    'tabletop result',
    'deletion test',
    'configuration validation',
    'control test',
    'sample tested',
    'scanner result',
  ]);
}

function hasObservedArtifact(text) {
  return includesAny(text, [
    'policy',
    'architecture',
    'configuration',
    'contract',
    'dpa',
    'system report',
    'screenshot',
    'inventory',
    'clause',
    'log extract',
    'scope excerpt',
  ]);
}

export function classifyEvidenceMaturity(evidence = {}) {
  const text = evidenceText(evidence);
  const promptInjection = Boolean(evidence.prompt_injection_suspected);

  if (promptInjection) {
    return {
      evidence_maturity: 'Claimed',
      maturity_rationale: 'Potential source manipulation prevents the evidence from receiving a higher maturity state.',
      maturity_basis: ['source-manipulation-indicator'],
    };
  }

  if (hasExplicitOutcomeEvidence(text)) {
    return {
      evidence_maturity: 'Outcome validated',
      maturity_rationale: 'The evidence describes an explicit later operational result linked to the original claim or decision.',
      maturity_basis: ['explicit-later-result', 'decision-linked-outcome'],
    };
  }

  if (hasIndependentValidation(text, evidence)) {
    return {
      evidence_maturity: 'Independently validated',
      maturity_rationale: 'A sufficiently independent assessment is present, subject to its stated scope and period.',
      maturity_basis: ['independent-assessment', 'scope-and-period-still-required'],
    };
  }

  if (hasPerformedTest(text)) {
    return {
      evidence_maturity: 'Tested',
      maturity_rationale: 'The evidence describes a performed technical or process validation.',
      maturity_basis: ['performed-validation'],
    };
  }

  if (hasObservedArtifact(text)) {
    return {
      evidence_maturity: 'Observed',
      maturity_rationale: 'A concrete artifact or system record is present, but no performed validation is established.',
      maturity_basis: ['concrete-artifact'],
    };
  }

  return {
    evidence_maturity: 'Claimed',
    maturity_rationale: 'The evidence is an assertion or narrative without an observed artifact, performed test, independent assessment, or linked outcome.',
    maturity_basis: ['assertion-only'],
  };
}

export function enrichEvidenceMaturity(evidence = []) {
  return evidence.map(item => ({
    ...item,
    ...classifyEvidenceMaturity(item),
  }));
}

export function summarizeEvidenceMaturity(evidence = []) {
  const counts = Object.fromEntries(MATURITY_ORDER.map(label => [label, 0]));
  evidence.forEach(item => {
    const label = item.evidence_maturity || classifyEvidenceMaturity(item).evidence_maturity;
    if (Object.hasOwn(counts, label)) counts[label] += 1;
  });
  const present = MATURITY_ORDER.filter(label => counts[label] > 0);
  return {
    counts,
    highest_present_maturity: present.length ? present[present.length - 1] : 'None',
    caution: 'Evidence maturity is not evidence sufficiency and does not authorize an action by itself.',
  };
}

function materialConflicts(claims = []) {
  return claims.some(claim => ['Material conflict', 'Blocking conflict'].includes(claim.conflict_status));
}

function highMissing(missing = []) {
  return missing.some(item => item.severity === 'High');
}

function hasQuarantineHazard(hazards = []) {
  return hazards.some(item => item.band === 'Quarantine');
}

function actionRank(action = '') {
  const value = lower(action);
  if (includesAny(value, ['reject', 'do not proceed'])) return 0;
  if (includesAny(value, ['defer'])) return 1;
  if (includesAny(value, ['investigate'])) return 2;
  if (includesAny(value, ['request evidence', 'obtain evidence'])) return 3;
  if (includesAny(value, ['conditional review', 'escalate for review'])) return 4;
  if (includesAny(value, ['pilot'])) return 5;
  if (includesAny(value, ['approve', 'accept with caveat'])) return 6;
  if (includesAny(value, ['broader approval'])) return 7;
  return 7;
}

export function calculateDecisionCeiling(input = {}) {
  const claims = input.claims || [];
  const missing = input.missing_support || input.missing || [];
  const risk = input.risk_if_wrong || input.risk || {};
  const confidence = input.confidence || {};
  const review = input.human_review || input.review || {};
  const hazards = input.hazards || [];
  const requestedAction = clean(input.requested_action || input.recommended_action || '');

  let level = 'Conditional review';
  const binding = [];

  if (hasQuarantineHazard(hazards)) {
    level = 'Do not proceed';
    binding.push('source-manipulation-or-quarantine-hazard');
  } else if (highMissing(missing) || materialConflicts(claims)) {
    level = 'Obtain specified missing evidence';
    if (highMissing(missing)) binding.push('high-severity-missing-evidence');
    if (materialConflicts(claims)) binding.push('material-evidence-conflict');
  } else if (['Severe'].includes(risk.band)) {
    level = 'Defer';
    binding.push('severe-risk-if-wrong');
  } else if (risk.band === 'High' && ['Low confidence', 'Contradicted', 'Unknown confidence'].includes(confidence.band)) {
    level = 'Conditional review';
    binding.push('high-risk-with-limited-confidence');
  } else if (review.required) {
    level = 'Conditional review';
    binding.push('required-human-review');
  } else if (input.reversible_pilot === true) {
    level = 'Constrained pilot';
    binding.push('bounded-reversible-validation');
  } else {
    level = 'Approval within verified scope and conditions';
    binding.push('no-blocking-gap-detected');
  }

  const ceilingRank = CEILING_ORDER.indexOf(level);
  return {
    level,
    rationale: binding.length
      ? `The current evidence limits the decision to ${level.toLowerCase()} because ${binding.join(', ')}.`
      : `The current evidence limits the decision to ${level.toLowerCase()}.`,
    binding_factors: binding,
    requested_action_exceeds_ceiling: requestedAction ? actionRank(requestedAction) > ceilingRank : false,
  };
}

export function buildMinimumTrustExperiment(input = {}) {
  const missing = input.missing_support || input.missing || [];
  const hazards = input.hazards || [];
  if (!missing.length || hasQuarantineHazard(hazards)) return null;

  const sorted = [...missing].sort((a, b) => {
    const rank = { High: 0, Moderate: 1, Low: 2 };
    return (rank[a.severity] ?? 9) - (rank[b.severity] ?? 9);
  });
  const target = sorted[0];
  const category = clean(target.category || target.finding || 'material evidence gap');
  const owner = clean(input.required_owner_or_reviewer || input.human_review?.required_reviewer_role || 'Accountable decision owner');

  return {
    claim_or_uncertainty: clean(target.claim_id || category),
    validation_action: `Obtain and review ${category}.`,
    decision_relevance: 'This gap currently constrains the strongest defensible action.',
    required_measurement: `Record whether ${category} supports, contradicts, or does not resolve the material claim.`,
    scope_and_safeguards: 'Use a bounded review scope, preserve source provenance, and exclude unrelated or restricted data.',
    success_criteria: 'The evidence directly supports the material claim within the relevant scope and period.',
    failure_criteria: 'The evidence is missing, stale, indirect, out of scope, self-attested where independence is required, or contradictory.',
    stop_conditions: [
      'Source provenance cannot be established',
      'The validation would exceed the approved review scope',
      'Restricted data would be exposed',
      'The result cannot materially change the decision',
    ],
    required_owner_or_reviewer: owner,
    possible_ceiling_change: 'The ceiling may rise, remain unchanged, or fall after the result is reviewed.  No automatic increase is permitted.',
  };
}

export const evidenceMaturityConstants = {
  maturity_order: MATURITY_ORDER,
  ceiling_order: CEILING_ORDER,
};
