# 2026062312 Vercel Web Analytics

Version timestamp: 2026062510  
Status: Page-view loader and privacy-minimized conversion helper implemented in repo; dashboard receipt still requires deployment verification

## Purpose

Measure CyberShield visitor and customer-action activity on the Vercel-hosted static site without introducing a new JavaScript framework, collecting sensitive recommendation content, or confusing browser instrumentation with verified downstream analytics receipt.

## Page-view implementation

CyberShield is a static HTML site and uses Vercel's static analytics script endpoint:

```html
<script defer src="/_vercel/insights/script.js" data-sdk="vercel-analytics"></script>
```

A shared loader and conversion helper exists at:

```text
src/vercel-analytics.js
```

The helper loads the Vercel page-view script when available and exports:

```text
trackConversion(name, properties)
```

## Public routes measured

   - `/`
   - `/vendor-risk-next.html`
   - `/vendor-risk.html`
   - `/pilot-package.html`

These cover the public landing page, preferred vendor-risk example, preserved fallback route, and controlled pilot page.

## Conversion events

The trust-led customer journey defines:

   - `example_started`
   - `buyer_judgment_selected`
   - `evidence_problem_viewed`
   - `decision_record_viewed`
   - `real_recommendation_review_clicked`
   - `pilot_clicked`
   - `report_print_clicked`
   - `report_json_downloaded`

Allowed properties are limited to:

   - `route`
   - `stage`
   - `choice`
   - `destination`

The helper drops all other property keys.

## Local verification path

Every conversion call emits a browser event:

```text
cybershield:conversion
```

Example console listener:

```js
window.addEventListener('cybershield:conversion', event => {
  console.log(event.detail);
});
```

This allows a reviewer to confirm the event name and privacy-minimized properties without a production deployment.

A locally observed CustomEvent proves only that the browser instrumentation ran.  It does not prove that Vercel received, retained, or displayed the custom event.

## Vercel event path

When the supported Vercel browser analytics function is available, the helper queues a custom event using the same privacy-minimized payload.  Analytics failure is intentionally non-blocking and must not interrupt the customer journey.

Custom-event availability can depend on the active Vercel analytics plan and dashboard configuration.  Do not claim custom-event success until receipt is verified in the deployed Vercel project.

## Privacy and data minimization

Never send any of the following to Vercel Analytics:

   - Recommendation text.
   - Evidence text or evidence identifiers.
   - First name.
   - Company or organization.
   - Vendor name.
   - Email address.
   - AI Trust Decision Record ID or report ID.
   - Capture endpoint.
   - Google Sheet ID.
   - Contract, policy, incident, or customer information.

Analytics remains separate from report follow-up capture.

## Vercel dashboard verification

After an approved deployment:

1. Confirm Web Analytics is enabled for the Vercel project.
2. Confirm the page-view script loads without blocking the page.
3. Verify page views for the public routes.
4. Exercise each conversion action using non-sensitive synthetic data.
5. Confirm only the approved event names and property keys appear.
6. Record events that are unavailable because of plan or dashboard constraints.
7. Do not infer downstream report-capture success from analytics.

## Acceptance criteria

   - The page-view loader remains present.
   - The landing, preferred example, fallback, and pilot routes load without analytics errors.
   - The eight conversion events are locally observable.
   - Only route, stage, choice, and destination properties are emitted.
   - No sensitive CyberShield decision content is included.
   - Missing analytics support does not break navigation, analysis, print, download, or capture.
   - Production receipt remains unverified until an approved deployment and dashboard inspection occur.
