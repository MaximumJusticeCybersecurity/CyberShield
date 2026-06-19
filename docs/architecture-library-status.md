# CyberShield Architecture and Requirements Library Status

Version: 2026061910
Owner: Dr. Max Justice
Audience: Architect, engineer, builder, requirements steward

## 1. Governing Hierarchy

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

If two current governing documents conflict, stop and run the Requirements Steward process before implementation.

## 2. Governing Product Flow

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

The record is the product.

Vendor-risk Decision Assurance remains the first proof point.

## 3. Current Layer Model

1. Presentation
2. Interaction
3. Governance and Meaningful Human Authority
4. Trust Kernel Lite decision logic
5. Evidence
6. Decision and routing
7. Canonical record and report
8. Boundary, audit, and source-of-truth

## 4. Active Decision Assurance Flow

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

## 5. Current Route Hierarchy

Preferred high-touch demo:

```text
/vendor-risk-next.html
```

Stable fallback:

```text
/vendor-risk.html
```

Do not promote a QA, smoke, workbench, or legacy route to public-primary status without owner approval.

## 6. Current Build Sequence

```text
2026061143-report-layout-polish-after-print-test
2026061144-feedback-integration-after-review
2026061145-route-manifest-refresh
2026061146-canonical-record-unification
2026061147-google-sheet-row-verification
```

## 7. Current and Binding Decisions

- AI Trust Decision Record is the public artifact name.
- Aegis remains internal.
- Trust Kernel Lite is supporting decision architecture.
- TrustMap, Runtime agents, generic trust scores, broad dashboards, and multi-industry expansion remain deferred.
- Browser Print / Save PDF is the current export path.
- One canonical record object must serve screen, JSON, print, and capture.
- Current capture configuration comes from `src/atdr/report-capture-config.js`.
- Current configured Sheet ID is `1SDfqw-rRuluqBdPUT6Ex4UIajO-CCEtny84OTMKhQ3w` unless the owner approves migration.
- No Google Sheet success claim is allowed until a real row is verified.

## 8. Governing Documents

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
release-manifest.json
route-manifest.json
```

## 9. Supporting Architecture Documents

Supporting documents may define future capabilities, but they do not override the immediate build sequence.

Examples:

```text
docs/layered-control-plane-requirements.md
docs/security-engineering-baseline.md
docs/2026061721-human-legibility-agency-requirements.md
docs/2026061717-harness-self-improvement-requirements.md
```

## 10. Historical or Superseded Documents

Historical documents remain for provenance only. They must not override current architecture.

Examples:

```text
docs/v29-decision-record.md
docs/2026061021-report-capture-endpoint-scaffold.md
docs/2026061022-report-capture-apps-script-contract.md
docs/2026061113-google-sheets-capture-deployment.md
docs/2026061116-release-readiness-foundation.md
older V-numbered build decisions and route descriptions
```

Common stale assumptions include:

- old Sheet ID
- old primary route
- old artifact terminology
- old build priority
- old persistence assumption
- pre-canonical record schema
- TrustMap-first or Runtime-first architecture

## 11. Builder Rule

Before changing code:

1. Confirm the approved requirement or defect.
2. Confirm the correct route.
3. Confirm the canonical record contract.
4. Confirm the current capture source of truth.
5. Confirm whether the capability is current or deferred.
6. Update traceability and library status after material changes.
