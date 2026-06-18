# 2026061815 Sandeep Demo Path and Advisor Briefing

Date: 2026-06-18

Status: Accepted briefing package, documentation only

Owner: Dr. Max Justice

Scope: CyberShield advisor review, Sandeep walkthrough, controlled demo, pilot feedback

## 1. Purpose

This document gives the next builder or advisor-prep agent a focused Sandeep walkthrough for CyberShield.

The demo must stay simple:

```text
CyberShield makes AI-influenced decisions legible, reviewable, and accountable.
```

Supporting line:

```text
CyberShield helps organizations prove why an AI-influenced recommendation was trusted, limited, rejected, escalated, or deferred for more evidence.
```

## 2. Preferred route

Use:

```text
/vendor-risk-next.html
```

Use fallback only if needed:

```text
/vendor-risk.html
```

The rich route is preferred for advisor review because it better shows validators, candidate action comparison, AI Trust Decision Record naming, reviewer block, and prototype capture language.

## 3. Opening frame

Use this opening:

```text
Organizations are starting to rely on AI-generated recommendations, but they still need to prove whether those recommendations are defensible before acting.  CyberShield takes an AI recommendation and turns it into an AI Trust Decision Record.
```

Do not open with Aegis.

Do not open with Trust Kernel.

Do not open with broad AI safety.

Open with the buyer problem.

## 4. Demo path

1. Open `/vendor-risk-next.html`.
2. Enter first name, optional company, and optional vendor.
3. Show the AI recommendation: approve the vendor because it has SOC 2, encrypts data, and appears low risk.
4. Explain that the recommendation sounds reasonable.
5. Select a contradiction type or Show All Evidence Issues.
6. Show claims extracted from the AI recommendation.
7. Show material claims and required evidence.
8. Show missing, weak, stale, self-attested, scope-mismatched, or contradictory evidence.
9. Show deterministic validator checks.
10. Show the candidate action comparison.
11. Explain why Request Evidence is the strongest defensible action.
12. Explain why Escalate for Review is triggered.
13. Show Risk If Wrong: High.
14. Show Confidence Band: Low Confidence.
15. Show Human Review Required.
16. Generate or print the AI Trust Decision Record.
17. Explain that capture is prototype-grade and must not be represented as production CRM infrastructure.

## 5. What to say at each moment

### AI recommendation

```text
This sounds like the kind of recommendation a busy team might accept.  It cites SOC 2, encryption, and low risk.  CyberShield's job is to determine whether that conclusion is defensible.
```

### Claims

```text
CyberShield breaks polished AI output into reviewable claims.  That matters because the conclusion may sound confident while some of the claims underneath it are unsupported.
```

### Evidence issues

```text
CyberShield separates weak, missing, stale, self-attested, contradictory, and scope-mismatched evidence.  The point is not to punish the vendor.  The point is to know whether the organization can defend acting on the recommendation.
```

### Validators

```text
CyberShield does not use a magic trust score.  It asks evidence questions.  Is SOC 2 enough?  Does the report cover the service?  Is encryption proven?  Are subprocessors known?  Is human review required?
```

### Candidate actions

```text
Approve loses because the evidence is not sufficient.  Accept with caveat is premature.  Escalate is required but incomplete.  Request Evidence wins because it preserves defensibility before approval.
```

### Trust Decision Record

```text
The record is the product.  It shows what AI influenced, what evidence supports the decision, what assumptions remain, what the risk is if wrong, and what the human should do next.
```

## 6. Advisor feedback questions

Ask Sandeep or another advisor:

   - Who owns this pain today?
   - Would this land first with CISO, vCISO, GRC, procurement, CAIO, CIO, legal, or vendor-risk teams?
   - Is vendor risk the right first wedge?
   - Does AI Trust Decision Record make immediate sense?
   - Does Harness Health Assessment make sense as a buyer-facing concept?
   - What makes this sound credible?
   - What makes this sound like AI judging AI?
   - Would a 3 to 5 recommendation pilot be a reasonable first engagement?
   - What existing process or tool would a buyer compare this against?
   - What would make the demo more immediately useful to a public-sector, GovCon, or regulated buyer?

## 7. Desired advisor reaction

The desired reaction is not:

```text
That is a cool AI tool.
```

The desired reaction is:

```text
Organizations need this before they rely on AI-generated recommendations in vendor risk, security, compliance, and procurement decisions.
```

## 8. Objection handling

### Is this AI judging AI?

No.  CyberShield is record-first and evidence-first.  It checks claims, evidence, gaps, contradictions, risk-if-wrong, confidence, and required human review.

### Is this production-ready?

No.  It is a static prototype and controlled advisory pilot workflow.

### Does this approve or reject vendors?

No.  It recommends the most defensible next action.  In the current sample, the strongest action is Request Evidence.

### Does SOC 2 mean approve?

No.  SOC 2 is evidence.  It is not automatic approval.

### Does framework mapping prove compliance?

No.  Mapping shows relevance.  Compliance requires implementation and operating evidence.

## 9. Pilot close

Close with:

```text
The first pilot is simple.  Give CyberShield three to five AI-generated recommendations your team might rely on.  CyberShield produces AI Trust Decision Records showing claims, evidence gaps, Risk If Wrong, confidence, human review, harness health, and the strongest defensible next action.
```

## 10. What not to say

Do not say:

   - production-ready SaaS
   - live LLM-backed analyzer
   - autonomous vendor approval
   - compliance certification
   - production CRM integration
   - live enforcement
   - automatic SOC 2 approval
   - Aegis OS is the product being sold in this demo

## 11. Success criteria

The advisor briefing succeeds when Sandeep or another reviewer can explain CyberShield back as:

```text
CyberShield helps teams check whether an AI recommendation is defensible before they act, and it creates a decision record showing claims, evidence gaps, risk, confidence, human review, and next action.
```
