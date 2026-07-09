import { createReusableAgentSpine } from './core.js';
import { assertHumanGate, validateHumanGate } from './validators.js';
export function createHumanGateBuilder(config) {
  const spine = createReusableAgentSpine(config);
  return Object.freeze({ build: args => spine.buildHumanGate(args), validate: validateHumanGate, assert: assertHumanGate });
}
