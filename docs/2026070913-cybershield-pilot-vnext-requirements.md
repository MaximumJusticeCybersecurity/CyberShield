# CyberShield Pilot vNext Requirements

Version timestamp: 2026070913  
Status: controlling Pilot vNext requirements baseline  
Owner: Dr. Max Justice  
Requirements steward: Aegis / My AI Business Partner  
Audience: Architect, Requirements Steward, Forge, Decision Assurance Implementer Agent, Aegis, Security Agent, reviewers, and presentation stakeholders

## 1. Mission

CyberShield determines whether an AI-generated recommendation is trustworthy enough to act upon.

CyberShield does not replace the originating AI.  CyberShield evaluates the recommendation, evidence, assumptions, contradictions, consequence, confidence, and required oversight before action.

The primary output is a Trust Decision Record that a human, executive, auditor, or regulator can understand and defend.

## 2. North Star

CyberShield succeeds when an executive can answer:

> I understand why this AI recommendation should or should not be trusted, what evidence supports that judgment, what remains uncertain, what could happen if it is wrong, and who must decide before action.

## 3. Product contract

```text
AI Recommendation In
-> Recommendation Context
-> Material Claims
-> Evidence and Provenance
-> Missing Evidence
-> Assumptions and Contradictions
-> Risk If Wrong
-> Confidence and Evidence Sufficiency
-> Strongest Defensible Action
-> Human Review Requirement
-> Human Decision and Override
-> Trust Decision Record Out
```

The record is the product.

## 4. Pilot use case

Pilot vNext shall accept one AI-generated recommendation at a time.

Initial recommendation domains:

- Security
- Compliance
- Vendor risk
- Architecture
- Policy
- Business

The system shall classify the recommendation domain and disclose whether a domain-specific evidence adapter exists.

A generic recommendation may still be analyzed for claims, assumptions, evidence gaps, contradictions, confidence, and consequence.  The system shall not imply domain-specific validation when only generic analysis was performed.

## 5. Required input

The minimum input shall include:

- original AI-generated recommendation;
- intended action or decision the recommendation would support;
- decision context;
- decision owner, if known;
- originating AI or source, if known;
- evidence supplied with the recommendation, if any; and
- applicable deadline or urgency, if material.

Optional input may include:

- source documents;
- policies;
- contracts;
- technical evidence;
- prior decisions;
- reviewer notes;
- regulatory or framework references; and
- organization-specific risk tolerance.

Unknown values shall remain unknown rather than being invented.

## 6. Required workflow

1. Ingest the AI recommendation and decision context.
2. Preserve the original recommendation unchanged.
3. Classify the recommendation domain and intended action.
4. Extract material claims.
5. Classify each claim by type and materiality.
6. Identify supporting evidence and source provenance.
7. Link evidence to the claims it supports or contradicts.
8. Identify missing, stale, weak, irrelevant, self-attested, dependent, or contradictory evidence.
9. Identify explicit and implicit assumptions.
10. Identify material contradictions and unresolved unknowns.
11. Classify Risk If Wrong by category, severity, likelihood, affected parties, and reversibility.
12. Assess evidence sufficiency.
13. Assess confidence and explain the basis.
14. Compare candidate actions.
15. Determine the Strongest Defensible Action.
16. Determine required human review and accountable roles.
17. Produce one canonical Trust Decision Record.
18. Preserve the final human decision separately from the CyberShield recommendation.
19. Preserve any override, conditions, residual risk, and follow-up obligations.

## 7. Trust Decision Record required sections

### 7.1 Record identity and audit context

- record ID;
- schema version;
- created timestamp;
- last modified timestamp;
- record status;
- recommendation domain;
- intended action;
- decision owner;
- originating AI or source;
- model or provider information, if known;
- analysis engine version;
- rule-set version;
- prompt or template version, if an LLM was used;
- source and record digests where available; and
- synthetic, demonstration, or production-data labels.

### 7.2 Recommendation under review

- original recommendation;
- decision context;
- intended action;
- originating rationale, if supplied;
- stated confidence, if supplied by the originating AI; and
- known limitations of the input.

### 7.3 Material claims

Each material claim shall include:

- claim ID;
- original text;
- normalized claim;
- claim type;
- materiality;
- required evidence;
- linked supporting evidence;
- linked contradictory evidence;
- evidence status;
- confidence basis;
- Risk If Wrong; and
- unsupported leap indicator.

### 7.4 Evidence and provenance

Each evidence item shall include:

- evidence ID;
- title or description;
- source locator;
- source type;
- author or provider;
- publication or creation date;
- retrieval date;
- freshness;
- relevance;
- scope;
- independence;
- authenticity status, when known;
- synthetic-data flag;
- affected claims;
- support or contradiction status;
- evidence summary;
- limitations; and
- content digest when available.

### 7.5 Missing evidence

Each missing-evidence item shall include:

- missing-evidence ID;
- affected claim;
- evidence needed;
- why it matters;
- severity of the gap;
- whether the gap blocks action;
- who should provide it;
- suggested next step; and
- closure condition.

### 7.6 Assumptions

Each assumption shall include:

- assumption ID;
- assumption statement;
- explicit or inferred status;
- affected claims and actions;
- support status;
- consequence if false;
- test or evidence required; and
- disposition.

### 7.7 Contradictions and unknowns

The record shall identify:

- conflicting evidence;
- conflicting claims;
- inconsistent scope or dates;
- source dependence or circular reporting;
- unresolved identity or entity ambiguity;
- unknown material facts; and
- whether the contradiction changes the recommended action.

### 7.8 Risk If Wrong

Risk If Wrong shall be assessed separately from confidence.

Required categories:

- Security
- Compliance
- Financial
- Operational
- Reputational
- Privacy or data protection
- Legal or contractual
- Safety or human impact
- Other material consequence

Each applicable category shall include:

- severity;
- likelihood or exposure basis;
- affected parties;
- reversibility;
- time to harm;
- containment or rollback options;
- residual risk; and
- uncertainty.

### 7.9 Evidence sufficiency

Evidence sufficiency shall be recorded separately from confidence using:

- Sufficient
- Partially sufficient
- Insufficient
- Contradicted
- Unknown

The explanation shall identify which claims meet or fail the evidence threshold.

### 7.10 Confidence assessment

Confidence shall not be shown as a score alone.

Required confidence bands:

- High confidence
- Moderate confidence
- Low confidence
- Unknown confidence
- Contradicted
- Insufficient support

Confidence shall consider:

- evidence strength;
- source independence;
- evidence freshness;
- evidence relevance;
- evidence completeness;
- claim-evidence linkage;
- unsupported assumptions;
- contradictory information;
- source dependence;
- domain-adapter maturity;
- analysis limitations; and
- unresolved unknowns.

Risk If Wrong shall not directly change epistemic confidence.  It shall change the evidence threshold, allowable action, and required oversight.

The confidence explanation shall identify:

- strongest supporting basis;
- weakest material basis;
- confidence-limiting gaps;
- contradictions;
- assumptions; and
- what new evidence could change the confidence band.

### 7.11 Candidate actions

CyberShield shall compare at least the actions relevant to the record:

- Proceed
- Proceed with conditions
- Request evidence
- Modify and reassess
- Defer or monitor
- Escalate
- Reject
- No additional action justified
- Insufficient evidence to decide

Each candidate action shall include:

- rationale;
- evidence sufficiency;
- risk-if-wrong treatment;
- required review;
- conditions;
- residual risk;
- defensibility rank; and
- reason it was or was not selected.

### 7.12 Strongest Defensible Action

Use `Strongest Defensible Action` rather than an ambiguous `Final Recommendation` label.

The record shall include:

- selected action;
- concise rationale;
- evidence basis;
- blocking gaps;
- conditions;
- required review;
- residual risk;
- expiration or reassessment trigger; and
- what would change the decision.

### 7.13 Human review requirement

Human review requirement shall be separate from decision outcome.

Allowed levels:

- No additional escalation required
- Analyst review
- Accountable owner or manager approval
- Executive approval
- Legal or privacy review
- Multi-role review

The record shall include:

- required reviewer roles;
- reason each role is required;
- decision authority;
- review deadline, if applicable;
- unresolved questions for reviewers; and
- whether action is blocked pending review.

### 7.14 Human decision and override

The final human decision shall remain separate from CyberShield's recommendation.

Required fields:

- reviewer identity and role;
- selected action;
- rationale;
- conditions;
- residual-risk acknowledgment;
- timestamp;
- approval scope;
- expiration or revalidation date; and
- follow-up obligations.

If the human decision differs from CyberShield, preserve an override event containing:

- CyberShield action;
- human-selected action;
- reason for override;
- evidence considered;
- risk accepted;
- conditions;
- responsible human; and
- timestamp.

### 7.15 Limitations and audit trail

The record shall include:

- data and source limitations;
- domain limitations;
- analysis limitations;
- model limitations;
- unverified claims;
- unimplemented controls;
- material changes;
- reviewer changes;
- export history;
- record status history; and
- append-only audit events or an accurate prototype substitute.

## 8. Deterministic versus LLM-generated behavior

### Deterministic or rule-governed

The following shall be deterministic where practical:

- schema validation;
- required-field checks;
- IDs and timestamps;
- enum normalization;
- record versioning;
- evidence-to-claim linkage validation;
- missing-evidence status;
- risk and review routing thresholds;
- confidence ceilings caused by material unsupported claims;
- prohibition and boundary checks;
- candidate-action constraints;
- Strongest Defensible Action eligibility;
- human-review requirement;
- record completeness;
- digest generation;
- export validation; and
- audit-event creation.

### LLM-assisted

An LLM may assist with:

- claim extraction;
- claim normalization;
- assumption extraction;
- evidence summarization;
- contradiction identification;
- question generation;
- rationale drafting; and
- executive-language simplification.

LLM-assisted output shall be structured, source-linked, reviewable, and bounded by deterministic validation.

An LLM shall not independently:

- approve action;
- create authority;
- fabricate evidence;
- silently change the original recommendation;
- conceal uncertainty;
- determine that human review is unnecessary contrary to policy;
- overwrite a human decision;
- certify compliance; or
- treat another model's confidence as evidence.

## 9. Five-minute demo requirement

The demo shall be understandable in under five minutes.

A viewer shall immediately understand:

- what the AI recommended;
- what action the recommendation would trigger;
- which material claims CyberShield extracted;
- what CyberShield challenged;
- what evidence supports the recommendation;
- what evidence is missing or contradictory;
- what assumptions remain;
- what happens if the AI is wrong;
- how confident CyberShield is and why;
- the Strongest Defensible Action; and
- who must approve before action.

The persistent executive brief shall answer:

1. Can we act now?
2. Why or why not?
3. What is the strongest evidence?
4. What is missing or contradictory?
5. What could happen if this is wrong?
6. What is the Strongest Defensible Action?
7. Who must decide?

## 10. Presentation and language rules

Use:

- AI Recommendation Review
- Trust Decision Record
- Decision Readiness
- Strongest Defensible Action
- Evidence Sufficiency
- Evidence Gaps
- Risk If Wrong
- Confidence Band
- Human Review Required
- Evidence before action

Avoid as primary user-facing language:

- trust score;
- safe or unsafe;
- good or bad;
- auto approve;
- AI judging AI;
- final truth;
- certified unless a separately governed certificate was actually issued;
- compliant unless compliance was actually verified; and
- production-ready unless current evidence supports it.

## 11. Non-functional requirements

CyberShield shall be:

- Explainable
- Defensible
- Auditable
- Repeatable
- Model-agnostic
- Vendor-neutral
- Domain-extensible
- Simple enough for executives
- Structured enough for auditors
- Legible enough for accountable human review
- Explicit about uncertainty and limitations
- Resistant to prompt injection and untrusted-content instructions
- Capable of preserving dissent, override, defer, and no-action outcomes

## 12. Pilot 1 implementation priority

Build the smallest working version that takes one AI recommendation and produces one defensible Trust Decision Record.

Implementation order:

1. Universal recommendation input contract
2. Trust Decision Record vNext schema
3. Current vendor-risk adapter
4. Claim extraction and materiality
5. Evidence and missing-evidence records
6. Assumption and contradiction records
7. Risk If Wrong
8. Evidence sufficiency and confidence explanation
9. Candidate actions and Strongest Defensible Action
10. Human review requirement
11. Human decision and override
12. Executive record rendering and export
13. Deterministic tests and abuse cases

## 13. Out of scope for Pilot 1

Do not build unless already trivial and non-disruptive:

- TrustMap visualization
- Multi-agent orchestration
- Agent society modeling
- Cross-agent trust propagation
- Runtime autonomous execution
- Autonomous approval
- Complex dashboards
- Heavy analytics
- Live enterprise integrations
- Broad control-framework mapping
- Enterprise trust fabric
- Production identity, tenant, or authorization claims
- General-purpose AI governance platform behavior

## 14. Fastest credible pilot

For the July 10 Sandeep presentation:

- preserve `/vendor-risk-next.html` as the golden path;
- preserve `/vendor-risk.html` as fallback;
- use the current controlled vendor-risk recommendation and synthetic evidence;
- explain the vNext domain-neutral record architecture;
- demonstrate the distinction among evidence sufficiency, confidence, Risk If Wrong, Strongest Defensible Action, and human review;
- generate or display one polished Trust Decision Record; and
- disclose the static prototype and synthetic-evidence boundary.

Do not attempt a multi-domain runtime rebuild before the presentation.

## 15. Future roadmap

### Phase 2: Runtime decision monitoring

- monitor evidence, assumptions, context, and recommendation validity over time;
- trigger reassessment when material evidence changes;
- preserve human authority over consequential action.

### Phase 3: Multi-agent trust propagation

- evaluate recommendations and evidence exchanged among registered agents;
- preserve identity, authority, provenance, and domain boundaries;
- prevent consensus laundering.

### Phase 4: Enterprise trust fabric

- connect decision records, policies, evidence, owners, systems, and controls;
- support organizational assurance without turning a trust score into a substitute for evidence.

## 16. Success criteria

Pilot vNext succeeds when:

- one recommendation becomes one complete Trust Decision Record;
- every material conclusion is traceable to evidence, assumption, rule, or stated uncertainty;
- evidence sufficiency, confidence, consequence, action, and review remain distinct;
- an executive can understand the decision in under five minutes;
- an auditor can inspect the structured record;
- a human can disagree or override with accountability preserved;
- the system can recommend less, defer, request evidence, reject, or take no additional action;
- the demo does not overclaim generality, production readiness, compliance, or autonomous authority; and
- the architecture remains extensible without overbuilding Pilot 1.

## 17. Engineering directive

```text
AI Recommendation In
Trust Decision Record Out
```

Do not overbuild.  Do not chase dashboards.  Do not make TrustMap the pilot.  Do not confuse confidence with consequence or review with outcome.