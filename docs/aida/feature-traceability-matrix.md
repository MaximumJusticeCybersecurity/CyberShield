# AIDA Feature Traceability Matrix

Status: Initial baseline  
Owner: Dr. Max Justice

## Rule

Every material CyberShield feature must trace to:

1. an AIDA principle;
2. a validated or explicitly labeled customer pain point;
3. a buyer or accountable user;
4. a measurable business or mission outcome;
5. an AI Trust Decision Record element; and
6. a verification path.

A feature that cannot satisfy these fields remains deferred.

## Matrix

| Feature / Capability | AIDA Principle | Customer Pain | Primary Buyer / User | Outcome | AI Trust Decision Record Element | Status |
|---|---|---|---|---|---|---|
| Recommendation intake | AI recommendations are not facts | AI outputs arrive without structured review | CISO, CIO, risk leader | Creates a reviewable decision object | Original recommendation; intended action | Current pilot |
| Claim extraction | Evidence before confidence | Reviewers cannot see what assertions drive the recommendation | Analyst, auditor, decision owner | Makes the recommendation inspectable | Material claims; claim classification | Current pilot |
| Evidence mapping | Trust must be earned through evidence | Supporting proof is scattered or absent | CISO, compliance, audit | Reduces unsupported reliance | Supporting and contradictory evidence | Current pilot |
| Missing-evidence detection | Missing evidence remains visible | Polished outputs conceal evidence gaps | Risk, compliance, legal | Prevents premature action | Missing or unavailable evidence | Current pilot |
| Assumption and inference separation | Distinguish facts, assumptions, and inference | Reviewers mistake inference for fact | Decision owner, auditor | Improves legibility and challenge | Assumptions and inferences | Current pilot |
| Risk-if-wrong classification | Consequence before confidence | Review rigor is disconnected from stakes | CISO, CFO, mission owner | Aligns review with consequence | Risk if wrong; reversibility | Current pilot |
| Confidence explanation | Confidence must be explainable | Scores are opaque and falsely precise | Executive, regulator, auditor | Makes confidence defensible | Confidence band and rationale | Current pilot |
| Meaningful Human Authority | Human authority must be real | Human review becomes ceremonial | Executive, legal, compliance | Preserves accountable control | Required review; human decision | Current pilot |
| Challenge testing | Trust must withstand challenge | Recommendations are accepted without skeptical review | CISO, architect, risk leader | Exposes contrary evidence and alternatives | Challenge-tested status | Current / refine |
| AI Trust Decision Record | Every consequential decision is auditable | Organizations cannot reconstruct why AI was trusted | Executive, auditor, regulator | Creates defensible decision evidence | Complete record | Current pilot |
| Customer discovery workflow | Build from verified need | Product assumptions are not day-in-the-life evidence | Founder, product owner | Establishes product-market evidence | Interview evidence linkage | Immediate workstream |
| Decision Assurance Assessment | Problem and solution travel together | Buyers need help before they are ready for software | CISO, CIO, compliance | Creates service-led adoption and learning | Assessment findings and roadmap | Next commercial hypothesis |
| Runtime monitoring | Trust is continuously evaluated | Conditions change after approval | CISO, platform owner | Detects material change and reopens review | Reassessment trigger and runtime evidence | Future |
| Multi-agent trust | Governance scales with autonomy | Agents influence each other across boundaries | CIO, CAIO, CISO | Controls propagation and coordination risk | Agent and decision lineage | Future |
| TrustMap | Visuals must support decisions | Relationship and influence chains become difficult to understand | Executive, architect | Improves operational legibility | Decision and evidence path | Deferred unless tied to pilot evidence |

## Feature intake questions

Before acceptance, the Requirements Steward shall ask:

- Which exact AIDA principle does this support?
- Which observed customer workflow requires it?
- Who owns the problem?
- What measurable outcome changes?
- Which record element improves?
- What evidence would prove the feature works?
- Is a smaller manual, service-led, or reversible option sufficient?
- Does this broaden the current pilot without owner approval?

## Status language

Use only:

- Current pilot
- Approved next
- Hypothesis requiring customer validation
- Future
- Deferred
- Rejected
- Superseded

Do not label a feature implemented, validated, operational, or production-ready without exact evidence.
