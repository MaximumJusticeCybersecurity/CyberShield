# CyberShield Executive OS

## Current live build

Current build label: **V52.7 TrustMap Navigation and Report Output System**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v52-7-trustmap-reports&reset=onboarding

## User-facing rule

Build and version labels belong in Settings/admin metadata and repo documentation.  They should not appear as executive-facing dashboard content.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V52.7.

## Current implemented build: V52.7

V52.7 implements the approved TrustMap Navigation and Report Output System.  It moves V52.7 operational behavior into a dedicated UI controller, returns `src/core/registryLoader.js` to registry loading only, improves TrustMap scroll and layout behavior, adds scenario-driven report previews, and gates report download/print behind sender and recipient contact information.

V52.7 changes:

- adds `src/ui/v52-7-operational-layer.js` as the operational interaction controller
- removes UI behavior from `src/core/registryLoader.js`
- adds internal TrustMap scroll behavior for large maps
- keeps the MJC-logo CyberShield Core control-plane anchor
- improves dashboard meters and drilldown routing
- strengthens Architecture card explanation routes
- strengthens Evidence Required/Gap explanation behavior
- adds scenario-driven Proof Pack report previews
- adds sender and recipient contact capture before download or print
- disables email delivery claims because no backend email integration exists
- updates generated Proof Pack metadata to V52.7
- no new top-level tabs were added

## Boundary

The current public build is a static advisory prototype.  It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, or production agent enforcement systems.

## Known V52.7 limitations

- TrustMap visual objects remain prototype-grade
- CSS is still partly inline or injected rather than fully extracted to a stylesheet
- reports download as text files, not branded PDF reports yet
- report contact capture is client-side only and is not stored or emailed
- model registry remains scaffold-level and demo-directional
- scoring is not statistically validated
- hands-on browser QA should be performed in Firefox, Brave, Android, and desktop after GitHub Pages deploys

## Next likely decision point

Run QA on V52.7.  Priority checks: TrustMap scroll/pan behavior, no material TrustMap overlap, MJC core logo persistence, Architecture card routes, Evidence explanations, report previews, contact-gated download/print, no fake email delivery, Android performance, and absence of live enforcement/integration overclaims.
