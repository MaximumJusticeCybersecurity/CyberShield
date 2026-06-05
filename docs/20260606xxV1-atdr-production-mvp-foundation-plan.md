# 20260606xxV1 ATDR Production MVP Foundation Plan

## Purpose

Define the first real application build after the backend architecture package.

The goal is not to rebuild all of CyberShield.  The goal is to create a durable production foundation for one workflow:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

## Guiding Rule

Do not build dashboards first.
Do not build TrustMap first.
Do not build autonomous remediation.
Do not build broad AI governance first.

Build the record workflow first.

## Recommended Repository Direction

Either create a new production app directory or a separate product repository.  If kept in this repo, use:

```text
apps/atdr-web/
apps/atdr-api/
packages/atdr-core/
packages/atdr-schemas/
packages/atdr-export/
packages/atdr-model-contracts/
```

## Application Layers

### `apps/atdr-web`

Responsibilities:

- Intake screen
- Claims table
- Evidence workbench
- Gaps and conflicts screen
- Risk If Wrong screen
- Confidence screen
- Human review screen
- Decision record preview
- Export actions

### `apps/atdr-api`

Responsibilities:

- Records API
- Claims API
- Evidence API
- Review API
- Export API
- Audit API
- Model run API

### `packages/atdr-core`

Responsibilities:

- Domain types
- State transition logic
- Risk If Wrong logic
- Confidence band logic
- Review gate logic
- Recommended action logic

### `packages/atdr-schemas`

Responsibilities:

- JSON schemas
- Zod schemas
- API DTO validation
- Model output validation

### `packages/atdr-export`

Responsibilities:

- PDF templates
- DOCX templates
- Markdown export
- JSON export
- Artifact metadata

### `packages/atdr-model-contracts`

Responsibilities:

- Model contract definitions
- Prompt versions
- Output schemas
- Allowed bands and labels
- Validation rules

## Production MVP Build Order

### Step 1: Project scaffolding

- Create app/workspace structure
- Add TypeScript baseline
- Add linting and formatting
- Add environment config
- Add shared schema package

### Step 2: Database foundation

- Add PostgreSQL schema
- Add migrations
- Add seed organization
- Add seed users
- Add seed demo records

### Step 3: Record API

- `POST /api/records`
- `GET /api/records`
- `GET /api/records/{record_id}`
- `PATCH /api/records/{record_id}`

### Step 4: Claim API

- Store extracted claims
- Edit claims
- Add missing claims
- Mark material or non-material
- Store required evidence type

### Step 5: Evidence metadata API

- Add evidence item
- Update evidence metadata
- Link evidence to claim
- Mark evidence unavailable

### Step 6: Static deterministic analysis service

- Port current deterministic logic from `src/atdr/atdr-engine.js`
- Keep model family separation
- Store model run metadata
- Validate outputs against schemas

### Step 7: Human review API

- Assign reviewer
- Save reviewer decision
- Save reviewer notes
- Save residual risk acknowledgment
- Require notes for high-risk approval or override

### Step 8: Export API

- JSON export
- Markdown export
- Server-side PDF proof of concept
- Export artifact record
- Artifact hash

### Step 9: Audit events

Log:

- Record created
- Recommendation submitted
- Claims extracted
- Claim edited
- Evidence added
- Evidence linked
- Analysis completed
- Review required
- Reviewer decision saved
- Export generated

### Step 10: Frontend workflow

Build screens in this order:

1. Intake
2. Claims
3. Evidence
4. Gaps
5. Risk
6. Confidence
7. Review
8. Decision Record
9. Export

## MVP Constraints

- Single organization can be seeded first, but schema must support tenant boundaries
- Deterministic model mode remains default
- Live model calls are not required
- Evidence file upload can begin as metadata-only, then add storage
- Server-side PDF can begin as HTML-to-PDF
- Do not connect to production systems
- Do not perform remediation

## Required Seed Scenarios

Seed records should mirror the static prototype:

1. Vendor Risk: Contradictory Evidence
2. Security: Vulnerability Risk Acceptance
3. Compliance: NIST Control Claim

## Minimum Data Persistence

Production MVP must persist:

- Record
- Recommendation text
- Claims
- Evidence metadata
- Claim-evidence links
- Risk If Wrong
- Confidence band
- Human review requirement
- Reviewer decision
- Reviewer notes
- Export artifact metadata
- Audit events

## Acceptance Criteria

Production MVP foundation is complete when:

- User can create a record
- Record persists in database
- Claims persist in database
- Evidence metadata persists in database
- Human review persists in database
- JSON export is generated server-side
- Audit events are written
- Static deterministic analysis produces the same high-level result as the GitHub Pages prototype
- Frontend workflow resembles the static prototype

## Deferred Until Later

- Live model provider
- Enterprise SSO
- Full tenant administration
- Malware scanning integration
- Full DOCX polish
- Advanced dashboards
- TrustMap integration
- Production system integrations
- Autonomous remediation

## Definition of Done

A builder can run a local production MVP app, create an ATDR record, persist it, review it, export it, and inspect audit events.

## Next Build

```text
20260607xxV1 Live Model Optionality
```
