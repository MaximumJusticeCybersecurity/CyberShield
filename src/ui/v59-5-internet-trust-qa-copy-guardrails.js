// V59.5 Internet Trust QA and Copy Guardrail Pass
// Purpose: harden labels, boundary language, prohibited branding, overclaim controls, and GitHub Pages QA notes.
// Boundary: static advisory prototype only. No live extraction, verification, scoring, evidence retrieval, URL ingestion, report delivery, ticketing, or workflow automation.

const V595_GUARDRAILS_PATH = 'data/internet-trust/v59-5-internet-trust-qa-copy-guardrails.json';
const V595_STATE = { registry: null };

function v595$(selector, root = document){ return root.querySelector(selector); }
function v595Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v595LoadRegistry(){
  if(V595_STATE.registry) return V595_STATE.registry;
  const response = await fetch(V595_GUARDRAILS_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Internet Trust guardrails fetch failed: ${response.status}`);
  V595_STATE.registry = await response.json();
  window.CyberShieldInternetTrustGuardrailsV595 = V595_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:internet-trust-guardrails-loaded', { detail: { registry: V595_STATE.registry } }));
  return V595_STATE.registry;
}

function v595InstallStyles(){
  if(v595$('#v59-5-guardrails-style')) return;
  const style = document.createElement('style');
  style.id = 'v59-5-guardrails-style';
  style.textContent = `
    .v595-guard{border:1px solid rgba(66,215,255,.32);border-radius:24px;background:linear-gradient(180deg,rgba(7,27,48,.95),rgba(3,13,24,.99));box-shadow:0 22px 48px rgba(0,0,0,.32),0 0 36px rgba(66,215,255,.1);padding:16px;margin:12px 0;color:#dff7ff}
    .v595-guard h2,.v595-guard h3{margin:0 0 8px;color:#fff}.v595-guard p{line-height:1.52}.v595-kicker{display:inline-flex;border:1px solid rgba(66,215,255,.4);border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v595-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;margin-top:10px}.v595-card{border:1px solid rgba(66,215,255,.18);border-radius:16px;background:rgba(255,255,255,.045);padding:12px}.v595-card strong{color:#fff}.v595-small{font-size:.8rem;color:#bfefff;line-height:1.45}.v595-pill{display:inline-flex;border:1px solid rgba(66,215,255,.36);border-radius:999px;padding:3px 7px;font-size:.7rem;font-weight:900;text-transform:uppercase;color:#8fd6ff;margin:2px}.v595-bad{color:#ffd1d1;border-color:rgba(255,76,76,.42)}.v595-list{margin:0;padding-left:18px}.v595-list li{margin:4px 0}.v595-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v595-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v595-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v595-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v595-code{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:.76rem;background:rgba(0,0,0,.28);border:1px solid rgba(66,215,255,.16);border-radius:14px;padding:10px;overflow:auto}
    .v595-modal{position:fixed;inset:0;z-index:10015;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v595-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v595-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v595-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}
  `;
  document.head.appendChild(style);
}

function v595Object(){
  const r = V595_STATE.registry || {};
  return {
    version: 'V59.5',
    product: 'CyberShield Executive OS',
    generated_at: new Date().toISOString(),
    product_framing: r.product_framing,
    purpose: r.purpose,
    allowed_terms: r.allowed_terms,
    prohibited_terms: r.prohibited_terms,
    overclaim_guardrails: r.overclaim_guardrails,
    label_guardrails: r.label_guardrails,
    github_pages_qa_required: r.github_pages_qa_required,
    definition_of_done: r.definition_of_done,
    boundary: r.boundary
  };
}

function v595Html(){
  const r = V595_STATE.registry;
  if(!r) return '';
  return `<section class="v595-guard"><span class="v595-kicker">Internet Trust QA Guardrails</span><h2>V59.5 Copy and Boundary Controls</h2><p>${v595Esc(r.purpose)}</p><div class="v595-grid"><article class="v595-card"><strong>Allowed framing</strong><p>${(r.allowed_terms || []).slice(0,8).map(x => `<span class="v595-pill">${v595Esc(x)}</span>`).join('')}</p></article><article class="v595-card"><strong>Prohibited framing</strong><p>${(r.prohibited_terms || []).slice(0,8).map(x => `<span class="v595-pill v595-bad">${v595Esc(x)}</span>`).join('')}</p></article><article class="v595-card"><strong>QA count</strong><p class="v595-small">${v595Esc((r.github_pages_qa_required || []).length)} browser QA checks required after GitHub Pages deploy</p></article><article class="v595-card"><strong>Boundary</strong><p class="v595-small">${v595Esc(r.boundary)}</p></article></div><h3>Overclaim Guardrails</h3><ul class="v595-list">${(r.overclaim_guardrails || []).map(x => `<li>${v595Esc(x)}</li>`).join('')}</ul><h3>Surface Label Guardrails</h3><div class="v595-grid">${(r.label_guardrails || []).map(g => `<article class="v595-card"><strong>${v595Esc(g.surface)}</strong><p class="v595-small">${v595Esc(g.required_copy)}</p></article>`).join('')}</div><div class="v595-actions"><button type="button" class="v595-btn" data-v595-open>Open QA guardrail packet</button><button type="button" class="v595-btn" data-v595-download>Download QA checklist</button></div><div class="v595-boundary"><strong>Boundary:</strong> ${v595Esc(r.boundary)}</div></section>`;
}

function v595OpenPacket(){
  v595InstallStyles();
  v595$('.v595-modal')?.remove();
  const obj = v595Object();
  const modal = document.createElement('div');
  modal.className = 'v595-modal';
  modal.innerHTML = `<section class="v595-modal-card" role="dialog" aria-modal="true" aria-label="Internet Trust QA Guardrail Packet"><header><div><h2>Internet Trust QA Guardrail Packet</h2><p>${v595Esc(V595_STATE.registry?.controlling_principle || '')}</p></div><button type="button" class="v595-close" data-v595-close>Close</button></header><h3>GitHub Pages QA Required</h3><ul class="v595-list">${(obj.github_pages_qa_required || []).map(x => `<li>${v595Esc(x)}</li>`).join('')}</ul><h3>Raw Guardrail Object</h3><pre class="v595-code">${v595Esc(JSON.stringify(obj, null, 2))}</pre><div class="v595-boundary"><strong>Boundary:</strong> ${v595Esc(obj.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v595Download(){
  const obj = v595Object();
  const lines = [
    'CyberShield Executive OS Internet Trust QA and Copy Guardrail Pass',
    '',
    `Generated: ${obj.generated_at}`,
    'Build: V59.5',
    '',
    'Allowed Terms',
    ...(obj.allowed_terms || []).map(x => `- ${x}`),
    '',
    'Prohibited Terms',
    ...(obj.prohibited_terms || []).map(x => `- ${x}`),
    '',
    'Overclaim Guardrails',
    ...(obj.overclaim_guardrails || []).map(x => `- ${x}`),
    '',
    'GitHub Pages Browser QA Required',
    ...(obj.github_pages_qa_required || []).map(x => `- ${x}`),
    '',
    'Definition of Done',
    ...(obj.definition_of_done || []).map(x => `- ${x}`),
    '',
    `Boundary: ${obj.boundary || ''}`
  ];
  const blob = new Blob([lines.join('\n')], { type:'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cybershield-v59-5-internet-trust-qa-guardrails.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v595Inject(){
  const evidence = v595$('#evidence.active');
  if(evidence && !v595$('#v595EvidenceGuardrails', evidence)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v595EvidenceGuardrails';
    wrapper.innerHTML = v595Html();
    evidence.insertAdjacentElement('afterbegin', wrapper);
  }
  const proof = v595$('#proof.active');
  if(proof && !v595$('#v595ProofGuardrails', proof)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v595ProofGuardrails';
    wrapper.innerHTML = v595Html();
    proof.insertAdjacentElement('afterbegin', wrapper);
  }
  const settings = v595$('#settings.active');
  if(settings && !v595$('#v595SettingsGuardrails', settings)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v595SettingsGuardrails';
    wrapper.innerHTML = v595Html();
    settings.appendChild(wrapper);
  }
}

function v595MarkMeta(){
  const payload = v595$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V59.5 Internet Trust QA and Copy Guardrail Pass';
    parsed.version = 'V59.5';
    parsed.previous_operational_build = 'V59.4 Internet Trust Board Narrative Add-On';
    parsed.internet_trust_qa_copy_guardrails = { status:'active_guardrail_pass', path: V595_GUARDRAILS_PATH, prohibited_terms: V595_STATE.registry?.prohibited_terms, boundary: V595_STATE.registry?.boundary, github_pages_browser_qa_required:true };
    parsed.prototype_boundary = 'Static advisory prototype QA pass only. No live extraction, scoring, verification, evidence retrieval, internet retrieval, URL ingestion, political validation, report delivery, workflow automation, ticketing, notifications, or live integrations.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v595Apply(){ v595InstallStyles(); v595Inject(); v595MarkMeta(); }
function v595Handlers(){
  if(window.__v595Handlers) return;
  window.__v595Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('[data-v595-open]')){ v595OpenPacket(); return; }
    if(event.target.closest('[data-v595-download]')){ v595Download(); return; }
    if(event.target.closest('[data-v595-close]') || (event.target.classList && event.target.classList.contains('v595-modal'))){ v595$('.v595-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v594-open],[data-v594-download],[data-v593-open],[data-v593-download],[data-v592-claim],[data-v592-all],[data-v591-open],[data-v591-download],[data-v59-open],[data-v582-link],[data-v581-route],[data-v581-open],[data-v58-route],[data-v58-open],[data-v571-open],[data-v57-open],[data-v564-model],[data-v563-open],[data-v562-record],[data-v561-open]')) setTimeout(v595Apply, 1300);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v595$('.v595-modal')?.remove(); });
}

v595Handlers();
v595LoadRegistry().then(() => setTimeout(v595Apply, 9000)).catch(error => console.warn('CyberShield V59.5 guardrails unavailable', error));
window.addEventListener('load', () => setTimeout(v595Apply, 9800), { once:true });
setTimeout(v595Apply, 11000);
