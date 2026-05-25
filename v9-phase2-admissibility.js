(() => {
  "use strict";

  const INTERNAL_BUILD = "CyberShield V9 Phase 2";
  const STORAGE_KEY = "cybershield_executive_os_state";
  const ACTIONS = {
    data: {
      title: "AI requests sensitive client data export",
      summary: "An approved AI assistant attempts to export regulated client data for analysis outside the documented workflow.",
      actor: "AI Analytics Assistant",
      system: "Client Data Repository",
      consequence: "Regulatory, privacy, client trust, and contractual exposure",
      baseline: { authority: 58, policy: 54, evidence: 48, context: 62, consequence: 88, human: 72 },
      path: ["Executive Authority", "Executive Advisor Layer", "AI Use", "Evidence Substrate", "Client Data Repository"],
      owner: "General Counsel",
      policy: "Data handling and AI use boundary",
      framework: "HIPAA / SOC 2 / contractual privacy obligations"
    },
    payment: {
      title: "AI-assisted workflow attempts vendor payment approval",
      summary: "A finance workflow uses AI-generated invoice matching to approve a non-routine vendor payment above threshold.",
      actor: "Finance Workflow Agent",
      system: "Payment Approval Queue",
      consequence: "Fraud, financial loss, vendor trust, and approval-chain integrity",
      baseline: { authority: 66, policy: 60, evidence: 56, context: 58, consequence: 84, human: 68 },
      path: ["Executive Authority", "CFO Decision Lens", "Vendor Access", "Payment Workflow", "Evidence Substrate"],
      owner: "CFO",
      policy: "Payment approval and vendor verification policy",
      framework: "SOC 2 / financial controls / cyber insurance evidence"
    },
    access: {
      title: "Automation attempts privileged access change",
      summary: "An automation requests temporary administrative access after an anomalous executive identity event.",
      actor: "Identity Automation",
      system: "Privileged Access Manager",
      consequence: "Privilege escalation, identity compromise, and operational control failure",
      baseline: { authority: 46, policy: 64, evidence: 52, context: 42, consequence: 94, human: 82 },
      path: ["Executive Authority", "Identity Boundary", "Privileged Access", "Evidence Substrate"],
      owner: "CIO / CTO",
      policy: "Privileged access and executive identity verification",
      framework: "NIST / CIS / CMMC access control alignment"
    },
    external: {
      title: "AI drafts external regulated communication",
      summary: "An AI assistant prepares customer-facing incident language using incomplete evidence from an unresolved event.",
      actor: "Communications Assistant",
      system: "External Communications Draft",
      consequence: "Reputational, legal, regulatory, and customer trust exposure",
      baseline: { authority: 62, policy: 58, evidence: 38, context: 64, consequence: 78, human: 76 },
      path: ["Executive Authority", "General Counsel", "AI Use", "Board Outputs", "Evidence Substrate"],
      owner: "General Counsel",
      policy: "External communications and incident disclosure review",
      framework: "Regulatory reporting / legal review / customer notification"
    },
    recovery: {
      title: "AI recommends recovery sequence during disruption",
      summary: "An AI operations assistant recommends restoring systems based on stale backup evidence and partial dependency data.",
      actor: "Operations Recovery Assistant",
      system: "Recovery Runbook",
      consequence: "Business interruption, failed recovery, and workflow dependency failure",
      baseline: { authority: 70, policy: 66, evidence: 44, context: 50, consequence: 86, human: 70 },
      path: ["Executive Authority", "COO Workflow View", "Critical Workflows", "Recovery Evidence", "Evidence Substrate"],
      owner: "COO",
      policy: "Business continuity and recovery validation",
      framework: "Operational resilience / incident response / business continuity"
    }
  };

  let activeAction = "data";

  function $(selector, root = document){ return root.querySelector(selector); }
  function $$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }

  function init(){
    injectNavigation();
    injectPanel();
    bindEvents();
    render();
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
      <div class="section-head operational-only">
        <span class="boundary-chip live">Runtime Governance Engine</span>
        <h2>Runtime Admissibility Simulator</h2>
        <p>CyberShield evaluates whether an AI-assisted or automated action should be allowed before execution. This is a controlled simulation, not a live enforcement engine.</p>
      </div>
      <div class="admissibility-panel">
        <div class="admissibility-grid">
          <article class="omega-card admissibility-selector">
            <div class="card-kicker">Action attempted</div>
            <h3>Select an AI or automated action</h3>
            <p>Each action is evaluated against authority, policy alignment, evidence confidence, runtime context, consequence severity, and human approval requirements.</p>
            <div class="admissibility-actions" id="admissibilityActions"></div>
          </article>
          <article class="omega-card admissibility-result" id="admissibilityResult"></article>
        </div>
        <div class="admissibility-grid" style="margin-top:16px">
          <article class="omega-card evaluation-matrix" id="evaluationMatrix"></article>
          <article class="omega-card evidence-object" id="evidenceObject"></article>
        </div>
      </div>`;

    main.insertBefore(section, reports || null);
  }

  function bindEvents(){
    document.addEventListener("click", event => {
      const actionButton = event.target.closest("[data-admissibility-action]");
      if(actionButton){
        activeAction = actionButton.dataset.admissibilityAction;
        render();
        openAdvisorForDecision();
      }
    });
  }

  function getState(){
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch{ return {}; }
  }

  function getProfile(){
    const state = getState();
    return state.profile || {
      firstName: "Executive",
      orgName: "Your Organization",
      primaryRole: "CEO / President",
      activeRole: "CEO / President",
      decisionAuthority: "executive",
      reportingAudience: "executive",
      industry: "professional",
      evidence: "medium",
      artifactState: "partial",
      coordination: "developing",
      workflow: "partial",
      aiPosture: "approved",
      valueRange: "mid",
      owner: "COO"
    };
  }

  function activeRole(profile){ return profile.activeRole || profile.primaryRole || "CEO / President"; }

  function render(){
    renderActionSelector();
    const evaluation = evaluateAction(ACTIONS[activeAction], getProfile());
    renderDecision(evaluation);
    renderMatrix(evaluation);
    renderEvidence(evaluation);
    renderBuildDetails();
  }

  function renderActionSelector(){
    const container = $("#admissibilityActions");
    if(!container) return;
    container.innerHTML = Object.entries(ACTIONS).map(([id, action]) => `
      <button class="admissibility-action ${id === activeAction ? "active" : ""}" data-admissibility-action="${id}">
        <strong>${action.title}</strong>
        <span>${action.actor} → ${action.system}</span>
      </button>`).join("");
  }

  function evaluateAction(action, profile){
    const evidenceDelta = { low:-18, medium:0, high:12 }[profile.evidence] ?? 0;
    const artifactDelta = { unknown:-10, missing:-20, partial:-8, exists:10 }[profile.artifactState] ?? 0;
    const coordinationDelta = { reactive:-14, developing:0, managed:8, resilient:14 }[profile.coordination] ?? 0;
    const workflowDelta = { informal:-16, partial:-5, defined:8, measured:14 }[profile.workflow] ?? 0;
    const aiDelta = { none:-6, shadow:-20, approved:4, governed:14 }[profile.aiPosture] ?? 0;
    const authorityDelta = { executive:12, shared:4, recommend:-8, oversight:-12 }[profile.decisionAuthority] ?? 0;

    const authority = clamp(action.baseline.authority + authorityDelta + roleAuthorityDelta(activeRole(profile), action.owner), 0, 100);
    const policy = clamp(action.baseline.policy + aiDelta + coordinationDelta, 0, 100);
    const evidence = clamp(action.baseline.evidence + evidenceDelta + artifactDelta, 0, 100);
    const context = clamp(action.baseline.context + workflowDelta + coordinationDelta, 0, 100);
    const consequence = clamp(action.baseline.consequence, 0, 100);
    const human = clamp(action.baseline.human + authorityDelta + coordinationDelta, 0, 100);

    const trustScore = Math.round((authority * .18) + (policy * .18) + (evidence * .22) + (context * .16) + (human * .16) + ((100 - consequence) * .1));
    const minControl = Math.min(authority, policy, evidence, context, human);

    let outcome = "Allow with constraints";
    let className = "outcome-constraint";
    let rationale = "Action may proceed only inside a constrained scope with evidence capture and human review.";

    if(consequence >= 90 && (authority < 55 || evidence < 55 || context < 50)){
      outcome = "Block";
      className = "outcome-block";
      rationale = "High-consequence action is not operationally admissible because authority, evidence, or context is below tolerance.";
    }else if(evidence < 45){
      outcome = "Require more evidence";
      className = "outcome-evidence";
      rationale = "CyberShield cannot support execution because the evidence substrate is too weak to defend the decision.";
    }else if(trustScore < 55 || minControl < 48){
      outcome = "Escalate";
      className = "outcome-escalate";
      rationale = "Execution requires human escalation because the trust score or a control dimension is below tolerance.";
    }else if(trustScore >= 78 && consequence < 80 && minControl >= 68){
      outcome = "Allow";
      className = "outcome-allow";
      rationale = "Action is operationally admissible because authority, policy, evidence, context, and human accountability are aligned.";
    }

    const evidenceId = `CS-EVID-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${activeAction.toUpperCase()}-${String(trustScore).padStart(3,"0")}`;

    return { action, profile, role:activeRole(profile), authority, policy, evidence, context, consequence, human, trustScore, minControl, outcome, className, rationale, evidenceId };
  }

  function roleAuthorityDelta(role, owner){
    if(role === owner) return 12;
    if(role === "CEO / President") return 8;
    if(role === "Board / Advisor") return -4;
    if(role === "CISO / vCISO" && ["CIO / CTO", "General Counsel"].includes(owner)) return 4;
    return 0;
  }

  function renderDecision(e){
    const container = $("#admissibilityResult");
    if(!container) return;
    container.innerHTML = `
      <div class="card-kicker">Operational admissibility decision</div>
      <h3>${e.action.title}</h3>
      <p>${e.action.summary}</p>
      <div class="admissibility-outcome">
        <div>
          <strong>Decision</strong>
          <p>${e.rationale}</p>
        </div>
        <span class="outcome-badge ${e.className}">${e.outcome}</span>
      </div>
      <div class="decision-record-grid">
        <div><strong>Trust Score</strong>${e.trustScore}%</div>
        <div><strong>Decision Owner</strong>${e.action.owner}</div>
        <div><strong>Selected Lens</strong>${e.role}</div>
        <div><strong>Consequence</strong>${e.consequence}%</div>
        <div><strong>Policy</strong>${e.action.policy}</div>
        <div><strong>Framework</strong>${e.action.framework}</div>
      </div>
      <div class="admissibility-trust-path">${e.action.path.map(item => `<span class="trust-path-chip">${item}</span>`).join("")}</div>`;
  }

  function renderMatrix(e){
    const container = $("#evaluationMatrix");
    if(!container) return;
    const items = [
      ["Authority", e.authority, "Does this actor have authority to initiate this action?"],
      ["Policy Alignment", e.policy, "Does the action align with approved policy boundaries?"],
      ["Evidence Confidence", e.evidence, "Can the organization defend the decision with evidence?"],
      ["Runtime Context", e.context, "Is the current operating context stable enough?"],
      ["Consequence Severity", e.consequence, "How severe is the downside if this action is wrong?"],
      ["Human Accountability", e.human, "Is there a named human decision path?"],
    ];
    container.innerHTML = `<div class="card-kicker">Evaluation criteria</div><h3>Decision Intelligence Layer</h3><p>CyberShield evaluates the action before execution. Higher scores improve admissibility except consequence severity, where higher values increase caution.</p><div class="evaluation-grid">${items.map(([name, score, desc]) => `<div class="evaluation-item"><strong>${name}<b>${score}%</b></strong><span>${desc}</span></div>`).join("")}</div>`;
  }

  function renderEvidence(e){
    const container = $("#evidenceObject");
    if(!container) return;
    const evidence = {
      evidence_id: e.evidenceId,
      decision_type: "runtime_admissibility_simulation",
      outcome: e.outcome,
      trust_score: e.trustScore,
      action_attempted: e.action.title,
      ai_actor: e.action.actor,
      target_system: e.action.system,
      executive_lens: e.role,
      decision_owner: e.action.owner,
      policy_reference: e.action.policy,
      framework_context: e.action.framework,
      evidence_confidence: `${e.evidence}%`,
      operational_context: `${e.context}%`,
      consequence_severity: `${e.consequence}%`,
      rationale: e.rationale,
      recommendation_trace: `Authority ${e.authority}%, policy ${e.policy}%, evidence ${e.evidence}%, context ${e.context}%, consequence ${e.consequence}%, human accountability ${e.human}%.`,
      next_action: nextAction(e),
      advisory_note: "Simulation output only. Validate against actual policies, telemetry, contracts, and human approvals before operational use."
    };
    container.innerHTML = `<div class="card-kicker">Evidence substrate preview</div><h3>Executive Decision Record</h3><p>This is the audit-defensible decision object CyberShield would preserve for review.</p><pre class="evidence-code">${escapeHtml(JSON.stringify(evidence, null, 2))}</pre>`;
  }

  function openAdvisorForDecision(){
    const e = evaluateAction(ACTIONS[activeAction], getProfile());
    const drawer = $("#advisorDrawer");
    if(!drawer) return;
    $("#drawerKicker").textContent = "Runtime Governance Engine";
    $("#drawerTitle").textContent = e.outcome;
    $("#drawerMeaning").textContent = e.rationale;
    $("#drawerWhy").textContent = `This matters because ${e.action.consequence}. CyberShield is evaluating the action before execution, not after consequence.`;
    $("#drawerAction").textContent = nextAction(e);
    $("#drawerTrace").textContent = `Recommendation trace: authority ${e.authority}%, policy ${e.policy}%, evidence ${e.evidence}%, context ${e.context}%, consequence ${e.consequence}%, human accountability ${e.human}%, trust score ${e.trustScore}%.`;
    $("#drawerMjc").textContent = "MJC can validate the policy boundary, evidence source, approval path, and executive decision record before this pattern is operationalized.";
    drawer.classList.add("open");
  }

  function nextAction(e){
    if(e.outcome === "Allow") return "Allow execution and preserve the Executive Decision Record.";
    if(e.outcome === "Block") return `Block execution and route to ${e.action.owner} for out-of-band verification.`;
    if(e.outcome === "Escalate") return `Escalate to ${e.action.owner} with evidence requirements before execution.`;
    if(e.outcome === "Require more evidence") return "Pause execution until the missing evidence is validated and attached to the decision record.";
    return `Allow only within constrained scope, with ${e.action.owner} review and evidence capture.`;
  }

  function renderBuildDetails(){
    const build = $("#buildDetails");
    if(build) build.textContent = `${INTERNAL_BUILD}. Visible product name remains CyberShield Executive OS. Normal users do not need version details; this exists for continuity and handoff only.`;
  }

  function clamp(value, min, max){ return Math.max(min, Math.min(max, value)); }
  function escapeHtml(value){
    return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[char]));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
