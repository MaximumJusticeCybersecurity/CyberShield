# 2026061113 Google Sheets Capture Deployment Guide

> **Superseded deployment guide.**  This document preserves the original deployment procedure, but its Sheet ID and primary-route references are stale.  Use `docs/google-sheets-report-capture.md`, `docs/architecture-library-status.md`, `src/atdr/report-capture-config.js`, and `docs/2026061909-forward-build-plan.md` for the current source of truth.

## Purpose

Connect CyberShield's `Save Follow-Up` action to a Google Sheet through a Google Apps Script Web App while keeping credentials out of the static GitHub Pages front end.

## Historical Target Sheet

```text
1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw
```

This is not the current configured Sheet ID unless the owner explicitly approves a migration.

Current configured Sheet ID is read from:

```text
src/atdr/report-capture-config.js
```

At the time of this supersession notice, the configured Sheet ID is:

```text
1SDfqw-rRuluqBdPUT6Ex4UIajO-CCEtny84OTMKhQ3w
```

## Required Files

Apps Script example:

```text
examples/google-apps-script/report-capture-web-app.gs
```

Endpoint test harness:

```text
/report-capture-test.html
```

Front-end config file:

```text
src/atdr/report-capture-config.js
```

## Deployment Steps

1. Open the currently approved target Google Sheet.
2. Go to Extensions → Apps Script.
3. Paste the contents of:

```text
examples/google-apps-script/report-capture-web-app.gs
```

4. In Apps Script, open Project Settings.
5. Add Script Property using the owner-approved current Sheet ID:

```text
CRM_SHEET_ID = <CURRENT_APPROVED_SHEET_ID>
```

6. Save the Apps Script project.
7. Deploy → New deployment.
8. Select Web app.
9. Execute as: Me.
10. Access: Anyone with the link, or the narrowest setting that still allows the GitHub Pages front end to post successfully.
11. Copy the Web App URL.
12. Open:

```text
/report-capture-test.html
```

13. Paste the Web App URL.
14. Click `Load Sample Payload`.
15. Click `Send Test Capture`.
16. Confirm a row appears in the approved capture sheet tab.
17. Confirm the response is JSON and indicates receipt.
18. Verify the actual Sheet row before claiming capture success.
19. Only after the test succeeds, update:

```text
src/atdr/report-capture-config.js
```

Set:

```js
const REPORT_CAPTURE_ENDPOINT = '<APPROVED_WEB_APP_URL>';
```

20. Confirm `/vendor-risk-next.html` submits the expected payload.
21. Confirm `/vendor-risk.html` remains operational as the fallback.
22. Confirm `/capture-source-of-truth-smoke.html`, `/report-capture-test.html`, and `/trust-decision-record-schema-smoke.html` remain healthy.

## Security Rules

Do not commit:

- Google credentials
- service-account JSON
- OAuth secrets
- API keys
- personal access tokens
- private customer data

The GitHub Pages front end may contain only the deployed Web App URL after deployment approval.

## Expected Capture Fields

The Apps Script endpoint should write:

- received_at
- event_type
- capture_timestamp
- first_name
- company
- vendor
- email
- contradiction_type
- contradiction_label
- record_id
- recommended_action
- risk_if_wrong
- confidence_band
- human_review_required
- record_domain
- record_defensibility_band
- record_json

## Acceptance Criteria

- Report generation or Save Follow-Up submits a row when endpoint is configured.
- Failed POST does not claim success.
- Missing endpoint shows a pending or simulated capture state.
- No credentials are exposed in GitHub.
- Preferred buyer-facing demo remains `/vendor-risk-next.html`.
- Stable fallback remains `/vendor-risk.html`.
- Workbench and QA routes remain internal.
- Actual Sheet row is verified before using saved-success language.

## Product Positioning Guardrail

```text
Before relying on AI, CyberShield shows whether the recommendation is defensible.
```

First proof point remains:

```text
AI-generated vendor-risk recommendation in → AI Trust Decision Record out.
```
