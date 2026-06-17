# 2026061721 CyberShield Architect and Engineer Instructions

Date: 2026-06-17

Status: Approved builder instruction set, confirmed by Dr. Max Justice on 2026061722

## Purpose

This instruction set tells the CyberShield architect or engineer exactly how to apply the latest Aegis, Nate B. Jones, Catie Cuan, Simon Sinek / Ethan Mollick, and maintenance-layer requirements.

## Product boundary

CyberShield is not Aegis.

CyberShield is the commercial proof point for AI Decision Assurance.

Current wedge:

```text
AI-generated recommendation in -> defensible AI Trust Decision Record out
```

Near-term expansion allowed:

```text
AI Trust Decision Record + Harness Health Assessment
```

Do not broaden the first demo into the full Aegis architecture.

## Architect instructions

The architect must preserve these product boundaries:

1. Keep the first buyer-facing flow focused on vendor-risk, security-risk, or compliance decision assurance.
2. Do not add general-purpose agents.
3. Do not add autonomous enforcement.
4. Do not add live monitoring claims unless implemented.
5. Do not add production integrations unless explicitly scoped.
6. Do not turn CyberShield into Aegis.
7. Treat Aegis as doctrine and source architecture, not as product UI.

## Required architecture layers

Map every material feature to these layers:

   - Input / source layer
   - Evidence layer
   - Decision layer
   - Human legibility layer
   - Meaningful human authority layer
   - Harness health layer
   - Risk taxonomy layer
   - Export / ATDR layer
   - Boundary / overclaim layer
   - Builder traceability layer

## Engineer implementation order

Implement in this order:

1. Add or update ATDR schema fields for human legibility and harness health.
2. Add deterministic enums before model-driven scoring.
3. Add risk taxonomy entries.
4. Add UI sections that explain the decision in executive language.
5. Add export text to the AI Trust Decision Record.
6. Add smoke tests for required fields.
7. Update traceability and builder logs.
8. Only then consider scoring refinement, richer UI, or future integrations.

## Required ATDR fields

Add or confirm fields for:

   - decision_owner
   - human_legibility_summary
   - human_authority_status
   - approval_meaningfulness
   - facts
   - assumptions
   - inferences
   - recommendations
   - uncertainty_notes
   - challenge_test_status
   - challenge_findings
   - sycophancy_risk
   - generic_ai_output_risk
   - human_agency_risk
   - harness_health_score
   - source_status
   - permission_scope
   - job_classification
   - proof_trail
   - value_status
   - next_human_action

## Required risk taxonomy additions

Add or confirm:

   - stale source risk
   - overbroad permission risk
   - weak proof risk
   - model improved but harness did not
   - workflow changed but documentation did not
   - silent job drift
   - unsafe self-modification
   - tool bloat risk
   - opaque recommendation risk
   - ceremonial approval risk
   - AI sycophancy / over-agreement risk
   - generic AI output risk
   - human agency erosion risk
   - unsupported polish risk

## Required UI language

The UI should answer:

   - What did AI influence?
   - What evidence supports it?
   - What assumptions remain?
   - What was checked?
   - What was not checked?
   - What can the human approve, reject, or escalate?
   - What is the risk if wrong?
   - What happens next?

## Acceptance tests

A build passes only if:

   - A vendor-risk ATDR can be completed end to end
   - The ATDR includes Human Legibility and Harness Health sections
   - The export includes decision owner, assumptions, proof, challenge status, and next human action
   - The UI flags overclaim, generic AI output, ceremonial approval, and overbroad reach where applicable
   - No live capability is claimed unless implemented
   - Builder handoff tells the next engineer exactly what changed and what remains

## Prohibited work under this instruction set

Do not implement:

   - General AI agent workflows
   - Autonomous agent authority
   - Live enforcement
   - Live production monitoring
   - External communications
   - Spending authority
   - Legal or financial action automation
   - Hidden model calls
   - Claims that CyberShield can inspect live AI systems unless implemented

## Builder note

The next build should be named:

```text
2026061722-human-legibility-atdr-fields
```

First coding target:

```text
Add deterministic ATDR fields and UI/export language for Human Legibility, Meaningful Human Authority, Challenge-Tested status, Sycophancy Risk, Generic AI Output Risk, Harness Health, and Next Human Action.
```

## Binding rule

Do not make CyberShield more impressive by making it less true.

Make the AI-influenced decision legible, reviewable, bounded, and accountable.
