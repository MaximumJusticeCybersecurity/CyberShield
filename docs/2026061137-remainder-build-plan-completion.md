# 2026061137 Remainder Build Plan Completion

## Purpose

Complete the remaining stability-first build plan after PR #6 merged.

## Completed Builds

```text
2026061135-test-and-promote-vendor-risk-next
2026061136-session-storage-state-cleanup
2026061137-schema-contract-mapping
```

## Stable Route Strategy

`/vendor-risk.html` remains the stable buyer route.

It should be used when reliability is more important than showing all advanced panels.

## Rich Route Strategy

`/vendor-risk-next.html` is the richer experimental route.

It includes:

- sessionStorage state
- fresh start on Identify
- validator checks
- candidate action tournament
- AI Trust Decision Record naming
- default Dr. Max Justice reviewer/signature block
- prototype capture support using configured endpoint
- no MutationObserver loops
- Aegis kept out of public copy

## New QA Routes

```text
/vendor-risk-next-smoke.html
/trust-decision-record-schema-smoke.html
```

## Schema Mapper

Added:

```text
src/atdr/trust-decision-record-schema-mapper.js
```

Purpose:

Map current deterministic engine output into the target AI Trust Decision Record schema described in:

```text
docs/trust-decision-record-schema.md
```

## Capture Source of Truth

Current configured Sheet ID:

```text
1SDfqw-rRuluqBdPUT6Ex4UIajO-CCEtny84OTMKhQ3w
```

Source:

```text
src/atdr/report-capture-config.js
```

The architect's alternate Sheet ID remains inactive unless the owner confirms migration.

## Manual Testing Order

1. `/vendor-risk.html`
2. `/vendor-risk-next.html`
3. `/vendor-risk-next-smoke.html`
4. `/trust-decision-record-schema-smoke.html`
5. `/record-contract.html`
6. `/report-capture-test.html`
7. `/review-index.html`
8. `/internal-qa.html`

## Promotion Gate

Do not promote `/vendor-risk-next.html` into the primary route until:

- Brave loads it quickly.
- Chrome loads it quickly.
- Firefox loads it quickly.
- Mobile browser loads it quickly.
- It starts on Identify.
- Smoke route is GO.
- Schema smoke route is GO.
- Print / Save PDF produces a readable AI Trust Decision Record.
- Capture language remains honest.

## Known Follow-Up

The older stable guided script still has legacy capture assumptions.  Since `/vendor-risk.html` was restored for stability, do not perform a broad rewrite there unless needed.  Prefer to validate `/vendor-risk-next.html` first, then decide whether to promote it or selectively backport features.

## Next Recommended Build

```text
2026061138-cross-browser-qa-and-promotion-decision
```

Goal:

Test both routes in Brave, Chrome, Firefox, and mobile.  If `/vendor-risk-next.html` remains stable, either promote it or make it the route used for higher-touch demos while keeping `/vendor-risk.html` as fallback.
