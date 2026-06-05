import { analyzeRecommendation, exportJson } from './atdr-engine.js';
import { DEMO_MODES } from './atdr-demo-data.js';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));

const STAGES = ['Intake', 'Claims', 'Evidence', 'Gaps', 'Risk', 'Confidence', 'Review', 'Decision Record', 'Export'];

const state = {
  stage: 'Intake',
  demoMode: DEMO_MODES[0].id,
  recommendation: '',
  domain: 'vendor-risk',
  aiSource: 'User-pasted AI recommendation',
  sourceModel: 'Unknown',
  intendedUse: 'Vendor approval recommendation review before enterprise action',
  context: '',
  decisionOwner: 'Pending assignment',
  createdBy: 'Demo user',
  activeEvidence: [],
  uploadedEvidence: [],
  evidenceNotes: [],
  useSyntheticEvidence: true,
  humanDecisions: [],
  recordSequenceNumber: 1,
  exportCount: 0,
  audit: [],
  record: null
};

function now() { return new Date().toISOString(); }
function audit(event_type, event_description, before_state = '', after_state = '', reason = '') {
  state.audit.push({
    user: state.createdBy || 'Demo user',
    timestamp: now(),
    record_id: state.record?.record_id || 'pending-record',
    event_type,
    event_description,
    before_state,
    after_state,
    reason
  });
}

function evidenceText() {
  const synthetic = state.useSyntheticEvidence ? state.activeEvidence.map(e => `[${e.evidence_name}] ${e.text_extract}`).join('\n') : '';
  const uploads = state.uploadedEvidence.map(e => `[Uploaded evidence: ${e.name}] ${e.text}`).join('\n');
  const notes = state.evidenceNotes.map(e => `[Evidence note. Source file not uploaded: ${e.title}] ${e.summary} Sufficiency caveat: ${e.caveat}`).join('\n');
  return [synthetic, uploads, notes].filter(Boolean).join('\n');
}

function selectedDemo() { return DEMO_MODES.find(mode => mode.id === state.demoMode) || DEMO_MODES[0]; }

function loadDemo() {
  const demo = selectedDemo().demo;
  state.recommendation = demo.original_ai_recommendation;
  state.domain = demo.domain;
  state.aiSource = demo.ai_source;
  state.sourceModel = demo.source_model_if_known;
  state.intendedUse = demo.intended_use;
  state.context = demo.decision_context;
  state.decisionOwner = demo.decision_owner;
  state.activeEvidence = demo.evidence_repository.map(e => ({ ...e }));
  state.useSyntheticEvidence = true;
  state.uploadedEvidence = [];
  state.evidenceNotes = [];
  state.humanDecisions = [];
  audit('Demo loaded', `${demo.title} loaded with synthetic evidence repository.`, '', demo.scenario_id);
  analyze();
}

function analyze() {
  state.record = analyzeRecommendation({
    recommendation: state.recommendation,
    domain: state.domain,
    evidence: evidenceText(),
    aiSource: state.aiSource,
    sourceModel: state.sourceModel,
    intendedUse: state.intendedUse,
    context: state.context,
    decisionOwner: state.decisionOwner,
    createdBy: state.createdBy
  });
  state.record.synthetic_demo_data_flag = state.useSyntheticEvidence;
  state.record.record_sequence_number = state.recordSequenceNumber;
  state.record.billable_record_flag = false;
  state.record.consulting_deliverable_flag = true;
  state.record.report_inclusion_flag = true;
  state.record.record_value_category = selectedDemo().demo.record_value_category || 'Investor Demo';
  state.record.export_count = state.exportCount;
  state.record.cyberShield_recommended_action = state.record.recommended_action;
  state.record.human_decisions = state.humanDecisions;
  state.record.human_selected_action = state.humanDecisions.at(-1)?.human_selected_action || '';
  state.record.audit_events = [...(state.record.audit_events || []), ...state.audit];
  audit('Analysis refreshed', `${state.record.recommended_action}; ${state.record.confidence_band}; ${state.record.risk_if_wrong.band} Risk If Wrong.`, '', state.record.record_id);
  render();
}

function nav() {
  $('#stageRail').innerHTML = STAGES.map(stage => `<button type="button" class="${state.stage === stage ? 'active' : ''}" data-stage="${escapeHtml(stage)}"><span class="chip">${escapeHtml(stage)}</span></button>`).join('');
  $$('[data-stage]').forEach(button => button.onclick = () => { state.stage = button.dataset.stage; render(); });
}

function contradictionHighlights(record = state.record) {
  if (!record) return [];
  const claimConflicts = record.extracted_claims
    .filter(c => c.conflict_status === 'Material conflict')
    .map(c => ({
      source: c.normalized_claim,
      finding: c.evidence_links?.find(link => link.caveat)?.caveat || c.conflict_status,
      claim_id: c.claim_id
    }));
  const known = [];
  const names = state.activeEvidence.map(e => `${e.evidence_name} ${e.text_extract} ${e.caveat || ''}`).join(' ').toLowerCase();
  if (names.includes('not expressly listed') || names.includes('not clearly included')) known.push({ claim_id: 'SOC2-SCOPE', source: 'SOC 2 scope', finding: 'SOC 2 exists, but the evaluated AI service is not clearly in scope.' });
  if (names.includes('service improvement') || names.includes('derived service data')) known.push({ claim_id: 'DPA-DATA-USE', source: 'DPA data use', finding: 'The DPA allows customer data or derived data to be used for service improvement.' });
  if (names.includes('available upon request') || names.includes('additional analytics')) known.push({ claim_id: 'SUBPROCESSORS', source: 'Subprocessor list', finding: 'AI analytics subprocessors are not fully identified.' });
  if (names.includes('without undue delay')) known.push({ claim_id: 'INCIDENT-NOTICE', source: 'Incident notification', finding: 'Incident notification language lacks a specific fixed timeline.' });
  if (names.includes('business owner requests approval')) known.push({ claim_id: 'BUSINESS-PRESSURE', source: 'Business owner note', finding: 'Business urgency is context, not evidence of vendor-risk defensibility.' });
  return [...known, ...claimConflicts].slice(0, 8);
}

function decisionBrief() {
  const record = state.record;
  if (!record) return '<span class="chip">Decision Brief</span><h2>No record analyzed yet</h2><p>Load a demo or paste a recommendation to generate a decision brief.</p>';
  const contradictions = contradictionHighlights(record);
  const primaryIssue = contradictions[0]?.finding || record.missing_support?.[0]?.finding || record.ai_output_hazards?.[0]?.hazard || record.confidence_rationale;
  const topConflict = contradictions[0]?.finding || record.extracted_claims.find(c => c.conflict_status !== 'No conflict')?.conflict_status || 'No confirmed contradiction in static rules';
  const readiness = record.can_act ? 'Conditionally Actionable' : record.record_defensibility_band === 'Not defensible' ? 'Not Defensible' : 'Not Defensible Yet';
  const contradictionList = contradictions.length ? `<ul>${contradictions.slice(0, 5).map(c => `<li>${escapeHtml(c.finding)}</li>`).join('')}</ul>` : '<p>No material contradiction highlighted by static rules.</p>';
  return `
    <span class="chip">Persistent Decision Brief</span>
    <h2>${escapeHtml(readiness)}</h2>
    <div class="brief-card"><span class="label">Can I act on this?</span><div class="metric ${record.can_act ? 'good' : 'bad'}">${record.can_act ? 'Yes, with caveats' : 'No'}</div><p>${escapeHtml(record.required_next_step)}</p></div>
    <div class="brief-card"><span class="label">Recommended Action</span><div class="metric warn">${escapeHtml(record.recommended_action)}</div></div>
    <div class="brief-card"><span class="label">Risk If Wrong</span><div class="metric bad">${escapeHtml(record.risk_if_wrong.band)}</div><p>${escapeHtml(record.risk_if_wrong.consequence_summary)}</p></div>
    <div class="brief-card"><span class="label">Confidence Band</span><div class="metric ${record.confidence_band.includes('Low') || record.confidence_band === 'Contradicted' ? 'bad' : 'warn'}">${escapeHtml(record.confidence_band)}</div><p>${escapeHtml(record.confidence_rationale)}</p></div>
    <div class="brief-card"><span class="label">Primary Issue</span><p>${escapeHtml(primaryIssue)}</p></div>
    <div class="brief-card"><span class="label">Top Contradiction</span><p>${escapeHtml(topConflict)}</p></div>
    <div class="brief-card"><span class="label">Contradiction Highlights</span>${contradictionList}</div>
    <div class="brief-card"><span class="label">Review Required</span><p>${record.human_review.required ? 'Yes' : 'Not required by static rules'}: ${escapeHtml(record.human_review.required_reviewer_role)}</p></div>
    <div class="brief-card"><span class="label">Export Status</span><p>${escapeHtml(record.record_defensibility_band)}. Executive brief includes limitations.</p></div>`;
}

function stageHeader(title, text) {
  return `<section class="panel"><span class="chip">${escapeHtml(title)}</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(text)}</p></section>`;
}

function renderIntake() {
  return `${stageHeader('Intake', 'Select the demo path, review the AI-generated recommendation, and define the decision context before analysis.')}
  <section class="panel">
    <div class="notice"><strong>Demo environment notice:</strong> This prototype demonstrates decision-assurance workflow. Do not upload real regulated, confidential, or production-sensitive evidence unless the environment has been approved for that data. Malware scanning: planned production control.</div>
    <div class="grid2" style="margin-top:14px">
      <label>Demo scenario<select id="demoMode">${DEMO_MODES.map(mode => `<option value="${escapeHtml(mode.id)}" ${state.demoMode === mode.id ? 'selected' : ''}>${escapeHtml(mode.label)}</option>`).join('')}</select></label>
      <label>Domain<select id="domain"><option value="vendor-risk" ${state.domain === 'vendor-risk' ? 'selected' : ''}>Vendor Risk</option><option value="security" ${state.domain === 'security' ? 'selected' : ''}>Security</option><option value="compliance" ${state.domain === 'compliance' ? 'selected' : ''}>Compliance</option><option value="mixed" ${state.domain === 'mixed' ? 'selected' : ''}>Mixed</option></select></label>
    </div>
    <div class="grid2">
      <label>AI source<input id="aiSource" value="${escapeHtml(state.aiSource)}"></label>
      <label>Source model, if known<input id="sourceModel" value="${escapeHtml(state.sourceModel)}"></label>
    </div>
    <label>Original AI recommendation<textarea id="recommendation">${escapeHtml(state.recommendation)}</textarea></label>
    <label>Decision context<textarea id="context">${escapeHtml(state.context)}</textarea></label>
    <div class="grid2"><label>Intended use<input id="intendedUse" value="${escapeHtml(state.intendedUse)}"></label><label>Decision owner<input id="decisionOwner" value="${escapeHtml(state.decisionOwner)}"></label></div>
    <div class="actions"><button id="loadDemo" class="primary" type="button">Load Vendor-Risk Demo</button><button id="analyze" class="primary" type="button">Analyze Recommendation</button></div>
  </section>`;
}

function renderClaims() {
  const rows = state.record.extracted_claims.map(c => `<tr><td>${escapeHtml(c.claim_id)}</td><td>${escapeHtml(c.original_sentence)}</td><td>${escapeHtml(c.normalized_claim)}</td><td>${escapeHtml(c.claim_type)}</td><td><span class="tag ${c.materiality === 'High' ? 'bad' : 'warn'}">${escapeHtml(c.materiality)}</span></td><td>${c.required_evidence_type.map(e => `<span class="tag">${escapeHtml(e)}</span>`).join('')}</td><td>${c.unsupported_flag ? '<span class="tag bad">Unsupported</span>' : '<span class="tag warn">Partially mapped</span>'}</td></tr>`).join('');
  return `${stageHeader('Claims', 'CyberShield atomizes the AI recommendation into claims that can be reviewed against evidence.')}
  <section class="panel"><div class="table-wrap"><table><thead><tr><th>Claim ID</th><th>Original Sentence</th><th>Normalized Claim</th><th>Type</th><th>Materiality</th><th>Required Evidence</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
}

function evidenceFlags(e) {
  const flags = [];
  if (e.contradiction_flag) flags.push('<span class="tag bad">Contradiction</span>');
  if (e.self_attestation_flag || e.independence_band === 'Self-attested' || e.independence_band === 'Vendor assertion') flags.push('<span class="tag bad">Self-attested</span>');
  if (e.scope_status) flags.push(`<span class="tag warn">${escapeHtml(e.scope_status)}</span>`);
  if (e.caveat) flags.push(`<p><strong>Caveat:</strong> ${escapeHtml(e.caveat)}</p>`);
  return flags.join('');
}

function renderEvidence() {
  const synthetic = state.activeEvidence.map(e => `<article class="evidence-card"><h3>${escapeHtml(e.evidence_name)}</h3><p>${escapeHtml(e.text_extract)}</p><span class="tag">${escapeHtml(e.evidence_type)}</span><span class="tag ${e.freshness_band === 'Stale' ? 'bad' : 'warn'}">${escapeHtml(e.freshness_band)}</span><span class="tag ${e.independence_band === 'Self-attested' || e.independence_band === 'Vendor assertion' ? 'bad' : ''}">${escapeHtml(e.independence_band)}</span>${evidenceFlags(e)}</article>`).join('');
  const uploads = state.uploadedEvidence.map(e => `<article class="evidence-card"><h3>${escapeHtml(e.name)}</h3><p>${escapeHtml(e.text.slice(0, 650))}${e.text.length > 650 ? '...' : ''}</p><span class="tag warn">Local in-browser upload</span></article>`).join('') || '<p>No local uploaded evidence yet.</p>';
  const notes = state.evidenceNotes.map(e => `<article class="evidence-card"><h3>${escapeHtml(e.title)}</h3><p>${escapeHtml(e.summary)}</p><span class="tag warn">Evidence note. Source file not uploaded.</span><p><strong>Caveat:</strong> ${escapeHtml(e.caveat)}</p></article>`).join('') || '<p>No evidence notes yet.</p>';
  return `${stageHeader('Evidence', 'Synthetic evidence, local-only uploads, and evidence notes feed the same decision record. Uploaded files are not stored or transmitted by this static prototype.')}
  <section class="panel"><h2>Synthetic Evidence Repository</h2><label><input id="useSynthetic" type="checkbox" ${state.useSyntheticEvidence ? 'checked' : ''} style="width:auto"> Use synthetic evidence for this record</label>${synthetic}</section>
  <section class="panel"><h2>Local In-Browser Evidence Upload</h2><div class="notice">Files are read in the browser for this session only. They are not stored by CyberShield in this static prototype.</div><label>Upload text, markdown, JSON, CSV, or readable file<input id="fileUpload" type="file" multiple></label><div class="actions"><button id="replaceEvidence" type="button">Replace Simulated Evidence</button><button id="addAlongside" type="button">Add Alongside Simulated Evidence</button></div>${uploads}</section>
  <section class="panel"><h2>Evidence Note</h2><div class="grid2"><label>Title<input id="noteTitle" placeholder="Confidential DPA reviewed but not uploaded"></label><label>Evidence type<input id="noteType" placeholder="Data processing agreement"></label></div><label>Summary<textarea id="noteSummary" placeholder="Evidence note. Source file not uploaded."></textarea></label><label>Sufficiency caveat<input id="noteCaveat" placeholder="Reviewer summary only. Source document retained outside demo."></label><div class="actions"><button id="addNote" class="primary" type="button">Add Evidence Note</button></div>${notes}</section>`;
}

function renderGaps() {
  const missing = state.record.missing_support.map(m => `<tr><td>${escapeHtml(m.claim_id)}</td><td>${escapeHtml(m.category)}</td><td><span class="tag ${m.severity === 'High' ? 'bad' : 'warn'}">${escapeHtml(m.severity)}</span></td><td>${escapeHtml(m.finding)}</td></tr>`).join('');
  const hazards = state.record.ai_output_hazards.map(h => `<tr><td>${escapeHtml(h.hazard_id)}</td><td>${escapeHtml(h.hazard)}</td><td><span class="tag ${h.band === 'Quarantine' ? 'bad' : 'warn'}">${escapeHtml(h.band)}</span></td></tr>`).join('') || '<tr><td colspan="3">No AI output hazards detected by static rules.</td></tr>';
  const contradictions = contradictionHighlights().map(c => `<tr><td>${escapeHtml(c.claim_id)}</td><td>${escapeHtml(c.source)}</td><td><span class="tag bad">Material</span></td><td>${escapeHtml(c.finding)}</td></tr>`).join('') || '<tr><td colspan="4">No material contradiction highlighted by static rules.</td></tr>';
  return `${stageHeader('Gaps', 'CyberShield surfaces missing support, unsupported leaps, stale evidence, self-attestation, and conflicts instead of hiding them.')}
  <section class="panel"><h2>Contradictory Evidence</h2><div class="table-wrap"><table><thead><tr><th>ID</th><th>Source</th><th>Severity</th><th>Finding</th></tr></thead><tbody>${contradictions}</tbody></table></div></section>
  <section class="panel"><h2>Missing Support</h2><div class="table-wrap"><table><thead><tr><th>Claim</th><th>Missing Evidence</th><th>Severity</th><th>Finding</th></tr></thead><tbody>${missing}</tbody></table></div></section>
  <section class="panel"><h2>AI Output Hazards</h2><div class="table-wrap"><table><thead><tr><th>ID</th><th>Hazard</th><th>Band</th></tr></thead><tbody>${hazards}</tbody></table></div></section>`;
}

function renderRisk() {
  return `${stageHeader('Risk If Wrong', 'Risk If Wrong focuses on consequence if the organization acts on the AI recommendation and the recommendation is wrong.')}
  <section class="panel"><div class="grid3"><article class="brief-card"><span class="label">Risk If Wrong</span><div class="metric bad">${escapeHtml(state.record.risk_if_wrong.band)}</div></article><article class="brief-card"><span class="label">Impact Areas</span><p>${state.record.risk_if_wrong.impact_areas.map(escapeHtml).join(', ')}</p></article><article class="brief-card"><span class="label">Action</span><p>${escapeHtml(state.record.recommended_action)}</p></article></div><div class="callout">${escapeHtml(state.record.risk_if_wrong.consequence_summary)}</div></section>`;
}

function renderConfidence() {
  return `${stageHeader('Confidence', 'Confidence is not trust. Confidence reflects how certain CyberShield can be based on available evidence, gaps, conflicts, and human verification.')}
  <section class="panel"><article class="brief-card"><span class="label">Confidence Band</span><div class="metric bad">${escapeHtml(state.record.confidence_band)}</div><p>${escapeHtml(state.record.confidence_rationale)}</p></article><h2>What would raise confidence?</h2><ul><li>Current SOC 2 report with confirmed scope covering the evaluated service</li><li>Independent encryption and key-management validation</li><li>Complete subprocessor list covering AI processing path</li><li>Contractual restriction on customer data use for service improvement or model evaluation</li><li>Named vendor-risk owner, Security SME, and Legal Counsel review</li></ul></section>`;
}

function renderReview() {
  const decisions = state.humanDecisions.map(d => `<article class="evidence-card"><h3>${escapeHtml(d.human_selected_action)}</h3><p><strong>Reviewer:</strong> ${escapeHtml(d.reviewer_name || 'Unnamed')} (${escapeHtml(d.reviewer_role)})</p><p><strong>Reason:</strong> ${escapeHtml(d.override_reason)}</p><p><strong>Residual risk:</strong> ${escapeHtml(d.residual_risk_acknowledgment)}</p><p><strong>Timestamp:</strong> ${escapeHtml(d.timestamp)}</p></article>`).join('') || '<p>No human decision recorded yet.</p>';
  return `${stageHeader('Review', 'Human review is the control layer. CyberShield recommendations and human decisions are preserved separately.')}
  <section class="panel"><h2>Human Review Gate</h2><p><strong>Required:</strong> ${state.record.human_review.required ? 'Yes' : 'No'}</p><p><strong>Required reviewer role:</strong> ${escapeHtml(state.record.human_review.required_reviewer_role)}</p><p><strong>Triggers:</strong></p><ul>${state.record.human_review.triggers.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul></section>
  <section class="panel"><h2>Manual Override / Human Decision</h2><div class="grid2"><label>Reviewer role<select id="reviewerRole"><option>Vendor-Risk Owner</option><option>Security SME</option><option>vCISO</option><option>Compliance Owner</option><option>Legal Counsel</option><option>Procurement Owner</option><option>Executive Sponsor</option><option>Business Owner</option><option>System Owner</option></select></label><label>Reviewer name<input id="reviewerName" placeholder="Optional"></label></div><label>Human selected action<select id="humanAction"><option>Request Evidence</option><option>Escalate for Review</option><option>Accept with Caveat</option><option>Reject</option><option>Quarantine</option><option>Accept</option></select></label><label>Override reason / reviewer notes<textarea id="overrideReason" placeholder="Explain why the human decision differs from or confirms CyberShield's recommendation."></textarea></label><label>Residual risk acknowledgment<input id="residualRisk" placeholder="Residual risk acknowledged by decision owner after review."></label><div class="actions"><button id="saveDecision" class="primary" type="button">Save Human Decision</button></div>${decisions}</section>`;
}

function renderDecisionRecord() {
  return `${stageHeader('Decision Record', 'This is the complete structured Trust Decision Record before export.')}
  <section class="panel"><pre>${escapeHtml(JSON.stringify(state.record, null, 2))}</pre></section>`;
}

function renderExport() {
  return `${stageHeader('Export', 'Export JSON now and use browser print to save a polished executive brief as PDF. DOCX is planned for the future backend build.')}
  <section class="panel"><h2>Available Exports</h2><div class="actions"><button id="downloadJson" class="primary" type="button">Download JSON</button><button id="printPdf" class="primary" type="button">Print / Save PDF</button></div><div class="notice" style="margin-top:14px">Browser print/PDF is the approved static prototype path. Production-grade DOCX/PDF generation should move to a real backend stack.</div></section>`;
}

function renderWorkspace() {
  if (!state.record) return renderIntake();
  return ({
    Intake: renderIntake,
    Claims: renderClaims,
    Evidence: renderEvidence,
    Gaps: renderGaps,
    Risk: renderRisk,
    Confidence: renderConfidence,
    Review: renderReview,
    'Decision Record': renderDecisionRecord,
    Export: renderExport
  }[state.stage] || renderIntake)();
}

function printDocument() {
  const r = state.record;
  if (!r) return '';
  const claimRows = r.extracted_claims.map(c => `<tr><td>${escapeHtml(c.claim_id)}</td><td>${escapeHtml(c.normalized_claim)}</td><td>${escapeHtml(c.claim_type)}</td><td>${escapeHtml(c.materiality)}</td><td>${escapeHtml(c.required_evidence_type.join('; '))}</td><td>${escapeHtml(c.evidence_sufficiency_band)}</td><td>${escapeHtml(c.conflict_status)}</td></tr>`).join('');
  const contradictions = contradictionHighlights(r).map(c => `<li>${escapeHtml(c.finding)}</li>`).join('') || '<li>No material contradiction highlighted by static rules.</li>';
  const missing = r.missing_support.slice(0, 12).map(m => `<li>${escapeHtml(m.claim_id)}: ${escapeHtml(m.finding)}</li>`).join('');
  const decisions = state.humanDecisions.length ? state.humanDecisions.map(d => `<p><strong>${escapeHtml(d.reviewer_role)}:</strong> ${escapeHtml(d.human_selected_action)}. ${escapeHtml(d.override_reason)}</p>`).join('') : '<p>No human decision has been recorded in this demo session.</p>';
  return `<div class="print-page"><h1>CyberShield Trust Decision Record</h1><p><strong>Subject:</strong> Trust Decision Record for Vendor-Risk Recommendation Review</p><p><strong>Prepared by:</strong> Maximum Justice Cybersecurity using CyberShield Decision Assurance</p><p><strong>Human in the loop:</strong> Dr. Max Justice, vCISO | Security SME | Cybersecurity SME</p><div class="print-callout"><p><strong>Decision Readiness:</strong> ${escapeHtml(r.record_defensibility_band)}</p><p><strong>CyberShield Recommended Action:</strong> ${escapeHtml(r.recommended_action)}</p><p><strong>Risk If Wrong:</strong> ${escapeHtml(r.risk_if_wrong.band)}</p><p><strong>Confidence Band:</strong> ${escapeHtml(r.confidence_band)}</p><p><strong>Human Review Required:</strong> ${r.human_review.required ? 'Yes' : 'No'}</p><p><strong>Required Reviewers:</strong> ${escapeHtml(r.human_review.required_reviewer_role)}</p></div><h2>Executive Summary</h2><p>The AI-generated recommendation is not defensible as written based on the evidence currently available. The recommendation depends on material claims regarding SOC 2 coverage, encryption, customer data access, and vendor risk level. CyberShield identified missing, weak, self-attested, or contradictory evidence that requires human review before approval.</p><h2>Recommendation Under Review</h2><p>${escapeHtml(r.original_ai_recommendation)}</p><h2>Decision Context</h2><p>${escapeHtml(r.decision_context)}</p><h2>Material Claims and Evidence Table</h2><table><thead><tr><th>ID</th><th>Claim</th><th>Type</th><th>Materiality</th><th>Required Evidence</th><th>Sufficiency</th><th>Conflict</th></tr></thead><tbody>${claimRows}</tbody></table><h2>Contradictory Evidence</h2><ul>${contradictions}</ul><h2>Missing Support</h2><ul>${missing}</ul><h2>Risk If Wrong</h2><p>${escapeHtml(r.risk_if_wrong.consequence_summary)}</p><h2>Confidence Band</h2><p><strong>${escapeHtml(r.confidence_band)}:</strong> ${escapeHtml(r.confidence_rationale)}</p><h2>Human Review and Override</h2>${decisions}<h2>Limitations</h2><ul>${r.limitations.map(l => `<li>${escapeHtml(l)}</li>`).join('')}</ul><h2>Signature Block</h2><p><strong>Dr. Max Justice</strong><br><strong>vCISO | Security SME | Cybersecurity SME</strong><br><strong>CISSP | PMP | PhD, Technology & Innovation Management – Cybersecurity</strong><br>Creator, CHN vCISO GPT powered by Cyber Shield<br>U.S. Veteran<br>Maximum Justice Cybersecurity</p><p>Signature:</p><div class="signature-box"></div><p>Date:</p><div class="review-line"></div><p>Reviewer Decision: ☐ Approved  ☐ Approved with Caveat  ☐ Request Evidence  ☐ Escalate for Review  ☐ Reject</p><h2>Export Metadata</h2><p>Record ID: ${escapeHtml(r.record_id)} | Version: ${escapeHtml(r.export_version)} | Analysis: ${escapeHtml(r.analysis_version)} | Export Count: ${state.exportCount}</p><div class="footer">CyberShield Decision Assurance | ${escapeHtml(r.record_id)} | Prepared by Maximum Justice Cybersecurity</div></div>`;
}

function attachHandlers() {
  $('#loadDemoTop').onclick = loadDemo;
  $('#printTop').onclick = printPdf;
  $('#downloadJsonTop').onclick = downloadJson;
  $('#demoMode') && ($('#demoMode').onchange = e => { state.demoMode = e.target.value; loadDemo(); });
  $('#domain') && ($('#domain').onchange = e => { state.domain = e.target.value; });
  $('#loadDemo') && ($('#loadDemo').onclick = loadDemo);
  $('#analyze') && ($('#analyze').onclick = () => {
    state.recommendation = $('#recommendation').value;
    state.domain = $('#domain').value;
    state.aiSource = $('#aiSource').value;
    state.sourceModel = $('#sourceModel').value;
    state.intendedUse = $('#intendedUse').value;
    state.context = $('#context').value;
    state.decisionOwner = $('#decisionOwner').value;
    audit('Recommendation submitted', 'User submitted recommendation for ATDR analysis.');
    analyze();
  });
  $('#useSynthetic') && ($('#useSynthetic').onchange = e => { state.useSyntheticEvidence = e.target.checked; audit('Synthetic evidence toggled', `Synthetic evidence set to ${state.useSyntheticEvidence}.`); analyze(); });
  $('#fileUpload') && ($('#fileUpload').onchange = handleFiles);
  $('#replaceEvidence') && ($('#replaceEvidence').onclick = () => { state.useSyntheticEvidence = false; audit('Uploaded evidence selected', 'Uploaded evidence replaced simulated evidence for active analysis.'); analyze(); });
  $('#addAlongside') && ($('#addAlongside').onclick = () => { state.useSyntheticEvidence = true; audit('Uploaded evidence selected', 'Uploaded evidence added alongside simulated evidence for active analysis.'); analyze(); });
  $('#addNote') && ($('#addNote').onclick = () => {
    state.evidenceNotes.push({ title: $('#noteTitle').value || 'Evidence note', type: $('#noteType').value || 'Other', summary: $('#noteSummary').value || 'No summary provided.', caveat: $('#noteCaveat').value || 'Source file not uploaded.', timestamp: now() });
    audit('Evidence note added', 'User added an evidence note without source file upload.');
    analyze();
  });
  $('#saveDecision') && ($('#saveDecision').onclick = () => {
    const decision = { cyberShield_recommended_action: state.record.recommended_action, human_selected_action: $('#humanAction').value, reviewer_role: $('#reviewerRole').value, reviewer_name: $('#reviewerName').value, override_reason: $('#overrideReason').value || 'No rationale entered.', residual_risk_acknowledgment: $('#residualRisk').value || 'Residual risk not specified.', timestamp: now() };
    state.humanDecisions.push(decision);
    audit('Manual override recorded', 'Human decision recorded and preserved separately from CyberShield recommendation.', state.record.recommended_action, decision.human_selected_action, decision.override_reason);
    analyze();
  });
  $('#downloadJson') && ($('#downloadJson').onclick = downloadJson);
  $('#printPdf') && ($('#printPdf').onclick = printPdf);
}

async function handleFiles(event) {
  const files = [...event.target.files];
  for (const file of files) {
    let text = '';
    try { text = await file.text(); }
    catch { text = `Uploaded file ${file.name} could not be read as text in this browser demo. Add an evidence note instead.`; }
    state.uploadedEvidence.push({ name: file.name, type: file.type || 'unknown', size: file.size, text, timestamp: now() });
    audit('Evidence uploaded', `Local in-browser file added: ${file.name}.`, '', 'session-only upload');
  }
  analyze();
}

function downloadJson() {
  if (!state.record) return;
  state.exportCount += 1;
  state.record.export_count = state.exportCount;
  state.record.last_exported_at = now();
  audit('JSON exported', 'Structured ATDR JSON exported.', '', state.record.last_exported_at);
  const blob = new Blob([exportJson(state.record)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${state.record.record_id}.json`;
  a.click();
  URL.revokeObjectURL(url);
  render();
}

function printPdf() {
  if (!state.record) return;
  state.exportCount += 1;
  state.record.export_count = state.exportCount;
  state.record.last_exported_at = now();
  audit('PDF exported', 'Browser print/PDF executive brief generated.', '', state.record.last_exported_at);
  $('#printDoc').innerHTML = printDocument();
  window.print();
  render();
}

function render() {
  nav();
  $('#workspace').innerHTML = renderWorkspace();
  $('#decisionBrief').innerHTML = decisionBrief();
  $('#printDoc').innerHTML = printDocument();
  attachHandlers();
}

loadDemo();