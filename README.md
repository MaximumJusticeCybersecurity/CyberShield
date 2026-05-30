# CyberShield Executive OS

## Current live build

Current build label: **V60 Trust Evidence Workbench Scaffold**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v60-trust-evidence-workbench&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current prototype build:

```text
V60
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V60.

## Current implemented build: V60

V60 adds the Trust Evidence Workbench Scaffold. It moves beyond the V59 Internet Trust scaffold into a broader manual evidence workbench for evidence entry, evidence state visibility, ownership, review accountability, state transition rules, and Proof Pack traceability.

V60 changes:

- adds `data/evidence/v60-trust-evidence-workbench.json`
- adds `src/ui/v60-trust-evidence-workbench.js`
- loads V60 after V59.5 in `src/ui/v52-7-operational-layer.js`
- adds Trust Evidence Workbench into Evidence
- adds Trust Evidence Workbench into Runtime
- adds Trust Evidence Workbench into Proof Pack
- adds editable-looking manual evidence fields
- adds evidence state definitions
- adds sample evidence objects linked to claims, decisions, and Proof Pack sections
- adds state transition rules
- adds workbench trace modal
- adds evidence workbench text download
- preserves V59.5 Internet Trust QA and Copy Guardrail Pass
- preserves V59.4 Internet Trust Board Narrative Add-On
- preserves V59.3 Internet Trust Proof Pack Export Contract
- preserves V59.2 Claim Row to Model Trace and Proof Pack Output
- preserves V59.1 Artifact Intake and Claim Table Prototype
- preserves no-new-top-level-tabs rule
- preserves Purpose Protocol

## Forward roadmap

The active forward engineering roadmap is:

```text
docs/v60-v70-cybershield-engineering-roadmap.md
```

## V60 evidence states

```text
provided
missing
stale
assumed
conflicting
needs_verification
verified_by_human
```

## V60 manual evidence fields

```text
evidence_id
evidence_title
evidence_type
source_note
current_state
owner
reviewer
review_due
linked_claims
linked_decisions
linked_proof_sections
risk_if_wrong
next_action
limitations
```

## Current architecture files

Trust Evidence Workbench registry:

```text
data/evidence/v60-trust-evidence-workbench.json
```

Trust Evidence Workbench UI:

```text
src/ui/v60-trust-evidence-workbench.js
```

Internet Trust QA Copy Guardrails registry:

```text
data/internet-trust/v59-5-internet-trust-qa-copy-guardrails.json
```

Forward roadmap:

```text
docs/v60-v70-cybershield-engineering-roadmap.md
```

## Purpose Protocol doctrine

CyberShield turns purpose into protocol.

Purpose is not governance until it can cause a refusal.

## Boundary

The current public build is a static advisory prototype. It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, banking systems, payment systems, live monitoring, live internet retrieval, live URL ingestion, live evidence retrieval, live scoring, live claim extraction, live internet claim verification, report delivery, ticketing, workflow automation, notifications, backend persistence, or production agent enforcement systems.

## Known V60 limitations

- Trust Evidence Workbench is a static prototype scaffold
- Manual evidence fields are editable-looking local UI only
- V60 does not persist evidence to a backend
- V60 does not retrieve live evidence
- V60 does not perform live verification
- V60 does not create tickets or send notifications
- V60 does not perform workflow automation
- V60 download is a text file, not a branded PDF or board deck
- hands-on browser QA should be performed in Firefox, Brave, Android, and desktop after GitHub Pages deploys

## GitHub Pages browser QA required

After deployment, run browser QA unless the live page has already been directly verified.

Priority checks:

```text
hard refresh live prototype
complete/reset onboarding
open Evidence
confirm Trust Evidence Workbench appears
confirm manual evidence fields appear editable-looking
confirm evidence state definitions appear
confirm sample evidence objects appear
confirm workbench trace modal opens and closes
confirm evidence workbench text download works
open Runtime
confirm Trust Evidence Workbench appears
open Proof Pack
confirm Trust Evidence Workbench appears
open Settings
confirm V60 metadata is present in Settings/admin context
confirm Internet Trust QA Guardrails still appears
confirm Internet Trust Board Narrative still appears
confirm Internet Trust Proof Pack Export Contract still appears
confirm Claim Row to Model Trace still appears
confirm Artifact Intake and Claim Table still appears
confirm Internet Trust Engine scaffold still appears
confirm Queue to Proof Trace Linkage still appears
confirm Runtime Action Queue still appears
confirm Operational Trust Control Pane still appears
confirm Executive Proof Narrative still appears
confirm Model-Driven Proof Pack still appears
confirm Core Trust Scoring Models still appear
confirm Universal Score Contract still appears
confirm decision records still work
confirm black bevel is gone
confirm thick neon-blue shield perimeter remains
confirm V55 Purpose Protocol still works
confirm no new top-level tab exists
confirm no live evidence retrieval, backend persistence, ticketing, notification, workflow automation, live scoring, live verification, or live integration overclaims appear
```

## Next build

The next build is **V60.1 Evidence State Transition Prototype**. It should show how evidence moves from weak states to verified_by_human while preserving prototype boundaries and avoiding live workflow claims.
