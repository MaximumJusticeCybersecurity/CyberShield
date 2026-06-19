# CyberShield Architecture and Requirements Library Status

Version: 2026061909
Owner: Dr. Max Justice
Audience: Architect, engineer, builder, requirements steward

## 1. Purpose

This index identifies which CyberShield architecture and requirements documents are current, supporting, superseded, or historical so engineers do not accidentally build from stale assumptions.

The governing product flow remains:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

The record is the product.

The first proof point remains vendor-risk Decision Assurance.

## 2. Governing Documents

Read these first and treat them as current source-of-truth documents:

1. `docs/ARCHITECT-ENGINEER-START-HERE.md`
2. `docs/2026061909-forward-build-plan.md`
3. `docs/engineer-next-build-instructions.md`
4. `docs/2026061908-trusted-authority-ethical-influence-standard.md`
5. `docs/2026061815-first-codex-agent-requirements-steward.md`
6. `docs/cybershield-decision-assurance-requirements.md`
7. `docs/cybershield-trust-kernel-lite-architecture.md`
8. `docs/aegis-cybershield-architecture-boundary.md`
9. `docs/trust-decision-record-schema.md`
10. `docs/google-sheets-report-capture.md`
11. `docs/requirements-traceability-matrix.md`
12. `release-manifest.json`
13. `route-manifest.json`

## 3. Current Route Hierarchy

Preferred high-touch demo:

```text
/vendor-risk-next.html
```

Stable fallback:

```text
/vendor-risk.html
```

Supporting QA and contract routes are listed in `docs/2026061909-forward-build-plan.md`.

Do not promote a QA, smoke, workbench, or legacy route to public-primary status without owner approval.

## 4. Current Build Sequence

The active sequence is:

1. `2026061143-report-layout-polish-after-print-test`
2. `2026061144-feedback-integration-after-review`
3. `2026061145-route-manifest-refresh`
4. `2026061146-canonical-record-unification`
5. `2026061147-google-sheet-row-verification`

Do not begin broad platform expansion before this sequence is complete unless the owner explicitly changes priority.

## 5. Current Architecture Decisions

### Current and binding

- Vendor-risk Decision Assurance remains the first proof point.
- Aegis remains internal.
- Trust Kernel is supporting architecture and should not dominate buyer-facing language.
- AI Trust Decision Record is the public artifact name.
- The preferred route is `/vendor-risk-next.html`.
- The fallback route is `/vendor-risk.html`.
- Browser Print / Save PDF is the current export path.
- One canonical record object must serve screen, JSON, capture, print, and future DOCX export.
- Current configured Sheet ID is read from `src/atdr/report-capture-config.js`.
- Current configured Sheet ID is `1SDfqw-rRuluqBdPUT6Ex4UIajO-CCEtny84OTMKhQ3w` unless the owner approves migration.
- No Google Sheet capture success claim is allowed until a real row is verified.

### Deferred

- Public Aegis positioning
- TrustMap-first rebuild
- Runtime agents
- Generic trust scores
- Broad governance dashboards
- Multi-industry demos before vendor-risk is proven
- Autonomous approval
- Production-readiness claims
- Live LLM analysis claims unless implemented and tested

## 6. Supporting Architecture Documents

These remain useful but are subordinate to the governing build plan:

- `docs/cybershield-trust-kernel-lite-architecture.md`
- `docs/aegis-cybershield-architecture-boundary.md`
- `docs/trust-decision-record-schema.md`
- `docs/google-sheets-report-capture.md`
- `docs/layered-control-plane-requirements.md`
- `docs/security-engineering-baseline.md`
- `docs/2026061721-human-legibility-agency-requirements.md`
- `docs/2026061717-harness-self-improvement-requirements.md`

Supporting documents may define future capabilities. They do not override the immediate build sequence.

## 7. Historical or Superseded Documents

The following documents preserve decision history but must not override the current architecture library:

- `docs/v29-decision-record.md`
- `docs/2026061021-report-capture-endpoint-scaffold.md`
- `docs/2026061022-report-capture-apps-script-contract.md`
- `docs/2026061113-google-sheets-capture-deployment.md`
- `docs/2026061116-release-readiness-foundation.md`
- older V-numbered build decisions and route descriptions

Reasons they are historical or superseded may include:

- old Sheet ID
- old primary route
- old artifact terminology
- old build priority
- old persistence assumption
- pre-canonical record schema
- pre-preferred-route architecture

Historical documents should remain in the repo for provenance. Add or preserve a supersession notice rather than deleting them.

## 8. Conflict Resolution Rule

When documents conflict, use this order:

1. Latest owner-approved forward build plan
2. Architect and Engineer Start Here
3. Engineer Next Build Instructions
4. Requirements traceability matrix
5. Current product and architecture requirements
6. Release and route manifests
7. Supporting architecture documents
8. Historical decision records

If two current documents still conflict, stop implementation and run the Requirements Steward process.

## 9. Builder Rule

Before changing code:

1. Confirm the requirement or defect.
2. Confirm the correct route.
3. Confirm the canonical record contract.
4. Confirm the current capture source of truth.
5. Confirm whether the capability is current or deferred.
6. Update traceability and library status after material architecture changes.
