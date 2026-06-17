# CyberShield Definition of Done

Date: 2026-06-17
Baseline: 2026061717 Harness Self-Improvement Requirements

## Purpose

A CyberShield build is not complete merely because code changed.  It is complete only when the repo, docs, requirements, QA, boundaries, harness assumptions, and handoff are aligned.

## Definition of Done

A material build is done only when all of the following are true:

1. Code works for the intended scope
2. Release-chain metadata is aligned
3. README is updated when the public story changes
4. bots.txt is updated when builder guidance changes
5. governance-summary.json is updated when governance posture changes
6. successor handoff is updated
7. builder-version-log is updated
8. affected requirement docs are updated
9. requirements traceability matrix is updated
10. no-dead-click checklist passes
11. no-live-overclaim checklist passes
12. first-9-seconds standard passes for the active demo
13. Firefox performance is acceptable
14. mobile readability is acceptable
15. legacy TrustMap behavior is not regressed unless intentionally isolated
16. scoring model behavior is documented or externalized
17. reports/exports include boundary language when applicable
18. affected harness assumptions are documented
19. material model, workflow, source, permission, or proof changes trigger harness review
20. future builder can understand what changed and what remains

## Required files after every material build

Update when relevant:

- README.md
- bots.txt
- governance-summary.json
- docs/successor-builder-handoff-and-job-docket.md
- docs/builder-version-log.md
- docs/builder-requirements-acceptance-checklist.md
- docs/requirements-traceability-matrix.md
- requirements docs affected by the change
- harness or decision-assurance docs affected by the change

## Harness Definition of Done

When a build affects agents, AI-assisted workflows, AI Trust Decision Records, evidence review, decision routing, scoring, or exports, the builder must document whether the change affects:

1. Inputs / Sources
2. Reach / Permissions
3. Job / Purpose
4. Proof / Evidence
5. Value / Usefulness

The build is incomplete if the harness changed but the documentation does not explain the change.

## Build failure conditions

A build fails Definition of Done if:

- code changed but documentation did not
- version labels conflict across files
- executive-facing UI shows internal build notes
- a score cannot be explained
- an interactive element is dead
- legacy TrustMap regresses into flat, unclear, or decorative behavior without intentional isolation
- industry demo remains generic after onboarding
- live capability is overclaimed
- an agent or workflow silently expands authority
- an agent or workflow silently changes job classification
- model or workflow changes do not trigger harness review
- proof trail is not inspectable where the UI claims evidence support
- next builder cannot understand what to do next

## Acceptance statement

Before handing off, every builder should be able to say:

I updated the code, the requirements, the metadata, the builder log, the handoff, and the acceptance checklist.  I checked for dead clicks, overclaims, release drift, recurring regressions, harness drift, authority changes, source freshness, proof quality, and next-builder clarity.
