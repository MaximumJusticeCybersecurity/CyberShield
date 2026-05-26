# CyberShield Executive OS

CyberShield is a runtime governance and operational admissibility platform for AI and cyber decisions before consequence.

## Current live build

Current build label: **Runtime First Executive OS v11**

This repository now uses a consolidated, fast, single-file static runtime.  The current product center of gravity is the **Runtime Control Center**: an AI action attempts execution, CyberShield evaluates operational admissibility, assigns the human owner, propagates trust impact, preserves evidence, and generates executive guidance.

The live build is intentionally simple:

- `index.html` contains the HTML, CSS, and JavaScript for the current prototype
- `.nojekyll` keeps GitHub Pages from trying to process the site through Jekyll
- `assets/mjc-logo-2026.png` is the required MJC logo asset
- `bots.txt` provides machine-readable product context for bots and AI readers
- `governance-summary.json` provides structured build, product, and boundary metadata
- `robots.txt` points crawlers to the public prototype and bot-readable context
- `docs/` may be used for architecture notes, handoff notes, and historical context

## Product thesis

CyberShield is not:

- a chatbot
- an LLM wrapper
- a generic AI dashboard
- a compliance spreadsheet
- an MSP portal
- a SIEM replacement

CyberShield is:

- an AI execution control platform
- a runtime governance layer
- an operational admissibility engine
- an executive advisory environment
- a decision evidence and accountability system
- a runtime trust propagation demonstrator
- a proof engine for Maximum Justice Cybersecurity advisory services

Core question:

> Should this action be operationally admissible right now?

Core thesis:

> AI is controlled before it acts, or it is not controlled at all.

## Product-facing terminology

Use these terms in the user interface:

- CyberShield Executive OS
- Executive Advisor Layer
- Runtime Control Center
- Runtime Governance
- Operational TrustMap
- Operational Admissibility
- Evidence Substrate
- Decision Rationale Trace
- Personalized Executive Guidance
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
- Runtime Trust Propagation

## Current runtime structure

The current live runtime should stay simple until performance remains stable across Firefox, Chrome, Brave, tablet, and mobile browsers.

Required live files:

```text
/
  index.html
  .nojekyll
  assets/
    mjc-logo-2026.png
  README.md
  bots.txt
  robots.txt
  governance-summary.json
```

Optional but useful:

```text
/
  docs/
```

## Current prototype sections

After onboarding, the current top-level workspace includes:

```text
Briefing | Runtime | Escalation | TrustMap | Rules | Reports | Evidence | Guidance | Settings
```

## Current capabilities

Runtime First Executive OS v11 includes:

- Mandatory first-run Executive Trust Assessment
- Five-step onboarding with multiple high-value questions per step
- Role, audience, organization, value-at-risk, AI posture, owner clarity, and dashboard-shape context
- Runtime Control Center scenario queue
- AI action request with admissibility decision
- Why-this-decision panel
- Trust, evidence, policy, authority, and consequence scoring
- Consequence-aware governance model
- Runtime trust propagation
- Replayable evidence packet
- Runtime governance feed using browser localStorage
- Authority Escalation routing
- Operational TrustMap relationship intelligence
- Runtime Rules view
- Three-pane Reports workspace
- Personalized Executive Guidance
- Global hover/focus explain-or-navigate behavior

## Current runtime scenarios

The current Runtime Control Center includes:

- AI vendor payment authorization
- AI-generated client communication
- Privileged access reset request
- Recovery validation automation
- Shadow AI sensitive data upload

## Interaction rule

No dead bubbles.

Every visible executive object that appears as a chip, metric, card, gate, node, report, status, or control must either:

1. explain itself on hover/focus, or
2. navigate somewhere useful

This applies to navigation tabs, hero controls, briefing metrics, runtime cards, runtime scores, escalation gates, TrustMap nodes, report items, evidence controls, guidance cards, and settings/profile objects.

## Machine-readable files

`bots.txt` and `governance-summary.json` must be updated with every material CyberShield version change.

Current machine-readable metadata should identify the build as:

```text
Runtime First Executive OS v11
```

## Files that should not be required by the live page

The consolidated runtime does not require old phase or version files such as:

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

Performance is a product gate.  If tab switching becomes slow, the build is failing.

## Recommended next development sequence

1. QA Runtime First Executive OS v11 across Firefox, Chrome, Brave, tablet, and mobile
2. Validate onboarding flow and dashboard personalization
3. Improve responsive TrustMap readability and line routing if overlap appears
4. Add stronger report-specific generated content per report type
5. Add Governance Memory as a more explicit view or advanced section
6. Add exportable executive reports after the UI remains stable
7. Add Google Apps Script / Sheets persistence only after local runtime remains fast
8. Add CRM-ready advisory payload after report and guidance language is stable

Each feature must be tested after implementation before adding the next one.
