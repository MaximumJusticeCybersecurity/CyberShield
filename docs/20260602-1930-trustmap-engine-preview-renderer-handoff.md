# 20260602-1930 TrustMap Engine Preview Renderer Handoff

## Status

Preview host wired into Architecture.  Live TrustMap is not replaced.

## Purpose

Provide a safe Architecture-hosted preview surface for the new TrustMap Engine so it can be tested without touching the unstable legacy TrustMap runtime.

## Files added or updated

```text
src/ui/20260602-1930-trustmap-engine-preview-host.js
src/ui/v52-7-operational-layer.js
```

The preview host dynamically imports:

```text
src/trustmap-engine/trustmap-engine-loader.js
```

only when the user clicks **Render Engine Preview** inside Architecture.

## Where to test

1. Hard refresh the app
2. Complete or reset onboarding
3. Open Architecture
4. Find **TrustMap Engine Preview Renderer**
5. Click **Render Engine Preview**

## Expected preview results

1. Preview renders inside Architecture only
2. Live TrustMap tab is not replaced
3. Left Operational Trust panel appears in preview
4. Center preview TrustMap appears
5. Right selected asset inspector appears
6. Kernel image appears
7. Seven Layer 1 assets appear
8. Layer 1 assets use black square frames
9. Cloud, Devices, and CMMC are opaque enough that connector lines do not show through
10. Connectors render behind assets
11. Clicking a node updates the preview inspector
12. QA status reports pass or lists specific findings

## Explicit non-goals

1. Do not replace the live TrustMap tab in this package
2. Do not remove legacy TrustMap modules in this package
3. Do not re-enable the single-render gate
4. Do not re-enable global v2 source rewriting
5. Do not add a new top-level tab
6. Do not claim live scoring, live evidence retrieval, or production enforcement

## Next package if preview passes

```text
20260602-2000 TrustMap Engine Runtime Switch
```

That package should stop importing the legacy stacked TrustMap chain and wire the new engine into the TrustMap tab as the only renderer.

## Next package if preview fails

```text
20260602-1945 TrustMap Engine Preview Defect Fix
```

Fix only the new engine preview modules, not the legacy live TrustMap chain.

## Hard rule

Do not let old and new renderers run together.
