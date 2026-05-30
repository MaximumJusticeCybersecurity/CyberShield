// V58.2 Runtime Action Queue to Proof Pack Trace Linkage
// Purpose: connect queue items to decision records, evidence items, Proof Pack sections, and board narrative language.
// Boundary: static advisory prototype only. No live evidence, tickets, notifications, enforcement, or workflow integrations.

const V582_LINKAGE_PATH = 'data/runtime/v58-2-queue-proof-trace-linkage.json';
const V582_STATE = { registry: null };

function v582$(selector, root = document){ return root.querySelector(selector); }
function v582$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v582Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v582LoadRegistry(){
  if(V582_STATE.registry) return V582_STATE.registry;
  const response = await fetch(V582_LINKAGE_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Queue Proof Trace linkage fetch failed: ${response.status}`);
  V582_STATE.registry = await response.json();
  window.CyberShieldQueueProofTraceLinkageV582 = V582_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:queue-proof-trace-linkage-loaded', { detail: { registry: V582_STATE.registry } }));
  return V582_STATE.registry;
}

function v582Links(){ return Array.isArray(V582_STATE.registry?.trace_links) ? V582_STATE.registry.trace_links : []; }
function v582FindLink(id){ return v582Links().find(link => link.queue_item_id === id) || null; }

function v582InstallStyles(){
  if(v582$('#v58-2-trace-linkage-style')) return;
  const style = document.createElement('style');
  style.id = 'v58-2-trace-linkage-style';
  style.textContent = `
    .v582-linkage{border:1px solid rgba(66,215,255,.28);border-radius:18px;background:rgba(3,13,24,.72);padding:12px;margin:10px 0;color:#dff7ff}.v582-linkage h3{margin:0 0 8px;color:#fff}.v582-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px;margin-top:10px}.v582-card{border:1px solid rgba(66,215,255,.18);border-radius:14px;background:rgba(255,255,255,.045);padding:10px}.v582-card strong{color:#fff}.v582-small{font-size:.78rem;color:#bfefff;line-height:1.45}.v582-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:7px 10px;font-weight:900;cursor:pointer;margin-top:8px}.v582-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v582-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v582-pill{display:inline-flex;border:1px solid rgba(66,215,255,.36);border-radius:999px;padding:3px 7px;font-size:.7rem;font-weight:900;text-transform:uppercase;color:#8fd6ff;margin:2px}
    .v582-modal{position:fixed;inset:0;z-index:10009;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v582-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v582-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v582-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}.v582-code{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:.76rem;background:rgba(0,0,0,.28);border:1px solid rgba(66,215,255,.16);border-radius:14px;padding:10px;overflow:auto}
  `;
  document.head.appendChild(style);
}

function v582LinkHtml(link){
  return `<article class="v582-card"><strong>${v582Esc(link.queue_item_id)}</strong><p class="v582-small">${v582Esc(link.trace_summary)}</p><p class="v582-small"><strong>Proof gap:</strong> ${v582Esc(link.proof_gap)}</p><p class="v582-small"><strong>Next trace action:</strong> ${v582Esc(link.next_trace_action)}</p><button type="button" class="v582-btn" data-v582-link="${v582Esc(link.queue_item_id)}">Open trace linkage</button></article>`;
}

function v582SummaryHtml(){
  const registry = V582_STATE.registry;
  if(!registry) return '';
  return `<section class="v582-linkage"><h3>Queue to Proof Trace Linkage</h3><p class="v582-small">${v582Esc(registry.purpose)}</p><div class="v582-grid">${v582Links().map(v582LinkHtml).join('')}</div><button type="button" class="v582-btn" data-v582-all>Open all trace links</button><div class="v582-boundary"><strong>Boundary:</strong> ${v582Esc(registry.boundary)}</div></section>`;
}

function v582OpenLink(id){
  v582InstallStyles();
  v582$('.v582-modal')?.remove();
  const links = id === 'all' ? v582Links() : [v582FindLink(id)].filter(Boolean);
  const modal = document.createElement('div');
  modal.className = 'v582-modal';
  modal.innerHTML = `<section class="v582-modal-card" role="dialog" aria-modal="true" aria-label="Queue Proof Trace Linkage"><header><div><h2>Queue to Proof Trace Linkage</h2><p>${v582Esc(V582_STATE.registry?.controlling_principle || '')}</p></div><button type="button" class="v582-close" data-v582-close>Close</button></header>${links.map(link => `<article class="v582-card" style="margin-bottom:12px"><h3>${v582Esc(link.queue_item_id)}</h3><p>${v582Esc(link.trace_summary)}</p><p><strong>Decision records:</strong> ${(link.decision_record_ids || []).map(x => `<span class="v582-pill">${v582Esc(x)}</span>`).join('')}</p><p><strong>Evidence items:</strong> ${(link.evidence_item_ids || []).map(x => `<span class="v582-pill">${v582Esc(x)}</span>`).join('')}</p><p><strong>Proof Pack sections:</strong> ${(link.proof_pack_sections || []).map(x => `<span class="v582-pill">${v582Esc(x)}</span>`).join('')}</p><p><strong>Board narrative sections:</strong> ${(link.board_narrative_sections || []).map(x => `<span class="v582-pill">${v582Esc(x)}</span>`).join('')}</p><p><strong>Proof gap:</strong> ${v582Esc(link.proof_gap)}</p><p><strong>Next trace action:</strong> ${v582Esc(link.next_trace_action)}</p><div class="v582-boundary"><strong>Item boundary:</strong> ${v582Esc(link.prototype_boundary)}</div></article>`).join('')}<h3>Raw trace object</h3><pre class="v582-code">${v582Esc(JSON.stringify(links, null, 2))}</pre><div class="v582-boundary"><strong>Global boundary:</strong> ${v582Esc(V582_STATE.registry?.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v582EnhanceQueueCards(){
  v582$$('.v581-item').forEach(card => {
    if(card.dataset.v582Ready === 'true') return;
    const button = card.querySelector('[data-v581-route]');
    const text = card.textContent || '';
    const link = v582Links().find(item => text.includes(item.queue_item_id) || text.includes((item.queue_item_id || '').replace('qa-','').replaceAll('-',' '))) || null;
    if(!link) return;
    card.dataset.v582Ready = 'true';
    card.insertAdjacentHTML('beforeend', `<button type="button" class="v582-btn" data-v582-link="${v582Esc(link.queue_item_id)}">Show proof trace</button>`);
  });
}

function v582Inject(){
  const proof = v582$('#proof.active');
  if(proof && !v582$('#v582ProofTraceLinkage', proof)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v582ProofTraceLinkage';
    wrapper.innerHTML = v582SummaryHtml();
    proof.insertAdjacentElement('afterbegin', wrapper);
  }
  const runtime = v582$('#runtime.active');
  if(runtime && !v582$('#v582RuntimeTraceLinkage', runtime)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v582RuntimeTraceLinkage';
    wrapper.innerHTML = v582SummaryHtml();
    runtime.appendChild(wrapper);
  }
  v582EnhanceQueueCards();
}

function v582MarkMeta(){
  const payload = v582$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V58.2 Runtime Action Queue to Proof Pack Trace Linkage';
    parsed.version = 'V58.2';
    parsed.previous_operational_build = 'V58.1 Runtime Action Queue';
    parsed.queue_proof_trace_linkage = { status:'active', path: V582_LINKAGE_PATH, link_count: v582Links().length, boundary: V582_STATE.registry?.boundary, github_pages_browser_qa_required:true };
    parsed.prototype_boundary = 'Static advisory prototype only. No live monitoring, live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, live claim extraction, live scoring, report delivery, workflow automation, ticketing, notifications, or live internet claim verification.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v582Apply(){ v582InstallStyles(); v582Inject(); v582MarkMeta(); }
function v582Handlers(){
  if(window.__v582Handlers) return;
  window.__v582Handlers = true;
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-v582-link]');
    if(link){ v582OpenLink(link.dataset.v582Link); return; }
    if(event.target.closest('[data-v582-all]')){ v582OpenLink('all'); return; }
    if(event.target.closest('[data-v582-close]') || (event.target.classList && event.target.classList.contains('v582-modal'))){ v582$('.v582-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v581-route],[data-v581-open],[data-v58-route],[data-v58-open],[data-v571-open],[data-v57-open],[data-v564-model],[data-v563-open],[data-v562-record],[data-v561-open]')) setTimeout(v582Apply, 1000);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v582$('.v582-modal')?.remove(); });
}

v582Handlers();
v582LoadRegistry().then(() => setTimeout(v582Apply, 5200)).catch(error => console.warn('CyberShield V58.2 Queue Proof Trace Linkage unavailable', error));
window.addEventListener('load', () => setTimeout(v582Apply, 5900), { once:true });
setTimeout(v582Apply, 6800);
