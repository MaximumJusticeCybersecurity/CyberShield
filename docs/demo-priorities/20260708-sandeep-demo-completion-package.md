# Sandeep Demo Completion Package

Date: 2026-07-08
Owner: Dr. Max Justice
Priority: P0
Demo deadline: 2026-07-10 18:00 America/New_York
Issue: #26

## 1. Decision

Proceed with the current single-workflow vendor-risk MVP.  Do not add a second workflow before the demo.

Golden path:

`/vendor-risk-next.html`

Fallback:

`/vendor-risk.html`

The demo is complete when one AI-generated vendor-risk recommendation becomes one defensible AI Trust Decision Record.

## 2. Three-Minute Demo Script

### Opening, 20 seconds

AI can produce recommendations that sound polished and confident.  CyberShield asks a different question: can the organization defend acting on that recommendation based on the evidence available at the time?

### Challenge, 25 seconds

Use the sample recommendation:

> AI recommends approving Vendor X because they have a SOC 2 report, encrypt customer data, and appear low risk.

Ask the viewer whether they would approve, reject, or request more evidence before showing CyberShield's analysis.

### Claims and evidence, 45 seconds

Show that CyberShield separates the recommendation into material claims, including:

- the vendor should be approved;
- the SOC 2 report exists and is current;
- the report covers the service being reviewed;
- encryption is implemented and independently supported;
- customer-data use is acceptable;
- subprocessors are known;
- incident notification is adequate; and
- SOC 2 plus encryption is sufficient for approval.

Explain that the last statement is an unsupported leap unless the evidence closes the other material questions.

### Gaps, contradictions, and validators, 45 seconds

Show the controlled evidence issues:

- SOC 2 scope is unclear for the AI service;
- encryption support is self-attested;
- data-use language permits service improvement or derived use;
- subprocessors are incomplete;
- incident-notification timing is not fixed; and
- business comfort is not accountable approval.

Point out that CyberShield does not treat framework mapping, vendor assertions, or AI confidence as proof.

### Decision, 30 seconds

Show:

- Risk If Wrong: High
- Confidence Band: Low Confidence
- Strongest Defensible Action: Request Evidence
- Escalation: Vendor-Risk Owner, Security SME, Legal or Privacy Reviewer, and Business Owner

Explain that Escalate for Review is necessary, but review alone does not create the missing evidence.

### Record, 15 seconds

Generate the AI Trust Decision Record and show that it preserves:

- what the AI claimed;
- what evidence was available;
- what was missing or contradictory;
- what CyberShield inferred;
- what the human decided; and
- what residual risk remains.

## 3. Controlled Example Evidence Set

Use the existing synthetic evidence repository in `src/atdr/atdr-demo-data.js`.

The demo evidence set must include or represent:

1. SOC 2 report summary
2. SOC 2 scope excerpt
3. encryption statement or architecture note
4. data processing agreement
5. privacy or service-improvement language
6. subprocessor list
7. incident-notification clause
8. vendor questionnaire or self-attestation
9. business-owner pressure or approval draft
10. security-review note

All synthetic evidence must remain labeled as synthetic demonstration evidence.

## 4. Demo Operator Checklist

Before the meeting:

- Open `/vendor-risk-next.html` in a clean browser session.
- Confirm the MJC logo loads.
- Click `Reset Example`.
- Complete all six visible steps.
- Confirm claims render.
- Confirm evidence issues render.
- Confirm Request Evidence wins the candidate-action comparison.
- Confirm Risk If Wrong is High.
- Confirm Confidence is Low.
- Confirm Human Review Required is visible.
- Confirm the AI Trust Decision Record renders.
- Confirm JSON download works.
- Confirm browser Print / Save PDF shows only the report.
- Confirm no internal Sheet ID, endpoint, route, QA, prototype-version, or Aegis implementation language appears in the public record.
- Keep `/vendor-risk.html` available as fallback.

## 5. Demo Failure Recovery

If the preferred route fails:

1. Move immediately to `/vendor-risk.html`.
2. Use the same recommendation and narrative.
3. Do not troubleshoot live for more than 30 seconds.
4. Show the saved or printed AI Trust Decision Record if browser execution fails.
5. State the static prototype boundary honestly.

## 6. Acceptance Criteria

The P0 demo package is ready when:

- the preferred route completes recommendation-to-record without a dead end;
- the fallback route remains available;
- the recommendation, claims, evidence, gaps, risk, confidence, action, human review, and record are understandable in under three minutes;
- the report can be printed or saved as PDF;
- the demo makes no production, autonomous-approval, live-verification, or compliance-certification claim; and
- Dr. Max Justice retains final human authority.

## 7. Verification Roles

- Verifier A: Decision Assurance Implementer Agent
- Verifier B: Aegis
- Verifier C: Security Agent
- Final authority: Dr. Max Justice

A verifier that built or materially modified the exact candidate cannot independently attest to that same candidate.  Any conflict must be disclosed and handled through an owner-approved replacement or separate instance.
