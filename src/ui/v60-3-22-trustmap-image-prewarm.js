// V60.3.22 TrustMap Image Prewarm
// Purpose: keep the faster V60.3.21 app shell while warming TrustMap PNG assets after the shell is usable so images do not load late when TrustMap opens.
// Boundary: static advisory prototype only. No live scoring, live retrieval, workflow automation, enforcement, or backend persistence.

const V60322_TRUSTMAP_IMAGE_PATHS = [
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

function v60322StartPrewarm(reason = 'idle'){
  if(v60322Started) return;
  v60322Started = true;
  v60322AddPreconnect();
  const [kernel, ...rest] = V60322_TRUSTMAP_IMAGE_PATHS;
  v60322WarmOne(kernel, reason === 'trustmap-request' ? 'high' : 'auto')
    .then(() => v60322WarmSequential(rest, reason === 'trustmap-request' ? 'high' : 'low'))
    .finally(() => {
      v60322Complete = true;
      document.dispatchEvent(new CustomEvent('cybershield:trustmap-images-prewarmed', { detail:{ reason } }));
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
      build:'V60.3.22 TrustMap Image Prewarm',
      status:v60322Complete ? 'prewarm_complete_or_attempted' : v60322Started ? 'prewarm_started' : 'prewarm_waiting',
      rule:'Warm the TrustMap kernel, Layer 1 PNGs, and Briefing snapshot after the shell is usable, and raise priority when TrustMap is explicitly requested.',
      image_count:V60322_TRUSTMAP_IMAGE_PATHS.length,
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
}

v60322Handlers();
v60322Idle(() => v60322StartPrewarm('idle-after-shell'));
setTimeout(v60322MarkMeta, 1400);
