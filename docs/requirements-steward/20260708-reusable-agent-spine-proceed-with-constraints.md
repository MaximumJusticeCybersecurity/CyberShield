# Requirements Steward Decision: Reusable Trusted-Agent Spine and Agent Work Receipt

Date: 2026-07-08
Issue: #25
Decision: Proceed with constraints
Owner: Dr. Max Justice

## 1. Authorized Scope

CyberShield may extend the current vendor-risk Decision Assurance workflow with reusable, structured objects for:

- Context Pack
- Source
- Missing Evidence
- Human Gate
- Agent Work Receipt

The change must preserve the single canonical AI Trust Decision Record and the current public product boundary.

## 2. Constraints

1. The vendor-risk golden path must remain operational.
2. The new objects must be additive and backward-compatible.
3. Public page-one content must remain buyer-focused and must not become an agent-governance dashboard.
4. Aegis must remain internal.
5. CyberShield may analyze and recommend, but may not autonomously approve, send, publish, purchase, configure, or remediate.
6. Agent Work Receipt is evidence of work performed.  It is not proof that the conclusion is true.
7. Confidence is not a truth score.
8. Human Gate must preserve accept, reject, modify, defer, and escalate choices with rationale.
9. Facts, assumptions, inferences, recommendations, and human decisions must remain distinguishable.
10. Google Sheet capture must carry the canonical receipt or a stable canonical receipt reference.
11. No production-readiness, autonomous-operation, or public Aegis claim may be introduced.
12. Verifier A, B, and C must review the same exact candidate and evidence packet before owner merge approval.

## 3. Canonical Object Contracts

### Context Pack

Required fields:

- context_pack_id
- created_at
- domain
- decision_type
- task_objective
- recommendation_under_review
- decision_owner
- intended_use
- scope
- exclusions
- source_ids
- known_constraints
- known_uncertainties
- requested_output
- authority_boundary

### Source

Required fields:

- source_id
- title
- source_type
- origin
- author_or_provider
- collected_at
- effective_date
- expiration_or_review_date
- freshness_status
- independence_status
- scope_status
- content_hash_or_reference
- claim_ids_supported
- contradiction_ids
- limitations
- synthetic_demo_flag

### Missing Evidence

Required fields:

- missing_evidence_id
- claim_id
- required_evidence_type
- reason_required
- severity
- decision_impact
- minimum_sufficient_evidence
- responsible_role
- requested_by
- due_or_review_date
- status

### Human Gate

Required fields:

- human_gate_id
- gate_reason
- triggering_conditions
- required_reviewer_roles
- permitted_decisions
- reviewer_name
- reviewer_role
- selected_decision
- rationale
- residual_risk_acknowledgment
- timestamp
- override_of_agent_recommendation

### Agent Work Receipt

Use the Agent Registrar schema as the canonical starting point.  CyberShield-specific extension fields may include:

- receipt_id
- agent_identity
- canonical_role
- task_id
- context_pack_id
- input_source_ids
- operations_performed
- tools_used
- claims_created_or_modified
- evidence_created_or_modified
- missing_evidence_created
- human_gate_id
- output_record_id
- limitations
- unresolved_findings
- start_timestamp
- completion_timestamp
- candidate_digest
- verification_status

## 4. Mapping to the AI Trust Decision Record

The canonical record shall add these top-level fields without duplicating existing semantics:

- context_pack
- sources
- missing_evidence_records
- human_gate
- agent_work_receipt

Existing fields remain authoritative for claims, evidence items, validators, Risk If Wrong, confidence, candidate actions, recommended action, human decision, override, limitations, and export metadata.

## 5. Backward Compatibility

- Records without the new objects remain valid legacy records.
- New fields default to `null`, empty array, or an explicit `not_recorded` state.
- Existing print and JSON paths must not fail when the fields are absent.
- Existing report-capture payloads must remain readable.
- Schema migration must be versioned internally without showing prototype versions to buyers.

## 6. Internal QA Presentation

Internal QA should show a compact receipt summary:

- agent role
- work performed
- sources used
- unresolved evidence gaps
- human gate status
- candidate digest
- verification status

Do not place the full receipt on the executive first page.

## 7. Reusable Component Boundaries

Extract reusable builders only after the canonical CyberShield mapping passes regression tests:

1. Context Pack builder
2. Source and citation builder
3. Missing-evidence tracker
4. Human Gate builder
5. Agent Work Receipt generator

A second domain pack must be able to reuse these components without copying the full vendor-risk workflow.

## 8. Definition of Done

P0 is complete when the contracts, mapping, migration approach, traceability update, and verifier plan are approved.

P1 is complete when the vendor-risk sample produces and exports the new objects without breaking the golden path.

P2 is complete when reusable components are extracted, registered, and demonstrated in a second bounded domain pack.

## 9. Verification

- Verifier A: Decision Assurance Implementer Agent
- Verifier B: Aegis
- Verifier C: Security Agent
- Final merge authority: Dr. Max Justice

The builder of the exact candidate cannot verify its own work under A, B, or C.
