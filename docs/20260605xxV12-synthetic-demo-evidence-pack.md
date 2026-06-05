# 20260605xxV12 Synthetic Demo Evidence Pack

## Purpose

Create the fake but realistic evidence set for the CyberShield V1 vendor-risk demo.

This pack gives the engineer the evidence, contradictions, expected claims, and expected CyberShield findings needed to build the demo without guessing.

## Demo Vendor

Vendor name:

```text
Vendor X
```

Service evaluated:

```text
AI-assisted customer support analytics service
```

AI-generated recommendation:

```text
Approve Vendor X because they have a SOC 2 report, encrypt customer data, and appear low risk.
```

Expected CyberShield conclusion:

```text
The recommendation is not defensible as written.
```

Expected recommended action:

```text
Request Evidence
```

or:

```text
Escalate for Review
```

## Demo Aha Moment

The AI recommendation sounds reasonable, but the evidence does not support approval.

Key reveal:

```text
SOC 2 exists, but the scope does not clearly cover the evaluated AI service. The vendor claims customer data is not used for training, but the DPA allows customer data to be used for service improvement. Therefore, the approval recommendation is not defensible as written.
```

## Synthetic Evidence Documents

### 1. SOC 2 Summary

Evidence ID:

```text
EVD-SOC2-SUMMARY-001
```

Purpose:

Shows SOC 2 exists.

Synthetic excerpt:

```text
Vendor X provided a SOC 2 Type II report covering the period January 1, 2025 through December 31, 2025. The report references security, availability, and confidentiality criteria for Vendor X cloud operations.
```

Evidence posture:

```text
Partially supportive
```

Caveat:

```text
The summary confirms a SOC 2 report exists, but does not prove the evaluated AI-assisted customer support analytics service is in scope.
```

### 2. SOC 2 Scope Excerpt

Evidence ID:

```text
EVD-SOC2-SCOPE-002
```

Purpose:

Creates scope ambiguity.

Synthetic excerpt:

```text
The SOC 2 examination covers Vendor X core cloud hosting, identity management, production change management, backup operations, and general infrastructure controls. AI analytics modules, beta features, customer support intelligence features, and third-party model providers are not expressly listed in the system description.
```

Evidence posture:

```text
Contradictory or insufficient for AI service coverage
```

Caveat:

```text
The evaluated AI service is not clearly included in SOC 2 scope.
```

### 3. Encryption Architecture Note

Evidence ID:

```text
EVD-ENC-ARCH-003
```

Purpose:

Partially supports encryption claim.

Synthetic excerpt:

```text
Vendor X states that customer data is encrypted in transit using TLS 1.2 or higher and encrypted at rest using managed cloud key services. Application logs may include customer metadata for troubleshooting and service analytics.
```

Evidence posture:

```text
Partially sufficient with caveat
```

Caveat:

```text
Encryption is described, but metadata handling and log content require further review.
```

### 4. Data Processing Agreement Excerpt

Evidence ID:

```text
EVD-DPA-004
```

Purpose:

Creates contradiction around data use.

Synthetic excerpt:

```text
Vendor X may process customer data to provide, maintain, secure, support, analyze, and improve the services. Aggregated or derived service data may be used to improve platform functionality, service performance, analytics, and customer support features.
```

Evidence posture:

```text
Material contradiction
```

Caveat:

```text
The DPA permits service improvement use, which conflicts with a simple claim that customer data is only used to provide the contracted service.
```

### 5. Subprocessor List

Evidence ID:

```text
EVD-SUBPROC-005
```

Purpose:

Shows incomplete third-party visibility.

Synthetic excerpt:

```text
Vendor X lists primary cloud hosting and email notification subprocessors. The list notes that additional analytics, support, and AI service providers may be used where required to deliver platform features. Provider names for AI analytics services are available upon request.
```

Evidence posture:

```text
Insufficient
```

Caveat:

```text
The AI analytics subprocessors are not fully identified in the provided list.
```

### 6. Incident Notification Clause

Evidence ID:

```text
EVD-INCIDENT-006
```

Purpose:

Shows weak notification timing.

Synthetic excerpt:

```text
Vendor X will notify customer of a confirmed security incident without undue delay after Vendor X determines that notification is required under applicable law or contract obligations.
```

Evidence posture:

```text
Partially sufficient with caveat
```

Caveat:

```text
The clause does not provide a specific notification timeline and may be too weak for sensitive customer data use cases.
```

### 7. Security Questionnaire Excerpt

Evidence ID:

```text
EVD-QUESTIONNAIRE-007
```

Purpose:

Conflicts with other evidence.

Synthetic excerpt:

```text
Vendor X indicates that customer data is not used to train machine learning models. Vendor X also indicates that product analytics may be used to improve service quality and feature performance.
```

Evidence posture:

```text
Potential contradiction or ambiguity
```

Caveat:

```text
The questionnaire separates training from service improvement but does not clearly explain whether customer data, metadata, or derived data supports AI-assisted features.
```

### 8. Business Owner Approval Note

Evidence ID:

```text
EVD-BUSINESS-008
```

Purpose:

Shows pressure to approve.

Synthetic excerpt:

```text
The business owner requests approval this week to meet implementation timelines. The business owner states that Vendor X is important for customer support efficiency and that delay may affect the planned rollout.
```

Evidence posture:

```text
Context only
```

Caveat:

```text
Business urgency is not evidence that the vendor-risk recommendation is defensible.
```

### 9. Security Reviewer Note

Evidence ID:

```text
EVD-SECURITY-REVIEW-009
```

Purpose:

Shows CyberShield-style skepticism.

Synthetic excerpt:

```text
Security review notes that SOC 2 scope should be validated against the evaluated AI service, DPA language should be reviewed for data use restrictions, AI analytics subprocessors should be identified, and customer data handling should be confirmed before approval.
```

Evidence posture:

```text
Supports request for evidence
```

Caveat:

```text
The reviewer note supports escalation or evidence request, not approval.
```

## Expected Extracted Claims

- Vendor X should be approved.
- Vendor X has a SOC 2 report.
- The SOC 2 report is current.
- The SOC 2 report covers the evaluated service.
- Vendor X encrypts customer data.
- Vendor X has acceptable customer data use terms.
- Vendor X has acceptable subprocessor transparency.
- Vendor X has acceptable incident notification terms.
- Vendor X appears low risk.
- SOC 2 plus encryption is sufficient for approval.

## Expected Missing Evidence

- Full SOC 2 report or system description
- Explicit confirmation that the evaluated AI service is in SOC 2 scope
- Independent validation of encryption implementation
- Complete AI analytics subprocessor list
- Clear restriction on customer data use for service improvement
- Specific incident notification timeline
- Legal or privacy review for DPA language
- Vendor-risk owner approval
- Security reviewer approval

## Expected Contradictions

### SOC 2 Scope Contradiction

AI recommendation implies SOC 2 supports approval.

Evidence shows SOC 2 does not clearly cover the evaluated AI service.

### Data Use Contradiction

AI recommendation implies the vendor is low risk because customer data is protected.

DPA allows customer data or derived service data to be used for service improvement.

### Subprocessor Visibility Gap

AI recommendation implies the vendor is low risk.

Subprocessor list does not fully identify AI analytics providers.

## Expected CyberShield Findings

Risk If Wrong:

```text
High
```

Confidence Band:

```text
Low Confidence
```

Record Defensibility:

```text
Not defensible as written
```

Recommended Action:

```text
Request Evidence
```

Human Review Required:

```text
Yes
```

Required reviewer roles:

- Vendor-Risk Owner
- Security SME
- Legal Counsel
- Business Owner

Decision Brief posture:

```text
Decision Readiness: Not Defensible Yet
Recommended Action: Request Evidence
Risk If Wrong: High
Confidence Band: Low Confidence
Primary Issue: SOC 2 scope does not clearly cover the evaluated AI service
Top Contradiction: DPA allows service improvement use of customer data or derived data
Review Required: Vendor-Risk Owner, Security SME, Legal Counsel, Business Owner
Export Status: Executive brief ready with limitations
```

## Implementation Notes

Synthetic evidence should be treated as demo data.

Uploaded evidence, when added later, should be able to replace or supplement synthetic evidence.

Synthetic evidence should remain reusable as a demo template.
