# 2026062312 Vercel Web Analytics

Date: 2026-06-23

Status: Implemented in repo, dashboard enablement still required

## Purpose

Measure CyberShield visitor and page-view activity on the Vercel-hosted static site without introducing a new JavaScript framework or build system.

## Implementation

CyberShield is currently a static HTML site and did not have a `package.json` or application framework that could mount the `@vercel/analytics` component directly.

The implementation therefore uses Vercel's static analytics script endpoint:

```html
<script defer src="/_vercel/insights/script.js" data-sdk="vercel-analytics"></script>
```

A shared loader also exists at:

```text
src/vercel-analytics.js
```

The vendor-risk golden path and fallback load the shared analytics loader through:

```text
src/atdr/report-capture-config.js
```

The public root route loads the script directly in `index.html`.

## Initial routes measured

- `/`
- `/vendor-risk-next.html`
- `/vendor-risk.html`

These cover the public landing page, advisor golden path, and stable fallback route.

## Vercel dashboard step

Web Analytics must be enabled for the Vercel project in the Vercel dashboard.  After the next deployment, verify a request to the Vercel analytics view endpoint in the browser Network panel.

## Initial measurement plan

Track these baseline metrics first:

- unique visitors
- page views
- top pages
- referrers
- browser and device mix
- geography at Vercel's anonymized reporting level
- traffic split between `/vendor-risk-next.html` and `/vendor-risk.html`

## Next measurement phase

After page-view data is flowing, add custom events only for meaningful funnel actions, such as:

- `demo_started`
- `contradiction_selected`
- `record_generated`
- `print_or_pdf_started`
- `json_downloaded`
- `follow_up_saved`
- `demo_request_clicked`

Do not send recommendation content, email addresses, vendor names, company names, or AI Trust Decision Record content as analytics event properties.

## Privacy and data minimization

Analytics must remain separate from report capture.  Do not send sensitive decision content, personally identifiable information, or evidence text to Vercel Analytics.

## Acceptance criteria

- Vercel Analytics is enabled in the Vercel dashboard.
- The next production deployment serves the analytics script successfully.
- Page views appear for the root, advisor golden path, and fallback route.
- No sensitive CyberShield decision content is included in analytics events.
