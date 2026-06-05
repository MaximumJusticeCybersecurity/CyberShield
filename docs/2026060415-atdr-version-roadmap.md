# 2026060415 ATDR Version Roadmap

## Governing Rule

Keep building unless Dr. Max Justice says stop, wait, pause, or gives an explicit hard stop.

If a sanity check would be useful but is not a hard blocker, continue building around it and preserve the assumption in the build record.

## Version Convention

Use the timestamped AI-direction version convention:

```text
YYYYMMDDHHV#
```

Do not use legacy V60.x labels for the AI Trust Decision Record direction.

## Known Source Versions

### 2026060412V1

Partner and source handoff.

Purpose:

- Establish the AI-generated recommendation in -> AI Trust Decision Record out direction.
- Define product doctrine.
- Define first target domains: security, compliance, vendor risk.
- Define the initial model family.
- Define non-negotiable boundaries.

Status:

```text
Source lineage.  Not implementation version.
```

### 2026060414V1

Architect and implementation package.

Purpose:

- Build the first static GitHub Pages prototype.
- Prove the ATDR workflow with deterministic/simulated models.
- Add vendor-risk contradictory-evidence wedge.
- Add browser JSON export and print/PDF executive brief.

Status:

```text
Current active prototype branch.
```

Branch:

```text
feature/2026060414-atdr-decision-assurance
```

Core files:

```text
launch.html
atdr.html
atdr-smoke.html
src/atdr/atdr-app.js
src/atdr/atdr-engine.js
src/atdr/atdr-demo-data.js
src/atdr/atdr-demo-router-fix.js
src/atdr/atdr-model-contracts.js
src/atdr/atdr-schema.js
src/atdr/atdr-smoke-test.js
```

Implemented demo paths:

- Vendor Risk: Contradictory Evidence
- Security: Vulnerability Risk Acceptance
- Compliance: NIST Control Claim

## Planned Versions

### 2026060415V1: ATDR Prototype Polish and QA Hardening

Goal:

Make the static demo reliable enough for live review with prospects, advisors, and potential partners.

Build:

- Fix demo router UX issues.
- Stabilize selected-demo loading behavior.
- Improve active scenario status messaging.
- Strengthen browser smoke tests.
- Add schema validation into visible export readiness.
- Improve executive brief readability.
- Add clearer demo boundary language.
- Improve print/PDF formatting.
- Add model contract visibility or appendix.
- Add record identity stability inside a session.

Definition of done:

- All three demos selectable and load visibly.
- Smoke test passes all three demo modes.
- JSON export works for all three modes.
- Print/PDF brief is credible for executive review.
- No UI language overclaims compliance, legal determination, audit opinion, or production approval.

### 2026060416V1: ATDR Executive Brief and Export Hardening

Goal:

Make the exported AI Trust Decision Record feel like the product, not an afterthought.

Build:

- Stronger executive summary.
- Claim/evidence/gap table refinement.
- Better limitations section.
- Better signature and reviewer block.
- Export metadata improvements.
- Human decision appendix.
- Evidence caveat appendix.
- Framework mapping appendix.
- Record defensibility explanation.

Definition of done:

- A printed PDF can stand alone without the dashboard.
- A CISO, vCISO, Security SME, GRC lead, vendor-risk owner, auditor, or executive can understand the decision posture in under two minutes.
- Missing support is obvious.
- Human review requirement is obvious.
- CyberShield recommendation and human decision remain separate.

### 2026060417V1: ATDR Demo Narrative and Sales Flow

Goal:

Turn the prototype into a demo that sells itself.

Build:

- Guided opening screen.
- Demo selection questions for audience type.
- Persona paths:
  - CISO / vCISO
  - GRC / compliance
  - vendor risk / procurement
  - executive / investor
- Scenario-specific talk track panels.
- Buyer pain framing.
- Before/after view: AI answer vs defensible record.
- Product boundary disclosure.

Definition of done:

- A first-time executive understands the pain without a long explanation.
- Demo path selection feels intentional.
- Vendor-risk demo remains the default sales wedge.
- Security and compliance demos support the broader platform story.

### 2026060418V1: ATDR Evidence Workbench Expansion

Goal:

Make evidence handling more believable while staying static and local-only.

Build:

- Better local file text preview.
- Evidence type selection.
- Evidence strength labels.
- Evidence freshness labels.
- Evidence source authority labels.
- Manual evidence-to-claim linking UI.
- Evidence unavailable reason.
- Evidence note improvements.
- Prompt-injection warning indicators.

Definition of done:

- User can show how evidence changes the record.
- Evidence remains local-only in the browser.
- The prototype does not imply secure enterprise storage.
- Evidence weakness is clearer than evidence presence.

### 2026060419V1: ATDR Human Review Workflow Expansion

Goal:

Make the human-in-the-loop layer credible and visible.

Build:

- Reviewer role routing.
- Reviewer decision states.
- Override reason requirements.
- Residual risk acknowledgment.
- Approval with caveat language.
- Request evidence workflow.
- Reject and quarantine workflow displays.
- Human decision timeline.

Definition of done:

- Reviewer action is clearly separate from CyberShield analysis.
- High-risk approval requires notes.
- Manual override is preserved and defensible.

### 2026060420V1: ATDR Static MVP Release Candidate

Goal:

Prepare the GitHub Pages prototype for merge into main and broader sharing.

Build:

- Main launch route finalized.
- Legacy Executive OS linked as secondary.
- ATDR launch is primary.
- QA checklist completed.
- README updated.
- bots.txt updated if needed.
- governance-summary updated if needed.
- PR ready for merge.

Definition of done:

- Live GitHub Pages link works on main.
- ATDR launch is discoverable.
- Smoke test passes.
- Export works.
- Static prototype boundaries are documented.

## Post-Static Backend Versions

### 20260605xxV1: Backend Architecture Package

Goal:

Move from static prototype to product architecture.

Build plan:

- API layer
- Database schema
- Auth and RBAC
- Tenant separation
- Server-side export engine
- Evidence storage
- File scanning controls
- Audit logging
- Model orchestration service
- Feature flag for live LLM provider

### 20260606xxV1: Production MVP Foundation

Goal:

Begin real application build.

Likely stack:

- React or Next.js frontend
- Node or Python API layer
- PostgreSQL
- Object storage
- Server-side PDF/DOCX generation
- Structured model output validation
- Audit event store

### 20260607xxV1: Live Model Optionality

Goal:

Add live LLM integration only when cost, demo value, and architecture justify it.

Rules:

- Deterministic demo mode remains available.
- Live LLM mode must be behind a feature flag.
- Model output must be schema-validated.
- Failed model output cannot silently enter the record.
- Every model output must store model name, model version, prompt version, timestamp, input hash, and output hash.

## Version Count Awareness

As of this roadmap, the build has awareness of these version groups:

1. 2026060412V1 source handoff
2. 2026060414V1 current static prototype
3. 2026060415V1 polish and QA hardening
4. 2026060416V1 export hardening
5. 2026060417V1 demo narrative and sales flow
6. 2026060418V1 evidence workbench expansion
7. 2026060419V1 human review workflow expansion
8. 2026060420V1 static MVP release candidate
9. 20260605xxV1 backend architecture package
10. 20260606xxV1 production MVP foundation
11. 20260607xxV1 live model optionality

Minimum needed to make the static prototype sellable:

```text
2026060414V1 through 2026060420V1
```

Minimum needed for real product foundation:

```text
20260605xxV1 through 20260606xxV1
```

Live LLM is optional and should not block the static MVP.
