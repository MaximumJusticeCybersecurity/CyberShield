const VERSION = '2026060414V1';
const ANALYSIS_VERSION = 'atdr-static-deterministic-2026060414';

const FRAMEWORK_WARNING = 'Relevant to [framework/control]. Not verified as compliant.';

const REVIEW_TRIGGERS = [
  'Risk If Wrong is High or Severe',
  'Evidence is insufficient for a material claim',
  'Compliance posture may be affected',
  'Vendor approval or sensitive data use may be affected',
  'Cyber risk acceptance may be involved',
  'Production security controls may be affected',
  'Legal, regulatory, contractual, audit, or reputational exposure may exist'
];

function id(prefix) {
  const now = new Date();
  const stamp = now.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  return `${prefix}-${stamp}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

function splitSentences(text) {
  return (text || '')
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+|\n+/)
    .map(s => s.trim())
    .filter(Boolean);
}

function includesAny(text, terms) {
  const lower = (text || '').toLowerCase();
  return terms.some(term => lower.includes(term));
}

function classifyDomain(text, selectedDomain) {
  if (selectedDomain && selectedDomain !== 'mixed') return selectedDomain;
  const t = (text || '').toLowerCase();
  const hits = {
    security: ['vulnerability', 'exploit', 'mfa', 'security', 'control', 'production', 'encrypt', 'risk'],
    compliance: ['nist', '800-53', 'cmmc', 'soc 2', 'policy', 'compliance', 'audit', 'control satisfies'],
    'vendor-risk': ['vendor', 'third party', 'soc 2', 'subprocessor', 'contract', 'dpa', 'data processing', 'customer data']
  };
  const ranked = Object.entries(hits).map(([domain, terms]) => [domain, terms.filter(term => t.includes(term)).length]).sort((a, b) => b[1] - a[1]);
  return ranked[0][1] > 0 ? ranked[0][0] : 'mixed';
}

function recommendationType(text) {
  const t = (text || '').toLowerCase();
  if (includesAny(t, ['approve', 'approving', 'approval'])) return 'Approval recommendation';
  if (includesAny(t, ['accept', 'accepted', 'risk acceptance'])) return 'Risk acceptance recommendation';
  if (includesAny(t, ['satisfies', 'compliant', 'compliance'])) return 'Compliance conclusion';
  if (includesAny(t, ['renew', 'renewal'])) return 'Renewal recommendation';
  if (includesAny(t, ['allow', 'access'])) return 'Access recommendation';
  return 'General action recommendation';
}

function claimType(sentence, domain) {
  const t = sentence.toLowerCase();
  if (includesAny(t, ['recommend', 'should', 'approve', 'accept', 'allow', 'renew'])) return 'Recommendation step';
  if (includesAny(t, ['nist', 'cmmc', 'soc 2', 'iso', 'compliant', 'satisfies'])) return 'Compliance claim';
  if (includesAny(t, ['vendor', 'subprocessor', 'contract', 'dpa'])) return 'Vendor claim';
  if (includesAny(t, ['vulnerability', 'exploit', 'mfa', 'control', 'encrypt', 'production'])) return domain === 'compliance' ? 'Control claim' : 'Security claim';
  if (includesAny(t, ['because', 'therefore', 'so that', 'as a result'])) return 'Causal claim';
  if (includesAny(t, ['likely', 'unlikely', 'expected', 'predict'])) return 'Predictive claim';
  return 'Factual claim';
}

function materiality(sentence, type) {
  const t = sentence.toLowerCase();
  if (includesAny(t, ['approve', 'accept', 'reject', 'low risk', 'compliant', 'satisfies', 'customer data', 'production', 'sensitive', 'regulated'])) return 'High';
  if (['Compliance claim', 'Vendor claim', 'Security claim', 'Control claim', 'Risk conclusion'].includes(type)) return 'High';
  if (includesAny(t, ['because', 'evidence', 'soc 2', 'encrypt', 'policy'])) return 'Moderate';
  return 'Low';
}

function requiredEvidenceFor(sentence, domain, type) {
  const t = sentence.toLowerCase();
  if (includesAny(t, ['soc 2'])) return ['Current SOC 2 report', 'SOC 2 scope and service coverage', 'Relevant Trust Services Criteria', 'Report date and bridge letter if needed'];
  if (includesAny(t, ['encrypt', 'encryption'])) return ['Encryption architecture evidence', 'Key management evidence', 'Contract or security whitepaper cross-check'];
  if (includesAny(t, ['vendor', 'approve'])) return ['Vendor security review', 'Data access scope', 'DPA or contract security terms', 'Incident notification terms', 'Subprocessor list'];
  if (includesAny(t, ['nist', '800-53', 'control', 'satisfies', 'compliance'])) return ['Framework/control mapping', 'Implementation evidence', 'Control test result', 'Control owner', 'Review date'];
  if (includesAny(t, ['vulnerability', 'exploit', 'low risk'])) return ['Vulnerability scan output', 'Asset criticality', 'Exploit intelligence', 'Exposure status', 'Compensating controls', 'Risk owner approval'];
  if (domain === 'security') return ['Security policy or control evidence', 'Implementation evidence', 'Owner approval'];
  if (domain === 'compliance') return ['Policy reference', 'Implementation evidence', 'Test result', 'Control owner'];
  if (domain === 'vendor-risk') return ['Vendor document', 'Contract clause', 'Independent validation where practical'];
  return ['Primary source', 'Scope definition', 'Human owner'];
}

function extractClaims(recommendation, domain) {
  const sentences = splitSentences(recommendation);
  return sentences.map((sentence, index) => {
    const type = claimType(sentence, domain);
    const mat = materiality(sentence, type);
    return {
      claim_id: `C-${String(index + 1).padStart(3, '0')}`,
      original_sentence: sentence,
      normalized_claim: sentence.replace(/^AI\s+(recommends|says|claims)\s+/i, '').trim(),
      claim_type: type,
      domain,
      related_recommendation: recommendationType(recommendation),
      required_evidence_type: requiredEvidenceFor(sentence, domain, type),
      materiality: mat,
      unsupported_flag: true,
      evidence_sufficiency_band: 'Not provided',
      missing_support_severity: mat === 'High' ? 'High' : mat === 'Moderate' ? 'Moderate' : 'Low',
      conflict_status: 'Unresolved conflict',
      confidence_band: 'Unknown confidence',
      risk_if_wrong_band: mat === 'High' ? 'High' : 'Moderate',
      reviewer_notes: ''
    };
  });
}

function parseEvidence(evidenceText) {
  const chunks = splitSentences(evidenceText);
  return chunks.map((chunk, index) => ({
    evidence_id: `E-${String(index + 1).padStart(3, '0')}`,
    evidence_name: `User-provided evidence ${index + 1}`,
    evidence_type: inferEvidenceType(chunk),
    source_type: 'User-provided pasted evidence',
    source_authority_band: inferAuthority(chunk),
    text_extract: chunk,
    evidence_date: inferDate(chunk),
    freshness_band: inferFreshness(chunk),
    independence_band: inferIndependence(chunk),
    sensitivity_label: inferSensitivity(chunk),
    prompt_injection_suspected: detectPromptInjection(chunk),
    created_at: new Date().toISOString()
  }));
}

function inferEvidenceType(text) {
  const t = text.toLowerCase();
  if (t.includes('soc 2')) return 'Vendor SOC 2 report';
  if (includesAny(t, ['policy', 'standard'])) return 'Security policy';
  if (includesAny(t, ['scan', 'cve', 'vulnerability'])) return 'Vulnerability scan output';
  if (includesAny(t, ['contract', 'dpa', 'data processing'])) return 'Contract clause';
  if (includesAny(t, ['test', 'validated', 'evidence'])) return 'Control test result';
  return 'Other';
}

function inferAuthority(text) {
  const t = text.toLowerCase();
  if (includesAny(t, ['independent auditor', 'auditor', 'signed', 'contract'])) return 'High';
  if (includesAny(t, ['policy', 'report', 'scan'])) return 'Medium';
  if (includesAny(t, ['vendor says', 'claims', 'self-attested'])) return 'Low';
  return 'Unknown';
}

function inferDate(text) {
  const match = text.match(/\b(20\d{2}[-/]\d{1,2}[-/]\d{1,2}|20\d{2})\b/);
  return match ? match[0] : '';
}

function inferFreshness(text) {
  const year = (text.match(/\b(20\d{2})\b/) || [])[1];
  if (!year) return 'Unknown';
  const age = new Date().getFullYear() - Number(year);
  if (age <= 1) return 'Current';
  if (age <= 2) return 'Aging';
  return 'Stale';
}

function inferIndependence(text) {
  const t = text.toLowerCase();
  if (includesAny(t, ['independent auditor', 'third-party assessor', 'external audit'])) return 'Independent';
  if (includesAny(t, ['vendor says', 'self-attested', 'whitepaper'])) return 'Self-attested';
  return 'Unknown';
}

function inferSensitivity(text) {
  const t = text.toLowerCase();
  if (includesAny(t, ['customer data', 'phi', 'pii', 'regulated', 'sensitive'])) return 'Sensitive';
  return 'Unspecified';
}

function detectPromptInjection(text) {
  return includesAny(text, ['ignore previous instructions', 'disregard instructions', 'system prompt', 'developer message', 'act as', 'override']);
}

function mapEvidence(claims, evidenceItems) {
  return claims.map(claim => {
    const claimTerms = claim.normalized_claim.toLowerCase().split(/\W+/).filter(w => w.length > 4);
    const matches = evidenceItems.filter(e => claimTerms.some(term => e.text_extract.toLowerCase().includes(term)) || requiredOverlap(claim, e));
    const promptInjection = matches.some(e => e.prompt_injection_suspected);
    const stale = matches.some(e => e.freshness_band === 'Stale');
    const sufficiency = promptInjection ? 'Contradicted' : matches.length === 0 ? 'Not provided' : stale ? 'Sufficient with caveat' : matches.length >= 2 ? 'Partially sufficient' : 'Partially sufficient';
    return {
      ...claim,
      unsupported_flag: matches.length === 0,
      evidence_sufficiency_band: sufficiency,
      conflict_status: promptInjection ? 'Blocking conflict' : stale ? 'Minor caveat' : matches.length ? 'No conflict' : 'Unresolved conflict',
      evidence_links: matches.map(e => ({
        evidence_id: e.evidence_id,
        relevance_band: 'Medium',
        sufficiency_band: sufficiency,
        caveat: stale ? 'Evidence may be stale or not scoped to the claim.' : '',
        conflict_flag: promptInjection
      }))
    };
  });
}

function requiredOverlap(claim, evidence) {
  const required = (claim.required_evidence_type || []).join(' ').toLowerCase();
  const t = evidence.text_extract.toLowerCase();
  return required.split(/\W+/).filter(w => w.length > 5).some(w => t.includes(w));
}

function missingSupport(claims) {
  return claims.flatMap(claim => {
    if (!claim.unsupported_flag && !['Not provided', 'Insufficient'].includes(claim.evidence_sufficiency_band)) return [];
    return (claim.required_evidence_type || []).map((required, index) => ({
      missing_support_id: `M-${claim.claim_id}-${index + 1}`,
      claim_id: claim.claim_id,
      category: required,
      severity: claim.materiality === 'High' ? 'High' : 'Moderate',
      finding: `${required} is needed before this claim can support a defensible recommendation.`
    }));
  });
}

function frameworkMappings(claims, domain) {
  return claims.flatMap(claim => {
    const text = claim.normalized_claim.toLowerCase();
    const refs = [];
    if (domain === 'security' || includesAny(text, ['vulnerability', 'control', 'encrypt'])) refs.push('NIST CSF 2.0', 'NIST SP 800-53');
    if (domain === 'compliance' || includesAny(text, ['nist', '800-53', 'compliance'])) refs.push('NIST SP 800-53');
    if (domain === 'vendor-risk' || includesAny(text, ['vendor', 'soc 2', 'subprocessor'])) refs.push('NIST SP 800-161', 'SOC 2 Trust Services Criteria');
    if (includesAny(text, ['ai', 'model', 'prompt'])) refs.push('NIST AI RMF', 'NIST Generative AI Profile', 'OWASP Top 10 for LLM Applications');
    return [...new Set(refs)].map((framework, index) => ({
      mapping_id: `FM-${claim.claim_id}-${index + 1}`,
      claim_id: claim.claim_id,
      framework_name: framework,
      mapping_type: 'Relevance mapping only',
      relevance_explanation: `${claim.claim_type} may be relevant to ${framework}.`,
      compliance_warning_text: FRAMEWORK_WARNING.replace('[framework/control]', framework)
    }));
  });
}

function hazards(text, evidenceItems) {
  const list = [];
  if (includesAny(text, ['certainly', 'guaranteed', 'compliant', 'safe', 'low risk']) && !includesAny(text, ['evidence', 'test', 'validated'])) list.push('Unsupported certainty');
  if (includesAny(text, ['satisfies nist', 'compliant with']) && !includesAny(text, ['test evidence', 'implementation evidence'])) list.push('Overgeneralized compliance conclusion');
  if (includesAny(text, ['soc 2']) && includesAny(text, ['approve', 'low risk'])) list.push('False equivalence between certification and risk acceptance');
  if (includesAny(text, ['vendor']) && !includesAny(text, ['contract', 'dpa', 'scope'])) list.push('Vendor claim accepted without evidence');
  if (evidenceItems.some(e => e.prompt_injection_suspected) || detectPromptInjection(text)) list.push('Prompt injection suspected');
  return list.map((hazard, index) => ({ hazard_id: `H-${String(index + 1).padStart(3, '0')}`, hazard, band: hazard === 'Prompt injection suspected' ? 'Quarantine' : 'Moderate hazard' }));
}

function riskIfWrong(claims, domain, hazardList) {
  const severe = hazardList.some(h => h.band === 'Quarantine');
  const materialHigh = claims.some(c => c.materiality === 'High');
  const vendorSensitive = claims.some(c => includesAny(c.normalized_claim, ['customer data', 'sensitive', 'regulated', 'vendor access']));
  const band = severe ? 'Severe' : materialHigh || vendorSensitive || domain === 'vendor-risk' || domain === 'compliance' ? 'High' : 'Moderate';
  const category = domain === 'compliance' ? 'Regulatory/legal consequence' : domain === 'vendor-risk' ? 'Vendor-risk exposure' : 'Security consequence';
  return {
    band,
    impact_areas: [category, 'Financial consequence', 'Operational disruption', 'Reputational risk'],
    consequence_summary: `${band} Risk If Wrong because acting on the recommendation could create ${category.toLowerCase()} before evidence and owner review are complete.`
  };
}

function confidence(claims, missing, risk, hazardList) {
  if (hazardList.some(h => h.band === 'Quarantine')) return { band: 'Contradicted', rationale: 'Prompt-injection or source-manipulation indicators require quarantine.' };
  if (claims.some(c => c.conflict_status === 'Blocking conflict')) return { band: 'Contradicted', rationale: 'A blocking conflict exists in the available evidence or source material.' };
  if (missing.some(m => ['High', 'Critical'].includes(m.severity))) return { band: 'Low confidence', rationale: 'Material claims lack required evidence.' };
  if (risk.band === 'High' || risk.band === 'Severe') return { band: 'Medium confidence', rationale: 'Risk If Wrong is elevated, so confidence cannot exceed medium without human review and stronger evidence.' };
  return { band: 'Medium confidence', rationale: 'Some evidence is present, but this static prototype has no live verification or independent evidence validation.' };
}

function reviewGate(claims, missing, risk, confidenceResult, hazardsFound) {
  const triggers = [];
  if (['High', 'Severe'].includes(risk.band)) triggers.push('Risk If Wrong is High or Severe');
  if (missing.some(m => ['High', 'Critical'].includes(m.severity))) triggers.push('Evidence is insufficient for a material claim');
  if (claims.some(c => ['Material conflict', 'Blocking conflict', 'Unresolved conflict'].includes(c.conflict_status))) triggers.push('Conflict status is unresolved, material, or blocking');
  if (['Low confidence', 'Unknown confidence', 'Contradicted'].includes(confidenceResult.band)) triggers.push('Confidence is low, unknown, or contradicted');
  if (hazardsFound.some(h => h.band === 'Quarantine')) triggers.push('Prompt injection or source manipulation suspected');
  const required = triggers.length > 0;
  return {
    required,
    triggers: required ? triggers : ['No mandatory review trigger detected by static rules. Human review may still be appropriate.'],
    required_reviewer_role: reviewerRole(claims),
    review_status: required ? 'Review Required' : 'Not Required by Static Rules',
    reviewer_notes: '',
    reviewer_decision: ''
  };
}

function reviewerRole(claims) {
  const types = claims.map(c => c.claim_type).join(' ');
  if (types.includes('Compliance')) return 'Compliance owner';
  if (types.includes('Vendor')) return 'Vendor-risk owner';
  if (types.includes('Security') || types.includes('Control')) return 'vCISO or Security SME';
  return 'Executive sponsor';
}

function recommendedAction(risk, confidenceResult, review, hazardList, missing) {
  if (hazardList.some(h => h.band === 'Quarantine')) return { action: 'Quarantine', next_step: 'Do not rely on this recommendation until source manipulation is reviewed.' };
  if (risk.band === 'Severe' || (risk.band === 'High' && confidenceResult.band === 'Low confidence')) return { action: 'Escalate for review', next_step: 'Assign the required reviewer and obtain evidence before approval.' };
  if (missing.length > 0) return { action: 'Request evidence', next_step: 'Collect required evidence for all material claims before action.' };
  if (review.required) return { action: 'Escalate for review', next_step: 'Human review is required before acceptance.' };
  if (confidenceResult.band === 'Medium confidence') return { action: 'Accept with caveat', next_step: 'Document caveats, limitations, and decision owner before use.' };
  return { action: 'Accept', next_step: 'Proceed only within documented scope and limitations.' };
}

function defensibility(record, missing, review) {
  if (!record.original_ai_recommendation) return 'Incomplete';
  if (record.ai_output_hazards.some(h => h.band === 'Quarantine')) return 'Not defensible';
  if (missing.some(m => ['Critical', 'High'].includes(m.severity))) return 'Internal-use only';
  if (review.required && !review.reviewer_decision) return 'Export-ready with caveat';
  return 'Export-ready';
}

export function analyzeRecommendation(input = {}) {
  const recommendation = input.recommendation || '';
  const domain = classifyDomain(recommendation, input.domain || 'mixed');
  const evidenceItems = parseEvidence(input.evidence || '');
  const rawClaims = extractClaims(recommendation, domain);
  const claims = mapEvidence(rawClaims, evidenceItems);
  const missing = missingSupport(claims);
  const hazardList = hazards(recommendation, evidenceItems);
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
    evidence_provided: evidenceItems,
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
      'Static advisory prototype. No backend persistence, tenant separation, live model calls, live internet verification, or production integrations are active in this build.',
      'AI-generated text alone is not treated as evidence for medium-impact or high-impact security, compliance, or vendor-risk recommendations.',
      'Framework mappings are relevance mappings only and do not verify compliance.',
      'Uploaded or pasted evidence is treated as untrusted data, not instructions.'
    ],
    analysis_version: ANALYSIS_VERSION,
    export_version: VERSION,
    export_timestamp: '',
    audit_events: [
      { event_type: 'Record created', event_description: 'Recommendation submitted to static ATDR analyzer.', timestamp: now },
      { event_type: 'Claim extraction completed', event_description: `${claims.length} claim(s) extracted.`, timestamp: now },
      { event_type: 'Analysis completed', event_description: `${action.action}; ${confidenceResult.band}; ${risk.band} Risk If Wrong.`, timestamp: now }
    ]
  };
  record.record_defensibility_band = defensibility(record, missing, review);
  record.can_act = ['Accept', 'Accept with caveat'].includes(record.recommended_action) && !review.required;
  return record;
}

export function exportMarkdown(record) {
  const exported = { ...record, export_timestamp: new Date().toISOString() };
  return `# ${exported.record_type}\n\n` +
`**Record ID:** ${exported.record_id}\n\n` +
`**Created:** ${exported.created_timestamp}\n\n` +
`**Domain:** ${exported.domain}\n\n` +
`**Recommended Action:** ${exported.recommended_action}\n\n` +
`**Risk If Wrong:** ${exported.risk_if_wrong.band}\n\n` +
`**Confidence Band:** ${exported.confidence_band}\n\n` +
`**Record Defensibility:** ${exported.record_defensibility_band}\n\n` +
`## Original AI Recommendation\n\n${exported.original_ai_recommendation}\n\n` +
`## Decision Brief\n\n- Can act now: ${exported.can_act ? 'Yes, within documented scope.' : 'No. Review, evidence, or caveat handling is required.'}\n- Why: ${exported.confidence_rationale}\n- Missing support: ${exported.missing_support.length ? exported.missing_support.map(m => m.category).join('; ') : 'No missing support identified by static rules'}\n- Reviewer: ${exported.human_review.required_reviewer_role}\n- Next step: ${exported.required_next_step}\n\n` +
`## Extracted Claims\n\n${exported.extracted_claims.map(c => `- **${c.claim_id}:** ${c.normalized_claim}\n  - Type: ${c.claim_type}\n  - Materiality: ${c.materiality}\n  - Required evidence: ${c.required_evidence_type.join('; ')}\n  - Sufficiency: ${c.evidence_sufficiency_band}\n  - Conflict: ${c.conflict_status}`).join('\n')}\n\n` +
`## Framework References\n\n${exported.applicable_framework_references.length ? exported.applicable_framework_references.map(f => `- ${f.framework_name}: ${f.compliance_warning_text}`).join('\n') : '- No framework mapping generated'}\n\n` +
`## Limitations\n\n${exported.limitations.map(l => `- ${l}`).join('\n')}\n`;
}

export function exportJson(record) {
  return JSON.stringify({ ...record, export_timestamp: new Date().toISOString() }, null, 2);
}

export { VERSION, REVIEW_TRIGGERS, FRAMEWORK_WARNING };
