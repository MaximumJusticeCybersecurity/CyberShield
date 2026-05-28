# CyberShield Builder Version Log

Purpose: Every builder must update this file when they make a material CyberShield change.

This file records who built what, which CyberShield version they advanced, and the primary value add of that builder's work.  It exists so future builders can quickly understand the lineage of CyberShield and avoid repeating or undoing prior work.

## Current builder log

### Builder-20260528-005

Date: 2026-05-28

Builder / agent identifier: GPT-5.5 Thinking, TrustMap core logo and control plane anchor session

CyberShield versions affected:

- V52.4 TrustMap Core Logo and Control Plane Anchor Patch

Files materially changed or created:

- `src/core/registryLoader.js`
- `README.md`
- `bots.txt`
- `governance-summary.json`
- `docs/builder-version-log.md`

Primary value add:

Corrected the TrustMap core anchor so it uses the actual MJC logo asset instead of a generic shield SVG.  The CyberShield Core node now visually sits over a digital portal/data-plane treatment and labels the selected organization as its control plane.

What got better:

- TrustMap core now uses `assets/mjc-logo-2026.png`
- core visually reads as CyberShield opening a trusted digital portal
- company control-plane label updates from the selected organization when available
- TrustMap overview, domain layer, and detail/action layer behavior remain intact
- no new top-level tabs were added

Remaining risks or limitations:

- patch is injected through `src/core/registryLoader.js` as a GitHub connector workaround rather than being cleanly integrated into `src/app.js`
- surrounding TrustMap visual objects remain prototype-grade
- CSS remains inline or injected
- hands-on Firefox, Brave, Android, and desktop QA still needs to be run after GitHub Pages deployment

Next recommended build action:

Run V52.4 QA using the reset URL.  Verify the MJC logo appears in the TrustMap core, the portal/data-plane base is visible, the selected company control-plane label appears correctly, and clicking the core still opens its domain layer.

### Builder-20260528-004

Date: 2026-05-28

Builder / agent identifier: GPT-5.5 Thinking, TrustMap humanistic visual object recovery session

CyberShield versions affected:

- V52.3 TrustMap Humanistic Visual Object Recovery

Primary value add:

Corrected the TrustMap visual language after user feedback that the V52.2 map still felt robotic and visually weak.  V52.3 replaces crude CSS geometry with inline SVG symbolic objects and adds internal TrustMap drilldown states: overview, domain layer, and detail/action layer.

### Builder-20260528-003

Date: 2026-05-28

Builder / agent identifier: GPT-5.5 Thinking, V52.2 routed onboarding and layered TrustMap session

CyberShield versions affected:

- V52.1 TrustMap Visual Restoration and Layer Patch
- V52.2 Guided Onboarding, Routed Dashboard, and Layered TrustMap Patch

Primary value add:

Implemented the requested review gate at V52.2 by combining the TrustMap visual restoration with guided onboarding and dashboard routing.  TrustMap received visible layers, relationship lines, neon highlighting, CSS-rendered graphical nodes, layer filters, and richer selected-node detail.  Onboarding uses a six-step flow and routes the dashboard emphasis by role, industry, scenario, evidence posture, business priority, and output audience.

### Builder-20260528-002

Date: 2026-05-28

Builder / agent identifier: GPT-5.5 Thinking, CyberShield V52 model registry and human-first build session

CyberShield versions affected:

- V52 Model Registry Foundation and Human-First Executive Control View

Primary value add:

Implemented V52 as a human-first control-plane foundation.  The build keeps navigation stable, adds Executive First View inside Briefing, moves orchestration into a module, routes scores through registry-aware decision logic, exposes model trace through progressive disclosure, and preserves proof and boundary language.

### Builder-20260528-001

Date: 2026-05-28

Builder / agent identifier: GPT-5.5 Thinking, CyberShield documentation hardening and institutional memory session

CyberShield versions affected:

- V51.1 baseline
- V52-V59 planning and builder-readiness layer

Primary value add:

Hardened the repo as CyberShield's external memory system and documented recurring AI-builder failure modes.
