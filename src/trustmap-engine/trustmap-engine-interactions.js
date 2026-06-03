// 20260602-1915 TrustMap Engine Interaction Scaffold
// Boundary: scaffold only. Not wired into live runtime.

import { renderTrustMapEngineInspector } from './trustmap-engine-inspector.js';

export function bindTrustMapEngineInteractions(root, registry, state){
  if(!root || root.dataset.trustmapEngineInteractions === 'bound') return;
  root.dataset.trustmapEngineInteractions = 'bound';
  root.addEventListener('click', event => {
    const nodeButton = event.target.closest('[data-tm-engine-node]');
    if(nodeButton){
      const node = registry.nodes.find(item => item.id === nodeButton.dataset.tmEngineNode);
      state.selectedObjectId = node?.id || null;
      renderTrustMapEngineInspector(root, node);
      root.dispatchEvent(new CustomEvent('trustmap-engine:object-selected', { detail:{ nodeId:state.selectedObjectId } }));
      return;
    }
    const view = event.target.closest('[data-tm-engine-view]');
    if(view){
      state.activeMode = view.dataset.tmEngineView;
      root.dataset.trustmapEngineLastMode = state.activeMode;
      root.dispatchEvent(new CustomEvent('trustmap-engine:view-mode-changed', { detail:{ mode:state.activeMode } }));
    }
  });
}
