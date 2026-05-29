// V55.1 TrustMap Radar-Constellation Visual Grammar
// Purpose: make TrustMap read like a radar + constellation interface, not a process-flow or dense schema.
// Preserves V55 Purpose Protocol and V54.2 scenario state, but replaces the TrustMap surface when active.

const V551_DOMAINS = [
  { id: 'cloud', label: 'Cloud & Infrastructure', icon: 'cloud', angle: -90, status: 'strong', assets: [
    ['cloudApps', 'Cloud Apps', 'strong'], ['network', 'Network Boundary', 'moderate'], ['backup', 'Backup Systems', 'weak'], ['logging', 'Logging', 'moderate']
  ]},
  { id: 'identity', label: 'Identities & Access', icon: 'identity', angle: -30, status: 'moderate', assets: [
    ['mfa', 'MFA', 'moderate'], ['priv', 'Privileged Accounts', 'weak'], ['approver', 'Approver Authority', 'moderate'], ['entra', 'Directory / Entra ID', 'strong']
  ]},
  { id: 'appsData', label: 'Applications & Data', icon: 'data', angle: 30, status: 'weak', assets: [
    ['cui', 'CUI / FCI', 'weak'], ['patient', 'Patient Data', 'critical'], ['financial', 'Financial Data', 'moderate'], ['proprietary', 'Proprietary Data', 'moderate']
  ]},
  { id: 'ai', label: 'AI Systems & Agents', icon: 'brain', angle: 90, status: 'moderate', assets: [
    ['aiTools', 'AI Tools', 'moderate'], ['llm', 'LLM Access', 'moderate'], ['agents', 'AI Agents', 'weak'], ['aiOutput', 'AI Output', 'moderate']
  ]},
  { id: 'third', label: 'Third Parties & Vendors', icon: 'handshake', angle: 150, status: 'weak', assets: [
    ['vendors', 'Vendors', 'weak'], ['msp', 'MSP / IT Provider', 'weak'], ['prime', 'Prime Contractor', 'moderate'], ['partners', 'Partners', 'moderate']
  ]},
  { id: 'endpoints', label: 'Devices & Endpoints', icon: 'endpoint', angle: 210, status: 'moderate', assets: [
    ['workstations', 'Workstations', 'strong'], ['servers', 'Servers', 'moderate'], ['mobile', 'Mobile', 'moderate'], ['iot', 'IoT', 'weak']
  ]},
  { id: 'cmmc', label: 'CMMC & Compliance', icon: 'pentagon', angle: 265, status: 'weak', assets: [
    ['ssp', 'SSP', 'weak'], ['poam', 'POA&M', 'moderate'], ['cuiBoundary', 'CUI Boundary', 'critical'], ['controlEvidence', 'Evidence', 'weak']
  ]}
];

const V551_LENSES = {
  cmmc_applicability: { label: 'CMMC Applicability Trust Check', score: 72, movement: '+8%', active: ['cmmc','appsData','third','identity'], risks: ['CUI/FCI unknown','contract flow-down unclear','system scope uncertain','MSP claim dependency'] },
  cmmc_readiness: { label: 'CMMC Readiness Trust Check', score: 54, movement: '-6%', active: ['cmmc','appsData','identity','cloud','third'], risks: ['CUI boundary critical','SSP stale','control evidence weak','owner gap'] },
  payment_trust: { label: 'Payment Trust Verification', score: 49, movement: '-11%', active: ['third','identity','appsData'], risks: ['payment destination critical','vendor identity weak','approver authority unclear','audit trail incomplete'] },
  vendor_ai_access: { label: 'Manufacturing Vendor AI Access Trust', score: 76, movement: '+14%', active: ['endpoints','ai','third','cloud','appsData'], risks: ['access scope conditional','AI boundary unclear','operational data weak','maintenance window dependency'] },
  healthcare_data: { label: 'Healthcare Data / Vendor / AI Trust', score: 52, movement: '-4%', active: ['appsData','third','identity','ai'], risks: ['permitted use critical','vendor authorization weak','patient data exposure','audit trail weak'] },
  ai_output: { label: 'AI Output Trust', score: 63, movement: '+5%', active: ['ai','appsData','identity','third'], risks: ['source data weak','human review conditional','policy boundary unclear','client-facing consequence'] }
};

const V551 = {
  center: { x: 900, y: 700 },
  radius: { l1: 280, l2: 455, l3: 575 },
  scale: Number(sessionStorage.getItem('v551Scale') || 0.54),
  pan: JSON.parse(sessionStorage.getItem('v551Pan') || '{"x":0,"y":0}'),
  mode: sessionStorage.getItem('v551Mode') || 'fit',
  domain: sessionStorage.getItem('v551Domain') || null,
  asset: sessionStorage.getItem('v551Asset') || null,
  drag: null
};

const v551$ = (s, r=document) => r.querySelector(s);
const v551$$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const v551Esc = (v) => String(v ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
const v551Scenario = () => localStorage.getItem('cyberShieldV53Scenario') || 'cmmc_applicability';
const v551Lens = () => V551_LENSES[v551Scenario()] || V551_LENSES.cmmc_applicability;
const v551StatusClass = (s) => String(s).toLowerCase().includes('critical') ? 'critical' : String(s).toLowerCase().includes('weak') ? 'weak' : String(s).toLowerCase().includes('strong') ? 'strong' : 'moderate';
const v551Color = (s) => ({ strong: '#24e39a', moderate: '#ffd166', weak: '#ff8b32', critical: '#ff4c4c' }[v551StatusClass(s)] || '#42d7ff');

function v551OrgLabel() {
  try { return JSON.parse(v551$('#adminPayload')?.textContent || '{}')?.state?.org || v551$('#setOrg')?.value || v551$('#obOrg')?.value || 'Your Organization'; }
  catch { return 'Your Organization'; }
}

function v551ShortOrg() {
  const label = v551OrgLabel();
  return label.length > 26 ? label.slice(0, 24) + '…' : label;
}

function v551Polar(angle, radius) {
  const a = angle * Math.PI / 180;
  return { x: V551.center.x + Math.cos(a) * radius, y: V551.center.y + Math.sin(a) * radius };
}

function v551DomainPos(d) { return v551Polar(d.angle, V551.radius.l1); }
function v551AssetPos(d, index, count) {
  const spread = 38;
  const angle = d.angle + (index - (count - 1) / 2) * (spread / Math.max(1, count - 1));
  return v551Polar(angle, V551.radius.l2);
}
function v551TagPos(d, assetIndex, tagIndex, count) {
  const assetAngle = d.angle + (assetIndex - 1.5) * 10;
  return v551Polar(assetAngle + (tagIndex ? 3.8 : -3.8), V551.radius.l3);
}
function v551ActiveDomain() { return V551_DOMAINS.find(d => d.id === V551.domain) || V551_DOMAINS.find(d => v551Lens().active.includes(d.id)) || V551_DOMAINS[0]; }
function v551ActiveAsset() { const d = v551ActiveDomain(); return d.assets.find(a => a[0] === V551.asset) || d.assets[0]; }
function v551IsActive(d) { return v551Lens().active.includes(d.id) || V551.domain === d.id; }
function v551ShouldShowAssets(d) { return V551.mode === 'fit' || (V551.mode === 'domain' && d.id === v551ActiveDomain().id) || (V551.mode === 'object' && d.id === v551ActiveDomain().id); }
function v551ShouldShowTags(d, asset) { return V551.mode === 'object' && d.id === v551ActiveDomain().id && asset[0] === v551ActiveAsset()[0]; }

function v551Save() {
  sessionStorage.setItem('v551Scale', String(V551.scale));
  sessionStorage.setItem('v551Pan', JSON.stringify(V551.pan));
  sessionStorage.setItem('v551Mode', V551.mode);
  V551.domain ? sessionStorage.setItem('v551Domain', V551.domain) : sessionStorage.removeItem('v551Domain');
  V551.asset ? sessionStorage.setItem('v551Asset', V551.asset) : sessionStorage.removeItem('v551Asset');
}

function v551InstallStyles() {
  if (v551$('#v55-1-radar-style')) return;
  const style = document.createElement('style');
  style.id = 'v55-1-radar-style';
  style.textContent = `
    #trustmap .section-head{display:none!important}.v551-shell{display:grid;grid-template-columns:320px minmax(820px,1fr) 320px;gap:18px;align-items:stretch;overflow:hidden}.v551-panel{position:relative;z-index:20;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));border:1px solid rgba(66,215,255,.3);border-radius:22px;padding:16px;box-shadow:0 20px 44px rgba(0,0,0,.34);min-width:0}.v551-title{font-size:1.75rem;line-height:1.05;margin:0}.v551-sub{font-size:.74rem;text-transform:uppercase;letter-spacing:.1em;color:#8fd6ff;font-weight:900}.v551-card{border:1px solid rgba(66,215,255,.2);border-radius:16px;background:rgba(255,255,255,.055);padding:12px;margin-top:12px}.v551-score{width:150px;height:150px;margin:12px auto;border-radius:50%;display:grid;place-items:center;background:conic-gradient(#18d486 calc(var(--score)*1%),rgba(9,31,53,.92) 0);box-shadow:0 0 28px rgba(24,212,134,.2)}.v551-score div{width:108px;height:108px;border-radius:50%;display:grid;place-items:center;text-align:center;background:#061726;border:1px solid rgba(66,215,255,.25)}.v551-score strong{font-size:2.2rem}.v551-row{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;border-bottom:1px solid rgba(66,215,255,.12);padding:6px 0;font-size:.84rem}.v551-dotkey{width:12px;height:12px;border-radius:50%;background:currentColor;box-shadow:0 0 10px currentColor}.v551-map-panel{position:relative;z-index:5;min-height:820px;border:1px solid rgba(66,215,255,.26);border-radius:24px;background:radial-gradient(circle at 50% 50%,rgba(66,215,255,.16),transparent 18rem),linear-gradient(145deg,rgba(4,14,24,.99),rgba(6,23,38,.99));overflow:hidden;isolation:isolate}.v551-head{position:absolute;top:10px;left:16px;right:16px;z-index:50;text-align:center;pointer-events:none}.v551-head h2{margin:0;font-size:1.05rem;letter-spacing:.1em;text-transform:uppercase;color:#42d7ff}.v551-head span{display:block;color:#76e4a1;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase}.v551-viewport{position:absolute;inset:0;overflow:hidden;cursor:grab;z-index:8}.v551-viewport.dragging{cursor:grabbing}.v551-world{position:absolute;left:50%;top:50%;width:1800px;height:1400px;transform-origin:center center;transition:transform .15s ease}.v551-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(66,215,255,.4) 1px,transparent 1.8px),linear-gradient(rgba(66,215,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(66,215,255,.035) 1px,transparent 1px);background-size:58px 58px,54px 54px,54px 54px;opacity:.56}.v551-ring{position:absolute;left:900px;top:700px;transform:translate(-50%,-50%);border-radius:50%;border:1px solid rgba(66,215,255,.16);pointer-events:none}.v551-ring.core{width:268px;height:268px;background:rgba(66,215,255,.03)}.v551-ring.l1{width:560px;height:560px}.v551-ring.l2{width:910px;height:910px}.v551-ring.l3{width:1150px;height:1150px}.v551-edges{position:absolute;inset:0;z-index:4;pointer-events:none}.v551-edges line{stroke-linecap:round;filter:drop-shadow(0 0 4px currentColor)}.v551-edges .core{stroke:#42d7ff;stroke-width:3.6;opacity:.74}.v551-edges .l2{stroke-width:1.8;opacity:.72}.v551-edges .l3{stroke-width:.85;opacity:.42}.v551-edges .cross{stroke:#76e4ff;stroke-width:.65;opacity:.12;stroke-dasharray:5 8}.v551-domain{position:absolute;transform:translate(-50%,-50%);width:122px;min-height:114px;z-index:16;border:0;background:transparent;color:#f5fbff;text-align:center;cursor:pointer}.v551-domain .orb{width:72px;height:72px;margin:0 auto 7px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 45% 35%,rgba(66,215,255,.32),rgba(6,28,49,.96));border:1px solid rgba(66,215,255,.72);box-shadow:inset 0 0 14px rgba(255,255,255,.11),0 0 20px rgba(66,215,255,.45),0 0 0 10px rgba(66,215,255,.035)}.v551-domain.dim{opacity:.38;filter:saturate(.55)}.v551-domain.active,.v551-domain:hover{opacity:1;filter:none}.v551-domain.active .orb,.v551-domain:hover .orb{box-shadow:inset 0 0 16px rgba(255,255,255,.18),0 0 28px rgba(66,215,255,.75),0 0 0 12px rgba(66,215,255,.06);border-color:#8deaff}.v551-domain-label{font-size:.72rem;line-height:1.08;font-weight:900;letter-spacing:.02em;text-shadow:0 0 8px #061726}.v551-status-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-top:5px;background:currentColor;box-shadow:0 0 10px currentColor}.v551-icon svg{width:43px;height:43px;stroke:#dff7ff;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 8px rgba(66,215,255,.85))}.v551-pentagon svg .inner{opacity:.24}.v551-asset{position:absolute;transform:translate(-50%,-50%);z-index:14;width:22px;height:22px;border-radius:50%;border:2px solid rgba(255,255,255,.72);background:currentColor;box-shadow:0 0 14px currentColor;cursor:pointer}.v551-asset strong{position:absolute;left:26px;top:50%;transform:translateY(-50%);white-space:nowrap;font-size:.62rem;color:#f5fbff;background:rgba(3,13,24,.78);border:1px solid rgba(255,255,255,.11);border-radius:999px;padding:3px 7px;opacity:0;pointer-events:none}.v551-asset.show-label strong,.v551-asset:hover strong,.v551-asset.active strong{opacity:1}.v551-tag{position:absolute;transform:translate(-50%,-50%);z-index:13;width:10px;height:10px;border-radius:50%;background:currentColor;box-shadow:0 0 9px currentColor;border:1px solid rgba(255,255,255,.65)}.v551-tag span{position:absolute;left:15px;top:50%;transform:translateY(-50%);white-space:nowrap;font-size:.56rem;color:#f5fbff;background:rgba(3,13,24,.78);border-radius:999px;padding:2px 6px;opacity:0}.v551-tag:hover span,.v551-tag.active span{opacity:1}.v551-kernel{position:absolute;left:900px;top:700px;transform:translate(-50%,-50%);z-index:30;width:205px;height:184px;padding:14px 18px 18px;display:grid;grid-template-rows:auto auto auto auto;justify-items:center;align-items:center;text-align:center;color:#f5fbff;border:0;background:radial-gradient(circle at 50% 20%,rgba(66,215,255,.22),rgba(5,18,32,.98) 66%);clip-path:polygon(50% 0,86% 12%,96% 42%,83% 76%,50% 100%,17% 76%,4% 42%,14% 12%);box-shadow:inset 0 0 22px rgba(255,255,255,.11),0 0 0 2px rgba(66,215,255,.92),0 0 36px rgba(66,215,255,.78);cursor:pointer}.v551-kernel::before{content:'';position:absolute;inset:7px;clip-path:inherit;background:linear-gradient(145deg,rgba(255,255,255,.12),transparent 35%,rgba(66,215,255,.16));z-index:-1}.v551-kernel img{width:55px;height:55px;object-fit:contain;filter:drop-shadow(0 0 12px rgba(66,215,255,.95))}.v551-kernel strong{font-size:.86rem;letter-spacing:.05em;line-height:1.05;text-transform:uppercase}.v551-kernel .org{max-width:142px;font-size:clamp(.56rem, .9vw, .7rem);line-height:1.05;color:#d8f3ff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.v551-kernel small{font-size:.62rem;text-transform:uppercase;letter-spacing:.08em;color:#8fd6ff}.v551-shield-mask{position:absolute;left:900px;top:700px;transform:translate(-50%,-50%);z-index:22;width:235px;height:214px;clip-path:polygon(50% 0,86% 12%,96% 42%,83% 76%,50% 100%,17% 76%,4% 42%,14% 12%);background:radial-gradient(circle at 50% 20%,rgba(5,18,32,.99),rgba(3,13,24,.99));pointer-events:none}.v551-controls{position:absolute;left:16px;bottom:16px;z-index:60;display:flex;gap:7px;flex-wrap:wrap;max-width:calc(100% - 32px)}.v551-controls button,.v551-time button{border:1px solid rgba(66,215,255,.35);background:rgba(6,23,38,.88);color:#f5fbff;border-radius:999px;padding:6px 9px;font-size:.75rem}.v551-controls button.active,.v551-time button.active{background:rgba(66,215,255,.2);border-color:#42d7ff}.v551-note{position:absolute;right:18px;bottom:18px;z-index:55;color:#8fd6ff;font-size:.7rem}.v551-distribution,.v551-trend{width:100%;height:145px}.v551-time{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}.v551-detail{margin-top:12px;border:1px solid rgba(66,215,255,.22);border-radius:16px;padding:12px;background:rgba(0,0,0,.18);font-size:.86rem}@media(max-width:1180px){.v551-shell{grid-template-columns:1fr}.v551-map-panel{min-height:760px}.v551-world{width:1680px;height:1320px}}@media(max-width:720px){.v551-map-panel{min-height:710px}.v551-domain{width:108px}.v551-domain .orb{width:62px;height:62px}.v551-icon svg{width:36px;height:36px}.v551-asset strong{display:none}}
  `;
  document.head.appendChild(style);
}

function v551Icon(type) {
  const icons = {
    cloud: `<svg viewBox="0 0 64 64"><path d="M20 42h29a10 10 0 0 0 0-20 15 15 0 0 0-28-5 12 12 0 0 0-1 25z"/></svg>`,
    identity: `<svg viewBox="0 0 64 64"><circle cx="24" cy="23" r="8"/><circle cx="43" cy="25" r="7"/><path d="M10 48c3-11 24-11 28 0"/><path d="M33 48c2-7 16-8 21 0"/></svg>`,
    data: `<svg viewBox="0 0 64 64"><ellipse cx="32" cy="15" rx="17" ry="7"/><path d="M15 15v29c0 4 8 7 17 7s17-3 17-7V15"/><path d="M15 29c0 4 8 7 17 7s17-3 17-7"/></svg>`,
    brain: `<svg viewBox="0 0 64 64"><path d="M25 11c-8 0-12 7-10 14-7 2-9 11-4 16-2 7 5 13 12 10 3 6 15 6 18 0 8 3 14-4 12-11 5-5 3-14-4-16 1-7-4-13-11-13-3 0-5 1-7 3-2-2-4-3-6-3z"/><path d="M31 14v38M21 25h10M33 24h12M18 39h13M34 39h12"/></svg>`,
    handshake: `<svg viewBox="0 0 64 64"><path d="M22 36l9-9 8 8c3 3 9-1 6-5L35 20l-8 3-9-5-8 13 12 5z"/><path d="M42 34l10-3 4 11-14 8-11-8"/><path d="M24 38l10 10M18 43l8 8"/></svg>`,
    endpoint: `<svg viewBox="0 0 64 64"><rect x="12" y="14" width="40" height="29" rx="3"/><path d="M24 52h16M32 43v9"/></svg>`,
    pentagon: `<svg viewBox="0 0 64 64"><polygon points="32 6 55 23 46 55 18 55 9 23"/><polygon class="inner" points="32 15 46 26 41 47 23 47 18 26"/><polygon class="inner" points="32 23 39 29 37 40 27 40 25 29"/></svg>`,
    report: `<svg viewBox="0 0 64 64"><path d="M18 10h22l8 8v36H18z"/><path d="M40 10v10h10M25 30h16M25 39h16M25 48h10"/></svg>`
  };
  return `<span class="v551-icon ${type === 'pentagon' ? 'v551-pentagon' : ''}">${icons[type] || icons.report}</span>`;
}

function v551Line(a, b, kind, status='moderate', active=false) {
  const stroke = kind === 'core' ? '#42d7ff' : v551Color(status);
  const cls = kind === 'core' ? 'core' : kind === 'tag' ? 'l3' : kind === 'cross' ? 'cross' : 'l2';
  return `<line class="${cls} ${active ? 'active' : ''}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${stroke}"/>`;
}

function v551BuildMapObjects() {
  const l = v551Lens();
  let edges = '', domains = '', assets = '', tags = '';
  V551_DOMAINS.forEach(d => {
    const dp = v551DomainPos(d);
    const activeD = v551IsActive(d);
    // Terminate core lines just outside shield boundary instead of running through the shield.
    const nearCore = v551Polar(d.angle, 118);
    edges += v551Line(nearCore, dp, 'core', d.status, activeD);
    domains += `<button class="v551-domain ${activeD ? 'active' : 'dim'}" data-v551-domain="${v551Esc(d.id)}" style="left:${dp.x}px;top:${dp.y}px;color:${v551Color(d.status)}"><span class="orb">${v551Icon(d.icon)}</span><span class="v551-domain-label">${v551Esc(d.label)}</span><span class="v551-status-dot"></span></button>`;
    d.assets.forEach((a, i) => {
      const ap = v551AssetPos(d, i, d.assets.length);
      const showAsset = v551ShouldShowAssets(d);
      if (showAsset) {
        edges += v551Line(dp, ap, 'asset', a[2], activeD || V551.asset === a[0]);
        const labelClass = V551.mode !== 'fit' || V551.asset === a[0] ? 'show-label' : '';
        assets += `<button class="v551-asset ${labelClass} ${V551.asset === a[0] ? 'active' : ''}" data-v551-domain="${v551Esc(d.id)}" data-v551-asset="${v551Esc(a[0])}" style="left:${ap.x}px;top:${ap.y}px;color:${v551Color(a[2])}"><strong>${v551Esc(a[1])}</strong></button>`;
      }
      if (v551ShouldShowTags(d, a)) {
        ['evidence', 'owner'].forEach((tag, ti) => {
          const tp = v551TagPos(d, i, ti, 2);
          edges += v551Line(ap, tp, 'tag', a[2], true);
          tags += `<span class="v551-tag active" style="left:${tp.x}px;top:${tp.y}px;color:${v551Color(a[2])}"><span>${tag}</span></span>`;
        });
      }
    });
  });
  if (V551.mode !== 'fit') {
    const d = v551ActiveDomain();
    const selected = v551DomainPos(d);
    V551_DOMAINS.filter(x => x.id !== d.id && v551Lens().active.includes(x.id)).forEach(x => edges += v551Line(selected, v551DomainPos(x), 'cross', 'moderate', false));
  }
  return { edges, domains, assets, tags };
}

function v551DistributionSvg(score) {
  return `<svg class="v551-distribution" viewBox="0 0 152 152"><circle cx="76" cy="76" r="52" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="18"/><circle cx="76" cy="76" r="52" fill="none" stroke="#18d486" stroke-width="18" stroke-dasharray="${score} ${100-score}" pathLength="100" transform="rotate(-90 76 76)"/><text x="76" y="72" text-anchor="middle" fill="#d8ecf8" font-size="10">TRUST</text><text x="76" y="94" text-anchor="middle" fill="#f5fbff" font-size="27" font-weight="900">${score}</text></svg>`;
}

function v551TrendSvg(score) {
  const pts = Array.from({ length: 14 }, (_, i) => Math.max(15, Math.min(92, score - 6 + Math.sin(i * 1.1) * 5 + i * .6)));
  const path = pts.map((v, i) => `${i ? 'L' : 'M'}${10 + i * (280 / 13)} ${110 - v}`).join(' ');
  return `<svg class="v551-trend" viewBox="0 0 310 130"><path d="M10 110H300M10 85H300M10 60H300M10 35H300" stroke="rgba(66,215,255,.1)"/><path d="${path}" fill="none" stroke="#42d7ff" stroke-width="3"/><circle cx="290" cy="${110 - pts.at(-1)}" r="5" fill="#42d7ff"/></svg>`;
}

function v551LeftPanel() {
  const l = v551Lens();
  return `<aside class="v551-panel"><h1 class="v551-title">TRUST MAP</h1><div class="v551-sub">radar-constellation interface</div><section class="v551-card"><div class="v551-sub">Operational Trust Score</div><div class="v551-score" style="--score:${l.score}"><div><strong>${l.score}</strong><span>/100</span></div></div><p>Fit Map is for orientation.  Details move to domain, object, and proof views.</p></section><section class="v551-card"><div class="v551-sub">Trust Movement</div><h3>${v551Esc(l.movement)}</h3><p>Scenario lens changes the active trust constellation.</p></section><section class="v551-card"><div class="v551-sub">Top Trust Break Drivers</div>${l.risks.map((r,i)=>`<div class="v551-row"><span class="v551-dotkey" style="color:${['#ff4c4c','#ff8b32','#ffd166','#42d7ff'][i]}"></span><span>${v551Esc(r)}</span><strong>${i===0?'Critical':i<2?'High':'Medium'}</strong></div>`).join('')}</section></aside>`;
}

function v551RightPanel() {
  const l = v551Lens();
  const d = v551ActiveDomain();
  const a = v551ActiveAsset();
  const detail = V551.mode === 'object'
    ? `<section class="v551-detail"><div class="v551-sub">Object Detail</div><h3>${v551Esc(a[1])}</h3><p><strong>Domain:</strong> ${v551Esc(d.label)}</p><p><strong>Status:</strong> ${v551Esc(a[2])}</p><p><strong>Action:</strong> verify evidence, owner, freshness, and decision route.</p></section>`
    : `<section class="v551-detail"><div class="v551-sub">Domain Detail</div><h3>${v551Esc(d.label)}</h3><p><strong>Status:</strong> ${v551Esc(d.status)}</p><p><strong>Assets:</strong> ${v551Esc(d.assets.map(x=>x[1]).join(', '))}</p></section>`;
  return `<aside class="v551-panel"><section><div class="v551-sub">Trust Level Distribution</div>${v551DistributionSvg(l.score)}</section><section class="v551-card"><div class="v551-sub">Active Risks</div>${l.risks.map((r,i)=>`<div class="v551-row"><span class="v551-dotkey" style="color:${['#ff4c4c','#ff8b32','#ffd166','#42d7ff'][i]}"></span><span>${v551Esc(r)}</span><strong>${i===0?'Critical':i<2?'High':'Medium'}</strong></div>`).join('')}</section><section class="v551-card"><div class="v551-sub">Trend Line</div><div class="v551-time"><button class="active">Daily</button><button>Weekly</button><button>Monthly</button></div>${v551TrendSvg(l.score)}</section>${detail}</aside>`;
}

function v551MapPanel() {
  const objs = v551BuildMapObjects();
  return `<main class="v551-map-panel"><div class="v551-head"><h2>Enterprise Trust Universe</h2><span>${v551Esc(v551Lens().label)} • radar / constellation / trust kernel</span></div><div class="v551-viewport" id="v551Viewport"><div class="v551-world" id="v551World"><div class="v551-grid"></div><div class="v551-ring core"></div><div class="v551-ring l1"></div><div class="v551-ring l2"></div><div class="v551-ring l3"></div><svg class="v551-edges" viewBox="0 0 1800 1400">${objs.edges}</svg><div class="v551-shield-mask"></div><button class="v551-kernel" type="button" data-v551-core><img src="assets/mjc-logo-2026.png" alt="MJC logo"><strong>CyberShield Core</strong><span class="org">${v551Esc(v551ShortOrg())}</span><small>Trust Kernel</small></button>${objs.domains}${objs.assets}${objs.tags}</div></div><div class="v551-controls"><button type="button" data-v551-mode="fit">Fit Map</button><button type="button" data-v551-mode="kernel">Kernel View</button><button type="button" data-v551-mode="domain">Domain View</button><button type="button" data-v551-mode="object">Object View</button><button type="button" data-v551-zoom="out">−</button><button type="button" data-v551-zoom="in">+</button><button type="button" data-v551-reset>Reset</button></div><div class="v551-note">Drag to pan • wheel/buttons to zoom</div></main>`;
}

function v551ApplyTransform() {
  const world = v551$('#v551World');
  if (!world) return;
  world.style.transform = `translate(calc(-50% + ${V551.pan.x}px), calc(-50% + ${V551.pan.y}px)) scale(${V551.scale})`;
  v551$$('[data-v551-mode]').forEach(b => b.classList.toggle('active', b.dataset.v551Mode === V551.mode));
}

function v551SetMode(mode) {
  V551.mode = mode;
  if (mode === 'fit') { V551.scale = .54; V551.pan = { x: 0, y: 0 }; V551.asset = null; }
  if (mode === 'kernel') { V551.scale = .88; V551.pan = { x: 0, y: 0 }; V551.asset = null; }
  if (mode === 'domain') { const p = v551DomainPos(v551ActiveDomain()); V551.scale = 1.04; V551.pan = { x: (V551.center.x - p.x) * .5, y: (V551.center.y - p.y) * .5 }; V551.asset = null; }
  if (mode === 'object') { const d = v551ActiveDomain(); const idx = Math.max(0, d.assets.findIndex(a => a[0] === v551ActiveAsset()[0])); const p = v551AssetPos(d, idx, d.assets.length); V551.scale = 1.28; V551.pan = { x: (V551.center.x - p.x) * .7, y: (V551.center.y - p.y) * .7 }; }
  v551Save(); v551Render();
}

function v551Render() {
  const view = v551$('#trustmap');
  if (!view || !view.classList.contains('active')) return;
  v551InstallStyles();
  view.innerHTML = `<section class="v551-shell">${v551LeftPanel()}${v551MapPanel()}${v551RightPanel()}</section>`;
  v551ApplyTransform();
  v551MarkMeta();
}

function v551MarkMeta() {
  document.title = 'CyberShield V55.1 TrustMap Radar Constellation';
  const admin = v551$('#adminPayload');
  if (!admin) return;
  try {
    const payload = JSON.parse(admin.textContent || '{}');
    payload.build = 'V55.1 TrustMap Radar-Constellation Visual Grammar';
    payload.version = 'V55.1';
    payload.trustmap_visual_grammar = 'Radar-constellation interface with clean shield core, neon Layer 1 domain objects, straight weighted connectors, progressive disclosure, and reduced Fit Map text density.';
    admin.textContent = JSON.stringify(payload, null, 2);
  } catch {}
}

function v551InstallHandlers() {
  if (window.__v551Handlers) return;
  window.__v551Handlers = true;
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-v551-core]')) { document.querySelector('#mainNav button[data-view="runtime"]')?.click(); return; }
    const domain = event.target.closest('[data-v551-domain]');
    if (domain) { V551.domain = domain.dataset.v551Domain; V551.asset = null; v551SetMode('domain'); return; }
    const asset = event.target.closest('[data-v551-asset]');
    if (asset) { V551.domain = asset.dataset.v551Domain; V551.asset = asset.dataset.v551Asset; v551SetMode('object'); return; }
    const mode = event.target.closest('[data-v551-mode]');
    if (mode) { v551SetMode(mode.dataset.v551Mode); return; }
    const zoom = event.target.closest('[data-v551-zoom]');
    if (zoom) { V551.scale += zoom.dataset.v551Zoom === 'in' ? .1 : -.1; V551.scale = Math.max(.3, Math.min(2.2, V551.scale)); v551Save(); v551ApplyTransform(); return; }
    if (event.target.closest('[data-v551-reset]')) { V551.domain = null; V551.asset = null; v551SetMode('fit'); return; }
    if (event.target.closest('#mainNav button,#v53ScenarioSelect,#nextStep,#backStep,#skipDemo,#restartAssessment')) setTimeout(v551Render, 180);
  }, true);
  document.addEventListener('mousedown', (event) => { const vp = event.target.closest('#v551Viewport'); if (!vp || event.target.closest('button')) return; V551.drag = { x: event.clientX, y: event.clientY, pan: { ...V551.pan } }; vp.classList.add('dragging'); });
  document.addEventListener('mousemove', (event) => { if (!V551.drag) return; V551.pan = { x: V551.drag.pan.x + event.clientX - V551.drag.x, y: V551.drag.pan.y + event.clientY - V551.drag.y }; v551ApplyTransform(); });
  document.addEventListener('mouseup', () => { if (!V551.drag) return; V551.drag = null; v551$('#v551Viewport')?.classList.remove('dragging'); v551Save(); });
  document.addEventListener('wheel', (event) => { if (!event.target.closest('#v551Viewport')) return; event.preventDefault(); V551.scale += event.deltaY < 0 ? .07 : -.07; V551.scale = Math.max(.3, Math.min(2.2, V551.scale)); v551Save(); v551ApplyTransform(); }, { passive: false });
}

v551InstallHandlers();
window.addEventListener('load', () => setTimeout(v551Render, 900), { once: true });
setTimeout(v551Render, 1200);
