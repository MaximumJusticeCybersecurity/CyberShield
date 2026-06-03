// V60.3.22/V60.3.24 TrustMap Image Prewarm
// Purpose: warm TrustMap images after shell usability and emit lifecycle events.

const V60322_FALLBACK_TRUSTMAP_IMAGE_PATHS = [
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

let v60322Started = false;
let v60322Complete = false;
let v60322ManifestUsed = false;
let v60322LastPathCount = V60322_FALLBACK_TRUSTMAP_IMAGE_PATHS.length;

function v60322$(selector, root = document){ return root.querySelector(selector); }

function v60322Idle(callback){
  if('requestIdleCallback' in window) return window.requestIdleCallback(callback, { timeout: 1800 });
  return window.setTimeout(callback, 850);
}

function v60322AddPreconnect(){
  const head = document.head;
  if(!head || v60322$('#v60-3-22-preconnect')) return;
  const preloadMarker = document.createElement('meta');
  preloadMarker.id = 'v60-3-22-preconnect';
  preloadMarker.name = 'cybershield-trustmap-image-prewarm';
  preloadMarker.content = 'active';
  head.appendChild(preloadMarker);
}

async function v60322GetPaths(){
  const api = window.CyberShieldTrustMapAssetManifestV60323Api;
  if(api?.getPrewarmPaths){
    try{
      const paths = await api.getPrewarmPaths();
      if(Array.isArray(paths) && paths.length){
        v60322ManifestUsed = Boolean(window.CyberShieldTrustMapAssetManifestV60323);
        v60322LastPathCount = paths.length;
        return paths;
      }
    }catch(error){
      console.warn('CyberShield TrustMap manifest prewarm path lookup failed; using fallback paths.', error);
    }
  }
  v60322ManifestUsed = false;
  v60322LastPathCount = V60322_FALLBACK_TRUSTMAP_IMAGE_PATHS.length;
  return V60322_FALLBACK_TRUSTMAP_IMAGE_PATHS;
}

function v60322WarmOne(src, priority = 'low'){
  return new Promise(resolve => {
    const img = new Image();
    img.decoding = 'async';
    img.fetchPriority = priority;
    img.onload = () => resolve({ src, status:'loaded' });
    img.onerror = () => resolve({ src, status:'error' });
    img.src = src;
    if(img.decode){
      img.decode().then(() => resolve({ src, status:'decoded' })).catch(() => {});
    }
  });
}

async function v60322WarmSequential(paths, priority){
  for(const path of paths){
    await v60322WarmOne(path, priority);
  }
}

async function v60322StartPrewarm(reason = 'idle'){
  if(v60322Started) return;
  v60322Started = true;
  v60322AddPreconnect();
  const paths = await v60322GetPaths();
  document.dispatchEvent(new CustomEvent('cybershield:trustmap-images-prewarm-started', { detail:{ reason, manifest_used:v60322ManifestUsed, image_count:paths.length } }));
  const [kernel, ...rest] = paths;
  v60322WarmOne(kernel, reason === 'trustmap-request' ? 'high' : 'auto')
    .then(() => v60322WarmSequential(rest, reason === 'trustmap-request' ? 'high' : 'low'))
    .finally(() => {
      v60322Complete = true;
      document.dispatchEvent(new CustomEvent('cybershield:trustmap-images-prewarmed', { detail:{ reason, manifest_used:v60322ManifestUsed, image_count:v60322LastPathCount } }));
    });
}

function v60322PrioritizeVisibleTrustMapImages(){
  document.querySelectorAll('#trustmap img.v60312-core-img,#trustmap img.v60312-layer1-img,#briefing img.v60317-snapshot-img').forEach(img => {
    img.decoding = 'async';
    img.fetchPriority = 'high';
    img.loading = 'eager';
  });
}

function v60322MarkMeta(){
  const payload = v60322$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.trustmap_image_prewarm = {
      build:'V60.3.24 TrustMap Image Prewarm Lifecycle Integration',
      status:v60322Complete ? 'prewarm_complete_or_attempted' : v60322Started ? 'prewarm_started' : 'prewarm_waiting',
      manifest_used:v60322ManifestUsed,
      image_count:v60322LastPathCount,
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

function v60322Handlers(){
  if(window.__v60322Handlers) return;
  window.__v60322Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('#mainNav button[data-view="trustmap"], [data-v6033-route="trustmap"]')){
      v60322StartPrewarm('trustmap-request');
      setTimeout(v60322PrioritizeVisibleTrustMapImages, 320);
      setTimeout(v60322MarkMeta, 600);
    }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment')) setTimeout(v60322MarkMeta, 500);
  }, true);
  document.addEventListener('cybershield:trustmap-stack-loaded', () => {
    v60322PrioritizeVisibleTrustMapImages();
    setTimeout(v60322MarkMeta, 500);
  });
  document.addEventListener('cybershield:trustmap-asset-manifest-loaded', () => setTimeout(v60322MarkMeta, 250));
}

v60322Handlers();
v60322Idle(() => v60322StartPrewarm('idle-after-shell'));
setTimeout(v60322MarkMeta, 1400);
