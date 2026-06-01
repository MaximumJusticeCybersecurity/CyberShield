# CyberShield Executive OS

## Current live build

Current build label: **V60.3.6 TrustMap Layer 1 Asset Rendering Correction**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-6-trustmap-asset-rendering-correction&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.6
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.6.

## Current implemented build: V60.3.6

V60.3.6 corrects the TrustMap visual implementation.  The V60.3.5 floating overlay approach is removed from the loader and replaced with a narrow asset renderer that preserves the existing TrustMap radar, constellation layer, three-ring spatial system, Layer 1 positions, and interaction behavior.  The correction changes only the artwork inside the existing Layer 1 asset bubbles.

V60.3.6 changes:

- adds `src/ui/v60-3-6-trustmap-asset-artwork-renderer.js`
- removes the V60.3.5 overlay import from `src/ui/v52-7-operational-layer.js`
- loads V60.3.6 after V60.3.4
- preserves the existing radar / constellation TrustMap
- preserves the existing three-ring spatial model
- preserves existing Layer 1 asset positions and click behavior
- replaces flat inner icons inside existing Layer 1 asset bubbles with more dimensional holographic object artwork
- renders Cloud & Infrastructure as a dimensional cloud with infrastructure glow beneath it
- renders CMMC & Compliance as a Pentagon-inspired dimensional building form inside the existing bubble
- renders identity, data, AI, vendor, and endpoint assets as richer volumetric objects
- removes the mistaken floating TrustMap overlay layer from the operational path
- keeps public TrustMap language as `TrustMap` and `Decision Trust Universe`
- preserves V60.3.4 explicit actionability and modal disclosure architecture
- preserves no-new-top-level-tabs rule
- preserves Purpose Protocol

## Correct TrustMap rendering rule

```text
Do not create a new TrustMap overlay.
Do not replace the radar / constellation environment.
Do not move Layer 1 assets out of their current positions.
Only improve the visual representation inside each existing Layer 1 asset bubble.
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

The radar and constellation background is the environment.  The existing Layer 1 bubbles are the interface.  The active decision remains the gravity center.

## Public TrustMap language rule

Use product language in executive-facing screens:

```text
TrustMap
Decision Trust Universe
```

Do not expose builder language such as:

```text
registry-driven
renders from registry
versioned render source
V55.3 registry
radar constellation implementation
```

That language belongs in Settings/admin metadata and repo documentation only.

## Score rule

```text
Every visible score must be clickable and must explain or route to the model, evidence, assumptions, missing inputs, confidence, reliance risk, and decision rationale behind that score.
```

## Trust distribution rule

```text
Operational Trust Score = current decision posture score
Trust Level Distribution = count or percentage distribution across Layer 1 trust assets
```

Those should not show the same number unless they intentionally represent the same metric.

## Boundary

The current public build is a static advisory prototype.  It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, banking systems, payment systems, live evidence retrieval, live internet claim verification, live scoring, live claim extraction, statistical validation, backend persistence, workflow automation, ticketing, notifications, or production agent enforcement systems.

## GitHub Pages browser QA required

After deployment, run browser QA unless the live page has already been directly verified.

Priority checks:

```text
hard refresh live prototype
complete/reset onboarding
open TrustMap
confirm no V60.3.5 floating overlay layer appears
confirm original radar / constellation environment remains
confirm three-ring spatial model remains
confirm existing Layer 1 asset positions remain unchanged
confirm Cloud & Infrastructure bubble contains dimensional cloud artwork, not a flat cloud pictogram
confirm CMMC & Compliance bubble contains Pentagon-inspired dimensional building artwork
confirm the other Layer 1 bubbles contain improved dimensional artwork
confirm existing TrustMap click behavior still works
confirm public title reads TrustMap / Decision Trust Universe
confirm architectural speak does not appear in executive TrustMap UI
confirm Operational Trust Score remains distinct from Trust Level Distribution
confirm visible scores remain explainable/clickable
confirm no new top-level tab exists
confirm no live evidence retrieval, live scoring, statistical validation, backend persistence, ticketing, notification, workflow, enforcement, CMMC, healthcare, or Internet Trust overclaims appear
```

## Next likely decision point

After V60.3.6 browser QA, the next build should tune the artwork itself: cloud realism, Pentagon dimensionality, endpoint/device object quality, and whether the inner asset objects feel futuristic enough without corrupting the existing TrustMap system.
