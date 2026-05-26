(() => {
  "use strict";

  /**
   * CyberShield performance guard
   * Purpose: prevent legacy phase modules from creating self-feeding render loops.
   * This is a stabilization hotfix, not the final architecture.
   */
  if (window.__CYBERSHIELD_PERFORMANCE_GUARD__) return;
  window.__CYBERSHIELD_PERFORMANCE_GUARD__ = true;

  const blockedObservers = [];
  const NativeMutationObserver = window.MutationObserver;

  if (NativeMutationObserver && NativeMutationObserver.prototype) {
    const nativeObserve = NativeMutationObserver.prototype.observe;

    NativeMutationObserver.prototype.observe = function guardedObserve(target, options = {}) {
      const isMainWideObserver =
        target &&
        target.id === "main" &&
        options &&
        options.subtree === true &&
        (options.childList === true || options.characterData === true);

      if (isMainWideObserver) {
        blockedObservers.push({
          target: "#main",
          options: { ...options },
          blockedAt: new Date().toISOString()
        });
        console.warn("CyberShield performance guard blocked broad #main MutationObserver", options);
        return undefined;
      }

      return nativeObserve.call(this, target, options);
    };
  }

  const nativeAppendChild = Element.prototype.appendChild;
  Element.prototype.appendChild = function guardedAppendChild(node) {
    try {
      if (node && node.tagName === "SCRIPT" && typeof node.src === "string" && node.src.includes("?v=")) {
        const clean = node.src.split("?v=")[0];
        console.warn("CyberShield performance guard removed script cache-buster", node.src);
        node.src = clean;
      }
    } catch (error) {
      console.warn("CyberShield performance guard script normalization skipped", error);
    }

    return nativeAppendChild.call(this, node);
  };

  window.CyberShieldPerformanceGuard = {
    version: "2026-05-26-hotfix-1",
    getBlockedObservers: () => blockedObservers.slice(),
    note: "Temporary guard. Replace with consolidated explicit render lifecycle in cybershield.runtime.js."
  };
})();
