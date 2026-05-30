// V57.1 Board and Executive Narrative Layer
// Purpose: convert the model-driven Proof Pack into board-ready language.
// Boundary: static advisory prototype only. No live evidence retrieval, certification, legal determination, delivery, ticketing, or workflow.

const V571_NARRATIVE_SCHEMA_PATH = 'data/proof/v57-1-board-executive-narrative-schema.json';
const V571_STATE = { schema: null };

function v571$(selector, root = document){ return root.querySelector(selector); }
function v571Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v571LoadSchema(){
  if(V571_STATE.schema) return V571_STATE.schema;
  const response = await fetch(V571_NARRATIVE_SCHEMA_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Board narrative schema fetch failed: ${response.status}`);
  V571_STATE.schema = await response.json();
  window.CyberShieldBoardExecutiveNarrativeV571 = V571_STATE.schema;
  document.dispatchEvent(new CustomEvent('cybershield:board-executive-narrative-loaded', { detail: { schema: V571_STATE.schema } }));
  return V571_STATE.schema;
}

function v571InstallStyles(){
  if(v571$('#v57-1-board-narrative-style')) return;
  const style = document.createElement('style');
  style.id = 'v57-1-board-narrative-style';
  style.textContent = `
    .v571-board{border:1px solid rgba(66,215,255,.3);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.94),rgba(3,13,24,.99));box-shadow:0 18px 42px rgba(0,0,0,.3);padding:16px;margin:12px 0;color:#dff7ff}
    .v571-board h2,.v571-board h3{margin:0 0 8px;color:#fff}.v571-board p{line-height:1.52}.v571-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin-top:10px}.v571-card{border:1px solid rgba(66,215,255,.18);border-radius:16px;background:rgba(255,255,255,.045);padding:12px}.v571-card strong{color:#fff}.v571-small{font-size:.8rem;color:#bfefff}.v571-pill{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(66,215,255,.38);border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v571-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v571-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v571-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v571-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v571-packet{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:.76rem;background:rgba(0,0,0,.28);border:1px solid rgba(66,215,255,.16);border-radius:14px;padding:10px;overflow:auto}
    .v571-modal{position:fixed;inset:0;z-index:10006;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v571-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v571-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v571-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}
  `;
  document.head.appendChild(style);
}

function v571ProofContext(){
  const records = window.CyberShieldDecisionRecordSchemaV562?.demo_records || [];
  const evidence = window.CyberShieldEvidenceAssumptionRegisterV561?.register_items || [];
  const first = records[0] || {};
  const gaps = evidence.filter(item => ['missing','assumed','needs_verification','stale','conflicting'].includes(item.state));
  return {
    action: first.action_under_review || 'Selected CyberShield decision path',
    risk: first.risk_if_wrong || 'Reliance may create avoidable operational, financial, legal, reputational, or security risk.',
    owner: first.owner || 'Named accountable owner required',
    next: first.recommended_next_step || 'Verify missing evidence, document assumptions, and regenerate the Proof Pack before high-stakes reliance.',
    gap_count: gaps.length,
    record_count: records.length,
    evidence_count: evidence.length
  };
}

function v571Templates(){ return V571_STATE.schema?.narrative_templates || {}; }

function v571PacketText(){
  const t = v571Templates();
  const c = v571ProofContext();
  return [
    'CyberShield Executive OS Board Narrative Packet',
    '',
    `Generated: ${new Date().toISOString()}`,
    'Build: V57.1 Board and Executive Narrative Layer',
    '',
    '1. Executive Summary',
    t.executive_summary || '',
    '',
    '2. Decision Required',
    `${t.decision_required || ''}\n\nAction under review: ${c.action}`,
    '',
    '3. Why It Matters',
    t.why_it_matters || '',
    '',
    '4. What CyberShield Relied On',
    `${t.what_relied_on || ''}\n\nDecision records: ${c.record_count}\nEvidence register items: ${c.evidence_count}`,
    '',
    '5. What Is Missing or Assumed',
    `${t.missing_or_assumed || ''}\n\nKnown gaps or assumptions: ${c.gap_count}`,
    '',
    '6. Risk If Wrong',
    `${t.risk_if_wrong || ''}\n\nScenario-specific risk: ${c.risk}`,
    '',
    '7. Recommended Next Move',
    `${t.recommended_next_move || ''}\n\nRecommended next step: ${c.next}\nAccountable owner: ${c.owner}`,
    '',
    '8. Explicit Limitations',
    t.explicit_limitations || '',
    '',
    V571_STATE.schema?.board_packet_footer || ''
  ].join('\n');
}

function v571BoardHtml(){
  const t = v571Templates();
  const c = v571ProofContext();
  return `<section class="v571-board"><span class="v571-pill">Board-ready narrative</span><h2>Executive Proof Narrative</h2><p>${v571Esc(t.executive_summary || '')}</p><div class="v571-grid"><article class="v571-card"><strong>Decision required</strong><p>${v571Esc(t.decision_required || '')}</p><p class="v571-small">Action: ${v571Esc(c.action)}</p></article><article class="v571-card"><strong>Why it matters</strong><p>${v571Esc(t.why_it_matters || '')}</p></article><article class="v571-card"><strong>What CyberShield relied on</strong><p>${v571Esc(t.what_relied_on || '')}</p><p class="v571-small">${v571Esc(c.record_count)} decision records • ${v571Esc(c.evidence_count)} evidence items</p></article><article class="v571-card"><strong>Missing or assumed</strong><p>${v571Esc(t.missing_or_assumed || '')}</p><p class="v571-small">${v571Esc(c.gap_count)} visible gaps or assumptions</p></article><article class="v571-card"><strong>Risk if wrong</strong><p>${v571Esc(c.risk)}</p></article><article class="v571-card"><strong>Recommended next move</strong><p>${v571Esc(c.next)}</p><p class="v571-small">Owner: ${v571Esc(c.owner)}</p></article></div><div class="v571-actions"><button type="button" class="v571-btn" data-v571-open>Open board packet</button><button type="button" class="v571-btn" data-v571-download>Download board narrative</button></div><div class="v571-boundary"><strong>Explicit limitations:</strong> ${v571Esc(t.explicit_limitations || V571_STATE.schema?.boundary || '')}</div></section>`;
}

function v571OpenPacket(){
  v571InstallStyles();
  v571$('.v571-modal')?.remove();
  const modal = document.createElement('div');
  modal.className = 'v571-modal';
  modal.innerHTML = `<section class="v571-modal-card" role="dialog" aria-modal="true" aria-label="Board Narrative Packet"><header><div><h2>Board Narrative Packet</h2><p>${v571Esc(V571_STATE.schema?.controlling_principle || '')}</p></div><button type="button" class="v571-close" data-v571-close>Close</button></header><pre class="v571-packet">${v571Esc(v571PacketText())}</pre><div class="v571-boundary"><strong>Boundary:</strong> ${v571Esc(V571_STATE.schema?.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v571Download(){
  const blob = new Blob([v571PacketText()], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cybershield-v57-1-board-narrative.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v571Inject(){
  const proof = v571$('#proof.active');
  if(proof && !v571$('#v571ProofNarrative', proof)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v571ProofNarrative';
    wrapper.innerHTML = v571BoardHtml();
    proof.insertAdjacentElement('afterbegin', wrapper);
  }
  const runtime = v571$('#runtime.active');
  if(runtime && !v571$('#v571RuntimeNarrative', runtime)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v571RuntimeNarrative';
    wrapper.innerHTML = v571BoardHtml();
    runtime.appendChild(wrapper);
  }
}

function v571MarkMeta(){
  const payload = v571$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V57.1 Board and Executive Narrative Layer';
    parsed.version = 'V57.1';
    parsed.previous_operational_build = 'V57 Model-Driven Proof Pack';
    parsed.board_executive_narrative = { status: 'active', path: V571_NARRATIVE_SCHEMA_PATH, sections: V571_STATE.schema?.required_sections, boundary: V571_STATE.schema?.boundary, github_pages_browser_qa_required: true };
    parsed.prototype_boundary = 'Static advisory prototype only. No live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, live claim extraction, live scoring, report delivery, workflow automation, or live internet claim verification.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v571Apply(){ v571InstallStyles(); v571Inject(); v571MarkMeta(); }
function v571Handlers(){
  if(window.__v571Handlers) return;
  window.__v571Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('[data-v571-open]')){ v571OpenPacket(); return; }
    if(event.target.closest('[data-v571-download]')){ v571Download(); return; }
    if(event.target.closest('[data-v571-close]') || (event.target.classList && event.target.classList.contains('v571-modal'))){ v571$('.v571-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v57-open],[data-v57-download],[data-v564-model],[data-v563-open],[data-v562-record],[data-v561-open]')) setTimeout(v571Apply, 850);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v571$('.v571-modal')?.remove(); });
}

v571Handlers();
v571LoadSchema().then(() => setTimeout(v571Apply, 3800)).catch(error => console.warn('CyberShield V57.1 board narrative unavailable', error));
window.addEventListener('load', () => setTimeout(v571Apply, 4300), { once: true });
setTimeout(v571Apply, 5000);
