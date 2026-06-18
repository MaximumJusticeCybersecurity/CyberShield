# CyberShield AI Decision Assurance

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

## Current architecture library

Read these first:

```text
docs/engineer-next-build-instructions.md
docs/aegis-cybershield-architecture-boundary.md
docs/2026061815-first-codex-agent-requirements-steward.md
docs/2026061815-sandeep-demo-path-and-advisor-briefing.md
docs/2026061815-cybershield-business-case.md
docs/cybershield-decision-assurance-requirements.md
docs/cybershield-trust-kernel-lite-architecture.md
docs/trust-decision-record-schema.md
docs/2026061717-harness-self-improvement-requirements.md
docs/2026061721-human-legibility-agency-requirements.md
docs/google-sheets-report-capture.md
docs/2026061133-successor-builder-handoff.md
```

Aegis remains internal for this build.  Public CyberShield language must stay focused on the buyer problem.

## First Codex-style agent

The first Codex-style CyberShield agent is the Requirements Steward Agent.

Canonical file:

```text
docs/2026061815-first-codex-agent-requirements-steward.md
```

The Requirements Steward Agent must run before code changes that affect demo scope, positioning, routes, ATDR schema, risk logic, claims, evidence, Harness Health, Human Legibility, exports, production claims, or the Aegis / CyberShield boundary.

## Current live route strategy

Advisor golden path:

```text
/vendor-risk-next.html
```

Fallback route:

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

`/vendor-risk.html` remains the fallback buyer route until the owner intentionally promotes or retires routes.

Do not re-enable optional route-layer modules on `/vendor-risk.html` until the richer route is tested.

`/vendor-risk-next.html` is the place to rebuild richer behavior first.

## Fresh demo start rule

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
/vendor-risk.html
/vendor-risk-next.html
/pilot-package.html
/demo-script.html
/review-feedback.html
/controlled-review-checklist.html
/internal-qa.html
/vendor-risk-smoke.html
/record-contract.html
/route-manifest.html
/report-capture-test.html
```

Preserved routes:

```text
/atdr.html
/demo-readiness.html
/advisor-feedback.html
/trust-kernel-legacy.html
```

The preserved routes are not the primary buyer demo.

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

Current configured Sheet ID is:

```text
1SDfqw-rRuluqBdPUT6Ex4UIajO-CCEtny84OTMKhQ3w
```

Source file:

```text
src/atdr/report-capture-config.js
```

Do not switch Sheet IDs unless the owner explicitly confirms a migration.

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

Trust Kernel language may be used as internal or supporting architecture language.  It should not dominate the public landing page.

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

Endpoint-backed capture, when enabled, is prototype-grade capture only, not production CRM infrastructure.

## Next engineering task

Recommended next build:

```text
2026061816-human-legibility-harness-demo-package
```

Goal:

```text
Use the Requirements Steward Agent first.  Then tighten the /vendor-risk-next.html advisor golden path with Human Legibility, Harness Health Assessment, Sandeep advisor briefing support, business-case pilot packaging, export language, and smoke checks.
```

Acceptance:

```text
Requirements Steward packet exists before implementation.
/vendor-risk-next.html remains the advisor golden path.
/vendor-risk.html remains fallback.
Human Legibility and Harness Health fields are visible or explicitly scoped for implementation.
AI Trust Decision Record print path works.
Capture submits to configured endpoint or simulates honestly.
No production or autonomous-agent capability is overclaimed.
```
