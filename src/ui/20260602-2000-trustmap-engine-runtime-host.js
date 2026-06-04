// 20260602-2010 TrustMap Engine Runtime Host Hardening
// Purpose: render the live TrustMap tab with the new TrustMap Engine only, without exposing preview QA scaffolding to executives.
// Boundary: static advisory prototype only. No live scoring, live evidence retrieval, workflow automation, enforcement, or backend persistence.

let tmEngineRuntimeLoaded202606022000 = false;
let tmEngineRuntimeResult202606022000 = null;

function tmRuntime$(selector, root = document){ return root.querySelector(selector); }
function tmRuntimeEsc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

function tmRuntimeInstallStyles202606022000(){
  if(tmRuntime$('#tm-engine-runtime-host-style-20260602-2000')) return;
  const style = document.createElement('style');
  style.id = 'tm-engine-runtime-host-style-20260602-2000';
  style.textContent = `
    #trustmap[data-trustmap-engine-runtime="active"]{display:block!important;overflow:visible!important}
    #trustmap .tm-engine-runtime-header{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:14px;flex-wrap:wrap}
    #trustmap .tm-engine-runtime-header h2{margin:0;color:#fff}
    #trustmap .tm-engine-runtime-header p{margin:.35rem 0 0;color:var(--muted)}
    #trustmap .tm-engine-runtime-status{border:1px solid rgba(146,205,232,.24);border-radius:14px;padding:8px 11px;background:rgba(0,0,0,.18);font-size:.82rem;color:var(--muted);max-width:34rem}
    #trustmap .tm-engine-runtime-status strong{color:#fff}
    #trustmap .tm-engine-runtime-status pre{display:none!important}
    #trustmap .tm-engine-runtime-target{min-height:760px;overflow:visible}
    #trustmap .tm-engine-runtime-error{border:1px solid rgba(255,92,92,.35);background:rgba(255,92,92,.08);border-radius:16px;padding:14px;color:#ffd6d6}
  `;
  document.head.appendChild(style);
}

function tmRuntimeShell202606022000(){
  return `
    <div class="tm-engine-runtime-header">
      <div>
        <span class="chip">TrustMap Engine</span>
        <h2>CyberShield TrustMap</h2>
        <p>Executive trust navigation across the Kernel, domains, evidence posture, and decision exposure.</p>
      </div>
      <div class="tm-engine-runtime-status" id="trustMapEngineRuntimeStatus"><strong>Status:</strong> preparing TrustMap</div>
    </div>
    <div class="tm-engine-runtime-target" id="trustMapEngineRuntimeTarget"></div>
  `;
}

function tmRuntimeSetStatus202606022000(message, detail = null){
  const status = tmRuntime$('#trustMapEngineRuntimeStatus');
  if(!status) return;
  const hiddenDetail = detail ? `<span hidden data-trustmap-runtime-qa="${tmRuntimeEsc(JSON.stringify(detail))}"></span>` : '';
  status.innerHTML = `<strong>Status:</strong> ${tmRuntimeEsc(message)}${hiddenDetail}`;
}

async function tmRuntimeRender202606022000(reason = 'runtime-render'){
  const trustmap = tmRuntime$('#trustmap');
  if(!trustmap) return null;
  tmRuntimeInstallStyles202606022000();
  trustmap.dataset.trustmapEngineRuntime = 'active';
  trustmap.dataset.trustmapEngineRuntimeReason = reason;
  trustmap.innerHTML = tmRuntimeShell202606022000();
  tmRuntimeSetStatus202606022000('preparing TrustMap');
  try{
    if(!tmEngineRuntimeLoaded202606022000){
      await import('../trustmap-engine/trustmap-engine-loader.js');
      tmEngineRuntimeLoaded202606022000 = true;
    }
    const target = tmRuntime$('#trustMapEngineRuntimeTarget');
    tmEngineRuntimeResult202606022000 = await window.CyberShieldTrustMapEngineScaffold.createPreview(target, { state:{ activeMode:'domain', selectedObjectId:'kernel', lastRenderReason:reason } });
    const qa = tmEngineRuntimeResult202606022000.qa;
    tmRuntimeSetStatus202606022000(qa.ok ? 'TrustMap ready' : 'TrustMap ready with diagnostics', qa);
    tmRuntimeMarkMeta202606022000(qa, reason);
    return tmEngineRuntimeResult202606022000;
  }catch(error){
    console.warn('TrustMap Engine runtime render failed', error);
    const qa = { ok:false, errors:[String(error?.message || error)] };
    const target = tmRuntime$('#trustMapEngineRuntimeTarget');
    if(target) target.innerHTML = `<section class="tm-engine-runtime-error"><strong>TrustMap did not render.</strong><br>${tmRuntimeEsc(String(error?.message || error))}</section>`;
    tmRuntimeSetStatus202606022000('TrustMap render failed', qa);
    tmRuntimeMarkMeta202606022000(qa, reason);
    return null;
  }
}

function tmRuntimeMarkMeta202606022000(qa, reason){
  const payload = tmRuntime$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.trustmap_engine_runtime_switch = {
      build:'20260602-2010 TrustMap Engine Runtime Hardening',
      status:'active_new_engine_runtime_path_executive_facing',
      reason,
      qa:qa || null,
      rule:'Live TrustMap tab renders with new TrustMap Engine only. Runtime status is executive-facing and QA details are hidden in metadata.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

function tmRuntimeHandlers202606022000(){
  if(window.__tmRuntimeHandlers202606022000) return;
  window.__tmRuntimeHandlers202606022000 = true;
  document.addEventListener('click', event => {
    const nav = event.target.closest('#mainNav button[data-view="trustmap"], [data-v6033-route="trustmap"]');
    if(nav) setTimeout(() => tmRuntimeRender202606022000('trustmap-nav'), 0);
  }, true);
  window.addEventListener('hashchange', () => {
    if(location.hash === '#trustmap') tmRuntimeRender202606022000('hashchange');
  });
}

window.CyberShieldTrustMapEngineRuntimeHost202606022000 = {
  render:tmRuntimeRender202606022000,
  getResult:() => tmEngineRuntimeResult202606022000
};

tmRuntimeHandlers202606022000();
setTimeout(() => { if(tmRuntime$('#trustmap.active')) tmRuntimeRender202606022000('initial-active'); }, 900);
window.addEventListener('load', () => setTimeout(() => { if(tmRuntime$('#trustmap.active')) tmRuntimeRender202606022000('window-load-active'); }, 700), { once:true });
