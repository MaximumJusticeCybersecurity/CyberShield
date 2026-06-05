# 2026060415 ATDR Presenter Script

## Purpose

Use this script when showing CyberShield AI Decision Assurance to a serious reviewer, advisor, potential buyer, partner, or investor.

The goal is not to explain every feature.  The goal is to make the viewer understand why acting on AI-generated security, compliance, or vendor-risk advice without a defensible record is dangerous.

## Opening

Say:

```text
CyberShield AI Decision Assurance turns AI-generated recommendations into defensible AI Trust Decision Records.
```

Then say:

```text
The product is not a dashboard.  The product is the record an organization can review, challenge, sign, export, and defend later.
```

## Core Doctrine

Say:

```text
AI confidence is not evidence.
```

Then say:

```text
CyberShield separates what the AI claimed, what the evidence says, what CyberShield inferred, and what the human reviewer decided.
```

## Recommended Demo Route

Start at:

```text
/demo.html
```

Then open:

```text
/launch.html
/atdr.html
/brief.html
/atdr-smoke.html
```

Only open Trust Kernel if the viewer asks where the broader trust surface lives.

## Recommended First Scenario

Start with:

```text
Vendor Risk: Contradictory Evidence
```

Why:

- It is easy for executives to understand.
- SOC 2 often creates false comfort.
- Vendor approval creates real business risk.
- The unsupported leap is obvious.

## Demo Step 1: Launch Page

Say:

```text
This is the new CyberShield direction.  One workflow first: AI recommendation in, AI Trust Decision Record out.
```

Point out:

- The record is the product.
- CyberShield is brought to you by Maximum Justice Cybersecurity.
- Trust Kernel is preserved as the underlying trust surface.

## Demo Step 2: ATDR Workbench Intake

Say:

```text
Here is the AI recommendation.  It sounds reasonable: approve Vendor X because they have SOC 2, encrypt customer data, and appear low risk.
```

Then say:

```text
CyberShield does not ask whether this sounds good.  It asks whether the organization can defend acting on it.
```

## Demo Step 3: Claims

Say:

```text
The first transformation is claim atomization.  A single AI sentence becomes separate claims that can be evaluated.
```

Point out:

- Vendor should be approved
- Vendor has SOC 2
- SOC 2 covers the evaluated service
- Vendor encrypts customer data
- Customer data access is acceptable
- Vendor appears low risk
- SOC 2 plus encryption is sufficient for approval

Then say:

```text
That last item is the trap.  SOC 2 plus encryption does not automatically equal approval.
```

## Demo Step 4: Evidence

Say:

```text
Evidence is not equal.  A vendor assertion is not the same as independent proof.  A SOC 2 report is not useful unless scope, date, and service coverage match the decision.
```

Point out:

- SOC 2 exists but scope is unclear
- Encryption evidence is self-attested
- Customer data use requires review
- Subprocessor list may be stale
- Business pressure is not risk acceptance

## Demo Step 5: Gaps

Say:

```text
CyberShield treats missing evidence as a finding, not an embarrassment.
```

Then say:

```text
The value here is not that CyberShield gives a magic answer.  The value is that it shows why the AI recommendation is not defensible yet.
```

## Demo Step 6: Risk If Wrong

Say:

```text
Risk If Wrong makes the AI answer operational.  What happens if the organization acts on this and the recommendation is wrong?
```

Tie to:

- Vendor-risk exposure
- Data-use exposure
- Contractual exposure
- Customer impact
- Reputational damage

## Demo Step 7: Confidence

Say:

```text
Confidence is not trust.  Confidence reflects what CyberShield can support based on evidence, gaps, conflicts, and review state.
```

## Demo Step 8: Human Review

Say:

```text
CyberShield does not hide accountability inside the model.  It requires the right human reviewer when the risk demands it.
```

Point out:

- Vendor-risk owner
- Security SME or vCISO
- Legal counsel if customer data use is implicated

For this demo, choose:

```text
Request Evidence
```

Suggested reviewer note:

```text
Approval is deferred because SOC 2 scope does not clearly cover the evaluated service, customer data use requires review, and encryption evidence is self-attested.
```

## Demo Step 9: Executive Brief

Open:

```text
/brief.html
```

Say:

```text
This is what survives the dashboard.  The record can be printed, saved, reviewed, signed, and attached to a decision process.
```

Point out:

- Recommendation under review
- Claims
- Required evidence
- Missing support
- Risk If Wrong
- Confidence rationale
- Human review requirement
- Limitations
- Signature block

## Demo Step 10: Smoke Test

Open:

```text
/atdr-smoke.html
```

Say:

```text
Before a serious demo or merge, CyberShield has a demo-readiness check.  This confirms the static scenarios still produce valid records and conservative actions.
```

## Close

Say:

```text
CyberShield does not replace executive judgment.  It structures executive judgment into a defensible record before AI-generated advice becomes enterprise action.
```

Then pause.

## Viewer Reaction We Want

The desired reaction is:

```text
I do not want my team acting on AI-generated recommendations without this kind of decision record.
```

## Do Not Say

Do not say:

- CyberShield proves compliance
- CyberShield gives legal advice
- CyberShield approves vendors
- CyberShield replaces the CISO
- CyberShield replaces GRC
- CyberShield performs production remediation
- CyberShield stores enterprise evidence in this static prototype
- CyberShield uses live model verification in this static prototype

## Boundary Statement

Use this if challenged:

```text
This is a static GitHub Pages prototype using deterministic model logic for demo reliability.  The backend version would add persistence, role enforcement, tenant boundaries, evidence storage, server-side exports, audit logging, and optional live model integration behind a feature flag.
```
