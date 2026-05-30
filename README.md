# CyberShield Executive OS

## Current live build

Current build label: **V55.4 TrustMap Registry Consumption**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v55-4-trustmap-registry-consumption&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V55.4
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing rule

Build and version labels belong in Settings/admin metadata and repo documentation. They should not appear as executive-facing dashboard content except where explicitly placed for prototype QA.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V55.4.

## Current implemented build: V55.4

V55.4 converts the TrustMap from registry-documented to registry-rendered. It renders the TrustMap from `data/trustmap/v55-3-trustmap-registry.json` while preserving the V55.3.1 visual doctrine: radar-constellation interface, no process flow, no black bevel, thick neon-blue CyberShield Core shield perimeter, and connectors visually terminating at the core boundary.

V55.4 changes:

- adds `src/ui/v55-4-trustmap-registry-consumption.js`
- loads V55.4 after V55.3.1 in `src/ui/v52-7-operational-layer.js`
- renders Layer 1 domains from `data/trustmap/v55-3-trustmap-registry.json`
- renders Layer 2 assets from registry data
- renders Layer 3 tags from registry data
- renders scenario lenses from registry data
- preserves CyberShield Core as the thick neon-blue shield-boundary trust kernel
- preserves V55 Purpose Protocol
- preserves no-new-top-level-tabs rule
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

Fit Map is for orientation, not reading. Domain View is for interpretation. Object View is for detail. Proof Pack is for documentation.

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

## V55.4 registry consumption

The TrustMap registry lives at:

```text
data/trustmap/v55-3-trustmap-registry.json
```

The active V55.4 renderer now consumes this registry for:

```text
Layer 1 domains
Layer 2 assets
Layer 3 tags
scenario lenses
scores
movement
risk drivers
visual metadata
```

The V55.3 visual style guide remains authoritative for the visual object language:

```text
docs/trustmap-visual-object-style-guide.md
```

Visual references remain stored at:

```text
assets/reference/trustmap-radar-constellation-reference.svg
assets/reference/operational-trust-workflow-reference.svg
assets/reference/dr-max-justice-leadership-reference.svg
```

## Purpose Protocol doctrine

CyberShield turns purpose into protocol.

Purpose is not governance until it can cause a refusal.

CyberShield should help organizations convert executive intent, mission, risk appetite, and operating principles into machine-readable governance protocols that AI agents and human decision workflows can use before action.

V55 priority scenario:

```text
Vendor payment destination change: if banking details changed within 30 days, payment approval is refused unless current banking verification and controller approval are present.
```

## Internet Trust Engine future track

The Internet Trust Engine should be treated as a future CyberShield trust domain and scenario family, not a standalone product pillar yet and not a V55.4 implementation.

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

Core future question:

```text
Do we have sufficient trust in this information for the decision, action, briefing, citation, or reliance purpose in front of us, and what is the risk if we are wrong?
```

## Boundary

The current public build is a static advisory prototype. It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, banking systems, payment systems, live evidence retrieval, live internet claim verification, or production agent enforcement systems.

## Known V55.4 limitations

- V55.4 renders TrustMap from the registry but still keeps CSS in an injected UI module
- V55.4 has not yet split styles into a dedicated stylesheet
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
confirm V55.4 metadata is present in Settings/admin context
confirm TrustMap renders from registry data
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

After V55.4 browser QA passes, the next build should reduce injected CSS and clean up visual object styling without changing the TrustMap doctrine. The likely next version is **V55.5 TrustMap CSS and Visual Object Cleanup**.
