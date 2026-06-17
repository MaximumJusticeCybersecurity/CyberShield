# 2026061717 Harness Self-Improvement Requirements

Date: 2026-06-17

Status: Accepted requirements, not yet implemented in product code

Scope: CyberShield Decision Assurance, AI Trust Decision Record, Harness Health Assessment, shared Aegis trust architecture inputs

## 1. Purpose

This document captures the requirements added from the Nate B. Jones agent maintenance lesson and related Aegis / CyberShield architecture decisions.

The core product direction is unchanged:

```text
AI-generated recommendation in -> defensible AI Trust Decision Record out
```

The added requirement is that CyberShield must also evaluate whether the AI decision or agentic workflow sits inside a healthy, maintained harness.

CyberShield remains the narrow commercial product.  Aegis remains the broader Trusted Partner OS.  CyberShield must not become the full Aegis architecture.

## 2. Source lesson

Nate B. Jones described the agent maintenance problem clearly: agents are not stable after launch because the model changes inside the agent and the world changes around the agent.  A harness that helped a weaker model can later constrain a better model.  A broad permission set that seemed harmless when the model was weak can become dangerous when the model improves.  Stale wikis, stale prompts, old workflows, weak proof trails, and outdated source-of-truth documents become business risk when an agent keeps acting on them.

The durable lesson for CyberShield is:

```text
Self-improvement equals governed harness maintenance.
```

Self-improvement must not mean unbounded autonomous self-modification.

## 3. Updated doctrine

Add these doctrine lines to the CyberShield and shared architecture libraries:

```text
Self-improvement must be governed.

A better model can break an old harness.

A changed workflow can poison an agent with stale truth.

Deletion is sometimes the improvement.

No agent may silently change its job, reach, proof standard, or authority.
```

## 4. Definitions

### 4.1 Harness

A harness is the setup that makes an AI system useful for real work.

It includes:

- what the AI reads
- what the AI remembers
- what tools it can touch
- what systems it can access
- what it is allowed to change
- what proof it must return
- what stops it
- what requires human approval
- what gets logged
- what gets reviewed

### 4.2 Harness Maintenance

Harness Maintenance is the governed practice of keeping that setup healthy as models, workflows, sources, permissions, and business needs change.

### 4.3 Self-Improvement Loop

A Self-Improvement Loop is a controlled maintenance process that reviews and updates the harness.

It must be:

- logged
- bounded
- reviewable
- reversible
- approval-controlled where authority changes

## 5. Nate five-check model

CyberShield must treat these five checks as the canonical Harness Health Assessment model.

### 5.1 Inputs / Sources

Ask:

- What is the agent reading?
- Are the sources current?
- Did an old source become misleading?
- Did a new source become authoritative?
- Did the workflow change while documentation stayed stale?

### 5.2 Reach / Permissions

Ask:

- What can the agent touch?
- Can it only read?
- Can it draft?
- Can it update records?
- Can it publish?
- Can it spend money?
- Can it send external communications?
- Can it delete records?
- Are permissions too broad for current model capability?
- Are old restrictions now holding back safe value?

### 5.3 Job / Purpose

Ask:

- What is the agent's job today?
- Is it still a summary agent?
- Has it drifted into planning?
- Has it drifted into action?
- Has the business changed enough that the job should change?
- Has the job changed silently?

No agent may drift from summary to planning to action without deliberate job reclassification and approval.

### 5.4 Proof / Evidence

Ask:

- What proof does the agent return?
- Can a human inspect the trail?
- Does it show which sources it checked?
- Does it show which sources it could not access?
- Does it link to inspectable evidence where feasible?
- Does it quote or cite source language where appropriate?

The proof cannot merely be the agent saying it is true.

### 5.5 Value / Usefulness

Ask:

- Does anyone use the output?
- Does it save time after review?
- Does it improve decision quality?
- Does it create another pile of work?
- Is it duplicating an existing report?
- Should the agent be improved, constrained, rebuilt, or retired?

## 6. CyberShield product requirements

| Requirement ID | Requirement | Priority | Status | Test / Acceptance |
|---|---|---|---|---|
| REQ-HM-001 | CyberShield must support Agent Maintenance / Harness Health Assessment as a buyer-facing use case. | Critical | Accepted | Demo can explain and capture Inputs, Reach, Job, Proof, and Value. |
| REQ-HM-002 | CyberShield must evaluate Inputs / Sources for currency, authority, and stale-truth risk. | Critical | Accepted | ATDR or Harness Review includes source freshness and source-of-truth status. |
| REQ-HM-003 | CyberShield must evaluate Reach / Permissions for read, draft, update, publish, spend, send, delete, and external-action authority. | Critical | Accepted | Review screen exposes permission scope and flags overbroad reach. |
| REQ-HM-004 | CyberShield must evaluate Job / Purpose and detect silent job drift. | Critical | Accepted | Review identifies whether the workflow is summary, planning, recommendation, or action. |
| REQ-HM-005 | CyberShield must evaluate Proof / Evidence and require an inspectable trail where feasible. | Critical | Accepted | ATDR includes proof trail, sources checked, and sources unavailable. |
| REQ-HM-006 | CyberShield must evaluate Value / Usefulness and support Improve, Constrain, Rebuild, Retire recommendations. | High | Accepted | Harness review produces a value decision and next action. |
| REQ-HM-007 | CyberShield must identify model-improved / harness-did-not risk. | Critical | Accepted | Risk taxonomy includes this category. |
| REQ-HM-008 | CyberShield must identify workflow-changed / docs-did-not risk. | Critical | Accepted | Risk taxonomy includes this category. |
| REQ-HM-009 | CyberShield must distinguish useful learning loops from unsafe self-modification. | Critical | Accepted | Learning-loop review captures what changed, who approved, and rollback path. |
| REQ-HM-010 | CyberShield must treat pruning or deletion as a valid improvement action. | High | Accepted | Recommendations may include Delete, Remove Tool, Reduce Access, Retire Workflow. |
| REQ-HM-011 | Model upgrades must trigger harness review. | High | Accepted | Harness review records last model/version change and review status. |
| REQ-HM-012 | Workflow changes must trigger harness review. | High | Accepted | Harness review records last workflow/process change and review status. |
| REQ-HM-013 | CyberShield must not imply that self-improvement means autonomous authority expansion. | Critical | Accepted | No product copy or UI implies uncontrolled self-modification. |

## 7. ATDR field additions

Add or confirm these fields in the AI Trust Decision Record or related Harness Review payload:

- harness summary
- source-of-truth status
- source freshness
- sources checked
- sources unavailable
- tool reach
- permission scope
- job classification
- job drift status
- proof requirement
- proof trail
- model/version change status
- workflow change status
- learning-loop status
- learning-loop approval status
- harness health score
- maintenance recommendation
- rollback path
- next human action

## 8. Risk taxonomy additions

Add these risk categories:

- stale source risk
- overbroad permission risk
- weak proof risk
- model improved but harness did not
- workflow changed but documentation did not
- silent job drift
- unsafe self-modification
- learning-loop corruption
- unused output risk
- tool bloat risk

## 9. Sandeep demo guidance

The Sandeep walkthrough must stay focused.

Recommended demo message:

```text
CyberShield makes AI-influenced decisions legible, reviewable, and accountable.
```

Supporting line:

```text
CyberShield helps organizations prove why an AI-influenced decision or agentic action was trusted, limited, rejected, or escalated.
```

Demo flow:

1. Show one AI-influenced vendor-risk, security-risk, or compliance recommendation.
2. Classify the decision.
3. Capture evidence.
4. Identify AI influence and decision provenance.
5. Check harness health using Inputs, Reach, Job, Proof, and Value.
6. Show risk-if-wrong.
7. Show meaningful human review.
8. Export an AI Trust Decision Record.

Do not present Aegis as the product in this demo.  Aegis is the larger architecture.  CyberShield is the commercial proof point.

## 10. Aegis architecture inputs

The Aegis library should retain these requirements, but they are recorded here because CyberShield uses the same trust architecture concepts.

Aegis must:

- maintain a governed Self-Improvement Loop
- review what it reads, remembers, touches, changes, proves, and escalates
- not silently expand authority
- not silently change its job
- request human approval before meaningful harness changes
- keep a change log of accepted self-improvement changes
- treat pruning and deletion as valid improvement actions
- check source freshness, permission scope, job drift, proof quality, and output value

## 11. Shared architecture rules

Self-improvement must be governed by these rules:

- changes to authority require approval
- changes to source hierarchy require approval
- changes to memory rules require approval
- changes to external communication authority require approval
- changes to spending authority require approval
- changes to legal or financial action authority require approval
- changes to tool reach require approval
- changes must be logged
- changes must be reversible where feasible
- changes must include rationale and evidence

## 12. Non-goals

This update does not authorize:

- autonomous self-modification
- uncontrolled agent authority expansion
- new production integrations
- spending authority
- external communications without approval
- legal or financial action automation
- broad Aegis implementation inside CyberShield
- expanding the first demo beyond the Decision Assurance plus Harness Health Assessment wedge

## 13. Implementation sequence

Recommended implementation order:

1. Add Harness Health Assessment fields to the ATDR schema.
2. Add deterministic scoring for Inputs, Reach, Job, Proof, and Value.
3. Add risk categories to the current findings model.
4. Add a review screen section called Harness Health Assessment.
5. Add export content to the executive brief.
6. Add advisor feedback questions for Sandeep and other reviewers.
7. Add smoke tests for the new fields and risk categories.
8. Update demo readiness checklist.

## 14. Acceptance criteria

The requirement is implemented when:

- a user can complete one vendor-risk ATDR that includes Harness Health Assessment
- the export shows decision evidence and harness health
- the UI explains why the system recommended Trust, Limit, Reject, Escalate, Improve, Constrain, Rebuild, or Retire
- the product does not overclaim live model, live integration, or autonomous agent capability
- the Sandeep demo can be completed without explaining the full Aegis universe
