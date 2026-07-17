import { VENDOR_RISK_CONTRADICTORY_DEMO } from '../atdr/atdr-demo-data.js';
import { analyzeRecommendation } from '../atdr/atdr-engine.js';
import { attachTrustedAgentSpine, prototypeDigest } from '../atdr/trusted-agent-spine.js';
import { ADAPTER_REGISTRY_VERSION } from './adapter-registry.js';

const MIGRATION_VERSION = '20260716-p1';

function normalizeBand(value, allowed, fallback) {
  const key = String(value ?? '').toLowerCase().replaceAll(' ', '_');
  return allowed.includes(key) ? key : fallback;
}

function createLegacyVendorRiskFixture({ evidenceOverride = null, now = new Date('2026-07-16T12:00:00Z') } = {}) {
  const demo = VENDOR_RISK_CONTRADICTORY_DEMO;
  const evidenceItems = evidenceOverride || demo.evidence_repository;
  const evidence = evidenceItems.map(item => `[${item.evidence_name}] ${item.text_extract}`).join('\n');
  const engineRecord = analyzeRecommendation({
    recommendation: demo.original_ai_recommendation,
    domain: 'vendor-risk',
    evidence,
    aiSource: demo.ai_source,
    sourceModel: demo.source_model_if_known,
    intendedUse: demo.intended_use,
    context: demo.decision_context,
    decisionOwner: demo.decision_owner,
    createdBy: 'CyberShield controlled synthetic fixture',
    now
  });
  return { demo, evidenceItems, engineRecord };
}

function migrateVendorRiskFixture(legacy = createLegacyVendorRiskFixture(), now = new Date('2026-07-16T12:00:00Z')) {
  const { demo, evidenceItems, engineRecord } = legacy;
  const claimIds = engineRecord.extracted_claims.map(claim => claim.claim_id);
  const materialClaimIds = engineRecord.extracted_claims.filter(claim => String(claim.materiality).toLowerCase() === 'high').map(claim => claim.claim_id);
  const primaryClaimId = materialClaimIds[0] || claimIds[0];
  const linkedEvidence = evidenceItems.map((item, index) => ({
    ...item,
    related_claims: [claimIds[index % Math.max(claimIds.length, 1)] || primaryClaimId].filter(Boolean)
  }));
  const base = {
    record_id: `TDR-VNEXT-${demo.scenario_id}`,
    created_timestamp: now.toISOString(),
    decision_domain: 'vendor_risk',
    decision_owner: demo.decision_owner,
    recommendation_type: 'vendor-risk approval recommendation',
    original_ai_recommendation: demo.original_ai_recommendation,
    cyberShield_recommended_action: 'Request Evidence',
    required_reviewer_roles: ['Vendor-Risk Owner', 'Security SME', 'Legal/Privacy Reviewer', 'Business Owner'],
    claims: engineRecord.extracted_claims,
    evidence_items: linkedEvidence
  };
  const withSpine = attachTrustedAgentSpine(base, {
    engineRecord,
    state: { recommendation: demo.original_ai_recommendation },
    evidenceItems: linkedEvidence,
    missingSupport: engineRecord.missing_support,
    now
  });
  const sourceByEvidence = new Map(linkedEvidence.map((item, index) => [item.evidence_id, withSpine.sources[index]]));
  const contradictions = linkedEvidence.filter(item => item.contradiction_flag).map((item, index) => ({
    contradiction_id: `CON-${String(index + 1).padStart(3, '0')}`,
    description: item.caveat || item.text_extract,
    claim_ids: item.related_claims,
    evidence_ids: [item.evidence_id],
    severity: item.source_type === 'Contract artifact' ? 'high' : 'moderate',
    resolution_status: 'unresolved',
    decision_effect: 'blocks_action'
  }));
  const contradictionByEvidence = new Map(contradictions.map(item => [item.evidence_ids[0], item.contradiction_id]));
  const assumptions = [{
    assumption_id: 'ASM-001',
    statement: 'The supplied SOC 2 report covers the specific AI-assisted service being evaluated.',
    origin: 'inferred',
    affected_claim_ids: [primaryClaimId],
    support_status: 'unsupported',
    consequence_if_false: 'Approval would rely on assurance evidence outside the evaluated service scope.',
    test_required: 'Obtain and inspect the complete system description and scope mapping.',
    disposition: 'requires_evidence'
  }];
  const missingEvidence = withSpine.missing_evidence_records.map(item => ({
    missing_evidence_id: item.missing_evidence_id,
    affected_claim_ids: claimIds.includes(item.claim_id) ? [item.claim_id] : [primaryClaimId],
    evidence_needed: item.required_evidence_type,
    why_it_matters: item.reason_required,
    severity: ['critical', 'high', 'moderate', 'low', 'informational'].includes(String(item.severity).toLowerCase()) ? String(item.severity).toLowerCase() : 'high',
    blocks_action: ['high', 'critical'].includes(String(item.severity).toLowerCase()),
    expected_provider: item.responsible_role,
    next_step: item.minimum_sufficient_evidence,
    closure_condition: item.minimum_sufficient_evidence
  }));
  const evidence = linkedEvidence.map(item => {
    const source = sourceByEvidence.get(item.evidence_id);
    return {
      evidence_id: item.evidence_id,
      source_id: source?.source_id || null,
      title: item.evidence_name,
      source_locator: source?.content_hash_or_reference || null,
      source_type: item.self_attestation_flag ? 'self_attested' : item.source_type === 'Contract artifact' ? 'contract' : item.source_type === 'Internal note' ? 'internal' : 'synthetic_demo',
      author_or_provider: source?.author_or_provider || 'Synthetic fixture provider',
      created_or_published_at: item.evidence_date || null,
      retrieved_at: now.toISOString(),
      freshness: String(item.freshness_band || '').toLowerCase().startsWith('current') ? 'current' : 'unknown',
      relevance: 'direct',
      scope_status: String(item.scope_status || '').toLowerCase().includes('not') ? 'partially_in_scope' : 'in_scope',
      independence_status: item.self_attestation_flag ? 'self_attested' : 'partially_independent',
      authenticity_status: 'synthetic',
      synthetic_demo: true,
      affected_claim_ids: item.related_claims,
      relationship_to_claims: item.contradiction_flag ? 'contradicts' : 'qualifies',
      summary: [item.caveat, item.text_extract].filter(Boolean).join(' Source content: '),
      limitations: [item.caveat || 'Synthetic demonstration evidence.'],
      content_digest: source?.content_hash_or_reference || prototypeDigest(item)
    };
  });
  const claims = engineRecord.extracted_claims.map(claim => {
    const supporting = evidence.filter(item => item.affected_claim_ids.includes(claim.claim_id) && item.relationship_to_claims !== 'contradicts').map(item => item.evidence_id);
    const contradictory = evidence.filter(item => item.affected_claim_ids.includes(claim.claim_id) && item.relationship_to_claims === 'contradicts').map(item => item.evidence_id);
    return {
      claim_id: claim.claim_id,
      original_text: claim.original_sentence || claim.normalized_claim,
      normalized_claim: claim.normalized_claim,
      claim_type: 'fact',
      materiality: String(claim.materiality).toLowerCase() === 'high' ? 'material' : 'unknown',
      required_evidence: [claim.required_evidence || 'Evidence appropriate to the material claim.'],
      supporting_evidence_ids: supporting,
      contradictory_evidence_ids: contradictory,
      evidence_status: contradictory.length ? 'contradicted' : supporting.length ? 'partially_supported' : 'unsupported',
      assumption_ids: claim.claim_id === primaryClaimId ? ['ASM-001'] : [],
      contradiction_ids: contradictory.map(id => contradictionByEvidence.get(id)).filter(Boolean),
      unsupported_leap: Boolean(claim.unsupported_leap_flag || !supporting.length),
      confidence_basis: supporting.length ? ['Synthetic evidence is linked but not independently verified.'] : ['No supporting evidence is linked.'],
      risk_if_wrong: 'high'
    };
  });
  const candidates = [
    ['CA-001', 'request_evidence', 1, true, 'Preserves the evidence threshold before approval.'],
    ['CA-002', 'escalate', 2, false, 'Review is required but does not close the evidence gaps.'],
    ['CA-003', 'defer_or_monitor', 3, false, 'Deferral is safe but does not advance the evidence review.'],
    ['CA-004', 'proceed_with_conditions', 4, false, 'Material evidence gaps make conditional approval premature.']
  ].map(([action_id, action, defensibility_rank, selected, rationale]) => ({
    action_id, action, rationale, evidence_sufficiency: 'insufficient', risk_treatment: selected ? 'Avoid premature vendor approval.' : 'Does not fully treat material uncertainty.',
    required_review: ['Vendor-Risk Owner', 'Security SME'], conditions: [], residual_risk: ['Vendor scope and data-use uncertainty remain.'],
    defensibility_rank, selected, non_selection_reason: selected ? null : rationale
  }));
  const eventSeed = { record_id: base.record_id, migration_version: MIGRATION_VERSION, source_record_id: engineRecord.record_id };
  const migrated = {
    record_id: base.record_id,
    schema_version: '2026070913-vnext',
    record_status: 'awaiting_human_review',
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
    responsible_actor: `work-receipt:${withSpine.agent_work_receipt.receipt_id}`,
    decision_owner: demo.decision_owner,
    recommendation_domain: 'vendor_risk',
    domain_adapter: {
      adapter_id: 'cybershield.vendor-risk', adapter_version: '1.0.0-pilot', support_level: 'pilot',
      extension_schema_id: 'cybershield.vendor-risk.v1', extension_schema_digest: 'fnv1a32-demo:vendor-risk-v1',
      registry_version: ADAPTER_REGISTRY_VERSION,
      limitations: ['Validated only against the controlled synthetic vendor-risk migration fixture.']
    },
    recommendation_input: {
      original_recommendation: demo.original_ai_recommendation, intended_action: 'Approve Vendor X for use', decision_context: demo.decision_context,
      originating_ai_or_source: demo.ai_source, originating_model: demo.source_model_if_known, originating_provider: null,
      originating_rationale: null, originating_confidence: null, evidence_supplied: true, deadline_or_urgency: 'Business owner requests approval this week.',
      input_limitations: ['Synthetic demonstration evidence.', 'Originating model and confidence are unknown.'], source_digest: prototypeDigest(demo.original_ai_recommendation)
    },
    claims, evidence_items: evidence, missing_evidence: missingEvidence, assumptions, contradictions,
    risk_if_wrong: {
      overall_band: 'high',
      categories: [
        { category: 'security', severity: 'high', likelihood_basis: 'Evaluated AI-service scope is not established.', description: 'Approval could expose customer data under unverified controls.', residual_risk: 'Unverified service scope.' },
        { category: 'privacy_data_protection', severity: 'high', likelihood_basis: 'DPA and subprocessor evidence contains material uncertainty.', description: 'Data use and downstream processing may exceed the assumed scope.', residual_risk: 'Data-use ambiguity remains.' },
        { category: 'legal_contractual', severity: 'moderate', likelihood_basis: 'Contract language permits broader service-improvement use.', description: 'Approval may accept obligations inconsistent with the recommendation.', residual_risk: 'Legal interpretation remains owner-controlled.' }
      ],
      affected_parties: ['Customers', 'Maximum Justice Cybersecurity client organization', 'Vendor-risk decision owner'], reversibility: 'partially_reversible',
      time_to_harm: 'After data onboarding or production use.', containment_or_rollback: ['Do not approve until evidence is supplied.', 'Preserve the ability to reject or replace the vendor.'],
      uncertainties: ['No live source verification was performed.']
    },
    evidence_sufficiency: {
      band: 'insufficient', explanation: 'Material claims remain unsupported or contradicted.',
      claim_results: claims.map(claim => ({ claim_id: claim.claim_id, result: claim.evidence_status === 'contradicted' ? 'contradicted' : claim.evidence_status === 'unsupported' ? 'does_not_meet_threshold' : 'partially_meets_threshold', explanation: claim.confidence_basis.join(' ') })),
      blocking_gaps: missingEvidence.filter(item => item.blocks_action).map(item => item.missing_evidence_id)
    },
    confidence_assessment: {
      band: 'low', explanation: 'Evidence is synthetic, materially incomplete, and includes contradictions.', strongest_basis: evidence.slice(0, 2).map(item => item.evidence_id),
      weakest_material_basis: missingEvidence.map(item => item.missing_evidence_id), limiting_factors: ['Missing material evidence', 'Source dependence', 'Pilot adapter maturity'],
      contradictions: contradictions.map(item => item.contradiction_id), assumptions: ['ASM-001'], change_conditions: ['Obtain complete SOC 2 scope, DPA, subprocessor, and data-handling evidence.']
    },
    candidate_actions: candidates,
    strongest_defensible_action: {
      action: 'request_evidence', rationale: 'The current evidence cannot defend approval.', evidence_basis: evidence.map(item => item.evidence_id),
      blocking_gaps: missingEvidence.filter(item => item.blocks_action).map(item => item.missing_evidence_id), conditions: [],
      required_review: ['Vendor-Risk Owner', 'Security SME', 'Legal/Privacy Reviewer', 'Business Owner'], residual_risk: ['Decision remains blocked pending evidence.'],
      expires_or_reassess_at: null, reassessment_triggers: ['Receipt of material new evidence', 'Change to vendor service scope'],
      change_conditions: ['Close all blocking evidence gaps and rerun the analysis.']
    },
    review_requirement: {
      level: 'multi_role_review', required_roles: ['Vendor-Risk Owner', 'Security SME', 'Legal/Privacy Reviewer', 'Business Owner'],
      role_reasons: ['Risk, privacy, legal, and business ownership are material.'], decision_authority: demo.decision_owner, review_deadline: null,
      unresolved_questions: missingEvidence.map(item => item.evidence_needed), action_blocked_pending_review: true
    },
    human_decision: null, override_event: null, residual_risk: ['Not accepted by an accountable owner.'],
    limitations: ['Static nonproduction pilot.', 'Synthetic demonstration evidence.', 'Prototype digest is not cryptographic attestation.', 'No verifier quorum or protected audit service is implemented.'],
    domain_extension: {
      extension_schema_id: 'cybershield.vendor-risk.v1', extension_schema_digest: 'fnv1a32-demo:vendor-risk-v1', vendor_name: demo.vendor_name,
      service_evaluated: demo.service_evaluated, legacy_record_id: engineRecord.record_id,
      legacy_related_claim_ids: [...new Set(evidenceItems.flatMap(item => item.related_claims || []))],
      migration_notes: ['Legacy claim references are preserved in this extension; vNext evidence links use migrated canonical claim IDs.']
    },
    audit_events: [
      { event_id: 'AUD-001', timestamp: now.toISOString(), actor: 'CyberShield deterministic migration adapter', event_type: 'created', description: 'Created one canonical vNext record from the controlled legacy fixture.', previous_digest: null, resulting_digest: prototypeDigest(eventSeed) },
      { event_id: 'AUD-002', timestamp: now.toISOString(), actor: 'CyberShield semantic validator', event_type: 'validated', description: 'Prepared the record for deterministic semantic validation.', previous_digest: prototypeDigest(eventSeed), resulting_digest: null }
    ],
    operational_status: {
      data_type: 'synthetic_demo', analysis_mode: 'deterministic', verification_status: 'partially_verified', production_status: 'nonproduction_pilot',
      unimplemented_controls: ['production_identity', 'verifier_quorum', 'deterministic_permit', 'protected_audit', 'cryptographic_attestation', 'live_connectors']
    },
    integrity: { algorithm: 'prototype_demo_digest', record_digest: null, digest_scope: 'Canonical record excluding integrity.record_digest and final audit resulting_digest.' },
    context_pack: withSpine.context_pack,
    sources: withSpine.sources,
    missing_evidence_records: withSpine.missing_evidence_records,
    human_gate: withSpine.human_gate,
    agent_work_receipt: { ...withSpine.agent_work_receipt, output_record_id: base.record_id }
  };
  const digestView = structuredClone(migrated);
  digestView.integrity.record_digest = null;
  digestView.audit_events.at(-1).resulting_digest = null;
  migrated.integrity.record_digest = prototypeDigest(digestView);
  migrated.audit_events.at(-1).resulting_digest = migrated.integrity.record_digest;
  return migrated;
}

export { MIGRATION_VERSION, createLegacyVendorRiskFixture, migrateVendorRiskFixture };
