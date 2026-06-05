# 20260605xxV1 ATDR Buyer Path Plan

## Purpose

Define buyer-specific demo paths for CyberShield AI Decision Assurance.

The product story should flex based on who is watching.

Core workflow remains:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

## Buyer Path 1: CISO / vCISO

### Pain

AI-generated security recommendations may drive risk acceptance, remediation deferral, compensating control decisions, or production control changes without enough evidence.

### Demo Scenario

```text
Security: Vulnerability Risk Acceptance
```

### What To Emphasize

- Risk If Wrong
- Compensating control evidence
- Asset exposure
- Risk owner approval
- Human review gate
- Audit-ready decision record

### Buyer Question

```text
Where are teams already using AI to justify security risk acceptance or remediation delay?
```

### Close

Offer an AI Recommendation Assurance Sprint focused on vulnerability risk acceptance or control-change recommendations.

## Buyer Path 2: GRC / Compliance Leader

### Pain

AI may claim a policy satisfies a framework control, but policy existence is not implementation evidence or operating effectiveness.

### Demo Scenario

```text
Compliance: NIST Control Claim
```

### What To Emphasize

- Framework relevance versus compliance proof
- Required warning language
- Missing implementation evidence
- Missing test evidence
- Review ownership
- Exportable record

### Buyer Question

```text
Where are teams using AI to map controls or produce compliance language that someone may rely on too quickly?
```

### Close

Offer an AI Recommendation Assurance Sprint focused on AI-generated compliance mappings and control claims.

## Buyer Path 3: Vendor-Risk / Procurement Owner

### Pain

AI may recommend vendor approval because the vendor has SOC 2 or says they encrypt data, but those facts do not automatically prove low risk.

### Demo Scenario

```text
Vendor Risk: Contradictory Evidence
```

### What To Emphasize

- SOC 2 scope
- Report freshness
- Encryption evidence
- Customer data use
- Subprocessors
- Contractual controls
- Unsupported approval leap

### Buyer Question

```text
Where are AI-generated vendor recommendations influencing approval before scope, data use, or contract evidence is reviewed?
```

### Close

Offer an AI Recommendation Assurance Sprint focused on AI vendor approval or third-party risk recommendations.

## Buyer Path 4: Executive / Investor

### Pain

Leadership wants AI adoption, but unmanaged AI recommendations create hidden decision risk that is hard to defend later.

### Demo Scenario

Start with:

```text
Vendor Risk: Contradictory Evidence
```

Then show:

```text
Executive Brief Preview
```

### What To Emphasize

- The record is the product
- Board-readable artifact
- Human accountability
- Risk if wrong
- Evidence gaps
- Repeatable decision process

### Buyer Question

```text
If a team acts on bad AI advice, what record proves the organization reviewed the decision responsibly?
```

### Close

Offer a pilot that produces several AI Trust Decision Records and an executive findings brief.

## Buyer Path 5: AI Governance Leader

### Pain

Policies and principles do not prove that a specific AI-generated recommendation was safe enough to act on.

### Demo Scenario

Use all three scenarios briefly:

- Vendor Risk
- Security
- Compliance

### What To Emphasize

- Repeatable workflow
- Claim extraction
- Evidence mapping
- Human review gates
- Exportable records
- Governance evidence

### Buyer Question

```text
How does your AI governance program prove that individual AI-influenced decisions were reviewed before action?
```

### Close

Offer a pilot integrating CyberShield ATDR into an AI governance operating model.

## Buyer Path Decision Tree

Ask first:

```text
Which type of AI-generated recommendation is most dangerous in your environment right now?
```

If they answer security:

```text
Show vulnerability risk acceptance.
```

If they answer compliance:

```text
Show NIST control claim.
```

If they answer vendors or procurement:

```text
Show vendor-risk contradictory evidence.
```

If they answer executive risk or board visibility:

```text
Show vendor-risk demo then executive brief.
```

If they answer governance:

```text
Show the workflow across all three demos.
```

## Required Product Language

Use:

```text
CyberShield creates decision evidence.
```

Avoid:

```text
CyberShield proves compliance.
CyberShield approves vendors.
CyberShield replaces the CISO.
CyberShield replaces legal review.
```

## Integration With Demo Control Room

Future enhancement:

Add buyer-path buttons to `demo.html`:

- CISO / vCISO Path
- GRC Path
- Vendor-Risk Path
- Executive Path
- AI Governance Path

Each button should show:

- Recommended scenario
- Main pain point
- Talk track
- Close question
- Recommended offer
