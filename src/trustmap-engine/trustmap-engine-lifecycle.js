// 20260602-1915 TrustMap Engine Lifecycle Scaffold
// Boundary: scaffold only. Not wired into live runtime.

export function emitTrustMapEngineEvent(root, name, detail = {}){
  const event = new CustomEvent(`trustmap-engine:${name}`, { detail:{ ...detail, at:new Date().toISOString() } });
  (root || document).dispatchEvent(event);
}

export function createTrustMapEngineState(initial = {}){
  return {
    activeMode:'domain',
    selectedObjectId:'kernel',
    zoom:1,
    pan:{ x:0, y:0 },
    assetsLoaded:false,
    lastRenderReason:'scaffold-preview',
    ...initial
  };
}
