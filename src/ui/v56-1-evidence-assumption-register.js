// V56.1 Evidence and Assumption Register
// Purpose: show what is provided, missing, stale, assumed, conflicting, or needs verification.
// Boundary: static advisory prototype only. No live evidence retrieval or compliance validation.

const V561_EVIDENCE_PATH = 'data/evidence/v56-1-evidence-assumption-register.json';
const V561_STATE = { register: null };

function v561$(selector, root = document){ return root.querySelector(selector); }
function v561$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v561Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v561LoadRegister(){
  if(V561_STATE.register) return V561_STATE.register;
  const response = await fetch(V561_EVIDENCE_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Evidence register fetch failed: ${response.status}`);
  V561_STATE.register = await response.json();
  window.CyberShieldEvidenceAssumptionRegisterV561 = V561_STATE.register;
  document.dispatchEvent(new CustomEvent('cybershield:evidence-register-loaded', { detail: { register: V561_STATE.register } }));
  return V561_STATE.register;
}

function v561Items(){ return Array.isArray(V561_STATE.register?.register_items) ? V561_STATE.register.register_items : []; }
function v561StateLabel(id){ return V561_STATE.register?.evidence_states?.find(s => s.id === id)?.label || id; }
function v561StateMeaning(id){ return V561_STATE.register?.evidence_states?.find(s => s.id === id)?.meaning || ''; }
function v561Color(state){ return { provided:'#25e69b', missing:'#ff4c4c', stale:'#ff8a30', assumed:'#ffd166', conflicting:'#ff6bba', needs_verification:'#42d7ff' }[state] || '#42d7ff'; }

function v561InstallStyles(){
  if(v561$('#v56-1-evidence-register-style')) return;
  const style = document.createElement('style');
  style.id = 'v56-1-evidence-register-style';
  style.textContent = `
    .v561-register{border:1px solid rgba(66,215,255,.24);border-radius:18px;background:rgba(3,13,24,.72);padding:14px;margin:12px 0;color:#dff7ff}
    .v561-register h3{margin:0 0 8px;color:#fff}.v561-register p{line-height:1.48}.v561-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin-top:10px}.v561-item{border:1px solid rgba(66,215,255,.18);border-radius:14px;background:rgba(255,255,255,.045);padding:10px}.v561-state{display:inline-flex;align-items:center;gap:6px;border:1px solid currentColor;border-radius:999px;padding:3px 7px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:var(--state-color)}.v561-dot{width:9px;height:9px;border-radius:50%;background:currentColor;box-shadow:0 0 9px currentColor}.v561-item strong{color:#fff}.v561-small{font-size:.78rem;color:#bfefff}.v561-open{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:7px 10px;font-weight:900;cursor:pointer;margin-top:8px;display:inline-flex}.v561-open:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}
    .v561-modal{position:fixed;inset:0;z-index:10001;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v561-card{width:min(940px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v561-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v561-card h2{margin:0;color:#fff;font-size:1.35rem}.v561-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}.v561-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}
  `;
  document.head.appendChild(style);
}

function v561SummaryCounts(){
  return v561Items().reduce((acc, item) => { acc[item.state] = (acc[item.state] || 0) + 1; return acc; }, {});
}

function v561RegisterHtml(limit = 7){
  const counts = v561SummaryCounts();
  const countText = Object.entries(counts).map(([state,count]) => `${v561StateLabel(state)}: ${count}`).join(' • ');
  const items = v561Items().slice(0, limit);
  return `<section class="v561-register"><h3>Evidence and Assumption Register</h3><p class="v561-small">Separates what is provided, missing, stale, assumed, conflicting, or needs verification before decision reliance.</p><p class="v561-small">${v561Esc(countText || 'No register items loaded')}</p><div class="v561-grid">${items.map(item => v561ItemHtml(item)).join('')}</div><button type="button" class="v561-open" data-v561-open>Open full register</button></section>`;
}

function v561ItemHtml(item){
  return `<article class="v561-item"><span class="v561-state" style="--state-color:${v561Color(item.state)}"><span class="v561-dot"></span>${v561Esc(v561StateLabel(item.state))}</span><p><strong>${v561Esc(item.title)}</strong></p><p class="v561-small">Owner: ${v561Esc(item.owner)}</p><p class="v561-small">Risk if wrong: ${v561Esc(item.decision_risk_if_wrong)}</p></article>`;
}

function v561OpenRegister(){
  v561InstallStyles();
  v561$('.v561-modal')?.remove();
  const modal = document.createElement('div');
  modal.className = 'v561-modal';
  modal.innerHTML = `<section class="v561-card" role="dialog" aria-modal="true" aria-label="Evidence and Assumption Register"><header><div><h2>Evidence and Assumption Register</h2><p>${v561Esc(V561_STATE.register?.boundary || 'Static advisory prototype only.')}</p></div><button class="v561-close" type="button" data-v561-close>Close</button></header><div class="v561-grid">${v561Items().map(item => `<article class="v561-item"><span class="v561-state" style="--state-color:${v561Color(item.state)}"><span class="v561-dot"></span>${v561Esc(v561StateLabel(item.state))}</span><p><strong>${v561Esc(item.title)}</strong></p><p>${v561Esc(v561StateMeaning(item.state))}</p><p class="v561-small"><strong>Evidence type:</strong> ${v561Esc(item.evidence_type)}</p><p class="v561-small"><strong>Owner:</strong> ${v561Esc(item.owner)}</p><p class="v561-small"><strong>Verification path:</strong> ${v561Esc(item.verification_path)}</p><p class="v561-small"><strong>Decision risk if wrong:</strong> ${v561Esc(item.decision_risk_if_wrong)}</p></article>`).join('')}</div><div class="v561-boundary"><strong>Boundary:</strong> ${v561Esc(V561_STATE.register?.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v561InjectEvidenceView(){
  const evidence = v561$('#evidence.active');
  if(!evidence || v561$('#v561EvidenceRegister', evidence)) return;
  const wrapper = document.createElement('div');
  wrapper.id = 'v561EvidenceRegister';
  wrapper.innerHTML = v561RegisterHtml(7);
  evidence.insertAdjacentElement('afterbegin', wrapper);
}

function v561InjectTrustMapContext(){
  const trustmap = v561$('#trustmap.active');
  const detail = v561$('.v554-detail', trustmap || document);
  if(!detail || detail.dataset.v561Evidence === 'true') return;
  detail.dataset.v561Evidence = 'true';
  const selectedAsset = v561$('.v554-asset.active', trustmap);
  const domainId = selectedAsset?.dataset.v554Domain || v561$('.v554-domain.active', trustmap)?.dataset.v554Domain;
  const assetId = selectedAsset?.dataset.v554Asset;
  const related = v561Items().filter(item => item.domain_id === domainId && (!assetId || item.asset_id === assetId)).slice(0, 3);
  if(!related.length) return;
  detail.insertAdjacentHTML('beforeend', `<div class="v561-register"><h3>Related evidence state</h3><div class="v561-grid">${related.map(v561ItemHtml).join('')}</div><button type="button" class="v561-open" data-v561-open>Open evidence register</button></div>`);
}

function v561MarkMeta(){
  const payload = v561$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V56.1 Evidence and Assumption Register';
    parsed.version = 'V56.1';
    parsed.previous_operational_build = 'V56 Trust Model Registry and Score Explanation Layer';
    parsed.evidence_assumption_register = { status: 'active', path: V561_EVIDENCE_PATH, item_count: v561Items().length, boundary: V561_STATE.register?.boundary || 'Static advisory prototype only.', github_pages_browser_qa_required: true };
    parsed.prototype_boundary = 'Static advisory prototype only. No live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, or live internet claim verification.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v561Apply(){ v561InstallStyles(); v561InjectEvidenceView(); v561InjectTrustMapContext(); v561MarkMeta(); }
function v561Handlers(){
  if(window.__v561Handlers) return;
  window.__v561Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('[data-v561-open]')){ v561OpenRegister(); return; }
    if(event.target.closest('[data-v561-close]') || (event.target.classList && event.target.classList.contains('v561-modal'))){ v561$('.v561-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v554-mode],[data-v554-reset],[data-v554-domain],[data-v554-asset],[data-v554-core],[data-v556-route]')) setTimeout(v561Apply, 520);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v561$('.v561-modal')?.remove(); });
}

v561Handlers();
v561LoadRegister().then(() => setTimeout(v561Apply, 2000)).catch(error => console.warn('CyberShield V56.1 evidence register unavailable', error));
window.addEventListener('load', () => setTimeout(v561Apply, 2400), { once: true });
setTimeout(v561Apply, 3000);
