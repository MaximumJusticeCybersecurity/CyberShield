# 20260605xxV1 ATDR DOPE Plan

## Purpose

Turn the CyberShield AI Decision Assurance prototype into a product motion that can be demonstrated, sold, delivered, and scaled.

DOPE means:

```text
D = Demo
O = Offer
P = Product
E = Engineering
```

This plan connects the static MVP, the sales narrative, the advisory offer, and the production engineering path.

## Strategic Objective

CyberShield should become the product organizations use before they act on AI-generated security, compliance, or vendor-risk recommendations.

Core workflow:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

Primary artifact:

```text
AI Trust Decision Record
```

Core doctrine:

```text
AI confidence is not evidence.
```

## D: Demo Plan

### Demo Goal

Make the viewer understand that acting on AI advice without a defensible decision record creates business, security, compliance, legal, and reputational exposure.

Desired viewer reaction:

```text
I do not want my team acting on AI-generated recommendations without this kind of record.
```

### Demo Entry Point

Use:

```text
/demo.html
```

### Demo Sequence

1. Open Demo Control Room
2. Open Launch Page
3. Open ATDR Workbench
4. Start with Vendor Risk: Contradictory Evidence
5. Show claim extraction
6. Show evidence requirements
7. Show gaps and conflicts
8. Show Risk If Wrong
9. Show confidence band
10. Show human review requirement
11. Open Executive Brief
12. Show Evidence Guide if the viewer questions evidence quality
13. Show Human Review Guide if the viewer questions accountability
14. Run Smoke Test only when discussing build readiness

### Primary Demo Wedge

Use vendor risk first.

Reason:

- Easy for executives to understand
- SOC 2 creates false comfort
- Vendor approval has real business consequences
- Customer data exposure is concrete
- Unsupported AI approval leaps are obvious

### Secondary Demo Paths

Security path:

```text
Vulnerability Risk Acceptance
```

Use for CISOs, vCISOs, security architects, and security operations leaders.

Compliance path:

```text
NIST Control Claim
```

Use for GRC leaders, auditors, compliance owners, and regulated organizations.

### Demo Assets

- `demo.html`
- `launch.html`
- `atdr.html`
- `brief.html`
- `evidence.html`
- `review.html`
- `atdr-smoke.html`
- `docs/2026060415-atdr-presenter-script.md`

### Demo Readiness Gate

A demo is ready when:

- Demo Control Room loads
- Workbench loads
- Vendor Risk demo works end-to-end
- Executive Brief renders cleanly
- Evidence Guide explains evidence quality clearly
- Human Review Guide explains accountability clearly
- Smoke Test shows GO

## O: Offer Plan

### Initial Offer Name

```text
AI Trust Decision Record Review
```

### Plain-English Offer

CyberShield helps organizations review AI-generated security, compliance, and vendor-risk recommendations before teams act on them.

The deliverable is an AI Trust Decision Record that documents:

- What the AI recommended
- What claims it made
- What evidence supports the claims
- What evidence is missing
- What happens if the AI is wrong
- Who must review it
- What action is defensible

### First Service Package

```text
AI Recommendation Assurance Sprint
```

Suggested scope:

- Review 3 to 5 AI-generated recommendations
- Produce AI Trust Decision Records
- Identify unsupported AI claims
- Identify evidence gaps
- Classify Risk If Wrong
- Identify human review gates
- Deliver executive summary
- Recommend internal workflow controls

### Ideal First Buyers

- CISO
- vCISO
- GRC lead
- Compliance owner
- Vendor-risk owner
- AI governance lead
- Procurement leader for AI vendors
- Security architecture leader
- Risk committee sponsor

### Best First Use Cases

1. AI vendor approval
2. Vendor-risk recommendation review
3. Vulnerability risk acceptance
4. Compliance control claim review
5. Policy adequacy recommendation
6. Security control implementation recommendation
7. Customer-facing AI assurance language review

### Offer Boundary

The offer does not claim:

- Legal advice
- Compliance certification
- Audit opinion
- Production approval
- Autonomous remediation
- Vendor approval authority

### Pricing Hypothesis

Advisory entry offer:

```text
$7,500 to $25,000 for an AI Recommendation Assurance Sprint
```

Productized recurring offer:

```text
$2,500 to $10,000 per month for ongoing AI Trust Decision Record support
```

Enterprise pilot:

```text
$25,000 to $75,000 for a scoped pilot with executive readout
```

These are hypotheses, not final pricing.  Validate through conversations.

## P: Product Plan

### Product Category

```text
AI Decision Assurance
```

CyberShield is not trying to be another dashboard-first governance platform.

It is a decision-record system for high-risk AI-generated recommendations.

### Product Promise

Before your team acts on AI advice, CyberShield shows what claims were made, what evidence supports them, what evidence is missing, what happens if the AI is wrong, who must review it, and what action is defensible.

### MVP Product Surfaces

Static MVP:

- Demo Control Room
- Launch Page
- ATDR Workbench
- Executive Brief Preview
- Evidence Guide
- Human Review Guide
- Smoke Test

Production MVP:

- Record intake
- Claim extraction
- Evidence workbench
- Risk If Wrong
- Confidence band
- Human review gate
- Exported AI Trust Decision Record
- Audit trail

### Core Product Objects

- TrustDecisionRecord
- Claim
- EvidenceItem
- ClaimEvidenceLink
- FrameworkMapping
- HumanReview
- AuditEvent
- ExportArtifact
- ModelRun

### Product Non-Negotiables

CyberShield must preserve separation among:

1. What the AI claimed
2. What the evidence says
3. What CyberShield inferred
4. What the human reviewer decided

CyberShield must not imply:

- AI confidence equals evidence
- Framework relevance equals compliance proof
- SOC 2 equals vendor approval
- Policy existence equals operating effectiveness
- Vendor assertion equals independent validation
- The model replaces accountable human judgment

### First Product Milestone

```text
One defensible AI Trust Decision Record for one AI-generated recommendation.
```

Do not build broad dashboards until this works.

## E: Engineering Plan

### Current Static MVP Branch

```text
feature/2026060414-atdr-decision-assurance
```

### Current Preview Branch

```text
preview-atdr-2026060420-poststatic
```

### Current PR

```text
#4 Add CyberShield ATDR static MVP demo package
```

### Engineering Sequence

1. Stabilize static MVP
2. Merge static MVP to main after review
3. Test live GitHub Pages route
4. Build backend architecture into tickets
5. Scaffold production app
6. Port deterministic ATDR engine
7. Add persistence
8. Add evidence metadata
9. Add human review workflow
10. Add server-side export
11. Add audit logging
12. Add optional live model feature flag

### Production Architecture Packages

Read in order:

- `docs/20260605xxV1-atdr-backend-architecture-package.md`
- `docs/20260606xxV1-atdr-production-mvp-foundation-plan.md`
- `docs/20260607xxV1-atdr-live-model-optionality-plan.md`
- `docs/20260605xx-20260607-atdr-post-static-roadmap-index.md`

### Engineering Guardrails

- Deterministic mode remains available
- Live model mode must be feature-flagged
- Model output must be schema-validated
- Invalid model output fails safely
- Evidence is always treated as untrusted input
- Exports must be reproducible from stored structured data
- Audit events must preserve material actions
- Human review must remain separate from CyberShield inference

## GTM Motion

### First Conversation Target

Use the demo with advisors, CISO peers, vCISO peers, vendor-risk leaders, and AI governance contacts.

### First Ask

Do not ask whether they like the tool.

Ask:

```text
Where is your organization already acting on AI-generated recommendations without a defensible record?
```

Then ask:

```text
Which of those decisions would create the most pain if the AI answer was wrong?
```

### First Proof Point

The vendor-risk demo should show that a reasonable AI recommendation can still be not defensible because material evidence is missing, weak, stale, or contradicted.

### First Close

Offer a scoped AI Recommendation Assurance Sprint.

Deliverable:

```text
3 to 5 AI Trust Decision Records plus executive findings.
```

## Success Metrics

### Demo Metrics

- Viewer understands product within 2 minutes
- Viewer understands why AI confidence is not evidence
- Viewer can explain the record artifact back to us
- Viewer identifies a real use case in their organization

### Offer Metrics

- 5 discovery conversations
- 3 qualified pain points
- 1 pilot candidate
- 1 paid sprint proposal

### Product Metrics

- Time from AI recommendation to draft record
- Number of claims extracted
- Number of missing evidence items found
- Number of human review triggers found
- Export completion rate

### Engineering Metrics

- Static MVP routes load
- Smoke test passes
- Production schema supports traceability
- Records persist
- Exports reproduce from stored data
- Audit events capture material actions

## Immediate Next Move

Use the completed static MVP as the product demonstration surface and the DOPE plan as the operating plan.

Do not add more visual complexity until review feedback proves it is needed.

The next substantial build is the backend production foundation.
