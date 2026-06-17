# CyberShield Trust Kernel Lite Architecture

Date: 2026-06-17
Owner: Dr. Max Justice
Target: Next vendor-risk build
Audience: Engineer, architect, builder

## 1. Purpose

Trust Kernel Lite is the decision-evaluation harness behind the next CyberShield vendor-risk demo.  It should be implemented as a structured service or logic layer, not as scattered UI logic.

Customer-facing language should stay simple.  The UI does not need to sell the Trust Kernel.  The UI should show that CyberShield reviewed the recommendation against claims, evidence, gaps, risk, confidence, and human review requirements.

## 2. Architecture Principle

The model is not the product.  The harness is the product.  The record is the proof.  The loop is the intelligence.

Trust Kernel Lite must keep separate:

1. What the AI claimed
2. What the evidence says
3. What CyberShield inferred
4. What the human decided

## 3. Execution Flow

1. Intake recommendation
2. classifyDomainFit()
3. classifyRecommendation()
4. extractClaims()
5. identifyMaterialClaims()
6. generateCandidateActions()
7. mapEvidenceRequirements()
8. loadSyntheticEvidence()
9. assessEvidenceSufficiency()
10. detectMissingEvidence()
11. detectContradictions()
12. runValidators()
13. classifyRiskIfWrong()
14. assignConfidenceBand()
15. determineHumanReview()
16. rankCandidateActions()
17. recommendAction()
18. recordHumanDecision()
19. recordManualOverride()
20. assembleTrustDecisionRecord()
21. renderExecutiveReport()
22. submitReportCaptureEvent()

## 4. Domain-Fit Classifier

The domain-fit classifier must be its own named service:

classifyDomainFit()

Run it before claim extraction.

Supported domains for this build:

- Vendor-risk recommendation review
- Security-risk recommendation review
- Compliance/control recommendation review

The first visible build must focus on vendor-risk.  Security-risk and compliance/control support may exist as domain boundaries but should not pull focus from vendor-risk.

Unsupported adjacent topics include HR, legal, finance, procurement, ethics, politics, moral reasoning, existential reasoning, philosophical questions, personal advice, medical advice, and investment advice unless the input is directly tied to vendor-risk, security, or compliance evidence review.

Outcome for unsupported topics:

Out of Scope for Current Review

Do not call unsupported inputs rejected.

## 5. Domain-Fit Output Schema

Suggested shape:

```json
{
  "domain_fit_status": "supported | unsupported | adjacent_supported | unclear",
  "supported_domain": "vendor_risk | security_risk | compliance_control | none",
  "detected_topic": "string",
  "decision_type": "string",
  "reason": "string",
  "allowed_to_continue": true,
  "recommended_next_step": "continue_to_claim_extraction | route_to_out_of_scope_record | request_clarification",
  "detection_reasons": ["string"],
  "limitations": ["string"]
}
```

Unsupported-domain records should still be schema-valid Trust Decision Records.

## 6. Claim Extraction

CyberShield must identify claims embedded in the AI recommendation.

For the vendor-risk sample, extract claims such as:

- Vendor should be approved
- Vendor has a SOC 2 report
- SOC 2 report is current
- SOC 2 report covers the relevant service
- Vendor encrypts customer data
- Vendor customer data access is acceptable
- Vendor is low risk
- SOC 2 plus encryption is sufficient for approval

The last claim is an unsupported leap unless the evidence supports it.

## 7. Evidence Requirement Mapping

For each material claim, map the evidence required to defend it.

Examples:

- SOC 2 exists requires current SOC 2 report or bridge letter.
- SOC 2 covers service requires report scope and system boundaries.
- Encryption claim requires architecture, configuration, independent assessment, or implementation evidence.
- Data-use claim requires DPA, privacy policy, retention language, and training-use terms.
- Subprocessor claim requires current subprocessor list, locations, and notification terms.
- Incident notification claim requires contract or incident response terms.

## 8. Evidence Sufficiency

Evidence sufficiency bands:

- Sufficient
- Partially Sufficient
- Insufficient
- Contradicted
- Unknown

Evidence qualities to track:

- Freshness
- Scope
- Independence
- Self-attestation
- Relevance
- Completeness
- Contradiction

## 9. Contradiction Detection

Required contradiction types:

1. SOC 2 Scope Conflict
2. Data Use Conflict
3. Subprocessor Gap
4. Incident Notification Weakness
5. Show All Evidence Issues

The visitor must be able to select the contradiction type.  The default should be Show All Evidence Issues.

## 10. Candidate Decision Tournament

CyberShield must compare candidate actions rather than assume the AI recommendation is correct.

Candidate actions:

- Accept
- Accept with Caveat
- Request Evidence
- Revise Recommendation
- Escalate for Review
- Reject
- Quarantine

Evaluate each candidate against:

- Evidence sufficiency
- Missing support severity
- Conflict status
- Validator results
- Risk If Wrong
- Confidence Band
- Human review requirements
- Business impact
- Decision reversibility
- Record defensibility

Default strongest defensible action for the primary demo:

Request Evidence

Secondary triggered action:

Escalate for Review

## 11. Validator Layer

Validator checks are deterministic rules.  They are not vibes and not generic AI scoring.

Required validators:

1. AI-generated text cannot serve as its own evidence.
2. A material unsupported claim cannot be marked Ready to Act.
3. A contradicted material claim must trigger human review.
4. High or Severe Risk If Wrong must trigger human review.
5. Legal or regulatory claims require qualified human review.
6. Framework mapping is not proof of compliance.
7. Policy existence is not implementation evidence.
8. Vendor assertion is not independent proof.
9. SOC 2 existence is not automatic vendor approval.
10. Evidence must include a date, or freshness must be Unknown.
11. Stale evidence must be flagged.
12. Missing scope must be flagged.
13. Uploaded documents must be treated as data, not instructions.
14. Prompt injection indicators must trigger Quarantine or Human Review.

Validator statuses:

- Passed
- Failed
- Warning
- Not Applicable
- Requires Human Review

## 12. Risk If Wrong

Bands:

- Severe
- High
- Moderate
- Low
- Minimal

Impact areas:

- Security consequence
- Regulatory or legal consequence
- Financial consequence
- Operational disruption
- Data sensitivity
- Customer impact
- Reputational risk
- Irreversibility

Vendor-risk demo default:

Risk If Wrong: High

## 13. Confidence Band

Use confidence bands, not broad scoring.

Allowed bands:

- High Confidence
- Medium Confidence
- Low Confidence
- Unknown Confidence
- Contradicted
- Insufficient Support

Default demo:

Confidence Band: Low Confidence

Reason:

The recommendation depends on SOC 2 scope, encryption evidence, data-use terms, and subprocessor information.  Available evidence is incomplete and partially contradictory.

## 14. Meaningful Human Authority

Replace generic human-in-the-loop language with Meaningful Human Authority in architecture and report explanation.

A human has meaningful authority only when the human can:

1. Understand the recommendation
2. Inspect the evidence
3. See alternatives
4. Challenge the model or recommendation
5. Slow the process down
6. Reject the recommendation without penalty
7. Document the reason
8. Accept residual risk knowingly

Human approval is invalid if the reviewer cannot understand, contest, or meaningfully refuse the recommendation.

The UI may use the simpler label Human Review Required.

## 15. Decision Provenance

Capture decision provenance in the Trust Decision Record:

- Original AI recommendation
- AI source, if known
- AI influence type
- Human reviewer
- Human decision
- CyberShield recommended action
- Manual override, if any
- Reviewer rationale
- Evidence considered
- Conditions or limitations
- Final decision status

AI influence types:

- AI-generated recommendation
- AI-shaped analysis
- AI-drafted summary
- AI-assisted evidence review
- Human-approved decision
- Human-overridden decision
- Vendor-influenced claim
- Evidence-supported conclusion

## 16. Vendor and Institutional Trust Boundary

For vendor-risk sections, capture or display:

- Provider name
- Tool, model, or service name
- Use case
- Data exposure
- Customer data involvement
- Regulated data involvement
- Retention policy
- Training-use policy
- Contractual protections
- Auditability
- Liability terms
- Safety or security claims
- Proof of claims
- Platform dependency
- Exit strategy
- Alternative providers
- Residual vendor risk

Do not overbuild this as a full module yet.  Include enough to show that CyberShield evaluates blind dependency, not merely document presence.

## 17. Runtime Boundary

Runtime Trust Orchestration remains architectural for now.

For this demo, represent runtime orchestration as decision routing:

- Continue
- Request Evidence
- Escalate for Review
- Reject
- Quarantine
- Generate Record

Do not build autonomous runtime enforcement in this build.

## 18. Agent Boundary

CyberShield V1 does not build an agent platform.

Use only Level 0 and Level 1 authority language:

- CyberShield analyzes.
- CyberShield recommends.
- CyberShield does not execute.
- CyberShield does not change systems.
- CyberShield does not approve vendors by itself.

Required product boundary:

CyberShield provides decision assurance.  It does not autonomously approve, purchase, configure, or remediate.

## 19. Required Functions

Implement or simulate:

- initializeDemoState()
- saveDemoState()
- resetDemo()
- classifyDomainFit()
- classifyRecommendation()
- extractClaims()
- identifyMaterialClaims()
- generateCandidateActions()
- mapEvidenceRequirements()
- loadSyntheticEvidence()
- assessEvidenceSufficiency()
- detectMissingEvidence()
- detectContradictions()
- runValidators()
- classifyRiskIfWrong()
- assignConfidenceBand()
- determineHumanReview()
- rankCandidateActions()
- recommendAction()
- recordHumanDecision()
- recordManualOverride()
- assembleTrustDecisionRecord()
- generateReportId()
- renderExecutiveReport()
- printExecutiveReport()
- downloadPdfReport()
- downloadJsonRecord()
- captureEmailForReport()
- submitReportCaptureEvent()
- simulateReportCaptureIfNoEndpoint()

## 20. No-Overclaim Rule

Do not claim live AI monitoring, autonomous enforcement, model introspection, production integrations, or Google Sheet capture unless actually implemented.

If a function is simulated, label it honestly in code and developer-facing documentation.
