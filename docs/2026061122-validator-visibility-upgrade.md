# 2026061122 Validator Visibility Upgrade

## Purpose

Make CyberShield's vendor-risk validators first-class in the guided route without changing the record contract or introducing numeric trust scores.

## Files Changed

- `src/atdr/vendor-risk-validators.js`
- `src/atdr/vendor-risk-guided-controls.js`
- `docs/2026061122-validator-visibility-upgrade.md`

## What Changed

Added a route-layer validator module that renders validator checks into `/vendor-risk.html` through the already-loaded guided controls module.

Validators now visibly answer:

- Is SOC 2 enough?
- Is encryption proof enough?
- Is framework mapping compliance proof?
- Is data-use language safe?
- Are subprocessors known?
- Is incident notification strong enough?
- Is human approval required?

Each validator includes:

- status: `Fail`, `Needs Evidence`, or `Pass`
- reason
- evidence needed
- decision impact

## Current Validator Outcomes

Expected for the vendor-risk demo:

- SOC 2 scope: `Needs Evidence`
- Encryption proof: `Needs Evidence`
- Framework mapping: `Fail`
- Data-use language: `Needs Evidence`
- Subprocessors: `Needs Evidence`
- Incident notification: `Needs Evidence`
- Human approval: `Fail`

Summary:

```text
2 fail, 5 need evidence
```

## Product Doctrine Preserved

- AI confidence is not evidence.
- SOC 2 is not automatic approval.
- Framework mapping is not compliance proof.
- The record is the product.
- Vendor risk remains the first wedge.
- No numeric trust score was added.

## What Did Not Change

- No new domains.
- No TrustMap/dashboard restoration.
- No live LLM behavior.
- No production readiness claims.
- No record contract changes.
- No change to the expected vendor-risk outcome: `Request Evidence`.

## Manual QA

After GitHub Pages refreshes:

1. Open `/vendor-risk.html`.
2. Confirm validator panel appears in the guided route.
3. Confirm validator side summary appears.
4. Confirm statuses show `2 fail` and `5 need evidence`.
5. Confirm `/vendor-risk-smoke.html` remains GO.
6. Confirm `/record-contract.html` remains GO.
7. Confirm mobile layout remains usable after the validator panel appears.

## Next Recommended Build

`2026061123-evidence-issue-taxonomy`

Purpose:

Standardize evidence issue labels across UI, JSON, smoke tests, and report.

Taxonomy:

- Missing
- Weak
- Stale
- Self-attested
- Contradictory
- Scope mismatch
- Not independently verified
- Reviewer authority missing
