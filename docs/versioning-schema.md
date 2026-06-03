# CyberShield Versioning Schema

Date established: 2026-06-02

## Purpose

CyberShield is moving away from the internal V60.x style sequence after the current V60.3 release train.  Future builds should use a timestamp-based version number so version identity is unique, chronological, and easy to trace without semantic-version confusion.

## Current rule

The current V60.3 release train remains valid through:

```text
V60.3.30 Release Hardening and Source-of-Truth Reconciliation
```

V60.3.31 remains earmarked only as:

```text
Integrating the World's Best Map Maker
```

Do not implement V60.3.31 until the user provides the mapmaker source material and design intent.

## New versioning rule after V60.3.30

All new implemented builds after V60.3.30 should use this format:

```text
YYYYMMDD-HHMM
```

Where:

```text
YYYY = four-digit year
MM = two-digit month
DD = two-digit day
HHMM = local 24-hour time of build start or release commit, using America/New_York unless the user explicitly changes timezone
```

Example:

```text
20260602-2145
```

This means a build started or released on June 2, 2026 at 9:45 PM Eastern.

## Display name format

Recommended full display format:

```text
YYYYMMDD-HHMM Short Build Name
```

Example:

```text
20260602-2145 TrustMap Mapmaker Doctrine Intake
```

## Rules

1. Use local America/New_York time unless the user explicitly changes the project timezone.
2. Use 24-hour time to avoid AM/PM ambiguity.
3. Do not use the old V60.x style for new implemented builds after V60.3.30 unless explicitly directed.
4. Keep V60.3.31 as an earmarked concept only, not the next implemented code version.
5. The next implemented code release after V60.3.30 should be timestamp-based.
6. Update `README.md`, `bots.txt`, `governance-summary.json`, `docs/builder-version-log.md`, and `docs/successor-builder-handoff-and-job-docket.md` whenever a timestamped build becomes current.
7. For docs that discuss historical lineage, keep historical V60.x labels intact.

## Why this matters

Timestamp versions make it obvious when a build occurred and avoid ambiguity between experimental patch numbers, release names, and product-facing labels.

## Important boundary

The public product name remains:

```text
CyberShield Executive OS
```

The version number is an internal build identity, not the product name.
