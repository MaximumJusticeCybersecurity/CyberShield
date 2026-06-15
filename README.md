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

The record is the product.

## Current stability handoff

Read this first:

```text
docs/2026061133-successor-builder-handoff.md
```

Current stable label:

```text
2026061133-stability-handoff
```

Primary live root:

```text
https://maximumjusticecybersecurity.github.io/CyberShield/
```

Primary guided demo:

```text
/vendor-risk.html
```

Final review index:

```text
/review-index.html
```

Internal QA hub:

```text
/internal-qa.html
```

## Critical stability note

The live `/vendor-risk.html` route is intentionally in stability mode.

It currently loads only:

```text
src/atdr/vendor-risk-guided.js
```

Optional route-layer modules were temporarily disabled from the live guided route after browser unresponsiveness was reported across multiple browsers. Do not re-enable optional route-layer modules until they are rebuilt as stable, bounded renderers and tested.

## Fresh demo start rule

A fresh demo must start on:

```text
1. Identify
```

Normal `/vendor-risk.html` page load now resets saved step state to Identify so stale browser state cannot open the demo at step 6, Record.

Builder testing escape hatch:

```text
/vendor-risk.html?preserveStep=1
```

## Current route library

Controlled review routes:

```text
/review-index.html
/vendor-risk.html
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

## Next builder task

The owner will provide an updated architecture document to the next engineer.

Before coding, the next builder must:

```text
1. Read docs/2026061133-successor-builder-handoff.md.
2. Read the updated architecture document from the owner.
3. Reconcile the new architecture against the current stability handoff.
4. Update README, route-manifest.json, release-manifest.json, and record-contract.json if needed.
5. Only then modify the live guided route.
```

Recommended next build:

```text
2026061134-stability-first-route-architecture
```

Goal:

```text
Rebuild optional validator, evidence taxonomy, candidate-action, mobile polish, and capture panels as stable render-once components that cannot create page-freezing loops.
```
