# CyberShield Builder Lessons Learned

Date: 2026-05-29
Baseline: V51.1 Executive Story and CTA Cleanup

## Purpose

This document captures lessons learned during CyberShield build and recovery passes.  It exists because future builders, including future AI builders, will not reliably inherit chat memory.

## Major lesson 1: The repo must babysit the builder

CyberShield cannot rely on one chat thread, one model instance, or one builder remembering everything.

The repo must serve as the institutional memory through:

- source-of-truth hierarchy
- product invariants
- definition of done
- acceptance checklist
- requirements traceability matrix
- builder-version log
- successor handoff
- recurring regression watchlist
- schemas
- validation scripts
- data registries

If the repo does not enforce memory, future builders will repeat old mistakes.

## Major lesson 2: AI builders need guardrails against predictable failure modes

Observed recurring AI-builder risks:

- overbuilding features instead of stabilizing architecture
- bloating `index.html`
- hiding scoring logic inside JavaScript
- letting metadata drift
- producing generic industry demos
- making objects look clickable but not meaningful
- weakening TrustMap into decorative bubbles
- overstating current capability
- forgetting constraints from prior versions
- failing to update docs after code changes

The repo now contains guardrail files to reduce these risks.

## Major lesson 3: JSON registry creation may be inconsistent through the connector

During the 2026-05-28 documentation hardening pass, the GitHub connector successfully created some JSON files but blocked others, especially certain registry scaffolds under `/data`.

Builder instruction:

If JSON file creation is blocked by the connector, create a `.txt` or `.md` source scaffold and leave a clear note.  Then the next local builder should convert it to JSON through GitHub Desktop, CLI, or local file editing.

Do not assume a missing JSON registry means the requirement was abandoned.

## Major lesson 4: Registry scaffolds should be small and boring

The connector was more likely to block larger structured payloads with scenario/risk language.  Smaller, simpler files succeeded more often.

Builder instruction:

- keep each JSON file short
- avoid overstuffing scaffolds
- create one registry at a time
- use neutral labels where possible
- put detailed explanation in markdown requirement docs
- keep JSON focused on IDs, labels, and simple mappings

## Major lesson 5: Requirements must be separated from implementation

The fastest way to create regressions is to let the live app become the requirement source.

Correct pattern:

- requirements live in docs
- model logic lives in data/model registries
- role/industry/scenario/report logic lives in data registries
- app code renders and orchestrates
- QA files verify behavior

The app should not be the only place where logic exists.

## Major lesson 6: Do not put UI behavior in registry loaders

V52.4 through V52.6 temporarily placed UI behavior, event routing, TrustMap patching, and styling inside `src/core/registryLoader.js`.  That created architectural confusion and made the app harder to reason about.

Correct rule:

- `registryLoader.js` loads registries only
- UI behavior belongs in `src/app.js` or `src/ui/*`
- report behavior belongs in a report module or template registry
- TrustMap behavior belongs in a TrustMap controller
- CSS belongs in a stylesheet when possible

V52.7 corrected this by adding `src/ui/v52-7-operational-layer.js` and returning `registryLoader.js` to data loading only.

## Major lesson 7: Do not use full-body observers for UI correction

A full-body `MutationObserver` used during a prior core-logo workaround likely caused slowdown and tab-lock behavior.  Future builders should not use whole-page observers for routine UI updates.

Acceptable alternatives:

- explicit render calls
- event delegation
- targeted post-render enhancement
- component-level state updates
- narrow observer only when no other option exists

## Major lesson 8: TrustMap is a navigable product surface, not a decorative map

TrustMap must support:

- overview layer
- domain layer
- detail/action layer
- selected state
- connected state
- back behavior
- scroll/pan behavior
- evidence/report routes
- trust propagation paths
- where trust breaks or may break
- what improves the trust score

If a TrustMap node, edge, layer filter, or visual object is clickable, it must explain, route, or trigger a meaningful next step.

## Major lesson 9: Proof Pack report cards must create real report previews

A report card is not complete if it only routes to a generic Proof Pack section.  Each report card must create a distinct report preview based on scenario, role, audience, decision, evidence gaps, and next action.

Download/print should require sender and recipient information.  Email delivery must not be claimed without backend integration.

## Major lesson 10: Humanistic visual objects require a style guide

The TrustMap visual language has drifted multiple times.  The desired direction is humanistic visual objects, not robot-like CSS geometry, not facial emojis, and not sci-fi cyber theater.

A future builder should create a TrustMap Visual Object Style Guide covering:

- acceptable object style
- MJC logo usage
- core object rules
- line weight rules
- neon rules
- layer rules
- what not to do

## Major lesson 11: CyberShield is a Trust Model, not an evidence-volume model

V53 clarified the product spine:

> CyberShield evaluates whether the information behind a critical action can be trusted before the business acts.

Executives rarely have perfect information.  CyberShield is not about having enough evidence.  The differentiator is whether the organization can trust what it currently has, sees, and thinks it knows.

Evidence supports the Trust Model, but evidence volume is not the point.  Information reliability, source confidence, owner accountability, verification path, and consequence if wrong are the point.

## Major lesson 12: Consequence must come before governance mechanics

User-facing screens must show what happens if information is wrong before presenting policy, control, governance, or architecture mechanics.

Correct order:

1. action under review
2. information relied on
3. consequence if wrong
4. trust status
5. decision recommendation
6. owner
7. governance/proof/report mechanics

Do not lead with runtime governance.  Runtime governance is architecture language, not buyer language.

## Major lesson 13: CyberShield is intentionally cross-industry

Do not ask whether CyberShield is too broad.  The breadth is intentional.

The constraint is coherence under Trust Before Action, not narrowness.  Every industry path must map back to:

- critical action
- information relied on
- trust status
- decision
- owner
- consequence if wrong
- verification path
- report

## Major lesson 14: CMMC is a flagship GTM scenario for MJC

V53 adds two CMMC paths:

- CMMC Applicability Trust Check
- CMMC Readiness Trust Check

This is a strong entry point for DoD suppliers and manufacturers doing business with the DoD.  It should help them understand whether they likely need CMMC Level 1 or Level 2 and whether they can trust current readiness information.

Boundary: CyberShield must not claim legal determination, certification, assessment outcome, or guaranteed compliance.

## Major lesson 15: Board reports are secondary but strategically important

Board-ready reports should not lead V53, but they must be on the roadmap.

Future board-ready reports should include:

- MJC letterhead
- MJC shield logo
- formal title block
- prepared by / prepared for
- Aegis-generated signature placeholder
- optional Dr. Max Justice human-reviewed signature block
- print-ready formatting
- PDF-ready layout
- professional page breaks

Signature boundary: a Dr. Max Justice signature should only appear after human review.

## Major lesson 16: The product category has clarified

CyberShield should be understood as:

> Trust Before Action infrastructure for determining whether the information behind a critical action can be trusted before consequence occurs.

It is not merely a cybersecurity dashboard, AI governance platform, GRC tool, or chatbot.

## Final instruction to future builders

Before building, read:

1. `docs/source-of-truth-hierarchy.md`
2. `docs/product-invariants.md`
3. `docs/definition-of-done.md`
4. `docs/builder-requirements-acceptance-checklist.md`
5. `docs/recurring-build-issues-and-regression-watchlist.md`
6. `docs/builder-lessons-learned.md`
7. `docs/v52-v59-control-plane-build-plan.md`
