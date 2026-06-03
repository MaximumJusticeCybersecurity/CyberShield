// 20260602-2010 TrustMap Engine Layout Runtime Hardening
// Boundary: new engine only. No legacy TrustMap runtime changes.

export function createTrustMapEngineLayout(){
  const shell = document.createElement('section');
  shell.className = 'tm-engine-shell';
  shell.dataset.trustmapEngine = 'runtime-layout';
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
    .tm-engine-shell{display:grid;grid-template-columns:1fr;gap:18px;align-items:stretch;width:100%;max-width:100%;overflow:visible}
    .tm-engine-panel,.tm-engine-map-panel{border:1px solid rgba(146,205,232,.24);border-radius:20px;background:rgba(3,12,22,.78);box-shadow:0 0 24px rgba(66,215,255,.08);padding:16px;color:var(--text,#eaf7ff);box-sizing:border-box}
    .tm-engine-left,.tm-engine-right{display:grid;gap:8px}
    .tm-engine-map-panel{min-height:760px;overflow:hidden;position:relative;background:radial-gradient(circle at 50% 42%,rgba(66,215,255,.10),transparent 32rem),#02050b}
    .tm-engine-toolbar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;position:relative;z-index:20}
    .tm-engine-toolbar button{border-radius:10px;padding:8px 10px;font-size:.78rem;border:1px solid rgba(146,205,232,.28);background:rgba(255,255,255,.06);color:var(--text,#eaf7ff)}
    .tm-engine-toolbar button[data-tm-engine-view-active="true"]{border-color:#42d7ff;background:rgba(66,215,255,.16);box-shadow:0 0 0 3px rgba(66,215,255,.10)}
    .tm-engine-viewport{height:680px;position:relative;overflow:hidden;border-radius:18px;background:radial-gradient(circle at center,rgba(66,215,255,.08),transparent 28rem),#02050b;border:1px solid rgba(66,215,255,.12)}
    .tm-engine-world{position:absolute;inset:0;transform-origin:center center;overflow:visible;z-index:1;transition:transform .18s ease}
    .tm-engine-connectors{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none}
    .tm-engine-node{position:absolute;display:grid!important;place-items:center;text-align:center;color:#fff;cursor:pointer;background:transparent!important;border:0!important;padding:0!important;margin:0!important;appearance:none!important;-webkit-appearance:none!important;overflow:visible!important;min-width:max-content;z-index:10;transition:filter .16s ease,transform .16s ease}
    .tm-engine-node-kernel{z-index:14}
    .tm-engine-node-layer1-domain{z-index:18}
    .tm-engine-node[data-tm-engine-selected="true"] .tm-engine-asset-frame{border-color:#42d7ff!important;box-shadow:0 0 0 2px rgba(66,215,255,.38),0 0 28px rgba(66,215,255,.28),0 12px 24px rgba(0,0,0,.62)!important}
    .tm-engine-node:hover .tm-engine-asset-frame{filter:brightness(1.08)}
    .tm-engine-node-label{margin-top:8px;padding:3px 7px;border-radius:8px;background:rgba(0,0,0,.82);border:1px solid rgba(223,249,255,.18);font-weight:900;font-size:.82rem;line-height:1.1;text-shadow:0 0 10px #000;max-width:176px;white-space:normal}
    .tm-engine-node[data-tm-engine-selected="true"] .tm-engine-node-label{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.22)}
    .tm-engine-asset-frame{display:grid;place-items:center;position:relative;overflow:hidden;background:#000;isolation:isolate;flex:0 0 auto}
    .tm-engine-asset-frame-square-black{width:168px;height:168px;border-radius:20px;border:2px solid rgba(223,249,255,.24);box-shadow:0 0 0 1px rgba(66,215,255,.16),0 0 24px rgba(66,215,255,.18),0 12px 24px rgba(0,0,0,.6)}
    .tm-engine-asset-frame-square-black:before{content:'';position:absolute;inset:0;background:#000;z-index:0}
    .tm-engine-asset-frame-square-black img{position:absolute;inset:0;width:168px;height:168px;object-fit:cover;object-position:center;background:#000;z-index:2;display:block;opacity:1}
    .tm-engine-asset-frame-square-black img[data-trustmap-engine-image-error="true"]{opacity:.18}
    .tm-engine-asset-frame-kernel{width:282px;height:282px;border-radius:999px;background:radial-gradient(ellipse at 50% 54%,rgba(2,5,11,.98),rgba(2,5,11,.65) 58%,transparent 74%)}
    .tm-engine-asset-frame-kernel img{width:282px;height:282px;object-fit:contain;display:block}
    .tm-engine-score{display:block;font-size:3rem;color:#fff;margin:.35rem 0}
    @media(min-width:1200px){.tm-engine-shell{grid-template-columns:minmax(240px,300px) minmax(0,1fr) minmax(280px,340px)}.tm-engine-map-panel{min-height:760px}.tm-engine-viewport{height:680px}}
  `;
  document.head.appendChild(style);
}
