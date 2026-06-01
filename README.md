# CyberShield Executive OS

## Current live build

Current build label: **V60.3.8 TrustMap Layer 1 Reference Asset Replacement**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-8-layer1-reference-assets&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.8
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.8.

## Current implemented build: V60.3.8

V60.3.8 corrects the V60.3.7 overreach.  It restores the original TrustMap shell, original center core, original left operational score panel, original right score/distribution area, radar rings, Layer 2 behavior, Layer 3 behavior, and TrustMap navigation controls.  It replaces only the Layer 1 asset graphics with reference-style holographic cube objects and places the selected-asset detail panel underneath the existing right-side score area.

V60.3.8 changes:

- adds `src/ui/v60-3-8-trustmap-layer1-reference-assets.js`
- replaces the V60.3.7 full-page reference renderer import in `src/ui/v52-7-operational-layer.js`
- preserves the original TrustMap layout and scoring panels
- preserves the center CyberShield Core with MJC shield/logo, organization name, and Trust Kernel language
- preserves the original left Operational Trust Score panel
- preserves the original upper-right score/distribution area
- preserves radar rings, constellation grid, Layer 2, Layer 3, pan, zoom, and mode controls
- replaces only Layer 1 asset graphics with reference-style holographic cube objects
- adds a selected-asset detail panel below the right-side score/distribution area
- updates the selected-asset panel on hover and focus over Layer 1 graphics
- keeps public TrustMap language product-facing
- preserves no-new-top-level-tabs rule
- preserves Settings as the place for build/version/governance/prototype metadata

## Non-negotiable TrustMap scope rule

```text
Do not replace the TrustMap page.
Do not replace the center CyberShield Core.
Do not remove the MJC shield/logo.
Do not remove the left Operational Trust Score panel.
Do not remove the upper-right score/distribution area.
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

## Selected asset panel rule

```text
The selected-asset panel belongs below the existing right-side score/distribution area.
It changes when the user hovers or focuses a Layer 1 graphical asset.
It must not replace the score/distribution area above it.
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
confirm original center CyberShield Core is back
confirm MJC shield/logo remains in the center core
confirm organization name and Trust Kernel language remain
confirm left Operational Trust Score panel is visible
confirm upper-right score/distribution area is visible
confirm selected-asset panel appears below the right-side score area
confirm radar rings and constellation background remain
confirm Layer 2 and Layer 3 are still present
confirm pan, zoom, Fit Map, Kernel View, Domain View, and Object View still work
confirm only Layer 1 graphics changed
confirm Layer 1 graphics resemble the approved reference style more closely
confirm hovering/focusing a Layer 1 asset updates the selected-asset panel
confirm no new top-level tab exists
confirm no live evidence retrieval, live scoring, statistical validation, backend persistence, ticketing, notification, workflow, enforcement, CMMC, healthcare, or Internet Trust overclaims appear
```

## Next likely decision point

After V60.3.8 browser QA, the next build should tune exact Layer 1 graphical fidelity: cube size, glow, icon realism, reference-image similarity, score panel preservation, and whether the right-side panel placement works at desktop size.
