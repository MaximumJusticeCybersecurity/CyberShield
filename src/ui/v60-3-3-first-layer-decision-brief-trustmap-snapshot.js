// V60.3.3 First-Layer Decision Brief and TrustMap Snapshot
// Purpose: make the first executive layer read: Decision first, map beside it, proof underneath.
// Boundary: static advisory prototype only. No live scoring, evidence retrieval, statistical validation, workflow, or enforcement.

const V6033_BRIEF_PATH = 'data/briefing/v60-3-3-first-layer-decision-brief.json';
const V6033_STATE = { registry: null };

function v6033$(selector, root = document){ return root.querySelector(selector); }
function v6033$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function v6033Esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function v6033LoadRegistry(){
  if(V6033_STATE.registry) return V6033_STATE.registry;
  const response = await fetch(V6033_BRIEF_PATH, { cache:'no-store' });
  if(!response.ok) throw new Error(`V60.3.3 decision brief registry fetch failed: ${response.status}`);
  V6033_STATE.registry = await response.json();
  window.CyberShieldFirstLayerDecisionBriefV6033 = V6033_STATE.registry;
  document.dispatchEvent(new CustomEvent('cybershield:first-layer-decision-brief-loaded', { detail: { registry: V6033_STATE.registry } }));
  return V6033_STATE.registry;
}

function v6033InstallStyles(){
  if(v6033$('#v60-3-3-first-layer-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-3-first-layer-style';
  style.textContent = `
    .v6033-first-layer{border:1px solid rgba(66,215,255,.34);border-radius:28px;background:linear-gradient(145deg,rgba(4,14,24,.96),rgba(6,23,38,.98));box-shadow:0 24px 58px rgba(0,0,0,.34),0 0 40px rgba(66,215,255,.1);padding:18px;margin:0 0 16px;color:#dff7ff;position:relative;overflow:hidden}
    .v6033-first-layer:before{content:"";position:absolute;inset:-40%;background:radial-gradient(circle at 78% 18%,rgba(66,215,255,.16),transparent 28rem);pointer-events:none}.v6033-inner{position:relative;z-index:2}.v6033-kicker{display:inline-flex;border:1px solid rgba(66,215,255,.42);border-radius:999px;padding:4px 9px;font-size:.7rem;font-weight:900;text-transform:uppercase;letter-spacing:.08em;color:#8fd6ff;margin-bottom:10px}.v6033-layout{display:grid;grid-template-columns:minmax(330px,.95fr) minmax(360px,1.05fr);gap:16px;align-items:stretch}.v6033-panel{border:1px solid rgba(66,215,255,.22);border-radius:22px;background:rgba(255,255,255,.045);padding:16px;min-width:0}.v6033-panel h2{margin:0 0 8px;color:#fff;font-size:1.22rem}.v6033-panel h3{margin:14px 0 7px;color:#8fd6ff;font-size:.78rem;text-transform:uppercase;letter-spacing:.1em}.v6033-panel p{line-height:1.48;margin:6px 0}.v6033-decision{display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid rgba(255,138,48,.35);border-radius:18px;background:rgba(255,138,48,.07);padding:12px;margin:10px 0}.v6033-decision strong{font-size:2rem;color:#fff;line-height:1}.v6033-posture{display:inline-flex;border:1px solid rgba(255,209,102,.42);border-radius:999px;padding:5px 9px;color:#ffe7a6;font-size:.75rem;font-weight:900;text-transform:uppercase}.v6033-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:8px;margin-top:10px}.v6033-card{border:1px solid rgba(66,215,255,.14);border-radius:16px;background:rgba(0,0,0,.16);padding:10px}.v6033-card strong{display:block;color:#fff;margin-bottom:4px}.v6033-small{font-size:.8rem;color:#bfefff;line-height:1.42}.v6033-proof-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px;margin-top:12px}.v6033-proof-row .v6033-card{min-height:92px}.v6033-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v6033-btn{border:1px solid rgba(66,215,255,.34);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:999px;padding:8px 11px;font-weight:900;cursor:pointer}.v6033-btn:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}
    .v6033-map{position:relative;min-height:330px;border-radius:20px;background:radial-gradient(circle at 50% 50%,rgba(66,215,255,.16),transparent 12rem),linear-gradient(145deg,rgba(4,14,24,.99),rgba(5,19,34,.99));overflow:hidden;border:1px solid rgba(66,215,255,.2)}.v6033-map svg{position:absolute;inset:0;width:100%;height:100%;}.v6033-node{position:absolute;transform:translate(-50%,-50%);display:grid;place-items:center;text-align:center;border-radius:999px;border:1px solid currentColor;background:rgba(3,13,24,.88);box-shadow:0 0 18px currentColor;font-size:.68rem;font-weight:900;color:#42d7ff;padding:8px;min-width:72px;min-height:72px}.v6033-node.center{left:50%;top:50%;width:104px;height:104px;color:#42d7ff;border-width:3px;box-shadow:0 0 24px rgba(66,215,255,.75),0 0 44px rgba(66,215,255,.28)}.v6033-node.strong{color:#25e69b}.v6033-node.moderate{color:#ffd166}.v6033-node.weak{color:#ff8a30}.v6033-node.critical{color:#ff4c4c}.v6033-node.n1{left:50%;top:17%}.v6033-node.n2{left:82%;top:38%}.v6033-node.n3{left:70%;top:78%}.v6033-node.n4{left:30%;top:78%}.v6033-node.n5{left:18%;top:38%}.v6033-gap{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);max-width:82%;border:1px solid rgba(255,76,76,.3);background:rgba(255,76,76,.07);border-radius:14px;padding:8px 10px;color:#ffd1d1;font-size:.78rem;text-align:center}.v6033-boundary{border:1px solid rgba(255,76,76,.24);background:rgba(255,76,76,.055);border-radius:14px;padding:9px 10px;margin-top:12px;color:#ffd1d1;font-size:.78rem}.v6033-mobile-toggle{display:none}
    @media(max-width:1050px){.v6033-layout{grid-template-columns:1fr}.v6033-map{min-height:300px}}
    @media(max-width:640px){.v6033-first-layer{padding:12px}.v6033-panel{padding:12px}.v6033-decision{display:block}.v6033-decision strong{display:block;margin-bottom:8px}.v6033-mobile-toggle{display:inline-flex}.v6033-map-collapsed .v6033-map{max-height:92px;min-height:92px}.v6033-map-collapsed .v6033-node:not(.center),.v6033-map-collapsed .v6033-gap{display:none}}
  `;
  document.head.appendChild(style);
}

function v6033StateClass(state){
  const s = String(state || '').toLowerCase();
  if(s.includes('critical')) return 'critical';
  if(s.includes('weak')) return 'weak';
  if(s.includes('strong')) return 'strong';
  return 'moderate';
}

function v6033Brief(){ return V6033_STATE.registry?.sample_decision_brief || {}; }
function v6033Snapshot(){ return V6033_STATE.registry?.trustmap_snapshot || {}; }
function v6033Details(){ return V6033_STATE.registry?.details_below || []; }

function v6033MapHtml(){
  const snap = v6033Snapshot();
  const domains = snap.affected_domains || [];
  const nodes = domains.slice(0,5).map((d,i) => `<div class="v6033-node n${i+1} ${v6033StateClass(d.state)}"><span>${v6033Esc(d.label)}</span></div>`).join('');
  return `<div class="v6033-map-wrap"><div class="v6033-map"><svg viewBox="0 0 100 100" aria-hidden="true"><defs><filter id="v6033Glow"><feGaussianBlur stdDeviation="1.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g stroke="#42d7ff" stroke-width=".7" opacity=".55" filter="url(#v6033Glow)"><line x1="50" y1="50" x2="50" y2="17"/><line x1="50" y1="50" x2="82" y2="38"/><line x1="50" y1="50" x2="70" y2="78"/><line x1="50" y1="50" x2="30" y2="78"/><line x1="50" y1="50" x2="18" y2="38"/></g><circle cx="50" cy="50" r="21" fill="none" stroke="rgba(66,215,255,.16)"/><circle cx="50" cy="50" r="35" fill="none" stroke="rgba(66,215,255,.11)"/><circle cx="50" cy="50" r="46" fill="none" stroke="rgba(66,215,255,.08)"/></svg><div class="v6033-node center">${v6033Esc(snap.central_decision_node || 'Decision')}</div>${nodes}<div class="v6033-gap"><strong>Weak link:</strong> ${v6033Esc(snap.weak_link || 'Evidence gap')}<br><strong>Human path:</strong> ${v6033Esc(snap.human_approval_path || 'Owner -> reviewer -> Proof Pack')}</div></div></div>`;
}

function v6033Html(){
  const r = V6033_STATE.registry || {};
  const brief = v6033Brief();
  const snap = v6033Snapshot();
  return `<section class="v6033-first-layer" id="v6033FirstLayer"><div class="v6033-inner"><span class="v6033-kicker">First-layer executive view</span><div class="v6033-layout"><article class="v6033-panel"><h2>Decision Brief</h2><p class="v6033-small">${v6033Esc(brief.what_cybershield_thinks_is_happening)}</p><div class="v6033-decision"><div><span class="v6033-small">Decision</span><strong>${v6033Esc(brief.decision || 'Escalate')}</strong></div><span class="v6033-posture">${v6033Esc(brief.runtime_posture || 'Constrain until human review')}</span></div><div class="v6033-grid"><div class="v6033-card"><strong>Why it matters</strong><span class="v6033-small">${v6033Esc(brief.why_it_matters)}</span></div><div class="v6033-card"><strong>Risk if wrong</strong><span class="v6033-small">${v6033Esc(brief.risk_if_wrong)}</span></div><div class="v6033-card"><strong>Next action</strong><span class="v6033-small">${v6033Esc(brief.next_action)}</span></div><div class="v6033-card"><strong>Owner</strong><span class="v6033-small">${v6033Esc(brief.owner)}</span></div></div><div class="v6033-actions"><button type="button" class="v6033-btn" data-v6033-route="runtime">Open Runtime</button><button type="button" class="v6033-btn" data-v6033-route="proof">Inspect Proof Pack</button><button type="button" class="v6033-btn" data-v6033-route="evidence">Review Evidence</button></div></article><aside class="v6033-panel v6033-map-collapsible"><h2>TrustMap Snapshot</h2><p class="v6033-small">Interactive visual proof of why CyberShield reached this posture.  Snapshot first, full universe on demand.</p>${v6033MapHtml()}<div class="v6033-actions"><button type="button" class="v6033-btn" data-v6033-route="trustmap">Expand full TrustMap</button><button type="button" class="v6033-btn v6033-mobile-toggle" data-v6033-toggle-map>Collapse / expand snapshot</button></div><div class="v6033-boundary"><strong>TrustMap rule:</strong> ${v6033Esc(r.trustmap_rule || '')}</div></aside></div><div class="v6033-proof-row">${v6033Details().map(d => `<article class="v6033-card"><strong>${v6033Esc(d.label)}</strong><span class="v6033-small">${v6033Esc(d.content)}</span></article>`).join('')}</div><div class="v6033-boundary"><strong>Boundary:</strong> ${v6033Esc(r.boundary || '')}</div></div></section>`;
}

function v6033Inject(){
  const briefing = v6033$('#briefing.active');
  if(briefing && !v6033$('#v6033FirstLayer', briefing)){
    const wrapper = document.createElement('div');
    wrapper.innerHTML = v6033Html();
    briefing.insertAdjacentElement('afterbegin', wrapper.firstElementChild);
  }
}

function v6033Route(route){
  const map = { runtime:'runtime', proof:'proof', evidence:'evidence', trustmap:'trustmap' };
  const view = map[route];
  if(view) document.querySelector(`#mainNav button[data-view="${view}"]`)?.click();
}

function v6033MarkMeta(){
  const payload = v6033$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.3 First-Layer Decision Brief and TrustMap Snapshot';
    parsed.version = 'V60.3.3';
    parsed.previous_operational_build = 'V60.3.2 Show-Readiness Cleanup Pass';
    parsed.first_layer_decision_brief = {
      status: 'active_static_first_layer',
      registry: V6033_BRIEF_PATH,
      doctrine: V6033_STATE.registry?.governing_doctrine,
      trustmap_rule: V6033_STATE.registry?.trustmap_rule,
      layout: V6033_STATE.registry?.responsive_layout,
      github_pages_browser_qa_required: true
    };
    parsed.prototype_boundary = 'Static advisory prototype only. No live scoring, live evidence retrieval, statistical validation, backend persistence, workflow automation, ticketing, notifications, enforcement, or live integrations.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v6033Apply(){ v6033InstallStyles(); v6033Inject(); v6033MarkMeta(); }
function v6033Handlers(){
  if(window.__v6033Handlers) return;
  window.__v6033Handlers = true;
  document.addEventListener('click', event => {
    const route = event.target.closest('[data-v6033-route]');
    if(route){ v6033Route(route.dataset.v6033Route); return; }
    const toggle = event.target.closest('[data-v6033-toggle-map]');
    if(toggle){ v6033$('.v6033-map-collapsible')?.classList.toggle('v6033-map-collapsed'); return; }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment')) setTimeout(v6033Apply, 1150);
  }, true);
}

v6033Handlers();
v6033LoadRegistry().then(() => setTimeout(v6033Apply, 7600)).catch(error => console.warn('CyberShield V60.3.3 first-layer brief unavailable', error));
window.addEventListener('load', () => setTimeout(v6033Apply, 8600), { once:true });
setTimeout(v6033Apply, 9800);
