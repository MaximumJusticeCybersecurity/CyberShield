const CTA_ID = 'outOfScopeRecoveryCta';

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function buildCta() {
  const section = document.createElement('section');
  section.id = CTA_ID;
  section.className = 'brief-card';
  section.innerHTML = `
    <span class="label">Out-of-Scope Recovery</span>
    <h3>This demo is intentionally narrow.</h3>
    <p>CyberShield works best right now on AI-generated vendor-risk, security, or compliance recommendations. Try the vendor-risk sample to see the full Trust Decision Record workflow.</p>
    <div class="actions">
      <button id="tryVendorRiskSample" class="primary" type="button">Try Vendor-Risk Sample</button>
      <button id="requestDemoCta" type="button">Request Demo</button>
    </div>
    <p style="margin-top:10px"><a id="contactMjcCta" href="mailto:max@maximumjusticecybersecurity.com?subject=CyberShield%20Decision%20Assurance%20Inquiry">Contact Maximum Justice Cybersecurity</a></p>
  `;
  return section;
}

function isOutOfScope() {
  const brief = document.querySelector('#decisionBrief');
  const workspace = document.querySelector('#workspace');
  const text = `${brief?.textContent || ''} ${workspace?.textContent || ''}`.toLowerCase();
  return text.includes('out of scope for current review') || text.includes('out-of-scope') || text.includes('outside cyb') || text.includes('outside the current v1 decision-assurance scope');
}

function wireCta(section) {
  section.querySelector('#tryVendorRiskSample')?.addEventListener('click', () => {
    document.querySelector('#loadDemoTop')?.click();
    document.querySelector('#demoMode') && (document.querySelector('#demoMode').value = 'vendor-risk-contradictory-evidence');
  });
  section.querySelector('#requestDemoCta')?.addEventListener('click', () => {
    window.location.href = 'mailto:max@maximumjusticecybersecurity.com?subject=CyberShield%20Decision%20Assurance%20Demo%20Request';
  });
}

function renderOutOfScopeCta() {
  const brief = document.querySelector('#decisionBrief');
  if (!brief) return;
  const existing = document.querySelector(`#${CTA_ID}`);
  if (!isOutOfScope()) {
    existing?.remove();
    return;
  }
  if (existing) return;
  const section = buildCta();
  brief.appendChild(section);
  wireCta(section);
}

const observer = new MutationObserver(renderOutOfScopeCta);
observer.observe(document.body, { childList: true, subtree: true, characterData: true });
renderOutOfScopeCta();

export { renderOutOfScopeCta };