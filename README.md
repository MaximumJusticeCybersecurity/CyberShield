# CyberShield Executive OS

## Current live build

Current build label: **V52.2 Guided Onboarding, Routed Dashboard, and Layered TrustMap Patch**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v52-2-routed-layers&reset=onboarding

## User-facing rule

Build and version labels belong in Settings/admin metadata and repo documentation.  They should not appear as executive-facing dashboard content.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V52.2.

## Current implemented build: V52.2

V52.2 combines the V52.1 TrustMap visual restoration patch with guided onboarding and routed dashboard behavior.  It keeps the clean V52 Executive First View, restores visual depth in TrustMap, and starts adapting the dashboard based on onboarding choices.

V52.2 changes:

- adds six-step guided onboarding
- routes dashboard emphasis by role, industry, scenario, evidence, priority, and audience
- restores TrustMap layer structure
- restores relationship lines between major TrustMap nodes
- restores neon selected-node and connected-edge feedback
- adds CSS-rendered graphical node treatments
- adds layer filters inside TrustMap without adding top-level tabs
- adds richer selected-node detail
- keeps Proof Pack output tied to routed onboarding choices
- preserves static advisory prototype boundary language

## Boundary

The current public build is a static advisory prototype.  It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, or production agent enforcement systems.

Do not overclaim autonomous enforcement, live notifications, live task assignment, live takedown automation, live marketplace scans, live domain validation, live ad-platform enforcement, live identity verification, live CRM sync, or live integrations until backend integrations exist.

## Known V52.2 limitations

- CSS remains inline in `index.html`
- TrustMap graphics are CSS-rendered approximations, not final brand-grade assets
- model registry remains scaffold-level and demo-directional
- scoring is not statistically validated
- hands-on browser QA should be performed in Firefox, Brave, Android, and desktop after GitHub Pages deploys

## Next likely decision point

Run QA on V52.2.  Priority checks: guided onboarding step flow, routed dashboard emphasis, layered TrustMap readability, relationship line highlighting, node selection detail, Android horizontal TrustMap scroll, Firefox and Brave performance, Proof Pack copy/download behavior, and absence of live enforcement/integration overclaims.
