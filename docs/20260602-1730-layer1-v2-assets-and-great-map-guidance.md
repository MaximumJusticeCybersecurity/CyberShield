# 20260602-1730 Layer 1 v2 Assets and Great Map Guidance

## Build label

20260602-1730 Layer 1 v2 Asset Integration and Great Map Doctrine Intake

## Purpose

This is an immediate in-between release plan between the current V60.3.30 release train and the future map-maker feedback pass.  It does two separate things without confusing them:

1. Integrates the new Layer 1 v2 asset set as the preferred TrustMap visual asset family
2. Preserves the larger CyberShield Great Map guidance as doctrine for the next design and architecture pass

This is not a full TrustMap redesign.  The immediate release is intentionally narrow.

## Immediate engineering plan

### Objective

Use the new v2 Layer 1 image renditions as the preferred TrustMap Layer 1 assets while preserving V60.3.21 through V60.3.30 performance and governance gains.

### Scope

1. Add a formal asset manifest for the v2 Layer 1 set
2. Add a Layer 1 v2 asset integration module
3. Prefer the v2 images first when the TrustMap is active
4. Keep legacy Layer 1 images as fallback so the live site does not break before binary assets are uploaded
5. Preserve shell-load speed and TrustMap on-demand loading
6. Preserve the existing left score panel, center TrustMap, right detail panel, Layer 2, Layer 3, and Trust Kernel behavior
7. Do not add a new top-level tab
8. Do not redesign CyberShield from scratch

### Code changes in this release

1. `data/trustmap/v60-3-23-layer1-v2-assets.json`
   - New manifest documenting the canonical v2 Layer 1 asset folder and filenames

2. `src/ui/v60-3-23-layer1-v2-asset-integration.js`
   - New runtime layer that tries the v2 files first and falls back to legacy assets
   - Applies consistent sizing and black-background treatment expectations
   - Runs only when the TrustMap is active or after the TrustMap stack is loaded

3. `src/ui/v60-3-14-trustmap-background-oval-highlight-spacing.js`
   - Updated to import the v2 integration after V60.3.20 visual consistency consolidation

## Binary asset upload requirement

The GitHub connector can write text and code files, but does not expose a binary image-upload action.  The seven PNGs must be added separately by GitHub web upload, GitHub Desktop, or normal git push.

### Required folder

```text
assets/layer1-v2/
```

### Canonical filenames

```text
AI_Systems_Agents_v2.png
Applications_Data_v2.png
Cloud_Infrastructure_v2.png
CMMC_and_Compliance_v2.png
Devices_End_Points_v2.png
Identities_Access_v2.png
Third_Parties_and_Vendors_v2.png
```

### Observed properties from uploaded draft assets

```text
Canvas: 1254 x 1254
Approximate file size range: 2.37 MB to 2.69 MB each
Visual style: consistent black-background blue/white cube system
```

## Performance note

The new assets are better visually, but still large for mobile if loaded as full PNGs.  If image loading remains slow, the next fix should be asset optimization, not more JavaScript.

Recommended next asset step:

```text
Create web-ready WebP or AVIF versions at a smaller display-appropriate size, then update the manifest to prefer optimized formats once those files exist.
```

## QA checklist for the immediate release

1. Hard refresh the live prototype
2. Open the app shell and confirm it remains fast
3. Open TrustMap
4. Confirm no broken image icons appear if v2 binaries have not yet been uploaded
5. Upload the seven v2 PNG files to `assets/layer1-v2/`
6. Hard refresh again
7. Confirm v2 assets load instead of legacy assets
8. Confirm all seven Layer 1 assets appear visually consistent
9. Confirm all assets use the same apparent size
10. Confirm the black-background cube system blends into the dark TrustMap environment
11. Confirm no green background, green spill, square-edge mismatch, or transparency artifact appears
12. Confirm old assets remain a safe fallback if a v2 file is missing
13. Confirm the app shell does not slow down
14. Confirm TrustMap drag, zoom, view controls, and click/hover behavior still work
15. Confirm no new top-level tab exists

## Great Map doctrine intake

CyberShield should evolve from a platform that contains a TrustMap into a platform that behaves like a map.

The TrustMap is the visible expression, but the whole system should teach the executive how to read risk, trust, evidence, confidence, consequence, and action.  Every screen, score, control, proof pack, model trace, and recommendation should contribute to one larger navigational system.

The governing metaphor is:

```text
Minard + John Snow + Harry Beck
```

### Minard layer

Show consequence over time, movement, loss, narrowing trust, changing conditions, and the cost of bad decisions.

CyberShield should eventually show trust as something that moves, narrows, widens, degrades, recovers, or collapses.

Key executive question:

```text
Where did trust weaken, why did it weaken, and what did it cost us?
```

### John Snow layer

Reveal causal concentration, contamination points, root causes, and the Broad Street pump behind repeated risk.

CyberShield should not merely show many risks.  It should identify the source creating the risks.

Key executive question:

```text
What single source is creating the most downstream trust damage?
```

### Harry Beck layer

Simplify complexity into a navigable executive schematic, even when the underlying architecture is messy.

CyberShield should not show every asset, control, model, vendor, user, and evidence object at once.  It should show the route the executive needs to understand and act on.

Key executive question:

```text
How does trust move through this system, and where do I need to intervene?
```

## Proposed trust rails

1. Identity Rail
2. Data Rail
3. Evidence Rail
4. Model Rail
5. Vendor Rail
6. Control Rail
7. Decision Rail
8. Proof Rail
9. Human Accountability Rail

## Proposed map grammar

| Visual element | Meaning |
|---|---|
| Node | Trust object such as asset, user, model, vendor, evidence source, control, claim, recommendation, or decision |
| Edge | Trust relationship, dependency, evidence link, control path, or decision path |
| Thickness | Trust strength, evidence strength, risk magnitude, or operational dependency |
| Color | Trust state, risk state, confidence state, or required action |
| Pulse | Something changed recently |
| Broken line | Missing evidence, incomplete trace, or uncertain dependency |
| Narrowing path | Trust degradation |
| Widening path | Trust recovery |
| Hotspot | Risk concentration or causal source |
| Lock icon | Human verification complete or control enforced |
| Warning icon | Human decision required |
| Clock icon | Evidence freshness issue or time-sensitive decision |
| Gavel/checkpoint icon | Governance decision or executive approval point |

Avoid visual decoration that does not carry operational meaning.

## Future candidate backlog

These are candidate improvements, not immediate requirements.

1. TrustMap Legend
2. Trust Route View
3. Root Cause Cluster View
4. Trust Degradation Timeline
5. Executive 9-Second Briefing
6. Map Mode Selector
7. Universal Trace Drawer
8. Blast Radius Overlay
9. Human Decision Checkpoints
10. Proof Pack Trail

## Immediate release boundary

This release does not implement the full Great Map concept.  It only preserves the doctrine, integrates the improved Layer 1 v2 asset path, and keeps the current CyberShield architecture safe.

The deeper Great Map work should wait for the map-maker feedback and should be treated as a separate design/build pass.
