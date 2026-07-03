# CyberShield AI Trust Decision Certificate Specification

**Document ID:** CS-TCERT-SPEC-001  
**Version:** 2026070308  
**Status:** Proposed Level 1 specification  
**Program:** CyberShield Trust Certificate Program

## 1. Purpose

This specification defines the minimum data, presentation, lifecycle, verification, and anti-misuse requirements for the CyberShield AI Trust Decision Certificate.

The certificate is a bounded executive assurance artifact derived from an AI Trust Decision Record.  It shall not replace the underlying record or imply assurance beyond the stated decision, evidence, context, and intended use.

## 2. Certificate title and trust mark

### Formal title

```text
CyberShield AI Trust Decision Certificate
```

### Optional trust mark

```text
CyberShield Assured
```

The trust mark may appear only when linked to a current verification record.  It shall not appear alone without scope, status, certificate ID, and verification access.

## 3. Certificate statuses

The certificate lifecycle shall support:

- `Draft`
- `Issued`
- `Expired`
- `Suspended`
- `Revoked`
- `Superseded`

Only `Issued` certificates may be presented as current assurance.  All other statuses shall be visually and textually unmistakable.

## 4. Assurance outcomes

The certificate shall display exactly one assurance outcome:

- `Assured`
- `Assured with Conditions`
- `Insufficient Assurance`
- `Not Assured`

The visual treatment shall not obscure or soften an adverse or conditional outcome.

## 5. Required certificate fields

### Identity and lifecycle

- Certificate ID.
- Certificate version.
- Current status.
- Issue date and time.
- Expiration date or next-review date.
- Superseding certificate ID when applicable.
- Verification URL or equivalent registry locator.
- Verification QR code when used.

### Recipient and scope

- Recipient organization.
- Decision owner or responsible business role.
- Decision or recommendation evaluated.
- Intended use.
- Operating context.
- Unsupported or prohibited uses.
- Affected system, process, product, or transaction where applicable.

### AI and workflow identity

- AI system, model, agent, application, or workflow name.
- Relevant version or release identifier.
- Material tools, integrations, or retrieval sources where relevant.
- Unknown or unavailable system details.

### Assurance findings

- Assurance outcome.
- Risk-if-Wrong classification.
- Confidence band.
- Evidence sufficiency conclusion.
- Material conditions.
- Material limitations.
- Material assumptions.
- Residual risk statement.
- Required human oversight.
- Approved next action or decision boundary.

### Evidence and methodology

- AI Trust Decision Record ID.
- Evidence package reference.
- Evidence cutoff date.
- CyberShield Trust Decision Standard version.
- Methodology or ruleset version.
- Assessment type.
- Assurance level.

### Authorization

- Human reviewer or assurance authority.
- Reviewer role and organization.
- Authorization date.
- Digital signature, verification hash, or controlled authorization record when implemented.
- Independence disclosure.

### Reliance language

- Bounded-assurance statement.
- No-guarantee statement.
- Material-change and reassessment statement.
- Current-status verification instruction.

## 6. Assurance levels

### Level 1 - Automated Assessment

CyberShield generates a draft assessment using approved deterministic rules and available evidence.  Human authorization remains required before certificate issuance.

### Level 2 - CyberShield SME Validated

A qualified vCISO, Security SME, Cybersecurity SME, compliance professional, or appropriate domain reviewer validates the assessment and authorizes issuance.

### Level 3 - Independently Assured

An authorized assessor independent of readiness assistance validates the assessment under the formal scheme requirements.

Until Level 3 governance is implemented and evidenced, no certificate may claim independent certification merely because a second person reviewed it.

## 7. Recommended one-page visual hierarchy

### Header band

- CyberShield identity.
- Certificate title.
- Assurance outcome.
- Current lifecycle status.
- Certificate ID.

### Decision scope panel

- Recipient organization.
- Decision evaluated.
- Intended use.
- AI system or workflow.
- Issue and expiration dates.

### Assurance summary panel

- Risk-if-Wrong.
- Confidence band.
- Evidence sufficiency.
- Human review requirement.
- Assurance level.

### Conditions and limitations panel

- Mandatory conditions.
- Unsupported uses.
- Material limitations.
- Residual risk.

### Verification and authorization panel

- Reviewer or assurance authority.
- Standard and methodology version.
- AI Trust Decision Record reference.
- QR code and verification instruction.

### Footer

- Required reliance disclaimer.
- Current-status warning.
- Program contact or challenge process.

## 8. Visual design requirements

- Use the established CyberShield dark navy or black executive design with restrained blue accents.
- Make the assurance outcome and lifecycle status readable in grayscale and without relying solely on color.
- Use plain-language labels before technical metrics.
- Keep conditions and limitations at equal or greater prominence than positive trust language.
- Do not use seals, government-style insignia, legal scales, regulatory crests, or imagery that implies public authority or accreditation.
- Do not display a numerical score without its meaning, limitations, and controlling decision gates.
- Do not use visual polish as evidence of trustworthiness.
- Ensure browser print and Save PDF produce a legible one-page certificate where feasible.

## 9. Certificate ID format

Recommended initial format:

```text
CS-TDC-YYYYMMDD-<random-or-sequential-identifier>-V<n>
```

Example:

```text
CS-TDC-20260703-7F42A1-V1
```

The identifier shall not expose sensitive customer information.  The registry shall enforce uniqueness.

## 10. Verification record

The verification record shall contain at minimum:

- Certificate ID.
- Current status.
- Assurance outcome.
- Recipient organization or privacy-preserving recipient reference.
- Decision scope summary.
- Issue date.
- Expiration or next-review date.
- Standard version.
- Certificate version.
- Supersession relationship.
- Status-change history.
- Hash or digest of the issued certificate when implemented.
- Link or controlled reference to the underlying AI Trust Decision Record.

The public verification view shall not disclose confidential evidence, personal data, security-sensitive details, or customer information beyond the approved publication scope.

## 11. Machine-readable data model

The MVP should support a structured object containing at least:

```json
{
  "certificate_id": "CS-TDC-20260703-7F42A1-V1",
  "certificate_version": 1,
  "status": "draft",
  "assurance_outcome": "assured_with_conditions",
  "recipient": {
    "organization_name": "",
    "decision_owner_role": ""
  },
  "decision": {
    "title": "",
    "statement": "",
    "intended_use": "",
    "operating_context": "",
    "unsupported_uses": []
  },
  "ai_system": {
    "name": "",
    "model": "",
    "version": "",
    "workflow": "",
    "unknown_details": []
  },
  "assurance": {
    "risk_if_wrong": "",
    "confidence_band": "",
    "evidence_sufficiency": "",
    "conditions": [],
    "limitations": [],
    "assumptions": [],
    "residual_risk": "",
    "human_review_required": true,
    "approved_next_action": ""
  },
  "methodology": {
    "trust_decision_record_id": "",
    "evidence_package_id": "",
    "standard_version": "2026070308",
    "methodology_version": "",
    "evidence_cutoff_at": "",
    "assurance_level": "cybershield_sme_validated"
  },
  "authorization": {
    "reviewer_name": "",
    "reviewer_role": "",
    "reviewer_organization": "",
    "authorized_at": "",
    "independence_disclosure": ""
  },
  "lifecycle": {
    "issued_at": "",
    "expires_at": "",
    "next_review_at": "",
    "supersedes_certificate_id": null,
    "superseded_by_certificate_id": null
  },
  "verification": {
    "verification_url": "",
    "certificate_digest": "",
    "digest_algorithm": ""
  }
}
```

This is a proposed certificate object.  It shall not silently modify the canonical AI Trust Decision Record schema.

## 12. Required disclaimer

The certificate shall communicate substantially the following:

> This certificate reports a bounded assurance conclusion for the identified AI-supported decision, intended use, evidence set, system context, and assessment date.  It is not a universal determination that the underlying AI system is trustworthy.  It is not a guarantee of accuracy, safety, legality, compliance, performance, or absence of loss.  Material changes may invalidate the conclusion and require reassessment.  Verify current status using the certificate ID before relying on this artifact.

Final wording requires legal review before production issuance.

## 13. Misuse controls

- The certificate shall not be cropped to remove conditions, status, or disclaimer.
- The trust mark shall not be transferred to another product, decision, system, or organization.
- Marketing use shall require the full scope statement or direct verification link.
- Expired, suspended, revoked, or superseded certificates shall not be represented as current.
- CyberShield shall preserve the ability to suspend or revoke the certificate for material misuse.
- The recipient shall be required to stop using the mark after suspension, revocation, or expiration.

## 14. MVP rendering requirements

The first controlled prototype shall:

- Render from structured certificate data.
- Support all four outcomes and all lifecycle statuses.
- Display conditions and limitations prominently.
- Produce a browser-printable certificate.
- Produce sanitized JSON for review.
- Use a non-production verification placeholder clearly labeled as such.
- Prevent issuance status without an authorized human-review field.
- Preserve a direct reference to the AI Trust Decision Record.

## 15. Non-goals for the first prototype

- Production cryptographic signing.
- Public production registry.
- Customer authentication.
- Tenant isolation.
- Automated renewal or revocation.
- Accreditation marks.
- Insurance-policy linkage.
- Production PDF or DOCX server generation.
- Public certificate issuance.