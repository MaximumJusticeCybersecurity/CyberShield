// V58 Operational Trust Control Pane
// Purpose: consolidate executive inspection across TrustMap, Runtime, Evidence, Proof Pack, score contract,
// Trust Scoring Models, decision records, board narrative, evidence gaps, and next actions.
// Boundary: static advisory prototype only. No live monitoring, scoring, evidence retrieval, enforcement, ticketing, or integrations.

const V58_CONTROL_PATH = 'data/control/v58-operational-trust-control-pane.json';
const V58_STATE = { registry: null };

function v58$(selector, root = document){ return root.querySelector(selector); }
function v58Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v58LoadRegistry(){
  if(V58_STATE.registry) return V58_STATE.registry;
  const response = await fetch(V58_CONTROL_PATH, { cache: 'no-store' });
  if(!response.ok) throw new Error(`Operational Trust Control Pane registry fetch failed: ${response.status}`);
  V58_STATE.registry = await response.json();
  window.CyberShieldOperationalTrustControlPaneV58 = V58_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:operational-trust-control-pane-loaded', { detail: { registry: V58_STATE.registry } }));
  return V58_STATE.registry;
}

function v58InstallStyles(){
  if(v58$('#v58-operational-control-style')) return;
  const style = document.createElement('style');
  style.id = 'v58-operational-control-style';
  style.textContent = `
    .v58-control{border:1px solid rgba(66,215,255,.32);border-radius:24px;background:radial-gradient(circle at 18% 18%,rgba(66,215,255,.12),transparent 30%),linear-gradient(180deg,rgba(7,27,48,.95),rgba(3,13,24,.99));box-shadow:0 22px 48px rgba(0,0,0,.32),0 0 36px rgba(66,215,255,.1);padding:16px;margin:12px 0;color:#dff7ff}
    .v58-control h2,.v58-control h3{margin:0 0 8px;color:#fff}.v58-control p{line-height:1.52}.v58-kicker{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(66,215,255,.4);border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900;text-transform:uppercase;color:#8fd6ff}.v58-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(245px,1fr));gap:10px;margin-top:10px}.v58-card{border:1px solid rgba(66,215,255,.18);border-radius:16px;background:rgba(255,255,255,.045);padding:12px}.v58-card strong{color:#fff}.v58-small{font-size:.8rem;color:#bfefff}.v58-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v58-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v58-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v58-boundary{border:1px solid rgba(255,76,76,.25);background:rgba(255,76,76,.06);border-radius:14px;padding:10px;margin-top:12px;color:#ffd1d1}.v58-metric{font-size:1.8rem;font-weight:950;color:#fff;text-shadow:0 0 10px rgba(66,215,255,.45)}.v58-route{display:inline-flex;margin-top:8px;border:1px solid rgba(66,215,255,.28);border-radius:999px;padding:6px 9px;background:rgba(3,13,24,.78);color:#dff7ff;font-weight:900;cursor:pointer}.v58-route:hover{border-color:#42d7ff}.v58-list{margin:0;padding-left:18px}.v58-list li{margin:4px 0}
    .v58-modal{position:fixed;inset:0;z-index:10007;display:grid;place-items:center;background:rgba(0,0,0,.66);padding:20px}.v58-modal-card{width:min(980px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v58-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v58-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}.v58-code{white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;font-size:.76rem;background:rgba(0,0,0,.28);border:1px solid rgba(66,215,255,.16);border-radius:14px;padding:10px;overflow:auto}
  `;
  document.head.appendChild(style);
}

function v58Counts(){
  const evidence = window.CyberShieldEvidenceAssumptionRegisterV561?.register_items || [];
  const records = window.CyberShieldDecisionRecordSchemaV562?.demo_records || [];
  const models = window.CyberShieldCoreTrustScoringModelsV564?.models || [];
  const gaps = evidence.filter(item => ['missing','assumed','needs_verification','stale','conflicting'].includes(item.state));
  return { evidence: evidence.length, gaps: gaps.length, records: records.length, models: models.length };
}

function v58CardHtml(card){
  return `<article class="v58-card"><strong>${v58Esc(card.label)}</strong><p class="v58-small">${v58Esc(card.summary)}</p><p class="v58-small"><b>Question:</b> ${v58Esc(card.primary_question)}</p><button type="button" class="v58-route" data-v58-route="${v58Esc(card.route)}">Open ${v58Esc(card.route)}</button></article>`;
}

function v58ControlHtml(){
  const registry = V58_STATE.registry;
  if(!registry) return '';
  const counts = v58Counts();
  return `<section class="v58-control"><span class="v58-kicker">Operational Trust Control Pane</span><h2>What needs executive attention now?</h2><p>${v58Esc(registry.purpose)}</p><div class="v58-grid"><article class="v58-card"><strong>Evidence gaps</strong><div class="v58-metric">${v58Esc(counts.gaps)}</div><p class="v58-small">Missing, assumed, stale, conflicting, or needs-verification items</p></article><article class="v58-card"><strong>Decision records</strong><div class="v58-metric">${v58Esc(counts.records)}</div><p class="v58-small">Defensible decision traces currently available</p></article><article class="v58-card"><strong>Trust models</strong><div class="v58-metric">${v58Esc(counts.models)}</div><p class="v58-small">Core Trust Scoring Models loaded</p></article><article class="v58-card"><strong>Control doctrine</strong><p class="v58-small">${v58Esc(registry.controlling_principle)}</p></article></div><h3>Control Cards</h3><div class="v58-grid">${(registry.control_cards || []).sort((a,b)=>a.priority-b.priority).map(v58CardHtml).join('')}</div><div class="v58-actions"><button type="button" class="v58-btn" data-v58-open>Open control pane trace</button><button type="button" class="v58-btn" data-v58-download>Download control summary</button></div><div class="v58-boundary"><strong>Boundary:</strong> ${v58Esc(registry.boundary)}</div></section>`;
}

function v58TraceObject(){
  const registry = V58_STATE.registry || {};
  return {
    version: 'V58',
    product: 'CyberShield Executive OS',
    generated_at: new Date().toISOString(),
    purpose: registry.purpose,
    controlling_principle: registry.controlling_principle,
    executive_questions: registry.executive_questions || [],
    source_layers: registry.source_layers || [],
    control_cards: registry.control_cards || [],
    next_action_rules: registry.next_action_rules || [],
    counts: v58Counts(),
    boundary: registry.boundary
  };
}

function v58OpenTrace(){
  v58InstallStyles();
  v58$('.v58-modal')?.remove();
  const modal = document.createElement('div');
  modal.className = 'v58-modal';
  modal.innerHTML = `<section class="v58-modal-card" role="dialog" aria-modal="true" aria-label="Operational Trust Control Pane Trace"><header><div><h2>Operational Trust Control Pane Trace</h2><p>${v58Esc(V58_STATE.registry?.controlling_principle || '')}</p></div><button type="button" class="v58-close" data-v58-close>Close</button></header><h3>Executive Questions</h3><ul class="v58-list">${(V58_STATE.registry?.executive_questions || []).map(q => `<li>${v58Esc(q)}</li>`).join('')}</ul><h3>Next Action Rules</h3><ul class="v58-list">${(V58_STATE.registry?.next_action_rules || []).map(rule => `<li>${v58Esc(rule)}</li>`).join('')}</ul><h3>Trace Object</h3><pre class="v58-code">${v58Esc(JSON.stringify(v58TraceObject(), null, 2))}</pre><div class="v58-boundary"><strong>Boundary:</strong> ${v58Esc(V58_STATE.registry?.boundary || '')}</div></section>`;
  document.body.appendChild(modal);
}

function v58Download(){
  const trace = v58TraceObject();
  const lines = [
    'CyberShield Executive OS Operational Trust Control Pane',
    '',
    `Generated: ${trace.generated_at}`,
    `Build: ${trace.version}`,
    '',
    `Purpose: ${trace.purpose}`,
    `Doctrine: ${trace.controlling_principle}`,
    '',
    `Evidence gaps: ${trace.counts.gaps}`,
    `Decision records: ${trace.counts.records}`,
    `Trust models: ${trace.counts.models}`,
    '',
    'Executive Questions:',
    ...trace.executive_questions.map(q => `- ${q}`),
    '',
    'Next Action Rules:',
    ...trace.next_action_rules.map(r => `- ${r}`),
    '',
    `Boundary: ${trace.boundary}`
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cybershield-v58-operational-control-pane.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function v58Route(route){
  const map = { runtime: 'runtime', evidence: 'evidence', proof: 'proof', architecture: 'architecture', briefing: 'briefing', trustmap: 'trustmap' };
  const view = map[route] || route;
  document.querySelector(`#mainNav button[data-view="${view}"]`)?.click();
}

function v58Inject(){
  const briefing = v58$('#briefing.active');
  if(briefing && !v58$('#v58BriefingControlPane', briefing)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v58BriefingControlPane';
    wrapper.innerHTML = v58ControlHtml();
    briefing.insertAdjacentElement('afterbegin', wrapper);
  }
  const runtime = v58$('#runtime.active');
  if(runtime && !v58$('#v58RuntimeControlPane', runtime)){
    const wrapper = document.createElement('div');
    wrapper.id = 'v58RuntimeControlPane';
    wrapper.innerHTML = v58ControlHtml();
    runtime.insertAdjacentElement('afterbegin', wrapper);
  }
}

function v58MarkMeta(){
  const payload = v58$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V58 Operational Trust Control Pane';
    parsed.version = 'V58';
    parsed.previous_operational_build = 'V57.1 Board and Executive Narrative Layer';
    parsed.operational_trust_control_pane = { status: 'active', path: V58_CONTROL_PATH, source_layers: V58_STATE.registry?.source_layers, boundary: V58_STATE.registry?.boundary, github_pages_browser_qa_required: true };
    parsed.prototype_boundary = 'Static advisory prototype only. No live monitoring, live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, live claim extraction, live scoring, report delivery, workflow automation, ticketing, or live internet claim verification.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v58Apply(){ v58InstallStyles(); v58Inject(); v58MarkMeta(); }
function v58Handlers(){
  if(window.__v58Handlers) return;
  window.__v58Handlers = true;
  document.addEventListener('click', event => {
    const route = event.target.closest('[data-v58-route]');
    if(route){ v58Route(route.dataset.v58Route); return; }
    if(event.target.closest('[data-v58-open]')){ v58OpenTrace(); return; }
    if(event.target.closest('[data-v58-download]')){ v58Download(); return; }
    if(event.target.closest('[data-v58-close]') || (event.target.classList && event.target.classList.contains('v58-modal'))){ v58$('.v58-modal')?.remove(); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v571-open],[data-v57-open],[data-v564-model],[data-v563-open],[data-v562-record],[data-v561-open]')) setTimeout(v58Apply, 900);
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v58$('.v58-modal')?.remove(); });
}

v58Handlers();
v58LoadRegistry().then(() => setTimeout(v58Apply, 4300)).catch(error => console.warn('CyberShield V58 Operational Control Pane unavailable', error));
window.addEventListener('load', () => setTimeout(v58Apply, 5000), { once: true });
setTimeout(v58Apply, 5600);
