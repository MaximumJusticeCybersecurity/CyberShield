# Builder Requirements Acceptance Checklist

Date: 2026-05-28
Baseline: V51.1

## Purpose

Every future CyberShield builder must use this checklist before a build is accepted.  This checklist exists to prevent feature stacking, dead interactions, stale metadata, broken release chain, hidden scoring logic, generic demos, and overclaimed capabilities.

## 1. Release-chain checklist

Verify all files agree on the current build/version or current planned build:

- README.md
- bots.txt
- governance-summary.json
- docs/successor-builder-handoff-and-job-docket.md
- docs/builder-version-log.md
- relevant requirement docs
- index.html Settings/admin metadata if app code changed

Failure condition: README says one build but governance-summary or bots says another.

## 2. Documentation checklist

If a build changes app behavior, update:

- builder-version-log
- successor handoff
- governance summary
- bots.txt
- README
- QA/release checklist where relevant
- any affected requirement doc

Failure condition: code changed without documentation update.

## 3. Architecture discipline checklist

Verify:

- no unnecessary feature stacking
- no new top-level tabs unless approved
- logic is not added to `index.html` when a registry/model file should own it
- scoring logic is moving toward `/data/models/*.json`
- role/industry/scenario/report logic is moving toward registries
- model, evidence, decision, and report concerns remain separated

Failure condition: single-file bloat increases without architecture justification.

## 4. No-dead-click checklist

Every visible interactive object must:

- explain
- route
- calculate
- download
- or trigger next step

Test:

- scorecards
- Briefing cards
- TrustMap nodes
- TrustMap edges
- Official Source Verification Gate items
- Proof Pack metrics
- CTA cards
- report/export buttons
- Settings controls

Failure condition: a visible card, node, line, metric, or button appears clickable but nothing meaningful happens.

## 5. First-9-seconds checklist

Briefing must quickly answer:

- what risky action is happening
- what CyberShield decided
- why it matters
- what happens next

Failure condition: first screen is visually interesting but the executive cannot understand the situation and next step quickly.

## 6. Model transparency checklist

For every score, verify:

- model exists or planned model is documented
- model ID is visible in model detail or report
- score factors are explainable
- evidence requirements are visible
- limitations are visible
- score-improvement actions are visible
- model status is not overclaimed

Failure condition: a score exists but no one can explain how it was calculated.

## 7. Onboarding and dashboard checklist

Verify onboarding answers affect:

- role lens
- industry profile
- scenario pack
- evidence requirements
- score emphasis
- TrustMap emphasis
- report recommendations
- advisory path

Failure condition: user selects a role or industry but the dashboard remains generic.

## 8. Industry-demo checklist

For each first-class industry path, verify sector credibility:

- DIB / Federal Contractor SMB
- Financial Services / Community Banking
- AI-Enabled SMB / SaaS / Professional Services
- Healthcare / Federal Health Security

Each path must include:

- believable scenario
- sector-specific language
- appropriate framework overlay
- evidence requirements
- report output
- role-specific dashboard behavior

Failure condition: knowledgeable operator would call the demo shallow or generic.

## 9. TrustMap checklist

Verify:

- TrustMap feels like flagship memory surface
- no placeholder/cute/cartoon icons
- visual style is institutional, not sci-fi cyber theater
- all nodes discoverable on desktop and mobile
- no node overlap
- selected node comes forward
- lines connect cleanly
- edges do not run through nodes
- all nodes/edges have meaningful interactions
- MJC logo appears in header and center shield unless intentionally changed

Failure condition: TrustMap feels decorative, static, generic, or confusing.

## 10. Report/export checklist

Verify:

- Executive Briefing Summary path exists or is documented
- TrustMap / Authenticity Trust Summary path exists or is documented
- Operational Trust Roadmap path exists or is documented
- Proof Pack path exists
- reports include model version, evidence assumptions, limitations, and boundary language
- downloadable/copyable outputs work when implemented

Failure condition: insight exists but there is no path to export or share it.

## 11. Boundary and overclaim checklist

Verify the product does not claim live:

- enforcement
- takedown automation
- marketplace scanning
- ad-platform enforcement
- identity verification
- CRM sync
- ticketing/notification
- SIEM/EDR/IAM/GRC integration
- production agent blocking

unless actually implemented.

Failure condition: UI, report, README, or docs imply live capability that does not exist.

## 12. Performance and accessibility checklist

Verify:

- Firefox performance is acceptable
- mobile navigation works
- text is readable on mobile
- contrast is sufficient
- TrustMap scroll behavior works
- long documents or app state do not freeze browser
- no unnecessary heavy animation

Failure condition: page slows browser, especially Firefox.

## 13. Rent-free memory requirement

Verify the build supports the intended executive memory:

> We probably do not currently have enough operational visibility into cyber and AI decision-making.

Failure condition: user remembers the UI but not the operational realization.

## Final acceptance rule

A build is not complete until:

- code works
- requirements are met
- documentation is updated
- release chain is aligned
- no-dead-click standard passes
- overclaim boundary passes
- next builder can understand what changed and what to do next
