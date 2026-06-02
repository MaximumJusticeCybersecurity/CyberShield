// V60.3.13 Stoplight Trust Color and PNG Path Recovery
// Purpose: trust-state colors must use stoplight red/yellow/green, while PNG art keeps its native color. Also retries likely uploaded PNG filenames.
// Boundary: static advisory prototype only. No live scoring, evidence retrieval, workflow automation, or enforcement.

const V60313_BASE = 'assets/trustmap/v60-3-12/';
const V60313_DOMAIN_STATE = {
  cloud: 'green',
  identity: 'green',
  appsData: 'yellow',
  ai: 'yellow',
  third: 'red',
  endpoints: 'green',
  cmmc: 'yellow'
};
const V60313_COLOR = {
  green: '#20e889',
  yellow: '#ffd43b',
  red: '#ff3347'
};
const V60313_LABEL_TO_ID = {
  'Cloud & Infrastructure': 'cloud',
  'Identities & Access': 'identity',
  'Applications & Data': 'appsData',
  'AI Systems & Agents': 'ai',
  'Third Parties & Vendors': 'third',
  'Devices & Endpoints': 'endpoints',
  'CMMC & Compliance': 'cmmc'
};
const V60313_FILE_CANDIDATES = {
  'CyberShield Trust Kernel': [
    'cybershield-trust-kernel.png',
    'CyberShield Trust Kernel.png',
    'CyberShield_Trust_Kernel.png',
    'cybershield_trust_kernel.png'
  ],
  'Cloud & Infrastructure': [
    'cloud-infrastructure.png',
    'cloud_infrastructure.png',
    'Cloud & Infrastructure.png',
    'Cloud_Infrastructure.png'
  ],
  'Identities & Access': [
    'identities-access.png',
    'identities_access.png',
    'Identities & Access.png',
    'Identities_Access.png'
  ],
  'Applications & Data': [
    'applications-data.png',
    'applications_data.png',
    'Applications & Data.png',
    'Applications_Data.png'
  ],
  'AI Systems & Agents': [
    'ai-systems-agents.png',
    'AI_systems_and_Agents.png',
    'ai_systems_and_agents.png',
    'AI Systems and Agents.png',
    'AI Systems & Agents.png'
  ],
  'Third Parties & Vendors': [
    'third-parties-vendors.png',
    'Third Parties and Vendors.png',
    'third_parties_and_vendors.png',
    'Third_Parties_and_Vendors.png',
    'Third Parties & Vendors.png'
  ],
  'Devices & Endpoints': [
    'devices-endpoints.png',
    'devices_endpoints.png',
    'Devices & Endpoints.png',
    'Devices_Endpoints.png'
  ],
  'CMMC & Compliance': [
    'cmmc-compliance.png',
    'CMMC_and_Compliance.png',
    'cmmc_and_compliance.png',
    'CMMC & Compliance.png'
  ]
};
function v60313$(selector, root=document){ return root.querySelector(selector); }
function v60313$$(selector, root=document){ return Array.from(root.querySelectorAll(selector)); }
function v60313StoplightForDomain(id){ return V60313_COLOR[V60313_DOMAIN_STATE[id] || 'yellow'] || V60313_COLOR.yellow; }
function v60313LabelForImg(img){ return img?.getAttribute('alt') || ''; }
function v60313EncodePath(file){ return V60313_BASE + encodeURIComponent(file).replaceAll('%2F','/'); }
function v60313InstallStyles(){
  if(v60313$('#v60-3-13-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-13-style';
  style.textContent = `
    #trustmap.active .v554-domain .orb:after{
      border-color:transparent!important;
    }
    #trustmap.active .v554-domain:hover .orb:after,
    #trustmap.active .v554-domain:focus-visible .orb:after,
    #trustmap.active .v554-domain.v60312-selected .orb:after{
      border-color:var(--v60313-stoplight,#ffd43b)!important;
      box-shadow:0 0 16px var(--v60313-stoplight,#ffd43b),0 0 42px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 55%,transparent)!important;
    }
    #trustmap.active .v60312-layer1-img{
      filter:drop-shadow(0 0 14px var(--v60313-stoplight,#ffd43b)) drop-shadow(0 0 28px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 36%,transparent))!important;
    }
    #trustmap.active .v554-domain:hover .v60312-layer1-img,
    #trustmap.active .v554-domain:focus-visible .v60312-layer1-img,
    #trustmap.active .v554-domain.v60312-selected .v60312-layer1-img{
      filter:drop-shadow(0 0 20px var(--v60313-stoplight,#ffd43b)) drop-shadow(0 0 44px color-mix(in srgb,var(--v60313-stoplight,#ffd43b) 50%,transparent))!important;
    }
    #trustmap.active .v554-status-dot{
      color:var(--v60313-stoplight,#ffd43b)!important;
    }
    #trustmap.active .v554-status-dot:before{
      background:var(--v60313-stoplight,#ffd43b)!important;
      box-shadow:0 0 9px var(--v60313-stoplight,#ffd43b)!important;
    }
    #trustmap.active #v60312RightAuthority{
      --asset-color:var(--v60313-selected-stoplight,#ffd43b)!important;
      --asset-state:var(--v60313-selected-stoplight,#ffd43b)!important;
    }
    #trustmap.active #v60312RightAuthority .v60312-score-ring{
      background:conic-gradient(var(--v60313-selected-stoplight,#ffd43b) calc(var(--score)*1%),rgba(255,255,255,.09) 0)!important;
      box-shadow:0 0 22px color-mix(in srgb,var(--v60313-selected-stoplight,#ffd43b) 35%,transparent)!important;
    }
    #trustmap.active #v60312RightAuthority .v60312-mini{
      border-color:var(--v60313-selected-stoplight,#ffd43b)!important;
      box-shadow:0 0 18px var(--v60313-selected-stoplight,#ffd43b)!important;
    }
    #trustmap.active #v60312RightAuthority .v60312-pill{
      border-color:var(--v60313-selected-stoplight,#ffd43b)!important;
      color:var(--v60313-selected-stoplight,#ffd43b)!important;
    }
  `;
  document.head.appendChild(style);
}
function v60313ApplyStoplightColors(){
  const trustmap = v60313$('#trustmap.active');
  if(!trustmap) return;
  v60313$$('.v554-domain', trustmap).forEach(domain => {
    const id = domain.dataset.v554Domain;
    const color = v60313StoplightForDomain(id);
    domain.style.setProperty('--v60313-stoplight', color);
    domain.style.setProperty('--v60312-state', color);
  });
  const selected = trustmap.querySelector('.v554-domain.v60312-selected')?.dataset.v554Domain || 'cloud';
  const right = trustmap.querySelector('#v60312RightAuthority');
  if(right) right.style.setProperty('--v60313-selected-stoplight', v60313StoplightForDomain(selected));
}
function v60313AttachFallbacksToImage(img){
  if(!img || img.dataset.v60313FallbackReady === 'true') return;
  const label = v60313LabelForImg(img);
  const candidates = V60313_FILE_CANDIDATES[label];
  if(!candidates || !candidates.length) return;
  img.dataset.v60313FallbackReady = 'true';
  img.dataset.v60313CandidateIndex = '0';
  img.addEventListener('error', () => {
    const currentIndex = Number(img.dataset.v60313CandidateIndex || '0');
    const nextIndex = currentIndex + 1;
    if(nextIndex >= candidates.length) return;
    img.dataset.v60313CandidateIndex = String(nextIndex);
    img.src = v60313EncodePath(candidates[nextIndex]);
  });
  const current = img.getAttribute('src') || '';
  if(!current.includes(V60313_BASE) && candidates[0]) img.src = v60313EncodePath(candidates[0]);
}
function v60313ApplyPngFallbacks(){
  const trustmap = v60313$('#trustmap.active');
  if(!trustmap) return;
  v60313$$('img.v60312-layer1-img, img.v60312-core-img, #v60312RightAuthority img', trustmap).forEach(v60313AttachFallbacksToImage);
}
function v60313MarkMeta(){
  const payload = v60313$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.13 Stoplight Trust Color and PNG Path Recovery';
    parsed.version = 'V60.3.13';
    parsed.previous_operational_build = 'V60.3.12 TrustMap PNG Asset Integration and Interaction Recovery';
    parsed.stoplight_trust_color_and_png_path_recovery = {
      status: 'active',
      rule: 'Hover rings, selected rings, score rings, and status states use stoplight green/yellow/red. PNG art remains native. Runtime retries likely uploaded PNG filenames.',
      github_pages_browser_qa_required: true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}
function v60313Apply(){
  if(!v60313$('#trustmap.active')) return;
  v60313InstallStyles();
  v60313ApplyStoplightColors();
  v60313ApplyPngFallbacks();
  v60313MarkMeta();
}
function v60313Handlers(){
  if(window.__v60313Handlers) return;
  window.__v60313Handlers = true;
  document.addEventListener('mouseover', v60313Apply, true);
  document.addEventListener('focusin', v60313Apply, true);
  document.addEventListener('click', () => setTimeout(v60313Apply, 120), true);
}
v60313Handlers();
setTimeout(v60313Apply, 2450);
window.addEventListener('load', () => setTimeout(v60313Apply, 2900), { once:true });
setTimeout(v60313Apply, 3800);
