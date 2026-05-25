(() => {
  "use strict";

  const INTERNAL_BUILD = "CyberShield V9 Phase 1";
  const PRODUCT_NAME = "CyberShield Executive OS";
  const STORAGE_KEY = "cybershield_executive_os_state";
  const LEGACY_STORAGE_KEYS = ["cybershield_os_v8_state"];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const defaultProfile = {
    firstName: "Executive",
    orgName: "Your Organization",
    primaryRole: "CEO / President",
    additionalRoles: [],
    decisionAuthority: "executive",
    reportingAudience: "executive",
    industry: "professional",
    reviewGoal: "trust",
    valueRange: "mid",
    artifactState: "partial",
    evidence: "medium",
    owner: "COO",
    coordination: "developing",
    aiPosture: "approved",
    workflow: "partial",
    activeRole: "CEO / President",
    demo: true
  };

  const roleProfiles = {
    "CEO / President": {
      title: "CEO Operating View",
      focus: "continuity, customer trust, reputation, executive accountability, and board-ready decisions",
      decisionLens: "enterprise consequence and risk ownership",
      priorityBias: ["ir", "backup", "policy"]
    },
    "CFO": {
      title: "CFO Exposure View",
      focus: "estimated exposure, investment priority, insurance implications, vendor risk, and cost avoidance",
      decisionLens: "financial exposure and funding sequence",
      priorityBias: ["vendor", "mfa", "backup"]
    },
    "COO": {
      title: "COO Workflow View",
      focus: "workflow continuity, operational dependencies, vendor execution, and escalation paths",
      decisionLens: "operational disruption and process control",
      priorityBias: ["backup", "vendor", "ir"]
    },
    "CIO / CTO": {
      title: "CIO / CTO Architecture View",
      focus: "identity, cloud, systems, data flows, resilience, and technical governance gates",
      decisionLens: "architecture dependency and technical control integrity",
      priorityBias: ["mfa", "backup", "policy"]
    },
    "CISO / vCISO": {
      title: "Security Governance View",
      focus: "control gaps, incident readiness, evidence quality, framework mapping, and trust degradation",
      decisionLens: "security control ownership and evidence defensibility",
      priorityBias: ["mfa", "policy", "ir"]
    },
    "General Counsel": {
      title: "Legal and Compliance View",
      focus: "evidence defensibility, accepted risk, reporting obligations, and decision records",
      decisionLens: "regulatory exposure and defensible governance record",
      priorityBias: ["policy", "vendor", "ir"]
    },
    "Board / Advisor": {
      title: "Board Oversight View",
      focus: "material exposure, governance cadence, ownership clarity, and executive accountability",
      decisionLens: "oversight, assurance, and decision traceability",
      priorityBias: ["ir", "vendor", "backup"]
    }
  };

  const advisors = {
    "briefing-core": {
      kicker: "Executive Advisor Layer",
      title: "Role-personalized decision compression",
      meaning: "This briefing translates cyber and AI uncertainty into operational consequence, ownership, confidence, and next action for the named leader.",
      why: "Executives do not need raw telemetry. They need the operational meaning of what changed, what decision is required, and what evidence supports the recommendation.",
      action: "Use this as the standing leadership brief before security reviews, incident meetings, and board updates.",
      trace: "Recommendation is based on selected role, evidence confidence, governance maturity, workflow discipline, and the highest-ranked unresolved priority.",
      mjc: "MJC validates assumptions, interviews owners, and turns the briefing into an advisory-assisted operational plan."
    },
    "decision-required": {
      kicker: "Executive decision point",
      title: "Leadership action required",
      meaning: "This is the next decision that reduces operational uncertainty fastest for the selected executive view.",
      why: "Delayed decisions create governance drift. Drift becomes exposure when an incident accelerates faster than organizational coordination.",
      action: "Assign a named executive owner, set a review date, and validate evidence before the next operating meeting.",
      trace: "Priority rank combines severity, urgency, business impact, evidence confidence, trust drift, governance age, and role-specific responsibility.",
      mjc: "MJC can facilitate the decision session, clarify tradeoffs, and produce the board-ready decision record."
    }
  };

  const scenarios = {
    phishing: {
      label: "AI Phishing",
      title: "AI-enabled executive phishing campaign",
      rawSignal: "Multiple executive-adjacent mailbox anomalies and OAuth consent prompts observed within a short window.",
      narrative: "Potential AI-enabled phishing campaign targeting finance leadership with elevated risk of credential misuse and payment workflow disruption.",
      confidence: "High",
      escalation: "Elevated",
      owner: "CFO",
      timeline: [
        { time: "09:02", title: "Signal detected", body: "Executive assistant receives a spoofed payment approval thread with realistic writing style and vendor references." },
        { time: "09:18", title: "Identity risk expands", body: "OAuth consent prompt appears against a finance-adjacent account with access to invoice records." },
        { time: "10:04", title: "Workflow trust degrades", body: "Payment approval process now depends on manual verification because identity confidence is impaired." },
        { time: "10:47", title: "Executive escalation threshold", body: "CyberShield recommends CFO and COO review before vendor payment processing continues." },
        { time: "11:30", title: "Decision point", body: "Leadership must decide whether to pause high-risk payment workflows pending verification." }
      ],
      consequences: [
        { title: "Payment Integrity", meaning: "Fraudulent approval risk increases until identity and vendor records are validated.", action: "Pause non-routine payment approvals above threshold.", mjc: "MJC reviews payment approval trust paths and maps compensating controls." },
        { title: "Executive Exposure", meaning: "Leadership accounts are being used as trust proxies in the attack path.", action: "Verify executive identity controls and delegate approvals temporarily.", mjc: "MJC validates identity governance around executives and privileged assistants." },
        { title: "Vendor Trust", meaning: "Known vendor language is being exploited to bypass normal skepticism.", action: "Confirm vendor payment changes through out-of-band channels.", mjc: "MJC builds a vendor verification playbook for high-risk approvals." },
        { title: "Board Visibility", meaning: "Financial fraud exposure may require governance documentation if material controls fail.", action: "Prepare an executive incident note with assumptions and decisions.", mjc: "MJC drafts board-safe language and decision evidence records." }
      ],
      decisions: [
        ["Pause", "Hold high-risk vendor payments", "CFO", "Immediate", "High"],
        ["Verify", "Confirm executive identity and OAuth consent status", "CIO / CTO", "Today", "High"],
        ["Escalate", "Notify COO of payment workflow trust degradation", "COO", "Today", "Moderate"],
        ["Document", "Create board-ready decision record", "General Counsel", "48 hours", "Moderate"]
      ]
    },
    ransomware: {
      label: "Vendor Ransomware",
      title: "Vendor-origin ransomware staging",
      rawSignal: "Vendor remote access session exhibits unusual lateral movement attempts and file enumeration activity.",
      narrative: "Potential vendor-origin ransomware staging activity affecting operations-adjacent systems with degraded recovery confidence.",
      confidence: "Moderate",
      escalation: "High",
      owner: "COO",
      timeline: [
        { time: "08:11", title: "Vendor session anomaly", body: "Remote access behavior deviates from normal maintenance window and expected asset path." },
        { time: "08:39", title: "Dependency concern", body: "Operations system shares authentication dependency with finance reporting environment." },
        { time: "09:16", title: "Evidence gap", body: "Backup validation evidence is older than the current leadership tolerance window." },
        { time: "10:05", title: "Exposure widens", body: "CyberShield raises disruption risk because vendor access and recovery evidence are both degraded." },
        { time: "10:52", title: "Decision point", body: "Leadership must decide whether to suspend vendor access and initiate recoverability validation." }
      ],
      consequences: [
        { title: "Recovery Readiness", meaning: "Backup evidence age weakens confidence in recovery timelines.", action: "Validate recoverability for operations and finance systems.", mjc: "MJC conducts a recovery evidence sprint and executive tolerance review." },
        { title: "Vendor Access", meaning: "The vendor trust path is now a possible operational exposure route.", action: "Suspend or restrict vendor access until reassessed.", mjc: "MJC maps vendor access dependencies and drafts revised approval gates." },
        { title: "Operations Continuity", meaning: "Shared dependencies may cause business disruption beyond the initially affected system.", action: "Identify critical workflows that depend on the vendor-managed system.", mjc: "MJC builds a workflow dependency brief for leadership." },
        { title: "Regulatory Exposure", meaning: "Incident reconstruction may be difficult without evidence lineage and access records.", action: "Preserve logs, decisions, and approval records.", mjc: "MJC prepares evidence handling and audit-readiness guidance." }
      ],
      decisions: [
        ["Contain", "Restrict vendor access pending verification", "COO", "Immediate", "Moderate"],
        ["Validate", "Run recovery proof on priority systems", "CIO / CTO", "Today", "Moderate"],
        ["Map", "Identify operational dependencies", "Operations Lead", "24 hours", "Moderate"],
        ["Record", "Preserve incident and decision evidence", "General Counsel", "24 hours", "High"]
      ]
    },
    shadowai: {
      label: "Shadow AI",
      title: "Shadow AI prompt leakage event",
      rawSignal: "Sensitive client or operational context detected in unsanctioned AI workflow outside approved tool boundary.",
      narrative: "Potential AI trust-boundary failure caused by unsanctioned prompt usage, policy drift, and unclear approval gates.",
      confidence: "Moderate",
      escalation: "Developing",
      owner: "CIO / CTO",
      timeline: [
        { time: "13:15", title: "Unsanctioned AI use", body: "User submits sensitive workflow context into an AI tool not listed in approved systems." },
        { time: "13:34", title: "Policy lineage gap", body: "Current AI policy does not clearly define prompt boundaries for this workflow." },
        { time: "14:08", title: "Trust drift", body: "Behavior indicates the workforce is moving faster than governance controls." },
        { time: "14:46", title: "Human approval required", body: "CyberShield recommends advisory review before any AI output is reused externally." },
        { time: "15:22", title: "Decision point", body: "Leadership must decide whether to pause AI use in sensitive workflows until boundaries are clarified." }
      ],
      consequences: [
        { title: "Client Trust", meaning: "Sensitive context may have been exposed outside approved handling boundaries.", action: "Review prompt content and determine notification obligations.", mjc: "MJC performs AI governance triage and evidence review." },
        { title: "Policy Drift", meaning: "Actual user behavior has outpaced written AI controls.", action: "Update AI usage policy and approved-tool matrix.", mjc: "MJC creates a practical AI governance boundary for SMB teams." },
        { title: "Workflow Integrity", meaning: "AI-generated outputs may be reused without provenance or review.", action: "Require draft mode and human approval for sensitive AI-assisted outputs.", mjc: "MJC defines review gates and output handling rules." },
        { title: "Operational Trust", meaning: "The organization cannot prove what AI touched, who approved it, or what evidence supports it.", action: "Create AI-readable evidence records for sensitive workflows.", mjc: "MJC builds the initial evidence substrate and review cadence." }
      ],
      decisions: [
        ["Review", "Assess prompt content and exposure scope", "General Counsel", "Today", "Moderate"],
        ["Bound", "Define sanctioned AI tool use", "CIO / CTO", "48 hours", "Moderate"],
        ["Gate", "Require human review before reuse", "COO", "Immediate", "High"],
        ["Record", "Create AI-use evidence trail", "CISO / vCISO", "72 hours", "Moderate"]
      ]
    },
    identity: {
      label: "Identity Escalation",
      title: "Compromised executive identity escalation",
      rawSignal: "Privileged role assignment request occurs shortly after anomalous executive sign-in behavior.",
      narrative: "Possible executive identity compromise with attempted privilege escalation and material governance implications.",
      confidence: "High",
      escalation: "Critical",
      owner: "CEO / President",
      timeline: [
        { time: "07:46", title: "Anomalous sign-in", body: "Executive account authenticates from unusual network conditions." },
        { time: "07:52", title: "Privilege request", body: "Role elevation request appears inconsistent with normal executive workflow." },
        { time: "08:06", title: "Control boundary concern", body: "Approval path depends on the same identity domain now under suspicion." },
        { time: "08:28", title: "Admissibility failure", body: "CyberShield flags action as not operationally admissible without human verification." },
        { time: "08:55", title: "Decision point", body: "Leadership must confirm identity, freeze privilege changes, and document override decision." }
      ],
      consequences: [
        { title: "Authority Integrity", meaning: "Executive identity is being used to request privileged operational access.", action: "Freeze privilege elevation until verified out of band.", mjc: "MJC validates executive identity controls and escalation gates." },
        { title: "Approval Chain", meaning: "The approval path may be compromised if it relies on the affected identity boundary.", action: "Route decision to alternate executive approval channel.", mjc: "MJC designs dual-control approval paths for high-risk actions." },
        { title: "Operational Control", meaning: "Unauthorized privilege could affect finance, HR, cloud, or vendor systems.", action: "Review recent role changes and revoke suspicious access.", mjc: "MJC performs privileged access review and remediation planning." },
        { title: "Evidence Confidence", meaning: "The organization needs a defensible record of why access was blocked or approved.", action: "Create a decision record with evidence and approver identity.", mjc: "MJC produces audit-ready evidence and decision documentation." }
      ],
      decisions: [
        ["Freeze", "Block privilege elevation pending verification", "CEO / President", "Immediate", "High"],
        ["Verify", "Confirm executive identity out of band", "COO", "Immediate", "High"],
        ["Review", "Audit recent privileged role changes", "CIO / CTO", "Today", "High"],
        ["Document", "Record admissibility decision and evidence", "CISO / vCISO", "Today", "High"]
      ]
    }
  };

  const baseIssues = [
    { id:"backup", title:"Backup validation overdue", detail:"Recovery confidence is degraded until critical workflows are validated against current operational tolerance.", severity:92, urgency:88, age:28, impact:91, compliance:78, confidence:84, trustDrift:13, owner:"COO", decision:"Validate recoverability across priority workflows", state:"Escalation pending", type:"critical" },
    { id:"vendor", title:"Vendor governance review incomplete", detail:"Third-party access remains a material trust dependency without recent evidence of review.", severity:84, urgency:76, age:42, impact:82, compliance:86, confidence:78, trustDrift:18, owner:"CFO", decision:"Complete vendor reassessment cycle", state:"Owner assigned", type:"high" },
    { id:"mfa", title:"MFA enforcement below baseline", detail:"Identity assurance remains below leadership tolerance for privileged and finance-adjacent users.", severity:79, urgency:72, age:17, impact:80, compliance:81, confidence:88, trustDrift:9, owner:"CIO / CTO", decision:"Close privileged-user MFA gap", state:"In progress", type:"high" },
    { id:"policy", title:"AI policy boundary unclear", detail:"AI behavior has outpaced written governance, creating policy lineage and evidence gaps.", severity:75, urgency:70, age:35, impact:76, compliance:83, confidence:70, trustDrift:21, owner:"CISO / vCISO", decision:"Define approved AI tools, prompt boundaries, and review gates", state:"Advisory review needed", type:"high" },
    { id:"ir", title:"IR escalation process untested", detail:"Coordination uncertainty remains elevated until leadership communication paths are exercised.", severity:82, urgency:77, age:63, impact:88, compliance:74, confidence:69, trustDrift:24, owner:"CEO / President", decision:"Run tabletop escalation test", state:"Unresolved", type:"critical" }
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

  const trustNodes = [
    { id:"exec", label:"Executive Authority", sub:"Human in the loop", x:50, y:10 },
    { id:"advisor", label:"Executive Advisor Layer", sub:"Decision structure", x:50, y:30 },
    { id:"workflow", label:"Critical Workflows", sub:"Operational value", x:26, y:46 },
    { id:"identity", label:"Identity Boundary", sub:"Access trust", x:74, y:46 },
    { id:"vendor", label:"Vendor Access", sub:"Third-party trust", x:22, y:70 },
    { id:"ai", label:"AI Use", sub:"Policy boundary", x:50, y:78 },
    { id:"evidence", label:"Evidence Substrate", sub:"Rationale trace", x:78, y:70 }
  ];

  const trustDetails = {
    exec:["Executive Authority","The named leader who owns the decision, risk acceptance, escalation, or override path.","Clarify which decisions require the selected executive role and which can be delegated."],
    advisor:["Executive Advisor Layer","The role-personalized guidance layer that structures leadership judgment without replacing it.","Use role, authority, evidence, and consequence to produce the next best decision."],
    workflow:["Critical Workflows","Business operations that must continue during cyber and AI uncertainty.","Map workflows to owners, systems, vendors, approval gates, and recovery evidence."],
    identity:["Identity Boundary","The trust layer that determines whether people and agents can act.","Validate MFA, privileged access, executive identity, and alternate approval paths."],
    vendor:["Vendor Access","Third-party dependency path that can expand operational exposure.","Review vendor access, contracts, evidence, and continuity obligations."],
    ai:["AI Use","Human and machine activity requiring policy, approval, and evidence lineage.","Define sanctioned tools, prompt boundaries, draft mode, and human approval gates."],
    evidence:["Evidence Substrate","Human-readable and machine-readable records that explain why trust decisions were made.","Capture timestamp, source, confidence, approver, policy, workflow context, and decision rationale."]
  };

  let state = loadState();
  let activeScenario = "phishing";
  let activeReport = reportTypes[0];

  function loadState(){
    try{
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if(current) return current;
      for(const key of LEGACY_STORAGE_KEYS){
        const legacy = JSON.parse(localStorage.getItem(key));
        if(legacy) return migrateLegacyState(legacy);
      }
    }catch(error){
      console.warn("CyberShield state reset", error);
    }
    return { profile:null, memory:[] };
  }

  function migrateLegacyState(legacy){
    if(!legacy.profile) return { profile:null, memory:legacy.memory || [] };
    return {
      profile: {
        ...defaultProfile,
        ...legacy.profile,
        primaryRole: legacy.profile.primaryRole || legacy.profile.owner || "CEO / President",
        additionalRoles: legacy.profile.additionalRoles || [],
        decisionAuthority: legacy.profile.decisionAuthority || "shared",
        reportingAudience: legacy.profile.reportingAudience || "executive",
        artifactState: legacy.profile.artifactState || "partial",
        activeRole: legacy.profile.activeRole || legacy.profile.owner || "CEO / President"
      },
      memory: legacy.memory || []
    };
  }

  function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function getProfile(){ return state.profile || defaultProfile; }
  function isOperational(){ return Boolean(state.profile); }
  function clamp(value,min,max){ return Math.max(min, Math.min(max, value)); }
  function capitalize(value){ return String(value || "").charAt(0).toUpperCase() + String(value || "").slice(1); }
  function normalizeOwner(owner){ return owner || "Unassigned"; }
  function activeRole(){ return getProfile().activeRole || getProfile().primaryRole || "CEO / President"; }
  function activeRoleProfile(){ return roleProfiles[activeRole()] || roleProfiles["CEO / President"]; }

  function init(){
    bindNavigation();
    bindAssessment();
    bindScenarioControls();
    bindReports();
    bindMemory();
    bindDrawerDelegates();
    renderAll();
    showView("briefing");
  }

  function bindNavigation(){
    $("#mobileNavToggle").addEventListener("click",()=>{
      const nav=$("#primaryNav");
      const open=nav.classList.toggle("open");
      $("#mobileNavToggle").setAttribute("aria-expanded",open?"true":"false");
    });
    document.addEventListener("click",event=>{
      const navButton=event.target.closest(".nav-item[data-view]");
      if(navButton) showView(navButton.dataset.view);
      const jumpButton=event.target.closest("[data-view-jump]");
      if(jumpButton) showView(jumpButton.dataset.viewJump);
      const roleButton=event.target.closest("[data-role-view]");
      if(roleButton) setActiveRole(roleButton.dataset.roleView);
    });
    $("#drawerClose").addEventListener("click",()=>$("#advisorDrawer").classList.remove("open"));
  }

  function showView(view){
    $$(".nav-item").forEach(btn=>btn.classList.toggle("active",btn.dataset.view===view));
    $$(".view-panel").forEach(panel=>panel.classList.toggle("active",panel.dataset.viewPanel===view));
    $("#primaryNav").classList.remove("open");
    $("#mobileNavToggle").setAttribute("aria-expanded","false");
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function bindAssessment(){
    $("#startAssessmentBtn").addEventListener("click",()=>$("#assessmentPanel").classList.remove("hidden"));
    $("#cancelAssessmentBtn").addEventListener("click",()=>$("#assessmentPanel").classList.add("hidden"));
    $("#assessmentForm").addEventListener("submit",event=>{
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const profile = Object.fromEntries(form.entries());
      profile.additionalRoles = uniqueRoles([profile.primaryRole, ...form.getAll("additionalRoles")]);
      profile.activeRole = profile.primaryRole;
      profile.demo = false;
      state.profile = profile;
      recordMemory(`Executive Trust Assessment generated for ${state.profile.orgName}`);
      saveState();
      $("#assessmentPanel").classList.add("hidden");
      renderAll();
      showView("briefing");
    });
  }

  function bindScenarioControls(){
    $("#scenarioTabs").addEventListener("click",event=>{
      const tab=event.target.closest("button[data-scenario]");
      if(!tab) return;
      activeScenario=tab.dataset.scenario;
      renderScenarioTabs();
      renderScenario();
    });
  }

  function bindReports(){
    $("#reportList").addEventListener("click",event=>{
      const item=event.target.closest("button[data-report]");
      if(!item) return;
      activeReport=item.dataset.report;
      renderReports();
      openReportAdvisor(activeReport);
    });
    $("#downloadReportBtn").addEventListener("click",downloadReport);
    $("#emailReportBtn").addEventListener("click",emailReport);
  }

  function bindMemory(){
    $("#resetAssessmentBtn").addEventListener("click",()=>{
      state.profile=null;
      recordMemory("Assessment reset by user");
      saveState();
      renderAll();
      showView("briefing");
    });
    $("#clearMemoryBtn").addEventListener("click",()=>{
      state.memory=[];
      saveState();
      renderMemory();
    });
  }

  function bindDrawerDelegates(){
    document.addEventListener("click",event=>{
      const detail=event.target.closest("[data-detail]");
      if(detail && advisors[detail.dataset.detail]) openAdvisor(advisors[detail.dataset.detail]);
    });
  }

  function setActiveRole(role){
    if(!isOperational()) return;
    state.profile.activeRole = role;
    saveState();
    renderAll();
    openAdvisor({
      kicker:"Executive Advisor Layer",
      title:`${role} dashboard selected`,
      meaning:`CyberShield is now framing recommendations through the ${role} decision lens.`,
      why:"One leader may perform multiple roles. CyberShield individualizes the dashboard so the same evidence base produces the right executive view.",
      action:"Review the priorities and recommendation trace for this role before making or delegating the next decision.",
      trace:`Selected role changed to ${role}. Priority weighting now reflects ${roleProfiles[role]?.decisionLens || "the selected leadership lens"}.`,
      mjc:"MJC can validate which decisions belong to each role and produce an executive accountability map."
    });
  }

  function renderAll(){
    document.body.classList.toggle("operational", isOperational());
    renderBriefing();
    renderActions();
    renderScenarioTabs();
    renderScenario();
    renderTrustMap();
    renderReports();
    renderMemory();
    renderSettings();
  }

  function uniqueRoles(roles){
    return Array.from(new Set(roles.filter(Boolean)));
  }

  function selectedRoles(){
    const p=getProfile();
    return uniqueRoles([p.primaryRole, ...(Array.isArray(p.additionalRoles)?p.additionalRoles:[])]);
  }

  function scoreModel(){
    if(!isOperational()) return null;
    const p=getProfile();
    const coordinationBase={reactive:48,developing:64,managed:78,resilient:88}[p.coordination]||62;
    const evidenceDelta={low:-12,medium:0,high:9}[p.evidence]||0;
    const artifactDelta={unknown:-8,missing:-14,partial:-5,exists:6}[p.artifactState]||0;
    const workflowDelta={informal:-10,partial:0,defined:8,measured:12}[p.workflow]||0;
    const aiDelta={none:-2,shadow:-10,approved:4,governed:10}[p.aiPosture]||0;
    const authorityDelta={executive:4,shared:1,recommend:-3,oversight:-2}[p.decisionAuthority]||0;
    const trust=clamp(coordinationBase+evidenceDelta+artifactDelta+workflowDelta+authorityDelta,30,96);
    const ai=clamp(56+aiDelta+(p.reviewGoal==="ai"?10:0)+(p.evidence==="high"?6:-2)+(p.artifactState==="exists"?4:-3),26,94);
    const confidence=clamp(52+(p.evidence==="high"?24:p.evidence==="medium"?12:-8)+(p.artifactState==="exists"?9:p.artifactState==="missing"?-10:0)+(p.workflow==="measured"?8:0),20,96);
    const baseExposure={low:[95000,410000],mid:[420000,1900000],high:[1800000,7500000],enterprise:[6500000,28000000]}[p.valueRange]||[420000,1900000];
    const exposureMultiplier=clamp((100-trust)/52 + (p.aiPosture==="shadow"?0.35:0) + (p.evidence==="low"?0.28:0) + (p.artifactState==="missing"?0.32:0), .55, 1.85);
    const exposureRange=`${money(baseExposure[0]*exposureMultiplier)} to ${money(baseExposure[1]*exposureMultiplier)}`;
    return {trust,ai,confidence,exposure:exposureRange};
  }

  function scoreIssue(issue){
    const p=getProfile();
    const role = activeRoleProfile();
    const evidencePenalty=p.evidence==="low"?14:p.evidence==="medium"?7:0;
    const artifactPenalty={unknown:8,missing:16,partial:6,exists:-4}[p.artifactState]||0;
    const coordinationPenalty=p.coordination==="reactive"?12:p.coordination==="developing"?6:p.coordination==="managed"?-3:-8;
    const workflowPenalty=p.workflow==="informal"?13:p.workflow==="partial"?6:p.workflow==="defined"?-2:-6;
    const aiBoost=p.reviewGoal==="ai" && issue.id==="policy"?16:0;
    const vendorBoost=p.reviewGoal==="vendor" && issue.id==="vendor"?16:0;
    const resilienceBoost=p.reviewGoal==="resilience" && ["backup","ir"].includes(issue.id)?10:0;
    const roleBoost=role.priorityBias.includes(issue.id)?12:0;
    return Math.round((issue.severity*.22)+(issue.urgency*.2)+(issue.impact*.22)+(issue.compliance*.1)+(issue.confidence*.08)+(issue.trustDrift*.6)+Math.min(issue.age,70)*.25+evidencePenalty+artifactPenalty+coordinationPenalty+workflowPenalty+aiBoost+vendorBoost+resilienceBoost+roleBoost);
  }

  function rankedIssues(){
    return baseIssues.map(issue=>({...issue,rankScore:scoreIssue(issue)})).sort((a,b)=>b.rankScore-a.rankScore);
  }

  function scenarioForProfile(){
    const p=getProfile();
    if(p.reviewGoal==="ai" || p.aiPosture==="shadow") return "shadowai";
    if(p.reviewGoal==="vendor") return "ransomware";
    if(p.coordination==="reactive") return "identity";
    return activeScenario;
  }

  function renderBriefing(){
    const p=getProfile();
    const scores=scoreModel();
    const sc=scenarios[scenarioForProfile()] || scenarios[activeScenario];
    const top=rankedIssues()[0];
    const role=activeRoleProfile();

    $("#briefingTitle").textContent=isOperational()?`${p.firstName}'s ${role.title}`:"Executive Operational Briefing";
    $("#briefingSubtitle").textContent=isOperational()
      ? `${p.orgName} is being viewed through the ${activeRole()} lens: ${role.focus}.`
      : "Complete the Executive Trust Assessment to replace this sample with a tailored briefing.";

    $("#whatChanged").textContent=sc.narrative;
    $("#whyMatter").textContent=isOperational()
      ? `This matters because ${industryLabel(p.industry)} leadership needs ${role.decisionLens} before uncertainty becomes disruption.`
      : "CyberShield translates simulated signals into executive consequence, decision guidance, confidence, and ownership.";
    $("#escalationLevel").textContent=sc.escalation;
    $("#evidenceLevel").textContent=isOperational()?`${capitalize(p.evidence)} confidence · ${capitalize(p.artifactState)} artifact state`:"Demonstration";
    $("#briefOwner").textContent=normalizeOwner(p.owner||sc.owner);
    $("#decisionRequired").textContent=top?top.decision:sc.decisions[0][1];
    $("#decisionWhy").textContent=isOperational()
      ? `${p.firstName} should decide whether to act, delegate, escalate, or accept the risk for ${p.orgName}.`
      : "Submit inputs to generate an organization-specific decision point.";

    renderRoleSwitcher();

    const metrics=scores?[
      {t:"Operational Trust",v:scores.trust,s:"Trust posture"},
      {t:"AI Governance",v:scores.ai,s:"Control boundary"},
      {t:"Score Confidence",v:scores.confidence,s:"Evidence strength"}
    ]:[];
    const stack=$("#briefingStack");
    stack.innerHTML=isOperational()
      ? metrics.map(m=>metricCard(m.t,m.v,m.s)).join("")+
        `<article class="omega-card exposure-card" data-detail="decision-required"><div class="card-kicker">Estimated operational exposure</div><h3>${scores.exposure}</h3><p>This estimate varies by industry value range, evidence confidence, artifact state, coordination, workflow maturity, AI posture, and selected role. It is advisory-estimate only, not verified loss modeling.</p></article>`
      : sampleCards();
  }

  function renderRoleSwitcher(){
    const container=$("#roleSwitcher");
    if(!container) return;
    if(!isOperational()){
      container.hidden=true;
      container.innerHTML="";
      return;
    }
    const roles=selectedRoles();
    container.hidden=false;
    container.innerHTML=`<div class="card-kicker">Individualized dashboards</div><h3>${getProfile().firstName}'s role views</h3><p>Same evidence base. Different executive lens.</p><div class="role-view-grid">${roles.map(role=>`<button class="role-view ${role===activeRole()?"active":""}" data-role-view="${role}"><strong>${role}</strong><span>${roleProfiles[role]?.decisionLens || "Leadership decision lens"}</span></button>`).join("")}</div>`;
  }

  function sampleCards(){
    return ["Assessment required","No score before submission","Executive Advisor Layer"].map((x,i)=>`<article class="omega-card"><div class="card-kicker">Sample state</div><h3>${x}</h3><p>${i===0?"Complete the assessment to generate tailored operational trust outputs.":i===1?"CyberShield does not show posture values during onboarding.":"CyberShield structures leadership judgment for the named human in the loop."}</p></article>`).join("");
  }

  function metricCard(title,value,subtitle){
    const state=value>=78?"Resilient":value>=60?"Developing":"Elevated";
    const dot=value;
    const color=value>=78?"":value>=60?"amber":"red";
    return `<article class="omega-card metric-card" data-detail="briefing-core"><div class="card-kicker">${subtitle}</div><h3>${title}</h3><div class="metric-value">${value}%</div><div class="heatbar"><span class="heatdot" style="left:${dot}%"></span></div><p><span class="status-dot ${color}"></span>${state}. This score is based on submitted inputs and should be validated through advisory review.</p></article>`;
  }

  function renderActions(){
    const actions=$("#actionQueue");
    actions.innerHTML=rankedIssues().map((issue,index)=>`
      <article class="omega-card action-card ${issue.type}" data-action-id="${issue.id}">
        <div class="card-kicker">Priority ${index+1} · Score ${issue.rankScore}</div>
        <h3>${issue.title}</h3>
        <p>${issue.detail}</p>
        <div class="action-meta">
          <span><strong>Owner</strong><b class="owner-text">${issue.owner}</b></span>
          <span><strong>Governance age</strong>${issue.age} days</span>
          <span><strong>Decision</strong>${issue.decision}</span>
          <span><strong>State</strong>${issue.state}</span>
        </div>
      </article>`).join("");
    $$("[data-action-id]").forEach(card=>card.addEventListener("click",()=>openActionAdvisor(card.dataset.actionId)));
  }

  function renderScenarioTabs(){
    $("#scenarioTabs").innerHTML=Object.entries(scenarios).map(([key,s])=>`<button class="scenario-tab ${key===activeScenario?"active":""}" data-scenario="${key}">${s.label}</button>`).join("");
  }

  function renderScenario(){
    const sc=scenarios[activeScenario];
    if(!sc) return;
    $("#scenarioTitle").textContent=sc.title;
    $("#rawSignal").textContent=sc.rawSignal;
    $("#interpretedSignal").textContent=sc.narrative;
    $("#scenarioTimeline").innerHTML=sc.timeline.map((item,index)=>`<div class="timeline-item" data-timeline-index="${index}"><div class="timeline-time">${item.time}</div><div class="timeline-body"><strong>${item.title}</strong><p>${item.body}</p></div></div>`).join("");
    $("#consequenceGrid").innerHTML=sc.consequences.map((c,index)=>`<article class="omega-card consequence-card" data-consequence-index="${index}"><div class="card-kicker">Organizational consequence</div><h3>${c.title}</h3><p>${c.meaning}</p></article>`).join("");
    $("#decisionTable").innerHTML=`<thead><tr><th>Decision Type</th><th>Action</th><th>Owner</th><th>Timing</th><th>Confidence</th></tr></thead><tbody>${sc.decisions.map(row=>`<tr>${row.map(cell=>`<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>`;
    $$("[data-consequence-index]").forEach(card=>card.addEventListener("click",()=>openConsequenceAdvisor(Number(card.dataset.consequenceIndex))));
    $$("[data-timeline-index]").forEach(item=>item.addEventListener("click",()=>openTimelineAdvisor(Number(item.dataset.timelineIndex))));
  }

  function renderTrustMap(){
    const canvas=$("#trustMapCanvas");
    canvas.innerHTML="";
    const lines=[ [50,10,50,30], [50,30,26,46], [50,30,74,46], [26,46,22,70], [74,46,78,70], [22,70,50,78], [78,70,50,78], [50,30,50,78] ];
    lines.forEach(([x1,y1,x2,y2])=>{
      const dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy), angle=Math.atan2(dy,dx)*180/Math.PI;
      const line=document.createElement("div");
      line.className="trust-line";
      line.style.left=`${x1}%`;
      line.style.top=`${y1}%`;
      line.style.width=`${len}%`;
      line.style.transform=`rotate(${angle}deg)`;
      canvas.appendChild(line);
    });
    trustNodes.forEach(node=>{
      const el=document.createElement("button");
      el.className=`trust-node ${node.id===activeTrustAnchor()?"active":""}`;
      el.style.left=`calc(${node.x}% - 70px)`;
      el.style.top=`calc(${node.y}% - 32px)`;
      el.innerHTML=`<strong>${node.label}</strong><span>${node.sub}</span>`;
      el.addEventListener("click",()=>openTrustNode(node.id));
      canvas.appendChild(el);
    });
  }

  function activeTrustAnchor(){
    const p=getProfile();
    if(p.aiPosture==="shadow" || p.reviewGoal==="ai") return "ai";
    if(p.reviewGoal==="vendor") return "vendor";
    if(activeRole()==="CFO") return "vendor";
    if(activeRole()==="CISO / vCISO") return "evidence";
    return "advisor";
  }

  function renderReports(){
    $("#reportList").innerHTML=reportTypes.map(type=>`<button class="report-item ${type===activeReport?"active":""}" data-report="${type}">${type}</button>`).join("");
    $("#reportPreview").innerHTML=buildReport(activeReport);
  }

  function reportData(type){
    const p=getProfile(), scores=scoreModel(), issues=rankedIssues(), sc=scenarios[scenarioForProfile()] || scenarios[activeScenario], role=activeRoleProfile();
    const data={
      "Executive Risk Summary": {title:`${p.orgName} Executive Risk Summary`, purpose:"Leadership view of current risk posture, decision priorities, and operational exposure.", sections:[`Current organizational risk is ${scores? posture(scores.trust):"pending assessment"}.`, `Selected executive lens: ${activeRole()} - ${role.decisionLens}.`, `Highest risks: ${issues.slice(0,3).map(i=>i.title).join("; ")}.`, `Executive decision required: ${issues[0].decision}.`, `Likely exposure range: ${scores?scores.exposure:"pending assessment"}.`]},
      "Operational Resilience Snapshot": {title:`${p.orgName} Operational Resilience Snapshot`, purpose:"Continuity view of recoverability, escalation readiness, and operational survivability.", sections:["Resilience depends on backup validation, incident escalation rehearsal, and workflow owner clarity.", `Top continuity gap: ${issues.find(i=>i.id==="backup")?.title || issues[0].title}.`, "Recommended cadence: monthly operational resilience review and quarterly executive tabletop.", "Trend interpretation: resilience improves when evidence age declines and ownership is confirmed."]},
      "Governance Drift Report": {title:`${p.orgName} Governance Drift Report`, purpose:"Identifies where policy, evidence, ownership, or behavior has drifted from leadership expectations.", sections:[`Current drift indicator: ${issues.find(i=>i.id==="policy")?.title || "Policy review required"}.`, `Workflow discipline: ${p.workflow}.`, `Evidence confidence: ${p.evidence}.`, `Artifact existence state: ${p.artifactState}.`, "Recommended action: establish an owner-reviewed governance cadence and document exceptions."]},
      "AI Governance Assessment": {title:`${p.orgName} AI Governance Assessment`, purpose:"Advisory-assisted review of AI use, approval gates, prompt boundaries, and evidence lineage.", sections:[`AI posture: ${p.aiPosture}.`, "Key concern: AI usage must remain in draft, recommend-only, or human-approved mode for high-risk workflows.", "Recommended controls: approved tool list, prompt boundary rules, human review gates, and evidence trail.", "Future direction: operational admissibility checks for agentic actions."]},
      "Vendor Governance Review": {title:`${p.orgName} Vendor Governance Review`, purpose:"Assesses third-party trust paths, access concentration, and continuity dependencies.", sections:[`Vendor trust issue: ${issues.find(i=>i.id==="vendor")?.title || "Vendor review cycle required"}.`, "Operational concern: vendor access can become a cyber-to-business disruption path.", "Recommended action: review critical vendor access, contracts, evidence, and continuity obligations.", "MJC support: build a vendor trust matrix and executive review cadence."]},
      "Board Briefing": {title:`${p.orgName} Board Briefing`, purpose:"Board-safe executive narrative focused on business impact, governance posture, and decisions made.", sections:[`Board posture statement: ${scores?`Operational trust is ${scores.trust}% with ${scores.confidence}% score confidence.`:"Assessment not submitted."}`, `Material concern: ${issues[0].title}.`, "Leadership action: validate owners, deadlines, and evidence before the next review cycle.", "Assumption note: outputs are advisory-assisted and based on submitted inputs until validated."]},
      "Incident Readiness Summary": {title:`${p.orgName} Incident Readiness Summary`, purpose:"Readiness view of escalation paths, response coordination, and consequence control.", sections:[`Scenario model: ${sc.title}.`, `Escalation status: ${sc.escalation}.`, "Readiness gap: incident escalation should be exercised before operational disruption occurs.", "Recommended action: run an executive tabletop using the scenario timeline and decision chain."]},
      "Security Roadmap": {title:`${p.orgName} Security Roadmap`, purpose:"30/60/90-day advisory-assisted plan tied to operational trust outcomes.", sections:[`30 days: ${issues[0].decision}.`, `60 days: ${issues[1].decision}.`, "90 days: formalize governance memory, evidence cadence, and executive reporting rhythm.", "Roadmap principle: improve trust state before adding tooling complexity."]}
    };
    return data[type] || data["Executive Risk Summary"];
  }

  function buildReport(type){
    const d=reportData(type);
    const p=getProfile();
    return `<div class="card-kicker">${isOperational()?"Generated from submitted inputs":"Sample output"}</div><h3>${d.title}</h3><p><strong>Purpose:</strong> ${d.purpose}</p><div class="report-section"><strong>Executive Summary</strong><ul>${d.sections.map(s=>`<li>${s}</li>`).join("")}</ul></div><div class="report-section"><strong>Decision Rationale Trace</strong><p>${decisionTrace()}</p></div><div class="report-section"><strong>Prepared for</strong><p>${p.firstName} · ${p.orgName} · ${activeRole()}</p></div><div class="report-section"><strong>Advisory note</strong><p>This report is advisory-assisted. Findings should be validated through evidence review, stakeholder interviews, and governance walkthroughs before formal adoption.</p></div>`;
  }

  function decisionTrace(){
    const p=getProfile();
    const issue=rankedIssues()[0];
    return `CyberShield prioritized "${issue.title}" because of severity, urgency, business impact, governance age, evidence confidence, artifact state, trust drift, and the selected ${activeRole()} decision lens. Recommended owner: ${issue.owner}. Recommended next action: ${issue.decision}.`;
  }

  function renderMemory(){
    const p=getProfile();
    const issues=rankedIssues();
    const memory=state.memory||[];
    const cards=[
      ["Unresolved issue", issues[0].title, `${issues[0].age} days aging · ${issues[0].state}`],
      ["Prior decision", memory[0]||"No prior decision recorded", "Local browser memory"],
      ["Evidence state", `${capitalize(p.evidence)} confidence · ${capitalize(p.artifactState)} artifact`, "Evidence confidence and artifact state drive trust posture"],
      ["Trend direction", trendText(), "Based on coordination, workflow, evidence, and artifact inputs"],
      ["Selected role", activeRole(), activeRoleProfile().focus],
      ["Authority", authorityLabel(p.decisionAuthority), "Used by the Executive Advisor Layer"]
    ];
    $("#memoryGrid").innerHTML=cards.map(c=>`<article class="omega-card"><div class="card-kicker">${c[0]}</div><h3>${c[1]}</h3><p>${c[2]}</p></article>`).join("");
  }

  function renderSettings(){
    const build=$("#buildDetails");
    if(build) build.textContent=`${INTERNAL_BUILD}. Visible product name remains ${PRODUCT_NAME}. Normal users do not need version details; this exists for continuity and handoff only.`;
  }

  function trendText(){
    const p=getProfile();
    if(!isOperational()) return "Pending assessment";
    if(p.coordination==="resilient" && p.evidence==="high" && p.artifactState==="exists") return "Improving";
    if(p.coordination==="reactive" || p.evidence==="low" || p.artifactState==="missing") return "At risk of drift";
    return "Stabilizing";
  }

  function posture(score){ return score>=78?"resilient":score>=60?"developing":"elevated"; }
  function industryLabel(v){ return ({healthcare:"healthcare",finance:"financial services",manufacturing:"manufacturing",professional:"professional services",contractor:"government contractor",retail:"retail or hospitality"}[v]||"organizational"); }
  function authorityLabel(v){ return ({executive:"Can approve executive risk decisions",shared:"Shared approval with another leader",recommend:"Recommends, but does not approve",oversight:"Oversight and reporting only"}[v]||"Not specified"); }
  function money(value){
    const v=Math.round(value);
    if(v>=1000000) return `$${(v/1000000).toFixed(v>=10000000?0:1)}M`;
    return `$${Math.round(v/1000)}K`;
  }

  function recordMemory(entry){
    state.memory = state.memory || [];
    state.memory.unshift(`${new Date().toLocaleString()} - ${entry}`);
    state.memory = state.memory.slice(0,8);
  }

  function openAdvisor(data){
    $("#drawerKicker").textContent=data.kicker;
    $("#drawerTitle").textContent=data.title;
    $("#drawerMeaning").textContent=data.meaning;
    $("#drawerWhy").textContent=data.why;
    $("#drawerAction").textContent=data.action;
    $("#drawerTrace").textContent=data.trace || "Recommendation trace uses selected role, evidence confidence, operational consequence, owner, and next decision.";
    $("#drawerMjc").textContent=data.mjc;
    $("#advisorDrawer").classList.add("open");
  }

  function openActionAdvisor(id){
    const issue=baseIssues.find(i=>i.id===id);
    if(!issue) return;
    openAdvisor({
      kicker:"Executive Advisor Layer",
      title:issue.title,
      meaning:issue.detail,
      why:`This item ranks high because of operational impact, age, confidence, trust drift, and the active ${activeRole()} decision lens. Current state: ${issue.state}.`,
      action:issue.decision,
      trace:`Inputs: severity ${issue.severity}, urgency ${issue.urgency}, impact ${issue.impact}, evidence confidence ${getProfile().evidence}, artifact state ${getProfile().artifactState}, governance age ${issue.age} days, role view ${activeRole()}.`,
      mjc:`MJC can validate the evidence, assign the correct owner, and convert ${issue.title.toLowerCase()} into a practical remediation sprint.`
    });
  }

  function openConsequenceAdvisor(index){
    const c=scenarios[activeScenario].consequences[index];
    openAdvisor({
      kicker:"Organizational consequence",
      title:c.title,
      meaning:c.meaning,
      why:"Executives buy consequence visibility because it translates cyber uncertainty into operational relevance.",
      action:c.action,
      trace:`Scenario: ${scenarios[activeScenario].title}. Confidence: ${scenarios[activeScenario].confidence}. Escalation: ${scenarios[activeScenario].escalation}.`,
      mjc:c.mjc
    });
  }

  function openTimelineAdvisor(index){
    const item=scenarios[activeScenario].timeline[index];
    openAdvisor({
      kicker:"Operational progression",
      title:item.title,
      meaning:item.body,
      why:"Time progression makes the scenario feel operationally real and shows how trust can degrade as conditions evolve.",
      action:"Review the next decision in the scenario table and confirm who owns the response.",
      trace:`Scenario stage ${index+1} of ${scenarios[activeScenario].timeline.length}. This point informs escalation timing and decision ownership.`,
      mjc:"MJC can run this as a tabletop exercise and capture decision evidence for leadership."
    });
  }

  function openTrustNode(id){
    const d=trustDetails[id];
    if(!d) return;
    $("#trustMapDetail").innerHTML=`<div class="card-kicker">Relationship intelligence</div><h3>${d[0]}</h3><p>${d[1]}</p><div class="drawer-block"><strong>Next best action</strong><p>${d[2]}</p></div>`;
    openAdvisor({
      kicker:"Operational TrustMap",
      title:d[0],
      meaning:d[1],
      why:"Trust relationships expose where operational dependencies, approvals, AI involvement, and evidence confidence concentrate risk.",
      action:d[2],
      trace:`Node selected: ${id}. Active role: ${activeRole()}. This node informs the current relationship intelligence view.`,
      mjc:"MJC can validate this relationship map through stakeholder interviews and evidence review."
    });
  }

  function openReportAdvisor(type){
    const d=reportData(type);
    openAdvisor({
      kicker:"Executive reporting",
      title:type,
      meaning:d.purpose,
      why:"Different leadership audiences need different operational artifacts. This report is not a clone of the others.",
      action:"Review the report, download the text, or print/save as PDF for advisory review.",
      trace:decisionTrace(),
      mjc:"MJC can validate the assumptions and convert this output into a board-ready artifact."
    });
  }

  function downloadReport(){
    const text=reportText(activeReport);
    const blob=new Blob([text],{type:"text/plain;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=`CyberShield_${activeReport.replace(/\s+/g,"_")}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function emailReport(){
    const subject=encodeURIComponent(`CyberShield - ${activeReport}`);
    const body=encodeURIComponent(reportText(activeReport));
    window.location.href=`mailto:?subject=${subject}&body=${body}`;
  }

  function reportText(type){
    const d=reportData(type);
    const p=getProfile();
    return `${d.title}\n\nPurpose: ${d.purpose}\n\n${d.sections.map((s,i)=>`${i+1}. ${s}`).join("\n")}\n\nDecision Rationale Trace: ${decisionTrace()}\n\nPrepared for: ${p.firstName} · ${p.orgName} · ${activeRole()}\n\nAdvisory note: This report is advisory-assisted and should be validated through evidence review.`;
  }

  document.addEventListener("DOMContentLoaded", init);
})();