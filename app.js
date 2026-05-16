const STORAGE_KEY = "cybershield-v52-state";

const state = {
  step: 1,
  onboarded: false,
  firstName: "Max",
  orgName: "Acme Health Partners",
  industry: "healthcare",
  orgValue: 3000000,
  framework: "HIPAA",
  posture: "developing",
  artifactState: "partial",
  confidence: "medium",
  answers: {},
  owners: {},
  selectedGuidance: null,
  reportsGenerated: []
};

const industryFrameworkMap = {
  healthcare: { framework: "HIPAA", reason: "Healthcare organizations need privacy, security, operational safeguards, and vendor accountability aligned to patient data obligations." },
  defense: { framework: "CMMC", reason: "Defense contractors need CUI protection, evidence maturity, and federal contracting readiness." },
  financial: { framework: "FTC Safeguards", reason: "Financial organizations need customer information safeguards, accountable governance, and defensible oversight." },
  legal: { framework: "NIST CSF", reason: "Legal organizations need confidentiality controls, defensible governance, incident readiness, and vendor oversight." },
  technology: { framework: "SOC 2", reason: "Technology firms often need customer assurance, control evidence, and operational trust for growth." },
  manufacturing: { framework: "NIST CSF", reason: "Manufacturing organizations need operational resilience, vendor governance, downtime reduction, and continuity controls." },
  retail: { framework: "CIS Controls", reason: "Retail and e-commerce teams need practical safeguards for identity, endpoint, payment-adjacent, and vendor risk." },
  education: { framework: "NIST CSF", reason: "Education organizations need a broad governance model for identity, privacy, continuity, and risk ownership." },
  nonprofit: { framework: "CIS Controls", reason: "Nonprofits need prioritized safeguards that fit smaller teams and constrained budgets." },
  general: { framework: "CIS Controls", reason: "General SMBs need a clear, prioritized control set that produces action without enterprise overhead." }
};

const frameworks = ["HIPAA", "CMMC", "FTC Safeguards", "NIST CSF", "CIS Controls", "SOC 2", "ISO 27001"];

const postures = [
  { id: "reactive", name: "Reactive", help: "Security work happens mostly after something breaks. Owners, evidence, and repeatable governance are limited." },
  { id: "developing", name: "Developing", help: "Basic controls exist, but execution is inconsistent. Governance depends on individual effort instead of an operating rhythm." },
  { id: "operational", name: "Operational", help: "Core controls, owners, and workflows exist. The organization can manage known risks with reasonable discipline." },
  { id: "resilient", name: "Resilient", help: "The organization can absorb disruption, validate recovery, and maintain governance continuity under pressure." },
  { id: "strategic", name: "Strategic", help: "Cybersecurity is integrated into business planning, vendor decisions, AI adoption, and executive governance." }
];

const assessment = [
  { id: "mfa", category: "Identity", question: "Is MFA enforced for privileged and business-critical accounts?", yes: 10, no: -14, exposure: 84000, owner: "IT Lead / MSP" },
  { id: "backups", category: "Resilience", question: "Have backups been tested in the last 90 days?", yes: 12, no: -16, exposure: 165000, owner: "IT Lead / MSP" },
  { id: "ir", category: "Incident Readiness", question: "Is the incident escalation chain current and tested?", yes: 10, no: -15, exposure: 180000, owner: "Operations Leader / vCISO" },
  { id: "vendors", category: "Vendor Governance", question: "Are critical vendors reviewed for security risk?", yes: 9, no: -12, exposure: 95000, owner: "CFO / Operations" },
  { id: "ai", category: "AI Governance", question: "Is AI usage governed by policy and approved workflows?", yes: 8, no: -10, exposure: 120000, owner: "CEO / vCISO" }
];

const evidenceDomains = [
  { id: "incident", title: "Incident Readiness", body: "Escalation chain, IR contacts, tabletop exercises, and recovery workflows" },
  { id: "recovery", title: "Recovery Validation", body: "Backup testing, restore validation, recovery timing, and recovery documentation" },
  { id: "identity", title: "Identity Governance", body: "MFA enforcement, privileged access, onboarding/offboarding, and password governance" },
  { id: "vendor", title: "Vendor Governance", body: "Vendor reviews, MSP oversight, contract accountability, and cyber insurance alignment" },
  { id: "documentation", title: "Governance Documentation", body: "Policies, SOPs, ownership matrices, evidence repositories, and executive reporting" },
  { id: "ai", title: "AI Governance", body: "Approved AI tools, data restrictions, human review, and auditability" }
];

const ownershipItems = [
  { id: "mfa", label: "MFA adoption", recommended: "IT Lead / MSP" },
  { id: "backups", label: "Backup validation", recommended: "IT Lead / MSP" },
  { id: "ir", label: "IR escalation chain", recommended: "Operations Leader / vCISO" },
  { id: "vendors", label: "Vendor governance", recommended: "CFO / Operations" },
  { id: "ai", label: "AI governance", recommended: "CEO / vCISO" },
  { id: "policy", label: "Policy review", recommended: "Compliance / Operations" }
];

const ownerOptions = ["CEO", "CFO", "CIO / IT Lead", "Operations Leader", "Compliance Lead", "IT Lead / MSP", "MSP / MSSP", "Operations Leader / vCISO", "CFO / Operations", "CEO / vCISO", "Compliance / Operations", "vCISO", "Unassigned"];

const journeyStages = [
  { id: "journey_assessment", number: 1, title: "Assessment", tab: "actions",
    meaning: "Assessment converts basic answers into operational signals.",
    why: "Leadership needs a fast way to move from uncertainty to prioritized action.",
    next: "Review the Next Best Actions queue and start with the highest-ranked item.",
    mjc: "MJC can validate the assessment and convert findings into an executive action plan." },
  { id: "journey_risk", number: 2, title: "Risk Prioritization", tab: "command",
    meaning: "Risk prioritization ranks issues by exposure, confidence, ownership, and operational age.",
    why: "A ranked queue prevents leadership from wasting time on low-value activity.",
    next: "Use the top three executive priorities to drive the next governance meeting.",
    mjc: "MJC can tune the prioritization model and facilitate a leadership risk review." },
  { id: "journey_ownership", number: 3, title: "Ownership Assignment", tab: "roadmap",
    meaning: "Ownership converts cyber concerns into operational accountability.",
    why: "Unowned risk is unmanaged risk, even when tools or policies exist.",
    next: "Confirm the owner for each roadmap item and assign target dates.",
    mjc: "MJC can establish decision rights, escalation paths, and governance cadence." },
  { id: "journey_roadmap", number: 4, title: "Roadmap Creation", tab: "roadmap",
    meaning: "The roadmap sequences remediation into 30, 90, and 365-day execution windows.",
    why: "Executives need visible progress, not a list of disconnected tasks.",
    next: "Approve the 30-day stabilization sprint and track completion weekly.",
    mjc: "MJC can lead the roadmap sprint and report progress in executive language." },
  { id: "journey_compliance", number: 5, title: "Compliance Mapping", tab: "compliance",
    meaning: "Compliance mapping connects operational controls to framework obligations.",
    why: "Frameworks only help when they drive evidence, ownership, and remediation.",
    next: "Open Compliance Mapping and review the highest-value framework gap.",
    mjc: "MJC can translate HIPAA, CMMC, NIST, CIS, SOC 2, or FTC requirements into action." },
  { id: "journey_evidence", number: 6, title: "Evidence Collection", tab: "memory",
    meaning: "Evidence collection determines whether readiness claims can be trusted.",
    why: "Executives need evidence that holds up during audit, incident, insurance, or customer review.",
    next: "Review Governance Memory for stale, missing, or unvalidated evidence.",
    mjc: "MJC can build the evidence cadence and keep governance memory current." },
  { id: "journey_reporting", number: 7, title: "Executive Reporting", tab: "reports",
    meaning: "Reporting converts risk posture into board-ready decision language.",
    why: "Executives buy confidence, visibility, and defensibility, not raw technical detail.",
    next: "Generate the Executive Risk Summary and download or email it.",
    mjc: "MJC can refine the report into board, auditor, client, or leadership-ready output." },
  { id: "journey_continuous", number: 8, title: "Continuous Governance", tab: "memory",
    meaning: "Continuous governance keeps cybersecurity from decaying after the initial push.",
    why: "SMB security usually fails through drift, not lack of good intentions.",
    next: "Review governance memory monthly and update the action queue after each completed item.",
    mjc: "MJC can serve as the operating discipline that prevents governance drift." }
];

const guidance = {
  riskPosture: {
    eyebrow: "Current risk posture",
    title: "Risk posture is now an operating signal",
    meaning: "CyberShield converts governance conditions into an executive risk posture that can guide decisions.",
    why: "Leadership needs to know whether cyber risk is controlled, moderate, or elevated before crisis forces the issue.",
    next: "Use the action queue first.  It identifies the highest-value move right now.",
    mjc: "MJC can help convert posture into board-ready action, owner accountability, and sustained governance cadence."
  },
  exposureMetric: {
    eyebrow: "Estimated exposure",
    title: "Operational exposure requires executive context",
    meaning: "This estimate compares likely disruption, remediation, and governance exposure against organization value.",
    why: "Exposure above 20% of organizational value is a board-level warning signal because the potential loss becomes strategically material.",
    next: "Validate the assumptions behind the top three exposure drivers, then reduce the largest one first.",
    mjc: "MJC can refine the exposure model and convert the estimate into defensible executive language."
  },
  readinessMetric: {
    eyebrow: "Readiness score",
    title: "Readiness reflects execution capacity",
    meaning: "The score reflects whether cybersecurity governance is operationally usable, not merely documented.",
    why: "Below 70% means the organization may have policies or tools but lacks dependable execution under pressure.",
    next: "Improve the weakest combination of owner, evidence, and workflow first.",
    mjc: "MJC can operationalize readiness through cadence, decision rights, workflow ownership, and executive accountability."
  },
  confidenceMetric: {
    eyebrow: "Score confidence",
    title: "Confidence measures evidence quality",
    meaning: "Confidence indicates how reliable the score is based on current artifact and validation maturity.",
    why: "Medium or low confidence means leadership may be making decisions from incomplete or stale evidence.",
    next: "Collect current artifacts, validate operational use, and assign evidence refresh owners.",
    mjc: "MJC can establish an evidence validation rhythm so leadership can trust the score."
  },
  actionEngine: {
    eyebrow: "Operational intelligence",
    title: "The Action Engine is the center of gravity",
    meaning: "CyberShield ranks actions by exposure, age, owner quality, confidence, posture, and compliance sensitivity.",
    why: "Executives do not need more noise.  They need the next few actions that reduce risk fastest.",
    next: "Start with Action #1, assign the owner, and create evidence of completion.",
    mjc: "MJC can facilitate the first action sprint and convert outcomes into readiness evidence."
  }
};

const reports = [
  "Executive Risk Summary",
  "Board Report",
  "Security Roadmap",
  "Compliance Gap Assessment",
  "Incident Response Plan",
  "Vendor Risk Report",
  "Audit Readiness Summary",
  "Policy Package"
];

function $(id){ return document.getElementById(id); }
function money(n){ return `$${Math.round(n).toLocaleString()}`; }
function safeId(text){ return text.replaceAll(" ", "_").replaceAll("/", "_").toLowerCase(); }

function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState(){
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    Object.assign(state, saved);
  } catch(e) {}
}

function collectInputs(){
  state.firstName = $("firstName").value || "Executive";
  state.orgName = $("orgName").value || "Your Organization";
  state.orgValue = Number($("orgValue").value || 3000000);
  state.industry = $("industrySelect").value;
  state.artifactState = $("artifactState").value;
  state.confidence = $("confidenceSelect").value;
}

function applyIndustryRecommendation(){
  const rec = industryFrameworkMap[state.industry];
  state.framework = rec.framework;
  $("frameworkRecommendationText").textContent = `${rec.framework} is recommended for this industry.  ${rec.reason}`;
  renderFrameworks();
}

function renderFrameworks(){
  const wrap = $("frameworkCards");
  wrap.innerHTML = "";
  const recommended = industryFrameworkMap[state.industry].framework;
  frameworks.forEach(framework => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "choice-card";
    if (framework === recommended) card.classList.add("recommended");
    if (framework === state.framework) card.classList.add("selected");
    card.innerHTML = `<h3>${framework}</h3><p>${framework === recommended ? industryFrameworkMap[state.industry].reason : "Available as an alternate framework if this better matches your governance or customer requirements."}</p>`;
    card.addEventListener("click", () => {
      state.framework = framework;
      renderFrameworks();
      saveState();
    });
    wrap.appendChild(card);
  });
}

function renderPostures(){
  const wrap = $("postureCards");
  wrap.innerHTML = "";
  postures.forEach(p => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "choice-card";
    if (p.id === state.posture) card.classList.add("selected");
    card.innerHTML = `<span class="help-dot" data-help="${p.help}">?</span><h3>${p.name}</h3><p>${p.help}</p>`;
    card.addEventListener("click", () => {
      state.posture = p.id;
      renderPostures();
      saveState();
    });
    wrap.appendChild(card);
  });
}

function renderAssessment(){
  const wrap = $("assessmentQuestions");
  wrap.innerHTML = "";
  assessment.forEach(q => {
    if (!state.answers[q.id]) state.answers[q.id] = "no";
    const row = document.createElement("div");
    row.className = "assessment-row";
    row.innerHTML = `<strong>${q.question}</strong><select data-answer="${q.id}"><option value="yes">Yes</option><option value="no">No / Not sure</option></select>`;
    const select = row.querySelector("select");
    select.value = state.answers[q.id];
    select.addEventListener("change", e => {
      state.answers[q.id] = e.target.value;
      saveState();
    });
    wrap.appendChild(row);
  });
}

function renderEvidenceDomains(){
  const wrap = $("evidenceDomainCards");
  wrap.innerHTML = "";
  evidenceDomains.forEach(domain => {
    const card = document.createElement("article");
    card.className = "evidence-domain-card";
    card.innerHTML = `<h3>${domain.title}</h3><p>${domain.body}</p>`;
    wrap.appendChild(card);
  });
}

function renderOwnership(){
  const wrap = $("ownershipList");
  wrap.innerHTML = "";
  ownershipItems.forEach(item => {
    if (!state.owners[item.id]) state.owners[item.id] = item.recommended;
    const row = document.createElement("div");
    row.className = "owner-row";
    row.innerHTML = `<div><strong>${item.label}</strong><p>Recommended owner: ${item.recommended}</p></div><select data-owner="${item.id}"></select>`;
    const select = row.querySelector("select");
    ownerOptions.forEach(opt => {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      select.appendChild(o);
    });
    select.value = state.owners[item.id];
    select.addEventListener("change", e => {
      state.owners[item.id] = e.target.value;
      saveState();
    });
    wrap.appendChild(row);
  });
}

function updateSetupPane(){
  const titles = {
    1: ["Organization identity", "Capture the basic context CyberShield needs before it can generate a useful command center.", ["Industry drives framework recommendations.", "Organization value range drives exposure severity.", "This pane stays setup-only during onboarding."]],
    2: ["Framework recommendation", "CyberShield highlights the recommended safeguard framework based on the selected industry.", ["The recommendation is preselected.", "The user can override it.", "Healthcare maps to HIPAA, defense maps to CMMC, and so on."]],
    3: ["Posture definition support", "Each readiness posture includes a question-mark help bubble for executive-friendly definitions.", ["Reactive means after-the-fact operations.", "Resilient means disruption-ready.", "Strategic means security is tied to business decisions."]],
    4: ["Assessment impact", "Assessment answers influence readiness, exposure, priorities, and reporting.", ["No answers reduce confidence.", "Yes answers improve readiness.", "Uncertainty creates follow-up actions."]],
    5: ["Operational evidence maturity", "CyberShield evaluates whether evidence exists, works in practice, and can support executive, audit, incident, and vendor decisions.", ["Evidence maturity affects readiness and score confidence.", "Validated evidence increases executive trust.", "Informal evidence creates operational and audit risk."]],
    6: ["Recommended ownership", "CyberShield recommends owners for each operational item but allows changes.", ["Ownership defaults are not unassigned.", "Unassigned remains available.", "Owners flow into roadmap and reports."]]
  };
  const [title, body, bullets] = titles[state.step];
  $("setupPaneTitle").textContent = title;
  $("setupPaneBody").textContent = body;
  $("setupPaneBullets").innerHTML = bullets.map(b => `<li>${b}</li>`).join("");
}

function showStep(){
  document.querySelectorAll(".setup-card").forEach(card => card.classList.toggle("hidden", Number(card.dataset.step) !== state.step));
  $("stepLabel").textContent = `Step ${state.step} of 6`;
  $("progressFill").style.width = `${(state.step / 6) * 100}%`;
  $("prevStep").style.visibility = state.step === 1 ? "hidden" : "visible";
  $("nextStep").textContent = state.step === 6 ? "Create Command Center" : "Continue";
  updateSetupPane();
}

function calculate(){
  let score = 72;
  assessment.forEach(q => score += state.answers[q.id] === "yes" ? q.yes : q.no);
  const postureAdjust = { reactive: -12, developing: -4, operational: 5, resilient: 10, strategic: 13 };
  score += postureAdjust[state.posture] || 0;

  const evidenceAdjust = {
    minimal: -12,
    partial: -4,
    operationalized: 5,
    validated: 9,
    "executive-ready": 12
  };
  score += evidenceAdjust[state.artifactState] || 0;

  if (state.confidence === "low") score -= 7;
  if (state.confidence === "strong") score += 8;

  Object.values(state.owners).forEach(owner => {
    if (owner === "Unassigned") score -= 2;
  });

  score = Math.max(25, Math.min(97, score));
  const exposurePct = score < 70 ? 0.26 : score < 90 ? 0.15 : 0.07;
  const exposure = Math.round(state.orgValue * exposurePct);
  return { score, exposure, exposurePct };
}

function statusClassForScore(score){
  if (score < 70) return "status-red";
  if (score < 90) return "status-yellow";
  return "status-green";
}
function statusClassForExposure(pct){
  if (pct < .10) return "status-green";
  if (pct <= .20) return "status-yellow";
  return "status-red";
}
function statusClassForConfidence(conf){
  if (conf === "strong") return "status-green";
  if (conf === "medium") return "status-yellow";
  return "status-red";
}
function riskPostureFromScore(score){
  if (score < 70) return ["Elevated", "status-red"];
  if (score < 90) return ["Moderate", "status-yellow"];
  return ["Controlled", "status-green"];
}

function buildActionQueue(){
  const industryMultiplier = {
    healthcare: 1.25, defense: 1.3, financial: 1.2, legal: 1.15,
    technology: 1.1, manufacturing: 1.15, retail: 1.05, education: 1.05,
    nonprofit: 1, general: 1
  }[state.industry] || 1;

  const confidencePenalty = { low: 25, medium: 12, strong: 0 }[state.confidence] || 10;
  const posturePenalty = { reactive: 25, developing: 15, operational: 5, resilient: 0, strategic: -4 }[state.posture] || 10;

  return assessment.map((q, idx) => {
    const unresolved = state.answers[q.id] !== "yes";
    const owner = state.owners[q.id] || q.owner;
    const ownerPenalty = owner === "Unassigned" ? 30 : 0;
    const ageDays = unresolved ? 45 + (idx * 9) : 7;
    const agePenalty = Math.min(25, Math.round(ageDays / 3));
    const complianceSensitivity = ["healthcare", "defense", "financial", "legal"].includes(state.industry) ? 15 : 8;
    const score = Math.round(((q.exposure / 10000) * industryMultiplier) + confidencePenalty + posturePenalty + ownerPenalty + agePenalty + complianceSensitivity);
    return {
      id: `action_${q.id}`,
      sourceId: q.id,
      title: unresolved ? `${q.category}: ${q.question.replace("?", "")}` : `${q.category}: sustain current control evidence`,
      category: q.category,
      owner,
      exposure: q.exposure,
      ageDays,
      score,
      unresolved,
      meaning: unresolved ? `CyberShield ranks this as an active operational priority because the control is not confirmed as operating.` : `This area appears controlled, but the evidence should remain current.`,
      why: unresolved ? `The combination of exposure, confidence, industry sensitivity, and workflow age makes this a high-value action.` : `Sustained controls still require evidence refresh so confidence does not decay.`,
      next: unresolved ? `Assign ${owner} to validate, remediate, and produce evidence within the next governance cycle.` : `Schedule the next evidence refresh and keep the owner accountable.`,
      mjc: unresolved ? `MJC can drive this action into an owner, evidence artifact, and executive-ready status update.` : `MJC can help maintain control cadence and prevent drift.`
    };
  }).sort((a,b) => b.score - a.score);
}

function renderPlatform(){
  collectInputs();
  const calc = calculate();
  $("commandTitle").textContent = `${state.orgName}’s Readiness`;
  const [postureLabel, postureClass] = riskPostureFromScore(calc.score);
  $("riskPosture").textContent = postureLabel;
  $("riskPosture").className = postureClass;
  $("exposureValue").textContent = money(calc.exposure);
  $("exposureValue").className = statusClassForExposure(calc.exposurePct);
  $("exposurePercent").textContent = `${Math.round(calc.exposurePct * 100)}% of organization value`;
  $("readinessScore").textContent = `${calc.score}%`;
  $("readinessScore").className = statusClassForScore(calc.score);
  $("scoreConfidence").textContent = state.confidence[0].toUpperCase() + state.confidence.slice(1);
  $("scoreConfidence").className = statusClassForConfidence(state.confidence);

  renderJourney();
  renderActionEngine();
  renderPriorityCards();
  renderMemory();
  renderRoadmap();
  renderCompliance();
  renderMJC();
  renderReports();
  bindMetricCards();
  saveState();
}

function renderJourney(){
  const wrap = $("journeyStrip");
  wrap.innerHTML = "";
  journeyStages.forEach((stage, index) => {
    guidance[stage.id] = {
      eyebrow: `Journey step ${stage.number}`,
      title: stage.title,
      meaning: stage.meaning,
      why: stage.why,
      next: stage.next,
      mjc: stage.mjc
    };
    const item = document.createElement("article");
    item.className = `journey-stage ${index < 3 ? "complete" : ""}`;
    item.dataset.guidance = stage.id;
    item.dataset.routeTab = stage.tab;
    item.innerHTML = `<span>${stage.number}</span><strong>${stage.title}</strong>`;
    item.addEventListener("click", () => {
      activateTab(stage.tab);
      selectGuidance(stage.id, item);
    });
    wrap.appendChild(item);
  });
}

function renderActionEngine(){
  const queue = buildActionQueue();
  const block = $("actionEngineBlock");
  block.innerHTML = `
    <div class="section-head compact">
      <div><p class="eyebrow">Action engine</p><h3>What should this organization do next?</h3></div>
      <button class="ghost-btn small" data-guidance="actionEngine">How this works</button>
    </div>
    <div class="action-queue">
      ${queue.slice(0,3).map((a, idx) => `
        <article class="action-rank clickable" data-guidance="${a.id}">
          <span class="rank-num">${idx+1}</span>
          <div>
            <strong>${a.category}</strong>
            <p>${a.title}</p>
            <small>Owner: ${a.owner} · Exposure: ${money(a.exposure)} · Priority score: ${a.score}</small>
          </div>
        </article>`).join("")}
    </div>`;

  queue.forEach(a => {
    guidance[a.id] = { eyebrow: "Action engine priority", title: a.title, meaning: a.meaning, why: a.why, next: a.next, mjc: a.mjc };
  });

  block.querySelectorAll("[data-guidance]").forEach(el => {
    el.addEventListener("click", () => selectGuidance(el.dataset.guidance, el));
  });

  const actionsWrap = $("actionCards");
  actionsWrap.innerHTML = "";
  queue.forEach((a, idx) => {
    const card = document.createElement("article");
    card.className = "data-card clickable";
    card.dataset.guidance = a.id;
    card.innerHTML = `<h3>${idx+1}. ${a.category}</h3><p>${a.title}</p><span class="tag">Score ${a.score} · ${money(a.exposure)}</span>`;
    card.addEventListener("click", () => selectGuidance(a.id, card));
    actionsWrap.appendChild(card);
  });
}

function renderPriorityCards(){
  const queue = buildActionQueue();
  const wrap = $("priorityCards");
  wrap.innerHTML = "";
  queue.slice(0,4).forEach(a => {
    const severity = a.score > 65 ? "high" : a.score > 45 ? "medium" : "low";
    const card = document.createElement("article");
    card.className = "priority-card clickable";
    card.dataset.guidance = a.id;
    card.innerHTML = `
      <div class="severity-dot ${severity}"></div>
      <div>
        <div class="priority-title severity-${severity}">${a.category}</div>
        <div class="priority-meta">${a.title} · Owner: ${a.owner} · Exposure: ${money(a.exposure)}</div>
      </div>
      <button class="ghost-btn small">Review</button>`;
    card.addEventListener("click", () => selectGuidance(a.id, card));
    wrap.appendChild(card);
  });
}

function renderMemory(){
  const dynamic = buildActionQueue().filter(a => a.unresolved).slice(0,3).map(a => ({
    id: `memory_${a.sourceId}`,
    title: `${a.category} unresolved`,
    tag: "Open governance memory",
    meaning: `${a.category} remains unresolved and is now part of CyberShield's organizational memory.`,
    why: "Unresolved risks need continuity so they do not disappear between meetings, staff changes, or vendor transitions.",
    next: `Keep ${a.owner} accountable until evidence is validated and status changes.`,
    mjc: "MJC can maintain the governance memory, prevent drift, and convert unresolved items into executive progress reporting."
  }));
  const base = [
    {
      id: "memory_baseline", title: "Executive baseline posture recorded", tag: "Initialized",
      meaning: "CyberShield created the first executive security baseline from onboarding and assessment data.",
      why: "A baseline gives leadership a starting point to measure drift, progress, and accountability.",
      next: "Review the baseline monthly and compare score movement against completed actions.",
      mjc: "MJC can turn the baseline into a governance cadence with executive-ready reporting."
    },
    {
      id: "memory_drift", title: "Governance drift watch started", tag: "Continuity",
      meaning: "CyberShield is watching for aging evidence, unresolved actions, ownership gaps, and roadmap delay.",
      why: "Governance decay is one of the most common SMB security failures because controls weaken quietly over time.",
      next: "Use the action queue weekly and update owner status after each remediation step.",
      mjc: "MJC can provide the vCISO operating discipline to keep controls from decaying after initial setup."
    }
  ];
  renderDataCards("memoryCards", [...base, ...dynamic]);
}

function renderRoadmap(){
  const items = [
    {
      id: "r30", title: "30 Days", tag: "Stabilize",
      meaning: "The 30-day plan focuses on immediate exposure reduction and ownership clarity.",
      why: "Early wins reduce the most obvious operational risk and build executive confidence quickly.",
      next: "Assign owners for IR, backups, MFA, AI usage, and critical vendors.  Validate one recovery scenario.",
      mjc: "MJC can run the first stabilization sprint and produce an executive progress report."
    },
    {
      id: "r90", title: "90 Days", tag: "Operationalize",
      meaning: "The 90-day plan turns initial fixes into repeatable governance workflows.",
      why: "Controls only matter if they become operational habits with evidence and accountability.",
      next: "Create governance cadence, vendor review cycle, policy refresh rhythm, and incident tabletop schedule.",
      mjc: "MJC can build the operating rhythm and coach leadership through the first governance cycle."
    },
    {
      id: "r365", title: "365 Days", tag: "Mature",
      meaning: "The annual roadmap matures cybersecurity into strategic resilience.",
      why: "Long-term value comes from continuity, measurable maturity, and business-aligned security decisions.",
      next: "Establish maturity targets, board reporting, AI governance, and annual resilience validation.",
      mjc: "MJC can act as the vCISO governance partner to sustain progress and prevent drift."
    }
  ];
  renderDataCards("roadmapCards", items);
}

function renderCompliance(){
  const items = [
    { id: "hipaa", title: "HIPAA", tag: "Healthcare privacy and security", meaning: "HIPAA alignment focuses on protecting health information through safeguards, accountability, and evidence.", why: "Healthcare leaders need defensible handling of sensitive patient data, incident readiness, and vendor accountability.", next: "Map current safeguards to administrative, technical, and physical control expectations.", mjc: "MJC can build a HIPAA-aligned readiness package with gap tracking and executive reporting." },
    { id: "cmmc", title: "CMMC", tag: "Defense readiness", meaning: "CMMC alignment prepares defense contractors to protect CUI and demonstrate control maturity.", why: "Contract eligibility, customer trust, and federal readiness depend on credible control implementation.", next: "Identify CUI flows, control gaps, evidence maturity, and remediation ownership.", mjc: "MJC can prepare a CMMC readiness roadmap with evidence structure and leadership accountability." },
    { id: "nist", title: "NIST CSF", tag: "Risk governance", meaning: "NIST CSF organizes cybersecurity into understandable business risk functions.", why: "Executives need a common governance language for identify, protect, detect, respond, and recover decisions.", next: "Map current operations to CSF functions and identify priority gaps.", mjc: "MJC can translate NIST CSF into an executive operating cadence rather than a static checklist." },
    { id: "cis", title: "CIS Controls", tag: "Practical safeguards", meaning: "CIS Controls provide prioritized, practical safeguards for resource-constrained organizations.", why: "SMBs need controls that reduce exposure quickly without enterprise bureaucracy.", next: "Start with inventory, identity, secure configuration, backup, and logging basics.", mjc: "MJC can sequence CIS adoption into 30/90/365-day actions with measurable exposure reduction." },
    { id: "soc2", title: "SOC 2", tag: "Customer assurance", meaning: "SOC 2 readiness builds evidence around security, availability, confidentiality, and trust.", why: "Growth-stage firms often need customer assurance before procurement, partnership, or expansion decisions.", next: "Identify trust service criteria gaps and evidence owners.", mjc: "MJC can structure SOC 2 readiness so leadership understands cost, timing, evidence, and operational impact." },
    { id: "ftc", title: "FTC Safeguards", tag: "Customer information protection", meaning: "FTC Safeguards alignment helps financial and customer-data-heavy organizations govern information security.", why: "Leadership needs documented safeguards, accountability, vendor oversight, and periodic assessment.", next: "Confirm risk assessment, access controls, vendor oversight, and written security program ownership.", mjc: "MJC can translate FTC Safeguards into a practical operating model for SMB leadership." }
  ];
  renderDataCards("complianceCards", items);
}

function renderMJC(){
  const items = [
    { id: "vciso", title: "Fractional vCISO", tag: "Executive security leadership", meaning: "Fractional vCISO support gives the organization experienced security leadership without full-time executive overhead.", why: "SMBs often have tools and vendors but lack decision authority, prioritization, and board-level translation.", next: "Use vCISO support to define governance cadence, decision rights, and executive risk reporting.", mjc: "Dr. Max Justice, vCISO, Security SME, Cybersecurity SME, and U.S. veteran, can provide executive cyber leadership through MJC." },
    { id: "risk", title: "Cyber Risk Assessment", tag: "Exposure clarity", meaning: "A cyber risk assessment identifies the highest-impact risks before money is wasted on low-value fixes.", why: "Executives need prioritized exposure insight, not a generic vulnerability dump.", next: "Assess identity, resilience, vendor risk, incident readiness, compliance, and AI governance.", mjc: "MJC can convert assessment findings into operational priorities, risk language, and a leadership-ready roadmap." },
    { id: "compliance", title: "Compliance Readiness", tag: "Framework execution", meaning: "Compliance readiness connects control expectations to owners, evidence, and workflows.", why: "Compliance fails when it lives as paperwork instead of operational accountability.", next: "Map the selected framework to current evidence and define remediation owners.", mjc: "MJC can turn HIPAA, CMMC, NIST, CIS, SOC 2, or FTC requirements into practical governance execution." },
    { id: "incident", title: "Incident Preparedness", tag: "Response confidence", meaning: "Incident preparedness ensures the organization can make decisions under pressure.", why: "A slow or confused response increases downtime, legal exposure, and reputational damage.", next: "Run a tabletop, validate escalation paths, and create executive decision cards.", mjc: "MJC can facilitate tabletop exercises and build incident playbooks that executives can actually use." },
    { id: "aiGov", title: "AI Governance Assistance", tag: "Control boundary", meaning: "AI governance brings employee AI use, sensitive data, and automated decisions inside a control boundary.", why: "Uncontrolled AI adoption creates confidentiality, integrity, legal, and decision-risk exposure.", next: "Define approved tools, prohibited data, decision review points, and evidence expectations.", mjc: "MJC can build AI governance policy, control workflows, and executive oversight for responsible adoption." },
    { id: "execReview", title: "Executive Readiness Review", tag: "Board clarity", meaning: "An executive readiness review translates cyber posture into business decision language.", why: "Leadership needs a clear answer to what matters most, who owns it, and what changes next.", next: "Review posture, exposure, score confidence, priority risks, and the 30/90/365 roadmap.", mjc: "MJC can deliver an executive-ready briefing package and decision roadmap for leadership teams." }
  ];
  renderDataCards("mjcCards", items);
}

function renderDataCards(containerId, items){
  const wrap = $(containerId);
  wrap.innerHTML = "";
  items.forEach(item => {
    guidance[item.id] = { eyebrow: item.tag, title: item.title, meaning: item.meaning, why: item.why, next: item.next, mjc: item.mjc };
    const card = document.createElement("article");
    card.className = "data-card clickable";
    card.dataset.guidance = item.id;
    card.innerHTML = `<h3>${item.title}</h3><p>${item.meaning}</p><span class="tag">${item.tag}</span>`;
    card.addEventListener("click", () => selectGuidance(item.id, card));
    wrap.appendChild(card);
  });
}

function renderReports(){
  const wrap = $("reportCards");
  wrap.innerHTML = "";
  reports.forEach(report => {
    const id = "report_" + safeId(report);
    guidance[id] = {
      eyebrow: "Exportable operational artifact",
      title: report,
      meaning: `${report} converts the current CyberShield state into a usable governance artifact.`,
      why: `${report} improves executive confidence by documenting posture, owners, exposure, gaps, and next actions.`,
      next: `Generate the ${report}, then download it or prepare it for email distribution.`,
      mjc: "MJC can refine this artifact into board, client, auditor, or leadership-ready language."
    };
    const card = document.createElement("article");
    card.className = "data-card clickable";
    card.dataset.guidance = id;
    card.innerHTML = `<h3>${report}</h3><p>Generate, download, or email this operational artifact.</p>
      <div class="report-actions">
        <button class="primary-btn small" data-generate="${report}">Generate</button>
        <button class="ghost-btn small" data-download="${report}">Download</button>
        <button class="ghost-btn small" data-email="${report}">Email</button>
      </div>`;
    card.addEventListener("click", () => selectGuidance(id, card));
    card.querySelector("[data-generate]").addEventListener("click", (e) => { e.stopPropagation(); generateReport(report); });
    card.querySelector("[data-download]").addEventListener("click", (e) => { e.stopPropagation(); downloadReport(report); });
    card.querySelector("[data-email]").addEventListener("click", (e) => { e.stopPropagation(); emailReport(report); });
    wrap.appendChild(card);
  });
}

function generateReport(reportName){
  const calc = calculate();
  const queue = buildActionQueue();
  const [postureLabel] = riskPostureFromScore(calc.score);
  const trend = calc.score >= 80 ? "Operational resilience improving" : calc.score >= 70 ? "Governance stabilizing, but execution still needs focus" : "Operational exposure remains elevated";
  const text = `${reportName}

Organization: ${state.orgName}
Industry: ${$("industrySelect").selectedOptions[0].text}
Primary Framework: ${state.framework}
Current Risk Posture: ${postureLabel}
Readiness Score: ${calc.score}%
Estimated Operational Exposure: ${money(calc.exposure)} (${Math.round(calc.exposurePct * 100)}% of organization value)
Score Confidence: ${state.confidence}

Executive Narrative:
CyberShield indicates that ${state.orgName} should focus on operational execution, ownership clarity, and evidence maturity.  The highest-value actions are ranked by exposure, governance age, owner quality, industry sensitivity, and score confidence.

Top Risks:
${queue.slice(0,3).map(a => `• ${a.category}: ${a.title} | Owner: ${a.owner} | Exposure: ${money(a.exposure)}`).join("\n")}

Recommended Priorities:
${queue.slice(0,3).map((a, i) => `${i+1}. ${a.next}`).join("\n")}

Compliance Readiness:
${state.framework}: ${Math.max(55, Math.min(92, calc.score + 6))}%
NIST CSF: ${Math.max(52, Math.min(90, calc.score + 2))}%
CIS Controls: ${Math.max(50, Math.min(88, calc.score - 1))}%

Trend:
${trend}

MJC Value Add:
Maximum Justice Cybersecurity can convert this report into governance cadence, owner accountability, evidence validation, and executive-ready progress reporting.`;
  $("reportPreview").innerHTML = `<h3>${reportName} Preview</h3><pre>${text}</pre>`;
  if (!state.reportsGenerated.includes(reportName)) state.reportsGenerated.push(reportName);
  selectGuidance("report_" + safeId(reportName));
  saveState();
}

function downloadReport(reportName){
  generateReport(reportName);
  const content = $("reportPreview").innerText;
  const blob = new Blob([content], {type: "text/plain"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${safeId(reportName).replaceAll("_","-")}-${Date.now()}.txt`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function emailReport(reportName){
  generateReport(reportName);
  const subject = encodeURIComponent(`CyberShield ${reportName} - ${state.orgName}`);
  const body = encodeURIComponent($("reportPreview").innerText);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function downloadAdvisor(){
  const g = guidance[state.selectedGuidance] || guidance.actionEngine;
  const content = `${g.title}

What this means:
${g.meaning}

Why this matters:
${g.why}

Next best action:
${g.next}

MJC value add:
${g.mjc}`;
  const blob = new Blob([content], {type: "text/plain"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `cybershield-guidance-${Date.now()}.txt`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function emailAdvisor(){
  const g = guidance[state.selectedGuidance] || guidance.actionEngine;
  const subject = encodeURIComponent(`CyberShield Guidance - ${g.title}`);
  const body = encodeURIComponent(`${g.title}\n\nWhat this means:\n${g.meaning}\n\nWhy this matters:\n${g.why}\n\nNext best action:\n${g.next}\n\nMJC value add:\n${g.mjc}`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function bindMetricCards(){
  document.querySelectorAll("[data-guidance]").forEach(el => {
    if (!el.dataset.bound) {
      el.dataset.bound = "true";
      el.addEventListener("click", () => selectGuidance(el.dataset.guidance, el));
    }
  });
}

function selectGuidance(id, el){
  const g = guidance[id];
  if (!g) return;
  state.selectedGuidance = id;
  document.querySelectorAll(".clickable, .data-card, .priority-card, .action-rank, .journey-stage").forEach(x => x.classList.remove("selected"));
  if (el) el.classList.add("selected");
  $("advisorEyebrow").textContent = g.eyebrow;
  $("advisorTitle").textContent = g.title;
  $("advisorMeaning").textContent = g.meaning;
  $("advisorWhy").textContent = g.why;
  $("advisorNext").textContent = g.next;
  $("advisorMJC").textContent = g.mjc;
  saveState();
}

function activateTab(tabName){
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tabName));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  const panel = $(`${tabName}Panel`);
  if (panel) panel.classList.add("active");

  const defaults = {
    command: "actionEngine",
    actions: buildActionQueue()[0]?.id || "actionEngine",
    memory: "memory_baseline",
    roadmap: "r30",
    compliance: state.framework === "HIPAA" ? "hipaa" : state.framework === "CMMC" ? "cmmc" : state.framework === "SOC 2" ? "soc2" : state.framework === "CIS Controls" ? "cis" : state.framework === "FTC Safeguards" ? "ftc" : "nist",
    mjc: "vciso",
    reports: "report_executive_risk_summary"
  };
  if (defaults[tabName]) selectGuidance(defaults[tabName]);
}

function completeOnboarding(){
  collectInputs();
  state.onboarded = true;
  $("onboardingView").classList.add("hidden");
  $("platformView").classList.remove("hidden");
  renderPlatform();
  activateTab("command");
  selectGuidance("actionEngine");
}

function editOnboarding(){
  state.onboarded = false;
  $("platformView").classList.add("hidden");
  $("onboardingView").classList.remove("hidden");
  showStep();
  saveState();
}

function resetDemo(){
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

function init(){
  loadState();

  $("firstName").value = state.firstName || "Max";
  $("orgName").value = state.orgName || "Acme Health Partners";
  $("orgValue").value = String(state.orgValue || 3000000);
  $("industrySelect").value = state.industry || "healthcare";
  $("artifactState").value = state.artifactState || "partial";
  $("confidenceSelect").value = state.confidence || "medium";

  $("industrySelect").addEventListener("change", e => {
    state.industry = e.target.value;
    applyIndustryRecommendation();
    saveState();
  });

  $("orgValue").addEventListener("change", e => {
    state.orgValue = Number(e.target.value);
    saveState();
  });

  $("nextStep").addEventListener("click", () => {
    collectInputs();
    if (state.step < 6) {
      state.step += 1;
      if (state.step === 2) applyIndustryRecommendation();
      showStep();
      saveState();
    } else {
      completeOnboarding();
    }
  });

  $("prevStep").addEventListener("click", () => {
    state.step = Math.max(1, state.step - 1);
    showStep();
    saveState();
  });

  $("editOnboardingBtn").addEventListener("click", editOnboarding);
  $("resetDemoBtn").addEventListener("click", resetDemo);
  $("downloadCurrentAdvisor").addEventListener("click", downloadAdvisor);
  $("emailCurrentAdvisor").addEventListener("click", emailAdvisor);
  $("generateExecutiveRiskSummary").addEventListener("click", () => {
    activateTab("reports");
    generateReport("Executive Risk Summary");
  });

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => activateTab(tab.dataset.tab));
  });

  renderFrameworks();
  renderPostures();
  renderAssessment();
  renderEvidenceDomains();
  renderOwnership();
  applyIndustryRecommendation();

  if (state.onboarded) {
    $("onboardingView").classList.add("hidden");
    $("platformView").classList.remove("hidden");
    renderPlatform();
    activateTab("command");
    selectGuidance(state.selectedGuidance || "actionEngine");
  } else {
    showStep();
  }
}

document.addEventListener("DOMContentLoaded", init);
