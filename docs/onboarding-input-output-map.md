# Onboarding Input-Output Map Requirements

Date: 2026-05-28
Baseline: V51.1

## Purpose

CyberShield must map onboarding inputs to dashboards, scoring models, scenarios, evidence requirements, reports, and advisory paths.  Builders must not invent dashboard behavior inside `index.html`.

## Core rule

Shared engine.  Tailored lens.

CyberShield should not become four separate products.  It should use one control-plane engine with multiple role lenses, industry profiles, scenario packs, scoring models, evidence requirements, and report templates.

## Required onboarding modes

### Public Demo Fast Path

Purpose: immediate payoff and low friction.

Required questions:

1. Industry
2. Role lens
3. Scenario
4. Business value at risk
5. Evidence maturity

Outcome: generate an executive briefing within seconds.

### Pilot / Advanced Path

Purpose: deeper assessment and more accurate configuration.

Additional questions may include:

- organization name
- owner roles
- framework priority
- AI usage maturity
- vendor exposure
- authenticity risk
- current evidence state
- report recipient
- external sharing needs
- current governance workflow
- known unresolved risks

Outcome: generate role-specific dashboard, scenario set, evidence plan, score models, and report package.

## Required dashboard lenses

Start with five dashboard lenses:

1. CEO / President
2. CISO / vCISO
3. CIO / CTO
4. CFO
5. Board / Advisor

Do not add Legal/IP as a formal top-level dashboard lens yet.  Legal/IP should exist as owner role, escalation recipient, TrustMap dimension, and Proof Pack audience option.

## Role lens mapping

### CEO / President

Focus:

- business exposure
- decision accountability
- customer trust
- brand/reputation risk
- strategic continuity
- what leadership must prioritize next

Primary outputs:

- Executive Briefing Summary
- TrustMap Summary
- Operational Trust Roadmap

### CISO / vCISO

Focus:

- controls
- evidence
- AI governance
- policy
- identity
- audit defensibility
- proof strength

Primary outputs:

- Proof Pack
- Evidence Register
- Runtime Governance Readiness Review

### CIO / CTO

Focus:

- systems
- data flows
- integrations
- infrastructure
- operational resilience
- technology dependencies

Primary outputs:

- TrustMap Summary
- Operational Trust Roadmap
- Evidence Register

### CFO

Focus:

- vendor risk
- payment trust
- financial exposure
- fraud
- avoided loss
- investment priorities

Primary outputs:

- Executive Briefing Summary
- Payment/Vendor Trust Summary
- Operational Trust Roadmap

### Board / Advisor

Focus:

- decision defensibility
- strategic exposure
- proof
- accountability
- continuity risk

Primary outputs:

- Executive Briefing Summary
- Board-ready Proof Summary
- Operational Trust Roadmap

## Industry profiles

CyberShield must support these first-class demo paths because MJC's founder-led go-to-market network spans these high-credibility buyer ecosystems.

### 1. Defense Industrial Base / Federal Contractor SMB

Do not rely only on generic “government contractor” language.  Many SMBs are small or mid-sized businesses that also support DoD or federal work.

Primary concern:

Can we prove governance, CUI handling, evidence readiness, and cyber/AI control before it affects contracts?

Framework overlays:

- NIST CSF 2.0
- CMMC / NIST SP 800-171
- NIST AI RMF where AI touches CUI, vendors, or decision-making

Primary scenarios:

- CUI uploaded to unapproved AI tool
- vendor/subcontractor evidence gap
- access-control weakness
- policy/evidence mismatch
- owner cannot prove readiness

### 2. Financial Services / Community Banking

Primary concern:

Can leadership see vendor, payment, AI, fraud, and operational trust risk before it becomes a customer, board, or regulatory issue?

Framework overlays:

- NIST CSF 2.0
- NIST AI RMF
- FFIEC-style overlay later
- FAIR-style exposure logic for directional loss modeling

Primary scenarios:

- AI-assisted vendor payment approval
- payment destination authenticity failure
- vendor governance review overdue
- fake site or impersonation creates customer trust impact
- AI usage lacks board-level visibility

### 3. AI-Enabled SMB / SaaS / Professional Services

Primary concern:

Are we adopting AI faster than we can govern it?

Framework overlays:

- NIST CSF 2.0
- NIST AI RMF
- lightweight ISO-style maturity later
- FAIR-style exposure logic for business risk

Primary scenarios:

- shadow AI data upload
- AI-generated customer communication without review
- vendor tool adopted without data classification
- agentic workflow acts without authority boundary
- evidence gap prevents executive confidence

### 4. Healthcare / Federal Health Security

Primary concern:

Can leadership prove patient-data, vendor, AI, and operational governance before it becomes a compliance, trust, or continuity issue?

Framework overlays:

- NIST CSF 2.0
- NIST AI RMF
- HIPAA/Security Rule alignment later
- HHS/CMS/federal security governance language where appropriate

Primary scenarios:

- sensitive health data uploaded to unapproved AI tool
- third-party system lacks evidence
- AI-generated patient-facing or administrative output lacks review
- access-control or audit evidence gap
- operational continuity impact from governance fragmentation

## Registry-driven architecture

Recommended files:

- `/data/onboarding/onboarding-map.json`
- `/data/profiles/role-profiles.json`
- `/data/profiles/industry-profiles.json`
- `/data/scenarios/scenario-registry.json`
- `/data/models/model-registry.json`
- `/data/dashboards/dashboard-registry.json`
- `/data/reports/report-registry.json`
- `/data/evidence/evidence-types.json`
- `/data/frameworks/framework-registry.json`

## Input-to-output flow

Onboarding answer
→ role profile
→ industry profile
→ scenario pack
→ model registry
→ dashboard module registry
→ evidence requirements
→ report template registry
→ advisory path

## Required builder behavior

Builders must not hardcode role, industry, model, scenario, or report logic directly into `index.html` once the registries exist.  Use the registries as source of truth.

## QA checklist

For each industry profile, verify:

- language feels sector-specific
- scenario is believable to an experienced operator
- frameworks match the sector
- evidence requirements match the scenario
- dashboard lens changes by role
- recommended reports change by role/industry
- CTA path remains primary/secondary disciplined
- no generic demo language dominates
