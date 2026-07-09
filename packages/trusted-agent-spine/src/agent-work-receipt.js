import { createReusableAgentSpine } from './core.js';
import { assertAgentWorkReceipt, validateAgentWorkReceipt } from './validators.js';
export function createAgentWorkReceiptGenerator(config) {
  const spine = createReusableAgentSpine(config);
  return Object.freeze({ build: args => spine.buildAgentWorkReceipt(args), toRegistrar: (record, options) => spine.toRegistrarWorkReceipt(record, options), validate: validateAgentWorkReceipt, assert: assertAgentWorkReceipt });
}
