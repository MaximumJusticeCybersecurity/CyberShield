const CANDIDATE_ACTIONS = [
  {
    action: 'Approve',
    outcome: 'Loses',
    defensibility: 'Not defensible',
    reason: 'Material evidence gaps, weak evidence, scope mismatch, and review authority gaps remain.',
    decision_effect: 'Would create avoidable vendor-risk exposure.'
  },
  {
    action: 'Accept with Caveat',
    outcome: 'Loses',
    defensibility: 'Premature',
    reason: 'Caveats are unresolved and material. A caveat is not a substitute for missing evidence.',
    decision_effect: 'Could normalize unsupported vendor approval.'
  },
  {
    action: 'Escalate for Review',
    outcome: 'Advances',
    defensibility: 'Required but incomplete',
    reason: 'Human review is required, but escalation alone does not supply the missing evidence.',
    decision_effect: 'Required control, but not sufficient as final action.'
  },
  {
    action: 'Request Evidence',
    outcome: 'Wins',
    defensibility: 'Strongest defensible action',
    reason: 'Preserves defensibility by requiring proof before approval, rejection, or risk acceptance.',
    decision_effect: 'Best next step for a material vendor-risk recommendation.'
  },
  {
    action: 'Reject',
    outcome: 'Holds',
    defensibility: 'Possible but not yet necessary',
    reason: 'The current record shows insufficient evidence for approval, not enough evidence to justify outright rejection.',
    decision_effect: 'Keep available if evidence cannot be supplied or conflicts worsen.'
  },
  {
    action: 'Quarantine',
    outcome: 'Holds',
    defensibility: 'Use for urgent exposure',
    reason: 'Quarantine is appropriate when use is already active or exposure is immediate. This demo is a pre-approval review.',
    decision_effect: 'Not the primary action for this sample unless active use is discovered.'
  },
  {
    action: 'Out of Scope for Current Review',
    outcome: 'Not applicable',
    defensibility: 'Scope control',
    reason: 'The sample is within the V1 vendor-risk review scope.',
    decision_effect: 'Reserved for unsupported inputs such as philosophical, political, HR, medical, or general advice.'
  }
];

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
}

function outcomeClass(outcome) {
  if (outcome === 'Wins') return 'good';
  if (outcome === 'Loses') return 'bad';
  if (outcome === 'Advances') return 'warn';
  return 'warn';
}

function actionRow(item) {
  const cls = outcomeClass(item.outcome);
  return `<tr><td>${escapeHtml(item.action)}</td><td><span class="tag ${cls}">${escapeHtml(item.outcome)}</span></td><td>${escapeHtml(item.defensibility)}</td><td>${escapeHtml(item.reason)}</td><td>${escapeHtml(item.decision_effect)}</td></tr>`;
}

function installStyles() {
  if (document.querySelector('#candidateActionTournamentStyles')) return;
  const style = document.createElement('style');
  style.id = 'candidateActionTournamentStyles';
  style.textContent = `
    .candidate-action-panel{border-color:rgba(119,225,161,.24)}
    .candidate-action-panel table{min-width:860px}
    .candidate-action-summary{border-left:5px solid var(--green);background:rgba(119,225,161,.08);border-radius:12px;padding:10px 12px;color:var(--muted);margin:10px 0}
    @media(max-width:960px){.candidate-action-panel table{min-width:760px}}
    @media print{.candidate-action-panel{display:none!important}}
  `;
  document.head.appendChild(style);
}

function renderTournament() {
  installStyles();
  const app = document.querySelector('#app');
  if (!app || document.querySelector('#candidateActionTournament')) return;
  const panel = document.createElement('section');
  panel.id = 'candidateActionTournament';
  panel.className = 'brief-card candidate-action-panel';
  panel.innerHTML = `
    <span class="label">Candidate Action Tournament</span>
    <h2>Why Request Evidence wins</h2>
    <div class="candidate-action-summary">CyberShield does not choose actions by preference or numeric trust score. It compares which next action is most defensible based on the evidence record. In this vendor-risk sample, Request Evidence wins.</div>
    <div class="table-wrap"><table><thead><tr><th>Candidate Action</th><th>Result</th><th>Defensibility</th><th>Reason</th><th>Decision Effect</th></tr></thead><tbody>${CANDIDATE_ACTIONS.map(actionRow).join('')}</tbody></table></div>
  `;
  const validators = document.querySelector('#vendorRiskValidators');
  if (validators?.nextSibling) validators.parentNode.insertBefore(panel, validators.nextSibling);
  else app.appendChild(panel);
}

function renderSideWinner() {
  const side = document.querySelector('#side');
  if (!side || document.querySelector('#candidateActionWinner')) return;
  const section = document.createElement('section');
  section.id = 'candidateActionWinner';
  section.className = 'brief-card candidate-action-panel';
  section.innerHTML = `
    <span class="label">Action Winner</span>
    <p><span class="tag good">Request Evidence wins</span></p>
    <p>Approval loses because the record still has material evidence gaps, weak support, and required human review.</p>
  `;
  side.appendChild(section);
}

function render() {
  renderTournament();
  renderSideWinner();
}

const observer = new MutationObserver(render);
observer.observe(document.body, { childList: true, subtree: true });
render();

export { CANDIDATE_ACTIONS, render };
