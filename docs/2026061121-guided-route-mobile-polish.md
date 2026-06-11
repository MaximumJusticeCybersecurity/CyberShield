# 2026061121 Guided Route Mobile Polish

## Purpose

Improve `/vendor-risk.html` usability on phones and narrow screens without changing the underlying vendor-risk Trust Decision Record workflow.

## Files Changed

- `src/atdr/vendor-risk-guided-controls.js`
- `docs/2026061121-guided-route-mobile-polish.md`

## What Changed

- Added route-specific responsive CSS through the already-imported controls module.
- Added a mobile-only current-step cue at the top of the guided route.
- Improved topbar wrapping and button sizing on narrow screens.
- Improved grid behavior for forms, summaries, and evidence cards.
- Improved table overflow behavior using horizontal scrolling instead of viewport breakage.
- Improved touch target sizing for buttons, inputs, and selects.
- Added step button synchronization so the mobile cue follows direct step clicks.

## What Did Not Change

- No new public routes.
- No new product domain.
- No TrustMap/dashboard restoration.
- No live LLM behavior.
- No record contract changes.
- No production readiness claims.

## Acceptance Criteria

Manual QA should confirm:

1. `/vendor-risk.html` loads on phone width.
2. The topbar does not crowd the route.
3. Header buttons are tappable.
4. Step cue shows the current step.
5. Step buttons remain readable.
6. Forms stack cleanly.
7. Tables scroll horizontally instead of breaking the viewport.
8. Print / Save PDF and Save Follow-Up remain reachable.
9. `/vendor-risk-smoke.html` remains GO.
10. `/record-contract.html` remains GO.

## Next Recommended Build

`2026061122-validator-visibility-upgrade`

Purpose:

Make validators first-class in the guided route and executive report.

Validator questions:

- Is SOC 2 enough?
- Is encryption proof enough?
- Is framework mapping compliance proof?
- Is data-use language safe?
- Are subprocessors known?
- Is incident notification strong enough?
- Is human approval required?
