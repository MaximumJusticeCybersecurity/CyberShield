(() => {
  "use strict";

  const STORAGE_KEY = "cybershield_executive_os_state";
  const DECISION_KEY = "cybershield_admissibility_decisions";
  const ENDPOINT_KEY = "cybershield_persistence_endpoint";
  const SYNC_LOG_KEY = "cybershield_sync_log";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function init() {
    injectStyles();
    addPersistenceNav();
    addPersistencePanel();
    enhanceSettings();
    bindEvents();
    render();
  }

  function getState() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
  function getProfile() { return getState().profile || {}; }
  function getDecisions() { try { return JSON.parse(localStorage.getItem(DECISION_KEY)) || []; } catch { return []; } }
  function getEndpoint() { return localStorage.getItem(ENDPOINT_KEY) || ""; }
  function getSyncLog() { try { return JSON.parse(localStorage.getItem(SYNC_LOG_KEY)) || []; } catch { return []; } }
  function saveSyncLog(entry) { const log = getSyncLog(); log.unshift({ ...entry, time: new Date().toLocaleString() }); localStorage.setItem(SYNC_LOG_KEY, JSON.stringify(log.slice(0, 10))); }

  function payload() {
    const state = getState();
    const profile = getProfile();
    const decisions = getDecisions();
    return {
      schema_version: "cybershield.persistence.v1",
      created_at: new Date().toISOString(),
      source: "CyberShield Executive OS GitHub Pages",
      profile,
      active_role: profile.activeRole || profile.primaryRole || "Unassigned",
      decisions,
      decision_count: decisions.length,
      local_state: state,
      lead_context: {
        organization: profile.orgName || "",
        contact_first_name: profile.firstName || "",
        role: profile.activeRole || profile.primaryRole || "",
        review_goal: profile.reviewGoal || "",
        evidence_confidence: profile.evidence || "",
        artifact_state: profile.artifactState || "",
        ai_posture: profile.aiPosture || "",
        workflow_maturity: profile.workflow || ""
      },
      advisory_note: "Prototype payload. Validate before using for production governance, legal, audit, or client-facing commitments."
    };
  }

  function injectStyles() {
    if ($("#persistenceStyles")) return;
    const style = document.createElement("style");
    style.id = "persistenceStyles";
    style.textContent = `
      .persistence-grid{display:grid;grid-template-columns:minmax(280px,.9fr) minmax(0,1.1fr);gap:16px;align-items:start}.persistence-card{min-width:0}.endpoint-row{display:grid;gap:10px;margin-top:12px}.endpoint-row input{width:100%;min-height:46px;border-radius:14px;border:1px solid var(--omega-line);background:rgba(4,14,24,.72);color:#fff;padding:10px 12px}.sync-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}.sync-status{border:1px solid var(--omega-line);border-radius:18px;background:rgba(7,27,48,.45);padding:13px;margin-top:12px}.sync-status strong{color:#fff}.sync-status p{color:var(--omega-muted);margin:6px 0 0}.payload-preview{font-family:Consolas,Monaco,ui-monospace,monospace;white-space:pre-wrap;background:rgba(4,14,24,.72);border:1px solid var(--omega-line);border-radius:18px;padding:16px;color:#eaf8ff;overflow:auto;max-height:470px}.sync-log{display:grid;gap:10px;margin-top:14px}.sync-log div{border:1px solid var(--omega-line);border-radius:14px;background:rgba(7,27,48,.44);padding:10px}.sync-log strong{display:block;color:#fff}.sync-log span{display:block;color:var(--omega-muted);font-size:.86rem;margin-top:3px}.settings-persistence{border-color:rgba(66,215,255,.32)!important;background:rgba(66,215,255,.07)!important}@media(max-width:860px){.persistence-grid{grid-template-columns:1fr}.sync-actions{display:grid}.sync-actions button{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function addPersistenceNav() {
    const nav = $("#primaryNav");
    if (!nav || nav.querySelector('[data-view="persistence"]')) return;
    const btn = document.createElement("button");
    btn.className = "nav-item";
    btn.dataset.view = "persistence";
    btn.textContent = "Persistence";
    const settings = nav.querySelector('[data-view="settings"]');
    nav.insertBefore(btn, settings || null);
  }

  function addPersistencePanel() {
    const main = $("#main");
    if (!main || $('[data-view-panel="persistence"]')) return;
    const settings = $('[data-view-panel="settings"]');
    const section = document.createElement("section");
    section.className = "view-panel";
    section.dataset.viewPanel = "persistence";
    section.innerHTML = `
      <div class="section-head operational-only"><span class="boundary-chip live">Persistence Layer</span><h2>Intake Storage & CRM Handoff</h2><p>Prepare assessment and decision records for Google Sheets, MJC follow-up, and future CRM ingestion while keeping the current GitHub Pages build static.</p></div>
      <div class="persistence-grid">
        <article class="omega-card persistence-card"><div class="card-kicker">Connection target</div><h3>Google Apps Script Web App</h3><p>Paste the deployed Apps Script web app URL here. CyberShield will store it locally in this browser and send assessment plus decision payloads when you click sync.</p><div class="endpoint-row"><input id="persistenceEndpoint" placeholder="https://script.google.com/macros/s/.../exec" /></div><div class="sync-actions"><button class="primary-action" id="saveEndpointBtn">Save Endpoint</button><button class="secondary-action" id="syncNowBtn">Sync Payload</button><button class="secondary-action" id="downloadPayloadBtn">Download JSON</button><button class="secondary-action" id="copyPayloadBtn">Copy JSON</button></div><div class="sync-status" id="syncStatus"><strong>Status</strong><p>Not connected yet. Export still works without a web app endpoint.</p></div></article>
        <article class="omega-card persistence-card"><div class="card-kicker">Payload preview</div><h3>Assessment + Decision Records</h3><pre class="payload-preview" id="payloadPreview"></pre></article>
      </div>
      <article class="omega-card" style="margin-top:16px"><div class="card-kicker">Sync history</div><h3>Local Sync Log</h3><div class="sync-log" id="syncLog"></div></article>`;
    main.insertBefore(section, settings || null);
  }

  function enhanceSettings() {
    const grid = $(".settings-grid");
    if (!grid || $("#persistenceSettings")) return;
    const card = document.createElement("article");
    card.className = "omega-card settings-persistence";
    card.id = "persistenceSettings";
    card.innerHTML = `<div class="card-kicker">Persistence path</div><h3>Static-to-storage bridge</h3><p>CyberShield can now export structured JSON locally or send it to a Google Apps Script endpoint for Google Sheets storage. Use the Persistence tab to configure the endpoint.</p><button class="secondary-action" data-view-jump="persistence">Open Persistence</button>`;
    grid.appendChild(card);
  }

  function bindEvents() {
    document.addEventListener("click", event => {
      if (event.target.closest("#saveEndpointBtn")) saveEndpoint();
      if (event.target.closest("#syncNowBtn")) syncNow();
      if (event.target.closest("#downloadPayloadBtn")) downloadPayload();
      if (event.target.closest("#copyPayloadBtn")) copyPayload();
    });
  }

  function render() {
    const endpoint = $("#persistenceEndpoint");
    if (endpoint) endpoint.value = getEndpoint();
    const preview = $("#payloadPreview");
    if (preview) preview.textContent = JSON.stringify(payload(), null, 2);
    const log = $("#syncLog");
    if (log) {
      const entries = getSyncLog();
      log.innerHTML = entries.length ? entries.map(e => `<div><strong>${escapeHtml(e.status)}</strong><span>${escapeHtml(e.time)} · ${escapeHtml(e.message || "")}</span></div>`).join("") : `<div><strong>No sync events yet</strong><span>Sync events will appear here after export or endpoint submission.</span></div>`;
    }
  }

  function saveEndpoint() {
    const value = $("#persistenceEndpoint")?.value.trim() || "";
    localStorage.setItem(ENDPOINT_KEY, value);
    setStatus("Endpoint saved", value ? "CyberShield will use this endpoint for future sync attempts." : "Endpoint cleared. Export-only mode is active.");
    saveSyncLog({ status: "Endpoint updated", message: value ? "Endpoint saved locally" : "Endpoint cleared" });
    render();
  }

  async function syncNow() {
    const endpoint = getEndpoint();
    if (!endpoint) {
      setStatus("No endpoint configured", "Paste and save a Google Apps Script web app URL first, or use Download JSON.");
      saveSyncLog({ status: "Sync skipped", message: "No endpoint configured" });
      render();
      return;
    }
    setStatus("Sync in progress", "Sending assessment and decision payload to configured endpoint.");
    try {
      const response = await fetch(endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload()) });
      setStatus("Payload submitted", "The request was sent. Because Apps Script often uses no-cors mode, confirm the row appeared in Google Sheets.");
      saveSyncLog({ status: "Payload submitted", message: "Request sent to Apps Script endpoint" });
    } catch (error) {
      setStatus("Sync failed", error.message || "Request failed. Check endpoint deployment and permissions.");
      saveSyncLog({ status: "Sync failed", message: error.message || "Unknown error" });
    }
    render();
  }

  function downloadPayload() {
    const blob = new Blob([JSON.stringify(payload(), null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CyberShield_Payload_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    saveSyncLog({ status: "Payload downloaded", message: "JSON export created locally" });
    render();
  }

  function copyPayload() {
    const text = JSON.stringify(payload(), null, 2);
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
    saveSyncLog({ status: "Payload copied", message: "JSON payload copied to clipboard" });
    render();
  }

  function setStatus(title, message) {
    const status = $("#syncStatus");
    if (status) status.innerHTML = `<strong>${escapeHtml(title)}</strong><p>${escapeHtml(message)}</p>`;
  }

  function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c])); }

  const observer = new MutationObserver(() => render());
  document.addEventListener("DOMContentLoaded", () => { init(); const main = $("#main"); if (main) observer.observe(main, { childList: true, subtree: true }); });
})();
