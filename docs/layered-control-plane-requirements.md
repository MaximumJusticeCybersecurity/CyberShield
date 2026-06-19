# Layered Control Plane Requirements

Version: 2026061910
Owner: Dr. Max Justice
Status: Supporting architecture refreshed for the current Decision Assurance build

## 1. Purpose

CyberShield must remain layered rather than collapsing decision logic, evidence, governance, reporting, and capture into route-specific code.

Governing product flow:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

Preferred route:

```text
/vendor-risk-next.html
```

Stable fallback:

```text
/vendor-risk.html
```

Vendor-risk Decision Assurance overrides older TrustMap-first, Runtime-first, dashboard-first, and generic-score-first architecture assumptions.

## 2. Required Current Layers

### 2.1 Presentation

Buyer-facing surfaces:

- landing and value proposition
- recommendation under review
- claims
- evidence requirements
- evidence gaps and contradictions
- validators
- Risk If Wrong
- Confidence Band
- candidate actions
- human review requirement
- decision brief
- AI Trust Decision Record
- export and capture actions

Requirements:

- Plain-English buyer value appears before architecture language.
- Aegis remains internal.
- TrustMap and Runtime do not lead the public experience.
- No visible internal build numbers appear in the application or report.

### 2.2 Interaction

How the user moves through the decision review:

- intake and personalization
- vendor and contradiction selection
- sample recommendation loading
- claim and evidence inspection
- validator explanation
- candidate-action comparison
- human decision or override
- report generation
- browser Print / Save PDF
- capture submission

Requirement:

Every visible interactive object must explain, route, calculate, download, record a decision, or trigger a defined next step. No dead clicks.

### 2.3 Governance and Meaningful Human Authority

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

Human approval is not meaningful unless the reviewer can understand the recommendation, inspect evidence, see alternatives, challenge it, slow the process, reject it, document rationale, and knowingly accept residual risk.

### 2.4 Trust Kernel Lite Decision Logic

The structured decision-evaluation harness.

Includes:

- Domain Fit
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

Decision logic must live in shared modules, registries, mappers, or equivalent structured services rather than duplicated across routes or embedded as uncontrolled UI logic.

### 2.5 Evidence

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

Every material claim must identify required evidence, available evidence, missing evidence, contradictory evidence, and limitations.

### 2.6 Decision and Routing

The admissibility and next-action layer.

Candidate actions include:

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

### 2.7 Canonical Record and Report

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

### 2.8 Boundary, Audit, and Source-of-Truth

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

## 3. Active Flow

```text
Recommendation Intake
-> Domain Fit
-> Claims
-> Evidence Requirements
-> Evidence and Contradictions
-> Validators
-> Risk If Wrong and Confidence
-> Candidate Actions
-> Meaningful Human Authority
-> Human Decision
-> Canonical AI Trust Decision Record
-> Screen, JSON, Print, and Capture
```

## 4. Historical Terminology Mapping

| Historical term | Current treatment |
|---|---|
| Proof Pack | AI Trust Decision Record |
| Trust score | Plain bands and explainable findings |
| TrustMap-first navigation | Deferred supporting view |
| Runtime-first navigation | Deferred supporting architecture |
| Executive OS | Not current public positioning |
| Operational Trust Control Plane | Internal architecture only |
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

This is supporting architecture. The newer governing source controls in this order:

1. `docs/2026061909-forward-build-plan.md`
2. `docs/architecture-library-status.md`
3. `docs/ARCHITECT-ENGINEER-START-HERE.md`
4. `docs/engineer-next-build-instructions.md`
5. `docs/requirements-traceability-matrix.md`
6. `release-manifest.json`
7. `route-manifest.json`

If governing documents conflict, stop and run the Requirements Steward process before implementation.
