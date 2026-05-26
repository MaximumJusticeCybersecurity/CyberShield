(() => {
  "use strict";

  const RUNTIME_MODULE = "v22-runtime-control-center.js";

  function loadRuntimeControlCenter() {
    if (document.querySelector(`script[src^="${RUNTIME_MODULE}"]`)) return;
    const script = document.createElement("script");
    script.src = `${RUNTIME_MODULE}?v=${Date.now()}`;
    script.defer = true;
    document.body.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadRuntimeControlCenter);
  } else {
    loadRuntimeControlCenter();
  }
})();
