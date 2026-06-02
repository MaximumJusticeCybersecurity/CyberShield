// V60.3.17 Briefing TrustMap Snapshot Image
// Purpose: replace the generated Briefing TrustMap Snapshot mockup with the rendered Trust Map Snapshot image from assets.
// Boundary: static advisory prototype only. No live scoring, evidence retrieval, workflow automation, or enforcement.

const V60317_SNAPSHOT_CANDIDATES = [
  'assets/The Trust Map.png',
  'assets/The%20Trust%20Map.png',
  'assets/trust-map-snapshot.png',
  'assets/Trust Map Snapshot.png',
  'assets/TrustMap Snapshot.png'
];

function v60317$(selector, root=document){ return root.querySelector(selector); }
function v60317Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

function v60317InstallStyles(){
  if(v60317$('#v60-3-17-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-17-style';
  style.textContent = `
    #briefing.active .v60317-snapshot-frame{
      position:relative;
      border:1px solid rgba(66,215,255,.26);
      border-radius:20px;
      overflow:hidden;
      min-height:330px;
      background:radial-gradient(circle at 50% 45%,rgba(223,249,255,.11),rgba(2,5,11,.98) 58%,#02050b 100%);
      box-shadow:inset 0 0 52px rgba(2,5,11,.9),0 0 28px rgba(66,215,255,.12);
    }
    #briefing.active .v60317-snapshot-img{
      width:100%;
      height:100%;
      min-height:330px;
      display:block;
      object-fit:cover;
      object-position:center center;
      filter:drop-shadow(0 0 12px rgba(66,215,255,.12));
    }
    #briefing.active .v60317-snapshot-caption{
      position:absolute;
      left:12px;
      right:12px;
      bottom:10px;
      display:flex;
      justify-content:space-between;
      gap:8px;
      align-items:center;
      padding:7px 10px;
      border:1px solid rgba(223,249,255,.18);
      border-radius:999px;
      background:rgba(2,5,11,.64);
      color:#dff7ff;
      font-size:.72rem;
      font-weight:900;
      letter-spacing:.04em;
      text-transform:uppercase;
      backdrop-filter:blur(6px);
    }
    #briefing.active .v60317-snapshot-caption span:last-child{
      color:#76e4a1;
    }
    @media(max-width:1050px){#briefing.active .v60317-snapshot-frame{min-height:300px}#briefing.active .v60317-snapshot-img{min-height:300px}}
    @media(max-width:640px){#briefing.active .v60317-snapshot-frame{min-height:210px}#briefing.active .v60317-snapshot-img{min-height:210px}.v60317-snapshot-caption{font-size:.62rem!important}}
  `;
  document.head.appendChild(style);
}

function v60317AttachFallback(img){
  if(!img || img.dataset.v60317FallbackReady === 'true') return;
  img.dataset.v60317FallbackReady = 'true';
  img.dataset.v60317CandidateIndex = '0';
  img.addEventListener('error', () => {
    const current = Number(img.dataset.v60317CandidateIndex || '0');
    const next = current + 1;
    if(next >= V60317_SNAPSHOT_CANDIDATES.length) return;
    img.dataset.v60317CandidateIndex = String(next);
    img.src = V60317_SNAPSHOT_CANDIDATES[next];
  });
}

function v60317ReplaceSnapshot(){
  const briefing = v60317$('#briefing.active');
  if(!briefing) return;
  const mapWrap = v60317$('.v6033-map-wrap', briefing);
  if(!mapWrap || mapWrap.dataset.v60317Replaced === 'true') return;
  mapWrap.dataset.v60317Replaced = 'true';
  mapWrap.innerHTML = `<div class="v60317-snapshot-frame"><img class="v60317-snapshot-img" src="${v60317Esc(V60317_SNAPSHOT_CANDIDATES[0])}" alt="CyberShield Trust Map Snapshot"><div class="v60317-snapshot-caption"><span>Trust Map Snapshot</span><span>Verified Trust View</span></div></div>`;
  v60317AttachFallback(v60317$('.v60317-snapshot-img', mapWrap));
}

function v60317MarkMeta(){
  const payload = v60317$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.17 Briefing TrustMap Snapshot Image';
    parsed.version = 'V60.3.17';
    parsed.previous_operational_build = 'V60.3.16 TrustMap Centerline Fiber Connectors, Three-Pane Separation, Trust Kernel Detail, and Stoplight Risk Rows';
    parsed.briefing_trustmap_snapshot_image = {
      status:'active_static_snapshot_image',
      image:'assets/The Trust Map.png',
      rule:'Briefing TrustMap Snapshot uses the rendered Trust Map Snapshot image. Full TrustMap remains interactive on the TrustMap tab.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed,null,2);
  }catch{}
}

function v60317Apply(){
  if(!v60317$('#briefing.active')) return;
  v60317InstallStyles();
  v60317ReplaceSnapshot();
  v60317MarkMeta();
}
function v60317Handlers(){
  if(window.__v60317Handlers) return;
  window.__v60317Handlers = true;
  document.addEventListener('click', () => setTimeout(v60317Apply,160), true);
  document.addEventListener('cybershield:first-layer-decision-brief-loaded', () => setTimeout(v60317Apply,180));
}
v60317Handlers();
setTimeout(v60317Apply,2600);
window.addEventListener('load', () => setTimeout(v60317Apply,3200), {once:true});
setTimeout(v60317Apply,4200);
