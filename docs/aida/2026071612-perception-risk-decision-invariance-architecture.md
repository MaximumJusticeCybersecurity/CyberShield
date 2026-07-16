# Perception Risk and Decision Invariance Architecture

Version timestamp: 2026071612
Owner and final human authority: Dr. Max Justice
Issue: #43
Status: Architect complete; Engineer / Forge remains blocked until owner acceptance

## 1. Architect verdict

**READY FOR BOUNDED SYNTHETIC ENGINEERING WITH CONDITIONS**

CyberShield may extend AIDA and the AI Trust Decision Record with Perception Risk and Decision Invariance as distinct assurance dimensions.  These dimensions must remain separate from Evidence Sufficiency, Confidence, Risk If Wrong, and truth.

The Anthropic Transformer Circuits paper is productively treated as model-specific evidence and engineering motivation.  It does not prove universal model behavior, consciousness, intent, biological equivalence, or that CyberShield can read model internals.

## 2. Product design thesis

CyberShield currently asks whether an AI recommendation is defensible based on claims, evidence, missing evidence, assumptions, contradictions, Risk If Wrong, confidence, candidate actions, and human review.

This architecture adds a second bounded question:

> Did the recommendation remain materially stable when presentation cues changed in ways that should not change the decision?

If a recommendation changes under harmless paraphrase, formatting, evidence ordering, delimiter, context-boundary, model, product, or harness variation, CyberShield does not automatically reject it.  It records the instability, raises review and evidence thresholds where warranted, and may reduce the strongest defensible action.

## 3. TDR schema delta

Add a top-level optional object to vNext records:

```json
"perception_assurance": {
  "perception_risk_finding": {},
  "latent_variable_records": [],
  "decision_invariance_profile": {},
  "mechanism_evidence_records": [],
  "strongest_defensible_action_after_perception": {},
  "required_human_review_after_perception": {},
  "limitations": []
}
```

Do not modify the protected production schema until this adapter passes synthetic tests, owner acceptance, and Aegis reconciliation.

## 4. PerceptionRiskFinding

Required fields:

- `finding_id`
- `record_id`
- `created_at`
- `task_class`
- `recommendation_under_review`
- `latent_variable_summary`
- `deterministically_computable_variables`
- `model_inferred_variables`
- `cue_sensitivity_summary`
- `context_pressure_status`
- `source_boundary_ambiguity`
- `instruction_boundary_ambiguity`
- `product_model_provider_harness_dependence`
- `hidden_mechanism_evidence_status`
- `perception_risk_level`
- `risk_if_perceived_wrong`
- `action_boundary_relevance`
- `recommended_review`
- `limitations`

Risk levels:

- low
- moderate
- high
- severe
- unknown

## 5. LatentVariableRecord

Required fields:

- `latent_variable_id`
- `claim_or_action_id`
- `variable_name`
- `classification`
- `evidence`
- `uncertainty`
- `sensitivity`
- `consequence_if_wrong`
- `could_be_deterministically_computed`
- `remediation`
- `human_review_required`

Allowed classifications:

- explicit_input
- deterministically_derived
- externally_measured
- model_inferred
- disputed
- unavailable
- not_applicable

## 6. DecisionInvarianceProfile

Required fields:

- `profile_id`
- `baseline_recommendation_id`
- `baseline_run_receipt_id`
- `perturbation_set_id`
- `perturbation_cases`
- `stable_conclusions`
- `unstable_conclusions`
- `changed_recommended_actions`
- `evidence_order_sensitivity`
- `representation_sensitivity`
- `context_boundary_sensitivity`
- `cross_model_sensitivity`
- `cross_harness_sensitivity`
- `unresolved_causes`
- `materiality_classification`
- `human_review_requirement`
- `strongest_defensible_action_after_instability`
- `limitations`

Materiality classifications:

- no_material_variation
- wording_variation_only
- explanation_variation_stable_action
- claim_level_instability
- evidence_interpretation_instability
- material_action_instability
- boundary_or_authority_instability
- inconclusive

## 7. Perturbation architecture

Phase 0 perturbations use synthetic recommendations and recorded outputs.

Supported perturbations:

- prompt paraphrase;
- evidence order;
- whitespace and line breaks;
- markdown, delimiter, and table/prose representation;
- irrelevant distractors;
- quoted-text location;
- source inclusion and removal;
- boundary-condition movement;
- model, product, provider, and harness changes;
- repeated runs where stochasticity is material.

Each perturbation case must record:

- what changed;
- what should have stayed invariant;
- whether semantic meaning changed;
- whether the model output changed;
- whether claims, evidence interpretation, action, or human review changed;
- why the change is or is not material.

## 8. Action policy

Perception instability changes the defensible action through rules, not a single score.

- Wording variation only: no action change.
- Explanation variation with stable action: disclose if useful; no automatic escalation.
- Claim-level instability: raise review and evidence checks for affected claims.
- Evidence-interpretation instability: require stronger evidence review or source normalization.
- Material action instability: reduce strongest defensible action unless independent evidence closes the gap.
- Boundary or authority instability: require human review and block external action.
- Inconclusive perturbation: treat as unresolved uncertainty, not as stability.

Human review does not cure missing evidence or unstable perception by itself.  It records accountability and next action.

## 9. TDR integration rules

The same canonical TDR object must support screen, JSON, print/PDF, and capture payloads.

Perception fields shall link to existing objects where possible:

- claims;
- evidence items;
- missing evidence;
- assumptions;
- contradictions;
- Risk If Wrong;
- confidence basis;
- Human Gate;
- Agent Work Receipt;
- Harness Run Receipt.

Do not duplicate trusted-agent spine semantics under new names.

## 10. Buyer-facing explanation

Approved bounded language:

> CyberShield tests whether an AI recommendation remains defensible when harmless changes in wording, formatting, source order, or model configuration are introduced.  It records what stayed stable, what changed, and what a human must review before acting.

Prohibited claims:

- CyberShield reads a model’s mind.
- CyberShield fully explains internal reasoning.
- Decision Invariance proves truth.
- Mechanistic evidence substitutes for evidence review.
- A stable answer is automatically safe to act upon.

## 11. Mechanism Evidence

Mechanism evidence is optional and bounded.

Required fields:

- method;
- model and provider scope;
- evidence produced;
- claim or instability addressed;
- assumptions;
- limitations;
- independence;
- authorization;
- timestamp.

Mechanism evidence cannot override missing evidence, source uncertainty, Risk If Wrong, or required human review.

## 12. Initial engineering package

After owner acceptance, Engineer / Forge may implement only:

1. perturbation schemas and deterministic synthetic fixtures;
2. Decision Invariance Profile schema and validator;
3. recorded-output synthetic recommendation runner;
4. TDR adapter behind an internal/QA path;
5. AIDA traceability and acceptance tests;
6. perception-risk summary rendering in JSON and internal report output;
7. no public route, production schema mutation, or buyer claim until separately approved.

## 13. Acceptance tests

- Semantically equivalent paraphrases with stable action classify as stable.
- Wording-only changes are not material instability.
- Evidence-order changes that reverse action are material.
- Delimiter or formatting changes that alter source authority are surfaced.
- Context truncation cannot be treated as complete review.
- Cross-model disagreement remains visible.
- Mechanism evidence cannot override missing evidence.
- Perception Risk remains separate from Confidence, Evidence Sufficiency, and Risk If Wrong.
- System may recommend no action, request evidence, defer, or stronger human review.
- No single score is represented as truth.
- Material action instability reduces or constrains strongest defensible action.
- Human review preserves accountability but does not manufacture evidence.

## 14. Dependencies

- Aegis issue #103 Model Perception Assurance architecture.
- AIDA requirements and governance from PR #42.
- Pilot vNext Trust Decision Record requirements.
- Harness Run Receipt and Failure Attribution architecture.

## 15. Traceability

- Perception Risk dimension maps to Issue #43 Required Requirements Delta 1.
- LatentVariableRecord maps to Delta 2.
- DecisionInvarianceProfile and PerturbationCase map to Delta 3.
- TDR schema delta maps to Delta 4.
- Action policy maps to Delta 5.
- Mechanism Evidence maps to Delta 6.
- Buyer language maps to Delta 7.

## 16. Unresolved owner decisions

No immediate owner decision is required for synthetic Phase 0 engineering.

Future owner decisions are required before:

- protected TDR schema mutation;
- public buyer-facing demonstration;
- using live customer, vendor, legal, or security data;
- cross-model live testing with paid providers;
- buyer claim publication;
- production route activation.
