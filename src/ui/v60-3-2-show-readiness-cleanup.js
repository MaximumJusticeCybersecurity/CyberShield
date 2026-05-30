// V60.3.2 Show-Readiness Cleanup Pass
// Purpose: make CyberShield presentable for advisor/pilot feedback by reducing duplicated scaffold sections,
// keeping each workspace focused, and adding concise workspace purpose framing.
// Boundary: static advisory prototype only. No live scoring, live evidence retrieval, backend persistence, workflow automation, or enforcement.

function v6032$(selector, root = document){ return root.querySelector(selector); }
function v6032$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v6032Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

const V6032_WORKSPACE_COPY = {
  briefing: {
    title: 'Executive briefing',
    body: 'Start here for the plain-English decision posture.  The briefing should explain what matters, why it matters, and what leadership should do next.'
  },
  trustmap: {
    title: 'TrustMap',
    body: 'Use the radar-constellation view to understand the trust universe, key domains, evidence relationships, and where trust breaks before action.'
  },
  runtime: {
    title: 'Runtime command view',
    body: 'Runtime shows what action is allowed, constrained, escalated, or refused.  It should not be a manual evidence workbench.'
  },
  evidence: {
    title: 'Evidence workspace',
    body: 'Evidence is where proof, assumptions, missing items, reviewer notes, and state transitions are managed for traceability.'
  },
  proof: {
    title: 'Proof Pack',
    body: 'Proof Pack turns model trace, evidence state, assumptions, limitations, and decision records into defensible output.'
  },
  architecture: {
    title: 'Architecture and doctrine',
    body: 'Architecture explains how CyberShield is structured: trust models, evidence traceability, Purpose Protocol, and prototype boundaries.'
  },
  settings: {
    title: 'Settings and build status',
    body: 'Settings holds prototype metadata, build labels, boundaries, and QA signals.  It is not the executive decision surface.'
  }
};

function v6032InstallStyles(){
  if(v6032$('#v60-3-2-show-readiness-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-2-show-readiness-style';
  style.textContent = `
    .v6032-workspace-frame{border:1px solid rgba(66,215,255,.28);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.88),rgba(3,13,24,.96));box-shadow:0 18px 36px rgba(0,0,0,.22),0 0 28px rgba(66,215,255,.08);padding:14px 16px;margin:0 0 14px;color:#dff7ff}
    .v6032-workspace-frame .kicker{display:inline-flex;border:1px solid rgba(66,215,255,.36);border-radius:999px;padding:3px 8px;font-size:.68rem;font-weight:900;text-transform:uppercase;letter-spacing:.07em;color:#8fd6ff;margin-bottom:7px}
    .v6032-workspace-frame h2{margin:0 0 6px;color:#fff;font-size:1.05rem}.v6032-workspace-frame p{margin:0;line-height:1.45;font-size:.9rem;color:#bfefff}
    .v6032-focus-note{border:1px solid rgba(255,209,102,.24);border-radius:14px;background:rgba(255,209,102,.055);padding:9px 10px;margin-top:9px;color:#ffe7a6;font-size:.8rem;line-height:1.4}
    .v6032-demoted{max-height:260px;overflow:auto;opacity:.92}.v6032-demoted:before{content:'Supporting detail';display:inline-flex;border:1px solid rgba(66,215,255,.2);border-radius:999px;padding:2px 7px;font-size:.62rem;font-weight:900;text-transform:uppercase;color:#8fd6ff;margin-bottom:8px}
    #runtime.active #v6032_runtime_audit, #evidence.active #v6032_evidence_audit, #proof.active #v6032_proof_audit{border:1px solid rgba(66,215,255,.16);border-radius:16px;background:rgba(255,255,255,.035);padding:10px;margin:10px 0;color:#bfefff;font-size:.78rem;line-height:1.4}
    .v6032-hide-runtime-scaffold{display:none!important}
    .v6032-showready-pill{display:inline-flex;border:1px solid rgba(37,230,155,.42);border-radius:999px;padding:3px 8px;color:#9df7cc;font-size:.68rem;font-weight:900;text-transform:uppercase;letter-spacing:.07em}
  `;
  document.head.appendChild(style);
}

function v6032WorkspaceId(){
  const active = document.querySelector('main .view.active, section.view.active, .view.active, #briefing.active, #trustmap.active, #runtime.active, #evidence.active, #proof.active, #architecture.active, #settings.active');
  return active?.id || null;
}

function v6032AddWorkspaceFrame(viewId){
  const root = v6032$(`#${viewId}.active`);
  const copy = V6032_WORKSPACE_COPY[viewId];
  if(!root || !copy || v6032$(`#v6032Frame_${viewId}`, root)) return;
  const frame = document.createElement('section');
  frame.id = `v6032Frame_${viewId}`;
  frame.className = 'v6032-workspace-frame';
  frame.innerHTML = `<span class="kicker">Show-ready workspace</span><h2>${v6032Esc(copy.title)}</h2><p>${v6032Esc(copy.body)}</p>${viewId === 'runtime' ? '<div class="v6032-focus-note"><strong>Runtime rule:</strong> show evidence requirements for action, not the full Manual Evidence Workbench.</div>' : ''}`;
  root.insertAdjacentElement('afterbegin', frame);
}

function v6032CorrectRuntime(){
  const runtime = v6032$('#runtime.active');
  if(!runtime) return;
  v6032$$('#v60-runtime-workbench .v60-field,#v60-runtime-workbench h3', runtime).forEach(node => {
    if(/Manual Entry Prototype|Evidence Objects|State Transition Rules/i.test(node.textContent || '') || node.classList.contains('v60-field')) node.classList.add('v6032-hide-runtime-scaffold');
  });
  const workbench = v6032$('#v60-runtime-workbench', runtime);
  if(workbench && !v6032$('#v6032_runtime_audit', runtime)){
    const audit = document.createElement('div');
    audit.id = 'v6032_runtime_audit';
    audit.innerHTML = '<span class="v6032-showready-pill">Runtime cleaned</span> Full manual evidence-entry controls are suppressed here.  Runtime now emphasizes evidence requirements, blocking gaps, owner, risk if wrong, and next human action.';
    workbench.insertAdjacentElement('afterend', audit);
  }
}

function v6032DemoteSupportingDetail(viewId){
  const root = v6032$(`#${viewId}.active`);
  if(!root) return;
  const sections = [
    '.v603-trace',
    '.v602-impact',
    '.v561-register',
    '.v562-records'
  ];
  sections.forEach(selector => {
    const matches = v6032$$(selector, root);
    matches.forEach((node, index) => {
      if(index > 0 || ['runtime','proof','architecture','settings'].includes(viewId)){
        node.classList.add('v6032-demoted');
      }
    });
  });
}

function v6032AddWorkspaceAudit(viewId){
  const root = v6032$(`#${viewId}.active`);
  if(!root) return;
  const id = `v6032_${viewId}_audit`;
  if(v6032$(`#${id}`, root)) return;
  if(viewId === 'evidence'){
    const audit = document.createElement('div');
    audit.id = id;
    audit.innerHTML = '<span class="v6032-showready-pill">Evidence focus</span> This workspace owns manual evidence handling, assumptions, missing items, state transitions, and reviewer context.';
    root.insertAdjacentElement('beforeend', audit);
  }
  if(viewId === 'proof'){
    const audit = document.createElement('div');
    audit.id = id;
    audit.innerHTML = '<span class="v6032-showready-pill">Proof focus</span> This workspace should show defensibility, model trace, evidence caveats, and export context, not operational clutter.';
    root.insertAdjacentElement('beforeend', audit);
  }
}

function v6032MarkMeta(){
  const payload = v6032$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.2 Show-Readiness Cleanup Pass';
    parsed.version = 'V60.3.2';
    parsed.previous_operational_build = 'V60.3.1 Runtime Evidence Panel Correction';
    parsed.show_readiness_cleanup = {
      status: 'active_static_cleanup',
      rule: 'Reduce duplicated scaffolding, preserve workspace focus, keep Runtime as command authority, Evidence as manual evidence workspace, and Proof Pack as defensibility trace.',
      workspace_focus: V6032_WORKSPACE_COPY,
      github_pages_browser_qa_required: true
    };
    parsed.prototype_boundary = 'Static advisory prototype only. No live scoring, live evidence retrieval, statistical validation, backend persistence, workflow automation, ticketing, notifications, enforcement, or live integrations.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v6032Apply(){
  v6032InstallStyles();
  Object.keys(V6032_WORKSPACE_COPY).forEach(viewId => v6032AddWorkspaceFrame(viewId));
  const activeId = v6032WorkspaceId();
  if(activeId){
    v6032CorrectRuntime();
    v6032DemoteSupportingDetail(activeId);
    v6032AddWorkspaceAudit(activeId);
  }
  v6032MarkMeta();
}

function v6032Handlers(){
  if(window.__v6032Handlers) return;
  window.__v6032Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v603-score],[data-v603-model],[data-v602-open],[data-v562-record],[data-v561-open],[data-v60-open],[data-v554-mode],[data-v554-domain],[data-v554-asset]')){
      setTimeout(v6032Apply, 1100);
    }
  }, true);
}

v6032Handlers();
setTimeout(v6032Apply, 6200);
window.addEventListener('load', () => setTimeout(v6032Apply, 7200), { once:true });
setTimeout(v6032Apply, 9200);
