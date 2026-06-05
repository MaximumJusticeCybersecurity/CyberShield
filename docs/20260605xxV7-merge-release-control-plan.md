# 20260605xxV7 ATDR Merge and Release Control Plan

## Purpose

Define the control plan for moving the CyberShield AI Decision Assurance static MVP and DOPE package from preview branch to live GitHub Pages.

## Current Feature Branch

```text
feature/2026060414-atdr-decision-assurance
```

## Current PR

```text
#4 Add CyberShield ATDR static MVP demo package
```

## Final Review Preview Branch

```text
preview-atdr-final-review
```

## Review Entry Route

```text
/package.html
```

## Release Goal

Publish the ATDR static MVP package without breaking the existing Trust Kernel.

## Live Route After Merge

```text
https://maximumjusticecybersecurity.github.io/CyberShield/package.html
```

Recommended demo start route after merge:

```text
https://maximumjusticecybersecurity.github.io/CyberShield/package.html
```

Alternative direct demo route:

```text
https://maximumjusticecybersecurity.github.io/CyberShield/demo.html
```

## Pre-Merge Checklist

Confirm these routes work on the final preview branch:

```text
/package.html
/readiness.html
/why-cybershield.html
/buyer-paths.html
/pilot.html
/demo.html
/launch.html
/atdr.html
/brief.html
/evidence.html
/review.html
/atdr-smoke.html
/index.html
```

## Merge Conditions

Merge only when:

- Package hub opens
- Readiness verifier opens
- Smoke test shows GO
- ATDR workbench opens
- Executive brief opens
- Buyer paths open
- Pilot page opens
- Trust Kernel opens
- No critical route is 404
- No public page implies capabilities not present in the static prototype

## Post-Merge Verification

After merging to main, verify:

```text
https://maximumjusticecybersecurity.github.io/CyberShield/package.html
https://maximumjusticecybersecurity.github.io/CyberShield/readiness.html
https://maximumjusticecybersecurity.github.io/CyberShield/atdr-smoke.html
https://maximumjusticecybersecurity.github.io/CyberShield/index.html
```

Then verify the remaining routes from `readiness.html`.

## Rollback Plan

If a critical issue appears after merge:

1. Revert PR #4 or restore main to the last known stable commit.
2. Confirm `index.html` still opens.
3. Use preview branch links for ATDR until a fix branch is ready.
4. Create a focused repair branch rather than patching many files at once.

## Release Note

Use:

```text
docs/2026060420V1-static-mvp-release-note-draft.md
```

as the starting release note.

## Production Work Rule

After merge, do not continue building production backend work directly into the static MVP branch.

Use smaller issue-driven production branches based on:

```text
docs/20260605xxV4-sprint-1-issue-pack.md
```

## Release Owner Guidance

This release should be treated as a static MVP and sales demonstration package, not a production platform release.

The production platform begins with the Sprint 1 backend foundation work.
