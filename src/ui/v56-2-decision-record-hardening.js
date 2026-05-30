// V56.2 Decision Record Hardening
// Purpose: make decision records defensible by showing action, model, score, confidence, evidence state,
// missing evidence, assumptions, risk if wrong, runtime action, owner, and next step.
// Boundary: static advisory prototype only. No live approvals, enforcement, ticketing, or evidence retrieval.

const V562_DECISION_SCHEMA_PATH = 'data/decisions/v56-2-decision-record-schema.json';
const V562_STATE = { schema: null };

function v562$(selector, root = document){ return root.querySelector(selector); }
function v562$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v562Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v562LoadSchema(){
  if(V562_STATE.schema) return V562_STATE.schema;
  const response = await fetch(V562_DECISION_SCHEMA_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Decision schema fetch failed: ${response.status}`);
  V562_STATE.schema = await response.json();
  window.CyberShieldDecisionRecordSchemaV562 = V562_STATE.schema;
  document.dispatchEvent(new CustomEvent('cybershield:decision-record-schema-loaded', { detail: { schema: V562_STATE.schema } }));
  return V562_STATE.schema;
}

function v562Records(){ return Array.isArray(V562_STATE.schema?.demo_records) ? V562_STATE.schema.demo_records : []; }
function v562ActionColor(action){ return { Allow:'#25e69b', 'Allow with caveat':'#8fd6ff', Constrain:'#ffd166', Escalate:'#ff8a30', Block:'#ff4c4c', Refuse:'#ff4c4c', Quarantine:'#ff6bba' }[action] || '#42d7ff'; }

function v562InstallStyles(){
  if(v562$('#v56-2-decision-record-style')) return;
  const style = document.createElement('style');
  style.id = 'v56-2-decision-record-style';
  style.textContent = `
    .v562-records{border:1px solid rgba(66,215,255,.24);border-radius:18px;background:rgba(3,13,24,.72);padding:14px;margin:12px 0;color:#dff7ff}
    .v562-records h3{margin:0 0 8px;color:#fff}.v562-records p{line-height:1.48}.v562-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin-top:10px}.v562-card{border:1px solid rgba(66,215,255,.18);border-radius:14px;background:rgba(255,255,255,.045);padding:10px}.v562-card strong{color:#fff}.v562-pill{display:inline-flex;align-items:center;gap:6px;border:1px solid currentColor;border-radius:999px;padding:3px 7px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:var(--pill-color)}.v562-dot{width:9px;height:9px;border-radius:50%;background:currentColor;box-shadow:0 0 9px currentColor}.v562-small{font-size:.78rem;color:#bfefff}.v562-open,.v562-download{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:7px 10px;font-weight:900;cursor:pointer;margin-top:8px;display:inline-flex;margin-right:6px}.v562-open:hover,.v562-download:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}
    .v562-modal{position:fixed;inset:0;z-index:10002;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v562-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v562-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v562-modal-card h2{margin:0;color:#fff;font-size:1.35rem}.v562-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}.v562-field{border-bottom:1px solid rgba(66,215,255,.12);padding:7px 0}.v562-field b{display:block;color:#8fd6ff;font-size:.72rem;text-transform:uppercase;letter-spacing:.08em}.v562-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}
  `;
  document.head.appendChild(style);
}

function v562RecordCard(record){
  return `<article class="v562-card"><span class="v562-pill" style="--pill-color:${v562ActionColor(record.runtime_action)}"><span class="v562-dot"></span>${v562Esc(record.runtime_action)}</span><p><strong>${v562Esc(record.action_under_review)}</strong></p><p class="v562-small">Model: ${v562Esc(record.model_used)} v${v562Esc(record.model_version)}</p><p class="v562-small">Score ${v562Esc(record.score)} • Confidence ${v562Esc(record.confidence)} • Evidence ${v562Esc(record.evidence_state)}</p><p class="v562-small">Risk if wrong: ${v562Esc(record.risk_if_wrong)}</p><button type="button" class="v562-open" data-v562-record="${v562Esc(record.record_id)}">View decision record</button><button type="button" class="v562-download" data-v562-download="${v562Esc(record.record_id)}">Download record</button></article>`;
}

function v562RecordsHtml(limit = 3){
  return `<section class="v562-records"><h3>Decision Records</h3><p class="v562-small">Each record traces score, confidence, evidence state, missing evidence, assumptions, risk if wrong, runtime action, owner, and next step.</p><div class="v562-grid">${v562Records().slice(0, limit).map(v562RecordCard).join('')}</div><button type="button" class="v562-open" data-v562-record="all">Open all decision records</button></section>`;
}

function v562RecordFields(record){
  const fields = ['record_id','action_under_review','object_under_review','model_used','model_version','score','confidence','decision_band','runtime_action','evidence_state','evidence_inputs','missing_evidence','assumptions','caveats','risk_if_wrong','owner','escalation_path','recommended_next_step','prototype_boundary'];
  return fields.map(field => `<div class="v562-field"><b>${v562Esc(field.replaceAll('_',' '))}</b><span>${Array.isArray(record[field]) ? record[field].map(v562Esc).join(', ') : v562Esc(record[field])}</span></div>`).join('');
}

function v562OpenRecord(recordId){
  v562InstallStyles();
  v562$('.v562-modal')?.remove();
  const records = recordId === 'all' ? v562Records() : v562Records().filter(r => r.record_id === recordId);
  const modal = document.createElement('div');
  modal.className = 'v562-modal';
  modal.innerHTML = `<section class="v562-modal-card" role="dialog" aria-modal="true" aria-label="Decision Record"><header><div><h2>Decision Record Trace</h2><p>${v562Esc(V562_STATE.schema?.doctrine || '')}</p></div><button class="v562-close" type="button" data-v562-close>Close</button></header>${records.map(record => `<article class="v562-card" style="margin-bottom:12px"><span class="v562-pill" style="--pill-color:${v562ActionColor(record.runtime_action)}"><span class="v562-dot"></span>${v562Esc(record.runtime_action)}</span>${v562RecordFields(record)}</article>`).join('')}<div class="v562-boundary"><strong>Boundary:</strong> ${v562Esc(V562_STATE.schema?.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v562DownloadRecord(recordId){
  const record = v562Records().find(r => r.record_id === recordId);
  if(!record) return;
  const content = `CyberShield Decision Record\n\n${Object.entries(record).map(([key,value]) => `${key}: ${Array.isArray(value) ? value.join('; ') : value}`).join('\n')}\n\nBoundary: ${V562_STATE.schema?.boundary || ''}\n`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${record.record_id}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v562Inject(){
  const runtime = v562$('#runtime.active');
  if(runtime && !v562$('#v562RuntimeRecords', runtime)){
    const wrap = document.createElement('div');
    wrap.id = 'v562RuntimeRecords';
    wrap.innerHTML = v562RecordsHtml(3);
    runtime.insertAdjacentElement('afterbegin', wrap);
  }
  const proof = v562$('#proof.active');
  if(proof && !v562$('#v562ProofRecords', proof)){
    const wrap = document.createElement('div');
    wrap.id = 'v562ProofRecords';
    wrap.innerHTML = v562RecordsHtml(3);
    proof.insertAdjacentElement('afterbegin', wrap);
  }
  const evidence = v562$('#evidence.active');
  if(evidence && !v562$('#v562EvidenceRecords', evidence)){
    const wrap = document.createElement('div');
    wrap.id = 'v562EvidenceRecords';
    wrap.innerHTML = v562RecordsHtml(2);
    evidence.appendChild(wrap);
  }
}

function v562MarkMeta(){
  const payload = v562$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V56.2 Decision Record Hardening';
    parsed.version = 'V56.2';
    parsed.previous_operational_build = 'V56.1 Evidence and Assumption Register';
    parsed.decision_record_hardening = { status: 'active', path: V562_DECISION_SCHEMA_PATH, record_count: v562Records().length, doctrine: V562_STATE.schema?.doctrine, boundary: V562_STATE.schema?.boundary, github_pages_browser_qa_required: true };
    parsed.prototype_boundary = 'Static advisory prototype only. No live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, or live internet claim verification.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v562Apply(){ v562InstallStyles(); v562Inject(); v562MarkMeta(); }
function v562Handlers(){
  if(window.__v562Handlers) return;
  window.__v562Handlers = true;
  document.addEventListener('click', event => {
    const open = event.target.closest('[data-v562-record]');
    if(open){ v562OpenRecord(open.dataset.v562Record); return; }
    const dl = event.target.closest('[data-v562-download]');
    if(dl){ v562DownloadRecord(dl.dataset.v562Download); return; }
    if(event.target.closest('[data-v562-close]') || (event.target.classList && event.target.classList.contains('v562-modal'))){ v562$('.v562-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v554-mode],[data-v554-reset],[data-v554-domain],[data-v554-asset],[data-v554-core],[data-v556-route]')) setTimeout(v562Apply, 620);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v562$('.v562-modal')?.remove(); });
}

v562Handlers();
v562LoadSchema().then(() => setTimeout(v562Apply, 2400)).catch(error => console.warn('CyberShield V56.2 decision schema unavailable', error));
window.addEventListener('load', () => setTimeout(v562Apply, 2800), { once: true });
setTimeout(v562Apply, 3400);
