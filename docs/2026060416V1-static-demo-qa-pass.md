# 2026060416V1 Static Demo QA Pass

## Purpose

This document tracks the QA pass required before PR #4 moves from draft to review-ready or merge-ready.

## Current Branches

Primary feature branch:

```text
feature/2026060414-atdr-decision-assurance
```

Slash-free preview branch:

```text
preview-atdr-2026060414
```

The preview branch exists because some preview services do not handle branch names containing slashes cleanly.

## Preview Links

Demo control room:

```text
https://raw.githack.com/MaximumJusticeCybersecurity/CyberShield/preview-atdr-2026060414/demo.html
```

Launch page:

```text
https://raw.githack.com/MaximumJusticeCybersecurity/CyberShield/preview-atdr-2026060414/launch.html
```

ATDR workbench:

```text
https://raw.githack.com/MaximumJusticeCybersecurity/CyberShield/preview-atdr-2026060414/atdr.html
```

Executive brief preview:

```text
https://raw.githack.com/MaximumJusticeCybersecurity/CyberShield/preview-atdr-2026060414/brief.html
```

Smoke test:

```text
https://raw.githack.com/MaximumJusticeCybersecurity/CyberShield/preview-atdr-2026060414/atdr-smoke.html
```

Trust Kernel:

```text
https://raw.githack.com/MaximumJusticeCybersecurity/CyberShield/preview-atdr-2026060414/index.html
```

## QA Checklist

### Route Load Checks

- [ ] `/demo.html` loads
- [ ] `/launch.html` loads
- [ ] `/atdr.html` loads
- [ ] `/brief.html` loads
- [ ] `/atdr-smoke.html` loads
- [ ] `/index.html` loads as Trust Kernel

### Demo Control Room

- [ ] Open Launch Page button works
- [ ] Open ATDR Workbench button works
- [ ] Open Executive Brief button works
- [ ] Run Smoke Test button works
- [ ] Presenter Script link works
- [ ] Boundary statement is visible

### Workbench

- [ ] Vendor Risk demo loads
- [ ] Security demo loads
- [ ] Compliance demo loads
- [ ] Load Selected Demo button works
- [ ] Demo Coach opens
- [ ] Demo Coach changes by stage
- [ ] Decision Brief appears
- [ ] Claims screen appears
- [ ] Evidence screen appears
- [ ] Gaps screen appears
- [ ] Risk screen appears
- [ ] Confidence screen appears
- [ ] Review screen appears
- [ ] Decision Record screen appears
- [ ] JSON export works
- [ ] Print / Save PDF opens browser print path

### Executive Brief Preview

- [ ] Vendor Risk scenario renders
- [ ] Security scenario renders
- [ ] Compliance scenario renders
- [ ] Print / Save PDF opens browser print path
- [ ] Signature block appears
- [ ] Limitations appear
- [ ] Human in the loop appears
- [ ] Framework warning language appears where relevant

### Smoke Test

- [ ] Smoke test shows GO
- [ ] All three demo modes analyze
- [ ] Scenario table appears
- [ ] Readiness checks table appears
- [ ] Schema findings section appears
- [ ] No failing checks appear

### No-Overclaim Checks

Confirm no page implies:

- [ ] Compliance certification
- [ ] Legal determination
- [ ] Audit opinion
- [ ] Production approval
- [ ] Autonomous remediation
- [ ] Enterprise evidence storage in the static prototype
- [ ] Live model verification in the static prototype

## Merge Decision Rule

Do not mark PR #4 ready for review or merge until:

```text
/atdr-smoke.html shows GO
```

and the vendor-risk demo plus executive brief preview are acceptable for controlled review.

## If QA Passes

1. Update PR #4 readiness comment
2. Mark PR #4 ready for review
3. Merge when acceptable
4. Test live GitHub Pages route:

```text
https://maximumjusticecybersecurity.github.io/CyberShield/demo.html
```

## If QA Fails

1. Fix only defects that block the controlled demo
2. Avoid new scope unless it is required for demo credibility
3. Re-run the smoke test
4. Re-test the broken route
