# 2026061017 Vendor-Risk Guided Route

## Purpose

Create a dedicated guided vendor-risk route so the first CyberShield product proof is one complete buyer-visible loop, not a broad multi-tab workbench.

## New Route

```text
/vendor-risk.html
```

## Files Added

- `vendor-risk.html`
- `src/atdr/vendor-risk-guided.js`

## Product Intent

The guided route walks the user through a sequential vendor-risk decision-assurance loop:

1. Identify reviewer, company, and vendor.
2. Show the AI-generated vendor approval recommendation.
3. Select the contradiction to expose.
4. Review claims, materiality, evidence conflicts, and missing support.
5. Compare candidate actions.
6. Generate the Trust Decision Record and prepare report capture.

## Core Buyer Takeaway

```text
The AI recommendation sounded reasonable, but CyberShield showed why approving the vendor without more evidence and human review would be risky and hard to defend.
```

## Behavior Preserved

The route uses the existing deterministic ATDR engine and synthetic vendor-risk evidence repository. It does not introduce a live LLM or claim production behavior.

## CRM / Report Capture

The guided route prepares a payload with:

- first name
- company
- vendor
- email
- contradiction type
- record ID
- recommended action
- Risk If Wrong
- Confidence Band
- human review requirement
- full structured Trust Decision Record JSON

`REPORT_CAPTURE_ENDPOINT` remains blank. If blank, capture is simulated honestly and stored as pending browser-local data. The route does not claim Google Sheet submission succeeded.

## Non-Goals

Do not use this build to add:

- TrustMap
- runtime-agent positioning
- broad dashboard behavior
- multi-tenant behavior
- production authentication
- live model integration
- server-side PDF/DOCX generation
- generic governance screens

## Remaining Limitations

- Static GitHub Pages prototype only.
- Browser Print / Save PDF remains the PDF path.
- Endpoint-backed CRM/Google Sheet write is not live until a backend or Apps Script endpoint is configured.
- The workbench remains available at `atdr.html` for deeper inspection.
- Additional visual polish may be needed after browser QA.

## Next Recommended Build

`2026061018-guided-route-landing-and-qa`

Recommended focus:

1. Make `/vendor-risk.html` the primary CTA from the public root.
2. Browser QA the guided route on desktop and phone.
3. Confirm the guided path can be completed without using the old stage rail.
4. Confirm generated JSON includes the full Trust Decision Record.
5. Confirm print output is readable enough for controlled demos.
