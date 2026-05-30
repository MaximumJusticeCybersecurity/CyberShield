// V56.3 Universal Score Object and Score Band Contract
// Purpose: expose the score object contract, universal score bands, runtime action ladder, and model trace requirements.
// Boundary: static advisory prototype only. No live scoring, enforcement, evidence retrieval, or certification.

const V563_SCORE_CONTRACT_PATH = 'data/models/v56-3-universal-score-contract.json';
const V563_STATE = { contract: null };

function v563$(selector, root = document){ return root.querySelector(selector); }
function v563$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v563Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v563LoadContract(){
  if(V563_STATE.contract) return V563_STATE.contract;
  const response = await fetch(V563_SCORE_CONTRACT_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Score contract fetch failed: ${response.status}`);
  V563_STATE.contract = await response.json();
  window.CyberShieldUniversalScoreContractV563 = V563_STATE.contract;
  document.dispatchEvent(new CustomEvent('cybershield:score-contract-loaded', { detail: { contract: V563_STATE.contract } }));
  return V563_STATE.contract;
}

function v563InstallStyles(){
  if(v563$('#v56-3-score-contract-style')) return;
  const style = document.createElement('style');
  style.id = 'v56-3-score-contract-style';
  style.textContent = `
    .v563-contract{border:1px solid rgba(66,215,255,.24);border-radius:18px;background:rgba(3,13,24,.72);padding:14px;margin:12px 0;color:#dff7ff}
    .v563-contract h3{margin:0 0 8px;color:#fff}.v563-contract p{line-height:1.48}.v563-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;margin-top:10px}.v563-band{border:1px solid rgba(66,215,255,.18);border-radius:14px;background:rgba(255,255,255,.045);padding:10px}.v563-band strong{color:#fff}.v563-pill{display:inline-flex;align-items:center;gap:6px;border:1px solid currentColor;border-radius:999px;padding:3px 7px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:var(--pill-color)}.v563-dot{width:9px;height:9px;border-radius:50%;background:currentColor;box-shadow:0 0 9px currentColor}.v563-small{font-size:.78rem;color:#bfefff}.v563-open{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:7px 10px;font-weight:900;cursor:pointer;margin-top:8px;display:inline-flex;margin-right:6px}.v563-open:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}
    .v563-modal{position:fixed;inset:0;z-index:10003;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v563-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v563-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v563-card h2{margin:0;color:#fff;font-size:1.35rem}.v563-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}.v563-field{border-bottom:1px solid rgba(66,215,255,.12);padding:7px 0}.v563-field b{display:block;color:#8fd6ff;font-size:.72rem;text-transform:uppercase;letter-spacing:.08em}.v563-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v563-code{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:.75rem;background:rgba(0,0,0,.28);border:1px solid rgba(66,215,255,.16);border-radius:14px;padding:10px;overflow:auto}
  `;
  document.head.appendChild(style);
}

function v563BandColor(label){
  const value = String(label || '').toLowerCase();
  if(value.includes('high trust')) return '#25e69b';
  if(value.includes('caveat')) return '#8fd6ff';
  if(value.includes('moderate')) return '#ffd166';
  if(value.includes('low trust')) return '#ff8a30';
  return '#ff4c4c';
}

function v563SummaryHtml(){
  const c = V563_STATE.contract;
  if(!c) return '';
  return `<section class="v563-contract"><h3>Universal Score Contract</h3><p class="v563-small">${v563Esc(c.controlling_principle)}</p><div class="v563-grid">${(c.universal_score_bands || []).map(band => `<article class="v563-band"><span class="v563-pill" style="--pill-color:${v563BandColor(band.label)}"><span class="v563-dot"></span>${v563Esc(band.label)}</span><p><strong>${v563Esc(band.min)}-${v563Esc(band.max)}</strong></p><p class="v563-small">${v563Esc(band.meaning)}</p><p class="v563-small">Runtime: ${v563Esc(band.runtime_action)}</p></article>`).join('')}</div><button type="button" class="v563-open" data-v563-open>View full score contract</button></section>`;
}

function v563OpenContract(){
  v563InstallStyles();
  v563$('.v563-modal')?.remove();
  const c = V563_STATE.contract;
  const modal = document.createElement('div');
  modal.className = 'v563-modal';
  modal.innerHTML = `<section class="v563-card" role="dialog" aria-modal="true" aria-label="Universal Score Contract"><header><div><h2>Universal Score Object and Score Band Contract</h2><p>${v563Esc(c?.controlling_principle || '')}</p></div><button class="v563-close" type="button" data-v563-close>Close</button></header><h3>Universal Score Bands</h3><div class="v563-grid">${(c?.universal_score_bands || []).map(band => `<article class="v563-band"><span class="v563-pill" style="--pill-color:${v563BandColor(band.label)}"><span class="v563-dot"></span>${v563Esc(band.label)}</span><p><strong>${v563Esc(band.min)}-${v563Esc(band.max)}</strong></p><p>${v563Esc(band.meaning)}</p><p><strong>Action:</strong> ${v563Esc(band.runtime_action)}</p></article>`).join('')}</div><h3>Required Score Object</h3><pre class="v563-code">${v563Esc(JSON.stringify(c?.required_score_object || {}, null, 2))}</pre><h3>Required Model Trace Fields</h3><div class="v563-grid">${(c?.required_model_trace_fields || []).map(field => `<div class="v563-band">${v563Esc(field)}</div>`).join('')}</div><h3>Required Language</h3>${(c?.ui_requirements?.required_language || []).map(line => `<p>${v563Esc(line)}</p>`).join('')}<div class="v563-boundary"><strong>Boundary:</strong> ${v563Esc(c?.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v563Inject(){
  const architecture = v563$('#architecture.active');
  if(architecture && !v563$('#v563ArchitectureContract', architecture)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v563ArchitectureContract';
    wrapper.innerHTML = v563SummaryHtml();
    architecture.insertAdjacentElement('afterbegin', wrapper);
  }
  const evidence = v563$('#evidence.active');
  if(evidence && !v563$('#v563EvidenceContract', evidence)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v563EvidenceContract';
    wrapper.innerHTML = v563SummaryHtml();
    evidence.appendChild(wrapper);
  }
  const proof = v563$('#proof.active');
  if(proof && !v563$('#v563ProofContract', proof)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v563ProofContract';
    wrapper.innerHTML = v563SummaryHtml();
    proof.appendChild(wrapper);
  }
}

function v563MarkModelButtons(){
  v563$$('[data-v56-model]').forEach(button => {
    if(button.dataset.v563Contract === 'true') return;
    button.dataset.v563Contract = 'true';
    button.setAttribute('title', 'Why this score? Opens model explanation and supports the universal score contract.');
  });
}

function v563MarkMeta(){
  const payload = v563$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V56.3 Universal Score Object and Score Band Contract';
    parsed.version = 'V56.3';
    parsed.previous_operational_build = 'V56.2 Decision Record Hardening';
    parsed.universal_score_contract = { status: 'active', path: V563_SCORE_CONTRACT_PATH, controlling_principle: V563_STATE.contract?.controlling_principle, boundary: V563_STATE.contract?.boundary, github_pages_browser_qa_required: true };
    parsed.prototype_boundary = 'Static advisory prototype only. No live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, or live internet claim verification.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v563Apply(){ v563InstallStyles(); v563Inject(); v563MarkModelButtons(); v563MarkMeta(); }
function v563Handlers(){
  if(window.__v563Handlers) return;
  window.__v563Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('[data-v563-open]')){ v563OpenContract(); return; }
    if(event.target.closest('[data-v563-close]') || (event.target.classList && event.target.classList.contains('v563-modal'))){ v563$('.v563-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v56-model],[data-v562-record],[data-v561-open],[data-v554-mode],[data-v554-domain],[data-v554-asset]')) setTimeout(v563Apply, 650);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v563$('.v563-modal')?.remove(); });
}

v563Handlers();
v563LoadContract().then(() => setTimeout(v563Apply, 2600)).catch(error => console.warn('CyberShield V56.3 score contract unavailable', error));
window.addEventListener('load', () => setTimeout(v563Apply, 3000), { once: true });
setTimeout(v563Apply, 3600);
