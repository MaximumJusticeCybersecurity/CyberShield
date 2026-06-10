# 2026061022 Report Capture Apps Script Contract

## Purpose

Define a safe Google Apps Script Web App pattern for CyberShield CRM/report capture without putting Google credentials, API keys, or secrets into the GitHub Pages front end.

## Files Added

- `examples/google-apps-script/report-capture-web-app.gs`
- `docs/2026061022-report-capture-apps-script-contract.md`

## Contract Summary

CyberShield front end prepares a report capture payload. A deployed Apps Script Web App receives the payload and writes it to the CRM Google Sheet.

The public front end remains safe because:

- `REPORT_CAPTURE_ENDPOINT` is blank until deployment.
- Google authentication lives inside Apps Script, not in GitHub Pages code.
- No Google credentials are committed to the repository.
- The route continues to simulate capture honestly when no endpoint exists.

## Target Sheet

```text
1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw
```

Apps Script should store this value as a Script Property:

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

## Deployment Steps

1. Create a Google Apps Script project owned by Maximum Justice Cybersecurity.
2. Paste `examples/google-apps-script/report-capture-web-app.gs` into the Apps Script editor.
3. In Apps Script project settings, set Script Property:

```text
CRM_SHEET_ID = 1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw
```

4. Deploy as a Web App.
5. Test with a controlled POST using a sample payload.
6. Only after testing, update `src/atdr/report-capture-config.js` with the Web App URL.
7. Confirm `/vendor-risk-smoke.html` still shows GO.
8. Confirm `/vendor-risk.html` capture status changes from simulated to configured.

## Security Rules

Do not commit:

- Google credentials
- API keys
- service-account JSON
- OAuth secrets
- Web App deployment secrets
- private customer data

The front end may only contain the endpoint URL after deployment approval.

## Known Limitations

- Apps Script Web Apps may need CORS/response testing depending on deployment settings.
- Google account permissions must be handled in Apps Script deployment, not in CyberShield.
- This sample writes raw record JSON into a single column for early CRM validation. A future backend may normalize fields into separate tables.

## Next Recommended Build

`2026061023-report-capture-contract-qa`

Only proceed after the Apps Script endpoint is deployed or a test endpoint is available. Without an endpoint, keep the front end in simulated mode.
