// 20260602-1745 Layer 1 v2 Rendering and TrustMap Layout Stabilization
// Purpose: force the uploaded v2 Layer 1 assets into one consistent black-backed square treatment, prevent click-time disappearance, and reduce TrustMap panel overlap.
// Boundary: static advisory prototype only. No live scoring, live retrieval, workflow automation, enforcement, or backend persistence.

const V60323_LAYER1_V2 = {
  ai: ['assets/AI_Systems_Agents_v2.png','assets/layer1-v2/AI_Systems_Agents_v2.png','assets/AI_systems_and_Agents.png','assets/AI%20Systems%20%26%20Agents.png'],
  appsData: ['assets/Applications_Data_v2.png','assets/layer1-v2/Applications_Data_v2.png','assets/applications_data.png','assets/Applications%20%26%20Data.png'],
  cloud: ['assets/Cloud_infrastructure_v2.png','assets/layer1-v2/Cloud_Infrastructure_v2.png','assets/cloud_infrastructure.png','assets/Cloud%20%26%20Infrastructure.png'],
  cmmc: ['assets/Cmmc_and_Compliance%20v2.png','assets/layer1-v2/CMMC_and_Compliance_v2.png','assets/CMMC_and_Compliance.png','assets/CMMC%20%26%20Compliance.png'],
  endpoints: ['assets/Devices_end_Points%20v2.png','assets/layer1-v2/Devices_End_Points_v2.png','assets/devices_endpoints.png','assets/Devices%20%26%20Endpoints.png'],
  identity: ['assets/Identities_access_v2.png','assets/layer1-v2/Identities_Access_v2.png','assets/identities_access.png','assets/Identities%20%26%20Access.png'],
  third: ['assets/Third_Parties_and_Vendors%20v2.png','assets/layer1-v2/Third_Parties_and_Vendors_v2.png','assets/Third%20Parties%20and%20Vendors.png','assets/Third%20Parties%20%26%20Vendors.png']
};

function v60323$(selector, root = document){ return root.querySelector(selector); }
function v60323$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v60323NormalizePath(path){ return String(path || '').replaceAll(' ', '%20'); }

function v60323AttachFallback(img, paths){
  if(!img || !Array.isArray(paths) || !paths.length) return;
  const normalized = paths.map(v60323NormalizePath);
  img.dataset.v60323Candidates = JSON.stringify(normalized);
  if(img.dataset.v60323Ready !== 'true'){
    img.dataset.v60323Ready = 'true';
    img.dataset.v60323Index = '0';
    img.addEventListener('error', () => {
      const candidates = JSON.parse(img.dataset.v60323Candidates || '[]');
      const next = Number(img.dataset.v60323Index || '0') + 1;
      if(next >= candidates.length) return;
      img.dataset.v60323Index = String(next);
      img.src = candidates[next];
    });
  }
  const current = img.getAttribute('src') || '';
  if(!normalized.some(path => current.includes(path))){
    img.dataset.v60323Index = '0';
    img.src = normalized[0];
  }
  img.decoding = 'async';
  img.fetchPriority = 'high';
  img.loading = 'eager';
  img.dataset.v60323V2 = 'true';
}

function v60323ApplyV2Assets(){
  const trustmap = v60323$('#trustmap.active');
  if(!trustmap) return;
  v60323$$('.v554-domain', trustmap).forEach(domain => {
    const domainId = domain.dataset.v554Domain;
    const paths = V60323_LAYER1_V2[domainId];
    if(!paths) return;
    const orb = v60323$('.orb', domain);
    if(!orb) return;
    let frame = v60323$('.v60323-v2-frame', orb);
    let img = v60323$('.v60312-layer1-img', orb);
    if(!frame){
      frame = document.createElement('span');
      frame.className = 'v60323-v2-frame';
      orb.appendChild(frame);
    }
    if(!img){
      img = document.createElement('img');
      img.className = 'v60312-layer1-img';
      img.alt = domain.querySelector('.v554-domain-label')?.textContent?.trim() || domainId;
    }
    if(img.parentElement !== frame){
      frame.innerHTML = '';
      frame.appendChild(img);
    }
    v60323AttachFallback(img, paths);
    domain.dataset.v60323AssetSet = 'layer1-v2';
    domain.dataset.v60323Domain = domainId;
  });
}

function v60323InstallStyles(){
  if(v60323$('#v60-3-23-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-23-style';
  style.textContent = `
    #trustmap.active .v554-shell{
      display:grid!important;
      grid-template-columns:minmax(260px,300px) minmax(0,1fr) minmax(280px,340px)!important;
      gap:16px!important;
      width:100%!important;
      max-width:100%!important;
      overflow:hidden!important;
      align-items:stretch!important;
    }
    #trustmap.active .v554-map-panel{min-width:0!important;max-width:100%!important;overflow:hidden!important;position:relative!important}
    #trustmap.active .v554-viewport{min-width:0!important;max-width:100%!important;overflow:hidden!important}
    #trustmap.active .v554-shell > .v554-panel:last-child{
      position:relative!important;
      z-index:4!important;
      min-width:0!important;
      max-width:340px!important;
      overflow:auto!important;
      align-self:stretch!important;
      margin:0!important;
    }
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"]{
      width:184px!important;
      min-height:222px!important;
      overflow:visible!important;
    }
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"] .orb{
      width:184px!important;
      height:184px!important;
      min-height:184px!important;
      margin:0 auto 9px!important;
      display:grid!important;
      place-items:center!important;
      background:transparent!important;
      border:0!important;
      box-shadow:none!important;
      overflow:visible!important;
      border-radius:22px!important;
    }
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"] .orb:before{
      display:none!important;
      opacity:0!important;
    }
    #trustmap.active .v60323-v2-frame{
      width:176px!important;
      height:176px!important;
      display:block!important;
      position:relative!important;
      overflow:hidden!important;
      border-radius:20px!important;
      background:#000!important;
      box-shadow:0 0 0 1px rgba(223,249,255,.10), 0 0 18px rgba(66,215,255,.10)!important;
      z-index:2!important;
    }
    #trustmap.active .v60323-v2-frame:before{
      content:''!important;
      position:absolute!important;
      inset:0!important;
      background:#000!important;
      z-index:0!important;
      pointer-events:none!important;
    }
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"] .orb > img.v60312-layer1-img,
    #trustmap.active .v60323-v2-frame > img.v60312-layer1-img{
      position:absolute!important;
      inset:0!important;
      z-index:1!important;
      width:176px!important;
      height:176px!important;
      max-width:176px!important;
      max-height:176px!important;
      min-width:176px!important;
      min-height:176px!important;
      transform:none!important;
      object-fit:cover!important;
      object-position:center center!important;
      border-radius:0!important;
      background:#000!important;
      filter:none!important;
      opacity:1!important;
      mix-blend-mode:normal!important;
      pointer-events:none!important;
    }
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"]:hover .v60323-v2-frame,
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"]:focus-visible .v60323-v2-frame,
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"].v60312-selected .v60323-v2-frame{
      transform:scale(1.018)!important;
      box-shadow:0 0 0 2px var(--v60313-stoplight,#42d7ff), 0 0 24px color-mix(in srgb,var(--v60313-stoplight,#42d7ff) 45%,transparent)!important;
    }
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"] .v554-domain-label{
      margin-top:0!important;
      position:relative!important;
      z-index:3!important;
      max-width:174px!important;
      background:rgba(0,0,0,.76)!important;
    }
    @media(max-width:980px){
      #trustmap.active .v554-shell{grid-template-columns:1fr!important;overflow:visible!important}
      #trustmap.active .v554-shell > .v554-panel:last-child{max-width:100%!important;order:3!important}
      #trustmap.active .v554-map-panel{order:2!important;min-height:620px!important}
    }
  `;
  document.head.appendChild(style);
}

function v60323MarkMeta(){
  const payload = v60323$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.layer1_v2_asset_integration = {
      build:'20260602-1745 Layer 1 v2 Rendering and TrustMap Layout Stabilization',
      status:'active_forced_square_black_backed_v2_assets',
      preferred_paths:'uploaded root v2 assets first, canonical layer1-v2 paths second, legacy assets third',
      rule:'All Layer 1 v2 assets render inside the same black-backed square frame to prevent circular/transparent mismatch and label overlap.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

function v60323Apply(){
  if(!v60323$('#trustmap.active')) return;
  v60323InstallStyles();
  v60323ApplyV2Assets();
  v60323MarkMeta();
}

function v60323Schedule(delay = 80){
  window.clearTimeout(window.__v60323Timer);
  window.__v60323Timer = window.setTimeout(v60323Apply, delay);
}

function v60323Handlers(){
  if(window.__v60323Handlers) return;
  window.__v60323Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('#trustmap,#mainNav button[data-view="trustmap"],[data-v6033-route="trustmap"],[data-v554-mode],[data-v554-domain],[data-v554-reset],[data-v554-zoom]')){
      v60323Schedule(40);
      v60323Schedule(240);
    }
  }, true);
  document.addEventListener('mouseup', event => { if(event.target.closest('#trustmap')) v60323Schedule(80); }, true);
  document.addEventListener('cybershield:trustmap-stack-loaded', () => v60323Schedule(180));
}

v60323Handlers();
setTimeout(v60323Apply, 700);
window.addEventListener('load', () => setTimeout(v60323Apply, 1100), { once:true });
setTimeout(v60323Apply, 1800);
