# 20260605xxV1 ATDR Backend Architecture Package

## Purpose

Define the production architecture for CyberShield AI Decision Assurance after the static GitHub Pages prototype.

Core workflow:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

Primary artifact:

```text
AI Trust Decision Record
```

Doctrine:

```text
AI confidence is not evidence.
```

## Architecture Goal

Move from browser-only static demo to a real application that can persist records, control access, store evidence, audit changes, generate exports, and eventually support optional live model analysis without losing deterministic demo mode.

## Recommended Stack

### Frontend

- Next.js or React with TypeScript
- Zod or equivalent schema validation
- Enterprise component system
- Form-driven evidence workbench
- Print-safe executive brief rendering
- Feature flags for deterministic and live model modes

### Backend

- Node.js with Fastify/NestJS or Python FastAPI
- REST API first
- Background job queue for exports and model runs
- Strict JSON schema validation for all model outputs
- Server-side export service

### Database

- PostgreSQL
- Relational tables for core entities
- JSONB only for bounded model artifacts, not primary record truth
- Strong foreign keys for traceability
- Row-level tenant boundary design from the beginning

### File Storage

- Object storage for uploaded evidence
- Database metadata for each evidence item
- Controlled access through backend
- Signed URLs only where appropriate
- Hash every uploaded artifact

### Export

- Server-side PDF generation
- Server-side DOCX generation when feasible
- JSON export
- Markdown export
- Export artifact hashing
- Export metadata embedded in every artifact

### Model Layer

- Provider abstraction
- Deterministic demo mode retained
- Optional live model mode behind feature flag
- Prompt template registry
- Model contract registry
- Input and output hashes
- Output schema validation
- Repair attempt followed by fail-safe state

## Core Services

### Record Service

Responsibilities:

- Create Trust Decision Records
- Maintain lifecycle state
- Preserve original AI recommendation
- Store intended use, source, source model, context, domain, and owner
- Enforce state transition rules

### Claim Service

Responsibilities:

- Store extracted claims
- Support claim edits, splits, merges, additions, and materiality changes
- Preserve original sentence and normalized claim
- Maintain claim-level evidence requirements

### Evidence Service

Responsibilities:

- Store evidence metadata
- Manage evidence uploads
- Link evidence to claims
- Track evidence type, source authority, freshness, independence, sensitivity, and caveats
- Treat evidence as untrusted data

### Analysis Service

Responsibilities:

- Run deterministic or live model pipeline
- Validate model outputs
- Store model run metadata
- Calculate Risk If Wrong, confidence, missing support, conflicts, hazards, and recommended action

### Review Service

Responsibilities:

- Assign reviewer roles
- Store reviewer decisions
- Require notes when needed
- Preserve human decision separately from CyberShield inference

### Export Service

Responsibilities:

- Generate PDF, DOCX, JSON, and Markdown exports
- Embed limitations and metadata
- Store artifact hash
- Preserve export history

### Audit Service

Responsibilities:

- Log all material actions
- Store before and after state where practical
- Preserve user, timestamp, record, event type, and source metadata

## Required Entity Model

### Organization

Fields:

- organization_id
- tenant_id
- organization_name
- created_at
- updated_at

### User

Fields:

- user_id
- organization_id
- name
- email
- role
- permissions
- created_at
- updated_at

### TrustDecisionRecord

Fields:

- record_id
- organization_id
- created_by_user_id
- record_type
- record_status
- original_ai_recommendation
- ai_source
- source_model
- intended_use
- domain
- recommendation_type
- decision_context
- risk_if_wrong_band
- confidence_band
- recommended_action
- required_next_step
- decision_owner_user_id
- human_review_required
- review_status
- record_defensibility_band
- limitations
- analysis_version
- export_version
- created_at
- updated_at

### Claim

Fields:

- claim_id
- record_id
- original_sentence
- normalized_claim
- claim_type
- domain
- related_recommendation
- required_evidence_type
- materiality
- unsupported_flag
- evidence_sufficiency_band
- missing_support_severity
- conflict_status
- confidence_band
- risk_if_wrong_band
- reviewer_notes
- created_at
- updated_at

### EvidenceItem

Fields:

- evidence_id
- record_id
- uploaded_by_user_id
- evidence_name
- evidence_type
- source_type
- source_authority_band
- file_uri
- file_hash
- text_extract
- evidence_date
- freshness_band
- independence_band
- sensitivity_label
- created_at
- updated_at

### ClaimEvidenceLink

Fields:

- claim_evidence_link_id
- claim_id
- evidence_id
- relevance_band
- sufficiency_band
- caveat
- conflict_flag
- created_at
- updated_at

### FrameworkMapping

Fields:

- mapping_id
- record_id
- claim_id
- framework_name
- framework_version
- control_or_category
- mapping_type
- relevance_explanation
- compliance_warning_text
- created_at

Required warning language:

```text
Relevant to [framework/control]. Not verified as compliant.
```

### HumanReview

Fields:

- review_id
- record_id
- required_reviewer_role
- assigned_reviewer_user_id
- review_status
- reviewer_decision
- reviewer_notes
- residual_risk_acknowledgement
- reviewed_at
- created_at
- updated_at

### AuditEvent

Fields:

- audit_event_id
- organization_id
- record_id
- user_id
- event_type
- event_description
- before_state
- after_state
- timestamp
- source_ip
- user_agent

### ExportArtifact

Fields:

- export_id
- record_id
- export_type
- export_uri
- export_timestamp
- export_version
- generated_by_user_id
- hash
- created_at

### ModelRun

Fields:

- model_run_id
- record_id
- model_name
- model_version
- prompt_version
- analysis_version
- input_hash
- output_hash
- input_payload
- output_payload
- validation_status
- failure_reason
- created_at

## API Surface

### Records

- `POST /api/records`
- `GET /api/records`
- `GET /api/records/{record_id}`
- `PATCH /api/records/{record_id}`
- `POST /api/records/{record_id}/analyze`
- `POST /api/records/{record_id}/transition`

### Claims

- `GET /api/records/{record_id}/claims`
- `POST /api/records/{record_id}/claims`
- `PATCH /api/claims/{claim_id}`
- `POST /api/claims/{claim_id}/split`
- `POST /api/claims/{claim_id}/merge`

### Evidence

- `POST /api/records/{record_id}/evidence`
- `GET /api/records/{record_id}/evidence`
- `PATCH /api/evidence/{evidence_id}`
- `POST /api/claims/{claim_id}/evidence/{evidence_id}`
- `DELETE /api/claims/{claim_id}/evidence/{evidence_id}`

### Review

- `POST /api/records/{record_id}/reviews`
- `PATCH /api/reviews/{review_id}`
- `POST /api/reviews/{review_id}/decision`

### Exports

- `POST /api/records/{record_id}/exports`
- `GET /api/records/{record_id}/exports`
- `GET /api/exports/{export_id}`

### Audit

- `GET /api/records/{record_id}/audit-events`

## Security Requirements

- Authentication required for all non-public routes
- Role-based access control
- Tenant boundary enforcement
- Evidence access limited by organization and permissions
- Audit all record, claim, evidence, review, export, and model-run changes
- Never allow uploaded evidence to control system instructions
- Validate all user input
- Validate all model output
- Do not connect to production systems in MVP
- Do not allow autonomous remediation

## Record Lifecycle States

- Draft
- Intake Complete
- Claims Extracted
- Evidence Required
- Evidence Attached
- Analysis Complete
- Review Required
- Under Review
- Approved
- Approved with Caveat
- Evidence Requested
- Rejected
- Quarantined
- Export Ready
- Exported
- Incomplete
- Not Defensible

## Model Pipeline

Recommended sequence:

1. Recommendation Classification
2. Claim Extraction and Atomization
3. Evidence Requirement Mapping
4. Framework Mapping
5. Evidence Sufficiency
6. Missing Support Severity
7. Contradiction and Conflict Detection
8. AI Output Hazard Detection
9. Risk If Wrong
10. Confidence Band
11. Human Review Gate
12. Recommended Action
13. Record Defensibility

## Non-Negotiable Product Boundaries

CyberShield must not imply:

- AI confidence equals evidence
- Framework relevance equals compliance proof
- SOC 2 equals vendor approval
- Policy existence equals implementation evidence
- Vendor assertion equals independent validation
- Human review is optional when Risk If Wrong is High or Severe
- CyberShield replaces accountable human decision-makers

## Migration From Static Prototype

The static prototype should be treated as product reference for:

- Buyer narrative
- Route flow
- Demo modes
- Claim model
- Evidence model
- Human review model
- Executive brief structure
- Conservative action logic

The production app should replace browser-only behavior with durable services while preserving the workflow.

## Definition of Done

This architecture package is ready when a production builder can implement:

- Record persistence
- Claim lifecycle
- Evidence upload and metadata
- Evidence-to-claim linking
- Analysis model runs
- Human review workflow
- Export artifacts
- Audit events
- Role-aware access
- Tenant-aware records

## Next Build

```text
20260606xxV1 Production MVP Foundation
```
