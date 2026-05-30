# CyberShield Executive OS

## Current live build

Current build label: **V60.3 Universal Model Trace Inspector**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-3-universal-model-trace-inspector&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60.3
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.3.

## Current implemented build: V60.3

V60.3 adds the Universal Model Trace Inspector and a calibratable Trust Model Registry.  It implements the model-builder guidance that CyberShield’s scores are **Expert-Derived V1 Trust Scoring Models**, not statistically validated scoring truth.

V60.3 changes:

- adds `data/models/v60-3-calibratable-trust-model-registry.json`
- adds `src/ui/v60-3-universal-model-trace-inspector.js`
- loads V60.3 after V60.2 in `src/ui/v52-7-operational-layer.js`
- labels models as Expert-Derived V1 Trust Scoring Models
- explicitly avoids claiming statistically validated trust models
- adds Universal Model Trace Inspector UI
- adds sample score trace objects
- adds calibratable metadata: model version, factor weights, thresholds, override notes, calibration history, test scenario results, limitations, and human review notes
- adds core calibratable model definitions for Evidence Trust, Confidence, Reliance Risk, Runtime Admissibility, Proof Pack Defensibility, and Human Verification Maturity
- adds placeholder roadmap models for Internet Trust, Vendor Trust, AI Agent Trust, Purpose Alignment, Identity Trust, Data Trust, Control Trust, Policy Trust, Trust Debt, Agentic Action Risk, Prompt Injection Exposure, Tool Use Risk, and Organizational Trust Maturity
- preserves V60.2 Evidence-to-Score Impact Preview
- preserves V60.1 Evidence State Transition Prototype
- preserves no-new-top-level-tabs rule
- preserves Purpose Protocol

## Controlling doctrine

```text
No score without a model. No model without evidence. No evidence without traceability. No action without consequence.
```

## Model maturity statement

The CyberShield scoring models are currently expert-derived V1 trust models.  We have high confidence in the architecture because it separates trust, confidence, evidence quality, reliance risk, runtime admissibility, and defensibility.  We have medium confidence in the initial scoring factors and lower confidence in the default weights until they are calibrated against test scenarios, expert review, and real-world use cases.

Therefore, the models are implemented as versioned, registry-backed, inspectable, and calibratable models, not hardcoded scoring truth.

## Why V60.3 matters

CyberShield’s first advantage is model transparency.  Its second advantage will come from calibration over time.

The separation remains the moat:

```text
Trust: Can this be relied on?
Confidence: How sure are we?
Evidence Trust: How strong is the proof?
Reliance Risk: How dangerous is it if wrong?
Runtime Admissibility: What action is allowed?
Proof Pack Defensibility: Can we defend this later?
```

## Calibration requirements for 90%+ confidence

```text
20 to 50 test scenarios across internet trust, vendor trust, AI agent action, policy/control trust, and executive decisions
Known-good and known-bad examples
Edge cases where trust and confidence diverge
Expert review from cybersecurity, legal, audit, and AI governance perspectives
Red-team attempts to manipulate the scores
Score calibration after observing false positives and false negatives
Clear documentation of model limits
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
open Runtime
open Proof Pack
open Architecture
open Settings
confirm V60.3 metadata is present in Settings/admin context
confirm Universal Model Trace Inspector appears
confirm Inspect model opens model details
confirm Why this score opens score trace details
confirm factor weights are visible but labeled as calibratable V1 defaults
confirm model maturity statement is visible
confirm no new top-level tab exists
confirm no live evidence retrieval, live scoring, statistical validation, backend persistence, ticketing, notification, workflow, enforcement, CMMC, healthcare, or Internet Trust overclaims appear
```

## Next likely decision point

After V60.3 browser QA passes, the next build should correct the Runtime/Evidence information architecture: keep the full Manual Evidence Workbench in Evidence, keep Proof Pack evidence trace in Proof Pack, and replace the full Runtime workbench with a compact Runtime Evidence Requirements panel.
