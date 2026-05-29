// V52.7/V53/V53.1 UI behavior has been superseded by the V54 Enterprise TrustMap Kernel Rebuild.
// Keep this file as the compatibility import because src/app.js imports it.
// V54 is the TrustMap authority. Do not re-enable legacy layer filters, process-flow maps, or stacked TrustMap patches here.

const nativeSetInterval = window.setInterval.bind(window);

window.setInterval = (handler, timeout, ...args) => {
  const source = typeof handler === 'function' ? handler.toString() : String(handler);
  if (timeout === 2000 && source.includes('renderAll')) {
    return 0;
  }
  return nativeSetInterval(handler, timeout, ...args);
};

Promise.all([
  import('./v53-trust-model-spines.js'),
  import('./v53-metadata-patch.js')
]).then(() => import('./v54-enterprise-trustmap-kernel.js')).finally(() => {
  window.setInterval = nativeSetInterval;
});
