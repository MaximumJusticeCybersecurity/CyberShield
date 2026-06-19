# CyberShield Architect and Engineer Start Here

Current version: 2026061909

## Governing Plan

Read first:

```text
docs/2026061909-forward-build-plan.md
```

## Architecture Library Status

Then read:

```text
docs/architecture-library-status.md
```

This index identifies current, supporting, superseded, and historical documents.  Do not build from an older architecture or decision record merely because it remains in the repository.

## Engineer Instructions

Then read:

```text
docs/engineer-next-build-instructions.md
```

## Required Architecture and Requirements Library

```text
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

Do not use an older Sheet ID found in historical documents unless the owner explicitly approves a migration.

## Do Not Prioritize Yet

- Public Aegis positioning
- TrustMap-first rebuild
- Runtime agents
- Generic trust scores
- Broad governance dashboards
- Multi-industry demos before vendor-risk is proven
- Autonomous approval
- Production-readiness claims

## Conflict Rule

If a historical decision record conflicts with the forward build plan, current engineer instructions, architecture library status, route manifest, or capture configuration, the current governing documents control.

If two current documents conflict, stop and run the Requirements Steward process before coding.

## First Required Action

Run the Requirements Steward process, then begin:

```text
2026061143-report-layout-polish-after-print-test
```
