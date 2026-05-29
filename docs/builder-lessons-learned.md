# CyberShield Builder Lessons Learned

Date: 2026-05-28
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

## Major lesson 11: V52 should be architecture first, not UI first

The temptation is to continue adding visible improvements.  That can repeat the bloat cycle.

V52 should focus on:

- modular structure
- model registry
- onboarding map
- role/industry/scenario/report registries
- source-of-truth alignment
- validation scripts
- model explanation routes

## Major lesson 12: The system must support founder-led GTM breadth

CyberShield needs multiple credible demo paths because MJC's founder-led network spans:

- Defense Industrial Base / Federal Contractor SMB
- Financial Services / Community Banking
- AI-Enabled SMB / SaaS / Professional Services
- Healthcare / Federal Health Security

This is not optional product sprawl.  It is a GTM requirement.

## Major lesson 13: The product category has clarified

CyberShield should be understood as:

> Executive operational visibility and governance infrastructure for AI-era uncertainty.

It is not merely a cybersecurity dashboard or AI governance tool.

## Major lesson 14: The rent-free memory requirement matters

The demo should create this executive realization:

> We probably do not currently have enough operational visibility into cyber and AI decision-making.

This is the psychological anchor future builders must preserve.

## Final instruction to future builders

Before building, read:

1. `docs/source-of-truth-hierarchy.md`
2. `docs/product-invariants.md`
3. `docs/definition-of-done.md`
4. `docs/builder-requirements-acceptance-checklist.md`
5. `docs/recurring-build-issues-and-regression-watchlist.md`
6. `docs/builder-lessons-learned.md`
7. `docs/v52-v59-control-plane-build-plan.md`
