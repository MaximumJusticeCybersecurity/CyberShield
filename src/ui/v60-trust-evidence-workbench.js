// V60 Trust Evidence Workbench Scaffold
// Purpose: manual evidence entry, state visibility, ownership, review accountability, and proof-pack traceability.
// Boundary: static advisory prototype only. No live evidence retrieval, backend persistence, ticketing, notifications, workflow automation, or external integrations.

const V60_WORKBENCH_PATH = 'data/evidence/v60-trust-evidence-workbench.json';
const V60_STATE = { registry: null };

function v60$(selector, root = document){ return root.querySelector(selector); }
function v60Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v60LoadRegistry(){
  if(V60_STATE.registry) return V60_STATE.registry;
  const response = await fetch(V60_WORKBENCH_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Trust Evidence Workbench fetch failed: ${response.status}`);
  V60_STATE.registry = await response.json();
  window.CyberShieldTrustEvidenceWorkbenchV60 = V60_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:trust-evidence-workbench-loaded', { detail: { registry: V60_STATE.registry } }));
  return V60_STATE.registry;
}

function v60InstallStyles(){
  if(v60$('#v60-evidence-workbench-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-evidence-workbench-style';
  style.textContent = `
    .v60-workbench{border:1px solid rgba(66,215,255,.32);border-radius:24px;background:linear-gradient(180deg,rgba(7,27,48,.95),rgba(3,13,24,.99));box-shadow:0 22px 48px rgba(0,0,0,.32),0 0 36px rgba(66,215,255,.1);padding:16px;margin:12px 0;color:#dff7ff}
    .v60-workbench h2,.v60-workbench h3{margin:0 0 8px;color:#fff}.v60-workbench p{line-height:1.52}.v60-kicker{display:inline-flex;border:1px solid rgba(66,215,255,.4);border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v60-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;margin-top:10px}.v60-card{border:1px solid rgba(66,215,255,.18);border-radius:16px;background:rgba(255,255,255,.045);padding:12px}.v60-card strong{color:#fff}.v60-small{font-size:.8rem;color:#bfefff;line-height:1.45}.v60-pill{display:inline-flex;border:1px solid rgba(66,215,255,.36);border-radius:999px;padding:3px 7px;font-size:.7rem;font-weight:900;text-transform:uppercase;color:#8fd6ff;margin:2px}.v60-field{border:1px solid rgba(66,215,255,.18);border-radius:14px;background:rgba(255,255,255,.045);padding:10px}.v60-field label{display:block;color:#8fd6ff;font-size:.72rem;text-transform:uppercase;font-weight:900;letter-spacing:.07em;margin-bottom:5px}.v60-field input,.v60-field textarea,.v60-field select{width:100%;box-sizing:border-box;border:1px solid rgba(66,215,255,.24);border-radius:10px;background:rgba(0,0,0,.24);color:#dff7ff;padding:8px;font:inherit}.v60-field textarea{min-height:70px}.v60-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v60-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v60-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v60-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v60-list{margin:0;padding-left:18px}.v60-list li{margin:4px 0}.v60-code{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:.76rem;background:rgba(0,0,0,.28);border:1px solid rgba(66,215,255,.16);border-radius:14px;padding:10px;overflow:auto}
    .v60-modal{position:fixed;inset:0;z-index:10016;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v60-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v60-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v60-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}
  `;
  document.head.appendChild(style);
}

function v60Items(){ return V60_STATE.registry?.sample_evidence_items || []; }
function v60States(){ return V60_STATE.registry?.evidence_states || []; }
function v60RiskItems(){ return v60Items().filter(i => ['missing','needs_verification','assumed','stale','conflicting'].includes(i.current_state)); }
function v60Object(){
  const r = V60_STATE.registry || {};
  return { version:'V60', product:'CyberShield Executive OS', generated_at:new Date().toISOString(), purpose:r.purpose, evidence_states:r.evidence_states, sample_evidence_items:r.sample_evidence_items, state_transition_rules:r.state_transition_rules, proof_pack_traceability:r.proof_pack_traceability, boundary:r.boundary };
}

function v60EntryFieldsHtml(){
  const states = v60States();
  return `<div class="v60-grid"><div class="v60-field"><label>Evidence Title</label><input value="Manual evidence title placeholder" /></div><div class="v60-field"><label>Evidence Type</label><input value="source, artifact, screenshot, policy, decision record" /></div><div class="v60-field"><label>Current State</label><select>${states.map(s => `<option>${v60Esc(s.label)}</option>`).join('')}</select></div><div class="v60-field"><label>Owner</label><input value="Evidence owner placeholder" /></div><div class="v60-field"><label>Reviewer</label><input value="Qualified human reviewer placeholder" /></div><div class="v60-field"><label>Linked Proof Sections</label><input value="Evidence state map, Missing verification list" /></div><div class="v60-field"><label>Risk If Wrong</label><textarea>Describe operational, legal, financial, reputational, or security risk if this evidence is wrong.</textarea></div><div class="v60-field"><label>Next Action</label><textarea>Define what a human must do next before reliance.</textarea></div></div>`;
}

function v60ItemCard(item){
  return `<article class="v60-card"><strong>${v60Esc(item.evidence_title)}</strong><p class="v60-small"><span class="v60-pill">${v60Esc(item.current_state)}</span> <span class="v60-pill">${v60Esc(item.evidence_type)}</span></p><p class="v60-small"><b>Owner:</b> ${v60Esc(item.owner)}<br><b>Reviewer:</b> ${v60Esc(item.reviewer)}</p><p class="v60-small"><b>Risk if wrong:</b> ${v60Esc(item.risk_if_wrong)}</p><p class="v60-small"><b>Next action:</b> ${v60Esc(item.next_action)}</p><p class="v60-small"><b>Claims:</b> ${(item.linked_claims || []).map(x => `<span class="v60-pill">${v60Esc(x)}</span>`).join('')}<br><b>Decisions:</b> ${(item.linked_decisions || []).map(x => `<span class="v60-pill">${v60Esc(x)}</span>`).join('')}</p></article>`;
}

function v60FullEvidenceWorkbenchHtml(){
  const r = V60_STATE.registry;
  if(!r) return '';
  const needs = v60RiskItems().length;
  return `<section class="v60-workbench"><span class="v60-kicker">Trust Evidence Workbench</span><h2>Manual Evidence Workbench</h2><p>${v60Esc(r.purpose)}</p><div class="v60-grid"><article class="v60-card"><strong>Evidence items</strong><p class="v60-small">${v60Esc(v60Items().length)} sample evidence objects</p></article><article class="v60-card"><strong>Needs review</strong><p class="v60-small">${v60Esc(needs)} items need verification, completion, or caveat handling</p></article><article class="v60-card"><strong>States</strong><p>${v60States().map(s => `<span class="v60-pill">${v60Esc(s.label)}</span>`).join('')}</p></article></div><h3>Manual Entry Prototype</h3><p class="v60-small">Editable-looking fields are local UI only. Nothing is saved to a backend.</p>${v60EntryFieldsHtml()}<h3>Evidence Objects</h3><div class="v60-grid">${v60Items().map(v60ItemCard).join('')}</div><h3>State Transition Rules</h3><ul class="v60-list">${(r.state_transition_rules || []).map(rule => `<li>${v60Esc(rule)}</li>`).join('')}</ul><div class="v60-actions"><button type="button" class="v60-btn" data-v60-open>Open workbench trace</button><button type="button" class="v60-btn" data-v60-download>Download evidence workbench</button></div><div class="v60-boundary"><strong>Boundary:</strong> ${v60Esc(r.boundary)}</div></section>`;
}

function v60RuntimeEvidencePanelHtml(){
  const r = V60_STATE.registry;
  if(!r) return '';
  const blockers = v60RiskItems().slice(0, 4);
  return `<section class="v60-workbench" data-v6031-runtime-panel="true"><span class="v60-kicker">Runtime Evidence Requirements</span><h2>Evidence blocking or constraining action</h2><p>Runtime shows only the evidence required before action. The full Manual Evidence Workbench belongs in Evidence.</p><div class="v60-grid"><article class="v60-card"><strong>Runtime posture</strong><p class="v60-small">${blockers.length ? 'Escalate or constrain until evidence gaps are resolved.' : 'No prototype blockers represented.'}</p></article><article class="v60-card"><strong>Evidence gaps</strong><p class="v60-small">${v60Esc(blockers.length)} blocking or constraining evidence items</p></article><article class="v60-card"><strong>Next human action</strong><p class="v60-small">Assign owner, verify evidence, document limitations, then return to Runtime decisioning.</p></article></div><h3>Blocking / constraining evidence</h3><div class="v60-grid">${blockers.map(v60ItemCard).join('') || '<article class="v60-card"><strong>No blocking prototype evidence</strong><p class="v60-small">Evidence state still requires browser QA.</p></article>'}</div><div class="v60-actions"><button type="button" class="v60-btn" data-v60-open>Open evidence trace</button><button type="button" class="v60-btn" data-v60-download>Download evidence workbench</button></div><div class="v60-boundary"><strong>Boundary:</strong> Runtime evidence panel is static advisory context only. No live evidence retrieval, workflow automation, ticketing, notification, or enforcement.</div></section>`;
}

function v60ProofTraceHtml(){
  const r = V60_STATE.registry;
  if(!r) return '';
  const proofItems = v60RiskItems().slice(0, 5);
  return `<section class="v60-workbench" data-v6031-proof-trace="true"><span class="v60-kicker">Proof Pack Evidence Trace</span><h2>Evidence defensibility trace</h2><p>Proof Pack shows what evidence, assumptions, caveats, and missing verification must be disclosed. The full Manual Evidence Workbench belongs in Evidence.</p><div class="v60-grid">${proofItems.map(v60ItemCard).join('') || '<article class="v60-card"><strong>No proof trace items represented</strong><p class="v60-small">Evidence state still requires browser QA.</p></article>'}</div><h3>Proof Pack traceability rules</h3><ul class="v60-list">${(r.proof_pack_traceability || []).map(rule => `<li>${v60Esc(rule)}</li>`).join('')}</ul><div class="v60-actions"><button type="button" class="v60-btn" data-v60-open>Open workbench trace</button><button type="button" class="v60-btn" data-v60-download>Download evidence workbench</button></div><div class="v60-boundary"><strong>Boundary:</strong> Proof trace is static advisory context only. It is not legal, audit, CMMC, healthcare, or compliance validation.</div></section>`;
}

function v60OpenTrace(){
  v60InstallStyles();
  v60$('.v60-modal')?.remove();
  const obj = v60Object();
  const modal = document.createElement('div');
  modal.className = 'v60-modal';
  modal.innerHTML = `<section class="v60-modal-card" role="dialog" aria-modal="true" aria-label="Trust Evidence Workbench Trace"><header><div><h2>Trust Evidence Workbench Trace</h2><p>${v60Esc(V60_STATE.registry?.controlling_principle || '')}</p></div><button type="button" class="v60-close" data-v60-close>Close</button></header><pre class="v60-code">${v60Esc(JSON.stringify(obj, null, 2))}</pre><div class="v60-boundary"><strong>Boundary:</strong> ${v60Esc(obj.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v60Download(){
  const obj = v60Object();
  const lines = ['CyberShield Executive OS Trust Evidence Workbench', '', `Generated: ${obj.generated_at}`, 'Build: V60', '', `Purpose: ${obj.purpose}`, '', 'Evidence States:', ...(obj.evidence_states || []).map(s => `- ${s.label}: ${s.meaning}`), '', 'Sample Evidence Items:', ...(obj.sample_evidence_items || []).map(i => `- ${i.evidence_id}: ${i.evidence_title} | state=${i.current_state} | owner=${i.owner} | reviewer=${i.reviewer} | next=${i.next_action}`), '', 'State Transition Rules:', ...(obj.state_transition_rules || []).map(r => `- ${r}`), '', `Boundary: ${obj.boundary}`];
  const blob = new Blob([lines.join('\n')], { type:'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cybershield-v60-trust-evidence-workbench.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v60Inject(){
  const evidence = v60$('#evidence.active');
  if(evidence && !v60$('#v60-evidence-workbench', evidence)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v60-evidence-workbench';
    wrapper.innerHTML = v60FullEvidenceWorkbenchHtml();
    evidence.insertAdjacentElement('beforeend', wrapper);
  }

  const runtime = v60$('#runtime.active');
  if(runtime && !v60$('#v60-runtime-workbench', runtime)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v60-runtime-workbench';
    wrapper.innerHTML = v60RuntimeEvidencePanelHtml();
    runtime.insertAdjacentElement('afterbegin', wrapper);
  }

  const proof = v60$('#proof.active');
  if(proof && !v60$('#v60-proof-workbench', proof)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v60-proof-workbench';
    wrapper.innerHTML = v60ProofTraceHtml();
    proof.insertAdjacentElement('beforeend', wrapper);
  }
}

function v60MarkMeta(){
  const payload = v60$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.1 Runtime Evidence Panel Correction';
    parsed.version = 'V60.3.1';
    parsed.previous_operational_build = 'V60.3 Universal Model Trace Inspector';
    parsed.trust_evidence_workbench = { status:'corrected_by_workspace', path: V60_WORKBENCH_PATH, evidence_item_count: v60Items().length, placement: { evidence: 'full Manual Evidence Workbench', runtime: 'compact Runtime Evidence Requirements panel', proof: 'Proof Pack evidence trace' }, boundary: V60_STATE.registry?.boundary, github_pages_browser_qa_required:true };
    parsed.prototype_boundary = 'Static advisory prototype only. No live evidence retrieval, backend persistence, ticketing, notifications, workflow automation, enforcement, or external integrations.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v60Apply(){ v60InstallStyles(); v60Inject(); v60MarkMeta(); }
function v60Handlers(){
  if(window.__v60Handlers) return;
  window.__v60Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('[data-v60-open]')){ v60OpenTrace(); return; }
    if(event.target.closest('[data-v60-download]')){ v60Download(); return; }
    if(event.target.closest('[data-v60-close]') || (event.target.classList && event.target.classList.contains('v60-modal'))){ v60$('.v60-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v595-open],[data-v594-open],[data-v593-open],[data-v592-claim],[data-v591-open],[data-v59-open]')) setTimeout(v60Apply, 1350);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v60$('.v60-modal')?.remove(); });
}

v60Handlers();
v60LoadRegistry().then(() => setTimeout(v60Apply, 9600)).catch(error => console.warn('CyberShield V60 Trust Evidence Workbench unavailable', error));
window.addEventListener('load', () => setTimeout(v60Apply, 10400), { once:true });
setTimeout(v60Apply, 11600);
