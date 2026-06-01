// V60.3.4 Governance Metadata Visibility Guard
// Purpose: keep build/version/governance/prototype metadata out of executive-facing workspaces.
// Rule: version labels, governance metadata, build labels, QA metadata, and prototype boundary language belong in Settings/admin metadata and repo docs only.

function v6034$(selector, root = document){ return root.querySelector(selector); }
function v6034$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }

const V6034_ALLOWED_METADATA_VIEW = 'settings';
const V6034_METADATA_PATTERN = /\bV\d+(?:\.\d+)*(?:\.\d+)?\b|\bbuild\b|\bgovernance\b|\bprototype\b|\bboundary\b|GitHub Pages|QA required|version of record|current implemented build|statistically validated|expert-derived V1/i;
const V6034_PUBLIC_LABELS = [
  ['V60.3 Universal Model Trace Inspector', 'Model Trace Inspector'],
  ['V60.2 evidence-to-score impact preview', 'Evidence Impact Preview'],
  ['V60.2 Evidence-to-Score Impact Preview', 'Evidence Impact Preview'],
  ['V60.1 Evidence State Transition Prototype', 'Evidence State Transitions'],
  ['V60 Trust Evidence Workbench', 'Trust Evidence Workbench'],
  ['V59.5', 'Internet Trust QA'],
  ['V59', 'Internet Trust'],
  ['Expert-Derived V1 Trust Scoring Models', 'Calibratable Trust Models'],
  ['Statistically Validated Trust Models', 'validated models'],
  ['static advisory prototype', 'advisory preview'],
  ['prototype boundary', 'advisory limitation'],
  ['Boundary:', 'Note:']
];

function v6034ActiveView(){
  return document.querySelector('#briefing.active,#trustmap.active,#runtime.active,#evidence.active,#proof.active,#architecture.active,#settings.active') || null;
}

function v6034IsSettings(view){
  return view?.id === V6034_ALLOWED_METADATA_VIEW;
}

function v6034InstallStyles(){
  if(v6034$('#v60-3-4-governance-visibility-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-4-governance-visibility-style';
  style.textContent = `
    #briefing.active .v6033-boundary,
    #briefing.active .v603-boundary,
    #briefing.active .v602-boundary,
    #briefing.active .v60-boundary,
    #trustmap.active .v603-boundary,
    #trustmap.active .v602-boundary,
    #trustmap.active .v60-boundary,
    #runtime.active .v603-boundary,
    #runtime.active .v602-boundary,
    #runtime.active .v60-boundary,
    #evidence.active .v603-boundary,
    #evidence.active .v602-boundary,
    #evidence.active .v60-boundary,
    #proof.active .v603-boundary,
    #proof.active .v602-boundary,
    #proof.active .v60-boundary,
    #architecture.active .v603-boundary,
    #architecture.active .v602-boundary,
    #architecture.active .v60-boundary,
    .v6034-hidden-metadata{display:none!important}
    .v6034-internal-chip{display:none!important}
  `;
  document.head.appendChild(style);
}

function v6034CleanTextNode(node){
  if(!node || !node.nodeValue) return;
  let value = node.nodeValue;
  V6034_PUBLIC_LABELS.forEach(([from,to]) => { value = value.split(from).join(to); });
  value = value.replace(/\bV\d+(?:\.\d+)*\b/g, '').replace(/\s{2,}/g, ' ');
  node.nodeValue = value;
}

function v6034ScrubVisibleLabels(view){
  if(!view || v6034IsSettings(view)) return;

  const walker = document.createTreeWalker(view, NodeFilter.SHOW_TEXT, {
    acceptNode(node){
      const parent = node.parentElement;
      if(!parent) return NodeFilter.FILTER_REJECT;
      if(parent.closest('script,style,textarea,input,#adminPayload')) return NodeFilter.FILTER_REJECT;
      if(!V6034_METADATA_PATTERN.test(node.nodeValue || '')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(v6034CleanTextNode);
}

function v6034HideMetadataBlocks(view){
  if(!view || v6034IsSettings(view)) return;
  const selectors = [
    '[id*="metadata" i]',
    '[id*="governance" i]',
    '[data-governance]',
    '[data-build]',
    '.v6033-boundary',
    '.v603-boundary',
    '.v602-boundary',
    '.v60-boundary',
    '.v561-boundary',
    '.v562-boundary',
    '.v56-boundary'
  ];
  selectors.forEach(selector => v6034$$(selector, view).forEach(el => el.classList.add('v6034-hidden-metadata')));

  v6034$$('article,section,div,span,p,small', view).forEach(el => {
    if(el.closest('#adminPayload,script,style,textarea,input')) return;
    const text = (el.textContent || '').trim();
    if(!text) return;
    const compact = text.length < 260;
    const metadataOnly = compact && /^(V\d|Build|Current build|Current implemented|GitHub Pages|QA required|Boundary:|Prototype boundary|Governance|Version|Internal build)/i.test(text);
    if(metadataOnly) el.classList.add('v6034-hidden-metadata');
  });
}

function v6034CleanSpecificPublicLabels(view){
  if(!view || v6034IsSettings(view)) return;
  v6034$$('.v603-kicker', view).forEach(el => { el.textContent = 'Model Trace'; });
  v6034$$('.v602-kicker', view).forEach(el => { el.textContent = 'Evidence Impact'; });
  v6034$$('.v60-kicker', view).forEach(el => { if(/V\d|Prototype/i.test(el.textContent || '')) el.textContent = 'Evidence'; });
  v6034$$('.v6032-workspace-frame .kicker', view).forEach(el => { el.textContent = 'Workspace'; });
  v6034$$('.v6033-kicker', view).forEach(el => { el.textContent = 'Executive decision view'; });
}

function v6034MarkMeta(){
  const payload = v6034$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.4 Governance Metadata Visibility Guard';
    parsed.version = 'V60.3.4';
    parsed.previous_operational_build = 'V60.3.3 First-Layer Decision Brief and TrustMap Snapshot';
    parsed.governance_metadata_visibility_guard = {
      status: 'active',
      rule: 'Build/version/governance/prototype metadata belongs only in Settings/admin metadata and repo documentation, not executive-facing tabs.',
      protected_executive_views: ['Briefing','TrustMap','Runtime','Evidence','Proof Pack','Architecture'],
      allowed_metadata_view: 'Settings',
      github_pages_browser_qa_required: true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v6034Apply(){
  v6034InstallStyles();
  const view = v6034ActiveView();
  if(view && !v6034IsSettings(view)){
    v6034CleanSpecificPublicLabels(view);
    v6034HideMetadataBlocks(view);
    v6034ScrubVisibleLabels(view);
  }
  v6034MarkMeta();
}

function v6034Handlers(){
  if(window.__v6034Handlers) return;
  window.__v6034Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v6033-route],[data-v603-score],[data-v603-model],[data-v602-open],[data-v60-open]')){
      setTimeout(v6034Apply, 1300);
      setTimeout(v6034Apply, 2500);
    }
  }, true);
}

v6034Handlers();
setTimeout(v6034Apply, 7600);
window.addEventListener('load', () => setTimeout(v6034Apply, 9000), { once:true });
setTimeout(v6034Apply, 11200);
