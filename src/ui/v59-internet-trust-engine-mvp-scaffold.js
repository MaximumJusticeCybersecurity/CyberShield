// V59 Internet Trust Engine MVP Scaffold
// Purpose: introduce Internet Trust Engine as a bounded scenario family and prototype scaffold.
// Boundary: no live internet verification, live evidence retrieval, live claim extraction, live scoring, political validation, or truth-engine/fact-checker branding.

const V59_ITE_PATH = 'data/internet-trust/v59-internet-trust-engine-mvp-scaffold.json';
const V59_STATE = { registry: null };

function v59$(selector, root = document){ return root.querySelector(selector); }
function v59Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v59LoadRegistry(){
  if(V59_STATE.registry) return V59_STATE.registry;
  const response = await fetch(V59_ITE_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Internet Trust Engine scaffold fetch failed: ${response.status}`);
  V59_STATE.registry = await response.json();
  window.CyberShieldInternetTrustEngineV59 = V59_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:internet-trust-engine-loaded', { detail: { registry: V59_STATE.registry } }));
  return V59_STATE.registry;
}

function v59InstallStyles(){
  if(v59$('#v59-internet-trust-style')) return;
  const style = document.createElement('style');
  style.id = 'v59-internet-trust-style';
  style.textContent = `
    .v59-ite{border:1px solid rgba(66,215,255,.32);border-radius:24px;background:radial-gradient(circle at 18% 18%,rgba(66,215,255,.12),transparent 30%),linear-gradient(180deg,rgba(7,27,48,.95),rgba(3,13,24,.99));box-shadow:0 22px 48px rgba(0,0,0,.32),0 0 36px rgba(66,215,255,.1);padding:16px;margin:12px 0;color:#dff7ff}
    .v59-ite h2,.v59-ite h3{margin:0 0 8px;color:#fff}.v59-ite p{line-height:1.52}.v59-kicker{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(66,215,255,.4);border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v59-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;margin-top:10px}.v59-card{border:1px solid rgba(66,215,255,.18);border-radius:16px;background:rgba(255,255,255,.045);padding:12px}.v59-card strong{color:#fff}.v59-small{font-size:.8rem;color:#bfefff;line-height:1.45}.v59-pill{display:inline-flex;border:1px solid rgba(66,215,255,.36);border-radius:999px;padding:3px 7px;font-size:.7rem;font-weight:900;text-transform:uppercase;color:#8fd6ff;margin:2px}.v59-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v59-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v59-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v59-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v59-list{margin:0;padding-left:18px}.v59-list li{margin:4px 0}.v59-code{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:.76rem;background:rgba(0,0,0,.28);border:1px solid rgba(66,215,255,.16);border-radius:14px;padding:10px;overflow:auto}
    .v59-modal{position:fixed;inset:0;z-index:10010;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v59-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v59-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v59-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}
  `;
  document.head.appendChild(style);
}

function v59ClaimRows(){ return V59_STATE.registry?.sample_claim_rows || []; }
function v59ScaffoldObject(){
  const r = V59_STATE.registry || {};
  return {
    version: 'V59',
    product: 'CyberShield Executive OS',
    scenario_family: r.product_framing,
    generated_at: new Date().toISOString(),
    purpose: r.mvp_purpose,
    pilot_artifact: r.pilot_artifact,
    mvp_flow: r.mvp_flow,
    claim_types: r.claim_types,
    evidence_state_mapping: r.evidence_state_mapping,
    model_mapping: r.model_mapping,
    sample_claim_rows: r.sample_claim_rows,
    proof_pack_output_sections: r.proof_pack_output_sections,
    allowed_language: r.allowed_language,
    avoid_language: r.avoid_language,
    boundary: r.boundary
  };
}

function v59Html(){
  const r = V59_STATE.registry;
  if(!r) return '';
  const pilot = r.pilot_artifact || {};
  return `<section class="v59-ite"><span class="v59-kicker">Internet Trust Engine Scaffold</span><h2>${v59Esc(r.product_framing)}</h2><p>${v59Esc(r.controlling_principle)}</p><div class="v59-grid"><article class="v59-card"><strong>MVP purpose</strong><p class="v59-small">${v59Esc(r.mvp_purpose)}</p></article><article class="v59-card"><strong>Pilot artifact</strong><p class="v59-small">${v59Esc(pilot.title)}</p><p class="v59-small">${v59Esc(pilot.why_useful)}</p></article><article class="v59-card"><strong>Reliance purpose</strong><p class="v59-small">${v59Esc(pilot.reliance_purpose)}</p></article><article class="v59-card"><strong>Runtime rule</strong><p class="v59-small">${v59Esc(r.runtime_action_rule)}</p></article></div><h3>MVP Flow</h3><div class="v59-grid">${(r.mvp_flow || []).map(step => `<article class="v59-card"><span class="v59-pill">Step</span><p class="v59-small">${v59Esc(step)}</p></article>`).join('')}</div><h3>Sample Claim Rows</h3><div class="v59-grid">${v59ClaimRows().map(row => `<article class="v59-card"><strong>${v59Esc(row.claim_id)}</strong><p class="v59-small">${v59Esc(row.sentence)}</p><p class="v59-small"><b>Type:</b> ${v59Esc(row.claim_type)}</p><p class="v59-small"><b>Evidence:</b> ${v59Esc(row.initial_evidence_state)}</p><p class="v59-small"><b>Next step:</b> ${v59Esc(row.next_step)}</p></article>`).join('')}</div><div class="v59-actions"><button type="button" class="v59-btn" data-v59-open>Open scaffold trace</button><button type="button" class="v59-btn" data-v59-download>Download scaffold summary</button></div><div class="v59-boundary"><strong>Boundary:</strong> ${v59Esc(r.boundary)}</div></section>`;
}

function v59OpenTrace(){
  v59InstallStyles();
  v59$('.v59-modal')?.remove();
  const r = V59_STATE.registry || {};
  const modal = document.createElement('div');
  modal.className = 'v59-modal';
  modal.innerHTML = `<section class="v59-modal-card" role="dialog" aria-modal="true" aria-label="Internet Trust Engine Scaffold Trace"><header><div><h2>Internet Trust Engine Scaffold Trace</h2><p>${v59Esc(r.controlling_principle || '')}</p></div><button type="button" class="v59-close" data-v59-close>Close</button></header><h3>Allowed language</h3><p>${(r.allowed_language || []).map(x => `<span class="v59-pill">${v59Esc(x)}</span>`).join('')}</p><h3>Avoid language</h3><p>${(r.avoid_language || []).map(x => `<span class="v59-pill">${v59Esc(x)}</span>`).join('')}</p><h3>Artifact fields</h3><ul class="v59-list">${(r.artifact_fields || []).map(x => `<li>${v59Esc(x)}</li>`).join('')}</ul><h3>Claim types</h3><p>${(r.claim_types || []).map(x => `<span class="v59-pill">${v59Esc(x)}</span>`).join('')}</p><h3>Proof Pack output sections</h3><ul class="v59-list">${(r.proof_pack_output_sections || []).map(x => `<li>${v59Esc(x)}</li>`).join('')}</ul><h3>Raw scaffold object</h3><pre class="v59-code">${v59Esc(JSON.stringify(v59ScaffoldObject(), null, 2))}</pre><div class="v59-boundary"><strong>Boundary:</strong> ${v59Esc(r.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v59Download(){
  const obj = v59ScaffoldObject();
  const lines = [
    'CyberShield Executive OS Internet Trust Engine MVP Scaffold',
    '',
    `Generated: ${obj.generated_at}`,
    `Build: ${obj.version}`,
    `Scenario Family: ${obj.scenario_family}`,
    '',
    `Purpose: ${obj.purpose}`,
    '',
    `Pilot Artifact: ${obj.pilot_artifact?.title || ''}`,
    `Why Useful: ${obj.pilot_artifact?.why_useful || ''}`,
    `Reliance Purpose: ${obj.pilot_artifact?.reliance_purpose || ''}`,
    '',
    'MVP Flow:',
    ...(obj.mvp_flow || []).map(x => `- ${x}`),
    '',
    'Sample Claim Rows:',
    ...(obj.sample_claim_rows || []).map(row => `- ${row.claim_id}: ${row.sentence} | ${row.claim_type} | evidence: ${row.initial_evidence_state} | next: ${row.next_step}`),
    '',
    'Avoid Language:',
    ...(obj.avoid_language || []).map(x => `- ${x}`),
    '',
    `Boundary: ${obj.boundary}`
  ];
  const blob = new Blob([lines.join('\n')], { type:'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cybershield-v59-internet-trust-engine-scaffold.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v59Inject(){
  const evidence = v59$('#evidence.active');
  if(evidence && !v59$('#v59EvidenceInternetTrust', evidence)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v59EvidenceInternetTrust';
    wrapper.innerHTML = v59Html();
    evidence.insertAdjacentElement('afterbegin', wrapper);
  }
  const proof = v59$('#proof.active');
  if(proof && !v59$('#v59ProofInternetTrust', proof)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v59ProofInternetTrust';
    wrapper.innerHTML = v59Html();
    proof.appendChild(wrapper);
  }
  const architecture = v59$('#architecture.active');
  if(architecture && !v59$('#v59ArchitectureInternetTrust', architecture)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v59ArchitectureInternetTrust';
    wrapper.innerHTML = v59Html();
    architecture.appendChild(wrapper);
  }
}

function v59MarkMeta(){
  const payload = v59$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V59 Internet Trust Engine MVP Scaffold';
    parsed.version = 'V59';
    parsed.previous_operational_build = 'V58.2 Runtime Action Queue to Proof Pack Trace Linkage';
    parsed.internet_trust_engine_mvp_scaffold = { status:'active_scaffold', path: V59_ITE_PATH, product_framing: V59_STATE.registry?.product_framing, boundary: V59_STATE.registry?.boundary, github_pages_browser_qa_required:true };
    parsed.prototype_boundary = 'Static advisory prototype scaffold only. No live internet retrieval, live evidence retrieval, live claim extraction, live scoring, political validation, legal determination, automated verification, report delivery, workflow automation, ticketing, notifications, or live integrations.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v59Apply(){ v59InstallStyles(); v59Inject(); v59MarkMeta(); }
function v59Handlers(){
  if(window.__v59Handlers) return;
  window.__v59Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('[data-v59-open]')){ v59OpenTrace(); return; }
    if(event.target.closest('[data-v59-download]')){ v59Download(); return; }
    if(event.target.closest('[data-v59-close]') || (event.target.classList && event.target.classList.contains('v59-modal'))){ v59$('.v59-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v582-link],[data-v581-route],[data-v581-open],[data-v58-route],[data-v58-open],[data-v571-open],[data-v57-open],[data-v564-model],[data-v563-open],[data-v562-record],[data-v561-open]')) setTimeout(v59Apply, 1050);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v59$('.v59-modal')?.remove(); });
}

v59Handlers();
v59LoadRegistry().then(() => setTimeout(v59Apply, 5800)).catch(error => console.warn('CyberShield V59 Internet Trust Engine scaffold unavailable', error));
window.addEventListener('load', () => setTimeout(v59Apply, 6600), { once:true });
setTimeout(v59Apply, 7400);
