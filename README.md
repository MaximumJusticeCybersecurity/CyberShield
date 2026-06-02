# CyberShield Executive OS

## Current live build

Current build label: **V60.3.17 Briefing TrustMap Snapshot Image**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-17-briefing-trustmap-snapshot&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.17
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.17.

## Current implemented build: V60.3.17

V60.3.17 is a focused Briefing-only visual layer.  It replaces the generated TrustMap Snapshot mockup on the Briefing page with the rendered image asset:

```text
assets/The Trust Map.png
```

The full TrustMap tab remains interactive and unchanged by this build.

## V60.3.17 changes

- adds `src/ui/v60-3-17-briefing-trustmap-snapshot-image.js`
- wires it immediately after `src/ui/v60-3-3-first-layer-decision-brief-trustmap-snapshot.js`
- replaces only `.v6033-map-wrap` inside the Briefing first-layer snapshot panel
- uses `assets/The Trust Map.png` as the primary Briefing TrustMap Snapshot image
- includes fallback paths for likely snapshot names
- preserves Decision Brief copy and action buttons
- preserves the full interactive TrustMap tab
- preserves no-new-top-level-tabs rule

## Current TrustMap visual stack

```text
V60.3.12 = PNG asset mapping and interaction recovery
V60.3.13 = stoplight trust color and PNG path recovery
V60.3.14 = background blend, oval highlight, asset fit, and fiber styling
V60.3.16 = centerline fiber connector overlay and three-pane separation
V60.3.16.1 = Trust Kernel right-panel detail and stoplight-only risk rows
V60.3.17 = Briefing TrustMap Snapshot image
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
Do not replace the TrustMap page.
Do not remove the left Operational Trust Score panel.
Do not remove the right-side score area.
Do not remove Layer 2 or Layer 3.
Do not replace the radar / constellation environment.
Do not override #v554World transform with CSS.
Do not create a second movement system.
Only map rendered PNG assets into the existing TrustMap core and Layer 1 slots.
Trust-state colors are stoplight green, yellow, red only.
```

## Briefing snapshot rule

```text
The Briefing page TrustMap Snapshot uses assets/The Trust Map.png.
The snapshot is a static executive preview.
The full interactive TrustMap remains on the TrustMap tab.
Do not make the Briefing snapshot replace the full TrustMap page.
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
Connectors should be drawn center-point to center-point behind the rendered objects.
Rendered images stay above connector lines so lines appear to terminate at object perimeters.
Trust-state connector highlights may use digital fiber optic green, yellow, or red depending on selected/scenario path.
Connectors should look illuminated and data-bearing, not like flat SVG line work.
```

## Stoplight trust color rule

```text
Green = Good / Strong / Allowed
Yellow = Needs Verification / Constrained / Moderate
Red = At Risk / Critical / Refused
```

The selected asset score and the Layer 1 hover/focus/selected ring must match the trust-state color, not the native hologram image color.

## Oval highlight rule

```text
Normal state = native hologram asset blended into the TrustMap background.
No constant red/yellow/green glow in normal state.
Hover/focus = stoplight oval glow appears.
Click/select = stoplight oval glow persists until another asset is selected.
The trust-state highlight belongs to the oval containment layer around the Layer 1 object, not to the rectangular PNG image canvas.
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

Risk rows must never use blue for trust severity.  Blue means neutral brand/system/fiber/AI-working state.
```

## Boundary

The current public build is a static advisory prototype.  It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, banking systems, payment systems, live evidence retrieval, live internet claim verification, live scoring, live claim extraction, statistical validation, backend persistence, workflow automation, ticketing, notifications, or production agent enforcement systems.

## GitHub Pages browser QA required

After deployment, run browser QA unless the live page has already been directly verified.

Priority checks:

```text
hard refresh live prototype
complete/reset onboarding
open Briefing
confirm TrustMap Snapshot uses assets/The Trust Map.png
confirm Decision Brief remains intact
confirm Expand full TrustMap still routes to TrustMap
open TrustMap
confirm all eight PNGs appear from assets/
confirm all seven Layer 1 assets are evenly distributed
confirm no constant red/yellow/green glow in normal Layer 1 state
confirm hover/focus/selected rings are oval and stoplight colored
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
confirm no new top-level tab exists
confirm no live evidence retrieval, live scoring, statistical validation, backend persistence, ticketing, notification, workflow, enforcement, CMMC, healthcare, or Internet Trust overclaims appear
```

## Lessons learned applied

```text
Do not ask the assistant to invent production-grade visual art when high-fidelity branded graphics are required.
Use a specialist graphic artist or image generation workflow for rendered hologram assets.
Use the assistant for integration, layout, interaction recovery, repo hygiene, and QA discipline.
The base TrustMap renderer must own movement.
Rendered PNG assets must own visuals.
Trust-state colors must be stoplight green/yellow/red, not arbitrary asset accent colors.
Highlight containers, not rectangular PNG canvases.
Connector visuals should follow the CyberShield Trust Kernel fiber-optic light-line metaphor.
Controlled build layers should be narrow, explicit, and reversible.
Avoid broad renderer rewrites unless visual layers can no longer meet the requirement.
Briefing snapshot image and full TrustMap interaction are separate surfaces.
```

## Next likely decision point

After V60.3.17 browser QA, fix only minor image fit/crop, Briefing snapshot height, or cache/path issues.  Do not touch the full TrustMap renderer for Briefing snapshot work.
