# CyberShield Executive OS

## Current live build

Current build label: **V60.3.7 TrustMap Reference Layout Renderer**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-7-trustmap-reference-layout&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.7
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.7.

## Current implemented build: V60.3.7

V60.3.7 renders the TrustMap first layer in the approved reference layout: dark digital universe, radar rings, seven holographic Layer 1 trust assets around a central active decision, relationship lines, trust status legend, and a right-side detail panel that changes when the user hovers, focuses, or clicks each graphical asset.

V60.3.7 changes:

- adds `src/ui/v60-3-7-trustmap-reference-layout-renderer.js`
- replaces the V60.3.6 artwork renderer import in `src/ui/v52-7-operational-layer.js`
- renders the TrustMap first layer to match the approved reference composition
- includes seven Layer 1 graphical trust assets
- includes CMMC & Compliance as the governance/compliance trust asset
- includes a central active decision node
- includes status lines from the center to each trust asset
- includes a trust status legend
- includes a right-side detail panel
- updates the right-side panel on hover, focus, and click
- includes action buttons for Open Evidence, Inspect Trace, Preview Proof Pack, and View Controls
- preserves the no-new-top-level-tabs rule
- preserves Settings as the place for build/version/governance/prototype metadata

## Reference layout requirements

```text
Left/main canvas:
CyberShield TrustMap brand mark
Dark digital universe
Radar rings
Seven 3D holographic asset cubes
Central active decision
Status legend
Relationship lines from center to assets

Right side:
Decision state / last updated
Selected asset panel
Asset graphic
State pill
Why this matters
Key gaps
Next action
Related controls
Action buttons

Interaction:
Hover/focus/click any Layer 1 asset
Right panel changes immediately to that asset
Selected asset line intensifies
Selected asset graphic glows stronger
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

## Public TrustMap language rule

Use product language in executive-facing screens:

```text
CyberShield TrustMap
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

## Score rule

```text
Every visible score must be clickable and must explain or route to the model, evidence, assumptions, missing inputs, confidence, reliance risk, and decision rationale behind that score.
```

## Boundary

The current public build is a static advisory prototype.  It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, banking systems, payment systems, live evidence retrieval, live internet claim verification, live scoring, live claim extraction, statistical validation, backend persistence, workflow automation, ticketing, notifications, or production agent enforcement systems.

## GitHub Pages browser QA required

After deployment, run browser QA unless the live page has already been directly verified.

Priority checks:

```text
hard refresh live prototype
complete/reset onboarding
open TrustMap
confirm the first layer resembles the approved reference image
confirm dark digital universe remains
confirm radar rings remain
confirm seven holographic assets appear around the central decision
confirm CMMC & Compliance appears in the lower-right/lower-center trust asset set
confirm right-side detail panel is visible
hover over each asset and confirm the right panel changes
focus each asset with keyboard and confirm the right panel changes
click each asset and confirm selected line/asset intensifies
confirm Open Evidence routes to Evidence
confirm Inspect Trace routes to Architecture
confirm Preview Proof Pack routes to Proof Pack
confirm View Controls routes to Runtime
confirm no new top-level tab exists
confirm no live evidence retrieval, live scoring, statistical validation, backend persistence, ticketing, notification, workflow, enforcement, CMMC, healthcare, or Internet Trust overclaims appear
```

## Next likely decision point

After V60.3.7 browser QA, the next build should tune exact visual fidelity: cube realism, right-panel spacing, radar ring density, asset placement, responsive behavior, and the visual quality of each holographic object.
