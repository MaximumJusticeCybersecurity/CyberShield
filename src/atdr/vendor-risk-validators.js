const VALIDATORS = [
  {
    id: 'soc2_scope',
    question: 'Is SOC 2 enough?',
    status: 'Needs Evidence',
    reason: 'A SOC 2 report may exist, but approval is not defensible unless the evaluated AI service is clearly within scope.',
    evidence_needed: 'Current SOC 2 report, bridge letter if needed, and explicit service/system scope confirmation.',
    decision_impact: 'Blocks approval until scope is confirmed.'
  },
  {
    id: 'encryption_proof',
    question: 'Is encryption proof enough?',
    status: 'Needs Evidence',
    reason: 'Encryption is claimed, but vendor assertions alone are weak evidence.',
    evidence_needed: 'Independent encryption, key management, and data-flow evidence tied to the reviewed service.',
    decision_impact: 'Supports Request Evidence rather than approval.'
  },
  {
    id: 'framework_mapping',
    question: 'Is framework mapping compliance proof?',
    status: 'Fail',
    reason: 'Framework relevance does not prove implementation or operating effectiveness.',
    evidence_needed: 'Control owner evidence, implementation evidence, and testing or operating-effectiveness evidence.',
    decision_impact: 'Prevents marking the vendor or control compliant based only on mapping.'
  },
  {
    id: 'data_use',
    question: 'Is data-use language safe?',
    status: 'Needs Evidence',
    reason: 'DPA or service terms may allow service improvement, product analytics, or derived-use language that changes risk.',
    evidence_needed: 'DPA, privacy terms, data-use restrictions, retention terms, and legal/privacy review.',
    decision_impact: 'Requires legal/privacy review before approval.'
  },
  {
    id: 'subprocessors',
    question: 'Are subprocessors known?',
    status: 'Needs Evidence',
    reason: 'AI analytics providers and downstream access must be known before the vendor can be approved.',
    evidence_needed: 'Complete subprocessor list, AI service providers, hosting locations, and change-notice terms.',
    decision_impact: 'Blocks approval until downstream access is understood.'
  },
  {
    id: 'incident_notice',
    question: 'Is incident notification strong enough?',
    status: 'Needs Evidence',
    reason: 'Vague language such as without undue delay does not provide a fixed notification timeline.',
    evidence_needed: 'Contractual incident notification timeline, escalation path, and breach-notice responsibility.',
    decision_impact: 'Requires stronger terms or explicit risk acceptance.'
  },
  {
    id: 'human_approval',
    question: 'Is human approval required?',
    status: 'Fail',
    reason: 'A business owner comfort statement is not the same as accountable vendor-risk approval.',
    evidence_needed: 'Vendor-Risk Owner approval, Security SME review, Legal/Privacy review when data terms are implicated, and Business Owner approval.',
    decision_impact: 'Escalate for Review and Request Evidence remain required.'
  }
];

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
}

function statusClass(status) {
  if (status === 'Fail') return 'bad';
  if (status === 'Pass') return 'good';
  return 'warn';
}

function validatorCard(v) {
  const cls = statusClass(v.status);
  return `
    <article class="brief-card validator-card">
      <span class="label">Validator</span>
      <h3>${escapeHtml(v.question)}</h3>
      <p><span class="tag ${cls}">${escapeHtml(v.status)}</span></p>
      <p><strong>Reason:</strong> ${escapeHtml(v.reason)}</p>
      <p><strong>Evidence needed:</strong> ${escapeHtml(v.evidence_needed)}</p>
      <p><strong>Decision impact:</strong> ${escapeHtml(v.decision_impact)}</p>
    </article>
  `;
}

function installValidatorStyles() {
  if (document.querySelector('#vendorRiskValidatorStyles')) return;
  const style = document.createElement('style');
  style.id = 'vendorRiskValidatorStyles';
  style.textContent = `
    .validator-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:8px}
    .validator-card{border-color:rgba(66,215,255,.26)}
    .validator-card h3{font-size:1rem;margin:.25rem 0 .45rem}
    .validator-card p{font-size:.92rem;margin:.35rem 0}
    .validator-summary{border-left:5px solid var(--amber);background:rgba(255,209,102,.08);border-radius:12px;padding:10px 12px;color:var(--muted);margin:10px 0}
    @media(max-width:960px){.validator-grid{grid-template-columns:1fr}.validator-card p{font-size:.9rem}}
    @media print{.validator-panel{display:none!important}}
  `;
  document.head.appendChild(style);
}

function renderValidators() {
  installValidatorStyles();
  const app = document.querySelector('#app');
  if (!app || document.querySelector('#vendorRiskValidators')) return;
  const panel = document.createElement('section');
  panel.id = 'vendorRiskValidators';
  panel.className = 'brief-card validator-panel';
  panel.innerHTML = `
    <span class="label">Validator Checks</span>
    <h2>Why approval is not defensible yet</h2>
    <div class="validator-summary">These validator checks do not create a numeric trust score. They explain why Request Evidence is stronger than approving the vendor based on SOC 2, encryption, or broad low-risk language.</div>
    <div class="validator-grid">${VALIDATORS.map(validatorCard).join('')}</div>
  `;
  const insertionPoint = [...app.children].find(child => child.tagName === 'H1') || app.firstChild;
  if (insertionPoint && insertionPoint.nextSibling) insertionPoint.parentNode.insertBefore(panel, insertionPoint.nextSibling);
  else app.appendChild(panel);
}

function renderSideSummary() {
  const side = document.querySelector('#side');
  if (!side || document.querySelector('#validatorSideSummary')) return;
  const failed = VALIDATORS.filter(v => v.status === 'Fail').length;
  const needs = VALIDATORS.filter(v => v.status === 'Needs Evidence').length;
  const section = document.createElement('section');
  section.id = 'validatorSideSummary';
  section.className = 'brief-card validator-panel';
  section.innerHTML = `
    <span class="label">Validator Summary</span>
    <p><span class="tag bad">${failed} fail</span><span class="tag warn">${needs} need evidence</span></p>
    <p>Validator result: approval is not defensible as written. Request Evidence remains the strongest action.</p>
  `;
  side.appendChild(section);
}

function render() {
  renderValidators();
  renderSideSummary();
}

const observer = new MutationObserver(render);
observer.observe(document.body, { childList: true, subtree: true });
render();

export { VALIDATORS, render };
