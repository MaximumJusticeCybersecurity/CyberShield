# 2026061138 Cross-Browser QA and Promotion Decision

## Decision

Promote `/vendor-risk-next.html` as the preferred high-touch demo route.

Keep `/vendor-risk.html` as the stable fallback route.

## Promotion Basis

Owner reported that both routes loaded quickly:

```text
/vendor-risk.html
/vendor-risk-next.html
```

The richer route was built to avoid the previous page-freeze cause:

- no open-ended MutationObserver loops
- sessionStorage instead of long-lived localStorage state
- fresh start on Identify
- render-once rich panels
- stable fallback route preserved

## Preferred Route

```text
/vendor-risk-next.html
```

Use this when showing:

- validators
- candidate action tournament
- AI Trust Decision Record naming
- default Dr. Max Justice reviewer/signature block
- schema-mapped Trust Decision Record direction
- prototype capture language

## Fallback Route

```text
/vendor-risk.html
```

Use this if any browser slows down, freezes, or behaves unexpectedly.

## Root Behavior

The root landing page now directs visitors to:

```text
/vendor-risk-next.html
```

The landing page still exposes:

```text
/vendor-risk.html
```

as the stable fallback.

## QA Routes

Before major review, check:

```text
/vendor-risk-next-smoke.html
/trust-decision-record-schema-smoke.html
/vendor-risk-smoke.html
/record-contract.html
/report-capture-test.html
```

## Guardrails

Do not claim:

- production readiness
- live LLM-backed analysis
- production CRM infrastructure
- compliance certification
- SOC 2 as automatic approval
- framework mapping as compliance proof
- autonomous vendor approval

Aegis remains internal for this build.

Trust Kernel may be referenced as supporting architecture, not as the main public message.

## Next Recommended Builds

```text
2026061139-stable-route-capture-cleanup
2026061140-report-print-polish
2026061141-feedback-integration-after-review
```
