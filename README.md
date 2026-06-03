# CyberShield Executive OS

## Current live build

Current build label: **V60.3.24 TrustMap Render Lifecycle Controller**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-24-trustmap-render-lifecycle&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.24
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.24.

## Current implemented build: V60.3.24

V60.3.24 adds a TrustMap render lifecycle controller.  The goal is not to redesign the TrustMap.  The goal is to create one traceable lifecycle path for TrustMap request, stack load, asset manifest load, image prewarm, render detection, view-mode changes, and visual stabilization.

This release preserves the faster V60.3.21/V60.3.22 shell and the V60.3.23 asset manifest path.

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
V60.3.23 = TrustMap asset manifest and governed future asset intake
V60.3.24 = TrustMap render lifecycle controller
```

## V60.3.24 changes

- Adds `docs/v60-3-24-to-v60-3-31-release-engineering-packages.md`
- Adds `src/ui/v60-3-24-trustmap-render-lifecycle-controller.js`
- Updates `src/ui/v52-7-operational-layer.js` to load the lifecycle controller and emit TrustMap request / stack-start events
- Updates `src/ui/v60-3-22-trustmap-image-prewarm.js` to emit `cybershield:trustmap-images-prewarm-started`
- Preserves V60.3.23 manifest-backed image prewarm
- Preserves fast shell and on-demand TrustMap loading
- Preserves no-new-top-level-tabs rule

## Lifecycle events now tracked

```text
cybershield:trustmap-requested
cybershield:trustmap-stack-load-started
cybershield:trustmap-stack-loaded
cybershield:trustmap-asset-manifest-loaded
cybershield:trustmap-images-prewarm-started
cybershield:trustmap-images-prewarmed
cybershield:trustmap-render-detected
cybershield:trustmap-view-mode-changed
cybershield:trustmap-visual-stabilized
```

## Asset intake contract

```text
All Layer 1 assets must use one locked template for canvas size, cube scale, camera angle, lighting, and margins.
Base artwork should use black or near-black backgrounds.
Green, yellow, and red are UI trust-state overlays only.
Base art should remain neutral blue/white/black.
Current PNG files remain valid fallbacks.
Future WebP/PNG paths are defined in the asset manifest.
If images remain slow, optimize image dimensions and file size before adding more runtime logic.
```

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

## GitHub Pages browser QA required

```text
hard refresh live prototype
complete/reset onboarding
confirm initial app shell remains fast on phone
confirm asset manifest loads or gracefully falls back
confirm TrustMap lifecycle metadata appears in admin payload
open TrustMap
confirm current PNG assets still load
confirm lifecycle events update after TrustMap opens
confirm view controls still work
confirm no visible UI clutter was added
confirm no new top-level tab exists
confirm no overclaims appear
```
