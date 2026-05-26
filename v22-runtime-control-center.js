(() => {
  "use strict";

  const STORAGE_KEY = "cybershield_executive_os_state";
  const V22_KEY = "cybershield_v22_runtime_events";
  const DECISION_KEY = "cybershield_admissibility_decisions";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;", "'":"&#39;" }[c]));

  const scenarios = [
    {
      id: "vendor-payment-ai",
      title: "AI vendor payment authorization",
      request: "AI finance assistant recommends approving a vendor payment after invoice confidence appears sufficient.",
      action: "Approve vendor payment",
      system: "AI finance assistant",
      data: "vendor invoice, approval chain, payment workflow",
      baseTrust: 74,
      evidence: 58,
      policy: 68,
      authority: 62,
      consequence: 82,
      blast: ["Vendor Access", "Critical Workflows", "Evidence Substrate", "Executive Authority"],
      owner: "CFO",
      outcome: "Escalate",
      why: "The payment action is financially material and depends on partial evidence.  CyberShield escalates because confidence is below the authority threshold for automated approval.",
      constraint: "Human approval required before execution.  Preserve invoice evidence, model output, policy rule, and approval route."
    },
    {
      id: "ai-client-email",
      title: "AI-generated client communication",
      request: "AI drafts a client-facing message involving security posture, timeline commitments, and remediation status.",
      action: "Send external communication",
      system: "AI communications assistant",
      data: "client account, incident status, remediation language",
      baseTrust: 69,
      evidence: 64,
      policy: 72,
      authority: 55,
      consequence: 76,
      blast: ["AI Systems", "Executive Outputs", "Evidence Substrate", "General Counsel"],
      owner: "General Counsel",
      outcome: "Allow with constraints",
      why: "The content can proceed only as a draft because external communication creates reputational and legal exposure.  Human review is required before release.",
      constraint: "Draft mode only.  Legal or executive approval required before sending."
    },
    {
      id: "privileged-access-reset",
      title: "Privileged access reset request",
      request: "AI operations agent recommends resetting privileged credentials to resolve a high-priority access issue.",
      action: "Reset privileged access",
      system: "AI operations agent",
      data: "identity, privileged account, incident queue",
      baseTrust: 61,
      evidence: 47,
      policy: 59,
      authority: 42,
      consequence: 90,
      blast: ["Identity Boundary", "Runtime Rules", "Critical Workflows", "Audit Evidence Layer"],
      owner: "CIO / CTO",
      outcome: "Block",
      why: "The request touches privileged access with insufficient evidence and unclear authority.  CyberShield blocks execution until the human authority path is verified.",
      constraint: "No automated reset.  Require identity owner approval, change ticket, and after-action evidence packet."
    },
    {
      id: "backup-validation",
      title: "Recovery validation automation",
      request: "AI resilience assistant recommends launching a backup validation test for a critical workflow.",
      action: "Run recovery validation",
      system: "AI resilience assistant",
      data: "backup state, recovery objective, workflow dependency",
      baseTrust: 86,
      evidence: 82,
      policy: 78,
      authority: 80,
      consequence: 54,
      blast: ["Critical Workflows", "Evidence Substrate", "Executive Outputs"],
      owner: "COO",
      outcome: "Allow",
      why: "The action is reversible, evidence-supported, and aligned to resilience policy.  CyberShield allows execution and captures the test result as operating proof.",
      constraint: "Proceed.  Preserve validation output and update resilience evidence history."
    },
    {
      id: "shadow-ai-upload",
      title: "Shadow AI sensitive data upload",
      request: "Employee attempts to use an unapproved AI tool to summarize sensitive operational and customer records.",
      action: "Upload sensitive data to unapproved AI",
      system: "Unapproved external AI tool",
      data: "customer records, operational data, internal notes",
      baseTrust: 38,
      evidence: 40,
      policy: 22,
      authority: 20,
      consequence: 88,
      blast: ["AI Systems", "Policy Boundary", "Evidence Substrate", "Executive Authority"],
      owner: "CISO / vCISO",
      outcome: "Block",
      why: "The tool is unapproved, policy alignment is low, authority is absent, and consequence severity is high.  CyberShield blocks the action before data leaves the organization.",
      constraint: "Block upload.  Trigger human review, approved-tool guidance, and policy evidence capture."
    }
  ];

  function profile(){try{return (JSON.parse(localStorage.getItem(STORAGE_KEY))||{}).profile||{};}catch{return{};}}
  function events(){try{return JSON.parse(localStorage.getItem(V22_KEY))||[];}catch{return[];}}
  function saveEvent(e){const list=events();list.unshift(e);localStorage.setItem(V22_KEY,JSON.stringify(list.slice(0,40)));}
  function decisions(){try{return JSON.parse(localStorage.getItem(DECISION_KEY))||[];}catch{return[];}}
  function saveDecision(e){const list=decisions();list.unshift(e);localStorage.setItem(DECISION_KEY,JSON.stringify(list.slice(0,40)));}

  function score(s){
    const trust = Math.round((s.baseTrust*.25)+(s.evidence*.22)+(s.policy*.22)+(s.authority*.18)+((100-s.consequence)*.13));
    const state = s.outcome;
    return { trust, state, confidence: s.evidence, policy: s.policy, authority: s.authority, consequence: s.consequence };
  }

  function styles(){
    if($("#v22RuntimeStyles"))return;
    const st=document.createElement("style");
    st.id="v22RuntimeStyles";
    st.textContent=`
      .runtime-shell{display:grid;grid-template-columns:minmax(260px,.85fr) minmax(0,1.35fr) minmax(280px,.9fr);gap:16px;align-items:start}.runtime-card{min-width:0}.scenario-list{display:grid;gap:10px}.scenario-btn{border:1px solid var(--omega-line);border-radius:16px;background:rgba(7,27,48,.52);color:#fff;text-align:left;padding:13px;cursor:pointer}.scenario-btn:hover,.scenario-btn.active{border-color:var(--omega-cyan);background:rgba(66,215,255,.1)}.scenario-btn strong{display:block}.scenario-btn span{display:block;color:var(--omega-muted);font-size:.84rem;margin-top:4px}.runtime-request{border:1px solid rgba(66,215,255,.28);border-radius:22px;background:rgba(7,27,48,.55);padding:16px}.runtime-request h3{margin:.25rem 0 .5rem;color:#fff}.runtime-request p{color:var(--omega-muted)}.decision-badge{display:inline-flex;border-radius:999px;padding:8px 12px;font-weight:950;border:1px solid rgba(66,215,255,.34);background:rgba(66,215,255,.1);color:#42d7ff}.decision-badge.block{border-color:rgba(255,116,116,.38);background:rgba(255,116,116,.1);color:#ff7474}.decision-badge.escalate{border-color:rgba(255,209,102,.38);background:rgba(255,209,102,.1);color:#ffd166}.decision-badge.allow{border-color:rgba(126,230,162,.38);background:rgba(126,230,162,.1);color:#7ee6a2}.metrics-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-top:13px}.metric{border:1px solid var(--omega-line);border-radius:14px;background:rgba(4,14,24,.5);padding:10px;text-align:center}.metric strong{display:block;color:#fff;font-size:1.3rem}.metric span{font-size:.72rem;color:var(--omega-muted);text-transform:uppercase;letter-spacing:.05em}.runtime-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}.why-panel,.consequence-panel,.evidence-panel,.feed-panel,.propagation-panel{border:1px solid var(--omega-line);border-radius:20px;background:rgba(7,27,48,.48);padding:14px;margin-top:14px}.why-panel h3,.consequence-panel h3,.evidence-panel h3,.feed-panel h3,.propagation-panel h3{margin:.1rem 0 .45rem;color:#fff}.why-list,.evidence-list,.feed-list{display:grid;gap:8px;margin-top:10px}.why-list span,.evidence-list span,.feed-list span{border:1px solid var(--omega-line);border-radius:13px;background:rgba(4,14,24,.42);padding:9px;color:var(--omega-muted)}.why-list b,.evidence-list b,.feed-list b{color:#fff}.consequence-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:10px}.consequence-item{border:1px solid var(--omega-line);border-radius:14px;background:rgba(4,14,24,.42);padding:10px}.consequence-item strong{display:block;color:#fff}.consequence-item span{color:var(--omega-muted);font-size:.88rem}.propagation-map{display:grid;gap:8px;margin-top:10px}.prop-node{display:flex;align-items:center;justify-content:space-between;gap:10px;border:1px solid rgba(66,215,255,.24);border-radius:14px;background:rgba(66,215,255,.08);padding:10px;color:#fff}.prop-node.degraded{border-color:rgba(255,209,102,.38);background:rgba(255,209,102,.08)}.prop-node.blocked{border-color:rgba(255,116,116,.38);background:rgba(255,116,116,.08)}.prop-node.allowed{border-color:rgba(126,230,162,.38);background:rgba(126,230,162,.08)}.prop-node span:last-child{font-size:.78rem;color:var(--omega-muted)}.control-center-card{border-color:rgba(66,215,255,.35)!important;background:rgba(66,215,255,.07)!important}.feed-timestamp{font-size:.74rem;color:var(--omega-muted)}@media(max-width:1120px){.runtime-shell{grid-template-columns:1fr}.metrics-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.consequence-grid{grid-template-columns:1fr}.runtime-actions{display:grid}.runtime-actions button{width:100%}}`;
    document.head.appendChild(st);
  }

  function nav(){
    const n=$("#primaryNav");
    if(!n||n.querySelector('[data-view="runtime"]'))return;
    const b=document.createElement("button");
    b.className="nav-item";
    b.dataset.view="runtime";
    b.textContent="Runtime";
    n.insertBefore(b,n.querySelector('[data-view="briefing"]')?.nextSibling||n.firstChild);
  }

  function panel(){
    const m=$("#main");
    if(!m||$('[data-view-panel="runtime"]'))return;
    const sec=document.createElement("section");
    sec.className="view-panel";
    sec.dataset.viewPanel="runtime";
    sec.innerHTML=`<div class="section-head operational-only"><span class="boundary-chip live">Runtime Control Center</span><h2>Behavior Realism: Admissibility Before Execution</h2><p>CyberShield simulates an AI action request, evaluates trust, policy, authority, evidence, and consequence, then shows why the action is allowed, blocked, escalated, or constrained.</p></div><div class="runtime-shell"><aside class="omega-card runtime-card"><div class="card-kicker">AI action requests</div><h3>Scenario queue</h3><div class="scenario-list" id="runtimeScenarioList"></div></aside><section class="runtime-card"><article class="runtime-request" id="runtimeRequest"></article><article class="propagation-panel"><div class="card-kicker">Trust propagation</div><h3>Downstream state change</h3><p>When trust degrades, related nodes illuminate and the execution path changes.</p><div class="propagation-map" id="propagationMap"></div></article><article class="consequence-panel"><div class="card-kicker">Consequence-aware governance</div><h3>Operational consequence model</h3><div class="consequence-grid" id="consequenceGridV22"></div></article></section><aside class="runtime-card"><article class="why-panel"><div class="card-kicker">Why was this allowed?</div><h3 id="whyTitle">Decision rationale</h3><div class="why-list" id="whyList"></div></article><article class="evidence-panel"><div class="card-kicker">Evidence substrate</div><h3>Replayable evidence packet</h3><div class="evidence-list" id="evidencePacket"></div></article><article class="feed-panel"><div class="card-kicker">Runtime governance feed</div><h3>Live governance events</h3><div class="feed-list" id="runtimeFeed"></div></article></aside></div>`;
    const briefing=$('[data-view-panel="briefing"]');
    m.insertBefore(sec,briefing||m.firstChild);
  }

  function renderScenarios(activeId){
    const list=$("#runtimeScenarioList");
    if(!list)return;
    list.innerHTML=scenarios.map(s=>`<button class="scenario-btn ${s.id===activeId?'active':''}" data-runtime-scenario="${s.id}"><strong>${esc(s.title)}</strong><span>${esc(s.action)} · ${esc(s.outcome)}</span></button>`).join("");
  }

  function renderScenario(id){
    const s=scenarios.find(x=>x.id===id)||scenarios[0];
    renderScenarios(s.id);
    const sc=score(s);
    const badgeClass = s.outcome.toLowerCase().includes("block") ? "block" : s.outcome.toLowerCase().includes("escalate") ? "escalate" : s.outcome.toLowerCase().includes("allow") ? "allow" : "";
    const req=$("#runtimeRequest");
    if(req) req.innerHTML=`<div class="card-kicker">AI action request</div><h3>${esc(s.title)}</h3><p>${esc(s.request)}</p><span class="decision-badge ${badgeClass}">${esc(s.outcome)}</span><div class="metrics-grid"><div class="metric"><strong>${sc.trust}</strong><span>Trust</span></div><div class="metric"><strong>${sc.confidence}</strong><span>Evidence</span></div><div class="metric"><strong>${sc.policy}</strong><span>Policy</span></div><div class="metric"><strong>${sc.authority}</strong><span>Authority</span></div><div class="metric"><strong>${sc.consequence}</strong><span>Consequence</span></div></div><div class="runtime-actions"><button class="primary-action" id="runRuntimeDecision" data-runtime-id="${esc(s.id)}">Run Decision Simulation</button><button class="secondary-action" id="saveRuntimeDecision" data-runtime-id="${esc(s.id)}">Save Evidence Packet</button></div>`;
    renderWhy(s, sc);
    renderPropagation(s);
    renderConsequence(s, sc);
    renderEvidence(s, sc);
    renderFeed();
  }

  function renderWhy(s, sc){
    const title=$("#whyTitle"); if(title) title.textContent = `${s.outcome}: ${s.action}`;
    const list=$("#whyList"); if(!list)return;
    list.innerHTML=[
      [`Trust score`, `${sc.trust}/100 from trust state, evidence, policy, authority, and consequence weighting`],
      [`Policy alignment`, `${sc.policy}/100. ${sc.policy<60?'Policy boundary is not satisfied.':sc.policy<75?'Policy is partially aligned and needs constraints.':'Policy alignment is acceptable.'}`],
      [`Authority boundary`, `${sc.authority}/100. ${sc.authority<60?'Human authority is required before execution.':'Authority is sufficient for the proposed path.'}`],
      [`Evidence confidence`, `${sc.confidence}/100. ${sc.confidence<60?'Evidence is too weak for autonomous execution.':'Evidence is adequate for governed execution.'}`],
      [`Consequence analysis`, `${sc.consequence}/100 severity. ${sc.consequence>80?'High consequence triggers review or block logic.':'Consequence is inside controlled tolerance.'}`]
    ].map(([k,v])=>`<span><b>${esc(k)}:</b> ${esc(v)}</span>`).join("");
  }

  function renderPropagation(s){
    const map=$("#propagationMap"); if(!map)return;
    const cls = s.outcome.includes("Block") ? "blocked" : s.outcome.includes("Escalate") || s.outcome.includes("constraints") ? "degraded" : "allowed";
    map.innerHTML=s.blast.map((n,i)=>`<div class="prop-node ${cls}"><span>${esc(n)}</span><span>${i===0?'source signal':i===s.blast.length-1?'authority/evidence impact':'downstream impact'}</span></div>`).join("");
  }

  function renderConsequence(s, sc){
    const grid=$("#consequenceGridV22"); if(!grid)return;
    const op = sc.consequence>80 ? "High disruption potential" : sc.consequence>65 ? "Moderate disruption potential" : "Controlled operating impact";
    const reg = s.data.toLowerCase().includes("customer") || s.action.toLowerCase().includes("external") ? "Regulatory or legal review likely" : "Regulatory exposure appears limited";
    const fin = s.action.toLowerCase().includes("payment") ? "Direct financial exposure" : sc.consequence>80 ? "Material financial impact possible" : "Financial exposure controlled";
    const vendor = s.blast.some(x=>x.toLowerCase().includes("vendor")) ? "Vendor trust path affected" : "Vendor propagation not primary";
    grid.innerHTML=[["Operational",op],["Regulatory",reg],["Financial",fin],["Vendor propagation",vendor],["Trust degradation",`${Math.max(0,100-sc.trust)} point degradation pressure`],["Audit defensibility",sc.confidence<60?"Insufficient evidence for audit-ready execution":"Evidence packet can support audit review"]].map(([k,v])=>`<div class="consequence-item"><strong>${esc(k)}</strong><span>${esc(v)}</span></div>`).join("");
  }

  function renderEvidence(s, sc){
    const pack=$("#evidencePacket"); if(!pack)return;
    const id=`EV-${s.id.toUpperCase()}-${new Date().toISOString().slice(0,10)}`;
    pack.innerHTML=[
      [`Evidence ID`, id],
      [`Model/action`, `${s.system} · ${s.action}`],
      [`Decision`, s.outcome],
      [`Human owner`, s.owner],
      [`Policy context`, `Policy ${sc.policy}/100 · authority ${sc.authority}/100`],
      [`Preserved rationale`, s.why],
      [`Execution constraint`, s.constraint]
    ].map(([k,v])=>`<span><b>${esc(k)}:</b> ${esc(v)}</span>`).join("");
  }

  function renderFeed(){
    const feed=$("#runtimeFeed"); if(!feed)return;
    const list=events();
    feed.innerHTML=list.length?list.slice(0,8).map(e=>`<span><b>${esc(e.outcome)}</b> · ${esc(e.title)}<br><span class="feed-timestamp">${esc(e.time)} · owner: ${esc(e.owner)}</span></span>`).join(""):`<span><b>No runtime events yet.</b> Run a decision simulation to create a governance event.</span>`;
  }

  function runDecision(id, persist=false){
    const s=scenarios.find(x=>x.id===id)||scenarios[0];
    const sc=score(s);
    const event={
      schema_version:"cybershield.runtime_event.v1",
      time:new Date().toLocaleString(),
      id:s.id,
      title:s.title,
      request:s.request,
      action:s.action,
      system:s.system,
      outcome:s.outcome,
      trust_score:sc.trust,
      evidence_confidence:sc.confidence,
      policy_alignment:sc.policy,
      authority_boundary:sc.authority,
      consequence_severity:sc.consequence,
      owner:s.owner,
      why:s.why,
      constraint:s.constraint,
      propagation:s.blast
    };
    saveEvent(event);
    if(persist){
      saveDecision({ outcome:s.outcome, action:s.action, owner:s.owner, trustScore:sc.trust, why:s.why, evidenceId:`EV-${s.id.toUpperCase()}`, timestamp:new Date().toISOString() });
    }
    renderScenario(s.id);
  }

  function settings(){
    const grid=$(".settings-grid");
    if(!grid||$("#runtimeControlSettings"))return;
    const card=document.createElement("article");
    card.className="omega-card control-center-card";
    card.id="runtimeControlSettings";
    card.innerHTML=`<div class="card-kicker">Runtime behavior</div><h3>Runtime Control Center</h3><p>CyberShield now includes an integrated behavior-realism layer: request, admissibility decision, why allowed, trust propagation, consequence model, human escalation, evidence packet, and activity feed.</p><button class="secondary-action" data-view-jump="runtime">Open Runtime Control Center</button>`;
    grid.appendChild(card);
  }

  function bind(){
    document.addEventListener("click",e=>{
      const sbtn=e.target.closest("[data-runtime-scenario]");
      if(sbtn) renderScenario(sbtn.dataset.runtimeScenario);
      const run=e.target.closest("#runRuntimeDecision");
      if(run) runDecision(run.dataset.runtimeId,false);
      const save=e.target.closest("#saveRuntimeDecision");
      if(save) runDecision(save.dataset.runtimeId,true);
    });
  }

  function init(){
    styles(); nav(); panel(); settings(); bind(); renderScenario(scenarios[0].id);
    let queued=false;
    new MutationObserver(()=>{ if(queued)return; queued=true; requestAnimationFrame(()=>{queued=false; nav(); panel(); settings(); if(!$("#runtimeRequest")?.innerHTML) renderScenario(scenarios[0].id); renderFeed();}); }).observe(document.body,{childList:true,subtree:true,characterData:true});
  }
  document.addEventListener("DOMContentLoaded",init);
})();
