# AIDA Perception Risk and Decision Invariance Requirements

Version timestamp: 2026071611  
Status: owner-approved Stage 1 requirements baseline  
Business requirements owner: Aegis / My AI Business Partner  
Architecture owner: Architect  
Implementation owner after architecture: Engineer / Forge  
Final authority: Dr. Max Justice

## 1. Team sequence

For this workstream, the active sequence is:

```text
Aegis / My AI Business Partner
→ Architect
→ Engineer / Forge
→ Dr. Max Justice
```

Aegis owns business analysis, research synthesis, truth reconciliation, hard requirements, CyberShield/AIDA integration, and learning.  Dynamic Truth and Learning and Improvement are not separate active team members.

No separate verifier team is required for the bounded requirements, architecture, synthetic fixture, local read-only, and non-production implementation phases under the owner’s direct authorization.  This does not silently authorize production deployment, credentials, public release, destructive action, or root-trust change.

## 2. Product objective

Extend AI Decision Assurance so CyberShield evaluates not only whether an AI-generated recommendation has sufficient evidence, but also whether the recommendation remains materially defensible when semantically irrelevant or equivalent presentation conditions change.

CyberShield shall answer:

- What did the AI system know explicitly?
- What did it have to infer?
- What variables could have been established deterministically or authoritatively?
- What harmless changes altered claims, evidence interpretation, or recommended action?
- Which findings remained invariant?
- What instability is material to the decision?
- What is the strongest defensible action after instability is considered?

## 3. AIDA doctrine additions

### PRDI-001 Perception Risk is distinct

Perception Risk shall remain separate from:

- Evidence Sufficiency;
- confidence;
- Risk If Wrong;
- source credibility;
- model reputation;
- provenance; and
- human-review status.

### PRDI-002 Stability is not truth

A stable recommendation is not automatically true.  An unstable recommendation is not automatically false.  Invariance evidence informs the reliability of the decision process.

### PRDI-003 Model neutrality

The core method shall work with closed, open, local, hosted, agentic, and future AI systems without requiring hidden weights, activations, chain of thought, or proprietary interpretability interfaces.

### PRDI-004 Action materiality

CyberShield shall focus on whether perturbations change the claim set, evidence interpretation, Risk If Wrong, required human authority, or strongest defensible action, not whether wording is identical.

### PRDI-005 No universal score

CyberShield shall not collapse Perception Risk and Decision Invariance into one universal trust score.

### PRDI-006 Human authority

Decision invariance testing may recommend stronger review, more evidence, deferral, rejection, or no action.  It shall not replace the accountable human decision.

## 4. Perception Risk analysis

The Perception Risk analysis shall consider, as applicable:

- variables required by the recommendation but absent from the input;
- variables inferred by the model;
- variables that could be deterministically derived;
- variables requiring authoritative external evidence;
- source and instruction boundary ambiguity;
- quoted text that may be mistaken for authority;
- formatting, ordering, delimiter, table/prose, and representation sensitivity;
- context-window pressure, truncation, omission, or retrieval gaps;
- hidden or product-managed context;
- model, provider, product, tokenizer, tool, and harness dependence;
- task familiarity and naturalness for the model;
- stochastic variability;
- evidence-order and source-removal sensitivity;
- consequences if the system perceived the task incorrectly.

### PRDI-007 Perception Risk finding

The finding shall include:

- finding ID and version;
- recommendation and record references;
- identified perception dependencies;
- unresolved assumptions;
- material cues and boundaries;
- tested and untested conditions;
- consequence if wrong;
- required remediation;
- required human review;
- strongest defensible action impact;
- model, product, provider, harness, and source versions;
- provenance and digest.

### PRDI-008 Unknown is preserved

Unknown hidden context or unavailable mechanism evidence shall remain unknown, not be inferred absent.

## 5. Latent Variable Assurance Record

CyberShield shall link each consequential recommendation to a Latent Variable Assurance Record containing:

- variable ID and name;
- purpose in the decision;
- classification: explicit input, deterministically derived, externally measured, model inferred, disputed, unavailable, or not applicable;
- source or derivation evidence;
- uncertainty basis;
- temporal validity and freshness;
- sensitivity to formatting, ordering, model, product, provider, harness, or context;
- linked claims and evidence;
- consequence if wrong;
- remediation and review requirement;
- digest and provenance.

### PRDI-009 Required-variable completeness

Every variable required to justify the recommendation shall be represented or explicitly marked unavailable.

### PRDI-010 No inference laundering

Cross-model agreement shall not convert an inferred variable into a fact.

### PRDI-011 Deterministic improvement opportunity

Where an inferred variable can be replaced with a deterministic calculation or authoritative source, CyberShield shall identify that improvement.

## 6. Controlled perturbation requirements

The Decision Invariance method shall support, where relevant:

- semantically equivalent prompt paraphrases;
- evidence-order changes;
- whitespace and line-break changes;
- markdown and delimiter changes;
- table versus prose representation;
- quoted-text relocation;
- irrelevant distractor insertion;
- source inclusion and removal;
- boundary-condition changes;
- repeated stochastic runs;
- model changes;
- product or provider changes;
- harness and Context Pack changes;
- context-pressure and truncation tests.

### PRDI-012 Perturbation contract

Each perturbation shall state:

- the semantic property intended to remain constant;
- the variable intentionally changed;
- the expected non-material range;
- the exact input digest;
- the model/product/harness profile;
- the run budget and stop condition.

### PRDI-013 Immutable baseline

The baseline recommendation, evidence packet, source set, model/product/harness profile, and output shall be immutable and digest-bound.

### PRDI-014 Bounded testing

Perturbation testing shall have explicit limits for run count, time, cost, model set, retained data, and escalation.

### PRDI-015 No answer shopping

The system shall not repeat runs until a preferred recommendation appears.

### PRDI-016 Preserve negative results

Failed, contradictory, unstable, and rejected runs shall remain part of the Decision Invariance evidence.

## 7. Decision Invariance Profile

The typed profile shall include:

- profile ID and version;
- baseline recommendation and Trust Decision Record references;
- exact perturbation set and versions;
- exact model, product, provider, tools, harness, and Context Pack references;
- stable claims;
- unstable claims;
- stable evidence interpretations;
- changed evidence interpretations;
- stable recommended actions;
- changed recommended actions;
- authority or human-review changes;
- context and truncation findings;
- unresolved cause classification;
- materiality classification;
- strongest defensible action;
- required additional evidence;
- required human review;
- limitations and untested conditions;
- receipts, provenance, and digests.

### PRDI-017 Materiality classes

CyberShield shall distinguish:

1. immaterial wording variation;
2. explanation variation with stable claims and action;
3. claim-level instability;
4. evidence-interpretation instability;
5. material recommended-action instability;
6. authority or action-boundary instability.

### PRDI-018 Action consequence

Material recommended-action instability shall raise the evidence threshold and review requirement and may reduce the strongest defensible action.

### PRDI-019 Cross-model disagreement

Cross-model disagreement shall be preserved and explained, not averaged into consensus.

## 8. AI Trust Decision Record integration

Subject to Architect schema review, the Trust Decision Record shall reference or include:

- Perception Risk finding;
- Latent Variable Assurance Record references;
- Decision Invariance Profile reference;
- tested perturbation classes;
- invariant findings;
- unstable findings;
- action changes observed;
- evidence-order sensitivity;
- representation sensitivity;
- context-boundary sensitivity;
- cross-model and cross-harness sensitivity;
- unresolved perception assumptions;
- required human review;
- strongest defensible action after instability;
- limitations and untested conditions.

### PRDI-020 Additive protected-schema approach

The Architect shall prefer a versioned additive adapter or linked record before mutating the protected canonical Trust Decision Record schema.

### PRDI-021 No backward laundering

A historical Trust Decision Record shall not be treated as current precedent unless domain similarity, evidence freshness, model/harness relevance, and unresolved contradictions are checked.

## 9. Optional Mechanism Evidence

Where available and authorized, CyberShield may attach:

- attribution graphs;
- probes;
- subspace interventions;
- ablations;
- feature or manifold evidence;
- provider telemetry;
- internal evaluation reports.

### PRDI-022 Mechanism Evidence boundary

Mechanism Evidence shall:

- remain distinct from truth, provenance, and authorization;
- identify model and method scope;
- identify assumptions and reconstruction limits;
- never be mandatory for closed models;
- never override missing external evidence;
- never imply access to hidden chain of thought.

## 10. User experience requirements

The buyer and accountable user shall see:

- what the model was explicitly told;
- what it had to infer;
- what remained stable;
- what changed;
- why the change matters;
- whether the recommended action changed;
- what evidence is still missing;
- what a human must review;
- the strongest defensible action.

### PRDI-023 Executive language

The primary explanation shall be concise and legible to an executive without obscuring detailed evidence.

### PRDI-024 No mind-reading claim

CyberShield shall not claim to read a model’s mind, expose complete internal reasoning, or prove consciousness.

### PRDI-025 Candidate buyer language

AIDA may use the following controlled language after review:

> CyberShield tests whether an AI recommendation remains defensible when harmless changes in wording, formatting, source order, or model configuration are introduced.  It records what stayed stable, what changed, and what a human must review before acting.

## 11. AIDA feature traceability

The Architect shall trace this capability to:

- AIDA principles;
- buyer pain: inconsistent or brittle AI recommendations;
- accountable users: CISO, CFO, compliance leader, vendor-risk leader, executive sponsor, and decision owner;
- business outcome: fewer unsupported actions and more defensible review;
- Trust Decision Record elements;
- measurable acceptance criteria;
- model-neutral implementation;
- no-action and human-authority options.

## 12. Initial Engineer phases after architecture

### Phase 0: schemas and synthetic fixtures

- Perturbation Contract schema and validator.
- Latent Variable Assurance Record schema and validator.
- Perception Risk finding schema and validator.
- Decision Invariance Profile schema and validator.
- Synthetic recommendation/evidence fixtures.
- No live model requirement for core validation.
- No protected-schema mutation.

### Phase 1: recorded-output comparison

- Import approved recorded outputs.
- Compare claims, evidence references, materiality, and action class.
- Generate synthetic profiles and Trust Decision Record adapter objects.
- Preserve negative and contradictory results.

### Phase 2: approved model execution

- Execute bounded perturbation runs with exact model/product/harness records.
- Enforce time, cost, count, and stop budgets.
- Produce complete receipts.
- No production action or autonomous disposition.

### Phase 3: controlled product demonstration

- Integrate the approved adapter into a synthetic CyberShield workflow.
- Publish only after separate owner approval.
- Clearly label synthetic data and non-production status.

## 13. Minimum acceptance tests

1. Perception Risk remains separate from confidence, Evidence Sufficiency, and Risk If Wrong.
2. Equivalent paraphrases with stable action are classified as stable.
3. Wording-only changes are not treated as material instability.
4. Evidence-order changes that reverse the action are surfaced as material.
5. Delimiter or formatting changes that alter source authority are surfaced.
6. Context truncation cannot be reported as full evidence review.
7. Unknown hidden context remains unknown.
8. Cross-model disagreement is preserved.
9. Mechanism Evidence cannot override missing evidence.
10. Model agreement cannot turn inference into fact.
11. Material action instability raises evidence and review requirements.
12. A protected-schema adapter is versioned and backward compatible.
13. Perturbation budgets and stop conditions are enforced.
14. Negative results remain auditable.
15. No single score is represented as truth.
16. No runtime, public release, external action, or production claim occurs without separate authorization.

## 14. Stage 1 definition of done

Stage 1 is complete when:

- this requirements baseline is merged;
- the CyberShield application note is merged;
- the Architect handoff is merged;
- issue #43 points to the exact package;
- the Architect may begin the architecture delta;
- Engineer / Forge remains blocked until architecture acceptance.

## 15. Current operational truth

At this baseline:

- requirements exist;
- Aegis is the active business, research-synthesis, truth-reconciliation, and learning owner;
- Perception Risk architecture is pending;
- Decision Invariance architecture is pending;
- the canonical Trust Decision Record schema is unchanged;
- no perturbation runner is operational;
- no model execution is authorized by this package;
- no public demonstration or production feature is implemented.