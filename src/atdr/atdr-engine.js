const VERSION = '2026061014-custom-input-safety-gating';
const ANALYSIS_VERSION = 'atdr-static-deterministic-2026061014-domain-fit-gate';
const FRAMEWORK_WARNING = 'Relevant to [framework/control]. Not verified as compliant.';
const SUPPORTED_V1_DOMAINS = ['vendor-risk', 'security', 'compliance'];

function id(prefix) { return `${prefix}-${new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14)}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`; }
function clean(value) { return String(value || '').trim(); }
function lower(value) { return clean(value).toLowerCase(); }
function has(text, terms) { const t = lower(text); return terms.some(term => t.includes(term)); }
function uniq(items) { return [...new Set(items.filter(Boolean))]; }
function splitSentences(text) { return clean(text).replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean); }

export function classifyDomainFit(input = {}) {
  const recommendation = clean(input.recommendation);
  const context = clean(input.context);
  const intendedUse = clean(input.intendedUse);
  const selected = clean(input.domain || 'mixed');
  const joined = [recommendation, context, intendedUse].join(' ');
  const detectionReasons = [];

  const vendorSignals = ['vendor', 'soc 2', 'subprocessor', 'sub-processor', 'dpa', 'data processing agreement', 'contract', 'supplier', 'third party', 'third-party', 'customer data', 'service provider', 'right-to-audit', 'incident notification'];
  const securitySignals = ['vulnerability', 'exploit', 'mfa', 'security control', 'remediation', 'compensating control', 'production asset', 'exposure', 'asset criticality', 'patch', 'cve', 'risk acceptance'];
  const complianceSignals = ['nist', '800-53', 'csf', 'cmmc', 'compliance', 'compliant', 'control satisfies', 'control mapping', 'policy', 'operating effectiveness', 'test evidence', 'audit evidence'];

  if (has(joined, vendorSignals)) {
    return { domain_fit_status: 'supported', supported_domain: 'vendor_risk', detected_topic: 'Vendor-risk recommendation review', decision_type: 'vendor-risk recommendation', reason: 'Input includes vendor-risk evidence-review signals such as vendor, SOC 2, DPA, contract, customer data, or subprocessor language.', allowed_to_continue: true, recommended_next_step: 'continue_to_claim_extraction', detection_reasons: ['vendor-risk evidence path detected'], limitations: [] };
  }
  if (has(joined, securitySignals)) {
    return { domain_fit_status: 'supported', supported_domain: 'security_risk', detected_topic: 'Security risk recommendation review', decision_type: 'security risk recommendation', reason: 'Input includes security-risk evidence-review signals such as vulnerability, exploitability, compensating controls, remediation, exposure, or asset criticality.', allowed_to_continue: true, recommended_next_step: 'continue_to_claim_extraction', detection_reasons: ['security-risk evidence path detected'], limitations: [] };
  }
  if (has(joined, complianceSignals)) {
    return { domain_fit_status: 'supported', supported_domain: 'compliance_control', detected_topic: 'Compliance/control recommendation review', decision_type: 'compliance or control recommendation', reason: 'Input includes compliance/control evidence-review signals such as NIST, framework mapping, policy, implementation, testing, audit, or operating effectiveness.', allowed_to_continue: true, recommended_next_step: 'continue_to_claim_extraction', detection_reasons: ['compliance/control evidence path detected'], limitations: [] };
  }

  if (has(joined, ['hire', 'candidate', 'employee', 'culture fit', 'performance review', 'termination', 'promotion'])) detectionReasons.push('HR decision');
  if (has(joined, ['political', 'campaign', 'election', 'party position', 'public statement', 'social position'])) detectionReasons.push('political opinion or persuasion');
  if (has(joined, ['humanity', 'worth saving', 'meaning of life', 'existential', 'moral', 'morality', 'ethical philosophy', 'philosophical', 'purpose of life', 'should people'])) detectionReasons.push('moral/existential/philosophical');
  if (has(joined, ['medical', 'diagnose', 'treatment', 'medicine', 'symptom'])) detectionReasons.push('medical advice');
  if (has(joined, ['investment', 'stock', 'crypto', 'portfolio', 'forecast revenue', 'financial advice'])) detectionReasons.push('finance or investment recommendation');
  if (has(joined, ['fair contract', 'is this contract fair', 'legal advice', 'lawsuit'])) detectionReasons.push('general legal judgment');
  if (!detectionReasons.length) detectionReasons.push('no vendor-risk, security, or compliance evidence path detected');

  const ambiguous = !recommendation || (selected && selected !== 'mixed' && SUPPORTED_V1_DOMAINS.includes(selected) && !detectionReasons.some(reason => ['moral/existential/philosophical', 'political opinion or persuasion', 'medical advice', 'finance or investment recommendation'].includes(reason)));

  return {
    domain_fit_status: ambiguous ? 'unclear' : 'unsupported',
    supported_domain: 'none',
    detected_topic: detectionReasons.join('; '),
    decision_type: 'unsupported or unclear decision type',
    reason: ambiguous ? 'Input does not provide enough supported-domain evidence-review detail to continue safely.' : 'Input is outside CyberShield V1 supported decision-assurance scope.',
    allowed_to_continue: false,
    recommended_next_step: ambiguous ? 'request_clarification' : 'route_to_out_of_scope_record',
    detection_reasons: detectionReasons,
    limitations: ['CyberShield V1 is intentionally narrow.', 'Supported reviews are vendor-risk, security-risk, and compliance/control recommendation reviews.', 'Unsupported topics do not enter the full evidence-review pipeline.']
  };
}

function classifyDomain(text, selected = 'mixed', domainFit = null) {
  if (domainFit?.supported_domain === 'vendor_risk') return 'vendor-risk';
  if (domainFit?.supported_domain === 'security_risk') return 'security';
  if (domainFit?.supported_domain === 'compliance_control') return 'compliance';
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

function claimObject(index, text, type, domain, materiality, required, related = 'Supporting claim') {
  return { claim_id: `C-${String(index + 1).padStart(3, '0')}`, original_sentence: text, normalized_claim: text, claim_type: type, domain, related_recommendation: related, required_evidence_type: required, materiality, unsupported_flag: true, evidence_sufficiency_band: 'Not provided', missing_support_severity: materiality === 'High' ? 'High' : 'Moderate', conflict_status: 'Unresolved conflict', confidence_band: 'Unknown confidence', risk_if_wrong_band: materiality === 'High' ? 'High' : 'Moderate', reviewer_notes: '', evidence_links: [] };
}

function outOfScopeClaim(recommendation, domainFit) {
  return { claim_id: 'C-001', original_sentence: recommendation || 'No recommendation submitted.', normalized_claim: 'Unsupported input was submitted to CyberShield V1.', claim_type: 'Domain-fit finding', domain: 'out-of-scope', related_recommendation: 'Out-of-scope review', required_evidence_type: ['Reframe as vendor-risk, security-risk, or compliance/control evidence review'], materiality: 'Informational', unsupported_flag: true, evidence_sufficiency_band: 'Not applicable', missing_support_severity: 'Not applicable', conflict_status: 'Not applicable', confidence_band: 'Unknown confidence', risk_if_wrong_band: 'Unknown', reviewer_notes: domainFit.reason, evidence_links: [] };
}

function atomizedVendorClaims(text, domain) {
  if (!(domain === 'vendor-risk' && has(text, ['vendor', 'soc 2', 'encrypt', 'low risk']))) return null;
  return [
    ['Vendor X should be approved', 'Recommendation step', 'High', ['Current vendor-risk review', 'Decision owner', 'Risk acceptance authority', 'Contract security terms'], 'Vendor approval recommendation'],
    ['Vendor X has a SOC 2 report', 'Vendor claim', 'Medium', ['Current SOC 2 report', 'SOC 2 report date', 'Independent report source']],
    ['The SOC 2 report is current', 'Vendor claim', 'Medium', ['SOC 2 report period', 'SOC 2 issue date', 'Bridge letter if needed']],
    ['The SOC 2 report covers the evaluated AI service', 'Unsupported leap', 'High', ['SOC 2 scope excerpt naming the evaluated AI service', 'System description covering AI service', 'Relevant Trust Services Criteria']],
    ['Vendor X encrypts customer data', 'Security claim', 'High', ['Encryption architecture evidence', 'Key management evidence', 'Independent validation or control test result']],
    ['Vendor X has acceptable customer data use terms', 'Vendor claim', 'High', ['Data Processing Agreement', 'Customer data use restriction', 'Legal or privacy review']],
    ['Vendor X has acceptable subprocessor transparency', 'Vendor claim', 'High', ['Complete subprocessor list', 'AI analytics provider list', 'Subprocessor change notice terms']],
    ['Vendor X has acceptable incident notification terms', 'Vendor claim', 'Medium', ['Incident notification clause', 'Specific notification timeline', 'Security incident definition']],
    ['Vendor X appears low risk', 'Risk conclusion', 'High', ['Vendor-risk assessment', 'Residual risk rationale', 'Security SME review', 'Legal or privacy review if data use is implicated']],
    ['SOC 2 plus encryption is sufficient for approval', 'Unsupported leap', 'High', ['Full evidence package showing scope, implementation, contractual controls, data use, and reviewer approval']]
  ].map((parts, index) => claimObject(index, parts[0], parts[1], domain, parts[2], parts[3], parts[4]));
}

function atomizedSecurityClaims(text, domain) {
  if (!(domain === 'security' && has(text, ['vulnerability', 'low risk', 'compensating controls']))) return null;
  return [
    ['The vulnerability can be accepted as low risk', 'Recommendation step', 'High', ['Risk acceptance record', 'Named risk owner', 'Security SME or vCISO approval'], 'Security risk acceptance recommendation'],
    ['Exploitation is unlikely', 'Predictive claim', 'High', ['Exploit intelligence', 'Exposure status', 'Threat activity evidence', 'Attack-path validation']],
    ['The affected asset exposure does not create material risk', 'Security claim', 'High', ['Asset inventory', 'Internet exposure evidence', 'Business criticality', 'Data sensitivity classification']],
    ['Compensating controls are sufficient', 'Control claim', 'High', ['Control implementation evidence', 'Control test result', 'Log validation', 'WAF or compensating control rule evidence']],
    ['Remediation can be deferred', 'Risk conclusion', 'High', ['Remediation plan', 'Exception expiration date', 'Risk register entry', 'Accountable owner approval']],
    ['Likelihood alone is enough to mark the vulnerability low risk', 'Unsupported leap', 'High', ['Impact analysis', 'Exploitability analysis', 'Exposure analysis', 'Business impact analysis']]
  ].map((parts, index) => claimObject(index, parts[0], parts[1], domain, parts[2], parts[3], parts[4]));
}

function atomizedComplianceClaims(text, domain) {
  if (!(domain === 'compliance' && has(text, ['nist', '800-53', 'policy', 'compliant']))) return null;
  return [
    ['The access control should be marked compliant', 'Recommendation step', 'High', ['Compliance owner approval', 'Control assessment record', 'Evidence package'], 'Compliance conclusion'],
    ['The current policy maps to NIST 800-53', 'Compliance claim', 'High', ['Framework/control mapping', 'Policy excerpt', 'Control objective mapping']],
    ['Policy existence is sufficient to satisfy the control', 'Unsupported leap', 'High', ['Implementation evidence', 'Operating effectiveness evidence', 'Control test result']],
    ['The access control is implemented as written', 'Control claim', 'High', ['System configuration evidence', 'Access review sample', 'Identity provider evidence']],
    ['The control has been tested and is operating effectively', 'Compliance claim', 'High', ['Test plan', 'Test result', 'Exception tracking', 'Review history']],
    ['The organization can represent the control as compliant', 'Risk conclusion', 'High', ['Reviewer signoff', 'Scope statement', 'Limitations and caveats', 'Compliance owner notes']]
  ].map((parts, index) => claimObject(index, parts[0], parts[1], domain, parts[2], parts[3], parts[4]));
}

function evidenceRequired(text, domain) {
  if (has(text, ['soc 2'])) return ['Current SOC 2 report', 'SOC 2 scope and service coverage', 'Report date and bridge letter if needed'];
  if (has(text, ['encrypt'])) return ['Encryption architecture evidence', 'Key management evidence', 'Control test result'];
  if (has(text, ['nist', 'control', 'compliance', 'policy'])) return ['Framework/control mapping', 'Implementation evidence', 'Control test result', 'Control owner'];
  if (has(text, ['vulnerability', 'exploit'])) return ['Vulnerability scan output', 'Asset criticality', 'Exploit intelligence', 'Compensating controls', 'Risk owner approval'];
  if (domain === 'vendor-risk') return ['Vendor document', 'Contract clause', 'Independent validation where practical'];
  return ['Primary source', 'Scope definition', 'Human owner'];
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

function extractClaims(text, domain) { return atomizedVendorClaims(text, domain) || atomizedSecurityClaims(text, domain) || atomizedComplianceClaims(text, domain) || genericClaims(text, domain); }

function parseEvidenceText(evidenceText) {
  return clean(evidenceText).split(/\n+/).map(s => s.trim()).filter(Boolean).map((chunk, index) => ({ evidence_id: `E-${String(index + 1).padStart(3, '0')}`, evidence_name: (chunk.match(/^\[(.*?)\]/) || [])[1] || `Evidence ${index + 1}`, evidence_type: inferEvidenceType(chunk), source_type: 'User-provided or synthetic evidence text', source_authority_band: inferAuthority(chunk), text_extract: chunk, evidence_date: inferDate(chunk), freshness_band: inferFreshness(chunk), independence_band: inferIndependence(chunk), sensitivity_label: has(chunk, ['customer data', 'regulated', 'sensitive', 'production']) ? 'Sensitive' : 'Unspecified', prompt_injection_suspected: has(chunk, ['ignore previous instructions', 'system prompt', 'developer message', 'override instructions']), created_at: new Date().toISOString() }));
}

function inferEvidenceType(text) {
  if (has(text, ['soc 2'])) return 'Vendor SOC 2 report';
  if (has(text, ['dpa', 'data processing'])) return 'Data processing agreement';
  if (has(text, ['subprocessor'])) return 'Subprocessor list';
  if (has(text, ['encrypt', 'architecture'])) return 'Encryption architecture note';
  if (has(text, ['questionnaire'])) return 'Vendor security questionnaire excerpt';
  if (has(text, ['incident notification'])) return 'Incident notification clause';
  if (has(text, ['vulnerability', 'scanner', 'cve'])) return 'Vulnerability scan output';
  if (has(text, ['asset', 'production'])) return 'Asset inventory';
  if (has(text, ['compensating', 'waf', 'firewall'])) return 'Control implementation evidence';
  if (has(text, ['policy'])) return 'Security policy';
  if (has(text, ['test result', 'prior review', 'audit'])) return 'Control test result';
  if (has(text, ['business owner', 'risk owner', 'control owner', 'security review'])) return 'Human reviewer note';
  return 'Other';
}
function inferAuthority(text) { if (has(text, ['contractual', 'dpa', 'clause', 'audit', 'contract artifact'])) return 'High'; if (has(text, ['soc 2', 'report', 'scope', 'scanner', 'policy', 'security review'])) return 'Medium'; if (has(text, ['self-attested', 'states', 'believes', 'business owner', 'vendor assertion'])) return 'Low'; return 'Unknown'; }
function inferDate(text) { return (text.match(/\b20\d{2}\b/) || [''])[0]; }
function inferFreshness(text) { if (has(text, ['stale'])) return 'Stale'; if (has(text, ['current with caveat'])) return 'Current with caveat'; const year = Number(inferDate(text)); if (!year) return 'Unknown'; const age = new Date().getFullYear() - year; if (age <= 1) return 'Current'; if (age <= 2) return 'Aging'; return 'Stale'; }
function inferIndependence(text) { if (has(text, ['contract language', 'contract artifact', 'third-party report', 'independent', 'auditor', 'contractual', 'scanner reports', 'internal audit'])) return 'Independent or contractual'; if (has(text, ['self-attested', 'vendor assertion', 'states', 'believes', 'vendor-published'])) return 'Self-attested'; return 'Unknown'; }

function mapEvidence(claims, evidence) {
  return claims.map(claim => {
    const matches = evidence.filter(item => evidenceMatchesClaim(claim, item));
    const prompt = matches.some(e => e.prompt_injection_suspected);
    const stale = matches.some(e => e.freshness_band === 'Stale');
    const self = matches.some(e => e.independence_band === 'Self-attested');
    const contradiction = detectsContradiction(claim, matches);
    let sufficiency = matches.length ? 'Partially sufficient' : 'Not provided';
    if (contradiction || prompt) sufficiency = 'Contradicted';
    else if (matches.length && (stale || self || claim.claim_type === 'Unsupported leap')) sufficiency = 'Sufficient with caveat';
    const conflict = contradiction || prompt ? 'Material conflict' : stale || self || claim.claim_type === 'Unsupported leap' ? 'Minor caveat' : matches.length ? 'No conflict' : 'Unresolved conflict';
    return { ...claim, unsupported_flag: matches.length === 0 || claim.claim_type === 'Unsupported leap' || contradiction, evidence_sufficiency_band: sufficiency, conflict_status: conflict, evidence_links: matches.map(e => ({ evidence_id: e.evidence_id, evidence_name: e.evidence_name, relevance_band: 'Medium', sufficiency_band: sufficiency, caveat: caveatFor(e), conflict_flag: contradiction || prompt })) };
  });
}

function evidenceMatchesClaim(claim, evidence) {
  const c = lower(claim.normalized_claim); const e = lower(evidence.text_extract);
  if (has(c, ['should be approved'])) return has(e, ['business owner', 'approval', 'security review', 'risk']);
  if (has(c, ['soc 2 report is current'])) return has(e, ['soc 2', '2025', 'period']);
  if (has(c, ['has a soc 2 report'])) return e.includes('soc 2');
  if (has(c, ['covers the evaluated ai service'])) return has(e, ['soc 2', 'system description', 'ai analytics modules', 'not expressly listed', 'scope']);
  if (has(c, ['encrypts customer data'])) return has(e, ['encrypt', 'tls', 'key services']);
  if (has(c, ['customer data use terms'])) return has(e, ['dpa', 'customer data', 'service improvement', 'product analytics', 'machine learning models']);
  if (has(c, ['subprocessor transparency'])) return has(e, ['subprocessor', 'ai service providers', 'provider names']);
  if (has(c, ['incident notification'])) return has(e, ['incident', 'notify', 'notification', 'without undue delay']);
  if (has(c, ['low risk'])) return has(e, ['soc 2', 'scope', 'customer data', 'subprocessor', 'business owner', 'security review', 'self-attested']);
  if (has(c, ['sufficient for approval'])) return has(e, ['soc 2', 'encrypt', 'dpa', 'subprocessor', 'approval', 'security review']);
  if (has(c, ['vulnerability'])) return has(e, ['vulnerability', 'scanner', 'cve']);
  if (has(c, ['exploitation', 'exploit'])) return has(e, ['exploit', 'exploitability', 'threat activity']);
  if (has(c, ['affected asset', 'asset exposure'])) return has(e, ['asset', 'production', 'customer-facing']);
  if (has(c, ['compensating controls'])) return has(e, ['compensating', 'waf', 'firewall', 'control']);
  if (has(c, ['remediation', 'deferred'])) return has(e, ['risk owner', 'remediation', 'exception']);
  if (has(c, ['policy maps', 'current policy'])) return has(e, ['policy', 'nist', '800-53']);
  if (has(c, ['implemented as written'])) return has(e, ['implementation', 'configuration', 'access review']);
  if (has(c, ['tested', 'operating effectively'])) return has(e, ['test', 'prior review', 'audit', 'evidence']);
  if (has(c, ['marked compliant', 'represent the control'])) return has(e, ['control owner', 'compliance owner', 'audit']);
  return claim.required_evidence_type.some(req => lower(req).split(/\W+/).some(word => word.length > 6 && e.includes(word)));
}

function detectsContradiction(claim, matches) {
  const c = lower(claim.normalized_claim); const joined = lower(matches.map(m => m.text_extract).join(' '));
  if (has(c, ['covers the evaluated ai service']) && has(joined, ['not expressly listed', 'not clearly included', 'does not name', 'does not clearly identify'])) return true;
  if (has(c, ['customer data use terms']) && has(joined, ['service improvement', 'model evaluation', 'product analytics', 'improve platform functionality'])) return true;
  if (has(c, ['subprocessor transparency']) && has(joined, ['available upon request', 'not fully identified', 'additional analytics'])) return true;
  if (has(c, ['incident notification']) && has(joined, ['without undue delay', 'does not provide a specific notification timeline'])) return true;
  if (has(c, ['low risk']) && has(joined, ['not expressly listed', 'service improvement', 'available upon request', 'no risk acceptance authority', 'self-attested', 'stale'])) return true;
  if (has(c, ['sufficient for approval']) && has(joined, ['not expressly listed', 'service improvement', 'available upon request', 'self-attested', 'stale'])) return true;
  if (has(c, ['accepted as low risk']) && has(joined, ['internet-facing', 'production', 'no risk acceptance'])) return true;
  if (has(c, ['policy existence is sufficient']) && has(joined, ['does not show implementation', 'no access review sample', 'incomplete'])) return true;
  if (has(c, ['marked compliant', 'operating effectively']) && has(joined, ['incomplete', 'not shown', 'no access review sample'])) return true;
  return false;
}
function caveatFor(e) { if (e.prompt_injection_suspected) return 'Prompt-injection indicator found in evidence text.'; if (e.freshness_band === 'Stale') return 'Evidence appears stale.'; if (e.independence_band === 'Self-attested') return 'Evidence is self-attested and should not be treated as independent proof.'; if (e.text_extract && has(e.text_extract, ['not expressly listed', 'service improvement', 'available upon request', 'without undue delay'])) return 'Evidence creates a scope, data-use, subprocessor, or notification caveat.'; return ''; }

function missingSupport(claims) { return claims.flatMap(claim => (!claim.unsupported_flag && !['Not provided', 'Contradicted'].includes(claim.evidence_sufficiency_band)) ? [] : claim.required_evidence_type.map((req, index) => ({ missing_support_id: `M-${claim.claim_id}-${index + 1}`, claim_id: claim.claim_id, category: req, severity: claim.materiality === 'High' ? 'High' : 'Moderate', finding: `${req} is required before claim ${claim.claim_id} can support a defensible recommendation.` }))); }

function frameworkMappings(claims, domain) {
  return claims.flatMap(claim => { const c = lower(claim.normalized_claim); const refs = []; if (domain === 'vendor-risk' || has(c, ['vendor', 'soc 2'])) refs.push('NIST SP 800-161', 'SOC 2 Trust Services Criteria'); if (domain === 'compliance' || has(c, ['nist', '800-53', 'compliance'])) refs.push('NIST SP 800-53'); if (domain === 'security' || has(c, ['vulnerability', 'control', 'encrypt'])) refs.push('NIST CSF 2.0', 'NIST SP 800-53'); if (has(c, ['customer data', 'ai service', 'model'])) refs.push('NIST AI RMF', 'NIST Generative AI Profile', 'OWASP Top 10 for LLM Applications'); return uniq(refs).map((framework, index) => ({ mapping_id: `FM-${claim.claim_id}-${index + 1}`, claim_id: claim.claim_id, framework_name: framework, mapping_type: 'Relevance mapping only', relevance_explanation: `${claim.claim_type} may be relevant to ${framework}.`, compliance_warning_text: FRAMEWORK_WARNING.replace('[framework/control]', framework) })); });
}

function hazards(recommendation, claims, evidence) { const result = []; if (has(recommendation, ['low risk', 'appear low risk', 'compliant', 'satisfies']) && claims.some(c => c.unsupported_flag)) result.push(['Unsupported certainty', 'Moderate hazard']); if (has(recommendation, ['soc 2']) && has(recommendation, ['approve', 'low risk'])) result.push(['False equivalence between certification and risk acceptance', 'Moderate hazard']); if (has(recommendation, ['nist', 'compliant', 'satisfies']) && has(recommendation, ['policy'])) result.push(['Overgeneralized compliance conclusion', 'Moderate hazard']); if (claims.some(c => c.claim_type === 'Unsupported leap')) result.push(['Unsupported leap', 'Moderate hazard']); if (evidence.some(e => e.prompt_injection_suspected)) result.push(['Prompt injection suspected', 'Quarantine']); return result.map(([hazard, band], index) => ({ hazard_id: `H-${String(index + 1).padStart(3, '0')}`, hazard, band })); }
function riskIfWrong(claims, domain, hazardsFound) { const severe = hazardsFound.some(h => h.band === 'Quarantine'); const high = claims.some(c => c.materiality === 'High') || ['vendor-risk', 'compliance', 'security'].includes(domain); const band = severe ? 'Severe' : high ? 'High' : 'Moderate'; const first = domain === 'security' ? 'Security consequence' : domain === 'compliance' ? 'Regulatory/legal consequence' : 'Vendor-risk exposure'; return { band, impact_areas: [first, 'Financial consequence', 'Operational disruption', 'Reputational risk'], consequence_summary: `${band} Risk If Wrong because acting on the recommendation could create ${first.toLowerCase()} before evidence sufficiency, scope, and accountable review are resolved.` }; }
function confidence(claims, missing, risk, hazardsFound) { if (hazardsFound.some(h => h.band === 'Quarantine')) return { band: 'Contradicted', rationale: 'Source manipulation indicators require quarantine.' }; if (claims.some(c => c.conflict_status === 'Material conflict')) return { band: 'Low confidence', rationale: 'Material contradictions or scope conflicts exist in the available evidence.' }; if (missing.some(m => m.severity === 'High')) return { band: 'Low confidence', rationale: 'Material claims lack required evidence.' }; if (risk.band === 'High') return { band: 'Medium confidence', rationale: 'Risk If Wrong is high, so confidence cannot exceed medium without reviewer approval.' }; return { band: 'Medium confidence', rationale: 'Evidence is partially mapped, but this static prototype performs no live verification.' }; }
function reviewGate(claims, missing, risk, confidenceResult, hazardsFound, domain) { const triggers = []; if (['High', 'Severe'].includes(risk.band)) triggers.push('Risk If Wrong is High or Severe'); if (missing.some(m => m.severity === 'High')) triggers.push('Evidence is insufficient for a material claim'); if (claims.some(c => ['Material conflict', 'Blocking conflict', 'Unresolved conflict'].includes(c.conflict_status))) triggers.push('Conflict status is unresolved, material, or blocking'); if (['Low confidence', 'Unknown confidence', 'Contradicted'].includes(confidenceResult.band)) triggers.push('Confidence is low, unknown, or contradicted'); if (hazardsFound.some(h => h.band === 'Quarantine')) triggers.push('Prompt injection or source manipulation suspected'); const role = domain === 'security' ? 'vCISO or Security SME' : domain === 'compliance' ? 'Compliance Owner and Security SME' : 'Vendor-Risk Owner, Security SME, Legal Counsel, Business Owner'; return { required: triggers.length > 0, triggers: triggers.length ? triggers : ['No mandatory review trigger detected by static rules.'], required_reviewer_role: role, review_status: triggers.length ? 'Review Required' : 'Not Required by Static Rules', reviewer_notes: '', reviewer_decision: '' }; }
function recommendedAction(risk, confidenceResult, review, hazardsFound, missing) { if (hazardsFound.some(h => h.band === 'Quarantine')) return { action: 'Quarantine', next_step: 'Do not rely on this recommendation until source manipulation is reviewed.' }; if (missing.length) return { action: 'Request Evidence', next_step: 'Collect required evidence for all material claims before action.' }; if (risk.band === 'Severe' || (risk.band === 'High' && confidenceResult.band === 'Low confidence')) return { action: 'Escalate for Review', next_step: 'Assign required human review before approval.' }; if (review.required) return { action: 'Escalate for Review', next_step: 'Human review is required before acceptance.' }; return { action: 'Accept with Caveat', next_step: 'Document caveats, limitations, and decision owner before use.' }; }
function defensibility(record, missing, review) { if (!record.original_ai_recommendation) return 'Incomplete'; if (record.domain === 'out-of-scope') return 'Not defensible'; if (record.ai_output_hazards.some(h => h.band === 'Quarantine')) return 'Not defensible'; if (missing.some(m => m.severity === 'High')) return 'Not Defensible Yet'; if (review.required && !review.reviewer_decision) return 'Executive brief ready with limitations'; return 'Export-ready with caveat'; }

function outOfScopeRecord(input, domainFit) {
  const now = new Date().toISOString();
  const recommendation = clean(input.recommendation);
  const claim = outOfScopeClaim(recommendation, domainFit);
  const review = { required: true, triggers: ['Input is outside CyberShield V1 supported decision-assurance scope', ...domainFit.detection_reasons], required_reviewer_role: 'Decision owner or CyberShield reviewer', review_status: 'Review Required', reviewer_notes: '', reviewer_decision: '' };
  const record = { record_id: id('TDR'), record_type: 'Trust Decision Record', record_subtype: 'Out-of-Scope AI Trust Decision Record', created_timestamp: now, created_by: input.createdBy || 'Demo user', original_ai_recommendation: recommendation, ai_source: input.aiSource || 'Unknown or user-pasted AI output', source_model: input.sourceModel || 'Unknown', intended_use: input.intendedUse || 'Decision support review before action', domain: 'out-of-scope', domain_fit: domainFit, unsupported_domain_reason: domainFit.reason, detected_adjacent_domain: domainFit.detected_topic, supported_v1_domains: ['Vendor-risk recommendation review', 'Security risk recommendation review', 'Compliance/control recommendation review'], recommendation_type: 'Unsupported-domain scope finding', decision_context: input.context || '', applicable_framework_references: [], extracted_claims: [claim], evidence_provided: [], missing_support: [], ai_output_hazards: [{ hazard_id: 'H-001', hazard: 'Unsupported-domain input', band: 'Out of Scope for Current Review' }], risk_if_wrong: { band: 'Unknown', impact_areas: ['Scope decision only'], consequence_summary: 'CyberShield did not classify Risk If Wrong because this is a scope decision, not a vendor-risk, security-risk, or compliance/control evidence review.' }, confidence_band: 'Unknown confidence', confidence_rationale: 'CyberShield cannot assign a supported-domain confidence band because the recommendation is outside the current V1 decision-assurance scope.', human_review: review, recommended_action: 'Out of Scope for Current Review', required_next_step: 'Reframe the recommendation as a vendor-risk, security-risk, or compliance/control evidence review, or try the vendor-risk sample.', decision_owner: input.decisionOwner || '', limitations: ['CyberShield V1 is intentionally narrow.', 'Current supported workflows are AI-generated vendor-risk, security-risk, and compliance/control recommendations.', 'Unsupported moral, existential, philosophical, political, HR, legal, finance, medical, investment, strategy, and general-purpose advice inputs do not enter the full evidence-review pipeline.', 'No compliance or framework mapping is generated for out-of-scope records.', 'Static advisory prototype. No backend persistence, tenant isolation, live model calls, live internet verification, production integrations, malware scanning, or production authentication are active in this build.'], analysis_version: ANALYSIS_VERSION, export_version: VERSION, export_timestamp: '', audit_events: [{ event_type: 'Domain-fit classification completed', event_description: `Out of Scope for Current Review: ${domainFit.detection_reasons.join('; ')}`, timestamp: now }, { event_type: 'Out-of-scope record created', event_description: 'Full evidence review was not run because the input is outside supported V1 scope.', timestamp: now }] };
  record.record_defensibility_band = 'Not defensible';
  record.can_act = false;
  return record;
}

export function analyzeRecommendation(input = {}) {
  const recommendation = clean(input.recommendation);
  const domainFit = classifyDomainFit(input);
  if (!domainFit.allowed_to_continue) return outOfScopeRecord(input, domainFit);

  const domain = classifyDomain(recommendation, input.domain || 'mixed', domainFit);
  const evidence = parseEvidenceText(input.evidence || '');
  const claims = mapEvidence(extractClaims(recommendation, domain), evidence);
  const missing = missingSupport(claims);
  const hazardList = hazards(recommendation, claims, evidence);
  const risk = riskIfWrong(claims, domain, hazardList);
  const confidenceResult = confidence(claims, missing, risk, hazardList);
  const review = reviewGate(claims, missing, risk, confidenceResult, hazardList, domain);
  const action = recommendedAction(risk, confidenceResult, review, hazardList, missing);
  const now = new Date().toISOString();
  const record = { record_id: id('TDR'), record_type: 'Trust Decision Record', record_subtype: 'AI Trust Decision Record', created_timestamp: now, created_by: input.createdBy || 'Demo user', original_ai_recommendation: recommendation, ai_source: input.aiSource || 'Unknown or user-pasted AI output', source_model: input.sourceModel || 'Unknown', intended_use: input.intendedUse || 'Decision support review before action', domain, domain_fit: domainFit, recommendation_type: recommendationType(recommendation), decision_context: input.context || '', applicable_framework_references: frameworkMappings(claims, domain), extracted_claims: claims, evidence_provided: evidence, missing_support: missing, ai_output_hazards: hazardList, risk_if_wrong: risk, confidence_band: confidenceResult.band, confidence_rationale: confidenceResult.rationale, human_review: review, recommended_action: action.action, required_next_step: action.next_step, decision_owner: input.decisionOwner || '', limitations: ['Static advisory prototype. No backend persistence, tenant isolation, live model calls, live internet verification, or production integrations are active in this build.', 'AI-generated text alone is not treated as evidence for medium-impact or high-impact security, compliance, or vendor-risk recommendations.', 'Framework mappings are relevance mappings only and do not verify compliance.', 'Uploaded or pasted evidence is treated as untrusted data, not instructions.'], analysis_version: ANALYSIS_VERSION, export_version: VERSION, export_timestamp: '', audit_events: [{ event_type: 'Record created', event_description: 'Recommendation submitted to static ATDR analyzer.', timestamp: now }, { event_type: 'Domain-fit classification completed', event_description: `${domainFit.domain_fit_status}; ${domainFit.supported_domain}; ${domainFit.recommended_next_step}.`, timestamp: now }, { event_type: 'Claim extraction completed', event_description: `${claims.length} atomized claim(s) extracted.`, timestamp: now }, { event_type: 'Analysis completed', event_description: `${action.action}; ${confidenceResult.band}; ${risk.band} Risk If Wrong.`, timestamp: now }] };
  record.record_defensibility_band = defensibility(record, missing, review); record.can_act = ['Accept', 'Accept with Caveat'].includes(record.recommended_action) && !review.required; return record;
}
export function exportJson(record) { return JSON.stringify({ ...record, export_timestamp: new Date().toISOString() }, null, 2); }
export function exportMarkdown(record) { return `# ${record.record_type}

Record ID: ${record.record_id}

Recommended Action: ${record.recommended_action}

Risk If Wrong: ${record.risk_if_wrong.band}

Confidence: ${record.confidence_band}
`; }
export { VERSION, FRAMEWORK_WARNING };