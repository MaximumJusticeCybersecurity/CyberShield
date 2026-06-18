# 2026061141 Capture, Print, and Feedback QA

## Purpose

Add QA coverage and post-review triage tools after promoting `/vendor-risk-next.html` as the preferred demo route.

## Added Routes

```text
/capture-source-of-truth-smoke.html
/report-print-qa.html
/feedback-triage.html
```

## Capture Source of Truth Smoke

Route:

```text
/capture-source-of-truth-smoke.html
```

Checks:

- shared capture config Sheet ID
- endpoint mode visibility
- capture docs include configured Sheet ID
- architect placeholder Sheet ID is marked inactive unless migrated
- `/vendor-risk-next.html` imports shared capture config
- `/vendor-risk-next.html` does not hard-code the inactive Sheet ID
- stable fallback script no longer contains inactive Sheet ID

Known behavior:

The stable fallback script may fail the final check until a focused stable-route capture refactor is performed.  That failure is useful because it prevents silent source-of-truth drift.

## Report Print QA

Route:

```text
/report-print-qa.html
```

Checks whether the preferred route has:

- print report container
- print CSS
- AI Trust Decision Record naming
- Dr. Max Justice reviewer block
- limitations language

Manual check still required:

Use browser Print / Save PDF and confirm the artifact is readable.

## Feedback Triage

Route:

```text
/feedback-triage.html
```

Local-only triage buckets:

- Critical fix before next demo
- Important fix
- Later
- Rejected / out of scope
- Question to answer

No backend.  No confidential data.

## Internal QA Hub

Updated:

```text
/internal-qa.html
```

Now links the new capture, print, and feedback triage routes.

## Release Manifest

Updated:

```text
/release-manifest.json
```

New release label:

```text
2026061141-capture-print-feedback-qa
```

## Next Recommended Build

```text
2026061142-focused-stable-capture-refactor
```

Goal:

Clean old capture assumptions in the stable fallback route without broad rewriting or destabilizing it.
