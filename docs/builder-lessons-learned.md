# CyberShield Builder Lessons Learned

Date: 2026-05-29
Baseline: V51.1 Executive Story and CTA Cleanup

## Purpose

This document captures lessons learned during CyberShield build and recovery passes.  It exists because future builders, including future AI builders, will not reliably inherit chat memory.

## Major lesson 1: The repo must babysit the builder

CyberShield cannot rely on one chat thread, one model instance, or one builder remembering everything.

The repo must serve as the institutional memory through source-of-truth hierarchy, product invariants, definition of done, acceptance checklist, requirements traceability matrix, builder-version log, successor handoff, recurring regression watchlist, schemas, validation scripts, and data registries.

If the repo does not enforce memory, future builders will repeat old mistakes.

## Major lesson 2: AI builders need guardrails against predictable failure modes

Observed recurring AI-builder risks:

- overbuilding features instead of stabilizing architecture
- bloating `index.html`
- hiding scoring logic inside JavaScript
- letting metadata drift
- producing generic industry demos
- making objects look clickable but not meaningful
- weakening TrustMap into decorative bubbles or process flows
- overstating current capability
- forgetting constraints from prior versions
- failing to update docs after code changes

The repo now contains guardrail files to reduce these risks.

## Major lesson 3: JSON registry creation may be inconsistent through the connector

If JSON file creation is blocked by the connector, create a `.txt` or `.md` source scaffold and leave a clear note.  Then the next local builder should convert it to JSON through GitHub Desktop, CLI, or local file editing.

Do not assume a missing JSON registry means the requirement was abandoned.

## Major lesson 4: Registry scaffolds should be small and boring

- keep each JSON file short
- avoid overstuffing scaffolds
- create one registry at a time
- use neutral labels where possible
- put detailed explanation in markdown requirement docs
- keep JSON focused on IDs, labels, and simple mappings

## Major lesson 5: Requirements must be separated from implementation

Correct pattern:

- requirements live in docs
- model logic lives in data/model registries
- role/industry/scenario/report logic lives in data registries
- app code renders and orchestrates
- QA files verify behavior

The app should not be the only place where logic exists.

## Major lesson 6: Do not put UI behavior in registry loaders

Correct rule:

- `registryLoader.js` loads registries only
- UI behavior belongs in `src/app.js` or `src/ui/*`
- report behavior belongs in a report module or template registry
- TrustMap behavior belongs in a TrustMap controller
- CSS belongs in a stylesheet when possible

## Major lesson 7: Do not use full-body observers for UI correction

Acceptable alternatives:

- explicit render calls
- event delegation
- targeted post-render enhancement
- component-level state updates
- narrow observer only when no other option exists

## Major lesson 8: TrustMap is a navigable product surface, not a decorative map or process flow

TrustMap must support overview, domain, detail/action, selected state, connected state, back behavior, scroll/pan behavior, evidence/report routes, trust propagation paths, where trust breaks or may break, and what improves the trust score.

If a TrustMap node, edge, layer filter, or visual object is clickable, it must explain, route, or trigger a meaningful next step.

V53.1 lesson: do not turn TrustMap into a left-to-right process flow.  The user expects a map-like surface centered around CyberShield, with objects orbiting or relating to the core.  A process flow may explain sequence, but it is not a TrustMap.

## Major lesson 9: Proof Pack report cards must create real report previews

A report card is not complete if it only routes to a generic Proof Pack section.  Each report card must create a distinct report preview based on scenario, role, audience, decision, evidence gaps, and next action.

Download/print should require sender and recipient information.  Email delivery must not be claimed without backend integration.

## Major lesson 10: Humanistic visual objects require a style guide

The TrustMap visual language has drifted multiple times.  The desired direction is humanistic visual objects, not robot-like CSS geometry, not facial emojis, and not sci-fi cyber theater.

A future builder should create a TrustMap Visual Object Style Guide covering acceptable object style, MJC logo usage, core object rules, line weight rules, neon rules, layer rules, and what not to do.

## Major lesson 11: CyberShield is a Trust Model, not an evidence-volume model

CyberShield evaluates whether the information behind a critical action can be trusted before the business acts.

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

The constraint is coherence under Trust Before Action, not narrowness.  Every industry path must map back to critical action, information relied on, trust status, decision, owner, consequence if wrong, verification path, and report.

## Major lesson 14: CMMC is a flagship GTM scenario for MJC

V53 adds two CMMC paths:

- CMMC Applicability Trust Check
- CMMC Readiness Trust Check

This is a strong entry point for DoD suppliers and manufacturers doing business with the DoD.  It should help them understand whether they likely need CMMC Level 1 or Level 2 and whether they can trust current readiness information.

Boundary: CyberShield must not claim legal determination, certification, assessment outcome, or guaranteed compliance.

## Major lesson 15: Board reports are secondary but strategically important

Future board-ready reports should include MJC letterhead, MJC shield logo, formal title block, prepared by / prepared for, Aegis-generated signature placeholder, optional Dr. Max Justice human-reviewed signature block, print-ready formatting, PDF-ready layout, and professional page breaks.

Signature boundary: a Dr. Max Justice signature should only appear after human review.

## Major lesson 16: Briefing cannot visually scream caution everywhere

V53 user QA showed that a dashboard full of yellow and red creates fatigue and makes the demo feel like a wall of headaches.  CyberShield must distinguish what is already trusted from what needs attention.

Use green/yellow/red deliberately:

- green: information trusted enough for the current purpose
- yellow: needs verification or conditional trust
- red: consequence, break, escalation, or block

The first-screen should show status balance, not constant caution.

## Major lesson 17: Onboarding cards need human-readable hierarchy

Every onboarding option card should separate bold title on line one from explanatory description on line two.

Do not concatenate title and explanation on the same visual line.  That makes the onboarding feel cluttered and harder to scan.

## Major lesson 18: V54 established the Enterprise TrustMap target pattern

The TrustMap is the wow-factor surface.  It should be treated as the center of the CyberShield product experience.

V54 pattern:

- CyberShield Core is the trust kernel, not a normal node
- TrustMap must be kernel-centered, not process-flow-centered
- Layer 1 is trust domains
- Layer 2 is domain assets / operational dependencies
- Layer 3 is object detail, owner, consequence, improvement path, decision/report route
- users must be able to zoom in, zoom out, fit map, reset, pan left/right/up/down, focus domain, and focus object
- left panel should show trust score, movement, and top trust break drivers
- right panel should show trust distribution, active risks, and selectable trend lines
- scenario selection should change domain emphasis, active risks, score distribution, and trend story
- onboarding answers should influence score directionally

Do not reintroduce layer filters that route away from TrustMap.  View controls are acceptable.  Legacy process-flow flashes are unacceptable.

## Major lesson 19: V54.2 clarified the Enterprise Trust Universe model

Fit Map should show one modeled enterprise trust universe, not one isolated scenario map.  Scenario selection applies a lens over the universe and highlights the relevant path.

V54.2 model:

- Kernel: CyberShield Core / organization trust kernel
- Layer 1: major trust domains
- Layer 2: domain assets, systems, vendors, data classes, controls, workflows, and entities
- Layer 3: small tagged risk, evidence, action, owner, or consequence dots

The whole universe should remain visible when zoomed out.  The active scenario should brighten relevant domains, assets, dots, and connectors while non-relevant items remain visible but dimmed.

Side panels must be outside the map canvas.  Trust Level Distribution, Active Risks, and Trend Line must never appear behind the map.

## Major lesson 20: Purpose must become protocol

Salim Ismail transcript feedback clarified a major next capability track:

> CyberShield turns purpose into protocol.

CyberShield should help organizations convert executive intent, mission, risk appetite, and operating principles into machine-readable governance protocols that AI agents and human decision workflows can use before action.

Protocol architecture should include:

1. Constraint Layer: what agents or workflows must never do
2. Decision Layer: how trade-offs are resolved when no human is present
3. Identity Layer: what human judgment, ownership, and mission boundaries must remain visible

Future files should live under `/data/protocols/` and include:

- `purpose-protocol.v1.json`
- `constraint-layer.v1.json`
- `decision-layer.v1.json`
- `identity-layer.v1.json`
- `refusal-rules.v1.json`
- `escalation-rules.v1.json`

Do not add this as a new top-level tab.  Integrate it into Doctrine, Scenario, Actions, Decision Record, Proof Pack, and Memory.

## Major lesson 21: Refusal is a governance feature

Purpose is not governance until it can cause a refusal.

CyberShield must eventually answer:

- Can the system determine what not to do?
- Can an AI agent or workflow using this protocol make a decision human leadership would endorse?
- Can an AI agent or workflow using this protocol determine what it must not do?

A strong starting scenario is vendor payment destination change:

- Action requested: approve vendor payment
- Trigger: vendor banking details changed within 30 days
- Constraint: payment forbidden without current banking verification and controller approval
- Decision: Refused by Constraint / Escalate to Controller
- Proof: Decision Record and Protocol Basis generated

Human-fireable-offense rule:

If a human would be disciplined or fired for doing it, an AI agent or automated workflow must be technically constrained from doing it without evidence, authority, logging, and escalation.

## Major lesson 22: V55 implemented Purpose Protocol as a first scaffold, not a full engine

V55 adds protocol scaffolds and a payment-destination-change hard-constraint demonstration.  It does not implement live enforcement.

V55 boundaries:

- static advisory prototype only
- no live banking verification
- no live payment blocking
- no live controller workflow
- no backend email, CRM, ticketing, or enforcement
- protocol registries are scaffolds and are not yet loaded by a formal registry engine

Future builders must not overclaim V55 as production runtime enforcement.

## Major lesson 23: Artifact Trust is the right future framing, not Internet Trust or fact-checking

The user feedback converged on this point: do not build or position this as a fact-checker, misinformation detector, media validator, political truth engine, or person/brand trust labeler.

Correct future framing:

> CyberShield Artifact Trust Engine

Supporting capability language:

- Claim Trust Intelligence
- Evidence-Based Decision Trust
- Reliance checking
- Information Trust Review
- Claim Verification Scenario

Core question:

> Do we have sufficient evidence to act on this information, and what is the risk if we are wrong?

Decision chain:

> Claim -> Evidence -> Confidence -> Decision Impact -> Action Guidance

What to avoid:

- fact-checker branding
- truth engine branding
- misinformation branding
- political validation branding
- trusted/untrusted person labels
- artifact-level trust score as the MVP anchor

What to build first when this track begins:

- ingest artifact text or transcript
- extract claims
- categorize claims
- assign confidence bands
- identify missing evidence
- generate a claim table
- generate an executive summary
- generate a decision-risk summary

Strong commercial examples:

- vendor says it is SOC 2 compliant
- AI vendor says it does not train on customer data
- acquisition target says its security program meets NIST
- supplier says it maintains cyber insurance
- wire request says it was approved by the CFO

The USAFacts / Steve Ballmer video is useful as a pilot but should not be the lead commercial wedge because it can be mistaken for civic/media analysis.

## Major lesson 24: The product category has clarified

CyberShield should be understood as:

> Trust Before Action infrastructure for determining whether the information behind a critical action can be trusted before consequence occurs.

The next category extensions are:

> CyberShield makes executive intent machine-readable before AI acts.

and:

> CyberShield evaluates whether evidence is sufficient to support action.

It is not merely a cybersecurity dashboard, AI governance platform, GRC tool, fact-checker, or chatbot.

## Final instruction to future builders

Before building, read:

1. `docs/source-of-truth-hierarchy.md`
2. `docs/product-invariants.md`
3. `docs/definition-of-done.md`
4. `docs/builder-requirements-acceptance-checklist.md`
5. `docs/recurring-build-issues-and-regression-watchlist.md`
6. `docs/builder-lessons-learned.md`
7. `docs/v52-v59-control-plane-build-plan.md`
