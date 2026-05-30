// V58.1 Runtime Action Queue
// Purpose: convert operational trust findings into a prioritized executive action queue.
// Boundary: static advisory prototype only. No live workflow, tickets, notifications, monitoring, evidence retrieval, or enforcement.

const V581_QUEUE_PATH = 'data/runtime/v58-1-runtime-action-queue.json';
const V581_STATE = { registry: null };

function v581$(selector, root = document){ return root.querySelector(selector); }
function v581Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v581LoadRegistry(){
  if(V581_STATE.registry) return V581_STATE.registry;
  const response = await fetch(V581_QUEUE_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Runtime Action Queue registry fetch failed: ${response.status}`);
  V581_STATE.registry = await response.json();
  window.CyberShieldRuntimeActionQueueV581 = V581_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:runtime-action-queue-loaded', { detail: { registry: V581_STATE.registry } }));
  return V581_STATE.registry;
}

function v581Items(){ return Array.isArray(V581_STATE.registry?.queue_items) ? V581_STATE.registry.queue_items.slice().sort((a,b)=>a.priority-b.priority) : []; }
function v581ActionColor(action){ return { Refuse:'#ff4c4c', Quarantine:'#ff6bba', Block:'#ff4c4c', Escalate:'#ff8a30', Constrain:'#ffd166', 'Allow with caveat':'#8fd6ff', Allow:'#25e69b' }[action] || '#42d7ff'; }
function v581StatusLabel(id){ return V581_STATE.registry?.proof_ready_statuses?.find(s => s.id === id)?.label || id; }
function v581StatusMeaning(id){ return V581_STATE.registry?.proof_ready_statuses?.find(s => s.id === id)?.meaning || ''; }

function v581InstallStyles(){
  if(v581$('#v58-1-action-queue-style')) return;
  const style = document.createElement('style');
  style.id = 'v58-1-action-queue-style';
  style.textContent = `
    .v581-queue{border:1px solid rgba(66,215,255,.32);border-radius:24px;background:linear-gradient(180deg,rgba(7,27,48,.95),rgba(3,13,24,.99));box-shadow:0 22px 48px rgba(0,0,0,.32),0 0 36px rgba(66,215,255,.1);padding:16px;margin:12px 0;color:#dff7ff}
    .v581-queue h2,.v581-queue h3{margin:0 0 8px;color:#fff}.v581-queue p{line-height:1.52}.v581-kicker{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(66,215,255,.4);border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v581-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px;margin-top:10px}.v581-item{border:1px solid rgba(66,215,255,.18);border-radius:16px;background:rgba(255,255,255,.045);padding:12px}.v581-item strong{color:#fff}.v581-small{font-size:.8rem;color:#bfefff}.v581-pill{display:inline-flex;align-items:center;gap:6px;border:1px solid currentColor;border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:var(--pill-color)}.v581-priority{font-size:1.25rem;font-weight:950;color:#fff}.v581-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v581-btn,.v581-route{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v581-btn:hover,.v581-route:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v581-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}
    .v581-modal{position:fixed;inset:0;z-index:10008;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v581-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v581-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v581-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}.v581-code{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:.76rem;background:rgba(0,0,0,.28);border:1px solid rgba(66,215,255,.16);border-radius:14px;padding:10px;overflow:auto}
  `;
  document.head.appendChild(style);
}

function v581ItemHtml(item){
  return `<article class="v581-item"><div><span class="v581-priority">#${v581Esc(item.priority)}</span> <span class="v581-pill" style="--pill-color:${v581ActionColor(item.runtime_action)}">${v581Esc(item.runtime_action)}</span></div><h3>${v581Esc(item.action_title)}</h3><p class="v581-small"><strong>Owner:</strong> ${v581Esc(item.owner)}</p><p class="v581-small"><strong>Evidence gap:</strong> ${v581Esc(item.evidence_gap)}</p><p class="v581-small"><strong>Risk if wrong:</strong> ${v581Esc(item.risk_if_wrong)}</p><p class="v581-small"><strong>Next move:</strong> ${v581Esc(item.recommended_next_move)}</p><p class="v581-small"><strong>Proof status:</strong> ${v581Esc(v581StatusLabel(item.proof_ready_status))} — ${v581Esc(v581StatusMeaning(item.proof_ready_status))}</p><button type="button" class="v581-route" data-v581-route="${v581Esc(item.route)}">Open ${v581Esc(item.route)}</button></article>`;
}

function v581QueueHtml(){
  const registry = V581_STATE.registry;
  if(!registry) return '';
  const critical = v581Items().filter(item => ['Refuse','Quarantine','Block','Escalate'].includes(item.runtime_action)).length;
  return `<section class="v581-queue"><span class="v581-kicker">Runtime Action Queue</span><h2>What should happen next?</h2><p>${v581Esc(registry.purpose)}</p><div class="v581-grid"><article class="v581-item"><strong>Total actions</strong><div class="v581-priority">${v581Esc(v581Items().length)}</div><p class="v581-small">Prioritized queue items</p></article><article class="v581-item"><strong>Escalation or stronger</strong><div class="v581-priority">${v581Esc(critical)}</div><p class="v581-small">Items requiring escalation, block, refusal, or quarantine posture</p></article><article class="v581-item"><strong>Proof readiness</strong><p class="v581-small">${v581Esc(registry.proof_ready_statuses?.map(s => s.label).join(' • ') || '')}</p></article></div><div class="v581-grid">${v581Items().map(v581ItemHtml).join('')}</div><div class="v581-actions"><button type="button" class="v581-btn" data-v581-open>Open queue trace</button><button type="button" class="v581-btn" data-v581-download>Download action queue</button></div><div class="v581-boundary"><strong>Boundary:</strong> ${v581Esc(registry.boundary)}</div></section>`;
}

function v581Route(route){
  const map = { runtime:'runtime', evidence:'evidence', proof:'proof', architecture:'architecture', briefing:'briefing', trustmap:'trustmap' };
  document.querySelector(`#mainNav button[data-view="${map[route] || route}"]`)?.click();
}

function v581TraceObject(){
  return {
    version: 'V58.1',
    product: 'CyberShield Executive OS',
    generated_at: new Date().toISOString(),
    purpose: V581_STATE.registry?.purpose,
    controlling_principle: V581_STATE.registry?.controlling_principle,
    queue_fields: V581_STATE.registry?.queue_fields,
    runtime_action_order: V581_STATE.registry?.runtime_action_order,
    queue_items: v581Items(),
    boundary: V581_STATE.registry?.boundary
  };
}

function v581OpenTrace(){
  v581InstallStyles();
  v581$('.v581-modal')?.remove();
  const modal = document.createElement('div');
  modal.className = 'v581-modal';
  modal.innerHTML = `<section class="v581-modal-card" role="dialog" aria-modal="true" aria-label="Runtime Action Queue Trace"><header><div><h2>Runtime Action Queue Trace</h2><p>${v581Esc(V581_STATE.registry?.controlling_principle || '')}</p></div><button type="button" class="v581-close" data-v581-close>Close</button></header><pre class="v581-code">${v581Esc(JSON.stringify(v581TraceObject(), null, 2))}</pre><div class="v581-boundary"><strong>Boundary:</strong> ${v581Esc(V581_STATE.registry?.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v581Download(){
  const trace = v581TraceObject();
  const lines = [
    'CyberShield Executive OS Runtime Action Queue',
    '',
    `Generated: ${trace.generated_at}`,
    `Build: ${trace.version}`,
    '',
    `Purpose: ${trace.purpose}`,
    `Doctrine: ${trace.controlling_principle}`,
    '',
    ...v581Items().map(item => [`#${item.priority}: ${item.action_title}`, `Runtime Action: ${item.runtime_action}`, `Owner: ${item.owner}`, `Evidence Gap: ${item.evidence_gap}`, `Risk If Wrong: ${item.risk_if_wrong}`, `Recommended Next Move: ${item.recommended_next_move}`, `Proof Ready Status: ${v581StatusLabel(item.proof_ready_status)}`, `Boundary: ${item.prototype_boundary}`, ''].join('\n')),
    `Global Boundary: ${trace.boundary}`
  ];
  const blob = new Blob([lines.join('\n')], { type:'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cybershield-v58-1-runtime-action-queue.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v581Inject(){
  const runtime = v581$('#runtime.active');
  if(runtime && !v581$('#v581RuntimeActionQueue', runtime)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v581RuntimeActionQueue';
    wrapper.innerHTML = v581QueueHtml();
    runtime.insertAdjacentElement('afterbegin', wrapper);
  }
  const briefing = v581$('#briefing.active');
  if(briefing && !v581$('#v581BriefingActionQueue', briefing)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v581BriefingActionQueue';
    wrapper.innerHTML = v581QueueHtml();
    briefing.appendChild(wrapper);
  }
}

function v581MarkMeta(){
  const payload = v581$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V58.1 Runtime Action Queue';
    parsed.version = 'V58.1';
    parsed.previous_operational_build = 'V58 Operational Trust Control Pane';
    parsed.runtime_action_queue = { status:'active', path: V581_QUEUE_PATH, item_count: v581Items().length, boundary: V581_STATE.registry?.boundary, github_pages_browser_qa_required:true };
    parsed.prototype_boundary = 'Static advisory prototype only. No live monitoring, live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, live claim extraction, live scoring, report delivery, workflow automation, ticketing, or live internet claim verification.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v581Apply(){ v581InstallStyles(); v581Inject(); v581MarkMeta(); }
function v581Handlers(){
  if(window.__v581Handlers) return;
  window.__v581Handlers = true;
  document.addEventListener('click', event => {
    const route = event.target.closest('[data-v581-route]');
    if(route){ v581Route(route.dataset.v581Route); return; }
    if(event.target.closest('[data-v581-open]')){ v581OpenTrace(); return; }
    if(event.target.closest('[data-v581-download]')){ v581Download(); return; }
    if(event.target.closest('[data-v581-close]') || (event.target.classList && event.target.classList.contains('v581-modal'))){ v581$('.v581-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v58-route],[data-v58-open],[data-v571-open],[data-v57-open],[data-v564-model],[data-v563-open],[data-v562-record],[data-v561-open]')) setTimeout(v581Apply, 950);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v581$('.v581-modal')?.remove(); });
}

v581Handlers();
v581LoadRegistry().then(() => setTimeout(v581Apply, 4700)).catch(error => console.warn('CyberShield V58.1 Runtime Action Queue unavailable', error));
window.addEventListener('load', () => setTimeout(v581Apply, 5400), { once:true });
setTimeout(v581Apply, 6200);
