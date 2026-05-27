# CyberShield V36-V41 Build Record

Date: 2026-05-27
Builder: Builder-20260527-001, GPT-5.5 Thinking

## Scope

This record documents the consolidated V36 through V41 implementation. The live app is released as a V41 enterprise trust platform prototype because the platform is static and the roadmap from V36 through V41 was folded into one integrated build.

## Strategic direction locked

- CyberShield remains MJC-owned advisory software, not standalone SaaS yet
- The Sandeep path is treated as advisor / IBM practice-builder / potential internal champion path
- Regulated SMBs and federal-adjacent SMBs remain the commercial fallback market
- The architecture should move from low-cost prototype toward long-term enterprise-grade design
- Current budget assumption remains zero or near-zero hosting/backend spend
- Third-party tools are acceptable when low-cost and inspectable
- Visual style should be clean CyberShield blue enterprise SaaS, not dark command center
- The center TrustMap canvas may be more dimensional, but the overall product should stay website-aligned and not visually overmilitarized

## V36: Enterprise TrustMap Alignment Build

Built:

- Reworked the TrustMap into an Enterprise TrustMap view
- Added center organization node
- Added enterprise domains: Identities & Access, Cloud & Infrastructure, Third Parties & Vendors, AI Systems & Agents, Applications & Data, Devices & Endpoints, Policy & Compliance, Evidence Substrate, Decision Record
- Added left operational trust score rail
- Added right relationship detail, trust distribution, and active risk rail
- Added line hover glow behavior
- Added endpoint connector dots on focused lines
- Added click-to-pin relationship detail
- Renamed CRM/Pilot Record concept to Decision Record in the TrustMap
- Preserved website-aligned model: Assess, Analyze, Govern, Validate, Monitor, Respond

Acceptance check:

- TrustMap uses clean CyberShield blue interface
- TrustMap no longer looks like a full dark command-center interface
- Edges explain green, yellow, and red status
- Focused edges show endpoints and connected relationship

## V37: Sandeep Demo and Sales Conversion Build

Built:

- Added Sandeep Mode
- Positioned CyberShield as MJC-owned advisory software and practice accelerator
- Added advisor / IBM practice-builder framing
- Added fallback to regulated SMB / federal-adjacent SMB market
- Added six-step guided demo path: Problem, TrustMap, Runtime Gate, Evidence, Proof Pack, Pilot

Acceptance check:

- Sandeep Mode provides a clear advisory/practice-builder narrative
- Dr. Max Justice remains positioned as vCISO, Security SME, Cybersecurity SME, U.S. veteran, and creator of The CHN vCISO GPT powered by Cyber Shield

## V38: Manual Evidence Intake Build

Built:

- Expanded manual evidence intake
- Added evidence source selector including AI Use Policy, Access Control Policy, Vendor Security Review, Board Risk Memo, Data Classification Policy, Incident Response Plan, Backup Validation Record, and Meeting Decision Summary
- Added evidence owner, confidence, related domain, and freshness
- Connected evidence confidence to scoring through local state

Acceptance check:

- Evidence is still manual/mock only
- Evidence changes trust score, relationship color, reports, and proof pack through local state

## V39: CRM and Pilot Payload Build

Built:

- Preserved CRM-lite workflow
- Added Sandeep referral as lead source
- Added market-aware recommended offer logic
- Added CRM JSON and CSV export path
- Preserved no live browser sync

Acceptance check:

- CRM payload is generated locally
- CSV export remains fallback
- No live Google Sheets append was added in this build

## V40: Executive Proof Pack Commercial Build

Built:

- Reframed Proof Pack as commercial executive output
- Added market-aware recommended offer cards
- Added Sandeep/practice-builder recommendation when that path is selected
- Added regulated SMB / readiness review / 30-day pilot recommendation flow

Acceptance check:

- Proof Pack reflects selected organization, role lens, market path, active decision, scores, rationale, and recommendation

## V41: Enterprise Architecture Transition Plan

Built:

- Added Architecture view
- Added zero-cost prototype, low-cost pilot, and enterprise-grade stages
- Preserved architecture transition from low-cost stack to long-term enterprise-grade architecture
- Kept build label in Settings/Admin rather than executive dashboard

Acceptance check:

- Architecture view shows staged transition path
- No live backend, authentication, or external sync was introduced

## Current live app sections

- Briefing
- TrustMap
- Runtime
- Sandeep Mode
- Evidence
- CRM
- Proof Pack
- Architecture
- Settings

## Static build constraints

The app remains a static GitHub Pages prototype. It does not include authentication, production enforcement, live CRM sync, live Microsoft 365 integration, live telemetry ingestion, or controlled backend persistence.

## Manual QA still required

Manual QA is still required in Firefox, Chrome/Brave, and mobile browsers. Static repository validation confirms the live file is no longer placeholder and begins as `CyberShield Executive OS`.

## Next recommended build

V42 should focus on QA hardening and TrustMap interaction polish:

- verify edge hover and click states in Firefox
- test endpoint dots
- test mobile layout
- improve edge detail drawer if needed
- confirm no permanent default highlight remains
- add clearer role-specific TrustMap weighting if current defaults are too generic
- prepare V43 for optional Google Apps Script CRM append flow
