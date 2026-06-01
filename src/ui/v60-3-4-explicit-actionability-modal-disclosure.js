// V60.3.4 Explicit Actionability and Modal Disclosure Architecture
// Purpose: replace brittle broad patches with registry-backed routes, explicit modal disclosure,
// red/yellow/green urgency meters, and Settings-only metadata visibility rules.

const V6034_TARGETS_PATH = 'data/ui/v60-3-4-actionability-targets.json';
const V6034_STATE = { registry: null };

function v6034$(selector, root = document){ return root.querySelector(selector); }
function v6034$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v6034Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v6034LoadRegistry(){
  if(V6034_STATE.registry) return V6034_STATE.registry;
  const response = await fetch(V6034_TARGETS_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`V60.3.4 action target registry fetch failed: ${response.status}`);
  V6034_STATE.registry = await response.json();
  window.CyberShieldActionabilityTargetsV6034 = V6034_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:actionability-targets-loaded', { detail: { registry: V6034_STATE.registry } }));
  return V6034_STATE.registry;
}

function v6034ActiveView(){ return document.querySelector('#briefing.active,#trustmap.active,#runtime.active,#evidence.active,#proof.active,#architecture.active,#settings.active'); }
function v6034ViewId(){ return v6034ActiveView()?.id || ''; }
function v6034IsSettings(){ return v6034ViewId() === 'settings'; }
function v6034Targets(){ return V6034_STATE.registry?.route_targets || []; }
function v6034Modals(){ return V6034_STATE.registry?.modal_targets || []; }

function v6034InstallStyles(){
  if(v6034$('#v60-3-4-explicit-actionability-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-4-explicit-actionability-style';
  style.textContent = `
    .v6034-actionable{cursor:pointer;position:relative;transition:box-shadow .15s ease, outline-color .15s ease}.v6034-actionable:hover{outline:1px solid rgba(66,215,255,.48);box-shadow:0 0 18px rgba(66,215,255,.16)}.v6034-actionable-badge{display:inline-flex;border:1px solid rgba(66,215,255,.32);border-radius:999px;padding:2px 7px;font-size:.58rem;text-transform:uppercase;color:#8fd6ff;background:rgba(3,13,24,.82);margin-left:6px;vertical-align:middle}.v6034-urgency{margin:8px 0 7px}.v6034-urgency-strip{position:relative;height:14px;border-radius:999px;background:linear-gradient(90deg,#ff4c4c 0 33%,#ffd166 33% 66%,#25e69b 66% 100%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.18),0 0 12px rgba(66,215,255,.12)}.v6034-urgency-marker{position:absolute;top:-5px;left:var(--pos,48%);transform:translateX(-50%);width:22px;height:22px;border-radius:50%;background:#061726;border:3px solid #fff;box-shadow:0 0 13px rgba(255,255,255,.55)}.v6034-urgency-labels{display:flex;justify-content:space-between;font-size:.62rem;text-transform:uppercase;letter-spacing:.05em;color:#bfefff;margin-top:5px}.v6034-disclosure{border:1px solid rgba(66,215,255,.22);border-radius:16px;background:rgba(3,13,24,.72);padding:11px;margin:10px 0;color:#dff7ff}.v6034-disclosure strong{color:#fff}.v6034-disclosure p{margin:5px 0;color:#bfefff;line-height:1.42}.v6034-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer;display:inline-flex;margin:4px 6px 4px 0}.v6034-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v6034-modal{position:fixed;inset:0;z-index:10034;display:grid;place-items:center;background:rgba(0,0,0,.68);padding:20px}.v6034-modal-card{width:min(1040px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v6034-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v6034-modal-card h2{margin:0;color:#fff}.v6034-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}.v6034-route-flash{position:fixed;right:18px;bottom:18px;z-index:10035;max-width:380px;border:1px solid rgba(66,215,255,.4);background:rgba(3,13,24,.96);box-shadow:0 18px 40px rgba(0,0,0,.35),0 0 22px rgba(66,215,255,.18);border-radius:16px;padding:12px;color:#dff7ff;font-size:.85rem}.v6034-route-flash strong{display:block;color:#fff;margin-bottom:4px}.v6034-hide-outside-settings{display:none!important}
  `;
  document.head.appendChild(style);
}

function v6034FindTargetByText(text){
  const lowered = String(text || '').toLowerCase();
  return v6034Targets().find(target => (target.labels || []).some(label => lowered.includes(String(label).toLowerCase())));
}

function v6034RouteTo(target){
  if(!target) return;
  const btn = document.querySelector(`#mainNav button[data-view="${target.target_view}"]`);
  if(btn) btn.click();
  setTimeout(() => v6034Flash('Opened target', target.message || target.route_label || 'Opened requested target.'), 200);
}

function v6034Flash(title, message){
  v6034$('.v6034-route-flash')?.remove();
  const el = document.createElement('div');
  el.className = 'v6034-route-flash';
  el.innerHTML = `<strong>${v6034Esc(title)}</strong>${v6034Esc(message)}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

function v6034AddBadge(el, target){
  if(!el || el.dataset.v6034Badge === 'true') return;
  el.dataset.v6034Badge = 'true';
  const badge = document.createElement('span');
  badge.className = 'v6034-actionable-badge';
  badge.textContent = target?.route_label || 'Open';
  const anchor = el.querySelector('strong,h1,h2,h3,button') || el;
  anchor.appendChild(badge);
}

function v6034MarkExplicitActionables(){
  const view = v6034ActiveView();
  if(!view || v6034IsSettings()) return;

  const selectors = [
    '#v6033FirstLayer .v6033-card',
    '#v6033FirstLayer .v6033-posture',
    '#v6033FirstLayer .v6033-decision',
    '.control-card',
    '.metric-card',
    '[data-action-target]',
    '[data-drilldown]',
    '[data-route-target]'
  ];

  selectors.forEach(selector => {
    v6034$$(selector, view).forEach(el => {
      if(el.dataset.v6034Ready === 'true') return;
      const target = el.dataset.actionTarget ? v6034Targets().find(t => t.id === el.dataset.actionTarget) : v6034FindTargetByText(el.textContent || '');
      if(!target) return;
      el.dataset.v6034Ready = 'true';
      el.dataset.v6034TargetId = target.id;
      el.classList.add('v6034-actionable');
      v6034AddBadge(el, target);
    });
  });
}

function v6034UrgencyPosition(level){
  const map = V6034_STATE.registry?.urgency_meter?.positions || {};
  return map[level] || map.needs_verification || '48%';
}

function v6034UrgencyLevel(text){
  const value = String(text || '').toLowerCase();
  if(/critical|high urgency|patient|clinical|healthcare|payment|fraud|block|refuse/.test(value)) return 'critical';
  if(/high|escalate|missing|evidence gap/.test(value)) return 'high';
  if(/needs verification|verify|verification/.test(value)) return 'needs_verification';
  if(/trusted|strong|allow/.test(value)) return 'trusted';
  return 'moderate';
}

function v6034UrgencyHtml(level){
  const labels = V6034_STATE.registry?.urgency_meter?.labels || ['Urgent','Verify','Trusted'];
  const pos = v6034UrgencyPosition(level);
  return `<div class="v6034-urgency" data-urgency="${v6034Esc(level)}"><div class="v6034-urgency-strip" style="--pos:${v6034Esc(pos)}"><span class="v6034-urgency-marker"></span></div><div class="v6034-urgency-labels"><span>${v6034Esc(labels[0])}</span><span>${v6034Esc(labels[1])}</span><span>${v6034Esc(labels[2])}</span></div></div>`;
}

function v6034ApplyUrgencyMeters(){
  const view = v6034ActiveView();
  if(!view || v6034IsSettings()) return;
  const candidates = v6034$$('.control-card,.metric-card,#v6033FirstLayer .v6033-decision,#v6033FirstLayer .v6033-posture,#v6033FirstLayer .v6033-card', view);
  candidates.forEach(el => {
    if(el.dataset.v6034Urgency === 'true') return;
    const text = el.textContent || '';
    if(!/needs verification|escalate|constrain|evidence gap|healthcare|patient|clinical|risk|missing/i.test(text)) return;
    el.dataset.v6034Urgency = 'true';
    const level = v6034UrgencyLevel(text);
    const anchor = el.querySelector('strong,h1,h2,h3,p,span') || el;
    anchor.insertAdjacentHTML('afterend', v6034UrgencyHtml(level));
  });
}

function v6034OpenModal(title, html){
  v6034$('.v6034-modal')?.remove();
  const modal = document.createElement('div');
  modal.className = 'v6034-modal';
  modal.innerHTML = `<section class="v6034-modal-card" role="dialog" aria-modal="true" aria-label="${v6034Esc(title)}"><header><div><h2>${v6034Esc(title)}</h2><p>Opened on demand so the workspace stays focused.</p></div><button type="button" class="v6034-close" data-v6034-close>Close</button></header>${html}</section>`;
  document.body.appendChild(modal);
}

function v6034ApplyModalDisclosure(){
  const view = v6034ActiveView();
  if(!view || v6034IsSettings()) return;
  v6034Modals().forEach(def => {
    v6034$$(def.source_selector, view).forEach(block => {
      if(block.dataset.v6034Modalized === 'true') return;
      if(block.closest('#v6033FirstLayer')) return;
      block.dataset.v6034Modalized = 'true';
      const detailHtml = block.outerHTML;
      const wrapper = document.createElement('section');
      wrapper.className = 'v6034-disclosure';
      wrapper.innerHTML = `<strong>${v6034Esc(def.modal_title)}</strong><p>This supporting detail is available on demand.</p><button type="button" class="v6034-btn" data-v6034-modal="${v6034Esc(def.id)}">${v6034Esc(def.button_label)}</button>`;
      wrapper.querySelector('button').__v6034DetailHtml = detailHtml;
      wrapper.querySelector('button').__v6034Title = def.modal_title;
      block.insertAdjacentElement('beforebegin', wrapper);
      block.classList.add('v6034-hide-outside-settings');
    });
  });
}

function v6034HideKnownMetadataBlocks(){
  const view = v6034ActiveView();
  if(!view || v6034IsSettings()) return;
  ['.v6033-boundary','.v603-boundary','.v602-boundary','.v60-boundary'].forEach(selector => {
    v6034$$(selector, view).forEach(el => {
      if(el.closest('.v6034-modal')) return;
      el.classList.add('v6034-hide-outside-settings');
    });
  });
}

function v6034ImproveFirstLayerRoutes(){
  const view = v6034ActiveView();
  if(!view || view.id !== 'briefing') return;
  v6034$$("#v6033FirstLayer .v6033-card", view).forEach(card => {
    const target = v6034FindTargetByText(card.textContent || '');
    if(!target) return;
    card.dataset.v6034TargetId = target.id;
    card.classList.add('v6034-actionable');
    v6034AddBadge(card, target);
  });
}

function v6034MarkMeta(){
  const payload = v6034$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.4 Explicit Actionability and Modal Disclosure Architecture';
    parsed.version = 'V60.3.4';
    parsed.previous_operational_build = 'V60.3.3 First-Layer Decision Brief and TrustMap Snapshot';
    parsed.explicit_actionability_modal_disclosure = {
      status: 'active_registry_backed_layer',
      registry: V6034_TARGETS_PATH,
      doctrine: V6034_STATE.registry?.doctrine,
      metadata_visibility_rule: V6034_STATE.registry?.metadata_visibility_rule,
      github_pages_browser_qa_required: true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v6034Apply(){
  v6034InstallStyles();
  v6034MarkExplicitActionables();
  v6034ApplyUrgencyMeters();
  v6034ApplyModalDisclosure();
  v6034HideKnownMetadataBlocks();
  v6034ImproveFirstLayerRoutes();
  v6034MarkMeta();
}

function v6034Handlers(){
  if(window.__v6034Handlers) return;
  window.__v6034Handlers = true;
  document.addEventListener('click', event => {
    const modalBtn = event.target.closest('[data-v6034-modal]');
    if(modalBtn){ v6034OpenModal(modalBtn.__v6034Title || 'Supporting detail', modalBtn.__v6034DetailHtml || '<p>No detail captured.</p>'); return; }
    if(event.target.closest('[data-v6034-close]') || (event.target.classList && event.target.classList.contains('v6034-modal'))){ v6034$('.v6034-modal')?.remove(); return; }
    const actionable = event.target.closest('[data-v6034-target-id]');
    if(actionable){
      const target = v6034Targets().find(t => t.id === actionable.dataset.v6034TargetId);
      v6034RouteTo(target);
      return;
    }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v6033-route],[data-v603-score],[data-v603-model],[data-v602-open],[data-v60-open]')){
      setTimeout(v6034Apply, 1200);
      setTimeout(v6034Apply, 2600);
    }
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v6034$('.v6034-modal')?.remove(); });
}

v6034Handlers();
v6034LoadRegistry().then(() => setTimeout(v6034Apply, 9200)).catch(error => console.warn('CyberShield V60.3.4 explicit actionability registry unavailable', error));
window.addEventListener('load', () => setTimeout(v6034Apply, 10800), { once:true });
setTimeout(v6034Apply, 13200);
