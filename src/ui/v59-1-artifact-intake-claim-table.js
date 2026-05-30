// V59.1 Artifact Intake and Claim Table Prototype
// Purpose: static artifact intake panel and editable-looking claim table for Internet Trust Engine workflow.
// Boundary: no live URL ingestion, internet retrieval, claim extraction, evidence verification, scoring, or political validation.

const V591_INTAKE_PATH = 'data/internet-trust/v59-1-artifact-intake-claim-table.json';
const V591_STATE = { registry: null };

function v591$(selector, root = document){ return root.querySelector(selector); }
function v591Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v591LoadRegistry(){
  if(V591_STATE.registry) return V591_STATE.registry;
  const response = await fetch(V591_INTAKE_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Artifact intake registry fetch failed: ${response.status}`);
  V591_STATE.registry = await response.json();
  window.CyberShieldArtifactIntakeClaimTableV591 = V591_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:artifact-intake-claim-table-loaded', { detail: { registry: V591_STATE.registry } }));
  return V591_STATE.registry;
}

function v591InstallStyles(){
  if(v591$('#v59-1-intake-claim-style')) return;
  const style = document.createElement('style');
  style.id = 'v59-1-intake-claim-style';
  style.textContent = `
    .v591-panel{border:1px solid rgba(66,215,255,.32);border-radius:24px;background:linear-gradient(180deg,rgba(7,27,48,.95),rgba(3,13,24,.99));box-shadow:0 22px 48px rgba(0,0,0,.32),0 0 36px rgba(66,215,255,.1);padding:16px;margin:12px 0;color:#dff7ff}
    .v591-panel h2,.v591-panel h3{margin:0 0 8px;color:#fff}.v591-panel p{line-height:1.52}.v591-kicker{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(66,215,255,.4);border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v591-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin-top:10px}.v591-field{border:1px solid rgba(66,215,255,.18);border-radius:14px;background:rgba(255,255,255,.045);padding:10px}.v591-field label{display:block;color:#8fd6ff;font-size:.72rem;text-transform:uppercase;font-weight:900;letter-spacing:.07em;margin-bottom:5px}.v591-field input,.v591-field textarea{width:100%;box-sizing:border-box;border:1px solid rgba(66,215,255,.24);border-radius:10px;background:rgba(0,0,0,.24);color:#dff7ff;padding:8px;font:inherit}.v591-field textarea{min-height:70px}.v591-small{font-size:.8rem;color:#bfefff;line-height:1.45}.v591-table-wrap{overflow:auto;border:1px solid rgba(66,215,255,.16);border-radius:14px;margin-top:10px}.v591-table{width:100%;border-collapse:collapse;min-width:980px}.v591-table th,.v591-table td{border-bottom:1px solid rgba(66,215,255,.12);padding:9px;text-align:left;vertical-align:top}.v591-table th{color:#8fd6ff;font-size:.72rem;text-transform:uppercase;background:rgba(66,215,255,.06)}.v591-pill{display:inline-flex;border:1px solid rgba(66,215,255,.36);border-radius:999px;padding:3px 7px;font-size:.7rem;font-weight:900;text-transform:uppercase;color:#8fd6ff;margin:2px}.v591-status{color:#ffd166}.v591-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v591-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v591-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v591-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v591-code{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:.76rem;background:rgba(0,0,0,.28);border:1px solid rgba(66,215,255,.16);border-radius:14px;padding:10px;overflow:auto}
    .v591-modal{position:fixed;inset:0;z-index:10011;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v591-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v591-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v591-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}
  `;
  document.head.appendChild(style);
}

function v591Rows(){ return V591_STATE.registry?.claim_rows || []; }
function v591Intake(){ return V591_STATE.registry?.artifact_intake || {}; }

function v591FieldHtml(field){
  const value = v591Intake()[field.id] || '';
  const isLong = ['reliance_purpose','risk_if_wrong','audience'].includes(field.id);
  return `<div class="v591-field"><label>${v591Esc(field.label)}${field.required ? ' *' : ''}</label>${isLong ? `<textarea aria-label="${v591Esc(field.label)}">${v591Esc(value)}</textarea>` : `<input aria-label="${v591Esc(field.label)}" value="${v591Esc(value)}" />`}</div>`;
}

function v591TableHtml(){
  return `<div class="v591-table-wrap"><table class="v591-table"><thead><tr><th>Claim</th><th>Sentence</th><th>Type</th><th>Evidence</th><th>Model Trace</th><th>Reliance Risk</th><th>Missing Evidence</th><th>Next Step</th><th>Proof</th></tr></thead><tbody>${v591Rows().map(row => `<tr><td><strong>${v591Esc(row.claim_id)}</strong></td><td>${v591Esc(row.sentence)}</td><td><span class="v591-pill">${v591Esc(row.claim_type)}</span></td><td><span class="v591-status">${v591Esc(row.evidence_state)}</span><br><span class="v591-small">${v591Esc(row.confidence_label)}</span></td><td>${(row.model_trace || []).map(x => `<span class="v591-pill">${v591Esc(x)}</span>`).join('')}</td><td>${v591Esc(row.reliance_risk)}</td><td>${v591Esc(row.missing_evidence)}</td><td>${v591Esc(row.next_step)}</td><td><span class="v591-pill">${v591Esc(row.proof_pack_ready)}</span></td></tr>`).join('')}</tbody></table></div>`;
}

function v591Html(){
  const r = V591_STATE.registry;
  if(!r) return '';
  return `<section class="v591-panel"><span class="v591-kicker">Artifact intake prototype</span><h2>Artifact Intake and Claim Table</h2><p>${v591Esc(r.purpose)}</p><div class="v591-grid">${(r.intake_fields || []).map(v591FieldHtml).join('')}</div><h3>Claim Table Prototype</h3><p class="v591-small">Editable-looking prototype only. Rows are static and not produced by live extraction.</p>${v591TableHtml()}<div class="v591-actions"><button type="button" class="v591-btn" data-v591-open>Open intake trace</button><button type="button" class="v591-btn" data-v591-download>Download claim table summary</button></div><div class="v591-boundary"><strong>Boundary:</strong> ${v591Esc(r.boundary)}</div></section>`;
}

function v591TraceObject(){
  const r = V591_STATE.registry || {};
  return {
    version:'V59.1',
    product:'CyberShield Executive OS',
    generated_at:new Date().toISOString(),
    artifact_intake:r.artifact_intake,
    claim_rows:r.claim_rows,
    editable_prototype_behavior:r.editable_prototype_behavior,
    definition_of_done:r.definition_of_done,
    boundary:r.boundary
  };
}

function v591OpenTrace(){
  v591InstallStyles();
  v591$('.v591-modal')?.remove();
  const modal = document.createElement('div');
  modal.className = 'v591-modal';
  modal.innerHTML = `<section class="v591-modal-card" role="dialog" aria-modal="true" aria-label="Artifact Intake Claim Table Trace"><header><div><h2>Artifact Intake and Claim Table Trace</h2><p>${v591Esc(V591_STATE.registry?.controlling_principle || '')}</p></div><button type="button" class="v591-close" data-v591-close>Close</button></header><pre class="v591-code">${v591Esc(JSON.stringify(v591TraceObject(), null, 2))}</pre><div class="v591-boundary"><strong>Boundary:</strong> ${v591Esc(V591_STATE.registry?.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v591Download(){
  const r = V591_STATE.registry || {};
  const lines = [
    'CyberShield Executive OS Artifact Intake and Claim Table Prototype',
    '',
    `Generated: ${new Date().toISOString()}`,
    'Build: V59.1',
    '',
    `Artifact: ${r.artifact_intake?.artifact_title || ''}`,
    `Reliance Purpose: ${r.artifact_intake?.reliance_purpose || ''}`,
    `Risk If Wrong: ${r.artifact_intake?.risk_if_wrong || ''}`,
    '',
    'Claim Rows:',
    ...v591Rows().map(row => `- ${row.claim_id}: ${row.sentence} | ${row.claim_type} | evidence=${row.evidence_state} | proof=${row.proof_pack_ready} | next=${row.next_step}`),
    '',
    `Boundary: ${r.boundary || ''}`
  ];
  const blob = new Blob([lines.join('\n')], { type:'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cybershield-v59-1-artifact-intake-claim-table.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v591Inject(){
  const evidence = v591$('#evidence.active');
  if(evidence && !v591$('#v591EvidenceIntakeClaim', evidence)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v591EvidenceIntakeClaim';
    wrapper.innerHTML = v591Html();
    evidence.insertAdjacentElement('afterbegin', wrapper);
  }
  const proof = v591$('#proof.active');
  if(proof && !v591$('#v591ProofIntakeClaim', proof)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v591ProofIntakeClaim';
    wrapper.innerHTML = v591Html();
    proof.insertAdjacentElement('afterbegin', wrapper);
  }
}

function v591MarkMeta(){
  const payload = v591$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V59.1 Artifact Intake and Claim Table Prototype';
    parsed.version = 'V59.1';
    parsed.previous_operational_build = 'V59 Internet Trust Engine MVP Scaffold';
    parsed.artifact_intake_claim_table = { status:'active_static_prototype', path: V591_INTAKE_PATH, claim_count: v591Rows().length, boundary: V591_STATE.registry?.boundary, github_pages_browser_qa_required:true };
    parsed.prototype_boundary = 'Static advisory prototype only. No live ingestion, URL retrieval, internet retrieval, evidence retrieval, claim extraction, scoring, political validation, report delivery, workflow automation, ticketing, notifications, or live integrations.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v591Apply(){ v591InstallStyles(); v591Inject(); v591MarkMeta(); }
function v591Handlers(){
  if(window.__v591Handlers) return;
  window.__v591Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('[data-v591-open]')){ v591OpenTrace(); return; }
    if(event.target.closest('[data-v591-download]')){ v591Download(); return; }
    if(event.target.closest('[data-v591-close]') || (event.target.classList && event.target.classList.contains('v591-modal'))){ v591$('.v591-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v59-open],[data-v582-link],[data-v581-route],[data-v581-open],[data-v58-route],[data-v58-open],[data-v571-open],[data-v57-open],[data-v564-model],[data-v563-open],[data-v562-record],[data-v561-open]')) setTimeout(v591Apply, 1100);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v591$('.v591-modal')?.remove(); });
}

v591Handlers();
v591LoadRegistry().then(() => setTimeout(v591Apply, 6500)).catch(error => console.warn('CyberShield V59.1 artifact intake unavailable', error));
window.addEventListener('load', () => setTimeout(v591Apply, 7200), { once:true });
setTimeout(v591Apply, 8200);
