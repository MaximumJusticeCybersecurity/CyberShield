// V60.3.23/V60.3.25 TrustMap Asset Manifest Loader
// Purpose: load governed TrustMap assets and prefer optimized paths only when slots mark them available.

const V60323_MANIFEST_PATH = 'data/trustmap/v60-3-23-asset-manifest.json';
const V60323_FALLBACK_PATHS = [
  'assets/CyberShield%20Trust%20Kernel.png',
  'assets/cloud_infrastructure.png',
  'assets/identities_access.png',
  'assets/applications_data.png',
  'assets/AI_systems_and_Agents.png',
  'assets/devices_endpoints.png',
  'assets/CMMC_and_Compliance.png',
  'assets/Third%20Parties%20and%20Vendors.png',
  'assets/The%20Trust%20Map.png'
];

let v60323ManifestPromise = null;

function v60323$(selector, root = document){ return root.querySelector(selector); }
function v60323Encode(path){ return String(path || '').replaceAll(' ', '%20'); }
function v60323CanUseWebP(){
  const canvas = document.createElement('canvas');
  if(!canvas.toDataURL) return false;
  try { return canvas.toDataURL('image/webp').startsWith('data:image/webp'); } catch { return false; }
}
function v60323CanUseAvif(){
  const canvas = document.createElement('canvas');
  if(!canvas.toDataURL) return false;
  try { return canvas.toDataURL('image/avif').startsWith('data:image/avif'); } catch { return false; }
}
function v60323OptimizedReady(slot){
  const status = String(slot?.status || '');
  return Boolean(slot?.optimized_available || slot?.future_assets_available || status.includes('optimized_available') || status.includes('webp_available') || status.includes('future_assets_available'));
}

async function v60323LoadManifest(){
  if(v60323ManifestPromise) return v60323ManifestPromise;
  v60323ManifestPromise = fetch(V60323_MANIFEST_PATH, { cache:'no-store' })
    .then(response => {
      if(!response.ok) throw new Error(`TrustMap asset manifest fetch failed: ${response.status}`);
      return response.json();
    })
    .then(manifest => {
      window.CyberShieldTrustMapAssetManifestV60323 = manifest;
      document.dispatchEvent(new CustomEvent('cybershield:trustmap-asset-manifest-loaded', { detail:{ manifest } }));
      return manifest;
    })
    .catch(error => {
      console.warn('CyberShield asset manifest unavailable; using fallback asset list.', error);
      window.CyberShieldTrustMapAssetManifestV60323 = null;
      return null;
    });
  return v60323ManifestPromise;
}

function v60323SlotPath(slot){
  if(!slot) return null;
  const optimizedReady = v60323OptimizedReady(slot);
  if(optimizedReady && v60323CanUseAvif() && slot.future_avif) return v60323Encode(slot.future_avif);
  if(optimizedReady && v60323CanUseWebP() && slot.future_webp) return v60323Encode(slot.future_webp);
  if(optimizedReady && slot.future_png) return v60323Encode(slot.future_png);
  if(slot.current_encoded_png) return slot.current_encoded_png;
  if(slot.current_png) return v60323Encode(slot.current_png);
  return null;
}

function v60323PathsFromManifest(manifest){
  const slots = Array.isArray(manifest?.slots) ? manifest.slots : [];
  if(!slots.length) return V60323_FALLBACK_PATHS;
  return slots
    .slice()
    .sort((a,b) => Number(a.prewarm_priority || 999) - Number(b.prewarm_priority || 999))
    .map(slot => v60323SlotPath(slot))
    .filter(Boolean);
}

async function v60323GetPrewarmPaths(){
  const manifest = await v60323LoadManifest();
  return v60323PathsFromManifest(manifest);
}

function v60323FindSlotById(id){
  const manifest = window.CyberShieldTrustMapAssetManifestV60323;
  return (manifest?.slots || []).find(slot => slot.id === id) || null;
}

function v60323MarkMeta(){
  const payload = v60323$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    const manifest = window.CyberShieldTrustMapAssetManifestV60323;
    parsed.trustmap_asset_manifest = {
      build:'V60.3.25 TrustMap Asset Manifest Format Upgrade Path',
      status: manifest ? 'manifest_loaded' : 'fallback_static_asset_list',
      manifest_path: V60323_MANIFEST_PATH,
      slot_count: Array.isArray(manifest?.slots) ? manifest.slots.length : 0,
      rule:'Current PNG is fallback. Optimized future paths are preferred only when the manifest slot marks them available.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

window.CyberShieldTrustMapAssetManifestV60323Api = {
  loadManifest: v60323LoadManifest,
  getPrewarmPaths: v60323GetPrewarmPaths,
  findSlotById: v60323FindSlotById,
  fallbackPaths: V60323_FALLBACK_PATHS.slice(),
  slotPath: v60323SlotPath,
  optimizedReady: v60323OptimizedReady
};

v60323LoadManifest().then(v60323MarkMeta);
document.addEventListener('cybershield:trustmap-asset-manifest-loaded', () => setTimeout(v60323MarkMeta, 200));
setTimeout(v60323MarkMeta, 1600);
