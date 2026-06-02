// V60.3.23 Mobile Performance Gate, Image Prewarm, and TrustMap Asset Manifest
// Purpose: keep the faster app shell, warm TrustMap image assets after shell usability, and govern future rebuilt assets through a manifest.
// Boundary: static advisory prototype only. No live scoring, live retrieval beyond static repo JSON/assets, workflow automation, enforcement, or backend persistence.

import './v60-3-21-mobile-load-performance.js';
import './v60-3-23-trustmap-asset-manifest-loader.js';
import './v60-3-22-trustmap-image-prewarm.js';

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
    setTimeout(cyberShieldLoadTrustMapStack, 0);
  }
}, true);

window.addEventListener('hashchange', () => {
  if(location.hash === '#trustmap') cyberShieldLoadTrustMapStack();
});

cyberShieldIdle(() => {
  const appVisible = !document.querySelector('#app')?.hidden;
  if(appVisible) cyberShieldLoadBriefingLayer();
  if(document.querySelector('#trustmap.active')) cyberShieldLoadTrustMapStack();
});
