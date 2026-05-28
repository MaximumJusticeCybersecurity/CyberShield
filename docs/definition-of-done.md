# CyberShield Definition of Done

Date: 2026-05-28
Baseline: V51.1 Executive Story and CTA Cleanup

## Purpose

A CyberShield build is not complete merely because code changed.  It is complete only when the repo, docs, requirements, QA, boundaries, and handoff are aligned.

## Definition of Done

A material build is done only when all of the following are true:

1. Code works for the intended scope
2. Release-chain metadata is aligned
3. README is updated
4. bots.txt is updated
5. governance-summary.json is updated
6. successor handoff is updated
7. builder-version-log is updated
8. affected requirement docs are updated
9. no-dead-click checklist passes
10. no-live-overclaim checklist passes
11. first-9-seconds standard passes for Briefing
12. Firefox performance is acceptable
13. mobile readability is acceptable
14. TrustMap behavior is not regressed
15. scoring model behavior is documented or externalized
16. reports/exports include boundary language when applicable
17. future builder can understand what changed and what remains

## Required files after every material build

Update when relevant:

- README.md
- bots.txt
- governance-summary.json
- docs/successor-builder-handoff-and-job-docket.md
- docs/builder-version-log.md
- docs/builder-requirements-acceptance-checklist.md
- requirements docs affected by the change

## Build failure conditions

A build fails Definition of Done if:

- code changed but documentation did not
- version labels conflict across files
- executive-facing UI shows internal build notes
- a score cannot be explained
- an interactive element is dead
- TrustMap regresses into flat/unclear/decorative state
- industry demo remains generic after onboarding
- live capability is overclaimed
- next builder cannot understand what to do next

## Acceptance statement

Before handing off, every builder should be able to say:

I updated the code, the requirements, the metadata, the builder log, the handoff, and the acceptance checklist.  I checked for dead clicks, overclaims, release drift, and recurring regressions.
