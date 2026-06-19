# CyberShield Forward Build Plan

Version: 2026061909
Owner: Dr. Max Justice
Audience: Architect, engineer, builder, requirements steward

## 1. Purpose

This document defines the next CyberShield build sequence after the vendor-risk Decision Assurance demo reached a stable preferred-route plus fallback-route state.

The governing product flow remains:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

The record is the product.

## 2. Current Baseline

Preferred high-touch demo:

```text
/vendor-risk-next.html
```

Stable fallback demo:

```text
/vendor-risk.html
```

Public artifact name:

```text
AI Trust Decision Record
```

Pilot positioning:

```text
software-assisted advisory pilot
```

Current capture source of truth:

```text
1SDfqw-rRuluqBdPUT6Ex4UIajO-CCEtny84OTMKhQ3w
```

Aegis remains internal for this build.

Trust Kernel may be referenced as supporting architecture, but it must not dominate public buyer messaging.

## 3. Immediate Build Sequence

### 3.1 Report Quality and Executive Polish

Build ID:

```text
2026061143-report-layout-polish-after-print-test
```

Objective:

Improve the printed AI Trust Decision Record only after reviewing actual browser Print / Save PDF output.

Required work:

- Improve executive hierarchy.
- Improve page breaks.
- Keep claims, evidence, validator, and candidate-action tables readable.
- Refine the reviewer and signature block.
- Ensure limitations remain visible.
- Ensure the artifact looks like a polished executive advisory record, not a generic browser printout.
- Preserve browser Print / Save PDF as the current export path.

Acceptance:

- Record title is AI Trust Decision Record.
- Executive decision is visible on the first page.
- Request Evidence, High Risk If Wrong, Low confidence, and Human Review Required are easy to find.
- Tables do not split in unreadable ways.
- Dr. Max Justice reviewer block is present by default.
- No production-readiness claims appear.

### 3.2 Feedback Integration

Build ID:

```text
2026061144-feedback-integration-after-review
```

Objective:

Convert SMB, advisor, and enterprise review feedback into controlled product changes.

Use:

```text
/feedback-triage.html
```

Triage categories:

- Critical fix before next demo
- Important fix
- Later
- Rejected / out of scope
- Question to answer

Required discipline:

- Fix product defects before adding scope.
- Separate buyer confusion from engineering defects.
- Separate positioning feedback from workflow defects.
- Reject requests that weaken the vendor-risk wedge or broaden the build prematurely.
- Preserve the preferred route and fallback route until replacements are proven.

Acceptance:

- Every accepted change maps to a requirement, defect, or buyer-observed problem.
- Deferred feedback is recorded rather than silently lost.
- Out-of-scope feedback does not enter the active build without owner approval.

### 3.3 Route and Library Cleanup

Build ID:

```text
2026061145-route-manifest-refresh
```

Objective:

Make the route, release, README, and handoff library internally consistent.

Required work:

- Register all active QA, review, preferred, fallback, internal, and preserved routes.
- Align `route-manifest.json` with `release-manifest.json`.
- Remove stale route descriptions.
- Mark `/vendor-risk-next.html` as preferred.
- Mark `/vendor-risk.html` as fallback.
- Mark Aegis as internal.
- Mark Trust Kernel legacy routes as preserved or supporting architecture only.
- Update README and engineer handoff documents.

Acceptance:

- Architect, engineer, and owner see the same route hierarchy.
- No document points to an inactive Sheet ID.
- No document describes a retired route as primary.

### 3.4 Canonical AI Trust Decision Record Schema Unification

Build ID:

```text
2026061146-canonical-record-unification
```

Objective:

Use one canonical AI Trust Decision Record object for screen display, export, capture, and future integrations.

Existing mapper:

```text
src/atdr/trust-decision-record-schema-mapper.js
```

Required work:

- Make the preferred route use the shared schema mapper directly.
- Use the same canonical object for:
  - on-screen record
  - JSON download
  - Google Sheet capture
  - Print / Save PDF
  - future DOCX export
- Eliminate route-specific record variants.
- Version the schema.
- Preserve record IDs and export timestamps.

Acceptance:

- `/trust-decision-record-schema-smoke.html` is GO.
- Screen, JSON, capture payload, and print report use the same decision values.
- Required fields are present and consistently named.

### 3.5 Google Sheet Capture Verification

Build ID:

```text
2026061147-google-sheet-row-verification
```

Objective:

Verify the configured endpoint writes the correct metadata and full structured record JSON into the intended Sheet.

Required checks:

- Submit a real report from the preferred route.
- Verify the correct Sheet receives a new row.
- Verify report ID, visitor metadata, vendor, recommended action, risk, confidence, human review, and report action.
- Verify full structured AI Trust Decision Record JSON is present.
- Verify no private credentials are exposed in browser code.
- Verify failed capture never blocks report display, print, or download.

Until a row is verified, use this language:

```text
Payload submitted to the configured endpoint. Verify the Google Sheet row before claiming capture success.
```

Do not say:

```text
Saved successfully to Google Sheets.
```

unless the row is verified.

## 4. Expansion Sequence After the Immediate Plan

Only begin this sequence after the vendor-risk record workflow is stable, externally reviewed, and defensible.

1. Vendor-risk software-assisted advisory pilot package
2. Security recommendation workflow
3. Compliance recommendation workflow
4. Human decision and override recording
5. Decision history and comparison
6. Trust Kernel Lite integration
7. Limited dashboard or TrustMap views
8. Broader industry templates

Each new domain must reuse the canonical AI Trust Decision Record contract rather than inventing a parallel workflow.

## 5. Deferred Scope

Do not prioritize these until the record workflow is proven:

- Public Aegis positioning
- TrustMap-first rebuild
- Runtime agents
- Generic trust scores
- Broad governance dashboards
- Multi-industry demos before vendor-risk works
- Autonomous approval
- Broad multi-tenant platform claims
- Production authentication claims
- Live LLM analysis claims unless actually implemented and tested

## 6. Required Build Discipline

Before implementation:

1. Run the Requirements Steward process.
2. Identify the exact requirement or defect being addressed.
3. Confirm whether the change belongs on the preferred route, fallback route, QA route, or library only.
4. Preserve the fallback route until the preferred route replacement is proven.
5. Update traceability and release records after implementation.

## 7. Required QA Order

Use this order before external review:

```text
/vendor-risk-next.html
/vendor-risk.html
/vendor-risk-next-smoke.html
/vendor-risk-smoke.html
/trust-decision-record-schema-smoke.html
/record-contract.html
/capture-source-of-truth-smoke.html
/report-capture-test.html
/report-print-qa.html
/review-index.html
/internal-qa.html
```

## 8. Recommended Ownership

Architect:

- Preserve architecture boundaries.
- Maintain canonical schema and traceability.
- Prevent scope drift.
- Define acceptance gates.

Engineer:

- Implement the next approved build only.
- Keep the preferred route fast.
- Keep the fallback route operational.
- Use shared config and shared schema modules.
- Avoid open-ended DOM observers and repeated render loops.

Owner:

- Approve scope changes.
- Confirm buyer-facing language.
- Validate real-world demo behavior.
- Decide when deferred capabilities enter the roadmap.

## 9. Next Action

The next architect and engineer should begin with:

```text
2026061143-report-layout-polish-after-print-test
```

They should not begin broader platform expansion until the immediate five-build sequence is complete or the owner explicitly changes priority.
