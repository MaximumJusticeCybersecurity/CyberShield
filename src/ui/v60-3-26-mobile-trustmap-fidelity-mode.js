// V60.3.26 Mobile TrustMap Fidelity Mode
// Purpose: choose stable, standard, or rich TrustMap fidelity without changing product navigation.

function v60326$(selector, root = document){ return root.querySelector(selector); }

function v60326Mode(){
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  const coarse = window.matchMedia?.('(pointer: coarse)')?.matches;
  const narrow = window.innerWidth <= 760;
  const medium = window.innerWidth <= 1100;
  if(reduced || narrow || coarse) return 'stable';
  if(medium) return 'standard';
  return 'rich';
}

function v60326InstallStyles(){
  if(v60326$('#v60-3-26-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-26-style';
  style.textContent = `
    html[data-trustmap-fidelity="stable"] #trustmap.active .v60316-fiber,
    html[data-trustmap-fidelity="stable"] #trustmap.active .v554-edge,
    html[data-trustmap-fidelity="stable"] #trustmap.active .v554-edges line{animation:none!important;filter:none!important;transition:none!important}
    html[data-trustmap-fidelity="stable"] #trustmap.active .v554-world,
    html[data-trustmap-fidelity="stable"] #trustmap.active #v554World{transition:none!important}
    html[data-trustmap-fidelity="stable"] #trustmap.active .v554-map-panel,
    html[data-trustmap-fidelity="stable"] .panel{box-shadow:0 8px 22px rgba(0,0,0,.24)!important}
    html[data-trustmap-fidelity="standard"] #trustmap.active .v60316-fiber{animation-duration:5s!important;filter:none!important}
    html[data-trustmap-fidelity="rich"] #trustmap.active .v60316-fiber{ }
  `;
  document.head.appendChild(style);
}

function v60326Apply(reason = 'init'){
  v60326InstallStyles();
  const mode = v60326Mode();
  document.documentElement.dataset.trustmapFidelity = mode;
  const trustmap = v60326$('#trustmap');
  if(trustmap) trustmap.dataset.trustmapFidelity = mode;
  v60326MarkMeta(reason, mode);
}

function v60326MarkMeta(reason, mode = v60326Mode()){
  const payload = v60326$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.mobile_trustmap_fidelity = {
      build:'V60.3.26 Mobile TrustMap Fidelity Mode',
      mode,
      reason,
      rule:'Stable mode reduces TrustMap animation/filter cost on phones or reduced-motion devices. Standard/rich preserve more visual depth where performance allows.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

window.CyberShieldMobileTrustMapFidelityV60326 = { mode:v60326Mode, apply:v60326Apply };
window.addEventListener('resize', () => setTimeout(() => v60326Apply('resize'), 160));
document.addEventListener('cybershield:trustmap-requested', () => setTimeout(() => v60326Apply('trustmap-requested'), 80));
document.addEventListener('cybershield:trustmap-render-detected', () => setTimeout(() => v60326Apply('trustmap-render-detected'), 80));
v60326Apply('initial-load');
