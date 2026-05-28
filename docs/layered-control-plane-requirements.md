# Layered Control Plane Requirements

Date: 2026-05-28
Baseline: V51.1

## Purpose

CyberShield must be built as a layered control plane, not a monolithic dashboard or single-file demo.  The architecture must separate presentation, interaction, model logic, evidence, decisions, proof, and audit boundaries.

## Required control-plane layers

### 1. UI Layer

What the user sees.

Includes:

- Briefing
- TrustMap
- Runtime
- Evidence
- Proof Pack
- Architecture
- Settings

Requirement: no new top-level tabs unless explicitly approved.

### 2. Interaction Layer

How the user explores, clicks, hovers, drills down, selects, filters, improves, and exports.

Includes:

- click actions
- hover explanations
- selected state
- detail panel update
- route-to-model
- route-to-evidence
- route-to-report
- download/export actions

Requirement: every visible interactive object must explain, route, calculate, download, or trigger a next step.

### 3. Governance Layer

The conceptual ownership and accountability layer.

Includes:

- owner assignment
- accountable role
- escalation path
- authority boundary
- approval logic
- governance legitimacy
- executive accountability

Requirement: every decision-relevant object must show who owns the gap or response.

### 4. Model Registry Layer

The version-controlled scoring and decision model layer.

Includes:

- model registry
- model version
- source frameworks
- model status
- inputs
- weights
- thresholds
- scoring factors
- limitations
- change log

Requirement: scoring logic must move out of `index.html` into `/data/models/*.json` or equivalent registry files.

### 5. Evidence Layer

The proof and evidence maturity layer.

Includes:

- evidence type
- evidence confidence
- evidence freshness
- evidence owner
- evidence requirement
- missing evidence
- conflicting evidence
- source trace

Requirement: every score and decision must identify supporting evidence and missing evidence.

### 6. Decision Layer

The operational admissibility layer.

Decision ladder:

- Allow
- Constrain
- Escalate
- Block

Requirement: every runtime scenario must explain what CyberShield decided, why it matters, and what happens next.

### 7. Proof / Report Layer

The exportable evidence and leadership communication layer.

Primary reports:

1. Executive Briefing Summary
2. TrustMap / Authenticity Trust Summary
3. Operational Trust Roadmap
4. Proof Pack

Requirement: report outputs must include model version, evidence assumptions, prototype boundary, selected role, selected industry, selected scenario, generated date, and limitations.

### 8. Boundary / Audit Layer

The trust-calibration and chain-of-custody layer.

Includes:

- prototype boundary
- model version
- report version
- decision record ID
- generated timestamp
- data source status
- live capability status
- export metadata

Requirement: CyberShield must clearly distinguish available-now, assessment-driven, analyst-assisted, preview, planned, and not-yet-implemented capabilities.

## Layer depth definition

Layer depth is the interaction depth behind every visible object.

- Layer 1: visible executive card, score, node, edge, or widget
- Layer 2: tooltip, popover, explanation, or selected detail panel
- Layer 3: model, evidence requirement, scenario, or workflow action
- Layer 4: downloadable/exportable proof, recommendation, or report

Requirement: critical dashboard objects should support at least Layer 2 and Layer 3.  Core product objects should support Layer 4.

## Control-plane flow

Input determines context.
Context determines model.
Model determines score.
Score determines decision.
Decision determines evidence need.
Evidence determines proof strength.
Proof strength determines report.
Report determines advisory path.

## No-overclaim boundary

The current GitHub Pages build is a static advisory prototype.  It does not perform live enforcement, live takedown automation, marketplace scanning, ad-platform enforcement, live identity verification, CRM sync, ticketing, notifications, SIEM/EDR/IAM/GRC integration, or production agent blocking.

This boundary must appear in shareable reports and admin/builder metadata.
