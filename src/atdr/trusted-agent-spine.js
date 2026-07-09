// CyberShield reusable trusted-agent spine helpers.
// Additive static-prototype objects for the canonical AI Trust Decision Record.

const SPINE_VERSION = '20260708-p1';
const HUMAN_GATE_DECISIONS = ['accept', 'reject', 'modify', 'defer', 'escalate'];

function text(value, fallback = '') {
  const normalized = String(value ?? '').trim();
  return normalized || fallback;
}

function list(value) {
  return Array.isArray(value) ? value.filter(item => item !== null && item !== undefined) : [];
}

function uniqueStrings(values = []) {
  return [...new Set(list(values).map(value => text(value)).filter(Boolean))];
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

// FNV-1a is used only as a deterministic static-prototype reference.
// It is explicitly not a cryptographic protected-change attestation.
function prototypeDigest(value) {
  const input = canonicalJson(value);
  let hash = 0x811c9dc5;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `fnv1a32-demo:${hash.toString(16).padStart(8, '0')}`;
}

function sourceId(item = {}, index = 0) {
  return text(item.source_id) || `SRC-${text(item.evidence_id, String(index + 1).padStart(3, '0'))}`;
}

function claimIdsForEvidence(item = {}, claims = []) {
  const explicit = item.related_claims || item.relevant_claims || item.claim_ids || [];
  const linked = list(claims)
    .filter(claim => list(claim.evidence_links).some(link => link.evidence_id === item.evidence_id))
    .map(claim => claim.claim_id);
  return uniqueStrings([...list(explicit), ...linked]);
}

function buildSourceRecords(evidenceItems = [], claims = [], now = new Date()) {
  const collectedAt = now.toISOString();
  return list(evidenceItems).map((item, index) => ({
    source_id: sourceId(item, index),
    title: text(item.evidence_name || item.evidence_title, `Evidence ${index + 1}`),
    source_type: text(item.source_type || item.evidence_type, 'not_recorded'),
    origin: text(item.origin || item.source_type, 'not_recorded'),
    author_or_provider: text(item.author_or_provider || item.source_type, 'not_recorded'),
    collected_at: text(item.collected_at || item.created_at, collectedAt),
    effective_date: text(item.effective_date || item.evidence_date || item.date, 'not_recorded'),
    expiration_or_review_date: text(item.expiration_or_review_date, 'not_recorded'),
    freshness_status: text(item.freshness_status || item.freshness_band || item.freshness, 'unknown'),
    independence_status: text(item.independence_status || item.independence_band || item.source_authority_band, 'unknown'),
    scope_status: text(item.scope_status, 'unclear'),
    content_hash_or_reference: text(item.content_hash_or_reference, prototypeDigest({
      evidence_id: item.evidence_id || '',
      evidence_title: item.evidence_name || item.evidence_title || '',
      evidence_text: item.text_extract || item.evidence_summary || item.caveat || ''
    })),
    claim_ids_supported: claimIdsForEvidence(item, claims),
    contradiction_ids: item.contradiction_flag ? [`CON-${text(item.evidence_id, index + 1)}`] : [],
    limitations: uniqueStrings([item.caveat, ...(list(item.limitations))]),
    synthetic_demo_flag: item.synthetic_demo_flag !== false && item.synthetic_demo_data_flag !== false
  }));
}

function linkEvidenceToSources(evidenceItems = [], sources = []) {
  const sourceByEvidenceId = new Map();
  sources.forEach((source, index) => {
    const evidence = evidenceItems[index] || {};
    if (evidence.evidence_id) sourceByEvidenceId.set(evidence.evidence_id, source.source_id);
  });
  return list(evidenceItems).map((item, index) => ({
    ...item,
    source_id: text(item.source_id, sourceByEvidenceId.get(item.evidence_id) || sources[index]?.source_id || 'not_recorded')
  }));
}

function buildMissingEvidenceRecords(missingSupport = [], now = new Date()) {
  return list(missingSupport).map((item, index) => ({
    missing_evidence_id: text(item.missing_evidence_id || item.missing_support_id, `ME-${String(index + 1).padStart(3, '0')}`),
    claim_id: text(item.claim_id, 'not_recorded'),
    required_evidence_type: text(item.required_evidence_type || item.category, 'not_recorded'),
    reason_required: text(item.reason_required || item.finding, 'Required evidence is not present in the current decision package.'),
    severity: text(item.severity, 'unknown'),
    decision_impact: text(item.decision_impact, item.severity === 'High' ? 'Blocks a defensible decision on a material claim.' : 'Reduces decision confidence and requires review.'),
    minimum_sufficient_evidence: text(item.minimum_sufficient_evidence || item.category, 'Accountable evidence sufficient to address the claim.'),
    responsible_role: text(item.responsible_role, 'Vendor-Risk Owner and Security SME'),
    requested_by: text(item.requested_by, 'CyberShield Decision Assurance workflow'),
    due_or_review_date: text(item.due_or_review_date, 'not_recorded'),
    status: text(item.status, 'open'),
    recorded_at: text(item.recorded_at, now.toISOString())
  }));
}

function buildContextPack({ record = {}, engineRecord = {}, state = {}, sources = [], now = new Date() } = {}) {
  const recordId = text(record.record_id || engineRecord.record_id, `ATDR-${now.getTime()}`);
  return {
    context_pack_id: text(record.context_pack?.context_pack_id, `CTX-${recordId}`),
    created_at: text(record.created_timestamp || engineRecord.created_at, now.toISOString()),
    domain: text(record.decision_domain || engineRecord.domain, 'vendor_risk'),
    decision_type: text(record.recommendation_type || engineRecord.recommendation_type, 'vendor-risk recommendation review'),
    task_objective: 'Determine the strongest defensible action for the AI-generated recommendation based on available evidence.',
    recommendation_under_review: text(record.original_ai_recommendation || state.recommendation),
    decision_owner: text(record.decision_owner || engineRecord.decision_owner || state.firstName, 'Pending vendor-risk owner assignment'),
    intended_use: text(engineRecord.intended_use || state.intendedUse, 'Vendor approval recommendation review before enterprise action'),
    scope: ['AI-generated vendor-risk recommendation', 'Claims', 'Evidence', 'Contradictions', 'Risk If Wrong', 'Confidence', 'Candidate actions', 'Human review'],
    exclusions: ['Autonomous vendor approval', 'Production authentication', 'Production persistence', 'External action', 'Public Aegis positioning'],
    source_ids: sources.map(source => source.source_id),
    known_constraints: ['Static deterministic prototype', 'Synthetic demonstration evidence', 'Human approval remains required'],
    known_uncertainties: uniqueStrings([
      ...(list(engineRecord.uncertainty_notes)),
      'No live source verification or model introspection is performed.'
    ]),
    requested_output: 'One canonical AI Trust Decision Record',
    authority_boundary: 'CyberShield may analyze and recommend. Accountable humans approve, reject, modify, defer, or escalate.'
  };
}

function buildHumanGate({ record = {}, engineRecord = {}, state = {}, contextPack = {}, now = new Date() } = {}) {
  const selected = HUMAN_GATE_DECISIONS.includes(state.humanDecision) ? state.humanDecision : 'not_recorded';
  const triggers = uniqueStrings(engineRecord.human_review?.triggers || record.human_gate?.triggering_conditions || []);
  const reviewerRoles = uniqueStrings(record.required_reviewer_roles || engineRecord.human_review?.required_reviewers || [
    'Vendor-Risk Owner',
    'Security SME',
    'Legal/Privacy Reviewer',
    'Business Owner'
  ]);
  return {
    human_gate_id: text(record.human_gate?.human_gate_id, `HG-${text(record.record_id || engineRecord.record_id, now.getTime())}`),
    gate_reason: text(record.human_gate?.gate_reason, triggers.join('; ') || 'Risk, uncertainty, or missing evidence requires accountable human review.'),
    triggering_conditions: triggers.length ? triggers : ['Human review required by the current Decision Assurance record.'],
    required_reviewer_roles: reviewerRoles,
    permitted_decisions: [...HUMAN_GATE_DECISIONS],
    reviewer_name: text(state.firstName, 'not_recorded'),
    reviewer_role: text(state.reviewerRole, 'not_recorded'),
    selected_decision: selected,
    rationale: text(state.humanRationale, 'not_recorded'),
    residual_risk_acknowledgment: text(state.residualRiskAcknowledgment, 'not_recorded'),
    timestamp: selected === 'not_recorded' ? null : now.toISOString(),
    override_of_agent_recommendation: ['reject', 'modify'].includes(selected),
    context_pack_id: contextPack.context_pack_id || 'not_recorded'
  };
}

function buildAgentWorkReceipt({ record = {}, engineRecord = {}, contextPack = {}, sources = [], missingEvidence = [], humanGate = {}, now = new Date() } = {}) {
  const recordId = text(record.record_id || engineRecord.record_id, `ATDR-${now.getTime()}`);
  const candidate = {
    record_id: recordId,
    context_pack_id: contextPack.context_pack_id,
    source_ids: sources.map(source => source.source_id),
    claim_ids: list(record.claims || engineRecord.extracted_claims).map(claim => claim.claim_id),
    missing_evidence_ids: missingEvidence.map(item => item.missing_evidence_id),
    recommended_action: record.cyberShield_recommended_action || engineRecord.recommended_action,
    human_gate_decision: humanGate.selected_decision
  };
  return {
    receipt_id: text(record.agent_work_receipt?.receipt_id, `AWR-${recordId}`),
    agent_identity: 'cybershield-static-decision-assurance',
    canonical_role: 'Decision Assurance workflow; non-verifier',
    task_id: 'CyberShield issue #25 P1',
    context_pack_id: contextPack.context_pack_id,
    input_source_ids: sources.map(source => source.source_id),
    operations_performed: [
      'classified recommendation domain',
      'extracted material claims',
      'mapped evidence and contradictions',
      'identified missing evidence',
      'classified Risk If Wrong',
      'assigned confidence band',
      'compared candidate actions',
      'created Human Gate',
      'assembled canonical AI Trust Decision Record'
    ],
    tools_used: ['CyberShield static deterministic engine', 'trusted-agent-spine.js'],
    claims_created_or_modified: candidate.claim_ids,
    evidence_created_or_modified: list(record.evidence_items).map(item => item.evidence_id),
    missing_evidence_created: candidate.missing_evidence_ids,
    human_gate_id: humanGate.human_gate_id,
    output_record_id: recordId,
    limitations: [
      'Static prototype using synthetic demonstration evidence.',
      'Agent Work Receipt records work performed; it does not prove the conclusion is true.',
      'The candidate digest is a non-cryptographic deterministic demo reference, not a protected-change attestation.',
      'Verifier identity, quorum, deterministic Policy Gate, and production audit services are not implemented in this browser workflow.'
    ],
    unresolved_findings: missingEvidence.map(item => `${item.claim_id}: ${item.required_evidence_type}`),
    start_timestamp: text(engineRecord.created_at || record.created_timestamp, now.toISOString()),
    completion_timestamp: now.toISOString(),
    candidate_digest: prototypeDigest(candidate),
    candidate_digest_algorithm: 'fnv1a32-demo-only',
    verification_status: 'unverified_static_prototype',
    spine_version: SPINE_VERSION
  };
}

function attachTrustedAgentSpine(record = {}, {
  engineRecord = {},
  state = {},
  evidenceItems = record.evidence_items || [],
  missingSupport = engineRecord.missing_support || [],
  now = new Date()
} = {}) {
  const claims = record.claims || engineRecord.extracted_claims || [];
  const sources = buildSourceRecords(evidenceItems, claims, now);
  const enrichedEvidence = linkEvidenceToSources(evidenceItems, sources);
  const missingEvidence = buildMissingEvidenceRecords(missingSupport, now);
  const base = { ...record, evidence_items: enrichedEvidence };
  const contextPack = buildContextPack({ record: base, engineRecord, state, sources, now });
  const humanGate = buildHumanGate({ record: base, engineRecord, state, contextPack, now });
  const agentWorkReceipt = buildAgentWorkReceipt({
    record: base,
    engineRecord,
    contextPack,
    sources,
    missingEvidence,
    humanGate,
    now
  });
  return {
    ...base,
    context_pack: contextPack,
    sources,
    missing_evidence_records: missingEvidence,
    human_gate: humanGate,
    agent_work_receipt: agentWorkReceipt
  };
}

function validateTrustedAgentSpine(record = {}) {
  const missing = [];
  if (!record.context_pack || typeof record.context_pack !== 'object') missing.push('context_pack');
  if (!Array.isArray(record.sources)) missing.push('sources');
  if (!Array.isArray(record.missing_evidence_records)) missing.push('missing_evidence_records');
  if (!record.human_gate || typeof record.human_gate !== 'object') missing.push('human_gate');
  if (!record.agent_work_receipt || typeof record.agent_work_receipt !== 'object') missing.push('agent_work_receipt');
  const sourceIds = new Set(list(record.sources).map(source => source.source_id));
  const unlinkedEvidenceIds = list(record.evidence_items)
    .filter(item => !item.source_id || !sourceIds.has(item.source_id))
    .map(item => item.evidence_id || 'unknown');
  const validDecision = record.human_gate?.selected_decision === 'not_recorded' || HUMAN_GATE_DECISIONS.includes(record.human_gate?.selected_decision);
  return {
    ok: missing.length === 0 && unlinkedEvidenceIds.length === 0 && validDecision,
    missing,
    unlinked_evidence_ids: unlinkedEvidenceIds,
    valid_human_gate_decision: validDecision
  };
}

export {
  SPINE_VERSION,
  HUMAN_GATE_DECISIONS,
  attachTrustedAgentSpine,
  buildAgentWorkReceipt,
  buildContextPack,
  buildHumanGate,
  buildMissingEvidenceRecords,
  buildSourceRecords,
  canonicalJson,
  linkEvidenceToSources,
  prototypeDigest,
  validateTrustedAgentSpine
};
