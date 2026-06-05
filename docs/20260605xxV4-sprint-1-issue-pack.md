# 20260605xxV4 ATDR Sprint 1 Issue Pack

## Purpose

Provide copy-ready issues for the first production MVP sprint.

Use these after the static prototype package is reviewed and the production build begins.

---

# Issue 1: Scaffold Production ATDR Workspace

## Goal

Create the production ATDR app structure for the backend MVP foundation.

## Scope

- Create web application workspace
- Create API application workspace
- Create shared core package
- Create shared schema package
- Create export package
- Create model contract package
- Add TypeScript baseline
- Add lint and format commands
- Add environment configuration pattern

## Acceptance Criteria

- Local developer can install dependencies
- Local developer can run web shell
- Local developer can run API shell
- Shared packages can be imported

---

# Issue 2: Create ATDR Database Schema

## Goal

Create the first persistent ATDR data model.

## Tables

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

## Acceptance Criteria

- Migrations run locally
- Record-to-claim traceability exists
- Claim-to-evidence traceability exists
- Seed data includes one organization and three demo records

---

# Issue 3: Build Trust Decision Record API

## Goal

Support persistent Trust Decision Record creation and retrieval.

## Scope

- Create record
- List records
- Retrieve record by ID
- Update record metadata
- Preserve original AI recommendation
- Store domain, intended use, source, source model, and decision context

## Acceptance Criteria

- User can create a record
- Original AI recommendation is preserved
- Record metadata persists
- Audit event is written on create and update

---

# Issue 4: Port Deterministic ATDR Engine

## Goal

Move the static prototype engine into the production core package.

## Scope

- Port deterministic analysis logic
- Preserve three demo scenarios
- Preserve model-family separation
- Add schema validation
- Store model-run metadata

## Acceptance Criteria

- Vendor-risk scenario produces conservative outcome
- Security scenario produces conservative outcome
- Compliance scenario produces conservative outcome
- Model outputs validate before persistence

---

# Issue 5: Add Regression Harness Foundation

## Goal

Protect the three golden scenarios from regression.

## Scenarios

- Vendor Risk: Contradictory Evidence
- Security: Vulnerability Risk Acceptance
- Compliance: NIST Control Claim

## Acceptance Criteria

- Regression test checks claim count or claim presence
- Regression test checks Risk If Wrong
- Regression test checks human review requirement
- Regression test checks conservative action
- Regression test checks export validity

---

# Sprint 1 Definition of Done

Sprint 1 is complete when:

- Production workspace exists
- Database schema exists
- Record API exists
- Deterministic ATDR engine runs outside the static page
- Golden scenarios have regression coverage

## Guardrail

Do not build dashboards, TrustMap-first surfaces, autonomous remediation, or live model calls in Sprint 1.
