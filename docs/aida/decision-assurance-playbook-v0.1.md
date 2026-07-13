# AIDA Decision Assurance Playbook v0.1

Status: Initial methodology draft  
Owner: Dr. Max Justice

## Objective

Provide a repeatable workflow for determining whether an AI-generated recommendation is trustworthy enough to act upon.

## Operating sequence

### 1. Define the decision context

Capture:

- the recommendation;
- the intended decision or action;
- the accountable owner;
- the affected people, systems, assets, and obligations;
- timing and reversibility;
- applicable constraints; and
- the consequence if no decision is made.

### 2. Extract and classify claims

Identify each material claim and classify it as:

- stated fact;
- assumption;
- inference;
- prediction;
- opinion;
- recommendation; or
- unknown.

### 3. Map evidence

For each material claim, identify:

- supporting evidence;
- contradictory evidence;
- source;
- source authority;
- source independence;
- date and freshness;
- relevance to the exact context;
- limitations; and
- evidence that was unavailable.

### 4. Identify missing evidence

Determine what evidence a responsible decision owner would need before acting.  Missing evidence shall not be hidden by a confidence score or polished explanation.

### 5. Analyze assumptions and incentives

Identify assumptions, commercial incentives, conflicts of interest, sales pressure, affiliate relationships, status pressure, urgency, and other forces that may bias the recommendation or its sources.

### 6. Classify risk if wrong

Evaluate credible impact across:

- security;
- privacy;
- compliance and legal;
- financial;
- operational and mission;
- safety;
- reputational;
- human agency; and
- reversibility.

Higher consequence requires stronger evidence and greater human authority.

### 7. Challenge the recommendation

Test:

- the strongest contrary explanation;
- alternative actions;
- the no-action case;
- a smaller or reversible intervention;
- whether the recommendation would change under new evidence;
- whether the recommendation is merely restating the source; and
- whether AI is evaluating AI without independent evidence.

### 8. Assess justified confidence

Confidence shall consider:

- evidence strength;
- evidence relevance;
- source authority;
- source independence;
- freshness;
- contradictions;
- missing evidence;
- unsupported assumptions;
- challenge-test results; and
- risk if wrong.

The explanation is mandatory.  A numeric score alone is insufficient.

### 9. Determine admissibility and human authority

Possible outcomes include:

- proceed;
- proceed with constraints;
- request more evidence;
- modify;
- monitor;
- defer;
- escalate;
- reject; or
- no additional action justified.

Determine whether review is required by an analyst, manager, executive, legal, compliance, risk, clinical, financial, or other accountable authority.

### 10. Produce the AI Trust Decision Record

Preserve the distinction among:

- original AI output;
- source evidence;
- CyberShield analysis;
- system recommendation;
- human review; and
- final human decision.

### 11. Reassess when material conditions change

A prior decision shall be reconsidered when material evidence, sources, model behavior, context, stakes, ownership, policy, timing, or implementation conditions change.

## Minimum pilot acceptance

A first-time executive viewer should understand within five minutes:

1. What did the AI recommend?
2. What supports it?
3. What is missing or contradictory?
4. What happens if it is wrong?
5. How much confidence is justified and why?
6. Who must decide?
7. What should happen next?

## Non-negotiable outcomes

The playbook must permit restraint.  The system shall not manufacture a problem or force an intervention merely to create engagement, risk findings, or commercial value.
