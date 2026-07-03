import { classifyEvidenceMaturity } from './evidence-maturity.js';

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

function materialConflicts(claims = []) {
  return claims.some(claim => ['Material conflict', 'Blocking conflict'].includes(claim.conflict_status));
}

function highMissing(missing = []) {
  return missing.some(item => item.severity === 'High');
}

function hasQuarantineHazard(hazards = []) {
  return hazards.some(item => item.band === 'Quarantine');
}

function evidenceScopeIsAcceptable(item = {}) {
  const scope = lower([
    item.scope_status,
    item.scope_band,
    item.scope_relevance,
    item.relevance_scope,
  ].filter(Boolean).join(' '));
  return !includesAny(scope, ['out of scope', 'not applicable', 'not relevant']);
}

function evidenceIsCurrentEnough(item = {}) {
  return clean(item.freshness_band) !== 'Stale';
}

function maturityOf(item = {}) {
  return item.evidence_maturity || classifyEvidenceMaturity(item).evidence_maturity;
}

function hasDecisionGradeEvidence(items = []) {
  return items.some(item =>
    ['Tested', 'Independently validated', 'Outcome validated'].includes(maturityOf(item)) &&
    evidenceIsCurrentEnough(item) &&
    evidenceScopeIsAcceptable(item) &&
    !item.prompt_injection_suspected
  );
}

function hasUsableObservedEvidence(items = []) {
  return items.some(item =>
    MATURITY_ORDER.indexOf(maturityOf(item)) >= MATURITY_ORDER.indexOf('Observed') &&
    evidenceIsCurrentEnough(item) &&
    evidenceScopeIsAcceptable(item) &&
    !item.prompt_injection_suspected
  );
}

function actionRank(action = '') {
  const value = lower(action);
  if (includesAny(value, ['reject', 'do not proceed', 'quarantine'])) return 0;
  if (includesAny(value, ['defer'])) return 1;
  if (includesAny(value, ['investigate'])) return 2;
  if (includesAny(value, ['request evidence', 'obtain evidence'])) return 3;
  if (includesAny(value, ['conditional review', 'escalate for review'])) return 4;
  if (includesAny(value, ['pilot'])) return 5;
  if (includesAny(value, ['broader approval'])) return 7;
  if (includesAny(value, ['approve', 'accept with caveat'])) return 6;
  return 7;
}

export function calculateDecisionCeiling(input = {}) {
  const claims = input.claims || [];
  const evidence = input.evidence || [];
  const missing = input.missing_support || input.missing || [];
  const risk = input.risk_if_wrong || input.risk || {};
  const confidence = input.confidence || {};
  const review = input.human_review || input.review || {};
  const hazards = input.hazards || [];
  const requestedAction = clean(input.requested_action || input.recommended_action || '');
  const decisionGrade = hasDecisionGradeEvidence(evidence);
  const observedOrBetter = hasUsableObservedEvidence(evidence);

  let level = 'Conditional review';
  const binding = [];

  if (hasQuarantineHazard(hazards)) {
    level = 'Do not proceed';
    binding.push('source-manipulation-or-quarantine-hazard');
  } else if (risk.band === 'Severe') {
    level = 'Defer';
    binding.push('severe-risk-if-wrong');
  } else if (highMissing(missing) || materialConflicts(claims)) {
    level = 'Obtain specified missing evidence';
    if (highMissing(missing)) binding.push('high-severity-missing-evidence');
    if (materialConflicts(claims)) binding.push('material-evidence-conflict');
  } else if (risk.band === 'High' && !decisionGrade) {
    level = 'Obtain specified missing evidence';
    binding.push('no-current-in-scope-tested-or-independent-evidence');
  } else if (risk.band === 'High' && ['Low confidence', 'Contradicted', 'Unknown confidence'].includes(confidence.band)) {
    level = 'Conditional review';
    binding.push('high-risk-with-limited-confidence');
  } else if (review.required) {
    level = 'Conditional review';
    binding.push('required-human-review');
  } else if (input.reversible_pilot === true && observedOrBetter) {
    level = 'Constrained pilot';
    binding.push('bounded-reversible-validation');
  } else if (decisionGrade) {
    level = 'Approval within verified scope and conditions';
    binding.push('current-in-scope-tested-or-independent-evidence');
  } else {
    level = 'Continue investigation';
    binding.push('evidence-not-yet-decision-grade');
  }

  const ceilingRank = CEILING_ORDER.indexOf(level);
  return {
    level,
    rationale: `The current evidence limits the decision to ${level.toLowerCase()} because ${binding.join(', ')}.`,
    binding_factors: binding,
    requested_action_exceeds_ceiling: requestedAction ? actionRank(requestedAction) > ceilingRank : false,
  };
}

export const decisionCeilingConstants = {
  maturity_order: MATURITY_ORDER,
  ceiling_order: CEILING_ORDER,
};
