// 20260602-1915 TrustMap Engine View Mode Scaffold
// Boundary: scaffold only. Not wired into live runtime.

export const TRUSTMAP_ENGINE_VIEW_MODES = ['fit','kernel','domain','object'];

export function applyTrustMapEngineViewMode(root, mode){
  const world = root?.querySelector?.('[data-tm-engine-world]');
  if(!world) return;
  const safeMode = TRUSTMAP_ENGINE_VIEW_MODES.includes(mode) ? mode : 'domain';
  root.dataset.trustmapEngineViewMode = safeMode;
  const transforms = {
    fit: 'scale(.92) translate(0,0)',
    kernel: 'scale(1.18) translate(0,0)',
    domain: 'scale(1) translate(0,0)',
    object: 'scale(1.08) translate(0,0)'
  };
  world.style.transform = transforms[safeMode];
}
