# CyberShield Executive OS

## Current live build

Current build label: **V56.4 Core Trust Scoring Models MVP**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v56-4-core-trust-scoring-models&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V56.4
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V56.4.

## Current implemented build: V56.4

V56.4 adds the first Core Trust Scoring Models MVP. It creates seven inspectable, versioned Trust Scoring Models and exposes them through existing workspaces without creating a new tab.

V56.4 changes:

- adds `data/models/v56-4-core-trust-scoring-models.json`
- adds `src/ui/v56-4-core-trust-scoring-models.js`
- loads V56.4 after V56.3 in `src/ui/v52-7-operational-layer.js`
- adds the first seven Core Trust Scoring Models
- exposes model cards in Architecture, Evidence, and Proof Pack
- adds model inspection modal with factors, weights, evidence standards, failure conditions, and runtime mapping
- preserves V56.3 Universal Score Object and Score Band Contract
- preserves V56.2 Decision Record Hardening
- preserves V56.1 Evidence and Assumption Register
- preserves V56 Trust Model Registry and Score Explanation Layer
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

## Core Trust Scoring Models in V56.4

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

## Required score object fields

```text
score_name
model_id
model_version
score
confidence
decision_band
runtime_action
top_score_drivers
missing_evidence
assumptions
caveats
risk_if_wrong
recommended_next_step
owner
escalation_path
prototype_boundary
```

## CyberShield Trust Model Doctrine

CyberShield evaluates whether the information behind a critical action or claim can be trusted before the business acts, cites, shares, briefs, teaches, or relies on it.

Evidence supports the Trust Model, but evidence volume is not the point. Information reliability, source confidence, owner accountability, verification path, consequence if wrong, and decision reliance are the point.

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

Core Trust Scoring Models UI:

```text
src/ui/v56-4-core-trust-scoring-models.js
```

## Purpose Protocol doctrine

CyberShield turns purpose into protocol.

Purpose is not governance until it can cause a refusal.

## Internet Trust Engine future track

The Internet Trust Engine should be treated as a future CyberShield trust domain and scenario family, not a standalone product pillar and not a V56.4 live feature.

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

The current public build is a static advisory prototype. It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, banking systems, payment systems, live evidence retrieval, live scoring, live claim extraction, live internet claim verification, or production agent enforcement systems.

## Known V56.4 limitations

- Core Trust Scoring Models are prototype model definitions, not production-calibrated scoring engines
- Model factors and weights are advisory defaults and require pilot calibration
- V56.4 does not perform live scoring
- V56.4 does not perform live claim extraction
- V56.4 does not retrieve or validate live evidence
- Decision records use static prototype data
- Evidence states do not retrieve or validate live evidence
- Model explanations are demo-directional and not statistically validated
- CMMC guidance is advisory and does not represent legal advice, certification, or assessment outcome
- healthcare scenario guidance is advisory and does not represent compliance validation
- Internet Trust Engine is captured as a future scenario track but not yet implemented
- hands-on browser QA should be performed in Firefox, Brave, Android, and desktop after GitHub Pages deploys

## GitHub Pages browser QA required

After deployment, run browser QA unless the live page has already been directly verified.

Priority checks:

```text
hard refresh live prototype
complete/reset onboarding
open Architecture
confirm Core Trust Scoring Models appear
confirm model inspection modal opens and closes
confirm seven core models are listed
open Evidence
confirm Core Trust Scoring Models appear
open Proof Pack
confirm Core Trust Scoring Models appear
confirm V56.4 metadata is present in Settings/admin context
confirm Universal Score Contract still appears
confirm decision records still work
confirm evidence register still works
confirm score model buttons still work
confirm black bevel is gone
confirm thick neon-blue shield perimeter remains
confirm V55 Purpose Protocol still works
confirm no new top-level tab exists
confirm no live enforcement, banking, payment, CMMC, healthcare, live scoring, live claim extraction, Internet Trust, or Artifact Trust overclaims appear
```

## Next build

The next build should be **V57 Model-Driven Proof Pack**. It should make Proof Pack pull from the score contract, core Trust Scoring Models, decision records, evidence register, assumptions, caveats, owner, risk if wrong, and prototype boundary.
