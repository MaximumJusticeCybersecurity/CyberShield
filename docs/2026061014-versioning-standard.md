# 2026061014 CyberShield Versioning Standard

## Purpose

CyberShield version identifiers must use timestamp-based versioning instead of older control-plane numbering.

## Required Format

Use:

```text
YYYYMMDDHH
```

Where:

- `YYYY` = four-digit year
- `MM` = two-digit month
- `DD` = two-digit day
- `HH` = two-digit hour using 24-hour time

## Example

```text
2026061014
```

This means:

```text
June 10, 2026 at 14:00 local project time
```

## Rule

All new CyberShield version references, release notes, handoffs, build plans, docs, route manifests, and successor-builder instructions should use the `YYYYMMDDHH` format unless Dr. Max Justice explicitly says otherwise.

## Avoid

Do not use future version labels as the primary version source:

```text
V20
V21
Control Plane V60
V55.2
```

These may be used informally as milestone names, but the source-of-truth version identifier should be timestamp-based.

## Recommended Naming Pattern

Use timestamp first, then a short descriptive slug:

```text
docs/2026061014-successor-builder-handoff-decision-assurance.md
docs/2026061014-custom-input-safety-plan.md
docs/2026061014-demo-readiness-release-note.md
```

## Current Transition Note

This repository contains earlier milestone names such as V12 through V20 because they were created during the Decision Assurance sprint. Do not rename all historical files unless doing so as a deliberate migration. Going forward, new files should use timestamp-first versioning.

## Builder Instruction

Before creating new files, generate the current project timestamp in `YYYYMMDDHH` format and use it as the leading version identifier.
