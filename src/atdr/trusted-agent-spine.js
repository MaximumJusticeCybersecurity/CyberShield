// CyberShield compatibility adapter for the reusable trusted-agent spine.
// Public and canonical ATDR behavior remains domain-specific while shared builders live
// in ../agent-spine/reusable-agent-spine.js.

import {
  HUMAN_GATE_DECISIONS,
  canonicalJson,
  createReusableAgentSpine,
  prototypeDigest
} from '../agent-spine/reusable-agent-spine.js';

const SPINE_VERSION = '20260708-p1';

const cybershieldSpine = createReusableAgentSpine({
  spineVersion: SPINE_VERSION,
  domainPackId: 'cybershield-decision-assurance',
  domainPackVersion: '20260708-p1',
  agentIdentity: 'cybershield-static-decision-assurance',
  humanOwnerId: 'max-justice',
  canonicalRole: 'Decision Assurance workflow; non-verifier',
  taskId: 'CyberShield issue #25 P2',
  recordIdPrefix: 'ATDR',
  defaultDomain: 'vendor_risk',
  defaultDecisionType: 'vendor-risk recommendation review',
  taskObjective: 'Determine the strongest defensible action for the AI-generated recommendation based on available evidence.',
  defaultIntendedUse: 'Vendor approval recommendation review before enterprise action',
  scope: [
    'AI-generated vendor-risk recommendation',
    'Claims',
    'Evidence',
    'Contradictions',
    'Risk If Wrong',
    'Confidence',
    'Candidate actions',
    'Human review'
  ],
  exclusions: [
    'Autonomous vendor approval',
    'Production authentication',
    'Production persistence',
    'External action',
    'Public Aegis positioning'
  ],
  constraints: [
    'Static deterministic prototype',
    'Synthetic demonstration evidence',
    'Human approval remains required'
  ],
  defaultUncertainties: [
    'No live source verification or model introspection is performed.'
  ],
  requestedOutput: 'One canonical AI Trust Decision Record',
  authorityBoundary: 'CyberShield may analyze and recommend. Accountable humans approve, reject, modify, defer, or escalate.',
  reviewerRoles: [
    'Vendor-Risk Owner',
    'Security SME',
    'Legal/Privacy Reviewer',
    'Business Owner'
  ],
  responsibleRole: 'Vendor-Risk Owner and Security SME',
  requestedBy: 'CyberShield Decision Assurance workflow',
  operationsPerformed: [
    'classified recommendation domain',
    'extracted material claims',
    'mapped evidence and contradictions',
    'identified missing evidence',
    'classified Risk If Wrong',
    'assigned confidence band',
    'compared candidate actions',
    'created Human Gate',
    'assembled canonical AI Trust Decision Record'
  ],
  toolsUsed: [
    'CyberShield static deterministic engine',
    'trusted-agent-spine.js',
    'reusable-agent-spine.js'
  ],
  limitations: [
    'Static prototype using synthetic demonstration evidence.',
    'Agent Work Receipt records work performed; it does not prove the conclusion is true.',
    'The candidate digest is a non-cryptographic deterministic demo reference, not a protected-change attestation.',
    'Verifier identity, quorum, deterministic Policy Gate, and production audit services are not implemented in this browser workflow.'
  ],
  verificationStatus: 'unverified_static_prototype',
  sourceDefaults: {
    sourceType: 'not_recorded',
    origin: 'not_recorded',
    authorOrProvider: 'not_recorded',
    syntheticDemo: true
  },
  recommendationSelector: ({ record, engineRecord, state }) =>
    record.cyberShield_recommended_action || engineRecord.recommended_action || state.recommendation,
  ownerSelector: ({ record, engineRecord, state }) =>
    record.decision_owner || engineRecord.decision_owner || state.firstName,
  intendedUseSelector: ({ engineRecord, state }) =>
    engineRecord.intended_use || state.intendedUse,
  humanGateTriggers: ({ record, engineRecord }) =>
    engineRecord.human_review?.triggers || record.human_gate?.triggering_conditions || []
});

function buildSourceRecords(evidenceItems = [], claims = [], now = new Date()) {
  return cybershieldSpine.buildSourceRecords(evidenceItems, claims, now);
}

function linkEvidenceToSources(evidenceItems = [], sources = []) {
  return cybershieldSpine.linkEvidenceToSources(evidenceItems, sources);
}

function buildMissingEvidenceRecords(missingSupport = [], now = new Date()) {
  return cybershieldSpine.buildMissingEvidenceRecords(missingSupport, now);
}

function buildContextPack(args = {}) {
  return cybershieldSpine.buildContextPack(args);
}

function buildHumanGate(args = {}) {
  return cybershieldSpine.buildHumanGate(args);
}

function buildAgentWorkReceipt(args = {}) {
  return cybershieldSpine.buildAgentWorkReceipt(args);
}

function attachTrustedAgentSpine(record = {}, options = {}) {
  return cybershieldSpine.attach(record, options);
}

function validateTrustedAgentSpine(record = {}) {
  return cybershieldSpine.validate(record);
}

function toRegistrarWorkReceipt(record = {}, options = {}) {
  return cybershieldSpine.toRegistrarWorkReceipt(record, options);
}

export {
  SPINE_VERSION,
  HUMAN_GATE_DECISIONS,
  attachTrustedAgentSpine,
  buildAgentWorkReceipt,
  buildContextPack,
  buildHumanGate,
  buildMissingEvidenceRecords,
  buildSourceRecords,
  canonicalJson,
  linkEvidenceToSources,
  prototypeDigest,
  toRegistrarWorkReceipt,
  validateTrustedAgentSpine
};
