# CyberShield Executive OS

## Current live build

Current build label: **V55 Purpose Protocol and Constraint Layer**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v55-purpose-protocol&reset=onboarding

## User-facing rule

Build and version labels belong in Settings/admin metadata and repo documentation.  They should not appear as executive-facing dashboard content.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V55.

## Current implemented build: V55

V55 adds the Purpose Protocol and Constraint Layer capability track without adding a new tab.  It keeps the V54.2 Enterprise Trust Universe active and adds protocol discipline to the existing Briefing, Runtime, Proof Pack, Architecture, and Settings/admin metadata.

V55 changes:

- adds `/data/protocols/purpose-protocol.v1.json`
- adds `/data/protocols/constraint-layer.v1.json`
- adds `/data/protocols/decision-layer.v1.json`
- adds `/data/protocols/identity-layer.v1.json`
- adds `/data/protocols/refusal-rules.v1.json`
- adds `/data/protocols/escalation-rules.v1.json`
- adds `src/ui/v55-purpose-protocol-constraint-layer.js`
- loads V55 after the V54.2 TrustMap controller
- adds Protocol Readiness to the existing user experience
- adds a hard-constraint demonstration for vendor payment destination change
- adds Refused by Constraint / Escalate decision language
- adds Protocol Basis to Proof Pack
- adds Purpose Protocol architecture language to Architecture
- adds Decision Record fields for constrained/refused/escalated actions
- keeps no-new-top-level-tabs constraint intact

## CyberShield Trust Model Doctrine

CyberShield evaluates whether the information behind a critical action can be trusted before the business acts.

Evidence supports the Trust Model, but evidence volume is not the point.  Information reliability, source confidence, owner accountability, verification path, and consequence if wrong are the point.

CyberShield is intentionally cross-industry.  The constraint is coherence under Trust Before Action, not narrowness.

## TrustMap doctrine

The CyberShield Core is the TrustMap kernel.  It is not merely another node.  TrustMap should visually show how trust flows, breaks, improves, and propagates around the organization.

V54.2 TrustMap model:

```text
Kernel: CyberShield Core / organization trust kernel
Layer 1: major trust domains
Layer 2: domain assets, systems, vendors, data classes, controls, workflows, and entities
Layer 3: small tagged risk, evidence, action, owner, or consequence dots
```

Fit Map should show the entire modeled trust universe.  Scenario views should emphasize the relevant trust path while leaving the broader universe visible.

## Purpose Protocol doctrine

CyberShield turns purpose into protocol.

Purpose is not governance until it can cause a refusal.

CyberShield should help organizations convert executive intent, mission, risk appetite, and operating principles into machine-readable governance protocols that AI agents and human decision workflows can use before action.

Protocol architecture:

```text
Constraint Layer: what agents or workflows must never do
Decision Layer: how trade-offs are resolved when no human is present
Identity Layer: what human judgment, ownership, and mission boundaries must remain visible
```

V55 priority scenario:

```text
Vendor payment destination change: if banking details changed within 30 days, payment approval is refused unless current banking verification and controller approval are present.
```

## Boundary

The current public build is a static advisory prototype.  It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, banking systems, payment systems, or production agent enforcement systems.

## Known V55 limitations

- V55 is a static advisory prototype and does not perform live payment blocking
- protocol registries are scaffolds and are not yet loaded through a formal registry engine
- Purpose Protocol is implemented for the payment destination change scenario only
- no banking integration, payment integration, CRM sync, ticketing, email delivery, or live enforcement exists
- V54.2 TrustMap visual object art remains prototype-grade compared with the uploaded target reference
- CSS remains injected rather than fully extracted to a stylesheet
- scenario, TrustMap universe, and protocol data should be moved into formal JSON registry loading
- reports download as text files, not branded PDF reports yet
- CMMC guidance is advisory and does not represent legal advice, certification, or assessment outcome
- healthcare scenario guidance is advisory and does not represent compliance validation
- scoring and trend lines are demo-directional and not statistically validated
- hands-on browser QA should be performed in Firefox, Brave, Android, and desktop after GitHub Pages deploys

## Next likely decision point

Run QA on V55.  Priority checks: V54.2 TrustMap still works; Protocol Readiness appears; Runtime shows Refused by Constraint for the payment-destination-change protocol; Proof Pack includes Protocol Basis; Architecture includes Purpose Protocol architecture; no new top-level tab exists; and no live enforcement, banking, payment, CMMC, or healthcare overclaims appear.
