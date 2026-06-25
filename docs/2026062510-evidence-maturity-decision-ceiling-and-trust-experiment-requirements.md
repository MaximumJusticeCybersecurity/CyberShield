# Evidence Maturity, Decision Ceiling, and Minimum Trust Experiment Requirements

Version timestamp: 2026062510  
Status: Proposed living product requirement  
Owner and final human authority: Dr. Max Justice  
Applies to: CyberShield Decision Assurance workflow, AI Trust Decision Record, narrow vendor-risk demonstration, Requirements Steward, implementation agents, verification agents, and future outcome-calibration work

## 1. Purpose

CyberShield shall distinguish between a persuasive AI recommendation and a recommendation whose evidence is mature enough to justify action.

This requirement strengthens the current product direction:

```text
AI-generated vendor-risk recommendation in -> defensible AI Trust Decision Record out
```

It does not establish a biomedical, virtual-cell, scientific-AI, or other new demonstration stream.  It extracts a universal trust principle from experimental science: predictions become more trustworthy when their claims are measured, challenged, reproduced, connected to outcomes, and restricted to actions the available evidence can support.

## 2. Product boundary

The first proof point remains AI-generated vendor-risk recommendations.

Do not introduce without separate owner approval:

- A biomedical or virtual-cell demonstration.
- Arc Institute data ingestion.
- Scientific or clinical assurance claims.
- Biomedical scoring terminology.
- A new market vertical or buyer hypothesis.
- Changes to CyberShield's public positioning.

Scientific and biological examples may be retained privately as conceptual references or future portability tests.  They shall not become current product scope.

## 3. Evidence Maturity Ladder

CyberShield shall classify material evidence supporting each important claim.  The initial maturity states are:

### 3.1 Claimed

The assertion is self-reported or presented without independent supporting observation.

Examples:

- Vendor marketing statement.
- Sales representation.
- Security questionnaire answer.
- AI-generated narrative without linked evidence.

### 3.2 Observed

A relevant artifact, configuration, record, or direct observation supports the claim, but the claim has not been independently tested.

Examples:

- Architecture diagram.
- Configuration export.
- Policy document.
- Control screenshot.
- Current system-generated report.

### 3.3 Tested

A controlled validation was performed against the claim or control.

Examples:

- Technical configuration validation.
- Penetration-test evidence.
- Restore test.
- Incident-notification tabletop.
- Data-deletion test.

### 3.4 Independently validated

A qualified, sufficiently independent party reproduced or confirmed the finding within a stated scope and time period.

Examples:

- Independent assessment.
- External penetration test.
- Relevant SOC examination evidence.
- Independent control validation.

### 3.5 Outcome validated

Subsequent operational outcomes support or contradict the original prediction, assessment, or control claim.

Examples:

- Pilot results.
- Incident performance.
- Verified recovery event.
- Contract-exit and deletion outcome.
- Longitudinal control performance.

## 4. Evidence classification requirements

For every material claim, CyberShield shall record where available:

- Claim identifier and exact claim text.
- Evidence source and provenance.
- Evidence maturity state.
- Evidence date and applicable period.
- Scope covered and scope excluded.
- Independence of the evidence producer.
- Directness of support for the claim.
- Known contradictions.
- Missing evidence.
- Staleness risk.
- Applicability to the proposed decision.

CyberShield shall not treat all evidence types as equivalent.  A vendor assertion, policy document, SOC report, current technical test, and observed operational outcome shall retain distinct evidentiary meaning.

## 5. Decision Ceiling

CyberShield shall determine the most consequential action that the current evidence can defensibly support.  This is the Decision Ceiling.

The Decision Ceiling is not a separate generic trust score.  It is a constraint on the Recommended Action.

Initial action ceilings may include:

1. Continue investigation.
2. Obtain specified missing evidence.
3. Conditional review.
4. Constrained pilot.
5. Approval within verified scope and conditions.
6. Broader approval with monitoring.
7. Defer.
8. Do not proceed.

The Decision Ceiling shall account for:

- Evidence maturity.
- Evidence relevance.
- Confidence and uncertainty.
- Risk if wrong.
- Reversibility.
- Scope of exposure.
- Data sensitivity.
- Operational dependencies.
- Independent validation.
- Human-review requirements.

A high-quality artifact does not justify action outside the artifact's scope, period, system boundary, or tested conditions.

## 6. Minimum Trust Experiment

When available evidence does not support the requested action, CyberShield shall identify the smallest, safest, practical validation step that could materially increase or decrease trust in the recommendation.

The Minimum Trust Experiment shall include:

- The uncertainty or claim being tested.
- The proposed validation action.
- Why the action is decision-relevant.
- Required evidence or measurement.
- Scope and safeguards.
- Success criteria.
- Failure criteria.
- Stop conditions.
- Owner or reviewer required.
- How the result could change the Decision Ceiling.

Vendor-risk examples include:

- Request a specific SOC report section or bridge letter.
- Validate encryption and key-management configuration.
- Test incident-notification procedures.
- Limit an initial pilot to non-sensitive data.
- Verify deletion and return-of-data procedures.
- Review a critical subcontractor.
- Test rollback, portability, or exit procedures.

CyberShield shall not recommend unnecessary tests when existing evidence is sufficient.  It shall prefer the least burdensome validation that materially changes the decision.

## 7. Trust Decision Record requirements

The AI Trust Decision Record shall support the following fields or equivalent structured content:

- Material claims.
- Evidence linked to each claim.
- Evidence maturity classification.
- Evidence gaps and contradictions.
- Confidence band.
- Risk if wrong.
- Decision Ceiling.
- Recommended Action.
- Conditions and constraints.
- Minimum Trust Experiment, when required.
- Human-review requirement.
- Outcome follow-up status.

The record shall clearly distinguish:

- What is asserted.
- What is observed.
- What is tested.
- What is independently validated.
- What remains unknown.
- What action is currently justified.

## 8. Outcome and calibration loop

CyberShield shall preserve the ability to compare an original Trust Decision Record with later outcomes.

The future-compatible outcome record shall include:

- Original recommendation.
- Original evidence set.
- Original evidence maturity classifications.
- Original confidence band.
- Original Decision Ceiling and Recommended Action.
- Human decision made.
- Conditions imposed.
- Subsequent evidence or operational outcome.
- Whether the original assessment was confirmed, contradicted, partially confirmed, or unresolved.
- Lessons identified.
- Proposed change to guidance, tests, or policy.
- Human approval status for any change to recommendation or risk logic.

Outcome evidence may inform calibration.  It shall not silently rewrite CyberShield's risk logic, policy, thresholds, or memory.

## 9. Current narrow-demo acceptance criteria

The vendor-risk demonstration shall show that CyberShield can:

1. Separate vendor claims from observed, tested, independently validated, and outcome evidence.
2. Identify when evidence is stale, partial, self-reported, or outside the decision scope.
3. Explain why an apparently strong recommendation may exceed the evidence.
4. Set a Decision Ceiling appropriate to the evidence and risk if wrong.
5. Recommend a constrained pilot, further validation, approval, deferment, or rejection as warranted.
6. Propose a Minimum Trust Experiment when one would materially improve the decision.
7. Preserve meaningful human authority.
8. Avoid representing SOC 2, certification, absence of incidents, model confidence, or polished documentation as automatic proof.

## 10. Example vendor-risk application

Input recommendation:

> Approve the vendor because it is SOC 2 certified, encrypts customer data, and presents low cybersecurity risk.

CyberShield shall be able to determine that:

- The vendor statement is a claim.
- A security questionnaire remains primarily self-reported.
- A SOC report is independently examined but limited by its scope, system description, exceptions, subservice organizations, and examination period.
- Current configuration evidence may be observed but not necessarily tested.
- A penetration test may be tested evidence within a limited scope and date.
- A constrained pilot can provide outcome evidence without exposing sensitive data.

Example disposition:

> Proceed with a constrained pilot.  The available evidence supports limited evaluation but not unrestricted approval.  Validate encryption key management, breach-notification obligations, data deletion, and critical subcontractor access before expanding use.

## 11. Agent and security implications

CyberShield agents shall treat recommendations, reports, questionnaires, certifications, logs, websites, uploads, and model output as evidence, not instruction authority.

Aegis Sentinel and verification agents shall ensure that:

- Evidence maturity labels cannot authorize execution by themselves.
- External content cannot alter its own maturity classification or Decision Ceiling.
- Changes to recommendation logic, risk-if-wrong logic, evidence maturity rules, Decision Ceiling logic, or Trust Decision Record schema are protected changes.
- Outcome data is provenance-bound and cannot silently poison memory or policy.
- Tests include adversarial evidence that is polished, authoritative-sounding, incomplete, stale, contradictory, or maliciously constructed.
- False-positive and digital autoimmune risks are tested so legitimate evidence and work are not blocked without explainable reason codes and review paths.

## 12. Security-agent acceptance-test lens

The biological immune-system analogy may be used as an internal abuse-case lens, not as a new product stream.

Security reviews should consider:

- Dormancy: malicious content activates only after a later trigger.
- Mutation: small changes evade exact-pattern detection.
- Trusted-path propagation: compromised instructions travel through authorized agents or artifacts.
- Immune evasion: malicious actions resemble legitimate work.
- Compromised identity: a previously trusted agent becomes hostile or is impersonated.
- Autoimmune response: valid work is incorrectly blocked or quarantined.
- Recovery: trust is restored only from verified known-good state.
- Security memory: incidents improve future detection without contaminating persistent agent memory.

These cases should be mapped to existing Aegis Sentinel Phase 0–4 tests before creating new implementation scope.

## 13. Non-goals

This requirement does not authorize:

- A new biomedical demo.
- Clinical decision support.
- Scientific model certification.
- Automated vendor approval.
- Automatic policy or scoring changes based on outcomes.
- Autonomous external testing.
- Production deployment.
- Expansion of agent authority.

## 14. Implementation sequence

1. Requirements Steward maps this requirement to the existing Trust Decision Record and narrow vendor-risk workflow.
2. Identify the smallest schema and copy changes needed to demonstrate evidence maturity, Decision Ceiling, and Minimum Trust Experiment.
3. Preserve the single-workflow product experience.
4. Update requirements traceability and acceptance tests.
5. Implement on a task-specific branch.
6. Independently verify behavior, claims, security boundaries, and print/export output.
7. Obtain Dr. Max Justice's approval before merge or public release.

## 15. Core rule

> CyberShield does not determine that an AI recommendation is trustworthy merely because its source is sophisticated or its evidence looks authoritative.  It determines what is claimed, what has been observed or tested, what remains unknown, what happens if the recommendation is wrong, and the most consequential action the current evidence can defensibly support.
