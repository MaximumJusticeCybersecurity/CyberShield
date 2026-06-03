# 20260602-1915 TrustMap Engine Scaffold Handoff

## Status

Scaffold created.  Not wired into the live runtime.

## Purpose

Create the future TrustMap Engine foundation beside the old TrustMap chain without changing the visible production TrustMap.

## Files added

```text
data/trustmap/engine/trustmap-engine-registry.json
src/trustmap-engine/trustmap-engine-loader.js
src/trustmap-engine/trustmap-engine-data.js
src/trustmap-engine/trustmap-engine-assets.js
src/trustmap-engine/trustmap-engine-layout.js
src/trustmap-engine/trustmap-engine-renderer.js
src/trustmap-engine/trustmap-engine-connectors.js
src/trustmap-engine/trustmap-engine-view-modes.js
src/trustmap-engine/trustmap-engine-interactions.js
src/trustmap-engine/trustmap-engine-inspector.js
src/trustmap-engine/trustmap-engine-lifecycle.js
src/trustmap-engine/trustmap-engine-qa.js
```

## Runtime wiring rule

Do not import the TrustMap Engine into `src/ui/v52-7-operational-layer.js` yet.

The scaffold exposes a preview API only if the module is imported manually in a future controlled package:

```js
window.CyberShieldTrustMapEngineScaffold.createPreview(target)
```

## What this scaffold includes

1. Extensible registry for Kernel, Layer 1 domains, assets, edges, future map modes, trust rails, and future overlays
2. Asset manager with primary and fallback candidates
3. Layout manager for left, center, and right panes
4. Renderer scaffold that can render a detached preview
5. Connector scaffold
6. View-mode scaffold
7. Interaction scaffold
8. Inspector scaffold
9. Lifecycle scaffold
10. QA scaffold

## What this scaffold does not do

1. Does not replace the live TrustMap
2. Does not remove old TrustMap modules
3. Does not touch onboarding
4. Does not add a top-level tab
5. Does not use render gates
6. Does not use global image source rewrites
7. Does not use after-the-fact visual patching

## Next package

Recommended next package:

```text
20260602-1930 TrustMap Engine Preview Renderer
```

Scope:

1. Add a safe internal preview host, likely in Architecture or Settings only if explicitly approved
2. Import the engine scaffold only in that preview path
3. Confirm it renders left panel, center map, and right inspector
4. Confirm Kernel and all seven Layer 1 assets appear
5. Confirm Layer 1 assets use consistent square black-backed treatment
6. Confirm Cloud, Devices, and CMMC are opaque
7. Confirm connector lines stay behind assets
8. Confirm view-mode buttons only change camera state
9. Do not replace live TrustMap yet

## Runtime switch package after preview

Only after preview QA passes should a later package replace the old chain with the new engine:

```text
20260602-2000 TrustMap Engine Runtime Switch
```

That package should stop importing the old stacked TrustMap modules and import only:

```js
import './trustmap-engine/trustmap-engine-loader.js';
```

## Hard rule

Do not let old and new renderers run together.
