# CyberShield Executive OS

## Current live build

Current build label: **V43 Executive TrustMap Interaction and Depth Build**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v43-qa&reset=onboarding

See `bots.txt`, `governance-summary.json`, `docs/cybershield-brand-palette.md`, `docs/v43-executive-interaction-depth-build-record.md`, `docs/foundational-documents.md`, and `docs/successor-builder-handoff-and-job-docket.md` for machine-readable and builder-facing context.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

## V43 purpose

V43 corrects the static-dashboard problem.  A first-time executive should be able to click around CyberShield and understand the trust score, why it scored that way, what is weak, who owns it, what evidence supports it, what action is allowed/constrained/escalated/blocked, what happens next, and what should be bought or piloted.

## Current product capabilities

- CyberShield True Blue trust palette
- Organization shield as the TrustMap center object
- Icon-first first-layer TrustMap domains with score-dot indicators
- Drill-down into second-layer TrustMap objects through selected detail panels
- Connector lines that highlight on hover and show endpoint dots
- Clickable executive briefing metrics
- Estimated business exposure range tied to scenario consequence and trust score
- Clickable runtime score cards for Trust, Evidence, Policy, and Authority
- Decision ladder: Allow, Constrain, Escalate, Block
- Evidence library with multiple artifacts
- Role-tailored Proof Pack with audience and recipient personalization
- Architecture path: Advisory Prototype, Guided Pilot, Enterprise Trust Platform
- Admin CRM payload hidden in Settings, not shown as a user-facing top-level feature

## Current TrustMap object model

First-layer trust objects:

- Identities & Access
- Devices & Endpoints
- Cloud & Infrastructure
- Applications & Data
- AI Systems & Agents
- Third Parties & Vendors
- Policy & Compliance
- Evidence Substrate
- Decision Record

Second-layer objects appear only after drill-down, not on the default map.

## Visual doctrine

The center object is the customer's organization shield.  It protects the organization and should remain visually on top.

The product should feel trustworthy first and cyber-capable second.  It should not look like pale generic SaaS or a black military command center.

See `docs/cybershield-brand-palette.md` for the authoritative color and visual rules.

## Strategic direction

- CyberShield remains MJC-owned advisory software, not standalone SaaS yet
- Enterprise practice-builder path remains a strategic pathway, but no named individual should appear in the user-facing UI
- Regulated SMBs and federal-adjacent SMBs remain the commercial fallback market
- Current budget assumption remains zero or near-zero hosting/backend spend
- Low-cost and inspectable third-party tools are acceptable when useful

## Boundary

The current public build is a static prototype.  It is not connected to live SIEM, EDR, identity, GRC, cloud, Google Sheets, Microsoft 365, CRM, or production agent enforcement systems.

The current build produces local/exportable records and models CRM row payloads, manual/mock evidence, proof packs, and architecture decision paths.  It does not perform live external sync.

## Next likely decision point

Run QA on the V43 executive interaction depth build.  Priority checks: role-tailored proof output, estimated exposure behavior, runtime score drill-downs, first-layer object overlap, shield prominence, clickable briefing cards, evidence artifacts, and proof/architecture detail flows.
