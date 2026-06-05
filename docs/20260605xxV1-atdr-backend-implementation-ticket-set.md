# 20260605xxV1 ATDR Backend Implementation Ticket Set

## Purpose

Convert the backend architecture package into buildable engineering tickets.

Core workflow:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

## Ticket 1: Scaffold Production ATDR Workspace

### Goal

Create the production app structure.

### Tasks

- Create `apps/atdr-web`
- Create `apps/atdr-api`
- Create `packages/atdr-core`
- Create `packages/atdr-schemas`
- Create `packages/atdr-export`
- Create `packages/atdr-model-contracts`
- Add TypeScript baseline
- Add lint and format commands
- Add environment configuration pattern

### Acceptance Criteria

- Local developer can install dependencies
- Local developer can run web shell
- Local developer can run API shell
- Shared packages can be imported

## Ticket 2: Create Database Schema

### Goal

Create the first persistent ATDR data model.

### Tables

- organizations
- users
- trust_decision_records
- claims
- evidence_items
- claim_evidence_links
- framework_mappings
- human_reviews
- audit_events
- export_artifacts
- model_runs

### Acceptance Criteria

- Migrations run locally
- Foreign keys preserve record-to-claim-to-evidence traceability
- Seed data includes one organization and three demo records

## Ticket 3: Build Record API

### Goal

Support persistent Trust Decision Record creation and retrieval.

### Endpoints

- `POST /api/records`
- `GET /api/records`
- `GET /api/records/{record_id}`
- `PATCH /api/records/{record_id}`

### Acceptance Criteria

- User can create a record
- Original AI recommendation is preserved
- Domain, intended use, source, source model, and decision context persist
- Audit event is written on create and update

## Ticket 4: Port Deterministic ATDR Engine

### Goal

Move the static prototype engine into the production core package.

### Tasks

- Port deterministic analysis logic
- Preserve three demo scenarios
- Preserve model-family separation
- Add schema validation
- Store model-run metadata

### Acceptance Criteria

- Vendor-risk scenario produces conservative outcome
- Security scenario produces conservative outcome
- Compliance scenario produces conservative outcome
- Model outputs validate before persistence

## Ticket 5: Build Claim API

### Goal

Support claim lifecycle.

### Endpoints

- `GET /api/records/{record_id}/claims`
- `POST /api/records/{record_id}/claims`
- `PATCH /api/claims/{claim_id}`
- `POST /api/claims/{claim_id}/split`
- `POST /api/claims/{claim_id}/merge`

### Acceptance Criteria

- Claims persist
- Claims can be edited
- Claims preserve original sentence and normalized claim
- Materiality can be changed
- Audit event is written for edits

## Ticket 6: Build Evidence Metadata API

### Goal

Support evidence item creation and metadata management.

### Endpoints

- `POST /api/records/{record_id}/evidence`
- `GET /api/records/{record_id}/evidence`
- `PATCH /api/evidence/{evidence_id}`

### Acceptance Criteria

- Evidence metadata persists
- Evidence type persists
- Source authority persists
- Freshness band persists
- Independence band persists
- Sensitivity label persists
- Audit event is written

## Ticket 7: Build Claim-Evidence Linking

### Goal

Link evidence to claims and assess relevance.

### Endpoints

- `POST /api/claims/{claim_id}/evidence/{evidence_id}`
- `DELETE /api/claims/{claim_id}/evidence/{evidence_id}`
- `PATCH /api/claim-evidence-links/{claim_evidence_link_id}`

### Acceptance Criteria

- Evidence can be linked to one or more claims
- Link relevance band persists
- Sufficiency band persists
- Caveat persists
- Conflict flag persists
- Audit event is written

## Ticket 8: Build Human Review API

### Goal

Support accountable human review.

### Endpoints

- `POST /api/records/{record_id}/reviews`
- `PATCH /api/reviews/{review_id}`
- `POST /api/reviews/{review_id}/decision`

### Acceptance Criteria

- Reviewer role persists
- Assigned reviewer persists
- Reviewer decision persists
- Reviewer notes persist
- Residual risk acknowledgement persists
- Notes required for high-risk approval or override

## Ticket 9: Build Export Service

### Goal

Generate durable export artifacts from stored structured data.

### Outputs

- JSON
- Markdown
- PDF proof of concept
- DOCX later if feasible

### Acceptance Criteria

- Export generated from database state, not frontend state
- Export includes limitations
- Export includes model metadata
- Export includes reviewer notes
- Export artifact hash is stored
- Export event is audited

## Ticket 10: Build Audit Event Service

### Goal

Create a durable audit trail for record decisions.

### Events

- record_created
- recommendation_submitted
- claim_extracted
- claim_edited
- evidence_added
- evidence_linked
- analysis_completed
- review_required
- reviewer_assigned
- reviewer_decision_saved
- export_generated
- record_rejected
- record_marked_not_defensible

### Acceptance Criteria

- Material user actions write audit events
- Material system actions write audit events
- Audit events are queryable by record
- Sensitive data is not unnecessarily logged

## Ticket 11: Build Frontend Intake and Claims Screens

### Goal

Create first production UI workflow.

### Screens

- Intake
- Classification summary
- Claims table

### Acceptance Criteria

- User can create record from UI
- User can run deterministic analysis
- User can review claims
- User can edit claim materiality

## Ticket 12: Build Frontend Evidence and Gaps Screens

### Goal

Create evidence workbench UI.

### Screens

- Evidence upload or metadata entry
- Evidence-to-claim linking
- Missing support display
- Conflicts display

### Acceptance Criteria

- User can add evidence metadata
- User can link evidence to claims
- Missing support updates visibly
- Weak evidence remains visibly weak

## Ticket 13: Build Frontend Risk, Confidence, and Review Screens

### Goal

Make the decision-control layer visible.

### Screens

- Risk If Wrong
- Confidence
- Human Review

### Acceptance Criteria

- Risk If Wrong displays consequence summary
- Confidence displays rationale
- Human review triggers display
- Reviewer decision and notes can be saved

## Ticket 14: Build Decision Record and Export Screens

### Goal

Make the product artifact visible and exportable.

### Screens

- Decision Record preview
- Export history

### Acceptance Criteria

- User can preview complete ATDR
- User can export JSON
- User can export Markdown
- User can generate PDF proof of concept

## Ticket 15: Add Role and Permission Model

### Goal

Introduce role-aware access.

### Roles

- Admin
- Record Creator
- Reviewer
- Viewer
- Exporter

### Acceptance Criteria

- Permissions enforced at API layer
- Reviewer actions limited to reviewer-capable roles
- Export actions limited to exporter-capable roles

## Ticket 16: Add Tenant Boundary Model

### Goal

Prepare for multi-organization usage.

### Tasks

- Add tenant_id to organization context
- Filter all record queries by organization
- Prevent cross-organization access

### Acceptance Criteria

- User cannot access another organization's records
- Evidence access is scoped to organization
- Audit events include organization context

## Ticket 17: Add Server-Side PDF Proof of Concept

### Goal

Generate a professional executive brief server-side.

### Tasks

- Create HTML template
- Generate PDF from stored record
- Include signature block
- Include limitations
- Include export metadata

### Acceptance Criteria

- PDF can be generated from record ID
- PDF is readable without dashboard context
- Export hash is stored

## Ticket 18: Add Live Model Feature Flag Stub

### Goal

Prepare for future live model integration without turning it on.

### Tasks

- Add model mode config
- Add provider interface
- Add deterministic provider
- Add live provider placeholder
- Add model run persistence

### Acceptance Criteria

- Deterministic mode remains default
- Live mode cannot run without explicit config
- Model provider interface is testable

## Ticket 19: Add Regression Harness

### Goal

Protect the three golden scenarios.

### Scenarios

- Vendor Risk: Contradictory Evidence
- Security: Vulnerability Risk Acceptance
- Compliance: NIST Control Claim

### Acceptance Criteria

- Regression test checks claims
- Regression test checks Risk If Wrong
- Regression test checks human review requirement
- Regression test checks conservative action
- Regression test checks export validity

## Ticket 20: Production MVP Review Gate

### Goal

Define when production MVP foundation is ready for pilot use.

### Acceptance Criteria

- Record persists
- Claims persist
- Evidence metadata persists
- Reviews persist
- Exports generate from server
- Audit trail exists
- Role model exists
- Tenant boundary exists
- Deterministic model pipeline works
- No autonomous remediation exists

## Ticket Execution Order

Recommended order:

```text
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 10 -> 8 -> 9 -> 11 -> 12 -> 13 -> 14 -> 15 -> 16 -> 17 -> 18 -> 19 -> 20
```

## Final Rule

Do not build broad dashboards before the Trust Decision Record workflow works end-to-end.
