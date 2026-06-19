# CyberShield AI Decision Assurance

Version: 2026061909

## Current strategic direction

CyberShield is focused on one workflow:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

The first proof point is:

```text
AI-generated vendor-risk recommendation in -> defensible AI Trust Decision Record out
```

The public artifact name is:

```text
AI Trust Decision Record
```

The pilot positioning is:

```text
software-assisted advisory pilot
```

The record is the product.  Aegis remains internal for this build.

## Agent entry point

All agents and builders must begin with:

```text
AGENTS.md
```

Current agent sequence:

1. **Requirements Steward Agent** determines what may be built and under what constraints.
2. **Decision Assurance Implementation Agent** implements only the approved task packet.
3. **Verification and Repo Closeout Agent** is planned for independent validation and closeout.

Canonical agent files:

```text
docs/2026061815-first-codex-agent-requirements-steward.md
docs/2026061909-second-codex-agent-decision-assurance-implementation.md
```

Current implementation-agent mission:

```text
docs/2026061909-requirements-steward-packet-report-layout-polish.md
docs/2026061909-decision-assurance-implementation-agent-first-mission.md
```

## Current architecture and builder library

Read these first:

```text
AGENTS.md
docs/engineer-next-build-instructions.md
docs/2026061909-forward-build-plan.md
docs/2026061909-second-codex-agent-decision-assurance-implementation.md
docs/2026061908-trusted-authority-ethical-influence-standard.md
docs/2026061815-first-codex-agent-requirements-steward.md
docs/aegis-cybershield-architecture-boundary.md
docs/cybershield-decision-assurance-requirements.md
docs/trust-decision-record-schema.md
docs/2026061717-harness-self-improvement-requirements.md
docs/2026061721-human-legibility-agency-requirements.md
docs/requirements-traceability-matrix.md
docs/definition-of-done.md
docs/builder-requirements-acceptance-checklist.md
docs/successor-builder-handoff-and-job-docket.md
docs/builder-version-log.md
```

Advisor and business-case references:

```text
docs/2026061815-sandeep-demo-path-and-advisor-briefing.md
docs/2026061815-cybershield-business-case.md
docs/google-sheets-report-capture.md
```

## Agent authorization rule

The Requirements Steward Agent must run before material code changes that affect demo scope, positioning, routes, AI Trust Decision Record schema, risk logic, claims, evidence, Harness Health, Human Legibility, exports, production claims, or the Aegis / CyberShield boundary.

The Decision Assurance Implementation Agent may begin material work only when the task-specific steward decision is:

```text
Proceed
```

or:

```text
Proceed with constraints
```

The implementation agent shall work on a task branch, prepare a review packet or pull request, and shall not merge without explicit human approval.

## Current live route strategy

Advisor golden path:

```text
/vendor-risk-next.html
```

Fallback buyer route:

```text
/vendor-risk.html
```

Review index:

```text
/review-index.html
```

Internal QA hub:

```text
/internal-qa.html
```

## Stability rule

`/vendor-risk-next.html` is the formal golden path for Sandeep and advisor review.

`/vendor-risk.html` remains the fallback buyer route until the owner intentionally promotes, replaces, or retires routes.

Do not re-enable optional route-layer modules on `/vendor-risk.html` until the richer route is tested.

A fresh demo must start on:

```text
1. Identify
```

`/vendor-risk.html` resets saved step state to Identify on normal page load.

`/vendor-risk-next.html` uses `sessionStorage` so stale browser state does not survive across sessions.

## Current route library

Controlled review routes:

```text
/review-index.html
/vendor-risk-next.html
/vendor-risk.html
/pilot-package.html
/demo-script.html
/review-feedback.html
/feedback-triage.html
/controlled-review-checklist.html
/internal-qa.html
/vendor-risk-next-smoke.html
/vendor-risk-smoke.html
/trust-decision-record-schema-smoke.html
/record-contract.html
/capture-source-of-truth-smoke.html
/report-capture-test.html
/report-print-qa.html
/route-manifest.html
```

Preserved or internal inspection routes:

```text
/atdr.html
/demo-readiness.html
/advisor-feedback.html
/trust-kernel-legacy.html
```

These routes are not the primary buyer demo.

## Current demo contract

Expected vendor-risk sample output:

```text
Domain: vendor-risk
Claims extracted: 10
Recommended Action: Request Evidence
Risk If Wrong: High
Confidence Band: Low confidence
Human Review Required: Yes
```

Expected out-of-scope safety output:

```text
Domain: out-of-scope
Confidence Band: Unknown confidence
Risk If Wrong: Unknown
Recommended Action: Out of Scope for Current Review
Human Review Required: Yes
Record Defensibility: Not defensible
Framework mappings: 0
```

## Capture source of truth

Current configured Sheet ID:

```text
1SDfqw-rRuluqBdPUT6Ex4UIajO-CCEtny84OTMKhQ3w
```

Source file:

```text
src/atdr/report-capture-config.js
```

Do not switch Sheet IDs unless the owner explicitly confirms a migration.

Browser submission is not proof of row creation.  Verify the resulting row before claiming capture success.

## Doctrine

Do not ask only:

```text
Do we trust the AI?
```

Ask:

```text
Can the organization defend acting on this AI-generated recommendation based on the evidence available at the time?
```

Internal doctrine:

```text
AI confidence is not evidence.
```

The Trusted Authority and Ethical Influence Standard requires evidence before confidence, restraint before expansion, meaningful human authority, legitimate no-action outcomes, and transparent commercial incentives.

## Boundaries

Do not claim:

```text
production readiness
live model-backed analysis
production persistence
production authentication
tenant isolation
server-side DOCX/PDF generation
production CRM infrastructure
compliance certification
SOC 2 as automatic approval
framework mapping as compliance proof
autonomous vendor approval
```

Browser Print / Save PDF is the current export path.

Endpoint-backed capture is prototype-grade capture only, not production CRM infrastructure.

## Current implementation state

The advisor golden path includes Human Legibility and Harness Health Assessment content and carries those fields into the AI Trust Decision Record payload and print report.

Current authorized next build:

```text
2026061143-report-layout-polish-after-print-test
```

First-mission objective:

```text
Inspect actual browser print or saved PDF output, document observed defects, and make the smallest bounded changes required to produce a polished executive AI Trust Decision Record without changing decision logic, schema semantics, routes, or prototype boundaries.
```

The next planned build after owner acceptance is:

```text
2026061144-feedback-integration-after-review
```

Do not skip into broader platform expansion unless the owner changes priority.