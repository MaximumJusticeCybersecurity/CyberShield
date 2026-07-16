import { createLegacyVendorRiskFixture, migrateVendorRiskFixture } from './vendor-risk-migration.js';
import { validateVnextRecord } from './semantic-validator.js';

const now = new Date();
const record = migrateVendorRiskFixture(createLegacyVendorRiskFixture({ now }), now);
const validation = validateVnextRecord(record);

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
}

function executiveBrief() {
  return `<section class="card"><p class="eyebrow">Internal / QA only</p><h1>Pilot vNext P1</h1><p>One current vendor-risk recommendation migrated into one canonical vNext Trust Decision Record.</p><div class="metrics"><div><span>Strongest Defensible Action</span><strong>Request Evidence</strong></div><div><span>Risk If Wrong</span><strong>High</strong></div><div><span>Confidence</span><strong>Low</strong></div><div><span>Review</span><strong>Multi-role</strong></div></div><p class="boundary">Static nonproduction pilot using synthetic evidence.  No live connectors, autonomous action, verifier quorum, protected audit, or production readiness is claimed.</p></section>`;
}

function traceability() {
  return `<section class="card"><h2>Legacy-to-vNext comparison</h2><table><thead><tr><th>Contract</th><th>Identity</th><th>Claims</th><th>Evidence</th><th>Gaps</th><th>Human Gate</th><th>Work Receipt</th></tr></thead><tbody><tr><td>Legacy fixture</td><td>${escapeHtml(record.domain_extension.legacy_record_id)}</td><td>${record.claims.length}</td><td>${record.evidence_items.length}</td><td>${record.missing_evidence.length}</td><td>Mapped</td><td>Mapped</td></tr><tr><td>Canonical vNext</td><td>${escapeHtml(record.record_id)}</td><td>${record.claims.length}</td><td>${record.evidence_items.length}</td><td>${record.missing_evidence.length}</td><td>${escapeHtml(record.human_gate.human_gate_id)}</td><td>${escapeHtml(record.agent_work_receipt.receipt_id)}</td></tr></tbody></table></section>`;
}

document.querySelector('#app').innerHTML = `${executiveBrief()}${traceability()}<section class="card"><h2>Deterministic validation</h2><p class="${validation.ok ? 'pass' : 'fail'}">${validation.ok ? 'PASS' : 'FAIL'}</p><ul>${[...validation.errors, ...validation.warnings].map(item => `<li>${escapeHtml(item)}</li>`).join('') || '<li>No semantic validation findings.</li>'}</ul><div class="actions"><button id="download">Download canonical JSON</button><button id="print">Print / Save PDF</button></div></section><section class="card"><h2>Canonical object</h2><pre>${escapeHtml(JSON.stringify(record, null, 2))}</pre></section>`;

document.querySelector('#download').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${record.record_id}.json`;
  link.click();
  URL.revokeObjectURL(url);
});
document.querySelector('#print').addEventListener('click', () => window.print());

window.CYBERSHIELD_VNEXT_QA = Object.freeze({ record, validation });
