#!/usr/bin/env node

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  attachTrustedAgentSpine,
  toRegistrarWorkReceipt,
  validateTrustedAgentSpine
} from '../src/atdr/trusted-agent-spine.js';
import {
  attachRecruitingOpportunitySpine,
  toRecruitingRegistrarReceipt,
  validateRecruitingOpportunitySpine
} from '../src/domain-packs/recruiting-opportunity-pack.js';

const now = new Date('2026-07-09T00:00:00.000Z');

const cyberRecord = {
  record_id: 'ATDR-P2-001',
  created_timestamp: now.toISOString(),
  decision_domain: 'vendor_risk',
  recommendation_type: 'vendor-risk recommendation review',
  original_ai_recommendation: 'Approve the vendor for production use.',
  decision_owner: 'Vendor-Risk Owner',
  cyberShield_recommended_action: 'Request Evidence',
  confidence_band: 'Low confidence',
  risk_if_wrong_band: 'High',
  claims: [{
    claim_id: 'C-001',
    claim_type: 'fact',
    normalized_claim: 'The vendor encrypts production data at rest.',
    materiality: 'high',
    evidence_status: 'partially-supported',
    evidence_links: [{ evidence_id: 'E-001' }]
  }],
  evidence_items: [{
    evidence_id: 'E-001',
    evidence_title: 'Synthetic security questionnaire',
    evidence_type: 'questionnaire',
    source_type: 'vendor_self_attestation',
    evidence_summary: 'Vendor states that encryption is enabled.',
    freshness: 'current',
    independence_status: 'unverified',
    synthetic_demo_data_flag: true
  }]
};

const cyberEngine = {
  record_id: cyberRecord.record_id,
  created_at: now.toISOString(),
  recommended_action: 'Request Evidence',
  missing_support: [{
    missing_support_id: 'ME-C-001',
    claim_id: 'C-001',
    category: 'Independent encryption evidence',
    finding: 'No inspectable configuration or independent assessment is present.',
    severity: 'High'
  }],
  human_review: {
    triggers: ['High Risk If Wrong', 'Low confidence'],
    required_reviewers: ['Vendor-Risk Owner', 'Security SME']
  }
};

const cyber = attachTrustedAgentSpine(cyberRecord, {
  engineRecord: cyberEngine,
  state: {},
  now
});

assert.equal(validateTrustedAgentSpine(cyber).ok, true);
assert.equal(cyber.context_pack.domain_pack_id, 'cybershield-decision-assurance');
assert.equal(cyber.evidence_items[0].source_id, cyber.sources[0].source_id);
assert.equal(cyber.missing_evidence_records.length, 1);
assert.equal(cyber.human_gate.selected_decision, 'not_recorded');
assert.equal(cyber.agent_work_receipt.domain_pack_id, 'cybershield-decision-assurance');
assert.match(cyber.agent_work_receipt.candidate_digest, /^fnv1a32-demo:/);

const cyberRegistrarReceipt = toRegistrarWorkReceipt(cyber, {
  runId: 'RUN-CYBER-P2-001',
  policyVersion: '2026061909',
  now
});
validateRegistrarReceipt(cyberRegistrarReceipt);
assert.equal(cyberRegistrarReceipt.approval_gate.approval_status, 'pending');
assert.equal(cyberRegistrarReceipt.disposition.status, 'completed-pending-approval');

const recruitingRecord = {
  record_id: 'ROP-P2-001',
  created_timestamp: now.toISOString(),
  decision_domain: 'recruiting_opportunity',
  recommendation_type: 'opportunity pursuit recommendation',
  decision_owner: 'Dr. Max Justice',
  recommended_action: 'Prepare for owner review; do not submit',
  confidence_band: 'Moderate',
  risk_if_wrong_band: 'Moderate',
  claims: [
    {
      claim_id: 'RC-001',
      claim_type: 'fact',
      normalized_claim: 'The role permits remote work.',
      materiality: 'high',
      evidence_status: 'supported',
      evidence_links: [{ evidence_id: 'RE-001' }]
    },
    {
      claim_id: 'RC-002',
      claim_type: 'assumption',
      normalized_claim: 'The compensation likely satisfies the owner threshold.',
      materiality: 'high',
      evidence_status: 'unsupported',
      evidence_links: []
    }
  ],
  evidence_items: [{
    evidence_id: 'RE-001',
    evidence_title: 'Synthetic official employer posting',
    evidence_type: 'official_posting',
    source_type: 'official_employer_site',
    evidence_summary: 'The synthetic posting says remote within the United States.',
    freshness: 'current',
    independence_status: 'authoritative',
    synthetic_demo_data_flag: true
  }],
  missing_support: [{
    missing_evidence_id: 'RME-001',
    claim_id: 'RC-002',
    required_evidence_type: 'Published compensation range',
    reason_required: 'Compensation is not included in the synthetic posting.',
    severity: 'High',
    minimum_sufficient_evidence: 'Official salary range or written recruiter confirmation'
  }]
};

const recruiting = attachRecruitingOpportunitySpine(recruitingRecord, {
  engineRecord: {
    record_id: recruitingRecord.record_id,
    recommended_action: recruitingRecord.recommended_action,
    missing_support: recruitingRecord.missing_support,
    human_review: {
      triggers: ['Compensation evidence missing', 'Owner pursuit decision required'],
      required_reviewers: ['Dr. Max Justice']
    }
  },
  state: {},
  now
});

assert.equal(validateRecruitingOpportunitySpine(recruiting).ok, true);
assert.equal(recruiting.context_pack.domain_pack_id, 'recruiting-opportunity');
assert.equal(recruiting.agent_work_receipt.domain_pack_id, 'recruiting-opportunity');
assert.equal(recruiting.human_gate.selected_decision, 'not_recorded');
assert.ok(recruiting.context_pack.prohibited_actions.includes('Automatic application submission'));
assert.ok(recruiting.agent_work_receipt.limitations.some(value => value.includes('No application submission')));

const recruitingRegistrarReceipt = toRecruitingRegistrarReceipt(recruiting, {
  runId: 'RUN-RECRUITING-P2-001',
  policyVersion: '2026061909',
  now
});
validateRegistrarReceipt(recruitingRegistrarReceipt);
assert.equal(recruitingRegistrarReceipt.context_pack.domain_pack_id, 'recruiting-opportunity');
assert.equal(recruitingRegistrarReceipt.findings.assumptions.length, 1);
assert.equal(recruitingRegistrarReceipt.findings.missing_evidence.length, 1);
assert.ok(recruitingRegistrarReceipt.actions.prohibited.includes('Automatic application submission'));

const genericSource = await readFile(new URL('../src/agent-spine/reusable-agent-spine.js', import.meta.url), 'utf8');
const recruitingSource = await readFile(new URL('../src/domain-packs/recruiting-opportunity-pack.js', import.meta.url), 'utf8');
for (const prohibitedImport of ['axios', 'puppeteer', 'playwright', 'selenium', 'child_process', '@octokit', 'googleapis']) {
  assert.equal(genericSource.includes(prohibitedImport), false, `generic module imports ${prohibitedImport}`);
  assert.equal(recruitingSource.includes(prohibitedImport), false, `recruiting pack imports ${prohibitedImport}`);
}
assert.equal(/\bfetch\s*\(/.test(genericSource), false);
assert.equal(/\bfetch\s*\(/.test(recruitingSource), false);

console.log('Reusable Agent Spine P2: PASS');
console.log(JSON.stringify({
  cyber_domain_pack: cyber.context_pack.domain_pack_id,
  recruiting_domain_pack: recruiting.context_pack.domain_pack_id,
  cyber_receipt: cyber.agent_work_receipt.receipt_id,
  recruiting_receipt: recruiting.agent_work_receipt.receipt_id,
  external_action_paths: 0
}, null, 2));

function validateRegistrarReceipt(receipt) {
  const required = [
    'record_type', 'record_version', 'receipt_id', 'task_id', 'run_id',
    'agent_id', 'human_owner_id', 'started_at', 'completed_at',
    'context_pack', 'sources', 'findings', 'transformations', 'artifacts',
    'validators', 'risk_and_confidence', 'actions', 'approval_gate',
    'disposition', 'attribution'
  ];
  for (const key of required) assert.ok(Object.hasOwn(receipt, key), `receipt missing ${key}`);
  assert.equal(receipt.record_type, 'agent_work_receipt');
  assert.match(receipt.agent_id, /^[a-z0-9][a-z0-9-]*$/);
  assert.ok(Array.isArray(receipt.sources));
  assert.ok(Array.isArray(receipt.validators));
  assert.ok(Array.isArray(receipt.actions.prohibited));
  assert.ok(['pending', 'approved', 'rejected', 'modified', 'escalated', 'not-required'].includes(receipt.approval_gate.approval_status));
}
