# CyberShield Executive OS

## Current live build

Current build label: **V60.3.3 First-Layer Decision Brief and TrustMap Snapshot**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-3-first-layer-decision-brief&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.3
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.3.

## Current implemented build: V60.3.3

V60.3.3 adds the first-layer executive decision pattern: **Decision Brief on the left, TrustMap Snapshot on the right, proof details underneath**.  It makes the Briefing workspace immediately understandable while keeping the TrustMap visible as proof support, not as visual theater.

V60.3.3 changes:

- adds `data/briefing/v60-3-3-first-layer-decision-brief.json`
- adds `src/ui/v60-3-3-first-layer-decision-brief-trustmap-snapshot.js`
- loads V60.3.3 after V60.3.2 in `src/ui/v52-7-operational-layer.js`
- adds Decision Brief first-layer panel
- adds compact TrustMap Snapshot beside the Decision Brief on desktop
- adds proof detail blocks beneath the first layer
- routes from the Decision Brief to Runtime, Evidence, Proof Pack, and full TrustMap
- preserves full TrustMap workspace
- preserves corrected Evidence / Runtime / Proof Pack information architecture
- preserves V60.3 Universal Model Trace Inspector
- preserves no-new-top-level-tabs rule
- preserves Purpose Protocol
- preserves prototype boundary language

## First-layer UI doctrine

```text
Decision first. Map beside it. Proof underneath.
```

The TrustMap should not ask the user to discover the decision.  The TrustMap should help the user understand and challenge the decision.

## Target 9-second read

Within 9 seconds, a first-time executive should understand:

```text
What CyberShield thinks is happening
What action is allowed, constrained, escalated, or refused
Why it matters
What evidence is missing
Where to inspect the proof
```

## Correct information architecture

```text
Briefing = Decision Brief + TrustMap Snapshot + proof summary
TrustMap = full interactive trust universe
Runtime = command authority and allowed action
Evidence = full Manual Evidence Workbench
Proof Pack = defensibility and export context
Architecture = doctrine and system structure
Settings = build status and prototype metadata
```

## Responsive layout rule

```text
Desktop = Decision Brief left, TrustMap Snapshot right, details below
Tablet = Decision Brief first, TrustMap Snapshot second, details below
Mobile = Decision Brief first, collapsed TrustMap Snapshot underneath, details below
```

## Controlling doctrine

```text
No score without a model. No model without evidence. No evidence without traceability. No action without consequence.
```

## Model maturity statement

The CyberShield scoring models are currently expert-derived V1 trust models.  We have high confidence in the architecture because it separates trust, confidence, evidence quality, reliance risk, runtime admissibility, and defensibility.  We have medium confidence in the initial scoring factors and lower confidence in the default weights until they are calibrated against test scenarios, expert review, and real-world use cases.

Therefore, the models are implemented as versioned, registry-backed, inspectable, and calibratable models, not hardcoded scoring truth.

## Forward roadmap

The active forward engineering roadmap is:

```text
docs/v60-v70-cybershield-engineering-roadmap.md
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
confirm Decision Brief appears first
confirm TrustMap Snapshot appears beside Decision Brief on desktop
confirm proof detail blocks appear underneath
confirm Decision Brief routes to Runtime, Evidence, Proof Pack, and TrustMap
confirm TrustMap Snapshot is compact, not the full universe
open TrustMap
confirm full TrustMap still works
open Runtime
confirm full Manual Evidence Workbench does not appear in Runtime
open Evidence
confirm full Manual Evidence Workbench appears in Evidence
confirm V60.3 Universal Model Trace Inspector still works
confirm no new top-level tab exists
confirm no live evidence retrieval, live scoring, statistical validation, backend persistence, ticketing, notification, workflow, enforcement, CMMC, healthcare, or Internet Trust overclaims appear
```

## Next likely decision point

After V60.3.3 browser QA passes, the next build should be a **live demo polish pass**: tighten spacing, reduce remaining visual noise, tune copy, and prepare the advisor feedback script.