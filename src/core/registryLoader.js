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
    .option-card strong{display:block;margin-bottom:8px;line-height:1.18}.option-card span{display:block;line-height:1.35;color:#d8ecf8}.summary-card,.row{cursor:pointer;transition:border-color .16s,box-shadow .16s,transform .16s}.summary-card:hover,.row:hover{border-color:rgba(66,215,255,.95);box-shadow:0 0 0 3px rgba(66,215,255,.12),0 0 24px rgba(66,215,255,.22);transform:translateY(-1px)}.summary-card:focus-visible,.row:focus-visible{outline:3px solid rgba(66,215,255,.5);outline-offset:3px}.cs-meter{height:9px;border-radius:999px;background:rgba(255,255,255,.12);overflow:hidden;border:1px solid rgba(66,215,255,.22);margin-top:4px}.cs-meter>span{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#ff7474,#ffd166,#76e4a1);box-shadow:0 0 12px rgba(66,215,255,.3)}.cs-route-note{font-size:.78rem;color:#42d7ff;text-transform:uppercase;letter-spacing:.07em;font-weight:900}.edge{stroke-width:1!important;filter:drop-shadow(0 0 2px rgba(66,215,255,.3))}.edge.active{stroke-width:2!important;filter:drop-shadow(0 0 5px rgba(66,215,255,.85))}.trustmap-canvas{min-width:1120px!important;min-height:760px!important}.node{width:128px!important;min-height:104px!important;font-size:.78rem!important;padding:9px!important}.node .node-art svg{width:56px!important;height:46px!important}.node[data-node="record"]{top:11%!important;left:50%!important}.node[data-node="ai"]{top:27%!important;left:36%!important}.node[data-node="vendor"]{top:35%!important;left:80%!important}.node[data-node="policy"]{top:35%!important;left:18%!important}.node[data-node="proof"]{top:59%!important;left:19%!important}.node[data-node="identity"]{top:76%!important;left:32%!important}.node[data-node="data"]{top:73%!important;left:70%!important}.node[data-node="evidence"]{top:88%!important;left:52%!important}.node[data-node="exposure"]{top:62%!important;left:86%!important}.node[data-node="core"]{width:190px!important;min-height:176px!important;top:51%!important;left:50%!important;background:radial-gradient(circle at 50% 18%,rgba(66,215,255,.28),rgba(7,28,49,.98) 58%);border-color:rgba(66,215,255,.85)!important}.cs-core-anchor{display:grid;place-items:center;gap:5px;width:100%}.cs-core-logo{width:78px;height:78px;object-fit:contain;filter:drop-shadow(0 0 14px rgba(66,215,255,.85));z-index:2}.cs-core-portal{position:relative;width:130px;height:34px;border:1px solid rgba(66,215,255,.58);border-radius:50%;background:radial-gradient(ellipse at center,rgba(66,215,255,.30),rgba(6,23,38,.08) 62%,transparent 70%);box-shadow:0 0 20px rgba(66,215,255,.35);margin-top:-10px;overflow:hidden}.cs-core-portal:before{content:"";position:absolute;inset:5px 10px;border-radius:50%;border:1px dashed rgba(118,228,161,.52)}.cs-core-portal:after{content:"";position:absolute;left:14px;right:14px;top:16px;height:1px;background:linear-gradient(90deg,transparent,rgba(66,215,255,.95),transparent);box-shadow:0 -7px 0 rgba(66,215,255,.18),0 7px 0 rgba(66,215,255,.18)}.cs-core-company{font-weight:950;color:#f5fbff;line-height:1.12;text-shadow:0 0 10px rgba(66,215,255,.45);max-width:170px}.cs-core-sub{font-size:.68rem;color:#d8ecf8;line-height:1.18;max-width:170px}.node[data-node="core"] .node-art{display:none}.cs-detail-panel,.cs-report-library{margin-top:14px;border:1px solid rgba(66,215,255,.25);background:rgba(0,0,0,.18);border-radius:18px;padding:14px}.cs-report-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cs-report-card{border:1px solid rgba(66,215,255,.28);border-radius:16px;padding:12px;background:rgba(255,255,255,.06);cursor:pointer}.cs-report-card:hover{border-color:#42d7ff;box-shadow:0 0 18px rgba(66,215,255,.18)}@media(max-width:720px){.trustmap-canvas{min-width:1040px!important}.cs-report-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

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
      core.innerHTML = `<span class="cs-core-anchor"><img class="cs-core-logo" src="assets/mjc-logo-2026.png" alt="MJC CyberShield logo" onerror="this.style.display='none'"><span class="cs-core-portal" aria-hidden="true"></span><strong>CyberShield Core</strong><small class="cs-core-company"></small><small class="cs-core-sub">Trusted digital portal and governance control plane</small></span>`;
    }
    const company = core.querySelector('.cs-core-company');
    if (company && company.textContent !== label) company.textContent = label;
  };

  const showDetail = (title, body, route) => {
    const active = document.querySelector('.view.active .section-head, .view.active .panel');
    if (!active) return;
    let panel = document.querySelector('.view.active .cs-detail-panel');
    if (!panel) { panel = document.createElement('section'); panel.className = 'cs-detail-panel'; active.insertAdjacentElement('afterend', panel); }
    panel.innerHTML = `<span class="chip">Drilldown</span><h3>${title}</h3><p>${body}</p>${route ? `<div class="actions"><button class="primary" type="button" data-route="${route}">Open related workspace</button></div>` : ''}`;
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const navTo = (view, detailTitle, detailBody) => {
    const button = document.querySelector(`#mainNav button[data-view="${view}"]`);
    if (button) button.click();
    setTimeout(() => {
      if (view === 'trustmap') patchTrustCore();
      if (detailTitle) showDetail(detailTitle, detailBody || 'CyberShield routes this dashboard object into deeper operational context.', view);
      document.querySelector(`#${view}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      enhanceCurrentView();
    }, 60);
  };

  const routeFromText = text => {
    const lower = text.toLowerCase();
    if (lower.includes('overview map')) return ['trustmap','Overview Map','The overview map is the first layer. It shows the operating environment before drilling into domain and action layers.'];
    if (lower.includes('domain layer')) return ['trustmap','Domain Layer','The domain layer opens a specific trust object such as Data, AI Systems, Vendors, Policy, Evidence, Identity, or Proof Pack.'];
    if (lower.includes('detail') || lower.includes('action layer')) return ['trustmap','Detail / Action Layer','The detail layer should show owner, evidence gap, model context, next action, and route to Proof Pack or Evidence.'];
    if (lower.includes('proof route')) return ['proof','Proof Route','The proof route turns the decision and evidence trail into a role-tailored report.'];
    if (lower.includes('runtime control') || lower.includes('primary next action') || lower.includes('operational consequence') || lower.includes('risky action')) return ['runtime','Runtime Control','This object routes to operational admissibility: should the action be allowed, constrained, escalated, or blocked before consequence?'];
    if (lower.includes('trust posture') || lower.includes('dashboard routing') || lower.includes('human accountability')) return ['trustmap','Trust Posture','Trust posture routes into the TrustMap because the score depends on relationships between AI, data, identity, vendor, evidence, and policy.'];
    if (lower.includes('proof status') || lower.includes('proof pack')) return ['proof','Proof Status','Proof status routes to the Proof Pack, where CyberShield turns the advisory decision into reportable evidence.'];
    if (lower.includes('evidence posture') || lower.includes('evidence') || lower.includes('artifact') || lower.includes('gap') || lower.includes('required')) return ['evidence','Evidence Requirement','This item is required because CyberShield cannot defend the decision without enough lineage, ownership, or source confidence.'];
    if (lower.includes('exposure')) return ['runtime','Exposure','Exposure routes to runtime because the consequence must be understood before the action executes.'];
    return null;
  };

  const enhanceBriefing = () => {
    document.querySelectorAll('#briefing .summary-card').forEach(card => {
      if (card.dataset.enhanced === 'true') return;
      card.dataset.enhanced = 'true'; card.tabIndex = 0;
      const metric = card.querySelector('.metric');
      if (!metric) return;
      const text = metric.textContent || '';
      const value = parseInt(text.match(/\d+/)?.[0] || (text.includes('$') ? '64' : text.toLowerCase().includes('draft') ? '58' : '50'), 10);
      const width = Math.max(12, Math.min(100, value));
      metric.insertAdjacentHTML('afterend', `<div class="cs-meter" aria-hidden="true"><span style="width:${width}%"></span></div><span class="cs-route-note">Tap to drill down</span>`);
    });
  };

  const enhanceProofReports = () => {
    const proof = document.querySelector('#proof .panel');
    if (!proof || proof.querySelector('.cs-report-library')) return;
    const reports = ['Executive Brief','Board Oversight Report','Evidence Gap Report','Control Owner Tasking','Runtime Decision Record','Vendor / Payment Trust Report','Compliance Mapping Summary','Remediation Roadmap'];
    const lib = document.createElement('section');
    lib.className = 'cs-report-library';
    lib.innerHTML = `<span class="chip">Report Library</span><h3>Proof Pack report options</h3><p>The Proof Pack should become the parent packet for role-tailored reports. These are prototype report routes.</p><div class="cs-report-grid">${reports.map(r => `<article class="cs-report-card" tabindex="0"><strong>${r}</strong><p>Tap to preview purpose, owner, and output use.</p></article>`).join('')}</div>`;
    proof.appendChild(lib);
  };

  const enhanceCurrentView = () => { enhanceBriefing(); enhanceProofReports(); patchTrustCore(); };

  document.addEventListener('click', event => {
    const routeButton = event.target.closest('[data-route]');
    if (routeButton) { navTo(routeButton.dataset.route); return; }
    const target = event.target.closest('.summary-card,.row,.cs-report-card');
    if (!target) return;
    const route = routeFromText(target.textContent || '');
    if (route) navTo(route[0], route[1], route[2]);
    else showDetail('Report Detail', `${target.textContent.trim()} should become a tailored report drilldown with owner, audience, evidence, and action path.`, 'proof');
  }, true);

  document.addEventListener('click', event => {
    if (event.target.closest('#mainNav button,#nextStep,#skipDemo,#restartAssessment,#trustBack,#trustDomain,#trustDetail,.node,#layerFilters .row')) setTimeout(enhanceCurrentView, 80);
  }, true);

  document.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target.closest?.('.summary-card,.row,.cs-report-card');
    if (!target) return;
    event.preventDefault();
    const route = routeFromText(target.textContent || '');
    if (route) navTo(route[0], route[1], route[2]);
  });

  window.addEventListener('load', () => setTimeout(enhanceCurrentView, 120), { once: true });
}
