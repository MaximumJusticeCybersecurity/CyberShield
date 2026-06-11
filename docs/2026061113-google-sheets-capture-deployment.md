# 2026061113 Google Sheets Capture Deployment Guide

## Purpose

Connect CyberShield's `Save Follow-Up` action to a Google Sheet through a Google Apps Script Web App while keeping credentials out of the static GitHub Pages front end.

## Current Target Sheet

```text
1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw
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

1. Open the target Google Sheet.
2. Go to Extensions → Apps Script.
3. Paste the contents of:

```text
examples/google-apps-script/report-capture-web-app.gs
```

4. In Apps Script, open Project Settings.
5. Add Script Property:

```text
CRM_SHEET_ID = 1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw
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
16. Confirm a row appears in the `CyberShield Report Captures` sheet tab.
17. Confirm the response is JSON and indicates success.
18. Only after the test succeeds, update:

```text
src/atdr/report-capture-config.js
```

Set:

```js
const REPORT_CAPTURE_ENDPOINT = '<APPROVED_WEB_APP_URL>';
```

19. Confirm `/vendor-risk.html` shows CRM connected or successfully saves follow-up.
20. Confirm `/vendor-risk-smoke.html` and `/record-contract.html` remain healthy.

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

- Save Follow-Up writes a row to Google Sheets when endpoint is configured.
- Failed POST does not claim success.
- Missing endpoint shows a pending/local capture state.
- No credentials are exposed in GitHub.
- Buyer-facing demo remains `/vendor-risk.html`.
- Workbench and QA routes remain internal.

## Product Positioning Guardrail

This connection supports the broader product value while keeping the first workflow narrow:

```text
Before relying on AI, CyberShield shows whether the recommendation is defensible.
```

First proof point remains:

```text
AI-generated vendor-risk recommendation in → AI Trust Decision Record out.
```
