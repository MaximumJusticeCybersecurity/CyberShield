# 20260605xxV13 Vendor-Risk Evidence Workbench Release Note

## Summary

This release begins converting the V12 frozen vendor-risk architecture package into live demo behavior.

## Primary Goal

Wire the synthetic vendor-risk evidence pack into the ATDR workbench so the demo shows:

```text
Synthetic evidence pack -> evidence workbench -> visible contradictions -> Trust Decision Record
```

## Updated Code

```text
src/atdr/atdr-demo-data.js
src/atdr/atdr-engine.js
src/atdr/atdr-smoke-test.js
```

## Demo Data Update

The default vendor-risk demo now uses the V12 synthetic evidence structure:

- SOC 2 Summary
- SOC 2 Scope Excerpt
- Encryption Architecture Note
- Data Processing Agreement Excerpt
- Subprocessor List
- Incident Notification Clause
- Security Questionnaire Excerpt
- Business Owner Approval Note
- Security Reviewer Note

## Engine Update

The deterministic static engine now expects the vendor-risk scenario to produce ten claims:

1. Vendor X should be approved
2. Vendor X has a SOC 2 report
3. The SOC 2 report is current
4. The SOC 2 report covers the evaluated AI service
5. Vendor X encrypts customer data
6. Vendor X has acceptable customer data use terms
7. Vendor X has acceptable subprocessor transparency
8. Vendor X has acceptable incident notification terms
9. Vendor X appears low risk
10. SOC 2 plus encryption is sufficient for approval

## Expected Findings

The vendor-risk demo should reveal:

- SOC 2 scope does not clearly cover the evaluated AI service
- DPA permits service improvement use of customer data or derived data
- Subprocessor list is incomplete
- Incident notification terms lack a specific timeline
- Business urgency is not evidence

## Expected Decision Brief

```text
Decision Readiness: Not Defensible Yet
Recommended Action: Request Evidence
Risk If Wrong: High
Confidence Band: Low confidence
Human Review Required: Yes
```

## Smoke Test Update

The smoke test now checks:

- Vendor demo has ten claims
- Vendor evidence repository has nine synthetic documents
- Vendor demo detects material contradictions
- Vendor demo recommends Request Evidence
- Vendor demo is High Risk If Wrong
- Vendor demo requires human review

## Remaining V13 Polish

The workbench already displays evidence, gaps, claims, risk, confidence, review, and export. The next polish pass should make contradiction evidence more explicit in the Gaps screen and Decision Brief rather than relying on conflict status alone.

## Next Version

```text
20260605xxV14 Executive Brief Export Prototype
```

V14 should focus on the executive proof artifact: polished print/PDF-ready brief and DOCX-style structure with signature block, claims/evidence table, contradiction section, limitations, and export metadata.
