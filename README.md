# CyberShield Executive OS

## Current live build

Current build label: **V52.6 Operational Interaction and Readability Recovery**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v52-6-operational-interaction&reset=onboarding

## User-facing rule

Build and version labels belong in Settings/admin metadata and repo documentation.  They should not appear as executive-facing dashboard content.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V52.6.

## Current implemented build: V52.6

V52.6 is an operational interaction and readability recovery patch.  It keeps the V52.5 performance recovery, improves onboarding card readability, adds dashboard meters and drilldown hints, reduces TrustMap visual crowding, adds explanation panels for Architecture and Evidence interactions, and restores a report-library concept under Proof Pack.

V52.6 changes:

- onboarding option cards now separate bold title and explanatory text onto distinct lines
- dashboard cards now get visual meter bars and tap-to-drill-down hints
- briefing cards and rows route to deeper workspaces and explanation panels
- TrustMap connector lines are thinner
- TrustMap node cards are smaller and spread out to reduce overlap
- MJC logo core remains event-triggered without a full-page MutationObserver
- Architecture cards open differentiated explanations instead of acting like dead cards
- Evidence Required/Gap rows explain why the item matters
- Proof Pack includes prototype report-library cards
- no new top-level tabs were added

## Boundary

The current public build is a static advisory prototype.  It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, or production agent enforcement systems.

## Known V52.6 limitations

- interaction routing is still partly rule-based text routing rather than clean component-level routing
- the core logo and interaction patch still live in `src/core/registryLoader.js` as a connector workaround
- TrustMap visual objects remain prototype-grade
- CSS remains inline or injected rather than fully extracted to a stylesheet
- Proof Pack report cards are prototypes and do not yet generate separate full reports
- hands-on browser QA should be performed in Firefox, Brave, Android, and desktop after GitHub Pages deploys

## Next likely decision point

Run QA on V52.6.  Priority checks: onboarding card spacing, dashboard meters, briefing drilldown routing, TrustMap overlap reduction, core logo persistence after Back to TrustMap, Architecture explanations, Evidence explanations, Proof Pack report-library cards, Android performance, and absence of live enforcement/integration overclaims.
