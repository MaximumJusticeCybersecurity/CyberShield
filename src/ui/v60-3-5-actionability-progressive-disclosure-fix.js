// V60.3.5 Actionability and Progressive Disclosure Fix
// Purpose: make executive-facing chips, bars, attention items, and boundary cards actionable;
// move trace/report/scaffold detail behind buttons; keep governance/build/version metadata in Settings only.
// Boundary: static advisory prototype only. No live scoring, live evidence retrieval, live workflow, or enforcement.

function v6035$(selector, root = document){ return root.querySelector(selector); }
function v6035$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v6035Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

const V6035_ROUTE_RULES = [
  { pattern:/needs verification|verify|verification/i, view:'evidence', note:'Showing what needs verification.' },
  { pattern:/evidence gap|missing evidence|evidence gaps/i, view:'evidence', note:'Showing evidence gaps and missing proof.' },
  { pattern:/decision record|decision required|decision records/i, view:'proof', note:'Showing decision records and proof context.' },
  { pattern:/trust model|model trace|score contract|universal score/i, view:'architecture', note:'Showing model trace and scoring architecture.' },
  { pattern:/runtime|what happens next|allowed|constrained|escalated|refused/i, view:'runtime', note:'Showing runtime action posture.' },
  { pattern:/boundary|overclaim|no overclaim|prototype|limitations/i, view:'settings', note:'Showing boundary and governance metadata in Settings.' },
  { pattern:/control doctrine|purpose protocol|six deep|scenario spine|architecture/i, view:'architecture', note:'Showing control doctrine and architecture.' },
  { pattern:/proof pack|report|board-ready|executive brief|preview/i, view:'proof', note:'Showing report and proof-pack preview controls.' },
  { pattern:/trustmap|trust map|map/i, view:'trustmap', note:'Opening the full TrustMap.' }
];

const V6035_METADATA_PATTERN = /\bV\d+(?:\.\d+)*\b|Current implemented build|GitHub Pages|QA required|governance-summary|bots\.txt|README|version of record|prototype boundary/i;
const V6035_DETAIL_SELECTORS = [
  '.v603-trace',
  '.v602-impact',
  '.v562-records',
  '.v561-register',
  '.v60-workbench:not([data-v6031-runtime-panel="true"]):not([data-v6031-proof-trace="true"])',
  '.v593-contract',
  '.v594-board',
  '.v595-qa',
  '.v59-scaffold'
];

function v6035ActiveView(){
  return document.querySelector('#briefing.active,#trustmap.active,#runtime.active,#evidence.active,#proof.active,#architecture.active,#settings.active');
}
function v6035ViewId(){ return v6035ActiveView()?.id || ''; }
function v6035IsSettings(){ return v6035ViewId() === 'settings'; }

function v6035InstallStyles(){
  if(v6035$('#v60-3-5-actionability-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-5-actionability-style';
  style.textContent = `
    .v6035-urgency-strip{position:relative;height:14px;border-radius:999px;overflow:visible;background:linear-gradient(90deg,#ff4c4c 0 33%,#ffd166 33% 66%,#25e69b 66% 100%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.18),0 0 12px rgba(66,215,255,.12);margin:9px 0 6px}.v6035-urgency-marker{position:absolute;top:-5px;left:var(--pos,33%);transform:translateX(-50%);width:22px;height:22px;border-radius:50%;background:#061726;border:3px solid #fff;box-shadow:0 0 13px rgba(255,255,255,.55);z-index:2}.v6035-urgency-labels{display:flex;justify-content:space-between;font-size:.62rem;text-transform:uppercase;letter-spacing:.05em;color:#bfefff;margin-bottom:8px}.v6035-actionable{cursor:pointer!important;position:relative}.v6035-actionable:hover{outline:1px solid rgba(66,215,255,.55);box-shadow:0 0 18px rgba(66,215,255,.16);}.v6035-actionable:after{content:'Open';position:absolute;right:8px;top:8px;border:1px solid rgba(66,215,255,.32);border-radius:999px;padding:2px 7px;font-size:.58rem;text-transform:uppercase;color:#8fd6ff;background:rgba(3,13,24,.82);pointer-events:none}.v6035-inline-link{border:1px solid rgba(66,215,255,.36);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:7px 10px;font-weight:900;cursor:pointer;display:inline-flex;margin:4px 6px 4px 0}.v6035-inline-link:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}.v6035-hidden-meta{display:none!important}.v6035-disclosure-card{border:1px solid rgba(66,215,255,.22);border-radius:18px;background:rgba(3,13,24,.72);padding:12px;margin:10px 0;color:#dff7ff}.v6035-disclosure-card strong{color:#fff}.v6035-disclosure-card p{margin:5px 0;color:#bfefff;line-height:1.42}.v6035-modal{position:fixed;inset:0;z-index:10030;display:grid;place-items:center;background:rgba(0,0,0,.68);padding:20px}.v6035-modal-card{width:min(1040px,96vw);max-height:88vh;overflow:auto;border:1px solid rgba(66,215,255,.42);border-radius:22px;background:linear-gradient(180deg,rgba(7,27,48,.98),rgba(3,13,24,.99));box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 38px rgba(66,215,255,.18);color:#dff7ff;padding:18px}.v6035-modal-card header{display:flex;justify-content:space-between;gap:14px;align-items:start;border-bottom:1px solid rgba(66,215,255,.16);padding-bottom:12px;margin-bottom:14px}.v6035-modal-card h2{margin:0;color:#fff}.v6035-close{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#fff;border-radius:999px;padding:7px 11px;font-weight:900;cursor:pointer}.v6035-route-flash{position:fixed;right:18px;bottom:18px;z-index:10031;max-width:360px;border:1px solid rgba(66,215,255,.4);background:rgba(3,13,24,.96);box-shadow:0 18px 40px rgba(0,0,0,.35),0 0 22px rgba(66,215,255,.18);border-radius:16px;padding:12px;color:#dff7ff;font-size:.85rem}.v6035-route-flash strong{display:block;color:#fff;margin-bottom:4px}
  `;
  document.head.appendChild(style);
}

function v6035Route(view, note){
  const btn = document.querySelector(`#mainNav button[data-view="${view}"]`);
  if(btn) btn.click();
  v6035Flash('CyberShield route', note || `Opened ${view}.`);
}

function v6035Flash(title, message){
  v6035$('.v6035-route-flash')?.remove();
  const el = document.createElement('div');
  el.className = 'v6035-route-flash';
  el.innerHTML = `<strong>${v6035Esc(title)}</strong>${v6035Esc(message)}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

function v6035RuleForText(text){ return V6035_ROUTE_RULES.find(rule => rule.pattern.test(text || '')); }

function v6035MarkActionables(){
  const view = v6035ActiveView();
  if(!view || v6035IsSettings()) return;
  const candidates = v6035$$('button,article,section,div.card,.card,[role="button"],.control-card,.metric-card,.v6033-card,.v6032-workspace-frame', view);
  candidates.forEach(el => {
    if(el.dataset.v6035Ready === 'true') return;
    if(el.closest('.v6035-modal,.v6035-disclosure-card,#adminPayload')) return;
    const text = (el.textContent || '').trim();
    const rule = v6035RuleForText(text);
    if(!rule) return;
    el.dataset.v6035Ready = 'true';
    el.dataset.v6035Route = rule.view;
    el.dataset.v6035Note = rule.note;
    el.classList.add('v6035-actionable');
    if(el.tagName === 'BUTTON') el.setAttribute('title', rule.note);
  });
}

function v6035FixHealthcareDrilldown(){
  const view = v6035ActiveView();
  if(!view) return;
  v6035$$('article,section,div,button', view).forEach(el => {
    if(el.dataset.v6035Healthcare === 'true') return;
    const text = el.textContent || '';
    if(!/healthcare provider|patient|clinical adjacent/i.test(text)) return;
    el.dataset.v6035Healthcare = 'true';
    el.dataset.v6035Route = 'evidence';
    el.dataset.v6035Note = 'Showing healthcare/data-use evidence requirements and verification gaps.';
    el.classList.add('v6035-actionable');
    v6035ApplyUrgencyStrip(el, 'critical');
  });
}

function v6035ApplyUrgencyStrip(el, level){
  if(!el || el.dataset.v6035Urgency === 'true') return;
  el.dataset.v6035Urgency = 'true';
  const pos = level === 'critical' ? '18%' : level === 'weak' ? '38%' : level === 'moderate' ? '56%' : '82%';
  const strip = document.createElement('div');
  strip.innerHTML = `<div class="v6035-urgency-strip" style="--pos:${pos}"><span class="v6035-urgency-marker"></span></div><div class="v6035-urgency-labels"><span>High urgency</span><span>Verify</span><span>Trusted</span></div>`;
  const target = el.querySelector('h1,h2,h3,strong,p') || el.firstElementChild || el;
  target.insertAdjacentElement('afterend', strip.firstElementChild);
  target.nextElementSibling?.insertAdjacentElement('afterend', strip.lastElementChild);
}

function v6035FixUrgencyBars(){
  const view = v6035ActiveView();
  if(!view || v6035IsSettings()) return;
  v6035$$('[class*="bar" i],[class*="meter" i],[class*="score" i],[class*="risk" i]', view).forEach(el => {
    if(el.offsetHeight > 40 || el.dataset.v6035BarFixed === 'true') return;
    if(!/gray|grey|risk|score|bar|meter|progress/i.test(el.className + ' ' + (el.textContent || ''))) return;
    el.dataset.v6035BarFixed = 'true';
    el.style.background = 'linear-gradient(90deg,#ff4c4c 0 33%,#ffd166 33% 66%,#25e69b 66% 100%)';
    el.style.borderRadius = '999px';
    el.style.minHeight = el.style.minHeight || '10px';
  });
}

function v6035HideMetadataOutsideSettings(){
  const view = v6035ActiveView();
  if(!view || v6035IsSettings()) return;
  v6035$$('article,section,div,span,p,small,h1,h2,h3,button', view).forEach(el => {
    if(el.closest('#adminPayload,.v6035-modal')) return;
    const text = (el.textContent || '').trim();
    if(!text) return;
    if(text.length < 320 && V6035_METADATA_PATTERN.test(text)) el.classList.add('v6035-hidden-meta');
  });
}

function v6035Modal(title, content){
  v6035$('.v6035-modal')?.remove();
  const modal = document.createElement('div');
  modal.className = 'v6035-modal';
  modal.innerHTML = `<section class="v6035-modal-card" role="dialog" aria-modal="true" aria-label="${v6035Esc(title)}"><header><div><h2>${v6035Esc(title)}</h2><p>Detailed trace opens on demand so executive tabs stay focused.</p></div><button type="button" class="v6035-close" data-v6035-close>Close</button></header><div>${content}</div></section>`;
  document.body.appendChild(modal);
}

function v6035ProgressiveDisclosure(){
  const view = v6035ActiveView();
  if(!view || v6035IsSettings()) return;
  V6035_DETAIL_SELECTORS.forEach(selector => {
    v6035$$(selector, view).forEach((block, index) => {
      if(block.dataset.v6035Disclosure === 'true') return;
      if(block.closest('#v6033FirstLayer')) return;
      block.dataset.v6035Disclosure = 'true';
      const title = /report|proof/i.test(block.textContent || '') ? 'Preview report / Proof Pack' : /model|trace|score/i.test(block.textContent || '') ? 'Inspect trace object' : /evidence/i.test(block.textContent || '') ? 'Open evidence detail' : 'Open supporting detail';
      const content = block.outerHTML;
      const card = document.createElement('section');
      card.className = 'v6035-disclosure-card';
      card.innerHTML = `<strong>${v6035Esc(title)}</strong><p>This detail is available on demand to keep the tab focused.</p><button type="button" class="v6035-inline-link" data-v6035-modal-title="${v6035Esc(title)}">${v6035Esc(title)}</button>`;
      card.querySelector('button').__v6035Content = content;
      block.insertAdjacentElement('beforebegin', card);
      block.classList.add('v6035-hidden-meta');
    });
  });
}

function v6035MarkMeta(){
  const payload = v6035$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.5 Actionability and Progressive Disclosure Fix';
    parsed.version = 'V60.3.5';
    parsed.previous_operational_build = 'V60.3.4 Governance Metadata Visibility Guard';
    parsed.actionability_progressive_disclosure = {
      status: 'active',
      fixes: [
        'actionable executive attention items',
        'needs verification routes to Evidence',
        'boundary routes to Settings',
        'healthcare drilldown routes to Evidence',
        'red/yellow/green urgency strip with marker',
        'trace/report/scaffold detail moved behind buttons',
        'governance/version metadata hidden outside Settings'
      ],
      github_pages_browser_qa_required: true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v6035Apply(){
  v6035InstallStyles();
  v6035FixHealthcareDrilldown();
  v6035FixUrgencyBars();
  v6035MarkActionables();
  v6035ProgressiveDisclosure();
  v6035HideMetadataOutsideSettings();
  v6035MarkMeta();
}

function v6035Handlers(){
  if(window.__v6035Handlers) return;
  window.__v6035Handlers = true;
  document.addEventListener('click', event => {
    const modalBtn = event.target.closest('[data-v6035-modal-title]');
    if(modalBtn){ v6035Modal(modalBtn.dataset.v6035ModalTitle, modalBtn.__v6035Content || '<p>No detail captured.</p>'); return; }
    if(event.target.closest('[data-v6035-close]') || (event.target.classList && event.target.classList.contains('v6035-modal'))){ v6035$('.v6035-modal')?.remove(); return; }
    const routeEl = event.target.closest('[data-v6035-route]');
    if(routeEl){ v6035Route(routeEl.dataset.v6035Route, routeEl.dataset.v6035Note); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v6033-route],[data-v603-score],[data-v603-model],[data-v602-open],[data-v60-open]')){
      setTimeout(v6035Apply, 1200);
      setTimeout(v6035Apply, 2600);
    }
  }, true);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') v6035$('.v6035-modal')?.remove(); });
}

v6035Handlers();
setTimeout(v6035Apply, 8600);
window.addEventListener('load', () => setTimeout(v6035Apply, 10400), { once:true });
setTimeout(v6035Apply, 12800);
