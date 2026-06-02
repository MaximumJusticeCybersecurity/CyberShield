// V60.3.16 TrustMap Centerline Fiber Connectors and Three-Pane Separation
// Purpose: draw center-to-center fiber-optic connectors behind TrustMap objects and align the left, center, and right panes.
// Boundary: static advisory prototype only. No live scoring, evidence retrieval, workflow automation, or enforcement.

function v60316$(selector, root=document){ return root.querySelector(selector); }
function v60316$$(selector, root=document){ return Array.from(root.querySelectorAll(selector)); }
function v60316Num(value){ return Number(String(value || '0').replace('px','')) || 0; }
function v60316StoplightForDomain(domain){
  const el = v60316$(`#trustmap.active .v554-domain[data-v554-domain="${domain}"]`);
  return el ? getComputedStyle(el).getPropertyValue('--v60313-stoplight').trim() || '#dff9ff' : '#dff9ff';
}
function v60316PointFromStyle(el){
  if(!el) return null;
  return { x:v60316Num(el.style.left), y:v60316Num(el.style.top) };
}
function v60316CorePoint(){ return {x:900,y:700}; }
function v60316Line(from,to,kind,domain,active){
  const color = active ? v60316StoplightForDomain(domain) : '#dff9ff';
  const core = kind === 'core';
  const width = core ? 5.2 : kind === 'asset' ? 2.8 : 1.9;
  const opacity = core ? .98 : kind === 'asset' ? .78 : .54;
  const dash = kind === 'tag' ? ' stroke-dasharray="7 10"' : kind === 'cross' ? ' stroke-dasharray="12 12"' : '';
  return `<line class="v60316-fiber ${kind} ${active?'active':''}" data-domain="${domain||''}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${color}" stroke-width="${width}" opacity="${opacity}"${dash}/>`;
}
function v60316InstallStyles(){
  if(v60316$('#v60-3-16-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-16-style';
  style.textContent = `
    #trustmap.active .v554-shell{
      display:grid!important;
      grid-template-columns:minmax(300px,320px) minmax(760px,1fr) minmax(330px,370px)!important;
      gap:22px!important;
      align-items:stretch!important;
      overflow:visible!important;
    }
    #trustmap.active .v554-shell > .v554-panel,
    #trustmap.active .v554-map-panel{
      align-self:stretch!important;
      min-height:760px!important;
      max-height:760px!important;
      margin-top:0!important;
      margin-bottom:0!important;
      box-sizing:border-box!important;
    }
    #trustmap.active .v554-shell > .v554-panel{
      overflow-y:auto!important;
      overflow-x:hidden!important;
    }
    #trustmap.active .v554-map-panel{
      overflow:hidden!important;
      z-index:5!important;
    }
    #trustmap.active .v554-viewport{
      min-height:760px!important;
      overflow:hidden!important;
    }
    #trustmap.active .v554-edges{
      opacity:0!important;
      visibility:hidden!important;
    }
    #trustmap.active .v60316-fiber-edges{
      position:absolute;
      inset:0;
      z-index:3;
      pointer-events:none;
      overflow:visible;
      mix-blend-mode:screen;
    }
    #trustmap.active .v60316-fiber{
      stroke-linecap:round;
      vector-effect:non-scaling-stroke;
      filter:
        drop-shadow(0 0 3px rgba(255,255,255,.95))
        drop-shadow(0 0 8px rgba(110,234,255,.82))
        drop-shadow(0 0 18px rgba(66,215,255,.34));
    }
    #trustmap.active .v60316-fiber.active{
      filter:
        drop-shadow(0 0 4px rgba(255,255,255,.98))
        drop-shadow(0 0 12px currentColor)
        drop-shadow(0 0 28px currentColor);
      opacity:1;
    }
    #trustmap.active .v60316-fiber.core{
      stroke-dasharray:2 9 18 5;
      animation:v60316FiberFlow 6s linear infinite;
    }
    #trustmap.active .v60316-fiber.asset{
      stroke-dasharray:2 8 14 6;
      animation:v60316FiberFlow 7.5s linear infinite;
    }
    #trustmap.active .v60316-fiber.tag{
      animation:v60316FiberFlow 9s linear infinite;
    }
    #trustmap.active .v554-kernel,
    #trustmap.active .v554-domain,
    #trustmap.active .v554-asset,
    #trustmap.active .v554-tag{
      z-index:18!important;
    }
    #trustmap.active .v554-domain{
      z-index:24!important;
    }
    #trustmap.active .v554-kernel{
      z-index:28!important;
    }
    @keyframes v60316FiberFlow{
      to{ stroke-dashoffset:-120; }
    }
  `;
  document.head.appendChild(style);
}
function v60316BuildEdges(){
  const trustmap = v60316$('#trustmap.active');
  const world = v60316$('#trustmap.active #v554World');
  if(!trustmap || !world) return;
  let svg = world.querySelector('.v60316-fiber-edges');
  if(!svg){
    svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.classList.add('v60316-fiber-edges');
    svg.setAttribute('viewBox','0 0 1800 1400');
    svg.setAttribute('preserveAspectRatio','none');
    world.insertBefore(svg, world.firstChild);
  }
  const selectedDomain = trustmap.querySelector('.v554-domain.v60312-selected')?.dataset.v554Domain || null;
  const center = v60316CorePoint();
  let lines = '';
  const domains = v60316$$('.v554-domain', world);
  domains.forEach(domainEl => {
    const domain = domainEl.dataset.v554Domain;
    const dp = v60316PointFromStyle(domainEl);
    if(!dp) return;
    const activeDomain = selectedDomain ? selectedDomain === domain : domainEl.classList.contains('active');
    lines += v60316Line(center, dp, 'core', domain, activeDomain);
    const assets = v60316$$(`.v554-asset[data-v554-domain="${domain}"]`, world);
    assets.forEach(assetEl => {
      const ap = v60316PointFromStyle(assetEl);
      if(!ap) return;
      const activeAsset = activeDomain || assetEl.classList.contains('active');
      lines += v60316Line(dp, ap, 'asset', domain, activeAsset);
      const ax = assetEl.dataset.v554Asset;
      const tags = v60316$$('.v554-tag', world).filter(tag => {
        const tx = v60316Num(tag.style.left);
        const ty = v60316Num(tag.style.top);
        const dx = tx - ap.x;
        const dy = ty - ap.y;
        return Math.sqrt(dx*dx + dy*dy) < 170;
      });
      tags.forEach(tagEl => {
        const tp = v60316PointFromStyle(tagEl);
        if(tp) lines += v60316Line(ap, tp, 'tag', domain, activeAsset && tagEl.classList.contains('focus'));
      });
    });
  });
  if(selectedDomain){
    const selectedEl = world.querySelector(`.v554-domain[data-v554-domain="${selectedDomain}"]`);
    const sp = v60316PointFromStyle(selectedEl);
    if(sp){
      domains.filter(d => d !== selectedEl && d.classList.contains('active')).forEach(other => {
        const op = v60316PointFromStyle(other);
        if(op) lines += v60316Line(sp, op, 'cross', selectedDomain, false);
      });
    }
  }
  svg.innerHTML = `<defs><filter id="v60316Glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>${lines}`;
}
function v60316MarkMeta(){
  const payload = v60316$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.16 TrustMap Centerline Fiber Connectors and Three-Pane Separation';
    parsed.version = 'V60.3.16';
    parsed.previous_operational_build = 'V60.3.15 Layer 1 Equal Ring Distribution';
    parsed.trustmap_centerline_fiber_connectors = {
      status:'active_visual_connector_layer',
      rule:'Draw center-to-center fiber optic connectors behind objects, keep rendered objects above connector lines, and align the left, center, and right panes to shared top/bottom bounds.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed,null,2);
  }catch{}
}
function v60316Apply(){
  if(!v60316$('#trustmap.active')) return;
  v60316InstallStyles();
  v60316BuildEdges();
  v60316MarkMeta();
}
function v60316Handlers(){
  if(window.__v60316Handlers) return;
  window.__v60316Handlers = true;
  ['mouseover','focusin','click','input','wheel','mouseup'].forEach(eventName => {
    document.addEventListener(eventName, () => setTimeout(v60316Apply, 80), true);
  });
}
v60316Handlers();
setTimeout(v60316Apply, 2500);
window.addEventListener('load', () => setTimeout(v60316Apply, 3000), {once:true});
setTimeout(v60316Apply, 3900);
