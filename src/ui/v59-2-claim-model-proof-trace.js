// V59.2 Claim Row to Model Trace and Proof Pack Output
// Purpose: connect static claim rows to Core Trust Scoring Models, evidence states, decision records, and Proof Pack sections.
// Boundary: static advisory prototype only. No live extraction, scoring, verification, evidence retrieval, or political validation.

const V592_TRACE_PATH = 'data/internet-trust/v59-2-claim-model-proof-trace.json';
const V592_STATE = { registry: null };

function v592$(selector, root = document){ return root.querySelector(selector); }
function v592$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v592Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v592LoadRegistry(){
  if(V592_STATE.registry) return V592_STATE.registry;
  const response = await fetch(V592_TRACE_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Claim model proof trace fetch failed: ${response.status}`);
  V592_STATE.registry = await response.json();
  window.CyberShieldClaimModelProofTraceV592 = V592_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:claim-model-proof-trace-loaded', { detail: { registry: V592_STATE.registry } }));
  return V592_STATE.registry;
}

function v592Traces(){ return Array.isArray(V592_STATE.registry?.claim_traces) ? V592_STATE.registry.claim_traces : []; }
function v592FindTrace(id){ return v592Traces().find(trace => trace.claim_id === id) || null; }
function v592Rows(){ return window.CyberShieldArtifactIntakeClaimTableV591?.claim_rows || []; }
function v592FindRow(id){ return v592Rows().find(row => row.claim_id === id) || {}; }

function v592InstallStyles(){
  if(v592$('#v59-2-claim-trace-style')) return;
  const style = document.createElement('style');
  style.id = 'v59-2-claim-trace-style';
  style.textContent = `
    .v592-trace{border:1px solid rgba(66,215,255,.3);border-radius:24px;background:linear-gradient(180deg,rgba(7,27,48,.95),rgba(3,13,24,.99));box-shadow:0 22px 48px rgba(0,0,0,.32),0 0 36px rgba(66,215,255,.1);padding:16px;margin:12px 0;color:#dff7ff}
    .v592-trace h2,.v592-trace h3{margin:0 0 8px;color:#fff}.v592-trace p{line-height:1.52}.v592-kicker{display:inline-flex;border:1px solid rgba(66,215,255,.4);border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v592-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin-top:10px}.v592-card{border:1px solid rgba(66,215,255,.18);border-radius:16px;background:rgba(255,255,255,.045);padding:12px}.v592-card strong{color:#fff}.v592-small{font-size:.8rem;color:#bfefff;line-height:1.45}.v592-pill{display:inline-flex;border:1px solid rgba(66,215,255,.36);border-radius:999px;padding:3px 7px;font-size:.7rem;font-weight:900;text-transform:uppercase;color:#8fd6ff;margin:2px}.v592-action{color:#ffd166;font-weight:900}.v592-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v592-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v592-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v592-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v592-code{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:.76rem;background:rgba(0,0,0,.28);border:1px solid rgba(66,215,255,.16);border-radius:14px;padding:10px;overflow:auto}
    .v592-modal{position:fixed;inset:0;z-index:10012;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v592-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v592-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v592-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}
  `;
  document.head.appendChild(style);
}

function v592TraceCard(trace){
  const row = v592FindRow(trace.claim_id);
  return `<article class="v592-card"><strong>${v592Esc(trace.claim_id)}</strong><p class="v592-small">${v592Esc(row.sentence || trace.proof_output_sentence)}</p><p class="v592-small"><strong>Evidence:</strong> ${v592Esc(trace.evidence_state)}</p><p class="v592-small"><strong>Runtime reliance:</strong> <span class="v592-action">${v592Esc(trace.runtime_reliance_action)}</span></p><p class="v592-small"><strong>Human review:</strong> ${trace.human_review_required ? 'Required' : 'Not required for doctrine demo'}</p><p class="v592-small">${v592Esc(trace.proof_output_sentence)}</p><button type="button" class="v592-btn" data-v592-claim="${v592Esc(trace.claim_id)}">Open model/proof trace</button></article>`;
}

function v592Html(){
  const registry = V592_STATE.registry;
  if(!registry) return '';
  const highReview = v592Traces().filter(t => t.human_review_required).length;
  return `<section class="v592-trace"><span class="v592-kicker">Claim model proof trace</span><h2>Claim Row to Proof Pack Output</h2><p>${v592Esc(registry.proof_pack_output_template?.headline || registry.controlling_principle)}</p><div class="v592-grid"><article class="v592-card"><strong>Claim traces</strong><p class="v592-small">${v592Esc(v592Traces().length)} static claim rows mapped</p></article><article class="v592-card"><strong>Human review required</strong><p class="v592-small">${v592Esc(highReview)} claims require human review before reliance</p></article><article class="v592-card"><strong>Decision use</strong><p class="v592-small">${v592Esc(registry.proof_pack_output_template?.decision_use || '')}</p></article></div><div class="v592-grid">${v592Traces().map(v592TraceCard).join('')}</div><div class="v592-actions"><button type="button" class="v592-btn" data-v592-all>Open all claim traces</button><button type="button" class="v592-btn" data-v592-download>Download claim proof trace</button></div><div class="v592-boundary"><strong>Boundary:</strong> ${v592Esc(registry.boundary)}</div></section>`;
}

function v592OpenTrace(id){
  v592InstallStyles();
  v592$('.v592-modal')?.remove();
  const traces = id === 'all' ? v592Traces() : [v592FindTrace(id)].filter(Boolean);
  const modal = document.createElement('div');
  modal.className = 'v592-modal';
  modal.innerHTML = `<section class="v592-modal-card" role="dialog" aria-modal="true" aria-label="Claim Model Proof Trace"><header><div><h2>Claim Model and Proof Pack Trace</h2><p>${v592Esc(V592_STATE.registry?.controlling_principle || '')}</p></div><button type="button" class="v592-close" data-v592-close>Close</button></header>${traces.map(trace => { const row = v592FindRow(trace.claim_id); return `<article class="v592-card" style="margin-bottom:12px"><h3>${v592Esc(trace.claim_id)}</h3><p>${v592Esc(row.sentence || '')}</p><p><strong>Models:</strong> ${(trace.model_ids || []).map(x => `<span class="v592-pill">${v592Esc(x)}</span>`).join('')}</p><p><strong>Evidence refs:</strong> ${(trace.evidence_register_refs || []).map(x => `<span class="v592-pill">${v592Esc(x)}</span>`).join('')}</p><p><strong>Decision records:</strong> ${(trace.decision_record_refs || []).map(x => `<span class="v592-pill">${v592Esc(x)}</span>`).join('')}</p><p><strong>Proof sections:</strong> ${(trace.proof_pack_sections || []).map(x => `<span class="v592-pill">${v592Esc(x)}</span>`).join('')}</p><p><strong>Runtime reliance action:</strong> <span class="v592-action">${v592Esc(trace.runtime_reliance_action)}</span></p><p><strong>Proof output:</strong> ${v592Esc(trace.proof_output_sentence)}</p><p><strong>Human review:</strong> ${trace.human_review_required ? 'Required' : 'Not required for doctrine demonstration'}</p><div class="v592-boundary"><strong>Item boundary:</strong> ${v592Esc(trace.prototype_boundary)}</div></article>`; }).join('')}<h3>Raw trace object</h3><pre class="v592-code">${v592Esc(JSON.stringify(traces, null, 2))}</pre><div class="v592-boundary"><strong>Global boundary:</strong> ${v592Esc(V592_STATE.registry?.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v592Download(){
  const lines = [
    'CyberShield Executive OS Claim Row to Model Trace and Proof Pack Output',
    '',
    `Generated: ${new Date().toISOString()}`,
    'Build: V59.2',
    '',
    ...(v592Traces().map(trace => [`${trace.claim_id}`, `Models: ${(trace.model_ids || []).join(', ')}`, `Evidence State: ${trace.evidence_state}`, `Evidence Refs: ${(trace.evidence_register_refs || []).join(', ')}`, `Decision Records: ${(trace.decision_record_refs || []).join(', ')}`, `Proof Sections: ${(trace.proof_pack_sections || []).join(', ')}`, `Runtime Reliance Action: ${trace.runtime_reliance_action}`, `Human Review Required: ${trace.human_review_required}`, `Proof Output: ${trace.proof_output_sentence}`, `Boundary: ${trace.prototype_boundary}`, ''].join('\n'))),
    `Global Boundary: ${V592_STATE.registry?.boundary || ''}`
  ];
  const blob = new Blob([lines.join('\n')], { type:'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cybershield-v59-2-claim-model-proof-trace.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v592EnhanceClaimTable(){
  const table = v592$('.v591-table');
  if(!table || table.dataset.v592Enhanced === 'true') return;
  table.dataset.v592Enhanced = 'true';
  v592$$("tbody tr", table).forEach(rowEl => {
    const claimId = rowEl.querySelector('td strong')?.textContent?.trim();
    if(!claimId || !v592FindTrace(claimId)) return;
    const cell = rowEl.lastElementChild;
    if(cell) cell.insertAdjacentHTML('beforeend', `<br><button type="button" class="v592-btn" data-v592-claim="${v592Esc(claimId)}">Trace</button>`);
  });
}

function v592Inject(){
  const evidence = v592$('#evidence.active');
  if(evidence && !v592$('#v592EvidenceClaimTrace', evidence)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v592EvidenceClaimTrace';
    wrapper.innerHTML = v592Html();
    evidence.appendChild(wrapper);
  }
  const proof = v592$('#proof.active');
  if(proof && !v592$('#v592ProofClaimTrace', proof)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v592ProofClaimTrace';
    wrapper.innerHTML = v592Html();
    proof.insertAdjacentElement('afterbegin', wrapper);
  }
  v592EnhanceClaimTable();
}

function v592MarkMeta(){
  const payload = v592$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V59.2 Claim Row to Model Trace and Proof Pack Output';
    parsed.version = 'V59.2';
    parsed.previous_operational_build = 'V59.1 Artifact Intake and Claim Table Prototype';
    parsed.claim_model_proof_trace = { status:'active_static_trace', path: V592_TRACE_PATH, claim_trace_count: v592Traces().length, boundary: V592_STATE.registry?.boundary, github_pages_browser_qa_required:true };
    parsed.prototype_boundary = 'Static advisory prototype only. No live extraction, scoring, verification, evidence retrieval, internet retrieval, URL ingestion, political validation, report delivery, workflow automation, ticketing, notifications, or live integrations.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v592Apply(){ v592InstallStyles(); v592Inject(); v592MarkMeta(); }
function v592Handlers(){
  if(window.__v592Handlers) return;
  window.__v592Handlers = true;
  document.addEventListener('click', event => {
    const claim = event.target.closest('[data-v592-claim]');
    if(claim){ v592OpenTrace(claim.dataset.v592Claim); return; }
    if(event.target.closest('[data-v592-all]')){ v592OpenTrace('all'); return; }
    if(event.target.closest('[data-v592-download]')){ v592Download(); return; }
    if(event.target.closest('[data-v592-close]') || (event.target.classList && event.target.classList.contains('v592-modal'))){ v592$('.v592-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v591-open],[data-v591-download],[data-v59-open],[data-v582-link],[data-v581-route],[data-v581-open],[data-v58-route],[data-v58-open],[data-v571-open],[data-v57-open],[data-v564-model],[data-v563-open],[data-v562-record],[data-v561-open]')) setTimeout(v592Apply, 1150);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v592$('.v592-modal')?.remove(); });
}

v592Handlers();
v592LoadRegistry().then(() => setTimeout(v592Apply, 7200)).catch(error => console.warn('CyberShield V59.2 claim proof trace unavailable', error));
window.addEventListener('load', () => setTimeout(v592Apply, 8000), { once:true });
setTimeout(v592Apply, 9000);
