# CyberShield Executive OS

## Current live build

Current build label: **V60.3.9.1 TrustMap Render Stability and Core Anchor Correction**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-9-1-render-stability-core-anchor&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.9.1
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.9.1.

## Current implemented build: V60.3.9.1

V60.3.9.1 stabilizes the TrustMap rendered Layer 1 asset work from V60.3.9.  It preserves the original TrustMap shell, center CyberShield Core, MJC shield/logo, left Operational Trust Score, right Selected Asset Trust Score, radar rings, Layer 2, Layer 3, pan/zoom, and mode controls.  It adds a MutationObserver-driven stabilization layer so old flat SVG icons do not flash back after clicks, mode changes, or TrustMap re-renders.

V60.3.9.1 changes:

- adds `src/ui/v60-3-9-1-trustmap-render-stability-core-anchor.js`
- loads V60.3.9.1 after `src/ui/v60-3-9-trustmap-rendered-layer1-assets.js`
- keeps V60.3.9 rendered WebP asset paths as the preferred source
- adds inline SVG holographic fallback visuals if WebP files are missing
- adds a MutationObserver to re-apply Layer 1 assets when the base TrustMap renderer mutates
- hides old flat SVG icons inside Layer 1 domains so they cannot flash back during re-render cycles
- reduces Layer 1 image footprint to reduce overlap
- moves the TrustMap world upward inside the center column
- strengthens the CyberShield Core as a shield-shaped MJC/CyberShield trust kernel
- adds a blue energy/hover pad under the core
- keeps right Selected Asset Trust Score distinct from left Operational Trust Score
- keeps selected-asset model explanation below the right score area
- keeps Daily / Weekly / Monthly trend redraw behavior
- preserves no-new-top-level-tabs rule
- preserves Settings as the place for build/version/governance/prototype metadata

## Required rendered asset files

The runtime prefers these files when present:

```text
assets/trustmap/layer1/cloud-infrastructure.webp
assets/trustmap/layer1/identities-access.webp
assets/trustmap/layer1/applications-data.webp
assets/trustmap/layer1/ai-systems-agents.webp
assets/trustmap/layer1/third-parties-vendors.webp
assets/trustmap/layer1/devices-endpoints.webp
assets/trustmap/layer1/cmmc-compliance.webp
```

If those files are missing, V60.3.9.1 uses inline holographic fallback visuals so the TrustMap does not revert to the old one-dimensional icon set.

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
The selected-asset panel belongs below the existing right-side score area.
It changes when the user hovers or focuses a Layer 1 graphical asset.
It must not replace the score area above it.
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
confirm map sits higher in the center column
confirm original center CyberShield Core remains
confirm center core is shield-shaped and blue-glow anchored
confirm MJC shield/logo remains visible
confirm left Operational Trust Score is visible
confirm right Selected Asset Trust Score is visible
confirm right score changes when hovering/focusing Layer 1 assets
confirm old flat cloud/monitor/SVG icons do not flash back after clicks
confirm Layer 1 graphics do not overlap badly
confirm selected-asset model explanation appears below the right score area
confirm Daily / Weekly / Monthly trend buttons redraw the trend line
confirm radar rings and constellation background remain
confirm Layer 2 and Layer 3 are still present
confirm pan, zoom, Fit Map, Kernel View, Domain View, and Object View still work
confirm no new top-level tab exists
confirm no live evidence retrieval, live scoring, statistical validation, backend persistence, ticketing, notification, workflow, enforcement, CMMC, healthcare, or Internet Trust overclaims appear
```

## Next likely decision point

After V60.3.9.1 browser QA, the next build should tune exact visual fidelity: final WebP asset upload path, image scale, hover glow, shield/core text fit, map vertical centering, connector anchor feel, and right score/panel spacing.
