// V59.3 Internet Trust Proof Pack Export Contract
// Purpose: consolidate artifact intake, claim table, claim-to-model trace, evidence state, runtime reliance action,
// human review, proof sections, and explicit limitations into one static prototype export contract.
// Boundary: no live extraction, verification, scoring, evidence retrieval, URL ingestion, report delivery, ticketing, or workflow automation.

const V593_EXPORT_PATH = 'data/internet-trust/v59-3-internet-trust-proof-pack-export-contract.json';
const V593_STATE = { registry: null };

function v593$(selector, root = document){ return root.querySelector(selector); }
function v593Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v593LoadRegistry(){
  if(V593_STATE.registry) return V593_STATE.registry;
  const response = await fetch(V593_EXPORT_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Internet Trust Proof Pack export contract fetch failed: ${response.status}`);
  V593_STATE.registry = await response.json();
  window.CyberShieldInternetTrustProofPackExportV593 = V593_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:internet-trust-proof-pack-export-loaded', { detail: { registry: V593_STATE.registry } }));
  return V593_STATE.registry;
}

function v593InstallStyles(){
  if(v593$('#v59-3-export-contract-style')) return;
  const style = document.createElement('style');
  style.id = 'v59-3-export-contract-style';
  style.textContent = `
    .v593-export{border:1px solid rgba(66,215,255,.32);border-radius:24px;background:linear-gradient(180deg,rgba(7,27,48,.95),rgba(3,13,24,.99));box-shadow:0 22px 48px rgba(0,0,0,.32),0 0 36px rgba(66,215,255,.1);padding:16px;margin:12px 0;color:#dff7ff}
    .v593-export h2,.v593-export h3{margin:0 0 8px;color:#fff}.v593-export p{line-height:1.52}.v593-kicker{display:inline-flex;border:1px solid rgba(66,215,255,.4);border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v593-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;margin-top:10px}.v593-card{border:1px solid rgba(66,215,255,.18);border-radius:16px;background:rgba(255,255,255,.045);padding:12px}.v593-card strong{color:#fff}.v593-small{font-size:.8rem;color:#bfefff;line-height:1.45}.v593-pill{display:inline-flex;border:1px solid rgba(66,215,255,.36);border-radius:999px;padding:3px 7px;font-size:.7rem;font-weight:900;text-transform:uppercase;color:#8fd6ff;margin:2px}.v593-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v593-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v593-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v593-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v593-list{margin:0;padding-left:18px}.v593-list li{margin:4px 0}.v593-code{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:.76rem;background:rgba(0,0,0,.28);border:1px solid rgba(66,215,255,.16);border-radius:14px;padding:10px;overflow:auto}
    .v593-modal{position:fixed;inset:0;z-index:10013;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v593-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v593-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v593-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}
  `;
  document.head.appendChild(style);
}

function v593ClaimTrace(){ return window.CyberShieldClaimModelProofTraceV592?.claim_traces || []; }
function v593ArtifactIntake(){ return window.CyberShieldArtifactIntakeClaimTableV591?.artifact_intake || {}; }
function v593ExportObject(){
  const r = V593_STATE.registry || {};
  const sample = r.sample_export || {};
  const claims = v593ClaimTrace();
  return {
    export_id: sample.export_id || 'ite-proof-pack-prototype-export',
    export_version: 'V59.3',
    generated_at: new Date().toISOString(),
    artifact_title: v593ArtifactIntake().artifact_title || sample.artifact_title,
    artifact_type: v593ArtifactIntake().artifact_type || sample.artifact_type,
    source_note: v593ArtifactIntake().artifact_source_note || sample.source_note,
    reliance_purpose: v593ArtifactIntake().reliance_purpose || sample.reliance_purpose,
    audience: v593ArtifactIntake().audience || sample.audience,
    risk_if_wrong: v593ArtifactIntake().risk_if_wrong || sample.risk_if_wrong,
    claim_count: claims.length || sample.claim_count,
    claims_requiring_human_review: claims.filter(c => c.human_review_required).length || sample.claims_requiring_human_review,
    runtime_action_summary: sample.runtime_action_summary,
    claim_rows: claims,
    export_sections: r.export_sections || [],
    required_export_fields: r.required_export_fields || [],
    limitations: sample.limitations || [],
    prototype_boundary: r.boundary
  };
}

function v593Html(){
  const r = V593_STATE.registry;
  if(!r) return '';
  const obj = v593ExportObject();
  return `<section class="v593-export"><span class="v593-kicker">Internet Trust Proof Pack Export</span><h2>Prototype Export Contract</h2><p>${v593Esc(r.purpose)}</p><div class="v593-grid"><article class="v593-card"><strong>Artifact</strong><p class="v593-small">${v593Esc(obj.artifact_title)}</p></article><article class="v593-card"><strong>Claims</strong><p class="v593-small">${v593Esc(obj.claim_count)} claim rows • ${v593Esc(obj.claims_requiring_human_review)} require human review</p></article><article class="v593-card"><strong>Runtime posture</strong><p class="v593-small">${v593Esc(obj.runtime_action_summary)}</p></article><article class="v593-card"><strong>Decision use</strong><p class="v593-small">Prototype export contract only. Validate evidence before external reliance.</p></article></div><h3>Export Sections</h3><div class="v593-grid">${(r.export_sections || []).map(section => `<article class="v593-card"><span class="v593-pill">Section</span><p class="v593-small">${v593Esc(section)}</p></article>`).join('')}</div><h3>Export Readiness Rules</h3><ul class="v593-list">${(r.export_readiness_rules || []).map(rule => `<li>${v593Esc(rule)}</li>`).join('')}</ul><div class="v593-actions"><button type="button" class="v593-btn" data-v593-open>Open export contract</button><button type="button" class="v593-btn" data-v593-download>Download prototype export</button></div><div class="v593-boundary"><strong>Boundary:</strong> ${v593Esc(r.boundary)}</div></section>`;
}

function v593OpenContract(){
  v593InstallStyles();
  v593$('.v593-modal')?.remove();
  const modal = document.createElement('div');
  modal.className = 'v593-modal';
  modal.innerHTML = `<section class="v593-modal-card" role="dialog" aria-modal="true" aria-label="Internet Trust Proof Pack Export Contract"><header><div><h2>Internet Trust Proof Pack Export Contract</h2><p>${v593Esc(V593_STATE.registry?.controlling_principle || '')}</p></div><button type="button" class="v593-close" data-v593-close>Close</button></header><h3>Required Export Fields</h3><p>${(V593_STATE.registry?.required_export_fields || []).map(x => `<span class="v593-pill">${v593Esc(x)}</span>`).join('')}</p><h3>Prototype Export Object</h3><pre class="v593-code">${v593Esc(JSON.stringify(v593ExportObject(), null, 2))}</pre><div class="v593-boundary"><strong>Boundary:</strong> ${v593Esc(V593_STATE.registry?.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v593Download(){
  const obj = v593ExportObject();
  const lines = [
    'CyberShield Executive OS Internet Trust Proof Pack Export',
    '',
    `Generated: ${obj.generated_at}`,
    `Export ID: ${obj.export_id}`,
    `Export Version: ${obj.export_version}`,
    '',
    'Executive Artifact Summary',
    `Artifact: ${obj.artifact_title}`,
    `Type: ${obj.artifact_type}`,
    `Source Note: ${obj.source_note}`,
    '',
    'Reliance Purpose',
    obj.reliance_purpose || '',
    '',
    'Audience',
    obj.audience || '',
    '',
    'Risk If Wrong',
    obj.risk_if_wrong || '',
    '',
    'Runtime Reliance Summary',
    obj.runtime_action_summary || '',
    '',
    `Claim Count: ${obj.claim_count}`,
    `Claims Requiring Human Review: ${obj.claims_requiring_human_review}`,
    '',
    'Claim Rows',
    ...(obj.claim_rows || []).map(c => `- ${c.claim_id}: action=${c.runtime_reliance_action}; human_review=${c.human_review_required}; proof=${c.proof_output_sentence}; boundary=${c.prototype_boundary}`),
    '',
    'Explicit Limitations',
    ...(obj.limitations || []).map(x => `- ${x}`),
    '',
    `Prototype Boundary: ${obj.prototype_boundary}`
  ];
  const blob = new Blob([lines.join('\n')], { type:'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cybershield-v59-3-internet-trust-proof-pack-export.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v593Inject(){
  const proof = v593$('#proof.active');
  if(proof && !v593$('#v593ProofExportContract', proof)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v593ProofExportContract';
    wrapper.innerHTML = v593Html();
    proof.insertAdjacentElement('afterbegin', wrapper);
  }
  const evidence = v593$('#evidence.active');
  if(evidence && !v593$('#v593EvidenceExportContract', evidence)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v593EvidenceExportContract';
    wrapper.innerHTML = v593Html();
    evidence.appendChild(wrapper);
  }
}

function v593MarkMeta(){
  const payload = v593$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V59.3 Internet Trust Proof Pack Export Contract';
    parsed.version = 'V59.3';
    parsed.previous_operational_build = 'V59.2 Claim Row to Model Trace and Proof Pack Output';
    parsed.internet_trust_proof_pack_export_contract = { status:'active_static_export_contract', path: V593_EXPORT_PATH, sections: V593_STATE.registry?.export_sections, boundary: V593_STATE.registry?.boundary, github_pages_browser_qa_required:true };
    parsed.prototype_boundary = 'Static advisory prototype export contract only. No live extraction, scoring, verification, evidence retrieval, internet retrieval, URL ingestion, political validation, report delivery, workflow automation, ticketing, notifications, or live integrations.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v593Apply(){ v593InstallStyles(); v593Inject(); v593MarkMeta(); }
function v593Handlers(){
  if(window.__v593Handlers) return;
  window.__v593Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('[data-v593-open]')){ v593OpenContract(); return; }
    if(event.target.closest('[data-v593-download]')){ v593Download(); return; }
    if(event.target.closest('[data-v593-close]') || (event.target.classList && event.target.classList.contains('v593-modal'))){ v593$('.v593-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v592-claim],[data-v592-all],[data-v591-open],[data-v591-download],[data-v59-open],[data-v582-link],[data-v581-route],[data-v581-open],[data-v58-route],[data-v58-open],[data-v571-open],[data-v57-open],[data-v564-model],[data-v563-open],[data-v562-record],[data-v561-open]')) setTimeout(v593Apply, 1200);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v593$('.v593-modal')?.remove(); });
}

v593Handlers();
v593LoadRegistry().then(() => setTimeout(v593Apply, 7800)).catch(error => console.warn('CyberShield V59.3 Internet Trust export unavailable', error));
window.addEventListener('load', () => setTimeout(v593Apply, 8600), { once:true });
setTimeout(v593Apply, 9600);
