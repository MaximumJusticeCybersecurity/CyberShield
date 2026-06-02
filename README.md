# CyberShield Executive OS

## Current live build

Current build label: **V60.3.22 TrustMap Image Prewarm**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-22-trustmap-image-prewarm&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.22
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.22.

## Current implemented build: V60.3.22

V60.3.22 keeps the faster V60.3.21 shell-load architecture and addresses the next observed bottleneck: TrustMap PNG images were still loading slowly after the app itself became faster.

The correction is controlled image prewarming. The app shell still loads first. After the shell is usable, CyberShield starts warming the TrustMap Kernel, Layer 1 PNGs, and Briefing snapshot in sequence. When the user explicitly opens TrustMap, those image requests are prioritized.

## Current TrustMap visual and performance stack

```text
V60.3.12 = PNG asset mapping and interaction recovery
V60.3.13 = stoplight trust color and PNG path recovery
V60.3.14 = connector trust-state preservation and chain loader
V60.3.16 = centerline fiber connector overlay and three-pane separation
V60.3.16.1 = Trust Kernel right-panel detail and stoplight-only risk rows
V60.3.17 = Briefing TrustMap Snapshot image
V60.3.20 = consolidated Layer 1 visual consistency and view-mode recovery
V60.3.21 = mobile load performance gate, TrustMap lazy-load trigger, mobile animation/filter reduction
V60.3.22 = TrustMap PNG image prewarm after shell readiness
```

V60.3.18 and V60.3.19 remain in the repository for audit history but are no longer imported at runtime through the V60.3.14 chain.

## V60.3.22 changes

- Adds `src/ui/v60-3-22-trustmap-image-prewarm.js`
- Updates `src/ui/v52-7-operational-layer.js` to import the image prewarm module
- Preserves V60.3.21 lazy TrustMap stack loading
- Starts TrustMap PNG prewarm after the app shell is usable
- Prioritizes TrustMap images when the user opens TrustMap or expands full TrustMap from Briefing
- Warms the CyberShield Trust Kernel first, then Layer 1 PNGs and the Briefing snapshot
- Keeps image decoding async where possible
- Preserves no-new-top-level-tabs rule

## Performance doctrine

```text
Load the executive shell first.
Do not force mobile users to pay the full TrustMap cost during startup.
Warm TrustMap images after the shell is usable.
Load the full interactive TrustMap only when requested.
Prioritize TrustMap images when TrustMap is explicitly opened.
Prefer one owned render/reapply path over stacked timers and event listeners.
If the TrustMap remains slow, compress/resize PNG assets or convert them to WebP/AVIF before adding more runtime logic.
```

## Required PNG assets

The TrustMap Layer 1/Core PNG files currently live in the root assets folder:

```text
assets/CyberShield Trust Kernel.png
assets/cloud_infrastructure.png
assets/identities_access.png
assets/applications_data.png
assets/AI_systems_and_Agents.png
assets/devices_endpoints.png
assets/CMMC_and_Compliance.png
assets/Third Parties and Vendors.png
```

The Briefing snapshot image should live at:

```text
assets/The Trust Map.png
```

## Non-negotiable TrustMap scope rule

```text
Do not replace the TrustMap page unless explicitly directed as a refactor.
Do not remove the left Operational Trust Score panel.
Do not remove the right-side selected asset score/detail area.
Do not remove Layer 2 or Layer 3.
Do not replace the radar / constellation environment.
Do not create a second movement system.
Trust-state colors are stoplight green, yellow, red only.
Do not make the Briefing snapshot replace the full TrustMap page.
```

## Briefing snapshot rule

```text
The Briefing page TrustMap Snapshot uses assets/The Trust Map.png.
The snapshot is a static executive preview.
The full interactive TrustMap remains on the TrustMap tab.
```

## Layer 1 neutral state and sizing rule

```text
Layer 1 assets should not have constant color highlight or glow.
Layer 1 stoplight glow appears only on hover, focus, or selected/clicked state.
Selected glow persists until another Layer 1 asset is selected.
All Layer 1 holographic cubes must render at the same apparent size.
Third Parties & Vendors must not be smaller, cropped, zoomed, square-boxed, or styled differently from the others.
The visual priority is a bright, consistent holographic cube look across all Layer 1 assets.
```

## Three-pane layout rule

```text
TrustMap dashboard has three distinct panes:
Left = Operational Trust Score and executive trust context
Center = Enterprise Trust Map
Right = selected item breakdown
All three panes must share the same top start line.
All three panes must share the same bottom stop line.
The right pane must not overlap or visually swallow the center map pane.
```

## Boundary

The current public build is a static advisory prototype. It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, banking systems, payment systems, live evidence retrieval, live internet claim verification, live scoring, live claim extraction, statistical validation, backend persistence, workflow automation, notifications, or production agent enforcement systems.

## GitHub Pages browser QA required

```text
hard refresh live prototype
complete/reset onboarding
confirm initial app shell remains fast on phone
wait briefly after shell load so image prewarm can begin
open TrustMap
confirm TrustMap images appear faster than V60.3.21
confirm CyberShield Trust Kernel appears first or near-first
confirm all Layer 1 PNGs appear from assets/
confirm Briefing snapshot still uses assets/The Trust Map.png
confirm no app-level slowdown returns
confirm no new top-level tab exists
confirm no overclaims appear
```
