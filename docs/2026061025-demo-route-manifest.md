# 2026061025 Demo Route Manifest

## Purpose

Make CyberShield's current route architecture explicit so future builders do not accidentally drift back to TrustMap-first, dashboard-first, runtime-agent-first, or broad-platform behavior before the vendor-risk Trust Decision Record workflow is complete.

Machine-readable manifest:

```text
route-manifest.json
```

## Product Direction

```text
AI-generated recommendation in -> defensible Trust Decision Record out.
```

## Primary Wedge

```text
Vendor risk.
```

## Doctrine

- AI confidence is not evidence.
- The record is the product.
- The workbench exists to produce the record.
- Vendor risk is the first wedge.
- Do not drift back to dashboard-first, TrustMap-first, runtime-agent-first, broad governance, generic trust-score, or autonomous-agent positioning until the record workflow works.

## Route Map

### `/`

File:

```text
index.html
```

Role:

```text
Public landing route.
```

Expected behavior:

- Direct users to the guided vendor-risk demo first.
- Redirect to `/vendor-risk.html` after 12 seconds.
- Keep the guided route as the primary CTA.

Must not:

- Restore TrustMap as root.
- Hide the guided vendor-risk route.

---

### `/vendor-risk.html`

File:

```text
vendor-risk.html
```

Role:

```text
Primary guided demo route.
```

Expected behavior:

- Six-step guided vendor-risk trust decision loop.
- Record generation.
- Browser Print / Save PDF.
- JSON download.
- Simulated CRM payload prep unless endpoint is configured.

Expected contract:

- Claims extracted: `10`
- Recommended Action: `Request Evidence`
- Risk If Wrong: `High`
- Confidence Band: `Low confidence`
- Human Review Required: `Yes`

---

### `/vendor-risk-smoke.html`

File:

```text
vendor-risk-smoke.html
```

Role:

```text
Guided route QA smoke test.
```

Expected behavior:

- Show `GO` when the guided vendor-risk record contract passes.

---

### `/demo-operator-checklist.html`

File:

```text
demo-operator-checklist.html
```

Role:

```text
Operator checklist.
```

Expected behavior:

- Provide one checklist for controlled demo validation.
- Preserve stop conditions.
- Link to QA defect log.

---

### `/qa-defect-log.html`

File:

```text
qa-defect-log.html
```

Role:

```text
Local-only QA defect logger.
```

Expected behavior:

- Capture route, device, severity, browser/OS, expected behavior, actual behavior, and notes.
- Store defects locally in the browser.
- Allow copy/download JSON.
- Do not claim backend submission.

---

### `/atdr.html`

File:

```text
atdr.html
```

Role:

```text
Deep workbench.
```

Expected behavior:

- Provide deeper ATDR workbench inspection.
- Remain secondary to the guided vendor-risk route.

---

### `/demo-readiness.html`

File:

```text
demo-readiness.html
```

Role:

```text
ATDR workbench smoke readiness route.
```

Expected behavior:

- Support smoke-readiness review for the existing ATDR workbench.

---

### `/advisor-feedback.html`

File:

```text
advisor-feedback.html
```

Role:

```text
Advisor feedback route.
```

Expected behavior:

- Support advisor-feedback workflow without distracting from the vendor-risk demo.

---

### `/trust-kernel-legacy.html`

File:

```text
trust-kernel-legacy.html
```

Role:

```text
Legacy Trust Kernel / TrustMap route.
```

Expected behavior:

- Preserve prior Executive OS / Trust Kernel experience.
- Do not delete.
- Do not restore as root.

## Non-Goals Until Vendor-Risk Loop Works

Do not prioritize:

- TrustMap-first rebuild
- Runtime-agent positioning
- Dashboard-first experience
- Generic trust score
- Autonomous agent workflow
- Production persistence
- Production authentication
- Tenant isolation
- Live LLM analyzer
- Server-side DOCX/PDF generation
- Live Google Sheet write without configured endpoint

## Static Prototype Limitations

- No production persistence.
- No production authentication.
- No tenant isolation.
- No malware scanning.
- No live LLM-backed analyzer.
- No server-side DOCX/PDF generation.
- Browser Print / Save PDF is current PDF path.
- CRM capture is simulated until `REPORT_CAPTURE_ENDPOINT` is configured.

## Next Recommended Build

`2026061026-route-manifest-checker`

Recommended focus:

- Add a simple route manifest viewer/checker page.
- Do not add features.
- Use it to validate the current route map and expected product direction.
