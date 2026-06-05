# 2026060415 ATDR Merge Readiness Plan

## Purpose

This plan defines what must be true before the AI Trust Decision Record branch merges into `main`.

Branch under review:

```text
feature/2026060414-atdr-decision-assurance
```

Pull request:

```text
#4 Add 2026060414 ATDR decision assurance prototype
```

## Merge Goal

Move the static CyberShield AI Decision Assurance prototype into the live GitHub Pages path without breaking the existing Trust Kernel.

## Primary Demo Route After Merge

Recommended public demo entry point:

```text
/demo.html
```

Supporting routes:

```text
/launch.html
/atdr.html
/brief.html
/atdr-smoke.html
/index.html
```

## Required Route Behavior

### `/demo.html`

Must act as the demo control room.

Required links:

- Launch page
- ATDR workbench
- Executive brief preview
- Smoke test

### `/launch.html`

Must introduce CyberShield AI Decision Assurance.

Required language:

- The record is the product
- Brought to you by Maximum Justice Cybersecurity
- Open Trust Kernel button, not Open Legacy Executive OS

### `/atdr.html`

Must run the guided ATDR workflow.

Required capabilities:

- Select Vendor Risk demo
- Select Security demo
- Select Compliance demo
- Load selected demo visibly
- Show Demo Coach
- Show Decision Brief
- Show claims, evidence, gaps, risk, confidence, review, decision record, and export

### `/brief.html`

Must render a standalone executive brief preview.

Required capabilities:

- Select all three demo scenarios
- Show executive framing
- Show recommendation under review
- Show claims and evidence requirements
- Show missing support
- Show Risk If Wrong
- Show confidence rationale
- Show human review requirement
- Show limitations
- Show signature block
- Print / Save PDF

### `/atdr-smoke.html`

Must show a GO / NO-GO readiness decision.

Required checks:

- All demo modes analyze
- Vendor-risk demo atomizes correctly
- Every demo has claims
- Every demo has Risk If Wrong
- Every demo has conservative action
- Framework warning language exists
- JSON export is parseable
- Limitations exist
- Schema validation passes

### `/index.html`

Must remain available as the Trust Kernel.

Required language in ATDR demo flow:

```text
Open Trust Kernel
```

not:

```text
Open Legacy Executive OS
```

## Manual QA Before Merge

1. Open `/demo.html`
2. Click Launch Page
3. Click Launch ATDR Demo Router
4. Confirm default Vendor Risk demo loads
5. Switch to Security demo and load it
6. Switch to Compliance demo and load it
7. Open Demo Coach and confirm it changes by stage
8. Open Evidence screen and confirm synthetic evidence appears
9. Add evidence note
10. Save human review decision
11. Download JSON
12. Open Executive Brief preview
13. Print / Save PDF from brief preview
14. Open Smoke Test
15. Confirm GO status
16. Open Trust Kernel
17. Confirm existing platform still loads

## No-Overclaim Checks

Before merge, confirm no route implies:

- Compliance certification
- Legal determination
- Audit opinion
- Production enforcement
- Autonomous approval
- Secure enterprise storage in this static prototype
- Live model verification in this static prototype
- Production vendor approval

## Merge Criteria

Merge is acceptable when:

- Smoke test shows GO
- All demo routes load
- Vendor-risk demo is credible end-to-end
- Executive brief preview prints cleanly
- Trust Kernel remains available
- Documentation reflects current route names
- Known static prototype boundaries remain visible

## Post-Merge Tasks

After merge to `main`:

1. Test live GitHub Pages URLs
2. Update public demo links to the `maximumjusticecybersecurity.github.io` domain
3. Confirm RawGitHack preview links are no longer the primary sharing links
4. Add a short release note
5. Decide whether `/demo.html` or `/launch.html` should be linked from the existing Trust Kernel

## Release Candidate Label

If the above merge criteria pass, mark the branch as:

```text
2026060420V1 Static MVP Release Candidate
```
