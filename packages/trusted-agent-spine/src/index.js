export { CORE_SPINE_VERSION, HUMAN_GATE_DECISIONS, canonicalJson, createReusableAgentSpine, prototypeDigest } from './core.js';
export { createContextPackBuilder } from './context-pack.js';
export { createSourceCitationBuilder } from './source-citation.js';
export { createMissingEvidenceTracker } from './missing-evidence.js';
export { createHumanGateBuilder } from './human-gate.js';
export { createAgentWorkReceiptGenerator } from './agent-work-receipt.js';
export { assertAgentWorkReceipt, assertContextPack, assertHumanGate, assertMissingEvidence, assertSourceRecord, validateAgentWorkReceipt, validateContextPack, validateHumanGate, validateMissingEvidence, validateSourceRecord, validateTrustedAgentRecord } from './validators.js';

export const PACKAGE_NAME = '@maximumjustice/trusted-agent-spine';
export const PACKAGE_VERSION = '0.1.0';
export const CONSUMER_CONTRACT_VERSION = '1.0.0';
export const MAXIMUM_ACTION_TIER = 'tier-0';
export const SCHEMA_ASSETS = Object.freeze({
  contextPack: './schemas/context-pack.schema.json',
  sourceRecord: './schemas/source-record.schema.json',
  missingEvidence: './schemas/missing-evidence.schema.json',
  humanGate: './schemas/human-gate.schema.json',
  agentWorkReceipt: './schemas/agent-work-receipt.schema.json'
});
