# Trust Decision Record Schema

Date: 2026-06-17
Owner: Dr. Max Justice
Target: Next vendor-risk build
Audience: Engineer, architect, builder

## 1. Purpose

This document defines the required structured record, report sections, and export payload for the CyberShield Trust Decision Record.

The Trust Decision Record is the primary artifact.  It proves why an AI-influenced recommendation was trusted, limited, escalated, rejected, or deferred for more evidence.

## 2. Report Title

Use:

AI Trust Decision Record
Vendor-Risk Recommendation Review

Prepared-by line:

Prepared by CyberShield, powered by Maximum Justice Cybersecurity

Subject line if vendor entered:

Subject: AI Trust Decision Record for [Vendor Name] Vendor-Risk Recommendation

Subject line if vendor blank:

Subject: AI Trust Decision Record for [vendor name would go here] Vendor-Risk Recommendation

Prepared for if company entered:

Prepared for: [Company]

Prepared for if company blank:

Prepared for: your company name would go here

## 3. Required Report Sections

The report must include:

1. Cover or header
2. Subject line
3. Executive Decision Brief
4. Recommendation Under Review
5. Decision Context
6. Key Findings
7. Material Claims and Evidence Table
8. Validator Check Results
9. Candidate Action Comparison
10. Contradictory Evidence
11. Risk If Wrong
12. Confidence Band
13. Human Review Requirement
14. CyberShield Recommended Action
15. Human Decision and Override
16. Reviewer Notes
17. Decision Owner
18. Vendor Dependency and Exit Path
19. Limitations
20. Signature Block
21. Export Metadata

## 4. Default Executive Decision Brief

Decision Readiness: Not Defensible Yet
Strongest Defensible Action: Request Evidence
Escalation Triggered: Yes
Risk If Wrong: High
Confidence Band: Low Confidence
Primary Issue: The vendor approval recommendation depends on claims that are unsupported, incomplete, or contradicted.
Top Contradiction: Vendor assurance language conflicts with contractual data-use permissions.
Review Required: Vendor-Risk Owner, Security SME, Legal Counsel
Export Status: Executive brief ready with limitations

## 5. Reviewer and Signature Block

Default reviewer:

Dr. Max Justice
vCISO | Security SME | Cybersecurity SME
CISSP | PMP | PhD, Technology & Innovation Management – Cybersecurity
Creator, CHN vCISO GPT powered by Cyber Shield
U.S. Veteran
Maximum Justice Cybersecurity

Signature: _______________________________

Date: ___________________

Reviewer Decision:

☐ Approved
☐ Approved with Caveat
☐ Request Evidence
☐ Escalate for Review
☐ Reject

Reviewer Notes:

____________________________________________________________

____________________________________________________________

The report should include enough space for an ink signature.

## 6. TrustDecisionRecord Object

Suggested structured JSON shape:

```json
{
  "record_id": "string",
  "report_id": "string",
  "created_timestamp": "ISO-8601 string",
  "export_timestamp": "ISO-8601 string",
  "first_name": "string",
  "company_or_organization": "string",
  "vendor_name": "string",
  "decision_title": "string",
  "decision_owner": "string",
  "decision_domain": "vendor_risk | security_risk | compliance_control | out_of_scope",
  "selected_contradiction_type": "string",
  "original_ai_recommendation": "string",
  "ai_source": "string",
  "ai_influence_type": "string",
  "recommendation_type": "string",
  "decision_context": "string",
  "claims": [],
  "evidence_items": [],
  "validator_results": [],
  "candidate_actions": [],
  "risk_if_wrong_band": "Severe | High | Moderate | Low | Minimal",
  "confidence_band": "High Confidence | Medium Confidence | Low Confidence | Unknown Confidence | Contradicted | Insufficient Support",
  "evidence_sufficiency": "Sufficient | Partially Sufficient | Insufficient | Contradicted | Unknown",
  "cyberShield_recommended_action": "string",
  "escalation_triggered": true,
  "human_review_required": true,
  "required_reviewer_roles": [],
  "human_decision": {},
  "override_event": {},
  "vendor_dependency": "string",
  "model_provider_dependency": "string",
  "data_exposure": "string",
  "exit_path": "string",
  "residual_risk": "string",
  "limitations": [],
  "record_defensibility_band": "string",
  "visitor_email": "string",
  "export_metadata": {}
}
```

## 7. Claim Object

```json
{
  "claim_id": "string",
  "record_id": "string",
  "original_sentence": "string",
  "normalized_claim": "string",
  "claim_type": "string",
  "materiality": "material | non_material",
  "required_evidence_type": "string",
  "evidence_status": "supported | partially_supported | unsupported | contradicted | unknown",
  "unsupported_leap_flag": true,
  "evidence_sufficiency_band": "string",
  "missing_support_severity": "string",
  "conflict_status": "none | potential_conflict | confirmed_conflict",
  "confidence_band": "string",
  "risk_if_wrong_band": "string"
}
```

## 8. EvidenceItem Object

```json
{
  "evidence_id": "string",
  "record_id": "string",
  "evidence_title": "string",
  "evidence_type": "string",
  "source_type": "vendor | independent | internal | synthetic_demo | uploaded | note",
  "date": "string",
  "freshness": "current | stale | unknown",
  "scope_status": "in_scope | out_of_scope | unclear",
  "independence_status": "independent | self_attested | unknown",
  "self_attestation_flag": true,
  "synthetic_demo_data_flag": true,
  "relevant_claims": [],
  "contradiction_flag": true,
  "evidence_summary": "string"
}
```

## 9. ValidatorResult Object

```json
{
  "validator_result_id": "string",
  "record_id": "string",
  "validator_id": "string",
  "validator_name": "string",
  "status": "Passed | Failed | Warning | Not Applicable | Requires Human Review",
  "severity": "Critical | High | Medium | Low | Informational",
  "explanation": "string",
  "affected_claim_ids": [],
  "required_action": "string"
}
```

## 10. CandidateAction Object

```json
{
  "candidate_action_id": "string",
  "record_id": "string",
  "action_label": "Accept | Accept with Caveat | Request Evidence | Revise Recommendation | Escalate for Review | Reject | Quarantine",
  "rationale": "string",
  "evidence_sufficiency_summary": "string",
  "missing_support_summary": "string",
  "conflict_summary": "string",
  "validator_summary": "string",
  "risk_if_wrong_band": "string",
  "confidence_band": "string",
  "human_review_required": true,
  "defensibility_rank": 1,
  "selected_as_recommendation": true,
  "rejection_reason_if_not_selected": "string"
}
```

## 11. HumanDecision Object

```json
{
  "human_decision_id": "string",
  "record_id": "string",
  "reviewer_role": "string",
  "reviewer_name": "string",
  "selected_action": "string",
  "decision_rationale": "string",
  "residual_risk_acknowledgment": "string",
  "decision_timestamp": "ISO-8601 string"
}
```

## 12. OverrideEvent Object

```json
{
  "override_event_id": "string",
  "record_id": "string",
  "cyberShield_recommended_action": "string",
  "human_selected_action": "string",
  "reviewer_role": "string",
  "reviewer_name": "string",
  "override_reason": "string",
  "residual_risk_acknowledgment": "string",
  "timestamp": "ISO-8601 string"
}
```

## 13. Report ID

Generate browser-side report ID:

CS-[YYYYMMDDHHMM]-[random 4 characters]

Example:

CS-202606171530-A7K2

Report ID is acceptable in user-facing output.  It is document tracking, not prototype versioning.

## 14. Framework Mapping Language

Use:

Relevant to [framework/control].  Not verified as compliant.

Do not imply:

- Framework mapping proves compliance
- Policy existence proves implementation
- SOC 2 existence proves vendor approval
- Vendor assertion equals independent evidence
- AI confidence equals evidence

## 15. Export Metadata

Include:

- Report ID
- Export timestamp
- Prepared by
- Report action
- Visitor email, if appropriate
- Selected contradiction type
- Vendor name
- Company or organization

Do not include internal prototype version numbers in user-facing reports.
