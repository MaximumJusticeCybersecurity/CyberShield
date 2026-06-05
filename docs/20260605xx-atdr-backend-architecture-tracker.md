# 20260605xx ATDR Backend Architecture Tracker

## Purpose

Track the post-static architecture package for CyberShield AI Decision Assurance after the static MVP demo package is reviewed and merged.

## Current Context

The current branch focuses on a static GitHub Pages demo package.

Core workflow:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

The static MVP is intentionally browser-only and demo-oriented.

## Future Package

```text
20260605xxV1 Backend Architecture Package
```

## Architecture Topics to Define

- Application API layer
- Database schema
- User and role model
- Tenant boundary model
- Evidence storage model
- File handling controls
- Audit event store
- Server-side PDF generation
- Server-side DOCX generation
- Model orchestration service
- Optional live model provider feature flag
- Structured model output validation
- Model result versioning
- Prompt and model contract registry
- Export artifact hashing
- Record lifecycle state machine

## Doctrine to Preserve

```text
AI confidence is not evidence.
```

The production architecture must preserve separation among:

1. What the AI claimed
2. What the evidence says
3. What CyberShield inferred
4. What the human reviewer decided

## Migration Path From Static Prototype

The static prototype should become the product reference for:

- Demo paths
- Buyer narrative
- ATDR record structure
- Claim extraction workflow
- Evidence sufficiency workflow
- Risk If Wrong language
- Confidence language
- Human review gate
- Executive brief structure

The backend build should replace browser-only assumptions with durable services while preserving the workflow and product doctrine.

## Acceptance Criteria

This tracker is complete when the backend package defines:

- Proposed stack
- Data model
- API contracts
- Role and permission model
- Evidence handling model
- Export architecture
- Model orchestration approach
- Audit logging model
- Migration path from static prototype to production MVP
