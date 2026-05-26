# CyberShield V21-V28 Release Train

Date: 2026-05-26
Current live build: Integrated V21-V28 Release Train v28

## Purpose

This release train implements the planned CyberShield improvements from V21 through V28 without starting real external integrations.  It stops before V29 because V29 requires environment decisions about Google Sheets, Microsoft 365, CRM, security boundaries, identity, telemetry, and AI tools.

## Global rules

- Preserve onboarding
- Preserve Runtime
- Preserve TrustMap
- Preserve Adoption
- Preserve Pilot
- Preserve Evidence boundary language
- Preserve prototype boundary language
- No hidden network calls
- No Google Sheets sync
- No CRM sync
- No Microsoft 365 sync
- No production enforcement claims
- No broad MutationObserver loops
- No dynamic script fan-out
- No old phase-file sprawl

## V21: Executive Demo QA and Navigation Compression

Implemented:

- Primary navigation compressed to Briefing, Runtime, TrustMap, Reports, Adoption, Pilot, Settings
- Secondary views moved into Advanced
- Demo Mode controls added
- Demo path added: Runtime, TrustMap, Reports, Adoption, Pilot
- Reset Demo button added

Acceptance:

- Primary nav is cleaner
- Advanced views remain accessible
- Demo Mode routes in correct order
- TrustMap remains primary
- Adoption remains primary
- Pilot remains primary

## V22: TrustMap 2.0 and Runtime Relationship Logic

Implemented:

- TrustMap relationship confidence
- Weak-link indicators
- Runtime color propagation
- Relationship types
- Selected relationship insight
- Cross-Agent Preview

Acceptance:

- TrustMap shows relationship confidence
- Weak links are visible
- Runtime scenario affects TrustMap context
- Evidence and reports include TrustMap impact

## V23: Report Engine Upgrade

Implemented:

- Audience-specific report emphasis
- Owner-sensitive report context
- Report export as text
- Report export as markdown
- Report export as JSON
- TrustMap impact included in report body

Acceptance:

- Reports remain three-pane
- Report content changes with scenario and audience
- Copy/download actions remain local

## V24: Governance Memory 2.0

Implemented:

- Decision history
- Open risk summary
- Owner queue
- Evidence gap status
- Closed since last review placeholder
- Decision aging indicator

Acceptance:

- Runtime decision simulation feeds memory
- Memory helps answer what is unresolved and who owns it

## V25: Framework Evidence Library

Implemented:

- Framework evidence requirements
- Control theme
- Evidence needed
- Current gap
- Owner
- Report affected
- Runtime scenario context

Frameworks:

- CMMC / NIST SP 800-171
- NIST CSF
- HIPAA
- SOC 2
- AI Governance
- Vendor Risk
- Recovery Validation

Acceptance:

- Frameworks are evidence-oriented, not just labels
- Frameworks do not overclaim full GRC capability

## V26: Persistence, Intake, and CRM Payload Hardening

Implemented:

- Buyer Payload
- Technical Evidence Payload
- Advisory Summary Payload
- Pilot Scope Payload
- Report Bundle Payload
- Copy and download local payload actions
- Explicit local/export-only boundary

Acceptance:

- No hidden network calls
- No CRM sync
- No Google Sheets sync
- No Microsoft 365 sync

## V27: Pilot Package and Sales Enablement

Implemented:

- CyberShield Readiness Review framing
- Operational Trust Snapshot framing
- 30-Day Operational Trust Pilot framing
- Executive Proof Pack framing
- AI Governance Assessment framing
- Vendor Governance Review framing
- Pilot one-pager copy/download

Acceptance:

- Pilot package can support an executive sales conversation
- Boundary language remains honest

## V28: Website Integration Layer

Implemented:

- Full App Mode
- Demo Mode
- Landing Page Mode
- Embed Mode
- Website copy blocks
- Executive CTA language
- Prototype boundary statement

CTA language:

- Request an Operational Trust Review
- Discuss CyberShield Readiness
- Review AI Governance Exposure
- Evaluate Runtime Governance Readiness

Acceptance:

- MJC website integration content exists
- No cheesy CTA language
- No external calls added

## Current test URL

https://maximumjusticecybersecurity.github.io/CyberShield/?v=v28-release-train&reset=onboarding

## Required QA

- Onboarding appears with reset parameter
- Onboarding completion reveals workspace
- Primary nav works
- Advanced nav works
- Demo Mode buttons work
- Runtime scenario switching works
- TrustMap nodes update side panels
- Reports render and export locally
- Memory receives runtime decision entries
- Framework evidence cards render
- Persistence payloads switch and export locally
- Pilot one-pager renders
- Website copy renders

## Pause before V29

V29 requires user input before implementation.

Required inputs:

- Google Sheets structure and Apps Script decision
- Microsoft 365 systems to include or exclude
- CRM direction
- Security boundary
- Identity and telemetry assumptions
- AI tools to govern
