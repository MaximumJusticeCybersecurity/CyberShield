(() => {
  "use strict";

  const INTERNAL_BUILD = "CyberShield V9 Phase 3";
  const STORAGE_KEY = "cybershield_executive_os_state";
  const DECISION_KEY = "cybershield_admissibility_decisions";

  const ACTIONS = {
    data: {
      title: "AI requests sensitive client data export",
      summary: "An approved AI assistant attempts to export regulated client data for analysis outside the documented workflow.",
      actor: "AI Analytics Assistant",
      system: "Client Data Repository",
      consequence: "Regulatory, privacy, client trust, and contractual exposure",
      baseline: { authority: 58, policy: 54, evidence: 48, context: 62, consequence: 88, human: 72 },
      path: ["Executive Authority", "Executive Advisor Layer", "AI Use", "Evidence Substrate", "Client Data Repository"],
      nodes: ["exec", "advisor", "ai", "evidence"],
      owner: "General Counsel",
      policy: "Data handling and AI use boundary",
      framework: "HIPAA / SOC 2 / contractual privacy obligations",
      without: "The export depends on tool-level permission and post-event review. Evidence may exist, but the decision is reconstructed after exposure.",
      with: "CyberShield evaluates authority, evidence, consequence, and human accountability before the export is allowed."
    },
    payment: {
      title: "AI-assisted workflow attempts vendor payment approval",
      summary: "A finance workflow uses AI-generated invoice matching to approve a non-routine vendor payment above threshold.",
      actor: "Finance Workflow Agent",
      system: "Payment Approval Queue",
      consequence: "Fraud, financial loss, vendor trust, and approval-chain integrity",
      baseline: { authority: 66, policy: 60, evidence: 56, context: 58, consequence: 84, human: 68 },
      path: ["Executive Authority", "CFO Decision Lens", "Vendor Access", "Payment Workflow", "Evidence Substrate"],
      nodes: ["exec", "advisor", "vendor", "evidence"],
      owner: "CFO",
      policy: "Payment approval and vendor verification policy",
      framework: "SOC 2 / financial controls / cyber insurance evidence",
      without: "The payment can advance through fragmented finance and vendor context before leadership sees the trust gap.",
      with: "CyberShield forces payment approval through evidence, owner, and vendor-trust checks before execution."
    },
    access: {
      title: "Automation attempts privileged access change",
      summary: "An automation requests temporary administrative access after an anomalous executive identity event.",
      actor: "Identity Automation",
      system: "Privileged Access Manager",
      consequence: "Privilege escalation, identity compromise, and operational control failure",
      baseline: { authority: 46, policy: 64, evidence: 52, context: 42, consequence: 94, human: 82 },
      path: ["Executive Authority", "Identity Boundary", "Privileged Access", "Evidence Substrate"],
      nodes: ["exec", "advisor", "identity", "evidence"],
      owner: "CIO / CTO",
      policy: "Privileged access and executive identity verification",
      framework: "NIST / CIS / CMMC access control alignment",
      without: "Privilege changes can be approved inside the same compromised identity boundary that created the risk.",
      with: "CyberShield blocks or escalates privileged action when context, evidence, or authority falls below tolerance."
    },
    external: {
      title: "AI drafts external regulated communication",
      summary: "An AI assistant prepares customer-facing incident language using incomplete evidence from an unresolved event.",
      actor: "Communications Assistant",
      system: "External Communications Draft",
      consequence: "Reputational, legal, regulatory, and customer trust exposure",
      baseline: { authority: 62, policy: 58, evidence: 38, context: 64, consequence: 78, human: 76 },
      path: ["Executive Authority", "General Counsel", "AI Use", "Board Outputs", "Evidence Substrate"],
      nodes: ["exec", "advisor", "ai", "evidence"],
      owner: "General Counsel",
      policy: "External communications and incident disclosure review",
      framework: "Regulatory reporting / legal review / customer notification",
      without: "External language can move faster than verified facts, creating legal and reputation exposure.",
      with: "CyberShield holds the communication in draft mode until evidence and human approval are defensible."
    },
    recovery: {
      title: "AI recommends recovery sequence during disruption",
      summary: "An AI operations assistant recommends restoring systems based on stale backup evidence and partial dependency data.",
      actor: "Operations Recovery Assistant",
      system: "Recovery Runbook",
      consequence: "Business interruption, failed recovery, and workflow dependency failure",
      baseline: { authority: 70, policy: 66, evidence: 44, context: 50, consequence: 86, human: 70 },
      path: ["Executive Authority", "COO Workflow View", "Critical Workflows", "Recovery Evidence", "Evidence Substrate"],
      nodes: ["exec", "advisor", "workflow", "evidence"],
      owner: "COO",
      policy: "Business continuity and recovery validation",
      framework: "Operational resilience / incident response / business continuity",
      without: "Recovery order may be driven by stale evidence, causing restored systems to fail or disrupt dependent workflows.",
      with: "CyberShield evaluates recovery evidence, workflow dependency, and executive tolerance before action."
    }
  };

  let activeAction = "data";

  function $(selector, root = document){ return root.querySelector(selector); }
  function $$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }

  function init(){
    injectStyles();
    injectNavigation();
    injectPanel();
    bindEvents();
    render();
    injectMemoryDecisions();
  }

  function injectStyles(){
    if($("#phase3Styles")) return;
    const style = document.createElement("style");
    style.id = "phase3Styles";
    style.textContent = `
      .proof-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px}
      .proof-card{border:1px solid var(--omega-line);border-radius:18px;background:rgba(7,27,48,.44);padding:16px;min-width:0}
      .proof-card.without{border-color:rgba(255,116,116,.45);background:rgba(255,116,116,.08)}
      .proof-card.with{border-color:rgba(126,230,162,.45);background:rgba(126,230,162,.08)}
      .proof-card strong{display:block;color:#fff;margin-bottom:6px}.proof-card p{margin:0;color:var(--omega-muted)}
      .decision-save-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}
      .trust-node.phase3-active{border-color:var(--omega-amber)!important;box-shadow:0 0 0 5px rgba(255,209,102,.16),var(--omega-shadow)!important}
      .trust-node.phase3-active::before{content:"Admissibility path";position:absolute;left:50%;top:-28px;transform:translateX(-50%);white-space:nowrap;font-size:.65rem;text-transform:uppercase;letter-spacing:.08em;color:#fff;background:rgba(255,209,102,.16);border:1px solid rgba(255,209,102,.34);border-radius:999px;padding:4px 7px}
      .memory-decision-list{display:grid;gap:10px;margin-top:16px}.memory-decision{border:1px solid var(--omega-line);border-radius:18px;background:rgba(7,27,48,.44);padding:14px}.memory-decision strong{display:block;color:#fff}.memory-decision span{display:block;color:var(--omega-muted);font-size:.88rem;margin-top:4px}
      @media(max-width:720px){.proof-grid{grid-template-columns:1fr}.decision-save-row{display:grid}.decision-save-row button{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function injectNavigation(){
    const nav = $("#primaryNav");
    if(!nav || nav.querySelector('[data-view="admissibility"]')) return;
    const button = document.createElement("button");
    button.className = "nav-item";
    button.dataset.view = "admissibility";
    button.textContent = "Admissibility";
    const reports = nav.querySelector('[data-view="reports"]');
    nav.insertBefore(button, reports || null);
  }

  function injectPanel(){
    const main = $("#main");
    const reports = $('[data-view-panel="reports"]');
    if(!main || $("[data-view-panel='admissibility']")) return;
    const section = document.createElement("section");
    section.className = "view-panel";
    section.dataset.viewPanel = "admissibility";
    section.innerHTML = `
      <div class="section-head operational-only"><span class="boundary-chip live">Runtime Governance Engine</span><h2>Runtime Admissibility Simulator</h2><p>CyberShield evaluates whether an AI-assisted or automated action should be allowed before execution. This is a controlled simulation, not a live enforcement engine.</p></div>
      <div class="admissibility-panel">
        <div class="admissibility-grid">
          <article class="omega-card admissibility-selector"><div class="card-kicker">Action attempted</div><h3>Select an AI or automated action</h3><p>Each action is evaluated against authority, policy alignment, evidence confidence, runtime context, consequence severity, and human approval requirements.</p><div class="admissibility-actions" id="admissibilityActions"></div></article>
          <article class="omega-card admissibility-result" id="admissibilityResult"></article>
        </div>
        <div class="admissibility-grid" style="margin-top:16px"><article class="omega-card evaluation-matrix" id="evaluationMatrix"></article><article class="omega-card evidence-object" id="evidenceObject"></article></div>
        <article class="omega-card" id="proofComparison" style="margin-top:16px"></article>
      </div>`;
    main.insertBefore(section, reports || null);
  }

  function bindEvents(){
    document.addEventListener("click", event => {
      const actionButton = event.target.closest("[data-admissibility-action]");
      if(actionButton){ activeAction = actionButton.dataset.admissibilityAction; render(); openAdvisorForDecision(); }
      const saveButton = event.target.closest("#saveDecisionBtn");
      if(saveButton){ saveCurrentDecision(); }
      const reportButton = event.target.closest("#openDecisionRecordBtn");
      if(reportButton){ openDecisionRecordReport(); }
    });
  }

  function getState(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch{ return {}; } }
  function getProfile(){
    const state = getState();
    return state.profile || { firstName:"Executive", orgName:"Your Organization", primaryRole:"CEO / President", activeRole:"CEO / President", decisionAuthority:"executive", reportingAudience:"executive", industry:"professional", evidence:"medium", artifactState:"partial", coordination:"developing", workflow:"partial", aiPosture:"approved", valueRange:"mid", owner:"COO" };
  }
  function activeRole(profile){ return profile.activeRole || profile.primaryRole || "CEO / President"; }

  function render(){
    renderActionSelector();
    const evaluation = evaluateAction(ACTIONS[activeAction], getProfile());
    window.cyberShieldLastAdmissibility = evaluation;
    renderDecision(evaluation); renderMatrix(evaluation); renderEvidence(evaluation); renderProof(evaluation); highlightTrustPath(evaluation); renderBuildDetails();
  }

  function renderActionSelector(){
    const container = $("#admissibilityActions"); if(!container) return;
    container.innerHTML = Object.entries(ACTIONS).map(([id, action]) => `<button class="admissibility-action ${id === activeAction ? "active" : ""}" data-admissibility-action="${id}"><strong>${action.title}</strong><span>${action.actor} to ${action.system}</span></button>`).join("");
  }

  function evaluateAction(action, profile){
    const evidenceDelta = { low:-18, medium:0, high:12 }[profile.evidence] ?? 0;
    const artifactDelta = { unknown:-10, missing:-20, partial:-8, exists:10 }[profile.artifactState] ?? 0;
    const coordinationDelta = { reactive:-14, developing:0, managed:8, resilient:14 }[profile.coordination] ?? 0;
    const workflowDelta = { informal:-16, partial:-5, defined:8, measured:14 }[profile.workflow] ?? 0;
    const aiDelta = { none:-6, shadow:-20, approved:4, governed:14 }[profile.aiPosture] ?? 0;
    const authorityDelta = { executive:12, shared:4, recommend:-8, oversight:-12 }[profile.decisionAuthority] ?? 0;
    const authority = clamp(action.baseline.authority + authorityDelta + roleAuthorityDelta(activeRole(profile), action.owner),0,100);
    const policy = clamp(action.baseline.policy + aiDelta + coordinationDelta,0,100);
    const evidence = clamp(action.baseline.evidence + evidenceDelta + artifactDelta,0,100);
    const context = clamp(action.baseline.context + workflowDelta + coordinationDelta,0,100);
    const consequence = clamp(action.baseline.consequence,0,100);
    const human = clamp(action.baseline.human + authorityDelta + coordinationDelta,0,100);
    const trustScore = Math.round((authority*.18)+(policy*.18)+(evidence*.22)+(context*.16)+(human*.16)+((100-consequence)*.1));
    const minControl = Math.min(authority, policy, evidence, context, human);
    let outcome="Allow with constraints", className="outcome-constraint", rationale="Action may proceed only inside a constrained scope with evidence capture and human review.";
    if(consequence>=90 && (authority<55 || evidence<55 || context<50)){ outcome="Block"; className="outcome-block"; rationale="High-consequence action is not operationally admissible because authority, evidence, or context is below tolerance."; }
    else if(evidence<45){ outcome="Require more evidence"; className="outcome-evidence"; rationale="CyberShield cannot support execution because the evidence substrate is too weak to defend the decision."; }
    else if(trustScore<55 || minControl<48){ outcome="Escalate"; className="outcome-escalate"; rationale="Execution requires human escalation because the trust score or a control dimension is below tolerance."; }
    else if(trustScore>=78 && consequence<80 && minControl>=68){ outcome="Allow"; className="outcome-allow"; rationale="Action is operationally admissible because authority, policy, evidence, context, and human accountability are aligned."; }
    const evidenceId = `CS-EVID-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${activeAction.toUpperCase()}-${String(trustScore).padStart(3,"0")}`;
    return { action, profile, role:activeRole(profile), authority, policy, evidence, context, consequence, human, trustScore, minControl, outcome, className, rationale, evidenceId, timestamp:new Date().toLocaleString() };
  }

  function roleAuthorityDelta(role, owner){ if(role===owner) return 12; if(role==="CEO / President") return 8; if(role==="Board / Advisor") return -4; if(role==="CISO / vCISO" && ["CIO / CTO","General Counsel"].includes(owner)) return 4; return 0; }

  function renderDecision(e){
    const container=$("#admissibilityResult"); if(!container) return;
    container.innerHTML=`<div class="card-kicker">Operational admissibility decision</div><h3>${e.action.title}</h3><p>${e.action.summary}</p><div class="admissibility-outcome"><div><strong>Decision</strong><p>${e.rationale}</p></div><span class="outcome-badge ${e.className}">${e.outcome}</span></div><div class="decision-record-grid"><div><strong>Trust Score</strong>${e.trustScore}%</div><div><strong>Decision Owner</strong>${e.action.owner}</div><div><strong>Selected Lens</strong>${e.role}</div><div><strong>Consequence</strong>${e.consequence}%</div><div><strong>Policy</strong>${e.action.policy}</div><div><strong>Framework</strong>${e.action.framework}</div></div><div class="admissibility-trust-path">${e.action.path.map(item=>`<span class="trust-path-chip">${item}</span>`).join("")}</div><div class="decision-save-row"><button class="primary-action" id="saveDecisionBtn">Save Decision to Memory</button><button class="secondary-action" id="openDecisionRecordBtn" data-view-jump="reports">Open Decision Record</button></div>`;
  }

  function renderMatrix(e){
    const container=$("#evaluationMatrix"); if(!container) return;
    const items=[["Authority",e.authority,"Does this actor have authority to initiate this action?"],["Policy Alignment",e.policy,"Does the action align with approved policy boundaries?"],["Evidence Confidence",e.evidence,"Can the organization defend the decision with evidence?"],["Runtime Context",e.context,"Is the current operating context stable enough?"],["Consequence Severity",e.consequence,"How severe is the downside if this action is wrong?"],["Human Accountability",e.human,"Is there a named human decision path?"]];
    container.innerHTML=`<div class="card-kicker">Evaluation criteria</div><h3>Decision Intelligence Layer</h3><p>CyberShield evaluates the action before execution. Higher scores improve admissibility except consequence severity, where higher values increase caution.</p><div class="evaluation-grid">${items.map(([name,score,desc])=>`<div class="evaluation-item"><strong>${name}<b>${score}%</b></strong><span>${desc}</span></div>`).join("")}</div>`;
  }

  function renderEvidence(e){
    const container=$("#evidenceObject"); if(!container) return;
    container.innerHTML=`<div class="card-kicker">Evidence substrate preview</div><h3>Executive Decision Record</h3><p>This is the audit-defensible decision object CyberShield would preserve for review.</p><pre class="evidence-code">${escapeHtml(JSON.stringify(evidenceObject(e),null,2))}</pre>`;
  }

  function evidenceObject(e){
    return { evidence_id:e.evidenceId, decision_type:"runtime_admissibility_simulation", outcome:e.outcome, trust_score:e.trustScore, action_attempted:e.action.title, ai_actor:e.action.actor, target_system:e.action.system, executive_lens:e.role, decision_owner:e.action.owner, policy_reference:e.action.policy, framework_context:e.action.framework, evidence_confidence:`${e.evidence}%`, operational_context:`${e.context}%`, consequence_severity:`${e.consequence}%`, rationale:e.rationale, recommendation_trace:`Authority ${e.authority}%, policy ${e.policy}%, evidence ${e.evidence}%, context ${e.context}%, consequence ${e.consequence}%, human accountability ${e.human}%.`, next_action:nextAction(e), advisory_note:"Simulation output only. Validate against actual policies, telemetry, contracts, and human approvals before operational use." };
  }

  function renderProof(e){
    const container=$("#proofComparison"); if(!container) return;
    container.innerHTML=`<div class="card-kicker">With / Without CyberShield</div><h3>Proof of control before consequence</h3><p>This is the conversion proof: the same action behaves differently when it passes through admissibility governance before execution.</p><div class="proof-grid"><div class="proof-card without"><strong>Without CyberShield</strong><p>${e.action.without}</p></div><div class="proof-card with"><strong>With CyberShield</strong><p>${e.action.with}</p></div></div>`;
  }

  function highlightTrustPath(e){
    $$(".trust-node").forEach(node=>node.classList.remove("phase3-active"));
    (e.action.nodes||[]).forEach(id=>{ const d = {exec:"Executive Authority",advisor:"Executive Advisor Layer",workflow:"Critical Workflows",identity:"Identity Boundary",vendor:"Vendor Access",ai:"AI Use",evidence:"Evidence Substrate"}[id]; $$(".trust-node").forEach(node=>{ if(node.textContent.includes(d)) node.classList.add("phase3-active"); }); });
  }

  function saveCurrentDecision(){
    const e=window.cyberShieldLastAdmissibility || evaluateAction(ACTIONS[activeAction],getProfile());
    const saved=loadDecisions();
    saved.unshift({ id:e.evidenceId, time:e.timestamp, action:e.action.title, outcome:e.outcome, trust:e.trustScore, owner:e.action.owner, next:nextAction(e), role:e.role });
    localStorage.setItem(DECISION_KEY, JSON.stringify(saved.slice(0,8)));
    injectMemoryDecisions();
    openAdvisorText("Decision saved",`Saved ${e.outcome} decision for ${e.action.title}.`,`This gives governance memory a reusable decision record, not a loose log.`,nextAction(e),`Evidence ID ${e.evidenceId}. Trust score ${e.trustScore}%. Owner ${e.action.owner}.`);
  }

  function injectMemoryDecisions(){
    const memoryPanel=$('[data-view-panel="memory"]'); if(!memoryPanel) return;
    let card=$("#admissibilityMemory",memoryPanel);
    if(!card){ card=document.createElement("article"); card.id="admissibilityMemory"; card.className="omega-card"; memoryPanel.insertBefore(card, memoryPanel.querySelector(".form-actions")); }
    const decisions=loadDecisions();
    card.innerHTML=`<div class="card-kicker">Admissibility decision memory</div><h3>Saved Executive Decision Records</h3><p>These are locally stored simulated decisions that show governance memory moving beyond simple logs.</p><div class="memory-decision-list">${decisions.length?decisions.map(d=>`<div class="memory-decision"><strong>${d.outcome} · ${d.action}</strong><span>${d.time} · ${d.role} · Owner: ${d.owner} · Trust: ${d.trust}%</span><span>${d.next}</span></div>`).join(""):`<div class="memory-decision"><strong>No admissibility decisions saved yet</strong><span>Open Admissibility and save a decision to create the first Executive Decision Record.</span></div>`}</div>`;
  }

  function loadDecisions(){ try{return JSON.parse(localStorage.getItem(DECISION_KEY)) || [];}catch{return [];} }

  function openDecisionRecordReport(){
    const e=window.cyberShieldLastAdmissibility || evaluateAction(ACTIONS[activeAction],getProfile());
    const preview=$("#reportPreview"); if(preview){ preview.innerHTML=`<div class="card-kicker">Executive Decision Record</div><h3>${e.action.title}</h3><p><strong>Decision:</strong> ${e.outcome}</p><div class="report-section"><strong>Decision Rationale</strong><p>${e.rationale}</p></div><div class="report-section"><strong>Recommendation Trace</strong><p>Authority ${e.authority}%, policy ${e.policy}%, evidence ${e.evidence}%, context ${e.context}%, consequence ${e.consequence}%, human accountability ${e.human}%, trust score ${e.trustScore}%.</p></div><div class="report-section"><strong>Executive Owner</strong><p>${e.action.owner} · ${e.role}</p></div><div class="report-section"><strong>Next Action</strong><p>${nextAction(e)}</p></div><div class="report-section"><strong>Evidence Object</strong><pre>${escapeHtml(JSON.stringify(evidenceObject(e),null,2))}</pre></div>`; }
    showView("reports");
  }

  function showView(view){
    $$(".nav-item").forEach(btn=>btn.classList.toggle("active",btn.dataset.view===view));
    $$(".view-panel").forEach(panel=>panel.classList.toggle("active",panel.dataset.viewPanel===view));
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function openAdvisorForDecision(){
    const e=evaluateAction(ACTIONS[activeAction],getProfile());
    openAdvisorText(e.outcome,e.rationale,`This matters because ${e.action.consequence}. CyberShield is evaluating the action before execution, not after consequence.`,nextAction(e),`Recommendation trace: authority ${e.authority}%, policy ${e.policy}%, evidence ${e.evidence}%, context ${e.context}%, consequence ${e.consequence}%, human accountability ${e.human}%, trust score ${e.trustScore}%.`);
  }

  function openAdvisorText(title,meaning,why,action,trace){
    const drawer=$("#advisorDrawer"); if(!drawer) return;
    $("#drawerKicker").textContent="Runtime Governance Engine"; $("#drawerTitle").textContent=title; $("#drawerMeaning").textContent=meaning; $("#drawerWhy").textContent=why; $("#drawerAction").textContent=action; $("#drawerTrace").textContent=trace; $("#drawerMjc").textContent="MJC can validate the policy boundary, evidence source, approval path, and executive decision record before this pattern is operationalized."; drawer.classList.add("open");
  }

  function nextAction(e){ if(e.outcome==="Allow") return "Allow execution and preserve the Executive Decision Record."; if(e.outcome==="Block") return `Block execution and route to ${e.action.owner} for out-of-band verification.`; if(e.outcome==="Escalate") return `Escalate to ${e.action.owner} with evidence requirements before execution.`; if(e.outcome==="Require more evidence") return "Pause execution until the missing evidence is validated and attached to the decision record."; return `Allow only within constrained scope, with ${e.action.owner} review and evidence capture.`; }
  function renderBuildDetails(){ const build=$("#buildDetails"); if(build) build.textContent=`${INTERNAL_BUILD}. Visible product name remains CyberShield Executive OS. Normal users do not need version details; this exists for continuity and handoff only.`; }
  function clamp(value,min,max){ return Math.max(min,Math.min(max,value)); }
  function escapeHtml(value){ return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[char])); }
  document.addEventListener("DOMContentLoaded", init);
})();
