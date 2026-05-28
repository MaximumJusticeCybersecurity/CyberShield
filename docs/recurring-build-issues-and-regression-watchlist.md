# Recurring Build Issues and Regression Watchlist

Date: 2026-05-28
Baseline: V51.1

## Purpose

This document captures recurring issues that have appeared across multiple CyberShield versions and builders.  Future builders must read this before coding and must verify these issues do not recur.

## Recurring issue 1: Single-file bloat

Problem:

`index.html` has repeatedly become too large, too compressed, and too difficult to maintain.  This has caused builders to shrink, rewrite, or oversimplify the app, which then caused interaction loss, TrustMap regression, metadata drift, and feature confusion.

Requirement:

Future builds must move toward modular structure:

```text
index.html
/assets/css/
/assets/js/
/data/models/
/data/profiles/
/data/scenarios/
/data/dashboards/
/data/reports/
/data/evidence/
/data/frameworks/
```

Do not keep adding large scoring, onboarding, role, scenario, report, or TrustMap logic directly into `index.html`.

## Recurring issue 2: Release metadata drift

Problem:

Multiple versions had README, bots.txt, governance-summary.json, builder logs, and live app metadata disagreeing about the current build.  V51 review identified stale metadata that still described V47.1 as current.

Requirement:

Every material build must update and verify:

- README.md
- bots.txt
- governance-summary.json
- docs/successor-builder-handoff-and-job-docket.md
- docs/builder-version-log.md
- index.html Settings/admin metadata if app changed

## Recurring issue 3: Dead-click and shallow interaction regression

Problem:

Multiple versions showed cards, bubbles, scorecards, TrustMap nodes, and relationship lines that appeared interactive but did not explain, route, calculate, download, or trigger a meaningful next step.

Requirement:

Apply `docs/no-dead-click-interaction-standard.md` before every release.  No visible interactive object should be decorative.

## Recurring issue 4: TrustMap visual and interaction regression

Problem:

TrustMap repeatedly regressed from an interactive relationship map into flat bubbles, weak symbols, unreadable elements, missing relationship explanations, or shallow click behavior.

Requirement:

Use `docs/trustmap-memory-anchor-requirements.md` as the TrustMap source of truth.  TrustMap is the flagship memory surface and must not be treated as a secondary diagram.

## Recurring issue 5: Generic demo risk

Problem:

CyberShield can become too generic if onboarding, dashboards, scenarios, reports, and evidence requirements do not change by role and industry.

Requirement:

Use `docs/onboarding-input-output-map.md` and `docs/industry-demo-path-requirements.md`.  Demo paths must be credible to experienced operators in DIB/federal contractor SMB, financial services/community banking, AI-enabled SMB/SaaS/professional services, and healthcare/federal health security.

## Recurring issue 6: Hidden scoring logic

Problem:

Scores were created inside JavaScript without visible model files, model versions, factor weights, evidence requirements, or limitations.

Requirement:

Use `docs/scoring-model-registry-requirements.md`.  Move models into `/data/models/*.json` and ensure every visible score routes to model explanation.

## Recurring issue 7: Overclaim risk

Problem:

CyberShield language can imply live enforcement, takedown automation, live marketplace scanning, identity verification, CRM sync, or enterprise integrations before those exist.

Requirement:

Boundary language must remain in shareable outputs and admin/builder metadata.  Do not claim live capabilities unless implemented and verified.

## Recurring issue 8: Registry creation and connector friction

Problem:

During the 2026-05-28 documentation hardening pass, several JSON registry file creation attempts under `/data` were blocked by the connector.  This has now been partially resolved, but future builders must verify the registry files exist and are valid before relying on them.

Requirement:

Before V52 coding, verify or create:

- `/data/models/model-registry.json`
- `/data/onboarding/onboarding-map.json`
- `/data/profiles/role-profiles.json`
- `/data/profiles/industry-profiles.json`
- `/data/scenarios/scenario-registry.json`
- `/data/dashboards/dashboard-registry.json`
- `/data/reports/report-registry.json`
- `/data/evidence/evidence-types.json`
- `/data/frameworks/framework-registry.json`

If connector write fails, create locally through GitHub Desktop or CLI and commit manually.

## Acceptance rule

A future build is not complete until the builder confirms these recurring issues have not reappeared.
