# CyberShield Executive OS

## Current live build

Current build label: **V60.3.2 Show-Readiness Cleanup Pass**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-2-show-readiness-cleanup&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.2
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.2.

## Current implemented build: V60.3.2

V60.3.2 is a show-readiness cleanup pass.  It does not add a new capability layer.  It makes the prototype cleaner for advisor, expert, prospect, and pilot feedback by adding concise workspace framing, reducing duplicated scaffolding, demoting supporting detail, and preserving the corrected Runtime/Evidence/Proof Pack information architecture.

V60.3.2 changes:

- adds `src/ui/v60-3-2-show-readiness-cleanup.js`
- loads V60.3.2 after V60.3 in `src/ui/v52-7-operational-layer.js`
- adds show-ready workspace framing to Briefing, TrustMap, Runtime, Evidence, Proof Pack, Architecture, and Settings
- preserves Evidence as the full Manual Evidence Workbench workspace
- preserves Runtime as the compact Runtime Evidence Requirements workspace
- preserves Proof Pack as the proof-oriented evidence trace workspace
- demotes repeated supporting detail where it risks visual clutter
- adds workspace focus notes for Runtime, Evidence, and Proof Pack
- preserves V60.3 Universal Model Trace Inspector
- preserves V60.2 Evidence-to-Score Impact Preview
- preserves no-new-top-level-tabs rule
- preserves Purpose Protocol
- preserves prototype boundary language

## Correct information architecture

```text
Evidence tab = full Manual Evidence Workbench
Runtime tab = compact Runtime Evidence Requirements panel
Proof Pack tab = proof-oriented evidence trace
```

Runtime should feel like command authority, not a junk drawer.  It should show what is blocking, constraining, escalating, or allowing the action now.

## Show-readiness principle

CyberShield should be clean enough to show advisors, prospects, experts, and potential pilot users without making them sort through accumulated build scaffolding.

Each workspace should have one primary job:

```text
Briefing = executive decision posture
TrustMap = trust universe and relationships
Runtime = command authority and allowed action
Evidence = manual evidence handling and traceability
Proof Pack = defensibility and export context
Architecture = doctrine and system structure
Settings = build status and prototype metadata
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
open each workspace
confirm show-ready workspace framing appears
open Evidence
confirm full Manual Evidence Workbench appears in Evidence
open Runtime
confirm full Manual Evidence Workbench does not appear in Runtime
confirm Runtime Evidence Requirements panel appears in Runtime
open Proof Pack
confirm Proof Pack shows evidence trace, not manual workbench clutter
confirm duplicated supporting sections are demoted rather than dominating the page
confirm V60.3 Universal Model Trace Inspector still works
confirm no new top-level tab exists
confirm no live evidence retrieval, live scoring, statistical validation, backend persistence, ticketing, notification, workflow, enforcement, CMMC, healthcare, or Internet Trust overclaims appear
```

## Next likely decision point

After V60.3.2 browser QA passes, the next build should be a final advisor-demo review pass: polish copy, reduce remaining clutter, and identify the three to five advisor feedback questions Dr. Justice should ask when showing CyberShield Executive OS to others.
