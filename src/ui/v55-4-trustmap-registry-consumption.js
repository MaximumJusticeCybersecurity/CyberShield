// V55.4 TrustMap Registry Consumption
// Purpose: render TrustMap from data/trustmap/v55-3-trustmap-registry.json as the source of truth,
// while preserving the V55.3.1 visual doctrine: radar-constellation, no process flow, no black bevel,
// and thick neon-blue CyberShield Core shield perimeter.

const V554_REGISTRY_PATH = 'data/trustmap/v55-3-trustmap-registry.json';
const V554_STATE = {
  center: { x: 900, y: 700 },
  scale: Number(sessionStorage.getItem('v554Scale') || 0.52),
  pan: JSON.parse(sessionStorage.getItem('v554Pan') || '{"x":0,"y":0}'),
  mode: sessionStorage.getItem('v554Mode') || 'fit',
  domain: sessionStorage.getItem('v554Domain') || null,
  asset: sessionStorage.getItem('v554Asset') || null,
  drag: null,
  registry: null
};

const v554$ = (s, r=document) => r.querySelector(s);
const v554$$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const v554Esc = value => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
const v554Cls = status => String(status || '').includes('critical') ? 'critical' : String(status || '').includes('weak') ? 'weak' : String(status || '').includes('strong') ? 'strong' : 'moderate';
const v554Color = status => ({ strong:'#25e69b', moderate:'#ffd166', weak:'#ff8a30', critical:'#ff4c4c' }[v554Cls(status)] || '#42d7ff');
const v554Scenario = () => localStorage.getItem('cyberShieldV53Scenario') || 'cmmc_applicability';

function v554Registry(){ return V554_STATE.registry || window.CyberShieldTrustMapRegistryV553 || null; }
function v554Domains(){ return Array.isArray(v554Registry()?.domains) ? v554Registry().domains : []; }
function v554Lenses(){ return v554Registry()?.lenses || {}; }
function v554Lens(){ const lenses = v554Lenses(); return lenses[v554Scenario()] || lenses.cmmc_applicability || Object.values(lenses)[0] || { label:'Operational Trust Lens', score:72, movement:'+0%', active:[], risks:['Registry fallback active'] }; }
function v554OrgLabel(){ try { return JSON.parse(v554$('#adminPayload')?.textContent || '{}')?.state?.org || v554$('#setOrg')?.value || v554$('#obOrg')?.value || 'Your Organization'; } catch { return 'Your Organization'; } }
function v554ShortOrg(){ const org = v554OrgLabel(); return org.length > 28 ? org.slice(0,26) + '…' : org; }
function v554Polar(angle, radius){ const a = Number(angle || 0) * Math.PI / 180; return { x: V554_STATE.center.x + Math.cos(a) * radius, y: V554_STATE.center.y + Math.sin(a) * radius }; }
function v554DomainPos(domain){ return v554Polar(domain.angle, 310); }
function v554AssetPos(domain, index, count){ const spread = 42; const angle = Number(domain.angle || 0) + (index - (count - 1) / 2) * (spread / Math.max(1, count - 1)); return v554Polar(angle, 490); }
function v554TagPos(domain, assetIndex, tagIndex){ const angle = Number(domain.angle || 0) + (assetIndex - 1.5) * 10 + (tagIndex ? 4.2 : -4.2); return v554Polar(angle, 615); }
function v554ActiveDomain(){ return v554Domains().find(d => d.id === V554_STATE.domain) || v554Domains().find(d => (v554Lens().active || []).includes(d.id)) || v554Domains()[0] || null; }
function v554ActiveAsset(){ const domain = v554ActiveDomain(); if(!domain) return null; return (domain.assets || []).find(a => a.id === V554_STATE.asset) || (domain.assets || [])[0] || null; }
function v554IsScenarioActive(domain){ return (v554Lens().active || []).includes(domain.id); }
function v554Save(){ sessionStorage.setItem('v554Scale', String(V554_STATE.scale)); sessionStorage.setItem('v554Pan', JSON.stringify(V554_STATE.pan)); sessionStorage.setItem('v554Mode', V554_STATE.mode); V554_STATE.domain ? sessionStorage.setItem('v554Domain', V554_STATE.domain) : sessionStorage.removeItem('v554Domain'); V554_STATE.asset ? sessionStorage.setItem('v554Asset', V554_STATE.asset) : sessionStorage.removeItem('v554Asset'); }

function v554Icon(type){
  const icons = {
    cloud:`<svg viewBox="0 0 64 64"><path d="M20 42h29a10 10 0 0 0 0-20 15 15 0 0 0-28-5 12 12 0 0 0-1 25z"/></svg>`,
    identity:`<svg viewBox="0 0 64 64"><circle cx="24" cy="23" r="8"/><circle cx="43" cy="25" r="7"/><path d="M10 48c3-11 24-11 28 0"/><path d="M33 48c2-7 16-8 21 0"/></svg>`,
    data:`<svg viewBox="0 0 64 64"><ellipse cx="32" cy="15" rx="17" ry="7"/><path d="M15 15v29c0 4 8 7 17 7s17-3 17-7V15"/><path d="M15 29c0 4 8 7 17 7s17-3 17-7"/></svg>`,
    brain:`<svg viewBox="0 0 64 64"><path d="M25 11c-8 0-12 7-10 14-7 2-9 11-4 16-2 7 5 13 12 10 3 6 15 6 18 0 8 3 14-4 12-11 5-5 3-14-4-16 1-7-4-13-11-13-3 0-5 1-7 3-2-2-4-3-6-3z"/><path d="M31 14v38M21 25h10M33 24h12M18 39h13M34 39h12"/></svg>`,
    handshake:`<svg viewBox="0 0 64 64"><path d="M22 36l9-9 8 8c3 3 9-1 6-5L35 20l-8 3-9-5-8 13 12 5z"/><path d="M42 34l10-3 4 11-14 8-11-8"/><path d="M24 38l10 10M18 43l8 8"/></svg>`,
    endpoint:`<svg viewBox="0 0 64 64"><rect x="12" y="14" width="40" height="29" rx="3"/><path d="M24 52h16M32 43v9"/></svg>`,
    pentagon:`<svg viewBox="0 0 64 64"><polygon points="32 6 55 23 46 55 18 55 9 23"/><polygon class="inner" points="32 15 46 26 41 47 23 47 18 26"/><polygon class="inner" points="32 23 39 29 37 40 27 40 25 29"/></svg>`
  };
  return `<span class="v554-icon ${type==='pentagon'?'v554-pentagon':''}">${icons[type] || icons.data}</span>`;
}

function v554Line(a,b,kind,status='moderate',active=false){
  const cls = kind === 'core' ? 'core' : kind === 'tag' ? 'tag' : kind === 'cross' ? 'cross' : 'asset';
  const stroke = kind === 'core' ? '#42d7ff' : v554Color(status);
  return `<line class="${cls} ${active?'active':''}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${stroke}"/>`;
}

function v554BuildObjects(){
  const lens = v554Lens();
  let edges='', domains='', assets='', tags='';
  v554Domains().forEach(domain => {
    const dp = v554DomainPos(domain);
    const activeDomain = v554IsScenarioActive(domain) || V554_STATE.domain === domain.id;
    edges += v554Line(v554Polar(domain.angle, 122), v554Polar(domain.angle, 274), 'core', domain.status, activeDomain);
    domains += `<button class="v554-domain ${activeDomain?'active':'baseline'}" data-v554-domain="${v554Esc(domain.id)}" style="left:${dp.x}px;top:${dp.y}px;color:${v554Color(domain.status)}"><span class="orb">${v554Icon(domain.icon)}</span><span class="v554-domain-label">${v554Esc(domain.label)}</span><span class="v554-status-dot"></span></button>`;
    (domain.assets || []).forEach((asset,index) => {
      const ap = v554AssetPos(domain, index, domain.assets.length);
      const showLabel = V554_STATE.mode !== 'fit' || V554_STATE.asset === asset.id;
      edges += v554Line(v554Polar(domain.angle, 346), ap, 'asset', asset.status, activeDomain || V554_STATE.asset === asset.id);
      assets += `<button class="v554-asset ${showLabel?'show-label':''} ${V554_STATE.asset===asset.id?'active':''}" data-v554-domain="${v554Esc(domain.id)}" data-v554-asset="${v554Esc(asset.id)}" style="left:${ap.x}px;top:${ap.y}px;color:${v554Color(asset.status)}"><strong>${v554Esc(asset.label)}</strong></button>`;
      (asset.tags || ['evidence','owner']).forEach((tag,tagIndex) => {
        const tp = v554TagPos(domain, index, tagIndex);
        const focus = V554_STATE.mode === 'object' && V554_STATE.domain === domain.id && V554_STATE.asset === asset.id;
        edges += v554Line(ap, tp, 'tag', asset.status, focus);
        tags += `<span class="v554-tag ${focus?'focus':''}" style="left:${tp.x}px;top:${tp.y}px;color:${v554Color(asset.status)}"><span>${v554Esc(tag)}</span></span>`;
      });
    });
  });
  if(V554_STATE.mode !== 'fit'){
    const selected = v554ActiveDomain();
    if(selected){
      const selectedPos = v554DomainPos(selected);
      v554Domains().filter(d => d.id !== selected.id && (lens.active || []).includes(d.id)).forEach(d => edges += v554Line(selectedPos, v554DomainPos(d), 'cross', 'moderate', false));
    }
  }
  return {edges,domains,assets,tags};
}

function v554InstallStyles(){
  if(v554$('#v55-4-trustmap-registry-consumption-style')) return;
  const style = document.createElement('style');
  style.id = 'v55-4-trustmap-registry-consumption-style';
  style.textContent = `
    #trustmap .section-head{display:none!important}.v554-shell{display:grid;grid-template-columns:320px minmax(820px,1fr) 320px;gap:18px;align-items:stretch;overflow:hidden}.v554-panel{position:relative;z-index:30;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));border:1px solid rgba(66,215,255,.3);border-radius:22px;padding:16px;box-shadow:0 20px 44px rgba(0,0,0,.34);min-width:0}.v554-title{font-size:1.75rem;line-height:1.05;margin:0}.v554-sub{font-size:.74rem;text-transform:uppercase;letter-spacing:.1em;color:#8fd6ff;font-weight:900}.v554-card{border:1px solid rgba(66,215,255,.2);border-radius:16px;background:rgba(255,255,255,.055);padding:12px;margin-top:12px}.v554-score{width:150px;height:150px;margin:12px auto;border-radius:50%;display:grid;place-items:center;background:conic-gradient(#18d486 calc(var(--score)*1%),rgba(9,31,53,.92) 0);box-shadow:0 0 28px rgba(24,212,134,.2)}.v554-score div{width:108px;height:108px;border-radius:50%;display:grid;place-items:center;text-align:center;background:#061726;border:1px solid rgba(66,215,255,.25)}.v554-score strong{font-size:2.2rem}.v554-row{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;border-bottom:1px solid rgba(66,215,255,.12);padding:6px 0;font-size:.84rem}.v554-dotkey{width:12px;height:12px;border-radius:50%;background:currentColor;box-shadow:0 0 10px currentColor}.v554-map-panel{position:relative;z-index:5;min-height:820px;border:1px solid rgba(66,215,255,.26);border-radius:24px;background:radial-gradient(circle at 50% 50%,rgba(66,215,255,.14),transparent 18rem),linear-gradient(145deg,rgba(4,14,24,.99),rgba(6,23,38,.99));overflow:hidden;isolation:isolate}.v554-head{position:absolute;top:10px;left:16px;right:16px;z-index:60;text-align:center;pointer-events:none}.v554-head h2{margin:0;font-size:1.05rem;letter-spacing:.1em;text-transform:uppercase;color:#42d7ff}.v554-head span{display:block;color:#76e4a1;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase}.v554-viewport{position:absolute;inset:0;overflow:hidden;cursor:grab;z-index:8}.v554-viewport.dragging{cursor:grabbing}.v554-world{position:absolute;left:50%;top:50%;width:1800px;height:1400px;transform-origin:center center;transition:transform .15s ease}.v554-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(66,215,255,.36) 1px,transparent 1.8px),linear-gradient(rgba(66,215,255,.032) 1px,transparent 1px),linear-gradient(90deg,rgba(66,215,255,.032) 1px,transparent 1px);background-size:58px 58px,54px 54px,54px 54px;opacity:.54}.v554-ring{position:absolute;left:900px;top:700px;transform:translate(-50%,-50%);border-radius:50%;border:1px solid rgba(66,215,255,.16);pointer-events:none}.v554-ring.core{width:275px;height:275px;background:rgba(66,215,255,.025)}.v554-ring.l1{width:620px;height:620px}.v554-ring.l2{width:980px;height:980px}.v554-ring.l3{width:1230px;height:1230px}.v554-edges{position:absolute;inset:0;z-index:4;pointer-events:none}.v554-edges line{stroke-linecap:round;filter:drop-shadow(0 0 4px currentColor)}.v554-edges .core{stroke:#42d7ff!important;stroke-width:5.8!important;opacity:.96!important;filter:drop-shadow(0 0 7px rgba(66,215,255,.95)) drop-shadow(0 0 15px rgba(66,215,255,.5))}.v554-edges .asset{stroke-width:1.75;opacity:.68}.v554-edges .tag{stroke-width:.8;opacity:.34}.v554-edges .cross{stroke:#76e4ff;stroke-width:.65;opacity:.1;stroke-dasharray:5 8}.v554-domain{position:absolute;transform:translate(-50%,-50%);width:120px;min-height:112px;z-index:16;border:0;background:transparent;color:#42d7ff;text-align:center;cursor:pointer}.v554-domain .orb{width:72px;height:72px;margin:0 auto 7px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 45% 35%,rgba(66,215,255,.32),rgba(6,28,49,.96));border:1px solid rgba(66,215,255,.78);box-shadow:inset 0 0 14px rgba(255,255,255,.1),0 0 21px rgba(66,215,255,.5),0 0 0 10px rgba(66,215,255,.035)}.v554-domain.baseline{opacity:.78;filter:saturate(.82)}.v554-domain.active{opacity:1;filter:none}.v554-domain.active .orb,.v554-domain:hover .orb{box-shadow:inset 0 0 16px rgba(255,255,255,.18),0 0 30px rgba(66,215,255,.82),0 0 0 13px rgba(66,215,255,.065);border-color:#a4efff}.v554-domain-label{font-size:.72rem;line-height:1.08;font-weight:900;letter-spacing:.02em;color:#f5fbff;text-shadow:0 0 8px #061726}.v554-status-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-top:5px;background:currentColor;box-shadow:0 0 10px currentColor}.v554-icon svg{width:43px;height:43px;stroke:#dff7ff;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 8px rgba(66,215,255,.85))}.v554-pentagon svg .inner{opacity:.24}.v554-asset{position:absolute;transform:translate(-50%,-50%);z-index:14;width:22px;height:22px;border-radius:50%;border:2px solid rgba(255,255,255,.7);background:currentColor;box-shadow:0 0 13px currentColor;cursor:pointer;opacity:.86}.v554-asset.active,.v554-asset:hover{opacity:1;transform:translate(-50%,-50%) scale(1.15)}.v554-asset strong{position:absolute;left:26px;top:50%;transform:translateY(-50%);white-space:nowrap;font-size:.62rem;color:#f5fbff;background:rgba(3,13,24,.78);border:1px solid rgba(255,255,255,.11);border-radius:999px;padding:3px 7px;opacity:0;pointer-events:none}.v554-asset.show-label strong,.v554-asset:hover strong,.v554-asset.active strong{opacity:1}.v554-tag{position:absolute;transform:translate(-50%,-50%);z-index:12;width:8px;height:8px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor;border:1px solid rgba(255,255,255,.55);opacity:.44}.v554-tag.focus{width:11px;height:11px;opacity:1}.v554-tag span{position:absolute;left:15px;top:50%;transform:translateY(-50%);white-space:nowrap;font-size:.56rem;color:#f5fbff;background:rgba(3,13,24,.78);border-radius:999px;padding:2px 6px;opacity:0}.v554-tag:hover span,.v554-tag.focus span{opacity:1}.v554-shield-mask{position:absolute;left:900px;top:700px;transform:translate(-50%,-50%);width:236px;height:212px;z-index:28;pointer-events:none;clip-path:polygon(50% 0%,88% 16%,82% 72%,50% 100%,18% 72%,12% 16%);background:radial-gradient(circle at 50% 24%,rgba(8,31,51,.98),rgba(4,14,26,.99) 68%,rgba(2,8,18,.99) 100%);box-shadow:none;filter:none;opacity:1}.v554-kernel{position:absolute;left:900px;top:700px;transform:translate(-50%,-50%);z-index:31;width:232px;height:208px;padding:18px 22px 24px;display:grid;grid-template-rows:auto auto auto auto;justify-items:center;align-items:center;text-align:center;color:#f5fbff;border:0;background:transparent;box-shadow:none;clip-path:none;overflow:visible;isolation:isolate;cursor:pointer}.v554-kernel:before,.v554-kernel:after{content:"";position:absolute;pointer-events:none;clip-path:polygon(50% 0%,88% 16%,82% 72%,50% 100%,18% 72%,12% 16%)}.v554-kernel:before{inset:-7px;z-index:-3;background:#42d7ff;filter:drop-shadow(0 0 10px rgba(66,215,255,1)) drop-shadow(0 0 22px rgba(66,215,255,.75)) drop-shadow(0 0 42px rgba(66,215,255,.42));opacity:1}.v554-kernel:after{inset:0;z-index:-2;background:radial-gradient(circle at 50% 24%,rgba(66,215,255,.24),rgba(8,31,51,.94) 54%,rgba(4,14,26,.98) 100%);box-shadow:inset 0 0 22px rgba(66,215,255,.22),inset 0 0 44px rgba(3,13,24,.55)}.v554-kernel img{width:54px;height:54px;object-fit:contain;filter:drop-shadow(0 0 10px rgba(66,215,255,.8));position:relative;z-index:2}.v554-kernel strong{font-size:1rem;text-shadow:0 0 12px rgba(66,215,255,.78);position:relative;z-index:2}.v554-kernel .org{font-size:.78rem;color:#dff7ff;position:relative;z-index:2}.v554-kernel small{color:#89dfff;letter-spacing:.08em;text-transform:uppercase;position:relative;z-index:2}.v554-controls{position:absolute;left:16px;right:16px;bottom:14px;display:flex;gap:8px;justify-content:center;z-index:70;flex-wrap:wrap}.v554-controls button,.v554-time button{border:1px solid rgba(66,215,255,.28);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:7px 10px;font-weight:800;cursor:pointer}.v554-controls button.active,.v554-controls button:hover,.v554-time button.active{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v554-note{position:absolute;left:18px;bottom:58px;z-index:70;color:#78c8ec;font-size:.72rem}.v554-distribution,.v554-trend{width:100%;height:auto}.v554-detail{margin-top:12px;border:1px solid rgba(66,215,255,.2);border-radius:16px;background:rgba(255,255,255,.055);padding:12px}.v554-time{display:flex;gap:6px;margin:8px 0}@media(max-width:1100px){.v554-shell{grid-template-columns:1fr}.v554-map-panel{min-height:760px}.v554-panel{max-width:100%}}
  `;
  document.head.appendChild(style);
}

function v554Distribution(score){ return `<svg class="v554-distribution" viewBox="0 0 152 152"><circle cx="76" cy="76" r="52" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="18"/><circle cx="76" cy="76" r="52" fill="none" stroke="#18d486" stroke-width="18" stroke-dasharray="${score} ${100-score}" pathLength="100" transform="rotate(-90 76 76)"/><text x="76" y="72" text-anchor="middle" fill="#d8ecf8" font-size="10">TRUST</text><text x="76" y="94" text-anchor="middle" fill="#f5fbff" font-size="27" font-weight="900">${score}</text></svg>`; }
function v554Trend(score){ const pts = Array.from({length:14},(_,i)=>Math.max(15,Math.min(92,score-6+Math.sin(i*1.1)*5+i*.6))); const path = pts.map((v,i)=>`${i?'L':'M'}${10+i*(280/13)} ${110-v}`).join(' '); return `<svg class="v554-trend" viewBox="0 0 310 130"><path d="M10 110H300M10 85H300M10 60H300M10 35H300" stroke="rgba(66,215,255,.1)"/><path d="${path}" fill="none" stroke="#42d7ff" stroke-width="3"/><circle cx="290" cy="${110-pts.at(-1)}" r="5" fill="#42d7ff"/></svg>`; }
function v554Left(){ const lens=v554Lens(); return `<aside class="v554-panel"><h1 class="v554-title">TRUST MAP</h1><div class="v554-sub">registry-driven radar-constellation</div><section class="v554-card"><div class="v554-sub">Operational Trust Score</div><div class="v554-score" style="--score:${lens.score}"><div><strong>${lens.score}</strong><span>/100</span></div></div><p>TrustMap now renders from the V55.3 registry.  Fit Map shows the enterprise trust universe; detail increases as you move outward.</p></section><section class="v554-card"><div class="v554-sub">Trust Movement</div><h3>${v554Esc(lens.movement)}</h3><p>The active scenario changes highlighted domains, assets, risks, and trust paths.</p></section><section class="v554-card"><div class="v554-sub">Top Trust Break Drivers</div>${(lens.risks || []).map((r,i)=>`<div class="v554-row"><span class="v554-dotkey" style="color:${['#ff4c4c','#ff8a30','#ffd166','#42d7ff'][i] || '#42d7ff'}"></span><span>${v554Esc(r)}</span><strong>${i===0?'Critical':i<2?'High':'Medium'}</strong></div>`).join('')}</section></aside>`; }
function v554Right(){ const lens=v554Lens(), domain=v554ActiveDomain(), asset=v554ActiveAsset(); const detail=V554_STATE.mode==='object' && domain && asset ? `<section class="v554-detail"><div class="v554-sub">Layer 2 / Layer 3 Detail</div><h3>${v554Esc(asset.label)}</h3><p><strong>Domain:</strong> ${v554Esc(domain.label)}</p><p><strong>Status:</strong> ${v554Esc(asset.status)}</p><p><strong>Layer 3:</strong> ${(asset.tags || ['evidence','owner']).map(v554Esc).join(', ')} stars are active for this object.</p></section>` : `<section class="v554-detail"><div class="v554-sub">Layer 1 Domain Detail</div><h3>${v554Esc(domain?.label || 'Registry Domain')}</h3><p><strong>Status:</strong> ${v554Esc(domain?.status || 'moderate')}</p><p><strong>Assets:</strong> ${v554Esc((domain?.assets || []).map(x=>x.label).join(', '))}</p></section>`; return `<aside class="v554-panel"><section><div class="v554-sub">Trust Level Distribution</div>${v554Distribution(lens.score || 72)}</section><section class="v554-card"><div class="v554-sub">Active Risks</div>${(lens.risks || []).map((r,i)=>`<div class="v554-row"><span class="v554-dotkey" style="color:${['#ff4c4c','#ff8a30','#ffd166','#42d7ff'][i] || '#42d7ff'}"></span><span>${v554Esc(r)}</span><strong>${i===0?'Critical':i<2?'High':'Medium'}</strong></div>`).join('')}</section><section class="v554-card"><div class="v554-sub">Trend Line</div><div class="v554-time"><button class="active">Daily</button><button>Weekly</button><button>Monthly</button></div>${v554Trend(lens.score || 72)}</section>${detail}</aside>`; }
function v554Map(){ const objects=v554BuildObjects(); return `<main class="v554-map-panel"><div class="v554-head"><h2>Enterprise Trust Universe</h2><span>${v554Esc(v554Lens().label)} • registry / radar / constellation / trust kernel</span></div><div class="v554-viewport" id="v554Viewport"><div class="v554-world" id="v554World"><div class="v554-grid"></div><div class="v554-ring core"></div><div class="v554-ring l1"></div><div class="v554-ring l2"></div><div class="v554-ring l3"></div><svg class="v554-edges" viewBox="0 0 1800 1400">${objects.edges}</svg><div class="v554-shield-mask"></div><button class="v554-kernel" type="button" data-v554-core><img src="assets/mjc-logo-2026.png" alt="MJC logo"><strong>CyberShield Core</strong><span class="org">${v554Esc(v554ShortOrg())}</span><small>Trust Kernel</small></button>${objects.domains}${objects.assets}${objects.tags}</div></div><div class="v554-controls"><button type="button" data-v554-mode="fit">Fit Map</button><button type="button" data-v554-mode="kernel">Kernel View</button><button type="button" data-v554-mode="domain">Domain View</button><button type="button" data-v554-mode="object">Object View</button><button type="button" data-v554-zoom="out">−</button><button type="button" data-v554-zoom="in">+</button><button type="button" data-v554-reset>Reset</button></div><div class="v554-note">Drag to pan • wheel/buttons to zoom • registry-driven TrustMap</div></main>`; }

function v554Apply(){ const world=v554$('#v554World'); if(!world) return; world.style.transform=`translate(calc(-50% + ${V554_STATE.pan.x}px), calc(-50% + ${V554_STATE.pan.y}px)) scale(${V554_STATE.scale})`; v554$$('[data-v554-mode]').forEach(button => button.classList.toggle('active', button.dataset.v554Mode === V554_STATE.mode)); }
function v554SetMode(mode){ V554_STATE.mode=mode; if(mode==='fit'){ V554_STATE.scale=.52; V554_STATE.pan={x:0,y:0}; V554_STATE.asset=null; } if(mode==='kernel'){ V554_STATE.scale=.86; V554_STATE.pan={x:0,y:0}; V554_STATE.asset=null; } if(mode==='domain'){ const domain=v554ActiveDomain(); if(domain){ const p=v554DomainPos(domain); V554_STATE.scale=1.04; V554_STATE.pan={x:(V554_STATE.center.x-p.x)*.5,y:(V554_STATE.center.y-p.y)*.5}; } V554_STATE.asset=null; } if(mode==='object'){ const domain=v554ActiveDomain(); const asset=v554ActiveAsset(); if(domain && asset){ const idx=Math.max(0,(domain.assets || []).findIndex(a=>a.id===asset.id)); const p=v554AssetPos(domain,idx,(domain.assets || []).length); V554_STATE.scale=1.28; V554_STATE.pan={x:(V554_STATE.center.x-p.x)*.7,y:(V554_STATE.center.y-p.y)*.7}; } } v554Save(); v554Render(); }
function v554MarkMeta(){ document.title='CyberShield V55.4 TrustMap Registry Consumption'; const admin=v554$('#adminPayload'); if(!admin) return; try{ const parsed=JSON.parse(admin.textContent||'{}'); parsed.build='V55.4 TrustMap Registry Consumption'; parsed.version='V55.4'; parsed.previous_operational_build='V55.3.1 Core Shield Boundary Fix'; parsed.trustmap_registry_consumption={ status:'active', source:V554_REGISTRY_PATH, domain_count:v554Domains().length, rule:'TrustMap is rendered from registry data while preserving radar-constellation visual behavior and the thick neon-blue CyberShield Core shield boundary.', github_pages_browser_qa_required:true }; parsed.prototype_boundary='Static advisory prototype only. No live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, or live internet claim verification.'; admin.textContent=JSON.stringify(parsed,null,2); } catch{} }
function v554Render(){ const view=v554$('#trustmap'); if(!view || !view.classList.contains('active') || !v554Registry()) return; v554InstallStyles(); view.innerHTML=`<section class="v554-shell">${v554Left()}${v554Map()}${v554Right()}</section>`; v554Apply(); v554MarkMeta(); }

async function v554LoadRegistry(){
  if(window.CyberShieldTrustMapRegistryV553){ V554_STATE.registry = window.CyberShieldTrustMapRegistryV553; return V554_STATE.registry; }
  const response = await fetch(V554_REGISTRY_PATH, { cache:'no-store' });
  if(!response.ok) throw new Error(`TrustMap registry fetch failed: ${response.status}`);
  V554_STATE.registry = await response.json();
  window.CyberShieldTrustMapRegistryV553 = V554_STATE.registry;
  return V554_STATE.registry;
}

function v554Handlers(){
  if(window.__v554Handlers) return;
  window.__v554Handlers=true;
  document.addEventListener('click', event => {
    if(event.target.closest('[data-v554-core]')){ document.querySelector('#mainNav button[data-view="runtime"]')?.click(); return; }
    const domain=event.target.closest('[data-v554-domain]'); if(domain){ V554_STATE.domain=domain.dataset.v554Domain; V554_STATE.asset=null; v554SetMode('domain'); return; }
    const asset=event.target.closest('[data-v554-asset]'); if(asset){ V554_STATE.domain=asset.dataset.v554Domain; V554_STATE.asset=asset.dataset.v554Asset; v554SetMode('object'); return; }
    const mode=event.target.closest('[data-v554-mode]'); if(mode){ v554SetMode(mode.dataset.v554Mode); return; }
    const zoom=event.target.closest('[data-v554-zoom]'); if(zoom){ V554_STATE.scale += zoom.dataset.v554Zoom === 'in' ? .1 : -.1; V554_STATE.scale=Math.max(.3,Math.min(2.2,V554_STATE.scale)); v554Save(); v554Apply(); return; }
    if(event.target.closest('[data-v554-reset]')){ V554_STATE.domain=null; V554_STATE.asset=null; v554SetMode('fit'); return; }
    if(event.target.closest('#mainNav button,#v53ScenarioSelect,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v552-mode],[data-v552-reset],[data-v552-domain],[data-v552-asset]')) setTimeout(v554Render,320);
  }, true);
  document.addEventListener('mousedown', event => { const viewport=event.target.closest('#v554Viewport'); if(!viewport || event.target.closest('button')) return; V554_STATE.drag={x:event.clientX,y:event.clientY,pan:{...V554_STATE.pan}}; viewport.classList.add('dragging'); });
  document.addEventListener('mousemove', event => { if(!V554_STATE.drag) return; V554_STATE.pan={x:V554_STATE.drag.pan.x+event.clientX-V554_STATE.drag.x,y:V554_STATE.drag.pan.y+event.clientY-V554_STATE.drag.y}; v554Apply(); });
  document.addEventListener('mouseup', () => { if(!V554_STATE.drag) return; V554_STATE.drag=null; v554$('#v554Viewport')?.classList.remove('dragging'); v554Save(); });
  document.addEventListener('wheel', event => { if(!event.target.closest('#v554Viewport')) return; event.preventDefault(); V554_STATE.scale += event.deltaY < 0 ? .07 : -.07; V554_STATE.scale=Math.max(.3,Math.min(2.2,V554_STATE.scale)); v554Save(); v554Apply(); }, { passive:false });
  document.addEventListener('cybershield:trustmap-registry-loaded', event => { if(event.detail?.registry){ V554_STATE.registry = event.detail.registry; setTimeout(v554Render,180); } });
}

v554Handlers();
v554LoadRegistry().then(() => setTimeout(v554Render,1450)).catch(error => console.warn('CyberShield V55.4 registry render unavailable', error));
window.addEventListener('load', () => setTimeout(v554Render,1650), { once:true });
setTimeout(v554Render,1900);
