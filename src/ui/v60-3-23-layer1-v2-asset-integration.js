// 20260602-1730 Layer 1 v2 Asset Integration
// Purpose: prefer the uploaded same-size black-background blue/white Layer 1 cube assets, while preserving safe fallbacks.
// Boundary: static advisory prototype only. No live scoring, live retrieval, workflow automation, enforcement, or backend persistence.

const V60323_LAYER1_V2 = {
  ai: [
    'assets/AI_Systems_Agents_v2.png',
    'assets/layer1-v2/AI_Systems_Agents_v2.png',
    'assets/AI_systems_and_Agents.png',
    'assets/AI%20Systems%20%26%20Agents.png'
  ],
  appsData: [
    'assets/Applications_Data_v2.png',
    'assets/layer1-v2/Applications_Data_v2.png',
    'assets/applications_data.png',
    'assets/Applications%20%26%20Data.png'
  ],
  cloud: [
    'assets/Cloud_infrastructure_v2.png',
    'assets/layer1-v2/Cloud_Infrastructure_v2.png',
    'assets/cloud_infrastructure.png',
    'assets/Cloud%20%26%20Infrastructure.png'
  ],
  cmmc: [
    'assets/Cmmc_and_Compliance%20v2.png',
    'assets/layer1-v2/CMMC_and_Compliance_v2.png',
    'assets/CMMC_and_Compliance.png',
    'assets/CMMC%20%26%20Compliance.png'
  ],
  endpoints: [
    'assets/Devices_end_Points%20v2.png',
    'assets/layer1-v2/Devices_End_Points_v2.png',
    'assets/devices_endpoints.png',
    'assets/Devices%20%26%20Endpoints.png'
  ],
  identity: [
    'assets/Identities_access_v2.png',
    'assets/layer1-v2/Identities_Access_v2.png',
    'assets/identities_access.png',
    'assets/Identities%20%26%20Access.png'
  ],
  third: [
    'assets/Third_Parties_and_Vendors%20v2.png',
    'assets/layer1-v2/Third_Parties_and_Vendors_v2.png',
    'assets/Third%20Parties%20and%20Vendors.png',
    'assets/Third%20Parties%20%26%20Vendors.png'
  ]
};

function v60323$(selector, root = document){ return root.querySelector(selector); }
function v60323$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }

function v60323AttachFallback(img, paths){
  if(!img || !Array.isArray(paths) || !paths.length) return;
  img.dataset.v60323Candidates = JSON.stringify(paths);
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
  if(!paths.some(path => current.includes(path))){
    img.dataset.v60323Index = '0';
    img.src = paths[0];
  }
  img.decoding = 'async';
  img.fetchPriority = 'high';
  img.loading = 'eager';
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
    let img = v60323$('.v60312-layer1-img', orb);
    if(!img){
      img = document.createElement('img');
      img.className = 'v60312-layer1-img';
      img.alt = domain.querySelector('.v554-domain-label')?.textContent?.trim() || domainId;
      orb.appendChild(img);
    }
    v60323AttachFallback(img, paths);
    domain.dataset.v60323AssetSet = 'layer1-v2';
  });
}

function v60323InstallStyles(){
  if(v60323$('#v60-3-23-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-23-style';
  style.textContent = `
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"] .orb{
      background:transparent!important;
      box-shadow:none!important;
    }
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"] .orb:before{
      opacity:.28!important;
    }
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"] .orb > img.v60312-layer1-img{
      width:176px!important;
      height:176px!important;
      max-width:176px!important;
      max-height:176px!important;
      min-width:176px!important;
      min-height:176px!important;
      transform:translateY(-16px)!important;
      object-fit:contain!important;
      border-radius:18px!important;
      background:#000!important;
      filter:none!important;
      opacity:1!important;
    }
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"]:hover .orb > img.v60312-layer1-img,
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"]:focus-visible .orb > img.v60312-layer1-img,
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"].v60312-selected .orb > img.v60312-layer1-img{
      transform:translateY(-16px) scale(1.018)!important;
      filter:none!important;
    }
    #trustmap.active .v554-domain[data-v60323-asset-set="layer1-v2"] .v554-domain-label{
      margin-top:2px!important;
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
      build:'20260602-1730 Layer 1 v2 Asset Integration',
      status:'active_using_uploaded_root_assets_with_fallbacks',
      preferred_paths:'assets/*_v2.png root uploads first, assets/layer1-v2 canonical paths second, legacy assets third',
      rule:'Prefer same-size black-background blue/white v2 Layer 1 cube assets, with legacy assets as fallback.',
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

function v60323Handlers(){
  if(window.__v60323Handlers) return;
  window.__v60323Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('#trustmap,#mainNav button[data-view="trustmap"],[data-v6033-route="trustmap"]')) setTimeout(v60323Apply, 120);
  }, true);
  document.addEventListener('cybershield:trustmap-stack-loaded', () => setTimeout(v60323Apply, 460));
}

v60323Handlers();
setTimeout(v60323Apply, 900);
window.addEventListener('load', () => setTimeout(v60323Apply, 1400), { once:true });
setTimeout(v60323Apply, 2200);
