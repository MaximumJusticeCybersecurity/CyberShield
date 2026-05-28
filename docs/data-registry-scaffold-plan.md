# Data Registry Scaffold Plan

Date: 2026-05-28
Baseline: V51.1

## Purpose

This document defines the registry files that V52 should create or complete.  The current connector blocked creation of several JSON scaffolds under `/data`, so this markdown file preserves the required registry design for the next builder.

## Required registry folders

```text
/data/models/
/data/onboarding/
/data/profiles/
/data/scenarios/
/data/dashboards/
/data/reports/
/data/evidence/
/data/frameworks/
```

## Required files

```text
/data/models/model-registry.json
/data/onboarding/onboarding-map.json
/data/profiles/role-profiles.json
/data/profiles/industry-profiles.json
/data/scenarios/scenario-registry.json
/data/dashboards/dashboard-registry.json
/data/reports/report-registry.json
/data/evidence/evidence-types.json
/data/frameworks/framework-registry.json
```

## Model registry

The model registry should define:

- Operational Trust Model
- Authenticity Trust Model
- Proof Strength Model
- Evidence Confidence Model
- Trust Under Attack Model
- Avoided Exposure Model
- Demo Readiness Model

Each model should include:

- model_id
- model_name
- model_version
- model_status
- model_owner
- last_updated
- purpose
- score_range
- inputs
- weights
- thresholds
- decision_rules
- evidence_requirements
- source_frameworks
- limitations
- change_log

## Onboarding map

The onboarding map should support two modes.

Public demo fast path:

1. Industry
2. Role lens
3. Scenario
4. Business value range
5. Evidence maturity

Pilot or advanced path:

- organization name
- owner roles
- framework priority
- AI usage maturity
- vendor exposure
- authenticity exposure
- current evidence state
- report recipient
- external sharing needs
- known open items

## Role profiles

Initial role lenses:

- CEO / President
- CISO / vCISO
- CIO / CTO
- CFO
- Board / Advisor

Legal/IP should not be a top-level lens yet.  It should be used as an owner role, escalation recipient, TrustMap dimension, and Proof Pack audience option.

## Industry profiles

Initial first-class demo paths:

- Defense Industrial Base / Federal Contractor SMB
- Financial Services / Community Banking
- AI-Enabled SMB / SaaS / Professional Services
- Healthcare / Federal Health Security

## Dashboard registry

Use one dashboard engine with reusable dashboard modules.  Do not create separate hardcoded dashboards for every role-industry-scenario combination.

Dashboard modules should be selected based on:

- role lens
- industry profile
- scenario pack
- model emphasis
- evidence maturity
- report target

## Scenario registry

Initial scenario packs should include:

- AI-Generated Brand Impersonation Campaign
- Counterfeit Product Verification Failure
- Shadow AI Vendor Data Upload
- AI Vendor Payment Authorization
- Privileged Access Reset Request
- AI-Generated Board Report
- Vendor/Subcontractor Evidence Gap
- Sensitive Health Data AI Upload

## Report registry

Initial reports:

1. Executive Briefing Summary
2. TrustMap / Authenticity Trust Summary
3. Operational Trust Roadmap
4. Proof Pack
5. Evidence Register

## Framework registry

Priority frameworks:

1. NIST CSF 2.0
2. NIST AI RMF
3. CMMC / NIST SP 800-171
4. FAIR-style exposure logic as supporting calculation layer

Later overlays:

- FFIEC-style financial services governance
- HIPAA/Security Rule alignment
- ISO 27001

## Builder rule

Once JSON registries are created, do not hardcode role, industry, model, scenario, evidence, or report behavior directly into `index.html`.  The registries should become the source of truth.

## Connector note

During the 2026-05-28 documentation hardening pass, the GitHub connector successfully created markdown requirement files but blocked several attempts to create JSON files under `/data`.  The next builder should create these JSON files through local GitHub Desktop, CLI, or a subsequent connector session.
