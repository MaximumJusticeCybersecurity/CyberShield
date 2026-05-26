(() => {
  "use strict";

  if (window.__CYBERSHIELD_STABLE_RUNTIME__) return;
  window.__CYBERSHIELD_STABLE_RUNTIME__ = true;

  const BUILD = "CyberShield Emergency Stable Runtime 2026-05-26";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const priorities = [
    ["Runtime governance loop", "Stabilize the prototype so tab changes are instant and no legacy observer loops run", "Owner: Builder", "State: active fix"],
    ["Operational admissibility", "Show whether an AI action should be allowed, blocked, escalated, constrained, or held for evidence", "Owner: Executive", "State: design priority"],
    ["Evidence substrate", "Preserve decision rationale, owner, policy, evidence confidence, and consequence path", "Owner: vCISO / Security SME", "State: next build"],
    ["TrustMap", "Show identities, AI systems, vendors, workflows, and dependencies without pop-up overlays", "Owner: COO / CIO", "State: simplified"],
    ["Executive reports", "Generate board-ready summaries without heavy DOM redraws", "Owner: CEO / Board", "State: lightweight preview"]
  ];

  const reports = [
    "Executive Risk Summary",
    "Operational Resilience Snapshot",
    "Governance Drift Report",
    "AI Governance Assessment",
    "Vendor Governance Review",
    "Board Briefing",
    "Incident Readiness Summary",
    "Security Roadmap"
  ];

  function init() {
    document.body.classList.add("operational");
    bindNavigation();
    renderBriefing();
    renderPriorities();
    renderScenario();
    renderTrustMap();
    renderReports();
    renderMemory();
    renderSettings();
    showView("briefing", false);
    console.info(`${BUILD} loaded. Legacy runtime loops are bypassed.`);
  }

  function bindNavigation() {
    const toggle = $("#mobileNavToggle");
    const nav = $("#primaryNav");

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    document.addEventListener("click", event => {
      const navButton = event.target.closest(".nav-item[data-view]");
      if (navButton) {
        event.preventDefault();
        showView(navButton.dataset.view);
        return;
      }

      const jumpButton = event.target.closest("[data-view-jump]");
      if (jumpButton) {
        event.preventDefault();
        showView(jumpButton.dataset.viewJump);
      }
    });

    const drawerClose = $("#drawerClose");
    if (drawerClose) drawerClose.addEventListener("click", () => $("#advisorDrawer")?.classList.remove("open"));
  }

  function showView(view, scroll = true) {
    const nav = $("#primaryNav");
    const toggle = $("#mobileNavToggle");

    $$(".nav-item[data-view]").forEach(button => {
      button.classList.toggle("active", button.dataset.view === view);
    });

    $$(".view-panel").forEach(panel => {
      panel.classList.toggle("active", panel.dataset.viewPanel === view);
    });

    if (nav) nav.classList.remove("open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    if (scroll) window.scrollTo(0, 0);
  }

  function renderBriefing() {
    setText("#briefingTitle", "CyberShield Executive Operational Briefing");
    setText("#briefingSubtitle", "Emergency stable runtime is active.  The platform is usable while the legacy module stack is consolidated.");
    setText("#whatChanged", "Runtime performance defect isolated");
    setText("#whyMatter", "CyberShield had accumulated too many legacy modules and redraw patterns.  This build prioritizes responsiveness over feature count.");
    setText("#escalationLevel", "High");
    setText("#evidenceLevel", "Direct browser behavior");
    setText("#briefOwner", "Builder");
    setText("#decisionRequired", "Consolidate runtime before adding features");
    setText("#decisionWhy", "A governance platform that freezes under load cannot be trusted by an executive user.");

    const stack = $("#briefingStack");
    if (stack) {
      stack.innerHTML = [
        metricCard("Operational responsiveness", "Priority 1", "Firefox must stop warning that CyberShield is slowing the browser"),
        metricCard("Runtime governance", "Priority 2", "Admissibility, evidence, owner, consequence, and decision trace remain the core product"),
        metricCard("Architecture path", "Priority 3", "Replace V9-V22 modules with one explicit runtime lifecycle")
      ].join("");
    }
  }

  function renderPriorities() {
    const root = $("#actionQueue");
    if (!root) return;
    root.innerHTML = priorities.map((item, index) => `
      <article class="omega-card action-card">
        <div class="card-kicker">Priority ${index + 1}</div>
        <h3>${escapeHtml(item[0])}</h3>
        <p>${escapeHtml(item[1])}</p>
        <div class="action-meta">
          <span><strong>Owner</strong>${escapeHtml(item[2])}</span>
          <span><strong>Status</strong>${escapeHtml(item[3])}</span>
        </div>
      </article>
    `).join("");
  }

  function renderScenario() {
    const tabs = $("#scenarioTabs");
    if (tabs) tabs.innerHTML = `<button class="scenario-tab active">Runtime Stall</button><button class="scenario-tab">Admissibility</button><button class="scenario-tab">Evidence</button>`;
    setText("#scenarioTitle", "Runtime stall caused by legacy module stack");
    setText("#rawSignal", "Firefox reports the page is slowing down the browser.  Tab changes stall or take minutes.");
    setText("#interpretedSignal", "CyberShield must move from stacked experimental modules to a single controlled runtime lifecycle.");

    const timeline = $("#scenarioTimeline");
    if (timeline) {
      timeline.innerHTML = [
        ["1", "Legacy accumulation", "Multiple phase files were loaded into one static page"],
        ["2", "Runtime contention", "DOM mutation and dynamic loading patterns made the browser work too hard"],
        ["3", "Executive impact", "Tabs became slow, which undermines trust in the product"],
        ["4", "Correction", "Emergency runtime bypasses heavy behavior and restores responsiveness"]
      ].map(row => `<div class="timeline-item"><div class="timeline-time">${row[0]}</div><div class="timeline-body"><strong>${row[1]}</strong><p>${row[2]}</p></div></div>`).join("");
    }

    const grid = $("#consequenceGrid");
    if (grid) {
      grid.innerHTML = [
        ["Usability", "The product must respond immediately to tab clicks"],
        ["Trust", "A control plane cannot look unstable"],
        ["Architecture", "One runtime owner, not stacked modules"],
        ["Next build", "Reintroduce features one at a time under explicit render control"]
      ].map(row => `<article class="omega-card consequence-card"><div class="card-kicker">Consequence</div><h3>${row[0]}</h3><p>${row[1]}</p></article>`).join("");
    }

    const table = $("#decisionTable");
    if (table) {
      table.innerHTML = `<thead><tr><th>Decision</th><th>Action</th><th>Owner</th><th>Timing</th></tr></thead><tbody><tr><td>Stabilize</td><td>Disable legacy runtime loops</td><td>Builder</td><td>Now</td></tr><tr><td>Consolidate</td><td>Create one runtime file</td><td>Builder</td><td>Next</td></tr><tr><td>Restore</td><td>Add Runtime, Escalation, TrustMap, Reports under explicit rendering</td><td>Builder</td><td>After stable load</td></tr></tbody>`;
    }
  }

  function renderTrustMap() {
    const canvas = $("#trustMapCanvas");
    if (!canvas) return;
    canvas.innerHTML = [
      ["Executive Authority", "Human owner"],
      ["Runtime Governance", "Pre-execution control"],
      ["AI Action", "Requested execution"],
      ["Evidence Substrate", "Decision record"],
      ["TrustMap", "Dependencies"],
      ["Reports", "Board-ready proof"]
    ].map((node, index) => `<button class="trust-node" style="position:relative;display:inline-flex;margin:8px"><strong>${node[0]}</strong><span>${node[1]}</span></button>`).join("");

    const detail = $("#trustMapDetail");
    if (detail) detail.innerHTML = `<div class="card-kicker">Relationship intelligence</div><h3>Stable TrustMap preview</h3><p>This simplified TrustMap stays visible and avoids overlay drawers.  The next build should restore relationship lines without heavy redraw behavior.</p>`;
  }

  function renderReports() {
    const list = $("#reportList");
    const preview = $("#reportPreview");
    if (!list || !preview) return;

    list.innerHTML = reports.map((report, index) => `<button class="report-item ${index === 0 ? "active" : ""}" data-stable-report="${escapeHtml(report)}">${escapeHtml(report)}</button>`).join("");
    preview.innerHTML = reportPreview(reports[0]);

    list.addEventListener("click", event => {
      const button = event.target.closest("[data-stable-report]");
      if (!button) return;
      $$("[data-stable-report]", list).forEach(item => item.classList.toggle("active", item === button));
      preview.innerHTML = reportPreview(button.dataset.stableReport);
    });
  }

  function reportPreview(title) {
    return `<div class="card-kicker">Executive output</div><h3>${escapeHtml(title)}</h3><p><strong>Purpose:</strong> Show CyberShield’s executive reporting path without heavy legacy rendering.</p><div class="report-section"><strong>Current recommendation</strong><p>Keep the emergency stable runtime active, then rebuild the full feature set into one consolidated runtime.</p></div><div class="report-section"><strong>Decision rationale trace</strong><p>Firefox slowdown proves the stacked prototype architecture is no longer acceptable.  Operational governance requires controlled execution, including inside the product itself.</p></div>`;
  }

  function renderMemory() {
    const grid = $("#memoryGrid");
    if (!grid) return;
    grid.innerHTML = [
      ["Runtime status", "Emergency stable runtime active", "Legacy render loops bypassed"],
      ["Build doctrine", "Operational realism over feature count", "Performance is now a gating requirement"],
      ["Next step", "Consolidated runtime", "One entrypoint, explicit rendering, no broad observers"]
    ].map(card => `<article class="omega-card"><div class="card-kicker">${card[0]}</div><h3>${card[1]}</h3><p>${card[2]}</p></article>`).join("");
  }

  function renderSettings() {
    setText("#buildDetails", `${BUILD}.  Legacy V9-V22 behavior is bypassed for browser stability.  Normal users should not see phase-version complexity.`);
  }

  function metricCard(title, value, text) {
    return `<article class="omega-card metric-card"><div class="card-kicker">${escapeHtml(value)}</div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`;
  }

  function setText(selector, text) {
    const node = $(selector);
    if (node) node.textContent = text;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[char]));
  }

  document.addEventListener("DOMContentLoaded", init, { once: true });
})();
