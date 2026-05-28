# CyberShield Executive OS

## Current live build

Current build label: **V52.5 Interaction Recovery Patch**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v52-5-interaction-recovery&reset=onboarding

## User-facing rule

Build and version labels belong in Settings/admin metadata and repo documentation.  They should not appear as executive-facing dashboard content.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V52.5.

## Current implemented build: V52.5

V52.5 is an interaction and performance recovery patch.  It removes the runaway full-body MutationObserver introduced during the V52.4 core-logo workaround and adds lightweight click routing from Briefing cards and rows into Runtime, TrustMap, Evidence, and Proof Pack.

V52.5 changes:

- removes full-body mutation watching that likely caused slow rendering and tab lock
- preserves the MJC-logo TrustMap core as an event-triggered patch
- makes Briefing summary cards and rows visibly clickable
- routes Risky Action and Runtime Control to Runtime
- routes Trust Posture and Dashboard Routing to TrustMap
- routes Proof Status and Proof Pack to Proof Pack
- routes Evidence language to Evidence
- preserves six-step onboarding and routed dashboard behavior
- adds no new top-level tabs

## Boundary

The current public build is a static advisory prototype.  It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, or production agent enforcement systems.

## Known V52.5 limitations

- briefing click routing is rule-based text routing, not yet clean component-level routing
- core logo patch remains injected through `src/core/registryLoader.js` as a connector workaround
- surrounding TrustMap visual objects remain prototype-grade
- CSS remains inline or injected rather than fully extracted to a stylesheet
- hands-on browser QA should be performed in Firefox, Brave, Android, and desktop after GitHub Pages deploys

## Next likely decision point

Run QA on V52.5.  Priority checks: app no longer locks on TrustMap, navigation remains usable after clicking TrustMap, Briefing cards route to the expected workspaces, TrustMap core logo still appears, Android performance is acceptable, and no live enforcement/integration overclaims appear.
