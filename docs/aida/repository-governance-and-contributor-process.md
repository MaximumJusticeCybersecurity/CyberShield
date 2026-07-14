# AIDA Repository Governance and Contributor Process

Status: Owner-approved process baseline  
Owner and final human authority: Dr. Max Justice

## Purpose

Integrate AIDA into CyberShield planning, architecture, requirements, implementation, review, customer discovery, and closeout without weakening existing security, source-of-truth, or verifier controls.

## Mandatory preflight

Before proposing a material CyberShield change, every contributor shall:

1. Review the current owner instruction.
2. Complete the repository security startup gate in `AGENTS.md`, `SECURITY.md`, and `security-policy-manifest.json`.
3. Review repository changes made since the contributor's prior response or session.
4. Read `docs/aida/README.md` and the AIDA library in its required order.
5. Review the current source-of-truth hierarchy, requirements, protected AI Trust Decision Record schema, traceability matrices, and Definition of Done.
6. Identify conflicts, superseded instructions, and unverified assumptions.
7. Record what was reviewed and what remains unavailable.

A contributor shall not claim to have reviewed the repository when that review was not performed.

## Feature intake gate

A material feature proposal must state:

- AIDA principle supported;
- observed or hypothesized customer pain;
- buyer and accountable user;
- measurable outcome;
- AI Trust Decision Record element affected;
- security and human-authority impact;
- verification and acceptance path;
- rollback or deferral path; and
- whether the change affects protected recommendation logic, risk logic, schema, or claims.

## Product-scope gate

The current product rule is:

> If a proposed feature does not improve an organization's ability to determine whether an AI-generated recommendation should be trusted before action is taken, it does not belong in the current product.

The Requirements Steward may classify a proposal as:

- Proceed
- Proceed with constraints
- Requires customer validation
- Requires owner approval
- Defer
- Do not implement

## Customer-evidence rule

Product preferences, compliments, social-media engagement, advisor opinions, and internal assumptions are not substitutes for day-in-the-life customer evidence.

Material expansion should be supported by observed workflows, named decision owners, evidence requirements, adoption barriers, buyer and budget hypotheses, and measurable outcomes.

## Methodology-driven development

CyberShield is methodology-driven, not feature-driven.

The implementation shall express the AIDA methodology.  A user-interface element, score, visualization, agent, model, report, integration, or automation shall not redefine the methodology merely because it is convenient to build.

## Platform-neutrality rule

AIDA and CyberShield requirements shall avoid unnecessary dependence on one model, model provider, agent framework, cloud, GRC platform, or current technology generation.

Provider-specific integrations may be built behind explicit boundaries.  The decision-assurance method and record must remain portable.

## Protected-change boundary

AIDA documentation does not authorize direct changes to:

- AI Trust Decision Record schema or contract;
- recommendation or candidate-action logic;
- risk-if-wrong logic or confidence bands;
- evidence, contradiction, provenance, or missing-evidence handling;
- Human Gate rules;
- security policies or verifier assignments;
- public product claims;
- production routes or deployment behavior; or
- SafeAI or third-party intellectual property.

Those changes require the existing Requirements Steward, security startup, branch, review, verifier, and owner-approval processes.

## Completion packet additions

For AIDA-related material work, the completion packet shall also include:

```text
AIDA documents reviewed:
Repository changes since prior session reviewed:
AIDA principle(s) supported:
Customer evidence supporting the change:
Buyer / accountable user:
Measurable outcome:
AI Trust Decision Record element affected:
Platform-neutrality impact:
Feature Traceability Matrix updated:
Customer assumptions still unvalidated:
```

## Process library ownership

- Dr. Max Justice owns the AIDA mission, doctrine, and final decisions.
- Requirements Steward governs implementation eligibility.
- Architect governs reference architecture within approved requirements.
- Engineer implements approved task packets.
- Business partner reviews market, adoption, and commercial logic.
- Independent reviewers validate the exact candidate under current governance.
- Customer discovery validates workflow and commercial assumptions.

No role may silently expand its own authority.

## SafeAI and external-IP rule

SafeAI, Trustworthy AI, TIVM, and any confidential material shared by Sandeep Shilawat or another party shall be treated as external intellectual property and evidence, not as code, requirements authority, or implementation permission.

Any licensing, assignment, acquisition, reseller, joint-development, or integration path requires written terms, ownership verification, contribution history, third-party licensing review, conflict review, and explicit approval by Dr. Max Justice.

## Final rule

Review first.  Trace the requirement.  Validate the customer problem.  Preserve human authority.  Build the smallest defensible solution.  Record what is known, unknown, tested, and not yet implemented.
