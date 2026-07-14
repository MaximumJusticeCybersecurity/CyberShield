# AIDA AI Trust Decision Record Standard v0.1

Status: Initial methodology standard  
Owner: Dr. Max Justice

## Relationship to protected CyberShield schema

This document defines the human and methodological content standard for an AI Trust Decision Record.  The existing protected CyberShield schema and contract remain controlling for implementation.  Any schema change requires the current Requirements Steward, security, verifier, and owner approval process.

## Required record content

Every consequential record should contain:

1. Record identity and timestamp.
2. Decision domain and use case.
3. Original AI-generated recommendation.
4. Intended decision or action.
5. Accountable decision owner.
6. Extracted material claims.
7. Claim classification.
8. Supporting evidence.
9. Contradictory evidence.
10. Missing or unavailable evidence.
11. Material assumptions and inferences.
12. Source provenance, authority, freshness, relevance, and independence.
13. Commercial incentives and conflicts where material.
14. Risk if wrong.
15. Reversibility and time sensitivity.
16. Challenge-tested status and results.
17. Confidence band and plain-language explanation.
18. Evidence sufficiency determination.
19. Decision admissibility determination.
20. Required human review or authority.
21. CyberShield recommended action.
22. Conditions that would change the recommendation.
23. Final human decision.
24. Human rationale, override, dissent, or acceptance of residual risk.
25. Known limitations and unresolved questions.
26. Record version and relevant model, prompt, policy, tool, source, and evaluation versions where available.

## Separation requirements

The record shall visibly separate:

- AI-generated content;
- external evidence;
- CyberShield-generated analysis;
- automated recommendations;
- human review; and
- final accountable human action.

## Allowed outcomes

The record shall support:

- Proceed
- Proceed with constraints
- Request evidence
- Modify
- Monitor
- Defer
- Escalate
- Reject
- No additional action justified
- Out of scope

## Confidence requirement

A confidence band shall never stand alone.  The record must explain the principal evidence, missing evidence, contradictions, assumptions, source limitations, and consequence that produced the band.

## Human authority requirement

For consequential decisions, the record shall show whether the reviewer had enough information and practical authority to understand, challenge, reject, modify, defer, escalate, or accept the recommendation.

## Audit requirement

The record should be sufficiently clear that a later executive, auditor, regulator, attorney, incident reviewer, or affected stakeholder can reconstruct:

- what was known at the time;
- what was unknown;
- why the recommendation was accepted, constrained, or rejected;
- who owned the decision; and
- what evidence would have changed the outcome.

## Minimum executive summary

The first page or first screen should answer:

- What did the AI recommend?
- Should the organization act?
- Why?
- What could happen if it is wrong?
- What is missing?
- Who must decide?

## Prohibited representations

A record shall not claim that:

- AI confidence is proof;
- framework mapping proves compliance;
- provenance proves truth;
- a second model independently validates the first unless independence is established;
- human review occurred merely because a button or approval field exists; or
- the recommendation is safe for production execution without implemented and evidenced controls.
