import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, readFileSync as readFile, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  validateLatentVariable,
  runPerturbationCase,
  decisionInvarianceProfile,
  nonProductionTdrAdapter,
  runFixture,
  main
} from '../aida-perception-phase0.mjs';

const fixture = JSON.parse(readFileSync(new URL('../fixtures/aida-perception-risk.synthetic.json', import.meta.url), 'utf8'));

test('latent variable validator supports all required classes', () => {
  const classes = new Set(fixture.latent_variables.map((item) => validateLatentVariable(item).classification));
  assert.deepEqual(classes, new Set([
    'explicit_input',
    'deterministically_derived',
    'externally_measured',
    'model_inferred',
    'disputed',
    'unavailable',
    'not_applicable'
  ]));
});

test('latent variable unknown field fails closed', () => {
  const copy = { ...fixture.latent_variables[0], extra: 'not allowed' };
  assert.throws(() => validateLatentVariable(copy), /unsupported fields/);
});

test('wording-only change is explanation variation and not material instability', () => {
  const result = runPerturbationCase(fixture.perturbation_cases[0]);
  assert.equal(result.action_changed, false);
  assert.equal(result.materiality, 'explanation_variation');
});

test('evidence order reversal is surfaced as material evidence instability', () => {
  const result = runPerturbationCase(fixture.perturbation_cases[1]);
  assert.equal(result.action_changed, true);
  assert.equal(result.materiality, 'evidence_interpretation_instability');
});

test('delimiter and source authority change is boundary instability', () => {
  const result = runPerturbationCase(fixture.perturbation_cases[2]);
  assert.equal(result.action_changed, true);
  assert.equal(result.materiality, 'boundary_or_authority_instability');
  assert.equal(result.source_content_treated_as_data, true);
});

test('cross-model disagreement is preserved rather than averaged into truth', () => {
  const result = runPerturbationCase(fixture.perturbation_cases[3]);
  assert.equal(result.action_changed, true);
  assert.equal(result.materiality, 'material_action_instability');
});

test('decision invariance profile has no truth score', () => {
  const profile = decisionInvarianceProfile(fixture.profile_id, fixture.perturbation_cases);
  assert.equal(profile.single_truth_score, null);
  assert.equal(profile.unstable_case_count, 3);
  assert.equal(profile.strongest_defensible_action_after_instability, 'no_action_until_human_review');
});

test('non-production TDR adapter separates perception risk from confidence evidence and RIW', () => {
  const variables = fixture.latent_variables.map(validateLatentVariable);
  const profile = decisionInvarianceProfile(fixture.profile_id, fixture.perturbation_cases);
  const adapter = nonProductionTdrAdapter(profile, variables);
  assert.equal(adapter.adapter_status, 'non_production_fixture_only');
  assert.equal(adapter.confidence_unchanged_by_perception_risk, true);
  assert.equal(adapter.evidence_sufficiency_unchanged_by_perception_risk, true);
  assert.equal(adapter.risk_if_wrong_unchanged_by_perception_risk, true);
  assert.equal(adapter.no_single_truth_score, true);
  assert.equal(adapter.required_human_review, true);
});

test('full fixture run recommends no action or human review without external action', () => {
  const report = runFixture(fixture);
  assert.equal(report.record_type, 'AIDAPerceptionRiskPhase0Run');
  assert.equal(report.trust_decision_record_adapter.strongest_defensible_action, 'no_action_until_human_review');
  assert.equal(report.external_action, false);
  assert.ok(report.not_yet_implemented.includes('public_route_activation'));
  assert.ok(report.not_yet_implemented.includes('protected_production_schema_mutation'));
});

test('CLI writes report', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aida-prdi-'));
  try {
    const out = join(dir, 'report.json');
    const code = main([new URL('../fixtures/aida-perception-risk.synthetic.json', import.meta.url).pathname, '--output', out]);
    assert.equal(code, 0);
    const report = JSON.parse(readFile(out, 'utf8'));
    assert.equal(report.run_id, 'AIDA-PRDI-RUN-20260716-001');
    assert.equal(report.external_action, false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
