# CyberShield Executive OS

CyberShield is an executive operational trust environment for cyber, AI governance, evidence, ownership, and consequence-aware leadership decisions.

## Current build

Internal continuity label: CyberShield V9 Phase 1

This internal build label is intentionally not exposed in the primary user experience. Normal users should see the product as CyberShield Executive OS, not as a numbered version.

## Product direction

CyberShield is not a chatbot, SIEM, compliance spreadsheet, MSP portal, or generic AI dashboard.

CyberShield is Operational AI Governance and Admissibility Infrastructure.

Core thesis:

> Operational Governance Before Consequence

CyberShield structures leadership judgment for the human in the loop. It does not replace leadership judgment.

## Phase 1 scope

Phase 1 establishes the foundation for the next CyberShield generation:

1. Hide version language from normal user-facing surfaces
2. Preserve versioning only for internal continuity and builder handoff
3. Refactor the product-facing advisory concept to Executive Advisor Layer
4. Preserve Decision Intelligence Layer as the architecture-facing name
5. Extend onboarding into a personalization engine
6. Capture primary role, additional roles, decision authority, reporting audience, artifact state, and evidence confidence
7. Support multiple role-specific dashboards for one human in the loop
8. Add role switching for personalized executive views
9. Add Decision Rationale Trace language to advisor and report outputs
10. Improve responsive behavior to prevent metric card overlap during resize
11. Preserve the static HTML, CSS, and JavaScript deployment model

## Product-facing terminology

Use these terms in the user interface:

- CyberShield Executive OS
- Executive Advisor Layer
- Operational TrustMap
- Executive Priorities Engine
- Decision Rationale Trace
- Operational Governance Before Consequence

## Architecture terminology

Use these terms in architecture notes and builder handoff documents:

- Decision Intelligence Layer
- Evidence Substrate
- Runtime Governance Engine
- Operational Admissibility
- Governance Memory
- Machine-readable evidence
- Recommendation trace
- Executive decision record

## Technical structure

This build remains intentionally simple:

- index.html
- styles.css
- v9-phase1.css
- app.js
- assets/
- google-apps-script/

Do not introduce React, Vite, or a complex build pipeline unless a later phase explicitly requires it.

## Handoff

See `docs/cybershield-v9-phase1-handoff.md` for builder continuity notes.
