// V60.3 Universal Model Trace Inspector
// Purpose: one inspection layer for every score, model output, evidence item, runtime action, Proof Pack statement,
// TrustMap object, and Internet Trust claim row.
// Boundary: expert-derived V1, registry-backed, inspectable, calibratable, not statistically validated scoring truth.

const V603_MODEL_REGISTRY_PATH = 'data/models/v60-3-calibratable-trust-model-registry.json';
const V603_STATE = { registry: null };

function v603$(selector, root = document){ return root.querySelector(selector); }
function v603$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v603Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v603LoadRegistry(){
  if(V603_STATE.registry) return V603_STATE.registry;
  const response = await fetch(V603_MODEL_REGISTRY_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`V60.3 model registry fetch failed: ${response.status}`);
  V603_STATE.registry = await response.json();
  window.CyberShieldCalibratableTrustModelRegistryV603 = V603_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:universal-model-trace-registry-loaded', { detail: { registry: V603_STATE.registry } }));
  return V603_STATE.registry;
}

function v603Models(){ return V603_STATE.registry?.core_models || []; }
function v603Samples(){ return V603_STATE.registry?.sample_score_outputs || []; }
function v603FindModel(id){ return v603Models().find(model => model.model_id === id) || v603Models()[0] || null; }
function v603FindSample(id){ return v603Samples().find(sample => sample.score_id === id) || v603Samples()[0] || null; }

function v603InstallStyles(){
  if(v603$('#v60-3-universal-trace-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-universal-trace-style';
  style.textContent = `
    .v603-trace{border:1px solid rgba(66,215,255,.32);border-radius:24px;background:linear-gradient(180deg,rgba(7,27,48,.95),rgba(3,13,24,.99));box-shadow:0 22px 48px rgba(0,0,0,.32),0 0 36px rgba(66,215,255,.1);padding:16px;margin:12px 0;color:#dff7ff}.v603-trace h2,.v603-trace h3{margin:0 0 8px;color:#fff}.v603-trace p{line-height:1.52}.v603-kicker{display:inline-flex;border:1px solid rgba(66,215,255,.4);border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v603-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin-top:10px}.v603-card{border:1px solid rgba(66,215,255,.18);border-radius:16px;background:rgba(255,255,255,.045);padding:12px}.v603-card strong{color:#fff}.v603-small{font-size:.8rem;color:#bfefff;line-height:1.45}.v603-pill{display:inline-flex;border:1px solid rgba(66,215,255,.36);border-radius:999px;padding:3px 7px;font-size:.7rem;font-weight:900;text-transform:uppercase;color:#8fd6ff;margin:2px}.v603-warning{border:1px solid rgba(255,209,102,.26);background:rgba(255,209,102,.06);border-radius:14px;padding:10px;color:#ffe7a6}.v603-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v603-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v603-btn,.v603-inspect{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v603-btn:hover,.v603-inspect:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}
    .v603-modal{position:fixed;inset:0;z-index:10020;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v603-modal-card{width:min(1040px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v603-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v603-modal-card h2{margin:0;color:#fff;font-size:1.35rem}.v603-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}.v603-field{border-bottom:1px solid rgba(66,215,255,.12);padding:7px 0}.v603-field b{display:block;color:#8fd6ff;font-size:.72rem;text-transform:uppercase;letter-spacing:.08em}.v603-factor{display:grid;grid-template-columns:1fr auto;gap:8px;border:1px solid rgba(66,215,255,.14);border-radius:12px;padding:8px;margin:5px 0;background:rgba(255,255,255,.035)}.v603-weight{color:#25e69b;font-weight:900}
  `;
  document.head.appendChild(style);
}

function v603ModelCard(model){
  return `<article class="v603-card"><span class="v603-pill">${v603Esc(model.model_family)}</span><p><strong>${v603Esc(model.model_name)}</strong></p><p class="v603-small">${v603Esc(model.maturity_label)}</p><p class="v603-small">${v603Esc(model.purpose)}</p><button type="button" class="v603-inspect" data-v603-model="${v603Esc(model.model_id)}">Inspect model</button></article>`;
}

function v603SampleCard(sample){
  return `<article class="v603-card"><span class="v603-pill">${v603Esc(sample.runtime_action)}</span><p><strong>${v603Esc(sample.score_name)}</strong></p><p class="v603-small">Score ${v603Esc(sample.score)} • Confidence ${v603Esc(sample.confidence)} • ${v603Esc(sample.decision_band)}</p><p class="v603-small">Target: ${v603Esc(sample.target_object_type)} / ${v603Esc(sample.target_object_id)}</p><button type="button" class="v603-inspect" data-v603-score="${v603Esc(sample.score_id)}">Why this score?</button></article>`;
}

function v603OverviewHtml(){
  const r = V603_STATE.registry || {};
  return `<section class="v603-trace"><span class="v603-kicker">V60.3 Universal Model Trace Inspector</span><h2>Every score must prove itself</h2><p>${v603Esc(r.confidence_statement || '')}</p><div class="v603-warning"><strong>Model maturity:</strong> ${v603Esc(r.maturity_label || 'Expert-Derived V1')}  These are registry-backed, inspectable, and calibratable models, not permanent scoring truth.</div><h3>Core calibratable models</h3><div class="v603-grid">${v603Models().map(v603ModelCard).join('')}</div><h3>Sample score outputs</h3><div class="v603-grid">${v603Samples().map(v603SampleCard).join('')}</div><div class="v603-actions"><button type="button" class="v603-btn" data-v603-open-all>Open universal trace overview</button><button type="button" class="v603-btn" data-v603-download>Download V60.3 registry trace</button></div><div class="v603-boundary"><strong>Boundary:</strong> ${v603Esc(r.boundary || '')}</div></section>`;
}

function v603Fields(obj){
  return Object.entries(obj || {}).filter(([key]) => !['factor_weights'].includes(key)).map(([key,value]) => `<div class="v603-field"><b>${v603Esc(key.replaceAll('_',' '))}</b><span>${Array.isArray(value) ? value.map(v603Esc).join(', ') : typeof value === 'object' && value ? v603Esc(JSON.stringify(value)) : v603Esc(value)}</span></div>`).join('');
}

function v603Factors(model){
  return (model?.factor_weights || []).map(factor => `<div class="v603-factor"><span>${v603Esc(factor.factor)}</span><span class="v603-weight">${v603Esc(factor.weight)}</span></div>`).join('');
}

function v603OpenModel(modelId){
  v603InstallStyles();
  v603$('.v603-modal')?.remove();
  const model = v603FindModel(modelId);
  const modal = document.createElement('div');
  modal.className = 'v603-modal';
  modal.innerHTML = `<section class="v603-modal-card" role="dialog" aria-modal="true" aria-label="Universal Model Trace Inspector"><header><div><h2>${v603Esc(model?.model_name || 'Model trace')}</h2><p>${v603Esc(model?.maturity_label || '')}</p></div><button type="button" class="v603-close" data-v603-close>Close</button></header><h3>Model fields</h3>${v603Fields(model)}<h3>Factor weights, default V1, calibratable</h3>${v603Factors(model)}<div class="v603-warning"><strong>Calibration note:</strong> Factor weights are expert-derived defaults. They are not statistically validated and should be recalibrated through test scenarios, expert review, red-team attempts, and observed false positives/false negatives.</div><div class="v603-boundary"><strong>Boundary:</strong> ${v603Esc(V603_STATE.registry?.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v603OpenScore(scoreId){
  v603InstallStyles();
  v603$('.v603-modal')?.remove();
  const sample = v603FindSample(scoreId);
  const model = v603FindModel(sample?.model_id);
  const modal = document.createElement('div');
  modal.className = 'v603-modal';
  modal.innerHTML = `<section class="v603-modal-card" role="dialog" aria-modal="true" aria-label="Score Trace Inspector"><header><div><h2>Why this score?</h2><p>${v603Esc(sample?.score_name || '')} • ${v603Esc(model?.maturity_label || '')}</p></div><button type="button" class="v603-close" data-v603-close>Close</button></header><h3>Standard score object</h3>${v603Fields(sample)}<h3>Model used</h3>${v603Fields(model)}<h3>Weights applied</h3>${v603Factors(model)}<div class="v603-warning"><strong>Inspector answer:</strong> This score is inspectable because it identifies the model, version, target object, score, confidence, runtime action, missing evidence, assumptions, caveats, risk if wrong, and recommended next step.</div><div class="v603-boundary"><strong>Boundary:</strong> ${v603Esc(V603_STATE.registry?.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v603OpenAll(){
  v603InstallStyles();
  v603$('.v603-modal')?.remove();
  const r = V603_STATE.registry || {};
  const modal = document.createElement('div');
  modal.className = 'v603-modal';
  modal.innerHTML = `<section class="v603-modal-card" role="dialog" aria-modal="true" aria-label="Universal Trace Overview"><header><div><h2>Universal Model Trace Inspector</h2><p>${v603Esc(r.controlling_principle || '')}</p></div><button type="button" class="v603-close" data-v603-close>Close</button></header><h3>Required questions</h3><div class="v603-grid">${(r.trace_inspector_required_questions || []).map(q => `<article class="v603-card">${v603Esc(q)}</article>`).join('')}</div><h3>Calibration requirements for 90%+ confidence</h3><div class="v603-grid">${(r.calibration_requirements_for_90_plus_confidence || []).map(q => `<article class="v603-card">${v603Esc(q)}</article>`).join('')}</div><h3>Roadmap models</h3><div>${(r.placeholder_roadmap_models || []).map(m => `<span class="v603-pill">${v603Esc(m)}</span>`).join('')}</div><div class="v603-boundary"><strong>Boundary:</strong> ${v603Esc(r.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v603Download(){
  const blob = new Blob([JSON.stringify(V603_STATE.registry || {}, null, 2)], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cybershield-v60-3-calibratable-trust-model-registry.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v603Inject(){
  ['evidence','runtime','proof','settings','architecture'].forEach(viewId => {
    const view = v603$(`#${viewId}.active`);
    if(view && !v603$(`#v603Trace_${viewId}`, view)){
      const wrap = document.createElement('div');
      wrap.id = `v603Trace_${viewId}`;
      wrap.innerHTML = v603OverviewHtml();
      view.insertAdjacentElement(viewId === 'settings' ? 'beforeend' : 'afterbegin', wrap);
    }
  });
  v603$$('.v554-score,.v554-distribution,.v602-card,.v562-card,.v561-item').forEach((node, index) => {
    if(node.dataset.v603Ready === 'true') return;
    node.dataset.v603Ready = 'true';
    const sample = v603Samples()[index % Math.max(1, v603Samples().length)];
    node.insertAdjacentHTML('beforeend', `<div class="v603-actions"><button type="button" class="v603-inspect" data-v603-score="${v603Esc(sample?.score_id || '')}">Inspect score trace</button></div>`);
  });
}

function v603MarkMeta(){
  const payload = v603$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3 Universal Model Trace Inspector';
    parsed.version = 'V60.3';
    parsed.previous_operational_build = 'V60.2 Evidence-to-Score Impact Preview';
    parsed.universal_model_trace_inspector = { status:'active_static_inspector', path:V603_MODEL_REGISTRY_PATH, maturity_label:V603_STATE.registry?.maturity_label, model_count:v603Models().length, boundary:V603_STATE.registry?.boundary, github_pages_browser_qa_required:true };
    parsed.prototype_boundary = 'Static advisory prototype only. Expert-derived V1 registry-backed models. No live scoring, live evidence retrieval, statistical validation, backend persistence, workflow automation, ticketing, notifications, enforcement, or live integrations.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v603Apply(){ v603InstallStyles(); v603Inject(); v603MarkMeta(); }
function v603Handlers(){
  if(window.__v603Handlers) return;
  window.__v603Handlers = true;
  document.addEventListener('click', event => {
    const score = event.target.closest('[data-v603-score]');
    if(score){ v603OpenScore(score.dataset.v603Score); return; }
    const model = event.target.closest('[data-v603-model]');
    if(model){ v603OpenModel(model.dataset.v603Model); return; }
    if(event.target.closest('[data-v603-open-all]')){ v603OpenAll(); return; }
    if(event.target.closest('[data-v603-download]')){ v603Download(); return; }
    if(event.target.closest('[data-v603-close]') || (event.target.classList && event.target.classList.contains('v603-modal'))){ v603$('.v603-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v602-open],[data-v602-download],[data-v562-record],[data-v561-open],[data-v554-mode],[data-v554-domain],[data-v554-asset]')) setTimeout(v603Apply, 900);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v603$('.v603-modal')?.remove(); });
}

v603Handlers();
v603LoadRegistry().then(() => setTimeout(v603Apply, 3400)).catch(error => console.warn('CyberShield V60.3 Universal Model Trace Inspector unavailable', error));
window.addEventListener('load', () => setTimeout(v603Apply, 4200), { once:true });
setTimeout(v603Apply, 5200);
