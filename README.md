# CyberShield Executive OS

## Current live build

Current build label: **V54 Enterprise TrustMap Kernel Rebuild**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v54-enterprise-trustmap-kernel&reset=onboarding

## User-facing rule

Build and version labels belong in Settings/admin metadata and repo documentation.  They should not appear as executive-facing dashboard content.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V54.

## Current implemented build: V54

V54 is a clean TrustMap rebuild inside the existing CyberShield app shell.  It makes TrustMap the wow-factor center of the product by replacing the patched radial/process-flow behavior with a kernel-centered enterprise TrustMap inspired by the uploaded enterprise trust map reference.

V54 changes:

- adds `src/ui/v54-enterprise-trustmap-kernel.js`
- makes V54 the active TrustMap authority through `src/ui/v52-7-operational-layer.js`
- removes V53.1 recovery map from the active loader chain
- replaces layer filters with TrustMap view controls
- centers the TrustMap on the CyberShield Core / organization trust kernel
- adds ring-layer model: kernel, Layer 1 domains, Layer 2 assets, Layer 3 object detail
- adds zoom in, zoom out, fit map, kernel view, domain view, object view, and reset controls
- adds drag-to-pan support
- adds side panels for Organizational Trust Score, Current Trust Movement, Top Trust Break Drivers, Trust Level Distribution, Active Risks, and Trend Line
- adds Hourly / Daily / Weekly / Monthly synthetic trend views
- adds scenario-specific trust score distributions and map emphasis
- lets onboarding confidence and CMMC “I don’t know” answers influence score directionally
- keeps six demo scenarios available for three-layer depth
- keeps no-new-top-level-tabs constraint intact

## CyberShield Trust Model Doctrine

CyberShield evaluates whether the information behind a critical action can be trusted before the business acts.

Evidence supports the Trust Model, but evidence volume is not the point.  Information reliability, source confidence, owner accountability, verification path, and consequence if wrong are the point.

CyberShield is intentionally cross-industry.  The constraint is coherence under Trust Before Action, not narrowness.

## TrustMap doctrine update

The CyberShield Core is the TrustMap kernel.  It is not merely another node.  TrustMap should visually show how trust flows, breaks, improves, and propagates around the organization.

TrustMap must not regress into a left-to-right process flow.  It must behave like a map: users can zoom out to see the full ecosystem, zoom into a domain, inspect an object, pan left/right/up/down, and click through at least three layers for approved demo scenarios.

## Boundary

The current public build is a static advisory prototype.  It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, CMMC certification systems, healthcare compliance validation systems, or production agent enforcement systems.

## Known V54 limitations

- V54 is a clean TrustMap rebuild inside the existing V52/V53 app shell, not a full app rewrite
- TrustMap is substantially closer to the target enterprise map, but visual object art is still prototype-grade
- CSS is still injected rather than fully extracted to a stylesheet
- scenario data should be moved into JSON or a dedicated data registry
- reports download as text files, not branded PDF reports yet
- report contact capture is client-side only and is not stored or emailed
- CMMC guidance is advisory and does not represent legal advice, certification, or assessment outcome
- healthcare scenario guidance is advisory and does not represent compliance validation
- scoring and trend lines are demo-directional and not statistically validated
- hands-on browser QA should be performed in Firefox, Brave, Android, and desktop after GitHub Pages deploys

## Next likely decision point

Run QA on V54.  Priority checks: TrustMap opens as a kernel-centered enterprise map, no old process-flow flash, no layer filters, zoom in/out works, pan works, Fit Map works, Kernel View works, Domain View works, Object View works, scenario changes alter distribution and active risks, onboarding answers alter score directionally, and no unsupported certification/compliance/live-integration claims appear.
