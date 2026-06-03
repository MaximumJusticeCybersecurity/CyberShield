# V60.3.23 to V60.3.31 Engineering Roadmap

Date: 2026-06-02
Current baseline: V60.3.23 TrustMap Asset Manifest and Intake Contract

## Purpose

This roadmap stops reactive patching and defines the next CyberShield build sequence before implementation.  The goal is to keep the faster V60.3.21/V60.3.22 app shell, preserve the TrustMap as the flagship surface, prepare for the rebuilt Layer 1 artwork, and continue strengthening CyberShield as Trust Before Action infrastructure.

## Build discipline

1. Do not add new top-level tabs.
2. Do not rebuild the TrustMap from scratch unless explicitly approved.
3. Do not add more visual overlay patches when a manifest, lifecycle controller, or asset correction is the right fix.
4. Preserve the executive shell fast path.
5. Preserve the full TrustMap on-demand path.
6. Keep asset work manifest-driven.
7. Keep model/scoring work registry-driven.
8. Update README, bots.txt, governance-summary.json, builder-version-log, and successor handoff after material changes.
9. Do not claim live integrations, live retrieval, live scoring, live enforcement, certification, or compliance determination.
10. Treat slow current images as an asset-weight problem, not an app architecture problem, unless fresh QA proves otherwise.

## V60.3.23: TrustMap Asset Manifest and Intake Contract

Status: built.

Goal:
Create a formal asset manifest so future rebuilt Layer 1 assets can be added cleanly without hardcoded filename patches.

Files:
- `data/trustmap/v60-3-23-asset-manifest.json`
- `src/ui/v60-3-23-trustmap-asset-manifest-loader.js`
- `src/ui/v60-3-22-trustmap-image-prewarm.js`
- `src/ui/v52-7-operational-layer.js`

Acceptance:
- App shell remains fast.
- TrustMap images still prewarm.
- Current assets still load.
- Future black-background all-blue cube assets have a governed drop-in path.

QA status:
User phone QA reported that the app runs okay and the shell is faster.  Current images remain slow/low because of file size, but that is being handled through asset optimization outside the app code.

## V60.3.24: TrustMap Render Lifecycle Controller

Status: build next.

Strategic reason:
CyberShield currently has multiple historical TrustMap modules that use delayed timers and local reapply logic.  V60.3.24 should introduce one lifecycle path so the app can track TrustMap readiness without guessing.

Goal:
Reduce repeated delayed timers and scattered reapply calls by introducing one named lifecycle controller for TrustMap requested, manifest loaded, image prewarm, stack loaded, rendered, view mode changed, and visual stabilized events.

Files to create:
- `src/ui/v60-3-24-trustmap-render-lifecycle-controller.js`

Files to update:
- `src/ui/v52-7-operational-layer.js`
- `README.md`
- `bots.txt`
- `governance-summary.json`
- `docs/builder-version-log.md`
- `docs/successor-builder-handoff-and-job-docket.md`

Lifecycle events:
- `cybershield:trustmap-requested`
- `cybershield:trustmap-stack-load-started`
- `cybershield:trustmap-stack-loaded`
- `cybershield:trustmap-asset-manifest-loaded`
- `cybershield:trustmap-images-prewarm-started`
- `cybershield:trustmap-images-prewarmed`
- `cybershield:trustmap-render-detected`
- `cybershield:trustmap-view-mode-changed`
- `cybershield:trustmap-visual-stabilized`

Implementation boundaries:
- Do not rewrite the TrustMap renderer.
- Do not redesign visual assets.
- Do not add overlays or new styling.
- Do not add a new tab.
- Do not remove current fallback behavior.
- Do not claim performance solved until phone QA confirms.

Implementation steps:
1. Add lifecycle module with a small internal state object.
2. Attach event listeners to known TrustMap triggers.
3. Emit `trustmap-requested` when TrustMap tab or Expand full TrustMap is clicked.
4. Emit `stack-load-started` before dynamic TrustMap import begins.
5. Listen for existing manifest and prewarm events.
6. Detect rendered TrustMap shell with a narrow observer limited to the TrustMap container, not the whole body.
7. Detect view mode changes from known TrustMap controls.
8. Debounce one `visual-stabilized` event after render/view activity.
9. Expose non-executive metadata in Settings/admin payload.

Acceptance:
- App shell remains fast.
- TrustMap still opens on demand.
- Current images still load.
- Manifest still loads or falls back.
- No top-level tabs are added.
- No live capability is overclaimed.
- TrustMap late rendering feels reduced or at least becomes traceable.
- Future builders can see one lifecycle path instead of scattered assumptions.

QA:
- Phone hard refresh.
- Complete/reset onboarding.
- Open Briefing.
- Expand full TrustMap.
- Confirm lifecycle metadata appears in admin payload.
- Confirm no startup slowdown.
- Confirm TrustMap opens and current images still load.
- Confirm no visible new UI clutter.

## V60.3.25: Asset Optimization and Format Upgrade Path

Status: depends on new creator assets.

Strategic reason:
Phone QA indicates remaining image latency is an asset file-size problem.  V60.3.25 must solve the asset pipeline, not add more runtime patches.

Goal:
Support optimized web-ready variants without breaking current PNG fallback.

Files likely affected:
- `data/trustmap/v60-3-23-asset-manifest.json`
- `src/ui/v60-3-23-trustmap-asset-manifest-loader.js`
- `src/ui/v60-3-22-trustmap-image-prewarm.js`
- possibly `assets/trustmap/v60-3-23/*`

Implementation steps:
1. Add rebuilt assets to manifest future paths.
2. Prefer WebP when available and browser-supported.
3. Preserve PNG fallback.
4. Add file-size and dimension metadata to manifest.
5. Add a lightweight QA report in Settings/admin metadata for missing/oversized assets.
6. Do not block rendering if optimized variants are missing.

Acceptance:
- New image set loads faster than current PNG-only assets.
- All Layer 1 assets share the same apparent scale.
- No green spill, transparency artifacts, or black-square mismatches.
- PNG fallback still works.

Do not build until:
- new image assets exist, or
- at least one test WebP/optimized PNG path is available.

## V60.3.26: Mobile TrustMap Fidelity Mode

Status: planned.

Strategic reason:
The TrustMap needs to feel rich on desktop and stable on phones.  Those are not the same rendering problem.

Goal:
Make phone use stable by controlling visual fidelity instead of letting every desktop visual effect run on mobile.

Files likely affected:
- new `src/ui/v60-3-26-mobile-trustmap-fidelity-mode.js`
- `src/ui/v52-7-operational-layer.js`
- TrustMap CSS-producing modules only where required

Fidelity modes:
- `stable`: phone default, minimal animation/filtering
- `standard`: balanced default for tablets or weaker desktops
- `rich`: desktop visual richness where performance allows

Implementation steps:
1. Detect mobile viewport and reduced-motion preference.
2. Apply mode as a class or data attribute to TrustMap root.
3. Disable expensive animations and filters in stable mode.
4. Preserve TrustMap meaning, labels, selection, panels, and controls.
5. Store chosen mode in local state only if needed.

Acceptance:
- Phone TrustMap does not feel frozen or jittery.
- Desktop remains visually rich.
- No separate product or tab is created.
- User can still understand the TrustMap on phone.

## V60.3.27: No-Dead-Click and Interaction Meaning Pass

Status: planned.

Strategic reason:
CyberShield loses trust if anything appears clickable but does not explain, route, calculate, download, or trigger a next step.

Goal:
Audit and fix visible interactions across the existing surfaces.

Files likely affected:
- multiple `src/ui/*` modules depending on findings
- `docs/builder-requirements-acceptance-checklist.md`
- possible new `docs/v60-3-27-no-dead-click-audit.md`

Implementation steps:
1. List interactive elements across Briefing, TrustMap, Runtime, Evidence, Proof Pack, Architecture, Settings.
2. Classify each as explain, route, calculate, download, or trigger next step.
3. Remove or downgrade fake-click affordances.
4. Add small explanations or routes where needed.
5. Do not invent backend behavior.

Acceptance:
- No decorative clickable elements.
- TrustMap nodes and edges retain meaningful behavior.
- Proof Pack routes remain clear.
- No unsupported live actions are implied.

## V60.3.28: Model Trace and Evidence Trust Alignment

Status: planned.

Strategic reason:
The user already identified Universal Model Trace Inspector, Evidence Trust Score, and Confidence Score as central to the CyberShield scoring doctrine.  The UI needs to move toward traceable scores without overclaiming validation.

Goal:
Align visible scores with model trace, evidence trust, and confidence language.

Files likely affected:
- `data/models/*` if available
- possible new `data/models/v60-3-28-model-trace-registry.json`
- possible new `src/ui/v60-3-28-model-trace-and-evidence-trust.js`

Implementation steps:
1. Create or extend model trace metadata.
2. Show model ID, version/status, factors, assumptions, missing evidence, confidence, and risk if wrong.
3. Distinguish trust score from confidence score.
4. Distinguish evidence trust from action trust.
5. Avoid statistical validation claims.

Acceptance:
- Every visible score has model ID, version/status, factors, assumptions, missing evidence, confidence, and risk if wrong.
- The UI does not imply scores are statistically validated.
- The doctrine “No score without a model” is visibly supported.

## V60.3.29: Artifact Trust Scenario Scaffold

Status: planned.

Strategic reason:
Artifact Trust is a major future capability, but it must not become fact-checker branding or a civic/media truth engine.

Goal:
Prepare the Artifact Trust Engine path using commercial trust-before-action scenarios.

Files likely affected:
- possible new `data/scenarios/v60-3-29-artifact-trust-scenarios.json`
- possible new `src/ui/v60-3-29-artifact-trust-scenario-scaffold.js`
- Proof Pack and Evidence modules where appropriate

Preferred sample scenarios:
- vendor says it is SOC 2 compliant
- AI vendor says it does not train on customer data
- acquisition target says its security program meets NIST
- supplier says it maintains cyber insurance
- wire request says it was approved by the CFO

Implementation steps:
1. Add commercial artifact trust scenario registry.
2. Add UI references without a new top-level tab.
3. Show claim, evidence, confidence, decision impact, and action guidance.
4. Keep boundary: no live retrieval, no automated fact verification, no political truth claims.

Acceptance:
- Commercial trust-before-action framing is clear.
- No political/media/fact-checker framing.
- Artifact Trust supports executive decisions rather than judging people or brands.

## V60.3.30: Release Hardening and Source-of-Truth Reconciliation

Status: planned.

Strategic reason:
The V60.3.x line is accumulating foundational architecture.  It needs a hardening freeze before any larger V60.4 or V61 build.

Goal:
Freeze the V60.3.x line into a coherent handoff.

Files affected:
- `governance-summary.json`
- `README.md`
- `bots.txt`
- `docs/builder-version-log.md`
- `docs/successor-builder-handoff-and-job-docket.md`
- `docs/builder-requirements-acceptance-checklist.md`
- `docs/recurring-build-issues-and-regression-watchlist.md`

Implementation steps:
1. Reconcile version labels.
2. Reconcile prototype boundary language.
3. Confirm no-new-top-level-tabs rule.
4. Capture known issues.
5. Capture next version priorities.
6. Confirm no live overclaim language.
7. Confirm next builder has a clean start point.

Acceptance:
- Next builder can understand what changed, what remains, and where to start.
- Version labels are aligned.
- No source-of-truth drift.
- No unresolved build chain ambiguity.

## V60.3.31: Integrating the World's Best Map Maker

Status: earmarked only.  Do not build until the user provides the details.

Working title:
Integrating the World's Best Map Maker, also referred to as Incorporating the World's Best Map Maker.

Known intent:
This is the final earmarked version in this roadmap.  It is expected to integrate advanced mapmaking doctrine into CyberShield so the TrustMap does not merely display controls, assets, or scores, but teaches the user how to read operational trust as a map.

Current conceptual anchors:
- CyberShield itself is a map, not merely a dashboard with a map tab.
- TrustMap is the visual demonstration of the CyberShield trust formula.
- Prior mapmaking inspirations include Minard, John Snow, and Harry Beck.
- The future requirement is expected to incorporate the user's forthcoming definition of “the world's best map maker.”

Likely files:
- future formal mapmaking doctrine document
- TrustMap reading rules
- possible visual grammar registry
- possible legend/orientation/path-emphasis updates
- potential integration into TrustMap, Briefing, Proof Pack, and Architecture

Do-not-build constraints:
- Do not guess the mapmaker or the method.
- Do not implement code before the user provides the source material and design intent.
- Do not replace the TrustMap from scratch without explicit approval.
- Do not add a new top-level tab.
- Do not reduce CyberShield to a decorative visualization.

Acceptance will be defined later after user input.

## Known dependency: rebuilt Layer 1 assets

The new Layer 1 art should be delivered as a unified set using a locked template for canvas size, cube scale, camera angle, lighting, and margins.  The asset manifest introduced in V60.3.23 is the intended intake path for those files.

Preferred deliverables:
- high-resolution master PNG with black background
- optimized web-ready PNG with same dimensions across the full set
- WebP version for performance
- source files when available

## Next builder warning

Do not solve slow image loading with more reapply JavaScript if the underlying files are too large or visually inconsistent.  Optimize the assets, then route them through the manifest.
