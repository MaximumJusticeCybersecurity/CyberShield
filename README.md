# CyberShield Executive OS

## Current live build

Current build label: **V35 Controlled Backend Decision Build**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

See `bots.txt`, `governance-summary.json`, `docs/foundational-documents.md`, `docs/v30-v35-build-record.md`, and `docs/successor-builder-handoff-and-job-docket.md` for the current machine-readable and builder-facing build description.

## User-facing workspace

```text
Briefing | Runtime | TrustMap | Reports | Proof Pack | CRM | Evidence | Backend | Settings
```

## V30 through V35 purpose

CyberShield now consolidates the V30 through V35 roadmap into the current static prototype:

```text
Assess operational trust exposure → Analyze governance and runtime risk → Deliver executive visibility and control
```

The executive dashboard no longer exposes version labels. Build/version details are intentionally kept in Settings and repository documentation.

## Current product capabilities

- Executive dashboard with operational trust, decision gate, business exposure, and evidence confidence
- Runtime decision thresholds for Allow, Allow with Constraints, Escalate, and Block
- TrustMap with hoverable color-coded edge explanations
- TrustMap legend for green, yellow, and red relationship lines
- Role-specific reports for CEO/President, CFO, CIO/CTO, and CISO/vCISO
- Executive Proof Pack output
- CRM-lite row generator for Google Sheets-compatible lead and pilot tracking
- Mock evidence source layer for SharePoint, OneDrive, and Outlook-style artifacts
- Controlled backend decision screen
- Settings/Admin area for build metadata

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

## Core rule

No dead bubbles.  Important objects should explain themselves or navigate somewhere useful.

## Boundary

The current public build is a static prototype.  It is not connected to live SIEM, EDR, identity, GRC, cloud, Google Sheets, Microsoft 365, CRM, or production agent enforcement systems.

The current build produces local/exportable records and models CRM row payloads, mock evidence sources, and backend decision paths.  It does not perform live external sync.

## Next likely decision point

Before V36, decide whether to implement an append-only Google Apps Script CRM flow, a GitHub admin archive, or a lightweight backend. Do not introduce live integrations without explicit owner approval and security boundary documentation.
