// 20260602-1735 Layer 1 v2 Source Rewrite Shim
// Purpose: prevent legacy Layer 1 assets from flashing before the v2 assets render by rewriting old image src assignments before fetch.
// Boundary: static advisory prototype only. No live scoring, live retrieval, workflow automation, enforcement, or backend persistence.

const LAYER1_V2_SRC_REWRITE_20260602_1735 = new Map([
  ['assets/trustmap/v60-3-12/ai-systems-agents.png', 'assets/AI_Systems_Agents_v2.png'],
  ['assets/trustmap/v60-3-12/applications-data.png', 'assets/Applications_Data_v2.png'],
  ['assets/trustmap/v60-3-12/cloud-infrastructure.png', 'assets/Cloud_infrastructure_v2.png'],
  ['assets/trustmap/v60-3-12/cmmc-compliance.png', 'assets/Cmmc_and_Compliance%20v2.png'],
  ['assets/trustmap/v60-3-12/devices-endpoints.png', 'assets/Devices_end_Points%20v2.png'],
  ['assets/trustmap/v60-3-12/identities-access.png', 'assets/Identities_access_v2.png'],
  ['assets/trustmap/v60-3-12/third-parties-vendors.png', 'assets/Third_Parties_and_Vendors%20v2.png'],
  ['assets/AI_systems_and_Agents.png', 'assets/AI_Systems_Agents_v2.png'],
  ['assets/applications_data.png', 'assets/Applications_Data_v2.png'],
  ['assets/cloud_infrastructure.png', 'assets/Cloud_infrastructure_v2.png'],
  ['assets/CMMC_and_Compliance.png', 'assets/Cmmc_and_Compliance%20v2.png'],
  ['assets/devices_endpoints.png', 'assets/Devices_end_Points%20v2.png'],
  ['assets/identities_access.png', 'assets/Identities_access_v2.png'],
  ['assets/Third%20Parties%20and%20Vendors.png', 'assets/Third_Parties_and_Vendors%20v2.png'],
  ['assets/Third Parties and Vendors.png', 'assets/Third_Parties_and_Vendors%20v2.png']
]);

function layer1V2NormalizeSrc202606021735(value){
  const raw = String(value || '');
  if(!raw) return raw;
  for(const [legacy, v2] of LAYER1_V2_SRC_REWRITE_20260602_1735.entries()){
    if(raw === legacy || raw.endsWith('/' + legacy) || raw.includes(legacy)) return v2;
  }
  return raw;
}

function layer1V2PatchImageSrc202606021735(){
  if(window.__layer1V2SrcRewrite202606021735) return;
  window.__layer1V2SrcRewrite202606021735 = true;

  const srcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  if(srcDescriptor?.set && srcDescriptor?.get){
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      configurable: true,
      enumerable: srcDescriptor.enumerable,
      get: srcDescriptor.get,
      set(value){
        return srcDescriptor.set.call(this, layer1V2NormalizeSrc202606021735(value));
      }
    });
  }

  const originalSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function(name, value){
    if(this instanceof HTMLImageElement && String(name).toLowerCase() === 'src'){
      return originalSetAttribute.call(this, name, layer1V2NormalizeSrc202606021735(value));
    }
    return originalSetAttribute.call(this, name, value);
  };
}

function layer1V2RewriteExistingImages202606021735(){
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    const next = layer1V2NormalizeSrc202606021735(src);
    if(src && next !== src){
      img.setAttribute('src', next);
      img.dataset.layer1V2Rewritten = 'true';
    }
  });
}

function layer1V2MarkMeta202606021735(){
  const payload = document.querySelector('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.layer1_v2_src_rewrite = {
      build: '20260602-1735 Layer 1 v2 Source Rewrite Shim',
      status: 'active_legacy_src_rewrite_before_fetch',
      rule: 'Legacy Layer 1 PNG src assignments are rewritten to uploaded v2 root assets to prevent old-version pop-in.',
      github_pages_browser_qa_required: true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

layer1V2PatchImageSrc202606021735();
window.CyberShieldLayer1V2SrcRewrite202606021735 = {
  normalize: layer1V2NormalizeSrc202606021735,
  rewriteExisting: layer1V2RewriteExistingImages202606021735
};
setTimeout(layer1V2RewriteExistingImages202606021735, 250);
setTimeout(layer1V2MarkMeta202606021735, 900);
document.addEventListener('cybershield:trustmap-stack-loaded', () => {
  setTimeout(layer1V2RewriteExistingImages202606021735, 80);
  setTimeout(layer1V2MarkMeta202606021735, 350);
});
