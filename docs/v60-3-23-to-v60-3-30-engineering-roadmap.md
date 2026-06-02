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

Scope:
- Add `data/trustmap/v60-3-23-asset-manifest.json`.
- Add `src/ui/v60-3-23-trustmap-asset-manifest-loader.js`.
- Update image prewarm to use the manifest when available and fallback to the V60.3.22 static list.
- Define required slots, labels, fallback paths, preferred WebP paths, expected background, expected canvas rule, and asset status.

Acceptance:
- App shell remains fast.
- TrustMap images still prewarm.
- Current assets still load.
- Future black-background all-blue cube assets have a governed drop-in path.

QA status:
User phone QA reported that the app runs okay and the shell is faster.  Current images remain slow/low because of file size, but that is being handled through asset optimization outside the app code.

## V60.3.24: TrustMap Render Lifecycle Controller

Status: planned.

Goal:
Reduce repeated delayed timers and scattered reapply calls by introducing one named lifecycle controller for TrustMap open, asset-ready, map-rendered, view-mode-change, and visual-stabilized events.

Scope:
- Create a narrow lifecycle module.
- Do not rewrite the map renderer.
- Route existing enhancement modules through lifecycle events where practical.
- Begin retiring arbitrary long setTimeout calls.

Acceptance:
- Less visible late rendering.
- No startup regression.
- TrustMap still opens on demand.
- No dead clicks.

## V60.3.25: Asset Optimization and Format Upgrade Path

Status: depends on new creator assets.

Goal:
Support optimized web-ready variants without breaking current PNG fallback.

Scope:
- Prefer WebP/AVIF in manifest when present.
- Preserve PNG fallback.
- Document recommended dimensions, file-size targets, black-background treatment, and safe margins.
- Add QA metadata for missing or oversized assets.

Acceptance:
- New image set loads faster than current PNG-only assets.
- All Layer 1 assets share the same apparent scale.
- No green spill, transparency artifacts, or black-square mismatches.

## V60.3.26: Mobile TrustMap Fidelity Mode

Status: planned.

Goal:
Make phone use stable by controlling visual fidelity instead of letting every desktop visual effect run on mobile.

Scope:
- Add mobile fidelity modes: stable, standard, rich.
- Default phones to stable.
- Disable expensive connector animations and filters in stable mode.
- Keep TrustMap meaningful and visually credible.

Acceptance:
- Phone TrustMap does not feel frozen or jittery.
- Desktop remains visually rich.
- No separate product or tab is created.

## V60.3.27: No-Dead-Click and Interaction Meaning Pass

Status: planned.

Goal:
Ensure every visible interactive object explains, routes, calculates, downloads, or triggers a meaningful next step.

Scope:
- Audit Briefing, TrustMap, Runtime, Evidence, Proof Pack, Architecture, Settings.
- Add small inline explanations or routing where needed.
- Do not create fake functionality.

Acceptance:
- No decorative clickable elements.
- TrustMap edges/nodes retain meaningful behavior.
- Proof Pack routes remain clear.

## V60.3.28: Model Trace and Evidence Trust Alignment

Status: planned.

Goal:
Align visible scores with model trace, evidence trust, and confidence language.

Scope:
- Advance Universal Model Trace Inspector from concept toward visible model trace summaries.
- Add evidence trust and confidence distinction in the executive-facing model explanation.
- Do not overclaim statistical validation.

Acceptance:
- Every visible score has model ID, version/status, factors, assumptions, missing evidence, confidence, and risk if wrong.

## V60.3.29: Artifact Trust Scenario Scaffold

Status: planned.

Goal:
Prepare the Artifact Trust Engine path without branding CyberShield as a fact-checker or truth engine.

Scope:
- Add commercial artifact-trust sample scenarios such as vendor SOC 2 claim, AI training-data claim, acquisition security posture claim, insurance claim, or CFO wire approval claim.
- Keep core question: do we have enough evidence to act, and what happens if wrong?
- No live internet retrieval or automated fact verification.

Acceptance:
- Commercial trust-before-action framing is clear.
- No political/media/fact-checker framing.

## V60.3.30: Release Hardening and Source-of-Truth Reconciliation

Status: planned.

Goal:
Freeze the V60.3.x line into a coherent handoff before moving to a larger V60.4 or V61 build.

Scope:
- Reconcile governance-summary, README, bots, builder log, successor handoff, QA checklist.
- Capture known issues and next version priorities.
- Verify prototype boundary and no-live-overclaim language.

Acceptance:
- Next builder can understand what changed, what remains, and where to start.
- Version labels are aligned.
- No source-of-truth drift.

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

Do-not-build constraints:
- Do not guess the mapmaker or the method.
- Do not implement code before the user provides the source material and design intent.
- Do not replace the TrustMap from scratch without explicit approval.
- Do not add a new top-level tab.
- Do not reduce CyberShield to a decorative visualization.

Likely future output:
- A formal mapmaking doctrine document.
- TrustMap reading rules.
- Visual grammar refinements.
- Potential changes to labeling, layering, legend, orientation, path emphasis, consequence representation, and executive map literacy.
- Integration into TrustMap, Briefing, Proof Pack, and Architecture without creating a separate product surface.

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
