// 20260602-1915 TrustMap Engine Loader Scaffold
// Boundary: scaffold only. Not imported by live runtime loader.

import { loadTrustMapEngineRegistry, validateTrustMapEngineRegistry } from './trustmap-engine-data.js';
import { prewarmTrustMapEngineAssets } from './trustmap-engine-assets.js';
import { createTrustMapEngineLayout, installTrustMapEngineLayoutStyles } from './trustmap-engine-layout.js';
import { renderTrustMapEngine } from './trustmap-engine-renderer.js';
import { renderTrustMapEngineInspector } from './trustmap-engine-inspector.js';
import { bindTrustMapEngineInteractions } from './trustmap-engine-interactions.js';
import { createTrustMapEngineState, emitTrustMapEngineEvent } from './trustmap-engine-lifecycle.js';
import { runTrustMapEngineQa, publishTrustMapEngineQa } from './trustmap-engine-qa.js';

export async function createTrustMapEnginePreview(target, options = {}){
  const targetEl = typeof target === 'string' ? document.querySelector(target) : target;
  if(!targetEl) throw new Error('TrustMap Engine preview target not found');
  installTrustMapEngineLayoutStyles();
  const registry = await loadTrustMapEngineRegistry();
  const validation = validateTrustMapEngineRegistry(registry);
  if(!validation.ok) throw new Error(`TrustMap Engine registry invalid: ${validation.errors.join('; ')}`);
  const state = createTrustMapEngineState(options.state || {});
  const shell = createTrustMapEngineLayout();
  targetEl.replaceChildren(shell);
  emitTrustMapEngineEvent(shell, 'registry-loaded', validation);
  prewarmTrustMapEngineAssets(registry);
  emitTrustMapEngineEvent(shell, 'assets-prewarmed', { assetCount:validation.assetCount });
  const renderResult = renderTrustMapEngine(registry, shell, state);
  renderTrustMapEngineInspector(shell, registry.nodes.find(node => node.id === state.selectedObjectId) || registry.nodes[0]);
  bindTrustMapEngineInteractions(shell, registry, state);
  const qa = runTrustMapEngineQa(shell, registry);
  publishTrustMapEngineQa(shell, qa);
  emitTrustMapEngineEvent(shell, 'render-complete', { renderResult, qa });
  return { shell, registry, state, qa };
}

window.CyberShieldTrustMapEngineScaffold = {
  createPreview:createTrustMapEnginePreview,
  loadRegistry:loadTrustMapEngineRegistry,
  validateRegistry:validateTrustMapEngineRegistry
};
