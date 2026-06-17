# Aegis and CyberShield Architecture Boundary

Date: 2026-06-17
Owner: Dr. Max Justice
Target: Next vendor-risk build
Audience: Engineer, architect, builder

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
Decision Provenance protects agency.
Agent Governance protects authority.
Institutional Trust Boundaries protect against blind dependency.
Evidence artifacts protect accountability.

## 3. Aegis Definition

Aegis is the Trusted Partner architecture for preserving human agency, identity, memory, judgment, decision provenance, and continuity as AI becomes embedded in thought, work, decisions, agents, vendors, and institutions.

Aegis is not the public CyberShield landing page.

Aegis should not be positioned as:

- Chatbot
- Companion
- Emotional dependency product
- Generic assistant
- Public mass-market product in this phase
- Uncontrolled autonomous agent

## 4. CyberShield Definition

CyberShield is the commercial AI Decision Assurance product built from the Aegis trust architecture.

CyberShield helps organizations review AI-influenced recommendations, expose claims and evidence gaps, preserve decision provenance, require meaningful human review, and produce Trust Decision Records.

CyberShield public north star:

Before relying on AI, know whether the recommendation is defensible.

## 5. Public Language Boundary

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

## 6. Trust Kernel Boundary

The Trust Kernel is the protected judgment core.

For CyberShield, use Trust Kernel Lite as the commercial decision-evaluation harness.

Customer-facing explanation should be plain:

CyberShield reviews the recommendation against claims, evidence, gaps, risk, confidence, and human review requirements.

Do not lead with kernel language above the fold.

## 7. Runtime Boundary

Runtime Trust Orchestration is a future architectural capability.  It governs what is allowed to happen when trust judgments are applied to actions.

For the next CyberShield build, runtime should be limited to decision routing:

- Continue
- Request Evidence
- Escalate for Review
- Reject
- Quarantine
- Generate Record

Do not imply production enforcement, autonomous blocking, or live workflow control unless it is implemented.

## 8. Decision Provenance Boundary

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

## 9. Meaningful Human Authority Boundary

Meaningful Human Authority belongs in CyberShield now.

Use Human Review Required in the UI.  Use Meaningful Human Authority in report explanation and architecture docs.

A human has meaningful authority only when the human can inspect evidence, understand alternatives, challenge the recommendation, slow the process, reject without penalty, document the reason, and knowingly accept residual risk.

## 10. Institutional Trust Boundary

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

## 11. Non-Goals for This Build

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

## 12. Future Personal Website and CyberShield Website Note

A separate requirements document may be needed for rebuilding Dr. Max Justice's personal website and CyberShield web pages.  That effort should not block the next vendor-risk build.

If the website rebuild starts, it should preserve the same separation:

- Personal site may introduce Dr. Max Justice, MJC, Aegis, CyberShield, and thought leadership.
- CyberShield pages should stay buyer-problem focused.
- Aegis pages should stay separate until Aegis has its own public strategy.

## 13. Builder Rule

If Aegis language makes the CyberShield buyer work harder to understand the vendor-risk value, remove it from the public demo and keep it in architecture docs.
