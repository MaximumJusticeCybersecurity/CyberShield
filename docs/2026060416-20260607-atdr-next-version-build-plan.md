# 2026060416-20260607 ATDR Next-Version Build Plan

## Purpose

This document defines the next planned CyberShield AI Decision Assurance build versions after the current static MVP demo package.

Current product doctrine:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

Primary artifact:

```text
AI Trust Decision Record
```

Core principle:

```text
AI confidence is not evidence.
```

## Current Baseline

Current active branch:

```text
feature/2026060414-atdr-decision-assurance
```

Preview branch:

```text
preview-atdr-2026060414
```

Current PR:

```text
#4 Add CyberShield ATDR static MVP demo package
```

Current package state:

- Demo control room
- Launch page
- ATDR workbench
- Executive brief preview
- Smoke test readiness page
- Three demo modes
- Deterministic model-family engine
- Claim extraction and atomization
- Evidence requirement mapping
- Missing support detection
- Risk If Wrong classification
- Confidence banding
- Human review gate
- JSON export
- Browser print/PDF path
- Demo Coach
- Presenter script
- Route manifest
- Source-of-truth docs

## Build Strategy

Do not jump straight to a backend build until the static demo is merge-ready and usable in front of serious reviewers.

Recommended sequence:

```text
2026060416V1  Static Demo QA and Merge Candidate
2026060417V1  Executive Brief Hardening
2026060418V1  Evidence Workbench Expansion
2026060419V1  Human Review Workflow Expansion
2026060420V1  Static MVP Release Candidate
20260605xxV1  Backend Architecture Package
20260606xxV1  Production MVP Foundation
20260607xxV1  Live Model Optionality
```

---

# 2026060416V1: Static Demo QA and Merge Candidate

## Goal

Make the current static demo package safe to merge to `main` and show from the live GitHub Pages route.

## Build Scope

- Verify slash-free preview branch works
- Confirm all static routes load
- Confirm smoke test reports GO
- Confirm vendor-risk demo works end-to-end
- Confirm security and compliance demos load
- Confirm executive brief preview prints cleanly
- Confirm Trust Kernel remains available
- Fix route defects and copy defects only
- Avoid new feature scope unless it fixes a demo-blocking issue

## Routes to Validate

```text
/demo.html
/launch.html
/atdr.html
/brief.html
/atdr-smoke.html
/index.html
```

## Acceptance Criteria

- `/demo.html` loads from preview branch
- `/launch.html` loads from preview branch
- `/atdr.html` loads from preview branch
- `/brief.html` loads from preview branch
- `/atdr-smoke.html` loads from preview branch
- Smoke test shows GO
- Vendor Risk demo can be shown in under ten minutes
- Executive brief preview can be printed or saved as PDF
- No route uses “Legacy Executive OS” language
- No route overclaims compliance, legal, audit, production, or autonomous approval capability

## Exit Decision

If complete, mark PR #4 ready for review or merge after browser QA.

---

# 2026060417V1: Executive Brief Hardening

## Goal

Make the AI Trust Decision Record export feel like a credible executive deliverable.

## Build Scope

- Improve standalone executive brief layout
- Add stronger scenario-specific executive summaries
- Add decision posture section
- Add claim/evidence/gap summary table
- Add clearer human review block
- Add CyberShield analysis versus human decision separation
- Add export metadata block
- Add limitations block refinement
- Add signature block refinement
- Add optional reviewer decision block
- Improve print styling for one-to-three-page PDF output

## Design Standard

The brief should look like a professional advisory deliverable from Maximum Justice Cybersecurity, not a raw browser printout.

## Acceptance Criteria

- Brief is readable without the dashboard
- Brief includes original AI recommendation
- Brief includes claims and required evidence
- Brief includes missing support
- Brief includes Risk If Wrong
- Brief includes confidence rationale
- Brief includes required reviewer path
- Brief includes limitations
- Brief includes signature block
- Brief preserves separation among AI claim, evidence, CyberShield inference, and human decision
- Brief avoids compliance, legal, audit, or production approval overclaims

## Exit Decision

If complete, the brief becomes the primary artifact shown after the workbench walkthrough.

---

# 2026060418V1: Evidence Workbench Expansion

## Goal

Make the evidence experience more credible while still remaining browser-only and static.

## Build Scope

- Improve local evidence upload preview
- Add evidence-type selector
- Add evidence strength labels
- Add freshness labels
- Add source authority labels
- Add independent versus self-attested indicator
- Add evidence unavailable reason
- Add manual evidence-to-claim link controls where practical
- Add warning language for local-only browser evidence
- Add clearer explanation that uploaded evidence is not stored server-side
- Improve weak, stale, self-attested, or incomplete evidence labeling

## Evidence Types

Initial evidence types should include:

- Vulnerability scan output
- Asset inventory
- Security policy
- Control implementation evidence
- Control test result
- Vendor SOC 2 report
- Vendor security whitepaper
- Contract clause
- Data processing agreement
- Architecture diagram
- Risk register entry
- Ticket or issue
- Screenshot
- Framework reference
- Human reviewer note
- Other

## Acceptance Criteria

- User can add local evidence in browser
- Evidence weakness is visible
- Evidence type and authority are visible
- Evidence presence is not treated as sufficiency
- Weak evidence can still produce a non-defensible record
- The demo does not imply enterprise evidence storage

## Exit Decision

If complete, the evidence workflow becomes believable enough for CISO, GRC, and vendor-risk demos.

---

# 2026060419V1: Human Review Workflow Expansion

## Goal

Make the human-in-the-loop workflow credible and defensible.

## Build Scope

- Improve reviewer role routing
- Improve reviewer decision states
- Require reviewer notes for high-risk approval or manual override
- Add residual risk acknowledgment
- Add approve with caveat workflow
- Add request evidence workflow
- Add reject workflow
- Add record decision timeline
- Preserve human decision separately from CyberShield recommendation
- Improve reviewer block in executive brief

## Reviewer Roles

- vCISO
- Security SME
- Compliance owner
- Vendor-risk owner
- Legal counsel
- Data protection officer
- Procurement owner
- Executive sponsor
- System owner

## Required Reviewer Notes

Reviewer notes should be required when:

- Approving with caveat
- Rejecting
- Manually overriding CyberShield recommendation
- Approving any High or Severe Risk If Wrong item
- Accepting residual risk

## Acceptance Criteria

- Human review requirement is obvious
- Human decision is separate from CyberShield inference
- Reviewer notes are preserved in the session
- High-risk approval cannot appear casual
- Executive brief shows reviewer status and notes

## Exit Decision

If complete, CyberShield demonstrates accountable human review instead of AI-only judgment.

---

# 2026060420V1: Static MVP Release Candidate

## Goal

Package the GitHub Pages prototype as the static MVP release candidate.

## Build Scope

- Merge PR #4 after QA passes
- Test live GitHub Pages route
- Confirm `/demo.html` is the preferred entry route
- Confirm Trust Kernel remains available at `/index.html`
- Update release notes
- Update README if live routes change
- Add final QA status document
- Add post-merge checklist
- Decide whether the Trust Kernel should link to ATDR or remain separate for now

## Acceptance Criteria

- Live route works:

```text
https://maximumjusticecybersecurity.github.io/CyberShield/demo.html
```

- Smoke test shows GO from live route
- Demo control room loads from live route
- ATDR workbench loads from live route
- Executive brief preview loads from live route
- Trust Kernel loads from live route
- Documentation matches live routes
- PR #4 is merged

## Exit Decision

If complete, static MVP demo package is ready for controlled external sharing.

---

# 20260605xxV1: Backend Architecture Package

## Goal

Design the real product architecture after the static MVP has proven the story and workflow.

## Build Scope

- Proposed stack
- Frontend architecture
- API architecture
- Database schema
- Record lifecycle state machine
- User and role model
- Tenant boundary model
- Evidence storage model
- File handling model
- Audit event model
- Export architecture
- Model orchestration architecture
- Model contract registry
- Optional live model feature flag
- Migration path from static prototype

## Recommended Stack Direction

Frontend:

- React or Next.js
- TypeScript
- Form validation using Zod or equivalent
- Enterprise UI component system

Backend:

- Node.js or Python FastAPI
- REST API first unless GraphQL becomes justified
- PostgreSQL
- Object storage
- Server-side PDF and DOCX generation
- Job queue for model and export work

Security:

- Authentication
- Role-based access control
- Tenant separation
- Audit logging
- Encryption in transit and at rest
- Secret management
- Safe file handling

## Core Data Entities

- Organization
- User
- TrustDecisionRecord
- RecommendationClassification
- Claim
- EvidenceItem
- ClaimEvidenceLink
- FrameworkMapping
- HumanReview
- AuditEvent
- ExportArtifact
- ModelRun
- PromptTemplate
- ModelContract

## Acceptance Criteria

- Architecture package can be handed to a real builder
- Data model supports traceability from recommendation to claim to evidence to decision
- Model outputs are versioned and schema-validated
- Evidence is treated as untrusted input
- Export is reproducible from stored data
- Human review is auditable

## Exit Decision

If complete, begin production MVP foundation.

---

# 20260606xxV1: Production MVP Foundation

## Goal

Begin building the real application foundation.

## Build Scope

- Repository structure for production app
- Frontend shell
- Backend API shell
- Database migrations
- Auth foundation
- Role model
- Record creation API
- Claim model API
- Evidence metadata API
- Audit event API
- JSON export API
- Server-side brief generation proof of concept

## MVP Constraints

Do not build broad dashboards first.
Do not build TrustMap first.
Do not build autonomous remediation.
Do not connect to production systems.
Do not enable live model calls without feature flag and cost controls.

## Acceptance Criteria

- User can create an ATDR record through backend API
- Record persists in database
- Claims persist in database
- Evidence metadata persists in database
- Audit events are written
- JSON export is generated server-side
- Role model is defined even if minimally enforced
- Static prototype workflow remains recognizable

## Exit Decision

If complete, move to evidence storage, export hardening, and optional live model integration.

---

# 20260607xxV1: Live Model Optionality

## Goal

Add optional live model support without sacrificing deterministic demo reliability.

## Build Scope

- Feature flag for live model mode
- Provider abstraction
- Prompt template registry
- Model contract registry
- JSON schema validation
- Output repair flow
- Model result storage
- Input hash and output hash
- Prompt version
- Model version
- Analysis version
- Regression test harness
- Deterministic fallback mode

## Rules

- Deterministic demo mode must remain available
- Live model mode must be off by default unless explicitly enabled
- Model output must be schema-validated before entering the record
- Failed model output must not silently enter the record
- All model results must be auditable
- AI-generated text alone remains insufficient evidence for medium-impact or high-impact decisions

## Acceptance Criteria

- Live model calls can be enabled behind a feature flag
- Model outputs are structured
- Invalid outputs fail safely
- Regression harness compares model behavior across key scenarios
- Demo can run without live model cost
- Export includes model and prompt metadata

## Exit Decision

If complete, CyberShield can move from deterministic prototype to controlled live AI analysis while preserving auditability.

---

# Version Dependency Map

```text
2026060416V1 -> Must complete before main merge
2026060417V1 -> Can start before or after merge, but should not block QA unless export is weak
2026060418V1 -> Best after static demo is stable
2026060419V1 -> Best after evidence workbench is stronger
2026060420V1 -> Static MVP release candidate after QA and merge
20260605xxV1 -> Backend architecture after static MVP story is proven
20260606xxV1 -> Production foundation after architecture package
20260607xxV1 -> Optional live model layer after production foundation has validation and audit scaffolding
```

## Highest-Risk Trade-Offs

### Risk: Adding backend too early

Decision:

Do not move to backend until static demo proves the buyer story.

### Risk: Overbuilding the UI

Decision:

Prioritize the record workflow and executive brief over dashboards.

### Risk: AI judging AI criticism

Decision:

Every band, action, and conclusion must trace to claims, evidence, gaps, risk, confidence, and human review.

### Risk: Overclaiming compliance

Decision:

Framework mappings remain relevance mappings unless validated evidence supports stronger claims.

Required language remains:

```text
Relevant to [framework/control]. Not verified as compliant.
```

### Risk: Live model cost and instability

Decision:

Live models are optional, feature-flagged, and never required for the demo.

## Final Rule

Build the narrow workflow first.

```text
The models are the engine.
The record is the product.
The first win is one defensible AI Trust Decision Record.
```
