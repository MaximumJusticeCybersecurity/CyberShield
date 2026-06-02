// V60.3.16.1 Trust Kernel Detail and Stoplight Risk Rows
// Purpose: add CyberShield Trust Kernel hover detail and enforce stoplight-only risk rows in TrustMap.
// Boundary: static advisory prototype only. No live scoring, evidence retrieval, workflow automation, or enforcement.

function v603161$(selector, root=document){ return root.querySelector(selector); }
function v603161$$(selector, root=document){ return Array.from(root.querySelectorAll(selector)); }
function v603161Score(){ const raw = v603161$('#trustmap.active .v554-score strong')?.textContent || '63'; const score = Number(raw); return Number.isFinite(score) ? score : 63; }
function v603161RiskClass(kind, index){
  if(kind === 'break') return ['critical','high','medium','low'][Math.min(index,3)];
  if(kind === 'active') return ['critical','high','high','medium'][Math.min(index,3)];
  return 'medium';
}
function v603161RiskLabel(kind, index){
  if(kind === 'break') return ['Critical','High','Medium','Low'][Math.min(index,3)];
  if(kind === 'active') return ['Critical','High','High','Medium'][Math.min(index,3)];
  return 'Medium';
}
function v603161InstallStyles(){
  if(v603161$('#v60-3-16-1-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-16-1-style';
  style.textContent = `
    #trustmap.active .v603161-core-panel{border:1px solid rgba(223,249,255,.24);border-radius:16px;background:rgba(255,255,255,.045);padding:13px;margin:0 0 11px;color:#dff7ff}
    #trustmap.active .v603161-core-panel h3{margin:0;color:#fff;font-size:1rem}
    #trustmap.active .v603161-core-panel h4{margin:12px 0 6px;color:#aebbd0;text-transform:uppercase;font-size:.78rem;letter-spacing:.05em}
    #trustmap.active .v603161-core-panel p,#trustmap.active .v603161-core-panel li{color:#dbefff;line-height:1.34;font-size:.82rem}
    #trustmap.active .v603161-core-panel ul{padding-left:17px;margin:7px 0}
    #trustmap.active .v603161-core-score{width:126px;height:126px;border-radius:50%;display:grid;place-items:center;margin:10px auto;background:conic-gradient(#20e889 calc(var(--score)*1%),rgba(255,255,255,.09) 0);position:relative;box-shadow:0 0 22px rgba(32,232,137,.24)}
    #trustmap.active .v603161-core-score:before{content:'';position:absolute;inset:15px;border-radius:50%;background:#071426}
    #trustmap.active .v603161-core-score strong{position:relative;z-index:1;font-size:1.76rem;color:#fff}
    #trustmap.active .v554-kernel:hover,#trustmap.active .v554-kernel:focus-visible{filter:drop-shadow(0 0 18px rgba(223,249,255,.92)) drop-shadow(0 0 36px rgba(110,234,255,.56))!important}
    #trustmap.active .v603161-risk-critical{--risk-color:#ff3347!important;color:#ff3347!important}
    #trustmap.active .v603161-risk-high{--risk-color:#ff3347!important;color:#ff3347!important}
    #trustmap.active .v603161-risk-medium{--risk-color:#ffd43b!important;color:#ffd43b!important}
    #trustmap.active .v603161-risk-low{--risk-color:#ffd43b!important;color:#ffd43b!important}
    #trustmap.active .v603161-risk-row .v554-dotkey{background:var(--risk-color)!important;color:var(--risk-color)!important;box-shadow:0 0 12px var(--risk-color)!important}
    #trustmap.active .v603161-risk-row strong{color:var(--risk-color)!important}
  `;
  document.head.appendChild(style);
}
function v603161NormalizeRiskRows(){
  const trustmap = v603161$('#trustmap.active');
  if(!trustmap) return;
  v603161$$('.v554-card', trustmap).forEach(card => {
    const title = card.querySelector('.v554-sub')?.textContent?.trim() || '';
    const kind = title === 'Top Trust Break Drivers' ? 'break' : title === 'Active Risks' ? 'active' : null;
    if(!kind) return;
    v603161$$('.v554-row', card).forEach((row, index) => {
      row.classList.add('v603161-risk-row', `v603161-risk-${v603161RiskClass(kind,index)}`);
      const strong = row.querySelector('strong');
      if(strong) strong.textContent = v603161RiskLabel(kind,index);
    });
  });
}
function v603161RenderCoreRight(){
  const trustmap = v603161$('#trustmap.active');
  const right = v603161$('#trustmap.active .v554-shell > .v554-panel:last-child');
  if(!trustmap || !right) return;
  const score = v603161Score();
  right.querySelector('#v603161CoreRightAuthority')?.remove();
  right.querySelectorAll('#v60312RightAuthority,#v60311RightAuthority,#v60310RightAuthority,.v554-detail').forEach(el => el.style.display='none');
  const first = right.querySelector('section');
  if(first) first.style.display='none';
  const panel = document.createElement('section');
  panel.id = 'v603161CoreRightAuthority';
  panel.innerHTML = `<section class="v603161-core-panel" style="--score:${score}"><div class="v554-sub">Operational Trust Score</div><h3>CyberShield Trust Kernel</h3><div class="v603161-core-score"><strong>${score}<span style="font-size:.72rem">/100</span></strong></div><p>This is the same operational trust score shown on the left.  The Trust Kernel explains why the current decision environment can or cannot be relied on.</p></section><section class="v603161-core-panel"><h4>Core Model Explanation</h4><p>The Trust Kernel weighs evidence strength, confidence, reliance risk, runtime admissibility, and defensibility before an executive acts.</p><h4>Assumed Activity</h4><p>An executive or delegated operator is reviewing whether the current action, vendor, AI workflow, data path, or control posture is trustworthy enough to proceed.</p><h4>Evidence Gaps</h4><ul><li>Some control evidence is assumed rather than verified</li><li>Vendor and AI provenance may require human review</li><li>Runtime action authority may require additional approval</li></ul><h4>What Happens Next</h4><p>Inspect the Layer 1 assets to see where trust is strong, constrained, or breaking before approving the action.</p></section>`;
  right.prepend(panel);
}
function v603161ClearCoreRight(){ v603161$('#trustmap.active #v603161CoreRightAuthority')?.remove(); }
function v603161MarkMeta(){
  const payload = v603161$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.trust_kernel_detail_and_stoplight_risk_rows = {
      status:'active_companion_layer',
      rule:'Hovering the CyberShield Trust Kernel shows the operational trust score and core model explanation in the right pane. Top Trust Break Drivers and Active Risks use stoplight red/yellow/green only, never blue.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed,null,2);
  }catch{}
}
function v603161Apply(){ if(!v603161$('#trustmap.active')) return; v603161InstallStyles(); v603161NormalizeRiskRows(); v603161MarkMeta(); }
function v603161Handlers(){
  if(window.__v603161Handlers) return;
  window.__v603161Handlers = true;
  ['mouseover','focusin','click'].forEach(eventName => document.addEventListener(eventName, () => setTimeout(v603161Apply,80), true));
  document.addEventListener('mouseover', event => { if(event.target.closest('.v554-kernel')) v603161RenderCoreRight(); if(event.target.closest('[data-v554-domain],[data-v554-asset]')) v603161ClearCoreRight(); }, true);
  document.addEventListener('focusin', event => { if(event.target.closest('.v554-kernel')) v603161RenderCoreRight(); if(event.target.closest('[data-v554-domain],[data-v554-asset]')) v603161ClearCoreRight(); }, true);
}
v603161Handlers();
setTimeout(v603161Apply,2600);
window.addEventListener('load', () => setTimeout(v603161Apply,3100), {once:true});
setTimeout(v603161Apply,4000);
