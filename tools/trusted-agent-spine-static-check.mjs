import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  HUMAN_GATE_DECISIONS,
  attachTrustedAgentSpine,
  validateTrustedAgentSpine
} from '../src/atdr/trusted-agent-spine.js';
import {
  buildTrustDecisionRecord,
  validateTrustDecisionRecordShape
} from '../src/atdr/trust-decision-record-schema-mapper.js';

const now = new Date('2026-07-08T22:30:00.000Z');
const evidence = [{
  evidence_id: 'E-001',
  evidence_name: 'SOC 2 scope excerpt',
  evidence_type: 'SOC 2 scope excerpt',
  source_type: 'Vendor-provided artifact',
  source_authority_band: 'Medium',
  evidence_date: '2025-12-31',
  freshness_band: 'Current with caveat',
  independence_band: 'Third-party report excerpt',
  scope_status: 'AI service not clearly covered',
  contradiction_flag: true,
  synthetic_demo_data_flag: true,
  related_claims: ['C-001'],
  text_extract: 'The evaluated AI service is not expressly listed.',
  caveat: 'Scope is incomplete.'
}];
const engineRecord = {
  record_id: 'ATDR-STATIC-CHECK-001',
  created_at: '2026-07-08T22:00:00.000Z',
  domain: 'vendor-risk',
  recommendation_type: 'Vendor approval recommendation',
  decision_owner: 'Internal QA reviewer',
  extracted_claims: [{
    claim_id: 'C-001',
    normalized_claim: 'Vendor X should be approved',
    materiality: 'High',
    evidence_links: [{ evidence_id: 'E-001' }]
  }],
  missing_support: [{
    missing_support_id: 'M-C-001-1',
    claim_id: 'C-001',
    category: 'Complete SOC 2 scope evidence',
    severity: 'High',
    finding: 'Scope evidence is required.'
  }],
  risk_if_wrong: { band: 'High' },
  confidence_band: 'Low confidence',
  recommended_action: 'Request Evidence',
  human_review: {
    required: true,
    triggers: ['Risk If Wrong is High'],
    required_reviewers: ['Vendor-Risk Owner', 'Security SME']
  }
};
const baseRecord = {
  record_id: engineRecord.record_id,
  created_timestamp: engineRecord.created_at,
  decision_domain: 'vendor_risk',
  recommendation_type: 'vendor-risk approval recommendation',
  original_ai_recommendation: 'AI recommends approving Vendor X.',
  decision_owner: 'Internal QA reviewer',
  claims: engineRecord.extracted_claims,
  evidence_items: evidence,
  required_reviewer_roles: ['Vendor-Risk Owner', 'Security SME'],
  cyberShield_recommended_action: 'Request Evidence'
};

for (const decision of HUMAN_GATE_DECISIONS) {
  const record = attachTrustedAgentSpine(baseRecord, {
    engineRecord,
    evidenceItems: evidence,
    missingSupport: engineRecord.missing_support,
    state: {
      firstName: 'Reviewer',
      reviewerRole: 'Security SME',
      humanDecision: decision,
      humanRationale: `Decision: ${decision}`,
      residualRiskAcknowledgment: 'not_accepted',
      recommendation: baseRecord.original_ai_recommendation
    },
    now
  });
  const validation = validateTrustedAgentSpine(record);
  assert.equal(validation.ok, true, JSON.stringify(validation));
  assert.equal(record.human_gate.selected_decision, decision);
  assert.equal(record.evidence_items[0].source_id, record.sources[0].source_id);
  assert.equal(record.agent_work_receipt.output_record_id, engineRecord.record_id);
}

const mapped = buildTrustDecisionRecord({
  engineRecord,
  state: {
    firstName: 'Reviewer',
    company: 'MJC',
    vendor: 'Vendor X',
    recommendation: baseRecord.original_ai_recommendation,
    reviewerRole: 'Vendor-Risk Owner',
    humanDecision: 'defer',
    humanRationale: 'Collect missing evidence.',
    residualRiskAcknowledgment: 'not_accepted'
  },
  evidenceItems: evidence,
  validators: [{ validator_name: 'Scope', status: 'Needs Evidence', explanation: 'Scope unclear.' }],
  candidateActions: [{ action_label: 'Request Evidence', selected_as_recommendation: true }],
  now
});
assert.equal(validateTrustDecisionRecordShape(mapped).ok, true);
assert.equal(mapped.context_pack.source_ids.length, 1);
assert.equal(mapped.missing_evidence_records.length, 1);
assert.equal(mapped.human_gate.selected_decision, 'defer');
assert.match(mapped.agent_work_receipt.candidate_digest, /^fnv1a32-demo:/);

const preferredRoute = await readFile(new URL('../vendor-risk-next.html', import.meta.url), 'utf8');
const internalQa = await readFile(new URL('../internal-qa.html', import.meta.url), 'utf8');
const routeManifest = JSON.parse(await readFile(new URL('../route-manifest.json', import.meta.url), 'utf8'));
assert.match(preferredRoute, /attachTrustedAgentSpine/);
assert.match(preferredRoute, /humanDecision/);
assert.match(preferredRoute, /agent_work_receipt/);
assert.match(internalQa, /trusted-agent-spine-smoke\.html/);
assert.ok(routeManifest.routes.some(route => route.path === '/trusted-agent-spine-smoke.html'));
assert.equal(routeManifest.routes.find(route => route.path === '/vendor-risk-next.html').expected_contract.agent_work_receipt, true);

console.log('trusted-agent-spine static check: PASS');
