// 20260602-1840 TrustMap Single Render Authority Hardening
// Purpose: suppress legacy TrustMap render flashes without trapping the map hidden after navigation or normal object clicks.
// Boundary: static advisory prototype only. No live scoring, live retrieval, workflow automation, enforcement, or backend persistence.

let trustMapAuthorityOpen202606021825 = false;
let trustMapAuthorityRevealTimer202606021825 = null;
let trustMapAuthorityObserver202606021825 = null;
let trustMapAuthorityRenderCount202606021825 = 0;
let trustMapAuthoritySettleStarted202606021825 = 0;
let trustMapAuthorityForceRevealTimer202606021825 = null;

function tmAuthority$(selector, root = document){ return root.querySelector(selector); }
function tmAuthority$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }

function tmAuthorityInstallStyles202606021825(){
  if(tmAuthority$('#trustmap-single-render-authority-20260602-1825-style')) return;
  const style = document.createElement('style');
  style.id = 'trustmap-single-render-authority-20260602-1825-style';
  style.textContent = `
    #trustmap[data-single-render-state="settling"] .v554-map-panel,
    #trustmap[data-single-render-state="settling"] .v554-viewport,
    #trustmap[data-single-render-state="settling"] #v554World,
    #trustmap[data-single-render-state="settling"] #trustCanvas{
      opacity:0!important;
      visibility:hidden!important;
      pointer-events:none!important;
    }
    #trustmap[data-single-render-state="ready"] .v554-map-panel,
    #trustmap[data-single-render-state="ready"] .v554-viewport,
    #trustmap[data-single-render-state="ready"] #v554World,
    #trustmap[data-single-render-state="ready"] #trustCanvas,
    #trustmap[data-single-render-state="force-ready"] .v554-map-panel,
    #trustmap[data-single-render-state="force-ready"] .v554-viewport,
    #trustmap[data-single-render-state="force-ready"] #v554World,
    #trustmap[data-single-render-state="force-ready"] #trustCanvas{
      opacity:1!important;
      visibility:visible!important;
      transition:opacity .12s ease!important;
      pointer-events:auto!important;
    }
    #trustmap .tm-single-render-loader{
      display:none;
      min-height:260px;
      place-items:center;
      text-align:center;
      border:1px solid rgba(66,215,255,.24);
      border-radius:22px;
      margin:14px 0;
      padding:22px;
      background:radial-gradient(circle at 50% 34%,rgba(66,215,255,.13),transparent 18rem),linear-gradient(145deg,rgba(4,14,24,.96),rgba(6,23,38,.99));
      color:#dff7ff;
    }
    #trustmap[data-single-render-state="settling"] .tm-single-render-loader{display:grid!important}
    #trustmap[data-single-render-state="ready"] .tm-single-render-loader,
    #trustmap[data-single-render-state="force-ready"] .tm-single-render-loader{display:none!important}
    #trustmap .tm-single-render-loader strong{display:block;color:#fff;font-size:1.14rem;margin-bottom:6px}
    #trustmap .tm-single-render-loader span{display:block;color:#8fd6ff;font-size:.86rem;max-width:44rem}
  `;
  document.head.appendChild(style);
}

function tmAuthorityEnsureLoader202606021825(){
  const trustmap = tmAuthority$('#trustmap');
  if(!trustmap || tmAuthority$('.tm-single-render-loader', trustmap)) return;
  const loader = document.createElement('section');
  loader.className = 'tm-single-render-loader';
  loader.innerHTML = '<div><strong>Preparing current TrustMap</strong><span>CyberShield is suppressing older render passes and will reveal the settled current map only.</span></div>';
  const head = tmAuthority$('.section-head', trustmap);
  if(head) head.insertAdjacentElement('afterend', loader);
  else trustmap.prepend(loader);
}

function tmAuthoritySettle202606021825(reason = 'settle'){
  const trustmap = tmAuthority$('#trustmap');
  if(!trustmap) return;
  tmAuthorityInstallStyles202606021825();
  tmAuthorityEnsureLoader202606021825();
  trustmap.dataset.singleRenderState = 'settling';
  trustmap.dataset.singleRenderReason = reason;
  trustMapAuthorityOpen202606021825 = false;
  trustMapAuthoritySettleStarted202606021825 = performance.now();
  window.clearTimeout(trustMapAuthorityRevealTimer202606021825);
  window.clearTimeout(trustMapAuthorityForceRevealTimer202606021825);
  trustMapAuthorityForceRevealTimer202606021825 = window.setTimeout(() => tmAuthorityForceReveal202606021825('max-wait-fallback'), 2200);
}

function tmAuthorityHasCurrentAssets202606021825(){
  const trustmap = tmAuthority$('#trustmap.active');
  if(!trustmap) return false;
  const domains = tmAuthority$$('.v554-domain[data-v60323-asset-set="layer1-v2"]', trustmap);
  if(domains.length >= 7) return true;
  const imgs = tmAuthority$$('img.v60312-layer1-img[data-v60323-v2="true"], .v60323-v2-frame > img.v60312-layer1-img', trustmap);
  return imgs.length >= 7;
}

function tmAuthorityHasRenderableMap202606021825(){
  const trustmap = tmAuthority$('#trustmap.active');
  if(!trustmap) return false;
  return Boolean(tmAuthority$('.v554-shell', trustmap) && (tmAuthority$('#v554World', trustmap) || tmAuthority$('.v554-map-panel', trustmap)));
}

function tmAuthorityReveal202606021825(reason = 'ready'){
  const trustmap = tmAuthority$('#trustmap.active');
  if(!trustmap) return;
  const currentAssetsReady = tmAuthorityHasCurrentAssets202606021825();
  const renderableMapReady = tmAuthorityHasRenderableMap202606021825();
  const waitedMs = trustMapAuthoritySettleStarted202606021825 ? performance.now() - trustMapAuthoritySettleStarted202606021825 : 0;
  if(!currentAssetsReady && !renderableMapReady && waitedMs < 1800){
    tmAuthorityScheduleReveal202606021825('waiting-current-render', 220);
    return;
  }
  window.clearTimeout(trustMapAuthorityForceRevealTimer202606021825);
  window.CyberShieldLayer1V2SrcRewrite202606021735?.rewriteExisting?.();
  window.CyberShieldTrustMapAssetManifestV60323Api?.prewarm?.();
  window.CyberShieldTrustMapLifecycleV60324?.renderSettled?.({ source:'single-render-authority', reason, currentAssetsReady, renderableMapReady });
  trustmap.dataset.singleRenderState = currentAssetsReady ? 'ready' : 'force-ready';
  trustmap.dataset.singleRenderReason = reason;
  trustmap.dataset.singleRenderFallback = String(!currentAssetsReady && renderableMapReady);
  trustMapAuthorityOpen202606021825 = true;
  tmAuthorityMarkMeta202606021825();
}

function tmAuthorityForceReveal202606021825(reason = 'force-ready'){
  const trustmap = tmAuthority$('#trustmap.active');
  if(!trustmap) return;
  trustmap.dataset.singleRenderState = 'force-ready';
  trustmap.dataset.singleRenderReason = reason;
  trustmap.dataset.singleRenderFallback = 'true';
  trustMapAuthorityOpen202606021825 = true;
  tmAuthorityMarkMeta202606021825();
}

function tmAuthorityScheduleReveal202606021825(reason = 'scheduled', delay = 520){
  window.clearTimeout(trustMapAuthorityRevealTimer202606021825);
  trustMapAuthorityRevealTimer202606021825 = window.setTimeout(() => tmAuthorityReveal202606021825(reason), delay);
}

function tmAuthorityWatch202606021825(){
  const trustmap = tmAuthority$('#trustmap');
  if(!trustmap || trustMapAuthorityObserver202606021825) return;
  trustMapAuthorityObserver202606021825 = new MutationObserver(mutations => {
    if(!tmAuthority$('#trustmap.active')) return;
    const important = mutations.some(m => m.type === 'childList' && (m.addedNodes.length || m.removedNodes.length));
    if(!important) return;
    trustMapAuthorityRenderCount202606021825 += 1;
    if(!trustMapAuthorityOpen202606021825){
      tmAuthorityScheduleReveal202606021825('mutation-settled', 420);
    }
  });
  trustMapAuthorityObserver202606021825.observe(trustmap, { childList:true, subtree:true });
}

function tmAuthorityMarkMeta202606021825(){
  const payload = tmAuthority$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.trustmap_single_render_authority = {
      build:'20260602-1840 TrustMap Single Render Authority Hardening',
      status:tmAuthority$('#trustmap')?.dataset.singleRenderState || 'unknown',
      reason:tmAuthority$('#trustmap')?.dataset.singleRenderReason || 'unknown',
      fallback:tmAuthority$('#trustmap')?.dataset.singleRenderFallback || 'false',
      render_mutation_count:trustMapAuthorityRenderCount202606021825,
      rule:'Hide stacked historical TrustMap render passes, but never keep the TrustMap hidden after navigation or normal object clicks.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

function tmAuthorityHandlers202606021825(){
  if(window.__tmAuthorityHandlers202606021825) return;
  window.__tmAuthorityHandlers202606021825 = true;
  document.addEventListener('click', event => {
    const trustMapRequest = event.target.closest('#mainNav button[data-view="trustmap"], [data-v6033-route="trustmap"]');
    if(trustMapRequest){
      tmAuthoritySettle202606021825('trustmap-request');
      tmAuthorityScheduleReveal202606021825('trustmap-request-settled', 900);
      return;
    }
    const viewControl = event.target.closest('#trustmap [data-v554-mode], #trustmap [data-v554-reset], #trustmap [data-v554-zoom]');
    if(viewControl){
      tmAuthoritySettle202606021825('trustmap-view-control');
      tmAuthorityScheduleReveal202606021825('view-control-settled', 520);
      return;
    }
    const normalMapObject = event.target.closest('#trustmap [data-v554-domain], #trustmap .v554-domain, #trustmap .v554-kernel');
    if(normalMapObject){
      window.clearTimeout(trustMapAuthorityRevealTimer202606021825);
      tmAuthorityScheduleReveal202606021825('normal-object-click-safe-reveal', 80);
    }
  }, true);
  document.addEventListener('cybershield:trustmap-stack-loaded', () => {
    tmAuthoritySettle202606021825('stack-loaded');
    tmAuthorityScheduleReveal202606021825('stack-loaded-settled', 720);
  });
  document.addEventListener('cybershield:trustmap-render-detected', () => {
    if(!trustMapAuthorityOpen202606021825) tmAuthorityScheduleReveal202606021825('render-detected-settled', 420);
  });
}

tmAuthorityInstallStyles202606021825();
tmAuthorityEnsureLoader202606021825();
tmAuthorityWatch202606021825();
tmAuthorityHandlers202606021825();
setTimeout(() => { tmAuthorityWatch202606021825(); if(tmAuthority$('#trustmap.active')) tmAuthoritySettle202606021825('initial-active'); }, 900);
setTimeout(() => { if(tmAuthority$('#trustmap.active')) tmAuthorityScheduleReveal202606021825('initial-active-settled', 400); }, 1400);
window.addEventListener('load', () => setTimeout(() => { tmAuthorityWatch202606021825(); if(tmAuthority$('#trustmap.active')) tmAuthorityScheduleReveal202606021825('window-load', 420); }, 900), { once:true });
