# 20260605xxV15 Human Review and Override Release Note

## Summary

This release hardens the CyberShield human review and manual override workflow.

## Primary Goal

Prove that CyberShield's recommendation is never silently overwritten by a human decision.

The Trust Decision Record now more clearly separates:

- What the AI claimed
- What the evidence says
- What CyberShield inferred
- What the human decided

## Updated Code

```text
src/atdr/atdr-app.js
src/atdr/atdr-smoke-test.js
```

## New Review Behavior

The Review screen now shows:

- CyberShield Recommended Action
- Human Selected Action
- Override Status
- Required Reviewer Roles
- Override reason / reviewer notes
- Residual risk acknowledgment
- Decision timestamp

## New Audit Stage

The workbench now includes an Audit stage in the left rail.

The Audit stage displays session events including:

- Demo loaded
- Recommendation submitted
- Analysis refreshed
- Evidence toggled
- Evidence uploaded
- Evidence note added
- Human decision recorded
- Manual override recorded
- JSON exported
- PDF exported

## Human Decision Data

Human decisions now preserve:

- human_decision_id
- record_id
- cyberShield_recommended_action
- human_selected_action
- override_status
- reviewer_role
- reviewer_name
- override_reason
- residual_risk_acknowledgment
- reviewer_notes
- decision_timestamp

## Override Events

When the human selected action differs from the CyberShield recommendation, an override event is recorded with:

- override_event_id
- record_id
- cyberShield_recommended_action
- human_selected_action
- reviewer_role
- reviewer_name
- override_reason
- residual_risk_acknowledgment
- timestamp

## Record Defensibility Behavior

Before human review:

```text
Record Defensibility: Not Defensible Yet
CyberShield Recommended Action: Request Evidence
```

When the reviewer confirms CyberShield's action:

```text
Record Defensibility: Executive brief ready with limitations
Human Decision: Request Evidence
Override Status: No override
```

When the reviewer overrides to Accept with Caveat:

```text
Record Defensibility: Export-ready with caveat
CyberShield Recommendation Preserved: Request Evidence
Human Override: Accept with Caveat
```

## Print/PDF Update

The executive brief now includes a stronger Human Decision and Override section with:

- CyberShield Recommended Action
- Human Selected Action
- Override Status
- Reviewer
- Override Rationale / Notes
- Residual Risk Acknowledgment
- Decision Timestamp

## Smoke Test Update

The smoke test now verifies:

- CyberShield recommendation is preserved separately
- Simulated override JSON remains parseable
- Override event captures rationale
- Human selected action differs from CyberShield action in override simulation

## Product Rule

The human may decide.

CyberShield must preserve what it recommended, what the human decided, why, and when.
