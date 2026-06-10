# 2026061021 Report Capture Endpoint Scaffold

## Purpose

Create a single shared configuration point for CyberShield report capture readiness while preserving honest static-prototype behavior.

## Files Changed or Added

- `src/atdr/report-capture-config.js`
- `src/atdr/vendor-risk-guided-smoke.js`
- `docs/2026061021-report-capture-endpoint-scaffold.md`

## What Changed

- Added `src/atdr/report-capture-config.js` as the shared front-end configuration file for report capture.
- Added explicit constants:
  - `REPORT_CAPTURE_ENDPOINT`
  - `CRM_SHEET_ID`
  - `REPORT_CAPTURE_MODE`
- Kept `REPORT_CAPTURE_ENDPOINT` blank by default.
- Documented that Google credentials, service-account material, API keys, and secrets must never be placed in front-end GitHub Pages code.
- Updated the guided route smoke test so CRM sheet ID and capture mode come from the shared config.
- Updated smoke coverage to validate:
  - CRM payload includes structured record JSON
  - CRM sheet ID comes from shared config
  - CRM endpoint mode is explicit: `simulated` or `configured`

## CRM Sheet Target

```text
1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw
```

## Current Behavior

Because the endpoint is blank, report capture remains simulated.  This is intentional.

Expected language:

```text
Capture simulated.
Endpoint not configured.
No Google Sheet write has been performed.
```

## Why This Matters

The guided vendor-risk route now has a clean path to future CRM submission without creating a false claim of production persistence.  This protects the product doctrine and prevents accidental credential exposure.

## Required Future Backend Pattern

Use one of the following:

1. Google Apps Script Web App endpoint.
2. Backend API endpoint.
3. Serverless function endpoint.

The front end should POST the report capture payload to the endpoint.  The endpoint should own Google authentication and write to the CRM sheet.

## Payload Expectations

Required payload fields:

- event type
- capture timestamp
- first name
- company
- vendor
- email
- contradiction type
- contradiction label
- endpoint configured flag
- capture mode
- CRM sheet ID
- record ID
- recommended action
- Risk If Wrong
- Confidence Band
- human review required
- full structured Trust Decision Record JSON

## Static Prototype Limitations

This build still does not include:

- live Google Sheet write
- production persistence
- production authentication
- tenant isolation
- malware scanning
- live LLM analysis
- server-side DOCX/PDF generation

## Next Recommended Build

`2026061022-report-capture-apps-script-contract`

Recommended focus:

- Define the Google Apps Script Web App request/response contract.
- Add a sample Apps Script file under docs or examples.
- Keep the public endpoint blank until the script is deployed safely.
- Do not add secrets to the repository.
