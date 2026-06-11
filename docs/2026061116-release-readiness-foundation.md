# 2026061116 Release Readiness Foundation

## Purpose

Establish a well-engineered internal QA and release-readiness foundation for the current CyberShield buyer-facing vendor-risk guided demo without broadening the public demo surface.

## Current Source-of-Truth Alignment

The repository already contains a newer release manifest than the earlier `2026061028` plan:

```text
2026061113-google-sheets-capture-configured
```

The current capture config is:

```text
src/atdr/report-capture-config.js
```

Current configured sheet ID in code:

```text
1SDfqw-rRuluqBdPUT6Ex4UIajO-CCEtny84OTMKhQ3w
```

Older planning references mention this sheet ID:

```text
1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw
```

Do not silently swap sheet IDs. Treat `src/atdr/report-capture-config.js` as the current operational source of truth unless the owner explicitly changes it.

## Files Changed or Added

- `qa-session.html`
- `internal-qa.html`
- `docs/2026061116-release-readiness-foundation.md`

## What Changed

- Added `internal-qa.html` as the current internal QA hub.
- Updated `qa-session.html` to remove the stale `demo-operator-checklist.html` dependency.
- Updated QA session release label to `2026061116-release-readiness-foundation`.
- Updated QA session attested route list to match the current internal route surface.
- Preserved the buyer-facing root as clean and buyer-oriented. Internal QA routes are not promoted on the public landing page.

## Current Buyer-Facing Routes

- `/`
- `/vendor-risk.html`

## Current Internal QA / Governance Routes

- `/internal-qa.html`
- `/vendor-risk-smoke.html`
- `/record-contract.html`
- `/route-manifest.html`
- `/qa-session.html`
- `/qa-defect-log.html`
- `/report-capture-test.html`
- `/atdr.html`
- `/demo-readiness.html`
- `/advisor-feedback.html`

## Preserved Route

- `/trust-kernel-legacy.html`

## Release Doctrine

- Broader value message is AI Decision Assurance.
- First proof point remains vendor-risk recommendation review.
- Vendor-risk guided route remains the primary buyer-facing demo.
- ATDR workbench remains internal inspection only.
- Legacy Trust Kernel remains preserved and must not be restored as root.
- Google Sheets capture may be configured for prototype testing, but it is not production CRM infrastructure.
- Do not claim production readiness.
- Do not treat SOC 2 as automatic approval.
- Do not treat framework mapping as compliance proof.
- Do not return Medium confidence for unsupported out-of-scope inputs.

## QA Stop Conditions

Stop controlled demo preparation if:

- `/vendor-risk-smoke.html` is NO-GO.
- `/record-contract.html` is NO-GO.
- `/route-manifest.html` does not show vendor-risk as the primary wedge.
- Google Sheets capture fails but is described as successful.
- Print output is unreadable but presented as a proof artifact.
- The buyer-facing root drifts back to workbench, TrustMap, dashboard, or internal QA surfaces.

## Next Recommended Build

`2026061117-guided-demo-visual-polish`

Recommended focus:

- Improve the visual hierarchy of `/vendor-risk.html`.
- Keep buyer-facing copy clear and short.
- Improve the final executive report language.
- Do not add new public routes or platform breadth.
