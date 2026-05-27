# CyberShield Executive OS

## Current live build

Current build label: **V42 Trust Shield Experience Package**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v42-qa&reset=onboarding

See `bots.txt`, `governance-summary.json`, `docs/cybershield-brand-palette.md`, `docs/foundational-documents.md`, `docs/v36-v41-build-record.md`, and `docs/successor-builder-handoff-and-job-docket.md` for machine-readable and builder-facing context.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

## V42 purpose

V42 corrects the trust experience after V41.  It restores the CyberShield True Blue palette, removes user-facing Sandeep/CRM navigation, makes the organization the center shield of the TrustMap, and shifts the TrustMap from crowded labeled bubbles toward icon-based digital trust objects.

## Current product capabilities

- CyberShield True Blue trust palette
- Organization shield as the TrustMap center object
- Icon-based first-layer TrustMap domains
- Drill-down into second-layer TrustMap objects through selected detail panels
- Connector lines that highlight on hover and show endpoint dots
- Clickable executive briefing metrics
- Runtime decision scenarios and score cards
- Evidence library with multiple artifacts
- Commercial Proof Pack with offer recommendation cards
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

Before adding live integrations, run QA on the V42 Trust Shield package.  Priority checks: spacing, first-layer object overlap, shield prominence, clickable briefing cards, runtime score depth, evidence artifacts, and proof/architecture detail flows.
