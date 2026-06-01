# CyberShield Executive OS

## Current live build

Current build label: **V60.3.9 TrustMap Rendered Layer 1 Asset Integration and Scoring Correction**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-9-rendered-layer1-assets&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.9
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.9.

## Current implemented build: V60.3.9

V60.3.9 moves Layer 1 visuals from CSS/SVG approximation to rendered image-asset integration.  It preserves the original TrustMap shell, center CyberShield Core, MJC shield/logo, left Operational Trust Score, right selected-asset score area, radar rings, Layer 2, Layer 3, pan/zoom, and mode controls.  It replaces only the Layer 1 domain graphics with rendered WebP assets in the approved holographic-cube visual style.

V60.3.9 changes:

- adds `src/ui/v60-3-9-trustmap-rendered-layer1-assets.js`
- replaces the V60.3.8 renderer import in `src/ui/v52-7-operational-layer.js`
- expects rendered asset files in `assets/trustmap/layer1/`
- uses actual rendered Layer 1 image assets, not CSS/SVG approximations
- preserves the original TrustMap layout and scoring panels
- preserves the center CyberShield Core with MJC shield/logo, organization name, and Trust Kernel language
- improves the center core as a neon MJC-shield-shaped trust kernel with a blue hover/energy-glow base
- preserves the original left Operational Trust Score panel
- changes the right score area to `Selected Asset Trust Score`
- makes the right score change by hovered/focused Layer 1 asset
- replaces only Layer 1 asset graphics with rendered holographic-cube assets
- adds a selected-asset model explanation panel below the right-side score area
- folds redundant Layer 1 domain detail into the selected-asset model explanation
- wires Daily / Weekly / Monthly trend buttons to redraw static prototype trend lines
- keeps public TrustMap language product-facing
- preserves no-new-top-level-tabs rule
- preserves Settings as the place for build/version/governance/prototype metadata

## Required rendered asset files

The runtime expects these files:

```text
assets/trustmap/layer1/cloud-infrastructure.webp
assets/trustmap/layer1/identities-access.webp
assets/trustmap/layer1/applications-data.webp
assets/trustmap/layer1/ai-systems-agents.webp
assets/trustmap/layer1/third-parties-vendors.webp
assets/trustmap/layer1/devices-endpoints.webp
assets/trustmap/layer1/cmmc-compliance.webp
```

A ZIP package containing the seven rendered WebP assets was generated for upload into that folder:

```text
cybershield_layer1_assets_v6039.zip
```

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
confirm original center CyberShield Core is back
confirm MJC shield/logo remains in the center core
confirm center core is shield-shaped and blue-glow anchored
confirm organization name and Trust Kernel language fit inside the shield
confirm left Operational Trust Score panel is visible
confirm right Selected Asset Trust Score is visible
confirm right score changes when hovering/focusing Layer 1 assets
confirm rendered image assets load from assets/trustmap/layer1/
confirm Layer 1 assets resemble the approved rendered visual target
confirm selected-asset model explanation appears below the right score area
confirm redundant Layer 1 Domain Detail does not compete with the model explanation
confirm Daily / Weekly / Monthly trend buttons redraw the trend line
confirm radar rings and constellation background remain
confirm Layer 2 and Layer 3 are still present
confirm pan, zoom, Fit Map, Kernel View, Domain View, and Object View still work
confirm no new top-level tab exists
confirm no live evidence retrieval, live scoring, statistical validation, backend persistence, ticketing, notification, workflow, enforcement, CMMC, healthcare, or Internet Trust overclaims appear
```

## Next likely decision point

After the seven WebP files are uploaded and V60.3.9 browser QA runs, the next build should tune exact visual placement: Layer 1 image scale, hover glow, shield/core text fit, map vertical centering, right score/panel spacing, and whether the rendered assets match the approved target closely enough in the real browser.
