# 20260605xx-20260607 ATDR Post-Static Roadmap Index

## Purpose

Index the build packages that come after the static CyberShield AI Decision Assurance MVP demo package.

## Static MVP Baseline

The static MVP is represented by:

```text
docs/2026060420-static-version-completion-record.md
```

Primary preview route:

```text
https://raw.githack.com/MaximumJusticeCybersecurity/CyberShield/preview-atdr-2026060420/demo.html
```

## Post-Static Build Packages

### 20260605xxV1 Backend Architecture Package

Read:

```text
docs/20260605xxV1-atdr-backend-architecture-package.md
```

Purpose:

Define the production architecture for API, database, evidence handling, audit logging, export generation, model orchestration, and role-aware access.

### 20260606xxV1 Production MVP Foundation Plan

Read:

```text
docs/20260606xxV1-atdr-production-mvp-foundation-plan.md
```

Purpose:

Define the first real application build structure, implementation order, packages, APIs, persistence, and production MVP constraints.

### 20260607xxV1 Live Model Optionality Plan

Read:

```text
docs/20260607xxV1-atdr-live-model-optionality-plan.md
```

Purpose:

Define how live model support can be added behind a feature flag without sacrificing deterministic demo reliability, schema validation, auditability, or cost control.

## Build Order

```text
1. Merge or stabilize static MVP
2. Build backend architecture package into implementation tickets
3. Scaffold production app foundation
4. Port deterministic ATDR engine into backend service
5. Add persistent records, claims, evidence metadata, reviews, exports, and audit events
6. Add server-side export generation
7. Add optional live model provider only after schemas and audit controls exist
```

## Non-Negotiable Product Doctrine

```text
AI confidence is not evidence.
```

The production product must preserve separation among:

1. What the AI claimed
2. What the evidence says
3. What CyberShield inferred
4. What the human reviewer decided

## What Not To Build Next

Do not prioritize:

- Dashboard-first UI
- TrustMap-first UI
- Runtime agent controller
- Autonomous remediation
- Generic trust score platform
- Broad AI governance suite

until the AI Trust Decision Record workflow is persistent, reviewable, exportable, and defensible.

## Product Direction

The models are the engine.

The record is the product.

The first commercial win is a defensible AI Trust Decision Record for AI-generated security, compliance, and vendor-risk recommendations.
