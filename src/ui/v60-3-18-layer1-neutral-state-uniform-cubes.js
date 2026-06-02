// V60.3.18 Layer 1 Neutral State and Uniform Hologram Cube Sizing
// Purpose: remove constant Layer 1 trust-state glow and render all Layer 1 holographic cubes at a consistent size.
// Boundary: static advisory prototype only. No live scoring, evidence retrieval, workflow automation, or enforcement.

function v60318$(selector, root=document){ return root.querySelector(selector); }
function v60318$$(selector, root=document){ return Array.from(root.querySelectorAll(selector)); }

function v60318InstallStyles(){
  if(v60318$('#v60-3-18-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-18-style';
  style.textContent = `
    #trustmap.active .v554-domain{
      width:174px!important;
      min-height:194px!important;
      background:transparent!important;
      border:0!important;
      box-shadow:none!important;
    }

    #trustmap.active .v554-domain .orb{
      width:166px!important;
      height:142px!important;
      border-radius:999px!important;
      background:radial-gradient(ellipse at 50% 55%,rgba(2,5,11,.96) 0%,rgba(2,5,11,.78) 42%,rgba(2,5,11,.30) 64%,transparent 79%)!important;
      box-shadow:none!important;
      overflow:visible!important;
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
      box-shadow:
        0 0 18px var(--v60313-stoplight,#ffd43b),
        0 0 44px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 60%, transparent),
        inset 0 0 22px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 24%, transparent)!important;
    }

    #trustmap.active .v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="third"] .v60312-layer1-img{
      position:relative!important;
      z-index:2!important;
      width:166px!important;
      height:166px!important;
      max-width:166px!important;
      max-height:166px!important;
      object-fit:contain!important;
      object-position:center center!important;
      transform:translateY(-13px)!important;
      filter:none!important;
      border-radius:999px!important;
      mix-blend-mode:screen!important;
      background:transparent!important;
    }

    #trustmap.active .v554-domain:hover .v60312-layer1-img,
    #trustmap.active .v554-domain:focus-visible .v60312-layer1-img,
    #trustmap.active .v554-domain.v60312-selected .v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="third"]:hover .v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="third"]:focus-visible .v60312-layer1-img,
    #trustmap.active .v554-domain[data-v554-domain="third"].v60312-selected .v60312-layer1-img{
      transform:translateY(-13px) scale(1.025)!important;
      filter:none!important;
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

    #trustmap.active #v60312RightAuthority .v60312-mini img,
    #trustmap.active #v60312RightAuthority img[alt="Third Parties & Vendors"]{
      width:92px!important;
      height:92px!important;
      max-width:92px!important;
      max-height:92px!important;
      object-fit:contain!important;
      object-position:center center!important;
      filter:none!important;
      mix-blend-mode:screen!important;
    }
  `;
  document.head.appendChild(style);
}

function v60318MarkMeta(){
  const payload = v60318$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.18 Layer 1 Neutral State and Uniform Hologram Cube Sizing';
    parsed.version = 'V60.3.18';
    parsed.previous_operational_build = 'V60.3.17 Briefing TrustMap Snapshot Image';
    parsed.layer1_neutral_state_uniform_cubes = {
      status:'active_visual_consistency_layer',
      rule:'Layer 1 holographic cubes render at the same size. No constant red/yellow/green glow appears in normal state. Stoplight glow appears only on hover/focus/selected and selected persists until another asset is selected.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed,null,2);
  }catch{}
}

function v60318Apply(){
  if(!v60318$('#trustmap.active')) return;
  v60318InstallStyles();
  v60318MarkMeta();
}

function v60318Handlers(){
  if(window.__v60318Handlers) return;
  window.__v60318Handlers = true;
  ['mouseover','focusin','click','wheel','input','mouseup'].forEach(eventName => {
    document.addEventListener(eventName, () => setTimeout(v60318Apply,80), true);
  });
}

v60318Handlers();
setTimeout(v60318Apply,2700);
window.addEventListener('load', () => setTimeout(v60318Apply,3300), {once:true});
setTimeout(v60318Apply,4300);
