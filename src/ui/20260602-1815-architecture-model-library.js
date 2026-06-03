// 20260602-1815 Architecture Model Library Restoration
// Purpose: restore CyberShield model library inside the Architecture tab without adding top-level navigation.
// Boundary: static advisory prototype only. No live retrieval, live fact-checking, statistical validation, backend persistence, or production enforcement.

const MODEL_LIBRARY_URL_20260602_1815 = 'data/models/20260602-1815-architecture-model-library.json';
let modelLibrary202606021815 = null;
let selectedModel202606021815 = 'internet-artifact-trust-model';
let selectedCategory202606021815 = 'internet';

function modelLib$(selector, root = document){ return root.querySelector(selector); }
function modelLib$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }
function modelLibEsc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

async function modelLibLoad202606021815(){
  if(modelLibrary202606021815) return modelLibrary202606021815;
  try{
    const response = await fetch(MODEL_LIBRARY_URL_20260602_1815, { cache:'no-store' });
    if(!response.ok) throw new Error(`Model library fetch failed: ${response.status}`);
    modelLibrary202606021815 = await response.json();
  }catch(error){
    console.warn('CyberShield model library unavailable.', error);
    modelLibrary202606021815 = {
      build:'20260602-1815 Architecture Model Library Restoration',
      boundary:'Fallback model library. Registry fetch failed.',
      categories:[{id:'core',label:'Core Trust Models',description:'Fallback category'}],
      models:[{
        id:'universal-model-trace-inspector',
        name:'Universal Model Trace Inspector',
        category:'core',
        status:'fallback',
        purpose:'Inspect what model produced a score or recommendation.',
        inputs:['model id','evidence','assumptions'],
        outputs:['trace','confidence','risk if wrong'],
        used_in:['Architecture'],
        proof_pack_outputs:['Model Trace Report']
      }]
    };
  }
  return modelLibrary202606021815;
}

function modelLibInstallStyles202606021815(){
  if(modelLib$('#model-library-20260602-1815-style')) return;
  const style = document.createElement('style');
  style.id = 'model-library-20260602-1815-style';
  style.textContent = `
    #architecture .model-library-shell{margin-top:18px;display:grid;gap:14px}
    #architecture .model-library-nav{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 4px}
    #architecture .model-library-nav button{border-radius:999px;padding:8px 11px;font-size:.78rem;font-weight:900;text-transform:uppercase;letter-spacing:.045em}
    #architecture .model-library-nav button.active{border-color:var(--blue);background:rgba(66,215,255,.18);box-shadow:0 0 0 3px rgba(66,215,255,.10)}
    #architecture .model-library-grid{display:grid;grid-template-columns:minmax(280px,420px) minmax(0,1fr);gap:14px;align-items:start}
    #architecture .model-list{display:grid;gap:9px;max-height:620px;overflow:auto;padding-right:4px}
    #architecture .model-card{width:100%;text-align:left;border-radius:16px;padding:12px;background:rgba(255,255,255,.055);border:1px solid rgba(146,205,232,.26);display:grid;gap:5px;color:var(--text)}
    #architecture .model-card.active{border-color:var(--blue);background:rgba(66,215,255,.13);box-shadow:0 0 0 3px rgba(66,215,255,.10)}
    #architecture .model-card strong{font-size:.95rem;color:#fff}
    #architecture .model-card span{color:var(--muted);font-size:.78rem;line-height:1.25}
    #architecture .model-card em{font-style:normal;color:var(--amber);font-size:.72rem;text-transform:uppercase;font-weight:900;letter-spacing:.04em}
    #architecture .model-detail{background:rgba(255,255,255,.055);border:1px solid rgba(146,205,232,.28);border-radius:18px;padding:16px;display:grid;gap:12px}
    #architecture .model-detail h3{margin:0;color:#fff;font-size:1.25rem}
    #architecture .model-detail p{margin:0;color:var(--muted)}
    #architecture .model-detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
    #architecture .model-detail-box{border:1px solid rgba(66,215,255,.18);border-radius:14px;padding:12px;background:rgba(0,0,0,.14)}
    #architecture .model-detail-box h4{margin:0 0 7px;color:var(--blue);font-size:.78rem;text-transform:uppercase;letter-spacing:.06em}
    #architecture .model-detail-box ul{margin:0;padding-left:18px;color:var(--muted);font-size:.86rem}
    #architecture .model-boundary{border-left:4px solid var(--amber);background:rgba(255,209,102,.08);padding:10px 12px;border-radius:12px;color:#ffe6a3!important}
    #architecture .model-route-row{display:flex;gap:8px;flex-wrap:wrap}
    #architecture .model-route-row button{border-radius:10px;padding:8px 10px;font-size:.78rem}
    @media(max-width:980px){#architecture .model-library-grid,#architecture .model-detail-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
}

function modelLibList(items){
  return `<ul>${(items || []).map(item => `<li>${modelLibEsc(item)}</li>`).join('')}</ul>`;
}

function modelLibRenderDetail(model){
  if(!model) return '<section class="model-detail"><h3>Select a model</h3><p>Choose a model to inspect inputs, outputs, evidence paths, and Proof Pack outputs.</p></section>';
  return `
    <section class="model-detail" data-model-detail="${modelLibEsc(model.id)}">
      <div>
        <span class="chip">${modelLibEsc(model.category || 'model')}</span>
        <h3>${modelLibEsc(model.name)}</h3>
        <p>${modelLibEsc(model.purpose)}</p>
      </div>
      <p class="model-boundary"><strong>Status:</strong> ${modelLibEsc(model.status || 'prototype scaffold')}<br>${modelLibEsc(model.boundary || 'Prototype model definition. Outputs are directional until connected to governed evidence, runtime state, and validation.')}</p>
      ${model.pilot_scenario ? `<p><strong>Pilot scenario:</strong> ${modelLibEsc(model.pilot_scenario)}</p>` : ''}
      <div class="model-detail-grid">
        <section class="model-detail-box"><h4>Inputs</h4>${modelLibList(model.inputs)}</section>
        <section class="model-detail-box"><h4>Outputs</h4>${modelLibList(model.outputs)}</section>
        <section class="model-detail-box"><h4>Used In</h4>${modelLibList(model.used_in)}</section>
        <section class="model-detail-box"><h4>Proof Pack Outputs</h4>${modelLibList(model.proof_pack_outputs)}</section>
      </div>
      <div class="model-route-row">
        <button type="button" data-model-route="evidence">Open Evidence</button>
        <button type="button" data-model-route="proof">Open Proof Pack</button>
        <button type="button" data-model-route="runtime">Open Runtime</button>
        <button type="button" data-model-route="trustmap">Open TrustMap</button>
      </div>
    </section>`;
}

function modelLibRender202606021815(){
  const architecture = modelLib$('#architecture');
  if(!architecture || !modelLibrary202606021815) return;
  modelLibInstallStyles202606021815();

  let shell = modelLib$('#architectureModelLibrary');
  if(!shell){
    shell = document.createElement('section');
    shell.id = 'architectureModelLibrary';
    shell.className = 'panel model-library-shell';
    const cards = modelLib$('#architectureCards');
    if(cards) cards.insertAdjacentElement('afterend', shell);
    else architecture.appendChild(shell);
  }

  const categories = modelLibrary202606021815.categories || [];
  const models = modelLibrary202606021815.models || [];
  if(!categories.some(c => c.id === selectedCategory202606021815)) selectedCategory202606021815 = categories[0]?.id || 'core';
  const visible = models.filter(model => model.category === selectedCategory202606021815);
  if(!visible.some(model => model.id === selectedModel202606021815)) selectedModel202606021815 = visible[0]?.id || models[0]?.id;
  const selected = models.find(model => model.id === selectedModel202606021815) || visible[0] || models[0];

  shell.innerHTML = `
    <div class="section-title-row">
      <div>
        <span class="chip">Architecture Pack</span>
        <h2>CyberShield Model Library</h2>
        <p class="lede">Architecture is where CyberShield explains how it thinks. Proof Pack is where model outputs become defensible artifacts.</p>
      </div>
    </div>
    <div class="model-library-nav">
      ${categories.map(cat => `<button type="button" class="${cat.id === selectedCategory202606021815 ? 'active' : ''}" data-model-category="${modelLibEsc(cat.id)}">${modelLibEsc(cat.label)}</button>`).join('')}
    </div>
    <div class="model-library-grid">
      <section class="model-list">
        ${visible.map(model => `<button type="button" class="model-card ${model.id === selectedModel202606021815 ? 'active' : ''}" data-model-id="${modelLibEsc(model.id)}"><em>${modelLibEsc(model.status || 'prototype')}</em><strong>${modelLibEsc(model.name)}</strong><span>${modelLibEsc(model.purpose)}</span></button>`).join('')}
      </section>
      ${modelLibRenderDetail(selected)}
    </div>
  `;

  modelLib$$('[data-model-category]', shell).forEach(button => {
    button.onclick = () => {
      selectedCategory202606021815 = button.dataset.modelCategory;
      selectedModel202606021815 = null;
      modelLibRender202606021815();
    };
  });
  modelLib$$('[data-model-id]', shell).forEach(button => {
    button.onclick = () => {
      selectedModel202606021815 = button.dataset.modelId;
      modelLibRender202606021815();
    };
  });
  modelLib$$('[data-model-route]', shell).forEach(button => {
    button.onclick = () => document.querySelector(`#mainNav button[data-view="${button.dataset.modelRoute}"]`)?.click();
  });

  modelLibMarkMeta202606021815();
}

function modelLibMarkMeta202606021815(){
  const payload = modelLib$('#adminPayload');
  if(!payload || !modelLibrary202606021815) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.architecture_model_library = {
      build:'20260602-1815 Architecture Model Library Restoration',
      status:'active_model_library_pane_inside_architecture',
      model_count:(modelLibrary202606021815.models || []).length,
      category_count:(modelLibrary202606021815.categories || []).length,
      rule:'Architecture owns model library. Proof Pack owns model-generated defensible outputs.',
      github_pages_browser_qa_required:true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

async function modelLibApply202606021815(){
  if(!modelLib$('#architecture')) return;
  await modelLibLoad202606021815();
  modelLibRender202606021815();
}

function modelLibHandlers202606021815(){
  if(window.__modelLibHandlers202606021815) return;
  window.__modelLibHandlers202606021815 = true;
  document.addEventListener('click', event => {
    if(event.target.closest('#mainNav button[data-view="architecture"], #architecture')) setTimeout(modelLibApply202606021815, 120);
  }, true);
}

window.CyberShieldArchitectureModelLibrary202606021815 = {
  load:modelLibLoad202606021815,
  render:modelLibRender202606021815,
  apply:modelLibApply202606021815
};
modelLibHandlers202606021815();
setTimeout(modelLibApply202606021815, 1200);
window.addEventListener('load', () => setTimeout(modelLibApply202606021815, 1600), { once:true });
