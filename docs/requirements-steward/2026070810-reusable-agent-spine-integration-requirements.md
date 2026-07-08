# Reusable Agent Spine Integration Requirements

Version timestamp: 2026070810  
Owner: Dr. Max Justice  
Audience: Requirements Steward, Architect, Decision Assurance Implementation Agent, Engineer  
Status: Draft requirements packet for steward review  
Decision state: Proposed.  No schema-semantic or runtime implementation is authorized until the Requirements Steward records Proceed or Proceed with constraints.

## 1. Purpose

This packet translates the reusable trusted-agent pattern into CyberShield implementation requirements without changing the current product priority.

CyberShield remains focused on one workflow:

```text
AI-generated recommendation in -> AI Trust Decision Record out
```

The record remains the product.  The reusable spine should strengthen that workflow and later allow the same controlled components to support Recruiting, MJC Revenue, Setas Aerospace, grant, contract, and other domain packs without rebuilding the trust machinery.

## 2. Architectural Decision

CyberShield should become the first production-quality domain pack implemented on top of a reusable trusted-agent spine.

The shared spine supplies:

   - Context Pack.
   - Ingestion.
   - Chunking.
   - Normalization.
   - Storage.
   - Retrieval.
   - Citation and provenance.
   - Export envelope.
   - Human approval gate.
   - Agent Work Receipt.

CyberShield supplies the domain-specific logic:

   - Recommendation.
   - Claims.
   - Evidence requirements.
   - Validators.
   - Contradiction detection.
   - Candidate actions.
   - Risk If Wrong.
   - Confidence Band.
   - Decision owner.
   - Strongest Defensible Action.
   - Human review.
   - AI Trust Decision Record.

## 3. Product Boundary

The public buyer should not need to understand the reusable spine, Aegis, or internal orchestration.

Public language remains focused on:

> Before relying on AI, know whether the recommendation is defensible.

The reusable spine is an internal architecture and implementation discipline.

## 4. Immediate Use of Existing Capabilities

CyberShield already contains much of the required domain logic and should reuse it rather than rebuild it:

   - Claim extraction.
   - Evidence mapping.
   - Missing, weak, stale, self-attested, and contradictory evidence findings.
   - Validator checks.
   - Candidate-action comparison.
   - Request Evidence recommendation.
   - Escalate for Review.
   - Risk If Wrong.
   - Confidence Band.
   - Human Review Required.
   - Canonical AI Trust Decision Record.
   - Browser and PDF-oriented report export.

The new work is to formalize the shared interfaces and receipt, not replace the current product workflow.

## 5. New Required Objects

### 5.1 Context Pack

Add a machine-readable Context Pack object containing:

   - context_pack_id.
   - version.
   - task or review goal.
   - human owner.
   - domain pack and version.
   - approved source types.
   - source freshness rules.
   - organization and decision scope.
   - allowed actions.
   - prohibited actions.
   - output requirements.
   - approval thresholds.

For the current vendor-risk demo, the context pack may be generated from the onboarding fields and configured scenario.

### 5.2 Source Object

Every evidence item should be capable of carrying:

   - source_id.
   - source type.
   - title or description.
   - locator or citation anchor.
   - version or timestamp.
   - accessed_at.
   - authority status.
   - freshness status.
   - relationship to the claim.

Synthetic demo evidence must remain visibly identified as synthetic.

### 5.3 Missing Evidence Object

Missing information must be represented as structured data, not only narrative text.

Minimum fields:

   - missing_evidence_id.
   - required_for_claim_id.
   - description.
   - materiality.
   - effect on confidence.
   - effect on candidate actions.
   - recommended retrieval action.
   - owner.
   - due date, when applicable.

### 5.4 Human Gate Object

The human gate must contain:

   - decision_summary.
   - decision owner.
   - options.
   - recommended option.
   - evidence basis.
   - unresolved gaps.
   - Risk If Wrong.
   - residual risk.
   - accept, reject, modify, and escalate paths.
   - reviewer rationale.
   - approval timestamp and identity.

The gate may not be reduced to a ceremonial Approve button.

### 5.5 Agent Work Receipt

Generate an Agent Work Receipt for every completed Trust Decision Record.

The receipt should identify:

   - What recommendation was reviewed.
   - Which sources and evidence items were used.
   - What facts, assumptions, and inferences were produced.
   - What was missing or conflicting.
   - Which validators ran and their results.
   - Which artifacts were created.
   - Which actions CyberShield performed.
   - Which actions CyberShield did not perform.
   - Which human decision remains.
   - Confidence, limitations, and Risk If Wrong.

The receipt may be embedded in the structured record JSON and displayed through an expandable report section.  It should not overwhelm the first-page executive summary.

## 6. Canonical Record Integration

The shared mapper remains the canonical implementation point:

```text
src/atdr/trust-decision-record-schema-mapper.js
```

Subject to Requirements Steward approval, the target state is:

```text
Trust Decision Record
  + Context Pack reference
  + Source and provenance objects
  + Missing Evidence objects
  + Human Gate object
  + Agent Work Receipt
```

Do not create a parallel route-specific record or receipt schema.

The same canonical object should continue to support:

   - On-screen display.
   - JSON download.
   - Google Sheet capture.
   - Print / Save PDF.
   - Future DOCX export.

## 7. Question-Minimization Behavior

CyberShield and future domain agents should not ask users to manually supply information that can be derived from approved sources or scenario context.

The system should:

1. Extract available information.
2. Normalize it.
3. Identify gaps.
4. Separate material from non-material gaps.
5. Prepare recommended answers or retrieval actions.
6. Ask only the smallest number of questions required for a defensible decision.

For future autonomous internal agents, the preferred status is:

> Work is substantially complete.  These specific decisions require owner approval.

## 8. Model Routing Requirements

The architecture should allow different execution components without binding the product to one model.

Use deterministic or lightweight processing for:

   - Field parsing.
   - Entity normalization.
   - Date and amount normalization.
   - Duplicate detection.
   - Fixed validator checks.
   - Template rendering.

Use stronger reasoning for:

   - Claim decomposition.
   - Evidence conflict analysis.
   - Assumption identification.
   - Risk If Wrong.
   - Candidate-action comparison.
   - Recommendation synthesis.

No model receives authority to approve the final decision.

## 9. Implementation Sequence

### P0: Requirements and contracts

   - Approve the Aegis Reusable Trusted Agent Spine Standard.
   - Approve the Agent Work Receipt schema.
   - Define the Context Pack schema.
   - Define shared Source, Missing Evidence, and Human Gate objects.
   - Map each new object to existing Trust Decision Record fields.
   - Add traceability requirements.

### P1: CyberShield proof

   - Generate a Context Pack for the vendor-risk sample.
   - Attach structured source provenance to evidence.
   - Produce structured Missing Evidence records.
   - Generate the Human Gate object.
   - Generate a Work Receipt in the canonical JSON.
   - Show a concise receipt summary in internal QA.
   - Verify report and capture payloads remain readable and compatible.

### P2: Shared skill extraction

After CyberShield proof:

   - Extract context-pack builder as a reusable skill.
   - Extract source and citation builder.
   - Extract Work Receipt generator.
   - Extract human-gate builder.
   - Extract missing-evidence tracker.
   - Register the reusable components with Agent Registrar.

### P3: Second and third domain proofs

   - Recruiting Opportunity domain pack.
   - MJC Revenue Opportunity domain pack.

Do not begin Setas Aerospace or other broader domain implementations until the shared components have been proven through at least two domain packs.

## 10. Acceptance Criteria

The integration is acceptable only when:

   - The current vendor-risk golden path still works.
   - The public buyer message remains simple.
   - No public autonomous-approval claim appears.
   - The canonical record remains singular.
   - Every material claim can point to evidence or be labeled unsupported.
   - Missing evidence is structured and visible.
   - Facts, assumptions, inferences, recommendations, and human decisions are distinguishable.
   - The human reviewer can accept, reject, modify, or escalate with rationale.
   - A complete Work Receipt is included in the structured record.
   - Report generation and Google Sheet capture remain functional or explicit failures are documented.
   - The architecture can support a second domain without duplicating the full CyberShield implementation.

## 11. Non-Goals

This packet does not authorize:

   - Autonomous vendor approval.
   - Automatic external submission.
   - Unattended payment, purchase, signature, publication, deletion, or legal commitment.
   - Broad multi-agent runtime claims.
   - Generic multi-industry public demos before vendor risk is proven.
   - Public Aegis positioning.
   - A second decision-record schema.
   - Self-expanding permissions.

## 12. Commercial Result

This architecture supports a clear distinction:

> Most agents automate the final click.  CyberShield prepares the evidence, exposes what is missing, documents the risk, and makes the human decision defensible.

## 13. Required Steward Decision

The Requirements Steward should return one of:

   - Proceed.
   - Proceed with constraints.
   - Hold for evidence.
   - Reject.

If proceeding, the steward must identify the authorized P0 or P1 scope and explicitly state whether canonical schema-semantic changes are permitted.
