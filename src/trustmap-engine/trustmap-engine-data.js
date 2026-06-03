// 20260602-1915 TrustMap Engine Data Scaffold
// Boundary: scaffold only. Not wired into live runtime.

export const TRUSTMAP_ENGINE_REGISTRY_URL = 'data/trustmap/engine/trustmap-engine-registry.json';

let cachedRegistry = null;

export async function loadTrustMapEngineRegistry(){
  if(cachedRegistry) return cachedRegistry;
  const response = await fetch(TRUSTMAP_ENGINE_REGISTRY_URL, { cache:'no-store' });
  if(!response.ok) throw new Error(`TrustMap Engine registry load failed: ${response.status}`);
  cachedRegistry = await response.json();
  return cachedRegistry;
}

export function validateTrustMapEngineRegistry(registry){
  const errors = [];
  if(!registry) errors.push('registry missing');
  if(!registry?.nodes?.length) errors.push('nodes missing');
  if(!registry?.edges?.length) errors.push('edges missing');
  if(!registry?.assets || typeof registry.assets !== 'object') errors.push('assets missing');
  const requiredNodeIds = ['kernel','cloud','identity','appsData','ai','endpoints','cmmc','third'];
  requiredNodeIds.forEach(id => {
    if(!registry?.nodes?.some(node => node.id === id)) errors.push(`node missing: ${id}`);
    if(!registry?.assets?.[id]) errors.push(`asset missing: ${id}`);
  });
  return {
    ok: errors.length === 0,
    errors,
    nodeCount: registry?.nodes?.length || 0,
    edgeCount: registry?.edges?.length || 0,
    assetCount: registry?.assets ? Object.keys(registry.assets).length : 0
  };
}

export function getTrustMapEngineNode(registry, id){
  return registry?.nodes?.find(node => node.id === id) || null;
}

export function getTrustMapEngineAsset(registry, id){
  return registry?.assets?.[id] || null;
}
