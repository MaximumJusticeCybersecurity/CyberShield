# CyberShield Executive OS

## Current live build

Current build label: **20260602-1730 Layer 1 v2 Asset Integration and Great Map Doctrine Intake**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=20260602-1730-layer1-v2-assets&reset=onboarding

## Public naming rule

Public product name:

```text
CyberShield Executive OS
```

Current implemented build:

```text
20260602-1730 Layer 1 v2 Asset Integration and Great Map Doctrine Intake
```

Do not call the public build **CyberShield OS v8** unless the repo, README, loader, Settings/admin metadata, and public UX are intentionally changed to that version scheme.

## Versioning rule after V60.3.30

The V60.x style sequence ends with the V60.3 release train.  After V60.3.30, new implemented builds should use timestamp-based versioning:

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

No new top-level tabs were added for 20260602-1730.

## Current implemented build: 20260602-1730

This is an immediate in-between release between the current V60.3.30 release train and the future map-maker feedback pass.

It does two separate things without confusing them:

1. Integrates the new Layer 1 v2 asset set as the preferred TrustMap visual asset family
2. Preserves the larger CyberShield Great Map guidance as doctrine for the next design and architecture pass

This is not a full TrustMap redesign.  The immediate release is intentionally narrow.

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
```

## 20260602-1730 changes

- Adds `data/trustmap/v60-3-23-layer1-v2-assets.json`
- Adds `src/ui/v60-3-23-layer1-v2-asset-integration.js`
- Updates `src/ui/v60-3-14-trustmap-background-oval-highlight-spacing.js` to import the v2 integration layer after V60.3.20 visual consistency consolidation
- Adds `docs/20260602-1730-layer1-v2-assets-and-great-map-guidance.md`
- Keeps legacy Layer 1 images as fallback until the new binaries are uploaded
- Preserves fast shell load and TrustMap on-demand loading
- Preserves no-new-top-level-tabs rule

## Binary asset upload required

The code is ready, but the seven image binaries still need to be uploaded separately because the current GitHub connector can commit text/code but does not expose binary image upload.

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

The v2 integration tries these first and falls back to the existing legacy assets if any v2 file is missing.

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

The current public build is a static advisory prototype. It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, banking systems, payment systems, live evidence retrieval, live internet claim verification, live scoring, live claim extraction, statistical validation, backend persistence, workflow automation, notifications, or production agent enforcement systems.

## GitHub Pages browser QA required

```text
hard refresh live prototype
complete/reset onboarding
confirm initial app shell remains fast
open TrustMap
confirm no broken image icons appear if v2 binaries are not uploaded yet
upload v2 PNGs to assets/layer1-v2/
hard refresh again
confirm v2 assets load instead of legacy assets
confirm all seven Layer 1 assets have the same apparent size
confirm black-background cube treatment blends into the dark TrustMap environment
confirm no green spill or transparency artifact appears
confirm legacy fallback still works if a v2 file is missing
confirm TrustMap drag, zoom, view controls, hover, and click behavior still work
confirm no new top-level tab exists
confirm no prototype overclaims appear
```
