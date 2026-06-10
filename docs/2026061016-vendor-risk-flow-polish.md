# 2026061016 Vendor-Risk Flow Polish

## Purpose

Reduce cognitive load in the CyberShield ATDR workbench and keep the first visible product proof focused on one complete vendor-risk decision-assurance loop.

## Governing Rule

Vendor-risk demo first.  Do not broaden the product until the vendor-risk loop clearly demonstrates why an AI-generated vendor approval recommendation is not defensible without evidence and human review.

## Files Changed

- `src/atdr/atdr-vendor-risk-loop.js`

## What Changed

- The contradiction selector now drives visible evidence emphasis.
- The main vendor-risk panel now shows a tighter decision summary:
  - claims extracted
  - material conflicts
  - high-severity evidence gaps
  - strongest defensible action
  - Risk If Wrong
  - Confidence Band
  - human review requirement
- The selected contradiction now highlights specific synthetic evidence cards so the viewer can see why the recommendation breaks down.
- The side brief now leads with the buyer takeaway: the recommendation is plausible on the surface, but not defensible as written.
- Validator checks remain visible:
  - SOC 2 is not automatic approval.
  - Framework relevance is not compliance proof.
  - Self-attested evidence is weak.
  - Scope mismatch blocks defensibility.
  - Human review is required.
- Candidate action comparison remains visible:
  - Approve: Not defensible
  - Accept with caveat: Premature
  - Escalate: Required
  - Request Evidence: Strongest
- The report-generation step now reads as a final step instead of a generic added panel.
- The final step includes direct actions:
  - Print / Save PDF
  - Download JSON
  - Prepare CRM Payload

## Current Product Proof

A viewer should now understand, within one pass:

```text
The AI recommendation sounded reasonable, but CyberShield showed why approving the vendor without more evidence and human review would be risky and hard to defend.
```

## Remaining Limitations

- This is still a static GitHub Pages prototype.
- `REPORT_CAPTURE_ENDPOINT` remains blank until a Google Apps Script Web App or backend endpoint is configured.
- The CRM payload is prepared and simulated honestly, not submitted to Google Sheets yet.
- The original ATDR stage rail remains visible.  A later pass can simplify the route into a tighter guided flow.
- The contradiction selector emphasizes evidence visually, but the underlying evidence repository remains the same synthetic repository.
- Browser Print / Save PDF remains the current PDF path.
- No production persistence, authentication, tenant isolation, malware scanning, live model calls, server-side DOCX/PDF, or production integrations are active.

## Next Recommended Build

`2026061017-vendor-risk-guided-route`

Recommended focus:

1. Create a dedicated guided vendor-risk route or mode that hides secondary stages until needed.
2. Make the flow sequential:
   - Identify reviewer
   - Generate recommendation
   - Select contradiction
   - Review claims
   - Review evidence issues
   - Compare actions
   - Generate report
   - Capture email and CRM payload
3. Keep the current ATDR workbench available, but do not make it the primary demo experience.
4. Do not add TrustMap, broad dashboard, runtime, multi-domain expansion, or agentic concepts before the vendor-risk route feels finished.
