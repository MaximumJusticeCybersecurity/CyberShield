# 2026061721 Human Legibility and Agency Requirements

Date: 2026-06-17

Status: Accepted requirements, not yet implemented in product code

Scope: CyberShield Decision Assurance, AI Trust Decision Record, Harness Health Assessment, Sandeep demo readiness, shared Aegis trust architecture inputs

## 1. Purpose

This document captures requirements from the Catie Cuan robotics conversation, the Simon Sinek / Ethan Mollick AI conversation, Nate B. Jones's agent maintenance post, and the Aegis maintenance doctrine.

The core CyberShield direction remains:

```text
AI-generated recommendation in -> defensible AI Trust Decision Record out
```

The added requirement is that CyberShield must make AI-influenced decisions human-legible, agency-preserving, challenge-tested, evidence-backed, and maintainable.

## 2. Source lessons

### 2.1 Catie Cuan lesson

The robotics lesson is that intelligent systems must be human-legible, not merely capable.  When technology enters human spaces, trust depends on clear, safe, understandable interaction.

CyberShield translation:

```text
A decision record is not trusted unless the accountable human can understand it.
```

### 2.2 Simon Sinek / Ethan Mollick lesson

AI amplifies people with experience, taste, judgment, and point of view.  It can also agree too easily, flatten voice, remove mental reps, and make weak thinking look polished.

CyberShield translation:

```text
Decision assurance must test whether AI improved human judgment or displaced it.
```

### 2.3 Nate B. Jones lesson

Agents fail when the harness is not maintained.  Sources, permissions, jobs, proof standards, models, workflows, and value all drift.

CyberShield translation:

```text
Harness health is part of decision assurance.
```

## 3. Added doctrine

Add these lines to CyberShield product and builder doctrine:

```text
Trust requires legibility.

Human approval must be meaningful, not ceremonial.

AI-generated polish is not evidence.

AI agreement is not validation.

Expert judgment, taste, and context are part of the control environment.

A decision record must preserve human agency, not obscure AI influence.

Harness maintenance is a control, not an optional operations chore.
```

## 4. Product requirements

| Requirement ID | Requirement | Priority | Status | Test / Acceptance |
|---|---|---|---|---|
| REQ-HLA-001 | CyberShield must include a Human Legibility section in the AI Trust Decision Record. | Critical | Accepted | ATDR shows what happened, why, evidence used, assumptions, uncertainty, and decision owner action. |
| REQ-HLA-002 | CyberShield must include a Meaningful Human Authority check. | Critical | Accepted | Reviewer can understand, accept, reject, modify, or escalate with rationale. |
| REQ-HLA-003 | CyberShield must detect ceremonial approval risk. | Critical | Accepted | Finding triggers when human review exists but decision basis is not legible. |
| REQ-HLA-004 | CyberShield must include an AI Sycophancy / Over-Agreement check. | High | Accepted | Review asks whether AI challenged the premise or merely optimized around it. |
| REQ-HLA-005 | CyberShield must distinguish facts, assumptions, inferences, and recommendations. | Critical | Accepted | ATDR separates these fields or labels them clearly in the narrative. |
| REQ-HLA-006 | CyberShield must include a Why Gate for major AI-influenced decisions or agent workflows. | High | Accepted | Review captures why this AI use exists, why now, and what trust failure it prevents. |
| REQ-HLA-007 | CyberShield must include a Productive Friction / Judgment Preservation check where applicable. | Medium | Accepted | Assessment flags whether automation removes work that trains human judgment or apprenticeship. |
| REQ-HLA-008 | CyberShield must identify generic AI output risk. | High | Accepted | Finding triggers when output is polished but non-specific, unsupported, or not operationally useful. |
| REQ-HLA-009 | CyberShield must preserve accountable human ownership in every consequential ATDR. | Critical | Accepted | Export identifies the accountable human decision owner or shows owner missing. |
| REQ-HLA-010 | CyberShield must make the model / app / harness distinction clear in builder and product documentation. | Medium | Accepted | Docs and UI do not confuse model intelligence with controlled decision assurance. |
| REQ-HLA-011 | CyberShield must include Taste / Expert Judgment as an evaluation input when reviewing strategy, policy, communications, or governance artifacts. | Medium | Accepted | Assessment can record expert judgment notes and reviewer rationale. |
| REQ-HLA-012 | CyberShield must include Legibility Failure in the risk taxonomy. | Critical | Accepted | Risk taxonomy includes opaque recommendation, unclear assumption, missing proof, and ceremonial approval. |
| REQ-HLA-013 | CyberShield must include Human Agency Erosion in the risk taxonomy. | High | Accepted | Assessment flags when AI removes human judgment without a compensating control. |
| REQ-HLA-014 | CyberShield must include Challenge-Tested status. | High | Accepted | ATDR records whether the AI recommendation was red-teamed, critiqued, or reviewed from a skeptical lens. |
| REQ-HLA-015 | CyberShield must not overclaim live AI monitoring, autonomous enforcement, or model introspection unless implemented. | Critical | Accepted | No-overclaim checklist passes. |

## 5. ATDR field additions

Add or confirm these fields in the AI Trust Decision Record or related assessment payload:

   - human_legibility_summary
   - decision_owner
   - human_authority_status
   - approval_meaningfulness
   - approval_rationale
   - facts
   - assumptions
   - inferences
   - recommendations
   - uncertainty_notes
   - why_gate_summary
   - challenge_test_status
   - challenge_findings
   - sycophancy_risk
   - generic_ai_output_risk
   - productive_friction_risk
   - expert_judgment_notes
   - human_agency_risk
   - legibility_failure_status
   - next_human_action

## 6. Risk taxonomy additions

Add these risk categories:

   - opaque recommendation risk
   - ceremonial approval risk
   - missing accountable owner risk
   - AI sycophancy / over-agreement risk
   - generic AI output risk
   - unsupported polish risk
   - human agency erosion risk
   - productive friction removal risk
   - taste dilution risk
   - unchallenged premise risk
   - unclear assumption boundary risk

## 7. UI / export requirements

The UI and export should answer, in plain executive language:

   - What did AI influence?
   - What did the human decide?
   - What evidence supports the decision?
   - What assumptions remain?
   - What did the AI fail to verify?
   - Was the recommendation challenged?
   - What is the risk if the recommendation is wrong?
   - Is approval meaningful or ceremonial?
   - What should happen next?

## 8. Architect instructions

The architect must:

   - Keep CyberShield focused on AI Decision Assurance plus Harness Health Assessment.
   - Treat human legibility as a core product requirement, not a visual styling preference.
   - Treat human authority as a control surface, not just a disclaimer.
   - Map every new requirement to ATDR fields, risk taxonomy, UI display, export language, and tests.
   - Avoid expanding CyberShield into the full Aegis architecture.
   - Avoid building general agents before decision assurance is working.
   - Preserve source, reach, job, proof, and value checks as the harness health backbone.

## 9. Engineer instructions

The engineer must implement in this order:

1. Add schema fields for Human Legibility, Meaningful Human Authority, Challenge-Tested status, and Human Agency Risk.
2. Add deterministic enums and default values before any model-driven scoring.
3. Add risk taxonomy entries.
4. Add UI labels and helper text for executive readability.
5. Add export text to the ATDR / executive brief.
6. Add tests that verify fields render, export, and do not overclaim live capability.
7. Update requirements traceability, Definition of Done, version log, and handoff.

Do not implement autonomous action, live enforcement, live monitoring, external communications, or production integrations under this requirement.

## 10. Demo guidance

For Sandeep and other reviewers, the demo message should remain simple:

```text
CyberShield makes AI-influenced decisions legible, reviewable, and accountable.
```

Supporting line:

```text
It shows what AI influenced, what evidence supports the recommendation, what assumptions remain, whether the human review is meaningful, and what should happen next.
```

## 11. Acceptance criteria

This requirement is implemented when:

   - A user can complete one AI Trust Decision Record that includes a Human Legibility section
   - The record identifies decision owner, facts, assumptions, uncertainty, challenge status, proof, and next human action
   - The UI can flag ceremonial approval, over-agreement, generic AI output, and human agency erosion risks
   - The export explains the decision in language an executive can understand
   - The product does not imply live autonomous control, monitoring, enforcement, or model introspection beyond implemented capability

## 12. Non-goals

This update does not authorize:

   - General-purpose AI agents
   - Autonomous self-modification
   - Autonomous enforcement
   - Live model monitoring unless implemented
   - External communications without approval
   - Production integrations
   - Expanding CyberShield into Aegis

## 13. Relationship to Aegis

Aegis remains the broader trusted partner system and doctrine library.  CyberShield implements a narrow commercial proof point: AI Decision Assurance through AI Trust Decision Records and Harness Health Assessment.
