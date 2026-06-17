# Engineer Next Build Instructions

Date: 2026-06-17
Owner: Dr. Max Justice
Target: Next vendor-risk build
Audience: Engineer

## 1. Build This First

Build the vendor-risk AI Decision Assurance demo end to end.

Everything else is subordinate.

If a task does not directly help the vendor-risk demo produce a defensible Trust Decision Record, it is secondary.

## 2. North Star

Before relying on AI, CyberShield shows whether the recommendation is defensible.

Working product flow:

AI-generated recommendation in.  Defensible Trust Decision Record out.

## 3. Public Demo Priority

Do not build six half-working tabs.

Build one complete vendor-risk trust decision loop that makes the buyer say:

I need this before my team approves AI-generated vendor recommendations.

## 4. First Visible Flow

The first visible build must let the visitor complete this path:

1. See plain-English landing page.
2. Enter first name, optional company, optional vendor.
3. Select contradiction type.
4. Review AI-generated vendor approval recommendation.
5. See claims extracted.
6. See material claims identified.
7. See required evidence mapped.
8. See synthetic evidence repository.
9. See missing, weak, stale, self-attested, or contradictory evidence.
10. See validator checks.
11. See candidate action comparison.
12. See Request Evidence as strongest defensible action.
13. See Escalate for Review triggered.
14. See Risk If Wrong.
15. See Confidence Band.
16. See Human Review Required.
17. Generate Trust Decision Record.
18. Enter email only at report generation.
19. Print or download the executive report.
20. Capture metadata plus structured record JSON if Google Sheet endpoint is configured.

## 5. Do Not Prioritize Yet

Do not prioritize these until the vendor-risk demo works end to end:

- TrustMap
- Runtime
- Settings
- Architecture tab polish
- Multiple industries
- Multi-domain demos
- Full dashboard
- Full multi-tenant behavior
- Real model integration
- Advanced upload processing
- Agentic workflows
- Analytics
- General governance screens
- Extra visual effects
- Aegis public positioning

## 6. Landing Page Copy

Hero:

Before relying on AI, know whether the recommendation is defensible.

Subheadline:

CyberShield turns AI-generated recommendations into clear decision records showing claims, evidence, gaps, Risk If Wrong, confidence, and required human review.

Primary CTA:

Try a Vendor-Risk Sample

Secondary CTA:

Request a Demo

Tertiary link:

Contact Maximum Justice Cybersecurity

## 7. Aegis Boundary

Use very little Aegis language in the CyberShield public demo.

Aegis is internal for this build.  CyberShield buyers should not need to understand Aegis.

Do not put Aegis OS, digital twin, personal trusted partner, or identity continuity language on the main CyberShield landing page.

## 8. Main Engineering Files

Use these docs as the current library for the next build:

- docs/cybershield-decision-assurance-requirements.md
- docs/cybershield-trust-kernel-lite-architecture.md
- docs/aegis-cybershield-architecture-boundary.md
- docs/trust-decision-record-schema.md
- docs/google-sheets-report-capture.md
- docs/requirements-traceability-matrix.md

## 9. Google Sheet Capture

Use the provided Google Sheet ID:

1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw

If a Google Apps Script endpoint already exists, configure REPORT_CAPTURE_ENDPOINT.

If the endpoint does not exist, implement it or simulate capture honestly until it is ready.

Never put Google credentials in front-end code.

## 10. Report Output

Minimum:

- On-screen executive report
- Browser print
- PDF download or print-to-PDF path

Client-side DOCX and fully polished PDF generation may follow after the vendor-risk loop works.

## 11. Acceptance Gate

The build is ready for review only when the user can complete the vendor-risk loop from landing page to Trust Decision Record export without hitting dead screens, unexplained buttons, or future-state placeholders.

## 12. Failure Gate

The build fails if it leads with TrustMap, Runtime, general dashboards, Aegis public concepts, broad scoring, or multi-industry expansion before the vendor-risk Decision Assurance demo works end to end.
