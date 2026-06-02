# CyberShield Executive OS

## Current live build

Current build label: **V60.3.13 Stoplight Trust Color and PNG Path Recovery**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-13-stoplight-trust-color&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.13
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.13.

## Current implemented build: V60.3.13

V60.3.13 corrects the TrustMap color logic so trust-state visuals use stoplight colors only: green, yellow, and red.  The hologram PNG art keeps its native visual color, but the hover ring, selected ring, status dot, selected asset score ring, selected asset score accents, and trust-state indicators use stoplight color.

V60.3.13 also adds PNG path recovery for likely uploaded filenames, including underscore, title-case, ampersand, and human-readable filename variants.

## V60.3.13 changes

- adds `src/ui/v60-3-13-stoplight-trust-color-and-png-path-recovery.js`
- loads after `src/ui/v60-3-12-trustmap-png-asset-integration.js`
- enforces stoplight trust color: green, yellow, red
- green = Good / Strong / Allowed
- yellow = Needs Verification / Constrained / Moderate
- red = At Risk / Critical / Refused
- keeps native hologram PNG colors intact
- applies stoplight color to Layer 1 hover rings
- applies stoplight color to Layer 1 selected rings
- applies stoplight color to Layer 1 status dots
- applies stoplight color to the right Selected Asset Trust Score ring
- applies stoplight color to selected asset score accents
- retries likely PNG filename variants if the first image path fails
- preserves V60.3.12 movement recovery and slider behavior
- preserves no-new-top-level-tabs rule

## Required PNG assets

Preferred normalized runtime paths:

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

The runtime also tries likely fallback names such as:

```text
CyberShield Trust Kernel.png
cloud_infrastructure.png
AI_systems_and_Agents.png
CMMC_and_Compliance.png
Third Parties and Vendors.png
```

The GitHub text connector cannot directly upload binary PNG files.  The PNG files must be manually uploaded to `assets/trustmap/v60-3-12/` or extracted from the generated ZIP package.

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
The ring color must be stoplight green, yellow, or red based on that asset's trust state.
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
confirm V60.3.13 loads after V60.3.12
confirm all eight PNG asset files are present in assets/trustmap/v60-3-12/
confirm CyberShield Trust Kernel PNG appears at the center
confirm all Layer 1 PNGs appear
confirm no old flat SVG icons appear
confirm hover/focus/selected rings appear
confirm hover/focus/selected rings use stoplight green/yellow/red only
confirm status dots use stoplight green/yellow/red only
confirm right selected asset score ring uses stoplight green/yellow/red only
confirm the selected score color matches the Layer 1 hover/selected ring color
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
```

## Next likely decision point

After V60.3.13 browser QA, fix only broken asset paths or minor visual sizing.  If the PNG files are not present in the repo path, upload those binary assets before more code changes.
