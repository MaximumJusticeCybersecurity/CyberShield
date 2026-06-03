import './v60-3-16-trustmap-centerline-fiber-connectors-and-pane-grid.js';
import './v60-3-16-1-trust-kernel-detail-and-stoplight-risk-rows.js';
import './v60-3-20-layer1-visual-consistency-stack-consolidation.js';
import './v60-3-23-layer1-v2-asset-integration.js';

// V60.3.14 TrustMap Background Blend, Oval Highlight, Layer 1 Spacing, and Fiber Optic Connectors
// Current role: preserve connector trust-state behavior while later layers own Layer 1 visual assets and view-mode recovery.
// Boundary: static advisory prototype only. No live scoring, evidence retrieval, workflow automation, or enforcement.

function v60314$(selector, root=document){ return root.querySelector(selector); }
function v60314$$(selector, root=document){ return Array.from(root.querySelectorAll(selector)); }

function v60314ApplyConnectorTrustState(){
  const trustmap = v60314$('#trustmap.active');
  if(!trustmap) return;
  const selected = trustmap.querySelector('.v554-domain.v60312-selected')?.dataset.v554Domain;
  const selectedEl = selected ? trustmap.querySelector(`.v554-domain[data-v554-domain="${selected}"]`) : null;
  const selectedColor = selectedEl ? getComputedStyle(selectedEl).getPropertyValue('--v60313-stoplight').trim() : '';
  v60314$$('.v554-edges line', trustmap).forEach(line => {
    line.style.removeProperty('--v60314-active-fiber');
    if(selectedColor && line.classList.contains('core')){
      line.style.stroke = selectedColor;
      line.style.filter = `drop-shadow(0 0 4px rgba(255,255,255,.95)) drop-shadow(0 0 11px ${selectedColor}) drop-shadow(0 0 28px ${selectedColor})`;
    }
  });
}

function v60314MarkMeta(){
  const payload = v60314$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.trustmap_v60_3_14_connector_layer = {
      status:'active_connector_trust_state_layer',
      rule:'V60.3.14 preserves connector trust-state behavior only. V60.3.20 owns consolidated Layer 1 visual consistency. V60.3.23 v2 integration owns preferred same-size Layer 1 asset candidates.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

function v60314Apply(){
  if(!v60314$('#trustmap.active')) return;
  v60314ApplyConnectorTrustState();
  v60314MarkMeta();
}

function v60314Handlers(){
  if(window.__v60314Handlers) return;
  window.__v60314Handlers = true;
  document.addEventListener('click', () => setTimeout(v60314Apply, 120), true);
}

v60314Handlers();
setTimeout(v60314Apply, 2450);
window.addEventListener('load', () => setTimeout(v60314Apply, 2900), { once:true });
setTimeout(v60314Apply, 3800);
