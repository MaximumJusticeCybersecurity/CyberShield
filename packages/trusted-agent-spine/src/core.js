// Domain-neutral reusable trusted-agent spine.
// This module prepares evidence-backed records and stops at a meaningful human gate.
// It does not grant action authority, verify truth, or provide production identity.

const CORE_SPINE_VERSION = '20260709-p2';
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

// FNV-1a is used only as a deterministic prototype reference.
function prototypeDigest(value) {
  const input = canonicalJson(value);
  let hash = 0x811c9dc5;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `fnv1a32-demo:${hash.toString(16).padStart(8, '0')}`;
}

function defaultRecordId(record = {}, engineRecord = {}, now = new Date(), prefix = 'REC') {
  return text(record.record_id || engineRecord.record_id, `${prefix}-${now.getTime()}`);
}

function claimIdsForEvidence(item = {}, claims = []) {
  const explicit = item.related_claims || item.relevant_claims || item.claim_ids || [];
  const linked = list(claims)
    .filter(claim => list(claim.evidence_links).some(link => link.evidence_id === item.evidence_id))
    .map(claim => claim.claim_id);
  return uniqueStrings([...list(explicit), ...linked]);
}

function normalizeConfig(config = {}) {
  const required = ['domainPackId', 'agentIdentity', 'taskId', 'taskObjective', 'requestedOutput', 'authorityBoundary'];
  const missing = required.filter(key => !text(config[key]));
  if (missing.length) throw new Error(`Reusable spine configuration missing: ${missing.join(', ')}`);
  return {
    spineVersion: text(config.spineVersion, CORE_SPINE_VERSION),
    domainPackId: text(config.domainPackId),
    domainPackVersion: text(config.domainPackVersion, '1.0'),
    agentIdentity: text(config.agentIdentity),
    humanOwnerId: text(config.humanOwnerId, 'max-justice'),
    canonicalRole: text(config.canonicalRole, 'domain workflow; non-verifier'),
    taskId: text(config.taskId),
    recordIdPrefix: text(config.recordIdPrefix, 'REC'),
    defaultDomain: text(config.defaultDomain, config.domainPackId),
    defaultDecisionType: text(config.defaultDecisionType, 'decision-support review'),
    taskObjective: text(config.taskObjective),
    defaultIntendedUse: text(config.defaultIntendedUse, 'Prepare a reviewable decision record before consequential action.'),
    scope: uniqueStrings(config.scope),
    exclusions: uniqueStrings(config.exclusions),
    constraints: uniqueStrings(config.constraints),
    defaultUncertainties: uniqueStrings(config.defaultUncertainties),
    requestedOutput: text(config.requestedOutput),
    authorityBoundary: text(config.authorityBoundary),
    reviewerRoles: uniqueStrings(config.reviewerRoles),
    responsibleRole: text(config.responsibleRole, 'Accountable human owner'),
    requestedBy: text(config.requestedBy, config.agentIdentity),
    operationsPerformed: uniqueStrings(config.operationsPerformed),
    toolsUsed: uniqueStrings(config.toolsUsed),
    limitations: uniqueStrings(config.limitations),
    verificationStatus: text(config.verificationStatus, 'unverified_static_prototype'),
    digestAlgorithm: text(config.digestAlgorithm, 'fnv1a32-demo-only'),
    recommendationSelector: typeof config.recommendationSelector === 'function'
      ? config.recommendationSelector
      : ({ record, engineRecord, state }) => record.recommendation || engineRecord.recommended_action || state.recommendation,
    ownerSelector: typeof config.ownerSelector === 'function'
      ? config.ownerSelector
      : ({ record, engineRecord, state }) => record.decision_owner || engineRecord.decision_owner || state.firstName,
    intendedUseSelector: typeof config.intendedUseSelector === 'function'
      ? config.intendedUseSelector
      : ({ engineRecord, state }) => engineRecord.intended_use || state.intendedUse,
    recordIdSelector: typeof config.recordIdSelector === 'function'
      ? config.recordIdSelector
      : ({ record, engineRecord, now }) => defaultRecordId(record, engineRecord, now, text(config.recordIdPrefix, 'REC')),
    claimSelector: typeof config.claimSelector === 'function'
      ? config.claimSelector
      : ({ record, engineRecord }) => record.claims || engineRecord.extracted_claims || [],
    evidenceSelector: typeof config.evidenceSelector === 'function'
      ? config.evidenceSelector
      : ({ record }) => record.evidence_items || [],
    evidenceIdSelector: typeof config.evidenceIdSelector === 'function'
      ? config.evidenceIdSelector
      : item => item.evidence_id,
    humanGateTriggers: typeof config.humanGateTriggers === 'function'
      ? config.humanGateTriggers
      : ({ record, engineRecord }) => engineRecord.human_review?.triggers || record.human_gate?.triggering_conditions || [],
    gateReason: text(config.gateReason, 'Risk, uncertainty, or missing evidence requires accountable human review.'),
    sourceDefaults: {
      sourceType: text(config.sourceDefaults?.sourceType, 'not_recorded'),
      origin: text(config.sourceDefaults?.origin, 'not_recorded'),
      authorOrProvider: text(config.sourceDefaults?.authorOrProvider, 'not_recorded'),
      syntheticDemo: config.sourceDefaults?.syntheticDemo !== false
    }
  };
}

function createReusableAgentSpine(rawConfig = {}) {
  const config = normalizeConfig(rawConfig);

  function buildSourceRecords(evidenceItems = [], claims = [], now = new Date()) {
    const collectedAt = now.toISOString();
    return list(evidenceItems).map((item, index) => {
      const evidenceId = text(config.evidenceIdSelector(item), String(index + 1).padStart(3, '0'));
      return {
        source_id: text(item.source_id, `SRC-${evidenceId}`),
        title: text(item.evidence_name || item.evidence_title || item.title, `Evidence ${index + 1}`),
        source_type: text(item.source_type || item.evidence_type, config.sourceDefaults.sourceType),
        origin: text(item.origin || item.source_type, config.sourceDefaults.origin),
        author_or_provider: text(item.author_or_provider || item.provider || item.source_type, config.sourceDefaults.authorOrProvider),
        collected_at: text(item.collected_at || item.created_at || item.accessed_at, collectedAt),
        effective_date: text(item.effective_date || item.evidence_date || item.date, 'not_recorded'),
        expiration_or_review_date: text(item.expiration_or_review_date, 'not_recorded'),
        freshness_status: text(item.freshness_status || item.freshness_band || item.freshness, 'unknown'),
        independence_status: text(item.independence_status || item.independence_band || item.source_authority_band || item.authority_status, 'unknown'),
        scope_status: text(item.scope_status, 'unclear'),
        content_hash_or_reference: text(item.content_hash_or_reference, prototypeDigest({
          evidence_id: evidenceId,
          title: item.evidence_name || item.evidence_title || item.title || '',
          content: item.text_extract || item.evidence_summary || item.summary || item.caveat || ''
        })),
        claim_ids_supported: claimIdsForEvidence(item, claims),
        contradiction_ids: item.contradiction_flag ? [`CON-${evidenceId}`] : [],
        limitations: uniqueStrings([item.caveat, ...(list(item.limitations))]),
        synthetic_demo_flag: item.synthetic_demo_flag !== false
          && item.synthetic_demo_data_flag !== false
          && config.sourceDefaults.syntheticDemo
      };
    });
  }

  function linkEvidenceToSources(evidenceItems = [], sources = []) {
    const sourceByEvidenceId = new Map();
    sources.forEach((source, index) => {
      const evidence = evidenceItems[index] || {};
      const evidenceId = config.evidenceIdSelector(evidence);
      if (evidenceId) sourceByEvidenceId.set(evidenceId, source.source_id);
    });
    return list(evidenceItems).map((item, index) => {
      const evidenceId = config.evidenceIdSelector(item);
      return {
        ...item,
        source_id: text(item.source_id, sourceByEvidenceId.get(evidenceId) || sources[index]?.source_id || 'not_recorded')
      };
    });
  }

  function buildMissingEvidenceRecords(missingSupport = [], now = new Date()) {
    return list(missingSupport).map((item, index) => ({
      missing_evidence_id: text(item.missing_evidence_id || item.missing_support_id, `ME-${String(index + 1).padStart(3, '0')}`),
      claim_id: text(item.claim_id || item.required_for_claim_id, 'not_recorded'),
      required_evidence_type: text(item.required_evidence_type || item.category, 'not_recorded'),
      reason_required: text(item.reason_required || item.finding || item.description, 'Required evidence is not present in the current decision package.'),
      severity: text(item.severity || item.materiality, 'unknown'),
      decision_impact: text(item.decision_impact || item.effect_on_candidate_actions,
        String(item.severity || item.materiality).toLowerCase() === 'high'
          ? 'Blocks a defensible decision on a material claim.'
          : 'Reduces decision confidence and requires review.'),
      minimum_sufficient_evidence: text(item.minimum_sufficient_evidence || item.category, 'Accountable evidence sufficient to address the claim.'),
      responsible_role: text(item.responsible_role || item.owner, config.responsibleRole),
      requested_by: text(item.requested_by, config.requestedBy),
      due_or_review_date: text(item.due_or_review_date || item.due_date, 'not_recorded'),
      status: text(item.status, 'open'),
      recorded_at: text(item.recorded_at, now.toISOString())
    }));
  }

  function buildContextPack({ record = {}, engineRecord = {}, state = {}, sources = [], now = new Date() } = {}) {
    const recordId = config.recordIdSelector({ record, engineRecord, state, now });
    return {
      context_pack_id: text(record.context_pack?.context_pack_id, `CTX-${recordId}`),
      context_pack_version: text(record.context_pack?.context_pack_version, config.spineVersion),
      domain_pack_id: config.domainPackId,
      domain_pack_version: config.domainPackVersion,
      created_at: text(record.created_timestamp || engineRecord.created_at, now.toISOString()),
      domain: text(record.decision_domain || engineRecord.domain, config.defaultDomain),
      decision_type: text(record.recommendation_type || engineRecord.recommendation_type, config.defaultDecisionType),
      task_objective: config.taskObjective,
      recommendation_under_review: text(config.recommendationSelector({ record, engineRecord, state })),
      decision_owner: text(config.ownerSelector({ record, engineRecord, state }), 'Pending accountable owner assignment'),
      intended_use: text(config.intendedUseSelector({ record, engineRecord, state }), config.defaultIntendedUse),
      scope: [...config.scope],
      exclusions: [...config.exclusions],
      source_ids: sources.map(source => source.source_id),
      known_constraints: [...config.constraints],
      known_uncertainties: uniqueStrings([...(list(engineRecord.uncertainty_notes)), ...config.defaultUncertainties]),
      requested_output: config.requestedOutput,
      authority_boundary: config.authorityBoundary,
      allowed_actions: uniqueStrings(record.context_pack?.allowed_actions || ['analyze', 'prepare', 'recommend']),
      prohibited_actions: uniqueStrings(record.context_pack?.prohibited_actions || config.exclusions)
    };
  }

  function buildHumanGate({ record = {}, engineRecord = {}, state = {}, contextPack = {}, now = new Date() } = {}) {
    const selected = HUMAN_GATE_DECISIONS.includes(state.humanDecision) ? state.humanDecision : 'not_recorded';
    const triggers = uniqueStrings(config.humanGateTriggers({ record, engineRecord, state }));
    const reviewerRoles = uniqueStrings(record.required_reviewer_roles || engineRecord.human_review?.required_reviewers || config.reviewerRoles);
    return {
      human_gate_id: text(record.human_gate?.human_gate_id, `HG-${config.recordIdSelector({ record, engineRecord, state, now })}`),
      gate_reason: text(record.human_gate?.gate_reason, triggers.join('; ') || config.gateReason),
      triggering_conditions: triggers.length ? triggers : ['Human review is required by the current domain record.'],
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
    const recordId = config.recordIdSelector({ record, engineRecord, now });
    const claims = config.claimSelector({ record, engineRecord });
    const evidence = config.evidenceSelector({ record, engineRecord });
    const candidate = {
      record_id: recordId,
      context_pack_id: contextPack.context_pack_id,
      source_ids: sources.map(source => source.source_id),
      claim_ids: list(claims).map(claim => claim.claim_id),
      missing_evidence_ids: missingEvidence.map(item => item.missing_evidence_id),
      recommended_action: config.recommendationSelector({ record, engineRecord, state: {} }),
      human_gate_decision: humanGate.selected_decision
    };
    return {
      receipt_id: text(record.agent_work_receipt?.receipt_id, `AWR-${recordId}`),
      agent_identity: config.agentIdentity,
      canonical_role: config.canonicalRole,
      task_id: config.taskId,
      context_pack_id: contextPack.context_pack_id,
      input_source_ids: sources.map(source => source.source_id),
      operations_performed: [...config.operationsPerformed],
      tools_used: [...config.toolsUsed],
      claims_created_or_modified: candidate.claim_ids,
      evidence_created_or_modified: list(evidence).map(item => config.evidenceIdSelector(item)).filter(Boolean),
      missing_evidence_created: candidate.missing_evidence_ids,
      human_gate_id: humanGate.human_gate_id,
      output_record_id: recordId,
      limitations: [...config.limitations],
      unresolved_findings: missingEvidence.map(item => `${item.claim_id}: ${item.required_evidence_type}`),
      start_timestamp: text(engineRecord.created_at || record.created_timestamp, now.toISOString()),
      completion_timestamp: now.toISOString(),
      candidate_digest: prototypeDigest(candidate),
      candidate_digest_algorithm: config.digestAlgorithm,
      verification_status: config.verificationStatus,
      spine_version: config.spineVersion,
      core_spine_version: CORE_SPINE_VERSION,
      domain_pack_id: config.domainPackId,
      domain_pack_version: config.domainPackVersion
    };
  }

  function toRegistrarWorkReceipt(record = {}, { runId = null, policyVersion = 'not_recorded', now = new Date() } = {}) {
    const contextPack = record.context_pack || {};
    const humanGate = record.human_gate || {};
    const receipt = record.agent_work_receipt || {};
    const missingEvidence = list(record.missing_evidence_records);
    const sources = list(record.sources);
    const claims = list(config.claimSelector({ record, engineRecord: {} }));
    const validation = validate(record);
    return {
      record_type: 'agent_work_receipt',
      record_version: '1.0',
      receipt_id: text(receipt.receipt_id, `AWR-${config.recordIdSelector({ record, engineRecord: {}, now })}`),
      task_id: config.taskId,
      run_id: text(runId, `RUN-${prototypeDigest({ receipt_id: receipt.receipt_id, completed: receipt.completion_timestamp }).split(':').pop()}`),
      agent_id: config.agentIdentity,
      human_owner_id: config.humanOwnerId,
      started_at: text(receipt.start_timestamp, now.toISOString()),
      completed_at: text(receipt.completion_timestamp, now.toISOString()),
      context_pack: {
        context_pack_id: text(contextPack.context_pack_id),
        context_pack_version: text(contextPack.context_pack_version, config.spineVersion),
        domain_pack_id: text(contextPack.domain_pack_id, config.domainPackId),
        domain_pack_version: text(contextPack.domain_pack_version, config.domainPackVersion),
        requested_outcome: text(contextPack.requested_output, config.requestedOutput),
        allowed_actions: uniqueStrings(contextPack.allowed_actions),
        prohibited_actions: uniqueStrings(contextPack.prohibited_actions),
        constraints: uniqueStrings(contextPack.known_constraints)
      },
      sources: sources.map(source => ({
        source_id: text(source.source_id),
        source_type: text(source.source_type, 'unknown'),
        locator: text(source.content_hash_or_reference || source.origin, 'not_recorded'),
        title: text(source.title) || null,
        version_or_timestamp: text(source.effective_date) || null,
        accessed_at: text(source.collected_at, now.toISOString()),
        authority_status: ['authoritative', 'approved', 'supporting', 'unverified', 'conflicting', 'unknown'].includes(source.independence_status) ? source.independence_status : 'unknown',
        freshness_status: ['current', 'potentially-stale', 'stale', 'unknown'].includes(source.freshness_status) ? source.freshness_status : 'unknown',
        citation_anchor: text(source.content_hash_or_reference) || null
      })),
      findings: {
        facts: claims.filter(claim => ['fact', 'factual'].includes(String(claim.claim_type).toLowerCase())).map(claim => findingFromClaim(claim)),
        assumptions: claims.filter(claim => String(claim.claim_type).toLowerCase() === 'assumption').map(claim => findingFromClaim(claim)),
        inferences: claims.filter(claim => String(claim.claim_type).toLowerCase() === 'inference').map(claim => findingFromClaim(claim)),
        recommendations: [{
          finding_id: `REC-${text(config.recordIdSelector({ record, engineRecord: {}, now }))}`,
          statement: text(config.recommendationSelector({ record, engineRecord: {}, state: {} }), 'No recommendation recorded.'),
          evidence_refs: sources.map(source => source.source_id),
          status: sources.length ? 'partially-supported' : 'unsupported',
          materiality: 'high'
        }],
        missing_evidence: missingEvidence.map(item => ({
          finding_id: text(item.missing_evidence_id),
          statement: text(item.reason_required),
          evidence_refs: [],
          status: 'unsupported',
          materiality: normalizeMateriality(item.severity)
        })),
        contradictions: []
      },
      transformations: list(receipt.operations_performed).map(operation => ({
        transformation_type: 'agent_operation',
        description: text(operation),
        input_refs: sources.map(source => source.source_id),
        output_refs: [text(receipt.output_record_id)]
      })),
      artifacts: [{
        artifact_id: text(receipt.output_record_id, 'not_recorded'),
        artifact_type: config.requestedOutput,
        locator: text(receipt.output_record_id, 'not_recorded'),
        change_type: 'created',
        verification_status: 'partially-verified'
      }],
      validators: [{
        validator_id: 'reusable-agent-spine-structure',
        result: validation.ok ? 'pass' : 'fail',
        details: validation.ok ? 'Required reusable spine objects are present and linked.' : 'Reusable spine validation failed.',
        evidence_refs: sources.map(source => source.source_id)
      }],
      risk_and_confidence: {
        confidence_band: normalizeConfidence(record.confidence_band || record.confidence || 'unknown'),
        risk_if_wrong: normalizeRisk(record.risk_if_wrong_band || record.risk_if_wrong || 'unknown'),
        limitations: uniqueStrings(receipt.limitations),
        residual_risk: uniqueStrings([humanGate.residual_risk_acknowledgment].filter(value => value && value !== 'not_recorded'))
      },
      actions: {
        performed: uniqueStrings(receipt.operations_performed),
        blocked: uniqueStrings(receipt.unresolved_findings),
        prohibited: uniqueStrings(contextPack.prohibited_actions)
      },
      approval_gate: {
        required: true,
        gate_type: config.domainPackId,
        decision_summary: text(humanGate.gate_reason, config.gateReason),
        options: uniqueStrings(humanGate.permitted_decisions),
        recommended_option: text(config.recommendationSelector({ record, engineRecord: {}, state: {} })) || null,
        consequences: uniqueStrings([humanGate.residual_risk_acknowledgment].filter(value => value && value !== 'not_recorded')),
        approval_status: approvalStatus(humanGate.selected_decision),
        approved_by: humanGate.timestamp ? text(humanGate.reviewer_name) || null : null,
        approved_at: humanGate.timestamp || null,
        rationale: humanGate.timestamp ? text(humanGate.rationale) || null : null
      },
      disposition: {
        status: humanGate.selected_decision === 'not_recorded' ? 'completed-pending-approval' : 'completed',
        summary: text(receipt.verification_status, 'unverified'),
        next_actions: missingEvidence.map(item => text(item.minimum_sufficient_evidence)),
        post_action_verification: ['Confirm outcome and update the decision record after accountable human action.']
      },
      attribution: {
        created_by: config.agentIdentity,
        created_at: text(receipt.completion_timestamp, now.toISOString()),
        policy_version: text(policyVersion),
        evidence: sources.map(source => source.source_id)
      }
    };
  }

  function attach(record = {}, {
    engineRecord = {},
    state = {},
    evidenceItems = config.evidenceSelector({ record, engineRecord }),
    missingSupport = engineRecord.missing_support || record.missing_support || [],
    now = new Date()
  } = {}) {
    const claims = config.claimSelector({ record, engineRecord });
    const sources = buildSourceRecords(evidenceItems, claims, now);
    const enrichedEvidence = linkEvidenceToSources(evidenceItems, sources);
    const base = { ...record, evidence_items: enrichedEvidence };
    const contextPack = buildContextPack({ record: base, engineRecord, state, sources, now });
    const humanGate = buildHumanGate({ record: base, engineRecord, state, contextPack, now });
    const missingEvidence = buildMissingEvidenceRecords(missingSupport, now);
    const agentWorkReceipt = buildAgentWorkReceipt({ record: base, engineRecord, contextPack, sources, missingEvidence, humanGate, now });
    return {
      ...base,
      context_pack: contextPack,
      sources,
      missing_evidence_records: missingEvidence,
      human_gate: humanGate,
      agent_work_receipt: agentWorkReceipt
    };
  }

  function validate(record = {}) {
    const missing = [];
    if (!record.context_pack || typeof record.context_pack !== 'object') missing.push('context_pack');
    if (!Array.isArray(record.sources)) missing.push('sources');
    if (!Array.isArray(record.missing_evidence_records)) missing.push('missing_evidence_records');
    if (!record.human_gate || typeof record.human_gate !== 'object') missing.push('human_gate');
    if (!record.agent_work_receipt || typeof record.agent_work_receipt !== 'object') missing.push('agent_work_receipt');
    const sourceIds = new Set(list(record.sources).map(source => source.source_id));
    const unlinkedEvidenceIds = list(record.evidence_items)
      .filter(item => !item.source_id || !sourceIds.has(item.source_id))
      .map(item => config.evidenceIdSelector(item) || 'unknown');
    const validDecision = record.human_gate?.selected_decision === 'not_recorded'
      || HUMAN_GATE_DECISIONS.includes(record.human_gate?.selected_decision);
    const domainPackMatches = record.context_pack?.domain_pack_id === config.domainPackId
      && record.agent_work_receipt?.domain_pack_id === config.domainPackId;
    return {
      ok: missing.length === 0 && unlinkedEvidenceIds.length === 0 && validDecision && domainPackMatches,
      missing,
      unlinked_evidence_ids: unlinkedEvidenceIds,
      valid_human_gate_decision: validDecision,
      domain_pack_matches: domainPackMatches
    };
  }

  return {
    config: Object.freeze({ ...config }),
    attach,
    buildAgentWorkReceipt,
    buildContextPack,
    buildHumanGate,
    buildMissingEvidenceRecords,
    buildSourceRecords,
    linkEvidenceToSources,
    toRegistrarWorkReceipt,
    validate
  };
}

function findingFromClaim(claim = {}) {
  return {
    finding_id: text(claim.claim_id, 'unknown'),
    statement: text(claim.normalized_claim || claim.original_sentence || claim.statement, 'No statement recorded.'),
    evidence_refs: uniqueStrings(list(claim.evidence_links).map(link => link.evidence_id || link.source_id)),
    status: normalizeFindingStatus(claim.evidence_status || claim.evidence_sufficiency || 'unknown'),
    materiality: normalizeMateriality(claim.materiality)
  };
}

function normalizeFindingStatus(value) {
  const normalized = String(value || '').toLowerCase();
  if (normalized.includes('conflict')) return 'conflicting';
  if (normalized.includes('unsupported') || normalized.includes('missing')) return 'unsupported';
  if (normalized.includes('partial') || normalized.includes('weak')) return 'partially-supported';
  if (normalized.includes('support') || normalized.includes('sufficient')) return 'supported';
  return 'unknown';
}

function normalizeMateriality(value) {
  const normalized = String(value || '').toLowerCase();
  if (['low', 'moderate', 'high', 'critical'].includes(normalized)) return normalized;
  if (normalized === 'medium') return 'moderate';
  return 'unknown';
}

function normalizeConfidence(value) {
  const normalized = String(typeof value === 'object' ? value.band : value || '').toLowerCase();
  if (normalized.includes('insufficient')) return 'insufficient-evidence';
  if (normalized.includes('high')) return 'high';
  if (normalized.includes('moderate') || normalized.includes('medium')) return 'moderate';
  if (normalized.includes('low')) return 'low';
  return 'unknown';
}

function normalizeRisk(value) {
  const normalized = String(typeof value === 'object' ? value.band : value || '').toLowerCase();
  if (normalized.includes('critical')) return 'critical';
  if (normalized.includes('high')) return 'high';
  if (normalized.includes('moderate') || normalized.includes('medium')) return 'moderate';
  if (normalized.includes('low')) return 'low';
  return 'unknown';
}

function approvalStatus(decision) {
  const map = {
    not_recorded: 'pending',
    accept: 'approved',
    reject: 'rejected',
    modify: 'modified',
    defer: 'pending',
    escalate: 'escalated'
  };
  return map[decision] || 'pending';
}

export {
  CORE_SPINE_VERSION,
  HUMAN_GATE_DECISIONS,
  canonicalJson,
  createReusableAgentSpine,
  prototypeDigest
};
