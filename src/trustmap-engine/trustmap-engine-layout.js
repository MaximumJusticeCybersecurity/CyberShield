// 20260602-1915 TrustMap Engine Layout Scaffold
// Boundary: scaffold only. Not wired into live runtime.

export function createTrustMapEngineLayout(){
  const shell = document.createElement('section');
  shell.className = 'tm-engine-shell';
  shell.dataset.trustmapEngine = 'preview-layout';
  shell.innerHTML = `
    <aside class="tm-engine-panel tm-engine-left" data-tm-engine-pane="left">
      <span class="chip">Operational Trust</span>
      <h3>Operational Trust Score</h3>
      <strong class="tm-engine-score">72</strong>
      <p>Conditional approval. Evidence closure required before full trust.</p>
    </aside>
    <main class="tm-engine-map-panel" data-tm-engine-pane="center">
      <div class="tm-engine-toolbar" data-tm-engine-toolbar>
        <button type="button" data-tm-engine-view="fit">Fit Map</button>
        <button type="button" data-tm-engine-view="kernel">Kernel View</button>
        <button type="button" data-tm-engine-view="domain">Domain View</button>
        <button type="button" data-tm-engine-view="object">Object View</button>
      </div>
      <div class="tm-engine-viewport" data-tm-engine-viewport>
        <div class="tm-engine-world" data-tm-engine-world></div>
      </div>
    </main>
    <aside class="tm-engine-panel tm-engine-right" data-tm-engine-pane="right">
      <span class="chip">Selected Asset</span>
      <div data-tm-engine-inspector></div>
    </aside>
  `;
  return shell;
}

export function getTrustMapEngineWorld(root){
  return root?.querySelector?.('[data-tm-engine-world]') || null;
}

export function getTrustMapEngineInspector(root){
  return root?.querySelector?.('[data-tm-engine-inspector]') || null;
}

export function installTrustMapEngineLayoutStyles(){
  if(document.querySelector('#trustmap-engine-layout-style-20260602-1915')) return;
  const style = document.createElement('style');
  style.id = 'trustmap-engine-layout-style-20260602-1915';
  style.textContent = `
    .tm-engine-shell{display:grid;grid-template-columns:minmax(260px,310px) minmax(620px,1fr) minmax(300px,360px);gap:18px;align-items:stretch;width:100%}
    .tm-engine-panel,.tm-engine-map-panel{border:1px solid rgba(146,205,232,.24);border-radius:20px;background:rgba(3,12,22,.78);box-shadow:0 0 24px rgba(66,215,255,.08);padding:16px;color:var(--text,#eaf7ff)}
    .tm-engine-map-panel{min-height:720px;overflow:hidden;position:relative;background:radial-gradient(circle at 50% 42%,rgba(66,215,255,.10),transparent 32rem),#02050b}
    .tm-engine-toolbar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;position:relative;z-index:5}
    .tm-engine-toolbar button{border-radius:10px;padding:8px 10px;font-size:.78rem}
    .tm-engine-viewport{height:640px;position:relative;overflow:hidden;border-radius:18px;background:radial-gradient(circle at center,rgba(66,215,255,.08),transparent 28rem),#02050b}
    .tm-engine-world{position:absolute;inset:0;transform-origin:center center}
    .tm-engine-node{position:absolute;display:grid;place-items:center;text-align:center;color:#fff;cursor:pointer}
    .tm-engine-node-label{margin-top:8px;padding:3px 7px;border-radius:8px;background:rgba(0,0,0,.76);border:1px solid rgba(223,249,255,.12);font-weight:900;font-size:.82rem;line-height:1.1;text-shadow:0 0 10px #000}
    .tm-engine-asset-frame{display:grid;place-items:center;position:relative;overflow:hidden;background:#000;isolation:isolate}
    .tm-engine-asset-frame-square-black{width:168px;height:168px;border-radius:20px;border:1px solid rgba(223,249,255,.14);box-shadow:0 0 0 1px rgba(66,215,255,.08),0 0 18px rgba(66,215,255,.10)}
    .tm-engine-asset-frame-square-black:before{content:'';position:absolute;inset:0;background:#000;z-index:0}
    .tm-engine-asset-frame-square-black img{position:absolute;inset:0;width:168px;height:168px;object-fit:cover;object-position:center;background:#000;z-index:1}
    .tm-engine-asset-frame-kernel{width:282px;height:282px;border-radius:999px;background:radial-gradient(ellipse at 50% 54%,rgba(2,5,11,.98),rgba(2,5,11,.65) 58%,transparent 74%)}
    .tm-engine-asset-frame-kernel img{width:282px;height:282px;object-fit:contain;display:block}
    .tm-engine-score{display:block;font-size:3rem;color:#fff;margin:.35rem 0}
    @media(max-width:1100px){.tm-engine-shell{grid-template-columns:1fr}.tm-engine-map-panel{min-height:680px}.tm-engine-viewport{height:600px}}
  `;
  document.head.appendChild(style);
}
