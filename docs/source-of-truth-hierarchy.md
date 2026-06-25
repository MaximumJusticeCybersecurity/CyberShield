# CyberShield Source-of-Truth Hierarchy

Version timestamp: 2026062312  
Status: active repository governance

## Purpose

Prevent product, route, content, and requirements drift by defining which source controls when files, delayed feedback, or earlier build plans disagree.

## Source-of-truth order

When sources conflict, use this hierarchy:

1. Current explicit owner decision recorded against the current repository and product state.
2. Current security, trusted-authority, human-agency, legal, and claims boundaries.
3. `governance-summary.json`.
4. Task-specific Requirements Steward packet.
5. `docs/2026062312-trust-led-customer-action-content-requirements.md` for customer-facing content and conversion.
6. `docs/2026062312-feedback-currency-and-requirement-supersession.md` for delayed feedback and supersession.
7. `AGENTS.md`, `README.md`, and `bots.txt`.
8. Current dated product and implementation requirements under `docs/`.
9. Route and release manifests describing actual current behavior.
10. Builder logs, historical plans, live code, and preserved legacy routes.

A chat message matters when it is current owner direction, but it must be recorded in the repository before future builders treat it as durable authority.

## Feedback currency rule

Do not use arrival date alone to decide which feedback wins.

For material feedback, record:

   - Date originally expressed.
   - Date received or recovered.
   - Build, route, or artifact reviewed.
   - Exact baseline commit.
   - Current-state comparison.
   - Accept, constrain, defer, reject, supersede, or request owner clarification.

A durable buyer insight may be accepted while its suggested feature, route, or positioning is rejected as stale.

## Reconciliation rule

If active sources conflict, stop before implementation and create a supersession record.

Do not:

   - Build new features on conflicting metadata.
   - Restore TrustMap-first or runtime-first scope merely because an older document says so.
   - Rewrite historical documents to conceal prior decisions.
   - Treat a proposal such as exact pilot price or delivery timing as approved fact.

## Current effective content direction

As of 2026062312:

```text
AI-generated recommendation in -> defensible AI Trust Decision Record out
```

Primary customer action:

```text
Challenge One AI Recommendation
```

First proof point: vendor risk.

Commercial next step: a controlled 3-to-5 recommendation advisory pilot.

Exact pricing and delivery timing require separate owner approval.

## Required reconciliation checks

Before content or conversion work, verify:

   - Current product direction agrees across governance and requirements.
   - The primary CTA is consistent across landing, demo, report, pilot, MJC site, and funnel.
   - Public pages do not expose internal route, build, capture, or QA language.
   - Value appears before unnecessary data capture.
   - Prototype and advisory limitations remain clear.
   - No older TrustMap-first, broad-demo, or runtime-first document is being treated as current primary scope.
   - Pricing, timeline, proof, and credibility claims are approved and verifiable.

## Builder rule

The repository is institutional memory.  History is preserved, current authority is explicit, and conflicting feedback requires a recorded decision before implementation.
