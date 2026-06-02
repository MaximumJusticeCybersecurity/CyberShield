# CyberShield Executive OS

## Current live build

Current build label: **V60.3.12 TrustMap PNG Asset Integration and Interaction Recovery**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-12-png-asset-integration&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.12
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.12.

## Current implemented build: V60.3.12

V60.3.12 integrates the externally rendered hologram PNG assets into the existing TrustMap while recovering the base TrustMap interaction model.  The base V55.4 TrustMap renderer owns drag-to-pan, wheel zoom, plus/minus zoom, Fit Map, Kernel View, Domain View, and Object View.  The uploaded PNG assets own the Layer 1 and CyberShield Core visuals.

V60.3.12 changes:

- adds `src/ui/v60-3-12-trustmap-png-asset-integration.js`
- loads after `src/ui/v60-3-4-explicit-actionability-modal-disclosure.js`
- removes V60.3.10 and V60.3.11 from the operational loader
- maps the rendered CyberShield Trust Kernel PNG into `.v554-kernel`
- maps rendered Layer 1 PNG assets into `.v554-domain .orb`
- keeps the base TrustMap movement system operational
- does not override `#v554World` transform in CSS
- adds Pan X, Pan Y, and Zoom sliders to the existing TrustMap controls
- sliders simulate the same base TrustMap drag/wheel behavior instead of creating a second transform system
- adds neon circular hover/focus/selected rings around Layer 1 assets
- keeps right Selected Asset Trust Score distinct from left Operational Trust Score
- keeps the selected-asset explanation panel single and non-duplicated
- preserves Layer 2, Layer 3, pan, zoom, Fit Map, Kernel View, Domain View, and Object View
- preserves no-new-top-level-tabs rule
- preserves Settings as the place for build/version/governance/prototype metadata

## Required PNG assets

The runtime expects these exact files:

```text
assets/trustmap/v60-3-12/cybershield-trust-kernel.png
assets/trustmap/v60-3-12/cloud-infrastructure.png
assets/trustmap/v60-3-12/identities-access.png
assets/trustmap/v60-3-12/applications-data.png
assets/trustmap/v60-3-12/ai-systems-agents.png
assets/trustmap/v60-3-12/devices-endpoints.png
assets/trustmap/v60-3-12/cmmc-compliance.png
assets/trustmap/v60-3-12/third-parties-vendors.png
```

A ZIP package with the correct folder structure was generated for upload:

```text
cybershield_v60_3_12_trustmap_png_assets.zip
```

The GitHub text connector cannot directly upload binary PNG files.  The ZIP must be uploaded/extracted into the repository, or the PNG files must be uploaded manually through GitHub at the paths above.

## Non-negotiable TrustMap scope rule

```text
Do not replace the TrustMap page.
Do not remove the left Operational Trust Score panel.
Do not remove the right-side score area.
Do not remove Layer 2 or Layer 3.
Do not replace the radar / constellation environment.
Do not override #v554World transform with CSS.
Do not create a second movement system.
Only map rendered PNG assets into the existing TrustMap core and Layer 1 slots.
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

## Layer 1 hover/focus/selected rule

```text
Hovering, focusing, or selecting any Layer 1 PNG asset must show a neon circular selection ring around that asset.
Clicking a Layer 1 asset keeps the ring active until another Layer 1 asset is selected.
The right panel must match the selected Layer 1 asset.
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
confirm V60.3.12 loads after V60.3.4
confirm V60.3.10 and V60.3.11 no longer load
confirm all eight PNG asset files are present in assets/trustmap/v60-3-12/
confirm CyberShield Trust Kernel PNG appears at the center
confirm Cloud & Infrastructure PNG appears as a Layer 1 asset
confirm Identities & Access PNG appears as a Layer 1 asset
confirm Applications & Data PNG appears as a Layer 1 asset
confirm AI Systems & Agents PNG appears as a Layer 1 asset
confirm Devices & Endpoints PNG appears as a Layer 1 asset
confirm CMMC & Compliance PNG appears as a Layer 1 asset
confirm Third Parties & Vendors PNG appears as a Layer 1 asset
confirm no old flat SVG icons appear
confirm Layer 1 hover/focus/selected ring appears
confirm selected ring persists after clicking a Layer 1 asset
confirm map can be dragged
confirm mouse wheel zoom works
confirm + / − zoom works
confirm Pan X slider works
confirm Pan Y slider works
confirm Zoom slider works
confirm Fit Map works
confirm Kernel View works
confirm Domain View works
confirm Object View works
confirm Layer 2 and Layer 3 still show
confirm right panel does not duplicate or clip
confirm no new top-level tab exists
confirm no live evidence retrieval, live scoring, statistical validation, backend persistence, ticketing, notification, workflow, enforcement, CMMC, healthcare, or Internet Trust overclaims appear
```

## Lessons learned applied in V60.3.12

```text
Do not ask the assistant to invent production-grade visual art when high-fidelity branded graphics are required.
Use a specialist graphic artist or image generation workflow for rendered hologram assets.
Use the assistant for integration, layout, interaction recovery, repo hygiene, and QA discipline.
The base TrustMap renderer must own movement.
Rendered PNG assets must own visuals.
A V60 layer should map assets into existing slots, not fight the base renderer with transform overrides.
```

## Next likely decision point

After V60.3.12 browser QA, tune only if minor spacing is off.  If the map still fights movement or layout, stop post-render tuning and refactor the base TrustMap renderer directly.
