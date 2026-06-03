// 20260602-1930 TrustMap Engine Preview Host
// Purpose: provide a safe Architecture-hosted preview for the new TrustMap Engine without replacing the live TrustMap tab.
// Boundary: preview only. Does not alter live TrustMap runtime, scoring, retrieval, automation, enforcement, or backend behavior.

let tmEnginePreviewLoaded202606021930 = false;
let tmEnginePreviewResult202606021930 = null;

function tmPreview$(selector, root = document){ return root.querySelector(selector); }
function tmPreviewEsc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

function tmPreviewInstallStyles202606021930(){
  if(tmPreview$('#tm-engine-preview-host-style-20260602-1930')) return;
  const style = document.createElement('style');
  style.id = 'tm-engine-preview-host-style-20260602-1930';
  style.textContent = `
    #architecture .tm-engine-preview-host{margin-top:18px;display:grid;gap:14px}
    #architecture .tm-engine-preview-actions{display:flex;gap:8px;flex-wrap:wrap}
    #architecture .tm-engine-preview-actions button{border-radius:10px;padding:9px 12px;font-weight:900}
    #architecture .tm-engine-preview-status{border:1px solid rgba(146,205,232,.24);border-radius:14px;padding:10px 12px;background:rgba(0,0,0,.18);color:var(--muted)}
    #architecture .tm-engine-preview-status strong{color:#fff}
    #architecture .tm-engine-preview-target{min-height:760px;border:1px dashed rgba(66,215,255,.25);border-radius:22px;padding:12px;background:rgba(0,0,0,.18);overflow:auto}
  `;
  document.head.appendChild(style);
}

function tmPreviewEnsureHost202606021930(){
  const architecture = tmPreview$('#architecture');
  if(!architecture) return null;
  tmPreviewInstallStyles202606021930();
  let host = tmPreview$('#trustMapEnginePreviewHost');
  if(host) return host;
  host = document.createElement('section');
  host.id = 'trustMapEnginePreviewHost';
  host.className = 'panel tm-engine-preview-host';
  host.innerHTML = `
    <div class="section-title-row">
      <div>
        <span class="chip">Engine Preview</span>
        <h2>TrustMap Engine Preview Renderer</h2>
        <p class="lede">Safe preview of the new TrustMap Engine.  This does not replace the live TrustMap tab yet.</p>
      </div>
    </div>
    <div class="tm-engine-preview-actions">
      <button type="button" id="renderTrustMapEnginePreview">Render Engine Preview</button>
      <button type="button" id="clearTrustMapEnginePreview">Clear Preview</button>
    </div>
    <div class="tm-engine-preview-status" id="trustMapEnginePreviewStatus"><strong>Status:</strong> not rendered</div>
    <div class="tm-engine-preview-target" id="trustMapEnginePreviewTarget" aria-label="TrustMap Engine preview target"></div>
  `;
  const modelLibrary = tmPreview$('#architectureModelLibrary');
  if(modelLibrary) modelLibrary.insertAdjacentElement('afterend', host);
  else architecture.appendChild(host);
  tmPreviewBindHost202606021930(host);
  return host;
}

function tmPreviewBindHost202606021930(host){
  if(host.dataset.tmPreviewBound === 'true') return;
  host.dataset.tmPreviewBound = 'true';
  tmPreview$('#renderTrustMapEnginePreview', host)?.addEventListener('click', () => tmPreviewRender202606021930());
  tmPreview$('#clearTrustMapEnginePreview', host)?.addEventListener('click', () => {
    const target = tmPreview$('#trustMapEnginePreviewTarget');
    if(target) target.innerHTML = '';
    tmEnginePreviewResult202606021930 = null;
    tmPreviewSetStatus202606021930('cleared');
  });
}

function tmPreviewSetStatus202606021930(message, detail = null){
  const status = tmPreview$('#trustMapEnginePreviewStatus');
  if(!status) return;
  status.innerHTML = `<strong>Status:</strong> ${tmPreviewEsc(message)}${detail ? `<pre>${tmPreviewEsc(JSON.stringify(detail, null, 2))}</pre>` : ''}`;
}

async function tmPreviewRender202606021930(){
  tmPreviewEnsureHost202606021930();
  const target = tmPreview$('#trustMapEnginePreviewTarget');
  if(!target) return;
  tmPreviewSetStatus202606021930('loading preview engine');
  try{
    if(!tmEnginePreviewLoaded202606021930){
      await import('../trustmap-engine/trustmap-engine-loader.js');
      tmEnginePreviewLoaded202606021930 = true;
    }
    tmEnginePreviewResult202606021930 = await window.CyberShieldTrustMapEngineScaffold.createPreview(target, { state:{ activeMode:'domain', selectedObjectId:'kernel' } });
    tmPreviewSetStatus202606021930(tmEnginePreviewResult202606021930.qa.ok ? 'preview rendered and QA passed' : 'preview rendered with QA findings', tmEnginePreviewResult202606021930.qa);
    tmPreviewMarkMeta202606021930(tmEnginePreviewResult202606021930.qa);
  }catch(error){
    console.warn('TrustMap Engine preview render failed', error);
    tmPreviewSetStatus202606021930('preview render failed', { error:String(error?.message || error) });
    tmPreviewMarkMeta202606021930({ ok:false, errors:[String(error?.message || error)] });
  }
}

function tmPreviewMarkMeta202606021930(qa){
  const payload = tmPreview$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.trustmap_engine_preview_renderer = {
      build:'20260602-1930 TrustMap Engine Preview Renderer',
      status:'architecture_preview_host_active',
      qa:qa || null,
      rule:'Preview renderer lives in Architecture and does not replace the live TrustMap tab.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

function tmPreviewApply202606021930(){
  if(!tmPreview$('#architecture')) return;
  tmPreviewEnsureHost202606021930();
}

function tmPreviewHandlers202606021930(){
  if(window.__tmPreviewHandlers202606021930) return;
  window.__tmPreviewHandlers202606021930 = true;
  document.addEventListener('click', event => {
    if(event.target.closest('#mainNav button[data-view="architecture"], #architecture')) setTimeout(tmPreviewApply202606021930, 140);
  }, true);
}

window.CyberShieldTrustMapEnginePreviewHost202606021930 = {
  apply:tmPreviewApply202606021930,
  render:tmPreviewRender202606021930
};

tmPreviewHandlers202606021930();
setTimeout(tmPreviewApply202606021930, 1300);
window.addEventListener('load', () => setTimeout(tmPreviewApply202606021930, 1800), { once:true });
