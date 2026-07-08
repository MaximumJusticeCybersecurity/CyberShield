# Engineer Handoff: Trusted-Agent Spine and Agent Work Receipt

Date: 2026-07-08
Issue: #25
Status: Authorized for implementation with constraints

## Build Order

1. Extend the canonical record mapper with additive fields.
2. Add schema validators and fixtures for Context Pack, Source, Missing Evidence, Human Gate, and Agent Work Receipt.
3. Map the existing vendor-risk sample into the new objects.
4. Preserve the current claims, evidence, validators, Risk If Wrong, confidence, candidate actions, and human decision logic.
5. Add compact internal-QA receipt rendering.
6. Include the receipt in JSON download.
7. Include the receipt or stable receipt reference in the report-capture payload.
8. Confirm print output remains readable and executive first-page content remains unchanged.
9. Add regression tests for preferred and fallback routes.
10. Demonstrate reuse in one second bounded domain fixture before extracting registered reusable skills.

## Required Tests

- Legacy records without new objects still render.
- New records contain one Context Pack.
- Every evidence item references a Source object or explicitly records no source.
- Missing evidence is structured and linked to claims.
- Human Gate supports accept, reject, modify, defer, and escalate.
- Human override preserves the agent recommendation and rationale.
- Agent Work Receipt records operations, sources, limitations, unresolved findings, and candidate digest.
- Receipt is present in JSON.
- Capture payload includes receipt or canonical reference.
- Print output does not overflow or bury the executive decision.
- Public pages do not expose internal Aegis architecture.
- No autonomous approval or external action is introduced.

## Verification Packet

Provide the same exact candidate to:

- Verifier A: Decision Assurance Implementer Agent
- Verifier B: Aegis
- Verifier C: Security Agent

Each verifier returns GO, GO WITH CONDITIONS, or NO-GO with evidence reviewed, findings, unresolved risk, and candidate digest.

Dr. Max Justice remains final merge authority.
