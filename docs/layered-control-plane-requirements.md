# Layered Control Plane Requirements

Version: 2026061909
Owner: Dr. Max Justice
Status: Supporting architecture, refreshed for the current Decision Assurance build

## 1. Purpose

CyberShield must remain layered rather than collapsing product logic into a monolithic page or route-specific implementation.

This document originally described the V51.1 dashboard architecture.  The layered principle remains valid, but the former TrustMap-first top-level navigation, generic score-first flow, and Proof Pack terminology are no longer the governing public architecture.

Current governing flow:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

Current preferred route:

```text
/vendor-risk-next.html
```

Current stable fallback:

```text
/vendor-risk.html
```

The vendor-risk Decision Assurance workflow overrides TrustMap-first navigation, Runtime-first navigation, multi-industry dashboards, and broad score-driven expansion.

## 2. Required Current Layers

### 2.1 Presentation Layer

What the buyer sees.

Current surfaces:

- Buyer-focused landing experience
- Intake and personalization
- Recommendation under review
- Claims
- Evidence
- Gaps and contradictions
- Validator checks
- Candidate actions
- Risk If Wrong
- Confidence Band
- Human Review Required
- Decision Brief
- AI Trust Decision Record
- Export and capture actions

Requirements:

- Plain-English buyer value must appear before architecture language.
- Aegis remains internal.
- TrustMap and Runtime must not lead the public experience.
- No visible internal build numbers in the application or report.

### 2.2 Interaction Layer

How the visitor moves through the decision review.

Includes:

- onboarding and personalization
- vendor and contradiction selection
- sample recommendation loading
- claim inspection
- evidence inspection
- contradiction selection
- validator explanation
- candidate-action comparison
- human decision and override
- report generation
- browser print and Save PDF
- capture submission

Requirement:

Every visible interactive object must explain, route, calculate, download, record a decision, or trigger a defined next step.  No dead clicks.

### 2.3 Governance and Meaningful Human Authority Layer

The ownership, accountability, contestability, and approval layer.

Includes:

- decision owner
- accountable reviewer
- reviewer role
- escalation path
- authority boundary
- ability to reject or defer
- residual-risk acknowledgment
- override rationale
- ceremonial-approval detection

Requirement:

A human approval is not valid unless the reviewer can understand the recommendation, inspect evidence, see alternatives, challenge it, slow the process, reject it, document rationale, and knowingly accept residual risk.

### 2.4 Trust Kernel Lite / Decision Logic Layer

The structured decision-evaluation harness.

Includes:

- domain-fit classification
- recommendation classification
- claim extraction
- materiality
- evidence requirement mapping
- evidence sufficiency
- missing evidence
- contradiction detection
- deterministic validators
- Risk If Wrong
- Confidence Band
- candidate-action ranking
- human review gate
- recommended action
- record defensibility

Requirement:

Decision logic must live in shared modules, registries, mappers, or equivalent structured services rather than being duplicated across routes or embedded as uncontrolled UI logic.

### 2.5 Evidence Layer

The source, proof, and contradiction layer.

Includes:

- evidence type
- source type
- evidence date and freshness
- scope
- independence
- self-attestation
- relevance
- completeness
- missing evidence
- contradictory evidence
- source trace
- synthetic-demo labeling

Requirement:

Every material claim must identify its required evidence, available evidence, missing evidence, contradictory evidence, and limitations.

### 2.6 Decision and Routing Layer

The admissibility and next-action layer.

Current candidate actions:

- Accept
- Accept with Caveat
- Request Evidence
- Revise Recommendation
- Escalate for Review
- Reject
- Quarantine
- Defer or No Action where appropriate

Current vendor-risk default:

```text
Request Evidence
```

Secondary trigger:

```text
Escalate for Review
```

Requirement:

CyberShield must explain why the selected action is more defensible than the alternatives.

### 2.7 Canonical Record and Report Layer

The shared decision artifact layer.

Primary artifact:

```text
AI Trust Decision Record
```

Canonical mapper:

```text
src/atdr/trust-decision-record-schema-mapper.js
```

The same canonical object must support:

- on-screen record
- JSON download
- Google Sheet capture
- browser Print / Save PDF
- future DOCX export

Requirement:

Do not create parallel route-specific record contracts when the shared mapper can be extended.

### 2.8 Boundary, Audit, and Source-of-Truth Layer

The capability-truth and provenance layer.

Includes:

- route status
- preferred and fallback designation
- prototype boundary
- report ID
- generated timestamp
- source status
- simulated versus configured capability
- current capture configuration
- limitations
- release metadata
- requirement traceability

Requirements:

- Clearly distinguish implemented, simulated, configured-but-unverified, planned, and deferred capabilities.
- Do not claim Google Sheet success until a real row is verified.
- Do not claim production readiness, live model analysis, autonomous enforcement, or compliance certification unless implemented and tested.

## 3. Current Layer Flow

```text
Recommendation Intake
-> Domain Fit
-> Claim Extraction
-> Evidence Requirements
-> Evidence Sufficiency and Contradictions
-> Validator Checks
-> Risk If Wrong and Confidence Band
-> Candidate Action Comparison
-> Meaningful Human Authority
-> Human Decision or Override
-> Canonical AI Trust Decision Record
-> Screen / JSON / Print / Capture
```

## 4. Historical Terminology Mapping

The following older terms may remain in historical routes or documents but are not current buyer-facing primary terms:

| Historical term | Current treatment |
|---|---|
| Proof Pack | AI Trust Decision Record |
| Trust score | Plain bands and explainable findings |
| TrustMap-first navigation | Deferred supporting view |
| Runtime-first navigation | Deferred supporting architecture |
| Executive OS | Not current public positioning |
| Operational Trust Control Plane | Internal architecture only, not above the fold |
| Allow / Constrain / Escalate / Block only | Expanded candidate-action comparison |

## 5. Deferred Layers and Views

Do not prioritize until the immediate forward build sequence is complete:

- TrustMap-first rebuild
- Runtime agents
- broad governance dashboards
- multi-industry templates
- generic trust scores
- autonomous action
- production integrations

## 6. Conflict Rule

This document is supporting architecture.

If it conflicts with any of the following, the newer governing source controls:

1. `docs/2026061909-forward-build-plan.md`
2. `docs/ARCHITECT-ENGINEER-START-HERE.md`
3. `docs/architecture-library-status.md`
4. `docs/engineer-next-build-instructions.md`
5. `docs/requirements-traceability-matrix.md`
6. `release-manifest.json`
7. `route-manifest.json`

If current governing documents conflict with one another, stop and run the Requirements Steward process before implementation.
