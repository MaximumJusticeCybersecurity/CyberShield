# Sandeep Briefing: CyberShield Pilot vNext

Version timestamp: 2026070913  
Presentation date: July 10, 2026  
Owner and presenter: Dr. Max Justice  
Prepared by: Aegis / My AI Business Partner

## Presentation objective

Show that CyberShield is not another AI answer, score, dashboard, or autonomous approval engine.

CyberShield converts an AI-generated recommendation into a defensible decision record by exposing the recommendation's claims, evidence, assumptions, contradictions, consequence, confidence basis, and required human oversight.

## One-sentence positioning

> CyberShield helps an accountable human decide whether an AI-generated recommendation is defensible enough to act upon.

## Product contract

```text
AI Recommendation In
Trust Decision Record Out
```

## Recommended opening, 30 seconds

AI recommendations often arrive polished, confident, and ready for action.  The problem is not whether the AI can produce an answer.  The problem is whether the organization can defend acting on that answer.

CyberShield takes one AI-generated recommendation and turns it into a Trust Decision Record showing what was claimed, what evidence supports it, what is missing or contradictory, what happens if it is wrong, how confident the conclusion should be, and who must decide before action.

## Three distinctions to emphasize

### 1. Evidence sufficiency is not confidence

Evidence sufficiency asks whether the necessary support exists.

Confidence asks how strongly the available evidence and reasoning support the conclusion.

A polished recommendation can have high rhetorical confidence and still have insufficient evidence.

### 2. Risk If Wrong is not confidence

Risk If Wrong measures consequence.

It does not make a claim more or less true.  It determines how much evidence and oversight should be required before action.

### 3. Human review is not a decision outcome

Review level identifies who must decide.

The decision outcome identifies what should happen:

- proceed;
- proceed with conditions;
- request evidence;
- modify and reassess;
- defer or monitor;
- escalate;
- reject;
- take no additional action; or
- conclude there is insufficient evidence to decide.

## Recommended demonstration flow, under five minutes

### 1. Recommendation, 20 seconds

Use the current vendor-risk example:

> AI recommends approving Vendor X because they have a SOC 2 report, encrypt customer data, and appear low risk.

Ask: Would you approve, reject, or request more evidence?

### 2. Claims, 40 seconds

Show that the sentence contains multiple material claims:

- the vendor should be approved;
- the SOC 2 report exists and is current;
- the report covers the relevant AI service;
- encryption is implemented and supported;
- data use is acceptable;
- subprocessors are understood;
- incident notification is adequate;
- the vendor is low risk; and
- SOC 2 plus encryption is sufficient for approval.

The last claim is an unsupported leap unless the other evidence closes the decision.

### 3. Evidence and gaps, 50 seconds

Show:

- SOC 2 scope is unclear;
- encryption is self-attested;
- data-use language may permit service improvement or derived use;
- subprocessors are incomplete;
- incident notification timing is weak; and
- business comfort is not accountable approval.

Explain that CyberShield links evidence to claims rather than treating a document name as proof.

### 4. Decision model, 60 seconds

Show separately:

- Evidence Sufficiency: Insufficient
- Confidence: Low, because material claims are unsupported or contradicted
- Risk If Wrong: High, because approval could expose customer data and create contractual, compliance, and operational consequences
- Strongest Defensible Action: Request Evidence
- Review Requirement: Vendor-Risk Owner, Security SME, Legal or Privacy Reviewer, and Business Owner

State clearly:

> The high consequence did not lower confidence.  The weak evidence lowered confidence.  The high consequence raised the evidence threshold and review requirement.

### 5. Trust Decision Record, 40 seconds

Show that the record preserves:

- original recommendation;
- material claims;
- evidence and provenance;
- missing evidence;
- assumptions;
- contradictions;
- Risk If Wrong;
- confidence explanation;
- candidate actions;
- Strongest Defensible Action;
- required review;
- human decision and override; and
- residual risk.

### 6. Close, 20 seconds

> CyberShield does not decide instead of the human.  It makes the reasoning, evidence, uncertainty, consequence, and accountability visible before the human decides.

## What is implemented today

- Working single vendor-risk workflow
- Claims, evidence, gaps, contradictions, risk, confidence, candidate actions, and human review
- One canonical AI Trust Decision Record
- Static deterministic demonstration
- Synthetic evidence clearly labeled
- JSON and print-oriented record output
- Reusable Context Pack, Source, Missing Evidence, Human Gate, and Work Receipt components

## What vNext adds

- Domain-neutral recommendation input
- Universal Trust Decision Record core
- Structured assumptions and contradictions
- Category-level Risk If Wrong
- Evidence sufficiency separate from confidence
- Corrected review and outcome taxonomies
- Strongest Defensible Action
- Human decision and override history
- Versioned audit and provenance fields
- Domain adapters for security, compliance, vendor risk, architecture, policy, and business recommendations

## Claims not to make

Do not claim:

- every recommendation domain is already fully implemented;
- live source verification;
- production readiness;
- autonomous approval;
- compliance certification;
- protected cryptographic audit;
- operational verifier quorum;
- an overall trust score proves truth; or
- a second AI opinion is independent evidence.

## Questions for Sandeep

These questions are intended to sharpen the architecture and market fit without surrendering the product thesis.

1. Does the separation among evidence sufficiency, epistemic confidence, Risk If Wrong, decision outcome, and review requirement match how you would expect an enterprise assurance system to operate?
2. Which part of the Trust Decision Record would be most valuable to an enterprise buyer: the executive brief, the claim-evidence graph, the audit history, or the human decision and override record?
3. What minimum provenance would you expect before a record could be defensible to an auditor or regulator?
4. Where should deterministic rules stop and model-assisted judgment begin?
5. Which first use case creates the strongest enterprise pull: vendor risk, security architecture, compliance response, policy exception, or another recommendation class?
6. What would make this meaningfully different from a second-model review or an AI governance checklist?
7. Which enterprise systems or governance workflows should consume the Trust Decision Record first?
8. Should confidence be shown only at the record level, or at both claim and record levels?  Current recommendation: both.
9. What evidence would you require before moving from advisory review to runtime monitoring?
10. What is the smallest pilot you believe an enterprise would pay to test?

## Recommended request to Sandeep

Ask for one of three forms of assistance:

1. Architecture challenge: identify the weakest assumption in the vNext record and workflow.
2. Enterprise validation: identify two or three likely buyers or internal IBM stakeholders who would recognize the problem.
3. Pilot guidance: define the smallest credible enterprise pilot and the evidence required to call it successful.

## Presenter fallback

If the preferred route fails, use the current fallback route or a saved Trust Decision Record.  Do not troubleshoot live for more than 30 seconds.  The product thesis is the recommendation-to-record workflow, not the browser route.