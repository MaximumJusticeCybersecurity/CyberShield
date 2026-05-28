# CyberShield Source-of-Truth Hierarchy

Date: 2026-05-28
Baseline: V51.1 Executive Story and CTA Cleanup

## Purpose

CyberShield has had recurring metadata drift across builds.  Future builders need a clear rule for which file wins when files disagree.

## Source-of-truth order

When files conflict, use this hierarchy:

1. `governance-summary.json`
2. `README.md`
3. `bots.txt`
4. `docs/successor-builder-handoff-and-job-docket.md`
5. `docs/v52-v59-control-plane-build-plan.md`
6. Dedicated requirements docs under `docs/`
7. `docs/builder-version-log.md`
8. Live app code and Settings/admin metadata

## Reconciliation rule

If any source-of-truth files conflict, stop before coding and reconcile the release chain.

Do not build new features on top of conflicting metadata.

## Required reconciliation checks

Before coding, verify:

- current build label agrees across source-of-truth files
- current planned build agrees across planning docs
- no top-level tab rule is consistent
- prototype boundary is consistent
- no-live-capability limitations are consistent
- next build scope is consistent

## Builder rule

The repo is the institutional memory.  Chat memory is not sufficient.  If a requirement matters, it must be documented in the repo.
