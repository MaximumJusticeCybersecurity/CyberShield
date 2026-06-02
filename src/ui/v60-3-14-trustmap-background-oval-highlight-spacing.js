// V60.3.14 TrustMap Background Blend, Oval Highlight, and Layer 1 Spacing
// Purpose: blend rendered PNG canvases with the TrustMap background, make stoplight highlights oval instead of square, and reduce Cloud/CMMC overlap.
// Boundary: static advisory prototype only. No live scoring, evidence retrieval, workflow automation, or enforcement.

function v60314$(selector, root=document){ return root.querySelector(selector); }
function v60314$$(selector, root=document){ return Array.from(root.querySelectorAll(selector)); }

function v60314InstallStyles(){
  if(v60314$('#v60-3-14-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-14-style';
  style.textContent = `
    :root{
      --v60314-map-bg:#02050b;
      --v60314-map-bg-soft:#04101d;
      --v60314-mjc-light:#dff9ff;
    }

    #trustmap.active .v554-map-panel,
    #trustmap.active .v554-viewport{
      background:
        radial-gradient(circle at 50% 42%, rgba(223,249,255,.16), rgba(66,215,255,.055) 24%, transparent 48%),
        radial-gradient(circle at 50% 52%, rgba(3,7,15,.82), rgba(2,5,11,.98) 62%, #02050b 100%)!important;
    }

    #trustmap.active .v554-map-panel{
      box-shadow:inset 0 0 80px rgba(2,5,11,.95), 0 0 34px rgba(66,215,255,.12)!important;
    }

    #trustmap.active .v554-rings circle,
    #trustmap.active .v554-edges line{
      mix-blend-mode:screen;
    }

    #trustmap.active .v554-domain{
      width:170px!important;
      min-height:190px!important;
      background:transparent!important;
      border:0!important;
      box-shadow:none!important;
    }

    #trustmap.active .v554-domain .orb{
      width:164px!important;
      height:140px!important;
      border-radius:999px!important;
      background:
        radial-gradient(ellipse at 50% 55%, rgba(2,5,11,.98) 0%, rgba(2,5,11,.92) 38%, rgba(2,5,11,.55) 60%, transparent 76%)!important;
      isolation:isolate;
      overflow:visible!important;
    }

    #trustmap.active .v554-domain .orb:before{
      content:''!important;
      display:block!important;
      position:absolute;
      inset:-6px -10px;
      border-radius:999px;
      background:radial-gradient(ellipse at 50% 55%, color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 22%, transparent), transparent 68%);
      border:1.5px solid color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 40%, transparent);
      box-shadow:0 0 16px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 22%, transparent);
      opacity:.42;
      pointer-events:none;
      z-index:0;
    }

    #trustmap.active .v554-domain .orb:after{
      content:''!important;
      position:absolute!important;
      inset:-12px -16px!important;
      border-radius:999px!important;
      border:2.25px solid transparent!important;
      opacity:0!important;
      box-shadow:none!important;
      background:transparent!important;
      transition:opacity .14s ease,border-color .14s ease,box-shadow .14s ease,transform .14s ease!important;
      pointer-events:none!important;
      z-index:3!important;
    }

    #trustmap.active .v554-domain:hover .orb:after,
    #trustmap.active .v554-domain:focus-visible .orb:after,
    #trustmap.active .v554-domain.v60312-selected .orb:after{
      opacity:1!important;
      transform:scale(1.02);
      border-color:var(--v60313-stoplight,#ffd43b)!important;
      box-shadow:
        0 0 18px var(--v60313-stoplight,#ffd43b),
        0 0 44px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 60%, transparent),
        inset 0 0 22px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 26%, transparent)!important;
    }

    #trustmap.active .v60312-layer1-img{
      position:relative!important;
      z-index:2!important;
      width:178px!important;
      height:178px!important;
      object-fit:contain!important;
      transform:translateY(-19px)!important;
      filter:none!important;
      border-radius:999px!important;
      mix-blend-mode:screen!important;
      background:transparent!important;
    }

    #trustmap.active .v554-domain:hover .v60312-layer1-img,
    #trustmap.active .v554-domain:focus-visible .v60312-layer1-img,
    #trustmap.active .v554-domain.v60312-selected .v60312-layer1-img{
      transform:translateY(-19px) scale(1.035)!important;
      filter:none!important;
    }

    #trustmap.active .v554-domain-label{
      background:rgba(2,5,11,.72)!important;
      border:1px solid color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 28%, transparent)!important;
      box-shadow:0 0 14px rgba(0,0,0,.68)!important;
    }

    #trustmap.active .v554-kernel{
      background:radial-gradient(ellipse at 50% 54%, rgba(2,5,11,.98), rgba(2,5,11,.65) 58%, transparent 74%)!important;
      border-radius:999px!important;
    }

    #trustmap.active .v60312-core-img{
      filter:none!important;
      mix-blend-mode:screen!important;
      border-radius:999px!important;
      background:transparent!important;
    }

    #trustmap.active #v60312RightAuthority .v60312-mini{
      background:radial-gradient(ellipse at 50% 52%, rgba(2,5,11,.98), rgba(2,5,11,.78) 62%, transparent 80%)!important;
      border-radius:999px!important;
      overflow:hidden!important;
    }

    #trustmap.active #v60312RightAuthority .v60312-mini img{
      mix-blend-mode:screen!important;
      filter:none!important;
      border-radius:999px!important;
    }

    #trustmap.active .v554-domain[data-v554-domain="cmmc"]{
      transform:translate(-34px,-24px)!important;
    }

    #trustmap.active .v554-domain[data-v554-domain="cloud"]{
      transform:translate(30px,-20px)!important;
    }

    #trustmap.active .v554-domain[data-v554-domain="endpoints"]{
      transform:translate(-8px,10px)!important;
    }
  `;
  document.head.appendChild(style);
}

function v60314MarkMeta(){
  const payload = v60314$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.14 TrustMap Background Blend, Oval Highlight, and Layer 1 Spacing';
    parsed.version = 'V60.3.14';
    parsed.previous_operational_build = 'V60.3.13 Stoplight Trust Color and PNG Path Recovery';
    parsed.trustmap_background_oval_spacing = {
      status:'active_visual_tuning_layer',
      rule:'Blend PNG canvases with TrustMap background, move trust highlight from image rectangle to oval containment layer, and reduce Cloud/CMMC overlap.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

function v60314Apply(){
  if(!v60314$('#trustmap.active')) return;
  v60314InstallStyles();
  v60314MarkMeta();
}

function v60314Handlers(){
  if(window.__v60314Handlers) return;
  window.__v60314Handlers = true;
  document.addEventListener('mouseover', v60314Apply, true);
  document.addEventListener('focusin', v60314Apply, true);
  document.addEventListener('click', () => setTimeout(v60314Apply, 120), true);
}

v60314Handlers();
setTimeout(v60314Apply, 2450);
window.addEventListener('load', () => setTimeout(v60314Apply, 2900), { once:true });
setTimeout(v60314Apply, 3800);
