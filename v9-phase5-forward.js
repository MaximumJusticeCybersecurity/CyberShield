(() => {
  "use strict";

  /**
   * CyberShield legacy V9 Phase 5 compatibility shim.
   *
   * The previous version of this file created a broad MutationObserver on #main
   * and re-rendered roadmap, reports, memory, briefing, settings, and TrustMap
   * enhancements after nearly every DOM mutation and click.  Combined with the
   * later V10 dynamic module loader, that pattern could cause Firefox to report
   * that the page was slowing down the browser.
   *
   * This hotfix keeps the file present for index.html compatibility while
   * preventing the self-feeding observer loop.  The next proper build should
   * consolidate these legacy phase files into a single explicit runtime render
   * lifecycle: cybershield.runtime.js.
   */

  if (window.__CYBERSHIELD_V9_PHASE5_SHIM__) return;
  window.__CYBERSHIELD_V9_PHASE5_SHIM__ = true;

  const BUILD_KEY = "cybershield_v9_completion_state";
  const record = {
    build: "CyberShield V9 Phase 5 Compatibility Shim",
    purpose: "Legacy observer loop disabled for page-load performance",
    completed_at: new Date().toISOString(),
    next_step: "Consolidate V9-V22 modules into a single runtime entrypoint"
  };

  try {
    localStorage.setItem(BUILD_KEY, JSON.stringify(record));
  } catch (error) {
    console.warn("CyberShield V9 shim could not write build record", error);
  }

  document.addEventListener("DOMContentLoaded", () => {
    console.info("CyberShield V9 Phase 5 legacy enhancer disabled to prevent observer-driven browser slowdown.");
  }, { once: true });
})();
