// V60.3.24 TrustMap Render Lifecycle Controller
// Purpose: provide one traceable lifecycle path for TrustMap readiness instead of scattered timing assumptions.
// Boundary: static advisory prototype only. No live scoring, live retrieval beyond static repo assets, workflow automation, enforcement, or backend persistence.

const V60324_EVENTS = {
  requested: 'cybershield:trustmap-requested',
  stackLoadStarted: 'cybershield:trustmap-stack-load-started',
  stackLoaded: 'cybershield:trustmap-stack-loaded',
  manifestLoaded: 'cybershield:trustmap-asset-manifest-loaded',
  imagesPrewarmStarted: 'cybershield:trustmap-images-prewarm-started',
  imagesPrewarmed: 'cybershield:trustmap-images-prewarmed',
  renderDetected: 'cybershield:trustmap-render-detected',
  viewModeChanged: 'cybershield:trustmap-view-mode-changed',
  visualStabilized: 'cybershield:trustmap-visual-stabilized'
};

const v60324State = {
  build: 'V60.3.24 TrustMap Render Lifecycle Controller',
  created_at: new Date().toISOString(),
  trustmap_requested: false,
  stack_load_started: false,
  stack_loaded: false,
  manifest_loaded: false,
  image_prewarm_started: false,
  images_prewarmed: false,
  render_detected: false,
  visual_stabilized: false,
  last_event: 'controller_initialized',
  events: [],
  counters: {
    trustmap_requested: 0,
    stack_load_started: 0,
    stack_loaded: 0,
    manifest_loaded: 0,
    image_prewarm_started: 0,
    images_prewarmed: 0,
    render_detected: 0,
    view_mode_changed: 0,
    visual_stabilized: 0
  },
  current_view_mode: null,
  render_observer_active: false
};

let v60324StabilizeTimer = null;
let v60324RenderObserver = null;

function v60324$(selector, root = document){ return root.querySelector(selector); }
function v60324Now(){ return Math.round(performance.now()); }

function v60324Record(name, detail = {}){
  v60324State.last_event = name;
  if(Object.prototype.hasOwnProperty.call(v60324State.counters, name)){
    v60324State.counters[name] += 1;
  }
  v60324State.events.push({ name, at_ms: v60324Now(), detail });
  if(v60324State.events.length > 18) v60324State.events.shift();
  v60324MarkMeta();
}

function v60324Emit(type, detail = {}){
  document.dispatchEvent(new CustomEvent(type, { detail: { ...detail, lifecycle_build: v60324State.build } }));
}

function v60324RequestTrustMap(detail = {}){
  v60324State.trustmap_requested = true;
  v60324Record('trustmap_requested', detail);
  v60324Emit(V60324_EVENTS.requested, detail);
  v60324StartRenderObserver();
  v60324ScheduleStabilized('trustmap-requested');
}

function v60324StackLoadStarted(detail = {}){
  v60324State.stack_load_started = true;
  v60324Record('stack_load_started', detail);
  v60324Emit(V60324_EVENTS.stackLoadStarted, detail);
  v60324StartRenderObserver();
}

function v60324RenderDetected(detail = {}){
  v60324State.render_detected = true;
  v60324Record('render_detected', detail);
  v60324Emit(V60324_EVENTS.renderDetected, detail);
  v60324ScheduleStabilized('render-detected');
}

function v60324ViewModeChanged(mode, detail = {}){
  v60324State.current_view_mode = mode || v60324State.current_view_mode || 'unknown';
  v60324Record('view_mode_changed', { mode: v60324State.current_view_mode, ...detail });
  v60324Emit(V60324_EVENTS.viewModeChanged, { mode: v60324State.current_view_mode, ...detail });
  v60324ScheduleStabilized('view-mode-changed');
}

function v60324ScheduleStabilized(reason = 'unknown'){
  if(v60324StabilizeTimer) window.clearTimeout(v60324StabilizeTimer);
  v60324StabilizeTimer = window.setTimeout(() => {
    v60324State.visual_stabilized = true;
    v60324Record('visual_stabilized', { reason });
    v60324Emit(V60324_EVENTS.visualStabilized, { reason });
  }, 420);
}

function v60324CheckRendered(){
  const trustmap = v60324$('#trustmap');
  if(!trustmap) return;
  const hasShell = Boolean(v60324$('.v554-shell', trustmap));
  const hasWorld = Boolean(v60324$('#v554World', trustmap));
  const hasKernel = Boolean(v60324$('.v554-kernel', trustmap));
  if(hasShell && hasWorld && !v60324State.render_detected){
    v60324RenderDetected({ has_shell: hasShell, has_world: hasWorld, has_kernel: hasKernel });
  }
}

function v60324StartRenderObserver(){
  if(v60324RenderObserver) return;
  const trustmap = v60324$('#trustmap');
  if(!trustmap) return;
  v60324RenderObserver = new MutationObserver(() => {
    v60324CheckRendered();
    v60324ScheduleStabilized('trustmap-mutation');
  });
  v60324RenderObserver.observe(trustmap, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style', 'data-view-mode'] });
  v60324State.render_observer_active = true;
  v60324Record('render_observer_started', { scope: '#trustmap' });
  v60324CheckRendered();
}

function v60324InferViewModeFromText(text){
  const normalized = String(text || '').trim().toLowerCase();
  if(!normalized) return null;
  if(normalized.includes('fit map')) return 'fit-map';
  if(normalized.includes('kernel view')) return 'kernel-view';
  if(normalized.includes('domain view')) return 'domain-view';
  if(normalized.includes('object view')) return 'object-view';
  if(normalized === '+' || normalized.includes('zoom in')) return 'zoom-in';
  if(normalized === '-' || normalized === '−' || normalized.includes('zoom out')) return 'zoom-out';
  return null;
}

function v60324InstallHandlers(){
  if(window.__v60324LifecycleHandlers) return;
  window.__v60324LifecycleHandlers = true;

  document.addEventListener('click', event => {
    const target = event.target;
    if(target.closest?.('#mainNav button[data-view="trustmap"], [data-v6033-route="trustmap"]')){
      v60324RequestTrustMap({ source: 'click' });
    }
    if(target.closest?.('#trustmap')){
      const mode = v60324InferViewModeFromText(target.textContent || target.getAttribute?.('aria-label') || '');
      if(mode) v60324ViewModeChanged(mode, { source: 'click' });
    }
  }, true);

  document.addEventListener('input', event => {
    if(event.target.closest?.('#trustmap')) v60324ViewModeChanged('slider-or-input', { source: 'input' });
  }, true);

  document.addEventListener('wheel', event => {
    if(event.target.closest?.('#trustmap')) v60324ViewModeChanged('wheel-zoom-or-pan', { source: 'wheel' });
  }, { capture: true, passive: true });

  document.addEventListener(V60324_EVENTS.stackLoaded, event => {
    v60324State.stack_loaded = true;
    v60324Record('stack_loaded', event.detail || {});
    v60324StartRenderObserver();
    setTimeout(v60324CheckRendered, 120);
  });

  document.addEventListener(V60324_EVENTS.manifestLoaded, event => {
    v60324State.manifest_loaded = true;
    v60324Record('manifest_loaded', event.detail || {});
  });

  document.addEventListener(V60324_EVENTS.imagesPrewarmStarted, event => {
    v60324State.image_prewarm_started = true;
    v60324Record('image_prewarm_started', event.detail || {});
  });

  document.addEventListener(V60324_EVENTS.imagesPrewarmed, event => {
    v60324State.images_prewarmed = true;
    v60324Record('images_prewarmed', event.detail || {});
    v60324ScheduleStabilized('images-prewarmed');
  });

  window.addEventListener('hashchange', () => {
    if(location.hash === '#trustmap') v60324RequestTrustMap({ source: 'hashchange' });
  });
}

function v60324MarkMeta(){
  const payload = v60324$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.trustmap_render_lifecycle = {
      build: v60324State.build,
      status: 'active_lifecycle_trace',
      rule: 'Track TrustMap request, stack loading, manifest, prewarm, render detection, view-mode changes, and visual stabilization without taking over the renderer.',
      last_event: v60324State.last_event,
      state: {
        trustmap_requested: v60324State.trustmap_requested,
        stack_load_started: v60324State.stack_load_started,
        stack_loaded: v60324State.stack_loaded,
        manifest_loaded: v60324State.manifest_loaded,
        image_prewarm_started: v60324State.image_prewarm_started,
        images_prewarmed: v60324State.images_prewarmed,
        render_detected: v60324State.render_detected,
        visual_stabilized: v60324State.visual_stabilized,
        current_view_mode: v60324State.current_view_mode,
        render_observer_active: v60324State.render_observer_active
      },
      counters: v60324State.counters,
      recent_events: v60324State.events,
      github_pages_browser_qa_required: true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

window.CyberShieldTrustMapLifecycleV60324 = {
  state: v60324State,
  events: V60324_EVENTS,
  requestTrustMap: v60324RequestTrustMap,
  stackLoadStarted: v60324StackLoadStarted,
  renderDetected: v60324RenderDetected,
  viewModeChanged: v60324ViewModeChanged,
  markMeta: v60324MarkMeta
};

v60324InstallHandlers();
setTimeout(() => { v60324StartRenderObserver(); v60324MarkMeta(); }, 1000);
