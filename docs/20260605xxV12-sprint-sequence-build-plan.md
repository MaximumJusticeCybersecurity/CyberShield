# 20260605xxV12 Sprint Sequence Build Plan

## Purpose

Convert the frozen CyberShield V1 architecture into executable sprint packages.

## Scope Freeze

CyberShield V1 is frozen around one workflow:

```text
AI-generated vendor-risk recommendation in -> defensible Trust Decision Record out
```

Do not add dashboards, TrustMap-first surfaces, runtime agents, autonomous remediation, or broad governance features before this workflow works.

## Sprint 1: Executive Vendor-Risk Core Workflow

### Goal

Produce a clickable CyberShield prototype where a user loads the vendor-risk recommendation, sees extracted claims, sees the evidence repository, sees contradictory evidence, sees the Decision Brief, and exports a basic JSON record.

### Build

- Demo onboarding selector
- Vendor-risk recommendation intake
- Simulated model service layer
- Claim extraction output
- Claim review table
- Evidence requirement mapping
- Synthetic contradictory evidence repository
- Evidence-to-claim display
- Persistent Decision Brief
- Risk If Wrong banding
- Confidence banding
- Human review trigger
- Recommended action
- JSON export shell

### Definition of Done

Sprint 1 is complete when:

- User can run the vendor-risk contradictory evidence scenario end to end
- CyberShield extracts required vendor claims
- Material claims are identified
- Missing evidence is visible
- Contradictory evidence is visible
- CyberShield recommends Request Evidence or Escalate for Review
- JSON record is generated from structured data

## Sprint 2: Executive Brief Export

### Goal

Produce the polished executive DOCX/PDF Trust Decision Record with branding, signature block, executive findings, evidence table, contradictions, Risk If Wrong, confidence, human decision, override, limitations, and export metadata.

### Build

- Styled executive brief template
- DOCX export path
- PDF export path
- MJC/CyberShield branding placement
- Subject line
- Executive Decision Brief section
- Material Claims and Evidence Table
- Contradictory Evidence section
- Risk If Wrong section
- Confidence section
- Human Decision and Override section
- Signature block
- Export metadata
- JSON export final structure

### Definition of Done

Sprint 2 is complete when:

- DOCX export is polished and editable in Word
- PDF export is polished and presentation-ready
- Signature block is usable
- Export is understandable without the dashboard
- Brief looks like an executive artifact, not a generic report

## Sprint 3: Evidence Workbench Hardening

### Goal

Move beyond synthetic evidence display toward a credible evidence workbench.

### Build

- Evidence upload if practical
- Evidence notes
- Evidence tagging
- Evidence-to-claim linking
- Evidence freshness
- Evidence authority classification
- SOC 2 scope match
- Self-attestation flag
- Contradiction flagging
- Uploaded evidence replacement or supplement behavior

### Definition of Done

Sprint 3 is complete when:

- User can view synthetic evidence repository
- User can add evidence notes
- Evidence can be linked to claims
- Evidence caveats update the Decision Brief
- Uploaded evidence mode is clearly marked as demo or production-ready depending on implementation state

## Sprint 4: Human Review and Override

### Goal

Add accountable human decision capture without overwriting CyberShield inference.

### Build

- Reviewer role recommendation
- Multiple reviewer support
- Reviewer decision fields
- Reviewer notes
- Decision owner
- Manual override
- Residual risk acknowledgment
- Audit logging for human decisions
- Record defensibility band

### Definition of Done

Sprint 4 is complete when:

- CyberShield recommendation is preserved
- Human decision is captured separately
- Manual override requires rationale
- Reviewer notes are preserved
- Audit trail shows review activity
- Record defensibility updates based on review status

## Sprint 5: Framework Relevance Mapping

### Goal

Add lightweight relevance mapping without implying compliance proof.

### Initial References

- NIST CSF 2.0
- NIST SP 800-53
- NIST SP 800-161
- NIST AI RMF
- NIST Generative AI Profile
- OWASP LLM Top 10
- SOC 2 Trust Services Criteria

### Required Language

```text
Relevant to [framework/control]. Not verified as compliant.
```

### Definition of Done

Sprint 5 is complete when:

- Claims can map to relevant frameworks or evidence categories
- Mapping is displayed as relevance, not proof
- Required language appears in UI and exports

## Final Engineering Principle

The record is the product.

The models are the engine.

The executive brief is the proof artifact.

The vendor-risk demo is the first wedge.
