// V54.2 Enterprise Trust Universe
// Replaces the TrustMap visual model with one full kernel/ring/layer universe.

const V542_DOMAINS = [
  { id:'identity', label:'Identity & Access', icon:'👥', angle:-90, status:'moderate', assets:[
    ['mfa','MFA','moderate',['coverage gap','exception list']], ['priv','Privileged Accounts','weak',['owner unclear','review due']], ['approver','Approver Authority','moderate',['delegation gap','callback needed']], ['entra','Directory / Entra ID','strong',['sync active','policy mapped']]
  ]},
  { id:'cloud', label:'Cloud & Infrastructure', icon:'☁', angle:-54, status:'strong', assets:[
    ['cloudApps','Cloud Apps','strong',['policy mapped','logs present']], ['network','Network Boundary','moderate',['scope review','segment check']], ['backup','Backup Systems','weak',['validation due','owner gap']], ['logging','Logging','moderate',['retention check','alert review']]
  ]},
  { id:'third', label:'Third Parties', icon:'🤝', angle:-18, status:'weak', assets:[
    ['vendors','Vendors','weak',['claim unverified','contract stale']], ['msp','MSP / IT Provider','weak',['evidence gap','shared responsibility']], ['prime','Prime Contractor','moderate',['flow-down unclear','contact needed']], ['partners','Partners','moderate',['access review','scope confirm']]
  ]},
  { id:'ai', label:'AI & Automation', icon:'🧠', angle:18, status:'moderate', assets:[
    ['aiTools','AI Tools','moderate',['model boundary','usage unclear']], ['llm','LLM Access','moderate',['prompt context','data exposure']], ['agents','AI Agents','weak',['action limit','human review']], ['aiOutput','AI Output','moderate',['source data','review depth']]
  ]},
  { id:'data', label:'Data & Information', icon:'▣', angle:54, status:'weak', assets:[
    ['cui','CUI / FCI Data','weak',['scope unclear','owner missing']], ['patient','Patient Data','critical',['permitted use','access scope']], ['financial','Financial Data','moderate',['audit trail','destination check']], ['proprietary','Proprietary Data','moderate',['classification','lineage']]
  ]},
  { id:'endpoints', label:'Endpoints', icon:'▤', angle:90, status:'moderate', assets:[
    ['workstations','Workstations','strong',['patch current','user risk']], ['servers','Servers','moderate',['admin access','backup link']], ['mobile','Mobile Devices','moderate',['MDM check','lost device']], ['iot','IoT Devices','weak',['segmentation','inventory gap']]
  ]},
  { id:'cmmc', label:'CMMC & Compliance', icon:'⬟', angle:130, status:'weak', assets:[
    ['ssp','SSP','weak',['stale section','owner unclear']], ['poam','POA&M','moderate',['aging item','priority gap']], ['cuiBoundary','CUI Boundary','critical',['scope unknown','system edge']], ['controlEvidence','Control Evidence','weak',['evidence stale','control owner']]
  ]},
  { id:'payments', label:'Payments & Finance', icon:'$', angle:170, status:'critical', assets:[
    ['destination','Payment Destination','critical',['callback missing','email-only']], ['vendorIdentity','Vendor Identity','weak',['impersonation','record mismatch']], ['paymentAction','Payment Action','critical',['funds risk','approval gap']], ['auditTrail','Audit Trail','moderate',['log review','policy check']]
  ]},
  { id:'health', label:'Healthcare Data Trust', icon:'✚', angle:210, status:'weak', assets:[
    ['permittedUse','Permitted Use','critical',['policy unclear','purpose mismatch']], ['vendorAuth','Vendor Authorization','weak',['agreement check','scope gap']], ['accessApproval','Access Approval','moderate',['owner approval','role review']], ['clinicalFlow','Clinical Workflow','moderate',['workflow impact','handoff risk']]
  ]},
  { id:'proof', label:'Proof & Reports', icon:'▨', angle:250, status:'moderate', assets:[
    ['execBrief','Executive Brief','strong',['ready draft','owner route']], ['decisionRecord','Decision Record','strong',['timestamp','rationale']], ['roadmap','Remediation Roadmap','moderate',['30/60/90','task owner']], ['trustReport','Trust Report','moderate',['scenario route','signature path']]
  ]}
];

const V542_LENSES = {
  cmmc_applicability:{ label:'CMMC Applicability Trust Check', score:72, movement:'+8%', active:['cmmc','data','third','identity','proof'], risks:['CUI/FCI unknown','contract flow-down unclear','system scope uncertain','MSP claim dependency'] },
  cmmc_readiness:{ label:'CMMC Readiness Trust Check', score:54, movement:'-6%', active:['cmmc','data','identity','cloud','third','proof'], risks:['CUI boundary critical','SSP stale','control evidence weak','owner gap'] },
  payment_trust:{ label:'Community Bank Payment Trust Verification', score:49, movement:'-11%', active:['payments','identity','third','data','proof'], risks:['payment destination critical','vendor identity weak','approver authority unclear','audit trail incomplete'] },
  vendor_ai_access:{ label:'Manufacturing Vendor AI Access Trust', score:76, movement:'+14%', active:['endpoints','ai','third','cloud','data','proof'], risks:['access scope conditional','AI boundary unclear','operational data weak','maintenance window dependency'] },
  healthcare_data:{ label:'Healthcare Data / Vendor / AI Trust', score:52, movement:'-4%', active:['health','third','identity','data','ai','proof'], risks:['permitted use critical','vendor authorization weak','patient data exposure','audit trail weak'] },
  ai_output:{ label:'AI Output Trust', score:63, movement:'+5%', active:['ai','data','identity','third','proof'], risks:['source data weak','human review conditional','policy boundary unclear','client-facing consequence'] }
};

let v542Scale = Number(sessionStorage.getItem('v542Scale') || 0.46);
let v542Pan = JSON.parse(sessionStorage.getItem('v542Pan') || '{"x":0,"y":0}');
let v542Mode = sessionStorage.getItem('v542Mode') || 'fit';
let v542Domain = sessionStorage.getItem('v542Domain') || null;
let v542Asset = sessionStorage.getItem('v542Asset') || null;
let v542Dot = sessionStorage.getItem('v542Dot') || null;
let v542Trend = sessionStorage.getItem('v542Trend') || 'Daily';
let v542Drag = null;

const qs = (s,r=document) => r.querySelector(s);
const qsa = (s,r=document) => Array.from(r.querySelectorAll(s));
const html = (v) => String(v ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
const scenarioId = () => localStorage.getItem('cyberShieldV53Scenario') || 'cmmc_applicability';
const lens = () => V542_LENSES[scenarioId()] || V542_LENSES.cmmc_applicability;
const center = { x:900, y:700 };
const layerRadius = { one:260, two:455, three:610 };

function orgLabel(){
  try { return JSON.parse(qs('#adminPayload')?.textContent || '{}')?.state?.org || qs('#setOrg')?.value || qs('#obOrg')?.value || 'Your Organization'; }
  catch { return 'Your Organization'; }
}
function cls(status){
  const s = String(status).toLowerCase();
  if(s.includes('critical')) return 'critical';
  if(s.includes('weak')) return 'weak';
  if(s.includes('strong')) return 'strong';
  return 'moderate';
}
function color(status){ return {strong:'#18d486',moderate:'#f4b625',weak:'#ff7a22',critical:'#ff3c35',active:'#42d7ff',dim:'rgba(142,198,229,.28)'}[cls(status)] || '#42d7ff'; }
function polar(angle, radius){ const a = angle * Math.PI / 180; return { x:center.x + Math.cos(a)*radius, y:center.y + Math.sin(a)*radius }; }
function domainPos(d){ return polar(d.angle, layerRadius.one); }
function assetPos(d, index, count){ const spread = Math.min(36, 14 * count); const angle = d.angle + (index - (count-1)/2) * (spread / Math.max(1,count-1)); return polar(angle, layerRadius.two); }
function dotPos(d, assetIndex, dotIndex, assetCount, dotCount){ const baseSpread = Math.min(46, 14 * assetCount); const assetAngle = d.angle + (assetIndex - (assetCount-1)/2) * (baseSpread / Math.max(1,assetCount-1)); const angle = assetAngle + (dotIndex - (dotCount-1)/2) * 6; return polar(angle, layerRadius.three); }
function activeDomain(){ return V542_DOMAINS.find(d=>d.id===v542Domain) || V542_DOMAINS.find(d=>lens().active.includes(d.id)) || V542_DOMAINS[0]; }
function activeAsset(){ const d=activeDomain(); return d.assets.find(a=>a[0]===v542Asset) || d.assets[0]; }
function isActiveDomain(id){ return lens().active.includes(id); }
function shouldShowAssets(d){ return v542Mode==='fit' || v542Mode==='domain' && d.id===activeDomain().id || v542Mode==='object' && d.id===activeDomain().id; }
function shouldShowDots(d,a){ return v542Mode==='fit' || (v542Mode==='object' && d.id===activeDomain().id && a[0]===activeAsset()[0]); }
function save(){ sessionStorage.setItem('v542Scale',String(v542Scale)); sessionStorage.setItem('v542Pan',JSON.stringify(v542Pan)); sessionStorage.setItem('v542Mode',v542Mode); sessionStorage.setItem('v542Trend',v542Trend); v542Domain?sessionStorage.setItem('v542Domain',v542Domain):sessionStorage.removeItem('v542Domain'); v542Asset?sessionStorage.setItem('v542Asset',v542Asset):sessionStorage.removeItem('v542Asset'); v542Dot?sessionStorage.setItem('v542Dot',v542Dot):sessionStorage.removeItem('v542Dot'); }

function installStyles(){
  if(qs('#v54-2-style')) return;
  const style=document.createElement('style'); style.id='v54-2-style';
  style.textContent = `
    #trustmap .section-head{display:none!important}.v542-shell{display:grid;grid-template-columns:320px minmax(820px,1fr) 320px;gap:18px;align-items:stretch;overflow:hidden}.v542-panel{position:relative;z-index:20;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));border:1px solid rgba(66,215,255,.3);border-radius:22px;padding:16px;box-shadow:0 20px 44px rgba(0,0,0,.34);min-width:0}.v542-title{font-size:1.75rem;line-height:1.05;margin:0}.v542-sub{font-size:.75rem;text-transform:uppercase;letter-spacing:.1em;color:#8fd6ff;font-weight:900}.v542-card{border:1px solid rgba(66,215,255,.2);border-radius:16px;background:rgba(255,255,255,.055);padding:12px;margin-top:12px}.v542-score{width:150px;height:150px;margin:12px auto;border-radius:50%;display:grid;place-items:center;background:conic-gradient(#18d486 calc(var(--score)*1%),rgba(9,31,53,.92) 0);box-shadow:0 0 28px rgba(24,212,134,.2)}.v542-score div{width:110px;height:110px;border-radius:50%;display:grid;place-items:center;text-align:center;background:#061726;border:1px solid rgba(66,215,255,.25)}.v542-score strong{font-size:2.2rem}.v542-row{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;border-bottom:1px solid rgba(66,215,255,.12);padding:6px 0;font-size:.84rem}.v542-dotkey{width:12px;height:12px;border-radius:50%;background:currentColor;box-shadow:0 0 10px currentColor}.v542-map-panel{position:relative;z-index:5;min-height:820px;border:1px solid rgba(66,215,255,.26);border-radius:24px;background:radial-gradient(circle at 50% 50%,rgba(66,215,255,.18),transparent 18rem),linear-gradient(145deg,rgba(4,14,24,.99),rgba(6,23,38,.99));overflow:hidden;isolation:isolate}.v542-head{position:absolute;top:10px;left:16px;right:16px;z-index:50;text-align:center;pointer-events:none}.v542-head h2{margin:0;font-size:1.05rem;letter-spacing:.1em;text-transform:uppercase;color:#42d7ff}.v542-head span{display:block;color:#76e4a1;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase}.v542-viewport{position:absolute;inset:0;overflow:hidden;cursor:grab;z-index:8}.v542-viewport.dragging{cursor:grabbing}.v542-world{position:absolute;left:50%;top:50%;width:1800px;height:1400px;transform-origin:center center;transition:transform .15s ease}.v542-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(66,215,255,.45) 1px,transparent 1.8px),linear-gradient(rgba(66,215,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(66,215,255,.035) 1px,transparent 1px);background-size:58px 58px,54px 54px,54px 54px;opacity:.58}.v542-ring{position:absolute;left:900px;top:700px;transform:translate(-50%,-50%);border-radius:50%;border:1px solid rgba(66,215,255,.18);pointer-events:none}.v542-ring.core{width:250px;height:250px;background:rgba(66,215,255,.035)}.v542-ring.l1{width:520px;height:520px}.v542-ring.l2{width:910px;height:910px}.v542-ring.l3{width:1220px;height:1220px}.v542-ring-label{position:absolute;color:#8fd6ff;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;font-weight:900;text-shadow:0 0 8px #061726}.v542-kernel{position:absolute;left:900px;top:700px;transform:translate(-50%,-50%);z-index:18;width:190px;height:170px;padding:13px;display:grid;place-items:center;text-align:center;border:1px solid rgba(66,215,255,.85);background:radial-gradient(circle at 50% 20%,rgba(66,215,255,.36),rgba(5,18,32,.98));clip-path:polygon(50% 0,86% 12%,95% 45%,78% 78%,50% 100%,22% 78%,5% 45%,14% 12%);box-shadow:0 0 36px rgba(66,215,255,.7);color:#f5fbff}.v542-kernel img{width:62px;height:62px;object-fit:contain;filter:drop-shadow(0 0 13px rgba(66,215,255,.9))}.v542-domain,.v542-asset,.v542-riskdot{position:absolute;transform:translate(-50%,-50%);z-index:14;color:#f5fbff;text-align:center;cursor:pointer;transition:transform .14s,border-color .14s,opacity .14s,filter .14s}.v542-domain{width:128px;min-height:108px;border:1px solid rgba(66,215,255,.42);border-radius:18px;background:linear-gradient(180deg,rgba(16,64,96,.96),rgba(5,20,36,.99));padding:9px;box-shadow:0 16px 34px rgba(0,0,0,.3)}.v542-domain.dim,.v542-asset.dim,.v542-riskdot.dim{opacity:.32;filter:saturate(.6)}.v542-domain.active,.v542-domain:hover,.v542-asset.active,.v542-asset:hover,.v542-riskdot.active,.v542-riskdot:hover{transform:translate(-50%,-50%) scale(1.06);border-color:#42d7ff;box-shadow:0 0 0 3px rgba(66,215,255,.14),0 0 26px rgba(66,215,255,.35);opacity:1;filter:none}.v542-icon{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;margin:0 auto 5px;border:1px solid rgba(66,215,255,.55);background:rgba(66,215,255,.13);font-size:1.18rem}.v542-domain strong{display:block;font-size:.78rem;line-height:1.08}.v542-status{display:block;margin-top:4px;font-size:.6rem;text-transform:uppercase;font-weight:900}.v542-asset{width:96px;min-height:68px;border:1px solid rgba(66,215,255,.34);border-radius:15px;background:linear-gradient(180deg,rgba(12,46,74,.96),rgba(4,18,32,.99));padding:7px;font-size:.65rem;box-shadow:0 12px 24px rgba(0,0,0,.25)}.v542-asset strong{display:block;line-height:1.05}.v542-riskdot{width:18px;height:18px;border-radius:50%;border:2px solid #f5fbff;background:currentColor;box-shadow:0 0 14px currentColor}.v542-riskdot span{position:absolute;left:22px;top:50%;transform:translateY(-50%);white-space:nowrap;font-size:.58rem;padding:3px 6px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(3,13,24,.85);color:#f5fbff}.v542-edges{position:absolute;inset:0;z-index:4;pointer-events:none}.v542-edges path{fill:none;stroke-width:1.25;opacity:.8;filter:drop-shadow(0 0 4px currentColor)}.v542-edges .core{stroke:#42d7ff;stroke-dasharray:5 7}.v542-edges .active{stroke-width:2.1;opacity:1}.v542-controls{position:absolute;left:16px;bottom:16px;z-index:60;display:flex;gap:7px;flex-wrap:wrap;max-width:calc(100% - 32px)}.v542-controls button,.v542-time button{border:1px solid rgba(66,215,255,.35);background:rgba(6,23,38,.88);color:#f5fbff;border-radius:999px;padding:6px 9px;font-size:.75rem}.v542-controls button.active,.v542-time button.active{background:rgba(66,215,255,.2);border-color:#42d7ff}.v542-note{position:absolute;right:18px;bottom:18px;z-index:55;color:#8fd6ff;font-size:.7rem}.v542-distribution,.v542-trend{width:100%;height:145px}.v542-time{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}.v542-detail{margin-top:12px;border:1px solid rgba(66,215,255,.22);border-radius:16px;padding:12px;background:rgba(0,0,0,.18);font-size:.86rem}.v542-mini-scale{height:12px;border:1px solid rgba(255,255,255,.22);border-radius:999px;background:linear-gradient(90deg,#ff7474 0 33%,#ffd166 33% 67%,#76e4a1 67% 100%);position:relative;margin:7px 0}.v542-mini-scale span{position:absolute;top:50%;width:16px;height:16px;border-radius:50%;background:#061726;border:3px solid #f5fbff;transform:translate(-50%,-50%);box-shadow:0 0 12px rgba(66,215,255,.65)}@media(max-width:1180px){.v542-shell{grid-template-columns:1fr}.v542-map-panel{min-height:760px}.v542-world{width:1680px;height:1320px}.v542-panel{z-index:30}}@media(max-width:720px){.v542-map-panel{min-height:710px}.v542-world{width:1580px;height:1240px}.v542-domain{width:116px}.v542-asset{width:84px}.v542-riskdot span{display:none}}
  `;
  document.head.appendChild(style);
}

function edge(a,b,type='moderate',active=false,dash=false){
  const mx=(a.x+b.x)/2, my=(a.y+b.y)/2; const cx=center.x+(mx-center.x)*.16, cy=center.y+(my-center.y)*.16;
  const stroke = type==='core' ? '#42d7ff' : color(type);
  return `<path class="${type==='core'?'core':''} ${active?'active':''}" stroke="${stroke}" ${dash?'stroke-dasharray="5 6"':''} d="M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}"/>`;
}
function mapObjects(){
  const l=lens(); let edges=''; let domainHtml='', assetHtml='', dotHtml='';
  V542_DOMAINS.forEach(d=>{
    const dp=domainPos(d); const activeD=isActiveDomain(d.id)||d.id===v542Domain; edges+=edge(center,dp,'core',activeD,true);
    domainHtml += `<button class="v542-domain ${activeD?'active':'dim'} ${v542Domain===d.id?'selected':''}" data-v542-domain="${html(d.id)}" style="left:${dp.x}px;top:${dp.y}px"><span class="v542-icon">${d.icon}</span><strong>${html(d.label)}</strong><span class="v542-status" style="color:${color(d.status)}">${html(d.status)}</span></button>`;
    d.assets.forEach((a,i)=>{
      const ap=assetPos(d,i,d.assets.length); const activeA=activeD || a[0]===v542Asset; if(shouldShowAssets(d)){ edges += edge(dp,ap,a[2],activeA,false); assetHtml += `<button class="v542-asset ${activeA?'active':'dim'}" data-v542-domain="${html(d.id)}" data-v542-asset="${html(a[0])}" style="left:${ap.x}px;top:${ap.y}px"><strong>${html(a[1])}</strong><span class="v542-status" style="color:${color(a[2])}">${html(a[2])}</span></button>`; }
      a[3].forEach((dot,j)=>{ if(shouldShowDots(d,a)){ const rp=dotPos(d,i,j,d.assets.length,a[3].length); const id=`${a[0]}-${j}`; const activeDot=id===v542Dot; edges += edge(ap,rp,a[2],activeDot,false); dotHtml += `<button class="v542-riskdot ${activeDot?'active':''} ${activeA?'':'dim'}" data-v542-domain="${html(d.id)}" data-v542-asset="${html(a[0])}" data-v542-dot="${html(id)}" data-v542-dot-label="${html(dot)}" style="left:${rp.x}px;top:${rp.y}px;color:${color(a[2])}"><span>${html(dot)}</span></button>`; }});
    });
  });
  // Cross-asset relationship lines in full and object views.
  const links=[['workstations','servers'],['mobile','servers'],['iot','servers'],['cuiBoundary','ssp'],['destination','vendorIdentity'],['aiOutput','source'],['patient','permittedUse'],['vendors','msp'],['controlEvidence','decisionRecord']];
  if(v542Mode==='fit'||v542Mode==='object'){
    links.forEach(([from,to])=>{ const f=findAssetPoint(from), t=findAssetPoint(to); if(f&&t) edges += edge(f,t,'core',false,true); });
  }
  return {edges, domainHtml, assetHtml, dotHtml};
}
function findAssetPoint(id){
  for(const d of V542_DOMAINS){ const idx=d.assets.findIndex(a=>a[0]===id); if(idx>=0) return assetPos(d,idx,d.assets.length); } return null;
}

function distributionSvg(l){
  const score=adjustedScore(l.score); const strong=Math.max(12,Math.round(score*.42)); const moderate=Math.max(20,Math.round((100-score)*.45)); const weak=Math.max(8,Math.round((100-score)*.32)); const critical=Math.max(3,100-strong-moderate-weak); const parts=[strong,moderate,weak,critical]; const colors=['#18d486','#f4b625','#ff7a22','#ff3c35']; let off=25;
  return `<svg class="v542-distribution" viewBox="0 0 152 152"><circle cx="76" cy="76" r="52" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="18"/>${parts.map((p,i)=>{const el=`<circle cx="76" cy="76" r="52" fill="none" stroke="${colors[i]}" stroke-width="18" stroke-dasharray="${p} ${100-p}" stroke-dashoffset="${off}" pathLength="100" transform="rotate(-90 76 76)"/>`; off-=p; return el;}).join('')}<text x="76" y="72" text-anchor="middle" fill="#d8ecf8" font-size="10">TRUST</text><text x="76" y="94" text-anchor="middle" fill="#f5fbff" font-size="27" font-weight="900">${score}</text></svg>`;
}
function trendSvg(score){
  const count={Hourly:12,Daily:16,Weekly:14,Monthly:12}[v542Trend]||16; const pts=Array.from({length:count},(_,i)=>Math.max(15,Math.min(92,score-5+Math.sin(i*1.2)*5+(i-count/2)*(score>65?.42:-.12))));
  const p=pts.map((v,i)=>`${i?'L':'M'}${10+i*(280/(count-1))} ${110-v}`).join(' '); return `<svg class="v542-trend" viewBox="0 0 310 130"><path d="M10 110H300M10 85H300M10 60H300M10 35H300" stroke="rgba(66,215,255,.1)"/><path d="${p}" fill="none" stroke="#42d7ff" stroke-width="3"/><circle cx="290" cy="${110-pts.at(-1)}" r="5" fill="#42d7ff"/></svg>`;
}
function adjustedScore(base){
  let s=base; try{const payload=JSON.parse(qs('#adminPayload')?.textContent||'{}'); if(payload?.state?.evidence==='high') s+=7; if(payload?.state?.evidence==='low') s-=9;}catch{}
  try{const unk=Object.values(JSON.parse(localStorage.getItem('cyberShieldV53CmmcAnswers')||'{}')).filter(v=>String(v).toLowerCase().includes('don')).length; if(scenarioId().includes('cmmc')) s-=unk*2;}catch{}
  return Math.max(15,Math.min(95,Math.round(s)));
}
function leftPanel(){ const l=lens(), score=adjustedScore(l.score); return `<aside class="v542-panel"><h1 class="v542-title">TRUST MAP</h1><div class="v542-sub">enterprise trust universe</div><section class="v542-card"><div class="v542-sub">Organizational Trust Score</div><div class="v542-score" style="--score:${score}"><div><strong>${score}</strong><span>/100</span></div></div><p>One map.  Scenario lenses highlight the active trust path.</p></section><section class="v542-card"><div class="v542-sub">Trust Movement</div><h3>${html(l.movement)}</h3><p>Demo trend changes with the scenario lens and onboarding confidence.</p></section><section class="v542-card"><div class="v542-sub">Top Trust Break Drivers</div>${l.risks.map((r,i)=>`<div class="v542-row"><span class="v542-dotkey" style="color:${['#ff3c35','#ff7a22','#f4b625','#42d7ff'][i]}"></span><span>${html(r)}</span><strong>${i===0?'Critical':i<2?'High':'Medium'}</strong></div>`).join('')}</section></aside>`; }
function selectedDetail(){
  const d=activeDomain(); const a=activeAsset(); const dotLabel=v542Dot ? (a[3].find((_,i)=>`${a[0]}-${i}`===v542Dot) || 'selected dot') : null;
  if(v542Dot) return `<div class="v542-detail"><div class="v542-sub">Layer 3 Tagged Detail</div><h3>${html(dotLabel)}</h3><p><strong>Parent:</strong> ${html(a[1])}</p><p><strong>Status:</strong> ${html(a[2])}</p><p><strong>Owner:</strong> assigned domain owner</p><p><strong>If wrong:</strong> ${html(lens().risks[0])}</p><p><strong>Action:</strong> verify source, owner, scope, freshness, and decision route.</p></div>`;
  if(v542Asset) return `<div class="v542-detail"><div class="v542-sub">Layer 2 Asset Detail</div><h3>${html(a[1])}</h3><p><strong>Domain:</strong> ${html(d.label)}</p><p><strong>Status:</strong> ${html(a[2])}</p><p><strong>Layer 3 tags:</strong> ${html(a[3].join(', '))}</p><p><strong>Report route:</strong> Decision Record / Proof Pack</p></div>`;
  return `<div class="v542-detail"><div class="v542-sub">Layer 1 Domain Detail</div><h3>${html(d.label)}</h3><p><strong>Status:</strong> ${html(d.status)}</p><p><strong>Assets:</strong> ${html(d.assets.map(x=>x[1]).join(', '))}</p><p><strong>Click an asset for Layer 3 tagged detail.</strong></p></div>`;
}
function rightPanel(){ const l=lens(), score=adjustedScore(l.score); return `<aside class="v542-panel"><section><div class="v542-sub">Trust Level Distribution</div>${distributionSvg(l)}</section><section class="v542-card"><div class="v542-sub">Active Risks</div>${l.risks.map((r,i)=>`<div class="v542-row"><span class="v542-dotkey" style="color:${['#ff3c35','#ff7a22','#f4b625','#42d7ff'][i]}"></span><span>${html(r)}</span><strong>${i===0?'Critical':i<2?'High':'Medium'}</strong></div>`).join('')}</section><section class="v542-card"><div class="v542-sub">Trend Line</div><div class="v542-time">${['Hourly','Daily','Weekly','Monthly'].map(t=>`<button type="button" data-v542-trend="${t}" class="${v542Trend===t?'active':''}">${t}</button>`).join('')}</div>${trendSvg(score)}</section>${selectedDetail()}</aside>`; }
function mapPanel(){ const objs=mapObjects(); return `<main class="v542-map-panel"><div class="v542-head"><h2>Enterprise Trust Universe</h2><span>${html(lens().label)} • kernel / layer 1 / layer 2 / layer 3</span></div><div class="v542-viewport" id="v542Viewport"><div class="v542-world" id="v542World"><div class="v542-grid"></div><div class="v542-ring core"></div><div class="v542-ring l1"></div><div class="v542-ring l2"></div><div class="v542-ring l3"></div><span class="v542-ring-label" style="left:910px;top:548px">Kernel</span><span class="v542-ring-label" style="left:910px;top:430px">Layer 1 Domains</span><span class="v542-ring-label" style="left:910px;top:236px">Layer 2 Assets</span><span class="v542-ring-label" style="left:910px;top:80px">Layer 3 Tags</span><svg class="v542-edges" viewBox="0 0 1800 1400">${objs.edges}</svg><button class="v542-kernel" type="button" data-v542-mode="kernel"><img src="assets/mjc-logo-2026.png" alt="MJC logo"><strong>CyberShield Core</strong><small>${html(orgLabel())}</small><small>Trust Kernel</small></button>${objs.domainHtml}${objs.assetHtml}${objs.dotHtml}</div></div><div class="v542-controls"><button type="button" data-v542-mode="fit">Fit Map</button><button type="button" data-v542-mode="kernel">Kernel View</button><button type="button" data-v542-mode="domain">Domain View</button><button type="button" data-v542-mode="object">Object View</button><button type="button" data-v542-zoom="out">−</button><button type="button" data-v542-zoom="in">+</button><button type="button" data-v542-reset>Reset</button></div><div class="v542-note">Drag to pan • wheel/buttons to zoom</div></main>`; }

function applyTransform(){ const w=qs('#v542World'); if(!w) return; w.style.transform=`translate(calc(-50% + ${v542Pan.x}px), calc(-50% + ${v542Pan.y}px)) scale(${v542Scale})`; qsa('[data-v542-mode]').forEach(b=>b.classList.toggle('active',b.dataset.v542Mode===v542Mode)); }
function render(){ const view=qs('#trustmap'); if(!view || !view.classList.contains('active')) return; installStyles(); view.innerHTML=`<section class="v542-shell">${leftPanel()}${mapPanel()}${rightPanel()}</section>`; applyTransform(); markMeta(); }
function setView(mode){ v542Mode=mode; if(mode==='fit'){v542Scale=.44;v542Pan={x:0,y:0};v542Asset=null;v542Dot=null;} if(mode==='kernel'){v542Scale=.72;v542Pan={x:0,y:0};v542Asset=null;v542Dot=null;} if(mode==='domain'){const d=activeDomain();const p=domainPos(d);v542Scale=.95;v542Pan={x:(center.x-p.x)*.45,y:(center.y-p.y)*.45};v542Asset=null;v542Dot=null;} if(mode==='object'){const d=activeDomain();const ai=d.assets.findIndex(a=>a[0]===activeAsset()[0]);const p=assetPos(d,Math.max(0,ai),d.assets.length);v542Scale=1.18;v542Pan={x:(center.x-p.x)*.7,y:(center.y-p.y)*.7};v542Dot=null;} save(); render(); }
function markMeta(){ document.title='CyberShield V54.2 Enterprise Trust Universe'; const a=qs('#adminPayload'); if(!a) return; try{const p=JSON.parse(a.textContent||'{}'); p.build='V54.2 Enterprise Trust Universe'; p.version='V54.2'; p.trustmap='Full kernel-centered enterprise trust universe with Layer 1 domains, Layer 2 assets, Layer 3 tagged dots, scenario lensing, zoom, pan, and contained side panels.'; a.textContent=JSON.stringify(p,null,2);}catch{} }
function patchBriefing(){ const cards=qsa('#executiveSummary .summary-card'); if(!cards.length)return; const s=adjustedScore(lens().score); const vals=[Math.min(92,s+14),Math.min(88,s+8),s,Math.max(20,s-10),Math.min(85,s+4),Math.max(12,s-28)]; cards.forEach((c,i)=>{c.querySelector('.v54-mini-scale')?.remove();c.querySelector('.v542-mini-scale')?.remove();c.classList.remove('good','warn','bad');const v=vals[i]||s;c.classList.add(v>=67?'good':v>=40?'warn':'bad');c.querySelector('.metric')?.insertAdjacentHTML('afterend',`<div class="v542-mini-scale"><span style="left:${v}%"></span></div>`);}); }
function installHandlers(){ if(window.__v542Handlers)return; window.__v542Handlers=true; document.addEventListener('click',e=>{ const domain=e.target.closest('[data-v542-domain]:not([data-v542-asset])'); if(domain){v542Domain=domain.dataset.v542Domain; v542Asset=null; v542Dot=null; setView('domain'); return;} const asset=e.target.closest('[data-v542-asset]'); if(asset){v542Domain=asset.dataset.v542Domain; v542Asset=asset.dataset.v542Asset; v542Dot=null; setView('object'); return;} const dot=e.target.closest('[data-v542-dot]'); if(dot){v542Domain=dot.dataset.v542Domain; v542Asset=dot.dataset.v542Asset; v542Dot=dot.dataset.v542Dot; v542Mode='object'; save(); render(); return;} const mode=e.target.closest('[data-v542-mode]'); if(mode){setView(mode.dataset.v542Mode); return;} const zoom=e.target.closest('[data-v542-zoom]'); if(zoom){v542Scale += zoom.dataset.v542Zoom==='in'?.1:-.1; v542Scale=Math.max(.25,Math.min(2.2,v542Scale)); save(); applyTransform(); return;} if(e.target.closest('[data-v542-reset]')){v542Domain=null;v542Asset=null;v542Dot=null;setView('fit');return;} const trend=e.target.closest('[data-v542-trend]'); if(trend){v542Trend=trend.dataset.v542Trend;save();render();return;} if(e.target.closest('#mainNav button,#v53ScenarioSelect,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-cmmc-q]')) setTimeout(()=>{patchBriefing();render();},150); },true);
  document.addEventListener('mousedown',e=>{const vp=e.target.closest('#v542Viewport'); if(!vp || e.target.closest('button'))return; v542Drag={x:e.clientX,y:e.clientY,pan:{...v542Pan}}; vp.classList.add('dragging');}); document.addEventListener('mousemove',e=>{if(!v542Drag)return; v542Pan={x:v542Drag.pan.x+e.clientX-v542Drag.x,y:v542Drag.pan.y+e.clientY-v542Drag.y}; applyTransform();}); document.addEventListener('mouseup',()=>{if(!v542Drag)return; v542Drag=null; qs('#v542Viewport')?.classList.remove('dragging'); save();}); document.addEventListener('wheel',e=>{if(!e.target.closest('#v542Viewport'))return; e.preventDefault(); v542Scale += e.deltaY<0?.07:-.07; v542Scale=Math.max(.25,Math.min(2.2,v542Scale)); save(); applyTransform();},{passive:false}); }

function run(){ installStyles(); patchBriefing(); render(); }
installHandlers(); window.addEventListener('load',()=>setTimeout(run,700),{once:true}); setTimeout(run,900);
