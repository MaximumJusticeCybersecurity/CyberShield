// V55.3 TrustMap Registry and Visual Object Stabilization
// Purpose: load TrustMap registry metadata, expose registry validation, preserve V55.2 behavior,
// and document GitHub Pages browser QA requirement without adding new top-level tabs.

const V553_REGISTRY_PATH = 'data/trustmap/v55-3-trustmap-registry.json';
const V553_REQUIRED_BASELINE_DOMAINS = [
  'Cloud & Infrastructure',
  'Identities & Access',
  'Applications & Data',
  'AI Systems & Agents',
  'Third Parties & Vendors',
  'Devices & Endpoints'
];

function v553$(selector, root = document){
  return root.querySelector(selector);
}

function v553MarkMeta(status, detail = {}){
  document.title = 'CyberShield V55.3 TrustMap Registry Stabilization';
  const payload = v553$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V55.3 TrustMap Registry and Visual Object Stabilization';
    parsed.version = 'V55.3';
    parsed.previous_operational_build = 'V55.2 TrustMap Core Boundary and Constellation Polish';
    parsed.trustmap_registry = {
      status,
      path: V553_REGISTRY_PATH,
      behavior_boundary: 'V55.3 loads and validates registry metadata while preserving V55.2 TrustMap visual behavior.',
      github_pages_browser_qa_required: true,
      ...detail
    };
    parsed.visual_references = [
      'assets/reference/trustmap-radar-constellation-reference.svg',
      'assets/reference/operational-trust-workflow-reference.svg',
      'assets/reference/dr-max-justice-leadership-reference.svg'
    ];
    parsed.prototype_boundary = 'Static advisory prototype only. No live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, or live internet claim verification.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {
    // Do not break the live prototype because metadata could not be rewritten.
  }
}

function v553ValidateRegistry(registry){
  const labels = Array.isArray(registry?.domains) ? registry.domains.map(domain => domain.label) : [];
  const missing = V553_REQUIRED_BASELINE_DOMAINS.filter(label => !labels.includes(label));
  const hasCenter = registry?.center?.id === 'cybershield-core';
  const hasLenses = registry?.lenses && Object.keys(registry.lenses).length > 0;
  const valid = missing.length === 0 && hasCenter && hasLenses;
  return { valid, missing, domain_count: labels.length, has_center: hasCenter, has_lenses: !!hasLenses };
}

async function v553LoadRegistry(){
  try{
    const response = await fetch(V553_REGISTRY_PATH, { cache: 'no-store' });
    if(!response.ok) throw new Error(`Registry fetch failed: ${response.status}`);
    const registry = await response.json();
    const validation = v553ValidateRegistry(registry);
    window.CyberShieldTrustMapRegistryV553 = registry;
    window.CyberShieldTrustMapRegistryStatus = validation;
    v553MarkMeta(validation.valid ? 'loaded_and_validated' : 'loaded_with_validation_warnings', validation);
    document.dispatchEvent(new CustomEvent('cybershield:trustmap-registry-loaded', { detail: { registry, validation } }));
    return { registry, validation };
  } catch (error){
    window.CyberShieldTrustMapRegistryStatus = { valid: false, error: String(error?.message || error) };
    v553MarkMeta('load_failed', { error: String(error?.message || error) });
    return null;
  }
}

function v553InstallRegistryNote(){
  if(v553$('#v55-3-registry-note-style')) return;
  const style = document.createElement('style');
  style.id = 'v55-3-registry-note-style';
  style.textContent = `
    .v553-registry-note{display:none!important}
    #settings .v553-registry-note{display:block!important;margin-top:12px;padding:10px 12px;border:1px solid rgba(66,215,255,.25);border-radius:12px;background:rgba(66,215,255,.06);font-size:.78rem;color:#bfefff}
    #settings .v553-registry-note strong{color:#f5fbff}
  `;
  document.head.appendChild(style);
}

function v553RenderSettingsNote(){
  const settings = v553$('#settings');
  if(!settings || !settings.classList.contains('active')) return;
  v553InstallRegistryNote();
  if(v553$('#v553RegistryNote', settings)) return;
  const note = document.createElement('div');
  note.id = 'v553RegistryNote';
  note.className = 'v553-registry-note';
  const status = window.CyberShieldTrustMapRegistryStatus;
  const label = status?.valid ? 'loaded and baseline-validated' : 'browser QA required';
  note.innerHTML = `<strong>V55.3 TrustMap Registry:</strong> ${label}.  Visual behavior remains V55.2 until the registry is formally consumed by the TrustMap renderer.  GitHub Pages browser QA required after deploy.`;
  settings.appendChild(note);
}

function v553Handlers(){
  if(window.__v553Handlers) return;
  window.__v553Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment')){
      setTimeout(v553RenderSettingsNote, 250);
    }
  }, true);
  document.addEventListener('cybershield:trustmap-registry-loaded', () => setTimeout(v553RenderSettingsNote, 150));
}

v553Handlers();
v553LoadRegistry().then(() => setTimeout(v553RenderSettingsNote, 600));
window.addEventListener('load', () => setTimeout(v553RenderSettingsNote, 1200), { once: true });
