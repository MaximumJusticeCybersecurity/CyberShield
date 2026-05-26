(() => {
  "use strict";

  if (window.__CYBERSHIELD_V10_STABLE__) return;
  window.__CYBERSHIELD_V10_STABLE__ = true;

  const SESSION_KEY = "cybershield_session_id";

  function ensureSession() {
    try {
      if (!localStorage.getItem(SESSION_KEY)) {
        localStorage.setItem(
          SESSION_KEY,
          `CS-${Date.now()}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`
        );
      }
    } catch (error) {
      console.warn("CyberShield could not initialize local session state", error);
    }
  }

  function addSettingsNotice() {
    const grid = document.querySelector(".settings-grid");
    if (!grid || document.querySelector("#persistenceSettings")) return;

    const card = document.createElement("article");
    card.className = "omega-card settings-persistence";
    card.id = "persistenceSettings";
    card.innerHTML = [
      '<div class="card-kicker">Persistence path</div>',
      '<h3>Performance Stabilized</h3>',
      '<p>Legacy persistence enhancements are paused in this build so the page loads cleanly in Firefox.  Storage and export should move into the consolidated CyberShield runtime.</p>'
    ].join("");
    grid.appendChild(card);
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureSession();
    addSettingsNotice();
    console.info("CyberShield V10 compatibility module loaded in stabilized mode.");
  }, { once: true });
})();
