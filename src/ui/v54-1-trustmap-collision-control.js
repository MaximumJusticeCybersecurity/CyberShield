// V54.1 Enterprise TrustMap Collision Control
// Purpose: reduce visual overlap without reintroducing legacy TrustMap filters or process-flow behavior.

function installV541CollisionStyles() {
  if (document.querySelector('#v54-1-collision-style')) return;
  const style = document.createElement('style');
  style.id = 'v54-1-collision-style';
  style.textContent = `
    .v54-shell{grid-template-columns:300px minmax(860px,1fr) 300px!important;gap:18px!important;}
    .v54-map-panel{min-height:840px!important;}
    .v54-world{width:1520px!important;height:1100px!important;}
    .v54-ring.r1{width:360px!important;height:360px!important;}
    .v54-ring.r2{width:720px!important;height:720px!important;}
    .v54-ring.r3{width:1080px!important;height:1080px!important;}
    .v54-kernel{width:184px!important;height:166px!important;padding:12px!important;}
    .v54-kernel img{width:60px!important;height:60px!important;}
    .v54-domain{width:126px!important;min-height:104px!important;padding:8px!important;border-radius:16px!important;font-size:.78rem!important;}
    .v54-domain strong{font-size:.8rem!important;line-height:1.1!important;}
    .v54-domain small{font-size:.66rem!important;}
    .v54-icon{width:34px!important;height:34px!important;font-size:.95rem!important;margin-bottom:4px!important;}
    .v54-asset{width:84px!important;min-height:58px!important;padding:6px!important;border-radius:13px!important;font-size:.6rem!important;box-shadow:0 10px 18px rgba(0,0,0,.22)!important;}
    .v54-asset strong{font-size:.6rem!important;line-height:1.05!important;}
    .v54-asset small{display:none!important;}
    .v54-status{font-size:.58rem!important;}
    .v54-domain:hover,.v54-domain.active,.v54-asset:hover,.v54-asset.active{transform:translate(-50%,-50%) scale(1.03)!important;}
    .v54-edge-layer path{stroke-width:1.05!important;opacity:.68!important;}
    .v54-panel{padding:13px!important;}
    .v54-score-ring{width:136px!important;height:136px!important;margin:10px auto!important;}
    .v54-score-inner{width:100px!important;height:100px!important;}
    .v54-score-inner strong{font-size:2rem!important;}
    .v54-row{padding:5px 0!important;font-size:.82rem!important;}
    .v54-detail{font-size:.84rem!important;}
    .v54-controls{max-width:calc(100% - 32px)!important;}
    .v54-controls button{font-size:.76rem!important;padding:6px 8px!important;}
    @media(max-width:1180px){.v54-shell{grid-template-columns:1fr!important}.v54-map-panel{min-height:790px!important}.v54-world{width:1440px!important;height:1040px!important}.v54-domain{width:120px!important}.v54-asset{width:80px!important}}
    @media(max-width:720px){.v54-map-panel{min-height:720px!important}.v54-world{width:1360px!important;height:980px!important}.v54-domain{width:112px!important;min-height:96px!important;font-size:.7rem!important}.v54-asset{width:76px!important;min-height:54px!important;font-size:.58rem!important}.v54-kernel{width:160px!important;height:144px!important}}
  `;
  document.head.appendChild(style);
}

function v541SetTransform(scale, pan = { x: 0, y: 0 }) {
  const world = document.querySelector('#v54World');
  if (!world) return;
  world.style.transform = `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${scale})`;
  sessionStorage.setItem('v54Scale', String(scale));
  sessionStorage.setItem('v54Pan', JSON.stringify(pan));
}

function v541NormalizeInitialView() {
  const world = document.querySelector('#v54World');
  if (!world) return;
  const mode = sessionStorage.getItem('v54Mode') || 'kernel';
  const pan = JSON.parse(sessionStorage.getItem('v54Pan') || '{"x":0,"y":0}');
  if (mode === 'fit') v541SetTransform(0.42, { x: 0, y: 0 });
  else if (mode === 'kernel') v541SetTransform(0.68, { x: 0, y: 0 });
  else if (mode === 'domain') v541SetTransform(0.94, pan);
  else if (mode === 'object') v541SetTransform(1.16, pan);
}

function v541PostControlFix(event) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const control = target.closest('[data-v54-mode],[data-v54-reset],[data-v54-domain],[data-v54-asset]');
  if (!control) return;
  window.setTimeout(() => {
    const mode = sessionStorage.getItem('v54Mode') || 'kernel';
    const pan = JSON.parse(sessionStorage.getItem('v54Pan') || '{"x":0,"y":0}');
    if (control.matches('[data-v54-mode="fit"]')) v541SetTransform(0.42, { x: 0, y: 0 });
    else if (control.matches('[data-v54-mode="kernel"],[data-v54-reset]')) v541SetTransform(0.68, { x: 0, y: 0 });
    else if (mode === 'domain') v541SetTransform(0.94, pan);
    else if (mode === 'object') v541SetTransform(1.16, pan);
  }, 80);
}

function v541MarkBuild() {
  document.title = 'CyberShield V54.1 TrustMap Collision Fix';
  const admin = document.querySelector('#adminPayload');
  if (!admin) return;
  try {
    const payload = JSON.parse(admin.textContent || '{}');
    payload.build = 'V54.1 Enterprise TrustMap Collision and Spacing Fix';
    payload.version = 'V54.1';
    payload.trustmap_spacing = 'Larger virtual canvas, smaller nodes, lower default fit/kernel scale, and collision-control CSS loaded after V54.';
    admin.textContent = JSON.stringify(payload, null, 2);
  } catch {}
}

function v541Run() {
  installV541CollisionStyles();
  v541NormalizeInitialView();
  v541MarkBuild();
}

document.addEventListener('click', v541PostControlFix, true);
window.addEventListener('load', () => setTimeout(v541Run, 700), { once: true });
setTimeout(v541Run, 900);
