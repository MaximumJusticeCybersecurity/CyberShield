# CyberShield Executive OS

## Current live build

Current build label: **V60.3.5 TrustMap Layer 1 Graphical Asset Redesign**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-5-trustmap-layer1-assets&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.5
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.5.

## Current implemented build: V60.3.5

V60.3.5 redesigns the TrustMap first layer around seven graphical trust assets inside the existing dark digital trust universe.  It preserves the radar / constellation environment, quiets the background, makes the Layer 1 assets louder and clearer, removes architectural speak from executive-facing TrustMap language, makes visible scores clickable, corrects Trust Level Distribution so it does not duplicate Operational Trust Score, and repairs the dead AI-generated-analysis drilldown.

V60.3.5 changes:

- adds `data/trustmap/v60-3-5-layer1-graphical-assets.json`
- adds `src/ui/v60-3-5-trustmap-layer1-assets.js`
- loads V60.3.5 after V60.3.4 in `src/ui/v52-7-operational-layer.js`
- changes public TrustMap language to `TrustMap` and `Decision Trust Universe`
- removes architectural phrases such as registry-driven, render source, and version-specific implementation language from executive TrustMap UI
- adds seven Layer 1 graphical trust assets
- preserves the baseline six operational assets
- includes CMMC & Compliance as a Layer 1 governance/compliance trust asset
- adds asset drilldown drawer for each Layer 1 trust asset
- makes score panels clickable so scores explain model, evidence, missing inputs, assumptions, confidence, reliance risk, and rationale
- changes Trust Level Distribution into counts by Layer 1 asset state instead of duplicating the Operational Trust Score number
- repairs the dead drilldown for AI-generated analysis action review
- preserves V60.3.4 explicit actionability and modal disclosure architecture
- preserves no-new-top-level-tabs rule
- preserves Purpose Protocol

## TrustMap public language rule

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

The radar and constellation background is the environment.  The Layer 1 graphical trust assets are the interface.  The active decision is the gravity center.

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

## Controlling doctrine

```text
No score without a model. No model without evidence. No evidence without traceability. No action without consequence.
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
confirm public title reads TrustMap / Decision Trust Universe
confirm architectural speak does not appear in executive TrustMap UI
confirm seven Layer 1 graphical trust assets appear
confirm CMMC & Compliance appears as a Layer 1 asset
confirm radar / constellation background remains but is quieter
confirm clicking each Layer 1 asset opens a drilldown drawer
confirm drawer buttons route to Evidence, Runtime, Proof Pack, or Architecture as appropriate
confirm Operational Trust Score remains distinct from Trust Level Distribution
confirm Trust Level Distribution shows asset counts or percentages, not another 63 score
confirm clicking visible scores opens a score explanation or model/evidence route
confirm AI-generated-analysis action review no longer dead-ends
confirm no new top-level tab exists
confirm no live evidence retrieval, live scoring, statistical validation, backend persistence, ticketing, notification, workflow, enforcement, CMMC, healthcare, or Internet Trust overclaims appear
```

## Next likely decision point

After V60.3.5 browser QA passes, the next build should be a visual polish pass based on what actually renders in the browser: spacing, asset positioning, line intensity, drawer usability, and whether the seven objects feel powerful without becoming noisy.
