# CyberShield Architect and Engineer Start Here

Current version: 2026061910

## Governing Hierarchy

Follow this order:

1. Forward build plan
2. Architecture library status
3. Engineer next-build instructions
4. Requirements Steward
5. Current Decision Assurance requirements
6. Trust Kernel Lite architecture
7. Aegis/CyberShield boundary
8. Canonical Trust Decision Record schema
9. Current capture requirements
10. Historical documents only for provenance

## Read First

```text
docs/2026061909-forward-build-plan.md
docs/architecture-library-status.md
docs/engineer-next-build-instructions.md
docs/2026061815-first-codex-agent-requirements-steward.md
docs/cybershield-decision-assurance-requirements.md
docs/cybershield-trust-kernel-lite-architecture.md
docs/aegis-cybershield-architecture-boundary.md
docs/trust-decision-record-schema.md
docs/google-sheets-report-capture.md
docs/requirements-traceability-matrix.md
README.md
release-manifest.json
route-manifest.json
```

Do not build from an older architecture, route description, Sheet ID, or decision record merely because it remains in the repository.

## Current Architecture Layers

```text
Presentation
Interaction
Governance and Meaningful Human Authority
Trust Kernel Lite decision logic
Evidence
Decision and routing
Canonical record and report
Boundary, audit, and source-of-truth
```

## Active Decision Assurance Flow

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

## Current Product State

Preferred demo:

```text
/vendor-risk-next.html
```

Stable fallback:

```text
/vendor-risk.html
```

Public artifact:

```text
AI Trust Decision Record
```

Pilot positioning:

```text
software-assisted advisory pilot
```

Aegis remains internal.

Trust Kernel Lite supports the decision. It does not replace the buyer-facing Decision Assurance workflow.

## Immediate Build Order

```text
2026061143-report-layout-polish-after-print-test
2026061144-feedback-integration-after-review
2026061145-route-manifest-refresh
2026061146-canonical-record-unification
2026061147-google-sheet-row-verification
```

## Current Capture Source of Truth

```text
1SDfqw-rRuluqBdPUT6Ex4UIajO-CCEtny84OTMKhQ3w
```

Source:

```text
src/atdr/report-capture-config.js
```

Do not use an older Sheet ID found in historical documents unless the owner explicitly approves migration.

## Deferred Scope

- Public Aegis positioning
- TrustMap-first rebuild
- Runtime agents
- Generic trust scores
- Broad governance dashboards
- Multi-industry demos before vendor-risk is proven
- Autonomous approval
- Production-readiness claims

## Conflict Rule

If a historical record conflicts with the forward build plan, architecture library status, engineer instructions, current requirements, route manifest, release manifest, or capture config, the current governing source controls.

If two current governing sources conflict, stop and run the Requirements Steward process before coding.

## First Required Action

Run the Requirements Steward process, then continue the active build sequence.
