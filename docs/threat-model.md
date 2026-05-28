# CyberShield Initial Threat Model

Date: 2026-05-28
Baseline: V51.1 Executive Story and CTA Cleanup

## Purpose

This is the initial threat model for the public prototype and future pilot planning.  It is not a full production threat model.

## Current system boundary

Current public build:

- static GitHub Pages prototype
- no authentication
- no backend database
- no live enterprise integrations
- no production enforcement
- no live ticketing or notification system
- no live marketplace, ad platform, or identity verification connection

## Key risks

### 1. Prototype overclaim risk

Risk:

The UI or report language could imply live production capability that does not exist.

Mitigation:

Use boundary language in shareable outputs and metadata.

### 2. Sensitive demo input risk

Risk:

A user may enter real confidential, regulated, or customer-sensitive information into the public demo.

Mitigation:

Add demo-safe data warnings and avoid storing sensitive data in browser storage.

### 3. Misunderstood score risk

Risk:

A directional advisory score may be misunderstood as certified, audited, or production-calibrated.

Mitigation:

Add model status labels and model limitations.

### 4. Report misuse risk

Risk:

A downloaded report could be treated as audit proof beyond its actual purpose.

Mitigation:

Include model version, evidence assumptions, limitations, and prototype boundary.

### 5. Integration credential risk

Risk:

Future integrations may require tokens or credentials that must never be exposed in client-side code.

Mitigation:

Define credential handling before integrations are built.

### 6. Data persistence confusion

Risk:

Users may not understand what is stored locally versus what is saved persistently.

Mitigation:

Clearly label local/demo storage behavior and future pilot storage behavior.

### 7. Model integrity risk

Risk:

Hardcoded or undocumented model logic reduces trust and may create inconsistent scoring.

Mitigation:

Use version-controlled model registry files and model explanations.

### 8. Release-chain drift risk

Risk:

Metadata files may disagree about the current version or capability boundary.

Mitigation:

Use source-of-truth hierarchy and release-chain checklist.

## Pre-pilot requirements

Before a paid pilot or first sale:

- confirm data boundary
- define authentication plan
- define data storage plan
- define integration credential plan
- confirm report disclaimer language
- confirm model status labels
- run release-chain check
- run no-overclaim check
- run security build hygiene checklist

## Threat model update rule

Update this file when:

- authentication is added
- backend storage is added
- integrations are added
- AI/LLM features are added
- customer data is collected
- reports are used in paid pilots
- scoring models are promoted beyond demo-directional status
