# Builder Requirements Acceptance Checklist

Date: 2026-06-17
Baseline: 2026061721 Human Legibility and Agency Requirements

## Purpose

Every future CyberShield builder must use this checklist before a build is accepted.  This checklist exists to prevent feature stacking, dead interactions, stale metadata, broken release chain, hidden scoring logic, generic demos, overclaimed capabilities, opaque AI recommendations, ceremonial approvals, and unmaintained harness drift.

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
- requirements traceability matrix

Failure condition: code changed without documentation update.

## 3. Architecture discipline checklist

Verify:

- no unnecessary feature stacking
- no new top-level tabs unless approved
- logic is not added to `index.html` when a registry/model file should own it
- scoring logic is moving toward `/data/models/*.json`
- role/industry/scenario/report logic is moving toward registries
- model, app, harness, evidence, decision, and report concerns remain separated

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

## 7. Human legibility checklist

For every consequential ATDR, recommendation, finding, or export, verify:

- the accountable human decision owner is visible or marked missing
- facts are separated from assumptions
- assumptions are separated from inferences
- recommendations are separated from evidence
- uncertainty is visible
- sources checked and unavailable sources are visible where applicable
- next human action is clear
- risk-if-wrong is visible
- approval is meaningful rather than ceremonial

Failure condition: the UI asks a human to approve something the human cannot understand, challenge, reject, or escalate.

## 8. Challenge and sycophancy checklist

For AI-influenced recommendations, verify:

- the premise was challenged where stakes justify it
- the system records challenge-tested status
- sycophancy / over-agreement risk is considered
- generic AI output risk is considered
- polished language is not treated as proof
- expert judgment or reviewer rationale can be captured

Failure condition: the recommendation looks polished but was never challenged or grounded.

## 9. Harness Health checklist

When the build affects agents, AI-assisted workflows, AI Trust Decision Records, evidence review, decision routing, scoring, or exports, verify:

- Inputs / Sources are current and identified
- Reach / Permissions are visible
- Job / Purpose is classified
- Proof / Evidence is inspectable
- Value / Usefulness is assessed

Failure condition: the harness changed but the documentation does not explain the change.

## 10. Onboarding and dashboard checklist

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

## 11. Industry-demo checklist

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

## 12. TrustMap checklist

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

## 13. Report/export checklist

Verify:

- Executive Briefing Summary path exists or is documented
- TrustMap / Authenticity Trust Summary path exists or is documented
- Operational Trust Roadmap path exists or is documented
- Proof Pack path exists
- reports include model version, evidence assumptions, limitations, and boundary language
- reports include human legibility, decision owner, approval status, challenge-tested status, and next human action when applicable
- downloadable/copyable outputs work when implemented

Failure condition: insight exists but there is no path to export or share it.

## 14. Boundary and overclaim checklist

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
- live model monitoring
- autonomous model introspection

unless actually implemented.

Failure condition: UI, report, README, or docs imply live capability that does not exist.

## 15. Performance and accessibility checklist

Verify:

- Firefox performance is acceptable
- mobile navigation works
- text is readable on mobile
- contrast is sufficient
- TrustMap scroll behavior works
- long documents or app state do not freeze browser
- no unnecessary heavy animation

Failure condition: page slows browser, especially Firefox.

## 16. Rent-free memory requirement

Verify the build supports the intended executive memory:

> We probably do not currently have enough operational visibility into cyber and AI decision-making.

Failure condition: user remembers the UI but not the operational realization.

## 17. Architect / engineer handoff requirement

Before handoff, verify the builder can state:

- which requirement changed
- which schema fields changed
- which risk taxonomy entries changed
- which UI sections changed
- which exports changed
- which tests were run
- which capabilities are not implemented
- what the next builder should do

Failure condition: the next builder has to infer requirements from chat history.

## Final acceptance rule

A build is not complete until:

- code works
- requirements are met
- documentation is updated
- release chain is aligned
- no-dead-click standard passes
- overclaim boundary passes
- harness health is documented
- human legibility is documented
- meaningful human authority is preserved
- next builder can understand what changed and what to do next
