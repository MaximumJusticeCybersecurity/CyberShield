# 2026061019 Guided Route Browser QA Fixes

## Purpose

Add low-risk QA hardening to the guided vendor-risk route before live manual browser testing.

## Files Changed

- `src/atdr/vendor-risk-guided.js`
- `docs/2026061019-guided-route-browser-qa-fixes.md`

## What Changed

- Added a visible route diagnostics strip to the right-side decision summary.
- Diagnostics show:
  - whether the deterministic engine output matches the expected guided-route contract
  - whether capture is configured or simulated
  - static prototype status
  - claims count
  - recommended action
  - Risk If Wrong
  - Confidence Band
  - human review requirement
- Added direct link from the diagnostics strip to `/vendor-risk-smoke.html`.
- Added a fail-safe initialization fallback. If the guided route script fails, the app shows:
  - a failure message
  - a button to open the full ATDR Workbench
  - a button to open the guided-route QA page
  - the initialization error text for debugging
- Updated local storage keys to the 2026061019 build namespace.

## Expected Guided Route Contract

The guided route should show:

- 10 extracted claims
- `Request Evidence`
- `High` Risk If Wrong
- `Low confidence`
- human review required
- CRM capture simulated unless `REPORT_CAPTURE_ENDPOINT` is configured

## Why This Matters

The route should fail visibly and recoverably if something breaks during GitHub Pages deployment or browser execution.  The user should not see a blank page or need developer tools to know what failed.

## Manual QA Still Required

After GitHub Pages refreshes:

1. Open `/vendor-risk.html` on desktop.
2. Confirm diagnostics show Engine OK.
3. Complete all six steps.
4. Change contradiction types and confirm evidence emphasis changes.
5. Use Print / Save PDF.
6. Use Download JSON.
7. Use Prepare CRM Payload and confirm simulated capture language.
8. Open `/vendor-risk-smoke.html` and confirm GO.
9. Test on phone viewport.
10. Confirm `/atdr.html` still works.
11. Confirm `/trust-kernel-legacy.html` still works.

## Non-Goals

This build does not add:

- production persistence
- live Google Sheet writing
- production authentication
- tenant isolation
- live LLM analysis
- server-side PDF/DOCX generation
- TrustMap or dashboard expansion

## Next Recommended Build

`2026061020-guided-route-print-report-polish`

Only proceed after manual browser QA identifies the actual print/report defects.  Do not broaden the product.
