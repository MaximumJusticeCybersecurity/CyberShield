// 20260602-1915 TrustMap Engine Asset Manager Scaffold
// Boundary: scaffold only. Not wired into live runtime.

export function getTrustMapEngineAssetCandidates(asset){
  if(!asset) return [];
  const candidates = [];
  if(asset.encodedPrimary) candidates.push(asset.encodedPrimary);
  if(asset.primary) candidates.push(asset.primary.replaceAll(' ', '%20'));
  (asset.fallbacks || []).forEach(path => candidates.push(String(path).replaceAll(' ', '%20')));
  return Array.from(new Set(candidates));
}

export function createTrustMapEngineImage(asset, alt){
  const img = document.createElement('img');
  img.alt = alt || asset?.label || 'TrustMap asset';
  img.decoding = 'async';
  img.loading = 'eager';
  img.fetchPriority = 'high';
  img.dataset.trustmapEngineAsset = asset?.id || 'unknown';
  const candidates = getTrustMapEngineAssetCandidates(asset);
  img.dataset.trustmapEngineCandidates = JSON.stringify(candidates);
  img.dataset.trustmapEngineCandidateIndex = '0';
  img.addEventListener('error', () => {
    const list = JSON.parse(img.dataset.trustmapEngineCandidates || '[]');
    const next = Number(img.dataset.trustmapEngineCandidateIndex || '0') + 1;
    if(next >= list.length) return;
    img.dataset.trustmapEngineCandidateIndex = String(next);
    img.src = list[next];
  });
  if(candidates[0]) img.src = candidates[0];
  return img;
}

export function getTrustMapEngineAssetFrameClass(asset){
  if(asset?.shape === 'kernel-shield') return 'tm-engine-asset-frame tm-engine-asset-frame-kernel';
  return 'tm-engine-asset-frame tm-engine-asset-frame-square-black';
}

export function createTrustMapEngineAssetFrame(asset, node){
  const frame = document.createElement('span');
  frame.className = getTrustMapEngineAssetFrameClass(asset);
  frame.dataset.trustmapEngineFrame = asset?.id || node?.id || 'unknown';
  frame.appendChild(createTrustMapEngineImage(asset, node?.label || asset?.label));
  return frame;
}

export function prewarmTrustMapEngineAssets(registry){
  const assets = Object.values(registry?.assets || {});
  assets.forEach(asset => {
    const src = getTrustMapEngineAssetCandidates(asset)[0];
    if(!src) return;
    const img = new Image();
    img.decoding = 'async';
    img.loading = 'eager';
    img.src = src;
  });
  return { attempted: assets.length };
}
