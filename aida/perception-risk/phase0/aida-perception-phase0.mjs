import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

export const VERSION = '0.1.0-phase0';
export const MATERIALITY = new Set([
  'stable_action',
  'explanation_variation',
  'claim_instability',
  'evidence_interpretation_instability',
  'material_action_instability',
  'boundary_or_authority_instability'
]);
export const VARIABLE_CLASSES = new Set([
  'explicit_input',
  'deterministically_derived',
  'externally_measured',
  'model_inferred',
  'disputed',
  'unavailable',
  'not_applicable'
]);

function stable(value) {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((k) => `${JSON.stringify(k)}:${stable(value[k])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function digest(value) {
  return createHash('sha256').update(stable(value)).digest('hex');
}

function requireString(record, key) {
  if (typeof record[key] !== 'string' || record[key].trim() === '') throw new Error(`${key} must be a non-empty string`);
  return record[key].trim();
}

function rejectUnknown(record, allowed, kind) {
  const unknown = Object.keys(record).filter((key) => !allowed.has(key));
  if (unknown.length) throw new Error(`${kind} unsupported fields: ${unknown.sort().join(', ')}`);
}

export function validateLatentVariable(record) {
  const allowed = new Set(['variable_id', 'name', 'classification', 'evidence_refs', 'uncertainty', 'sensitivity', 'consequence_if_wrong', 'remediation', 'affects_action_boundary']);
  rejectUnknown(record, allowed, 'LatentVariableRecord');
  for (const key of allowed) {
    if (!(key in record)) throw new Error(`LatentVariableRecord missing ${key}`);
  }
  const classification = requireString(record, 'classification');
  if (!VARIABLE_CLASSES.has(classification)) throw new Error(`unsupported classification ${classification}`);
  if (!Array.isArray(record.evidence_refs) || record.evidence_refs.some((item) => typeof item !== 'string' || !item)) throw new Error('evidence_refs must be strings');
  if (typeof record.affects_action_boundary !== 'boolean') throw new Error('affects_action_boundary must be boolean');
  const normalized = { record_type: 'LatentVariableRecord', version: VERSION, ...record };
  normalized.record_digest = digest(normalized);
  return normalized;
}

export function classifyMateriality({ baseline_action, observed_action, changed_cue, boundary_changed = false, explanation_changed = false }) {
  if (boundary_changed || /authority|boundary|delimiter|source|instruction/i.test(changed_cue)) {
    return baseline_action === observed_action ? 'claim_instability' : 'boundary_or_authority_instability';
  }
  if (baseline_action === observed_action) {
    return explanation_changed ? 'explanation_variation' : 'stable_action';
  }
  if (/evidence|order|source/i.test(changed_cue)) return 'evidence_interpretation_instability';
  return 'material_action_instability';
}

export function runPerturbationCase(testCase) {
  const allowed = new Set(['case_id', 'baseline_input', 'perturbed_input', 'changed_cue', 'baseline_action', 'observed_action', 'expected_invariant', 'boundary_changed', 'explanation_changed', 'source_treatment']);
  rejectUnknown(testCase, allowed, 'PerturbationCase');
  for (const key of ['case_id', 'baseline_input', 'perturbed_input', 'changed_cue', 'baseline_action', 'observed_action', 'expected_invariant']) requireString(testCase, key);
  const materiality = classifyMateriality(testCase);
  const result = {
    record_type: 'PerturbationResult',
    version: VERSION,
    case_id: testCase.case_id,
    baseline_digest: digest(testCase.baseline_input),
    perturbed_digest: digest(testCase.perturbed_input),
    changed_cue: testCase.changed_cue,
    expected_invariant: testCase.expected_invariant,
    baseline_action: testCase.baseline_action,
    observed_action: testCase.observed_action,
    action_changed: testCase.baseline_action !== testCase.observed_action,
    materiality,
    source_content_treated_as_data: (testCase.source_treatment || 'data_not_instruction') === 'data_not_instruction',
    external_action: false
  };
  result.record_digest = digest(result);
  return result;
}

export function decisionInvarianceProfile(profileId, cases) {
  if (!profileId) throw new Error('profileId required');
  if (!Array.isArray(cases) || cases.length === 0) throw new Error('cases required');
  const results = cases.map(runPerturbationCase);
  const materiality_classes = [...new Set(results.map((result) => result.materiality))].sort();
  const unstable = results.filter((result) => !['stable_action', 'explanation_variation'].includes(result.materiality));
  let recommendation = 'stable_action_allowed_with_existing_gate';
  if (results.some((result) => result.materiality === 'boundary_or_authority_instability')) recommendation = 'no_action_until_human_review';
  else if (unstable.length) recommendation = 'more_evidence_or_stronger_human_review';
  const profile = {
    record_type: 'DecisionInvarianceProfile',
    version: VERSION,
    profile_id: profileId,
    case_count: results.length,
    stable_case_count: results.length - unstable.length,
    unstable_case_count: unstable.length,
    unstable_case_ids: unstable.map((result) => result.case_id),
    materiality_classes,
    strongest_defensible_action_after_instability: recommendation,
    single_truth_score: null,
    external_action: false,
    results
  };
  profile.record_digest = digest(profile);
  return profile;
}

export function nonProductionTdrAdapter(profile, latentVariables) {
  const perceptionRisk = profile.unstable_case_count === 0 ? 'low_synthetic' : profile.materiality_classes.includes('boundary_or_authority_instability') ? 'high_synthetic' : 'medium_synthetic';
  const adapter = {
    record_type: 'NonProductionTrustDecisionRecordPerceptionAdapter',
    version: VERSION,
    adapter_status: 'non_production_fixture_only',
    perception_risk_finding: perceptionRisk,
    latent_variable_refs: latentVariables.map((item) => item.record_digest),
    decision_invariance_profile_ref: profile.record_digest,
    required_human_review: profile.unstable_case_count > 0,
    strongest_defensible_action: profile.strongest_defensible_action_after_instability,
    confidence_unchanged_by_perception_risk: true,
    evidence_sufficiency_unchanged_by_perception_risk: true,
    risk_if_wrong_unchanged_by_perception_risk: true,
    no_single_truth_score: true,
    external_action: false
  };
  adapter.record_digest = digest(adapter);
  return adapter;
}

export function runFixture(fixture) {
  const latentVariables = (fixture.latent_variables || []).map(validateLatentVariable);
  const profile = decisionInvarianceProfile(requireString(fixture, 'profile_id'), fixture.perturbation_cases || []);
  const tdr = nonProductionTdrAdapter(profile, latentVariables);
  const result = {
    record_type: 'AIDAPerceptionRiskPhase0Run',
    version: VERSION,
    run_id: requireString(fixture, 'run_id'),
    profile,
    latent_variables: latentVariables,
    trust_decision_record_adapter: tdr,
    implemented_scope: 'synthetic_local_read_only_non_production',
    not_yet_implemented: [
      'runtime_production_capability',
      'public_route_activation',
      'protected_production_schema_mutation',
      'model_introspection_claims',
      'deployment',
      'buyer_facing_claims',
      'live_testing',
      'production_assertions',
      'external_action'
    ],
    external_action: false
  };
  result.run_digest = digest(result);
  return result;
}

export function main(argv = process.argv.slice(2)) {
  const input = argv[0];
  const outputIndex = argv.indexOf('--output');
  const output = outputIndex >= 0 ? argv[outputIndex + 1] : null;
  if (!input) throw new Error('fixture path required');
  const fixture = JSON.parse(readFileSync(input, 'utf8'));
  const result = runFixture(fixture);
  const text = `${JSON.stringify(result, null, 2)}\n`;
  if (output) writeFileSync(output, text);
  else process.stdout.write(text);
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    process.exitCode = main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
