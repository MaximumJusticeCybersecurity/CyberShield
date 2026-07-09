import { createReusableAgentSpine } from './core.js';
import { assertMissingEvidence, validateMissingEvidence } from './validators.js';
export function createMissingEvidenceTracker(config) {
  const spine = createReusableAgentSpine(config);
  return Object.freeze({ build: (items, now) => spine.buildMissingEvidenceRecords(items, now), validate: validateMissingEvidence, assert: assertMissingEvidence });
}
