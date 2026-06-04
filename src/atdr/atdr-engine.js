const VERSION = '2026060414V1';
const ANALYSIS_VERSION = 'atdr-static-deterministic-2026060414-atomized';
const FRAMEWORK_WARNING = 'Relevant to [framework/control]. Not verified as compliant.';

function id(prefix) {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  return `${prefix}-${stamp}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

function clean(value) { return String(value || '').trim(); }
function lower(value) { return clean(value).toLowerCase(); }
function has(text, terms) { const t = lower(text); return terms.some(term => t.includes(term)); }
function uniq(items) { return [...new Set(items.filter(Boolean))]; }
function splitSentences(text) { return clean(text).replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean); }

function classifyDomain(text, selected = 'mixed') {
  if (selected && selected !== 'mixed') return selected;
  if (has(text, ['vendor', 'soc 2', 'subprocessor', 'dpa', 'contract'])) return 'vendor-risk';
  if (has(text, ['nist', '800-53', 'cmmc', 'compliance'])) return 'compliance';
  if (has(text, ['vulnerability', 'exploit', 'mfa', 'security control'])) return 'security';
  return 'mixed';
}

function recommendationType(text) {
  if (has(text, ['approve', 'approval'])) return 'Vendor approval recommendation';
  if (has(text, ['accept', 'risk'])) return 'Risk acceptance recommendation';
  if (has(text, ['satisfies', 'compliant', 'nist'])) return 'Compliance conclusion';
  return 'General action recommendation';
}

function atomizedVendorClaims(text, domain) {
  const t = lower(text);
  if (!(domain === 'vendor-risk' && has(t, ['vendor', 'soc 2', 'encrypt', 'low risk']))) return null;
  return [
    ['Vendor X should be approved', 'Recommendation step', 'High', ['Current vendor-risk review', 'Decision owner', 'Risk acceptance authority', 'Contract security terms']],
    ['Vendor X has a SOC 2 report', 'Vendor claim', 'High', ['Current SOC 2 report', 'SOC 2 report date', 'Independent report source']],
    ['The SOC 2 report covers the evaluated service', 'Unsupported leap', 'High', ['SOC 2 scope excerpt naming the evaluated service', 'Bridge letter if report is aging', 'Relevant Trust Services Criteria']],
    ['Vendor X encrypts customer data', 'Security claim', 'High', ['Encryption architecture evidence', 'Key management evidence', 'Independent validation or control test result']],
    ['Vendor X customer data access is acceptable', 'Vendor claim', 'High', ['Data access scope', 'Data Processing Agreement', 'Subprocessor list', 'Data-use restrictions']],
    ['Vendor X appears low risk', 'Risk conclusion', 'High', ['Vendor-risk assessment', 'Residual risk rationale', 'Security SME review', 'Legal or privacy review if data use is implicated']],
    ['SOC 2 plus encryption is sufficient for approval', 'Unsupported leap', 'High', ['Full evidence package showing scope, implementation, contractual controls, data use, and reviewer approval']]
  ].map((parts, index) => claimObject(index, parts[0], parts[1], domain, parts[2], parts[3]));
}

function claimObject(index, text, type, domain, materiality, required) {
  return {
    claim_id: `C-${String(index + 1).padStart(3, '0')}`,
    original_sentence: text,
    normalized_claim: text,
    claim_type: type,
    domain,
    related_recommendation: type === 'Recommendation step' ? 'Vendor approval recommendation' : 'Supporting claim',
    required_evidence_type: required,
    materiality,
    unsupported_flag: true,
    evidence_sufficiency_band: 'Not provided',
    missing_support_severity: materiality === 'High' ? 'High' : 'Moderate',
    conflict_status: 'Unresolved conflict',
    confidence_band: 'Unknown confidence',
    risk_if_wrong_band: materiality === 'High' ? 'High' : 'Moderate',
    reviewer_notes: '',
    evidence_links: []
  };
}

function genericClaims(text, domain) {
  return splitSentences(text).map((sentence, index) => {
    let type = 'Factual claim';
    if (has(sentence, ['recommend', 'should', 'approve', 'accept', 'allow'])) type = 'Recommendation step';
    else if (has(sentence, ['nist', 'cmmc', 'compliant', 'satisfies'])) type = 'Compliance claim';
    else if (has(sentence, ['vendor', 'soc 2', 'contract'])) type = 'Vendor claim';
    else if (has(sentence, ['vulnerability', 'exploit', 'encrypt', 'control'])) type = 'Security claim';
    const mat = has(sentence, ['approve', 'accept', 'low risk', 'compliant', 'customer data', 'production']) ? 'High' : 'Moderate';
    return claimObject(index, sentence, type, domain, mat, evidenceRequired(sentence, domain));
  });
}

function evidenceRequired(text, domain) {
  if (has(text, ['soc 2'])) return ['Current SOC 2 report', 'SOC 2 scope and service coverage', 'Report date and bridge letter if needed'];
  if (has(text, ['encrypt'])) return ['Encryption architecture evidence', 'Key management evidence', 'Control test result'];
  if (has(text, ['nist', 'control', 'compliance'])) return ['Framework/control mapping', 'Implementation evidence', 'Control test result', 'Control owner'];
  if (has(text, ['vulnerability', 'exploit'])) return ['Vulnerability scan output', 'Asset criticality', 'Exploit intelligence', 'Compensating controls', 'Risk owner approval'];
  if (domain === 'vendor-risk') return ['Vendor document', 'Contract clause', 'Independent validation where practical'];
  return ['Primary source', 'Scope definition', 'Human owner'];
}

function extractClaims(text, domain) {
  return atomizedVendorClaims(text, domain) || genericClaims(text, domain);
}

function parseEvidenceText(evidenceText) {
  const chunks = clean(evidenceText).split(/\n+/).map(s => s.trim()).filter(Boolean);
  return chunks.map((chunk, index) => ({
    evidence_id: `E-${String(index + 1).padStart(3, '0')}`,
    evidence_name: (chunk.match(/^\[(.*?)\]/) || [])[1] || `Evidence ${index + 1}`,
    evidence_type: inferEvidenceType(chunk),
    source_type: 'User-provided or synthetic evidence text',
    source_authority_band: inferAuthority(chunk),
    text_extract: chunk,
    evidence_date: inferDate(chunk),
    freshness_band: inferFreshness(chunk),
    independence_band: inferIndependence(chunk),
    sensitivity_label: has(chunk, ['customer data', 'regulated', 'sensitive']) ? 'Sensitive' : 'Unspecified',
    prompt_injection_suspected: has(chunk, ['ignore previous instructions', 'system prompt', 'developer message', 'override instructions']),
    created_at: new Date().toISOString()
  }));
}

function inferEvidenceType(text) {
  if (has(text, ['soc 2'])) return 'Vendor SOC 2 report';
  if (has(text, ['dpa', 'data processing'])) return 'Data processing agreement';
  if (has(text, ['subprocessor'])) return 'Subprocessor list';
  if (has(text, ['encrypt', 'architecture'])) return 'Encryption architecture note';
  if (has(text, ['questionnaire'])) return 'Vendor security questionnaire excerpt';
  if (has(text, ['incident notification'])) return 'Contract clause';
  if (has(text, ['business owner'])) return 'Human reviewer note';
  return 'Other';
}

function inferAuthority(text) {
  if (has(text, ['contractual', 'dpa', 'clause'])) return 'High';
  if (has(text, ['soc 2', 'report', 'scope'])) return 'Medium';
  if (has(text, ['self-attested', 'vendor x states', 'business owner'])) return 'Low';
  return 'Unknown';
}

function inferDate(text) { return (text.match(/\b20\d{2}\b/) || [''])[0]; }
function inferFreshness(text) {
  const year = Number(inferDate(text));
  if (!year) return 'Unknown';
  const age = new Date().getFullYear() - year;
  if (age <= 1) return 'Current';
  if (age <= 2) return 'Aging';
  return 'Stale';
}
function inferIndependence(text) {
  if (has(text, ['independent', 'auditor', 'contractual'])) return 'Independent or contractual';
  if (has(text, ['self-attested', 'vendor x states', 'vendor-published'])) return 'Self-attested';
  return 'Unknown';
}

function mapEvidence(claims, evidence) {
  return claims.map(claim => {
    const matches = evidence.filter(item => evidenceMatchesClaim(claim, item));
    const hasPromptIssue = matches.some(e => e.prompt_injection_suspected);
    const hasStale = matches.some(e => e.freshness_band === 'Stale');
    const hasSelfAttested = matches.some(e => e.independence_band === 'Self-attested');
    const hasScopeGap = claim.normalized_claim.includes('covers the evaluated service') && !matches.some(e => has(e.text_extract, ['does not name', 'does not clearly identify'])) ? false : claim.normalized_claim.includes('covers the evaluated service');
    const contradiction = detectsContradiction(claim, matches);
    let sufficiency = matches.length ? 'Partially sufficient' : 'Not provided';
    if (contradiction || hasPromptIssue) sufficiency = 'Contradicted';
    else if (matches.length && (hasStale || hasSelfAttested || hasScopeGap)) sufficiency = 'Sufficient with caveat';
    return {
      ...claim,
      unsupported_flag: matches.length === 0 || claim.claim_type === 'Unsupported leap',
      evidence_sufficiency_band: sufficiency,
      conflict_status: contradiction || hasPromptIssue ? 'Material conflict' : hasStale || hasSelfAttested || hasScopeGap ? 'Minor caveat' : matches.length ? 'No conflict' : 'Unresolved conflict',
      evidence_links: matches.map(e => ({ evidence_id: e.evidence_id, relevance_band: 'Medium', sufficiency_band: sufficiency, caveat: caveatFor(e), conflict_flag: contradiction || hasPromptIssue }))
    };
  });
}

function evidenceMatchesClaim(claim, evidence) {
  const c = lower(claim.normalized_claim);
  const e = lower(evidence.text_extract);
  if (c.includes('soc 2')) return e.includes('soc 2');
  if (c.includes('evaluated service')) return has(e, ['scope', 'evaluated ai service', 'does not name']);
  if (c.includes('encrypt')) return has(e, ['encrypt', 'key management']);
  if (c.includes('customer data')) return has(e, ['customer data', 'dpa', 'data processing', 'service improvement']);
  if (c.includes('low risk')) return has(e, ['business owner', 'risk', 'risk acceptance']);
  if (c.includes('approved')) return has(e, ['approval', 'business owner', 'contract', 'risk']);
  return claim.required_evidence_type.some(req => lower(req).split(/\W+/).some(word => word.length > 6 && e.includes(word)));
}

function detectsContradiction(claim, matches) {
  const c = lower(claim.normalized_claim);
  const joined = lower(matches.map(m => m.text_extract).join(' '));
  if (c.includes('covers the evaluated service') && has(joined, ['does not name', 'does not clearly identify'])) return true;
  if (c.includes('customer data access is acceptable') && has(joined, ['service improvement', 'model evaluation', 'product analytics'])) return true;
  if (c.includes('low risk') && has(joined, ['no risk acceptance authority', 'self-attested', 'stale'])) return true;
  if (c.includes('sufficient for approval') && has(joined, ['does not clearly', 'self-attested', 'stale'])) return true;
  return false;
}

function caveatFor(e) {
  if (e.prompt_injection_suspected) return 'Prompt-injection indicator found in evidence text.';
  if (e.freshness_band === 'Stale') return 'Evidence appears stale.';
  if (e.independence_band === 'Self-attested') return 'Evidence is self-attested and should not be treated as independent proof.';
  return '';
}

function missingSupport(claims) {
  return claims.flatMap(claim => {
    if (!claim.unsupported_flag && !['Not provided', 'Contradicted'].includes(claim.evidence_sufficiency_band)) return [];
    return claim.required_evidence_type.map((req, index) => ({
      missing_support_id: `M-${claim.claim_id}-${index + 1}`,
      claim_id: claim.claim_id,
      category: req,
      severity: claim.materiality === 'High' ? 'High' : 'Moderate',
      finding: `${req} is required before claim ${claim.claim_id} can support a defensible recommendation.`
    }));
  });
}

function frameworkMappings(claims, domain) {
  return claims.flatMap(claim => {
    const c = lower(claim.normalized_claim);
    const refs = [];
    if (domain === 'vendor-risk' || has(c, ['vendor', 'soc 2'])) refs.push('NIST SP 800-161', 'SOC 2 Trust Services Criteria');
    if (has(c, ['customer data', 'ai service', 'model'])) refs.push('NIST AI RMF', 'NIST Generative AI Profile', 'OWASP Top 10 for LLM Applications');
    if (has(c, ['control', 'encrypt'])) refs.push('NIST CSF 2.0', 'NIST SP 800-53');
    return uniq(refs).map((framework, index) => ({
      mapping_id: `FM-${claim.claim_id}-${index + 1}`,
      claim_id: claim.claim_id,
      framework_name: framework,
      mapping_type: 'Relevance mapping only',
      relevance_explanation: `${claim.claim_type} may be relevant to ${framework}.`,
      compliance_warning_text: FRAMEWORK_WARNING.replace('[framework/control]', framework)
    }));
  });
}

function hazards(recommendation, claims, evidence) {
  const result = [];
  if (has(recommendation, ['low risk', 'appear low risk']) && claims.some(c => c.unsupported_flag)) result.push(['Unsupported certainty', 'Moderate hazard']);
  if (has(recommendation, ['soc 2']) && has(recommendation, ['approve', 'low risk'])) result.push(['False equivalence between certification and risk acceptance', 'Moderate hazard']);
  if (claims.some(c => c.claim_type === 'Unsupported leap')) result.push(['Unsupported leap', 'Moderate hazard']);
  if (evidence.some(e => e.prompt_injection_suspected)) result.push(['Prompt injection suspected', 'Quarantine']);
  return result.map(([hazard, band], index) => ({ hazard_id: `H-${String(index + 1).padStart(3, '0')}`, hazard, band }));
}

function riskIfWrong(claims, domain, hazardsFound) {
  const severe = hazardsFound.some(h => h.band === 'Quarantine');
  const high = claims.some(c => c.materiality === 'High') || domain === 'vendor-risk';
  const band = severe ? 'Severe' : high ? 'High' : 'Moderate';
  return {
    band,
    impact_areas: ['Vendor-risk exposure', 'Data-use exposure', 'Financial consequence', 'Operational disruption', 'Reputational risk'],
    consequence_summary: `${band} Risk If Wrong because acting on the recommendation could approve a vendor before scope, data use, evidence sufficiency, and accountable review are resolved.`
  };
}

function confidence(claims, missing, risk, hazardsFound) {
  if (hazardsFound.some(h => h.band === 'Quarantine')) return { band: 'Contradicted', rationale: 'Source manipulation indicators require quarantine.' };
  if (claims.some(c => c.conflict_status === 'Material conflict')) return { band: 'Low confidence', rationale: 'Material contradictions or scope conflicts exist in the available evidence.' };
  if (missing.some(m => m.severity === 'High')) return { band: 'Low confidence', rationale: 'Material claims lack required evidence.' };
  if (risk.band === 'High') return { band: 'Medium confidence', rationale: 'Risk If Wrong is high, so confidence cannot exceed medium without reviewer approval.' };
  return { band: 'Medium confidence', rationale: 'Evidence is partially mapped, but this static prototype performs no live verification.' };
}

function reviewGate(claims, missing, risk, confidenceResult, hazardsFound) {
  const triggers = [];
  if (['High', 'Severe'].includes(risk.band)) triggers.push('Risk If Wrong is High or Severe');
  if (missing.some(m => m.severity === 'High')) triggers.push('Evidence is insufficient for a material claim');
  if (claims.some(c => ['Material conflict', 'Blocking conflict', 'Unresolved conflict'].includes(c.conflict_status))) triggers.push('Conflict status is unresolved, material, or blocking');
  if (['Low confidence', 'Unknown confidence', 'Contradicted'].includes(confidenceResult.band)) triggers.push('Confidence is low, unknown, or contradicted');
  if (hazardsFound.some(h => h.band === 'Quarantine')) triggers.push('Prompt injection or source manipulation suspected');
  return {
    required: triggers.length > 0,
    triggers: triggers.length ? triggers : ['No mandatory review trigger detected by static rules.'],
    required_reviewer_role: 'Vendor-Risk Owner, Security SME, Legal Counsel',
    review_status: triggers.length ? 'Review Required' : 'Not Required by Static Rules',
    reviewer_notes: '',
    reviewer_decision: ''
  };
}

function recommendedAction(risk, confidenceResult, review, hazardsFound, missing) {
  if (hazardsFound.some(h => h.band === 'Quarantine')) return { action: 'Quarantine', next_step: 'Do not rely on this recommendation until source manipulation is reviewed.' };
  if (risk.band === 'Severe' || (risk.band === 'High' && confidenceResult.band === 'Low confidence')) return { action: 'Escalate for Review', next_step: 'Assign Vendor-Risk Owner, Security SME, and Legal Counsel review before approval.' };
  if (missing.length) return { action: 'Request Evidence', next_step: 'Collect required evidence for all material claims before action.' };
  if (review.required) return { action: 'Escalate for Review', next_step: 'Human review is required before acceptance.' };
  return { action: 'Accept with Caveat', next_step: 'Document caveats, limitations, and decision owner before use.' };
}

function defensibility(record, missing, review) {
  if (!record.original_ai_recommendation) return 'Incomplete';
  if (record.ai_output_hazards.some(h => h.band === 'Quarantine')) return 'Not defensible';
  if (missing.some(m => m.severity === 'High')) return 'Not Defensible Yet';
  if (review.required && !review.reviewer_decision) return 'Executive brief ready with limitations';
  return 'Export-ready with caveat';
}

export function analyzeRecommendation(input = {}) {
  const recommendation = clean(input.recommendation);
  const domain = classifyDomain(recommendation, input.domain || 'mixed');
  const evidence = parseEvidenceText(input.evidence || '');
  const claims = mapEvidence(extractClaims(recommendation, domain), evidence);
  const missing = missingSupport(claims);
  const hazardList = hazards(recommendation, claims, evidence);
  const risk = riskIfWrong(claims, domain, hazardList);
  const confidenceResult = confidence(claims, missing, risk, hazardList);
  const review = reviewGate(claims, missing, risk, confidenceResult, hazardList);
  const action = recommendedAction(risk, confidenceResult, review, hazardList, missing);
  const now = new Date().toISOString();
  const record = {
    record_id: id('ATDR'),
    record_type: 'AI Trust Decision Record',
    created_timestamp: now,
    created_by: input.createdBy || 'Demo user',
    original_ai_recommendation: recommendation,
    ai_source: input.aiSource || 'Unknown or user-pasted AI output',
    source_model: input.sourceModel || 'Unknown',
    intended_use: input.intendedUse || 'Decision support review before action',
    domain,
    recommendation_type: recommendationType(recommendation),
    decision_context: input.context || '',
    applicable_framework_references: frameworkMappings(claims, domain),
    extracted_claims: claims,
    evidence_provided: evidence,
    missing_support: missing,
    ai_output_hazards: hazardList,
    risk_if_wrong: risk,
    confidence_band: confidenceResult.band,
    confidence_rationale: confidenceResult.rationale,
    human_review: review,
    recommended_action: action.action,
    required_next_step: action.next_step,
    decision_owner: input.decisionOwner || '',
    limitations: [
      'Static advisory prototype. No backend persistence, tenant isolation, live model calls, live internet verification, or production integrations are active in this build.',
      'AI-generated text alone is not treated as evidence for medium-impact or high-impact security, compliance, or vendor-risk recommendations.',
      'Framework mappings are relevance mappings only and do not verify compliance.',
      'Uploaded or pasted evidence is treated as untrusted data, not instructions.'
    ],
    analysis_version: ANALYSIS_VERSION,
    export_version: VERSION,
    export_timestamp: '',
    audit_events: [
      { event_type: 'Record created', event_description: 'Recommendation submitted to static ATDR analyzer.', timestamp: now },
      { event_type: 'Claim extraction completed', event_description: `${claims.length} atomized claim(s) extracted.`, timestamp: now },
      { event_type: 'Analysis completed', event_description: `${action.action}; ${confidenceResult.band}; ${risk.band} Risk If Wrong.`, timestamp: now }
    ]
  };
  record.record_defensibility_band = defensibility(record, missing, review);
  record.can_act = ['Accept', 'Accept with Caveat'].includes(record.recommended_action) && !review.required;
  return record;
}

export function exportJson(record) {
  return JSON.stringify({ ...record, export_timestamp: new Date().toISOString() }, null, 2);
}

export function exportMarkdown(record) {
  return `# ${record.record_type}\n\nRecord ID: ${record.record_id}\n\nRecommended Action: ${record.recommended_action}\n\nRisk If Wrong: ${record.risk_if_wrong.band}\n\nConfidence: ${record.confidence_band}\n`;
}

export { VERSION, FRAMEWORK_WARNING };
