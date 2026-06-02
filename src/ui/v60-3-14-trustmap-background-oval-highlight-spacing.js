import './v60-3-16-trustmap-centerline-fiber-connectors-and-pane-grid.js';
import './v60-3-16-1-trust-kernel-detail-and-stoplight-risk-rows.js';

// V60.3.14 TrustMap Background Blend, Oval Highlight, Layer 1 Spacing, and Fiber Optic Connectors
// Purpose: blend rendered PNG canvases with the TrustMap background, make stoplight highlights oval instead of square, reduce Cloud/CMMC overlap, and make connectors look like CyberShield fiber-optic trust lines.
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
      --v60314-fiber-blue:#dff9ff;
      --v60314-fiber-blue-core:#6eeaff;
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

    #trustmap.active .v554-rings circle{
      mix-blend-mode:screen;
    }

    #trustmap.active .v554-edges line{
      stroke:var(--v60314-fiber-blue)!important;
      stroke-width:2.2!important;
      stroke-linecap:round!important;
      opacity:.74!important;
      mix-blend-mode:screen;
      filter:
        drop-shadow(0 0 3px rgba(223,249,255,.96))
        drop-shadow(0 0 8px rgba(110,234,255,.68))
        drop-shadow(0 0 18px rgba(66,215,255,.32))!important;
    }

    #trustmap.active .v554-edges line.core,
    #trustmap.active .v554-edges line[data-depth="1"]{
      stroke:var(--v60314-fiber-blue-core)!important;
      stroke-width:3.8!important;
      opacity:.96!important;
      filter:
        drop-shadow(0 0 4px rgba(255,255,255,.95))
        drop-shadow(0 0 10px rgba(110,234,255,.86))
        drop-shadow(0 0 26px rgba(66,215,255,.55))!important;
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
      background:radial-gradient(ellipse at 50% 55%, rgba(2,5,11,.72), rgba(2,5,11,.32) 56%, transparent 74%);
      border:1px solid rgba(223,249,255,.10);
      box-shadow:0 0 10px rgba(2,5,11,.62);
      opacity:.52;
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

    #trustmap.active .v554-domain[data-v554-domain="third"] .v60312-layer1-img{
      width:148px!important;
      height:148px!important;
      transform:translateY(-5px)!important;
      object-fit:contain!important;
    }

    #trustmap.active .v554-domain:hover .v60312-layer1-img,
    #trustmap.active .v554-domain:focus-visible .v60312-layer1-img,
    #trustmap.active .v554-domain.v60312-selected .v60312-layer1-img{
      transform:translateY(-19px) scale(1.035)!important;
      filter:none!important;
    }

    #trustmap.active .v554-domain[data-v554-domain="third"]:hover .v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="third"]:focus-visible .v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="third"].v60312-selected .v60312-layer1-img{
      transform:translateY(-5px) scale(1.035)!important;
    }

    #trustmap.active .v554-domain-label{
      background:rgba(2,5,11,.72)!important;
      border:1px solid rgba(223,249,255,.11)!important;
      box-shadow:0 0 14px rgba(0,0,0,.68)!important;
    }

    #trustmap.active .v554-domain:hover .v554-domain-label,
    #trustmap.active .v554-domain:focus-visible .v554-domain-label,
    #trustmap.active .v554-domain.v60312-selected .v554-domain-label{
      border-color:color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 48%, transparent)!important;
      box-shadow:0 0 16px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 32%, transparent)!important;
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

    #trustmap.active #v60312RightAuthority img[alt="Third Parties & Vendors"]{
      width:82px!important;
      height:82px!important;
      object-fit:contain!important;
    }
  `;
  document.head.appendChild(style);
}

function v60314ApplyConnectorTrustState(){
  const trustmap = v60314$('#trustmap.active');
  if(!trustmap) return;
  const selected = trustmap.querySelector('.v554-domain.v60312-selected')?.dataset.v554Domain;
  const selectedEl = selected ? trustmap.querySelector(`.v554-domain[data-v554-domain="${selected}"]`) : null;
  const selectedColor = selectedEl ? getComputedStyle(selectedEl).getPropertyValue('--v60313-stoplight').trim() : '';
  v60314$$('.v554-edges line', trustmap).forEach(line => {
    line.style.removeProperty('--v60314-active-fiber');
    if(selectedColor && line.classList.contains('core')){
      line.style.stroke = selectedColor;
      line.style.filter = `drop-shadow(0 0 4px rgba(255,255,255,.95)) drop-shadow(0 0 11px ${selectedColor}) drop-shadow(0 0 28px ${selectedColor})`;
    }
  });
}

function v60314MarkMeta(){
  const payload = v60314$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.16 TrustMap Centerline Fiber Connectors, Three-Pane Separation, Trust Kernel Detail, and Stoplight Risk Rows';
    parsed.version = 'V60.3.16';
    parsed.previous_operational_build = 'V60.3.15 Layer 1 Equal Ring Distribution';
    parsed.trustmap_v60_3_16_chain = {
      status:'active_chained_visual_layers',
      rule:'V60.3.14 chains V60.3.16 and V60.3.16.1. Centerline fiber connectors, three-pane separation, Trust Kernel hover detail, and stoplight-only risk rows are active through this chain.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

function v60314Apply(){
  if(!v60314$('#trustmap.active')) return;
  v60314InstallStyles();
  v60314ApplyConnectorTrustState();
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
