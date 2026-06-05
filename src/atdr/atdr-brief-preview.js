import { DEMO_MODES } from './atdr-demo-data.js';
import { analyzeRecommendation } from './atdr-engine.js';

const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));

function evidenceText(demo) {
  return demo.evidence_repository.map(e => `[${e.evidence_name}] ${e.text_extract}`).join('\n');
}

function summaryFor(demo) {
  if (demo.domain === 'compliance') return 'CyberShield evaluated an AI-generated compliance conclusion and separated policy existence from implementation and test evidence. The record helps prevent policy language from being treated as proof of operating effectiveness without review.';
  if (demo.domain === 'security') return 'CyberShield evaluated an AI-generated security risk acceptance recommendation and separated exploit likelihood, asset exposure, compensating controls, remediation deferral, and risk ownership before action.';
  return 'CyberShield evaluated an AI-generated vendor approval recommendation and separated SOC 2 existence, scope coverage, encryption claims, customer data use, subprocessors, and approval authority before action.';
}

function analyze(mode) {
  const demo = mode.demo;
  const record = analyzeRecommendation({
    recommendation: demo.original_ai_recommendation,
    domain: demo.domain,
    evidence: evidenceText(demo),
    aiSource: demo.ai_source,
    sourceModel: demo.source_model_if_known,
    intendedUse: demo.intended_use,
    context: demo.decision_context,
    decisionOwner: demo.decision_owner,
    createdBy: 'Demo user'
  });
  return { demo, record };
}

function render(mode) {
  const { demo, record } = analyze(mode);
  const claimRows = record.extracted_claims.map(claim => `<tr><td>${escapeHtml(claim.claim_id)}</td><td>${escapeHtml(claim.normalized_claim)}</td><td>${escapeHtml(claim.claim_type)}</td><td>${escapeHtml(claim.materiality)}</td><td>${escapeHtml(claim.required_evidence_type.join('; '))}</td><td>${escapeHtml(claim.evidence_sufficiency_band)}</td><td>${escapeHtml(claim.conflict_status)}</td></tr>`).join('');
  const missing = record.missing_support.slice(0, 14).map(item => `<li>${escapeHtml(item.claim_id)}: ${escapeHtml(item.finding)}</li>`).join('') || '<li>No missing support detected by static rules.</li>';
  const mappings = record.applicable_framework_references.slice(0, 10).map(item => `<li>${escapeHtml(item.framework_name)}: ${escapeHtml(item.compliance_warning_text)}</li>`).join('') || '<li>No framework mapping generated.</li>';
  document.querySelector('#doc').innerHTML = `
    <h1>CyberShield AI Trust Decision Record</h1>
    <p><strong>Prepared by:</strong> Maximum Justice Cybersecurity using CyberShield AI Decision Assurance</p>
    <p><strong>Human in the loop:</strong> Dr. Max Justice, vCISO | Security SME | Cybersecurity SME</p>
    <p><strong>Scenario:</strong> ${escapeHtml(demo.title)}</p>
    <div class="callout"><p><strong>Executive framing:</strong> ${escapeHtml(summaryFor(demo))}</p><p><strong>Decision doctrine:</strong> AI confidence is not evidence. The record separates what the AI claimed, what the evidence says, what CyberShield inferred, and what the human reviewer decided.</p></div>
    <div class="grid"><div class="box"><strong>Recommended Action</strong><br>${escapeHtml(record.recommended_action)}</div><div class="box"><strong>Risk If Wrong</strong><br>${escapeHtml(record.risk_if_wrong.band)}</div><div class="box"><strong>Confidence</strong><br>${escapeHtml(record.confidence_band)}</div><div class="box"><strong>Defensibility</strong><br>${escapeHtml(record.record_defensibility_band)}</div></div>
    <h2>AI Recommendation Under Review</h2><p>${escapeHtml(record.original_ai_recommendation)}</p>
    <h2>Decision Context</h2><p>${escapeHtml(record.decision_context)}</p>
    <h2>Claims, Evidence Requirements, and Gaps</h2><table><thead><tr><th>ID</th><th>Claim</th><th>Type</th><th>Materiality</th><th>Required Evidence</th><th>Sufficiency</th><th>Conflict</th></tr></thead><tbody>${claimRows}</tbody></table>
    <h2>Missing Support</h2><ul>${missing}</ul>
    <h2>Risk If Wrong</h2><p>${escapeHtml(record.risk_if_wrong.consequence_summary)}</p>
    <h2>Confidence Rationale</h2><p><strong>${escapeHtml(record.confidence_band)}:</strong> ${escapeHtml(record.confidence_rationale)}</p>
    <h2>Human Review Requirement</h2><p><strong>Required:</strong> ${record.human_review.required ? 'Yes' : 'No'}</p><p><strong>Reviewer path:</strong> ${escapeHtml(record.human_review.required_reviewer_role)}</p><ul>${record.human_review.triggers.map(trigger => `<li>${escapeHtml(trigger)}</li>`).join('')}</ul>
    <h2>Framework References</h2><ul>${mappings}</ul>
    <h2>Limitations</h2><ul>${record.limitations.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    <h2>Signature Block</h2><p><strong>Dr. Max Justice</strong><br><strong>vCISO | Security SME | Cybersecurity SME</strong><br><strong>CISSP | PMP | PhD, Technology & Innovation Management - Cybersecurity</strong><br>Creator, CHN vCISO GPT powered by Cyber Shield<br>U.S. Veteran<br>Maximum Justice Cybersecurity</p><p>Signature:</p><div class="signature"></div><p>Date:</p><div style="border-bottom:1px solid #444;height:30px"></div>
    <div class="footer">CyberShield AI Decision Assurance | ${escapeHtml(record.record_id)} | ${escapeHtml(record.export_version)} | ${new Date().toISOString()}</div>`;
}

function init() {
  const select = document.querySelector('#scenario');
  select.innerHTML = DEMO_MODES.map(mode => `<option value="${escapeHtml(mode.id)}">${escapeHtml(mode.label)}</option>`).join('');
  const getMode = () => DEMO_MODES.find(mode => mode.id === select.value) || DEMO_MODES[0];
  select.addEventListener('change', () => render(getMode()));
  document.querySelector('#print').addEventListener('click', () => window.print());
  render(getMode());
}

init();
