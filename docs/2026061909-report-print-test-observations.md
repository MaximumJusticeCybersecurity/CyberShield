# Report Print Test Observations

Date: 2026-06-20 to 2026-06-21
Tester / agent: Decision Assurance Implementation Agent
Baseline commit tested: `cecabf277a381d12671a7ebe3e15efc31420ff35`
Browser and version: Microsoft Edge / Chromium 149.0.0.0, Skia PDF m149
Environment: Windows 10-compatible runtime; local HTTP server at `127.0.0.1`; browser viewport 1265 x 720
Print destination: Save to PDF through headless Chromium
Paper size: Letter, 612 x 792 points
Orientation: Portrait
Scale: Browser default (100 percent)
Margins: 0.45 inch from report `@page` CSS
Browser headers / footers: Disabled
Page count before: 3
Page count after: 3

## Baseline decision contract

- Recommended Action: Request Evidence
- Risk If Wrong: High
- Confidence Band: Low confidence
- Human Review Required: Yes

## Baseline defects

| ID | Page | Severity | Observation | Expected behavior | Proposed correction |
|---|---:|---|---|---|---|
| PRINT-001 | 1 | High | Print inherited the narrow-screen media query. Metadata and all four executive decision cards collapsed into single-column blocks, consuming most of page one. | Letter print should retain a compact two-column metadata grid and four-card executive decision row. | Add print-specific grid overrides without changing screen behavior. |
| PRINT-002 | 1 | High | The accountable decision owner and explicit next human action were not shown on page one. | Page one should show the owner or pending assignment and the next human action. | Render the existing canonical `decision_owner` and a bounded evidence/review action immediately below the decision summary. |
| PRINT-003 | 2-3 | High | The canonical executive report did not visibly include Human Legibility, Meaningful Human Authority, Challenge-Tested status, or Harness Health Assessment. | Accepted report-level governance and harness information should remain visible without changing the record schema or decision logic. | Add report-only presentation derived from the existing canonical record, validators, claims, evidence items, recommendation, and prototype boundaries. |

## Changes made

| Defect ID | File | Change | Reason |
|---|---|---|---|
| PRINT-001 | `ai-trust-decision-record-report.html` | Added print-only grid, repeated table-header, and row grouping rules. | Restore executive hierarchy and readable pagination on Letter paper. |
| PRINT-002 | `ai-trust-decision-record-report.html` | Added Decision Owner and Next Human Action to page-one content. | Make accountable human action immediately legible. |
| PRINT-003 | `ai-trust-decision-record-report.html` | Added deterministic report presentation for facts, assumptions, CyberShield inference, recommendation, Challenge-Tested status, Meaningful Human Authority, and the five Harness Health checks. | Preserve accepted governance content in the canonical report without altering mapper/schema or recommendation semantics. |
| PRINT-002, PRINT-003 | `report-print-qa.html` | Expanded automated source checks from 5 to 7. | Guard the new critical print contract elements. |

## Post-change verification

| Check | Result | Evidence / observation |
|---|---|---|
| Chromium saved PDF | PASS | Three-page tagged Letter PDF generated with Edge/Chromium 149 and inspected page by page after PNG rendering at 144 DPI. |
| Page-one executive hierarchy | PASS | Title, vendor, report/record IDs, timestamp, Request Evidence, High, Low confidence, Human Review Required: Yes, pending owner, and next action are visible on page one. |
| Claims table | PASS | One row continues on page two; the table header repeats and no cell is clipped or hidden. |
| Validator and candidate-action tables | PASS | All rows and columns are legible with no clipping or overlap. |
| Human Legibility / Meaningful Human Authority | PASS | Facts, assumptions, CyberShield inference, recommendation, Challenge-Tested status, reviewer agency, owner, and next action are visible. |
| Harness Health Assessment | PASS | Inputs / Sources, Reach / Permissions, Job / Purpose, Proof / Evidence, and Value / Usefulness are visible with bounded findings. |
| Reviewer/signature block | PASS | Dr. Max Justice block remains together on page three with usable signature and date lines. |
| Limitations and capture boundary | PASS | Static advisory prototype, browser print path, prototype-grade Sheet capture, and row-verification requirement remain visible. |
| Browser-only controls | PASS | Toolbar and navigation are absent from the PDF. |
| Report Print QA | PASS | `READY FOR MANUAL PRINT QA`; 7 automated checks. |
| Preferred advisor route | PASS | Completed Identify through Record; Request Evidence / High / Low confidence / Human Review Required remained unchanged. Human Legibility and Harness Health remained visible. |
| Fallback route | PASS | `/vendor-risk.html` loaded with no source change. |
| Guided fallback smoke | PASS | `/vendor-risk-smoke.html`: GO, 12 passed, 0 failed. |
| Schema smoke | PASS | `/trust-decision-record-schema-smoke.html`: GO; schema validation and decision contract remained intact. |
| Record contract | PASS | `/record-contract.html`: GO, 17 passed, 0 failed. |
| Print privacy check | PASS | PDF contains no endpoint URL, Sheet ID, email, browser-storage internals, token, credential, or secret value. Source secret-pattern scan returned no matches. |
| No-overclaim check | PASS | No production-readiness, certification, autonomous approval, live-model, live-verification, or production-CRM claim was added. The sentence “Mapping is not compliance proof” remains an intentional guardrail. |

## Failures and warnings

- `/vendor-risk-next-smoke.html` reported `NO-GO`: its static check treats the explanatory text `MutationObserver` and internal-boundary word `Aegis` as failures; its `Starts on Identify` check also depends on existing session state. These files were not changed by this print task. The preferred route itself completed successfully through Record.
- `/capture-source-of-truth-smoke.html` reported `NO-GO` because an inactive historical Sheet ID remains documented. Capture configuration and behavior were not changed by this task.
- Headless Edge emitted a renderer task-provider diagnostic after successfully writing each PDF. PDF creation and rendering completed normally.
- Git reports an LF-to-CRLF checkout warning for the two modified HTML files on Windows; `git diff --check` reports no whitespace errors.

## Remaining limitations

- Firefox native print preview is unverified. Firefox is installed, but safe Windows browser URL-policy enforcement was unavailable to the automation environment.
- The report remains a static advisory prototype using synthetic evidence.
- Browser Print / Save PDF remains the export path; no server-side PDF or DOCX generator was added.
- Google Sheet capture remains prototype-grade and no real Sheet row was submitted or verified.
- The preferred-route and capture smoke `NO-GO` findings above are pre-existing, out-of-scope QA debt and should be handled by a separately stewarded task.

## Owner review items

- Review the three-page Chromium PDF for executive hierarchy and brand presentation.
- Confirm the report-only Human Legibility and Harness Health wording remains appropriately bounded.
- Decide whether the pre-existing preferred-route and capture smoke failures must be repaired before merge or tracked separately.
- Decide whether Firefox print-preview verification is required before merge.
