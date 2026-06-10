# 2026061020 Guided Route Print Report Polish

## Purpose

Make the guided vendor-risk route print a more reliable executive Trust Decision Record summary, regardless of which guided step is visible when the user chooses Print / Save PDF.

## Files Changed

- `vendor-risk.html`
- `src/atdr/vendor-risk-guided.js`
- `docs/2026061020-guided-route-print-report-polish.md`

## What Changed

- Added a hidden `#printReport` container to `vendor-risk.html`.
- Updated print CSS so the normal guided route UI is hidden during print.
- Updated `src/atdr/vendor-risk-guided.js` to populate the print-only report from the same deterministic ATDR record used by the guided route.
- The print report now includes:
  - record ID
  - vendor
  - company
  - reviewer
  - recommended action
  - Risk If Wrong
  - Confidence Band
  - human review requirement
  - original AI recommendation
  - contradiction/evidence issue focus
  - claims and conflicts table
  - candidate action comparison
  - limitations
  - prepared-by line

## Why This Matters

Before this pass, printing from the guided route could print only the currently visible guided step.  That created inconsistent report behavior.  Now Print / Save PDF is meant to produce the executive artifact every time.

## Product Doctrine Preserved

- The record is the product.
- AI confidence is not evidence.
- SOC 2 is not automatic approval.
- Framework relevance is not compliance proof.
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

## Manual QA Required

After GitHub Pages refreshes:

1. Open `/vendor-risk.html`.
2. Enter first name, optional company, and optional vendor.
3. Change contradiction type.
4. Click Print / Save PDF from a non-final step and confirm the printed output is the executive report, not only the current step.
5. Go to the final record step and print again.
6. Confirm both printed outputs include the same core executive decision data.
7. Confirm `/vendor-risk-smoke.html` still shows GO.
8. Confirm `/atdr.html` still works.
9. Confirm `/trust-kernel-legacy.html` still works.

## Next Recommended Build

`2026061021-live-qa-defect-fixes`

Do not add features until real browser QA identifies defects.  Fix only observed defects in the guided vendor-risk route, print output, smoke route, or root CTA.
