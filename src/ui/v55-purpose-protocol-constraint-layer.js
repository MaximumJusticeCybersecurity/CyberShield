// V55 Purpose Protocol + Constraint Layer + Refusal Test
// Integrates protocol readiness, hard-constraint refusal, decision record fields, and Proof Pack Protocol Basis.

const V55_PROTOCOL = {
  protocol_id: 'purpose-protocol.v1',
  protocol_name: 'CyberShield Purpose Protocol',
  version: '1.0.0',
  purpose_statement: 'Turn executive intent into machine-readable governance before action.',
  scenario_id: 'payment_trust',
  action_requested: 'Approve $40,000 vendor payment',
  trigger_condition: 'Vendor banking details changed within 30 days',
  triggered_constraint: 'constraint.vendor_payment_change_30d',
  constraint_text: 'Payment approval is forbidden unless current banking verification and controller approval are present.',
  decision_state: 'Refused by Constraint / Escalate',
  escalation_owner: 'Controller',
  secondary_owner: 'CFO',
  evidence_present: ['vendor record', 'payment request', 'prior vendor relationship'],
  evidence_missing: ['current banking verification', 'controller approval'],
  proof_pack_reference: 'protocol_basis.vendor_payment_change_30d',
  tradeoff_rule: 'Evidence beats speed for vendor banking changes within 30 days.',
  endorsement_test: 'Pass',
  refusal_test: 'Pass',
  refusal_response: 'This action is refused by constraint.  This action cannot proceed until required evidence and authority are present.'
};

const v55$ = (selector, root=document) => root.querySelector(selector);
const v55$$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
const v55Esc = (value) => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
const v55Scenario = () => localStorage.getItem('cyberShieldV53Scenario') || 'cmmc_applicability';

function installV55Styles() {
  if (v55$('#v55-protocol-style')) return;
  const style = document.createElement('style');
  style.id = 'v55-protocol-style';
  style.textContent = `
    .v55-protocol-card{margin-top:16px;border:1px solid rgba(66,215,255,.3);border-radius:20px;background:linear-gradient(180deg,rgba(7,27,48,.96),rgba(4,14,24,.99));padding:16px;box-shadow:0 20px 44px rgba(0,0,0,.28)}
    .v55-protocol-card h3{margin:.35rem 0}.v55-protocol-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:12px}.v55-protocol-item{border:1px solid rgba(66,215,255,.22);border-radius:15px;background:rgba(255,255,255,.055);padding:11px}.v55-protocol-item strong{display:block}.v55-pass{color:#76e4a1}.v55-warn{color:#ffd166}.v55-refuse{color:#ff7474}.v55-protocol-basis{white-space:pre-wrap;background:#061726;border:1px solid rgba(66,215,255,.24);border-radius:16px;padding:14px;color:#e2f8ff}.v55-refusal-banner{border:1px solid rgba(255,116,116,.48);border-radius:18px;background:rgba(255,116,116,.11);padding:14px;margin:12px 0;box-shadow:0 0 22px rgba(255,116,116,.12)}.v55-protocol-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.v55-protocol-actions button{border:1px solid rgba(66,215,255,.3);border-radius:999px;background:rgba(66,215,255,.12);color:#f5fbff;padding:8px 12px}@media(max-width:760px){.v55-protocol-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
}

function protocolReadinessHtml() {
  const rows = [
    ['Constraints defined', '1 hard constraint', 'Pass'],
    ['Trade-off rules defined', 'speed vs evidence', 'Pass'],
    ['Refusal rules defined', 'payment refused by constraint', 'Pass'],
    ['Escalation owners assigned', 'Controller / CFO', 'Pass'],
    ['Evidence requirements mapped', 'banking verification + controller approval', 'Pass'],
    ['Identity layer documented', 'human owner remains visible', 'Pass'],
    ['Endorsement Test', 'leadership would endorse refusal', 'Pass'],
    ['Refusal Test', 'system can determine what not to do', 'Pass']
  ];
  return `<section class="v55-protocol-card" id="v55ProtocolReadiness"><span class="chip">Protocol Readiness</span><h3>CyberShield turns purpose into protocol</h3><p>Purpose is not governance until it can cause a refusal.  This scenario demonstrates a hard constraint for vendor payment destination changes.</p><div class="v55-protocol-grid">${rows.map(([a,b,c])=>`<div class="v55-protocol-item"><strong>${v55Esc(a)}</strong><span>${v55Esc(b)}</span><div class="v55-pass">${v55Esc(c)}</div></div>`).join('')}</div></section>`;
}

function decisionRecordText() {
  return `Protocol Decision Record\n\nAction requested:\n${V55_PROTOCOL.action_requested}\n\nPurpose protocol:\n${V55_PROTOCOL.protocol_name} (${V55_PROTOCOL.version})\n\nTriggered constraint:\n${V55_PROTOCOL.triggered_constraint}\n\nTrigger condition:\n${V55_PROTOCOL.trigger_condition}\n\nDecision rule applied:\n${V55_PROTOCOL.tradeoff_rule}\n\nDecision state:\n${V55_PROTOCOL.decision_state}\n\nEvidence present:\n${V55_PROTOCOL.evidence_present.map(x => '- ' + x).join('\n')}\n\nEvidence missing:\n${V55_PROTOCOL.evidence_missing.map(x => '- ' + x).join('\n')}\n\nRefusal / escalation reason:\n${V55_PROTOCOL.refusal_response}\n\nOwner:\n${V55_PROTOCOL.escalation_owner}\n\nSecondary owner:\n${V55_PROTOCOL.secondary_owner}\n\nTimestamp:\n${new Date().toLocaleString()}\n\nProtocol version:\n${V55_PROTOCOL.version}\n\nProof Pack reference:\n${V55_PROTOCOL.proof_pack_reference}\n\nEndorsement Test:\n${V55_PROTOCOL.endorsement_test}\n\nRefusal Test:\n${V55_PROTOCOL.refusal_test}\n\nHuman-fireable-offense rule:\nIf a human would be disciplined or fired for doing it, an AI agent or automated workflow must be technically constrained from doing it without evidence, authority, logging, and escalation.\n\nBoundary:\nStatic advisory prototype.  No live payment blocking, banking integration, or enforcement integration is claimed.`;
}

function protocolBasisText() {
  return `Protocol Basis\n\nApplicable Purpose Protocol:\n${V55_PROTOCOL.protocol_name} (${V55_PROTOCOL.version})\n\nPurpose statement:\n${V55_PROTOCOL.purpose_statement}\n\nTriggered constraint:\n${V55_PROTOCOL.constraint_text}\n\nTrade-off rule applied:\n${V55_PROTOCOL.tradeoff_rule}\n\nEvidence required:\n- current banking verification\n- controller approval\n\nEvidence missing:\n${V55_PROTOCOL.evidence_missing.map(x => '- ' + x).join('\n')}\n\nRefusal / escalation reason:\n${V55_PROTOCOL.refusal_response}\n\nOwner:\n${V55_PROTOCOL.escalation_owner}\n\nProtocol version:\n${V55_PROTOCOL.version}\n\nLeadership Endorsement Test:\n${V55_PROTOCOL.endorsement_test}\n\nRefusal Test:\n${V55_PROTOCOL.refusal_test}\n\nProof Pack reference:\n${V55_PROTOCOL.proof_pack_reference}`;
}

function renderBriefingProtocol() {
  const split = v55$('#briefing .split-layout');
  if (!split || v55$('#v55ProtocolReadiness')) return;
  split.insertAdjacentHTML('afterend', protocolReadinessHtml());
}

function renderRuntimeProtocol() {
  const feed = v55$('#decisionFeed');
  if (!feed || v55$('#v55RuntimeProtocol')) return;
  feed.insertAdjacentHTML('afterbegin', `<section class="v55-refusal-banner" id="v55RuntimeProtocol"><span class="chip">Refused by Constraint</span><h3>${v55Esc(V55_PROTOCOL.refusal_response)}</h3><p><strong>Action requested:</strong> ${v55Esc(V55_PROTOCOL.action_requested)}</p><p><strong>Trigger:</strong> ${v55Esc(V55_PROTOCOL.trigger_condition)}</p><p><strong>Owner:</strong> ${v55Esc(V55_PROTOCOL.escalation_owner)}</p><div class="v55-protocol-actions"><button type="button" data-v55-copy-record>Copy Decision Record</button><button type="button" data-v55-open-proof>Open Protocol Basis</button></div></section>`);
}

function renderProofProtocol() {
  const proof = v55$('#proofOutput');
  if (proof && !proof.dataset.v55Protocol) {
    proof.dataset.v55Protocol = 'true';
    proof.textContent = `${proof.textContent}\n\n---\n\n${protocolBasisText()}`;
  }
  const panel = v55$('#proof .panel');
  if (panel && !v55$('#v55ProtocolBasis')) {
    panel.insertAdjacentHTML('beforeend', `<section class="v55-protocol-card" id="v55ProtocolBasis"><span class="chip">Protocol Basis</span><h3>Purpose Protocol / Constraint Layer Proof</h3><pre class="v55-protocol-basis">${v55Esc(protocolBasisText())}</pre></section>`);
  }
}

function renderArchitectureProtocol() {
  const cards = v55$('#architectureCards');
  if (!cards || v55$('#v55ArchitectureProtocol')) return;
  cards.insertAdjacentHTML('beforebegin', `<section class="v55-protocol-card" id="v55ArchitectureProtocol"><span class="chip">Purpose Protocol Architecture</span><h3>Executive intent becomes machine-readable governance</h3><p><strong>Constraint Layer:</strong> defines what agents or workflows must never do.</p><p><strong>Decision Layer:</strong> defines how trade-offs are resolved when no human is present.</p><p><strong>Identity Layer:</strong> keeps human judgment, ownership, and mission boundaries visible.</p><p class="v55-refuse"><strong>Governance test:</strong> if your AI cannot tell what not to do, your governance is not operational.</p></section>`);
}

function patchPaymentScenarioPriority() {
  const select = v55$('#v53ScenarioSelect');
  if (!select || select.dataset.v55ProtocolPatched) return;
  const payment = Array.from(select.options).find(o => o.value === 'payment_trust');
  if (payment) payment.textContent = 'Payment Trust Verification — Purpose Protocol Demo';
  select.dataset.v55ProtocolPatched = 'true';
}

function markMetadata() {
  document.title = 'CyberShield V55 Purpose Protocol';
  const admin = v55$('#adminPayload');
  if (!admin) return;
  try {
    const payload = JSON.parse(admin.textContent || '{}');
    payload.build = 'V55 Purpose Protocol and Constraint Layer';
    payload.version = 'V55';
    payload.purpose_protocol = V55_PROTOCOL;
    admin.textContent = JSON.stringify(payload, null, 2);
  } catch {}
}

function renderV55() {
  installV55Styles();
  patchPaymentScenarioPriority();
  if (v55$('#app')?.hidden) return;
  renderBriefingProtocol();
  renderRuntimeProtocol();
  renderProofProtocol();
  renderArchitectureProtocol();
  markMetadata();
}

document.addEventListener('click', (event) => {
  if (event.target.closest('[data-v55-copy-record]')) {
    navigator.clipboard?.writeText(decisionRecordText());
    alert('Protocol Decision Record copied.');
  }
  if (event.target.closest('[data-v55-open-proof]')) {
    document.querySelector('#mainNav button[data-view="proof"]')?.click();
    setTimeout(renderV55, 120);
  }
  if (event.target.closest('#mainNav button,#v53ScenarioSelect,#nextStep,#backStep,#skipDemo,#restartAssessment')) setTimeout(renderV55, 150);
}, true);

window.addEventListener('load', () => setTimeout(renderV55, 800), { once: true });
setTimeout(renderV55, 1000);
