(() => {
  "use strict";

  const STORAGE_KEY = "cybershield_executive_os_state";
  const DECISION_KEY = "cybershield_admissibility_decisions";
  const FINAL_KEY = "cybershield_v9_completion_state";
  const INTERNAL_BUILD = "CyberShield V9 Completion Build";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const roadmapItems = {
    first30: [
      ["Confirm owners", "Assign one accountable executive owner to each top risk and admissibility pattern."],
      ["Validate evidence", "Confirm whether key artifacts exist, are current, and are defensible."],
      ["Run one tabletop", "Use the active scenario to test escalation, communications, and decision records."],
      ["Set AI boundaries", "Define approved AI tools, prompt boundaries, review gates, and draft-mode requirements."]
    ],
    day90: [
      ["Formalize cadence", "Create a monthly executive governance review using priorities, evidence, and owner status."],
      ["Build evidence library", "Connect policies, workflows, decision records, vendor evidence, and recovery proof."],
      ["Stabilize vendor trust", "Review critical vendors, access paths, contracts, and continuity dependencies."],
      ["Exercise recovery", "Validate recovery sequence against workflow dependencies and business tolerance."]
    ],
    year1: [
      ["Institutionalize memory", "Track accepted risks, unresolved issues, decision history, remediation proof, and drift."],
      ["Expand runtime gates", "Move from simulated admissibility to real governance gates for high-risk workflows."],
      ["Board reporting rhythm", "Produce quarterly board-ready summaries with exposure, decisions, and evidence quality."],
      ["Continuous trust scoring", "Refine trust posture using actual telemetry, ownership, and policy lineage."]
    ]
  };

  function init() {
    injectStyles();
    makeOnboardingWizard();
    addCommandCenterStrip();
    addRoadmapView();
    addBriefingExplanations();
    enhanceReports();
    enhanceTrustMap();
    enhanceMemory();
    addSettingsHandoff();
    markCompletion();
    wireObservers();
  }

  function getState() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
  function getProfile() { return getState().profile || { firstName: "Executive", orgName: "Your Organization", activeRole: "CEO / President", primaryRole: "CEO / President", evidence: "medium", artifactState: "partial", coordination: "developing", workflow: "partial", aiPosture: "approved", reviewGoal: "trust" }; }
  function getDecisions() { try { return JSON.parse(localStorage.getItem(DECISION_KEY)) || []; } catch { return []; } }
  function role() { const p = getProfile(); return p.activeRole || p.primaryRole || "CEO / President"; }

  function injectStyles() {
    if ($("#phase5ForwardStyles")) return;
    const style = document.createElement("style");
    style.id = "phase5ForwardStyles";
    style.textContent = `
      .cs-wizard-shell{border:1px solid rgba(66,215,255,.24);border-radius:24px;background:rgba(7,27,48,.54);padding:18px;box-shadow:var(--omega-shadow)}
      .cs-wizard-head{display:grid;gap:8px;margin-bottom:14px}.cs-wizard-kicker{color:var(--omega-cyan);font-size:.78rem;font-weight:900;text-transform:uppercase;letter-spacing:.08em}.cs-wizard-head h3{margin:0;color:#fff}.cs-wizard-head p{margin:0;color:var(--omega-muted);max-width:660px}.cs-progress{height:8px;border-radius:999px;background:rgba(255,255,255,.09);overflow:hidden}.cs-progress span{display:block;height:100%;width:20%;background:linear-gradient(90deg,var(--omega-cyan),var(--omega-green));transition:width .2s ease}.cs-wizard-page{display:none}.cs-wizard-page.active{display:block}.cs-wizard-page .form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}.cs-wizard-actions{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:16px;flex-wrap:wrap}.cs-wizard-actions div{display:flex;gap:10px;flex-wrap:wrap}.cs-step-status{color:var(--omega-muted);font-size:.88rem}
      .cs-command-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:0 0 18px}.cs-command-tile{border:1px solid var(--omega-line);border-radius:18px;background:rgba(7,27,48,.46);padding:13px;min-width:0}.cs-command-tile strong{display:block;color:#fff}.cs-command-tile span{display:block;color:var(--omega-muted);font-size:.86rem;margin-top:4px}.cs-command-tile b{color:var(--omega-cyan);font-size:1.2rem}
      .cs-brief-explain{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:12px}.cs-brief-explain article{border:1px solid var(--omega-line);border-radius:18px;background:rgba(7,27,48,.45);padding:13px}.cs-brief-explain strong{display:flex;justify-content:space-between;align-items:center;color:#fff;gap:8px}.cs-brief-explain b{border-radius:999px;padding:6px 9px;font-size:.78rem}.cs-brief-explain p{margin:8px 0 0;color:var(--omega-muted);font-size:.88rem}.cs-warn b{color:#ffd166;background:rgba(255,209,102,.12);border:1px solid rgba(255,209,102,.26)}.cs-info b{color:#42d7ff;background:rgba(66,215,255,.12);border:1px solid rgba(66,215,255,.26)}.cs-good b{color:#7ee6a2;background:rgba(126,230,162,.12);border:1px solid rgba(126,230,162,.26)}
      .roadmap-stage{display:grid;grid-template-columns:210px minmax(0,1fr);gap:14px;margin-bottom:14px}.roadmap-stage header{border:1px solid var(--omega-line);border-radius:18px;background:rgba(66,215,255,.08);padding:15px}.roadmap-stage header h3{margin:0;color:#fff}.roadmap-stage header p{margin:8px 0 0;color:var(--omega-muted)}.roadmap-items{display:grid;gap:10px}.roadmap-item{border:1px solid var(--omega-line);border-radius:18px;background:rgba(7,27,48,.44);padding:14px}.roadmap-item strong{color:#fff}.roadmap-item p{margin:6px 0 0;color:var(--omega-muted)}
      .trustmap-legend{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.legend-chip{border:1px solid rgba(66,215,255,.35);border-radius:999px;padding:7px 10px;background:rgba(66,215,255,.1);color:#fff;font-weight:800;font-size:.78rem}.trustmap-maturity{border:1px solid rgba(126,230,162,.28);border-radius:18px;background:rgba(126,230,162,.07);padding:13px;margin-top:12px}.trustmap-maturity strong{color:#fff}.trustmap-maturity p{color:var(--omega-muted);margin:6px 0 0}
      .report-upgrade,.cs-proof-pack{border:1px solid rgba(126,230,162,.28);border-radius:18px;background:rgba(126,230,162,.08);padding:14px;margin-top:14px}.proof-pack-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:10px}.proof-pack-grid div{border:1px solid var(--omega-line);border-radius:14px;background:rgba(7,27,48,.45);padding:10px}.proof-pack-grid strong{display:block;color:#fff}.proof-pack-grid span{color:var(--omega-muted);font-size:.86rem}.cs-report-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}
      .handoff-list,.cs-validation-list{display:grid;gap:8px;margin-top:12px}.handoff-list span,.cs-validation-list span{border:1px solid var(--omega-line);border-radius:14px;background:rgba(7,27,48,.44);padding:10px;color:var(--omega-muted)}.cs-complete{border-color:rgba(126,230,162,.32)!important;background:rgba(126,230,162,.08)!important}.cs-memory-summary{border:1px solid rgba(66,215,255,.3);border-radius:18px;background:rgba(66,215,255,.07);padding:14px;margin-bottom:14px}.cs-memory-summary strong{color:#fff}.cs-memory-summary p{color:var(--omega-muted);margin:6px 0 0}
      @media(max-width:900px){.cs-command-strip,.proof-pack-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:760px){.cs-brief-explain,.roadmap-stage,.cs-command-strip,.proof-pack-grid{grid-template-columns:1fr}.cs-wizard-actions,.cs-wizard-actions div,.cs-report-actions{display:grid;width:100%}.cs-wizard-actions button,.cs-report-actions button{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function makeOnboardingWizard() {
    const form = $("#assessmentForm");
    if (!form || form.dataset.phase5Wizard === "true") return;
    const grid = $(".form-grid", form);
    const rolePanel = $(".role-checkbox-panel", form);
    const actions = $(".form-actions", form);
    if (!grid || !rolePanel || !actions) return;
    form.dataset.phase5Wizard = "true";
    const labels = $$("label", grid);
    const groups = [
      { title: "Who is this for?", help: "Start with the person and organization. Keep it simple.", nodes: [labels[0], labels[1]] },
      { title: "What role do they hold?", help: "This creates the first personalized executive lens.", nodes: [labels[2], labels[3], labels[4]] },
      { title: "What environment are we reviewing?", help: "CyberShield uses this for business context and exposure framing.", nodes: [labels[5], labels[6], labels[7]] },
      { title: "How strong is the evidence?", help: "Evidence and artifact quality drive confidence, priority, and decision language.", nodes: [labels[8], labels[9], labels[10], labels[11], labels[12], labels[13]] },
      { title: "Does this leader wear multiple hats?", help: "Add only the extra dashboards this human in the loop actually needs.", nodes: [rolePanel] }
    ];
    const shell = document.createElement("div");
    shell.className = "cs-wizard-shell";
    shell.innerHTML = `<div class="cs-wizard-head"><span class="cs-wizard-kicker" id="csWizardKicker">Step 1 of 5</span><h3 id="csWizardTitle"></h3><p id="csWizardHelp"></p><div class="cs-progress"><span id="csWizardProgress"></span></div></div><div id="csWizardPages"></div><div class="cs-wizard-actions"><span class="cs-step-status" id="csWizardStatus"></span><div><button type="button" class="secondary-action" id="csWizardBack">Back</button><button type="button" class="primary-action" id="csWizardNext">Continue</button><button type="submit" class="primary-action" id="csWizardSubmit">Generate Executive Operating View</button></div></div>`;
    const pages = $("#csWizardPages", shell);
    groups.forEach((group, index) => {
      const page = document.createElement("div");
      page.className = "cs-wizard-page";
      page.dataset.step = String(index);
      const inner = document.createElement("div");
      inner.className = "form-grid";
      group.nodes.filter(Boolean).forEach(node => inner.appendChild(node));
      page.appendChild(inner);
      pages.appendChild(page);
    });
    grid.replaceWith(shell);
    actions.remove();
    let step = 0;
    const render = () => {
      step = Math.max(0, Math.min(groups.length - 1, step));
      $$(".cs-wizard-page", shell).forEach((page, i) => page.classList.toggle("active", i === step));
      $("#csWizardKicker", shell).textContent = `Step ${step + 1} of ${groups.length}`;
      $("#csWizardTitle", shell).textContent = groups[step].title;
      $("#csWizardHelp", shell).textContent = groups[step].help;
      $("#csWizardProgress", shell).style.width = `${((step + 1) / groups.length) * 100}%`;
      $("#csWizardStatus", shell).textContent = "No score appears until submission";
      $("#csWizardBack", shell).style.visibility = step === 0 ? "hidden" : "visible";
      $("#csWizardNext", shell).hidden = step === groups.length - 1;
      $("#csWizardSubmit", shell).hidden = step !== groups.length - 1;
    };
    const validate = () => {
      const current = $(`.cs-wizard-page[data-step="${step}"]`, shell);
      const fields = $$("input, select, textarea", current).filter(f => f.type !== "checkbox" && !f.disabled);
      for (const field of fields) { if (!field.checkValidity()) { field.reportValidity(); return false; } }
      return true;
    };
    $("#csWizardBack", shell).addEventListener("click", () => { step -= 1; render(); });
    $("#csWizardNext", shell).addEventListener("click", () => { if (validate()) { step += 1; render(); } });
    render();
  }

  function addCommandCenterStrip() {
    const briefing = $('[data-view-panel="briefing"]');
    const head = briefing?.querySelector(".section-head");
    if (!briefing || !head || $("#csCommandStrip")) return;
    const p = getProfile();
    const decisions = getDecisions();
    const strip = document.createElement("div");
    strip.id = "csCommandStrip";
    strip.className = "cs-command-strip operational-only";
    strip.innerHTML = `<article class="cs-command-tile"><strong>Human in the loop</strong><b>${esc(p.firstName || "Executive")}</b><span>${esc(role())}</span></article><article class="cs-command-tile"><strong>Decision records</strong><b>${decisions.length}</b><span>Saved admissibility decisions</span></article><article class="cs-command-tile"><strong>Evidence state</strong><b>${esc(p.evidence || "medium")}</b><span>${esc(p.artifactState || "partial")} artifact state</span></article><article class="cs-command-tile"><strong>AI posture</strong><b>${esc(p.aiPosture || "approved")}</b><span>Governance boundary signal</span></article>`;
    head.insertAdjacentElement("afterend", strip);
  }

  function addBriefingExplanations() {
    const card = $(".primary-brief");
    const meta = $(".primary-brief .brief-meta");
    if (!card || !meta || $("#csBriefExplain")) return;
    meta.style.display = "none";
    const wrap = document.createElement("div");
    wrap.id = "csBriefExplain";
    wrap.className = "cs-brief-explain";
    card.appendChild(wrap);
    refreshBriefingExplanations();
  }

  function refreshBriefingExplanations() {
    const wrap = $("#csBriefExplain");
    if (!wrap) return;
    const escalation = $("#escalationLevel")?.textContent || "Moderate";
    const evidence = $("#evidenceLevel")?.textContent || "Demonstration";
    const owner = $("#briefOwner")?.textContent || "COO";
    wrap.innerHTML = `<article class="cs-warn"><strong>Escalation <b>${esc(escalation)}</b></strong><p>How quickly leadership attention is needed. Elevated means this is not background telemetry.</p></article><article class="cs-info"><strong>Evidence <b>${esc(evidence)}</b></strong><p>How defensible the recommendation is based on artifact state and confidence.</p></article><article class="cs-good"><strong>Owner <b>${esc(owner)}</b></strong><p>Who is accountable for action, delegation, escalation, or risk acceptance.</p></article>`;
  }

  function addRoadmapView() {
    const nav = $("#primaryNav");
    if (nav && !nav.querySelector('[data-view="roadmap"]')) {
      const btn = document.createElement("button");
      btn.className = "nav-item";
      btn.dataset.view = "roadmap";
      btn.textContent = "Roadmap";
      const reports = nav.querySelector('[data-view="reports"]');
      nav.insertBefore(btn, reports || null);
    }
    const main = $("#main");
    if (!main || $('[data-view-panel="roadmap"]')) return;
    const reports = $('[data-view-panel="reports"]');
    const section = document.createElement("section");
    section.className = "view-panel";
    section.dataset.viewPanel = "roadmap";
    section.innerHTML = `<div class="section-head operational-only"><span class="boundary-chip live">Roadmap Automation</span><h2>30 / 90 / 365-Day Execution Roadmap</h2><p>CyberShield turns executive priorities and admissibility findings into a phased execution path.</p></div><div id="csRoadmap"></div>`;
    main.insertBefore(section, reports || null);
    renderRoadmap();
  }

  function renderRoadmap() {
    const p = getProfile();
    const root = $("#csRoadmap");
    if (!root) return;
    const stages = [["first30", "First 30 Days", "Reduce immediate uncertainty and assign ownership"], ["day90", "Next 90 Days", "Stabilize governance rhythm and evidence quality"], ["year1", "365 Days", "Institutionalize decision memory and runtime governance"]];
    root.innerHTML = stages.map(([key, title, subtitle]) => `<div class="roadmap-stage"><header><h3>${title}</h3><p>${subtitle}</p><p><strong>${esc(p.orgName || "Your Organization")}</strong><br>${esc(role())}</p></header><div class="roadmap-items">${roadmapItems[key].map(([h, b]) => `<div class="roadmap-item"><strong>${h}</strong><p>${b}</p></div>`).join("")}</div></div>`).join("");
    if (!$("#roadmapExportBtn", root)) {
      const actions = document.createElement("div");
      actions.className = "cs-report-actions";
      actions.innerHTML = `<button class="primary-action" id="roadmapExportBtn">Download Roadmap Text</button><button class="secondary-action" id="roadmapCopyBtn">Copy Roadmap Summary</button>`;
      root.appendChild(actions);
      $("#roadmapExportBtn", root).addEventListener("click", () => downloadText("CyberShield_Roadmap.txt", roadmapText()));
      $("#roadmapCopyBtn", root).addEventListener("click", () => copyText(roadmapText()));
    }
  }

  function enhanceReports() {
    const list = $("#reportList");
    const preview = $("#reportPreview");
    if (!list || !preview) return;
    if (!$("#phase5ReportUpgrade")) {
      const btn = document.createElement("button");
      btn.className = "report-item";
      btn.id = "phase5ReportUpgrade";
      btn.textContent = "Board Decision Brief";
      btn.addEventListener("click", () => renderBoardBrief(preview));
      list.appendChild(btn);
    }
    if (!$("#proofPackReport")) {
      const btn = document.createElement("button");
      btn.className = "report-item";
      btn.id = "proofPackReport";
      btn.textContent = "Executive Proof Pack";
      btn.addEventListener("click", () => renderProofPack(preview));
      list.appendChild(btn);
    }
  }

  function renderBoardBrief(preview) {
    const p = getProfile();
    const decisions = getDecisions();
    const content = boardBriefText();
    preview.innerHTML = `<div class="card-kicker">Board Decision Brief</div><h3>${esc(p.orgName || "Organization")} Executive Governance Summary</h3><p>This brief converts CyberShield findings into board-safe language: what matters, who owns it, what evidence supports it, and what decision is needed.</p><div class="report-upgrade"><strong>Current leadership lens</strong><p>${esc(role())}</p></div><div class="report-section"><strong>Material decision pattern</strong><p>${decisions[0] ? esc(decisions[0].outcome + " - " + decisions[0].action) : "No admissibility decision has been saved yet. Save a decision from the Admissibility tab to populate this section."}</p></div><div class="report-section"><strong>Board-ready recommendation</strong><p>Continue building governance before consequence by validating owners, evidence confidence, and runtime decision boundaries before high-impact AI-assisted actions execute.</p></div><div class="cs-report-actions"><button class="primary-action" id="copyBoardBrief">Copy Brief</button><button class="secondary-action" id="downloadBoardBrief">Download Brief</button></div>`;
    $("#copyBoardBrief")?.addEventListener("click", () => copyText(content));
    $("#downloadBoardBrief")?.addEventListener("click", () => downloadText("CyberShield_Board_Decision_Brief.txt", content));
  }

  function renderProofPack(preview) {
    const p = getProfile();
    const decisions = getDecisions();
    const latest = decisions[0];
    const content = proofPackText();
    preview.innerHTML = `<div class="card-kicker">Executive Proof Pack</div><h3>${esc(p.orgName || "Organization")} Governance Before Consequence</h3><p>A compact artifact for showing how CyberShield moves leadership from awareness to decision evidence.</p><div class="cs-proof-pack"><div class="proof-pack-grid"><div><strong>Human in the loop</strong><span>${esc(p.firstName || "Executive")} · ${esc(role())}</span></div><div><strong>Evidence confidence</strong><span>${esc(p.evidence || "medium")} · ${esc(p.artifactState || "partial")}</span></div><div><strong>Latest decision</strong><span>${latest ? esc(latest.outcome) : "No saved decision"}</span></div><div><strong>AI posture</strong><span>${esc(p.aiPosture || "approved")}</span></div><div><strong>Workflow maturity</strong><span>${esc(p.workflow || "partial")}</span></div><div><strong>Governance memory</strong><span>${decisions.length} saved decision record(s)</span></div></div></div><div class="cs-report-actions"><button class="primary-action" id="copyProofPack">Copy Proof Pack</button><button class="secondary-action" id="downloadProofPack">Download Proof Pack</button></div>`;
    $("#copyProofPack")?.addEventListener("click", () => copyText(content));
    $("#downloadProofPack")?.addEventListener("click", () => downloadText("CyberShield_Executive_Proof_Pack.txt", content));
  }

  function enhanceTrustMap() {
    const detail = $("#trustMapDetail");
    if (!detail) return;
    if (!$("#trustLegend", detail)) {
      const legend = document.createElement("div");
      legend.id = "trustLegend";
      legend.className = "trustmap-legend";
      legend.innerHTML = `<span class="legend-chip">Blue: active evaluation</span><span class="legend-chip">Amber: needs executive attention</span><span class="legend-chip">Green: accountable owner</span><span class="legend-chip">Evidence: defensibility path</span>`;
      detail.appendChild(legend);
    }
    if (!$("#trustMaturity", detail)) {
      const maturity = document.createElement("div");
      maturity.id = "trustMaturity";
      maturity.className = "trustmap-maturity";
      maturity.innerHTML = `<strong>TrustMap maturity path</strong><p>Current state is simulated relationship intelligence. Next product step is real evidence ingestion and role-based runtime governance gates.</p>`;
      detail.appendChild(maturity);
    }
  }

  function enhanceMemory() {
    const panel = $('[data-view-panel="memory"]');
    if (!panel || $("#csMemorySummary")) return;
    const decisions = getDecisions();
    const card = document.createElement("article");
    card.id = "csMemorySummary";
    card.className = "cs-memory-summary";
    card.innerHTML = `<strong>Governance memory status</strong><p>CyberShield is currently using local browser memory. Saved admissibility decisions demonstrate the evidence model, but enterprise persistence should move to a backend store or Google Apps Script intake path.</p><p>${decisions.length} saved admissibility decision record(s) detected.</p>`;
    const grid = $("#memoryGrid", panel);
    panel.insertBefore(card, grid || panel.firstChild);
  }

  function addSettingsHandoff() {
    const grid = $(".settings-grid");
    if (!grid) return;
    if (!$("#phase10Handoff")) {
      const card = document.createElement("article");
      card.className = "omega-card cs-complete";
      card.id = "phase10Handoff";
      card.innerHTML = `<div class="card-kicker">Builder continuity</div><h3>Current Build Track</h3><p id="phase10BuildLabel">${INTERNAL_BUILD}. Normal users should not care about version labels.</p><div class="handoff-list"><span>Completed: individualized onboarding</span><span>Completed: Executive Advisor Layer</span><span>Completed: admissibility simulator</span><span>Completed: roadmap, reports, memory, TrustMap polish</span></div>`;
      grid.appendChild(card);
    }
    if (!$("#phase10Validation")) {
      const card = document.createElement("article");
      card.className = "omega-card";
      card.id = "phase10Validation";
      card.innerHTML = `<div class="card-kicker">Validation checklist</div><h3>Post-deploy checks</h3><div class="cs-validation-list"><span>Run onboarding from a cleared browser session</span><span>Submit one executive profile with multiple roles</span><span>Save one admissibility decision to memory</span><span>Open Board Decision Brief and Executive Proof Pack</span><span>Resize desktop, tablet, and phone widths</span></div>`;
      grid.appendChild(card);
    }
  }

  function markCompletion() {
    const record = { build: INTERNAL_BUILD, completed_at: new Date().toISOString(), modules: ["executive-advisor-layer", "guided-onboarding", "runtime-admissibility", "trustmap-polish", "roadmap", "proof-pack", "board-brief", "governance-memory"] };
    try { localStorage.setItem(FINAL_KEY, JSON.stringify(record)); } catch {}
  }

  function wireObservers() {
    let queued = false;
    const refresh = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        addCommandCenterStrip();
        addBriefingExplanations();
        refreshBriefingExplanations();
        renderRoadmap();
        enhanceReports();
        enhanceTrustMap();
        enhanceMemory();
        addSettingsHandoff();
      });
    };
    const main = $("#main");
    if (main) new MutationObserver(refresh).observe(main, { childList: true, subtree: true, characterData: true });
    document.addEventListener("click", refresh);
  }

  function roadmapText() {
    const p = getProfile();
    return `CyberShield 30 / 90 / 365-Day Roadmap\n\nOrganization: ${p.orgName || "Your Organization"}\nLeader: ${p.firstName || "Executive"}\nRole: ${role()}\n\n30 Days\n${roadmapItems.first30.map(([h,b]) => `- ${h}: ${b}`).join("\n")}\n\n90 Days\n${roadmapItems.day90.map(([h,b]) => `- ${h}: ${b}`).join("\n")}\n\n365 Days\n${roadmapItems.year1.map(([h,b]) => `- ${h}: ${b}`).join("\n")}`;
  }

  function boardBriefText() {
    const p = getProfile();
    const d = getDecisions()[0];
    return `CyberShield Board Decision Brief\n\nOrganization: ${p.orgName || "Organization"}\nLeadership Lens: ${role()}\n\nMaterial decision pattern: ${d ? `${d.outcome} - ${d.action}` : "No saved admissibility decision yet"}\n\nRecommendation: Validate owners, evidence confidence, and runtime decision boundaries before high-impact AI-assisted actions execute.\n\nCyberShield does not replace leadership judgment. It structures leadership judgment with evidence, consequence, ownership, and decision records.`;
  }

  function proofPackText() {
    const p = getProfile();
    const decisions = getDecisions();
    return `CyberShield Executive Proof Pack\n\nHuman in the loop: ${p.firstName || "Executive"}\nRole: ${role()}\nOrganization: ${p.orgName || "Organization"}\nEvidence: ${p.evidence || "medium"}\nArtifact state: ${p.artifactState || "partial"}\nAI posture: ${p.aiPosture || "approved"}\nSaved decision records: ${decisions.length}\n\nProof thesis: CyberShield governs before consequence by turning AI and cyber uncertainty into evidence-backed leadership decisions.`;
  }

  function downloadText(filename, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function copyText(text) {
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
  }

  function esc(value) { return String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c])); }

  document.addEventListener("DOMContentLoaded", init);
})();
