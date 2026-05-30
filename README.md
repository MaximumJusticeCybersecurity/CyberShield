# CyberShield Executive OS

## Current live build

Current build label: **V56.1 Evidence and Assumption Register**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v56-1-evidence-assumption-register&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V56.1
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V56.1.

## Current implemented build: V56.1

V56.1 adds the Evidence and Assumption Register. It separates provided, missing, stale, assumed, conflicting, and needs-verification evidence states so CyberShield can show what a recommendation relies on and what must be verified before decision reliance.

V56.1 changes:

- adds `data/evidence/v56-1-evidence-assumption-register.json`
- adds `src/ui/v56-1-evidence-assumption-register.js`
- loads V56.1 after V56 in `src/ui/v52-7-operational-layer.js`
- adds evidence state taxonomy
- adds static evidence and assumption register items
- injects the register into the Evidence workspace
- adds related evidence state context inside TrustMap object detail
- adds full register modal
- preserves V56 model explanations
- preserves V55.6 TrustMap interaction reliability
- preserves no-new-top-level-tabs rule
- preserves Purpose Protocol
- keeps Internet Trust Engine as a documented future requirement track, not a live feature

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

## Evidence state taxonomy

```text
Provided
Missing
Stale
Assumed
Conflicting
Needs Verification
```

These states are used to show whether CyberShield can rely on a claim, control, asset, action, or scenario.

## Purpose Protocol doctrine

CyberShield turns purpose into protocol.

Purpose is not governance until it can cause a refusal.

V55 priority scenario:

```text
Vendor payment destination change: if banking details changed within 30 days, payment approval is refused unless current banking verification and controller approval are present.
```

## Internet Trust Engine future track

The Internet Trust Engine should be treated as a future CyberShield trust domain and scenario family, not a standalone product pillar and not a V56.1 implementation.

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

## Known V56.1 limitations

- Evidence register uses static prototype data
- Evidence states do not retrieve or validate live evidence
- Missing evidence flags are advisory and not automated findings
- Model explanations are demo-directional and not statistically validated
- TrustMap object routes are static advisory routes, not backend workflow actions
- Runtime, Evidence, and Proof Pack routing does not create tickets, send notifications, or retrieve live evidence
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
open TrustMap
confirm V56.1 metadata is present in Settings/admin context
confirm TrustMap renders from registry data
confirm score model buttons still work
confirm Evidence workspace shows Evidence and Assumption Register
confirm full evidence register modal opens and closes
confirm TrustMap object detail shows related evidence state when available
confirm V55.6 TrustMap interaction routes still work
confirm black bevel is gone
confirm thick neon-blue shield perimeter remains
confirm V55 Purpose Protocol still works
confirm no new top-level tab exists
confirm no live enforcement, banking, payment, CMMC, healthcare, Internet Trust, or Artifact Trust overclaims appear
```

## Next likely decision point

After V56.1 browser QA passes, the next build should move into **V56.2 Decision Record Hardening** so CyberShield can preserve the action under review, information relied on, consequence if wrong, trust status, recommendation, owner, evidence state, and boundary language in one defensible record.
