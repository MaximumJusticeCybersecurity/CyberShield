# CyberShield Executive OS

## Current live build

Current build label: **V60.3.14 TrustMap Background Blend, Oval Highlight, Layer 1 Spacing, and Fiber Optic Connectors**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-14-trustmap-visual-blend&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.14
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.14.

## Current implemented build: V60.3.14

V60.3.14 tunes the TrustMap visual integration after the PNG assets were uploaded to the root `assets/` folder.  It keeps V60.3.12 for PNG mapping and interaction recovery, keeps V60.3.13 for stoplight trust-state color logic and path fallback, and adds a visual blend layer for the Enterprise Trust Map.

V60.3.14 changes:

- adds `src/ui/v60-3-14-trustmap-background-oval-highlight-spacing.js`
- is chained through the V60.3.13 module because the loader update was blocked by the connector safety check
- blends the TrustMap background toward the dark blue-black PNG canvas tone
- moves trust highlighting from the PNG image rectangle to an oval containment layer
- reduces the visible square-highlight artifact around rendered PNG assets
- keeps stoplight green/yellow/red trust-state highlighting
- expands and strengthens the oval hover/focus/selected highlight
- adjusts Cloud and CMMC positioning to reduce overlap
- adds fiber-optic connector styling based on the white-blue light line in the CyberShield Trust Kernel image
- default connectors use white-blue MJC fiber-optic styling
- trust-state connector highlights may use stoplight green, yellow, or red when applicable
- preserves V60.3.12 movement recovery and slider behavior
- preserves no-new-top-level-tabs rule

## Required PNG assets

The PNG files currently live in the root assets folder:

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

Preferred normalized runtime paths remain:

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

The runtime tries both `assets/trustmap/v60-3-12/` and `assets/`, including likely filename variants.

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

## Stoplight trust color rule

```text
Green = Good / Strong / Allowed
Yellow = Needs Verification / Constrained / Moderate
Red = At Risk / Critical / Refused
```

The selected asset score and the Layer 1 hover/focus/selected ring must match the trust-state color, not the native hologram image color.

## Oval highlight rule

```text
The trust-state highlight belongs to the oval containment layer around the Layer 1 object, not to the rectangular PNG image canvas.
Hover, focus, and selected states should show a bold stoplight oval glow.
The image itself should keep its native hologram art color.
```

## Connector rule

```text
Default connectors should resemble the white-blue fiber optic line in the CyberShield Trust Kernel image.
Trust-state connector highlights may use digital fiber optic green, yellow, or red depending on the scenario or selected trust path.
Connectors should look illuminated and data-bearing, not like flat SVG line work.
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
confirm V60.3.12 and V60.3.13 still load
confirm V60.3.14 is active through the V60.3.13 chain
confirm all eight PNGs appear from assets/
confirm CyberShield Trust Kernel PNG appears at the center
confirm all Layer 1 PNGs appear
confirm the TrustMap background blends with the PNG backgrounds
confirm the visible square-highlight artifact is reduced or gone
confirm hover/focus/selected rings are oval, not square
confirm hover/focus/selected rings use stoplight green/yellow/red only
confirm Cloud and CMMC no longer badly overlap
confirm connectors look like white-blue fiber optic trust lines
confirm selected/path connectors can highlight in stoplight trust color
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
```

## Next likely decision point

After V60.3.14 browser QA, fix only minor visual sizing, spacing, or connector intensity.  If the PNG image backgrounds still show as obvious dark squares, the graphic assets themselves may need transparent export or background-matched re-export by the graphics workflow.
