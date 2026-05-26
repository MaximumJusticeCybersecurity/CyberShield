# CyberShield Successor Builder Handoff and Job Docket

Date: 2026-05-26
Current live build: V35 Controlled Backend Decision Build
Repository: MaximumJusticeCybersecurity/CyberShield
Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/
Primary live file: `index.html`

## Purpose

This document is the successor builder handoff and job docket for CyberShield.  It must be updated after every material build.

CyberShield is still early.  The current prototype is not the finished product.  The live app shows a static but usable story: onboarding, runtime decisioning, TrustMap, role-specific reports, proof pack, CRM-lite payloads, mock evidence, and controlled backend decision planning.

## Required builder reading order

1. `README.md`
2. `bots.txt`
3. `governance-summary.json`
4. `docs/foundational-documents.md`
5. `docs/builder-version-log.md`
6. `docs/release-checklist.md`
7. `docs/qa-checklist.md`
8. `docs/v30-v35-build-record.md`
9. `docs/v29-decision-record.md`
10. this handoff and job docket

## Mandatory builder-version rule

Every material builder must update `docs/builder-version-log.md`.

If the live app changes but the builder-version log does not, the build is incomplete.

## Current live build

Current build label:

> V35 Controlled Backend Decision Build

User-facing navigation:

- Briefing
- Runtime
- TrustMap
- Reports
- Proof Pack
- CRM
- Evidence
- Backend
- Settings

## Product identity

CyberShield is a runtime governance, operational admissibility, executive trust, evidence, and accountability prototype for AI-assisted work.

CyberShield is not a chatbot, generic dashboard, compliance spreadsheet, MSP portal, or production platform yet.

The current public build is a static GitHub Pages prototype.  Do not describe it as production infrastructure.

## Website-aligned TrustMap model

The in-app TrustMap follows the public Maximum Justice Cybersecurity website model:

1. Assess operational trust exposure
2. Analyze governance and runtime risk
3. Deliver executive visibility and control

TrustMap lines are now interactive. Green, yellow, and red edges include hover explanations. Future builders must preserve this behavior.

## V30 through V35 implementation summary

- V30: removed version noise from executive surfaces and added TrustMap line explanations
- V31: added decision thresholds and rationale trace
- V32: added role-specific reports and Executive Proof Pack
- V33: added CRM-lite row generator and CSV output
- V34: added mock evidence source layer
- V35: added backend decision matrix and kept build metadata in Settings/Admin only

See `docs/v30-v35-build-record.md` for details.

## Dr. Max Justice positioning

CyberShield is being built under Maximum Justice Cybersecurity.

Dr. Max Justice should be treated as:

- vCISO
- Security SME
- Cybersecurity SME
- U.S. veteran
- creator of The CHN vCISO GPT powered by Cyber Shield

Current commercial wedge:

- CyberShield Readiness Review
- Operational Trust Assessment
- 30-Day Operational Trust Pilot
- AI Governance Assessment
- Vendor Governance Review
- Executive Proof Pack

## What the successor should do first

1. Read the required builder reading list above
2. Open the live prototype with `?v=v35-qa&reset=onboarding`
3. Run through onboarding
4. Test user-facing navigation
5. Test Runtime, TrustMap, Reports, Proof Pack, CRM, Evidence, Backend, and Settings
6. Test TrustMap line hovers for green, yellow, and red explanations
7. Run the QA checklist
8. Validate Firefox performance
9. Confirm no placeholder file content remains
10. Only then plan V36

## V36 decision point

Do not start live integrations until the owner explicitly approves one of these paths:

- Google Apps Script append-only CRM flow
- GitHub admin-only record archive flow
- lightweight backend
- Microsoft-native evidence prototype

Before any live integration, document:

- data classification
- consent model
- identity model
- secret handling
- retention model
- rollback/deletion model
- audit log expectations
- what data must never be transmitted

## Known V35 limitations

- public build remains static GitHub Pages prototype
- no real integrations yet
- no authentication yet
- no persistent backend yet
- no production enforcement engine yet
- no live Google Sheets write from browser
- no live Microsoft 365 connection
- no SIEM, EDR, identity, GRC, cloud, or CRM sync
- browser QA still needs manual validation
- connector blocked larger all-in-one HTML replacements, so V35 is a compact implementation and deeper governance text remains in docs

## Current commit anchor

Current V30-V35 commits from this builder:

- `96fcda52ea8605e666475ab239d1c63bd1d10d24` - compact V35 live app
- `dedfbe129eccb2f4fdbdffdd56bdacf4d1a3ad1f` - V30-V35 build record
- `3f81aeef186b27ebb00b1246383aca95a11a3390` - README for V35
- `eb9f9c8494e0cc6025a4659b1dd2dcd28b31af01` - bots context for V35
- `80f276b7daf266eac82a0a47992198af68184dc9` - governance summary for V35
- `e2cebddae11168d1e2d892025277a21590488d04` - builder version log for V30-V35

Important correction note:

During the V29 build, `index.html` was accidentally replaced with the literal text `PLACEHOLDER` in commit `8ca2020fb74e50ecaeaa564a143dd7e70ca5961c`.  That was corrected in commit `c7c337c40cade6eb0c814611123e51448c2df8fa`.  Future builders should verify the live file before starting additional edits.

This file must be updated after every future material build.
