// V60.3.25 Asset Optimization and Format Upgrade Path
// Purpose: report asset optimization readiness and prevent future optimized paths from being preferred until they are marked available.

function v60325$(selector, root = document){ return root.querySelector(selector); }

function v60325Manifest(){
  return window.CyberShieldTrustMapAssetManifestV60323 || null;
}

function v60325SlotStatus(slot){
  const status = String(slot?.status || 'unknown');
  const optimizedReady = Boolean(slot?.optimized_available || status.includes('optimized_available') || status.includes('webp_available') || status.includes('future_assets_available'));
  return {
    id: slot?.id || 'unknown',
    label: slot?.label || slot?.id || 'Unknown asset',
    layer: slot?.layer || 'unknown',
    status,
    current_png: slot?.current_png || slot?.current_encoded_png || null,
    future_webp: slot?.future_webp || null,
    future_png: slot?.future_png || null,
    optimized_ready: optimizedReady,
    file_size_bytes: slot?.file_size_bytes || null,
    target_file_size_bytes: slot?.target_file_size_bytes || null,
    canvas_size: slot?.canvas_size || null,
    target_canvas_size: slot?.target_canvas_size || null
  };
}

function v60325Report(){
  const manifest = v60325Manifest();
  const slots = Array.isArray(manifest?.slots) ? manifest.slots : [];
  const slotReports = slots.map(v60325SlotStatus);
  const optimizedReadyCount = slotReports.filter(slot => slot.optimized_ready).length;
  const missingCurrent = slotReports.filter(slot => !slot.current_png).map(slot => slot.id);
  const oversized = slotReports.filter(slot => slot.file_size_bytes && slot.target_file_size_bytes && slot.file_size_bytes > slot.target_file_size_bytes).map(slot => slot.id);
  return {
    build: 'V60.3.25 Asset Optimization and Format Upgrade Path',
    status: manifest ? 'manifest_checked' : 'manifest_not_loaded_yet',
    rule: 'Use optimized WebP or upgraded PNG only after an asset slot is marked available. Current PNG remains fallback until optimized assets exist.',
    slot_count: slotReports.length,
    optimized_ready_count: optimizedReadyCount,
    missing_current_assets: missingCurrent,
    oversized_assets: oversized,
    next_asset_action: optimizedReadyCount ? 'use_available_optimized_assets_where_marked' : 'await_optimized_assets_from_creator',
    slots: slotReports
  };
}

function v60325MarkMeta(){
  const payload = v60325$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.asset_optimization_status = v60325Report();
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

window.CyberShieldAssetOptimizationV60325 = {
  report: v60325Report,
  markMeta: v60325MarkMeta
};

document.addEventListener('cybershield:trustmap-asset-manifest-loaded', () => setTimeout(v60325MarkMeta, 250));
document.addEventListener('cybershield:trustmap-images-prewarm-started', () => setTimeout(v60325MarkMeta, 250));
setTimeout(v60325MarkMeta, 1500);
