# 20260605xxV4 Backend Issue Index

## Purpose

Create the production MVP backlog from the backend implementation ticket set.

Source ticket set:

```text
docs/20260605xxV1-atdr-backend-implementation-ticket-set.md
```

## Production Build Principle

Do not repeat the prototype pattern of one giant branch for backend work.

Production work should use smaller issue-driven PRs.

## Issue Groups

### Foundation

1. Scaffold Production ATDR Workspace
2. Create Database Schema
3. Build Record API
4. Port Deterministic ATDR Engine

### Record Workflow

5. Build Claim API
6. Build Evidence Metadata API
7. Build Claim-Evidence Linking
8. Build Human Review API

### Durable Output

9. Build Export Service
10. Build Audit Event Service
11. Build Frontend Intake and Claims Screens
12. Build Frontend Evidence and Gaps Screens
13. Build Frontend Risk, Confidence, and Review Screens
14. Build Decision Record and Export Screens

### Security and Scale Preparation

15. Add Role and Permission Model
16. Add Tenant Boundary Model
17. Add Server-Side PDF Proof of Concept
18. Add Live Model Feature Flag Stub
19. Add Regression Harness
20. Production MVP Review Gate

## Recommended Issue Labels

```text
atdr
backend
frontend
schema
export
audit
review
security
mvp
```

## Recommended Milestones

```text
ATDR Production Foundation
ATDR Export Hardening
ATDR Live Model Optionality
```

## First Sprint Recommendation

Sprint 1 should include:

1. Scaffold Production ATDR Workspace
2. Create Database Schema
3. Build Record API
4. Port Deterministic ATDR Engine
5. Add Regression Harness foundation

## Acceptance Criteria for Backlog Readiness

The backlog is ready when:

- Issues are small enough for independent PRs
- Each issue has acceptance criteria
- Record traceability is preserved
- Export generation remains tied to stored data
- Audit events are included early
- Live model work is explicitly feature-flagged and deferred until validation exists
