# CyberShield AI Decision Assurance

## Current strategic direction

CyberShield is now focused on one primary workflow:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

Current active implementation line:

```text
2026060414V1 CyberShield AI Decision Assurance Prototype
```

Planned static MVP release candidate:

```text
2026060420V1 Static MVP Release Candidate
```

## Primary demo routes

After this branch merges to `main`, the recommended public demo entry point is:

```text
/demo.html
```

Supporting routes:

```text
/launch.html       CyberShield AI Decision Assurance launch page
/atdr.html         AI Trust Decision Record workbench
/brief.html        Executive brief preview and print/PDF path
/atdr-smoke.html   Demo readiness and schema smoke test
/index.html        Trust Kernel
```

Current branch preview route:

```text
https://raw.githack.com/MaximumJusticeCybersecurity/CyberShield/preview-atdr-2026060414/demo.html
```

Live production route after merge:

```text
https://maximumjusticecybersecurity.github.io/CyberShield/demo.html
```

## Public naming rule

Public product family:

```text
CyberShield
```

Focused workflow name:

```text
CyberShield AI Decision Assurance
```

Primary artifact:

```text
AI Trust Decision Record
```

Existing trust surface:

```text
Trust Kernel
```

Use this distinction:

```text
CyberShield ATDR is the workflow.
Trust Kernel is the underlying trust surface.
The AI Trust Decision Record is the product artifact.
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## Versioning rule

After the V60.3 release train, new implemented AI-direction builds use timestamp-based versioning:

```text
YYYYMMDDHHV#
```

Use 24-hour **America/New_York** time unless the user explicitly changes the project timezone.  Example:

```text
2026060414V1
```

Canonical schema document:

```text
docs/versioning-schema.md
```

## Active priority

The active priority is the AI Trust Decision Record workflow.

First target workflow:

```text
AI-generated security, compliance, and vendor-risk recommendations
```

The system must:

```text
1. Ingest an AI-generated recommendation
2. Extract claims
3. Map evidence
4. Identify missing support
5. Identify weak, stale, incomplete, or contradicted evidence
6. Classify Risk If Wrong
7. Assign confidence bands
8. Recommend action
9. Require human review where needed
10. Export a defensible AI Trust Decision Record
```

## Current demo modes

The ATDR workbench currently supports:

```text
1. Vendor Risk: Contradictory Evidence
2. Security: Vulnerability Risk Acceptance
3. Compliance: NIST Control Claim
```

The vendor-risk demo remains the default sales wedge.

## Current static prototype capabilities

The current branch includes:

```text
Demo control room
Launch page
ATDR workbench
Executive brief preview
Smoke test readiness page
Deterministic model-family engine
Multi-domain claim atomization
Synthetic evidence repository
Local in-browser evidence upload
Evidence notes
Missing support detection
Risk If Wrong classification
Confidence banding
Human review gate
Human decision and override capture
Structured JSON export
Browser print/PDF path
Demo Coach
Schema validation
Model contract registry
Trust Kernel naming alignment
```

## Deprioritized but preserved work

The following work is preserved for later phases, but is not the current build priority:

```text
TrustMap
Dashboards
Broad governance surfaces
Runtime agents
Generic trust scores
Great Map visual system
Architecture model library expansion
```

Do not delete this work.  File it away.  CyberShield expects to return to these capabilities after the AI Trust Decision Record workflow works.

## Required next-builder reading order

Read these first:

```text
docs/2026060416-20260607-atdr-next-version-build-plan.md
docs/2026060415-successor-builder-handoff.md
docs/2026060415-atdr-presenter-script.md
docs/2026060415-atdr-merge-readiness-plan.md
docs/2026060420V1-static-mvp-release-note-draft.md
docs/2026060415-atdr-engineering-plan-for-review.md
docs/2026060415-demo-readiness-acceptance-checklist.md
docs/2026060415-atdr-version-roadmap.md
docs/2026060414-atdr-decision-assurance-build-record.md
docs/2026060414-atdr-qa-status.md
docs/2026060415-trust-kernel-naming-note.md
bots.txt
governance-summary.json
```

Historical pivot documents:

```text
docs/2026060411-ai-trust-decision-record-pivot.md
docs/2026060411-ai-trust-decision-record-builder-package.md
```

TrustMap documents explain what was built and why it is now deferred.  They are not the active next-build priority.

## AI Trust Decision Record doctrine

Do not ask only:

```text
Do we trust the AI?
```

Ask:

```text
Can the organization defend acting on this AI-generated recommendation based on the evidence available at the time?
```

Also ask:

```text
Which claims did the AI make?
Which claims are material?
What evidence supports each material claim?
What evidence is missing, weak, stale, incomplete, or contradicted?
What is the Risk If Wrong?
How confident can CyberShield be based on evidence and review state?
Who must review it?
What action is defensible?
Can the decision be defended later?
```

Internal doctrine:

```text
AI confidence is not evidence.
```

## Required ATDR output

The AI Trust Decision Record should include:

```text
Record ID
Record type
Created timestamp
Created by
Original AI recommendation
AI source
Source model if known
Intended use
Domain
Recommendation type
Decision context
Applicable framework references
Extracted claims
Claim type
Materiality
Required evidence
Evidence provided
Evidence sufficiency
Missing support severity
Conflict status
Confidence band
Risk If Wrong
Consequence summary
Human review requirement
Required reviewer role
Review status
Reviewer notes
Recommended action
Required next step
Decision owner
Record defensibility band
Missing record fields
Limitations
Export timestamp
Analysis version
```

## Builder skills needed next

The next builder should understand:

```text
JavaScript modular architecture
Structured data modeling
Claim extraction logic
Evidence mapping logic
Security and compliance vocabulary
Vendor-risk workflow basics
Confidence banding
Risk If Wrong analysis
Human-in-the-loop review
Exportable decision records
Audit trail design
Defensive UX
Product boundary discipline
Browser-only prototype constraints
```

## Boundary

The current public build is still a static advisory prototype.  The current ATDR build must not claim autonomous approval, live compliance certification, live vendor approval, legal determination, CMMC certification, audit opinion, production enforcement, live evidence retrieval, live internet verification, enterprise evidence storage, malware scanning, tenant isolation enforcement, or backend persistence unless those capabilities are explicitly built and validated later.

## Merge readiness

Before merging the ATDR branch into `main`, confirm:

```text
/demo.html loads
/launch.html loads
/atdr.html loads
/brief.html loads
/atdr-smoke.html loads
/index.html loads as Trust Kernel
Smoke test shows GO
Vendor-risk demo works end-to-end
Executive brief preview prints cleanly
No route overclaims compliance, legal, audit, production, or autonomous approval capability
```

## Recommended next build package

```text
2026060416V1 Static Demo QA and Merge Candidate
```

Then:

```text
2026060417V1 Executive Brief Hardening
2026060418V1 Evidence Workbench Expansion
2026060419V1 Human Review Workflow Expansion
2026060420V1 Static MVP Release Candidate
20260605xxV1 Backend Architecture Package
20260606xxV1 Production MVP Foundation
20260607xxV1 Live Model Optionality
```

Canonical next-version build plan:

```text
docs/2026060416-20260607-atdr-next-version-build-plan.md
```

Acceptance criteria for static MVP:

```text
User can open the demo control room
User can launch ATDR workflow
User can select one of three demo modes
System extracts structured claims
System maps available evidence
System identifies missing support
System classifies Risk If Wrong
System assigns confidence band with reasons
System recommends action
System flags human review when required
System exports structured JSON
System renders a standalone executive brief preview
System supports browser Print / Save PDF
TrustMap is not the primary workflow
Trust Kernel remains available
```
