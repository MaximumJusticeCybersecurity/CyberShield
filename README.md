# CyberShield Executive OS

## Current strategic direction

CyberShield is pivoting to one primary workflow:

```text
AI-generated recommendation in → AI Trust Decision Record out
```

Current build direction: **2026060411 AI Trust Decision Record Pivot**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Near-term working product concept:

```text
CyberShield AI Trust Decision Record
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## Versioning rule

After the V60.3 release train, new implemented builds use timestamp-based versioning:

```text
YYYYMMDDHH
```

Use 24-hour **America/New_York** time unless the user explicitly changes the project timezone.  Example: `2026060411`.

Canonical schema document:

```text
docs/versioning-schema.md
```

## Active priority

The next build should focus on the AI Trust Decision Record workflow.

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
5. Classify risk if wrong
6. Assign confidence bands
7. Recommend action
8. Require human review where needed
9. Export a defensible AI Trust Decision Record
```

## Deprioritized but preserved work

The following work is preserved for later phases, but is not the next build priority:

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
docs/2026060411-ai-trust-decision-record-pivot.md
docs/2026060411-ai-trust-decision-record-builder-package.md
docs/20260602-1900-trustmap-engine-refactor-package.md
docs/20260602-1915-trustmap-engine-scaffold-handoff.md
docs/20260602-2000-trustmap-engine-runtime-switch-handoff.md
bots.txt
governance-summary.json
```

The TrustMap documents explain what was built and why it is now deferred.  They are not the active next-build priority.

## Current navigation

Existing navigation may still show:

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

For the next ATDR workflow build, do not add a new top-level tab unless explicitly approved.  Prefer implementing the first ATDR workflow inside an existing screen, most likely **Evidence** or **Proof Pack**, or as a clearly labeled workflow pane.

## AI Trust Decision Record doctrine

Do not ask only:

```text
Do we trust the AI?
```

Ask:

```text
Which parts of the AI recommendation can be trusted, at what confidence level, based on what evidence, with what risk if wrong, and what human decision is required?
```

## Required ATDR output

The AI Trust Decision Record should include:

```text
Record ID
Timestamp
Original recommendation
Recommendation summary
Extracted claims
Claim classification
Evidence map
Evidence gaps
Missing support
Risk-if-wrong analysis
Confidence band
Recommended action
Human review requirement
Human reviewer fields
Decision status
Boundary and limitation statement
Export-ready proof package
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
Risk-if-wrong analysis
Human-in-the-loop review
Exportable decision records
Audit trail design
Defensive UX
Product boundary discipline
```

## Boundary

The current public build is still a static advisory prototype.  The next ATDR build must not claim autonomous approval, live compliance certification, live vendor approval, legal determination, CMMC certification, audit opinion, production enforcement, live evidence retrieval, live internet verification, or backend persistence unless those capabilities are explicitly built and validated later.

## Recommended next build package

```text
2026060412 ATDR Workflow Scaffold
```

Acceptance criteria:

```text
User can paste an AI recommendation
System extracts structured claims
System maps available evidence
System identifies missing support
System classifies risk if wrong
System assigns confidence band with reasons
System recommends action
System flags human review when required
System exports a structured AI Trust Decision Record
TrustMap is not the primary workflow
```
