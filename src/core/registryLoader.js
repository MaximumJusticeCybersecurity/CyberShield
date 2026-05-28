export async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Registry load failed: ${path}`);
  }

  return response.json();
}

export async function loadRegistryBundle() {
  installInteractionAndCorePatch();
  const models = await loadJson("./data/models/model-registry.json");
  const roles = await loadJson("./data/profiles/role-profiles.json");
  return { models, roles };
}

function installInteractionAndCorePatch() {
  if (window.__cyberShieldInteractionPatchInstalled) return;
  window.__cyberShieldInteractionPatchInstalled = true;

  const style = document.createElement("style");
  style.textContent = `
    .summary-card,.row{cursor:pointer;transition:border-color .16s,box-shadow .16s,transform .16s}
    .summary-card:hover,.row:hover{border-color:rgba(66,215,255,.95);box-shadow:0 0 0 3px rgba(66,215,255,.12),0 0 24px rgba(66,215,255,.22);transform:translateY(-1px)}
    .summary-card:focus-visible,.row:focus-visible{outline:3px solid rgba(66,215,255,.5);outline-offset:3px}
    .node[data-node="core"]{width:230px!important;min-height:205px!important;background:radial-gradient(circle at 50% 18%,rgba(66,215,255,.28),rgba(7,28,49,.98) 58%);border-color:rgba(66,215,255,.85)!important}
    .cs-core-anchor{display:grid;place-items:center;gap:7px;width:100%}
    .cs-core-logo{width:94px;height:94px;object-fit:contain;filter:drop-shadow(0 0 16px rgba(66,215,255,.85));z-index:2}
    .cs-core-portal{position:relative;width:150px;height:44px;border:1px solid rgba(66,215,255,.58);border-radius:50%;background:radial-gradient(ellipse at center,rgba(66,215,255,.30),rgba(6,23,38,.08) 62%,transparent 70%);box-shadow:0 0 24px rgba(66,215,255,.35);margin-top:-12px;overflow:hidden}
    .cs-core-portal:before{content:"";position:absolute;inset:5px 10px;border-radius:50%;border:1px dashed rgba(118,228,161,.52)}
    .cs-core-portal:after{content:"";position:absolute;left:14px;right:14px;top:21px;height:1px;background:linear-gradient(90deg,transparent,rgba(66,215,255,.95),transparent);box-shadow:0 -8px 0 rgba(66,215,255,.18),0 8px 0 rgba(66,215,255,.18)}
    .cs-core-company{font-weight:950;color:#f5fbff;line-height:1.12;text-shadow:0 0 10px rgba(66,215,255,.45);max-width:200px}
    .cs-core-sub{font-size:.72rem;color:#d8ecf8;line-height:1.2;max-width:200px}
    .node[data-node="core"] .node-art{display:none}
  `;
  document.head.appendChild(style);

  const navTo = view => {
    const button = document.querySelector(`#mainNav button[data-view="${view}"]`);
    if (button) button.click();
    requestAnimationFrame(() => {
      if (view === "trustmap") patchTrustCore();
      document.querySelector(`#${view}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const currentOrg = () => {
    const settingsOrg = document.querySelector('#setOrg')?.value?.trim();
    if (settingsOrg) return settingsOrg;
    const lensText = document.querySelector('#roleLens')?.textContent || '';
    const match = lensText.match(/routed\s+(.+?)\s+to\s+the/i);
    if (match && match[1]) return match[1].trim();
    const onboardingOrg = document.querySelector('#obOrg')?.value?.trim();
    if (onboardingOrg) return onboardingOrg;
    return 'Selected Company';
  };

  const patchTrustCore = () => {
    const core = document.querySelector('.node[data-node="core"]');
    if (!core) return;
    const label = `${currentOrg()} Control Plane`;
    if (core.dataset.logoPatched !== "true") {
      core.dataset.logoPatched = "true";
      core.innerHTML = `
        <span class="cs-core-anchor">
          <img class="cs-core-logo" src="assets/mjc-logo-2026.png" alt="MJC CyberShield logo" onerror="this.style.display='none'">
          <span class="cs-core-portal" aria-hidden="true"></span>
          <strong>CyberShield Core</strong>
          <small class="cs-core-company"></small>
          <small class="cs-core-sub">Trusted digital portal and governance control plane</small>
        </span>`;
    }
    const company = core.querySelector('.cs-core-company');
    if (company && company.textContent !== label) company.textContent = label;
  };

  const routeFromText = text => {
    const lower = text.toLowerCase();
    if (lower.includes('runtime control') || lower.includes('primary next action') || lower.includes('operational consequence') || lower.includes('risky action')) return 'runtime';
    if (lower.includes('trust posture') || lower.includes('dashboard routing') || lower.includes('human accountability')) return 'trustmap';
    if (lower.includes('proof status') || lower.includes('proof pack')) return 'proof';
    if (lower.includes('evidence posture') || lower.includes('evidence') || lower.includes('artifact')) return 'evidence';
    if (lower.includes('exposure')) return 'runtime';
    return null;
  };

  document.addEventListener('click', event => {
    const target = event.target.closest('.summary-card,.row');
    if (!target) return;
    const route = routeFromText(target.textContent || '');
    if (route) navTo(route);
  }, true);

  document.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target.closest?.('.summary-card,.row');
    if (!target) return;
    event.preventDefault();
    const route = routeFromText(target.textContent || '');
    if (route) navTo(route);
  });

  document.addEventListener('click', event => {
    if (event.target.closest('#mainNav button[data-view="trustmap"]')) {
      setTimeout(patchTrustCore, 0);
    }
  }, true);

  window.addEventListener('load', () => setTimeout(patchTrustCore, 0), { once: true });
}
