# CyberShield Executive OS

## Current live build

Current build label: **V60.3.1 Runtime Evidence Panel Correction**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-1-runtime-evidence-panel-correction&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3.1
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.1.

## Current implemented build: V60.3.1

V60.3.1 corrects the Runtime/Evidence information architecture defect.  The full Manual Evidence Workbench now belongs only in the Evidence workspace.  Runtime now receives a compact Runtime Evidence Requirements panel focused on evidence blocking or constraining action.  Proof Pack receives proof-oriented evidence trace context.

V60.3.1 changes:

- updates `src/ui/v60-trust-evidence-workbench.js`
- keeps the full Manual Evidence Workbench in Evidence
- removes the full Manual Evidence Workbench behavior from Runtime
- replaces Runtime evidence content with a compact Runtime Evidence Requirements panel
- keeps Proof Pack focused on evidence defensibility trace
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

## Controlling doctrine

```text
No score without a model. No model without evidence. No evidence without traceability. No action without consequence.
```

## Model maturity statement

The CyberShield scoring models are currently expert-derived V1 trust models.  We have high confidence in the architecture because it separates trust, confidence, evidence quality, reliance risk, runtime admissibility, and defensibility.  We have medium confidence in the initial scoring factors and lower confidence in the default weights until they are calibrated against test scenarios, expert review, and real-world use cases.

Therefore, the models are implemented as versioned, registry-backed, inspectable, and calibratable models, not hardcoded scoring truth.

## Why this correction matters

CyberShield must be clean enough to show advisors, prospects, experts, and potential pilot users without making them sort through duplicated workbenches.

The Runtime workspace should answer:

```text
What action is under review?
What evidence is blocking or constraining the action?
Who owns the next human step?
What happens if we are wrong?
What runtime action follows?
```

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
open Evidence
confirm full Manual Evidence Workbench appears in Evidence
open Runtime
confirm full Manual Evidence Workbench does not appear in Runtime
confirm Runtime Evidence Requirements panel appears in Runtime
open Proof Pack
confirm Proof Pack shows evidence trace, not manual workbench clutter
confirm V60.3 Universal Model Trace Inspector still appears
confirm no new top-level tab exists
confirm no live evidence retrieval, live scoring, statistical validation, backend persistence, ticketing, notification, workflow, enforcement, CMMC, healthcare, or Internet Trust overclaims appear
```

## Next likely decision point

After V60.3.1 browser QA passes, the next build should focus on show-readiness cleanup: reduce duplicate sections across Evidence, Runtime, Proof Pack, Architecture, and Settings so CyberShield presents as a crisp executive prototype rather than accumulated build layers.
