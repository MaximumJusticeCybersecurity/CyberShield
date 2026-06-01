// V60.3.8 TrustMap Layer 1 Reference Asset Replacement
// Purpose: preserve the original TrustMap shell, scores, core, rings, Layer 2/3 behavior, and replace only Layer 1 asset graphics with reference-style holographic cubes.

const V6038_STATE = { selected: 'cmmc' };
function v6038$(selector, root=document){ return root.querySelector(selector); }
function v6038$$(selector, root=document){ return Array.from(root.querySelectorAll(selector)); }
function v6038Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

const V6038_ASSETS = {
  cloud: { label:'Cloud & Infrastructure', tone:'#14bfff', state:'Good', icon:'cloud', why:'Cloud hosting, infrastructure controls, and network paths support the active trust posture.', gaps:['Cloud-control evidence current','Network exposure context reviewed'], next:'Keep infrastructure evidence attached to the decision record.', controls:['AC.L2-3.1.1','SC.L2-3.13.1','AU.L2-3.3.1'], route:'evidence' },
  identity: { label:'Identities & Access', tone:'#20e889', state:'Good', icon:'identity', why:'Requester identity, access rights, and approval authority support the current posture.', gaps:['Approver authority current','Privilege scope reviewed'], next:'Keep identity evidence attached to the review.', controls:['IA.L2-3.5.1','AC.L2-3.1.2','IA.L2-3.5.2'], route:'evidence' },
  appsData: { label:'Applications & Data', tone:'#b865ff', state:'Needs Verification', icon:'apps', why:'Systems and data require purpose, classification, and owner confirmation before reliance.', gaps:['Data use purpose not verified','Application owner review incomplete','Data classification not confirmed'], next:'Verify application owner, data class, and permitted use before reliance.', controls:['AC.L2-3.1.3','AU.L2-3.3.1','SC.L2-3.13.1'], route:'evidence' },
  ai: { label:'AI Systems & Agents', tone:'#18eaff', state:'Constrained', icon:'ai', why:'AI output and agent behavior require model provenance, input context, and human review before reliance.', gaps:['Model source not verified','Input context incomplete','Human review required'], next:'Review AI-generated analysis before business action.', controls:['RA.L2-3.11.1','CA.L2-3.12.1','AU.L2-3.3.2'], route:'runtime' },
  third: { label:'Third Parties & Vendors', tone:'#ff881a', state:'At Risk', icon:'vendor', why:'Vendor involvement creates external reliance, contractual, and data-use exposure.', gaps:['Vendor evidence incomplete','Contract terms not confirmed','Third-party control evidence missing'], next:'Review vendor evidence and terms before proceeding.', controls:['SR.L2-3.15.1','CA.L2-3.12.3','AC.L2-3.1.20'], route:'evidence' },
  endpoints: { label:'Devices & Endpoints', tone:'#20dfff', state:'Good', icon:'devices', why:'Endpoint and device posture support the action when health and control evidence remain current.', gaps:['Device posture evidence current','Endpoint control state reviewed'], next:'Keep endpoint posture evidence attached to the decision record.', controls:['CM.L2-3.4.1','SI.L2-3.14.1','AC.L2-3.1.5'], route:'evidence' },
  cmmc: { label:'CMMC & Compliance', tone:'#ffd43b', state:'Constrained', icon:'cmmc', why:'This decision has compliance impact that requires additional evidence and control validation.', gaps:['Data use purpose not verified','Audit trail evidence incomplete','Access control evidence missing','Control mapping not confirmed'], next:'Review required controls and provide missing compliance evidence.', controls:['AC.L2-3.1.1','AU.L2-3.3.1','SC.L2-3.13.1'], route:'evidence' }
};

function v6038StateColor(state){
  const s = String(state || '').toLowerCase();
  if(s.includes('good')) return '#20e889';
  if(s.includes('verification')) return '#ffd43b';
  if(s.includes('constrained')) return '#ff881a';
  if(s.includes('risk')) return '#ff3347';
  return '#ffd43b';
}

function v6038InstallStyles(){
  if(v6038$('#v60-3-8-trustmap-reference-assets-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-8-trustmap-reference-assets-style';
  style.textContent = `
    #v6037TrustMap{display:none!important}
    #trustmap.active .v554-shell{grid-template-columns:320px minmax(880px,1fr) 360px!important}
    #trustmap.active .v554-title{font-size:1.75rem!important}
    #trustmap.active .v554-sub{letter-spacing:.08em}
    #trustmap.active .v554-panel:first-child .v554-sub:first-of-type{font-size:0!important}
    #trustmap.active .v554-panel:first-child .v554-sub:first-of-type:after{content:'Real-Time Operational Trust Visibility';font-size:.74rem;color:#8fd6ff}
    #trustmap.active .v554-card p{color:#bfefff;line-height:1.38}
    #trustmap.active .v554-head h2{font-size:1.05rem!important;color:#42d7ff!important}
    #trustmap.active .v554-head h2:after{content:''!important}
    #trustmap.active .v554-head span{font-size:0!important}
    #trustmap.active .v554-head span:after{content:'Decision Trust Universe';font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#76e4a1}
    #trustmap.active .v554-note{font-size:0!important}
    #trustmap.active .v554-note:after{content:'Drag to pan • wheel/buttons to zoom • detail increases as you move outward';font-size:.72rem;color:#8fd6ff}
    #trustmap.active .v554-domain{width:190px!important;min-height:214px!important;transform:translate(-50%,-50%)!important;z-index:35!important;background:transparent!important;border:0!important;box-shadow:none!important;color:var(--v6038-tone,currentColor)!important}
    #trustmap.active .v554-domain .orb{width:156px!important;height:156px!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;display:grid!important;place-items:center!important;margin:0 auto 10px!important;overflow:visible!important;position:relative!important;color:var(--v6038-tone,currentColor)!important}
    #trustmap.active .v554-domain .orb:before,#trustmap.active .v554-domain .orb:after{display:none!important}
    #trustmap.active .v554-domain-label{display:block!important;margin-top:2px!important;color:#fff!important;font-weight:900!important;font-size:1rem!important;line-height:1.15!important;text-align:center!important;text-shadow:0 0 16px rgba(0,0,0,.9),0 0 10px currentColor!important;background:rgba(3,13,24,.45)!important;border-radius:10px!important;padding:4px 7px!important}
    #trustmap.active .v554-status-dot{display:inline-flex!important;position:static!important;margin-top:8px!important;width:auto!important;height:auto!important;border-radius:999px!important;background:transparent!important;box-shadow:none!important;color:var(--v6038-state,#ffd43b)!important;font-size:.72rem!important;font-weight:900!important;text-transform:uppercase!important;gap:7px!important;align-items:center!important;justify-content:center!important}
    #trustmap.active .v554-status-dot:before{content:'';display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--v6038-state,#ffd43b);box-shadow:0 0 10px var(--v6038-state,#ffd43b)}
    #trustmap.active .v554-status-dot:after{content:attr(data-v6038-state)}
    .v6038-cube{width:150px;height:150px;position:relative;margin:0 auto;transform-style:preserve-3d;filter:drop-shadow(0 0 16px var(--v6038-tone,currentColor))}.v6038-cube-shell{position:absolute;inset:8px;border:2px solid var(--v6038-tone,currentColor);border-radius:12px;background:linear-gradient(145deg,color-mix(in srgb,var(--v6038-tone,currentColor) 26%,transparent),rgba(3,13,24,.72));box-shadow:0 0 23px var(--v6038-tone,currentColor),0 0 62px color-mix(in srgb,var(--v6038-tone,currentColor) 34%,transparent),inset 0 0 18px rgba(255,255,255,.08);transform:perspective(520px) rotateX(56deg) rotateZ(-45deg)}.v6038-cube-shell:before,.v6038-cube-shell:after{content:'';position:absolute;inset:0;border:2px solid var(--v6038-tone,currentColor);border-radius:12px;background:rgba(255,255,255,.035)}.v6038-cube-shell:before{transform:translate3d(14px,-14px,-28px);opacity:.78}.v6038-cube-shell:after{transform:translate3d(28px,-28px,-56px);opacity:.45}.v6038-orbit{position:absolute;left:50%;bottom:4px;width:142px;height:38px;border:2px solid var(--v6038-tone,currentColor);border-radius:50%;transform:translateX(-50%);box-shadow:0 0 18px var(--v6038-tone,currentColor);opacity:.85}.v6038-object{position:absolute;left:50%;top:50%;width:106px;height:106px;transform:translate(-50%,-50%);display:grid;place-items:center;color:var(--v6038-tone,currentColor);filter:drop-shadow(0 0 12px var(--v6038-tone,currentColor));z-index:4}.v6038-object svg{width:106px;height:106px;fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}.v6038-object .fill{fill:currentColor;opacity:.14}.v6038-cloud{width:106px;height:78px;position:relative}.v6038-cloud span{position:absolute;border-radius:999px;background:radial-gradient(circle at 35% 25%,#fff,#8eefff 52%,rgba(0,173,255,.18));box-shadow:0 0 22px currentColor}.v6038-cloud .a{left:3px;bottom:16px;width:100px;height:42px}.v6038-cloud .b{left:18px;top:4px;width:48px;height:48px}.v6038-cloud .c{right:7px;top:15px;width:38px;height:38px}.v6038-cloud .stack{position:absolute;left:37px;bottom:0;width:34px;height:34px;border:2px solid currentColor;border-radius:5px;background:rgba(3,13,24,.58);box-shadow:0 0 12px currentColor}.v6038-cloud .stack:before,.v6038-cloud .stack:after{content:'';position:absolute;left:6px;right:6px;height:2px;background:currentColor}.v6038-cloud .stack:before{top:10px}.v6038-cloud .stack:after{top:20px}
    .v6038-selected-panel{border:1px solid rgba(66,215,255,.25);border-radius:16px;background:rgba(255,255,255,.045);padding:13px;margin-top:12px}.v6038-selected-head{display:grid;grid-template-columns:72px 1fr;gap:12px;align-items:center;border-bottom:1px solid rgba(66,215,255,.12);padding-bottom:12px}.v6038-mini{width:68px;height:68px;border:1px solid var(--v6038-tone,#ffd43b);border-radius:12px;background:linear-gradient(145deg,color-mix(in srgb,var(--v6038-tone,#ffd43b) 22%,transparent),rgba(3,13,24,.74));display:grid;place-items:center;box-shadow:0 0 18px var(--v6038-tone,#ffd43b);color:var(--v6038-tone,#ffd43b)}.v6038-mini .v6038-object{position:static;transform:none;width:54px;height:54px}.v6038-mini .v6038-object svg{width:54px;height:54px}.v6038-selected-panel h3{margin:0;color:#fff;font-size:1.1rem}.v6038-state-pill{display:inline-flex;margin-top:6px;border:1px solid var(--v6038-state,#ffd43b);border-radius:999px;padding:4px 8px;color:var(--v6038-state,#ffd43b);font-weight:900;font-size:.72rem;text-transform:uppercase;background:color-mix(in srgb,var(--v6038-state,#ffd43b) 12%,transparent)}.v6038-selected-panel h4{margin:14px 0 7px;color:#aebbd0;text-transform:uppercase;font-size:.82rem;letter-spacing:.05em}.v6038-selected-panel p,.v6038-selected-panel li{color:#dbefff;line-height:1.4;font-size:.86rem}.v6038-selected-panel ul{padding-left:18px}.v6038-selected-panel li::marker{color:var(--v6038-state,#ffd43b)}.v6038-controls{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}.v6038-control{background:rgba(185,204,230,.13);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:7px 9px;color:#fff;font-weight:800;font-size:.76rem}.v6038-actions{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:12px}.v6038-action{border:1px solid rgba(66,215,255,.22);border-radius:10px;background:rgba(255,255,255,.045);color:#dbefff;padding:9px 8px;cursor:pointer;font-size:.8rem}.v6038-action:hover{border-color:#42d7ff;box-shadow:0 0 12px rgba(66,215,255,.24)}
  `;
  document.head.appendChild(style);
}

function v6038Icon(type){
  if(type === 'cloud') return '<div class="v6038-cloud"><span class="a"></span><span class="b"></span><span class="c"></span><i class="stack"></i></div>';
  const icons = {
    identity:'<svg viewBox="0 0 100 100"><rect x="28" y="15" width="44" height="68" rx="9"/><path d="M50 35c-10 0-17 8-17 18M50 35c10 0 17 8 17 18M50 43c-6 0-10 5-10 11M50 43c6 0 10 5 10 11M50 51v22M42 62c-2 6-5 10-10 14M58 62c2 6 5 10 10 14"/></svg>',
    apps:'<svg viewBox="0 0 100 100"><rect x="16" y="18" width="23" height="23" rx="3"/><rect x="48" y="14" width="27" height="27" rx="3"/><rect x="62" y="52" width="22" height="22" rx="3"/><rect x="25" y="58" width="26" height="26" rx="3"/><path d="M39 29h9M61 41v11M62 63H51M38 58V41"/></svg>',
    vendor:'<svg viewBox="0 0 100 100"><rect x="17" y="33" width="66" height="45" rx="8"/><path d="M36 33v-12h28v12M17 49h66M43 58h14"/></svg>',
    cmmc:'<svg viewBox="0 0 100 100"><path d="M50 10l37 27-14 45H27L13 37z"/><path d="M50 22l24 18-9 30H35l-9-30z"/><path d="M50 37l10 8-4 13H44l-4-13z"/><path d="M28 83h44"/><path d="M20 43h60"/></svg>',
    devices:'<svg viewBox="0 0 100 100"><rect x="14" y="23" width="58" height="40" rx="6"/><path d="M35 76h26M48 63v13"/><rect x="64" y="46" width="22" height="37" rx="5"/><path d="M70 76h10"/></svg>',
    ai:'<svg viewBox="0 0 100 100"><path d="M40 15c-13 0-21 11-18 24-10 4-14 19-5 29-2 12 11 22 23 15 6 8 24 8 30-2 12 2 22-8 19-20 8-10 4-25-8-29 1-12-9-22-21-17-7-6-13-5-20 0z"/><path d="M50 18v64M34 36h16M53 36h22M28 56h22M54 58h24"/></svg>'
  };
  return icons[type] || icons.apps;
}

function v6038Cube(asset){
  return `<span class="v6038-cube" style="--v6038-tone:${asset.tone};--v6038-state:${v6038StateColor(asset.state)}"><span class="v6038-cube-shell"></span><span class="v6038-orbit"></span><span class="v6038-object">${v6038Icon(asset.icon)}</span></span>`;
}

function v6038SelectedPanel(asset){
  return `<section class="v6038-selected-panel" style="--v6038-tone:${asset.tone};--v6038-state:${v6038StateColor(asset.state)}"><div class="v6038-selected-head"><div class="v6038-mini"><span class="v6038-object">${v6038Icon(asset.icon)}</span></div><div><h3>${v6038Esc(asset.label)}</h3><span class="v6038-state-pill">${v6038Esc(asset.state)}</span></div></div><h4>Why this matters</h4><p>${v6038Esc(asset.why)}</p><h4>Key gaps</h4><ul>${asset.gaps.map(g=>`<li>${v6038Esc(g)}</li>`).join('')}</ul><h4>Next action</h4><p>${v6038Esc(asset.next)}</p><h4>Related controls</h4><div class="v6038-controls">${asset.controls.map(c=>`<span class="v6038-control">${v6038Esc(c)}</span>`).join('')}<span class="v6038-control">View all (7)</span></div><div class="v6038-actions"><button class="v6038-action" data-v6038-route="evidence">Open Evidence</button><button class="v6038-action" data-v6038-route="architecture">Inspect Trace</button><button class="v6038-action" data-v6038-route="proof">Preview Proof Pack</button><button class="v6038-action" data-v6038-route="runtime">View Controls</button></div></section>`;
}

function v6038CleanProductCopy(){
  const trustmap = v6038$('#trustmap.active');
  if(!trustmap) return;
  const leftSub = trustmap.querySelector('.v554-panel:first-child > .v554-sub');
  if(leftSub) leftSub.textContent = 'Real-Time Operational Trust Visibility';
  const scoreCardP = trustmap.querySelector('.v554-panel:first-child .v554-card p');
  if(scoreCardP) scoreCardP.textContent = 'Fit Map shows the enterprise trust universe. Detail increases as you move outward.';
  const headTitle = trustmap.querySelector('.v554-head h2');
  if(headTitle) headTitle.textContent = 'CyberShield TrustMap';
  const headSub = trustmap.querySelector('.v554-head span');
  if(headSub) headSub.textContent = 'Decision Trust Universe';
}

function v6038ApplyAssets(){
  const trustmap = v6038$('#trustmap.active');
  if(!trustmap) return;
  v6038$('#v6037TrustMap')?.remove();
  v6038$$('.v554-domain', trustmap).forEach(domain => {
    const id = domain.dataset.v554Domain;
    const asset = V6038_ASSETS[id];
    if(!asset) return;
    domain.style.setProperty('--v6038-tone', asset.tone);
    domain.style.setProperty('--v6038-state', v6038StateColor(asset.state));
    domain.dataset.v6038Asset = id;
    const orb = domain.querySelector('.orb');
    const status = domain.querySelector('.v554-status-dot');
    if(orb && orb.dataset.v6038Rendered !== 'true'){
      orb.innerHTML = v6038Cube(asset);
      orb.dataset.v6038Rendered = 'true';
    }
    if(status){ status.dataset.v6038State = asset.state.toUpperCase(); }
  });
}

function v6038UpdateRightPanel(id){
  const trustmap = v6038$('#trustmap.active');
  const asset = V6038_ASSETS[id] || V6038_ASSETS[V6038_STATE.selected] || V6038_ASSETS.cmmc;
  if(!trustmap || !asset) return;
  V6038_STATE.selected = id;
  let panel = trustmap.querySelector('#v6038SelectedPanelHost');
  const rightPanel = trustmap.querySelector('.v554-shell > .v554-panel:last-child');
  if(!rightPanel) return;
  if(!panel){
    panel = document.createElement('div');
    panel.id = 'v6038SelectedPanelHost';
    const firstSection = rightPanel.querySelector('section');
    if(firstSection) firstSection.insertAdjacentElement('afterend', panel); else rightPanel.prepend(panel);
  }
  panel.innerHTML = v6038SelectedPanel(asset);
}

function v6038Route(view){ document.querySelector(`#mainNav button[data-view="${view}"]`)?.click(); }
function v6038MarkMeta(){
  const payload = v6038$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.8 TrustMap Layer 1 Reference Asset Replacement';
    parsed.version = 'V60.3.8';
    parsed.previous_operational_build = 'V60.3.7 TrustMap Reference Layout Renderer';
    parsed.trustmap_layer1_reference_assets = { status:'active_narrow_layer1_replacement', rule:'Restore original TrustMap shell, core, scores, Layer 2/3 behavior, and replace only Layer 1 asset graphics with reference-style holographic cube objects.', github_pages_browser_qa_required:true };
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}
function v6038Apply(){ v6038InstallStyles(); v6038CleanProductCopy(); v6038ApplyAssets(); v6038UpdateRightPanel(V6038_STATE.selected); v6038MarkMeta(); }
function v6038Handlers(){
  if(window.__v6038Handlers) return;
  window.__v6038Handlers = true;
  document.addEventListener('mouseover', e => { const d=e.target.closest('[data-v6038-asset]'); if(d) v6038UpdateRightPanel(d.dataset.v6038Asset); }, true);
  document.addEventListener('focusin', e => { const d=e.target.closest('[data-v6038-asset]'); if(d) v6038UpdateRightPanel(d.dataset.v6038Asset); }, true);
  document.addEventListener('click', e => { const r=e.target.closest('[data-v6038-route]'); if(r){ v6038Route(r.dataset.v6038Route); return; } if(e.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v554-mode],[data-v554-domain],[data-v554-asset],[data-v554-reset]')) setTimeout(v6038Apply, 650); }, true);
}

v6038Handlers();
setTimeout(v6038Apply, 2400);
window.addEventListener('load', () => setTimeout(v6038Apply, 2800), { once:true });
setTimeout(v6038Apply, 3600);
