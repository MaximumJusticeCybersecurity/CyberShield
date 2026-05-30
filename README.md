# CyberShield Executive OS

## Current live build

Current build label: **V55.6 TrustMap Interaction Reliability**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v55-6-trustmap-interaction-reliability&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V55.6
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V55.6.

## Current implemented build: V55.6

V55.6 improves TrustMap interaction reliability over the V55.5 stylesheet cleanup and V55.4 registry-rendered TrustMap. It makes TrustMap objects explain, route, or trigger next steps while preserving the radar-constellation visual doctrine, thick neon-blue CyberShield Core shield perimeter, registry-rendered TrustMap, and Purpose Protocol.

V55.6 changes:

- adds `src/ui/v55-6-trustmap-interaction-reliability.js`
- loads V55.6 after V55.5 in `src/ui/v52-7-operational-layer.js`
- adds richer object explanation behavior for selected TrustMap domains and assets
- adds route buttons from TrustMap object detail to Runtime, Evidence, and Proof Pack
- adds route feedback so users know why they were sent to another workspace
- adds accessibility labels and titles to TrustMap domains, assets, and CyberShield Core
- preserves registry-rendered TrustMap data from `data/trustmap/v55-3-trustmap-registry.json`
- preserves stylesheet ownership through `src/styles/trustmap-v55-5.css`
- preserves no black bevel around CyberShield Core
- preserves thick neon-blue CyberShield Core boundary
- preserves V55 Purpose Protocol
- keeps Internet Trust Engine as a documented future requirement track, not a live feature

## CyberShield Trust Model Doctrine

CyberShield evaluates whether the information behind a critical action or claim can be trusted before the business acts, cites, shares, briefs, teaches, or relies on it.

Evidence supports the Trust Model, but evidence volume is not the point. Information reliability, source confidence, owner accountability, verification path, consequence if wrong, and decision reliance are the point.

CyberShield is intentionally cross-industry. The constraint is coherence under Trust Before Action, not narrowness.

## TrustMap visual doctrine

The CyberShield TrustMap is a radar-constellation interface.

```text
Radar = orientation, active scanning, situational awareness
Constellation = connected assets, dependencies, trust relationships
Not process flow = no left-to-right workflow pretending to be a map
```

The CyberShield Core is a clean neon-blue shield boundary and trust kernel, not a normal node. No connector should visually pass through or clutter the shield interior.

Layer 1 domains are neon-blue graphical trust objects, not cards.

Connector rules:

```text
Core -> Layer 1: thickest, neon blue, straight point-to-point, terminating at the shield boundary
Layer 1 -> Layer 2: medium, straight point-to-point
Layer 2 -> Layer 3: thin, subtle, straight point-to-point
Cross-domain links: faint until selected or scenario-highlighted
```

Visual complexity rule:

```text
Complexity lives at the edge. Trust is established at the center.
```

## Minimum operating environment inputs

The TrustMap must preserve these baseline Layer 1 operating domains:

```text
Cloud & Infrastructure
Identities & Access
Applications & Data
AI Systems & Agents
Third Parties & Vendors
Devices & Endpoints
```

Scenario domains such as CMMC & Compliance may be added, but the six baseline domains should not disappear.

## V55.4-V55.6 TrustMap architecture

Registry source:

```text
data/trustmap/v55-3-trustmap-registry.json
```

Registry renderer:

```text
src/ui/v55-4-trustmap-registry-consumption.js
```

Stylesheet:

```text
src/styles/trustmap-v55-5.css
```

Interaction layer:

```text
src/ui/v55-6-trustmap-interaction-reliability.js
```

Visual style guide:

```text
docs/trustmap-visual-object-style-guide.md
```

## Purpose Protocol doctrine

CyberShield turns purpose into protocol.

Purpose is not governance until it can cause a refusal.

V55 priority scenario:

```text
Vendor payment destination change: if banking details changed within 30 days, payment approval is refused unless current banking verification and controller approval are present.
```

## Internet Trust Engine future track

The Internet Trust Engine should be treated as a future CyberShield trust domain and scenario family, not a standalone product pillar and not a V55.6 implementation.

Requirements live at:

```text
docs/internet-trust-engine-requirements.md
```

Preferred framing:

```text
CyberShield Internet Trust Engine
CyberShield Artifact Trust Engine
Claim Trust Intelligence
Evidence-Based Decision Trust
Reliance checking
```

Avoid:

```text
fact-checker
truth engine
misinformation detector
political validation
trusted or untrusted person labels
artifact-level trust score as the MVP anchor
```

## Boundary

The current public build is a static advisory prototype. It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, banking systems, payment systems, live evidence retrieval, live internet claim verification, or production agent enforcement systems.

## Known V55.6 limitations

- TrustMap object routes are static advisory routes, not backend workflow actions
- Runtime, Evidence, and Proof Pack routing does not create tickets, send notifications, or retrieve live evidence
- Layer 1 icons remain SVG/CSS approximations
- CMMC Pentagon icon remains stylized and not final artwork
- reports download as text files, not branded PDF reports yet
- CMMC guidance is advisory and does not represent legal advice, certification, or assessment outcome
- healthcare scenario guidance is advisory and does not represent compliance validation
- scoring and trend lines are demo-directional and not statistically validated
- Internet Trust Engine is captured as a future scenario track but not yet implemented
- hands-on browser QA should be performed in Firefox, Brave, Android, and desktop after GitHub Pages deploys

## GitHub Pages browser QA required

After deployment, run browser QA unless the live page has already been directly verified.

Priority checks:

```text
hard refresh live prototype
complete/reset onboarding
open TrustMap
confirm V55.6 metadata is present in Settings/admin context
confirm TrustMap renders from registry data
confirm object detail includes reliability note
confirm route buttons appear in detail panel
confirm Runtime, Evidence, and Proof Pack route buttons work
confirm Fit Map feels radar + constellation
confirm black bevel is gone
confirm thick neon-blue shield perimeter remains
confirm baseline Layer 1 domains stay visible
confirm Layer 3 stars are visible in Fit Map
confirm Layer 3 labels stay hidden until hover/focus/Object View
confirm shield click routes to Runtime/Core
confirm V55 Purpose Protocol still works
confirm no new top-level tab exists
confirm no live enforcement, banking, payment, CMMC, healthcare, Internet Trust, or Artifact Trust overclaims appear
```

## Next likely decision point

After V55.6 browser QA passes, the next build should move into **V56 Trust Model Registry and Score Explanation Layer** so every visible score routes to a model explanation with inputs, assumptions, limitations, and evidence requirements.
