# 2026061123 Evidence Issue Taxonomy

## Purpose

Standardize evidence issue labels across the vendor-risk guided demo so CyberShield uses consistent language when explaining why an AI-generated vendor approval recommendation is not defensible yet.

## Files Changed or Added

- `src/atdr/evidence-issue-taxonomy.js`
- `src/atdr/vendor-risk-validators.js`
- `docs/2026061123-evidence-issue-taxonomy.md`

## Taxonomy Added

Evidence issue types:

- Missing
- Weak
- Stale
- Self-attested
- Contradictory
- Scope mismatch
- Not independently verified
- Reviewer authority missing

## What Changed

- Added reusable evidence issue taxonomy module.
- Added definitions, vendor-risk examples, and decision effects for each issue type.
- Mapped validator checks to issue types.
- Added issue tags to each validator card.
- Added a collapsible taxonomy explanation inside the validator panel.
- Added issue-type count to the validator side summary.

## Product Doctrine Preserved

- No numeric trust score.
- No autonomous approval.
- No compliance proof claim.
- No SOC 2 automatic approval.
- `Request Evidence` remains the strongest defensible action.

## Manual QA

Check:

1. `/vendor-risk.html` loads.
2. Validator cards show evidence issue tags.
3. Evidence issue taxonomy details can be expanded.
4. Side summary shows fail count, needs-evidence count, and issue-type count.
5. `/vendor-risk-smoke.html` remains GO.
6. `/record-contract.html` remains GO.
7. Mobile layout remains usable.

## Next Recommended Build

`2026061124-candidate-action-tournament-v1`

Purpose:

Make candidate action comparison more rigorous and transparent.

Candidate actions:

- Approve
- Accept with Caveat
- Request Evidence
- Escalate for Review
- Reject
- Quarantine
- Out of Scope for Current Review

Vendor-risk expected winner:

```text
Request Evidence
```
