# CyberShield Executive OS

## Current live build

Current build label: **V55.1 TrustMap Radar-Constellation Visual Grammar**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v55-1-radar-constellation&reset=onboarding

## User-facing rule

Build and version labels belong in Settings/admin metadata and repo documentation.  They should not appear as executive-facing dashboard content.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V55.1.

## Current implemented build: V55.1

V55.1 is a TrustMap visual grammar correction.  It preserves V55 Purpose Protocol and V54.2 Enterprise Trust Universe while replacing the active TrustMap surface with a radar-constellation interface.

V55.1 changes:

- adds `src/ui/v55-1-trustmap-radar-constellation.js`
- loads V55.1 after V55
- keeps V55 Purpose Protocol active
- keeps no-new-top-level-tabs constraint intact
- makes the TrustMap read as radar + constellation rather than process flow
- creates a cleaner beveled CyberShield Core shield treatment
- routes shield click into Runtime/Core
- keeps the shield interior clean with MJC logo, CyberShield Core, organization name, and Trust Kernel text
- uses neon-blue Layer 1 graphical domain objects
- aligns Layer 1 baseline to the operating environment inputs: Cloud & Infrastructure, Identities & Access, Applications & Data, AI Systems & Agents, Third Parties & Vendors, Devices & Endpoints
- adds CMMC & Compliance as a Pentagon-inspired scenario domain
- replaces default curved connector paths with straight point-to-point constellation connectors
- makes connector thickness decrease by depth: core-to-domain thickest, domain-to-asset medium, asset-to-tag thin
- reduces Fit Map text density by hiding most Layer 2 and Layer 3 labels until domain/object focus

## CyberShield Trust Model Doctrine

CyberShield evaluates whether the information behind a critical action can be trusted before the business acts.

Evidence supports the Trust Model, but evidence volume is not the point.  Information reliability, source confidence, owner accountability, verification path, and consequence if wrong are the point.

CyberShield is intentionally cross-industry.  The constraint is coherence under Trust Before Action, not narrowness.

## TrustMap visual doctrine

The CyberShield TrustMap is a radar-constellation interface.

```text
Radar = orientation, active scanning, situational awareness
Constellation = connected assets, dependencies, trust relationships
Not process flow = no left-to-right workflow pretending to be a map
```

Fit Map is for orientation, not reading.  Domain View is for interpretation.  Object View is for detail.  Proof Pack is for documentation.

The CyberShield Core is a beveled shield boundary and trust kernel, not a normal node.  No connector should visually pass through or clutter the shield interior.

Layer 1 domains are neon-blue graphical trust objects, not cards.

Connector rules:

```text
Core -> Layer 1: thickest, neon blue, straight point-to-point
Layer 1 -> Layer 2: medium, straight point-to-point
Layer 2 -> Layer 3: thin, subtle, straight point-to-point
Cross-domain links: faint until selected or scenario-highlighted
```

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

## Artifact Trust future track

Artifact Trust should be treated as a future CyberShield trust domain and scenario family, not a standalone product pillar yet.

Preferred framing:

```text
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

Core future question:

```text
Do we have sufficient evidence to act on this information, and what is the risk if we are wrong?
```

Decision chain:

```text
Claim → Evidence → Confidence → Decision Impact → Action Guidance
```

Recommended MVP scope:

- ingest artifact text or transcript
- extract claims
- categorize claims
- assign confidence bands
- identify missing evidence
- generate a claim table
- generate an executive summary
- generate a decision-risk summary

Stronger commercial lead examples:

- vendor says it is SOC 2 compliant
- AI vendor says it does not train on customer data
- acquisition target says its security program meets NIST
- supplier says it maintains cyber insurance
- wire request says it was approved by the CFO

The USAFacts / Steve Ballmer case remains useful as a pilot, but it should not be the lead commercial wedge because it can be mistaken for civic/media analysis.

## Boundary

The current public build is a static advisory prototype.  It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, banking systems, payment systems, or production agent enforcement systems.

## Known V55.1 limitations

- V55.1 is a static visual controller overlay, not a full app rewrite
- V55.1 does not perform live payment blocking
- protocol registries are scaffolds and are not yet loaded through a formal registry engine
- Purpose Protocol is implemented for the payment destination change scenario only
- Artifact Trust is captured as a future scenario track but not yet implemented
- no banking integration, payment integration, CRM sync, ticketing, email delivery, or live enforcement exists
- Layer 1 icons are SVG/CSS approximations and should be refined into an official TrustMap visual object style guide
- CSS remains injected rather than fully extracted to a stylesheet
- scenario, TrustMap universe, and protocol data should be moved into formal JSON registry loading
- reports download as text files, not branded PDF reports yet
- CMMC guidance is advisory and does not represent legal advice, certification, or assessment outcome
- healthcare scenario guidance is advisory and does not represent compliance validation
- scoring and trend lines are demo-directional and not statistically validated
- hands-on browser QA should be performed in Firefox, Brave, Android, and desktop after GitHub Pages deploys

## Next likely decision point

Run QA on V55.1.  Priority checks: V55 Purpose Protocol still works; TrustMap shows radar-constellation visual grammar; shield core is clean; Layer 1 objects are neon-blue visual domains; connectors are straight and weighted by depth; Fit Map is less text-heavy; shield click routes to Runtime/Core; no new top-level tab exists; and no live enforcement, banking, payment, CMMC, healthcare, or Artifact Trust overclaims appear.
