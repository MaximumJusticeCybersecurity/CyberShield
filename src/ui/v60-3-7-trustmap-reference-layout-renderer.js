// V60.3.7 TrustMap Reference Layout Renderer
// Purpose: render the TrustMap first layer in the approved reference style with a dynamic right-side panel.
// Boundary: static advisory UI only. No live scoring, live evidence retrieval, workflow, or enforcement.

const V6037_STATE = { selected: 'cmmc' };

function v6037$(selector, root = document){ return root.querySelector(selector); }
function v6037$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v6037Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

const V6037_ASSETS = [
  { id:'cloud', label:'Cloud & Infrastructure', state:'GOOD', tone:'blue', x:38, y:13, line:'good', icon:'cloud', why:'Cloud hosting, infrastructure controls, and network paths support the action.', gaps:['Confirm cloud-control evidence','Confirm network exposure context'], next:'Keep infrastructure evidence attached to the decision record.', controls:['AC.L2-3.1.1','SC.L2-3.13.1','AU.L2-3.3.1'], route:'evidence' },
  { id:'identity', label:'Identities & Access', state:'GOOD', tone:'green', x:16, y:29, line:'good', icon:'identity', why:'Requester identity, access rights, and approval authority support the action.', gaps:['Confirm approver authority','Confirm privilege scope'], next:'Keep identity evidence attached to the review.', controls:['IA.L2-3.5.1','AC.L2-3.1.2','IA.L2-3.5.2'], route:'evidence' },
  { id:'apps', label:'Applications & Data', state:'NEEDS VERIFICATION', tone:'purple', x:58, y:29, line:'verify', icon:'apps', why:'The action involves systems and data that require purpose, classification, and owner confirmation.', gaps:['Data use purpose not verified','Application owner review incomplete','Data classification not confirmed'], next:'Verify application owner, data class, and permitted use before reliance.', controls:['AC.L2-3.1.3','AU.L2-3.3.1','SC.L2-3.13.1'], route:'evidence' },
  { id:'vendors', label:'Third Parties & Vendors', state:'AT RISK', tone:'orange', x:62, y:55, line:'risk', icon:'vendor', why:'Vendor involvement creates external reliance, contractual, and data-use exposure.', gaps:['Vendor evidence incomplete','Contract terms not confirmed','Third-party control evidence missing'], next:'Review vendor evidence and terms before proceeding.', controls:['SR.L2-3.15.1','CA.L2-3.12.3','AC.L2-3.1.20'], route:'evidence' },
  { id:'cmmc', label:'CMMC & Compliance', state:'CONSTRAINED', tone:'gold', x:49, y:77, line:'verify', icon:'cmmc', why:'This decision has compliance impact that requires additional evidence and control validation.', gaps:['Data use purpose not verified','Audit trail evidence incomplete','Access control evidence missing','Control mapping not confirmed'], next:'Review required controls and provide missing compliance evidence.', controls:['AC.L2-3.1.1','AU.L2-3.3.1','SC.L2-3.13.1'], route:'evidence' },
  { id:'devices', label:'Devices & Endpoints', state:'GOOD', tone:'cyan', x:28, y:76, line:'good', icon:'devices', why:'Endpoint and device posture support the action when health and control evidence remain current.', gaps:['Confirm device posture evidence','Confirm endpoint control state'], next:'Keep endpoint posture evidence attached to the decision record.', controls:['CM.L2-3.4.1','SI.L2-3.14.1','AC.L2-3.1.5'], route:'evidence' },
  { id:'ai', label:'AI Systems & Agents', state:'CONSTRAINED', tone:'cyan', x:13, y:55, line:'verify', icon:'ai', why:'AI output and agent behavior require model provenance, input context, and human review before reliance.', gaps:['Model source not verified','Input context incomplete','Human review required'], next:'Review AI-generated analysis before business action.', controls:['RA.L2-3.11.1','CA.L2-3.12.1','AU.L2-3.3.2'], route:'runtime' }
];

function v6037Asset(id){ return V6037_ASSETS.find(a => a.id === id) || V6037_ASSETS[0]; }

function v6037InstallStyles(){
  if(v6037$('#v60-3-7-trustmap-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-7-trustmap-style';
  style.textContent = `
    #trustmap.active > *:not(#v6037TrustMap){display:none!important}
    #v6037TrustMap{min-height:calc(100vh - 96px);border-radius:0;background:radial-gradient(circle at 37% 48%,rgba(16,215,255,.14),transparent 21rem),radial-gradient(circle at 50% 50%,rgba(0,120,255,.08),transparent 38rem),linear-gradient(135deg,#020713 0%,#03101f 52%,#020611 100%);position:relative;overflow:hidden;color:#dff7ff;font-family:Inter,ui-sans-serif,system-ui,sans-serif;margin:-12px;padding:0}.v6037-stars{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(52,216,255,.85) 0 1px,transparent 1.4px),radial-gradient(circle,rgba(52,216,255,.28) 0 1px,transparent 1.4px);background-size:74px 74px,123px 123px;background-position:12px 18px,48px 36px;opacity:.48}.v6037-brand{position:absolute;left:26px;top:24px;display:flex;align-items:center;gap:12px;z-index:20}.v6037-brand-shield{width:34px;height:42px;border:2px solid #9adfff;clip-path:polygon(50% 0,94% 18%,86% 72%,50% 100%,14% 72%,6% 18%);box-shadow:0 0 14px rgba(66,215,255,.55)}.v6037-brand strong{display:block;color:#fff;font-size:1.45rem;letter-spacing:.06em}.v6037-brand span{display:block;color:#12eaff;font-weight:900;letter-spacing:.08em}.v6037-stage{position:absolute;left:0;top:0;width:74%;height:100%;min-height:840px}.v6037-radar{position:absolute;left:39%;top:50%;width:880px;height:880px;transform:translate(-50%,-50%);border-radius:50%;background:repeating-radial-gradient(circle,rgba(34,188,255,.22) 0 1px,transparent 1px 76px),linear-gradient(90deg,transparent 49.9%,rgba(34,188,255,.16) 50%,transparent 50.1%),linear-gradient(0deg,transparent 49.9%,rgba(34,188,255,.16) 50%,transparent 50.1%)}.v6037-radar:before{content:"";position:absolute;inset:0;border-radius:50%;border:1px solid rgba(34,188,255,.22);box-shadow:0 0 56px rgba(34,188,255,.08) inset}.v6037-line{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:5}.v6037-line line{stroke-width:4;stroke-linecap:round;stroke-dasharray:7 13;opacity:.72;filter:drop-shadow(0 0 6px currentColor)}.v6037-line .good{stroke:#20e889}.v6037-line .verify{stroke:#ffd43b}.v6037-line .risk{stroke:#ff7a1a}.v6037-line line.active{stroke-width:6;opacity:1;filter:drop-shadow(0 0 10px currentColor)}.v6037-center{position:absolute;left:39%;top:50%;width:320px;height:320px;transform:translate(-50%,-50%);border-radius:50%;border:2px solid #31dfff;background:radial-gradient(circle at 50% 34%,rgba(42,211,255,.16),rgba(2,11,22,.92) 68%);box-shadow:0 0 26px rgba(49,223,255,.78),inset 0 0 34px rgba(49,223,255,.22);z-index:10;display:grid;place-items:center;text-align:center;padding:34px}.v6037-center small{color:#12eaff;font-weight:900;text-transform:uppercase;letter-spacing:.08em}.v6037-center p{font-size:1.28rem;line-height:1.32;color:#fff;font-weight:800}.v6037-pill{display:inline-flex;align-items:center;gap:8px;border-radius:999px;border:1px solid rgba(255,212,59,.45);background:rgba(255,212,59,.14);color:#ffe56c;font-weight:900;padding:8px 15px;text-transform:uppercase}.v6037-asset{position:absolute;left:calc(var(--x)*1%);top:calc(var(--y)*1%);transform:translate(-50%,-50%);z-index:12;width:190px;text-align:center;color:var(--color);cursor:pointer;border:0;background:transparent;padding:0}.v6037-cube{width:154px;height:154px;margin:0 auto 10px;position:relative;border:2px solid currentColor;border-radius:18px;background:radial-gradient(circle at 28% 20%,rgba(255,255,255,.28),transparent 20%),linear-gradient(145deg,color-mix(in srgb,currentColor 28%,transparent),rgba(3,13,24,.72));box-shadow:0 0 25px currentColor,0 0 68px color-mix(in srgb,currentColor 35%,transparent);display:grid;place-items:center;transform:perspective(420px) rotateX(54deg) rotateZ(-45deg);transition:.18s ease}.v6037-cube:before,.v6037-cube:after{content:"";position:absolute;border:2px solid currentColor;border-radius:18px;inset:0;background:rgba(255,255,255,.035)}.v6037-cube:before{transform:translate3d(16px,-16px,-28px)}.v6037-cube:after{transform:translate3d(31px,-31px,-56px);opacity:.58}.v6037-object{position:relative;z-index:2;transform:rotateZ(45deg) rotateX(-54deg);width:100px;height:100px;display:grid;place-items:center;filter:drop-shadow(0 0 12px currentColor)}.v6037-asset:hover .v6037-cube,.v6037-asset.active .v6037-cube{transform:perspective(420px) rotateX(54deg) rotateZ(-45deg) scale(1.07);box-shadow:0 0 34px currentColor,0 0 92px color-mix(in srgb,currentColor 45%,transparent)}.v6037-orbit{position:absolute;left:50%;bottom:-10px;width:150px;height:38px;border:2px solid currentColor;border-radius:50%;transform:translateX(-50%);box-shadow:0 0 20px currentColor;opacity:.8}.v6037-asset strong{display:block;color:#fff;font-size:1rem;text-shadow:0 0 13px rgba(0,0,0,.8)}.v6037-state{display:inline-flex;align-items:center;gap:6px;margin-top:8px;font-size:.72rem;text-transform:uppercase;font-weight:900;color:currentColor}.v6037-dot{width:10px;height:10px;border-radius:50%;background:currentColor;box-shadow:0 0 10px currentColor}.v6037-legend{position:absolute;left:28px;bottom:30px;z-index:20;border:1px solid rgba(66,215,255,.28);border-radius:10px;background:rgba(5,16,31,.84);padding:17px 19px;min-width:190px}.v6037-legend h4{margin:0 0 12px;color:#8fd6ff;text-transform:uppercase;font-size:.8rem;letter-spacing:.06em}.v6037-legend div{display:flex;align-items:center;gap:10px;margin:10px 0;color:#cfefff;font-size:.84rem}.v6037-topstate{position:absolute;right:28px;top:24px;z-index:30;border:1px solid rgba(66,215,255,.28);border-radius:8px;background:rgba(5,16,31,.86);display:grid;grid-template-columns:1fr 1fr;gap:0;padding:13px 18px;min-width:310px}.v6037-topstate div+div{border-left:1px solid rgba(66,215,255,.16);padding-left:20px}.v6037-topstate span{display:block;color:#a9bbd0}.v6037-topstate strong{color:#ffe56c;text-transform:uppercase}.v6037-side{position:absolute;right:28px;top:115px;bottom:24px;width:420px;z-index:30;border:1px solid rgba(66,215,255,.28);border-radius:8px;background:linear-gradient(180deg,rgba(12,24,42,.96),rgba(4,13,26,.98));box-shadow:0 24px 68px rgba(0,0,0,.46);padding:18px;overflow:auto}.v6037-close{position:absolute;right:16px;top:12px;color:#bfefff;font-size:1.6rem}.v6037-panel-head{display:grid;grid-template-columns:106px 1fr;gap:16px;align-items:center;padding:12px 0 22px;border-bottom:1px solid rgba(66,215,255,.1)}.v6037-panel-icon{width:100px;height:100px;border-radius:14px;border:1px solid currentColor;display:grid;place-items:center;color:var(--panel-color);background:linear-gradient(145deg,color-mix(in srgb,currentColor 22%,transparent),rgba(3,13,24,.64));box-shadow:0 0 28px currentColor}.v6037-panel-icon .v6037-object{transform:none}.v6037-side h2{margin:0;color:#fff;font-size:1.35rem}.v6037-panel-section{margin-top:16px;border-radius:8px;background:rgba(255,255,255,.025);padding:14px 16px}.v6037-panel-section h3{margin:0 0 10px;color:#aebbd0;text-transform:uppercase;font-size:.86rem;letter-spacing:.04em}.v6037-panel-section p,.v6037-panel-section li{color:#dbeaff;line-height:1.45;font-size:.92rem}.v6037-panel-section ul{padding-left:18px}.v6037-panel-section li::marker{color:#ffd43b}.v6037-controls{display:flex;flex-wrap:wrap;gap:8px}.v6037-control{background:rgba(185,204,230,.13);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:8px 10px;color:#fff;font-weight:800;font-size:.8rem}.v6037-actions{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:16px}.v6037-action{min-height:78px;border:1px solid rgba(66,215,255,.18);border-radius:8px;background:rgba(255,255,255,.05);color:#dbefff;display:grid;place-items:center;text-align:center;font-size:.78rem;cursor:pointer}.v6037-action:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.2)}
    .v6037-cloud{width:98px;height:66px;position:relative}.v6037-cloud span{position:absolute;background:radial-gradient(circle at 35% 25%,#fff,#7ce7ff 52%,rgba(0,173,255,.2));box-shadow:0 0 18px currentColor;border-radius:999px}.v6037-cloud .a{left:3px;bottom:12px;width:92px;height:38px}.v6037-cloud .b{left:18px;top:5px;width:42px;height:42px}.v6037-cloud .c{right:7px;top:14px;width:34px;height:34px}.v6037-stack{position:absolute;left:34px;bottom:0;width:32px;height:32px;border:2px solid currentColor;border-radius:5px;background:rgba(3,13,24,.5);box-shadow:0 0 12px currentColor}.v6037-fingerprint,.v6037-brain,.v6037-briefcase,.v6037-device,.v6037-pentagon,.v6037-apps{width:96px;height:96px}.v6037-object svg{width:96px;height:96px;fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}.v6037-object .fill{fill:currentColor;opacity:.16}
  `;
  document.head.appendChild(style);
}

function v6037Icon(type){
  if(type === 'cloud') return '<div class="v6037-cloud"><span class="a"></span><span class="b"></span><span class="c"></span><i class="v6037-stack"></i></div>';
  const svg = {
    identity:'<svg class="v6037-fingerprint" viewBox="0 0 100 100"><rect x="27" y="15" width="46" height="68" rx="10"/><path d="M50 35c-10 0-17 8-17 18M50 35c10 0 17 8 17 18M50 43c-6 0-10 5-10 11M50 43c6 0 10 5 10 11M50 51v22M42 62c-2 6-5 10-10 14M58 62c2 6 5 10 10 14"/></svg>',
    apps:'<svg class="v6037-apps" viewBox="0 0 100 100"><rect x="17" y="18" width="22" height="22" rx="3"/><rect x="48" y="14" width="26" height="26" rx="3"/><rect x="62" y="52" width="22" height="22" rx="3"/><rect x="25" y="58" width="26" height="26" rx="3"/><path d="M39 29h9M61 40v12M62 63H51M38 58V40"/></svg>',
    vendor:'<svg class="v6037-briefcase" viewBox="0 0 100 100"><rect x="17" y="33" width="66" height="45" rx="8"/><path d="M36 33v-12h28v12M17 49h66M43 58h14"/></svg>',
    cmmc:'<svg class="v6037-pentagon" viewBox="0 0 100 100"><path d="M50 10l37 27-14 45H27L13 37z"/><path d="M50 22l24 18-9 30H35l-9-30z"/><path d="M50 37l10 8-4 13H44l-4-13z"/><path d="M28 83h44"/><path d="M20 43h60"/></svg>',
    devices:'<svg class="v6037-device" viewBox="0 0 100 100"><rect x="14" y="23" width="58" height="40" rx="6"/><path d="M35 76h26M48 63v13"/><rect x="64" y="46" width="22" height="37" rx="5"/><path d="M70 76h10"/></svg>',
    ai:'<svg class="v6037-brain" viewBox="0 0 100 100"><path d="M40 15c-13 0-21 11-18 24-10 4-14 19-5 29-2 12 11 22 23 15 6 8 24 8 30-2 12 2 22-8 19-20 8-10 4-25-8-29 1-12-9-22-21-17-7-6-13-5-20 0z"/><path d="M50 18v64M34 36h16M53 36h22M28 56h22M54 58h24"/></svg>'
  }[type] || '';
  return svg;
}

function v6037AssetHtml(asset){
  const color = { blue:'#13bfff', green:'#20e889', purple:'#b865ff', orange:'#ff881a', gold:'#ffd43b', cyan:'#18eaff' }[asset.tone] || '#13bfff';
  return `<button class="v6037-asset ${asset.id===V6037_STATE.selected?'active':''}" data-v6037-asset="${asset.id}" style="--x:${asset.x};--y:${asset.y};--color:${color};color:${color}" aria-label="${v6037Esc(asset.label)}"><div class="v6037-cube"><div class="v6037-object">${v6037Icon(asset.icon)}</div><span class="v6037-orbit"></span></div><strong>${v6037Esc(asset.label)}</strong><span class="v6037-state"><i class="v6037-dot"></i>${v6037Esc(asset.state)}</span></button>`;
}

function v6037PanelHtml(asset){
  const color = { blue:'#13bfff', green:'#20e889', purple:'#b865ff', orange:'#ff881a', gold:'#ffd43b', cyan:'#18eaff' }[asset.tone] || '#13bfff';
  return `<span class="v6037-close">×</span><div class="v6037-panel-head" style="--panel-color:${color};color:${color}"><div class="v6037-panel-icon"><div class="v6037-object">${v6037Icon(asset.icon)}</div></div><div><h2>${v6037Esc(asset.label)}</h2><span class="v6037-pill">${v6037Esc(asset.state)}</span><p>${v6037Esc(asset.why)}</p></div></div><section class="v6037-panel-section"><h3>Why this matters</h3><p>${v6037Esc(asset.why)}</p></section><section class="v6037-panel-section"><h3>Key gaps</h3><ul>${asset.gaps.map(g=>`<li>${v6037Esc(g)}</li>`).join('')}</ul></section><section class="v6037-panel-section"><h3>Next action</h3><p>${v6037Esc(asset.next)}</p></section><section class="v6037-panel-section"><h3>Related controls</h3><div class="v6037-controls">${asset.controls.map(c=>`<span class="v6037-control">${v6037Esc(c)}</span>`).join('')}<span class="v6037-control">View all (7)</span></div></section><div class="v6037-actions"><button class="v6037-action" data-v6037-route="evidence">Open Evidence</button><button class="v6037-action" data-v6037-route="architecture">Inspect Trace</button><button class="v6037-action" data-v6037-route="proof">Preview Proof Pack</button><button class="v6037-action" data-v6037-route="runtime">View Controls</button></div>`;
}

function v6037Render(){
  const host = v6037$('#trustmap.active');
  if(!host) return;
  v6037InstallStyles();
  let root = v6037$('#v6037TrustMap', host);
  if(!root){
    root = document.createElement('section');
    root.id = 'v6037TrustMap';
    host.appendChild(root);
  }
  const selected = V6037_ASSETS.find(a=>a.id===V6037_STATE.selected) || V6037_ASSETS[0];
  const lineSvg = V6037_ASSETS.map(a=>`<line class="${a.line} ${a.id===selected.id?'active':''}" x1="39" y1="50" x2="${a.x}" y2="${a.y}"/>`).join('');
  root.innerHTML = `<div class="v6037-stars"></div><div class="v6037-brand"><span class="v6037-brand-shield"></span><div><strong>CYBERSHIELD</strong><span>TRUSTMAP</span></div></div><div class="v6037-stage"><div class="v6037-radar"></div><svg class="v6037-line" viewBox="0 0 100 100" preserveAspectRatio="none">${lineSvg}</svg><div class="v6037-center"><div><small>Active Decision</small><p>Healthcare provider, vendor, or AI-enabled workflow wants to use patient, staff, operational, or clinical-adjacent data</p><span class="v6037-pill">Needs Verification</span></div></div>${V6037_ASSETS.map(v6037AssetHtml).join('')}<div class="v6037-legend"><h4>Trust Status</h4><div><i class="v6037-dot" style="color:#20e889"></i>Good</div><div><i class="v6037-dot" style="color:#ffd43b"></i>Needs Verification</div><div><i class="v6037-dot" style="color:#ff881a"></i>Constrained</div><div><i class="v6037-dot" style="color:#ff2f3f"></i>At Risk</div></div></div><div class="v6037-topstate"><div><span>Decision State</span><strong>Constrained</strong></div><div><span>Last Updated</span><strong style="color:#dbeaff;text-transform:none">2 min ago</strong></div></div><aside class="v6037-side" id="v6037Panel">${v6037PanelHtml(selected)}</aside>`;
}

function v6037SetSelected(id){
  V6037_STATE.selected = id;
  v6037Render();
}

function v6037Route(view){ document.querySelector(`#mainNav button[data-view="${view}"]`)?.click(); }
function v6037MarkMeta(){
  const payload = v6037$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.7 TrustMap Reference Layout Renderer';
    parsed.version = 'V60.3.7';
    parsed.previous_operational_build = 'V60.3.6 TrustMap Layer 1 Asset Rendering Correction';
    parsed.trustmap_reference_layout = { status:'active_reference_layout', interaction:'right panel updates on hover, focus, and click', github_pages_browser_qa_required:true };
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}
function v6037Apply(){ v6037Render(); v6037MarkMeta(); }
function v6037Handlers(){
  if(window.__v6037Handlers) return;
  window.__v6037Handlers = true;
  document.addEventListener('mouseover', e => { const a=e.target.closest('[data-v6037-asset]'); if(a) v6037SetSelected(a.dataset.v6037Asset); }, true);
  document.addEventListener('focusin', e => { const a=e.target.closest('[data-v6037-asset]'); if(a) v6037SetSelected(a.dataset.v6037Asset); }, true);
  document.addEventListener('click', e => { const a=e.target.closest('[data-v6037-asset]'); if(a){ v6037SetSelected(a.dataset.v6037Asset); return; } const r=e.target.closest('[data-v6037-route]'); if(r){ v6037Route(r.dataset.v6037Route); return; } if(e.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment')) setTimeout(v6037Apply, 900); }, true);
}

v6037Handlers();
setTimeout(v6037Apply, 10500);
window.addEventListener('load', () => setTimeout(v6037Apply, 11800), { once:true });
setTimeout(v6037Apply, 13800);
