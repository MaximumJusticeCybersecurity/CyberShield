# 20260602-2000 TrustMap Engine Runtime Switch Handoff

## Status

Live TrustMap tab switched to the new TrustMap Engine runtime host.

## Purpose

Stop the old stacked TrustMap renderer from flashing previous models and partially recovering assets only after Fit Map.

## Files added or updated

```text
src/ui/20260602-2000-trustmap-engine-runtime-host.js
src/ui/v52-7-operational-layer.js
docs/20260602-2000-trustmap-engine-runtime-switch-handoff.md
```

## Important runtime rule

The loader no longer imports the legacy TrustMap renderer chain:

```text
src/ui/v55-4-trustmap-registry-consumption.js
src/ui/v60-3-12-trustmap-png-asset-integration.js
src/ui/v60-3-13-stoplight-trust-color-and-png-path-recovery.js
```

The live TrustMap tab now calls:

```js
window.CyberShieldTrustMapEngineRuntimeHost202606022000.render()
```

which dynamically imports:

```text
src/trustmap-engine/trustmap-engine-loader.js
```

## Expected result

1. No old V30-ish or legacy TrustMap models should flash before render
2. The TrustMap tab should show the new engine shell
3. Kernel should appear
4. Seven Layer 1 domains should appear
5. Layer 1 domains should use square black-backed frames
6. The right inspector should update when nodes are clicked
7. Fit Map should not be required for initial visibility

## If assets still fail

Fix only the new TrustMap Engine modules:

```text
src/trustmap-engine/*
```

Do not re-enable the legacy TrustMap renderer chain.

## Hard rule

Do not let old and new TrustMap renderers run together.
