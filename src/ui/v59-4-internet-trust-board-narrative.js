// V59.4 Internet Trust Board Narrative Add-On
// Purpose: convert V59.3 export contract into concise executive and board narrative for artifact reliance decisions.
// Boundary: static advisory prototype only. No live extraction, verification, scoring, evidence retrieval, URL ingestion, report delivery, ticketing, or workflow automation.

const V594_NARRATIVE_PATH = 'data/internet-trust/v59-4-internet-trust-board-narrative.json';
const V594_STATE = { registry: null };

function v594$(selector, root = document){ return root.querySelector(selector); }
function v594Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v594LoadRegistry(){
  if(V594_STATE.registry) return V594_STATE.registry;
  const response = await fetch(V594_NARRATIVE_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Internet Trust board narrative fetch failed: ${response.status}`);
  V594_STATE.registry = await response.json();
  window.CyberShieldInternetTrustBoardNarrativeV594 = V594_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:internet-trust-board-narrative-loaded', { detail: { registry: V594_STATE.registry } }));
  return V594_STATE.registry;
}

function v594InstallStyles(){
  if(v594$('#v59-4-board-narrative-style')) return;
  const style = document.createElement('style');
  style.id = 'v59-4-board-narrative-style';
  style.textContent = `
    .v594-board{border:1px solid rgba(66,215,255,.32);border-radius:24px;background:linear-gradient(180deg,rgba(7,27,48,.95),rgba(3,13,24,.99));box-shadow:0 22px 48px rgba(0,0,0,.32),0 0 36px rgba(66,215,255,.1);padding:16px;margin:12px 0;color:#dff7ff}
    .v594-board h2,.v594-board h3{margin:0 0 8px;color:#fff}.v594-board p{line-height:1.52}.v594-kicker{display:inline-flex;border:1px solid rgba(66,215,255,.4);border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v594-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;margin-top:10px}.v594-card{border:1px solid rgba(66,215,255,.18);border-radius:16px;background:rgba(255,255,255,.045);padding:12px}.v594-card strong{color:#fff}.v594-small{font-size:.8rem;color:#bfefff;line-height:1.45}.v594-pill{display:inline-flex;border:1px solid rgba(66,215,255,.36);border-radius:999px;padding:3px 7px;font-size:.7rem;font-weight:900;text-transform:uppercase;color:#8fd6ff;margin:2px}.v594-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v594-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v594-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v594-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v594-list{margin:0;padding-left:18px}.v594-list li{margin:4px 0}.v594-code{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:.76rem;background:rgba(0,0,0,.28);border:1px solid rgba(66,215,255,.16);border-radius:14px;padding:10px;overflow:auto}
    .v594-modal{position:fixed;inset:0;z-index:10014;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v594-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v594-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v594-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}
  `;
  document.head.appendChild(style);
}

function v594ClaimTraces(){ return window.CyberShieldClaimModelProofTraceV592?.claim_traces || []; }
function v594ExportContract(){ return window.CyberShieldInternetTrustProofPackExportV593 || null; }
function v594Counts(){
  const claims = v594ClaimTraces();
  return { claims: claims.length, human_review: claims.filter(c => c.human_review_required).length, escalate: claims.filter(c => /Escalate|Constrain|verify/i.test(c.runtime_reliance_action || '')).length };
}
function v594NarrativeObject(){
  const r = V594_STATE.registry || {};
  const n = r.narrative || {};
  const counts = v594Counts();
  return {
    version: 'V59.4',
    product: 'CyberShield Executive OS',
    generated_at: new Date().toISOString(),
    product_framing: r.product_framing,
    counts,
    required_sections: r.required_sections,
    executive_summary: n.executive_summary,
    decision_required: n.decision_required,
    why_it_matters: n.why_it_matters,
    what_reviewed: n.what_reviewed,
    what_unverified: n.what_unverified,
    reliance_risk: n.reliance_risk,
    recommended_next_move: n.recommended_next_move,
    limitations: n.limitations,
    board_decision_options: r.board_decision_options,
    boundary: r.boundary
  };
}

function v594Html(){
  const r = V594_STATE.registry;
  if(!r) return '';
  const n = r.narrative || {};
  const counts = v594Counts();
  return `<section class="v594-board"><span class="v594-kicker">Internet Trust Board Narrative</span><h2>Artifact Reliance Narrative</h2><p>${v594Esc(n.executive_summary)}</p><div class="v594-grid"><article class="v594-card"><strong>Decision required</strong><p class="v594-small">${v594Esc(n.decision_required)}</p></article><article class="v594-card"><strong>Claims reviewed</strong><p class="v594-small">${v594Esc(counts.claims)} claim traces • ${v594Esc(counts.human_review)} require human review</p></article><article class="v594-card"><strong>Reliance risk</strong><p class="v594-small">${v594Esc(n.reliance_risk)}</p></article><article class="v594-card"><strong>Recommended next move</strong><p class="v594-small">${v594Esc(n.recommended_next_move)}</p></article></div><h3>Board Decision Options</h3><div class="v594-grid">${(r.board_decision_options || []).map(opt => `<article class="v594-card"><span class="v594-pill">${v594Esc(opt.id)}</span><p><strong>${v594Esc(opt.label)}</strong></p><p class="v594-small">${v594Esc(opt.description)}</p></article>`).join('')}</div><div class="v594-actions"><button type="button" class="v594-btn" data-v594-open>Open board narrative</button><button type="button" class="v594-btn" data-v594-download>Download board narrative</button></div><div class="v594-boundary"><strong>Limitations:</strong> ${v594Esc(n.limitations || r.boundary)}</div></section>`;
}

function v594OpenNarrative(){
  v594InstallStyles();
  v594$('.v594-modal')?.remove();
  const obj = v594NarrativeObject();
  const modal = document.createElement('div');
  modal.className = 'v594-modal';
  modal.innerHTML = `<section class="v594-modal-card" role="dialog" aria-modal="true" aria-label="Internet Trust Board Narrative"><header><div><h2>Internet Trust Board Narrative</h2><p>${v594Esc(V594_STATE.registry?.controlling_principle || '')}</p></div><button type="button" class="v594-close" data-v594-close>Close</button></header><h3>Board Sections</h3><p>${(obj.required_sections || []).map(x => `<span class="v594-pill">${v594Esc(x)}</span>`).join('')}</p><h3>Narrative Object</h3><pre class="v594-code">${v594Esc(JSON.stringify(obj, null, 2))}</pre><div class="v594-boundary"><strong>Boundary:</strong> ${v594Esc(obj.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v594Download(){
  const obj = v594NarrativeObject();
  const lines = [
    'CyberShield Executive OS Internet Trust Board Narrative',
    '',
    `Generated: ${obj.generated_at}`,
    'Build: V59.4',
    '',
    'Executive Summary',
    obj.executive_summary || '',
    '',
    'Decision Required',
    obj.decision_required || '',
    '',
    'Why It Matters',
    obj.why_it_matters || '',
    '',
    'What CyberShield Reviewed',
    obj.what_reviewed || '',
    '',
    'What Remains Unverified',
    obj.what_unverified || '',
    '',
    'Reliance Risk',
    obj.reliance_risk || '',
    '',
    'Recommended Next Move',
    obj.recommended_next_move || '',
    '',
    'Board Decision Options',
    ...(obj.board_decision_options || []).map(o => `- ${o.label}: ${o.description}`),
    '',
    'Limitations',
    obj.limitations || '',
    '',
    `Prototype Boundary: ${obj.boundary || ''}`
  ];
  const blob = new Blob([lines.join('\n')], { type:'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cybershield-v59-4-internet-trust-board-narrative.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v594Inject(){
  const proof = v594$('#proof.active');
  if(proof && !v594$('#v594ProofBoardNarrative', proof)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v594ProofBoardNarrative';
    wrapper.innerHTML = v594Html();
    proof.insertAdjacentElement('afterbegin', wrapper);
  }
  const evidence = v594$('#evidence.active');
  if(evidence && !v594$('#v594EvidenceBoardNarrative', evidence)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v594EvidenceBoardNarrative';
    wrapper.innerHTML = v594Html();
    evidence.insertAdjacentElement('afterbegin', wrapper);
  }
}

function v594MarkMeta(){
  const payload = v594$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V59.4 Internet Trust Board Narrative Add-On';
    parsed.version = 'V59.4';
    parsed.previous_operational_build = 'V59.3 Internet Trust Proof Pack Export Contract';
    parsed.internet_trust_board_narrative = { status:'active_static_board_narrative', path: V594_NARRATIVE_PATH, sections: V594_STATE.registry?.required_sections, boundary: V594_STATE.registry?.boundary, github_pages_browser_qa_required:true };
    parsed.prototype_boundary = 'Static advisory prototype narrative only. No live extraction, scoring, verification, evidence retrieval, internet retrieval, URL ingestion, political validation, report delivery, workflow automation, ticketing, notifications, or live integrations.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v594Apply(){ v594InstallStyles(); v594Inject(); v594MarkMeta(); }
function v594Handlers(){
  if(window.__v594Handlers) return;
  window.__v594Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('[data-v594-open]')){ v594OpenNarrative(); return; }
    if(event.target.closest('[data-v594-download]')){ v594Download(); return; }
    if(event.target.closest('[data-v594-close]') || (event.target.classList && event.target.classList.contains('v594-modal'))){ v594$('.v594-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v593-open],[data-v593-download],[data-v592-claim],[data-v592-all],[data-v591-open],[data-v591-download],[data-v59-open],[data-v582-link],[data-v581-route],[data-v581-open],[data-v58-route],[data-v58-open],[data-v571-open],[data-v57-open],[data-v564-model],[data-v563-open],[data-v562-record],[data-v561-open]')) setTimeout(v594Apply, 1250);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v594$('.v594-modal')?.remove(); });
}

v594Handlers();
v594LoadRegistry().then(() => setTimeout(v594Apply, 8400)).catch(error => console.warn('CyberShield V59.4 Internet Trust board narrative unavailable', error));
window.addEventListener('load', () => setTimeout(v594Apply, 9200), { once:true });
setTimeout(v594Apply, 10400);
