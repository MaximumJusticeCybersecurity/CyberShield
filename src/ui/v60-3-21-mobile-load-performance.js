// V60.3.21 Mobile Load Performance Controls
// Purpose: make CyberShield usable on phones by deferring heavy TrustMap work, showing a fast placeholder, and reducing animation/filter cost on constrained screens.
// Boundary: static advisory prototype only. No live scoring, live retrieval, workflow automation, enforcement, or backend persistence.

function v60321$(selector, root = document){ return root.querySelector(selector); }
function v60321$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }

function v60321InstallStyles(){
  if(v60321$('#v60-3-21-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-21-style';
  style.textContent = `
    .v60321-trustmap-loading{
      min-height:320px;
      display:grid;
      place-items:center;
      text-align:center;
      border:1px solid rgba(66,215,255,.24);
      border-radius:22px;
      background:radial-gradient(circle at 50% 36%,rgba(66,215,255,.14),transparent 18rem),linear-gradient(145deg,rgba(4,14,24,.96),rgba(6,23,38,.99));
      color:#dff7ff;
      padding:18px;
      box-shadow:0 14px 34px rgba(0,0,0,.28);
    }
    .v60321-trustmap-loading strong{display:block;font-size:1.25rem;color:#fff;margin-bottom:6px}
    .v60321-trustmap-loading span{display:block;color:#8fd6ff;font-size:.86rem;max-width:42rem}
    .v60321-trustmap-loading:before{
      content:'';
      width:54px;
      height:54px;
      border-radius:50%;
      border:3px solid rgba(66,215,255,.18);
      border-top-color:#42d7ff;
      margin-bottom:14px;
      animation:v60321Spin 1.1s linear infinite;
    }
    @keyframes v60321Spin{to{transform:rotate(360deg)}}

    @media(max-width:760px){
      html{font-size:15px!important}
      main{width:calc(100vw - 12px)!important;padding-top:10px!important}
      .topbar{padding:9px 12px!important}
      .brand img{width:38px!important;height:38px!important}
      .v60317-snapshot-img{filter:none!important}
      .v6033-first-layer,
      .panel,
      .summary-card,
      .decision-card{box-shadow:0 10px 24px rgba(0,0,0,.24)!important}
      #trustmap.active .v554-world{transition:none!important}
      #trustmap.active .v60316-fiber{animation:none!important;filter:none!important;opacity:.68!important}
      #trustmap.active .v60316-fiber.active{filter:none!important;opacity:.9!important}
      #trustmap.active .v554-map-panel{box-shadow:inset 0 0 32px rgba(2,5,11,.86)!important}
      #trustmap.active .v60312-layer1-img,
      #trustmap.active .v60312-core-img{filter:none!important}
      #trustmap.active .v554-domain .orb:after{transition:none!important}
    }

    @media(prefers-reduced-motion:reduce){
      *,*:before,*:after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}
    }
  `;
  document.head.appendChild(style);
}

function v60321ShowTrustMapPlaceholder(){
  const trustmap = v60321$('#trustmap.active');
  if(!trustmap || v60321$('.v554-shell', trustmap) || v60321$('.v60321-trustmap-loading', trustmap)) return;
  const head = trustmap.querySelector('.section-head');
  const placeholder = document.createElement('section');
  placeholder.className = 'v60321-trustmap-loading';
  placeholder.innerHTML = '<div><strong>Loading TrustMap</strong><span>Opening the full interactive trust universe.  The rest of CyberShield now loads first so mobile users are not forced to pay this cost on startup.</span></div>';
  if(head) head.insertAdjacentElement('afterend', placeholder);
  else trustmap.prepend(placeholder);
}

function v60321RemoveTrustMapPlaceholder(){
  v60321$$('.v60321-trustmap-loading').forEach(el => el.remove());
}

function v60321TuneImages(){
  v60321$$('img').forEach(img => {
    if(!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    if(img.classList.contains('v60317-snapshot-img')){
      img.setAttribute('loading', 'lazy');
      img.setAttribute('fetchpriority', 'low');
    }
    if(img.classList.contains('v60312-layer1-img') || img.classList.contains('v60312-core-img')){
      img.setAttribute('decoding', 'async');
    }
  });
}

function v60321MarkMeta(){
  const payload = v60321$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.mobile_load_performance = {
      build:'V60.3.21 Mobile Load Performance Controls',
      status:'active_performance_gate',
      rule:'Defer heavy TrustMap loading until requested, show a fast placeholder, reduce mobile animation/filter cost, and keep image decode async.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

function v60321Apply(){
  v60321InstallStyles();
  v60321TuneImages();
  if(v60321$('#trustmap.active')) v60321ShowTrustMapPlaceholder();
  if(v60321$('#trustmap.active .v554-shell')) v60321RemoveTrustMapPlaceholder();
  v60321MarkMeta();
}

function v60321Handlers(){
  if(window.__v60321Handlers) return;
  window.__v60321Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('#mainNav button[data-view="trustmap"], [data-v6033-route="trustmap"]')){
      setTimeout(v60321ShowTrustMapPlaceholder, 0);
      setTimeout(v60321Apply, 260);
    }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment')) setTimeout(v60321Apply, 260);
  }, true);
  document.addEventListener('cybershield:trustmap-stack-loaded', () => {
    setTimeout(v60321RemoveTrustMapPlaceholder, 900);
    setTimeout(v60321Apply, 960);
  });
  document.addEventListener('cybershield:first-layer-decision-brief-loaded', () => setTimeout(v60321Apply, 320));
}

v60321Handlers();
v60321Apply();
window.addEventListener('load', () => setTimeout(v60321Apply, 700), { once:true });
setTimeout(v60321Apply, 1400);
