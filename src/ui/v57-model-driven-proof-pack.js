// V57 Model-Driven Proof Pack
// Purpose: assemble an executive-facing proof artifact from the score contract, core Trust Scoring Models,
// decision records, evidence register, assumptions, caveats, risk if wrong, owner, and boundary language.
// Boundary: static advisory prototype only. No live evidence retrieval, certification, legal determination, or workflow.

const V57_PROOF_SCHEMA_PATH = 'data/proof/v57-model-driven-proof-pack-schema.json';
const V57_STATE = { schema: null };

function v57$(selector, root = document){ return root.querySelector(selector); }
function v57$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v57Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v57LoadSchema(){
  if(V57_STATE.schema) return V57_STATE.schema;
  const response = await fetch(V57_PROOF_SCHEMA_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Proof Pack schema fetch failed: ${response.status}`);
  V57_STATE.schema = await response.json();
  window.CyberShieldModelDrivenProofPackV57 = V57_STATE.schema;
  document.dispatchEvent(new CustomEvent('cybershield:model-driven-proof-pack-loaded', { detail: { schema: V57_STATE.schema } }));
  return V57_STATE.schema;
}

function v57InstallStyles(){
  if(v57$('#v57-proof-pack-style')) return;
  const style = document.createElement('style');
  style.id = 'v57-proof-pack-style';
  style.textContent = `
    .v57-proof{border:1px solid rgba(66,215,255,.28);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.92),rgba(3,13,24,.98));box-shadow:0 18px 40px rgba(0,0,0,.28);padding:16px;margin:12px 0;color:#dff7ff}
    .v57-proof h2,.v57-proof h3{margin:0 0 8px;color:#fff}.v57-proof p{line-height:1.5}.v57-proof-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;margin-top:10px}.v57-card{border:1px solid rgba(66,215,255,.18);border-radius:16px;background:rgba(255,255,255,.045);padding:12px}.v57-card strong{color:#fff}.v57-small{font-size:.8rem;color:#bfefff}.v57-pill{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(66,215,255,.38);border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v57-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v57-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v57-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v57-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v57-trace{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:.76rem;background:rgba(0,0,0,.28);border:1px solid rgba(66,215,255,.16);border-radius:14px;padding:10px;overflow:auto}
    .v57-modal{position:fixed;inset:0;z-index:10005;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v57-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v57-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v57-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}
  `;
  document.head.appendChild(style);
}

function v57DecisionRecords(){ return window.CyberShieldDecisionRecordSchemaV562?.demo_records || []; }
function v57EvidenceItems(){ return window.CyberShieldEvidenceAssumptionRegisterV561?.register_items || []; }
function v57Models(){ return window.CyberShieldCoreTrustScoringModelsV564?.models || []; }
function v57ScoreContract(){ return window.CyberShieldUniversalScoreContractV563 || null; }

function v57ProofObject(){
  const records = v57DecisionRecords();
  const evidence = v57EvidenceItems();
  const models = v57Models();
  const firstRecord = records[0] || {};
  return {
    version: 'V57',
    product: 'CyberShield Executive OS',
    generated_at: new Date().toISOString(),
    headline: V57_STATE.schema?.demo_summary?.headline,
    decision_posture: V57_STATE.schema?.demo_summary?.decision_posture,
    action_under_review: firstRecord.action_under_review || 'Selected CyberShield decision path',
    model_trace: models.map(model => `${model.name} v${model.version} (${model.score_name})`).join('; '),
    decision_records: records.length,
    evidence_items: evidence.length,
    missing_or_assumed_evidence: evidence.filter(item => ['missing','assumed','needs_verification','stale','conflicting'].includes(item.state)).map(item => `${item.title} [${item.state}]`),
    risk_if_wrong: firstRecord.risk_if_wrong || 'Reliance risk depends on selected scenario and evidence gaps.',
    owner: firstRecord.owner || 'Named accountable owner required',
    escalation_path: firstRecord.escalation_path || 'Human review required before high-stakes reliance',
    recommended_next_step: firstRecord.recommended_next_step || 'Review missing evidence, verify assumptions, and generate a decision record before reliance.',
    boundary: V57_STATE.schema?.boundary
  };
}

function v57ProofHtml(){
  const proof = v57ProofObject();
  const types = V57_STATE.schema?.proof_pack_types || [];
  return `<section class="v57-proof"><span class="v57-pill">Model-driven proof artifact</span><h2>CyberShield Proof Pack</h2><p>${v57Esc(proof.headline)}</p><div class="v57-proof-grid"><article class="v57-card"><strong>Decision posture</strong><p>${v57Esc(proof.decision_posture)}</p></article><article class="v57-card"><strong>Action or reliance purpose</strong><p>${v57Esc(proof.action_under_review)}</p></article><article class="v57-card"><strong>Model trace</strong><p>${v57Esc(proof.model_trace || 'Core Trust Scoring Models not loaded yet')}</p></article><article class="v57-card"><strong>Evidence state</strong><p>${v57Esc(proof.evidence_items)} evidence register items • ${v57Esc(proof.missing_or_assumed_evidence.length)} gaps or assumptions</p></article><article class="v57-card"><strong>Risk if wrong</strong><p>${v57Esc(proof.risk_if_wrong)}</p></article><article class="v57-card"><strong>Owner and escalation</strong><p>${v57Esc(proof.owner)} • ${v57Esc(proof.escalation_path)}</p></article></div><h3>Proof Pack Types</h3><div class="v57-proof-grid">${types.map(type => `<article class="v57-card"><strong>${v57Esc(type.label)}</strong><p class="v57-small">${v57Esc(type.purpose)}</p></article>`).join('')}</div><div class="v57-actions"><button type="button" class="v57-btn" data-v57-open>Open proof trace</button><button type="button" class="v57-btn" data-v57-download>Download proof pack</button></div><div class="v57-boundary"><strong>Boundary:</strong> ${v57Esc(V57_STATE.schema?.boundary || '')}</div></section>`;
}

function v57OpenTrace(){
  v57InstallStyles();
  v57$('.v57-modal')?.remove();
  const proof = v57ProofObject();
  const modal = document.createElement('div');
  modal.className = 'v57-modal';
  modal.innerHTML = `<section class="v57-modal-card" role="dialog" aria-modal="true" aria-label="CyberShield Proof Pack Trace"><header><div><h2>CyberShield Proof Pack Trace</h2><p>${v57Esc(V57_STATE.schema?.controlling_principle || '')}</p></div><button type="button" class="v57-close" data-v57-close>Close</button></header><pre class="v57-trace">${v57Esc(JSON.stringify(proof, null, 2))}</pre><div class="v57-boundary"><strong>Export footer:</strong> ${v57Esc(V57_STATE.schema?.export_footer || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v57Download(){
  const proof = v57ProofObject();
  const lines = [
    'CyberShield Executive OS Proof Pack',
    '',
    `Generated: ${proof.generated_at}`,
    `Version: ${proof.version}`,
    '',
    `Executive Summary: ${proof.headline}`,
    `Decision Posture: ${proof.decision_posture}`,
    `Action or Reliance Purpose: ${proof.action_under_review}`,
    '',
    `Score and Model Trace: ${proof.model_trace}`,
    `Decision Records: ${proof.decision_records}`,
    `Evidence Items: ${proof.evidence_items}`,
    `Missing or Assumed Evidence: ${proof.missing_or_assumed_evidence.join('; ')}`,
    '',
    `Risk if Wrong: ${proof.risk_if_wrong}`,
    `Owner: ${proof.owner}`,
    `Escalation Path: ${proof.escalation_path}`,
    `Recommended Next Step: ${proof.recommended_next_step}`,
    '',
    `Boundary: ${proof.boundary}`,
    '',
    V57_STATE.schema?.export_footer || ''
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cybershield-v57-proof-pack.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v57Inject(){
  const proof = v57$('#proof.active');
  if(proof && !v57$('#v57ModelProofPack', proof)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v57ModelProofPack';
    wrapper.innerHTML = v57ProofHtml();
    proof.insertAdjacentElement('afterbegin', wrapper);
  }
  const runtime = v57$('#runtime.active');
  if(runtime && !v57$('#v57RuntimeProofPack', runtime)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v57RuntimeProofPack';
    wrapper.innerHTML = v57ProofHtml();
    runtime.appendChild(wrapper);
  }
}

function v57MarkMeta(){
  const payload = v57$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V57 Model-Driven Proof Pack';
    parsed.version = 'V57';
    parsed.previous_operational_build = 'V56.4 Core Trust Scoring Models MVP';
    parsed.model_driven_proof_pack = { status: 'active', path: V57_PROOF_SCHEMA_PATH, sources: V57_STATE.schema?.source_registries, boundary: V57_STATE.schema?.boundary, github_pages_browser_qa_required: true };
    parsed.prototype_boundary = 'Static advisory prototype only. No live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, live claim extraction, live scoring, or live internet claim verification.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v57Apply(){ v57InstallStyles(); v57Inject(); v57MarkMeta(); }
function v57Handlers(){
  if(window.__v57Handlers) return;
  window.__v57Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('[data-v57-open]')){ v57OpenTrace(); return; }
    if(event.target.closest('[data-v57-download]')){ v57Download(); return; }
    if(event.target.closest('[data-v57-close]') || (event.target.classList && event.target.classList.contains('v57-modal'))){ v57$('.v57-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v564-model],[data-v563-open],[data-v562-record],[data-v561-open]')) setTimeout(v57Apply, 800);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v57$('.v57-modal')?.remove(); });
}

v57Handlers();
v57LoadSchema().then(() => setTimeout(v57Apply, 3300)).catch(error => console.warn('CyberShield V57 proof pack unavailable', error));
window.addEventListener('load', () => setTimeout(v57Apply, 3900), { once: true });
setTimeout(v57Apply, 4600);
