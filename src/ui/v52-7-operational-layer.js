// V52.7 operational behavior has been superseded by the V53 Trust Model and Deep Scenario Spine Build.
// Keep this file as a compatibility import because src/app.js imports it.
// Do not add new UI logic here. V53+ behavior belongs in dedicated UI modules.

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
]).then(() => import('./v53-1-ux-trustmap-recovery.js')).finally(() => {
  window.setInterval = nativeSetInterval;
});
