# CyberShield Executive OS

## Current live build

Current build label: **V60.3.10 TrustMap Authoritative Render Consolidation**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-10-authoritative-render&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.10
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.10.

## Current implemented build: V60.3.10

V60.3.10 consolidates the TrustMap post-render stack into one authoritative layer.  It removes the competing V60.3.9 and V60.3.9.1 runtime imports from the operational loader and replaces them with one finalization file.  It preserves the original TrustMap shell, center CyberShield Core, MJC shield/logo, left Operational Trust Score, right selected-asset score, radar rings, Layer 2, Layer 3, pan/zoom, and mode controls while making the final TrustMap state stable.

V60.3.10 changes:

- adds `src/ui/v60-3-10-trustmap-authoritative-render-consolidation.js`
- removes `src/ui/v60-3-9-trustmap-rendered-layer1-assets.js` from the loader
- removes `src/ui/v60-3-9-1-trustmap-render-stability-core-anchor.js` from the loader
- makes V60.3.10 the only TrustMap post-render authority after V60.3.4
- uses embedded holographic Layer 1 visuals so the map does not depend on missing WebP files
- suppresses old flat one-dimensional SVG icons inside Layer 1 domains
- replaces duplicated right-panel content with one selected-asset score and one selected-asset explanation
- top-biases the TrustMap world so it aligns better with the left and right score cards
- makes the right panel scroll instead of clipping selected-asset content
- reduces Layer 1 asset footprint to reduce overlap
- strengthens the center CyberShield Core as a shield-shaped MJC/CyberShield trust kernel
- adds a blue energy/hover pad under the core
- keeps right Selected Asset Trust Score distinct from left Operational Trust Score
- keeps Daily / Weekly / Monthly trend redraw behavior
- preserves no-new-top-level-tabs rule
- preserves Settings as the place for build/version/governance/prototype metadata

## Non-negotiable TrustMap scope rule

```text
Do not replace the TrustMap page.
Do not replace the center CyberShield Core.
Do not remove the MJC shield/logo.
Do not remove the left Operational Trust Score panel.
Do not remove the right-side score area.
Do not remove Layer 2 or Layer 3.
Do not replace the radar / constellation environment.
Only replace the graphical representation of the Layer 1 assets.
```

## Layer 1 TrustMap assets

```text
Cloud & Infrastructure
Identities & Access
Applications & Data
AI Systems & Agents
Third Parties & Vendors
Devices & Endpoints
CMMC & Compliance
```

## Score rule

```text
Left score = Operational Trust Score for the current scenario/environment.
Right score = Selected Asset Trust Score for the hovered/focused Layer 1 asset.
Those scores must not be duplicated unless they intentionally represent the same metric.
```

## Selected asset panel rule

```text
The selected-asset panel belongs below the right-side selected asset score.
It changes when the user hovers or focuses a Layer 1 graphical asset.
It must not duplicate the base Layer 1 Domain Detail panel.
```

## Public TrustMap language rule

Use product language in executive-facing screens:

```text
Enterprise Trust Map
Decision Trust Universe
```

Do not expose builder language such as:

```text
registry-driven
renders from registry
versioned render source
V55.3 registry
implementation layer
```

That language belongs in Settings/admin metadata and repo documentation only.

## Boundary

The current public build is a static advisory prototype.  It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, banking systems, payment systems, live evidence retrieval, live internet claim verification, live scoring, live claim extraction, statistical validation, backend persistence, workflow automation, ticketing, notifications, or production agent enforcement systems.

## GitHub Pages browser QA required

After deployment, run browser QA unless the live page has already been directly verified.

Priority checks:

```text
hard refresh live prototype
complete/reset onboarding
open TrustMap
confirm loader uses only V60.3.10 after V60.3.4
confirm V60.3.9 and V60.3.9.1 no longer load
confirm map sits higher in the center column
confirm left Operational Trust Score is top-aligned with the center map and right score area
confirm original center CyberShield Core remains
confirm center core is shield-shaped and blue-glow anchored
confirm MJC shield/logo remains visible
confirm right Selected Asset Trust Score is visible
confirm right score changes when hovering/focusing Layer 1 assets
confirm no duplicate Cloud/model explanation appears
confirm selected-asset panel is not chopped and the right panel scrolls when needed
confirm old flat cloud/monitor/SVG icons do not flash back after clicks
confirm Layer 1 graphics do not overlap badly
confirm Daily / Weekly / Monthly trend buttons redraw the trend line
confirm radar rings and constellation background remain
confirm Layer 2 and Layer 3 are still present
confirm pan, zoom, Fit Map, Kernel View, Domain View, and Object View still work
confirm no new top-level tab exists
confirm no live evidence retrieval, live scoring, statistical validation, backend persistence, ticketing, notification, workflow, enforcement, CMMC, healthcare, or Internet Trust overclaims appear
```

## Next likely decision point

After V60.3.10 browser QA, the next build should tune visual fidelity only: final rendered WebP asset upload path, exact shield geometry, map top alignment, Layer 1 image scale, connector anchor feel, and right-panel spacing.
