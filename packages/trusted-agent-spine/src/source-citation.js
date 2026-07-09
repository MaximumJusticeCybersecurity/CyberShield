import { createReusableAgentSpine } from './core.js';
import { assertSourceRecord, validateSourceRecord } from './validators.js';
export function createSourceCitationBuilder(config) {
  const spine = createReusableAgentSpine(config);
  return Object.freeze({ build: (items, claims, now) => spine.buildSourceRecords(items, claims, now), link: (items, sources) => spine.linkEvidenceToSources(items, sources), validate: validateSourceRecord, assert: assertSourceRecord });
}
