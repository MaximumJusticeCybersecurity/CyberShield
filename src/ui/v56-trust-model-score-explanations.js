// V56 Trust Model Registry and Score Explanation Layer
// Purpose: route visible scores and TrustMap score surfaces to model explanations.
// Boundary: advisory, demo-directional, no certification or live evidence retrieval.

const V56_MODEL_REGISTRY_PATH = 'data/models/v56-trust-score-models.json';
const V56_STATE = { registry: null };

function v56$(selector, root = document){ return root.querySelector(selector); }
function v56$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v56Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v56LoadRegistry(){
  if(V56_STATE.registry) return V56_STATE.registry;
  const response = await fetch(V56_MODEL_REGISTRY_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Model registry fetch failed: ${response.status}`);
  V56_STATE.registry = await response.json();
  window.CyberShieldTrustScoreModelsV56 = V56_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:model-registry-loaded', { detail: { registry: V56_STATE.registry } }));
  return V56_STATE.registry;
}

function v56Models(){ return Array.isArray(V56_STATE.registry?.score_models) ? V56_STATE.registry.score_models : []; }
function v56FindModel(id){ return v56Models().find(model => model.id === id) || v56Models()[0] || null; }
function v56DefaultModelId(){ return 'operational_trust_score'; }

function v56InstallStyles(){
  if(v56$('#v56-score-explanation-style')) return;
  const style = document.createElement('style');
  style.id = 'v56-score-explanation-style';
  style.textContent = `
    .v56-model-button{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:7px 10px;font-weight:900;cursor:pointer;margin-top:8px;display:inline-flex;align-items:center;gap:6px}
    .v56-model-button:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}
    .v56-model-modal{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}
    .v56-model-card{width:min(880px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}
    .v56-model-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}
    .v56-model-card h2{margin:0;color:#fff;font-size:1.35rem}.v56-model-card h3{margin:16px 0 8px;color:#8fd6ff;font-size:.86rem;text-transform:uppercase;letter-spacing:.1em}.v56-model-card p{line-height:1.48}.v56-model-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}.v56-model-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px}.v56-model-item{border:1px solid rgba(66,215,255,.18);border-radius:14px;background:rgba(255,255,255,.045);padding:10px}.v56-model-item strong{color:#fff}.v56-weight{float:right;color:#25e69b;font-weight:900}.v56-limits{border:1px solid rgba(255,209,102,.28);background:rgba(255,209,102,.06);border-radius:14px;padding:10px}.v56-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}
  `;
  document.head.appendChild(style);
}

function v56ModelHtml(model){
  if(!model) return '<p>No model registry loaded.</p>';
  return `
    <header><div><h2>${v56Esc(model.label)}</h2><p>${v56Esc(model.purpose)}</p><p><strong>Status:</strong> ${v56Esc(model.status)}</p></div><button class="v56-model-close" type="button" data-v56-close>Close</button></header>
    <h3>Inputs and weights</h3>
    <div class="v56-model-grid">${(model.inputs || []).map(input => `<div class="v56-model-item"><strong>${v56Esc(input.label)}</strong><span class="v56-weight">${Math.round(Number(input.weight || 0) * 100)}%</span><p>${v56Esc(input.description)}</p></div>`).join('')}</div>
    <h3>Thresholds</h3>
    <div class="v56-model-grid">${(model.thresholds || []).map(threshold => `<div class="v56-model-item"><strong>${v56Esc(threshold.label)} ${v56Esc(threshold.range)}</strong><p>${v56Esc(threshold.meaning)}</p></div>`).join('')}</div>
    <h3>Evidence requirements</h3>
    <div class="v56-model-grid">${(model.evidence_requirements || []).map(item => `<div class="v56-model-item">${v56Esc(item)}</div>`).join('')}</div>
    <h3>Limitations</h3>
    <div class="v56-limits">${(model.limitations || []).map(item => `<p>• ${v56Esc(item)}</p>`).join('')}</div>
    <div class="v56-boundary"><strong>Prototype boundary:</strong> ${v56Esc(V56_STATE.registry?.boundary || 'Advisory prototype only. No live integrations or certification claims.')}</div>
  `;
}

function v56OpenModel(modelId){
  v56InstallStyles();
  v56$('.v56-model-modal')?.remove();
  const model = v56FindModel(modelId || v56DefaultModelId());
  const modal = document.createElement('div');
  modal.className = 'v56-model-modal';
  modal.innerHTML = `<section class="v56-model-card" role="dialog" aria-modal="true" aria-label="Score model explanation">${v56ModelHtml(model)}</section>`;
  document.body.appendChild(modal);
}

function v56AddButtons(){
  if(!V56_STATE.registry) return;
  const trustMap = v56$('#trustmap.active');
  if(trustMap){
    v56$$('.v554-score', trustMap).forEach(score => {
      if(score.dataset.v56Ready === 'true') return;
      score.dataset.v56Ready = 'true';
      score.insertAdjacentHTML('afterend', `<button type="button" class="v56-model-button" data-v56-model="scenario_trust_score">How this score is modeled</button>`);
    });
    v56$$('.v554-distribution', trustMap).forEach(score => {
      if(score.dataset.v56Ready === 'true') return;
      score.dataset.v56Ready = 'true';
      score.insertAdjacentHTML('afterend', `<button type="button" class="v56-model-button" data-v56-model="operational_trust_score">Model explanation</button>`);
    });
  }
  const runtime = v56$('#runtime.active');
  if(runtime && !v56$('#v56RuntimeModelButton', runtime)){
    runtime.insertAdjacentHTML('afterbegin', `<div style="margin:0 0 12px"><button id="v56RuntimeModelButton" type="button" class="v56-model-button" data-v56-model="purpose_protocol_readiness">Explain Purpose Protocol readiness model</button></div>`);
  }
}

function v56MarkMeta(){
  const payload = v56$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V56 Trust Model Registry and Score Explanation Layer';
    parsed.version = 'V56';
    parsed.previous_operational_build = 'V55.6 TrustMap Interaction Reliability';
    parsed.model_registry = { status: 'active', path: V56_MODEL_REGISTRY_PATH, model_count: v56Models().length, boundary: V56_STATE.registry?.boundary || 'Advisory prototype only.', github_pages_browser_qa_required: true };
    parsed.prototype_boundary = 'Static advisory prototype only. No live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, or live internet claim verification.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v56Apply(){ v56InstallStyles(); v56AddButtons(); v56MarkMeta(); }
function v56Handlers(){
  if(window.__v56Handlers) return;
  window.__v56Handlers = true;
  document.addEventListener('click', event => {
    const model = event.target.closest('[data-v56-model]');
    if(model){ v56OpenModel(model.dataset.v56Model); return; }
    if(event.target.closest('[data-v56-close]') || (event.target.classList && event.target.classList.contains('v56-model-modal'))){ v56$('.v56-model-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v554-mode],[data-v554-reset],[data-v554-domain],[data-v554-asset],[data-v554-core]')) setTimeout(v56Apply, 420);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v56$('.v56-model-modal')?.remove(); });
}

v56Handlers();
v56LoadRegistry().then(() => setTimeout(v56Apply, 1800)).catch(error => console.warn('CyberShield V56 model registry unavailable', error));
window.addEventListener('load', () => setTimeout(v56Apply, 2200), { once: true });
setTimeout(v56Apply, 2600);
