# Google Sheets Report Capture Requirements

Date: 2026-06-17
Owner: Dr. Max Justice
Target: Next vendor-risk build
Audience: Engineer, architect, builder

## 1. Purpose

This document defines how CyberShield captures email, report metadata, and full structured Trust Decision Record JSON when a visitor generates, downloads, prints, or saves a report.

## 2. Target Google Sheet

Target Google Sheet:

https://docs.google.com/spreadsheets/d/1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw/edit?usp=sharing

Sheet ID:

1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw

## 3. Static GitHub Pages Constraint

The CyberShield public demo runs on GitHub Pages.  GitHub Pages is a static front end.

Do not attempt to write directly to Google Sheets from the browser using private credentials.

Use one of these:

1. Google Apps Script Web App endpoint connected to the target Sheet
2. Google Form endpoint connected to the target Sheet
3. Future backend API service

Recommended first implementation:

Google Apps Script Web App endpoint connected to the target Sheet.

## 4. Configuration Value

Add a configuration value:

REPORT_CAPTURE_ENDPOINT

If populated, the front end should POST the capture event to the endpoint.

If blank, the front end should simulate capture honestly.

## 5. If Endpoint Exists

If REPORT_CAPTURE_ENDPOINT is configured:

- POST the report capture event payload to the endpoint.
- Show success or failure message.
- If save fails, keep the report available.
- Do not block print or download if logging fails.

Failure warning:

Report generated.  Lead capture could not be saved.

## 6. If Endpoint Does Not Exist

If REPORT_CAPTURE_ENDPOINT is blank:

- Simulate successful report generation.
- Store pending capture event in session storage or local storage.
- Log the event to the browser console for developer validation.
- Do not claim the record was saved to Google Sheets.

User-facing language should say:

Report generated.

Do not say:

Saved to Google Sheets.

unless the endpoint is configured and the POST succeeds.

## 7. Email Capture Trigger

Do not ask for email during onboarding.

Ask for email only when the visitor chooses to:

- Generate final report
- Download report
- Print report
- Send report
- Save report as a formal Trust Decision Record

Modal title:

Generate Trust Decision Record

Modal copy:

To generate, download, print, or send this executive report, enter your email address.

Consent copy:

CyberShield will use this email to associate your Trust Decision Record with this demo request.

## 8. Required Payload Fields

Capture:

- timestamp
- report_id
- first_name
- company_or_organization
- vendor_name
- visitor_email
- selected_contradiction_type
- recommendation_text
- cyberShield_recommended_action
- escalation_triggered
- risk_if_wrong
- confidence_band
- human_review_required
- required_reviewer_roles
- report_action
- report_format_requested
- page_url
- browser_user_agent
- structured_record_json

Allowed report actions:

- View report
- Print report
- Download PDF
- Download DOCX
- Download JSON
- Send report, future

## 9. Structured Record JSON

The structured_record_json field must contain the full Trust Decision Record object, including:

- Claims
- Evidence items
- Validator results
- Candidate action comparison
- Risk If Wrong
- Confidence Band
- Human review requirements
- Human decision
- Override event, if any
- Vendor dependency
- Exit path
- Residual risk
- Limitations
- Export metadata

## 10. Suggested Sheet Columns

1. Timestamp
2. Report ID
3. First Name
4. Company / Organization
5. Vendor Name
6. Visitor Email
7. Selected Contradiction Type
8. Recommendation Text
9. CyberShield Recommended Action
10. Escalation Triggered
11. Risk If Wrong
12. Confidence Band
13. Human Review Required
14. Required Reviewer Roles
15. Report Action
16. Report Format Requested
17. Page URL
18. Browser User Agent
19. Structured Record JSON

## 11. Minimum Apps Script Behavior

The Google Apps Script Web App should:

- Accept POST requests.
- Parse JSON payload.
- Append a row to the target Google Sheet.
- Return success JSON.
- Return failure JSON on error.
- Avoid exposing secrets.
- Use deployment settings that allow the public demo to submit without requiring the visitor to sign in.

## 12. Security Rules

Do not place Google credentials, service account keys, OAuth secrets, or private tokens in front-end code.

Do not claim successful Google Sheet capture if the request fails.

Do not store more personal data than required.

Do not ask for email before the user sees value.

## 13. Suggested Capture Function Behavior

submitReportCaptureEvent(payload):

- Validate required fields.
- Ensure email format is valid.
- Generate report ID if not already present.
- Add page URL and browser user agent.
- Serialize structured record JSON.
- If endpoint exists, POST JSON.
- If endpoint is blank, call simulateReportCaptureIfNoEndpoint().
- Never block report display, print, or download because of capture failure.

simulateReportCaptureIfNoEndpoint(payload):

- Save pending payload locally.
- Log payload to console.
- Return simulated status with clear internal label.

## 14. Open Item

Confirm whether the engineer has already created and deployed the Google Apps Script Web App endpoint.  If yes, add the URL to REPORT_CAPTURE_ENDPOINT.  If not, implement it as part of the next build or keep honest simulation until ready.
