# 20260605xxV18 Demo Readiness QA Plan

## Purpose

Prepare the CyberShield Decision Assurance package for advisor and friendly-buyer review.

## Goal

Make the live demo path clean enough to show without handholding every click.

## V18 Scope

1. Live-route QA checklist.
2. Buyer-facing readiness language.
3. Advisor review posture.
4. Release readiness classification.
5. Demo issue log template.

## Critical Routes

- package.html
- vendor-risk-core.html
- atdr.html
- atdr-smoke.html
- pilot.html
- readiness.html
- release-check.html

## QA Checks

### Route checks

- Page opens without 404.
- Page title is correct.
- Primary links work.
- Buttons are visible on desktop.
- Mobile layout does not hide core actions.

### ATDR checks

- Default vendor-risk demo loads.
- Claims screen shows the vendor-risk claims.
- Evidence screen shows synthetic evidence.
- Gaps screen shows contradictions.
- Risk screen shows High Risk If Wrong.
- Confidence screen shows Low Confidence.
- Review screen preserves CyberShield recommendation and human decision separately.
- Audit screen shows session activity.
- Decision Record screen shows structured JSON.
- Print / Save PDF opens the browser print flow.
- Download JSON produces a file.

### Buyer-readiness checks

- First screen explains the problem quickly.
- Demo makes the vendor-risk contradiction obvious.
- Executive brief feels like a proof artifact.
- Language avoids unsupported claims.
- Pilot path is clear.

## Readiness Classification

### Ready for Advisor Review

Use when the route path works and the demo artifact communicates the core concept.

### Ready for Friendly Buyer Review

Use when the demo can be shown to a trusted buyer who understands it is a prototype.

### Not Ready for Paid Prospect Demo

Use until the prototype has been manually verified on the live GitHub Pages route after refresh.

## V18 Acceptance Criteria

V18 is complete when:

- A QA checklist exists.
- A route verification page or document exists.
- A release readiness classification exists.
- The package identifies what is ready and what is not ready.
- Known limitations are explicit.
