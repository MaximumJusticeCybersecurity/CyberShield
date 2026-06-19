# Engineer Next Build Instructions

Version: 2026061909
Owner: Dr. Max Justice
Audience: Engineer, architect, builder, Decision Assurance Implementation Agent

## 1. Governing Build Direction

CyberShield is focused on one workflow:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

The record is the product.

The first proof point remains vendor-risk Decision Assurance.

## 2. Agent Entry and Required Reading Order

Start with:

```text
AGENTS.md
```

Read these before changing code:

```text
docs/2026061909-requirements-steward-packet-report-layout-polish.md
docs/2026061909-decision-assurance-implementation-agent-first-mission.md
docs/2026061909-second-codex-agent-decision-assurance-implementation.md
docs/2026061908-trusted-authority-ethical-influence-standard.md
docs/2026061909-forward-build-plan.md
docs/2026061815-first-codex-agent-requirements-steward.md
docs/cybershield-decision-assurance-requirements.md
docs/cybershield-trust-kernel-lite-architecture.md
docs/aegis-cybershield-architecture-boundary.md
docs/trust-decision-record-schema.md
docs/google-sheets-report-capture.md
docs/requirements-traceability-matrix.md
docs/definition-of-done.md
docs/builder-requirements-acceptance-checklist.md
docs/successor-builder-handoff-and-job-docket.md
docs/builder-version-log.md
README.md
bots.txt
governance-summary.json
release-manifest.json
route-manifest.json
```

The Trusted Authority and Ethical Influence Standard is an approved baseline.  It requires evidence before confidence, restraint before expansion, constructive resistance, anti-sycophancy behavior, legitimate no-action outcomes, preserved human agency, and disclosure of material commercial incentives.

The Requirements Steward Agent decides what may be built.  The Decision Assurance Implementation Agent implements only the approved steward packet.

Material implementation requires a steward decision of:

```text
Proceed
```

or:

```text
Proceed with constraints
```

## 3. Branch and Review Rule

For the current task, use:

```text
agent/2026061909-report-layout-polish
```

Do not merge.  Prepare a pull request or owner-review packet.

## 4. Current Route Hierarchy

Preferred high-touch and advisor golden path:

```text
/vendor-risk-next.html
```

Stable fallback buyer route:

```text
/vendor-risk.html
```

Do not retire or materially change the fallback route until the owner approves it.

Do not make a QA route or workbench the public demo.

## 5. Current Public Positioning

Public artifact name:

```text
AI Trust Decision Record
```

Pilot positioning:

```text
software-assisted advisory pilot
```

Public buyer problem:

```text
Before relying on AI, know whether the recommendation is defensible.
```

Aegis remains internal for this build.

Trust Kernel may be referenced as supporting architecture, but it must not dominate public buyer messaging.

## 6. Current Capture Source of Truth

Use the configured Sheet ID from:

```text
src/atdr/report-capture-config.js
```

Current Sheet ID:

```text
1SDfqw-rRuluqBdPUT6Ex4UIajO-CCEtny84OTMKhQ3w
```

Do not use the inactive architect placeholder Sheet ID unless the owner explicitly approves a migration.

Never place Google credentials, service-account keys, OAuth secrets, or private tokens in front-end code.

Until a Sheet row is verified, say:

```text
Payload submitted to the configured endpoint. Verify the Google Sheet row before claiming capture success.
```

## 7. Immediate Build Sequence

Follow the sequence in:

```text
docs/2026061909-forward-build-plan.md
```

Current order:

```text
2026061143-report-layout-polish-after-print-test
2026061144-feedback-integration-after-review
2026061145-route-manifest-refresh
2026061146-canonical-record-unification
2026061147-google-sheet-row-verification
```

Do not skip forward into broad platform expansion unless the owner changes priority.

## 8. Current Authorized Build

Build now:

```text
2026061143-report-layout-polish-after-print-test
```

Canonical instructions:

```text
docs/2026061909-decision-assurance-implementation-agent-first-mission.md
```

Objective:

Improve the browser Print / Save PDF AI Trust Decision Record based on actual print review.

Required acceptance:

- Actual browser print preview or saved PDF is inspected.
- AI Trust Decision Record title is clear.
- Executive decision is visible on page one.
- Request Evidence, High Risk If Wrong, Low confidence, and Human Review Required are easy to locate.
- Decision owner and next human action are visible.
- Claims, validators, evidence, and candidate-action tables remain readable.
- Human Legibility and Harness Health content remain present.
- Dr. Max Justice reviewer/signature block appears by default and is not confusingly split.
- Limitations remain visible.
- No production or autonomous-approval claims appear.
- Preferred and fallback routes continue loading.
- Print acceptance is not claimed from source inspection alone.

## 9. Canonical Record Rule

The shared mapper is:

```text
src/atdr/trust-decision-record-schema-mapper.js
```

The target state is one canonical AI Trust Decision Record object used for:

- on-screen display
- JSON download
- Google Sheet capture
- Print / Save PDF
- future DOCX export

Do not create another route-specific record contract when the shared mapper can be extended.

The current print-polish task does not authorize schema-semantic or recommendation-logic changes.

## 10. Required QA Order

Before external review, check:

```text
/vendor-risk-next.html
/vendor-risk.html
/vendor-risk-next-smoke.html
/vendor-risk-smoke.html
/trust-decision-record-schema-smoke.html
/record-contract.html
/capture-source-of-truth-smoke.html
/report-capture-test.html
/report-print-qa.html
/review-index.html
/internal-qa.html
```

Stop if a required smoke route is NO-GO unless the current task specifically repairs that failure.

For report quality, inspect actual print preview or saved PDF.  `report-print-qa.html` automated source checks are supporting evidence only.

## 11. Engineering Guardrails

Do not introduce:

- open-ended body-level MutationObserver loops
- repeated uncontrolled DOM rewrites
- stale hard-coded Sheet IDs
- parallel record schemas
- public Aegis positioning
- TrustMap-first navigation
- generic trust-score claims
- autonomous vendor approval
- production-readiness claims
- compliance-certification claims
- SOC 2 as automatic approval
- framework mapping as compliance proof
- manufactured urgency, scarcity, or unsupported authority
- recommendation logic that cannot return no action, monitor, defer, or insufficient evidence
- visual polish that hides evidence gaps, limitations, uncertainty, or human-review requirements

## 12. Deferred Scope

Do not prioritize yet:

- Runtime agents beyond the bounded build agents defined in `AGENTS.md`
- public Aegis positioning
- TrustMap-first rebuild
- broad governance dashboards
- generic trust scores
- multi-industry demos before vendor-risk is proven
- autonomous approval
- broad multi-tenant platform claims
- production authentication claims
- live LLM claims unless implemented and tested

## 13. Acceptance Gate

A build is ready for owner review only when:

- it maps to an approved requirement, defect, or buyer-observed problem;
- a task-specific Requirements Steward packet exists;
- the Decision Assurance Implementation Agent completion packet is complete;
- it conforms to `docs/2026061908-trusted-authority-ethical-influence-standard.md`;
- the preferred route remains operational;
- the fallback route remains operational;
- schema and capture source-of-truth checks pass or explicit failures are documented;
- actual print behavior is inspected when report quality is in scope;
- documentation and traceability are updated;
- no deferred capability is implied as current;
- final merge remains a human decision.