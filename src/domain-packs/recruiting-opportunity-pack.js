// Recruiting Opportunity domain pack proof for the reusable trusted-agent spine.
// This proof prepares an evidence-backed pursuit recommendation and stops before
// application submission, outreach, scheduling, or CRM mutation.

import {
  createReusableAgentSpine
} from '../agent-spine/reusable-agent-spine.js';

const RECRUITING_DOMAIN_PACK_VERSION = '20260709-p2';

const recruitingOpportunitySpine = createReusableAgentSpine({
  spineVersion: '20260709-p2',
  domainPackId: 'recruiting-opportunity',
  domainPackVersion: RECRUITING_DOMAIN_PACK_VERSION,
  agentIdentity: 'recruiting-agent',
  humanOwnerId: 'max-justice',
  canonicalRole: 'Recruiting opportunity decision-support workflow; non-verifier',
  taskId: 'CyberShield issue #25 P2 second-domain proof',
  recordIdPrefix: 'ROP',
  defaultDomain: 'recruiting_opportunity',
  defaultDecisionType: 'opportunity pursuit recommendation',
  taskObjective: 'Determine whether an employment or consulting opportunity is sufficiently verified and aligned to prepare for accountable owner review.',
  defaultIntendedUse: 'Prepare a pursuit decision before any application, outreach, or external commitment.',
  scope: [
    'Official opportunity posting',
    'Role and compensation fit',
    'Location and schedule fit',
    'Mission and clearance constraints',
    'Career-evidence match',
    'Ghost-job risk',
    'Hiring access path',
    'Human pursuit decision'
  ],
  exclusions: [
    'Automatic application submission',
    'External recruiter or hiring-manager contact',
    'Calendar scheduling',
    'CRM mutation',
    'Credential use',
    'Legal or demographic attestation',
    'Production authentication',
    'Public release'
  ],
  constraints: [
    'Synthetic non-sensitive proof record',
    'No private resume content',
    'No external action',
    'Human approval remains required'
  ],
  defaultUncertainties: [
    'The proof does not verify a live requisition or contact path.',
    'The proof does not calculate final compensation or benefits value.'
  ],
  requestedOutput: 'One reviewable Recruiting Opportunity Decision Record',
  authorityBoundary: 'The recruiting workflow may research, structure evidence, score, and recommend. Dr. Max Justice decides whether to pursue, modify, defer, or reject.',
  reviewerRoles: [
    'Dr. Max Justice',
    'Recruiting Opportunity Owner'
  ],
  responsibleRole: 'Recruiting Opportunity Owner',
  requestedBy: 'Recruiting Agent',
  operationsPerformed: [
    'normalized opportunity fields',
    'mapped official-posting and qualification evidence',
    'identified missing pursuit evidence',
    'classified opportunity risk if wrong',
    'prepared a pursuit recommendation',
    'created Human Gate',
    'assembled Recruiting Opportunity Decision Record'
  ],
  toolsUsed: [
    'reusable-agent-spine.js',
    'recruiting-opportunity-pack.js'
  ],
  limitations: [
    'Synthetic proof only; no live job was verified.',
    'No private resume, email, or relationship evidence was ingested.',
    'The Agent Work Receipt records work performed; it does not prove the opportunity is real or suitable.',
    'No application submission, external communication, credential use, or CRM mutation occurred.'
  ],
  verificationStatus: 'unverified_second_domain_proof',
  sourceDefaults: {
    sourceType: 'official_posting',
    origin: 'synthetic_fixture',
    authorOrProvider: 'synthetic_fixture',
    syntheticDemo: true
  },
  recommendationSelector: ({ record, engineRecord, state }) =>
    record.recommended_action || engineRecord.recommended_action || state.recommendation,
  ownerSelector: ({ record, engineRecord, state }) =>
    record.decision_owner || engineRecord.decision_owner || state.firstName || 'Dr. Max Justice',
  intendedUseSelector: ({ engineRecord, state }) =>
    engineRecord.intended_use || state.intendedUse,
  humanGateTriggers: ({ record, engineRecord }) =>
    engineRecord.human_review?.triggers || record.human_gate?.triggering_conditions || []
});

function attachRecruitingOpportunitySpine(record = {}, options = {}) {
  return recruitingOpportunitySpine.attach(record, options);
}

function validateRecruitingOpportunitySpine(record = {}) {
  return recruitingOpportunitySpine.validate(record);
}

function toRecruitingRegistrarReceipt(record = {}, options = {}) {
  return recruitingOpportunitySpine.toRegistrarWorkReceipt(record, options);
}

export {
  RECRUITING_DOMAIN_PACK_VERSION,
  attachRecruitingOpportunitySpine,
  recruitingOpportunitySpine,
  toRecruitingRegistrarReceipt,
  validateRecruitingOpportunitySpine
};
