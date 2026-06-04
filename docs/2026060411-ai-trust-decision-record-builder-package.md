# 2026060411 AI Trust Decision Record Builder Package

## Primary build objective

Build CyberShield around one workflow first:

```text
AI-generated recommendation in → AI Trust Decision Record out
```

The next builder must stop prioritizing dashboards, TrustMap, broad governance surfaces, runtime agents, or generic trust scores until this record workflow works.

## First target workflow

```text
AI-generated security, compliance, and vendor-risk recommendations
```

The user should be able to enter or paste a recommendation produced by an AI system.  CyberShield should transform that recommendation into a defensible AI Trust Decision Record.

## Why this matters

Organizations are already using AI-generated analysis to influence security, compliance, vendor-risk, procurement, control interpretation, and risk acceptance decisions.  The danger is not only that AI can be wrong.  The deeper danger is that AI can be partially right, unsupported, overconfident, stale, or missing the evidence required to justify action.

CyberShield should help organizations decide when an AI-generated recommendation is trustworthy enough to act on, when it needs human review, and what record must exist if someone later asks, “Why did you trust this?”

## Product thesis

CyberShield is not trying to be another chatbot, dashboard, or generic trust score.

CyberShield should become the system that creates a defensible decision record for AI-generated recommendations.

## Required workflow

### Step 1: Intake recommendation

Input types for first build:

1. Plain text recommendation
2. Structured pasted recommendation
3. Optional context fields
4. Optional evidence text pasted by user

Do not require integrations for the first version.

### Step 2: Normalize recommendation

The system should extract:

1. Recommendation title
2. Recommendation summary
3. Decision being recommended
4. Scope
5. Affected system, vendor, control, policy, or business process
6. Claimed evidence
7. Implied assumptions
8. Recommended action
9. Stated confidence, if present
10. Missing confidence, if not present

### Step 3: Extract claims

The system must identify and classify claims.

Claim types:

1. Factual claim
2. Compliance claim
3. Security-control claim
4. Vendor-risk claim
5. Evidence claim
6. Assumption
7. Judgment or interpretation
8. Forecast or prediction
9. Recommended action
10. Unsupported assertion

Each claim should have:

1. Claim ID
2. Claim text
3. Claim type
4. Source sentence or paragraph
5. Decision relevance
6. Evidence requirement
7. Current support status

### Step 4: Map evidence

Each claim should be mapped to evidence.

Evidence states:

1. Supported
2. Partially supported
3. Unsupported
4. Contradicted
5. Stale
6. Irrelevant
7. Missing
8. Needs human verification

Evidence object fields:

1. Evidence ID
2. Evidence title
3. Evidence source
4. Evidence type
5. Freshness
6. Relevance
7. Reliability
8. Claim IDs supported
9. Gaps
10. Human verification status

### Step 5: Identify missing support

The system must explicitly identify what is missing.

Missing support categories:

1. Missing primary source
2. Missing control evidence
3. Missing vendor document
4. Missing policy reference
5. Missing scope definition
6. Missing date or freshness proof
7. Missing human owner
8. Missing risk acceptance authority
9. Missing compliance mapping
10. Missing implementation evidence
11. Missing test result
12. Missing exception rationale

### Step 6: Classify risk if wrong

For each recommendation and material claim, classify risk if wrong.

Risk-if-wrong categories:

1. Security exposure
2. Compliance failure
3. Vendor-risk exposure
4. Legal or contractual exposure
5. Financial loss
6. Operational disruption
7. Reputational damage
8. Data exposure
9. Mission impact
10. Customer or stakeholder harm

Risk-if-wrong severity:

1. Low
2. Moderate
3. High
4. Critical

Risk-if-wrong reasoning should be short, explicit, and linked to the claim or recommendation.

### Step 7: Assign confidence band

Do not use vague confidence.  Use confidence bands.

Recommended bands:

1. High confidence
2. Medium-high confidence
3. Medium confidence
4. Low-medium confidence
5. Low confidence
6. Insufficient basis

Confidence must be based on:

1. Evidence quality
2. Evidence completeness
3. Evidence freshness
4. Claim complexity
5. Source reliability
6. Scope clarity
7. Presence of contradictions
8. Need for human judgment

### Step 8: Recommend action

Recommended action categories:

1. Approve
2. Conditionally approve
3. Require human review
4. Request additional evidence
5. Escalate
6. Reject recommendation
7. Pause decision
8. Accept risk with documented authority
9. Generate exception record

For first build, prefer conservative action recommendations when evidence is missing or risk-if-wrong is high.

### Step 9: Require human review when needed

Human review must be required when:

1. Risk-if-wrong is high or critical
2. Confidence is low or insufficient
3. Evidence is missing for material claims
4. The recommendation affects compliance posture
5. The recommendation affects vendor approval
6. The recommendation involves risk acceptance
7. The recommendation affects production security controls
8. The recommendation has contradictory evidence
9. Authority is unclear
10. Legal, contractual, or audit exposure exists

Human review fields:

1. Reviewer name
2. Reviewer role
3. Review date
4. Decision
5. Rationale
6. Evidence added
7. Conditions imposed
8. Risk accepted by
9. Approval authority

### Step 10: Export AI Trust Decision Record

The record should be exportable.

First-version exports can be browser-generated text/HTML/JSON.  PDF can come later.

Required export sections:

1. Record ID
2. Timestamp
3. Original recommendation
4. Recommendation summary
5. Decision status
6. Extracted claims table
7. Evidence map
8. Missing support
9. Risk-if-wrong analysis
10. Confidence band
11. Recommended action
12. Human review requirement
13. Human review fields
14. Boundary and limitation statement
15. Model/version metadata

## Suggested data model

### Trust decision record

```json
{
  "recordId": "ATDR-2026060411-001",
  "createdAt": "2026-06-04T11:00:00-04:00",
  "workflow": "ai-trust-decision-record",
  "targetDomain": "security | compliance | vendor-risk",
  "originalRecommendation": "",
  "recommendationSummary": "",
  "decisionStatus": "human-review-required",
  "claims": [],
  "evidence": [],
  "missingSupport": [],
  "riskIfWrong": [],
  "confidenceBand": "medium",
  "recommendedAction": "request-additional-evidence",
  "humanReview": {},
  "exports": [],
  "metadata": {}
}
```

### Claim object

```json
{
  "claimId": "C-001",
  "text": "",
  "type": "security-control-claim",
  "sourceSpan": "",
  "materiality": "high",
  "evidenceRequired": [],
  "evidenceMapped": [],
  "supportStatus": "partially-supported",
  "riskIfWrongId": "R-001",
  "confidenceBand": "medium"
}
```

### Evidence object

```json
{
  "evidenceId": "E-001",
  "title": "",
  "source": "user-provided",
  "type": "policy | control-test | vendor-document | audit-report | screenshot | attestation | contract | other",
  "freshness": "current | stale | unknown",
  "relevance": "high | medium | low",
  "reliability": "high | medium | low | unknown",
  "supportsClaims": ["C-001"],
  "verificationStatus": "unverified | human-verified",
  "notes": ""
}
```

### Risk-if-wrong object

```json
{
  "riskId": "R-001",
  "linkedClaimIds": ["C-001"],
  "category": "security exposure",
  "severity": "high",
  "reasoning": "",
  "reviewRequired": true
}
```

## Recommended first UI

Use a simple, boring workflow screen.

### Screen structure

1. Input panel
2. Analyze button
3. Claim extraction results
4. Evidence map
5. Missing support panel
6. Risk-if-wrong panel
7. Confidence and action panel
8. Human review panel
9. Export record panel

Do not make TrustMap the primary screen for this build.

## Recommended user flow

1. User pastes AI recommendation
2. User selects domain: security, compliance, vendor-risk, or mixed
3. User optionally pastes supporting evidence
4. User clicks Analyze Recommendation
5. CyberShield generates draft AI Trust Decision Record
6. User reviews claims and evidence gaps
7. User marks human review status
8. User exports the record

## Builder skills required

The next builder needs more than UI skill.  They need to understand defensive decision systems.

Required skill areas:

1. JavaScript modular architecture
2. Structured data modeling
3. UI state management without framework overkill
4. Evidence mapping logic
5. Claim extraction logic
6. Security and compliance vocabulary
7. Vendor-risk workflow basics
8. Confidence scoring logic
9. Risk classification logic
10. Human-in-the-loop workflow design
11. Audit trail and export design
12. Product boundary discipline
13. Accessibility and readable form design
14. Defensive UX: do not overstate confidence
15. QA discipline around edge cases

## Builder mindset required

The builder must understand:

1. The point is not to make AI sound smarter
2. The point is to make AI recommendations inspectable and defensible
3. Unsupported claims are not failures; they are findings
4. Missing evidence is a product feature, not an embarrassment
5. Confidence must be earned by evidence, not generated by tone
6. Human review is not a speed bump; it is the control layer
7. Exports are not decoration; they are the value proposition

## Recommended modules

```text
src/atdr/atdr-registry.js
src/atdr/atdr-state.js
src/atdr/atdr-parser.js
src/atdr/atdr-claim-extractor.js
src/atdr/atdr-evidence-mapper.js
src/atdr/atdr-missing-support.js
src/atdr/atdr-risk-if-wrong.js
src/atdr/atdr-confidence.js
src/atdr/atdr-action-recommender.js
src/atdr/atdr-human-review.js
src/atdr/atdr-exporter.js
src/atdr/atdr-ui.js
src/atdr/atdr-qa.js
```

Suggested data file:

```text
data/atdr/atdr-taxonomy.json
```

## First build package recommendation

```text
2026060412 ATDR Workflow Scaffold
```

Scope:

1. Add ATDR taxonomy
2. Add ATDR data model
3. Add ATDR UI screen using existing navigation, preferably Proof Pack or Evidence at first unless a dedicated workflow pane is approved
4. Add text input for AI recommendation
5. Add domain selector
6. Add evidence input
7. Add deterministic claim extraction scaffold
8. Add evidence mapping scaffold
9. Add missing support scaffold
10. Add risk-if-wrong scaffold
11. Add confidence band scaffold
12. Add recommended action scaffold
13. Add export JSON/HTML scaffold
14. Add QA fixtures

## What to archive for later

File away the following as future subsystems:

1. TrustMap Engine
2. Great Map guidance
3. Architecture Model Library
4. Runtime governance visual surfaces
5. Dashboard work
6. Generic trust score work
7. Agentic runtime enforcement concepts

These should remain in the repo and documentation as deferred work, not active next-build targets.

## Acceptance criteria for next build

The next build succeeds if:

1. User can paste an AI recommendation
2. System extracts at least 5 to 10 structured claims when present
3. System classifies claim types
4. System maps user-provided evidence to claims in a transparent way
5. System identifies missing support
6. System assigns risk-if-wrong categories and severity
7. System assigns confidence band with reasons
8. System recommends action
9. System flags human review when required
10. System exports a structured AI Trust Decision Record
11. UI clearly states prototype boundary
12. TrustMap is not the main workflow

## QA scenarios

Use these fixture scenarios:

1. AI recommends approving a vendor based on stale SOC 2 evidence
2. AI recommends accepting a high security risk without documented owner
3. AI claims CMMC readiness without control evidence
4. AI recommends allowing an AI tool access to company data without data-use review
5. AI says a compensating control is sufficient but provides no test evidence
6. AI recommends renewing a vendor with missing contract security terms
7. AI makes a mixed recommendation with both supported and unsupported claims

## Output doctrine

The record must be useful even when the recommendation is rejected.

A strong CyberShield output may say:

```text
Do not act on this recommendation yet.  Several material claims are unsupported, the risk-if-wrong is high, and human review is required before approval.
```

That is a successful product outcome.
