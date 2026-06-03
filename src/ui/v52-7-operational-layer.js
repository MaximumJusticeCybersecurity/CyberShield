// 20260602-2000 Release Train Loader
// Purpose: switch the live TrustMap tab to the new TrustMap Engine runtime path while preserving shell performance and Architecture preview.
// Rule: do not import the legacy stacked TrustMap renderer in this loader.

import './v60-3-21-mobile-load-performance.js';
import './v60-3-23-trustmap-asset-manifest-loader.js';
import './v60-3-22-trustmap-image-prewarm.js';
import './v60-3-24-trustmap-render-lifecycle-controller.js';
import './v60-3-25-asset-optimization-and-format-upgrade.js';
import './v60-3-26-mobile-trustmap-fidelity-mode.js';
import './v60-3-27-no-dead-click-interaction-meaning.js';
import './v60-3-28-model-trace-and-evidence-trust.js';
import './v60-3-29-artifact-trust-scenario-scaffold.js';
import './v60-3-30-release-hardening-and-source-truth.js';
import './20260603-0638-timestamp-governance-runtime-alignment.js';
import './20260603-0648-source-of-truth-drift-guard.js';
import './20260602-1815-architecture-model-library.js';
import './20260602-1930-trustmap-engine-preview-host.js';
import './20260602-2000-trustmap-engine-runtime-host.js';

let cyberShieldBriefingLayerPromise = null;

function cyberShieldIdle(callback){
  if('requestIdleCallback' in window) return window.requestIdleCallback(callback, { timeout: 2200 });
  return window.setTimeout(callback, 900);
}

function cyberShieldLoadBriefingLayer(){
  if(!cyberShieldBriefingLayerPromise){
    cyberShieldBriefingLayerPromise = import('./v60-3-3-first-layer-decision-brief-trustmap-snapshot.js')
      .then(() => import('./v60-3-17-briefing-trustmap-snapshot-image.js'))
      .catch(error => console.warn('CyberShield briefing layer deferred load failed', error));
  }
  return cyberShieldBriefingLayerPromise;
}

function cyberShieldLoadTrustMapStack(){
  return window.CyberShieldTrustMapEngineRuntimeHost202606022000?.render?.('loader-request') || Promise.resolve(null);
}

window.CyberShieldLoadTrustMapStack = cyberShieldLoadTrustMapStack;
window.CyberShieldLoadBriefingLayer = cyberShieldLoadBriefingLayer;

document.addEventListener('click', event => {
  const nav = event.target.closest('#mainNav button[data-view="trustmap"], [data-v6033-route="trustmap"]');
  if(nav) setTimeout(cyberShieldLoadTrustMapStack, 0);
}, true);

window.addEventListener('hashchange', () => {
  if(location.hash === '#trustmap') cyberShieldLoadTrustMapStack();
});

cyberShieldIdle(() => {
  const appVisible = !document.querySelector('#app')?.hidden;
  if(appVisible) cyberShieldLoadBriefingLayer();
  if(document.querySelector('#trustmap.active')) cyberShieldLoadTrustMapStack();
});
