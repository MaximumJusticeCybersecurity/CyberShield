(() => {
  const VERSION = "CyberShield OS v7.1";
  const STORAGE_KEY = "cybershield_os_v7_1_state";
  const MEMORY_KEY = "cybershield_os_v7_1_memory";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const defaultProfile = {
    firstName: "Executive",
    orgName: "Demonstration Organization",
    industry: "Manufacturing",
    reviewGoal: "incident",
    valueRange: "mid",
    evidence: "medium",
    owner: "COO",
    coordination: "developing",
    demo: true
  };

  const scenarios = {
    phishing: {
      title: "AI-enabled executive phishing against finance leadership",
      rawSignal: "Suspicious inbox rule and credential challenge activity detected for finance leadership.",
      narrative: "Potential AI-enabled executive impersonation campaign targeting finance approval workflows with elevated payment diversion risk.",
      confidence: "Moderate",
      escalation: "Elevated",
      owner: "CFO",
      timeline: [
        ["9:02 AM", "Executive mailbox receives highly personalized vendor-payment request."],
        ["9:41 AM", "Conditional access challenge triggered from unfamiliar region."],
        ["10:18 AM", "Inbox forwarding rule created and deleted within eight minutes."],
        ["11:06 AM", "Finance approval workflow flagged for executive validation."],
        ["12:14 PM", "Escalation threshold reached: payment workflow integrity requires leadership review."]
      ],
      consequences: [
        ["Payment Integrity", "Fraud exposure increases if approval workflow continues without verification."],
        ["Executive Trust", "Leadership confidence degrades when impersonation cannot be quickly bounded."],
        ["Vendor Coordination", "Vendor payment delays may occur during verification and containment."],
        ["Legal / Compliance", "Evidence preservation may be needed if payment diversion is confirmed."]
      ],
      decisions: ["Pause high-risk payment approvals", "Validate executive identity controls", "Notify finance and legal owners", "Preserve mailbox and access evidence"]
    },
    vendor: {
      title: "Vendor-origin ransomware staging",
      rawSignal: "Unusual remote access behavior detected through a trusted vendor pathway.",
      narrative: "Potential ransomware staging activity emerging from a vendor access path with finance-adjacent operational disruption potential.",
      confidence: "High",
      escalation: "Critical",
      owner: "COO",
      timeline: [
        ["8:37 AM", "Vendor remote access pattern deviates from normal maintenance window."],
        ["9:12 AM", "Privilege request observed against finance-adjacent system."],
        ["10:03 AM", "Script execution pattern resembles staging behavior."],
        ["10:48 AM", "Backup validation status appears stale for affected function."],
        ["11:25 AM", "Executive escalation recommended before disruption exposure widens."]
      ],
      consequences: [
        ["Recovery Readiness", "Backup validation gaps may extend recovery timelines."],
        ["Vendor Governance", "Third-party access trust is degraded until reassessed."],
        ["Operations", "Finance-adjacent workflows may require continuity planning."],
        ["Board Visibility", "Material vendor exposure may need executive reporting."]
      ],
      decisions: ["Suspend vendor access pending validation", "Validate recoverability", "Assign vendor governance owner", "Prepare executive incident note"]
    },
    shadowai: {
      title: "Shadow AI prompt leakage event",
      rawSignal: "Sensitive client context detected in unsanctioned generative AI workflow.",
      narrative: "Potential trust boundary failure caused by unsanctioned AI usage with sensitive client context exposure.",
      confidence: "Moderate",
      escalation: "Developing",
      owner: "CIO / CTO",
      timeline: [
        ["1:15 PM", "User submits client-context prompt to unsanctioned AI tool."],
        ["1:28 PM", "Policy exception not found for this workflow."],
        ["2:04 PM", "Data sensitivity review indicates potential client confidentiality exposure."],
        ["2:49 PM", "Leadership review recommended for AI governance boundary."],
        ["3:30 PM", "Control update needed: approved tools, training, and escalation path."]
      ],
      consequences: [
        ["Client Trust", "Sensitive context handling may require disclosure analysis."],
        ["AI Governance", "Tool approval boundary is unclear or unenforced."],
        ["Policy Drift", "Employee behavior has outpaced written AI guidance."],
        ["Operational Control", "Leadership lacks real-time visibility into AI workflow risk."]
      ],
      decisions: ["Review data exposure scope", "Clarify sanctioned AI tools", "Assign AI governance owner", "Update executive AI-use policy"]
    }
  };

  const baseIssues = [
    { id:"backup", title:"Backup validation overdue", detail:"Recovery confidence is degraded until critical systems are validated against current operational tolerance.", severity:92, urgency:88, age:28, impact:91, compliance:78, confidence:84, owner:"COO", decision:"Validate recoverability across critical workflows", state:"Escalation pending", type:"critical" },
    { id:"vendor", title:"Vendor governance review incomplete", detail:"Third-party access remains a material trust dependency without recent evidence of review.", severity:84, urgency:76, age:42, impact:82, compliance:86, confidence:78, owner:"CFO", decision:"Complete vendor reassessment cycle", state:"Owner assigned", type:"high" },
    { id:"mfa", title:"MFA enforcement below baseline", detail:"Identity assurance remains below leadership tolerance for privileged and finance-adjacent users.", severity:79, urgency:72, age:17, impact:80, compliance:81, confidence:88, owner:"CIO / CTO", decision:"Close privileged-user MFA gap", state:"In progress", type:"high" },
    { id:"policy", title:"Policy review approaching expiration", detail:"Governance language may no longer reflect current AI and operational risk conditions.", severity:64, urgency:60, age:9, impact:58, compliance:82, confidence:72, owner:"CISO / vCISO", decision:"Refresh policy and confirm ownership", state:"Review scheduled", type:"medium" },
    { id:"ir", title:"IR escalation process untested", detail:"Coordination uncertainty remains elevated until leadership communication paths are exercised.", severity:82, urgency:77, age:63, impact:88, compliance:74, confidence:69, owner:"CEO / President", decision:"Run tabletop escalation test", state:"Unresolved", type:"critical" }
  ];

  const reportTypes = [
    "Executive Risk Summary",
    "Operational Resilience Snapshot",
    "Governance Drift Report",
    "AI Governance Assessment",
    "Vendor Governance Review",
    "Board Briefing",
    "Incident Readiness Summary",
    "Security Roadmap"
  ];

  let state = loadState();
  let activeScenario = "phishing";
  let activeReport = reportTypes[0];

  function loadState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { profile: null }; }
    catch { return { profile: null }; }
  }

  function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

  function getProfile() { return state.profile || defaultProfile; }

  function scoreIssue(issue, profile) {
    const evidencePenalty = profile.evidence === "low" ? 14 : profile.evidence === "medium" ? 7 : 0;
    const coordinationPenalty = profile.coordination === "reactive" ? 10 : profile.coordination === "developing" ? 5 : profile.coordination === "managed" ? -4 : -8;
    const goalBoost = profile.reviewGoal === "incident" && ["backup","ir"].includes(issue.id) ? 10 : profile.reviewGoal === "vendor" && issue.id === "vendor" ? 12 : profile.reviewGoal === "ai" && issue.id === "policy" ? 8 : 0;
    return Math.round((issue.severity * .25) + (issue.urgency * .22) + (issue.impact * .24) + (issue.compliance * .11) + (issue.confidence * .1) + Math.min(issue.age, 60) * .28 + evidencePenalty + coordinationPenalty + goalBoost);
  }

  function rankedIssues() {
    const profile = getProfile();
    return baseIssues.map(issue => ({ ...issue, rankScore: scoreIssue(issue, profile) })).sort((a,b) => b.rankScore - a.rankScore);
  }

  function scoreModel() {
    const profile = getProfile();
    const hasAssessment = Boolean(state.profile);
    if (!hasAssessment) return null;
    const coordinationBase = { reactive: 48, developing: 64, managed: 78, resilient: 88 }[profile.coordination] || 62;
    const evidenceDelta = { low: -11, medium: 0, high: 8 }[profile.evidence] || 0;
    const trust = clamp(coordinationBase + evidenceDelta + (profile.reviewGoal === "resilience" ? 3 : 0), 35, 94);
    const ai = clamp(58 + (profile.reviewGoal === "ai" ? 12 : 0) + (profile.evidence === "high" ? 8 : -4), 34, 92);
    const confidence = clamp(54 + (profile.evidence === "high" ? 24 : profile.evidence === "medium" ? 12 : -6) + (profile.coordination === "resilient" ? 8 : 0), 25, 96);
    const exposure = profile.valueRange === "low" ? "$95K–$410K" : profile.valueRange === "mid" ? "$420K–$1.9M" : profile.valueRange === "high" ? "$1.8M–$7.5M" : "$6.5M–$28M";
    return { trust, ai, confidence, exposure };
  }

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

  function init() {
    bindNavigation();
    bindAssessment();
    bindScenarioControls();
    bindReports();
    bindMemory();
    renderAll();
    showView("briefing");
  }

  function bindNavigation() {
    $("#mobileNavToggle").addEventListener("click", () => {
      const nav = $("#primaryNav");
      const open = nav.classList.toggle("open");
      $("#mobileNavToggle").setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", (event) => {
      const navButton = event.target.closest(".nav-item[data-view]");
      if (navButton) showView(navButton.dataset.view);

      const jumpButton = event.target.closest("[data-view-jump]");
      if (jumpButton) showView(jumpButton.dataset.viewJump);
    });
    $("#drawerClose").addEventListener("click", () => $("#advisorDrawer").classList.remove("open"));
  }

  function showView(view) {
    $$(".nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.view === view));
    $$(".view-panel").forEach(panel => panel.classList.toggle("active", panel.dataset.viewPanel === view));
    $("#primaryNav").classList.remove("open");
    $("#mobileNavToggle").setAttribute("aria-expanded", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function bindAssessment() {
    $("#startAssessmentBtn").addEventListener("click", () => $("#assessmentPanel").classList.remove("hidden"));
    $("#cancelAssessmentBtn").addEventListener("click", () => $("#assessmentPanel").classList.add("hidden"));
    $("#assessmentForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      state.profile = Object.fromEntries(form.entries());
      state.profile.demo = false;
      saveState();
      recordMemory(`Executive assessment generated for ${state.profile.orgName}`);
      $("#assessmentPanel").classList.add("hidden");
      renderAll();
      showView("briefing");
    });
  }

  function renderAll() {
    renderBriefing();
    renderActions();
    renderScenario();
    renderTrustMap();
    renderReports();
    renderMemory();
  }

  function renderBriefing() {
    const profile = getProfile();
    const scenario = scenarios[profile.reviewGoal === "ai" ? "shadowai" : profile.reviewGoal === "vendor" ? "vendor" : "phishing"];
    const scores = scoreModel();
    $("#briefingTitle").textContent = state.profile ? `${profile.orgName} Executive Operational Briefing` : "Executive Operational Briefing";
    $("#briefingSubtitle").textContent = state.profile ? `${profile.firstName}, this briefing uses your submitted inputs to frame operational consequence, ownership, and next action.` : "Submit the assessment to generate a tailored executive briefing. Until then, this screen shows a demonstration environment.";
    $("#whatChanged").textContent = scenario.narrative;
    $("#whyMatter").textContent = `This matters because ${profile.industry.toLowerCase()} leadership needs consequence visibility before cyber uncertainty becomes operational disruption.`;
    $("#escalationLevel").textContent = scenario.escalation;
    $("#evidenceLevel").textContent = state.profile ? `${capitalize(profile.evidence)} evidence maturity` : "Demonstration";
    $("#briefOwner").textContent = normalizeOwner(profile.owner || scenario.owner);
    $("#decisionRequired").textContent = scenario.decisions[0];
    $("#decisionWhy").textContent = `CyberShield compresses fragmented signals into leadership decisions for ${profile.orgName}.`;

    const items = [
      ["What matters now", rankedIssues()[0].title, rankedIssues()[0].detail, "critical"],
      ["Operational consequence", scenario.consequences[0][0], scenario.consequences[0][1], "yellow"],
      ["Decision compression", "From cyber noise to leadership action", "The briefing explains what changed, what it means operationally, and who owns the next decision.", "green"],
      ["Confidence layer", state.profile ? `${scores.confidence}% confidence` : "No score until assessment", state.profile ? "Confidence reflects evidence maturity and coordination state." : "CyberShield suppresses scores during onboarding and demo start states.", "yellow"],
      ["Governance continuity", "Unresolved issues remain visible", "Cyber decisions, accepted risks, and overdue actions remain in organizational memory.", "green"],
      ["Board-ready output", "Leadership artifact available", "Reports convert cyber findings into operational language executives can forward and discuss.", "green"]
    ];
    $("#briefingStack").innerHTML = items.map(itemCard).join("");
    bindDetailClicks();
  }

  function itemCard([kicker, title, body, status]) {
    return `<article class="stack-item detail-trigger" data-title="${escapeHtml(title)}" data-meaning="${escapeHtml(body)}" data-action="Use this item to guide leadership sequencing and governance accountability.">
      <div class="item-head"><h3>${escapeHtml(title)}</h3><span class="pill ${status}">${escapeHtml(kicker)}</span></div>
      <p class="item-body">${escapeHtml(body)}</p>
    </article>`;
  }

  function renderActions() {
    const issues = rankedIssues();
    const top = issues.slice(0, 4);
    $("#priorityStrip").innerHTML = `
      <div class="priority-item"><strong>${issues[0].rankScore}</strong><span>Top action score</span></div>
      <div class="priority-item"><strong>${issues.filter(i => i.rankScore > 90).length}</strong><span>Critical priorities</span></div>
      <div class="priority-item"><strong>${Math.max(...issues.map(i=>i.age))}d</strong><span>Oldest unresolved item</span></div>
      <div class="priority-item"><strong>${state.profile ? "Live" : "Demo"}</strong><span>Operating state</span></div>`;
    $("#actionGrid").innerHTML = issues.map(issue => {
      const cls = issue.rankScore > 95 ? "critical" : issue.rankScore < 78 ? "controlled" : "";
      return `<article class="action-card ${cls} detail-trigger" data-title="${escapeHtml(issue.title)}" data-meaning="${escapeHtml(issue.detail)}" data-action="${escapeHtml(issue.decision)}">
        <div class="item-head"><h3>${escapeHtml(issue.title)}</h3><span class="pill ${cls === "critical" ? "red" : cls === "controlled" ? "green" : "yellow"}">${issue.rankScore}</span></div>
        <p>${escapeHtml(issue.detail)}</p>
        <div class="action-footer">
          <span><b>Decision needed</b><em>${escapeHtml(issue.decision)}</em></span>
          <span><b>Owner</b><em class="owner-text">${escapeHtml(issue.owner)}</em></span>
          <span><b>Governance state</b><em>${escapeHtml(issue.state)}</em></span>
        </div>
      </article>`;
    }).join("");
    bindDetailClicks();
  }

  function bindScenarioControls() {
    $$("[data-scenario]").forEach(btn => btn.addEventListener("click", () => {
      activeScenario = btn.dataset.scenario;
      $$("[data-scenario]").forEach(b => b.classList.toggle("active", b === btn));
      renderScenario();
    }));
  }

  function renderScenario() {
    const scenario = scenarios[activeScenario];
    $("#scenarioTimeline").innerHTML = scenario.timeline.map(([time, event]) => `<div class="time-row"><b>${escapeHtml(time)}</b><span>${escapeHtml(event)}</span></div>`).join("");
    $("#scenarioNarrative").innerHTML = `
      <h3>${escapeHtml(scenario.title)}</h3>
      <div class="translation-box">
        <div class="before"><strong>Raw signal</strong><p>${escapeHtml(scenario.rawSignal)}</p></div>
        <div class="after"><strong>CyberShield executive translation</strong><p>${escapeHtml(scenario.narrative)}</p></div>
      </div>
      <div class="brief-meta">
        <span><strong>Confidence</strong><b>${escapeHtml(scenario.confidence)}</b></span>
        <span><strong>Escalation</strong><b>${escapeHtml(scenario.escalation)}</b></span>
        <span><strong>Owner</strong><b class="owner-text">${escapeHtml(scenario.owner)}</b></span>
      </div>`;
    $("#consequenceGrid").innerHTML = scenario.consequences.map(([title, body]) => `<article class="consequence-card detail-trigger" data-title="${escapeHtml(title)}" data-meaning="${escapeHtml(body)}" data-action="Use this consequence to guide executive sequencing and stakeholder coordination."><div class="card-kicker">Organizational consequence</div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`).join("");
    bindDetailClicks();
  }

  function renderTrustMap() {
    const scores = scoreModel();
    const cards = scores ? [
      ["Operational Trust", scores.trust, "Evidence-aware trust state across ownership, continuity, and governance rhythm."],
      ["AI Governance", scores.ai, "Boundary maturity for AI use, policy control, and sensitive data handling."],
      ["Score Confidence", scores.confidence, "Confidence based on submitted evidence maturity and coordination state."],
      ["Exposure Range", null, `Likely operational exposure range: ${scores.exposure}.`],
      ["Ownership Clarity", Math.min(96, scores.trust + 4), "Executive owner assignment and accountability clarity."],
      ["Continuity Intelligence", Math.min(94, scores.confidence + 2), "Ability to remember unresolved risks and governance progression."],
    ] : [
      ["Operational Trust", null, "No score appears until assessment submission."],
      ["AI Governance", null, "No score appears until assessment submission."],
      ["Score Confidence", null, "No score appears until assessment submission."],
      ["Exposure Range", null, "No dollar exposure appears until assessment submission."]
    ];
    $("#trustGrid").innerHTML = cards.map(([title, score, body]) => `<article class="trust-card detail-trigger" data-title="${escapeHtml(title)}" data-meaning="${escapeHtml(body)}" data-action="Use this trust domain to focus governance review.">
      <div class="card-kicker">Omega Trust Domain</div><h3>${escapeHtml(title)}</h3>
      ${score === null ? `<p>${escapeHtml(body)}</p>` : `<div class="score-value">${score}%</div><div class="trust-meter"><span class="trust-dot" style="left:${score}%"></span></div><p>${escapeHtml(body)}</p>`}
    </article>`).join("");
    bindDetailClicks();
  }

  function bindReports() {
    $("#downloadReportBtn").addEventListener("click", downloadReport);
    $("#emailReportBtn").addEventListener("click", emailReport);
    $("#printReportBtn").addEventListener("click", () => window.print());
  }

  function renderReports() {
    $("#reportTabs").innerHTML = reportTypes.map(type => `<button class="report-tab ${type === activeReport ? "active" : ""}" data-report="${escapeHtml(type)}">${escapeHtml(type)}</button>`).join("");
    $$(".report-tab").forEach(btn => btn.addEventListener("click", () => { activeReport = btn.dataset.report; renderReports(); }));
    $("#reportPreview").innerHTML = buildReportHtml(activeReport);
  }

  function buildReportHtml(type) {
    const profile = getProfile();
    const scores = scoreModel();
    const issues = rankedIssues();
    const top = issues.slice(0,3);
    const scenario = scenarios[activeScenario];
    const risk = scores ? (scores.trust >= 80 ? "Managed" : scores.trust >= 65 ? "Moderate" : "Elevated") : "Demonstration";
    const scoreLine = scores ? `Operational Trust ${scores.trust}% | AI Governance ${scores.ai}% | Confidence ${scores.confidence}% | Exposure ${scores.exposure}` : "Complete assessment for tailored scoring.";
    const header = (label, purpose) => `<h2>${escapeHtml(profile.orgName)} — ${escapeHtml(label)}</h2>
      <p><strong>Prepared by:</strong> Maximum Justice Cybersecurity | <strong>Platform:</strong> ${VERSION}</p>
      <p><strong>Doctrine:</strong> Omega Trust Architecture. Trust is operational infrastructure.</p>
      <p><strong>Purpose:</strong> ${escapeHtml(purpose)}</p>`;
    const limitations = `<h3>Assumptions and Limitations</h3><p>This static demonstration uses submitted executive inputs and simulated scenario logic. It does not claim verified telemetry, autonomous decision-making, or production integrations.</p>`;

    const templates = {
      "Executive Risk Summary": () => `${header(type, "Give leadership a concise view of current organizational cyber risk, priority decisions, and exposure.")}
        <h3>Current Organizational Risk</h3><p>${escapeHtml(risk)} | ${scoreLine}</p>
        <h3>Top Executive Risks</h3><ul>${top.map(i => `<li><strong>${escapeHtml(i.title)}:</strong> ${escapeHtml(i.detail)}</li>`).join("")}</ul>
        <h3>Decision Required This Week</h3><ol>${top.map(i => `<li>${escapeHtml(i.decision)} — Owner: ${escapeHtml(i.owner)}</li>`).join("")}</ol>
        <h3>Executive Interpretation</h3><p>CyberShield recommends focusing leadership attention on the highest ranked unresolved items before they become operational disruption, board concern, or avoidable recovery delay.</p>${limitations}`,

      "Operational Resilience Snapshot": () => `${header(type, "Show whether the organization can absorb disruption, coordinate response, and recover inside leadership tolerance.")}
        <h3>Resilience Posture</h3><p>${scores ? (scores.trust >= 78 ? "Improving and managed" : "Developing with material continuity gaps") : "Demonstration snapshot"}</p>
        <h3>Continuity Pressure Points</h3><ul>
          <li><strong>Recovery readiness:</strong> ${escapeHtml(issues.find(i=>i.id==="backup").detail)}</li>
          <li><strong>Escalation readiness:</strong> ${escapeHtml(issues.find(i=>i.id==="ir").detail)}</li>
          <li><strong>Governance rhythm:</strong> ${Math.max(...issues.map(i=>i.age))} days is the oldest unresolved governance item.</li>
        </ul>
        <h3>Resilience Actions</h3><ol><li>Validate recovery procedures</li><li>Run executive escalation tabletop</li><li>Confirm continuity owners for finance, operations, and vendor functions</li></ol>
        <h3>Trend</h3><p>${state.profile ? "Operational resilience improves when ownership, evidence, and briefing cadence remain current." : "Submit assessment to establish tailored trend."}</p>${limitations}`,

      "Governance Drift Report": () => `${header(type, "Identify where cyber governance is aging, ownership is unclear, or evidence is becoming stale.")}
        <h3>Drift Indicators</h3><ul>${issues.filter(i=>i.age>=17).map(i => `<li><strong>${escapeHtml(i.title)}:</strong> unresolved for ${i.age} days | state: ${escapeHtml(i.state)}</li>`).join("")}</ul>
        <h3>Ownership Gaps</h3><p>Governance drift is most likely where owner accountability is assigned but evidence validation is delayed.</p>
        <h3>Corrective Sequence</h3><ol><li>Confirm owners</li><li>Refresh evidence</li><li>Close stale policy or control reviews</li><li>Record executive acceptance or remediation decision</li></ol>
        <h3>Doctrine Check</h3><p>Security without ownership becomes theater. This report turns ownership drift into an executive management issue.</p>${limitations}`,

      "AI Governance Assessment": () => `${header(type, "Assess AI boundary risk, unsanctioned usage, sensitive data exposure, and executive control maturity.")}
        <h3>AI Governance State</h3><p>${scores ? `AI Governance ${scores.ai}% | Confidence ${scores.confidence}%` : "Demonstration AI governance posture"}</p>
        <h3>AI Exposure Scenario</h3><p>${escapeHtml(scenarios.shadowai.narrative)}</p>
        <h3>Control Boundary Findings</h3><ul><li>Approved AI tooling boundary requires visible ownership</li><li>Prompt/data sensitivity handling should be documented</li><li>Escalation path for suspected AI data leakage should be tested</li></ul>
        <h3>Recommended AI Governance Decisions</h3><ol>${scenarios.shadowai.decisions.map(d => `<li>${escapeHtml(d)}</li>`).join("")}</ol>${limitations}`,

      "Vendor Governance Review": () => `${header(type, "Translate third-party access and vendor dependency risk into executive ownership and review cadence.")}
        <h3>Vendor Risk Posture</h3><p>${escapeHtml(issues.find(i=>i.id==="vendor").detail)}</p>
        <h3>Vendor-Origin Scenario</h3><p>${escapeHtml(scenarios.vendor.narrative)}</p>
        <h3>Decision Chain</h3><ol><li>Suspend or constrain high-risk vendor access pending validation</li><li>Confirm vendor reassessment owner</li><li>Validate recoverability for vendor-dependent workflows</li><li>Prepare executive incident note if exposure remains material</li></ol>
        <h3>Executive Visibility</h3><p>Vendor trust is an operational dependency, not a procurement footnote. Review cadence should be visible to leadership.</p>${limitations}`,

      "Board Briefing": () => `${header(type, "Provide board-ready language on organizational risk, resilience trend, and leadership decisions.")}
        <h3>Board Summary</h3><p>Current organizational cyber risk is ${escapeHtml(risk.toLowerCase())}. Leadership focus should remain on recoverability, vendor governance, identity assurance, and escalation readiness.</p>
        <h3>Board-Level Priorities</h3><ol>${top.map(i => `<li>${escapeHtml(i.title)} — ${escapeHtml(i.decision)}</li>`).join("")}</ol>
        <h3>Management Assertion</h3><p>Management is using CyberShield to convert cyber uncertainty into operational ownership, executive visibility, and board-ready reporting.</p>
        <h3>Questions for Leadership</h3><ul><li>Which risks are accepted versus actively mitigated?</li><li>Which owners are accountable for next action?</li><li>What evidence supports confidence in current readiness?</li></ul>${limitations}`,

      "Incident Readiness Summary": () => `${header(type, "Assess whether leadership can coordinate during a cyber incident without confusion, delay, or ownership ambiguity.")}
        <h3>Readiness State</h3><p>${escapeHtml(issues.find(i=>i.id==="ir").detail)}</p>
        <h3>Escalation Chain</h3><ul><li>Executive owner: ${escapeHtml(normalizeOwner(profile.owner || "CEO"))}</li><li>Operational owner: COO</li><li>Technical owner: CIO / CTO or vCISO</li><li>Legal/compliance owner: General Counsel or assigned advisor</li></ul>
        <h3>Tabletop Priorities</h3><ol><li>Confirm notification tree</li><li>Test decision escalation under time pressure</li><li>Validate executive communication template</li><li>Record after-action governance updates</li></ol>${limitations}`,

      "Security Roadmap": () => `${header(type, "Convert current risk into a practical 30/60/90-day executive action roadmap.")}
        <h3>30 Days</h3><ul><li>Validate backup recoverability</li><li>Close privileged MFA gaps</li><li>Assign unresolved action owners</li></ul>
        <h3>60 Days</h3><ul><li>Complete vendor governance review</li><li>Refresh AI acceptable-use policy</li><li>Run incident escalation tabletop</li></ul>
        <h3>90 Days</h3><ul><li>Produce board-ready resilience update</li><li>Review trend movement and accepted risk</li><li>Institutionalize monthly executive briefing cadence</li></ul>
        <h3>Roadmap Principle</h3><p>Operational resilience is built before crisis. The roadmap prioritizes continuity, ownership, and evidence maturity over cosmetic cyber activity.</p>${limitations}`
    };

    return (templates[type] || templates["Executive Risk Summary"])();
  }

  function downloadReport() {
    const text = $("#reportPreview").innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeReport.replaceAll(" ","-")}-CyberShield-v7-1.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function emailReport() {
    const subject = encodeURIComponent(`CyberShield ${activeReport}`);
    const body = encodeURIComponent($("#reportPreview").innerText);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  function bindMemory() {
    $("#addMemoryBtn").addEventListener("click", () => {
      const note = prompt("Record governance note:");
      if (note) { recordMemory(note); renderMemory(); }
    });
    $("#resetAssessmentBtn").addEventListener("click", () => {
      if (!confirm("Reset local CyberShield assessment and memory?")) return;
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(MEMORY_KEY);
      state = { profile: null };
      renderAll();
      showView("briefing");
    });
  }

  function getMemory() {
    try { return JSON.parse(localStorage.getItem(MEMORY_KEY)) || []; }
    catch { return []; }
  }

  function recordMemory(note) {
    const memory = getMemory();
    memory.unshift({ note, at: new Date().toLocaleString(), version: VERSION });
    localStorage.setItem(MEMORY_KEY, JSON.stringify(memory.slice(0,20)));
  }

  function renderMemory() {
    const memory = getMemory();
    const defaults = [
      ["Unresolved risks", `${rankedIssues().filter(i=>i.rankScore>85).length} active issues require review`],
      ["Governance age", `${Math.max(...rankedIssues().map(i=>i.age))} days oldest unresolved item`],
      ["Trend direction", state.profile ? "Operational resilience improving with assigned ownership" : "Submit assessment to establish trend"],
      ["Executive decisions", memory.length ? `${memory.length} governance notes recorded` : "No decisions recorded yet"]
    ];
    $("#memoryGrid").innerHTML = [...defaults.map(([title, body]) => ({title, body})), ...memory.map(m => ({ title:m.at, body:m.note }))]
      .map(item => `<article class="memory-card detail-trigger" data-title="${escapeHtml(item.title)}" data-meaning="${escapeHtml(item.body)}" data-action="Use this memory item to maintain governance continuity."><div class="card-kicker">Continuity</div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></article>`).join("");
    bindDetailClicks();
  }

  function bindDetailClicks() {
    $$(".detail-trigger").forEach(el => {
      el.onclick = () => openAdvisor(el.dataset.title, el.dataset.meaning, el.dataset.action);
      el.tabIndex = 0;
      el.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") openAdvisor(el.dataset.title, el.dataset.meaning, el.dataset.action); };
    });
  }

  function openAdvisor(title, meaning, action) {
    $("#advisorTitle").textContent = title || "CyberShield Advisor";
    $("#advisorMeaning").textContent = meaning || "This item supports executive operational decision-making.";
    $("#advisorAction").textContent = action || "Assign ownership and review governance state.";
    $("#advisorValue").textContent = "Maximum Justice Cybersecurity can translate this into a vCISO-led executive action plan, board-ready summary, or operational resilience pilot.";
    $("#advisorDrawer").classList.add("open");
  }

  function normalizeOwner(owner) { return owner === "CEO / President" ? "CEO" : owner || "COO"; }
  function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""; }
  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c])); }

  document.addEventListener("DOMContentLoaded", init);
})();
