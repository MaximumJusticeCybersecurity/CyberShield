const MODEL_CONTRACT_VERSION = '2026060414V1';

const commonContractFields = {
  analysis_version: 'atdr-static-deterministic-2026060414',
  execution_mode: 'deterministic-simulated',
  production_ready: false,
  live_llm_enabled: false,
  limitations: [
    'Static prototype implementation.',
    'No live LLM call is made.',
    'No external verification is performed.',
    'Outputs are deterministic demo outputs and must remain reviewable by a human.'
  ]
};

const contracts = [
  {
    name: 'Recommendation Intake and Classification Model',
    version: MODEL_CONTRACT_VERSION,
    purpose: 'Classify the recommendation before evaluation.',
    inputs: ['recommendation text', 'domain', 'AI source', 'source model', 'intended use', 'decision context'],
    outputs: ['recommendation type', 'domain', 'intended reliance level', 'initial Risk If Wrong', 'likely review requirement'],
    allowed_labels: ['security', 'compliance', 'vendor-risk', 'mixed'],
    failure_behavior: 'Mark classification incomplete and keep record in Intake state.',
    ...commonContractFields
  },
  {
    name: 'Claim Extraction and Atomization Model',
    version: MODEL_CONTRACT_VERSION,
    purpose: 'Break the recommendation into discrete evaluable claims.',
    inputs: ['recommendation text', 'domain'],
    outputs: ['claim id', 'original sentence', 'normalized claim', 'claim type', 'materiality', 'unsupported flag'],
    allowed_labels: ['Factual claim', 'Technical claim', 'Security claim', 'Control claim', 'Compliance claim', 'Vendor claim', 'Risk conclusion', 'Recommendation step', 'Unsupported leap'],
    failure_behavior: 'Do not proceed to evidence mapping unless at least one claim is extracted.',
    ...commonContractFields
  },
  {
    name: 'Evidence Requirement Mapping Model',
    version: MODEL_CONTRACT_VERSION,
    purpose: 'Determine what evidence is required to support each material claim.',
    inputs: ['claim list', 'domain', 'recommendation type'],
    outputs: ['required evidence type', 'minimum evidence threshold', 'preferred evidence source', 'independent evidence requirement'],
    allowed_labels: ['required', 'preferred', 'independent-required', 'human-review-required'],
    failure_behavior: 'Mark material claims as missing required evidence.',
    ...commonContractFields
  },
  {
    name: 'Evidence Sufficiency Model',
    version: MODEL_CONTRACT_VERSION,
    purpose: 'Assess whether available evidence supports each claim.',
    inputs: ['claims', 'evidence items', 'claim-evidence links'],
    outputs: ['sufficiency band', 'caveat', 'support status'],
    allowed_labels: ['Sufficient', 'Sufficient with caveat', 'Partially sufficient', 'Insufficient', 'Contradicted', 'Not provided'],
    failure_behavior: 'Default material claims to Not provided or Insufficient.',
    ...commonContractFields
  },
  {
    name: 'Contradiction and Conflict Detection Model',
    version: MODEL_CONTRACT_VERSION,
    purpose: 'Identify conflicts between claims, evidence, assumptions, and mappings.',
    inputs: ['claims', 'evidence items', 'framework mappings'],
    outputs: ['conflict band', 'conflict type', 'explanation'],
    allowed_labels: ['No conflict', 'Minor caveat', 'Material conflict', 'Blocking conflict', 'Unresolved conflict'],
    failure_behavior: 'Use Unresolved conflict for affected claims.',
    ...commonContractFields
  },
  {
    name: 'Risk If Wrong Model',
    version: MODEL_CONTRACT_VERSION,
    purpose: 'Classify consequence if the recommendation is acted on and wrong.',
    inputs: ['claims', 'domain', 'evidence sufficiency', 'conflicts'],
    outputs: ['Risk If Wrong band', 'impact areas', 'consequence summary'],
    allowed_labels: ['Severe', 'High', 'Moderate', 'Low', 'Minimal'],
    failure_behavior: 'Default to High when material vendor, security, or compliance evidence is missing.',
    ...commonContractFields
  },
  {
    name: 'Confidence Band Model',
    version: MODEL_CONTRACT_VERSION,
    purpose: 'Assign confidence based on evidence, uncertainty, gaps, conflicts, and review state.',
    inputs: ['claims', 'evidence sufficiency', 'missing support', 'Risk If Wrong', 'hazards'],
    outputs: ['confidence band', 'confidence rationale'],
    allowed_labels: ['High confidence', 'Medium confidence', 'Low confidence', 'Unknown confidence', 'Contradicted'],
    failure_behavior: 'Default to Unknown confidence.',
    ...commonContractFields
  },
  {
    name: 'Human Review Gate Model',
    version: MODEL_CONTRACT_VERSION,
    purpose: 'Determine whether human review is required before action.',
    inputs: ['Risk If Wrong', 'confidence band', 'missing support', 'conflicts', 'domain'],
    outputs: ['review required', 'review triggers', 'required reviewer role'],
    allowed_labels: ['required', 'not-required-by-static-rules'],
    failure_behavior: 'Require human review.',
    ...commonContractFields
  },
  {
    name: 'Recommended Action Model',
    version: MODEL_CONTRACT_VERSION,
    purpose: 'Translate the evaluation into a clear recommended action.',
    inputs: ['Risk If Wrong', 'confidence band', 'review gate', 'hazards', 'missing support'],
    outputs: ['recommended action', 'required next step'],
    allowed_labels: ['Accept', 'Accept with Caveat', 'Request Evidence', 'Revise Recommendation', 'Escalate for Review', 'Reject', 'Quarantine'],
    failure_behavior: 'Escalate for Review.',
    ...commonContractFields
  },
  {
    name: 'Record Defensibility Model',
    version: MODEL_CONTRACT_VERSION,
    purpose: 'Determine whether the record is complete enough to export.',
    inputs: ['record', 'claims', 'evidence', 'missing support', 'review state', 'limitations'],
    outputs: ['record defensibility band', 'missing record fields'],
    allowed_labels: ['Export-ready', 'Export-ready with caveat', 'Executive brief ready with limitations', 'Not Defensible Yet', 'Not defensible', 'Incomplete'],
    failure_behavior: 'Mark record Incomplete.',
    ...commonContractFields
  }
];

export function getModelContracts() {
  return contracts.map(contract => ({ ...contract }));
}

export function getModelContract(name) {
  return contracts.find(contract => contract.name === name) || null;
}

export { MODEL_CONTRACT_VERSION };
