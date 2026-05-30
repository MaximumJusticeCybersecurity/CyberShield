// V55.6 TrustMap Interaction Reliability
// Purpose: make TrustMap objects explain, route, or trigger next steps without changing the V55.5 visual doctrine.
// Boundary: static advisory prototype only. No live integrations, enforcement, certification, or evidence retrieval.

function v556$(selector, root = document){
  return root.querySelector(selector);
}

function v556$$(selector, root = document){
  return Array.from(root.querySelectorAll(selector));
}

function v556Esc(value){
  return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
}

function v556Registry(){
  return window.CyberShieldTrustMapRegistryV553 || null;
}

function v556Domains(){
  return Array.isArray(v556Registry()?.domains) ? v556Registry().domains : [];
}

function v556FindDomain(id){
  return v556Domains().find(domain => domain.id === id) || null;
}

function v556FindAsset(domainId, assetId){
  const domain = v556FindDomain(domainId);
  return domain?.assets?.find(asset => asset.id === assetId) || null;
}

function v556Severity(status){
  const value = String(status || '').toLowerCase();
  if(value.includes('critical')) return 'Critical';
  if(value.includes('weak')) return 'High';
  if(value.includes('moderate')) return 'Medium';
  return 'Low';
}

function v556InstallStyles(){
  if(v556$('#v55-6-interaction-reliability-style')) return;
  const style = document.createElement('style');
  style.id = 'v55-6-interaction-reliability-style';
  style.textContent = `
    .v556-object-actions{display:grid;gap:8px;margin-top:12px}
    .v556-object-actions button{border:1px solid rgba(66,215,255,.28);background:rgba(3,13,24,.82);color:#dff7ff;border-radius:12px;padding:9px 10px;font-weight:900;text-align:left;cursor:pointer}
    .v556-object-actions button:hover{border-color:#42d7ff;box-shadow:0 0 14px rgba(66,215,255,.32)}
    .v556-reliability-note{margin-top:10px;border:1px solid rgba(66,215,255,.2);border-radius:14px;background:rgba(66,215,255,.06);padding:10px;color:#bfefff;font-size:.78rem;line-height:1.45}
    .v556-reliability-note strong{color:#f5fbff}
    .v556-route-flash{position:fixed;right:18px;bottom:18px;z-index:9999;max-width:360px;border:1px solid rgba(66,215,255,.4);background:rgba(3,13,24,.96);box-shadow:0 18px 40px rgba(0,0,0,.35),0 0 22px rgba(66,215,255,.18);border-radius:16px;padding:12px;color:#dff7ff;font-size:.85rem}
    .v556-route-flash strong{display:block;color:#fff;margin-bottom:4px}
  `;
  document.head.appendChild(style);
}

function v556SelectedFromDom(){
  const activeAsset = v556$('.v554-asset.active');
  if(activeAsset){
    return {
      type: 'asset',
      domainId: activeAsset.dataset.v554Domain,
      assetId: activeAsset.dataset.v554Asset,
      domain: v556FindDomain(activeAsset.dataset.v554Domain),
      asset: v556FindAsset(activeAsset.dataset.v554Domain, activeAsset.dataset.v554Asset)
    };
  }
  const activeDomain = v556$('.v554-domain.active');
  if(activeDomain){
    return {
      type: 'domain',
      domainId: activeDomain.dataset.v554Domain,
      domain: v556FindDomain(activeDomain.dataset.v554Domain),
      asset: null
    };
  }
  return { type: 'core', domain: null, asset: null };
}

function v556ObjectSummary(selection){
  if(selection.type === 'asset' && selection.domain && selection.asset){
    return {
      title: selection.asset.label,
      subtitle: selection.domain.label,
      status: selection.asset.status,
      severity: v556Severity(selection.asset.status),
      why: `This object contributes to the ${selection.domain.label} trust path. Its evidence, owner, and consequence tags determine whether leadership can rely on it for the selected scenario.`,
      next: 'Review evidence, confirm owner, then generate a decision record if the action depends on this object.'
    };
  }
  if(selection.domain){
    return {
      title: selection.domain.label,
      subtitle: 'Layer 1 Trust Domain',
      status: selection.domain.status,
      severity: v556Severity(selection.domain.status),
      why: `This domain is part of the operating environment trust universe. Its assets and tagged evidence determine whether the current scenario is trustworthy enough for action.`,
      next: 'Open an asset, review evidence gaps, or route to the Proof Pack for documentation.'
    };
  }
  return {
    title: 'CyberShield Core',
    subtitle: 'Trust Kernel',
    status: 'strong',
    severity: 'Low',
    why: 'The core is the center trust kernel. It organizes the surrounding domains, evidence, decision records, and action guidance.',
    next: 'Route to Runtime/Core to review what CyberShield recommends before action.'
  };
}

function v556EnhanceDetailPanel(){
  const detail = v556$('.v554-detail');
  if(!detail || detail.dataset.v556Enhanced === 'true') return;
  const selection = v556SelectedFromDom();
  const summary = v556ObjectSummary(selection);
  detail.dataset.v556Enhanced = 'true';
  detail.insertAdjacentHTML('beforeend', `
    <div class="v556-reliability-note">
      <strong>${v556Esc(summary.title)} reliability path</strong><br>
      Status: ${v556Esc(summary.status)} • Executive severity: ${v556Esc(summary.severity)}<br>
      ${v556Esc(summary.why)}<br><br>
      Next move: ${v556Esc(summary.next)}
    </div>
    <div class="v556-object-actions">
      <button type="button" data-v556-route="runtime">Review runtime decision path</button>
      <button type="button" data-v556-route="evidence">Review evidence and assumptions</button>
      <button type="button" data-v556-route="proofpack">Generate proof-pack context</button>
    </div>
  `);
}

function v556Flash(title, message){
  v556$('.v556-route-flash')?.remove();
  const flash = document.createElement('div');
  flash.className = 'v556-route-flash';
  flash.innerHTML = `<strong>${v556Esc(title)}</strong>${v556Esc(message)}`;
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 4600);
}

function v556Route(destination){
  const selection = v556SelectedFromDom();
  const summary = v556ObjectSummary(selection);
  const navMap = { runtime: 'runtime', evidence: 'evidence', proofpack: 'proof' };
  const view = navMap[destination];
  if(view){
    document.querySelector(`#mainNav button[data-view="${view}"]`)?.click();
  }
  const messages = {
    runtime: `Runtime opened for ${summary.title}. Use this to decide whether the current action should proceed, pause, or escalate.`,
    evidence: `Evidence opened for ${summary.title}. Review what is known, missing, stale, assumed, or needs verification.`,
    proofpack: `Proof Pack opened for ${summary.title}. Use this path to document what was relied on and what remains limited.`
  };
  v556Flash('TrustMap route', messages[destination] || `Opened ${summary.title}.`);
}

function v556MarkInteractiveObjects(){
  v556$$('.v554-domain').forEach(node => {
    if(node.dataset.v556Ready === 'true') return;
    node.dataset.v556Ready = 'true';
    node.setAttribute('title', 'Open domain view and review trust path');
    node.setAttribute('aria-label', `Open ${node.textContent.trim()} trust domain`);
  });
  v556$$('.v554-asset').forEach(node => {
    if(node.dataset.v556Ready === 'true') return;
    node.dataset.v556Ready = 'true';
    const asset = v556FindAsset(node.dataset.v554Domain, node.dataset.v554Asset);
    node.setAttribute('title', `Open object view for ${asset?.label || 'asset'}`);
    node.setAttribute('aria-label', `Open ${asset?.label || 'asset'} trust object`);
  });
  const core = v556$('[data-v554-core]');
  if(core && core.dataset.v556Ready !== 'true'){
    core.dataset.v556Ready = 'true';
    core.setAttribute('title', 'Open Runtime/Core decision path');
    core.setAttribute('aria-label', 'Open CyberShield Core runtime decision path');
  }
}

function v556MarkMeta(){
  const payload = v556$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V55.6 TrustMap Interaction Reliability';
    parsed.version = 'V55.6';
    parsed.previous_operational_build = 'V55.5 TrustMap CSS and Visual Object Cleanup';
    parsed.trustmap_interaction_reliability = {
      status: 'active',
      rule: 'Every TrustMap object must explain, route, or trigger a next step. Layer 1 domains, Layer 2 assets, and the CyberShield Core expose route paths to Runtime, Evidence, and Proof Pack.',
      github_pages_browser_qa_required: true
    };
    parsed.prototype_boundary = 'Static advisory prototype only. No live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, or live internet claim verification.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v556Apply(){
  v556InstallStyles();
  v556MarkInteractiveObjects();
  v556EnhanceDetailPanel();
  v556MarkMeta();
}

function v556Handlers(){
  if(window.__v556Handlers) return;
  window.__v556Handlers = true;
  document.addEventListener('click', event => {
    const route = event.target.closest('[data-v556-route]');
    if(route){
      v556Route(route.dataset.v556Route);
      return;
    }
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v554-mode],[data-v554-reset],[data-v554-domain],[data-v554-asset],[data-v554-core]')){
      setTimeout(v556Apply, 260);
    }
  }, true);
}

v556Handlers();
v556Apply();
window.addEventListener('load', () => setTimeout(v556Apply, 1600), { once: true });
setTimeout(v556Apply, 2200);
