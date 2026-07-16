# Architect Handoff: Perception Risk and Decision Invariance

Version timestamp: 2026071611  
Status: Architect-ready after requirements merge  
Requirements owner: Aegis / My AI Business Partner  
Architecture owner: Architect  
Implementation owner after acceptance: Engineer / Forge  
Final authority: Dr. Max Justice

## Controlling inputs

1. `docs/aida/2026071611-perception-risk-and-decision-invariance-requirements.md`
2. `docs/aida/2026071611-model-perception-research-application-note.md`
3. `docs/aida/trust-decision-record-standard-v0.1.md`
4. `docs/aida/decision-assurance-playbook-v0.1.md`
5. Current Pilot vNext Trust Decision Record requirements and architecture.
6. Aegis Model Perception Assurance package merged through Aegis PR #105.

## Required Architect decision

Return one of:

- `READY FOR ENGINEERING`
- `READY FOR ENGINEERING WITH CONDITIONS`
- `NOT READY FOR ENGINEERING`

The verdict must bind to the exact requirements commit and architecture candidate.

## Required deliverables

1. Perception Risk logical model and boundary with Evidence Sufficiency, confidence, Risk If Wrong, provenance, and human review.
2. Latent Variable Assurance Record schema.
3. Perturbation Contract schema.
4. Decision Invariance Profile schema.
5. Perception Risk Finding schema.
6. Additive Trust Decision Record adapter or versioned schema strategy.
7. Materiality classification and strongest-defensible-action rules.
8. Model, provider, product, harness, Context Pack, source, and run identity model.
9. Baseline immutability, digest, replay, retention, and negative-result handling.
10. Bounded perturbation runner architecture with count, cost, time, and stopping budgets.
11. Cross-model disagreement handling without truth-by-consensus.
12. Unknown hidden-context and unavailable-mechanism handling.
13. Optional Mechanism Evidence attachment model.
14. Buyer-facing and executive-view design.
15. Synthetic fixture and test catalog.
16. Backward compatibility, migration, rollback, and decommissioning plan.
17. Exact requirement-to-component and requirement-to-test traceability.
18. Phased Engineer package beginning with schemas and deterministic synthetic fixtures.
19. Explicit unresolved decisions that materially require Dr. Max Justice.
20. Operational-status table distinguishing requirements, architecture, implementation, tested capability, demonstration, deployment, and production use.

## Architecture constraints

- Preserve model and vendor neutrality.
- Do not require access to hidden chain of thought or proprietary internals.
- Do not collapse Perception Risk, invariance, confidence, Evidence Sufficiency, or Risk If Wrong into one score.
- Do not average cross-model disagreement into truth.
- Do not mutate the protected canonical Trust Decision Record schema without a versioned migration and owner decision.
- Prefer an additive linked record or adapter for the first implementation.
- Preserve no-action, defer, request-evidence, reject, modify, accept, and escalate paths where applicable.
- No runtime implementation in the Architect issue.
- No public claim or demonstration without separate owner approval.

## Engineer gate

Engineer / Forge shall not begin until:

- the Architect verdict is accepted;
- schemas and trust boundaries are explicit;
- the test plan and synthetic fixtures are defined;
- rollback and compatibility are defined;
- unresolved owner decisions are closed or deliberately deferred.

## Current truth

The requirements exist.  Architecture and implementation do not yet exist.  The canonical Trust Decision Record schema and current runtime remain unchanged.