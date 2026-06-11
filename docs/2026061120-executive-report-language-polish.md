# 2026061120 Executive Report Language Polish

## Purpose

Make the CyberShield Trust Decision Record read like an executive artifact, not a technical dump.

This build is documentation/specification first because the current guided route is functional and should not be destabilized before external review.

## Product Doctrine

```text
The record is the product.
```

The guided route proves the workflow. The executive report proves the value.

## Current Executive Report Goal

When someone prints or saves the report, they should understand:

```text
The AI recommendation sounded reasonable, but CyberShield showed why approving the vendor without more evidence and human review would be risky and hard to defend.
```

## Required Report Sections

### 1. Executive Decision Summary

Required content:

- Original AI recommendation
- CyberShield recommended action
- Risk If Wrong
- Confidence Band
- Human Review Required
- Record defensibility

Preferred language:

```text
CyberShield does not recommend approving this vendor based on the AI recommendation as written. The strongest defensible action is Request Evidence. The recommendation depends on material claims that are unsupported, partially supported, self-attested, or contradicted by available evidence.
```

### 2. Why the AI Recommendation Fails

Required content:

- SOC 2 is present but scope is not enough.
- Encryption is claimed but not independently proven.
- Data-use terms create unresolved risk.
- Subprocessors are not fully identified.
- Incident notification language is weak.
- Business owner comfort is not risk acceptance authority.

Preferred language:

```text
The AI recommendation treats SOC 2 and encryption as sufficient approval evidence. CyberShield found this conclusion is not defensible because the evidence does not fully prove service scope, customer data-use limits, subprocessor transparency, incident notification timing, or accountable human approval.
```

### 3. Material Claims and Evidence Gaps

Required content:

- Claim ID
- Claim
- Materiality
- Evidence status
- Required evidence
- Conflict or caveat

Preferred framing:

```text
CyberShield separated the recommendation into material claims and identified what evidence would be needed before the recommendation could support a defensible approval decision.
```

### 4. Required Evidence Before Approval

Required content:

- Current SOC 2 report and scope confirmation
- AI service/system description inclusion
- DPA/customer data-use restriction
- Complete subprocessor list
- Incident notification timeline
- Independent encryption/key management evidence
- Vendor-risk owner approval
- Security SME review
- Legal/privacy review when data terms are implicated

### 5. Candidate Action Comparison

Required content:

| Candidate Action | Defensibility | Reason |
| --- | --- | --- |
| Approve | Not defensible | Material evidence gaps and conflicts remain. |
| Accept with Caveat | Premature | Caveats are unresolved and material. |
| Escalate for Review | Required but incomplete | Human review is required, but evidence is still needed. |
| Request Evidence | Strongest defensible action | Preserves decision defensibility before approval. |

### 6. Human Review Requirement

Required content:

- Human review required: Yes
- Required reviewer roles:
  - Vendor-Risk Owner
  - Security SME
  - Legal/Privacy reviewer when data terms are implicated
  - Business Owner

Preferred language:

```text
Human review is required because the recommendation could create vendor-risk, legal, security, operational, and reputational consequences if wrong.
```

### 7. Limitations

Required limitations:

- Static prototype.
- Deterministic analysis logic.
- No live LLM-backed analyzer.
- No production authentication.
- No tenant isolation.
- No malware scanning.
- No server-side PDF/DOCX generation.
- Browser Print / Save PDF is current export path.
- Framework mappings are relevance mappings only, not compliance proof.
- Google Sheets capture is prototype-grade, not production CRM infrastructure.

## Report Tone Rules

Use:

- plain executive language
- direct conclusions
- evidence-first framing
- defensibility language
- decision ownership language

Avoid:

- hype
- fake certainty
- generic trust scores
- production claims
- AI judging AI framing
- compliance proof claims
- vendor approval language unless approval is actually defensible

## Acceptance Criteria

The report passes if a reviewer can answer these in under two minutes:

1. What did the AI recommend?
2. What did CyberShield recommend?
3. Why is the AI recommendation not defensible as written?
4. What evidence is missing or weak?
5. What is the risk if wrong?
6. Who must review?
7. What happens next?

## Implementation Guidance

The implementation should update the print-only report generator in:

```text
src/atdr/vendor-risk-guided.js
```

Target function:

```text
printReport()
```

Do not rewrite the full route unless necessary. Keep the change small and test with:

- `/vendor-risk.html`
- `/vendor-risk-smoke.html`
- `/record-contract.html`

## Stop Conditions

Do not proceed if:

- the report implies approval
- the report hides limitations
- the report claims production readiness
- the report treats framework mapping as compliance proof
- the report treats SOC 2 as automatic approval
