import { createReusableAgentSpine } from './core.js';
import { assertContextPack, validateContextPack } from './validators.js';
export function createContextPackBuilder(config) {
  const spine = createReusableAgentSpine(config);
  return Object.freeze({ build: args => spine.buildContextPack(args), validate: validateContextPack, assert: assertContextPack });
}
