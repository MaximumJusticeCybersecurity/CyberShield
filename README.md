# CyberShield Executive OS

## Current live build

Current build label: **20260603-0648 Source-of-Truth Drift Guard**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=20260603-0648-source-of-truth-drift-guard&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current implemented build:

```text
20260603-0648 Source-of-Truth Drift Guard
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## Versioning rule after V60.3.30

The V60.x style sequence ends with the V60.3 release train.  After V60.3.30, new implemented builds use timestamp-based versioning:

```text
YYYYMMDD-HHMM
```

Use 24-hour **America/New_York** time unless the user explicitly changes the project timezone.

V60.3.31 remains an earmarked concept only for **Integrating the World's Best Map Maker**.  Do not implement it under the V60.x numbering scheme unless explicitly directed.

Canonical schema document:

```text
docs/versioning-schema.md
```

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for 20260603-0648.

## Current implemented build: 20260603-0648

This build adds an admin/runtime source-of-truth drift guard.  It helps future builders detect when runtime/admin metadata, timestamp versioning, Layer 1 v2 lineage, and release-train metadata begin to disagree.

It preserves the Layer 1 v2 source rewrite work and timestamp governance alignment already active in the runtime loader.

This is not a TrustMap redesign.  This is a source-of-truth protection release.

## Current TrustMap visual, performance, governance, and asset stack

```text
V60.3.12 = PNG asset mapping and interaction recovery
V60.3.13 = stoplight trust color and PNG path recovery
V60.3.14 = connector trust-state preservation and chain loader
V60.3.16 = centerline fiber connector overlay and three-pane separation
V60.3.16.1 = Trust Kernel right-panel detail and stoplight-only risk rows
V60.3.17 = Briefing TrustMap Snapshot image
V60.3.20 = consolidated Layer 1 visual consistency and view-mode recovery
V60.3.21 = mobile load performance gate, TrustMap lazy-load trigger, mobile animation/filter reduction
V60.3.22 = TrustMap PNG image prewarm after shell readiness
V60.3.23 = TrustMap asset manifest and governed future asset intake
V60.3.24 = TrustMap render lifecycle controller
V60.3.25 = asset optimization and format upgrade path, scaffold built, optimized assets pending
V60.3.26 = mobile TrustMap fidelity mode
V60.3.27 = no-dead-click and interaction meaning audit
V60.3.28 = model trace and evidence trust alignment scaffold
V60.3.29 = commercial Artifact Trust scenario scaffold
V60.3.30 = release hardening and source-of-truth reconciliation
20260602-1730 = Layer 1 v2 asset integration and Great Map doctrine intake
20260602-1735 = Layer 1 v2 source rewrite shim
20260603-0638 = timestamp governance runtime alignment
20260603-0648 = source-of-truth drift guard
```

## 20260603-0648 changes

- Adds `src/ui/20260603-0648-source-of-truth-drift-guard.js`
- Updates `src/ui/v52-7-operational-layer.js` to import the drift guard
- Adds admin payload metadata under `source_of_truth_drift_guard`
- Flags whether timestamp schema, current build metadata, prior runtime alignment, Layer 1 v2 rewrite metadata, and release-train metadata are observed
- Preserves `20260602-1735-layer1-v2-src-rewrite.js`
- Preserves fast shell load and TrustMap on-demand loading
- Preserves no-new-top-level-tabs rule

## Binary asset upload still required for full v2 visual value

The code path for v2 Layer 1 assets exists, but visual quality depends on the actual optimized image files being present and correctly sized.

Upload the new PNGs to:

```text
assets/layer1-v2/
```

Canonical filenames:

```text
AI_Systems_Agents_v2.png
Applications_Data_v2.png
Cloud_Infrastructure_v2.png
CMMC_and_Compliance_v2.png
Devices_End_Points_v2.png
Identities_Access_v2.png
Third_Parties_and_Vendors_v2.png
```

## Great Map doctrine

CyberShield should evolve from a platform that contains a TrustMap into a platform that behaves like a map.

The guiding metaphor is:

```text
Minard + John Snow + Harry Beck
```

- Minard: show consequence over time, movement, loss, narrowing trust, changing conditions, and the cost of bad decisions
- John Snow: reveal causal concentration, contamination points, root causes, and the Broad Street pump behind repeated risk
- Harry Beck: simplify complexity into a navigable executive schematic, even when the underlying architecture is messy

This doctrine is documented in:

```text
docs/20260602-1730-layer1-v2-assets-and-great-map-guidance.md
```

## Performance doctrine

```text
Load the executive shell first.
Do not force mobile users to pay the full TrustMap cost during startup.
Warm TrustMap images after the shell is usable.
Load the full interactive TrustMap only when requested.
Prioritize TrustMap images when TrustMap is explicitly opened.
Prefer asset optimization over more runtime patches when images remain slow.
```

## Non-negotiable TrustMap scope rule

```text
Do not replace the TrustMap page unless explicitly directed as a refactor.
Do not remove the left Operational Trust Score panel.
Do not remove the right-side selected asset score/detail area.
Do not remove Layer 2 or Layer 3.
Do not replace the radar / constellation environment.
Do not create a second movement system.
Trust-state colors are stoplight green, yellow, red only.
Do not make the Briefing snapshot replace the full TrustMap page.
```

## Boundary

The current public build is a static advisory prototype. It is not connected to production telemetry, production workflow automation, backend persistence, validated scoring, certification authority, or production enforcement.

## GitHub Pages browser QA required

```text
hard refresh live prototype
complete/reset onboarding
confirm initial app shell remains fast
open TrustMap
confirm source_of_truth_drift_guard appears in admin payload
confirm drift guard status is aligned or explains watch blockers
confirm no broken image icons appear if v2 binaries are not uploaded yet
upload v2 PNGs to assets/layer1-v2/ when available
hard refresh again
confirm v2 assets load instead of legacy assets
confirm TrustMap drag, zoom, view controls, hover, and click behavior still work
confirm no new top-level tab exists
confirm no prototype overclaims appear
```
