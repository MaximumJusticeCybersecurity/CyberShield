// V60.3.28 Model Trace and Evidence Trust Alignment
// Purpose: surface model trace readiness in admin metadata without claiming statistical validation.

const V60328_REGISTRY_PATH = 'data/models/v60-3-28-model-trace-registry.json';
let v60328RegistryPromise = null;

function v60328$(selector, root = document){ return root.querySelector(selector); }

async function v60328LoadRegistry(){
  if(v60328RegistryPromise) return v60328RegistryPromise;
  v60328RegistryPromise = fetch(V60328_REGISTRY_PATH, { cache:'no-store' })
    .then(response => response.ok ? response.json() : null)
    .catch(() => null);
  return v60328RegistryPromise;
}

function v60328VisibleScoreSample(){
  const text = document.body?.innerText || '';
  const matches = text.match(/\b\d{1,3}\s*\/\s*100\b|\b\d{1,3}%\b/g) || [];
  return Array.from(new Set(matches)).slice(0,12);
}

async function v60328Report(){
  const registry = await v60328LoadRegistry();
  const models = Array.isArray(registry?.models) ? registry.models : [];
  return {
    build:'V60.3.28 Model Trace and Evidence Trust Alignment',
    status: registry ? 'registry_loaded' : 'registry_not_loaded',
    maturity: registry?.maturity || 'Expert-Derived V1, not statistically validated',
    doctrine: registry?.doctrine || 'No score without a model.',
    model_count: models.length,
    models: models.map(model => ({ id:model.id, label:model.label, status:model.status, purpose:model.purpose })),
    visible_score_sample: v60328VisibleScoreSample(),
    rule:'Visible scores should trace to model ID, version/status, inputs, evidence, assumptions, confidence, missing evidence, risk if wrong, and action consequence.',
    github_pages_browser_qa_required:true
  };
}

async function v60328MarkMeta(){
  const payload = v60328$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.model_trace_alignment = await v60328Report();
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

window.CyberShieldModelTraceV60328 = { loadRegistry:v60328LoadRegistry, report:v60328Report, markMeta:v60328MarkMeta };
setTimeout(v60328MarkMeta, 1700);
document.addEventListener('click', () => setTimeout(v60328MarkMeta, 260), true);
