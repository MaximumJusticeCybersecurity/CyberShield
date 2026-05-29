// V55.3.1 Core Shield Boundary Fix
// Purpose: remove the remaining black bevel around CyberShield Core, replace it with a thicker neon-blue
// shield boundary, and make the core connectors visually terminate at the shield perimeter.

function v5531$(selector, root = document){
  return root.querySelector(selector);
}

function v5531InstallStyles(){
  if(v5531$('#v55-3-1-core-shield-boundary-style')) return;
  const style = document.createElement('style');
  style.id = 'v55-3-1-core-shield-boundary-style';
  style.textContent = `
    .v552-edges .core{
      stroke:#42d7ff!important;
      stroke-width:5.8!important;
      opacity:.96!important;
      filter:drop-shadow(0 0 7px rgba(66,215,255,.95)) drop-shadow(0 0 15px rgba(66,215,255,.5))!important;
    }

    .v552-kernel{
      width:232px!important;
      height:208px!important;
      padding:18px 22px 24px!important;
      background:transparent!important;
      border:0!important;
      border-radius:0!important;
      box-shadow:none!important;
      clip-path:none!important;
      overflow:visible!important;
      isolation:isolate!important;
      filter:none!important;
    }

    .v552-kernel::before,
    .v552-kernel::after{
      content:""!important;
      position:absolute!important;
      pointer-events:none!important;
      clip-path:polygon(50% 0%,88% 16%,82% 72%,50% 100%,18% 72%,12% 16%)!important;
    }

    .v552-kernel::before{
      inset:-7px!important;
      z-index:-3!important;
      background:#42d7ff!important;
      filter:drop-shadow(0 0 10px rgba(66,215,255,1)) drop-shadow(0 0 22px rgba(66,215,255,.75)) drop-shadow(0 0 42px rgba(66,215,255,.42))!important;
      opacity:1!important;
    }

    .v552-kernel::after{
      inset:0!important;
      z-index:-2!important;
      background:radial-gradient(circle at 50% 24%,rgba(66,215,255,.24),rgba(8,31,51,.94) 54%,rgba(4,14,26,.98) 100%)!important;
      box-shadow:inset 0 0 22px rgba(66,215,255,.22), inset 0 0 44px rgba(3,13,24,.55)!important;
    }

    .v552-kernel img,
    .v552-kernel strong,
    .v552-kernel span,
    .v552-kernel small{
      position:relative!important;
      z-index:2!important;
    }

    .v552-kernel img{
      filter:drop-shadow(0 0 10px rgba(66,215,255,.8))!important;
    }

    .v552-kernel strong{
      text-shadow:0 0 12px rgba(66,215,255,.78)!important;
    }

    .v552-shield-mask{
      position:absolute!important;
      left:900px!important;
      top:700px!important;
      transform:translate(-50%,-50%)!important;
      width:236px!important;
      height:212px!important;
      z-index:28!important;
      pointer-events:none!important;
      clip-path:polygon(50% 0%,88% 16%,82% 72%,50% 100%,18% 72%,12% 16%)!important;
      background:radial-gradient(circle at 50% 24%,rgba(8,31,51,.98),rgba(4,14,26,.99) 68%,rgba(2,8,18,.99) 100%)!important;
      border:0!important;
      box-shadow:none!important;
      filter:none!important;
      opacity:1!important;
    }
  `;
  document.head.appendChild(style);
}

function v5531MarkMeta(){
  const payload = v5531$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V55.3.1 Core Shield Boundary Fix';
    parsed.version = 'V55.3.1';
    parsed.previous_operational_build = 'V55.3 TrustMap Registry and Visual Object Stabilization';
    parsed.core_shield_boundary_fix = {
      status: 'applied',
      rule: 'No black bevel around CyberShield Core.  Core boundary is a thick neon-blue shield perimeter.  Core connectors visually terminate at the shield outline.',
      github_pages_browser_qa_required: true
    };
    parsed.prototype_boundary = 'Static advisory prototype only. No live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, or live internet claim verification.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {
    // Metadata failure must not break the prototype.
  }
}

function v5531Apply(){
  v5531InstallStyles();
  v5531MarkMeta();
}

function v5531Handlers(){
  if(window.__v5531Handlers) return;
  window.__v5531Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v552-mode],[data-v552-reset],[data-v552-domain],[data-v552-asset]')){
      setTimeout(v5531Apply, 180);
    }
  }, true);
}

v5531Handlers();
v5531Apply();
window.addEventListener('load', () => setTimeout(v5531Apply, 1200), { once: true });
setTimeout(v5531Apply, 1600);
