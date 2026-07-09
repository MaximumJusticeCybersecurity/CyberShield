# CyberShield Pilot vNext Acceptance and Traceability

Version timestamp: 2026070913  
Status: architect review baseline; engineering not yet authorized  
Owner: Dr. Max Justice  
Requirements steward: Aegis / My AI Business Partner

## 1. Acceptance principle

Pilot vNext is successful when one AI-generated recommendation becomes one complete, understandable, structured, and defensible Trust Decision Record without confusing evidence sufficiency, epistemic confidence, consequence, decision outcome, or human oversight.

## 2. Requirements traceability

| Requirement area | Controlling source | Required artifact | Acceptance evidence |
|---|---|---|---|
| Product mission | Pilot vNext requirements sections 1-3 | Recommendation-to-record workflow | One recommendation produces one record |
| Domain-neutral input | Sections 4-5 | Recommendation Input object | Vendor-risk and one generic recommendation fixture validate |
| Original recommendation preservation | Section 6 | Immutable input field | Output contains exact input text |
| Material claims | Sections 6 and 7.3 | Claim objects | Material claims are extracted and linked |
| Evidence and provenance | Section 7.4 | EvidenceItem objects | Every evidence item has provenance and claim links |
| Missing evidence | Section 7.5 | MissingEvidence objects | Blocking gaps identify claims and closure conditions |
| Assumptions | Section 7.6 | Assumption objects | Explicit and inferred assumptions are separated |
| Contradictions | Section 7.7 | Contradiction objects | Contradictions identify decision effect |
| Risk If Wrong | Section 7.8 | Category-level risk assessment | Risk categories, reversibility, and affected parties appear |
| Evidence sufficiency | Section 7.9 | Evidence Sufficiency object | Sufficiency is separate from confidence |
| Confidence | Section 7.10 | Confidence Assessment object | Explanation identifies strongest and weakest bases |
| Candidate actions | Section 7.11 | CandidateAction objects | Multiple legitimate actions are compared |
| Strongest Defensible Action | Section 7.12 | Selected action object | One selected action includes conditions and change triggers |
| Human review | Section 7.13 | Review Requirement object | Review level is separate from outcome |
| Human decision | Section 7.14 | HumanDecision object | Accountable decision remains separate from CyberShield action |
| Override | Section 7.14 | OverrideEvent object | Divergence preserves rationale and accepted risk |
| Auditability | Section 7.15 | Audit events and version fields | Material changes, actors, versions, and exports are preserved |
| Executive legibility | Sections 9-10 | Executive Decision Brief | Non-technical viewer explains the decision in under five minutes |
| Pilot boundary | Sections 12-14 | Operational-status disclosure | No production, autonomous, or universal-domain overclaim |

## 3. Architect acceptance criteria

The Architect shall confirm or revise these criteria before engineering:

- **ARCH-001:** One universal record core can represent the current vendor-risk record without loss of material evidence or human-decision fields.
- **ARCH-002:** Vendor-specific fields are isolated in a domain extension or adapter.
- **ARCH-003:** Current preferred and fallback routes can remain operational during additive migration.
- **ARCH-004:** Evidence sufficiency, confidence, Risk If Wrong, decision outcome, and review requirement are separate in the data model and UI contract.
- **ARCH-005:** The current reusable trusted-agent spine can be reused without becoming the universal record itself.
- **ARCH-006:** Deterministic rules govern validation, thresholds, routing, eligibility, and completeness.
- **ARCH-007:** LLM assistance is bounded to extraction, summarization, contradiction suggestions, and rationale drafting.
- **ARCH-008:** Human decisions and overrides cannot be silently overwritten.
- **ARCH-009:** Historical records can be mapped or preserved without destructive rewriting.
- **ARCH-010:** The smallest P1 can be implemented without TrustMap, multi-agent orchestration, live retrieval, or a complex dashboard.

## 4. Future engineering tests requiring architect confirmation

| Test ID | Scenario | Expected result |
|---|---|---|
| VNEXT-T001 | Valid vendor-risk recommendation and controlled evidence | Complete vNext Trust Decision Record |
| VNEXT-T002 | Recommendation with no supplied evidence | Missing evidence and insufficient-support result |
| VNEXT-T003 | High consequence but strong independent evidence | High Risk If Wrong may coexist with high or moderate confidence |
| VNEXT-T004 | Low consequence but contradictory evidence | Low consequence does not conceal low or contradicted confidence |
| VNEXT-T005 | Originating AI states 95% confidence | Originating confidence is preserved but not treated as evidence |
| VNEXT-T006 | Unsupported material claim | Evidence sufficiency cannot be Sufficient |
| VNEXT-T007 | Blocking contradiction | Proceed is ineligible unless condition or override is explicitly recorded |
| VNEXT-T008 | Review level set to Auto Approve | Schema or normalization rejects deprecated term |
| VNEXT-T009 | Review level set to Reject | Schema rejects outcome used as review level |
| VNEXT-T010 | Human selects different action | Override event is required |
| VNEXT-T011 | Generic business recommendation without domain adapter | Generic analysis proceeds with limitation disclosure |
| VNEXT-T012 | Unsupported domain-specific validation claim | Record fails completeness or claim check |
| VNEXT-T013 | Synthetic evidence presented as independent real evidence | Validation fails |
| VNEXT-T014 | Evidence item has no source or affected claim | Validation fails or item remains explicitly unknown and limited |
| VNEXT-T015 | Claim-evidence links reference missing IDs | Validation fails |
| VNEXT-T016 | Material record change | Updated timestamp and audit event required |
| VNEXT-T017 | Record export | Schema, versions, operational status, and limitations remain present |
| VNEXT-T018 | Human review alone with missing evidence | Missing evidence remains open; review does not cure gap |
| VNEXT-T019 | Another AI agrees with the recommendation | Agreement alone does not raise evidence sufficiency |
| VNEXT-T020 | Prompt injection inside recommendation or evidence | Content remains evidence; no authority, tool, or policy change occurs |
| VNEXT-T021 | No additional action is justified | Legitimate no-action outcome is produced |
| VNEXT-T022 | Insufficient information to choose among actions | `insufficient_evidence_to_decide` is permitted |
| VNEXT-T023 | Same deterministic inputs and rules | Same normalized routing, eligibility, and completeness result |
| VNEXT-T024 | Current vendor-risk fixture | Existing Request Evidence, High Risk If Wrong, Low Confidence, and human-review behavior remains supported |

## 5. Five-minute presentation acceptance

The Sandeep presentation succeeds when he can explain back:

1. CyberShield evaluates whether an AI recommendation is defensible enough to act upon.
2. It breaks the recommendation into material claims.
3. It links claims to evidence and exposes gaps, assumptions, and contradictions.
4. It separates confidence from consequence.
5. It identifies the strongest defensible action and who must decide.
6. It creates a record of the system recommendation and the accountable human decision.

## 6. Prohibited acceptance shortcuts

The candidate shall not be accepted merely because:

- the demo looks polished;
- the output contains a score;
- two models agree;
- a framework is mapped;
- a human clicked approve;
- a document exists by title;
- the vendor self-attested;
- the current example produces the expected answer; or
- the schema parses without semantic relationship checks.

## 7. Engineering gate

Engineering remains blocked until:

1. the Architect reviews the exact requirements candidate;
2. the Architect returns `READY FOR ENGINEERING` or `READY FOR ENGINEERING WITH CONDITIONS`;
3. required changes are reconciled into the repository;
4. Dr. Max Justice accepts the exact revised candidate; and
5. Aegis / My AI Business Partner creates a bounded implementation packet with the Architect's acceptance criteria.

## 8. Definition of done for the current requirements task

This requirements task is complete when:

- owner direction and supersession are recorded;
- the Pilot vNext requirements are complete;
- the Architect questions and proposed answers are recorded;
- the vNext schema is reviewable;
- the Sandeep briefing is ready;
- the Architect gate is explicit;
- acceptance and traceability are recorded;
- a pull request binds the exact candidate; and
- an Architect review issue references that pull request and exact head.

No engineering implementation is part of this task.