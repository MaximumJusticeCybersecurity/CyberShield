# 2026061118 Forward Build Roadmap

## Purpose

Capture the known forward build sequence so CyberShield can continue improving without drifting away from the vendor-risk Trust Decision Record proof.

## Current Foundation

Current buyer-facing proof:

```text
AI-generated vendor-risk recommendation in -> defensible AI Trust Decision Record out
```

Primary route:

```text
/vendor-risk.html
```

Core contract:

- Claims extracted: `10`
- Recommended Action: `Request Evidence`
- Risk If Wrong: `High`
- Confidence Band: `Low confidence`
- Human Review Required: `Yes`

## Build Sequence

### 2026061119-review-feedback-integration

Purpose:

Integrate external review feedback after the controlled review.

Acceptance criteria:

- Feedback is triaged into critical, important, later, and rejected.
- No unreviewed feedback directly changes the buyer-facing demo.
- Route doctrine remains vendor-risk first.

Stop condition:

Do not add new domains or TrustMap/dashboard features during feedback integration.

---

### 2026061120-executive-report-language-polish

Purpose:

Make the printed/browser-exported Trust Decision Record read like an executive artifact.

Acceptance criteria:

- Report has a clear decision summary.
- Report explains why the AI recommendation fails.
- Report lists evidence required before approval.
- Report makes human review requirement explicit.
- Limitations are clear and not buried.

Stop condition:

Do not claim server-side PDF, DOCX generation, digital signature workflow, or production archive.

---

### 2026061121-guided-route-mobile-polish

Purpose:

Improve the guided route on phones and narrow screens.

Acceptance criteria:

- Topbar buttons wrap cleanly.
- Six-step route is readable.
- Tables do not break the viewport.
- Side summary does not distract or crowd mobile flow.
- Print and capture buttons remain reachable.

Stop condition:

Do not redesign the product or add visual effects that slow the page.

---

### 2026061122-validator-visibility-upgrade

Purpose:

Make validators first-class in the guided route and executive report.

Validator questions:

- Is SOC 2 enough?
- Is encryption proof enough?
- Is framework mapping compliance proof?
- Is data-use language safe?
- Are subprocessors known?
- Is incident notification strong enough?
- Is human approval required?

Acceptance criteria:

Each validator shows:

- Pass / Fail / Needs Evidence
- Reason
- Evidence needed
- Impact on decision

Stop condition:

Do not create fake numeric trust scores.

---

### 2026061123-evidence-issue-taxonomy

Purpose:

Standardize evidence issue labels across UI, JSON, smoke tests, and report.

Taxonomy:

- Missing
- Weak
- Stale
- Self-attested
- Contradictory
- Scope mismatch
- Not independently verified
- Reviewer authority missing

Acceptance criteria:

- Guided route uses the taxonomy.
- Executive report uses the taxonomy.
- JSON record exposes the taxonomy.
- Contract checker validates key taxonomy coverage.

Stop condition:

Do not make taxonomy look like compliance certification.

---

### 2026061124-candidate-action-tournament-v1

Purpose:

Make candidate action comparison more rigorous and transparent.

Candidate actions:

- Approve
- Accept with Caveat
- Request Evidence
- Escalate for Review
- Reject
- Quarantine
- Out of Scope for Current Review

Vendor-risk expected winner:

```text
Request Evidence
```

Acceptance criteria:

- Shows why Approve loses.
- Shows why Accept with Caveat is premature.
- Shows why Escalate is required but not sufficient by itself.
- Shows why Request Evidence is strongest.

Stop condition:

Do not turn this into autonomous decisioning.

---

### 2026061125-report-capture-validation-hardening

Purpose:

Make capture status more transparent and auditable.

Acceptance criteria:

- Capture success, failure, and pending states are visibly distinct.
- Failed capture does not block report generation.
- Payload includes structured record JSON.
- Endpoint status is not overstated.
- Test route confirms endpoint behavior.

Stop condition:

Do not store secrets in front-end code.

---

### 2026061126-pilot-package-v1

Purpose:

Prepare a 3 to 5 recommendation pilot package.

Acceptance criteria:

- Pilot scope is one page.
- Inputs, outputs, buyer responsibilities, and limitations are clear.
- Includes vendor-risk recommendation examples.
- Includes pricing/engagement placeholders without overcommitting.

Stop condition:

Do not position as a full SaaS platform yet.

---

### 2026061127-demo-script-and-talk-track

Purpose:

Create a controlled 3 to 5 minute demo script.

Acceptance criteria:

- Opening line.
- What to click.
- What to say at each step.
- Expected aha moment.
- Close / CTA.
- Objection handling.

Stop condition:

Do not use hype or imply production features.

---

### 2026061128-reviewer-feedback-route-v2

Purpose:

Improve advisor/reviewer feedback capture.

Acceptance criteria:

- Reviewer can score clarity, usefulness, credibility, and pilot readiness.
- Reviewer can identify what would make them dismiss the product.
- Feedback can be copied/downloaded as JSON.
- No backend required unless endpoint is explicitly configured.

Stop condition:

Do not expose private reviewer details publicly.

---

## Later, Not Yet

Do not prioritize until vendor-risk proof is strong:

- Security recommendation guided route
- Compliance recommendation guided route
- TrustMap resurrection
- Runtime agents
- Generic governance screens
- Live LLM analyzer
- Upload processing
- Multi-tenant behavior
- Production authentication
- Server-side DOCX/PDF

## Immediate Recommendation

For the next build, choose:

```text
2026061120-executive-report-language-polish
```

Reason:

The record is the product. If the executive report feels credible, the demo has a real artifact to defend.
