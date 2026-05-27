# CyberShield Executive OS

## Current live build

Current build label: **V41 Enterprise Trust Platform Prototype**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

See `bots.txt`, `governance-summary.json`, `docs/foundational-documents.md`, `docs/v36-v41-build-record.md`, and `docs/successor-builder-handoff-and-job-docket.md` for the current machine-readable and builder-facing build description.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Sandeep Mode | Evidence | CRM | Proof Pack | Architecture | Settings
```

## V36 through V41 purpose

CyberShield now consolidates the V36 through V41 roadmap into the current static prototype:

```text
Assess operational trust exposure → Analyze governance and runtime risk → Deliver executive visibility and control
```

The executive dashboard does not expose version labels. Build/version details are intentionally kept in Settings and repository documentation.

## Current product capabilities

- Clean CyberShield blue enterprise SaaS interface, not full dark command-center styling
- Enterprise TrustMap with center organization node and domain clusters
- Operational trust score rail, risk drivers, trust distribution, and active risk rail
- TrustMap edge hover glow and connector dots
- Click-to-pin TrustMap relationship detail
- Runtime decision thresholds for Allow, Allow with Constraints, Escalate, and Block
- Sandeep / IBM practice-builder mode
- Manual evidence intake with local confidence impact
- CRM-lite row generator for Google Sheets-compatible lead and pilot tracking
- Commercial Executive Proof Pack output
- Architecture transition path from zero-cost prototype to low-cost pilot to enterprise-grade architecture
- Settings/Admin area for build metadata

## Strategic direction

- CyberShield remains MJC-owned advisory software, not standalone SaaS yet
- Sandeep path is treated as advisor / IBM practice-builder / potential internal champion path
- Regulated SMBs and federal-adjacent SMBs remain the commercial fallback market
- Current budget assumption remains zero or near-zero hosting/backend spend
- Low-cost and inspectable third-party tools are acceptable when useful
- Target direction is fast movement from low-cost prototype toward long-term enterprise-grade architecture

## Foundational trust model sources

CyberShield includes foundational source records for Dr. Max Justice's Cybersecurity Trust Model materials:

```text
foundational-docs/dr-max-justice-cybersecurity-trust-model-dissertation-source.md
foundational-docs/dr-max-justice-cybersecurity-trust-model-defense-deck-source.md
```

These records are based on verified Google Doc and Google Slides text extraction.  The raw PDF/DOCX/PPTX files have not yet been committed.

Future builders should read these source records before changing Runtime Governance, TrustMap, Evidence Substrate, Governance Memory, Reports, Pilot Package, or the Executive Advisor Layer.

## Release train included

- V21: Executive Demo QA and Navigation Compression
- V22: TrustMap 2.0 and Runtime Relationship Logic
- V23: Report Engine Upgrade
- V24: Governance Memory 2.0
- V25: Framework Evidence Library
- V26: Persistence, Intake, and CRM Payload Hardening
- V27: Pilot Package and Sales Enablement
- V28: Website Integration Layer
- V29: Integration Readiness and Performance Stabilization
- V30: TrustMap Usability and Executive De-Branding Cleanup
- V31: Decision Engine Depth and Rationale Trace
- V32: Executive Proof Pack and Board Output Upgrade
- V33: CRM-Lite Workflow and Lead/Pilot Payloads
- V34: Mock Evidence Source Layer
- V35: Controlled Backend Decision Build
- V36: Enterprise TrustMap Alignment Build
- V37: Sandeep Demo and Sales Conversion Build
- V38: Manual Evidence Intake Build
- V39: CRM and Pilot Payload Build
- V40: Executive Proof Pack Commercial Build
- V41: Enterprise Architecture Transition Plan

## Core rule

No dead bubbles.  Important objects should explain themselves or navigate somewhere useful.

## Boundary

The current public build is a static prototype.  It is not connected to live SIEM, EDR, identity, GRC, cloud, Google Sheets, Microsoft 365, CRM, or production agent enforcement systems.

The current build produces local/exportable records and models CRM row payloads, manual/mock evidence, proof packs, and architecture decision paths.  It does not perform live external sync.

## Next likely decision point

Before V42 or V43 live integration work, run QA on V41 and decide whether to prioritize TrustMap polish, Google Apps Script CRM append, or stronger role-specific TrustMap weighting.
