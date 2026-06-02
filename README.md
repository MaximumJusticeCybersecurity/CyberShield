# CyberShield Executive OS

## Current live build

Current build label: **V60.3.19 TrustMap View-Mode Reapply and Performance Stabilization**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-19-view-mode-stabilization&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.19
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.19.

## Current implemented build: V60.3.19

V60.3.19 is a controlled TrustMap recovery layer.  It was added because Fit Map / Kernel View / Domain View / Object View can trigger older TrustMap visual rules and reintroduce old glow behavior or make the CyberShield Trust Kernel PNG appear inconsistently.

V60.3.19 re-applies the final visual state after view-mode changes, keeps the CyberShield Trust Kernel image visible, removes image-level drop-shadow glow in normal state, and throttles repeated recovery work.

## Current TrustMap visual stack

```text
V60.3.12 = PNG asset mapping and interaction recovery
V60.3.13 = stoplight trust color and PNG path recovery
V60.3.14 = background blend, oval highlight, asset fit, and fiber styling
V60.3.16 = centerline fiber connector overlay and three-pane separation
V60.3.16.1 = Trust Kernel right-panel detail and stoplight-only risk rows
V60.3.17 = Briefing TrustMap Snapshot image
V60.3.18 = Layer 1 neutral state and uniform hologram cube sizing
V60.3.19 = TrustMap view-mode reapply and performance stabilization
```

## V60.3.19 changes

- adds `src/ui/v60-3-19-trustmap-view-mode-reapply-performance.js`
- chains through `src/ui/v60-3-14-trustmap-background-oval-highlight-spacing.js`
- re-applies final Layer 1 neutral visual state after Fit Map / Kernel View / Domain View / Object View
- forces CyberShield Trust Kernel PNG back into the center if an older renderer state replaces it
- forces Layer 1 PNG images back into their asset slots if old SVG icons return
- removes image-level drop-shadow glow in normal Layer 1 state
- preserves stoplight oval glow only for hover/focus/selected state
- throttles recovery work to reduce sluggishness and jitter
- preserves no-new-top-level-tabs rule

## Known unresolved visual issues for next builder

```text
Layer 1 hologram transparency is inconsistent.
CMMC, Devices & Endpoints, and Cloud & Infrastructure appear more transparent.
Preferred direction: all Layer 1 images should appear bright and solid like the non-transparent/brighter assets, unless explicitly changed by Dr. Justice.

Third Parties & Vendors still appears as a square neon box.
It must render the same visible holographic cube size/style as the other Layer 1 assets.

Verify whether V60.3.19 removes the old glow after Fit Map and Kernel View.
If it does not, stop adding overlay layers and consolidate/refactor the TrustMap visual stack.

The CyberShield Trust Kernel must always be visible in the TrustMap center.
It should not only appear after Fit Map or Kernel View.

The TrustMap should not feel slow or jittery.
If it does, reduce stacked event listeners and consolidate visual reapply behavior.
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
Third Parties & Vendors must not be smaller, cropped, zoomed, or boxed differently from the others.
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

## Connector rule

```text
Default connectors should resemble the white-blue fiber optic line in the CyberShield Trust Kernel image.
Connectors should be drawn center-point to center-point behind rendered objects.
Rendered images stay above connector lines so lines appear to terminate at object perimeters.
Trust-state connector highlights may use digital fiber optic green, yellow, or red depending on selected/scenario path.
Connectors should look illuminated and data-bearing, not like flat SVG line work.
```

## Stoplight trust color rule

```text
Green = Good / Strong / Allowed
Yellow = Needs Verification / Constrained / Moderate
Red = At Risk / Critical / Refused
Blue = neutral brand/system/fiber/AI-working state, not trust-state severity
```

## CyberShield Trust Kernel detail rule

```text
Hovering or focusing the CyberShield Trust Kernel should update the right pane.
The right pane score should match the Operational Trust Score.
The right pane should show core model explanation, assumed activity, evidence gaps, and what happens next.
Click behavior can still route to Runtime if needed, but hover/focus should provide inspection detail in place.
```

## Risk row color rule

```text
Top Trust Break Drivers:
1. Critical = red
2. High = red
3. Medium = yellow
4. Low = yellow

Active Risks:
1. Critical = red
2. High = red
3. High = red
4. Medium = yellow

Risk rows must never use blue for trust severity.
```

## Boundary

The current public build is a static advisory prototype.  It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, banking systems, payment systems, live evidence retrieval, live internet claim verification, live scoring, live claim extraction, statistical validation, backend persistence, workflow automation, ticketing, notifications, or production agent enforcement systems.

## GitHub Pages browser QA required

```text
hard refresh live prototype
complete/reset onboarding
open Briefing
confirm TrustMap Snapshot uses assets/The Trust Map.png
confirm Decision Brief remains intact
confirm Expand full TrustMap still routes to TrustMap
open TrustMap
confirm CyberShield Trust Kernel appears immediately and stays visible
confirm all eight PNGs appear from assets/
confirm all seven Layer 1 assets are evenly distributed
confirm all Layer 1 holographic cubes render at the same apparent size
confirm no constant red/yellow/green glow in normal Layer 1 state
confirm old glow does not return after Fit Map
confirm old glow does not return after Kernel View
confirm hover/focus/selected rings are oval and stoplight colored
confirm selected glow persists until another Layer 1 asset is selected
confirm Third Parties & Vendors is no longer rendered as a square box or different-sized cube
confirm CMMC, Devices & Endpoints, Cloud & Infrastructure are not faded compared to the other assets
confirm connectors draw center-to-center behind the objects
confirm rendered objects sit above connector lines
confirm connectors look like white-blue fiber optic trust lines
confirm selected/path connectors can highlight in stoplight trust color
confirm left, center, and right panes share the same top and bottom alignment
confirm right pane does not overlap the center Enterprise Trust Map
confirm hovering/focusing CyberShield Trust Kernel updates the right pane
confirm Trust Kernel right-pane score matches the Operational Trust Score
confirm Top Trust Break Drivers use red/red/yellow/yellow and no blue
confirm Active Risks use red/red/red/yellow and no blue
confirm map drag, wheel zoom, +/− zoom, sliders, Fit Map, Kernel View, Domain View, and Object View still work
confirm map does not feel slow or jittery
confirm no new top-level tab exists
confirm no live evidence retrieval, live scoring, statistical validation, backend persistence, ticketing, notification, workflow, enforcement, CMMC, healthcare, or Internet Trust overclaims appear
```

## Lessons learned applied

```text
Do not ask the assistant to invent production-grade visual art when high-fidelity branded graphics are required.
Use a specialist graphic artist or image-generation workflow for rendered hologram assets.
Use the assistant for integration, layout, interaction recovery, repo hygiene, and QA discipline.
The base TrustMap renderer must own movement.
Rendered PNG assets must own visuals.
Trust-state colors must be stoplight green/yellow/red, not arbitrary asset accent colors.
Highlight containers, not rectangular PNG canvases.
Connector visuals should follow the CyberShield Trust Kernel fiber-optic light-line metaphor.
Controlled build layers should be narrow, explicit, and reversible.
Avoid broad renderer rewrites unless visual layers can no longer meet the requirement.
If stacked overlay layers start fighting each other, stop adding overlays and consolidate/refactor.
Briefing snapshot image and full TrustMap interaction are separate surfaces.
Normal Layer 1 hologram state must be visually neutral.  Stoplight color appears only on hover/focus/selected state.
```

## Next likely decision point

The next builder should start with browser QA on V60.3.19, then address Layer 1 visual consistency.  If the TrustMap remains slow, the old glow returns, or the CyberShield Trust Kernel still appears inconsistently, do not add another overlay layer.  Consolidate the TrustMap visual stack or refactor the TrustMap renderer directly.
