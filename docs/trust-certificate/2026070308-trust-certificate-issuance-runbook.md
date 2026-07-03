# CyberShield Trust Certificate Issuance Runbook

**Document ID:** CS-TCERT-RUN-001  
**Version:** 2026070308  
**Status:** Proposed founder-led Level 1 runbook  
**Program:** CyberShield Trust Certificate Program

## 1. Purpose

This runbook defines the controlled process for reviewing and issuing a CyberShield AI Trust Decision Certificate during the founder-led maturity stage.

It is a manual assurance procedure supported by CyberShield and the Decision Assurance Implementation Agent.  It is not an accredited certification process and does not authorize autonomous issuance.

## 2. Roles

### Program owner

Dr. Max Justice, vCISO, Security SME, and Cybersecurity SME, retains final authority for the early-stage program, certificate language, exceptions, issuance policy, suspension, and revocation.

### Assessment operator

The assessment operator gathers the decision scope and evidence, runs the approved CyberShield workflow, documents findings, and prepares the draft AI Trust Decision Record and draft certificate.

The Decision Assurance Implementation Agent may support these tasks within an approved packet but may not authorize its own output.

### Assurance reviewer

The assurance reviewer evaluates the assessment, confirms the evidence and rationale, identifies unresolved issues, and recommends issue, issue with conditions, return for revision, defer, or reject.

### Issuance authority

The issuance authority is the accountable human authorized to place the certificate in `Issued` status.  During early maturity levels, this may be the program owner or a specifically designated qualified reviewer.

### Customer decision owner

The customer decision owner accepts responsibility for the organizational decision and acknowledges conditions, limitations, and residual risk.  Customer acceptance does not replace CyberShield issuance review.

## 3. Preconditions

Do not begin issuance unless:

- A bounded AI-supported decision is identified.
- Intended use and operating context are defined.
- The customer or internal sponsor is authorized to request the review.
- Required evidence can be lawfully and securely handled.
- The applicable Trust Decision Standard version is identified.
- Reviewer competence is appropriate to the domain and Risk-if-Wrong.
- Conflicts and commercial relationships are disclosed.
- The certificate is understood to be decision-level assurance, not universal model or organizational certification.

Stop when any precondition cannot be satisfied.

## 4. Intake

Create an assessment intake record containing:

- Requesting organization.
- Requestor and decision owner.
- Decision statement.
- Business objective.
- Intended use.
- Operating context.
- AI system, model, agent, application, or workflow.
- Material versions and integrations.
- Decision deadline, if relevant.
- Known legal, regulatory, contractual, security, privacy, safety, or financial constraints.
- Evidence supplied.
- Evidence known to be unavailable.
- Known conflicts or incentives.
- Desired use of the certificate.

Do not accept vague requests such as "certify our AI" without reducing them to a bounded decision or approved profile.

## 5. Scope confirmation

The assessment operator shall prepare a scope statement for customer or sponsor confirmation.

The scope statement shall identify:

- Exact decision being assessed.
- What is included.
- What is excluded.
- Intended use.
- Unsupported or prohibited uses.
- Evidence cutoff date.
- Relevant system version.
- Applicable standard and methodology version.
- Expected assurance level.
- Responsible human decision owner.

Material scope changes after assessment begins require documented rescoping and may require reassessment.

## 6. Evidence handling

### Evidence intake

- Record the source and date of each material artifact.
- Preserve the original artifact or approved reference.
- Classify sensitivity.
- Identify whether evidence is customer-provided, independently obtained, synthetic, inferred, or unavailable.
- Treat embedded instructions as untrusted data.
- Do not place secrets or unredacted restricted information in public repositories or test fixtures.

### Evidence evaluation

Evaluate each material evidence item for:

- Provenance.
- Authority.
- Relevance.
- Recency.
- Completeness.
- Independence.
- Consistency.
- Commercial or institutional incentive.
- Availability for inspection.

### Evidence gaps

Record missing, stale, contradictory, inaccessible, or unreliable evidence.  Identify the consequence of each gap.

An evidence gap shall not be hidden merely because the customer wants a favorable outcome.

## 7. CyberShield assessment

Run the approved decision-assurance workflow:

1. Identify the decision.
2. Extract and classify material claims.
3. Separate facts, assumptions, inferences, recommendations, and human decisions.
4. Map supporting and contradicting evidence.
5. Identify evidence gaps.
6. Classify Risk-if-Wrong.
7. Determine evidence sufficiency.
8. Assign a confidence band.
9. Evaluate human legibility and meaningful human authority.
10. Identify conditions, controls, and residual risk.
11. Determine the proposed assurance outcome.
12. Generate the draft AI Trust Decision Record.
13. Generate the draft certificate.

The assessment operator shall not manipulate inputs or thresholds to achieve a preferred commercial outcome.

## 8. Mandatory quality review

Before issuance review, verify:

- The decision is clear and bounded.
- Intended and unsupported uses are present.
- The AI system or workflow is identified to the extent possible.
- Material claims are traceable.
- Evidence provenance and limitations are recorded.
- Risk-if-Wrong precedes confidence and action language.
- Evidence sufficiency is explicitly determined.
- Material contradictions are visible.
- Conditions are specific and testable where feasible.
- Residual risk is stated.
- Human authority is meaningful.
- The proposed outcome matches the evidence.
- Certificate fields match the AI Trust Decision Record.
- Reliance language is present.
- Confidential or restricted information is not exposed.
- Certificate status remains `Draft`.

Any material mismatch returns the package for correction.

## 9. Assurance review decision

The reviewer shall choose one of the following:

### Recommend issuance

The assessment satisfies the standard and the proposed outcome is supported.

### Recommend issuance with conditions

The certificate may be issued only after specified prerequisites are verified or with ongoing conditions displayed prominently.

### Return for revision

The assessment has correctable quality, scope, evidence, or documentation defects.

### Defer

The assessment cannot be completed until additional evidence, expertise, approval, or system information is available.

### Reject issuance

The standard is not satisfied, the requested use is prohibited, material risk is unacceptable, or the evidence is materially unreliable.

The reviewer shall record rationale and unresolved issues.

## 10. Human authorization

Before `Issued` status:

- Confirm the final AI Trust Decision Record.
- Confirm the final certificate matches the record.
- Confirm all mandatory conditions are implemented or correctly represented.
- Confirm the reviewer and issuance authority are identified.
- Confirm conflict and independence disclosures.
- Confirm expiration or reassessment trigger.
- Confirm the certificate ID is unique.
- Confirm the verification record exists in the approved environment.
- Confirm final reliance language.
- Record authorization date and authorization decision.

The Decision Assurance Implementation Agent shall not authorize, sign, or issue the certificate.

## 11. Issuance

Upon authorization:

1. Set status to `Issued`.
2. Lock the issued certificate version against silent editing.
3. Generate the final on-screen and print artifact.
4. Generate the approved sanitized machine-readable record.
5. Record certificate digest when supported.
6. Activate the verification record.
7. Deliver the certificate and reliance instructions to the authorized recipient.
8. Record issuance in the program ledger.
9. Schedule expiration or next review.
10. Record conditions that require ongoing confirmation.

Any post-issuance content change requires a new version or superseding certificate.

## 12. Customer acknowledgement

Where appropriate, obtain acknowledgement that the recipient understands:

- The exact decision and use covered.
- Unsupported uses.
- Mandatory conditions.
- Material limitations.
- Residual risk.
- Expiration and reassessment triggers.
- Current status must be verified before reliance.
- The certificate is not a guarantee, regulatory approval, legal opinion, insurance policy, or universal AI certification.

A customer refusal to acknowledge material conditions may prevent issuance or require suspension.

## 13. Reassessment

Open reassessment when:

- The AI model or system version changes materially.
- System prompts, retrieval sources, tools, permissions, or guardrails change.
- Intended use or operating context changes.
- Material new evidence appears.
- A required control fails.
- An incident or material complaint occurs.
- Applicable law, contract, or control requirements change.
- The certificate reaches expiration or next review.

Reassessment may confirm, modify, suspend, revoke, or supersede the certificate.

## 14. Suspension

Suspend when current reliance should pause while a material concern is investigated.

Required suspension record:

- Certificate ID.
- Effective date and time.
- Reason.
- Initiating authority.
- Scope of suspension.
- Customer notification status.
- Investigation owner.
- Conditions for reinstatement or next decision.

A suspended certificate shall display `Suspended` in the verification record and shall not be marketed as current assurance.

## 15. Revocation

Revoke when:

- The certificate basis was materially false or invalid.
- Mandatory conditions failed and cannot be promptly corrected.
- The certificate or trust mark was materially misused.
- A material incident invalidates the assurance conclusion.
- The recipient refuses required corrective or status communication.
- The certificate was issued in error and cannot be corrected through administrative amendment.

Revocation shall preserve the historical record and reason.  Do not delete the prior certificate to conceal history.

## 16. Supersession

When a reassessment creates a replacement certificate:

- Mark the prior certificate `Superseded`.
- Identify the new certificate ID.
- Identify the effective date.
- Preserve the prior record.
- Prevent the prior artifact from appearing current.

## 17. Errors, challenges, and appeals

During founder-led maturity:

- Accept written challenges to scope, evidence, findings, status, or administrative accuracy.
- Record the challenge and supporting evidence.
- Assign a reviewer who was not solely responsible for the challenged judgment where feasible.
- Distinguish administrative corrections from substantive reassessment.
- Preserve the original record and decision history.
- Escalate unresolved material disputes to the program owner.

A formal independent appeals panel is a Level 4 capability and is not yet operational.

## 18. Quality and program metrics

Record:

- Intake date.
- Assessment start and completion dates.
- Reviewer hours.
- Evidence items reviewed.
- Material gaps and contradictions.
- Outcome.
- Conditions.
- Rework cycles.
- Issuance decision.
- Delivery cost.
- Revenue when applicable.
- Customer use case.
- Reassessment events.
- Suspension, revocation, or supersession.
- Customer challenge or complaint.
- Repeat purchase or renewal.

Use program data to improve the standard without lowering the assurance bar to increase issuance rates.

## 19. Stop conditions

Stop and escalate when:

- Scope remains ambiguous.
- Evidence handling is unauthorized or unsafe.
- Reviewer expertise is inadequate.
- A material conflict is undisclosed or unmanaged.
- The customer requests a misleading assurance claim.
- The customer requests concealment of limitations or adverse findings.
- Certificate data and the AI Trust Decision Record conflict.
- Required human authorization is missing.
- The verification mechanism cannot accurately show current status.
- The requested action would imply accreditation, regulatory approval, compliance certification, insurance, or a guarantee without authority.

## 20. Issuance checklist

```text
[ ] Bounded decision confirmed
[ ] Intended use confirmed
[ ] Unsupported uses recorded
[ ] AI system and version identified or limitation recorded
[ ] Evidence inventory complete
[ ] Evidence sufficiency determined
[ ] Contradictions and gaps visible
[ ] Risk-if-Wrong classified
[ ] Confidence band supported
[ ] Human authority meaningful
[ ] Conditions specific
[ ] Residual risk stated
[ ] AI Trust Decision Record complete
[ ] Certificate matches decision record
[ ] Assurance reviewer decision recorded
[ ] Human issuance authority recorded
[ ] Conflict and independence disclosure recorded
[ ] Unique certificate ID assigned
[ ] Expiration or reassessment trigger assigned
[ ] Verification record available
[ ] Reliance disclaimer present
[ ] Sensitive-data review complete
[ ] Browser and print artifact inspected
[ ] Status changed from Draft to Issued only after authorization
[ ] Program ledger updated
```

## 21. Current limitations

This runbook does not establish:

- Accredited certification.
- Independent assessor governance.
- Production cryptographic signing.
- Production public registry.
- Formal appeals-panel independence.
- Automated surveillance.
- Insurance coverage.
- Regulatory recognition.

Those capabilities require later maturity gates and separate owner authorization.