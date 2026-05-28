import { calculateDecision } from './core/scoringEngine.js';
import { loadRegistryBundle } from './core/registryLoader.js';
import { $, $$, activateView, escapeHtml, renderFeedItem } from './utils/dom.js';

const DEFAULT = {
  leader: 'Carrie',
  org: 'Acme Manufacturing',
  role: 'CISO / vCISO',
  industry: 'DIB / Federal Contractor SMB',
  scenario: 'Vendor AI access',
  value: '$5M to $25M',
  evidence: 'medium',
  vendor: 'No',
  priority: 'Audit defensibility',
  audience: 'CEO and CISO'
};

let state = { ...DEFAULT };
let registry = null;
let decision = null;
let artifacts = [];
let onboardingStep = 0;
let selectedLayer = 'all';
let selectedNode = 'data';
let trustMode = 'overview';
let detailTopic = null;

const exposure = {
  'Under $5M': '$175K to $650K',
  '$5M to $25M': '$420K to $1.8M',
  '$25M to $100M': '$1.6M to $6.5M',
  '$100M+': '$4.8M to $18M+'
};

const steps = [
  { key: 'identity', title: 'Who is using CyberShield?', text: 'Set the human lens first. CyberShield should explain risk differently to a CEO, CFO, CISO, CIO, or board advisor.' },
  { key: 'industry', title: 'What kind of organization is this?', text: 'The demo should stop feeling generic. Industry selection changes language, evidence emphasis, and scenario credibility.' },
  { key: 'scenario', title: 'What risk are we evaluating?', text: 'Choose the action CyberShield is evaluating before consequence.' },
  { key: 'evidence', title: 'What evidence exists?', text: 'Evidence posture changes the decision, proof strength, and next action.' },
  { key: 'priority', title: 'What matters most?', text: 'The dashboard emphasis changes based on business consequence, regulation, operations, trust, or defensibility.' },
  { key: 'audience', title: 'Who needs the output?', text: 'Proof Pack language and dashboard emphasis should match the people who must act.' }
];

const options = {
  role: ['CEO / President', 'CFO', 'CIO / CTO', 'CISO / vCISO', 'Board / Advisor'],
  industry: ['DIB / Federal Contractor SMB', 'Healthcare / Federal Health Security', 'Financial Services / Community Banking', 'AI-Enabled SMB / SaaS', 'Professional Services'],
  scenario: ['Vendor AI access', 'Payment destination verification', 'Brand or identity authenticity', 'Data handling and permitted use', 'Operational continuity'],
  evidence: ['high', 'medium', 'low'],
  vendor: ['Yes', 'Unknown', 'No'],
  value: ['Under $5M', '$5M to $25M', '$25M to $100M', '$100M+'],
  priority: ['Financial exposure', 'Regulatory exposure', 'Operational disruption', 'Trust and reputation', 'Audit defensibility'],
  audience: ['CEO and CISO', 'CFO and audit committee', 'Board / Advisor', 'Legal and Compliance', 'Client or customer']
};

const layerMeta = {
  all: 'Show every layer',
  core: 'Layer 1: Executive Core',
  ops: 'Layer 2: Operational Systems',
  gov: 'Layer 3: Evidence and Governance',
  exposure: 'Layer 4: Consequence and Exposure'
};

const nodes = [
  { id: 'core', layer: 'core', title: 'CyberShield Core', sub: 'Control plane and accountable owner', x: 50, y: 50, icon: 'shield', detail: 'The executive control center where action, evidence, ownership, and proof converge.', why: 'Without a control point, AI and vendor actions become scattered decisions instead of governed actions.', evidence: ['named owner', 'decision authority', 'approval boundary'], next: 'Confirm accountable human owner before approval.', links: ['ai', 'vendor', 'record', 'proof'], domain: ['Owner authority', 'Runtime gate', 'Decision policy', 'Proof route'] },
  { id: 'ai', layer: 'ops', title: 'AI Systems', sub: 'Agent and automation boundary', x: 50, y: 24, icon: 'brain', detail: 'AI systems trying to act, recommend, retrieve, summarize, enrich, or trigger workflow.', why: 'AI action without runtime context creates operational risk before anyone realizes consequence occurred.', evidence: ['approved use case', 'system identity', 'action context'], next: 'Confirm the AI action is allowed for this scenario.', links: ['core', 'data', 'identity', 'policy'], domain: ['Approved use', 'Agent identity', 'Action boundary', 'Runtime constraint'] },
  { id: 'vendor', layer: 'ops', title: 'Vendors', sub: 'Third-party trust and access', x: 77, y: 39, icon: 'building', detail: 'Vendors, platforms, service providers, payment destinations, and external dependencies.', why: 'Most executive risk hides in the space between internal control and external dependency.', evidence: ['vendor approval', 'contract owner', 'payment validation'], next: 'Validate vendor approval and payment destination.', links: ['core', 'data', 'exposure'], domain: ['Approved vendor', 'Contract owner', 'Payment destination', 'Access scope'] },
  { id: 'data', layer: 'ops', title: 'Data', sub: 'Lineage and permitted use', x: 70, y: 70, icon: 'data', detail: 'Data lineage, permitted use, source system, and transformation history.', why: 'CyberShield cannot defend an AI or vendor action if data source, permitted use, owner, or lineage is unclear.', evidence: ['source system', 'permitted use', 'data owner', 'transformation history'], next: 'Attach data lineage artifact before approval.', links: ['ai', 'vendor', 'evidence', 'policy'], domain: ['Source system', 'Permitted use', 'Data owner', 'Transformation history'] },
  { id: 'identity', layer: 'ops', title: 'Identity', sub: 'Human and system authority', x: 30, y: 70, icon: 'identity', detail: 'Human owner, system identity, role authority, and impersonation risk.', why: 'If identity is weak, the decision record cannot prove who or what was trusted.', evidence: ['human owner', 'system identity', 'role authority'], next: 'Bind the action to a named accountable human.', links: ['ai', 'record', 'proof'], domain: ['Human owner', 'System identity', 'Role authority', 'Impersonation risk'] },
  { id: 'policy', layer: 'gov', title: 'Policy Lineage', sub: 'Governing book and control', x: 25, y: 36, icon: 'book', detail: 'Policy, standard, contract, framework, or executive rule that governs the action.', why: 'Policy lineage tells leadership why the decision is defensible, not merely intuitive.', evidence: ['policy citation', 'control mapping', 'exception path'], next: 'Attach policy lineage to the decision record.', links: ['data', 'record', 'core'], domain: ['Policy citation', 'Control mapping', 'Exception path', 'Framework overlay'] },
  { id: 'evidence', layer: 'gov', title: 'Evidence', sub: 'Proof inputs and gaps', x: 50, y: 82, icon: 'document', detail: 'Artifacts, attestations, records, and source confidence used to defend the decision.', why: 'Evidence turns CyberShield from an opinion surface into a proof-generating system.', evidence: ['artifact list', 'confidence rating', 'gap status'], next: 'Add missing evidence or mark gap as accepted risk.', links: ['data', 'record', 'proof'], domain: ['Artifact list', 'Confidence rating', 'Gap status', 'Owner review'] },
  { id: 'record', layer: 'gov', title: 'Decision Record', sub: 'Replayable rationale', x: 50, y: 14, icon: 'ledger', detail: 'The structured record of decision state, model context, evidence gaps, and owner action.', why: 'A replayable decision record lets leaders defend why action was allowed, constrained, escalated, or blocked.', evidence: ['model id', 'model version', 'decision state'], next: 'Generate Proof Pack after owner review.', links: ['core', 'policy', 'proof'], domain: ['Decision state', 'Model context', 'Owner action', 'Replay path'] },
  { id: 'proof', layer: 'gov', title: 'Proof Pack', sub: 'Shareable executive record', x: 22, y: 55, icon: 'packet', detail: 'Role-tailored output for executive, audit, board, legal, or client conversations.', why: 'Proof Pack is how CyberShield becomes usable outside the screen.', evidence: ['boundary language', 'model context', 'evidence assumptions'], next: 'Copy or download the Proof Pack for review.', links: ['record', 'exposure', 'core'], domain: ['Executive summary', 'Evidence assumptions', 'Boundary language', 'Distribution audience'] },
  { id: 'exposure', layer: 'exposure', title: 'Exposure', sub: 'Consequence before impact', x: 82, y: 56, icon: 'warning', detail: 'Financial, regulatory, operational, and trust consequences that could occur if the action is wrong.', why: 'Executives buy CyberShield because it shows what can go wrong before it goes wrong.', evidence: ['impact estimate', 'scenario severity', 'business owner'], next: 'Prioritize remediation based on selected business consequence.', links: ['vendor', 'proof', 'data'], domain: ['Financial exposure', 'Regulatory exposure', 'Operational disruption', 'Trust loss'] }
];

const edges = [['core','ai'],['core','vendor'],['core','record'],['ai','data'],['ai','identity'],['vendor','data'],['vendor','exposure'],['data','policy'],['data','evidence'],['identity','record'],['policy','record'],['evidence','record'],['record','proof'],['proof','exposure']];

function svgIcon(type) {
  const common = 'width="78" height="62" viewBox="0 0 78 62" aria-hidden="true" focusable="false"';
  const stroke = 'stroke="#f5fbff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
  const fillBlue = 'fill="#42d7ff" opacity="0.9"';
  const glow = 'filter="drop-shadow(0 0 6px rgba(66,215,255,.75))"';
  const icons = {
    data: `<svg ${common} ${glow}><ellipse cx="39" cy="14" rx="26" ry="9" ${fillBlue}/><path d="M13 14v28c0 5 12 9 26 9s26-4 26-9V14" fill="rgba(66,215,255,.16)" ${stroke}/><path d="M13 28c0 5 12 9 26 9s26-4 26-9" ${stroke} fill="none"/><path d="M13 41c0 5 12 9 26 9s26-4 26-9" ${stroke} fill="none"/></svg>`,
    book: `<svg ${common} ${glow}><path d="M12 13c13-6 24-2 27 3v35c-8-7-18-8-27-3z" fill="#42d7ff" ${stroke}/><path d="M39 16c6-7 18-9 27-3v35c-9-5-19-4-27 3z" fill="#76e4a1" ${stroke}/><path d="M39 16v35" ${stroke}/><path d="M18 24h13M18 32h13M47 24h13M47 32h13" ${stroke}/></svg>`,
    brain: `<svg ${common} ${glow}><path d="M27 47c-9 0-16-7-16-16 0-8 6-15 14-16 4-7 16-7 20 0 11 0 21 8 21 19s-9 18-20 18H30" fill="rgba(66,215,255,.22)" ${stroke}/><circle cx="26" cy="31" r="4" fill="#76e4a1"/><circle cx="39" cy="24" r="4" fill="#42d7ff"/><circle cx="51" cy="35" r="4" fill="#ffd166"/><path d="M30 31l9-7 12 11M39 24v18" ${stroke}/></svg>`,
    building: `<svg ${common} ${glow}><path d="M15 52V22l24-12 24 12v30" fill="rgba(66,215,255,.2)" ${stroke}/><path d="M25 52V32h28v20M27 25h5M37 25h5M47 25h5M27 35h5M47 35h5" ${stroke}/><path d="M12 52h54" ${stroke}/></svg>`,
    identity: `<svg ${common} ${glow}><circle cx="31" cy="23" r="11" fill="#42d7ff" ${stroke}/><path d="M13 52c3-12 12-18 18-18s15 6 18 18" fill="rgba(118,228,161,.25)" ${stroke}/><path d="M50 34h16M61 34v8M56 34v5" ${stroke}/></svg>`,
    document: `<svg ${common} ${glow}><path d="M22 8h24l12 12v34H22z" fill="rgba(66,215,255,.24)" ${stroke}/><path d="M46 8v13h12M29 29h18M29 37h13" ${stroke}/><path d="M31 49l6 5 13-16" stroke="#76e4a1" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
    ledger: `<svg ${common} ${glow}><rect x="16" y="12" width="46" height="40" rx="7" fill="rgba(66,215,255,.22)" ${stroke}/><path d="M26 23h26M26 32h26M26 41h17" ${stroke}/><circle cx="55" cy="43" r="8" fill="#76e4a1" ${stroke}/></svg>`,
    packet: `<svg ${common} ${glow}><path d="M14 20l25-12 25 12v28L39 59 14 48z" fill="rgba(66,215,255,.22)" ${stroke}/><path d="M14 20l25 12 25-12M39 32v27" ${stroke}/><path d="M29 42h20" ${stroke}/></svg>`,
    warning: `<svg ${common} ${glow}><path d="M39 7l31 51H8z" fill="rgba(255,209,102,.72)" ${stroke}/><path d="M39 24v16" stroke="#061726" stroke-width="5" stroke-linecap="round"/><circle cx="39" cy="48" r="3" fill="#061726"/></svg>`,
    shield: `<svg ${common} ${glow}><path d="M39 5l25 9v18c0 14-9 24-25 28-16-4-25-14-25-28V14z" fill="rgba(66,215,255,.24)" ${stroke}/><path d="M39 11v43M25 29l10 10 19-22" stroke="#76e4a1" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`
  };
  return icons[type] || icons.document;
}

function card(t, m, b, c = '') { return `<article class="summary-card"><span class="label">${escapeHtml(t)}</span><div class="metric ${c}">${escapeHtml(m)}</div><p>${escapeHtml(b)}</p></article>`; }
function currentDashboardLens() { if (state.role.includes('CEO')) return ['CEO Decision View', 'Business consequence, reputation, and next executive decision']; if (state.role.includes('CFO')) return ['CFO Exposure View', 'Estimated exposure, vendor risk, audit defensibility, and cost of inaction']; if (state.role.includes('CIO') || state.role.includes('CTO')) return ['CIO / CTO Runtime View', 'System dependency, runtime control, and operational continuity']; if (state.role.includes('Board')) return ['Board Oversight View', 'Governance posture, unresolved risk, and proof of control']; return ['CISO / vCISO Control View', 'Control gaps, evidence quality, policy lineage, and operational admissibility']; }
function roleLens() { const [lens, text] = currentDashboardLens(); return `${state.leader}, CyberShield routed ${state.org} to the ${lens}. ${text}. Scenario: ${state.scenario}. Priority: ${state.priority}.`; }

function renderOnboarding() {
  const step = steps[onboardingStep];
  const dots = steps.map((_, i) => `<div class="step-dot ${i <= onboardingStep ? 'active' : ''}"></div>`).join('');
  let body = '';
  if (step.key === 'identity') body = `<div class="form-grid"><label>First name<input id="obLeader" value="${escapeHtml(state.leader)}"></label><label>Organization<input id="obOrg" value="${escapeHtml(state.org)}"></label></div>${optionCards('role', options.role)}`;
  else if (step.key === 'industry') body = optionCards('industry', options.industry);
  else if (step.key === 'scenario') body = optionCards('scenario', options.scenario);
  else if (step.key === 'evidence') body = `<div class="form-grid"><label>Business value at risk<select id="obValue">${options.value.map(o => `<option ${o === state.value ? 'selected' : ''}>${escapeHtml(o)}</option>`).join('')}</select></label><label>Vendor approved<select id="obVendor">${options.vendor.map(o => `<option ${o === state.vendor ? 'selected' : ''}>${escapeHtml(o)}</option>`).join('')}</select></label></div>${optionCards('evidence', options.evidence)}`;
  else if (step.key === 'priority') body = optionCards('priority', options.priority);
  else body = optionCards('audience', options.audience);
  $('#onboardingPanel').innerHTML = `<span class="chip">Guided setup ${onboardingStep + 1} of ${steps.length}</span><h1>${escapeHtml(step.title)}</h1><p class="lede">${escapeHtml(step.text)}</p><div class="step-track">${dots}</div>${body}<div class="actions"><button id="backStep" type="button">Back</button><button class="primary" id="nextStep" type="button">${onboardingStep === steps.length - 1 ? 'Generate routed dashboard' : 'Next'}</button><button id="skipDemo" type="button">Skip for Demo</button></div>`;
  $('#backStep').disabled = onboardingStep === 0;
  $('#backStep').onclick = () => { onboardingStep = Math.max(0, onboardingStep - 1); renderOnboarding(); };
  $('#nextStep').onclick = () => { captureStep(); if (onboardingStep === steps.length - 1) show(); else { onboardingStep += 1; renderOnboarding(); } };
  $('#skipDemo').onclick = () => { state = { ...DEFAULT }; show(); };
  $$('.option-card').forEach(btn => btn.onclick = () => { state[btn.dataset.key] = btn.dataset.value; renderOnboarding(); });
}
function optionCards(key, list) { return `<div class="option-grid">${list.map(value => `<button type="button" class="option-card ${state[key] === value ? 'active' : ''}" data-key="${escapeHtml(key)}" data-value="${escapeHtml(value)}"><strong>${escapeHtml(value)}</strong><span>${optionHint(key)}</span></button>`).join('')}</div>`; }
function optionHint(key) { return { role: 'Changes dashboard emphasis and language.', industry: 'Changes scenario credibility and evidence framing.', scenario: 'Changes the action being judged before consequence.', evidence: 'Changes score confidence and proof strength.', priority: 'Changes executive summary ordering.', audience: 'Changes Proof Pack audience framing.' }[key] || ''; }
function captureStep() { if ($('#obLeader')) state.leader = $('#obLeader').value.trim() || DEFAULT.leader; if ($('#obOrg')) state.org = $('#obOrg').value.trim() || DEFAULT.org; if ($('#obValue')) state.value = $('#obValue').value; if ($('#obVendor')) state.vendor = $('#obVendor').value; }

function render() {
  decision = calculateDecision(state, registry);
  const [lens] = currentDashboardLens();
  $('#dashboardLensChip').textContent = lens;
  $('#executiveHeadline').textContent = `${state.scenario}: what needs leadership attention before action?`;
  $('#roleLens').textContent = roleLens();
  $('#decisionLabel').textContent = decision.label;
  $('#decisionReason').textContent = decision.reason;
  $('#executiveSummary').innerHTML = routedCards().join('');
  $('#whyItMatters').innerHTML = whyRows().map(renderFeedItem).join('');
  $('#nextActions').innerHTML = nextRows().map(renderFeedItem).join('');
  $('#tracePanel').innerHTML = `<pre>${escapeHtml(JSON.stringify(decision.record, null, 2))}</pre>`;
  renderTrustMap(); renderRuntime(); renderEvidence(); renderProof(); renderArchitecture(); renderSettings();
}
function routedCards() { const base = [card('Risky action', state.scenario, `${state.industry} path with ${state.priority.toLowerCase()} as the leadership priority.`, 'warn'), card('Trust posture', `${decision.score}/100`, 'Directional score from evidence, vendor approval, and role lens.', decision.score >= 78 ? 'good' : decision.score >= 52 ? 'warn' : 'bad'), card('Exposure', exposure[state.value] || exposure['$5M to $25M'], 'Directional range. Not FAIR-calibrated.', 'warn'), card('Proof status', decision.proof_status, `Audience: ${state.audience}.`, decision.evidence_gaps.length ? 'warn' : 'good')]; if (state.role.includes('CFO')) return [base[2], base[1], base[3], base[0]]; if (state.role.includes('CIO') || state.role.includes('CTO')) return [base[0], card('Runtime control', decision.runtime_control, 'Action handling before consequence.', 'warn'), base[1], base[3]]; if (state.role.includes('CEO')) return [base[0], base[2], base[1], base[3]]; return base; }
function whyRows() { return [['Operational consequence', `${state.scenario} could create ${state.priority.toLowerCase()} if evidence is incomplete.`], ['Human accountability', `${state.audience} needs a defensible owner path before the action proceeds.`], ['Evidence posture', `Evidence confidence is ${decision.evidence_confidence.toLowerCase()}.`, decision.evidence_gaps.length ? `${decision.evidence_gaps.length} gap(s)` : 'No major gaps']]; }
function nextRows() { return [['Primary next action', decision.next_action, decision.label], ['Dashboard routing', `View routed to ${currentDashboardLens()[0]} based on ${state.role}.`], ['Proof Pack', `Generate a record for ${state.audience} with model context and boundary language.`]]; }

function renderTrustMap() {
  if (trustMode === 'overview') renderTrustOverview();
  if (trustMode === 'domain') renderTrustDomain();
  if (trustMode === 'detail') renderTrustDetail();
}
function layerButtons() {
  $('#layerFilters').innerHTML = Object.entries(layerMeta).map(([id, label]) => renderFeedItem([label, id === selectedLayer ? 'Selected layer' : 'Tap to filter the overview map', id === selectedLayer ? 'Active' : ''])).join('');
  [...$('#layerFilters').children].forEach((el, i) => { el.onclick = () => { selectedLayer = Object.keys(layerMeta)[i]; trustMode = 'overview'; renderTrustMap(); }; el.style.cursor = 'pointer'; });
}
function renderTrustOverview() {
  layerButtons();
  $('#riskDrivers').innerHTML = [['Mode', 'Overview map. Click a visual object to enter that domain layer.', 'Overview'], ['Scenario', state.scenario, state.priority], ['Evidence', decision.evidence_confidence, decision.evidence_confidence === 'High' ? 'Strong' : 'Incomplete']].map(renderFeedItem).join('');
  const visibleNodes = nodes.filter(n => selectedLayer === 'all' || n.layer === selectedLayer || n.id === selectedNode || n.links.includes(selectedNode));
  const coord = Object.fromEntries(nodes.map(n => [n.id, n]));
  const activeLinks = new Set([selectedNode, ...((coord[selectedNode] || {}).links || [])]);
  const svg = `<svg class="edge-layer" viewBox="0 0 100 100" preserveAspectRatio="none">${edges.map(([a,b]) => { const A=coord[a], B=coord[b]; const active=activeLinks.has(a)&&activeLinks.has(b); return `<line class="edge ${active?'active':''}" x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}"/>`; }).join('')}</svg>`;
  const rings = '<div class="layer-ring r4"></div><div class="layer-ring r3"></div><div class="layer-ring r2"></div><div class="layer-ring r1"></div><span class="layer-label" style="left:44%;top:47%">Executive Core</span><span class="layer-label" style="left:56%;top:23%">Operational Systems</span><span class="layer-label" style="left:16%;top:18%">Evidence and Governance</span><span class="layer-label" style="left:69%;top:87%">Consequence</span>';
  const nodeHtml = visibleNodes.map(n => `<button class="node ${n.id===selectedNode?'active':''} ${activeLinks.has(n.id)?'related':''}" type="button" data-node="${n.id}" style="left:${n.x}%;top:${n.y}%"><span class="node-art">${svgIcon(n.icon)}</span><strong>${escapeHtml(n.title)}</strong><small>${escapeHtml(n.sub)}</small></button>`).join('');
  $('#trustCanvas').innerHTML = rings + svg + nodeHtml;
  $$('.node').forEach(b => b.onclick = () => { selectedNode = b.dataset.node; trustMode = 'domain'; renderTrustMap(); });
  renderSelectedNode('overview');
}
function renderTrustDomain() {
  const n = nodes.find(item => item.id === selectedNode) || nodes[0];
  layerButtons();
  $('#riskDrivers').innerHTML = [['Mode', `Domain layer: ${n.title}`, 'Layer 2'], ['Back path', 'Use Back to TrustMap to return to overview.'], ['Next click', 'Choose a domain object below for evidence/action detail.']].map(renderFeedItem).join('');
  const related = [n, ...n.links.map(id => nodes.find(item => item.id === id)).filter(Boolean)];
  const positions = [[50,24],[24,46],[76,46],[35,75],[65,75]];
  const domainEdges = positions.slice(1).map((p, i) => `<line class="edge active" x1="50" y1="24" x2="${p[0]}" y2="${p[1]}"/>`).join('');
  const domainNodes = related.slice(0,5).map((item, i) => `<button class="node ${item.id===selectedNode?'active':'related'}" type="button" data-node="${item.id}" data-detail-topic="${escapeHtml(item.domain[i % item.domain.length])}" style="left:${positions[i][0]}%;top:${positions[i][1]}%"><span class="node-art">${svgIcon(item.icon)}</span><strong>${escapeHtml(i===0?item.title:item.domain[i % item.domain.length])}</strong><small>${escapeHtml(item.sub)}</small></button>`).join('');
  $('#trustCanvas').innerHTML = `<span class="layer-label" style="left:34%;top:8%">TrustMap > ${escapeHtml(n.title)} Layer</span><svg class="edge-layer" viewBox="0 0 100 100" preserveAspectRatio="none">${domainEdges}</svg>${domainNodes}`;
  $$('.node').forEach(b => b.onclick = () => { selectedNode = b.dataset.node; detailTopic = b.dataset.detailTopic || null; trustMode = 'detail'; renderTrustMap(); });
  renderSelectedNode('domain');
}
function renderTrustDetail() {
  const n = nodes.find(item => item.id === selectedNode) || nodes[0];
  layerButtons();
  $('#riskDrivers').innerHTML = [['Mode', `Detail/action layer: ${detailTopic || n.title}`, 'Layer 3'], ['Action path', 'This is where evidence, owner, model, and Proof Pack routes live.'], ['Return path', 'Back to domain or overview without adding top-level tabs.']].map(renderFeedItem).join('');
  $('#trustCanvas').innerHTML = `<span class="layer-label" style="left:32%;top:8%">TrustMap > ${escapeHtml(n.title)} > ${escapeHtml(detailTopic || 'Action Detail')}</span><div class="node active" style="left:50%;top:36%;width:230px;min-height:190px"><span class="node-art">${svgIcon(n.icon)}</span><strong>${escapeHtml(detailTopic || n.title)}</strong><small>${escapeHtml(n.detail)}</small></div><div class="node related" style="left:30%;top:72%;width:190px"><span class="node-art">${svgIcon('document')}</span><strong>Evidence</strong><small>${escapeHtml(n.evidence[0])}</small></div><div class="node related" style="left:70%;top:72%;width:190px"><span class="node-art">${svgIcon('packet')}</span><strong>Proof Pack</strong><small>Route to report</small></div><svg class="edge-layer" viewBox="0 0 100 100" preserveAspectRatio="none"><line class="edge active" x1="50" y1="44" x2="30" y2="72"/><line class="edge active" x1="50" y1="44" x2="70" y2="72"/></svg>`;
  renderSelectedNode('detail');
}
function renderSelectedNode(mode = 'overview') {
  const n = nodes.find(item => item.id === selectedNode) || nodes[0];
  const crumb = mode === 'overview' ? 'TrustMap Overview' : mode === 'domain' ? `TrustMap > ${n.title} Layer` : `TrustMap > ${n.title} > ${detailTopic || 'Action Detail'}`;
  $('#selectedDetail').innerHTML = `<span class="chip">${escapeHtml(crumb)}</span><h3>${escapeHtml(n.title)}</h3><p><strong>What this is:</strong> ${escapeHtml(n.detail)}</p><p><strong>Why it matters:</strong> ${escapeHtml(n.why)}</p><p><strong>Evidence needed:</strong></p><ul>${n.evidence.map(e => `<li>${escapeHtml(e)}</li>`).join('')}</ul><p><strong>Connected nodes:</strong> ${n.links.map(id => nodes.find(x => x.id === id)?.title || id).join(', ')}</p><p><strong>Next action:</strong> ${escapeHtml(n.next)}</p><div class="actions"><button id="trustBack" type="button">Back to TrustMap</button><button id="trustDomain" class="primary" type="button">Open ${escapeHtml(n.title)} Layer</button><button id="trustDetail" type="button">Open Action Detail</button></div>`;
  $('#trustBack').onclick = () => { trustMode = 'overview'; detailTopic = null; renderTrustMap(); };
  $('#trustDomain').onclick = () => { trustMode = 'domain'; detailTopic = null; renderTrustMap(); };
  $('#trustDetail').onclick = () => { trustMode = 'detail'; detailTopic = n.domain[0]; renderTrustMap(); };
}
function renderRuntime() { $('#scenarioQueue').innerHTML = [[state.scenario, `${state.industry} scenario routed from onboarding.`, decision.label], ['Payment destination verification', 'A payment or marketplace destination must be verified before reliance.', 'Verify source'], ['Brand or identity claim', 'A person, product, website, or artifact may not be authentic.', 'Check authorization']].map(renderFeedItem).join(''); $('#decisionLadder').innerHTML = ['Approved', 'Conditional Approval', 'Blocked'].map(s => `<div class="ladder-step ${s === decision.label ? 'active' : ''}"><strong>${s}</strong><p>${s === decision.label ? 'Current modeled state' : 'Available decision state'}</p></div>`).join(''); $('#decisionFeed').innerHTML = [['Modeled decision', `${decision.label}: ${decision.reason}`], ['Human action', decision.next_action], ['Boundary', 'Static advisory prototype. No live enforcement, live blocking, or live enterprise integration is performed.']].map(renderFeedItem).join(''); }
function renderEvidence() { const req = ['Policy lineage', 'Data lineage', 'System identity', 'Control mapping', 'Human owner']; $('#requiredEvidence').innerHTML = req.map(x => renderFeedItem([x, `Required for ${state.industry} and ${state.scenario}.`, decision.evidence_gaps.join(' ').toLowerCase().includes(x.split(' ')[0].toLowerCase()) ? 'Gap' : 'Required'])).join(''); $('#evidenceRegister').innerHTML = artifacts.length ? artifacts.map(a => renderFeedItem([a.name, `Manual artifact confidence: ${a.confidence}`])).join('') : renderFeedItem(['No manual artifacts yet', 'Add a manual evidence item to strengthen the Proof Pack.']); }
function proof() { return `CyberShield Executive Proof Pack\n\nOrganization: ${state.org}\nLeader: ${state.leader}\nRole lens: ${state.role}\nIndustry: ${state.industry}\nScenario: ${state.scenario}\nPriority: ${state.priority}\nAudience: ${state.audience}\n\nDecision: ${decision.label}\nReason: ${decision.reason}\nNext action: ${decision.next_action}\n\nTrust posture: ${decision.score}/100\nEvidence confidence: ${decision.evidence_confidence}\nEstimated exposure: ${exposure[state.value] || exposure['$5M to $25M']}\nProof status: ${decision.proof_status}\n\nEvidence gaps:\n${decision.evidence_gaps.length ? decision.evidence_gaps.map(g => '- ' + g).join('\n') : '- No major modeled evidence gaps'}\n\nModel context:\n- Model: ${decision.record.model_id}\n- Version: ${decision.record.model_version}\n- Release: V52.3\n- Status: demo-directional\n\nBoundary:\nCyberShield is a static advisory prototype. It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, marketplace systems, ad platforms, ticketing, notifications, identity verification, takedown systems, or production agent enforcement systems.`; }
function renderProof() { $('#proofOutput').textContent = proof(); }
function renderArchitecture() { $('#architectureCards').innerHTML = ['Overview Map', 'Domain Layer', 'Detail / Action Layer', 'Proof Route'].map(x => card(x, x.split(' ')[0].toUpperCase(), 'TrustMap now supports humanistic visual objects and internal drilldown without top-level tab sprawl.')).join(''); }
function renderSettings() { $('#setOrg').value = state.org; $('#setLeader').value = state.leader; $('#setRole').value = state.role; $('#setEvidence').value = state.evidence; $('#adminPayload').textContent = JSON.stringify({ build: 'V52.3 TrustMap Humanistic Visual Object Recovery', state, decision, trustMode, selectedNode, boundary: 'Static advisory prototype. No live enforcement or live enterprise integrations.' }, null, 2); }
function show() { $('#onboarding').hidden = true; $('#app').hidden = false; render(); }

async function init() {
  registry = await loadRegistryBundle(); renderOnboarding();
  $('#menuButton').onclick = () => $('#mainNav').classList.toggle('open');
  $$('[data-view]').forEach(b => b.onclick = () => activateView(b.dataset.view));
  $('#toggleTrace').onclick = () => $('#tracePanel').hidden = !$('#tracePanel').hidden;
  $('#addArtifact').onclick = () => { artifacts.push({ name: $('#artifactName').value.trim() || 'Manual evidence artifact', confidence: $('#artifactConfidence').value }); $('#artifactName').value = ''; renderEvidence(); renderProof(); };
  $('#clearEvidence').onclick = () => { artifacts = []; renderEvidence(); renderProof(); };
  $('#copyProof').onclick = () => navigator.clipboard.writeText(proof());
  $('#downloadProof').onclick = () => { const blob = new Blob([proof()], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'cybershield-proof-pack-v52-3.txt'; a.click(); URL.revokeObjectURL(url); };
  $('#applySettings').onclick = () => { state = { ...state, org: $('#setOrg').value.trim() || state.org, leader: $('#setLeader').value.trim() || state.leader, role: $('#setRole').value, evidence: $('#setEvidence').value }; render(); };
  $('#restartAssessment').onclick = () => { $('#app').hidden = true; $('#onboarding').hidden = false; onboardingStep = 0; renderOnboarding(); };
  if (new URLSearchParams(location.search).get('reset') !== 'onboarding') show();
}
init().catch(e => { document.body.innerHTML = `<main><section class="panel"><h1>CyberShield registry validation failed.</h1><p>The app cannot produce an audit-defensible decision because a required model or registry is missing or invalid.</p><pre>${escapeHtml(e.message)}</pre></section></main>`; });
