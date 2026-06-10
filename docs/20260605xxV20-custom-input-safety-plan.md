# 2026061014 Custom Input Safety Gating and Vendor-Risk Priority Control

## Purpose

Make the ATDR workbench safer with custom user input while preserving the first visible product proof: one complete vendor-risk decision-assurance loop.

## Engineering Priority Control

Vendor-risk demo first.

The first visible CyberShield build must make the vendor-risk demo work end to end.  Everything else is subordinate.

Plain-language rule for builders:

```text
Do not show six half-working tabs.  Show one complete vendor-risk trust decision loop that makes the buyer say, "I need this before my team approves AI-generated vendor recommendations."
```

## Non-Negotiable First Visible Build

The first visible CyberShield build must allow a user to complete this full path:

1. Enter first name, optional company, optional vendor.
2. Load or generate the AI vendor-risk recommendation.
3. Select contradiction type.
4. See claims extracted.
5. See material claims identified.
6. See required evidence mapped.
7. See synthetic evidence repository.
8. See missing, weak, stale, self-attested, or contradictory evidence.
9. See validator checks.
10. See candidate action comparison.
11. See Request Evidence as the strongest defensible action.
12. See Escalate for Review triggered.
13. See Risk If Wrong.
14. See Confidence Band.
15. See Human Review Required.
16. Generate the Trust Decision Record.
17. Enter email only at report generation.
18. Print or download the executive report.
19. Capture metadata plus structured record JSON for Google Sheet submission when endpoint is configured.

## Subordinate Until Vendor-Risk Works

Do not prioritize these until the vendor-risk demo works end to end:

- TrustMap
- Runtime
- Settings
- Architecture tab polish
- Multiple domains
- Security recommendation demo
- Compliance recommendation demo
- Full dashboard
- Full multi-tenant behavior
- Real model integration
- Advanced upload processing
- Agentic workflows
- Analytics
- Generic governance screens
- Extra visual effects

If a task does not directly help the vendor-risk demo produce a defensible Trust Decision Record, it is secondary.

## First Build Success Test

The first build succeeds only when a viewer can understand this within one pass:

```text
The AI recommendation sounded reasonable, but CyberShield showed why approving the vendor without more evidence and human review would be risky and hard to defend.
```

When choosing between polish and scope:

- Polish the vendor-risk flow.
- Cut secondary screens.
- Cut future-state concepts.
- Cut broad platform language.
- Keep the Trust Decision Record.
- Keep validators.
- Keep contradiction detection.
- Keep the executive report.

The first product proof is not breadth.  The first product proof is one complete vendor-risk decision-assurance loop.

## Domain-Fit Classifier

The domain-fit classifier is its own named Trust Kernel Lite service:

```text
classifyDomainFit()
```

It runs before claim extraction.

Execution order:

1. Intake recommendation.
2. Run `classifyDomainFit()`.
3. If supported, continue to claim extraction.
4. If unsupported, generate a schema-valid out-of-scope Trust Decision Record.
5. Export or display the out-of-scope finding if needed.

`classifyRecommendation()` may exist later, but only after the domain-fit gate passes.

## Supported V1 Domains

CyberShield V1 is narrow by design:

- Vendor-risk recommendation review
- Security-risk recommendation review
- Compliance/control recommendation review

V1 does not support general-purpose advice.

Adjacent topics are blocked unless they are directly tied to vendor-risk, security, or compliance evidence review.

Out-of-scope unless directly tied to supported evidence review:

- HR
- Legal
- Finance
- Procurement
- Ethics
- Politics
- Marketing
- Strategy
- General operations
- Philosophical questions
- Moral reasoning
- Existential risk
- Personal advice
- Medical advice
- Investment advice

## Unsupported-Domain Handling

Unsupported-domain records are still schema-valid Trust Decision Records.  This keeps smoke tests, export logic, audit logic, and decision lineage consistent.

Unsupported-domain records do not proceed into full evidence review.

Required behavior for unsupported records:

- Domain: out-of-scope
- Domain-fit status: unsupported or unclear
- Confidence: Unknown confidence
- Risk If Wrong: Unknown
- Recommended Action: Out of Scope for Current Review
- Record Defensibility: Not defensible
- Human Review Required: Yes
- No compliance/framework mapping
- One placeholder domain-fit finding is allowed so UI sections do not break, but it must not be treated as a material evidence claim.

## Problem Found

A broad existential recommendation such as:

```text
Humanity is not worth saving.
```

with context:

```text
Is this true?
```

and intended use:

```text
understand the meaning of life
```

must not produce Medium confidence.

Expected output:

- Domain: out-of-scope
- Confidence: Unknown confidence
- Recommended Action: Out of Scope for Current Review
- Human Review Required: Yes
- Record Defensibility: Not defensible
- No compliance/framework mapping

## Out-of-Scope CTA Hierarchy

Out-of-scope moments must not feel like a dead end or a sales trap.  They should steer the visitor back into the strongest demo lane.

Primary CTA:

```text
Try Vendor-Risk Sample
```

Secondary CTA:

```text
Request Demo
```

Tertiary smaller link:

```text
Contact Maximum Justice Cybersecurity
```

Suggested copy:

```text
This demo is intentionally narrow.

CyberShield works best right now on AI-generated vendor-risk, security, or compliance recommendations. Try the vendor-risk sample to see the full Trust Decision Record workflow.
```

## CRM / Report Capture Requirement

CRM/report capture target:

```text
https://docs.google.com/spreadsheets/d/1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw/edit?usp=sharing
```

Sheet ID:

```text
1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw
```

Because CyberShield is hosted on GitHub Pages, the static front end must not store or use Google credentials.  Use a `REPORT_CAPTURE_ENDPOINT` configuration value for a Google Apps Script Web App or backend endpoint.

If `REPORT_CAPTURE_ENDPOINT` is blank:

- Simulate capture honestly.
- Store pending report event in browser session/local storage if needed.
- Log the event to the browser console for developer validation.
- Do not claim the event was saved to Google Sheets.

If `REPORT_CAPTURE_ENDPOINT` is populated:

- POST metadata plus full structured Trust Decision Record JSON.
- Show success or failure honestly.
- Do not block report generation if capture fails.

Required capture payload includes metadata plus `structured_record_json`.

## Acceptance Criteria

This build is complete when:

- `classifyDomainFit()` runs before claim extraction.
- Unsupported philosophical, existential, moral, political, vague, or broad universal statements do not receive Medium confidence.
- Unsupported universal claims are flagged as out-of-scope.
- Unsupported records are schema-valid Trust Decision Records.
- Unsupported records have no framework mapping.
- The exact humanity case returns Unknown confidence and Not defensible.
- The out-of-scope UI steers users to Try Vendor-Risk Sample first.
- The vendor-risk contradictory evidence demo still extracts 10 claims.
- Vendor-risk still recommends Request Evidence.
- Vendor-risk still classifies Risk If Wrong as High.
- Vendor-risk still requires human review.
- Vendor-risk remains the first visible product proof.
