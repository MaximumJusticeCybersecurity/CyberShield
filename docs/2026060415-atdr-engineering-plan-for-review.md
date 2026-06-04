# 2026060415 ATDR Engineering Plan for Review

## Objective

Move CyberShield from a working static prototype to a demo Dr. Max Justice can show to an advisor, enterprise architect, CISO, vCISO peer, IBM contact, potential buyer, or investor without apologizing for rough edges.

The product remains:

```text
AI-generated recommendation in -> Defensible AI Trust Decision Record out
```

The goal for this phase is not to broaden the platform.  The goal is to make the first demo credible, calm, guided, and defensible.

## Demo Readiness Bar

The demo is ready only when a viewer can understand the following in under two minutes:

1. What AI recommendation is being evaluated
2. What claims the AI made
3. What evidence is present
4. What evidence is missing, weak, stale, or contradicted
5. What the Risk If Wrong is
6. Why confidence is low, medium, or high
7. Who must review the recommendation
8. What action is defensible
9. What record can be exported

## Current Prototype State

Branch:

```text
feature/2026060414-atdr-decision-assurance
```

Current entry points:

```text
launch.html
atdr.html
atdr-smoke.html
```

Current demo modes:

1. Vendor Risk: Contradictory Evidence
2. Security: Vulnerability Risk Acceptance
3. Compliance: NIST Control Claim

Current technical foundation:

- Static GitHub Pages prototype
- Deterministic model engine
- Multi-domain claim atomization
- Synthetic evidence repository
- Browser-local evidence upload
- Evidence notes
- Persistent Decision Brief
- Human review and override
- JSON export
- Browser print/PDF executive brief
- Schema validation
- Smoke test across all demo modes
- Model contract registry

## Engineering Priorities

### Priority 1: First Impression and Demo Flow

Problem:

The workbench currently works, but the user still needs to understand how to demo it.

Build:

- Add an in-app Demo Coach panel
- Add stage-specific talk tracks
- Add active demo status
- Make selected scenario obvious
- Make the first screen explain the business problem faster
- Make the top action buttons use demo language, not generic app language

Acceptance criteria:

- A first-time viewer understands the point before seeing the tables
- The presenter can use the product itself as the talk track
- The demo no longer depends on external notes

### Priority 2: Decision Brief Upgrade

Problem:

The Decision Brief is useful, but it should feel like the executive center of gravity.

Build:

- Improve wording for Can I act on this?
- Add one-line executive decision posture
- Add primary blocker
- Add required reviewer roles
- Add export readiness
- Add consequence summary
- Add record defensibility explanation

Acceptance criteria:

- The right rail can tell the story by itself
- The viewer sees why the AI recommendation is not defensible yet
- Recommended action and human review requirement are visually unmistakable

### Priority 3: Executive Brief Polish

Problem:

The exported brief is the product artifact.  It must look like an executive deliverable, not a printout.

Build:

- Improve executive summary language by scenario
- Improve claim/evidence/gap table labels
- Improve missing evidence section
- Add clear limitations
- Add signature block and reviewer decision block
- Add prepared-by branding
- Add version and export metadata
- Add stronger separation of CyberShield recommendation and human decision

Acceptance criteria:

- Browser print/PDF output is credible as a demo artifact
- The brief can be understood without the dashboard
- It does not overclaim compliance, legal determination, audit opinion, or production approval

### Priority 4: Record Stability and Session Behavior

Problem:

A Trust Decision Record should feel like one evolving record in the current session, not a new record every time the analysis refreshes.

Build:

- Preserve record ID during a session
- Preserve sequence number
- Preserve export count
- Preserve human decisions
- Preserve audit trail
- Reset intentionally only when a new demo scenario is loaded

Acceptance criteria:

- Evidence toggles do not unnecessarily create a new identity
- Human decisions persist during the current session
- Export count increments predictably

### Priority 5: Smoke Test and QA Harness

Problem:

The branch needs a repeatable way to show whether the demo still works after each change.

Build:

- Keep `atdr-smoke.html`
- Check all three demo modes
- Check schema validity
- Check export parseability
- Check conservative action logic
- Check framework warning language
- Add visible pass/fail summary

Acceptance criteria:

- Smoke test page gives a clear pass/fail signal
- It catches broken demo modes before a live review

### Priority 6: Merge Readiness

Problem:

The prototype is still branch-preview only.

Build:

- Keep launch page as primary entry point
- Add link from main app when safe
- Update README only after the demo is stable
- Update governance summary only after the demo is stable
- Merge to main only after QA pass

Acceptance criteria:

- GitHub Pages live main route works
- `launch.html`, `atdr.html`, and `atdr-smoke.html` are accessible
- Legacy Executive OS remains secondary, not removed

## Near-Term Build Order

1. Add Demo Coach overlay
2. Add scenario-specific executive brief copy
3. Improve Decision Brief language
4. Stabilize record identity
5. Strengthen print/PDF layout
6. Improve smoke test readability
7. Update launch page for demo narrative
8. Add main app link when safe
9. Update docs and QA status
10. Prepare merge candidate

## Out of Scope for This Phase

Do not build yet:

- Backend persistence
- Authentication
- Tenant isolation
- Malware scanning
- Live LLM calls
- Server-side DOCX/PDF
- Production vendor approval
- Production compliance certification
- Production system integrations
- Autonomous remediation

## Backend Path Later

After static demo readiness, the next architecture package should define:

- API layer
- PostgreSQL schema
- object storage
- evidence storage rules
- RBAC
- tenant separation
- audit event store
- server-side PDF/DOCX generation
- model orchestration service
- live LLM feature flag
- model output validation and repair

## GitHub Babysitting Reduction Plan

The current session still requires explicit tool calls to GitHub.  To reduce babysitting:

1. Keep plans in repo docs so the next step is always clear
2. Keep a smoke test page so browser QA is repeatable
3. Keep model contracts in source so future implementation work is guided
4. Keep PR and branch names predictable
5. Use small isolated files where possible to avoid risky large-file rewrites
6. Use docs and smoke tests as working memory across sessions

Hard limitation:

```text
I cannot run unattended background GitHub work outside the active chat session.  I can reduce hand-holding inside the session, but I cannot continue pushing commits after the conversation stops unless a scheduled or external automation is explicitly configured and available.
```

## Demo-Ready Definition

This phase is complete when Dr. Max Justice can open the launch page, select the vendor-risk demo, walk through the workflow, export the brief, and show the result without needing to explain away rough prototype behavior.
