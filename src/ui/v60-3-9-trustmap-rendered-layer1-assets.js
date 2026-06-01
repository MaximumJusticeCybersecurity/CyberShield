// V60.3.9 TrustMap Rendered Layer 1 Asset Integration and Scoring Correction
// Purpose: preserve the original TrustMap shell and import rendered Layer 1 asset visuals from approved image assets.
// Boundary: static advisory UI only. No live scoring, live evidence retrieval, workflow, or enforcement.

const V6039_ASSET_BASE = 'assets/trustmap/layer1/';
const V6039_STATE = { selected: 'cmmc', trend: 'daily' };

function v6039$(selector, root = document){ return root.querySelector(selector); }
function v6039$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v6039Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

const V6039_DOMAIN_MAP = {
  cloud: { label:'Cloud & Infrastructure', file:'cloud-infrastructure.webp', state:'Good', score:78, tone:'#13bfff', assumed:'Current cloud logging configuration is assumed, not verified.', why:'Cloud logging, infrastructure exposure, and control evidence affect whether this action can be trusted.', gaps:['Cloud logging evidence','Network exposure context','Control owner confirmation'], controls:['AC.L2-3.1.1','SC.L2-3.13.1','AU.L2-3.3.1'], route:'evidence' },
  identity: { label:'Identities & Access', file:'identities-access.webp', state:'Good', score:81, tone:'#20e889', assumed:'Current identity and access posture is assumed to match the latest access review.', why:'Requester identity, access rights, privilege scope, and approval authority determine whether the action is admissible.', gaps:['Approver authority evidence','Privilege scope confirmation','Recent access review evidence'], controls:['IA.L2-3.5.1','AC.L2-3.1.2','IA.L2-3.5.2'], route:'evidence' },
  appsData: { label:'Applications & Data', file:'applications-data.webp', state:'Needs Verification', score:64, tone:'#b865ff', assumed:'Application logging and access controls are assumed to be properly configured.', why:'Sensitive data flows through multiple applications and services. Missing controls increase unauthorized access or data-loss risk.', gaps:['Complete access review for SaaS applications','Data classification for object storage','API security testing results','Change management evidence'], controls:['AC.L2-3.1.1','AU.L2-3.3.1','SC.L2-3.13.1'], route:'evidence' },
  ai: { label:'AI Systems & Agents', file:'ai-systems-agents.webp', state:'Constrained', score:59, tone:'#18eaff', assumed:'The AI output is assumed to be based on complete and authorized inputs.', why:'AI output and agent behavior require model provenance, input context, tool authority, and human review before reliance.', gaps:['Model source','Prompt and input context','Human review','Tool-use authority'], controls:['RA.L2-3.11.1','CA.L2-3.12.1','AU.L2-3.3.2'], route:'runtime' },
  third: { label:'Third Parties & Vendors', file:'third-parties-vendors.webp', state:'At Risk', score:42, tone:'#ff881a', assumed:'Vendor proof and contractual terms are assumed incomplete until reviewed.', why:'Vendor involvement creates external reliance, contractual exposure, and third-party data-use risk.', gaps:['Vendor proof','Contract and data-use terms','Third-party control evidence'], controls:['SR.L2-3.15.1','CA.L2-3.12.3','AC.L2-3.1.20'], route:'evidence' },
  endpoints: { label:'Devices & Endpoints', file:'devices-endpoints.webp', state:'Good', score:76, tone:'#20dfff', assumed:'Endpoint health evidence is assumed to be current.', why:'Endpoint health and device posture affect whether the action or data path can be trusted.', gaps:['Device posture evidence','Endpoint control state','Owner confirmation'], controls:['CM.L2-3.4.1','SI.L2-3.14.1','AC.L2-3.1.5'], route:'evidence' },
  cmmc: { label:'CMMC & Compliance', file:'cmmc-compliance.webp', state:'Constrained', score:61, tone:'#ffd43b', assumed:'Control inheritance and audit trail completeness are assumed, not verified.', why:'This decision may affect regulated data use, control inheritance, or required evidence for CMMC and contractual obligations.', gaps:['Data use purpose not verified','Audit trail evidence incomplete','Access control evidence missing','Control mapping not confirmed'], controls:['AC.L2-3.1.1','AU.L2-3.3.1','SC.L2-3.13.1'], route:'evidence' }
};

const V6039_TRENDS = {
  daily: { label:'Daily', note:'Short-term operational movement over the last 24 hours.', data:[41,44,43,49,58,51,55,63,60,52,48,55,62,76,68,72,88] },
  weekly: { label:'Weekly', note:'Smoothed weekly movement across recent operational signals.', data:[52,54,56,58,57,60,62,63,65,66,64,67,69,70,71,72,74] },
  monthly: { label:'Monthly', note:'Broader monthly trust posture trend for executive review.', data:[47,49,52,53,55,58,61,62,64,67,69,70,72,73,74,76,78] }
};

function v6039StateColor(state){
  const s = String(state || '').toLowerCase();
  if(s.includes('good')) return '#20e889';
  if(s.includes('verification')) return '#ffd43b';
  if(s.includes('risk')) return '#ff3347';
  if(s.includes('constrained')) return '#ff881a';
  return '#ffd43b';
}
function v6039AssetSrc(asset){ return `${V6039_ASSET_BASE}${asset.file}`; }

function v6039InstallStyles(){
  if(v6039$('#v60-3-9-trustmap-fidelity-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-9-trustmap-fidelity-style';
  style.textContent = `
    #trustmap.active .v554-map-panel{align-self:start!important;min-height:760px!important}
    #trustmap.active .v554-viewport{min-height:680px!important}
    #trustmap.active #v554World{top:46%!important}
    #trustmap.active .v554-head h2{color:#42d7ff!important}
    #trustmap.active .v554-head span{font-size:0!important}
    #trustmap.active .v554-head span:after{content:'Decision Trust Universe';font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#76e4a1}
    #trustmap.active .v554-note{font-size:0!important}
    #trustmap.active .v554-note:after{content:'Drag to pan • wheel/buttons to zoom • detail increases as you move outward';font-size:.72rem;color:#8fd6ff}
    #trustmap.active .v554-card p{color:#bfefff;line-height:1.38}
    #trustmap.active .v554-kernel{width:220px!important;height:250px!important;border:2.5px solid #42d7ff!important;border-radius:0!important;clip-path:polygon(50% 0%,92% 16%,84% 72%,50% 100%,16% 72%,8% 16%)!important;background:radial-gradient(circle at 50% 18%,rgba(66,215,255,.32),rgba(3,13,24,.94) 70%)!important;box-shadow:0 0 36px rgba(66,215,255,.95),0 0 92px rgba(66,215,255,.34),inset 0 0 30px rgba(66,215,255,.25)!important;padding:28px 18px 30px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:4px!important;overflow:visible!important}
    #trustmap.active .v554-kernel:before{content:'';position:absolute;left:50%;bottom:-34px;transform:translateX(-50%);width:210px;height:48px;border-radius:50%;background:radial-gradient(circle,rgba(66,215,255,.82),rgba(66,215,255,.26) 35%,transparent 72%);box-shadow:0 0 35px rgba(66,215,255,.8);z-index:-1}
    #trustmap.active .v554-kernel:after{content:'';position:absolute;left:50%;bottom:-20px;transform:translateX(-50%);width:155px;height:30px;border:2px solid rgba(66,215,255,.72);border-radius:50%;box-shadow:0 0 22px rgba(66,215,255,.75);z-index:-1}
    #trustmap.active .v554-kernel img{width:54px!important;height:auto!important;margin:0 0 3px!important;filter:drop-shadow(0 0 10px #42d7ff)!important}
    #trustmap.active .v554-kernel strong{font-size:1.08rem!important;line-height:1.05!important;color:#fff!important;letter-spacing:.05em!important;text-align:center!important;max-width:160px!important}
    #trustmap.active .v554-kernel .org{font-size:.68rem!important;line-height:1.12!important;color:#6ef4ff!important;letter-spacing:.04em!important;text-transform:uppercase!important;text-align:center!important;max-width:155px!important;white-space:normal!important}
    #trustmap.active .v554-kernel small{font-size:.67rem!important;color:#dff7ff!important;letter-spacing:.06em!important;text-transform:uppercase!important}
    #trustmap.active .v554-shield-mask{opacity:.12!important;clip-path:polygon(50% 0%,92% 16%,84% 72%,50% 100%,16% 72%,8% 16%)!important}
    #trustmap.active .v554-domain{width:210px!important;min-height:238px!important;background:transparent!important;border:0!important;box-shadow:none!important;color:var(--v6039-tone,#42d7ff)!important;z-index:35!important}
    #trustmap.active .v554-domain .orb{width:205px!important;height:172px!important;margin:0 auto 6px!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;display:grid!important;place-items:center!important;overflow:visible!important;color:var(--v6039-tone,#42d7ff)!important}
    #trustmap.active .v554-domain .orb:before,#trustmap.active .v554-domain .orb:after{display:none!important}
    #trustmap.active .v554-domain-label{display:block!important;margin-top:0!important;color:#fff!important;font-weight:900!important;font-size:1rem!important;line-height:1.1!important;text-align:center!important;text-shadow:0 0 16px rgba(0,0,0,.92),0 0 12px var(--v6039-tone,#42d7ff)!important;background:rgba(3,13,24,.48)!important;border-radius:10px!important;padding:4px 7px!important}
    #trustmap.active .v6039-layer1-img{width:220px!important;height:220px!important;object-fit:contain!important;display:block!important;filter:drop-shadow(0 0 18px var(--v6039-tone,#42d7ff)) drop-shadow(0 0 32px color-mix(in srgb,var(--v6039-tone,#42d7ff) 34%,transparent));transform:translateY(-18px);transition:transform .18s ease,filter .18s ease;pointer-events:none}
    #trustmap.active .v554-domain:hover .v6039-layer1-img,#trustmap.active .v554-domain:focus-within .v6039-layer1-img{transform:translateY(-18px) scale(1.08);filter:drop-shadow(0 0 24px var(--v6039-tone,#42d7ff)) drop-shadow(0 0 58px color-mix(in srgb,var(--v6039-tone,#42d7ff) 52%,transparent))}
    #trustmap.active .v554-status-dot{display:inline-flex!important;position:static!important;margin-top:7px!important;width:auto!important;height:auto!important;border-radius:999px!important;background:transparent!important;box-shadow:none!important;color:var(--v6039-state,#ffd43b)!important;font-size:.72rem!important;font-weight:900!important;text-transform:uppercase!important;gap:7px!important;align-items:center!important;justify-content:center!important}
    #trustmap.active .v554-status-dot:before{content:'';display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--v6039-state,#ffd43b);box-shadow:0 0 10px var(--v6039-state,#ffd43b)}
    #trustmap.active .v554-status-dot:after{content:attr(data-v6039-state)}
    .v6039-score-card{border:1px solid rgba(66,215,255,.25);border-radius:18px;background:rgba(255,255,255,.04);padding:14px;margin:0 0 12px;color:#dff7ff}
    .v6039-score-card .v6039-score-ring{width:150px;height:150px;border-radius:50%;display:grid;place-items:center;margin:12px auto;background:conic-gradient(var(--asset-color,#42d7ff) calc(var(--score)*1%),rgba(255,255,255,.09) 0);position:relative;box-shadow:0 0 22px color-mix(in srgb,var(--asset-color,#42d7ff) 34%,transparent)}
    .v6039-score-card .v6039-score-ring:before{content:'';position:absolute;inset:18px;border-radius:50%;background:#071426}
    .v6039-score-card .v6039-score-ring strong{position:relative;z-index:1;font-size:2.1rem;color:#fff}
    .v6039-selected-panel{border:1px solid rgba(66,215,255,.25);border-radius:18px;background:rgba(255,255,255,.04);padding:14px;margin-top:12px;color:#dff7ff}
    .v6039-selected-head{display:grid;grid-template-columns:78px 1fr;gap:12px;align-items:center;border-bottom:1px solid rgba(66,215,255,.12);padding-bottom:12px}
    .v6039-mini{width:74px;height:74px;display:grid;place-items:center;border:1px solid var(--asset-color,#42d7ff);border-radius:14px;background:rgba(3,13,24,.72);box-shadow:0 0 20px var(--asset-color,#42d7ff);overflow:hidden}
    .v6039-mini img{width:112px;height:112px;object-fit:contain}
    .v6039-selected-panel h3{margin:0;color:#fff;font-size:1.08rem}
    .v6039-pill{display:inline-flex;margin-top:6px;border:1px solid var(--asset-state,#ffd43b);border-radius:999px;padding:4px 8px;color:var(--asset-state,#ffd43b);font-weight:900;font-size:.72rem;text-transform:uppercase;background:color-mix(in srgb,var(--asset-state,#ffd43b) 12%,transparent)}
    .v6039-selected-panel h4{margin:14px 0 7px;color:#aebbd0;text-transform:uppercase;font-size:.82rem;letter-spacing:.05em}
    .v6039-selected-panel p,.v6039-selected-panel li{color:#dbefff;line-height:1.4;font-size:.86rem}
    .v6039-selected-panel ul{padding-left:18px;margin:8px 0}
    .v6039-selected-panel li::marker{color:var(--asset-state,#ffd43b)}
    .v6039-controls{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}
    .v6039-control{background:rgba(185,204,230,.13);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:7px 9px;color:#fff;font-weight:800;font-size:.76rem}
    .v6039-actions{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:12px}
    .v6039-action{border:1px solid rgba(66,215,255,.22);border-radius:10px;background:rgba(255,255,255,.045);color:#dbefff;padding:9px 8px;cursor:pointer;font-size:.8rem}
    .v6039-action:hover{border-color:#42d7ff;box-shadow:0 0 12px rgba(66,215,255,.24)}
    .v6039-trend-note{margin-top:6px;color:#8fd6ff!important;font-size:.78rem!important}
  `;
  document.head.appendChild(style);
}

function v6039ApplyLayer1Assets(){
  const trustmap = v6039$('#trustmap.active');
  if(!trustmap) return;
  v6039$$('.v554-domain', trustmap).forEach(domain => {
    const id = domain.dataset.v554Domain;
    const asset = V6039_DOMAIN_MAP[id];
    if(!asset) return;
    domain.dataset.v6039Asset = id;
    domain.style.setProperty('--v6039-tone', asset.tone);
    domain.style.setProperty('--v6039-state', v6039StateColor(asset.state));
    const orb = domain.querySelector('.orb');
    if(orb && orb.dataset.v6039Rendered !== 'true'){
      orb.innerHTML = `<img class="v6039-layer1-img" src="${v6039AssetSrc(asset)}" alt="${v6039Esc(asset.label)}">`;
      orb.dataset.v6039Rendered = 'true';
    }
    const status = domain.querySelector('.v554-status-dot');
    if(status) status.dataset.v6039State = asset.state.toUpperCase();
  });
}

function v6039CleanCopy(){
  const trustmap = v6039$('#trustmap.active');
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
function v6039SelectedAsset(id){ return V6039_DOMAIN_MAP[id] || V6039_DOMAIN_MAP[V6039_STATE.selected] || V6039_DOMAIN_MAP.cloud; }

function v6039UpdateRightScore(id){
  const trustmap = v6039$('#trustmap.active');
  if(!trustmap) return;
  const right = trustmap.querySelector('.v554-shell > .v554-panel:last-child');
  if(!right) return;
  const asset = v6039SelectedAsset(id);
  const first = right.querySelector('section');
  if(!first) return;
  first.innerHTML = `<div class="v554-sub">Selected Asset Trust Score</div><section class="v6039-score-card" style="--score:${asset.score};--asset-color:${asset.tone}"><strong>${v6039Esc(asset.label)}</strong><div class="v6039-score-ring"><strong>${asset.score}<span style="font-size:.8rem">/100</span></strong></div><p>This score reflects the selected Layer 1 asset, not the overall operational trust score.</p></section>`;
}

function v6039RenderSelectedPanel(id){
  const trustmap = v6039$('#trustmap.active');
  if(!trustmap) return;
  const right = trustmap.querySelector('.v554-shell > .v554-panel:last-child');
  if(!right) return;
  const asset = v6039SelectedAsset(id);
  V6039_STATE.selected = id;
  const oldDetail = right.querySelector('.v554-detail');
  if(oldDetail) oldDetail.style.display = 'none';
  let host = right.querySelector('#v6039SelectedAssetPanel');
  if(!host){
    host = document.createElement('section');
    host.id = 'v6039SelectedAssetPanel';
    const first = right.querySelector('section');
    if(first) first.insertAdjacentElement('afterend', host); else right.prepend(host);
  }
  host.className = 'v6039-selected-panel';
  host.style.setProperty('--asset-color', asset.tone);
  host.style.setProperty('--asset-state', v6039StateColor(asset.state));
  host.innerHTML = `<div class="v6039-selected-head"><div class="v6039-mini"><img src="${v6039AssetSrc(asset)}" alt="${v6039Esc(asset.label)}"></div><div><h3>${v6039Esc(asset.label)}</h3><span class="v6039-pill">${v6039Esc(asset.state)}</span></div></div><h4>Model Explanation</h4><p>${v6039Esc(asset.why)}</p><h4>Assumed Activity</h4><p>${v6039Esc(asset.assumed)}</p><h4>Evidence Gaps</h4><ul>${asset.gaps.map(g => `<li>${v6039Esc(g)}</li>`).join('')}</ul><h4>Related Controls</h4><div class="v6039-controls">${asset.controls.map(c => `<span class="v6039-control">${v6039Esc(c)}</span>`).join('')}<span class="v6039-control">View all (7)</span></div><div class="v6039-actions"><button class="v6039-action" data-v6039-route="architecture">Inspect Score</button><button class="v6039-action" data-v6039-route="evidence">Open Evidence</button><button class="v6039-action" data-v6039-route="proof">Preview Proof Pack</button><button class="v6039-action" data-v6039-route="runtime">View Controls</button></div>`;
  v6039UpdateRightScore(id);
}

function v6039TrendSvg(values){
  const pts = values.map((v,i) => `${i?'L':'M'}${10+i*(280/(values.length-1))} ${110-v}`).join(' ');
  return `<svg class="v554-trend" viewBox="0 0 310 130"><path d="M10 110H300M10 85H300M10 60H300M10 35H300" stroke="rgba(66,215,255,.1)"/><path d="${pts}" fill="none" stroke="#42d7ff" stroke-width="3"/><circle cx="290" cy="${110-values.at(-1)}" r="5" fill="#42d7ff"/></svg>`;
}

function v6039WireTrendButtons(){
  const trustmap = v6039$('#trustmap.active');
  if(!trustmap) return;
  const buttons = v6039$$('.v554-time button', trustmap);
  if(!buttons.length) return;
  buttons.forEach(btn => {
    const key = (btn.textContent || '').trim().toLowerCase();
    btn.dataset.v6039Trend = key;
    btn.classList.toggle('active', key === V6039_STATE.trend);
  });
  const container = buttons[0].closest('.v554-card') || buttons[0].parentElement?.parentElement;
  if(!container) return;
  const trend = V6039_TRENDS[V6039_STATE.trend] || V6039_TRENDS.daily;
  const old = container.querySelector('.v554-trend');
  if(old) old.outerHTML = v6039TrendSvg(trend.data);
  let note = container.querySelector('.v6039-trend-note');
  if(!note){
    note = document.createElement('p');
    note.className = 'v6039-trend-note';
    container.appendChild(note);
  }
  note.textContent = trend.note;
}

function v6039Route(view){ document.querySelector(`#mainNav button[data-view="${view}"]`)?.click(); }
function v6039MarkMeta(){
  const payload = v6039$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.9 TrustMap Rendered Layer 1 Asset Integration and Scoring Correction';
    parsed.version = 'V60.3.9';
    parsed.previous_operational_build = 'V60.3.8 TrustMap Layer 1 Reference Asset Replacement';
    parsed.trustmap_rendered_layer1_assets = { status:'active_rendered_webp_asset_integration', asset_base: V6039_ASSET_BASE, rule:'Use rendered WebP image assets for Layer 1; preserve original TrustMap shell, core, scoring panels, Layer 2, and Layer 3.', github_pages_browser_qa_required:true };
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}
function v6039Apply(){ v6039InstallStyles(); v6039CleanCopy(); v6039ApplyLayer1Assets(); v6039RenderSelectedPanel(V6039_STATE.selected); v6039WireTrendButtons(); v6039MarkMeta(); }
function v6039Handlers(){
  if(window.__v6039Handlers) return;
  window.__v6039Handlers = true;
  document.addEventListener('mouseover', e => { const d = e.target.closest('[data-v6039-asset]'); if(d) v6039RenderSelectedPanel(d.dataset.v6039Asset); }, true);
  document.addEventListener('focusin', e => { const d = e.target.closest('[data-v6039-asset]'); if(d) v6039RenderSelectedPanel(d.dataset.v6039Asset); }, true);
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-v6039-trend]');
    if(t){ V6039_STATE.trend = t.dataset.v6039Trend || 'daily'; v6039WireTrendButtons(); return; }
    const r = e.target.closest('[data-v6039-route]');
    if(r){ v6039Route(r.dataset.v6039Route); return; }
    if(e.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v554-mode],[data-v554-domain],[data-v554-asset],[data-v554-reset]')) setTimeout(v6039Apply, 700);
  }, true);
}

v6039Handlers();
setTimeout(v6039Apply, 2500);
window.addEventListener('load', () => setTimeout(v6039Apply, 2900), { once:true });
setTimeout(v6039Apply, 3700);
