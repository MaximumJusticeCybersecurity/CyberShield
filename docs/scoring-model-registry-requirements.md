# Scoring Model Registry Requirements

Date: 2026-05-28
Baseline: V51.1

## Purpose

CyberShield must move scoring logic out of `index.html` and into version-controlled model files.  The scoring model registry is the trust engine of CyberShield.

Executives and sophisticated buyers will ask:

- How was this score calculated?
- What evidence supports it?
- What model was used?
- What framework is this based on?
- What assumptions were made?
- What changes the score?

CyberShield must be able to answer.

## Required model storage

Use JSON model files in the repo.

Recommended structure:

```text
/data/models/
  operational-trust.v1.json
  authenticity-trust.v1.json
  proof-strength.v1.json
  evidence-confidence.v1.json
  trust-under-attack.v1.json
  avoided-exposure.v1.json
  demo-readiness.v1.json

/data/frameworks/
  nist-csf-2.0.v1.json
  nist-ai-rmf.v1.json
  cmmc-nist-800-171.v1.json
  fair-style-exposure.v1.json
```

## Required model fields

Each model must include:

- `model_id`
- `model_name`
- `model_version`
- `model_status`
- `model_owner`
- `last_updated`
- `purpose`
- `score_range`
- `inputs`
- `weights`
- `thresholds`
- `decision_rules`
- `evidence_requirements`
- `source_frameworks`
- `limitations`
- `change_log`

## Model status labels

Use explicit maturity/status labels:

- `demo_directional_not_certified`
- `assessment_driven`
- `analyst_assisted`
- `pilot_validated`
- `production_calibrated`

The current public demo models should default to `demo_directional_not_certified` unless validated otherwise.

## Required models

### Operational Trust Model

Purpose:

Evaluates whether an operational action, AI action, vendor action, access change, data movement, or governance decision is controlled enough to proceed.

Likely factors:

- governance owner assigned
- approved policy exists
- evidence exists
- vendor/system approved
- data classification known
- authority boundary defined
- escalation path exists
- decision record generated

Primary framework lineage:

- NIST CSF 2.0
- NIST AI RMF
- CMMC/NIST 800-171 overlay where relevant

### Authenticity Trust Model

Purpose:

Evaluates whether a person, product, vendor, website, ad, source, brand claim, payment request, listing, communication, or AI-generated artifact is authentic enough to trust before someone acts.

Likely factors:

- official source verified
- vendor/seller approved
- payment destination validated
- brand/person/likeness authorization verified
- product ID/SKU/warranty path validated
- platform ad record reviewed
- marketplace/listing evidence captured
- customer complaint signal reviewed

Primary framework lineage:

- NIST CSF 2.0
- NIST AI RMF
- authenticity-specific evidence model

### Proof Strength Model

Purpose:

Evaluates how defensible the decision record is.

Likely factors:

- evidence completeness
- evidence confidence
- evidence freshness
- source traceability
- owner assignment
- model version captured
- decision record generated
- limitations disclosed

### Evidence Confidence Model

Purpose:

Evaluates reliability of uploaded, selected, or referenced evidence.

Likely factors:

- source quality
- recency/freshness
- owner confirmation
- framework relevance
- completeness
- conflict status
- external validation status

### Trust Under Attack Model

Purpose:

Evaluates whether the organization’s trust surface is being actively exploited.

Likely signals:

- fake domains detected or suspected
- suspicious marketplace listings
- unauthorized ads
- executive likeness misuse
- customer complaints about fake products
- phishing reports
- payment redirection attempts
- vendor impersonation attempts
- unresolved takedowns
- brand abuse trend

### Avoided Exposure Model

Purpose:

Estimates directional exposure reduction when CyberShield identifies, constrains, escalates, or blocks a risky action before consequence.

Important limitation:

This should use FAIR-style exposure logic as a supporting calculation layer, not as the front-end product identity.

Required fields:

- assumptions
- confidence level
- value-at-risk range
- consequence category
- evidence confidence
- model limitations

### Demo Readiness Model

Purpose:

Evaluates whether the current public demo is clear, credible, and externally safe enough to show.

Likely factors:

- first-9-seconds clarity
- no overclaim boundary present
- score model visible
- proof export works
- no dead-click violations
- role/industry selection works
- TrustMap interaction works

## Framework priority

Phase 1:

- NIST CSF 2.0
- NIST AI RMF

Phase 2:

- CMMC / NIST SP 800-171

Phase 3:

- FAIR-style exposure logic as a supporting calculation layer

Later overlays:

- ISO 27001
- HIPAA/Security Rule alignment
- FFIEC-style financial services governance

## Model viewer requirement

Every score visible in CyberShield must route to a model explanation that shows:

- score value
- model used
- model version
- model status
- factors used
- current factor values
- evidence used
- missing evidence
- next best score-improvement action
- limitations

## Model credibility requirement

Scores do not have to be perfect in early demo mode, but they must be visible, explainable, and honest.

Do not hide scoring logic inside minified JavaScript.  Do not create scores that cannot be explained.

## Builder checklist

Before accepting any scoring build, verify:

- model files exist
- model files include required fields
- UI loads model registry rather than hardcoding all logic
- each score routes to model explanation
- each model identifies source frameworks
- each model states limitations
- each model has status label
- model versions appear in exported reports
- prototype boundary is included in exported outputs
