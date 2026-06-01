// V60.3.9.1 TrustMap Render Stability and Core Anchor Correction
// Purpose: stop TrustMap jitter, keep Layer 1 rendered assets/fallbacks stable, move map upward, and strengthen MJC shield core.
// Boundary: static advisory UI only. No live scoring, live evidence retrieval, workflow automation, or enforcement.

const V60391_STATE = { selected: 'cmmc', trend: 'daily', applying: false, observer: null, queued: false };
const V60391_ASSET_BASE = 'assets/trustmap/layer1/';

function v60391$(selector, root = document){ return root.querySelector(selector); }
function v60391$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v60391Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

const V60391_ASSETS = {
  cloud: { label:'Cloud & Infrastructure', file:'cloud-infrastructure.webp', icon:'cloud', state:'Good', score:78, tone:'#13bfff', assumed:'Cloud logging configuration is assumed, not verified.', why:'Cloud logging, infrastructure exposure, and control evidence affect whether this action can be trusted.', gaps:['Cloud logging evidence','Network exposure context','Control owner confirmation'], controls:['AC.L2-3.1.1','SC.L2-3.13.1','AU.L2-3.3.1'] },
  identity: { label:'Identities & Access', file:'identities-access.webp', icon:'identity', state:'Good', score:81, tone:'#20e889', assumed:'Identity posture is assumed to match the latest access review.', why:'Requester identity, access rights, privilege scope, and approval authority determine action admissibility.', gaps:['Approver authority evidence','Privilege scope confirmation','Recent access review evidence'], controls:['IA.L2-3.5.1','AC.L2-3.1.2','IA.L2-3.5.2'] },
  appsData: { label:'Applications & Data', file:'applications-data.webp', icon:'apps', state:'Needs Verification', score:64, tone:'#b865ff', assumed:'Application logging and access controls are assumed to be properly configured.', why:'Sensitive data flows through applications and services. Missing controls increase unauthorized access or data-loss risk.', gaps:['Application owner review','Data classification','API security testing results','Change management evidence'], controls:['AC.L2-3.1.3','AU.L2-3.3.1','SC.L2-3.13.1'] },
  ai: { label:'AI Systems & Agents', file:'ai-systems-agents.webp', icon:'ai', state:'Constrained', score:59, tone:'#18eaff', assumed:'AI output is assumed to be based on complete and authorized inputs.', why:'AI output and agent behavior require model provenance, input context, tool authority, and human review before reliance.', gaps:['Model source','Prompt and input context','Human review','Tool-use authority'], controls:['RA.L2-3.11.1','CA.L2-3.12.1','AU.L2-3.3.2'] },
  third: { label:'Third Parties & Vendors', file:'third-parties-vendors.webp', icon:'vendor', state:'At Risk', score:42, tone:'#ff881a', assumed:'Vendor proof and contractual terms are assumed incomplete until reviewed.', why:'Vendor involvement creates external reliance, contractual exposure, and third-party data-use risk.', gaps:['Vendor proof','Contract and data-use terms','Third-party control evidence'], controls:['SR.L2-3.15.1','CA.L2-3.12.3','AC.L2-3.1.20'] },
  endpoints: { label:'Devices & Endpoints', file:'devices-endpoints.webp', icon:'devices', state:'Good', score:76, tone:'#20dfff', assumed:'Endpoint health evidence is assumed current.', why:'Endpoint health and device posture affect whether the action or data path can be trusted.', gaps:['Device posture evidence','Endpoint control state','Owner confirmation'], controls:['CM.L2-3.4.1','SI.L2-3.14.1','AC.L2-3.1.5'] },
  cmmc: { label:'CMMC & Compliance', file:'cmmc-compliance.webp', icon:'cmmc', state:'Constrained', score:61, tone:'#ffd43b', assumed:'Control inheritance and audit trail completeness are assumed, not verified.', why:'This decision may affect regulated data use, control inheritance, or required evidence for CMMC and contractual obligations.', gaps:['Data use purpose not verified','Audit trail evidence incomplete','Access control evidence missing','Control mapping not confirmed'], controls:['AC.L2-3.1.1','AU.L2-3.3.1','SC.L2-3.13.1'] }
};

const V60391_TRENDS = {
  daily: { note:'Short-term operational movement over the last 24 hours.', data:[41,44,43,49,58,51,55,63,60,52,48,55,62,76,68,72,88] },
  weekly: { note:'Smoothed weekly movement across recent operational signals.', data:[52,54,56,58,57,60,62,63,65,66,64,67,69,70,71,72,74] },
  monthly: { note:'Broader monthly trust posture trend for executive review.', data:[47,49,52,53,55,58,61,62,64,67,69,70,72,73,74,76,78] }
};

function v60391StateColor(state){
  const s = String(state || '').toLowerCase();
  if(s.includes('good')) return '#20e889';
  if(s.includes('verification')) return '#ffd43b';
  if(s.includes('risk')) return '#ff3347';
  if(s.includes('constrained')) return '#ff881a';
  return '#ffd43b';
}
function v60391Asset(id){ return V60391_ASSETS[id] || V60391_ASSETS[V60391_STATE.selected] || V60391_ASSETS.cloud; }
function v60391AssetSrc(asset){ return `${V60391_ASSET_BASE}${asset.file}`; }

function v60391FallbackSvg(asset){
  const color = encodeURIComponent(asset.tone || '#42d7ff');
  const label = encodeURIComponent(asset.label || 'Trust Asset');
  const icon = encodeURIComponent(asset.icon || 'apps');
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 320'><defs><filter id='g'><feGaussianBlur stdDeviation='4' result='b'/><feMerge><feMergeNode in='b'/><feMergeNode in='SourceGraphic'/></feMerge></filter><radialGradient id='bg' cx='50%' cy='38%' r='55%'><stop offset='0%' stop-color='white' stop-opacity='.28'/><stop offset='50%' stop-color='${decodeURIComponent(color)}' stop-opacity='.22'/><stop offset='100%' stop-color='#020914' stop-opacity='0'/></radialGradient></defs><rect width='320' height='320' fill='none'/><ellipse cx='160' cy='250' rx='78' ry='24' fill='none' stroke='${decodeURIComponent(color)}' stroke-width='4' opacity='.85' filter='url(#g)'/><g transform='translate(160 142) rotate(-45)' filter='url(#g)'><rect x='-66' y='-66' width='132' height='132' rx='16' fill='url(#bg)' stroke='${decodeURIComponent(color)}' stroke-width='5'/><path d='M-42,-42 L-12,-70 L72,-70 L42,-42 Z M42,-42 L72,-70 L72,12 L42,42 Z' fill='${decodeURIComponent(color)}' opacity='.18' stroke='${decodeURIComponent(color)}' stroke-width='3'/></g><g transform='translate(160 142)' filter='url(#g)' fill='none' stroke='${decodeURIComponent(color)}' stroke-linecap='round' stroke-linejoin='round' stroke-width='7'><path d='M-42 12h84a26 26 0 0 0-3-52 42 42 0 0 0-78-7 33 33 0 0 0-3 59z' opacity='${icon==='cloud'?1:0}'/><path d='M-34 -36h68v72h-68z M-18 -14h36 M-18 8h36 M-18 30h36' opacity='${icon==='identity'?1:0}'/><path d='M-46 -46h34v34h-34z M12 -46h34v34H12z M-46 12h34v34h-34z M12 12h34v34H12z M-12 -29h24 M-29 -12v24 M29 -12v24' opacity='${icon==='apps'?1:0}'/><path d='M-20 -50c-30 0-45 30-32 54-16 15-5 46 19 43 12 20 49 18 58-2 24 1 35-31 16-45 10-23-9-50-34-43-8-8-18-10-27-7z M0 -44v88 M-30 -10h62 M-20 18h48' opacity='${icon==='ai'?1:0}'/><path d='M-50 -12h100v58H-50z M-24 -12v-22h48v22 M-50 8h100' opacity='${icon==='vendor'?1:0}'/><path d='M-54 -36h80v56h-80z M-18 44h36 M0 20v24 M28 0h32v58H28z' opacity='${icon==='devices'?1:0}'/><path d='M0 -58l58 42-22 72h-72l-22-72z M0 -32l32 24-12 42h-40l-12-42z' opacity='${icon==='cmmc'?1:0}'/></g><text x='160' y='306' text-anchor='middle' fill='${decodeURIComponent(color)}' font-family='Arial,sans-serif' font-size='15' font-weight='800'>${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function v60391InstallStyles(){
  if(v60391$('#v60-3-9-1-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-9-1-style';
  style.textContent = `
    #trustmap.active .v554-shell{grid-template-columns:320px minmax(900px,1fr) 360px!important;align-items:start!important}
    #trustmap.active .v554-map-panel{align-self:start!important;min-height:720px!important;max-height:780px!important}
    #trustmap.active .v554-viewport{min-height:670px!important}
    #trustmap.active #v554World{top:38%!important;transition:transform .06s linear!important}
    #trustmap.active .v554-head{top:8px!important}
    #trustmap.active .v554-head h2{color:#42d7ff!important}
    #trustmap.active .v554-head span{font-size:0!important}
    #trustmap.active .v554-head span:after{content:'Decision Trust Universe';font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#76e4a1}
    #trustmap.active .v554-note{font-size:0!important}
    #trustmap.active .v554-note:after{content:'Drag to pan • wheel/buttons to zoom • detail increases as you move outward';font-size:.72rem;color:#8fd6ff}
    #trustmap.active .v554-card p{color:#bfefff;line-height:1.38}
    #trustmap.active .v554-domain{width:158px!important;min-height:188px!important;background:transparent!important;border:0!important;box-shadow:none!important;color:var(--v60391-tone,#42d7ff)!important;z-index:35!important;transition:filter .12s ease!important}
    #trustmap.active .v554-domain .orb{width:154px!important;height:138px!important;margin:0 auto 3px!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;display:grid!important;place-items:center!important;overflow:visible!important;color:var(--v60391-tone,#42d7ff)!important}
    #trustmap.active .v554-domain .orb:before,#trustmap.active .v554-domain .orb:after,#trustmap.active .v554-domain .orb .v554-icon{display:none!important}
    #trustmap.active .v60391-layer1-img{width:174px!important;height:174px!important;object-fit:contain!important;display:block!important;filter:drop-shadow(0 0 14px var(--v60391-tone,#42d7ff)) drop-shadow(0 0 24px color-mix(in srgb,var(--v60391-tone,#42d7ff) 34%,transparent));transform:translateY(-15px);transition:transform .12s ease,filter .12s ease;pointer-events:none}
    #trustmap.active .v554-domain:hover .v60391-layer1-img,#trustmap.active .v554-domain:focus-within .v60391-layer1-img{transform:translateY(-15px) scale(1.06);filter:drop-shadow(0 0 20px var(--v60391-tone,#42d7ff)) drop-shadow(0 0 44px color-mix(in srgb,var(--v60391-tone,#42d7ff) 48%,transparent))}
    #trustmap.active .v554-domain-label{display:block!important;color:#fff!important;font-weight:900!important;font-size:.86rem!important;line-height:1.08!important;text-align:center!important;text-shadow:0 0 14px rgba(0,0,0,.94),0 0 9px var(--v60391-tone,#42d7ff)!important;background:rgba(3,13,24,.55)!important;border-radius:9px!important;padding:3px 6px!important;max-width:156px!important;margin:0 auto!important}
    #trustmap.active .v554-status-dot{display:inline-flex!important;position:static!important;margin-top:6px!important;width:auto!important;height:auto!important;border-radius:999px!important;background:transparent!important;box-shadow:none!important;color:var(--v60391-state,#ffd43b)!important;font-size:.66rem!important;font-weight:900!important;text-transform:uppercase!important;gap:6px!important;align-items:center!important;justify-content:center!important}
    #trustmap.active .v554-status-dot:before{content:'';display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--v60391-state,#ffd43b);box-shadow:0 0 10px var(--v60391-state,#ffd43b)}
    #trustmap.active .v554-status-dot:after{content:attr(data-v60391-state)}
    #trustmap.active .v554-kernel{width:222px!important;height:252px!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;clip-path:none!important;padding:0!important;display:grid!important;place-items:center!important;overflow:visible!important;color:#dff7ff!important}
    #trustmap.active .v554-kernel .v60391-core-shell{position:absolute;inset:0;z-index:1;filter:drop-shadow(0 0 12px rgba(66,215,255,.95)) drop-shadow(0 0 34px rgba(66,215,255,.48))}
    #trustmap.active .v554-kernel .v60391-core-shell path{fill:rgba(3,13,24,.86);stroke:#42d7ff;stroke-width:3.4;stroke-linejoin:round}
    #trustmap.active .v554-kernel .v60391-core-energy{position:absolute;left:50%;bottom:-34px;transform:translateX(-50%);width:210px;height:50px;border-radius:50%;background:radial-gradient(circle,rgba(66,215,255,.9),rgba(66,215,255,.24) 42%,transparent 74%);box-shadow:0 0 36px rgba(66,215,255,.78);z-index:0}
    #trustmap.active .v554-kernel .v60391-core-energy:after{content:'';position:absolute;left:50%;top:12px;transform:translateX(-50%);width:152px;height:28px;border:2px solid rgba(66,215,255,.72);border-radius:50%;box-shadow:0 0 22px rgba(66,215,255,.75)}
    #trustmap.active .v554-kernel .v60391-core-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;width:154px;text-align:center;margin-top:6px}
    #trustmap.active .v554-kernel img{width:50px!important;height:auto!important;margin:0 0 4px!important;filter:drop-shadow(0 0 10px #42d7ff)!important}
    #trustmap.active .v554-kernel strong{font-size:1.02rem!important;line-height:1.02!important;color:#fff!important;letter-spacing:.05em!important;text-align:center!important;max-width:145px!important;margin:0!important}
    #trustmap.active .v554-kernel .org{font-size:.62rem!important;line-height:1.1!important;color:#6ef4ff!important;letter-spacing:.035em!important;text-transform:uppercase!important;text-align:center!important;max-width:140px!important;white-space:normal!important;margin-top:5px!important}
    #trustmap.active .v554-kernel small{font-size:.63rem!important;color:#dff7ff!important;letter-spacing:.06em!important;text-transform:uppercase!important;margin-top:5px!important}
    #trustmap.active .v554-shield-mask{opacity:.05!important}
    #trustmap.active .v554-edges .core{stroke-width:6.4!important;opacity:1!important;filter:drop-shadow(0 0 8px rgba(66,215,255,.95)) drop-shadow(0 0 17px rgba(66,215,255,.6))!important}
    .v60391-score-card{border:1px solid rgba(66,215,255,.25);border-radius:18px;background:rgba(255,255,255,.04);padding:14px;margin:0 0 12px;color:#dff7ff}
    .v60391-score-ring{width:146px;height:146px;border-radius:50%;display:grid;place-items:center;margin:12px auto;background:conic-gradient(var(--asset-color,#42d7ff) calc(var(--score)*1%),rgba(255,255,255,.09) 0);position:relative;box-shadow:0 0 22px color-mix(in srgb,var(--asset-color,#42d7ff) 34%,transparent)}
    .v60391-score-ring:before{content:'';position:absolute;inset:18px;border-radius:50%;background:#071426}.v60391-score-ring strong{position:relative;z-index:1;font-size:2rem;color:#fff}
    .v60391-selected-panel{border:1px solid rgba(66,215,255,.25);border-radius:18px;background:rgba(255,255,255,.04);padding:14px;margin-top:12px;color:#dff7ff}
    .v60391-selected-head{display:grid;grid-template-columns:76px 1fr;gap:12px;align-items:center;border-bottom:1px solid rgba(66,215,255,.12);padding-bottom:12px}.v60391-mini{width:72px;height:72px;display:grid;place-items:center;border:1px solid var(--asset-color,#42d7ff);border-radius:14px;background:rgba(3,13,24,.72);box-shadow:0 0 20px var(--asset-color,#42d7ff);overflow:hidden}.v60391-mini img{width:108px;height:108px;object-fit:contain}.v60391-selected-panel h3{margin:0;color:#fff;font-size:1.06rem}.v60391-pill{display:inline-flex;margin-top:6px;border:1px solid var(--asset-state,#ffd43b);border-radius:999px;padding:4px 8px;color:var(--asset-state,#ffd43b);font-weight:900;font-size:.72rem;text-transform:uppercase;background:color-mix(in srgb,var(--asset-state,#ffd43b) 12%,transparent)}.v60391-selected-panel h4{margin:14px 0 7px;color:#aebbd0;text-transform:uppercase;font-size:.82rem;letter-spacing:.05em}.v60391-selected-panel p,.v60391-selected-panel li{color:#dbefff;line-height:1.4;font-size:.86rem}.v60391-selected-panel ul{padding-left:18px;margin:8px 0}.v60391-selected-panel li::marker{color:var(--asset-state,#ffd43b)}.v60391-controls{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}.v60391-control{background:rgba(185,204,230,.13);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:7px 9px;color:#fff;font-weight:800;font-size:.76rem}.v60391-actions{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:12px}.v60391-action{border:1px solid rgba(66,215,255,.22);border-radius:10px;background:rgba(255,255,255,.045);color:#dbefff;padding:9px 8px;cursor:pointer;font-size:.8rem}.v60391-action:hover{border-color:#42d7ff;box-shadow:0 0 12px rgba(66,215,255,.24)}.v60391-trend-note{margin-top:6px;color:#8fd6ff!important;font-size:.78rem!important}
  `;
  document.head.appendChild(style);
}

function v60391Image(asset){
  return `<img class="v60391-layer1-img" src="${v60391AssetSrc(asset)}" data-v60391-fallback="${v60391FallbackSvg(asset)}" alt="${v60391Esc(asset.label)}">`;
}
function v60391ApplyAssets(){
  const trustmap = v60391$('#trustmap.active');
  if(!trustmap) return;
  v60391$$('.v554-domain', trustmap).forEach(domain => {
    const id = domain.dataset.v554Domain;
    const asset = v60391Asset(id);
    if(!asset) return;
    domain.dataset.v60391Asset = id;
    domain.style.setProperty('--v60391-tone', asset.tone);
    domain.style.setProperty('--v60391-state', v60391StateColor(asset.state));
    const orb = domain.querySelector('.orb');
    if(orb && orb.dataset.v60391Rendered !== asset.file){
      orb.innerHTML = v60391Image(asset);
      orb.dataset.v60391Rendered = asset.file;
      const img = orb.querySelector('img');
      img.addEventListener('error', () => { if(img.dataset.v60391Fallback && img.src !== img.dataset.v60391Fallback) img.src = img.dataset.v60391Fallback; }, { once:true });
    }
    const status = domain.querySelector('.v554-status-dot');
    if(status) status.dataset.v60391State = asset.state.toUpperCase();
  });
}

function v60391ApplyCore(){
  const kernel = v60391$('#trustmap.active .v554-kernel');
  if(!kernel || kernel.dataset.v60391Core === 'true') return;
  const logo = kernel.querySelector('img')?.getAttribute('src') || 'assets/mjc-logo-2026.png';
  const org = kernel.querySelector('.org')?.textContent || 'Your Organization';
  kernel.dataset.v60391Core = 'true';
  kernel.innerHTML = `<span class="v60391-core-energy"></span><svg class="v60391-core-shell" viewBox="0 0 220 252" aria-hidden="true"><path d="M110 5 L202 38 L184 180 L110 246 L36 180 L18 38 Z"/></svg><span class="v60391-core-content"><img src="${v60391Esc(logo)}" alt="MJC logo"><strong>CyberShield Core</strong><span class="org">${v60391Esc(org)}</span><small>Trust Kernel</small></span>`;
}

function v60391CleanCopy(){
  const trustmap = v60391$('#trustmap.active');
  if(!trustmap) return;
  const leftSub = trustmap.querySelector('.v554-panel:first-child > .v554-sub');
  if(leftSub) leftSub.textContent = 'Real-Time Operational Trust Visibility';
  const scoreP = trustmap.querySelector('.v554-panel:first-child .v554-card p');
  if(scoreP) scoreP.textContent = 'Fit Map shows the enterprise trust universe. Detail increases as you move outward.';
  const headTitle = trustmap.querySelector('.v554-head h2');
  if(headTitle) headTitle.textContent = 'Enterprise Trust Map';
  const headSub = trustmap.querySelector('.v554-head span');
  if(headSub) headSub.textContent = 'Decision Trust Universe';
}

function v60391UpdateRightScore(id){
  const trustmap = v60391$('#trustmap.active');
  const right = trustmap?.querySelector('.v554-shell > .v554-panel:last-child');
  const first = right?.querySelector('section');
  const asset = v60391Asset(id);
  if(!first || !asset) return;
  first.innerHTML = `<div class="v554-sub">Selected Asset Trust Score</div><section class="v60391-score-card" style="--score:${asset.score};--asset-color:${asset.tone}"><strong>${v60391Esc(asset.label)}</strong><div class="v60391-score-ring"><strong>${asset.score}<span style="font-size:.8rem">/100</span></strong></div><p>This score reflects the selected Layer 1 asset, not the overall operational trust score.</p></section>`;
}
function v60391RenderSelectedPanel(id){
  const trustmap = v60391$('#trustmap.active');
  const right = trustmap?.querySelector('.v554-shell > .v554-panel:last-child');
  const asset = v60391Asset(id);
  if(!right || !asset) return;
  V60391_STATE.selected = id;
  const oldDetail = right.querySelector('.v554-detail');
  if(oldDetail) oldDetail.style.display = 'none';
  let host = right.querySelector('#v60391SelectedAssetPanel');
  if(!host){
    host = document.createElement('section');
    host.id = 'v60391SelectedAssetPanel';
    const first = right.querySelector('section');
    if(first) first.insertAdjacentElement('afterend', host); else right.prepend(host);
  }
  host.className = 'v60391-selected-panel';
  host.style.setProperty('--asset-color', asset.tone);
  host.style.setProperty('--asset-state', v60391StateColor(asset.state));
  const src = v60391AssetSrc(asset);
  host.innerHTML = `<div class="v60391-selected-head"><div class="v60391-mini"><img src="${src}" data-v60391-fallback="${v60391FallbackSvg(asset)}" alt="${v60391Esc(asset.label)}"></div><div><h3>${v60391Esc(asset.label)}</h3><span class="v60391-pill">${v60391Esc(asset.state)}</span></div></div><h4>Model Explanation</h4><p>${v60391Esc(asset.why)}</p><h4>Assumed Activity</h4><p>${v60391Esc(asset.assumed)}</p><h4>Evidence Gaps</h4><ul>${asset.gaps.map(g => `<li>${v60391Esc(g)}</li>`).join('')}</ul><h4>Related Controls</h4><div class="v60391-controls">${asset.controls.map(c => `<span class="v60391-control">${v60391Esc(c)}</span>`).join('')}<span class="v60391-control">View all (7)</span></div><div class="v60391-actions"><button class="v60391-action" data-v60391-route="architecture">Inspect Score</button><button class="v60391-action" data-v60391-route="evidence">Open Evidence</button><button class="v60391-action" data-v60391-route="proof">Preview Proof Pack</button><button class="v60391-action" data-v60391-route="runtime">View Controls</button></div>`;
  host.querySelectorAll('img').forEach(img => img.addEventListener('error', () => { if(img.dataset.v60391Fallback && img.src !== img.dataset.v60391Fallback) img.src = img.dataset.v60391Fallback; }, { once:true }));
  v60391UpdateRightScore(id);
}

function v60391TrendSvg(values){
  const pts = values.map((v,i) => `${i?'L':'M'}${10+i*(280/(values.length-1))} ${110-v}`).join(' ');
  return `<svg class="v554-trend" viewBox="0 0 310 130"><path d="M10 110H300M10 85H300M10 60H300M10 35H300" stroke="rgba(66,215,255,.1)"/><path d="${pts}" fill="none" stroke="#42d7ff" stroke-width="3"/><circle cx="290" cy="${110-values.at(-1)}" r="5" fill="#42d7ff"/></svg>`;
}
function v60391WireTrend(){
  const trustmap = v60391$('#trustmap.active');
  const buttons = v60391$$('.v554-time button', trustmap || document);
  if(!buttons.length) return;
  buttons.forEach(btn => { const key = (btn.textContent || '').trim().toLowerCase(); btn.dataset.v60391Trend = key; btn.classList.toggle('active', key === V60391_STATE.trend); });
  const container = buttons[0].closest('.v554-card') || buttons[0].parentElement?.parentElement;
  if(!container) return;
  const trend = V60391_TRENDS[V60391_STATE.trend] || V60391_TRENDS.daily;
  const old = container.querySelector('.v554-trend');
  if(old) old.outerHTML = v60391TrendSvg(trend.data);
  let note = container.querySelector('.v60391-trend-note');
  if(!note){ note = document.createElement('p'); note.className = 'v60391-trend-note'; container.appendChild(note); }
  note.textContent = trend.note;
}

function v60391MarkMeta(){
  const payload = v60391$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.9.1 TrustMap Render Stability and Core Anchor Correction';
    parsed.version = 'V60.3.9.1';
    parsed.previous_operational_build = 'V60.3.9 TrustMap Rendered Layer 1 Asset Integration and Scoring Correction';
    parsed.trustmap_render_stability_core_anchor = { status:'active', rule:'Mutation-stabilized Layer 1 assets, fallback visuals, top-centered map, shield-shaped CyberShield Core, separate selected-asset score.', github_pages_browser_qa_required:true };
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}
function v60391Apply(){
  if(V60391_STATE.applying) return;
  const trustmap = v60391$('#trustmap.active');
  if(!trustmap) return;
  V60391_STATE.applying = true;
  try{
    v60391InstallStyles();
    v60391CleanCopy();
    v60391ApplyCore();
    v60391ApplyAssets();
    v60391RenderSelectedPanel(V60391_STATE.selected);
    v60391WireTrend();
    v60391MarkMeta();
  } finally {
    V60391_STATE.applying = false;
  }
}
function v60391QueueApply(){
  if(V60391_STATE.queued) return;
  V60391_STATE.queued = true;
  requestAnimationFrame(() => { V60391_STATE.queued = false; v60391Apply(); });
}
function v60391Observe(){
  const trustmap = v60391$('#trustmap');
  if(!trustmap || V60391_STATE.observer) return;
  V60391_STATE.observer = new MutationObserver(() => { if(!V60391_STATE.applying) v60391QueueApply(); });
  V60391_STATE.observer.observe(trustmap, { childList:true, subtree:true });
}
function v60391Route(view){ document.querySelector(`#mainNav button[data-view="${view}"]`)?.click(); }
function v60391Handlers(){
  if(window.__v60391Handlers) return;
  window.__v60391Handlers = true;
  document.addEventListener('mouseover', event => { const d = event.target.closest('[data-v60391-asset]'); if(d) v60391RenderSelectedPanel(d.dataset.v60391Asset); }, true);
  document.addEventListener('focusin', event => { const d = event.target.closest('[data-v60391-asset]'); if(d) v60391RenderSelectedPanel(d.dataset.v60391Asset); }, true);
  document.addEventListener('click', event => {
    const t = event.target.closest('[data-v60391-trend]');
    if(t){ V60391_STATE.trend = t.dataset.v60391Trend || 'daily'; v60391WireTrend(); return; }
    const r = event.target.closest('[data-v60391-route]');
    if(r){ v60391Route(r.dataset.v60391Route); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v554-mode],[data-v554-domain],[data-v554-asset],[data-v554-reset]')) requestAnimationFrame(v60391Apply);
  }, true);
}

v60391Handlers();
v60391Observe();
setTimeout(v60391Apply, 2150);
window.addEventListener('load', () => setTimeout(v60391Apply, 2450), { once:true });
setTimeout(v60391Apply, 3200);
