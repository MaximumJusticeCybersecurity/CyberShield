# Aegis and CyberShield Architecture Boundary

Date: 2026-06-18
Owner: Dr. Max Justice
Target: Next vendor-risk build and first Codex-style requirements agent
Audience: Engineer, architect, builder, advisor reviewer, future agent

## 1. Purpose

This document prevents scope confusion between Aegis and CyberShield.

Aegis and CyberShield are related but separate projects.  They share trust architecture.  They do not share the same public product surface for this build.

## 2. Separation Rule

Aegis is personal, strategic, and long-horizon.

CyberShield is commercial, buyer-facing, and narrowly scoped for demo and pilot delivery.

Aegis protects the human.
CyberShield protects the organization.
The Trust Kernel protects the decision.
Runtime Trust Orchestration protects the action.
Harness Maintenance protects the setup over time.
Decision Provenance protects agency.
Agent Governance protects authority.
Institutional Trust Boundaries protect against blind dependency.
Evidence artifacts protect accountability.

## 3. Correct Relationship

Use this relationship as the canonical builder statement:

```text
Aegis remains the broader trusted partner system and doctrine library.  CyberShield implements a narrow commercial proof point: AI Decision Assurance through AI Trust Decision Records and Harness Health Assessment.
```

Short version for builders:

```text
Aegis is the broader trusted partner architecture.  CyberShield is the organizational decision-assurance product.  The Trust Kernel judges.  Runtime Orchestration routes.  Harness Maintenance keeps the setup trustworthy over time.  The AI Trust Decision Record is the evidence artifact.
```

## 4. Aegis Definition

Aegis is the Trusted Partner architecture for preserving human agency, identity, memory, judgment, decision provenance, and continuity as AI becomes embedded in thought, work, decisions, agents, vendors, and institutions.

Aegis is not the public CyberShield landing page.

Aegis should not be positioned as:

   - Chatbot
   - Companion
   - Emotional dependency product
   - Generic assistant
   - Public mass-market product in this phase
   - Uncontrolled autonomous agent

## 5. CyberShield Definition

CyberShield is the commercial AI Decision Assurance product built from the Aegis trust architecture.

CyberShield helps organizations review AI-influenced recommendations, expose claims and evidence gaps, preserve decision provenance, require meaningful human review, assess harness health where applicable, and produce AI Trust Decision Records.

CyberShield public north star:

```text
Before relying on AI, know whether the recommendation is defensible.
```

## 6. Public Language Boundary

The public CyberShield demo should use very little Aegis language.

Acceptable internal architecture language:

   - CyberShield is built from the Aegis trust architecture.
   - CyberShield applies Trust Kernel Lite to organizational decision assurance.
   - Aegis and CyberShield share trust doctrine.

Avoid public landing page language such as:

   - Aegis OS
   - Digital twin
   - Personal trusted partner
   - Identity continuity
   - Human agency operating system
   - Runtime trust orchestration as the main product category

CyberShield buyers should understand the product without needing to understand Aegis.

## 7. Trust Kernel Boundary

The Trust Kernel is the protected judgment core.

For CyberShield, use Trust Kernel Lite as the commercial decision-evaluation harness.

Customer-facing explanation should be plain:

```text
CyberShield reviews the recommendation against claims, evidence, gaps, risk, confidence, and human review requirements.
```

Do not lead with kernel language above the fold.

## 8. Runtime Boundary

Runtime Trust Orchestration is a future architectural capability.  It governs what is allowed to happen when trust judgments are applied to actions.

For the next CyberShield build, runtime should be limited to decision routing:

   - Continue
   - Request Evidence
   - Escalate for Review
   - Reject
   - Quarantine
   - Generate Record

Do not imply production enforcement, autonomous blocking, or live workflow control unless it is implemented.

## 9. Harness Maintenance Boundary

Harness Maintenance belongs in CyberShield now as a review concept, not as autonomous self-improvement.

CyberShield may assess:

   - Inputs / Sources
   - Reach / Permissions
   - Job / Purpose
   - Proof / Evidence
   - Value / Usefulness

CyberShield may recommend:

   - Improve
   - Constrain
   - Rebuild
   - Retire
   - Request Evidence
   - Escalate for Review

CyberShield must not imply:

   - autonomous self-modification
   - autonomous authority expansion
   - uncontrolled agent improvement
   - silent job drift
   - production agent enforcement

## 10. Decision Provenance Boundary

Decision Provenance belongs in CyberShield now.

CyberShield must show:

   - What the AI recommended
   - What claims were embedded
   - What evidence was considered
   - What was missing or contradicted
   - What CyberShield recommended
   - What the human decided
   - Whether the human overrode CyberShield
   - What residual risk remains

This is commercial and buyer-facing because organizations need to defend AI-influenced decisions.

## 11. Meaningful Human Authority Boundary

Meaningful Human Authority belongs in CyberShield now.

Use Human Review Required in the UI.  Use Meaningful Human Authority in report explanation and architecture docs.

A human has meaningful authority only when the human can inspect evidence, understand alternatives, challenge the recommendation, slow the process, reject without penalty, document the reason, and knowingly accept residual risk.

## 12. Institutional Trust Boundary

Institutional Trust Boundary language belongs in vendor-risk sections.

CyberShield should evaluate vendor and model dependency without becoming a full institutional trust platform in this build.

Capture enough to show:

   - Data exposure
   - Training-use policy
   - Retention
   - Subprocessors
   - Auditability
   - Liability
   - Dependency
   - Exit path
   - Alternative providers
   - Residual vendor risk

## 13. First Codex-Style Agent Boundary

The first Codex-style agent should be the CyberShield Requirements Steward Agent.

That agent belongs in repo governance, not product execution.

It may:

   - read repo docs
   - check requirements alignment
   - draft or update requirements docs
   - prepare PRs for human review
   - protect the Aegis / CyberShield boundary
   - update traceability and handoff documents

It must not:

   - autonomously merge PRs
   - autonomously change production behavior
   - autonomously expand CyberShield into Aegis
   - autonomously approve vendors
   - silently change its own job, reach, proof standard, or authority

The Requirements Steward Agent exists to prevent later code-writing agents from building the wrong product quickly.

## 14. Non-Goals for This Build

Do not build:

   - Full Aegis OS
   - Personal memory model
   - Digital twin simulation
   - Emotional companion features
   - Autonomous agent platform
   - Runtime enforcement
   - Full TrustMap platform
   - Multi-industry dashboard expansion
   - Broad AI safety claims
   - Production CRM infrastructure
   - Live LLM-backed analysis
   - Compliance certification

## 15. Future Personal Website and CyberShield Website Note

A separate requirements document may be needed for rebuilding Dr. Max Justice's personal website and CyberShield web pages.  That effort should not block the next vendor-risk build.

If the website rebuild starts, it should preserve the same separation:

   - Personal site may introduce Dr. Max Justice, MJC, Aegis, CyberShield, and thought leadership.
   - CyberShield pages should stay buyer-problem focused.
   - Aegis pages should stay separate until Aegis has its own public strategy.

## 16. Builder Rule

If Aegis language makes the CyberShield buyer work harder to understand the vendor-risk value, remove it from the public demo and keep it in architecture docs.

If a future agent proposes implementation work before checking requirements, route it first through the Requirements Steward Agent pattern in `docs/2026061815-first-codex-agent-requirements-steward.md`.
