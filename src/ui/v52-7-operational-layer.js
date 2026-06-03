// 20260603-0638 Release Train Loader
// Purpose: preserve fast shell, TrustMap on-demand loading, asset manifesting, lifecycle tracing, fidelity control, interaction audit, model trace, artifact trust scaffold, release hardening, v2 asset source rewrite, and timestamp governance alignment.

import './20260602-1735-layer1-v2-src-rewrite.js';
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

let cyberShieldTrustMapStackPromise = null;
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
  window.CyberShieldTrustMapLifecycleV60324?.stackLoadStarted?.({ source: 'operational-loader' });
  if(!cyberShieldTrustMapStackPromise){
    cyberShieldTrustMapStackPromise = import('./v55-4-trustmap-registry-consumption.js')
      .then(() => import('./v60-3-12-trustmap-png-asset-integration.js'))
      .then(() => import('./v60-3-13-stoplight-trust-color-and-png-path-recovery.js'))
      .then(() => {
        document.dispatchEvent(new CustomEvent('cybershield:trustmap-stack-loaded'));
      })
      .catch(error => console.warn('CyberShield TrustMap stack deferred load failed', error));
  }
  return cyberShieldTrustMapStackPromise;
}

window.CyberShieldLoadTrustMapStack = cyberShieldLoadTrustMapStack;
window.CyberShieldLoadBriefingLayer = cyberShieldLoadBriefingLayer;

document.addEventListener('click', event => {
  const nav = event.target.closest('#mainNav button[data-view="trustmap"], [data-v6033-route="trustmap"]');
  if(nav){
    window.CyberShieldTrustMapLifecycleV60324?.requestTrustMap?.({ source: 'operational-loader-click' });
    setTimeout(cyberShieldLoadTrustMapStack, 0);
  }
}, true);

window.addEventListener('hashchange', () => {
  if(location.hash === '#trustmap'){
    window.CyberShieldTrustMapLifecycleV60324?.requestTrustMap?.({ source: 'operational-loader-hashchange' });
    cyberShieldLoadTrustMapStack();
  }
});

cyberShieldIdle(() => {
  const appVisible = !document.querySelector('#app')?.hidden;
  if(appVisible) cyberShieldLoadBriefingLayer();
  if(document.querySelector('#trustmap.active')) cyberShieldLoadTrustMapStack();
});
