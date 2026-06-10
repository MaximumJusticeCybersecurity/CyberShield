# 2026061018 Guided Route Landing and QA

## Purpose

Harden the new guided vendor-risk route for controlled demos by improving print behavior, adding a route-specific smoke page, and making the route easier to validate.

## Routes

Primary guided route:

```text
/vendor-risk.html
```

Guided route smoke test:

```text
/vendor-risk-smoke.html
```

Deeper workbench:

```text
/atdr.html
```

## Files Changed or Added

- `vendor-risk.html`
- `vendor-risk-smoke.html`
- `src/atdr/vendor-risk-guided-smoke.js`
- `docs/2026061018-guided-route-landing-and-qa.md`

## What Changed

- Added a direct Guided Route QA button to the guided vendor-risk route.
- Improved print CSS for `vendor-risk.html` so browser Print / Save PDF is more readable for controlled demos.
- Added `vendor-risk-smoke.html`, a route-specific smoke test page.
- Added `src/atdr/vendor-risk-guided-smoke.js`, which validates the guided route’s underlying ATDR record contract.

## Smoke Test Coverage

The guided route smoke page validates:

- Vendor-risk record is created.
- Domain remains `vendor-risk`.
- Claims extracted equals 10.
- Recommended Action is `Request Evidence`.
- Risk If Wrong is `High`.
- Confidence is `Low confidence`.
- Human review is required.
- Framework mappings include `Not verified as compliant` warning language.
- JSON export is parseable.
- CRM payload includes full structured record JSON.
- CRM endpoint remains explicitly not configured.

## Product Doctrine Preserved

- AI confidence is not evidence.
- SOC 2 is not automatic approval.
- Framework mapping is not compliance proof.
- The record is the product.
- Vendor risk remains the first wedge.

## Static Prototype Limitations

This build still does not include:

- production persistence
- production authentication
- tenant isolation
- malware scanning
- live LLM analysis
- server-side DOCX/PDF generation
- live Google Sheet write
- configured report capture endpoint

Browser Print / Save PDF remains the current PDF path.

## QA Still Needed

Manual browser QA is still needed after GitHub Pages refreshes:

1. Open `/vendor-risk.html` on desktop.
2. Confirm the six-step guided route loads.
3. Complete the route without using the old ATDR stage rail.
4. Confirm contradiction selection changes the evidence emphasis.
5. Confirm Print / Save PDF is readable.
6. Open `/vendor-risk-smoke.html` and confirm GO status.
7. Confirm `/atdr.html` still works.
8. Confirm `/trust-kernel-legacy.html` still works.
9. Confirm root `/` points to the guided route as primary CTA.

## Next Recommended Build

`2026061019-guided-route-browser-qa-fixes`

Recommended focus:

- Fix any browser/mobile defects found in manual QA.
- Improve the print report if it is still visually weak.
- Keep all work constrained to the guided vendor-risk route unless a regression is found elsewhere.
