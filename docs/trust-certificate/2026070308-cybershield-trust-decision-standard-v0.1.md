# CyberShield Trust Decision Standard Version 0.1

**Document ID:** CS-TDS-001  
**Version:** 2026070308  
**Status:** Proposed Level 1 baseline  
**Program:** CyberShield Trust Certificate Program  
**Owner:** Dr. Max Justice, vCISO, Security SME, and Cybersecurity SME

## 1. Purpose

This standard defines the minimum requirements for evaluating a specific AI-supported decision and, when warranted, issuing a CyberShield AI Trust Decision Certificate.

The standard governs the decision-assurance process.  It does not certify an entire model, agent, product, vendor, organization, or AI management system.

## 2. Governing doctrine

```text
AI confidence is not evidence.
```

CyberShield shall determine whether an organization can defend acting on an AI-generated or AI-supported recommendation based on the evidence available at the time, the consequence if the decision is wrong, the controls in place, and the accountable human decision.

Evidence quality, uncertainty, and Risk-if-Wrong shall control the assurance conclusion.  Presentation quality, model fluency, brand reputation, popularity, or customer willingness to pay shall not substitute for evidence.

## 3. Normative language

- **SHALL** means mandatory for conformance.
- **SHALL NOT** means prohibited.
- **SHOULD** means expected unless an approved exception is documented.
- **MAY** means permitted but not required.

## 4. Unit and boundary of assurance

### TDS-001 - Decision-level scope

Each assessment SHALL identify one bounded decision, recommendation, or approval question as the unit of assurance.

### TDS-002 - Intended use

Each assessment SHALL define the intended use, operating context, decision owner, affected parties, and prohibited or unsupported uses.

### TDS-003 - System identification

Each assessment SHALL identify the AI system, model, agent, workflow, relevant version, material tools, and material data sources involved when that information is available.

Unknown or unavailable system information SHALL be recorded as an assurance limitation.

### TDS-004 - Time boundary

Each assessment SHALL identify the evaluation date, evidence cutoff date, methodology version, and expiration or reassessment condition.

## 5. Required assessment elements

### TDS-005 - Decision statement

The assessment SHALL state the decision in clear language that an accountable human can accept, reject, modify, defer, or escalate.

### TDS-006 - Claim decomposition

CyberShield SHALL separate:

- AI-generated claims.
- Verified facts.
- Assumptions.
- Inferences.
- Recommendations.
- Human decisions.

### TDS-007 - Evidence inventory

The assessment SHALL identify material evidence supporting or contradicting the decision.

For each material item, CyberShield SHOULD record:

- Source and provenance.
- Authority.
- Relevance.
- Recency.
- Completeness.
- Independence.
- Conflicts or incentives.
- Availability for inspection.

### TDS-008 - Evidence sufficiency gate

CyberShield SHALL determine whether the available evidence is sufficient for the decision before assigning an assurance outcome.

Insufficient evidence SHALL remain a legitimate final outcome.  The system SHALL NOT manufacture confidence or recommend additional controls solely to avoid an insufficient-evidence conclusion.

### TDS-009 - Contradiction and gap analysis

The assessment SHALL identify material contradictions, missing evidence, stale evidence, unsupported assumptions, and unresolved dependencies.

### TDS-010 - Risk-if-Wrong first

CyberShield SHALL classify the consequence of an incorrect decision before using confidence or action language.

At minimum, the analysis SHALL consider:

- Security impact.
- Privacy impact.
- Safety impact.
- Legal or regulatory exposure.
- Financial impact.
- Operational impact.
- Reputational impact.
- Human or societal impact when applicable.

### TDS-011 - Confidence band

CyberShield SHALL use a bounded confidence band rather than presenting model confidence as certainty.

The confidence band SHALL reflect evidence quality and uncertainty.  It SHALL NOT be derived solely from the AI system's self-reported confidence.

### TDS-012 - Human legibility

The assessment SHALL make the decision basis understandable to the accountable human reviewer, including what happened, why, evidence used, assumptions, uncertainty, limitations, and required next action.

### TDS-013 - Meaningful human authority

A consequential decision SHALL identify an accountable human decision owner and provide a real ability to accept, reject, modify, defer, or escalate the recommendation.

Ceremonial approval SHALL NOT satisfy this requirement.

### TDS-014 - Conditions and controls

When assurance depends on controls, validations, restrictions, monitoring, or human approvals, those conditions SHALL be specific, testable where feasible, and recorded on the certificate.

### TDS-015 - Residual risk

The assessment SHALL state material residual risk remaining after required conditions are applied.

### TDS-016 - Commercial and incentive analysis

The assessment SHALL identify material incentives, affiliate relationships, sales pressure, conflicts, or commercial structures that may bias a source, assessor, or recommendation.

CyberShield affiliation and commercial interest SHALL be disclosed where material.

## 6. Assurance outcomes

The final outcome SHALL be one of the following.

### 6.1 Assured

Use only when:

- The decision is clearly bounded.
- Evidence is sufficient for the stated use.
- Material contradictions are resolved or acceptably bounded.
- Risk-if-Wrong is understood.
- Required controls are implemented or confirmed.
- Human authority is meaningful.
- Residual risk is within the approved threshold.

### 6.2 Assured with Conditions

Use when the decision may proceed only after or while specified conditions are satisfied.

The conditions SHALL appear prominently and SHALL be testable or verifiable where feasible.

Failure of a mandatory condition SHALL prevent issuance, suspend the certificate, or require reassessment.

### 6.3 Insufficient Assurance

Use when evidence, scope clarity, system information, validation, or review is insufficient to support the proposed decision.

This outcome SHALL NOT be represented as proof that the recommendation is false or unsafe.

### 6.4 Not Assured

Use when material contradiction, unacceptable Risk-if-Wrong, failed controls, prohibited use, unreliable evidence, or unresolved conflict prevents responsible reliance on the decision.

## 7. Decision rules

### TDS-017 - No score override

No aggregate score SHALL override:

- A critical Risk-if-Wrong condition.
- A failed evidence-sufficiency gate.
- A missing accountable human owner.
- A prohibited use.
- A material unresolved contradiction.
- A failed mandatory control.

### TDS-018 - Conservative outcome rule

When evidence supports more than one plausible outcome, CyberShield SHALL select the more conservative outcome or require human escalation unless a documented standard rule resolves the ambiguity.

### TDS-019 - No-action legitimacy

No action, monitoring, deferral, risk acceptance, or request for evidence SHALL remain legitimate outcomes.  The process SHALL NOT require a purchase, remediation project, or additional CyberShield service to reach completion.

### TDS-020 - Human override record

The system recommendation and final human decision SHALL remain distinct.  Any override SHALL record the reviewer, rationale, date, and acknowledged residual risk.

An override SHALL NOT silently change the underlying assurance finding.

## 8. Certificate lifecycle

### TDS-021 - Draft status

A certificate SHALL remain `Draft` until all required review and issuance criteria are satisfied.

### TDS-022 - Issued status

Only an authorized human assurance authority may place a certificate in `Issued` status during Levels 1 through 3.

### TDS-023 - Expiration

Every issued certificate SHALL include an expiration date or explicit event-driven reassessment rule.

### TDS-024 - Reassessment triggers

Reassessment SHALL be considered when any material element changes, including:

- AI model or model version.
- System prompt or decision logic.
- Retrieval corpus or evidence sources.
- Tools, integrations, permissions, or guardrails.
- Operating environment.
- Intended use.
- Applicable law or control requirement.
- Material new evidence.
- Significant incident, failure, or complaint.
- Required condition or control status.

### TDS-025 - Suspension

A certificate SHALL be suspended when a material concern requires investigation and current reliance cannot be justified.

### TDS-026 - Revocation

A certificate SHALL be revoked when its basis is materially invalid, mandatory conditions failed, the certificate was misused, evidence was materially false, or the assurance conclusion can no longer be supported.

### TDS-027 - Supersession

A new certificate or assessment may supersede an older certificate.  The registry SHALL preserve the prior record and identify the superseding certificate.

## 9. Issuance authority and independence

### TDS-028 - Human issuance authority

The Decision Assurance Implementation Agent SHALL NOT approve, sign, issue, suspend, revoke, or renew its own certificate.

### TDS-029 - Separation of duties

At early maturity levels, CyberShield may provide founder-led assessment and issuance, but the limitation SHALL be disclosed.

At Level 4, readiness assistance, assessment, and certification decisions SHALL be separated through defined independence controls.

### TDS-030 - Reviewer competence

Reviewers SHALL have competence appropriate to the decision domain and Risk-if-Wrong.  A reviewer SHALL escalate when the decision exceeds their expertise or authority.

## 10. Certificate content requirements

Every issued certificate SHALL include:

- Unique certificate identifier.
- Current lifecycle status.
- Recipient organization.
- Decision evaluated.
- Intended use and unsupported uses.
- AI system or workflow identification where available.
- Assurance outcome.
- Risk-if-Wrong classification.
- Confidence band.
- Evidence sufficiency conclusion.
- Material conditions.
- Material limitations and assumptions.
- Residual risk.
- Accountable human reviewer or assurance authority.
- Standard and methodology version.
- Issuance and expiration or reassessment information.
- Verification location or mechanism.
- Reference to the underlying AI Trust Decision Record.
- Required reliance disclaimer.

## 11. Minimum reliance disclaimer

Every certificate SHALL communicate substantially the following:

> This certificate reports a bounded assurance conclusion for the identified AI-supported decision, intended use, evidence set, system context, and assessment date.  It is not a universal determination that the underlying AI system is trustworthy.  It is not a guarantee of accuracy, safety, legality, compliance, performance, or absence of loss.  Material changes may invalidate the conclusion and require reassessment.

Final legal language requires counsel review before production issuance.

## 12. Quality requirements

### TDS-031 - Evidence traceability

Every material conclusion SHALL be traceable to evidence, a documented inference, a standard rule, or an accountable human judgment.

### TDS-032 - Reproducibility

A qualified reviewer using the same evidence and standard SHOULD be able to understand and substantially reproduce the assessment path.

### TDS-033 - Review record

The program SHALL preserve the assessment scope, evidence inventory, findings, outcome rationale, reviewer actions, conditions, certificate version, and lifecycle history.

### TDS-034 - Error correction

The program SHALL provide a method to report errors, challenge findings, correct administrative mistakes, and trigger reassessment without erasing prior history.

### TDS-035 - No trust-mark laundering

The certificate or trust mark SHALL NOT be displayed without its status, scope, and verification path.  Expired, suspended, revoked, or superseded certificates SHALL NOT be represented as current.

## 13. Minimum acceptance tests

Before Level 1 acceptance, the process SHALL be tested against:

1. Sufficient evidence and low residual risk.
2. Valid conditional assurance.
3. Insufficient evidence.
4. Material contradiction requiring Not Assured.
5. High Risk-if-Wrong despite persuasive presentation.
6. Model or evidence change requiring reassessment.
7. Human rejection or override.
8. Certificate misuse outside intended scope.
9. Required-control failure.
10. Affiliated commercial recommendation.

## 14. Nonconformity

An assessment or certificate is nonconforming when it:

- Omits the decision boundary or intended use.
- Treats AI confidence as evidence.
- Hides material limitations, contradictions, or conditions.
- Lacks meaningful human authority.
- Uses a prohibited outcome label or unapproved trust claim.
- Cannot be traced to an AI Trust Decision Record.
- Is stale, expired, suspended, revoked, or materially changed without reassessment.
- Is issued or altered by the same agent that generated the assessment without accountable human authorization.

## 15. Version 0.1 limitations

This proposed baseline does not yet establish:

- Numeric scoring thresholds.
- Industry-specific assurance profiles.
- Production registry architecture.
- Cryptographic certificate signing.
- Formal assessor accreditation.
- Appeals-panel governance.
- Insurance underwriting acceptance.
- External legal or standards recognition.

Those items require additional requirements, validation, and owner approval.