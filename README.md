# CyberShield Executive OS

## Current live build

Current build label: **V56.2 Decision Record Hardening**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v56-2-decision-record-hardening&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V56.2
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V56.2.

## Current implemented build: V56.2

V56.2 hardens CyberShield decision records so each consequential recommendation can show the action under review, model used, model version, score, confidence, evidence state, missing evidence, assumptions, caveats, risk if wrong, runtime action, owner, escalation path, next step, and prototype boundary.

V56.2 changes:

- adds `data/decisions/v56-2-decision-record-schema.json`
- adds `src/ui/v56-2-decision-record-hardening.js`
- loads V56.2 after V56.1 in `src/ui/v52-7-operational-layer.js`
- adds decision records into Runtime, Evidence, and Proof Pack workspaces
- adds a decision record modal
- adds text download for demo decision records
- preserves V56 model explanations
- preserves V56.1 Evidence and Assumption Register
- preserves V55.6 TrustMap interaction reliability
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

Evidence register UI:

```text
src/ui/v56-1-evidence-assumption-register.js
```

Decision record schema:

```text
data/decisions/v56-2-decision-record-schema.json
```

Decision record UI:

```text
src/ui/v56-2-decision-record-hardening.js
```

## Decision record required fields

```text
record_id
created_at
action_under_review
object_under_review
model_used
model_version
score
confidence
decision_band
runtime_action
evidence_state
evidence_inputs
missing_evidence
assumptions
caveats
risk_if_wrong
owner
escalation_path
recommended_next_step
prototype_boundary
```

## Runtime action ladder

```text
Allow
Allow with caveat
Constrain
Escalate
Block
Refuse
Quarantine
```

## Evidence state taxonomy

```text
Provided
Missing
Stale
Assumed
Conflicting
Needs Verification
```

## Purpose Protocol doctrine

CyberShield turns purpose into protocol.

Purpose is not governance until it can cause a refusal.

V55 priority scenario:

```text
Vendor payment destination change: if banking details changed within 30 days, payment approval is refused unless current banking verification and controller approval are present.
```

## Internet Trust Engine future track

The Internet Trust Engine should be treated as a future CyberShield trust domain and scenario family, not a standalone product pillar and not a V56.2 implementation.

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

## Known V56.2 limitations

- Decision records use static prototype data
- Decision record downloads are text files, not branded PDFs
- Decision records do not create tickets, send approvals, retrieve evidence, or trigger live workflow
- Evidence states do not retrieve or validate live evidence
- Model explanations are demo-directional and not statistically validated
- TrustMap object routes are static advisory routes, not backend workflow actions
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
open Runtime
confirm Decision Records appear
open Evidence
confirm Decision Records and Evidence Register appear
open Proof Pack
confirm Decision Records appear
confirm decision record modal opens and closes
confirm decision record text download works
confirm V56.2 metadata is present in Settings/admin context
confirm score model buttons still work
confirm TrustMap object detail still shows related evidence state when available
confirm black bevel is gone
confirm thick neon-blue shield perimeter remains
confirm V55 Purpose Protocol still works
confirm no new top-level tab exists
confirm no live enforcement, banking, payment, CMMC, healthcare, Internet Trust, or Artifact Trust overclaims appear
```

## Next build

The next build should be **V56.3 Universal Score Object and Score Band Contract**. It should formalize the required score object, universal score bands, runtime action ladder, and trace requirements from the scoring doctrine so every future Trust Scoring Model follows the same contract.
