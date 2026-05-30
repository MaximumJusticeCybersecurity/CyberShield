// V56.4 Core Trust Scoring Models MVP
// Purpose: expose the first seven Trust Scoring Models as inspectable, versioned models.
// Boundary: static advisory prototype only. No live scoring, claim extraction, evidence retrieval, or enforcement.

const V564_MODELS_PATH = 'data/models/v56-4-core-trust-scoring-models.json';
const V564_STATE = { registry: null };

function v564$(selector, root = document){ return root.querySelector(selector); }
function v564$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v564Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v564LoadModels(){
  if(V564_STATE.registry) return V564_STATE.registry;
  const response = await fetch(V564_MODELS_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Core Trust Scoring Models fetch failed: ${response.status}`);
  V564_STATE.registry = await response.json();
  window.CyberShieldCoreTrustScoringModelsV564 = V564_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:core-trust-scoring-models-loaded', { detail: { registry: V564_STATE.registry } }));
  return V564_STATE.registry;
}

function v564Models(){ return Array.isArray(V564_STATE.registry?.models) ? V564_STATE.registry.models : []; }
function v564FindModel(id){ return v564Models().find(model => model.id === id) || v564Models()[0] || null; }

function v564InstallStyles(){
  if(v564$('#v56-4-core-models-style')) return;
  const style = document.createElement('style');
  style.id = 'v56-4-core-models-style';
  style.textContent = `
    .v564-models{border:1px solid rgba(66,215,255,.24);border-radius:18px;background:rgba(3,13,24,.72);padding:14px;margin:12px 0;color:#dff7ff}
    .v564-models h3{margin:0 0 8px;color:#fff}.v564-models p{line-height:1.48}.v564-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin-top:10px}.v564-card{border:1px solid rgba(66,215,255,.18);border-radius:14px;background:rgba(255,255,255,.045);padding:10px}.v564-card strong{color:#fff}.v564-small{font-size:.78rem;color:#bfefff}.v564-pill{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(66,215,255,.38);border-radius:999px;padding:3px 7px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v564-open{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:7px 10px;font-weight:900;cursor:pointer;margin-top:8px;display:inline-flex;margin-right:6px}.v564-open:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}
    .v564-modal{position:fixed;inset:0;z-index:10004;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v564-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v564-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v564-modal-card h2{margin:0;color:#fff;font-size:1.35rem}.v564-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}.v564-factor{border:1px solid rgba(66,215,255,.18);border-radius:14px;background:rgba(255,255,255,.045);padding:10px}.v564-factor b{display:block;color:#fff}.v564-weight{float:right;color:#25e69b;font-weight:900}.v564-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v564-list{margin:0;padding-left:18px}.v564-list li{margin:4px 0}
  `;
  document.head.appendChild(style);
}

function v564Card(model){
  return `<article class="v564-card"><span class="v564-pill">${v564Esc(model.object_type)}</span><p><strong>${v564Esc(model.score_name)}</strong></p><p class="v564-small">${v564Esc(model.purpose)}</p><p class="v564-small">Maturity: ${v564Esc(model.maturity)} • v${v564Esc(model.version)}</p><button type="button" class="v564-open" data-v564-model="${v564Esc(model.id)}">Inspect model</button></article>`;
}

function v564SummaryHtml(){
  const registry = V564_STATE.registry;
  if(!registry) return '';
  return `<section class="v564-models"><h3>Core Trust Scoring Models</h3><p class="v564-small">${v564Esc(registry.controlling_principle)}</p><div class="v564-grid">${v564Models().map(v564Card).join('')}</div><button type="button" class="v564-open" data-v564-model="all">Open model registry</button></section>`;
}

function v564ModelModal(modelId){
  v564InstallStyles();
  v564$('.v564-modal')?.remove();
  const models = modelId === 'all' ? v564Models() : [v564FindModel(modelId)].filter(Boolean);
  const modal = document.createElement('div');
  modal.className = 'v564-modal';
  modal.innerHTML = `<section class="v564-modal-card" role="dialog" aria-modal="true" aria-label="Core Trust Scoring Models"><header><div><h2>Core Trust Scoring Models</h2><p>${v564Esc(V564_STATE.registry?.controlling_principle || '')}</p></div><button type="button" class="v564-close" data-v564-close>Close</button></header>${models.map(model => `<article class="v564-card" style="margin-bottom:14px"><span class="v564-pill">${v564Esc(model.object_type)} • ${v564Esc(model.maturity)} • v${v564Esc(model.version)}</span><h3>${v564Esc(model.name)}</h3><p><strong>Score:</strong> ${v564Esc(model.score_name)}</p><p>${v564Esc(model.purpose)}</p><h3>Factors</h3><div class="v564-grid">${(model.factors || []).map(factor => `<div class="v564-factor"><b>${v564Esc(factor.label)} <span class="v564-weight">${Math.round(Number(factor.weight || 0) * 100)}%</span></b><p>${v564Esc(factor.description)}</p></div>`).join('')}</div><h3>Evidence Standard</h3><ul class="v564-list">${(model.evidence_standard || []).map(item => `<li>${v564Esc(item)}</li>`).join('')}</ul><h3>Failure Conditions</h3><ul class="v564-list">${(model.failure_conditions || []).map(item => `<li>${v564Esc(item)}</li>`).join('')}</ul><p><strong>Runtime mapping:</strong> ${v564Esc(model.runtime_mapping)}</p></article>`).join('')}<div class="v564-boundary"><strong>Boundary:</strong> ${v564Esc(V564_STATE.registry?.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v564Inject(){
  const architecture = v564$('#architecture.active');
  if(architecture && !v564$('#v564ArchitectureModels', architecture)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v564ArchitectureModels';
    wrapper.innerHTML = v564SummaryHtml();
    architecture.insertAdjacentElement('afterbegin', wrapper);
  }
  const evidence = v564$('#evidence.active');
  if(evidence && !v564$('#v564EvidenceModels', evidence)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v564EvidenceModels';
    wrapper.innerHTML = v564SummaryHtml();
    evidence.appendChild(wrapper);
  }
  const proof = v564$('#proof.active');
  if(proof && !v564$('#v564ProofModels', proof)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v564ProofModels';
    wrapper.innerHTML = v564SummaryHtml();
    proof.appendChild(wrapper);
  }
}

function v564MarkMeta(){
  const payload = v564$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V56.4 Core Trust Scoring Models MVP';
    parsed.version = 'V56.4';
    parsed.previous_operational_build = 'V56.3 Universal Score Object and Score Band Contract';
    parsed.core_trust_scoring_models = { status: 'active', path: V564_MODELS_PATH, model_count: v564Models().length, controlling_principle: V564_STATE.registry?.controlling_principle, boundary: V564_STATE.registry?.boundary, github_pages_browser_qa_required: true };
    parsed.prototype_boundary = 'Static advisory prototype only. No live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, live claim extraction, live scoring, or live internet claim verification.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v564Apply(){ v564InstallStyles(); v564Inject(); v564MarkMeta(); }
function v564Handlers(){
  if(window.__v564Handlers) return;
  window.__v564Handlers = true;
  document.addEventListener('click', event => {
    const model = event.target.closest('[data-v564-model]');
    if(model){ v564ModelModal(model.dataset.v564Model); return; }
    if(event.target.closest('[data-v564-close]') || (event.target.classList && event.target.classList.contains('v564-modal'))){ v564$('.v564-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v563-open],[data-v56-model],[data-v562-record],[data-v561-open]')) setTimeout(v564Apply, 700);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v564$('.v564-modal')?.remove(); });
}

v564Handlers();
v564LoadModels().then(() => setTimeout(v564Apply, 2800)).catch(error => console.warn('CyberShield V56.4 core models unavailable', error));
window.addEventListener('load', () => setTimeout(v564Apply, 3300), { once: true });
setTimeout(v564Apply, 4000);
