// 20260602-2010 TrustMap Engine Interaction Hardening
// Boundary: new engine only. No legacy TrustMap runtime changes.

import { renderTrustMapEngineInspector } from './trustmap-engine-inspector.js';
import { applyTrustMapEngineViewMode } from './trustmap-engine-view-modes.js';

export function bindTrustMapEngineInteractions(root, registry, state){
  if(!root || root.dataset.trustmapEngineInteractions === 'bound') return;
  root.dataset.trustmapEngineInteractions = 'bound';
  root.addEventListener('click', event => {
    const nodeButton = event.target.closest('[data-tm-engine-node]');
    if(nodeButton){
      const node = registry.nodes.find(item => item.id === nodeButton.dataset.tmEngineNode);
      state.selectedObjectId = node?.id || null;
      root.querySelectorAll('[data-tm-engine-node]').forEach(item => item.dataset.tmEngineSelected = 'false');
      nodeButton.dataset.tmEngineSelected = 'true';
      renderTrustMapEngineInspector(root, node);
      root.dispatchEvent(new CustomEvent('trustmap-engine:object-selected', { detail:{ nodeId:state.selectedObjectId } }));
      return;
    }
    const view = event.target.closest('[data-tm-engine-view]');
    if(view){
      state.activeMode = view.dataset.tmEngineView;
      root.dataset.trustmapEngineLastMode = state.activeMode;
      root.querySelectorAll('[data-tm-engine-view]').forEach(button => button.dataset.tmEngineViewActive = 'false');
      view.dataset.tmEngineViewActive = 'true';
      applyTrustMapEngineViewMode(root, state.activeMode);
      root.dispatchEvent(new CustomEvent('trustmap-engine:view-mode-changed', { detail:{ mode:state.activeMode } }));
    }
  });
  const initial = root.querySelector(`[data-tm-engine-node="${state.selectedObjectId || 'kernel'}"]`) || root.querySelector('[data-tm-engine-node]');
  if(initial){
    initial.dataset.tmEngineSelected = 'true';
    const node = registry.nodes.find(item => item.id === initial.dataset.tmEngineNode);
    renderTrustMapEngineInspector(root, node);
  }
  const activeView = root.querySelector(`[data-tm-engine-view="${state.activeMode || 'domain'}"]`) || root.querySelector('[data-tm-engine-view="domain"]');
  if(activeView) activeView.dataset.tmEngineViewActive = 'true';
  applyTrustMapEngineViewMode(root, state.activeMode || 'domain');
}
