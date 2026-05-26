# CyberShield Executive OS

CyberShield is a runtime governance and operational admissibility platform for AI and cyber decisions before consequence.

## Current live build

Current build label: **CyberShield Clean Rebuild 2026-05-26**

This repository was reset from a multi-phase prototype stack into a clean, fast, single-file static runtime.

The live build is intentionally simple:

- `index.html` contains the HTML, CSS, and JavaScript for the current prototype
- `.nojekyll` keeps GitHub Pages from trying to process the site through Jekyll
- `assets/mjc-logo-2026.png` is the required MJC logo asset
- `docs/` may be used for architecture notes, handoff notes, and historical context

## Product thesis

CyberShield is not:

- a chatbot
- an LLM wrapper
- a generic AI dashboard
- a compliance spreadsheet
- an MSP portal

CyberShield is:

- an AI execution control platform
- a runtime governance layer
- an operational admissibility engine
- an executive advisory environment
- a decision evidence and accountability system

Core question:

> Should this action be operationally admissible right now?

Core thesis:

> AI is controlled before it acts, or it is not controlled at all.

## Product-facing terminology

Use these terms in the user interface:

- CyberShield Executive OS
- Executive Advisor Layer
- Runtime Governance
- Operational TrustMap
- Operational Admissibility
- Evidence Substrate
- Decision Rationale Trace
- Operational Governance Before Consequence

## Architecture terminology

Use these terms in architecture notes and builder handoff documents:

- Decision Intelligence Layer
- Evidence Substrate
- Runtime Governance Engine
- Operational Admissibility
- Governance Memory
- Replayable Decision Record
- Human Accountability Owner
- Recommendation Trace
- Executive Decision Record

## Current runtime structure

The current live runtime should stay brutally simple until performance remains stable across Firefox, Chrome, Brave, and mobile browsers.

Required live files:

```text
/
  index.html
  .nojekyll
  assets/
    mjc-logo-2026.png
```

Optional but useful:

```text
/
  README.md
  docs/
```

## Files that should not be required by the live page

The clean rebuild does not require old phase or version files such as:

```text
app.js
styles.css
v9-phase1.css
v9-phase2.css
v9-phase2-admissibility.js
v9-phase5-forward.js
v10-persistence.js
v12-mjc-lead-handoff.js
v14-trustmap-2.js
v15-runtime-rules.js
v16-framework-mapping.js
v20-productization.js
v21-ui-cleanup.js
v22-runtime-control-center.js
cybershield-performance-guard.js
```

If these files are kept, they should be archived only for historical reference.  They should not be loaded by `index.html`.

## Cleanup rule

Delete or archive old OSV8, phase, and version files unless they contain unique architecture notes worth preserving.

Before deleting any file, check whether it is:

1. referenced by `index.html`
2. an asset used by the live page
3. a useful architecture or handoff document
4. a generated prototype file that can be safely removed

If it is not referenced, not an asset, and not useful documentation, it can be deleted.

## Next build rule

Do not reintroduce module sprawl.

Future features must be added under one explicit runtime lifecycle.  Avoid:

- broad `MutationObserver` loops
- dynamic script fan-out
- timestamp-based module injection
- duplicate navigation handlers
- floating drawers as the primary UX
- separate version files that secretly mutate the same DOM

Performance is now a gate.  If tab switching becomes slow, the build is failing.

## Recommended next development sequence

1. Confirm the clean runtime loads fast in Firefox
2. Keep the current single-file version as the stable baseline
3. Reintroduce deeper features one at a time
4. Add Runtime Governance first
5. Add Escalation second
6. Add TrustMap third
7. Add Evidence Substrate fourth
8. Add Reports fifth
9. Add MJC Handoff and persistence last

Each feature should be tested after implementation before adding the next one.
