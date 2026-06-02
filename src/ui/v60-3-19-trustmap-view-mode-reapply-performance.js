// V60.3.19 TrustMap View-Mode Reapply and Performance Stabilization
// Purpose: after Fit Map / Kernel View / Domain View / Object View, re-assert final visual rules, keep PNG assets visible, and reduce repeated heavy reapply work.
// Boundary: static advisory prototype only. No live scoring, evidence retrieval, workflow automation, or enforcement.

const V60319_ASSET_BASES = ['assets/','assets/trustmap/v60-3-12/'];
const V60319_CORE_CANDIDATES = ['CyberShield Trust Kernel.png','cybershield-trust-kernel.png','CyberShield_Trust_Kernel.png','cybershield_trust_kernel.png'];
const V60319_DOMAIN_FILES = {
  cloud:['cloud_infrastructure.png','cloud-infrastructure.png','Cloud & Infrastructure.png'],
  identity:['identities_access.png','identities-access.png','Identities & Access.png'],
  appsData:['applications_data.png','applications-data.png','Applications & Data.png'],
  ai:['AI_systems_and_Agents.png','ai-systems-agents.png','AI Systems & Agents.png'],
  third:['Third Parties and Vendors.png','third-parties-vendors.png','Third Parties & Vendors.png'],
  endpoints:['devices_endpoints.png','devices-endpoints.png','Devices & Endpoints.png'],
  cmmc:['CMMC_and_Compliance.png','cmmc-compliance.png','CMMC & Compliance.png']
};
let v60319Timer = null;
let v60319Observer = null;

function v60319$(selector, root=document){ return root.querySelector(selector); }
function v60319$$(selector, root=document){ return Array.from(root.querySelectorAll(selector)); }
function v60319PathCandidates(files){
  const out = [];
  V60319_ASSET_BASES.forEach(base => files.forEach(file => out.push(base + encodeURIComponent(file).replaceAll('%2F','/'))));
  return out;
}
function v60319AttachFallback(img, files){
  if(!img || img.dataset.v60319FallbackReady === 'true') return;
  const paths = v60319PathCandidates(files || []);
  if(!paths.length) return;
  img.dataset.v60319FallbackReady = 'true';
  img.dataset.v60319CandidateIndex = '0';
  img.addEventListener('error', () => {
    const current = Number(img.dataset.v60319CandidateIndex || '0');
    const next = current + 1;
    if(next >= paths.length) return;
    img.dataset.v60319CandidateIndex = String(next);
    img.src = paths[next];
  });
  const src = img.getAttribute('src') || '';
  if(!paths.some(path => src.includes(path))) img.src = paths[0];
}
function v60319InstallStyles(){
  if(v60319$('#v60-3-19-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-19-style';
  style.textContent = `
    #trustmap.active .v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="third"] .v60312-layer1-img{
      width:166px!important;
      height:166px!important;
      max-width:166px!important;
      max-height:166px!important;
      object-fit:contain!important;
      object-position:center center!important;
      transform:translateY(-13px)!important;
      filter:none!important;
      border-radius:999px!important;
      mix-blend-mode:screen!important;
      background:transparent!important;
      display:block!important;
      pointer-events:none!important;
    }
    #trustmap.active .v554-domain:hover .v60312-layer1-img,
    #trustmap.active .v554-domain:focus-visible .v60312-layer1-img,
    #trustmap.active .v554-domain.v60312-selected .v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="third"]:hover .v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="third"]:focus-visible .v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="third"].v60312-selected .v60312-layer1-img{
      transform:translateY(-13px) scale(1.025)!important;
      filter:none!important;
    }
    #trustmap.active .v554-domain .orb:before{
      background:radial-gradient(ellipse at 50% 55%,rgba(2,5,11,.64),rgba(2,5,11,.22) 58%,transparent 76%)!important;
      border:1px solid rgba(223,249,255,.10)!important;
      box-shadow:0 0 10px rgba(2,5,11,.62)!important;
      opacity:.46!important;
    }
    #trustmap.active .v554-domain .orb:after{opacity:0!important;border-color:transparent!important;box-shadow:none!important;background:transparent!important}
    #trustmap.active .v554-domain:hover .orb:after,
    #trustmap.active .v554-domain:focus-visible .orb:after,
    #trustmap.active .v554-domain.v60312-selected .orb:after{
      opacity:1!important;
      border-color:var(--v60313-stoplight,#ffd43b)!important;
      box-shadow:0 0 18px var(--v60313-stoplight,#ffd43b),0 0 44px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 60%,transparent),inset 0 0 22px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 24%,transparent)!important;
    }
    #trustmap.active .v554-domain-label{border-color:rgba(223,249,255,.11)!important;box-shadow:0 0 14px rgba(0,0,0,.68)!important;text-shadow:0 0 12px #000!important}
    #trustmap.active .v554-domain:hover .v554-domain-label,
    #trustmap.active .v554-domain:focus-visible .v554-domain-label,
    #trustmap.active .v554-domain.v60312-selected .v554-domain-label{border-color:color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 48%,transparent)!important;box-shadow:0 0 16px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 32%,transparent)!important}
    #trustmap.active .v554-kernel{display:grid!important;place-items:center!important;overflow:visible!important;background:transparent!important;border:0!important;box-shadow:none!important;clip-path:none!important}
    #trustmap.active .v554-kernel .v554-shield-mask,
    #trustmap.active .v554-kernel:before,
    #trustmap.active .v554-kernel:after{display:none!important}
    #trustmap.active .v60312-core-img{width:282px!important;height:282px!important;object-fit:contain!important;display:block!important;filter:none!important;mix-blend-mode:screen!important;pointer-events:none!important;background:transparent!important}
  `;
  document.head.appendChild(style);
}
function v60319EnsureAssets(){
  const trustmap = v60319$('#trustmap.active');
  if(!trustmap) return;
  const kernel = v60319$('.v554-kernel', trustmap);
  if(kernel && !v60319$('.v60312-core-img', kernel)){
    kernel.innerHTML = '<img class="v60312-core-img" alt="CyberShield Trust Kernel">';
  }
  v60319AttachFallback(v60319$('.v60312-core-img', kernel || trustmap), V60319_CORE_CANDIDATES);
  v60319$$('.v554-domain', trustmap).forEach(domain => {
    const id = domain.dataset.v554Domain;
    const files = V60319_DOMAIN_FILES[id];
    if(!files) return;
    const orb = v60319$('.orb', domain);
    if(!orb) return;
    v60319$$('.v554-icon, svg', orb).forEach(el => el.style.display='none');
    let img = v60319$('.v60312-layer1-img', orb);
    if(!img){
      img = document.createElement('img');
      img.className = 'v60312-layer1-img';
      img.alt = domain.querySelector('.v554-domain-label')?.textContent?.trim() || id;
      orb.appendChild(img);
    }
    v60319AttachFallback(img, files);
  });
}
function v60319ClearInlineOldGlow(){
  const trustmap = v60319$('#trustmap.active');
  if(!trustmap) return;
  v60319$$('.v60312-layer1-img', trustmap).forEach(img => {
    img.style.filter = 'none';
    img.style.width = '166px';
    img.style.height = '166px';
    img.style.maxWidth = '166px';
    img.style.maxHeight = '166px';
    img.style.objectFit = 'contain';
    img.style.transform = 'translateY(-13px)';
  });
  const core = v60319$('.v60312-core-img', trustmap);
  if(core){
    core.style.filter = 'none';
    core.style.display = 'block';
    core.style.width = '282px';
    core.style.height = '282px';
    core.style.objectFit = 'contain';
  }
}
function v60319MarkMeta(){
  const payload = v60319$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.19 TrustMap View-Mode Reapply and Performance Stabilization';
    parsed.version = 'V60.3.19';
    parsed.previous_operational_build = 'V60.3.18 Layer 1 Neutral State and Uniform Hologram Cube Sizing';
    parsed.trustmap_view_mode_reapply_performance = {
      status:'active_recovery_layer',
      rule:'After Fit Map, Kernel View, Domain View, or Object View, reapply final neutral Layer 1 state, keep CyberShield Trust Kernel image visible, and throttle visual recovery work.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed,null,2);
  }catch{}
}
function v60319Apply(){
  if(!v60319$('#trustmap.active')) return;
  v60319InstallStyles();
  v60319EnsureAssets();
  v60319ClearInlineOldGlow();
  v60319MarkMeta();
}
function v60319Schedule(delay=90){
  if(v60319Timer) window.clearTimeout(v60319Timer);
  v60319Timer = window.setTimeout(v60319Apply, delay);
}
function v60319StartObserver(){
  const world = v60319$('#trustmap.active #v554World');
  if(!world || v60319Observer) return;
  v60319Observer = new MutationObserver(() => v60319Schedule(120));
  v60319Observer.observe(world, { childList:true, subtree:true });
}
function v60319Handlers(){
  if(window.__v60319Handlers) return;
  window.__v60319Handlers = true;
  document.addEventListener('click', event => {
    const text = (event.target?.textContent || '').trim().toLowerCase();
    const isView = ['fit map','kernel view','domain view','object view','+','−','-'].some(label => text === label || text.includes(label));
    if(isView || event.target.closest('#trustmap')) v60319Schedule(80);
    window.setTimeout(v60319Schedule, 240);
    window.setTimeout(v60319Schedule, 520);
  }, true);
  document.addEventListener('input', event => { if(event.target.closest('#trustmap')) v60319Schedule(120); }, true);
}
v60319Handlers();
setTimeout(() => { v60319Apply(); v60319StartObserver(); }, 2800);
window.addEventListener('load', () => setTimeout(() => { v60319Apply(); v60319StartObserver(); }, 3400), {once:true});
setTimeout(() => { v60319Apply(); v60319StartObserver(); }, 4500);
