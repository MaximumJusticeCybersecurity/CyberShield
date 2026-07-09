# CyberShield Pilot vNext Architect Pre-Review Questions and Proposed Answers

Version timestamp: 2026070913  
Status: requirements-steward architecture preflight; not the designated Architect's verdict  
Prepared by: Aegis / My AI Business Partner  
Owner: Dr. Max Justice

## Authority notice

This document gives the Requirements Steward's preliminary architecture analysis so the designated Architect can challenge a concrete proposal.  It does not satisfy the Architect gate, authorize engineering, or replace the Architect response required by `docs/2026070913-pilot-vnext-architect-gate-and-handoff.md`.

## Preliminary conclusion

`PROCEED TO ARCHITECT REVIEW`

The proposed vNext direction is aligned with CyberShield's existing product pivot and appears implementable without rebuilding the product around TrustMap, multi-agent orchestration, or a dashboard.  The designated Architect must confirm, revise, or reject that conclusion against the exact candidate.

The current repository already contains:

- a working vendor-risk golden path;
- claim, evidence, validator, candidate-action, risk, confidence, and human-review structures;
- a Trust Decision Record mapper;
- a reusable Context Pack, Source, Missing Evidence, Human Gate, and Agent Work Receipt spine; and
- export and report paths.

The proposed architecture work is not a new product.  It is normalization of the current vendor-risk implementation into a domain-neutral Trust Decision Record core while preserving the current demonstration.

## Question 1: Is the Trust Decision Record schema complete?

Preliminary answer: not yet.

The existing schema is strong for the vendor-risk prototype but is incomplete as a universal decision-assurance record.  The vNext schema should add or strengthen:

- recommendation context and intended action;
- originating AI, model, provider, and supplied confidence when known;
- schema, rule, analysis, prompt, and domain-adapter versions;
- record status and lifecycle;
- claim materiality and claim-level risk;
- evidence provenance, locator, authorship, retrieval time, independence, authenticity, and digest;
- structured Missing Evidence;
- structured Assumptions;
- structured Contradictions and Unknowns;
- evidence sufficiency separate from confidence;
- confidence basis and change conditions;
- category-specific Risk If Wrong;
- candidate-action comparison;
- Strongest Defensible Action;
- review level separate from decision outcome;
- human decision and override;
- conditions, expiration, reassessment triggers, and residual risk;
- limitations and operational-status disclosure; and
- audit events and export history.

The existing vendor-specific identity fields may remain in a domain extension but should not be required in the universal core.

## Question 2: Can the workflow be implemented cleanly with the current architecture?

Preliminary answer: yes, with an additive refactor, subject to Architect confirmation.

Proposed architecture:

```text
RecommendationInput
-> Domain Classifier
-> Claim and Assumption Extractor
-> Evidence Normalizer and Provenance Mapper
-> Claim-Evidence Graph
-> Missing Evidence and Contradiction Analysis
-> Risk If Wrong Engine
-> Evidence Sufficiency and Confidence Engine
-> Candidate Action Comparator
-> Review Router
-> Trust Decision Record Assembler
-> Human Gate
-> Export and Audit
```

Proposed reuse:

- `src/atdr/trust-decision-record-schema-mapper.js`
- `src/atdr/trusted-agent-spine.js`
- `src/agent-spine/reusable-agent-spine.js`
- current vendor-risk data and validators
- current preferred and fallback routes
- current print and JSON export patterns

Proposed refactor:

- remove hard-coded `decision_domain: vendor_risk` from the universal mapper;
- move vendor name, vendor dependency, SOC 2, subprocessor, and DPA concepts into a vendor-risk domain adapter;
- define one domain-neutral core record;
- retain domain-specific extensions under a controlled `domain_extension` object;
- add typed Assumption, Contradiction, RiskCategory, ConfidenceAssessment, ReviewRequirement, and AuditEvent objects;
- separate `cyberShield_recommended_action` from `human_decision` and `override_event`; and
- make the current static deterministic workflow one approved adapter rather than the universal logic.

## Question 3: What data-model changes are needed?

### Proposed new or normalized objects

1. `RecommendationInput`
2. `DecisionContext`
3. `Claim`
4. `EvidenceItem`
5. `MissingEvidence`
6. `Assumption`
7. `Contradiction`
8. `RiskIfWrongAssessment`
9. `EvidenceSufficiencyAssessment`
10. `ConfidenceAssessment`
11. `CandidateAction`
12. `ReviewRequirement`
13. `HumanDecision`
14. `OverrideEvent`
15. `AuditEvent`
16. `TrustDecisionRecord`

### Proposed relationship rules

- Claims link to evidence, missing evidence, assumptions, contradictions, risk, and candidate actions.
- Evidence links to sources and claims.
- Missing evidence identifies the blocked claim and closure condition.
- Risk is linked to the intended action, not only to the recommendation text.
- Confidence is computed from claim and evidence states, not from rhetorical polish.
- Review requirement is derived from risk, action, evidence sufficiency, domain, and policy.
- Human decision remains a separate accountable event.

## Question 4: What should be deterministic versus LLM-generated?

### Proposed deterministic behavior

- schema and input validation;
- required-field enforcement;
- controlled vocabularies;
- IDs, timestamps, versions, and digests;
- evidence and claim relationship validation;
- source and synthetic-data labels;
- minimum evidence requirements by domain adapter;
- evidence-sufficiency gates;
- confidence ceilings for unsupported material claims;
- Risk If Wrong severity and review routing rules;
- candidate-action eligibility;
- Strongest Defensible Action constraints;
- Human Gate triggers;
- prohibited claims and actions;
- record completeness;
- export validation; and
- audit events.

### Proposed LLM-assisted behavior

- claim extraction;
- assumption extraction;
- possible contradiction identification;
- evidence summarization;
- claim normalization;
- clarification-question generation;
- rationale drafting; and
- executive summary generation.

### Proposed hybrid behavior

- claim materiality;
- evidence relevance;
- contradiction severity;
- confidence explanation;
- recommended conditions; and
- candidate-action ranking.

Hybrid functions should use LLM assistance but remain bounded by deterministic rules, source links, and accountable review.

## Question 5: How do we preserve auditability?

Pilot 1 should preserve:

- immutable original recommendation text;
- input and source timestamps;
- source locators and digests;
- schema version;
- domain-adapter version;
- analysis engine version;
- model and provider version when used;
- prompt or template version when used;
- deterministic rule-set version;
- every material record change;
- every human decision and override;
- candidate-action comparison;
- failed validations and missing evidence;
- export time and format;
- synthetic or demonstration evidence labels;
- record status history; and
- responsible actor.

For the static pilot, a local append-only event array and deterministic digest appear acceptable as a prototype audit substitute.  They shall not be described as protected audit, cryptographic attestation, or non-repudiation.

## Question 6: What can be built fastest for a credible pilot?

The preliminary recommendation is an additive vNext layer over the current vendor-risk workflow.

### P0: Before Sandeep presentation

- place the vNext requirements, schema, preflight, and briefing into an Architect-review pull request;
- preserve the current working vendor-risk route;
- use the existing synthetic evidence and record rendering;
- explain the corrected review and confidence model;
- show one defensible record; and
- disclose that domain-neutral vNext implementation is pending Architect and owner approval.

### Proposed P1 after Architect and owner approval

1. Add a universal Recommendation Input object.
2. Add the vNext Trust Decision Record schema.
3. Map the current vendor-risk workflow into the vNext schema.
4. Add structured assumptions and contradictions.
5. Add category-level Risk If Wrong.
6. Add Evidence Sufficiency and Confidence Assessment objects.
7. Add corrected Review Requirement and Decision Outcome vocabularies.
8. Add Strongest Defensible Action.
9. Add Human Decision and Override.
10. Render and export the vNext record.
11. Add deterministic regression and abuse tests.

This would produce a credible vNext without a new dashboard, new agent system, live retrieval, or a second complete domain adapter.

## Question 7: What should be deferred?

Preliminary deferrals:

- TrustMap as the pilot surface;
- multi-agent orchestration;
- agent society modeling;
- cross-agent trust propagation;
- runtime autonomous action;
- automatic approval;
- live enterprise connectors;
- generalized compliance mapping;
- heavy analytics;
- enterprise graph or trust fabric;
- broad dashboarding;
- model marketplace behavior;
- production authentication, tenancy, Policy Gate, verifier quorum, or protected audit claims;
- multiple fully implemented domain adapters before the vendor-risk vNext mapping passes; and
- generic numeric trust scores.

## Principal architecture risks for Architect review

### 1. Generality without evidence depth

Allowing any recommendation input may create the impression that every domain is equally validated.

Proposed control: disclose the domain adapter, evidence template, and generic-analysis limitations.

### 2. AI judging AI objection

A second model opinion is not independent proof.

Proposed control: show source-linked evidence, deterministic rules, explicit uncertainty, and human accountability.

### 3. Confidence and consequence collapse

Combining confidence with Risk If Wrong creates misleading outputs.

Proposed control: keep epistemic confidence, evidence sufficiency, consequence, action threshold, and review separate.

### 4. Review as false assurance

A required human review does not cure missing evidence.

Proposed control: preserve missing evidence and action blocks after escalation.

### 5. Overloaded executive record

A universal schema can overwhelm the five-minute experience.

Proposed control: progressive disclosure.  Page one is the Executive Decision Brief; structured detail remains available for auditors.

### 6. Historical schema fragmentation

Multiple record contracts may drift.

Proposed control: make vNext the universal core, preserve historical records, and map prior vendor-risk records through a versioned migration adapter.

## Recommended next decision

Submit this exact candidate to the designated Architect.

Preserve the current vendor-risk golden path for tomorrow's presentation.

Do not authorize Forge or another engineer until the Architect returns `READY FOR ENGINEERING` or `READY FOR ENGINEERING WITH CONDITIONS`, Aegis reconciles the result, and Dr. Max Justice accepts the exact revised candidate.

## Preflight conclusion

CyberShield appears to need one cleaner record contract, not more surface area.  The Architect should test that premise against the current code, migration risk, schema complexity, and acceptance criteria.

The proposed differentiator is not that another AI gives an opinion.  The proposed differentiator is that CyberShield forces the recommendation, evidence, assumptions, consequence, confidence, oversight, and human decision into one defensible chain.