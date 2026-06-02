// V60.3.9.2 Briefing TrustMap Snapshot Alignment Correction
// Purpose: correct the Briefing tab TrustMap Snapshot, not the full TrustMap workspace.
// Boundary: static advisory UI only. No live scoring, live evidence retrieval, workflow automation, or enforcement.

function v60392$(selector, root = document){ return root.querySelector(selector); }
function v60392$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v60392Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

function v60392InstallStyles(){
  if(v60392$('#v60-3-9-2-briefing-snapshot-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-9-2-briefing-snapshot-style';
  style.textContent = `
    #briefing.active .v6033-layout{align-items:start!important;grid-template-columns:minmax(350px,.95fr) minmax(430px,1.05fr)!important}
    #briefing.active .v6033-map-collapsible{align-self:start!important;display:flex!important;flex-direction:column!important;justify-content:flex-start!important;min-height:0!important}
    #briefing.active .v6033-map-collapsible h2{margin-bottom:6px!important}
    #briefing.active .v6033-map{min-height:292px!important;height:292px!important;margin-top:10px!important;background:radial-gradient(circle at 50% 38%,rgba(66,215,255,.18),transparent 9rem),linear-gradient(145deg,rgba(4,14,24,.99),rgba(5,19,34,.99))!important}
    #briefing.active .v6033-map svg{inset:0!important}
    #briefing.active .v6033-node{font-size:.62rem!important;min-width:64px!important;min-height:64px!important;padding:6px!important}
    #briefing.active .v6033-node.center{left:50%!important;top:39%!important;width:112px!important;height:128px!important;min-width:112px!important;min-height:128px!important;border-radius:0!important;border:0!important;background:transparent!important;box-shadow:none!important;clip-path:none!important;color:#42d7ff!important;overflow:visible!important;padding:0!important}
    #briefing.active .v6033-node.center .v60392-mini-core{position:absolute;inset:0;display:grid;place-items:center;text-align:center;filter:drop-shadow(0 0 10px rgba(66,215,255,.85)) drop-shadow(0 0 24px rgba(66,215,255,.4))}
    #briefing.active .v6033-node.center .v60392-core-shell{position:absolute;inset:0;width:112px;height:128px;z-index:1}
    #briefing.active .v6033-node.center .v60392-core-shell path{fill:rgba(3,13,24,.9);stroke:#42d7ff;stroke-width:3.4;stroke-linejoin:round}
    #briefing.active .v6033-node.center .v60392-core-energy{position:absolute;left:50%;bottom:-20px;transform:translateX(-50%);width:112px;height:28px;border-radius:50%;background:radial-gradient(circle,rgba(66,215,255,.85),rgba(66,215,255,.22) 42%,transparent 74%);box-shadow:0 0 24px rgba(66,215,255,.72);z-index:0}
    #briefing.active .v6033-node.center .v60392-core-copy{position:relative;z-index:2;width:82px;margin-top:4px;font-size:.58rem!important;line-height:1.05!important;color:#dff7ff!important;text-transform:uppercase;letter-spacing:.04em}
    #briefing.active .v6033-node.center .v60392-core-copy strong{display:block;color:#fff;font-size:.7rem!important;line-height:1.02!important;margin-bottom:2px}
    #briefing.active .v6033-node.center .v60392-core-copy small{display:block;color:#6ef4ff;font-size:.52rem!important;line-height:1.05!important;margin-top:2px}
    #briefing.active .v6033-node.n1{left:50%!important;top:11%!important}.v6033-node.n2{left:83%!important;top:30%!important}.v6033-node.n3{left:73%!important;top:70%!important}.v6033-node.n4{left:27%!important;top:70%!important}.v6033-node.n5{left:17%!important;top:30%!important}
    #briefing.active .v6033-gap{bottom:8px!important;font-size:.7rem!important;padding:6px 8px!important;max-width:86%!important;background:rgba(255,76,76,.06)!important}
    #briefing.active .v6033-map .v60392-snapshot-note{position:absolute;left:12px;top:10px;border:1px solid rgba(66,215,255,.26);border-radius:999px;padding:4px 8px;color:#8fd6ff;background:rgba(3,13,24,.72);font-size:.66rem;font-weight:900;text-transform:uppercase;letter-spacing:.06em;z-index:5}
    #briefing.active .v6033-map .v60392-snapshot-score{position:absolute;right:12px;top:10px;border:1px solid rgba(255,209,102,.3);border-radius:999px;padding:4px 8px;color:#ffe7a6;background:rgba(3,13,24,.72);font-size:.66rem;font-weight:900;text-transform:uppercase;letter-spacing:.04em;z-index:5}
    #briefing.active .v6033-boundary{margin-top:10px!important}
    @media(max-width:1050px){#briefing.active .v6033-layout{grid-template-columns:1fr!important}#briefing.active .v6033-map{height:300px!important;min-height:300px!important}}
  `;
  document.head.appendChild(style);
}

function v60392UpgradeSnapshot(){
  const briefing = v60392$('#briefing.active');
  if(!briefing) return;
  const map = v60392$('.v6033-map', briefing);
  const center = v60392$('.v6033-node.center', briefing);
  if(!map || !center) return;
  if(!v60392$('.v60392-snapshot-note', map)){
    const note = document.createElement('div');
    note.className = 'v60392-snapshot-note';
    note.textContent = 'Snapshot';
    map.appendChild(note);
  }
  if(!v60392$('.v60392-snapshot-score', map)){
    const score = document.createElement('div');
    score.className = 'v60392-snapshot-score';
    score.textContent = 'Trust posture';
    map.appendChild(score);
  }
  if(center.dataset.v60392Core === 'true') return;
  center.dataset.v60392Core = 'true';
  center.innerHTML = `<span class="v60392-mini-core"><span class="v60392-core-energy"></span><svg class="v60392-core-shell" viewBox="0 0 112 128" aria-hidden="true"><path d="M56 3 L103 20 L94 91 L56 125 L18 91 L9 20 Z"/></svg><span class="v60392-core-copy"><strong>CyberShield</strong>Core<small>Trust Kernel</small></span></span>`;
}

function v60392CleanBriefingCopy(){
  const briefing = v60392$('#briefing.active');
  if(!briefing) return;
  const snapshotPanel = v60392$('.v6033-map-collapsible', briefing);
  if(!snapshotPanel) return;
  const p = snapshotPanel.querySelector('p.v6033-small');
  if(p) p.textContent = 'Executive snapshot of the CyberShield trust universe.  Use this for orientation, then expand into the full TrustMap for detail.';
  const boundary = snapshotPanel.querySelector('.v6033-boundary strong');
  if(boundary) boundary.textContent = 'Snapshot rule:';
}

function v60392MarkMeta(){
  const payload = v60392$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.9.2 Briefing TrustMap Snapshot Alignment Correction';
    parsed.version = 'V60.3.9.2';
    parsed.previous_operational_build = 'V60.3.9.1 TrustMap Render Stability and Core Anchor Correction';
    parsed.briefing_trustmap_snapshot_alignment = {
      status: 'active',
      rule: 'This correction targets the Briefing tab TrustMap Snapshot only. Full TrustMap behavior remains governed by V60.3.9.1.',
      github_pages_browser_qa_required: true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v60392Apply(){
  v60392InstallStyles();
  v60392UpgradeSnapshot();
  v60392CleanBriefingCopy();
  v60392MarkMeta();
}
function v60392Handlers(){
  if(window.__v60392Handlers) return;
  window.__v60392Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v6033-route],[data-v6033-toggle-map]')) setTimeout(v60392Apply, 450);
  }, true);
}

v60392Handlers();
setTimeout(v60392Apply, 2650);
window.addEventListener('load', () => setTimeout(v60392Apply, 3050), { once:true });
setTimeout(v60392Apply, 3800);
