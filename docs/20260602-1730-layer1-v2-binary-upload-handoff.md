# 20260602-1730 Layer 1 v2 Binary Upload Handoff

## Current blocker

The code and documentation for the Layer 1 v2 asset release are committed.  The remaining blocker is binary image upload.

The current connector can update text/code files but does not provide a binary PNG upload action.  The seven v2 PNG files must be uploaded through GitHub web upload, GitHub Desktop, or a normal local git commit and push.

## Upload target

```text
assets/layer1-v2/
```

If the folder does not exist, create it.

## Required filenames

Use these exact filenames:

```text
AI_Systems_Agents_v2.png
Applications_Data_v2.png
Cloud_Infrastructure_v2.png
CMMC_and_Compliance_v2.png
Devices_End_Points_v2.png
Identities_Access_v2.png
Third_Parties_and_Vendors_v2.png
```

## Source files from current chat

The uploaded image files in the working environment were named:

```text
/mnt/data/AI_Systems_Agents_v2.png
/mnt/data/Applications_Data_v2.png
/mnt/data/Cloud_infrastructure_v2.png
/mnt/data/Cmmc_and_Compliance v2.png
/mnt/data/Devices_end_Points v2.png
/mnt/data/Identities_access_v2.png
/mnt/data/Third_Parties_and_Vendors v2.png
```

Rename them to the canonical filenames above before uploading.

## Expected behavior after upload

The integration module `src/ui/v60-3-23-layer1-v2-asset-integration.js` tries v2 assets first and falls back to legacy assets if a v2 file is missing.

Expected behavior:

1. Before upload, the TrustMap should still show legacy assets with no broken image icons.
2. After upload and hard refresh, the TrustMap should show v2 assets.
3. If one v2 asset is missing, only that asset should fall back to legacy.
4. The app shell should remain fast.
5. No new top-level tab should appear.

## QA after upload

1. Hard refresh this URL:

```text
https://maximumjusticecybersecurity.github.io/CyberShield/?v=20260602-1730-layer1-v2-assets&reset=onboarding
```

2. Complete/reset onboarding if needed.
3. Open TrustMap.
4. Confirm all seven v2 assets appear.
5. Confirm all seven assets have the same apparent size.
6. Confirm the black-background cube style blends into the dark TrustMap surface.
7. Confirm no green spill, transparent artifact, square halo, or mismatched background appears.
8. Confirm TrustMap controls still work.
9. Confirm legacy fallback works by temporarily removing or renaming one test v2 file only if safe to do so.

## If mobile image loading remains slow

Do not add more runtime JavaScript first.

Next improvement should be asset optimization:

1. Create WebP versions of each v2 asset.
2. Consider reducing web display size from 1254 x 1254 to a smaller web-ready size.
3. Update the governed manifest when optimized assets are available.
4. Mark optimized assets available only after upload and QA.

## Do not do these things

- Do not remove legacy fallback behavior before v2 browser QA succeeds.
- Do not add a new top-level tab.
- Do not replace the TrustMap page.
- Do not bypass the existing shell-first performance architecture.
- Do not implement the full Great Map doctrine in this release.

## Next train after this blocker

After v2 binaries are uploaded and QA succeeds, the next train can focus on one of these:

1. WebP/AVIF asset optimization
2. Great Map doctrine implementation planning
3. TrustMap legend and map grammar
4. Trust route view
5. Root cause cluster view
6. Universal trace drawer

The Great Map doctrine source is already captured in:

```text
docs/20260602-1730-layer1-v2-assets-and-great-map-guidance.md
```
