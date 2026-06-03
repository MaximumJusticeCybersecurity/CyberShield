# 20260602-1900 TrustMap Engine Refactor Package

## Status

Engineering plan only.  No runtime TrustMap code is changed by this package.

## Decision

Stop patching the current TrustMap render chain.

The current TrustMap is unstable because multiple historical modules own the same surface.  The fix is not another shim, delayed reapply, source rewrite, render gate, or CSS override.  The fix is to replace the stacked historical render path with one governed TrustMap Engine.

## Problem statement

The TrustMap has suffered from repeated regressions:

1. Multiple previous Layer 1 renditions flash before the final version appears
2. Some Layer 1 assets render as circular objects while others render as black square or rectangle containers
3. Cloud & Infrastructure, Devices & Endpoints, and sometimes CMMC & Compliance appear transparent enough for connector lines to show through
4. The CyberShield Trust Kernel image sometimes disappears
5. Navigating away and returning to TrustMap can remove Layer 1 graphics or the Kernel
6. Fit Map, Kernel View, Domain View, and Object View can restore different visual states
7. The right inspector panel has previously overlapped the center map
8. Center-pane visibility has been broken by after-the-fact render gates and layout overrides

These are symptoms of shared ownership.  No single module owns the TrustMap lifecycle.

## Current active and historical modules touching TrustMap

### Runtime loader

```text
src/ui/v52-7-operational-layer.js
```

Loads the shell, deferred TrustMap stack, performance layers, governance layers, and architecture model library.  It should remain the only top-level loader for TrustMap runtime dependencies.

### Original render source

```text
src/ui/v55-4-trustmap-registry-consumption.js
```

Creates or consumes the original TrustMap world, domains, Kernel, panels, and interaction model.

### Asset injection

```text
src/ui/v60-3-12-trustmap-png-asset-integration.js
```

Injects PNG assets into the existing TrustMap.  This is one of the old owners of asset source and image placement.

### Stoplight and path recovery

```text
src/ui/v60-3-13-stoplight-trust-color-and-png-path-recovery.js
```

Applies stoplight colors and additional recovery logic.

### Connector chain loader

```text
src/ui/v60-3-14-trustmap-background-oval-highlight-spacing.js
```

Imports several later TrustMap layers and preserves connector trust-state behavior.

### Fiber connectors and pane grid

```text
src/ui/v60-3-16-trustmap-centerline-fiber-connectors-and-pane-grid.js
```

Owns fiber connector overlay and some pane/grid behavior.

### Kernel detail and risk rows

```text
src/ui/v60-3-16-1-trust-kernel-detail-and-stoplight-risk-rows.js
```

Owns Kernel right-panel detail behavior and stoplight risk row behavior.

### Visual recovery owner

```text
src/ui/v60-3-20-layer1-visual-consistency-stack-consolidation.js
```

Currently owns post-view-mode recovery.  It also owns too much visual style: asset size, shape, background, image fallback, Kernel visibility, and view-control reapply.  It has been the most useful active layer, but it should be replaced by a real renderer, not extended forever.

### Disabled or retired experiments

```text
src/ui/20260602-1735-layer1-v2-src-rewrite.js
src/ui/v60-3-23-layer1-v2-asset-integration.js
src/ui/20260602-1825-trustmap-single-render-authority.js
```

These files remain in the repo for audit history, but should not be reintroduced as active runtime layers.  They caused regressions because they fought the active renderer instead of owning the render path.

## Non-negotiable engineering rules

1. No new top-level tabs
2. Do not hide the TrustMap as a render strategy
3. Do not use global image `src` rewriting
4. Do not use after-the-fact visual override layers
5. Do not let multiple files own Layer 1 asset rendering
6. Do not let multiple files own Kernel rendering
7. Do not let multiple files own center-pane layout
8. Do not let Fit Map, Kernel View, Domain View, and Object View restore different visual systems
9. Preserve the left Operational Trust Score panel
10. Preserve the center TrustMap pane
11. Preserve the right selected asset trust score/detail panel
12. Preserve shell-first performance
13. Preserve TrustMap on-demand loading
14. Preserve the static prototype boundary

## Target subsystem

Create one governed subsystem:

```text
TrustMap Engine
```

The TrustMap Engine owns:

1. Data registry
2. Asset registry
3. Layout contract
4. Renderer
5. View-mode controller
6. Interaction controller
7. Inspector controller
8. Connector controller
9. Lifecycle controller
10. QA instrumentation

## Proposed file structure

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

This can be adjusted to match the existing repo style, but the ownership boundaries should not change.

## Data registry

The data registry describes the map objects and relationships.  It does not render UI.

### Required object fields

```json
{
  "id": "cloud",
  "label": "Cloud & Infrastructure",
  "type": "layer1-domain",
  "assetId": "cloud-v2",
  "trustState": "needs-verification",
  "score": 68,
  "confidence": "medium",
  "owner": "CIO / CTO",
  "evidenceStatus": "partial",
  "riskIfWrong": "Cloud control assumptions could be accepted without fresh evidence.",
  "availableAction": "Open evidence requirements",
  "route": "evidence:cloud"
}
```

### Required object types

1. Kernel
2. Layer 1 domain
3. Layer 2 object
4. Layer 3 object
5. Evidence source
6. Model
7. Score
8. Recommendation
9. Decision
10. Proof Pack item

## Asset registry

The asset registry owns image paths, fallback paths, display treatment, and optimization status.

### Required asset fields

```json
{
  "id": "cloud-v2",
  "label": "Cloud & Infrastructure v2",
  "primary": "assets/Cloud_infrastructure_v2.png",
  "fallbacks": [
    "assets/cloud_infrastructure.png",
    "assets/trustmap/v60-3-12/cloud-infrastructure.png"
  ],
  "background": "black",
  "shape": "square",
  "objectFit": "cover",
  "displayWidth": 168,
  "displayHeight": 168,
  "optimized": false,
  "futureWebp": "assets/trustmap/engine/cloud-infrastructure.webp"
}
```

### Asset rules

1. All Layer 1 assets use the same black square frame
2. The frame is opaque
3. Connector lines must not show through the asset frame
4. The image itself may be transparent internally only if the black frame blocks the map behind it
5. All Layer 1 assets use the same apparent size
6. The Kernel has its own Kernel asset treatment
7. Asset paths are set by the asset manager, not by global source rewriting
8. Fit Map and other view controls do not change asset styling

## Layout contract

The layout manager owns the three-pane contract.

### Desktop layout

```text
left panel | center TrustMap | right inspector
```

### Mobile layout

```text
executive summary
TrustMap viewport
selected asset inspector
controls
```

### Layout requirements

1. Center pane must always exist when TrustMap tab is active
2. Center pane must not be hidden as a loading strategy
3. Right inspector must not overlap the center map unless explicitly opened as a drawer
4. The map viewport must respect available screen width
5. The map viewport must have predictable min and max heights
6. View controls must remain visible and functional
7. Pane alignment should be stable before and after view-mode changes

## Renderer

The renderer is the only module allowed to create or update:

1. Kernel DOM
2. Layer 1 asset DOM
3. Layer 2 object DOM
4. Layer 3 object DOM
5. Connector DOM
6. Center map viewport content

### Renderer rules

1. Render once from the registry
2. Update from state, not from DOM guessing
3. Do not depend on delayed post-render correction
4. Do not rewrite sources globally
5. Do not use CSS-only overrides to correct structural render decisions
6. Re-render idempotently after navigation return
7. Re-render idempotently after Fit Map, Kernel View, Domain View, and Object View
8. Keep current visual state in one state object

### Required renderer state

```js
{
  activeMode: 'domain',
  selectedObjectId: 'kernel',
  zoom: 1,
  pan: { x: 0, y: 0 },
  assetsLoaded: true,
  lastRenderReason: 'trustmap-tab-return'
}
```

## View-mode controller

The view-mode controller owns:

1. Fit Map
2. Kernel View
3. Domain View
4. Object View
5. Zoom in
6. Zoom out
7. Pan reset

### View-mode requirements

1. View controls must only change camera/state
2. View controls must not change image source
3. View controls must not change image shape
4. View controls must not remove the Kernel
5. View controls must not remove Layer 1 assets
6. View controls must trigger renderer update through state

## Interaction controller

The interaction controller owns object clicks and routes.

### Click behavior

1. Kernel click opens Kernel detail in the right inspector, not an accidental navigation unless explicitly designed
2. Layer 1 click selects the domain and updates right inspector
3. Double action or route buttons may navigate to Runtime, Evidence, or Proof Pack
4. Normal clicks must not remove images
5. Returning to TrustMap must restore the same selected state

## Inspector controller

The inspector owns the right selected asset panel.

### Required inspector fields

1. Selected object label
2. Type
3. Trust score
4. Trust state
5. Confidence
6. Evidence status
7. Risk if wrong
8. Available action
9. Trace link
10. Proof Pack link

## Connector controller

The connector controller owns fiber lines.

### Connector rules

1. Connectors render behind assets
2. Assets use opaque black frames so lines do not show through
3. Connector state is neutral by default
4. Selected paths may use stoplight colors
5. Connector rendering does not own asset rendering

## Lifecycle controller

The lifecycle controller owns events:

1. `trustmap:init`
2. `trustmap:registry-loaded`
3. `trustmap:assets-loaded`
4. `trustmap:render-started`
5. `trustmap:render-complete`
6. `trustmap:view-mode-changed`
7. `trustmap:object-selected`
8. `trustmap:tab-return`

Lifecycle must be observable, but it must not hide the center pane as a render strategy.

## Migration strategy

### Phase 0: Freeze patching

Do not add new TrustMap patches.  Do not re-enable disabled TrustMap experiments.

### Phase 1: Create engine files without wiring runtime

Add the TrustMap Engine files beside the existing chain.  Do not import them yet.

### Phase 2: Build registry and renderer in isolation

Create a standalone test hook or dev-only function that can render the TrustMap into a detached container or alternate internal target.

### Phase 3: Parity render

The new engine must produce:

1. Three-pane layout
2. Kernel visible
3. Seven Layer 1 domains visible
4. Consistent black square Layer 1 treatment
5. Connectors behind assets
6. Right inspector updates on selection
7. Fit Map, Kernel View, Domain View, Object View functional

### Phase 4: Runtime switch behind one import

Replace the old chain with one import:

```js
import './trustmap-engine/trustmap-engine-loader.js';
```

Do not keep the old stack active at the same time.

### Phase 5: Retire old runtime imports

Remove or stop importing:

1. `v55-4-trustmap-registry-consumption.js`
2. `v60-3-12-trustmap-png-asset-integration.js`
3. `v60-3-13-stoplight-trust-color-and-png-path-recovery.js`
4. `v60-3-14-trustmap-background-oval-highlight-spacing.js`
5. `v60-3-16-trustmap-centerline-fiber-connectors-and-pane-grid.js`
6. `v60-3-16-1-trust-kernel-detail-and-stoplight-risk-rows.js`
7. `v60-3-20-layer1-visual-consistency-stack-consolidation.js`

Retire only after browser QA passes.

### Phase 6: Archive old chain

Keep old files for audit history, but mark them non-runtime in docs.

## Acceptance criteria

### Required visual results

1. TrustMap center pane always appears on TrustMap tab
2. CyberShield Trust Kernel always appears
3. Seven Layer 1 assets always appear
4. All Layer 1 assets render in the same square black-backed style
5. Cloud & Infrastructure is opaque, sharp, and does not show fiber lines through it
6. Devices & Endpoints is opaque, sharp, and does not show fiber lines through it
7. CMMC & Compliance is opaque, sharp, and does not show fiber lines through it
8. No circular/square mismatch appears
9. No old rendition flashes before the current one
10. Labels do not overlap assets

### Required interaction results

1. Fit Map works without changing asset style
2. Kernel View works without removing assets
3. Domain View works without changing asset style
4. Object View works without changing asset style
5. Kernel click updates inspector or follows a designed route
6. Layer 1 click updates inspector
7. Leaving TrustMap and returning restores the same rendered map
8. No images disappear after navigation return

### Required layout results

1. Left Operational Trust Score panel remains visible
2. Center TrustMap pane remains visible
3. Right selected asset panel remains visible
4. Right panel does not overlap the map
5. Map fits within reasonable viewport constraints
6. Mobile layout stacks cleanly

### Required performance results

1. App shell remains fast
2. TrustMap loads on demand
3. Assets can prewarm after shell readiness
4. No repeated visible multi-pass rendering
5. No long render gate that hides the map

## QA checklist

1. Hard refresh with reset onboarding
2. Complete onboarding
3. Open TrustMap
4. Confirm three panes are visible
5. Confirm Kernel is visible
6. Confirm all seven Layer 1 assets are visible
7. Confirm all seven Layer 1 assets use the same square black-backed treatment
8. Confirm Cloud, Devices, and CMMC are opaque
9. Confirm connectors stay behind assets
10. Click Fit Map
11. Click Kernel View
12. Click Domain View
13. Click Object View
14. Click each Layer 1 asset
15. Click Kernel
16. Navigate to Runtime and back to TrustMap
17. Navigate to Evidence and back to TrustMap
18. Navigate to Architecture and back to TrustMap
19. Confirm no images disappear
20. Confirm no circular/rectangle mismatch returns
21. Confirm no center pane disappearance
22. Confirm no new top-level tab
23. Confirm prototype boundary remains accurate

## Explicit anti-patterns to avoid

1. Do not add another delayed `setTimeout` recovery layer
2. Do not override `HTMLImageElement.prototype.src`
3. Do not hide the map until the render is ready
4. Do not create another CSS layer that fights older CSS
5. Do not let old and new renderers run together
6. Do not use global mutation observers as the primary rendering strategy
7. Do not change asset styles from view-mode handlers
8. Do not navigate away from TrustMap on normal object selection unless the route is explicit

## Recommended next implementation package

```text
20260602-1915 TrustMap Engine Scaffold
```

Scope:

1. Add empty engine files
2. Add registry schema
3. Add no-runtime QA hooks
4. Do not wire the engine into production runtime yet
5. Do not remove old chain yet

Only after the scaffold exists should the builder implement the new renderer.

## Final doctrine

CyberShield is the map.  TrustMap is the visual surface.  The TrustMap Engine must make trust readable, navigable, inspectable, and stable.

A better TrustMap is not one with more patches.  A better TrustMap is one where the executive can trust what is on the screen because the system has one render truth.
