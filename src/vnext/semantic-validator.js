import { validateTrustedAgentSpine } from '../atdr/trusted-agent-spine.js';
import { resolveAdapter } from './adapter-registry.js';

const LATER_STATES = new Set(['analysis_complete', 'awaiting_human_review', 'human_decision_recorded', 'superseded', 'expired', 'closed_no_action']);
const CONSTRAINED_ACTIONS = new Set(['request_evidence', 'modify_and_reassess', 'defer_or_monitor', 'escalate', 'reject', 'insufficient_evidence_to_decide']);
const REQUIRED = [
  'record_id', 'schema_version', 'record_status', 'created_at', 'updated_at', 'responsible_actor',
  'recommendation_domain', 'domain_adapter', 'recommendation_input', 'claims', 'evidence_items',
  'missing_evidence', 'assumptions', 'contradictions', 'risk_if_wrong', 'evidence_sufficiency',
  'confidence_assessment', 'candidate_actions', 'strongest_defensible_action', 'review_requirement',
  'human_decision', 'override_event', 'limitations', 'audit_events', 'operational_status', 'integrity',
  'context_pack', 'sources', 'missing_evidence_records', 'human_gate', 'agent_work_receipt'
];

function list(value) {
  return Array.isArray(value) ? value : [];
}

function duplicateIds(items, key) {
  const seen = new Set();
  return list(items).map(item => item?.[key]).filter(Boolean).filter(id => seen.has(id) || !seen.add(id));
}

function dangling(values, valid) {
  return list(values).filter(value => value && !valid.has(value));
}

function walkStrings(value, path = '$', output = []) {
  if (typeof value === 'string') output.push({ path, value });
  else if (Array.isArray(value)) value.forEach((item, index) => walkStrings(item, `${path}[${index}]`, output));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => walkStrings(item, `${path}.${key}`, output));
  return output;
}

function validateVnextRecord(record = {}) {
  const errors = [];
  const warnings = [];
  const missing = REQUIRED.filter(key => !Object.hasOwn(record, key));
  if (missing.length) errors.push(`missing required fields: ${missing.join(', ')}`);
  if (record.schema_version !== '2026070913-vnext') errors.push('unsupported schema_version');
  if (!record.domain_adapter || typeof record.domain_adapter !== 'object') errors.push('domain_adapter must be an object');

  const collections = ['claims', 'evidence_items', 'missing_evidence', 'assumptions', 'contradictions', 'candidate_actions', 'audit_events'];
  for (const key of collections) if (!Array.isArray(record[key])) errors.push(`${key} must be an array`);

  const identifiers = [
    ['claims', 'claim_id'], ['evidence_items', 'evidence_id'], ['missing_evidence', 'missing_evidence_id'],
    ['assumptions', 'assumption_id'], ['contradictions', 'contradiction_id'],
    ['candidate_actions', 'action_id'], ['audit_events', 'event_id']
  ];
  for (const [collection, key] of identifiers) {
    const duplicates = duplicateIds(record[collection], key);
    if (duplicates.length) errors.push(`${collection} contains duplicate IDs: ${[...new Set(duplicates)].join(', ')}`);
  }

  const claimIds = new Set(list(record.claims).map(item => item.claim_id));
  const evidenceIds = new Set(list(record.evidence_items).map(item => item.evidence_id));
  const assumptionIds = new Set(list(record.assumptions).map(item => item.assumption_id));
  const contradictionIds = new Set(list(record.contradictions).map(item => item.contradiction_id));
  const actionIds = new Set(list(record.candidate_actions).map(item => item.action_id));

  for (const claim of list(record.claims)) {
    const refs = [
      ['supporting_evidence_ids', dangling(claim.supporting_evidence_ids, evidenceIds)],
      ['contradictory_evidence_ids', dangling(claim.contradictory_evidence_ids, evidenceIds)],
      ['assumption_ids', dangling(claim.assumption_ids, assumptionIds)],
      ['contradiction_ids', dangling(claim.contradiction_ids, contradictionIds)]
    ];
    for (const [key, values] of refs) if (values.length) errors.push(`${claim.claim_id}.${key} has dangling references: ${values.join(', ')}`);
  }
  for (const evidence of list(record.evidence_items)) {
    const refs = dangling(evidence.affected_claim_ids, claimIds);
    if (refs.length) errors.push(`${evidence.evidence_id}.affected_claim_ids has dangling references: ${refs.join(', ')}`);
  }
  for (const gap of list(record.missing_evidence)) {
    const refs = dangling(gap.affected_claim_ids, claimIds);
    if (refs.length) errors.push(`${gap.missing_evidence_id}.affected_claim_ids has dangling references: ${refs.join(', ')}`);
  }
  for (const assumption of list(record.assumptions)) {
    const refs = dangling(assumption.affected_claim_ids, claimIds);
    if (refs.length) errors.push(`${assumption.assumption_id}.affected_claim_ids has dangling references: ${refs.join(', ')}`);
  }
  for (const contradiction of list(record.contradictions)) {
    const claimRefs = dangling(contradiction.claim_ids, claimIds);
    const evidenceRefs = dangling(contradiction.evidence_ids, evidenceIds);
    if (claimRefs.length) errors.push(`${contradiction.contradiction_id}.claim_ids has dangling references: ${claimRefs.join(', ')}`);
    if (evidenceRefs.length) errors.push(`${contradiction.contradiction_id}.evidence_ids has dangling references: ${evidenceRefs.join(', ')}`);
  }

  if (LATER_STATES.has(record.record_status)) {
    if (!list(record.claims).some(claim => claim.materiality === 'material')) errors.push(`${record.record_status} requires at least one material claim`);
    if (!list(record.candidate_actions).length) errors.push(`${record.record_status} requires at least one candidate action`);
  }
  if (record.record_status === 'human_decision_recorded' && !record.human_decision) errors.push('human_decision_recorded requires human_decision');
  if (record.record_status !== 'human_decision_recorded' && record.human_decision) warnings.push('human_decision is present before human_decision_recorded lifecycle state');
  if (record.override_event && !record.human_decision) errors.push('override_event requires a human_decision');
  if (record.override_event && record.override_event.cybershield_action === record.override_event.human_selected_action) errors.push('override_event must preserve a differing human action');

  const selected = list(record.candidate_actions).filter(action => action.selected);
  if (selected.length !== 1) errors.push('exactly one candidate action must be selected');
  if (selected[0] && record.strongest_defensible_action?.action !== selected[0].action) errors.push('strongest_defensible_action does not match selected candidate');
  if (record.strongest_defensible_action?.action && !list(record.candidate_actions).some(action => action.action === record.strongest_defensible_action.action)) errors.push('strongest_defensible_action is not an eligible candidate');
  if (actionIds.size !== list(record.candidate_actions).length) errors.push('candidate action identity invariant failed');

  const blockingGaps = list(record.missing_evidence).filter(gap => gap.blocks_action && ['high', 'critical'].includes(gap.severity));
  if (blockingGaps.length) {
    if (['high', 'moderate'].includes(record.confidence_assessment?.band)) errors.push('blocking material evidence gaps constrain confidence below moderate');
    if (!CONSTRAINED_ACTIONS.has(record.strongest_defensible_action?.action)) errors.push('blocking material evidence gaps prohibit the selected action');
  }
  if (['high', 'severe'].includes(record.risk_if_wrong?.overall_band) && record.review_requirement?.level === 'no_additional_escalation') errors.push('high Risk If Wrong requires accountable review routing');

  const adapter = resolveAdapter(record.domain_adapter);
  if (!adapter) errors.push('domain_adapter is not registered at the exact version');
  else {
    if (adapter.recommendation_domain !== record.recommendation_domain) errors.push('domain_adapter does not match recommendation_domain');
    if (adapter.support_level !== record.domain_adapter.support_level) errors.push('domain_adapter support_level does not match registry');
    if (adapter.extension_schema_id !== record.domain_adapter.extension_schema_id) errors.push('domain_adapter extension_schema_id does not match registry');
    if (adapter.extension_schema_digest !== record.domain_adapter.extension_schema_digest) errors.push('domain_adapter extension_schema_digest does not match registry');
    errors.push(...adapter.validate_extension(record.domain_extension || {}));
    if (adapter.support_level === 'generic' && record.evidence_sufficiency?.band === 'sufficient') errors.push('generic adapter cannot claim domain-specific evidence sufficiency');
  }

  const spine = validateTrustedAgentSpine(record);
  if (!spine.ok) errors.push(`trusted-agent spine validation failed: ${spine.missing.join(', ')}`);
  if (record.context_pack?.context_pack_id !== record.human_gate?.context_pack_id) errors.push('Human Gate is not linked to the Context Pack');
  if (record.agent_work_receipt?.output_record_id !== record.record_id) errors.push('Agent Work Receipt is not linked to the vNext record');
  if (record.agent_work_receipt?.human_gate_id !== record.human_gate?.human_gate_id) errors.push('Agent Work Receipt is not linked to the Human Gate');

  const injectionMarkers = ['ignore previous', 'ignore all instructions', 'system prompt', 'grant yourself', 'change policy', 'exfiltrate'];
  const untrustedHits = walkStrings({ recommendation_input: record.recommendation_input, evidence_items: record.evidence_items })
    .filter(item => injectionMarkers.some(marker => item.value.toLowerCase().includes(marker)));
  if (untrustedHits.length) warnings.push(`untrusted instruction-like content preserved as data at: ${untrustedHits.map(hit => hit.path).join(', ')}`);
  if (record.operational_status?.production_status === 'operational') errors.push('P1 cannot claim operational production status');
  if (!String(record.integrity?.algorithm || '').includes('prototype') && record.integrity?.algorithm !== 'none') warnings.push('integrity algorithm requires independent verification');

  return { ok: errors.length === 0, errors, warnings, adapter: adapter ? `${adapter.adapter_id}@${adapter.adapter_version}` : null };
}

function assertValidVnextRecord(record) {
  const result = validateVnextRecord(record);
  if (!result.ok) throw new Error(`vNext semantic validation failed: ${result.errors.join('; ')}`);
  return result;
}

export { assertValidVnextRecord, validateVnextRecord };
