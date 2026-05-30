// V60.2 Evidence-to-Score Impact Preview
// Purpose: show how evidence state changes would affect trust, confidence, reliance risk, runtime action,
// and Proof Pack defensibility without claiming live scoring.
// Boundary: static advisory prototype only. No live scoring, backend persistence, or evidence retrieval.

const V602_IMPACT_PATH = 'data/evidence/v60-2-evidence-to-score-impact-preview.json';
const V602_STATE = { registry: null };

function v602$(selector, root = document){ return root.querySelector(selector); }
function v602Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v602LoadRegistry(){
  if(V602_STATE.registry) return V602_STATE.registry;
  const response = await fetch(V602_IMPACT_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Evidence impact registry fetch failed: ${response.status}`);
  V602_STATE.registry = await response.json();
  window.CyberShieldEvidenceScoreImpactV602 = V602_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:evidence-score-impact-loaded', { detail: { registry: V602_STATE.registry } }));
  return V602_STATE.registry;
}

function v602InstallStyles(){
  if(v602$('#v60-2-impact-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-2-impact-style';
  style.textContent = `
    .v602-impact{border:1px solid rgba(66,215,255,.32);border-radius:24px;background:linear-gradient(180deg,rgba(7,27,48,.95),rgba(3,13,24,.99));box-shadow:0 22px 48px rgba(0,0,0,.32),0 0 36px rgba(66,215,255,.1);padding:16px;margin:12px 0;color:#dff7ff}
    .v602-impact h2,.v602-impact h3{margin:0 0 8px;color:#fff}.v602-impact p{line-height:1.52}.v602-kicker{display:inline-flex;border:1px solid rgba(66,215,255,.4);border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v602-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(265px,1fr));gap:10px;margin-top:10px}.v602-card{border:1px solid rgba(66,215,255,.18);border-radius:16px;background:rgba(255,255,255,.045);padding:12px}.v602-card strong{color:#fff}.v602-small{font-size:.8rem;color:#bfefff;line-height:1.45}.v602-pill{display:inline-flex;border:1px solid rgba(66,215,255,.36);border-radius:999px;padding:3px 7px;font-size:.7rem;font-weight:900;text-transform:uppercase;color:#8fd6ff;margin:2px}.v602-impact-line{border-left:3px solid #42d7ff;padding-left:9px;margin:8px 0}.v602-warning{border:1px solid rgba(255,209,102,.26);background:rgba(255,209,102,.06);border-radius:14px;padding:10px;color:#ffe7a6}.v602-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v602-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v602-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v602-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}
    .v602-modal{position:fixed;inset:0;z-index:10018;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v602-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v602-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v602-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}
  `;
  document.head.appendChild(style);
}

function v602Previews(){ return V602_STATE.registry?.impact_previews || []; }

function v602Card(preview){
  return `<article class="v602-card"><span class="v602-pill">${v602Esc(preview.from_state)} → ${v602Esc(preview.to_state)}</span><p><strong>${v602Esc(preview.evidence_item)}</strong></p><p class="v602-small"><b>Model impacted:</b> ${v602Esc(preview.model_impacted)}</p><div class="v602-impact-line"><p class="v602-small"><b>Trust:</b> ${v602Esc(preview.trust_score_delta)}</p><p class="v602-small"><b>Confidence:</b> ${v602Esc(preview.confidence_delta)}</p><p class="v602-small"><b>Reliance risk:</b> ${v602Esc(preview.reliance_risk_delta)}</p></div><p class="v602-small"><b>Runtime:</b> ${v602Esc(preview.runtime_action_change)}</p><p class="v602-small"><b>Proof Pack:</b> ${v602Esc(preview.proof_pack_defensibility_change)}</p></article>`;
}

function v602Object(){
  const r = V602_STATE.registry || {};
  return { version:'V60.2', product:'CyberShield Executive OS', generated_at:new Date().toISOString(), purpose:r.purpose, impact_dimensions:r.impact_dimensions, impact_previews:r.impact_previews, non_negotiables:r.non_negotiables, boundary:r.boundary };
}

function v602Html(limit = 4){
  const r = V602_STATE.registry || {};
  return `<section class="v602-impact"><span class="v602-kicker">V60.2 evidence-to-score impact preview</span><h2>What happens when evidence improves?</h2><p>${v602Esc(r.purpose || 'Shows how evidence state changes affect score defensibility.')}</p><div class="v602-warning"><strong>Important:</strong> These are static impact previews, not live scoring. Trust and confidence remain separate. Reliance risk may stay high even when trust improves.</div><div class="v602-grid">${v602Previews().slice(0, limit).map(v602Card).join('')}</div><div class="v602-actions"><button class="v602-btn" type="button" data-v602-open>Open full impact trace</button><button class="v602-btn" type="button" data-v602-download>Download impact trace</button></div><div class="v602-boundary"><strong>Boundary:</strong> ${v602Esc(r.boundary || '')}</div></section>`;
}

function v602Open(){
  v602InstallStyles();
  v602$('.v602-modal')?.remove();
  const r = V602_STATE.registry || {};
  const modal = document.createElement('div');
  modal.className = 'v602-modal';
  modal.innerHTML = `<section class="v602-modal-card" role="dialog" aria-modal="true" aria-label="Evidence to Score Impact Trace"><header><div><h2>Evidence-to-Score Impact Trace</h2><p>${v602Esc(r.controlling_principle || '')}</p></div><button class="v602-close" type="button" data-v602-close>Close</button></header><div class="v602-grid">${v602Previews().map(v602Card).join('')}</div><h3>Non-negotiables</h3><div class="v602-grid">${(r.non_negotiables || []).map(n => `<article class="v602-card">${v602Esc(n)}</article>`).join('')}</div><div class="v602-boundary"><strong>Boundary:</strong> ${v602Esc(r.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v602Download(){
  const blob = new Blob([JSON.stringify(v602Object(), null, 2)], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cybershield-v60-2-evidence-to-score-impact-preview.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v602Inject(){
  ['evidence','runtime','proof'].forEach(viewId => {
    const view = v602$(`#${viewId}.active`);
    if(view && !v602$(`#v602Impact_${viewId}`, view)){
      const wrap = document.createElement('div');
      wrap.id = `v602Impact_${viewId}`;
      wrap.innerHTML = v602Html(viewId === 'runtime' ? 3 : 4);
      view.insertAdjacentElement(viewId === 'proof' ? 'afterbegin' : 'beforeend', wrap);
    }
  });
}

function v602MarkMeta(){
  const payload = v602$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.2 Evidence-to-Score Impact Preview';
    parsed.version = 'V60.2';
    parsed.previous_operational_build = 'V60.1 Evidence State Transition Prototype';
    parsed.evidence_to_score_impact_preview = { status:'active_static_preview', path:V602_IMPACT_PATH, preview_count:v602Previews().length, boundary:V602_STATE.registry?.boundary, github_pages_browser_qa_required:true };
    parsed.prototype_boundary = 'Static advisory prototype only. No live monitoring, live evidence retrieval, live scoring, live claim extraction, backend persistence, workflow automation, ticketing, notifications, enforcement, or live integrations.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v602Apply(){ v602InstallStyles(); v602Inject(); v602MarkMeta(); }
function v602Handlers(){
  if(window.__v602Handlers) return;
  window.__v602Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('[data-v602-open]')){ v602Open(); return; }
    if(event.target.closest('[data-v602-download]')){ v602Download(); return; }
    if(event.target.closest('[data-v602-close]') || (event.target.classList && event.target.classList.contains('v602-modal'))){ v602$('.v602-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v554-mode],[data-v554-reset],[data-v554-domain],[data-v554-asset],[data-v554-core],[data-v556-route]')) setTimeout(v602Apply, 720);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v602$('.v602-modal')?.remove(); });
}

v602Handlers();
v602LoadRegistry().then(() => setTimeout(v602Apply, 3000)).catch(error => console.warn('CyberShield V60.2 impact preview unavailable', error));
window.addEventListener('load', () => setTimeout(v602Apply, 3600), { once:true });
setTimeout(v602Apply, 4200);
