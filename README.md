# CyberShield Executive OS

## Current live build

Current build label: **V52.3 TrustMap Humanistic Visual Object Recovery**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v52-3-visual-objects&reset=onboarding

## User-facing rule

Build and version labels belong in Settings/admin metadata and repo documentation.  They should not appear as executive-facing dashboard content.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V52.3.

## Current implemented build: V52.3

V52.3 corrects the TrustMap visual language.  The build replaces crude CSS geometry with humanistic inline SVG symbolic objects and adds internal TrustMap drilldown states: overview, domain layer, and detail/action layer.

V52.3 changes:

- replaces crude TrustMap CSS geometry with smoother symbolic visual objects
- adds humanistic SVG objects for data stack, policy book, AI brain, vendor building, identity, evidence document, decision ledger, Proof Pack, exposure, and core shield
- clicking a TrustMap object now moves into a domain layer instead of only updating a side panel
- detail/action layer routes selected domains to evidence and Proof Pack context
- selected detail now includes breadcrumbs, back to TrustMap, open domain, and open action detail controls
- keeps six-step onboarding and routed dashboard behavior from V52.2
- adds no new top-level tabs

## Boundary

The current public build is a static advisory prototype.  It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, or production agent enforcement systems.

## Known V52.3 limitations

- SVG symbols are still prototype-grade visual objects, not final brand-grade illustrations
- CSS remains inline in `index.html`
- model registry remains scaffold-level and demo-directional
- scoring is not statistically validated
- hands-on browser QA should be performed in Firefox, Brave, Android, and desktop after GitHub Pages deploys

## Next likely decision point

Run QA on V52.3.  Priority checks: TrustMap visual object quality, overview to domain to detail navigation, breadcrumbs, Back to TrustMap, edge highlighting, Android horizontal scroll, Firefox and Brave performance, and absence of live enforcement/integration overclaims.
