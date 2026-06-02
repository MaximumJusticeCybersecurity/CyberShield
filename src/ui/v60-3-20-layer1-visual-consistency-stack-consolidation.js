// V60.3.20 Layer 1 Visual Consistency and TrustMap Stack Consolidation
// Purpose: consolidate the V60.3.18 neutral-state rules and V60.3.19 view-mode recovery into one narrow layer.
// Boundary: static advisory prototype only. No live scoring, evidence retrieval, workflow automation, enforcement, or backend persistence.

const V60320_ASSET_BASES = ['assets/', 'assets/trustmap/v60-3-12/'];
const V60320_CORE_CANDIDATES = ['CyberShield Trust Kernel.png', 'cybershield-trust-kernel.png', 'CyberShield_Trust_Kernel.png', 'cybershield_trust_kernel.png'];
const V60320_DOMAIN_FILES = {
  cloud: ['cloud_infrastructure.png', 'cloud-infrastructure.png', 'Cloud & Infrastructure.png'],
  identity: ['identities_access.png', 'identities-access.png', 'Identities & Access.png'],
  appsData: ['applications_data.png', 'applications-data.png', 'Applications & Data.png'],
  ai: ['AI_systems_and_Agents.png', 'ai-systems-agents.png', 'AI Systems & Agents.png'],
  third: ['Third Parties and Vendors.png', 'third-parties-vendors.png', 'Third Parties & Vendors.png'],
  endpoints: ['devices_endpoints.png', 'devices-endpoints.png', 'Devices & Endpoints.png'],
  cmmc: ['CMMC_and_Compliance.png', 'cmmc-compliance.png', 'CMMC & Compliance.png']
};

let v60320Timer = null;
let v60320Observer = null;
let v60320LastRun = 0;

function v60320$(selector, root = document){ return root.querySelector(selector); }
function v60320$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v60320Encode(base, file){ return base + encodeURIComponent(file).replaceAll('%2F', '/'); }
function v60320PathCandidates(files){
  const out = [];
  V60320_ASSET_BASES.forEach(base => files.forEach(file => out.push(v60320Encode(base, file))));
  return out;
}

function v60320InstallStyles(){
  if(v60320$('#v60-3-20-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-20-style';
  style.textContent = `
    #trustmap.active .v554-shell{
      display:grid!important;
      grid-template-columns:minmax(300px,320px) minmax(760px,1fr) minmax(330px,370px)!important;
      gap:22px!important;
      align-items:stretch!important;
      overflow:visible!important;
    }

    #trustmap.active .v554-shell > .v554-panel,
    #trustmap.active .v554-map-panel{
      align-self:stretch!important;
      min-height:760px!important;
      max-height:760px!important;
      margin-top:0!important;
      margin-bottom:0!important;
      box-sizing:border-box!important;
    }

    #trustmap.active .v554-map-panel,
    #trustmap.active .v554-viewport{
      background:
        radial-gradient(circle at 50% 42%, rgba(223,249,255,.16), rgba(66,215,255,.055) 24%, transparent 48%),
        radial-gradient(circle at 50% 52%, rgba(3,7,15,.82), rgba(2,5,11,.98) 62%, #02050b 100%)!important;
    }

    #trustmap.active .v554-map-panel{overflow:hidden!important;z-index:5!important;box-shadow:inset 0 0 80px rgba(2,5,11,.95),0 0 34px rgba(66,215,255,.12)!important}
    #trustmap.active .v554-viewport{min-height:760px!important;overflow:hidden!important;touch-action:none!important}
    #trustmap.active #v554World{transition:transform .15s ease!important;transform-origin:center center!important}

    #trustmap.active .v554-domain{
      width:174px!important;
      min-height:194px!important;
      background:transparent!important;
      border:0!important;
      box-shadow:none!important;
      z-index:24!important;
      overflow:visible!important;
    }

    #trustmap.active .v554-domain .orb{
      position:relative!important;
      width:166px!important;
      height:142px!important;
      margin:0 auto 3px!important;
      display:grid!important;
      place-items:center!important;
      border:0!important;
      border-radius:999px!important;
      background:radial-gradient(ellipse at 50% 55%,rgba(2,5,11,.96) 0%,rgba(2,5,11,.78) 42%,rgba(2,5,11,.30) 64%,transparent 79%)!important;
      box-shadow:none!important;
      overflow:visible!important;
      isolation:isolate!important;
    }

    #trustmap.active .v554-domain .orb:before{
      content:''!important;
      display:block!important;
      position:absolute!important;
      inset:-6px -10px!important;
      border-radius:999px!important;
      background:radial-gradient(ellipse at 50% 55%,rgba(2,5,11,.64),rgba(2,5,11,.22) 58%,transparent 76%)!important;
      border:1px solid rgba(223,249,255,.10)!important;
      box-shadow:0 0 10px rgba(2,5,11,.62)!important;
      opacity:.46!important;
      pointer-events:none!important;
      z-index:0!important;
    }

    #trustmap.active .v554-domain .orb:after{
      content:''!important;
      position:absolute!important;
      inset:-12px -16px!important;
      border-radius:999px!important;
      border:2.25px solid transparent!important;
      opacity:0!important;
      background:transparent!important;
      box-shadow:none!important;
      transition:opacity .14s ease,border-color .14s ease,box-shadow .14s ease,transform .14s ease!important;
      pointer-events:none!important;
      z-index:4!important;
    }

    #trustmap.active .v554-domain:hover .orb:after,
    #trustmap.active .v554-domain:focus-visible .orb:after,
    #trustmap.active .v554-domain.v60312-selected .orb:after{
      opacity:1!important;
      transform:scale(1.02)!important;
      border-color:var(--v60313-stoplight,#ffd43b)!important;
      box-shadow:0 0 18px var(--v60313-stoplight,#ffd43b),0 0 44px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 60%,transparent),inset 0 0 22px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 24%,transparent)!important;
    }

    #trustmap.active .v554-domain .v554-icon,
    #trustmap.active .v554-domain .orb svg{display:none!important}

    #trustmap.active .v554-domain .orb > img.v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="third"] .orb > img.v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="cloud"] .orb > img.v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="endpoints"] .orb > img.v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="cmmc"] .orb > img.v60312-layer1-img{
      position:relative!important;
      z-index:2!important;
      display:block!important;
      width:166px!important;
      height:166px!important;
      max-width:166px!important;
      max-height:166px!important;
      min-width:166px!important;
      min-height:166px!important;
      object-fit:contain!important;
      object-position:center center!important;
      transform:translateY(-13px)!important;
      filter:none!important;
      opacity:1!important;
      border-radius:999px!important;
      mix-blend-mode:normal!important;
      background:transparent!important;
      pointer-events:none!important;
    }

    #trustmap.active .v554-domain:hover .orb > img.v60312-layer1-img,
    #trustmap.active .v554-domain:focus-visible .orb > img.v60312-layer1-img,
    #trustmap.active .v554-domain.v60312-selected .orb > img.v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="third"]:hover .orb > img.v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="third"]:focus-visible .orb > img.v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="third"].v60312-selected .orb > img.v60312-layer1-img{
      width:166px!important;
      height:166px!important;
      transform:translateY(-13px) scale(1.025)!important;
      filter:none!important;
      opacity:1!important;
    }

    #trustmap.active .v554-domain-label{
      display:block!important;
      max-width:160px!important;
      margin:0 auto!important;
      padding:3px 7px!important;
      border-radius:8px!important;
      background:rgba(2,5,11,.72)!important;
      border:1px solid rgba(223,249,255,.11)!important;
      box-shadow:0 0 14px rgba(0,0,0,.68)!important;
      color:#fff!important;
      font-weight:900!important;
      font-size:.82rem!important;
      line-height:1.08!important;
      text-align:center!important;
      text-shadow:0 0 12px #000!important;
    }

    #trustmap.active .v554-domain:hover .v554-domain-label,
    #trustmap.active .v554-domain:focus-visible .v554-domain-label,
    #trustmap.active .v554-domain.v60312-selected .v554-domain-label{
      border-color:color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 48%,transparent)!important;
      box-shadow:0 0 16px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 32%,transparent)!important;
    }

    #trustmap.active .v554-kernel{
      width:270px!important;
      height:270px!important;
      display:grid!important;
      place-items:center!important;
      overflow:visible!important;
      background:radial-gradient(ellipse at 50% 54%, rgba(2,5,11,.98), rgba(2,5,11,.65) 58%, transparent 74%)!important;
      border:0!important;
      border-radius:999px!important;
      box-shadow:none!important;
      clip-path:none!important;
      z-index:28!important;
    }

    #trustmap.active .v554-kernel .v554-shield-mask,
    #trustmap.active .v554-kernel:before,
    #trustmap.active .v554-kernel:after{display:none!important}

    #trustmap.active .v554-kernel img.v60312-core-img{
      width:282px!important;
      height:282px!important;
      max-width:282px!important;
      max-height:282px!important;
      object-fit:contain!important;
      display:block!important;
      filter:none!important;
      opacity:1!important;
      mix-blend-mode:normal!important;
      border-radius:999px!important;
      pointer-events:none!important;
      background:transparent!important;
    }

    #trustmap.active #v60312RightAuthority .v60312-mini,
    #trustmap.active #v60312RightAuthority .v60312-mini img,
    #trustmap.active #v60312RightAuthority img[alt="Third Parties & Vendors"]{
      width:92px!important;
      height:92px!important;
      max-width:92px!important;
      max-height:92px!important;
      object-fit:contain!important;
      object-position:center center!important;
      filter:none!important;
      opacity:1!important;
      mix-blend-mode:normal!important;
      border-radius:999px!important;
    }

    #trustmap.active .v554-edges{opacity:0!important;visibility:hidden!important}
    #trustmap.active .v60316-fiber-edges{z-index:3!important;mix-blend-mode:screen!important}
    #trustmap.active .v554-domain,#trustmap.active .v554-asset,#trustmap.active .v554-tag{z-index:18!important}
    #trustmap.active .v554-domain{z-index:24!important}
    #trustmap.active .v554-kernel{z-index:28!important}
  `;
  document.head.appendChild(style);
}

function v60320AttachFallback(img, files){
  if(!img) return;
  const paths = v60320PathCandidates(files || []);
  if(!paths.length) return;
  if(img.dataset.v60320FallbackReady !== 'true'){
    img.dataset.v60320FallbackReady = 'true';
    img.dataset.v60320CandidateIndex = '0';
    img.addEventListener('error', () => {
      const next = Number(img.dataset.v60320CandidateIndex || '0') + 1;
      if(next >= paths.length) return;
      img.dataset.v60320CandidateIndex = String(next);
      img.src = paths[next];
    });
  }
  const src = img.getAttribute('src') || '';
  if(!paths.some(path => src.includes(path))) img.src = paths[0];
}

function v60320EnsureAssets(){
  const trustmap = v60320$('#trustmap.active');
  if(!trustmap) return;
  const kernel = v60320$('.v554-kernel', trustmap);
  if(kernel && !v60320$('.v60312-core-img', kernel)){
    kernel.innerHTML = '<img class="v60312-core-img" alt="CyberShield Trust Kernel">';
    kernel.dataset.v60312Core = 'true';
  }
  v60320AttachFallback(v60320$('.v60312-core-img', kernel || trustmap), V60320_CORE_CANDIDATES);

  v60320$$('.v554-domain', trustmap).forEach(domain => {
    const id = domain.dataset.v554Domain;
    const files = V60320_DOMAIN_FILES[id];
    if(!files) return;
    const orb = v60320$('.orb', domain);
    if(!orb) return;
    v60320$$('.v554-icon, svg', orb).forEach(el => { el.style.display = 'none'; });
    let img = v60320$('.v60312-layer1-img', orb);
    if(!img){
      img = document.createElement('img');
      img.className = 'v60312-layer1-img';
      img.alt = domain.querySelector('.v554-domain-label')?.textContent?.trim() || id;
      orb.appendChild(img);
    }
    v60320AttachFallback(img, files);
  });
}

function v60320NormalizeInlineVisuals(){
  const trustmap = v60320$('#trustmap.active');
  if(!trustmap) return;
  v60320$$('.v60312-layer1-img', trustmap).forEach(img => {
    Object.assign(img.style, {
      width:'166px', height:'166px', maxWidth:'166px', maxHeight:'166px', minWidth:'166px', minHeight:'166px',
      objectFit:'contain', objectPosition:'center center', transform:'translateY(-13px)', filter:'none', opacity:'1', mixBlendMode:'normal', background:'transparent'
    });
  });
  const core = v60320$('.v60312-core-img', trustmap);
  if(core){
    Object.assign(core.style, { width:'282px', height:'282px', maxWidth:'282px', maxHeight:'282px', objectFit:'contain', display:'block', filter:'none', opacity:'1', mixBlendMode:'normal' });
  }
}

function v60320MarkMeta(){
  const payload = v60320$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.20 Layer 1 Visual Consistency and TrustMap Stack Consolidation';
    parsed.version = 'V60.3.20';
    parsed.previous_operational_build = 'V60.3.19 TrustMap View-Mode Reapply and Performance Stabilization';
    parsed.trustmap_stack_consolidation = {
      status:'active_consolidated_visual_recovery_layer',
      replaces_runtime_imports:['V60.3.18 neutral-state reapply','V60.3.19 view-mode reapply'],
      rule:'One debounced recovery layer owns Layer 1 neutral brightness, uniform cube size, Third Parties sizing, Trust Kernel visibility, and post-view-mode visual recovery.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

function v60320Apply(){
  if(!v60320$('#trustmap.active')) return;
  const now = performance.now();
  if(now - v60320LastRun < 80) return;
  v60320LastRun = now;
  v60320InstallStyles();
  v60320EnsureAssets();
  v60320NormalizeInlineVisuals();
  v60320MarkMeta();
}

function v60320Schedule(delay = 90){
  if(v60320Timer) window.clearTimeout(v60320Timer);
  v60320Timer = window.setTimeout(v60320Apply, delay);
}

function v60320StartObserver(){
  const world = v60320$('#trustmap.active #v554World');
  if(!world || v60320Observer) return;
  v60320Observer = new MutationObserver(() => v60320Schedule(120));
  v60320Observer.observe(world, { childList:true, subtree:true });
}

function v60320Handlers(){
  if(window.__v60320Handlers) return;
  window.__v60320Handlers = true;
  document.addEventListener('click', event => {
    const text = (event.target?.textContent || '').trim().toLowerCase();
    const viewControl = ['fit map', 'kernel view', 'domain view', 'object view', '+', '−', '-'].some(label => text === label || text.includes(label));
    if(viewControl || event.target.closest('#trustmap')) v60320Schedule(80);
  }, true);
  document.addEventListener('input', event => { if(event.target.closest('#trustmap')) v60320Schedule(120); }, true);
  document.addEventListener('wheel', event => { if(event.target.closest('#trustmap')) v60320Schedule(160); }, { capture:true, passive:true });
  document.addEventListener('mouseup', event => { if(event.target.closest('#trustmap') || v60320$('#trustmap.active')) v60320Schedule(120); }, true);
}

v60320Handlers();
setTimeout(() => { v60320Apply(); v60320StartObserver(); }, 2600);
window.addEventListener('load', () => setTimeout(() => { v60320Apply(); v60320StartObserver(); }, 3200), { once:true });
setTimeout(() => { v60320Apply(); v60320StartObserver(); }, 4100);
