// V60.1 Evidence State Transition Prototype
// Purpose: show how evidence moves from weak states to verified_by_human with required human action and proof consequences.
// Boundary: static advisory prototype only. No backend persistence, live verification, ticketing, notifications, or workflow automation.

const V601_TRANSITION_PATH = 'data/evidence/v60-1-evidence-state-transition-prototype.json';
const V601_STATE = { registry: null };

function v601$(selector, root = document){ return root.querySelector(selector); }
function v601Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v601LoadRegistry(){
  if(V601_STATE.registry) return V601_STATE.registry;
  const response = await fetch(V601_TRANSITION_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Evidence transition registry fetch failed: ${response.status}`);
  V601_STATE.registry = await response.json();
  window.CyberShieldEvidenceStateTransitionsV601 = V601_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:evidence-state-transitions-loaded', { detail: { registry: V601_STATE.registry } }));
  return V601_STATE.registry;
}

function v601InstallStyles(){
  if(v601$('#v60-1-transition-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-1-transition-style';
  style.textContent = `
    .v601-transitions{border:1px solid rgba(66,215,255,.32);border-radius:24px;background:linear-gradient(180deg,rgba(7,27,48,.95),rgba(3,13,24,.99));box-shadow:0 22px 48px rgba(0,0,0,.32),0 0 36px rgba(66,215,255,.1);padding:16px;margin:12px 0;color:#dff7ff}
    .v601-transitions h2,.v601-transitions h3{margin:0 0 8px;color:#fff}.v601-transitions p{line-height:1.52}.v601-kicker{display:inline-flex;border:1px solid rgba(66,215,255,.4);border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v601-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;margin-top:10px}.v601-card{border:1px solid rgba(66,215,255,.18);border-radius:16px;background:rgba(255,255,255,.045);padding:12px}.v601-card.blocked{border-color:rgba(255,76,76,.32);background:rgba(255,76,76,.055)}.v601-card strong{color:#fff}.v601-small{font-size:.8rem;color:#bfefff;line-height:1.45}.v601-pill{display:inline-flex;border:1px solid rgba(66,215,255,.36);border-radius:999px;padding:3px 7px;font-size:.7rem;font-weight:900;text-transform:uppercase;color:#8fd6ff;margin:2px}.v601-bad{color:#ffd1d1;border-color:rgba(255,76,76,.42)}.v601-ok{color:#b8ffd9;border-color:rgba(37,230,155,.42)}.v601-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v601-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v601-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v601-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v601-code{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:.76rem;background:rgba(0,0,0,.28);border:1px solid rgba(66,215,255,.16);border-radius:14px;padding:10px;overflow:auto}
    .v601-modal{position:fixed;inset:0;z-index:10017;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v601-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v601-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v601-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}
  `;
  document.head.appendChild(style);
}

function v601Transitions(){ return V601_STATE.registry?.transitions || []; }
function v601Object(){
  const r = V601_STATE.registry || {};
  return { version:'V60.1', product:'CyberShield Executive OS', generated_at:new Date().toISOString(), purpose:r.purpose, transitions:r.transitions, transition_fields:r.transition_fields, boundary:r.boundary };
}

function v601Card(t){
  return `<article class="v601-card ${t.allowed ? '' : 'blocked'}"><strong>${v601Esc(t.from_state)} → ${v601Esc(t.to_state)}</strong><p>${t.allowed ? '<span class="v601-pill v601-ok">Allowed</span>' : '<span class="v601-pill v601-bad">Blocked</span>'}</p><p class="v601-small"><b>Human action:</b> ${v601Esc(t.required_human_action)}</p><p class="v601-small"><b>Documentation:</b> ${v601Esc(t.required_documentation)}</p><p class="v601-small"><b>Risk if skipped:</b> ${v601Esc(t.risk_if_skipped)}</p><p class="v601-small"><b>Proof consequence:</b> ${v601Esc(t.proof_pack_consequence)}</p></article>`;
}

function v601Html(){
  const r = V601_STATE.registry;
  if(!r) return '';
  const blocked = v601Transitions().filter(t => !t.allowed).length;
  return `<section class="v601-transitions"><span class="v601-kicker">Evidence State Transitions</span><h2>From Weak Evidence to Human-Verified Evidence</h2><p>${v601Esc(r.purpose)}</p><div class="v601-grid"><article class="v601-card"><strong>Total transitions</strong><p class="v601-small">${v601Esc(v601Transitions().length)} prototype transitions</p></article><article class="v601-card blocked"><strong>Blocked transitions</strong><p class="v601-small">${v601Esc(blocked)} transitions are blocked by design</p></article><article class="v601-card"><strong>Key principle</strong><p class="v601-small">Assumptions and conflicts cannot become verified evidence without documented human review.</p></article></div><div class="v601-grid">${v601Transitions().map(v601Card).join('')}</div><div class="v601-actions"><button type="button" class="v601-btn" data-v601-open>Open transition log</button><button type="button" class="v601-btn" data-v601-download>Download transition log</button></div><div class="v601-boundary"><strong>Boundary:</strong> ${v601Esc(r.boundary)}</div></section>`;
}

function v601Open(){
  v601InstallStyles();
  v601$('.v601-modal')?.remove();
  const obj = v601Object();
  const modal = document.createElement('div');
  modal.className = 'v601-modal';
  modal.innerHTML = `<section class="v601-modal-card" role="dialog" aria-modal="true" aria-label="Evidence State Transition Log"><header><div><h2>Evidence State Transition Log</h2><p>${v601Esc(V601_STATE.registry?.controlling_principle || '')}</p></div><button type="button" class="v601-close" data-v601-close>Close</button></header><pre class="v601-code">${v601Esc(JSON.stringify(obj, null, 2))}</pre><div class="v601-boundary"><strong>Boundary:</strong> ${v601Esc(obj.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v601Download(){
  const obj = v601Object();
  const lines = ['CyberShield Executive OS Evidence State Transition Prototype', '', `Generated: ${obj.generated_at}`, 'Build: V60.1', '', `Purpose: ${obj.purpose}`, '', 'Transitions:', ...(obj.transitions || []).map(t => `- ${t.from_state} -> ${t.to_state} | allowed=${t.allowed} | human_action=${t.required_human_action} | proof=${t.proof_pack_consequence} | boundary=${t.prototype_boundary}`), '', `Boundary: ${obj.boundary}`];
  const blob = new Blob([lines.join('\n')], { type:'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cybershield-v60-1-evidence-state-transitions.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v601Inject(){
  ['evidence','runtime','proof'].forEach(view => {
    const root = v601$(`#${view}.active`);
    if(root && !v601$(`#v601-${view}-transitions`, root)){
      const wrapper = document.createElement('div');
      wrapper.id = `v601-${view}-transitions`;
      wrapper.innerHTML = v601Html();
      root.insertAdjacentElement('beforeend', wrapper);
    }
  });
}

function v601MarkMeta(){
  const payload = v601$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.1 Evidence State Transition Prototype';
    parsed.version = 'V60.1';
    parsed.previous_operational_build = 'V60 Trust Evidence Workbench Scaffold';
    parsed.evidence_state_transitions = { status:'active_static_transition_prototype', path: V601_TRANSITION_PATH, transition_count: v601Transitions().length, boundary: V601_STATE.registry?.boundary, github_pages_browser_qa_required:true };
    parsed.prototype_boundary = 'Static advisory prototype only. No backend persistence, live evidence retrieval, automated verification, workflow automation, ticketing, notifications, or enforcement.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v601Apply(){ v601InstallStyles(); v601Inject(); v601MarkMeta(); }
function v601Handlers(){
  if(window.__v601Handlers) return;
  window.__v601Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('[data-v601-open]')){ v601Open(); return; }
    if(event.target.closest('[data-v601-download]')){ v601Download(); return; }
    if(event.target.closest('[data-v601-close]') || (event.target.classList && event.target.classList.contains('v601-modal'))){ v601$('.v601-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v60-open],[data-v60-download],[data-v595-open]')) setTimeout(v601Apply, 1400);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v601$('.v601-modal')?.remove(); });
}

v601Handlers();
v601LoadRegistry().then(() => setTimeout(v601Apply, 10200)).catch(error => console.warn('CyberShield V60.1 transitions unavailable', error));
window.addEventListener('load', () => setTimeout(v601Apply, 11000), { once:true });
setTimeout(v601Apply, 12200);
