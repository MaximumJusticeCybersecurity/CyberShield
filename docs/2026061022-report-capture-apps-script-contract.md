# 2026061022 Report Capture Apps Script Contract

> **Superseded contract.**  This document preserves the original report-capture design, but its Sheet ID and route references are stale.  Current capture requirements are governed by `docs/google-sheets-report-capture.md`, `docs/architecture-library-status.md`, `src/atdr/report-capture-config.js`, and `docs/2026061909-forward-build-plan.md`.

## Purpose

Define a safe Google Apps Script Web App pattern for CyberShield CRM/report capture without putting Google credentials, API keys, or secrets into the GitHub Pages front end.

## Files Added

- `examples/google-apps-script/report-capture-web-app.gs`
- `docs/2026061022-report-capture-apps-script-contract.md`

## Contract Summary

CyberShield front end prepares a report capture payload. A deployed Apps Script Web App receives the payload and writes it to the approved Google Sheet.

The public front end remains safe because:

- Google authentication lives inside Apps Script, not in GitHub Pages code.
- No Google credentials are committed to the repository.
- The route continues to simulate capture honestly when no endpoint exists.
- Capture success is not claimed until an actual Sheet row is verified.

## Historical Target Sheet

```text
1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw
```

This value is historical.  Current Sheet ID must be read from:

```text
src/atdr/report-capture-config.js
```

Current configured value at the time of this supersession notice:

```text
1SDfqw-rRuluqBdPUT6Ex4UIajO-CCEtny84OTMKhQ3w
```

Apps Script should store the owner-approved current value as Script Property:

```text
CRM_SHEET_ID
```

## Expected Web App Request

Method:

```text
POST
```

Content type:

```text
application/json
```

Required fields:

- `event_type`
- `capture_timestamp`
- `record_id`
- `recommended_action`
- `risk_if_wrong`
- `confidence_band`
- `human_review_required`
- `structured_record_json`

Recommended fields:

- `first_name`
- `company`
- `vendor`
- `email`
- `contradiction_type`
- `contradiction_label`
- `report_capture_endpoint_configured`
- `report_capture_mode`
- `crm_sheet_id`

## Sheet Output Columns

The sample Apps Script creates or uses a sheet named:

```text
CyberShield Report Captures
```

Columns:

- `received_at`
- `event_type`
- `capture_timestamp`
- `first_name`
- `company`
- `vendor`
- `email`
- `contradiction_type`
- `contradiction_label`
- `record_id`
- `recommended_action`
- `risk_if_wrong`
- `confidence_band`
- `human_review_required`
- `record_domain`
- `record_defensibility_band`
- `record_json`

## Current Deployment Rule

1. Use an Apps Script project owned by Maximum Justice Cybersecurity.
2. Paste `examples/google-apps-script/report-capture-web-app.gs` into the Apps Script editor.
3. Set `CRM_SHEET_ID` to the current owner-approved Sheet ID.
4. Deploy as a Web App.
5. Test with a controlled POST using a sample payload.
6. Only after testing, update `src/atdr/report-capture-config.js` with the Web App URL.
7. Confirm `/vendor-risk-next.html` submits the expected payload.
8. Confirm `/vendor-risk.html` remains operational as fallback.
9. Confirm `/capture-source-of-truth-smoke.html`, `/report-capture-test.html`, and `/trust-decision-record-schema-smoke.html` remain GO.
10. Verify an actual row before claiming capture success.

## Security Rules

Do not commit:

- Google credentials
- service-account JSON
- OAuth secrets
- API keys
- personal access tokens
- private customer data

The deployed Web App URL may be present in front-end configuration only after owner-approved deployment and testing.
