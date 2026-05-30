# CyberShield Executive OS

## Current live build

Current build label: **V57 Model-Driven Proof Pack**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v57-model-driven-proof-pack&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V57
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V57.

## Current implemented build: V57

V57 adds the Model-Driven Proof Pack. It turns the scoring architecture into an executive-facing proof artifact by tying together the Universal Score Contract, Core Trust Scoring Models, Decision Records, Evidence and Assumption Register, assumptions, caveats, owner, risk if wrong, recommended next step, and prototype boundary.

V57 changes:

- adds `data/proof/v57-model-driven-proof-pack-schema.json`
- adds `src/ui/v57-model-driven-proof-pack.js`
- loads V57 after V56.4 in `src/ui/v52-7-operational-layer.js`
- adds a model-driven Proof Pack surface into Proof Pack
- adds a proof artifact surface into Runtime
- adds proof trace modal
- adds text download for the Proof Pack
- pulls from loaded decision records, evidence register, score contract, and Core Trust Scoring Models where available
- preserves V56.4 Core Trust Scoring Models
- preserves V56.3 Universal Score Object and Score Band Contract
- preserves V56.2 Decision Record Hardening
- preserves V56.1 Evidence and Assumption Register
- preserves no-new-top-level-tabs rule
- preserves Purpose Protocol
- keeps Internet Trust Engine as a documented future requirement track, not a live feature

## Controlling scoring doctrine

The controlling doctrine for CyberShield scoring is:

```text
No score without a model. No model without evidence. No evidence without traceability. No action without consequence.
```

Preferred product term:

```text
Trust Scoring Models
```

Preferred architectural term:

```text
Trust Model Registry
```

CyberShield must not show decorative scores. Every score must come from a named, versioned model with defined factors, weights, evidence inputs, confidence logic, missing evidence, assumptions, risk if wrong, and runtime consequence.

## Proof Pack required sections

```text
Executive Summary
Action or Reliance Purpose
Score and Model Trace
Evidence State
Missing Evidence
Assumptions and Caveats
Risk if Wrong
Runtime Action
Owner and Escalation Path
Recommended Next Step
Prototype Boundary
```

## Core Trust Scoring Models in V56.4/V57

```text
Artifact Trust Model
Claim Trust Model
Sentence-Level Trust Model
Evidence Trust Model
Confidence Model
Reliance Risk Model
Runtime Admissibility Model
```

## Universal score bands

```text
90-100: High trust -> Allow
75-89: Trustworthy with caveats -> Allow with caveat
60-74: Moderate trust -> Constrain or verify
40-59: Low trust -> Escalate
20-39: Very low trust -> Block
0-19: Untrusted -> Refuse or quarantine
```

## Current architecture files

TrustMap registry:

```text
data/trustmap/v55-3-trustmap-registry.json
```

TrustMap renderer:

```text
src/ui/v55-4-trustmap-registry-consumption.js
```

TrustMap stylesheet:

```text
src/styles/trustmap-v55-5.css
```

TrustMap interaction layer:

```text
src/ui/v55-6-trustmap-interaction-reliability.js
```

Trust model registry:

```text
data/models/v56-trust-score-models.json
```

Score explanation layer:

```text
src/ui/v56-trust-model-score-explanations.js
```

Evidence and assumption register:

```text
data/evidence/v56-1-evidence-assumption-register.json
```

Decision record schema:

```text
data/decisions/v56-2-decision-record-schema.json
```

Universal score contract:

```text
data/models/v56-3-universal-score-contract.json
```

Core Trust Scoring Models:

```text
data/models/v56-4-core-trust-scoring-models.json
```

Model-Driven Proof Pack schema:

```text
data/proof/v57-model-driven-proof-pack-schema.json
```

Model-Driven Proof Pack UI:

```text
src/ui/v57-model-driven-proof-pack.js
```

## Purpose Protocol doctrine

CyberShield turns purpose into protocol.

Purpose is not governance until it can cause a refusal.

## Internet Trust Engine future track

The Internet Trust Engine should be treated as a future CyberShield trust domain and scenario family, not a standalone product pillar and not a V57 live feature.

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

The current public build is a static advisory prototype. It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, banking systems, payment systems, live evidence retrieval, live scoring, live claim extraction, live internet claim verification, report delivery, ticketing, or production agent enforcement systems.

## Known V57 limitations

- Proof Pack uses static prototype and loaded in-browser registry data
- Proof Pack download is a text file, not a branded PDF
- Proof Pack does not retrieve live evidence
- Proof Pack does not certify compliance or validate legal conclusions
- Proof Pack does not send reports, create tickets, or trigger workflows
- Core Trust Scoring Models are prototype model definitions, not production-calibrated scoring engines
- Model factors and weights are advisory defaults and require pilot calibration
- V57 does not perform live scoring
- V57 does not perform live claim extraction
- Internet Trust Engine is captured as a future scenario track but not yet implemented
- hands-on browser QA should be performed in Firefox, Brave, Android, and desktop after GitHub Pages deploys

## GitHub Pages browser QA required

After deployment, run browser QA unless the live page has already been directly verified.

Priority checks:

```text
hard refresh live prototype
complete/reset onboarding
open Proof Pack
confirm Model-Driven Proof Pack appears
confirm proof trace modal opens and closes
confirm proof pack text download works
open Runtime
confirm proof artifact surface appears
open Architecture
confirm Core Trust Scoring Models still appear
confirm V57 metadata is present in Settings/admin context
confirm Universal Score Contract still appears
confirm decision records still work
confirm evidence register still works
confirm score model buttons still work
confirm black bevel is gone
confirm thick neon-blue shield perimeter remains
confirm V55 Purpose Protocol still works
confirm no new top-level tab exists
confirm no live enforcement, banking, payment, CMMC, healthcare, live scoring, live claim extraction, Internet Trust, Artifact Trust, report delivery, or workflow overclaims appear
```

## Next build

The next build should be **V57.1 Board and Executive Narrative Layer**. It should convert Proof Pack outputs into board-ready language with a short executive summary, decision required, why it matters, risk if wrong, recommended next move, and explicit limitations.
