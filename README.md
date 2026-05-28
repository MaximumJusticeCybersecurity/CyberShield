# CyberShield Executive OS

## Current live build

Current build label: **V52.4 TrustMap Core Logo and Control Plane Anchor Patch**

Live app file: `index.html`

Live prototype: https://maximumjusticecybersecurity.github.io/CyberShield/

Test URL: https://maximumjusticecybersecurity.github.io/CyberShield/?v=v52-4-core-logo&reset=onboarding

## User-facing rule

Build and version labels belong in Settings/admin metadata and repo documentation.  They should not appear as executive-facing dashboard content.

## User-facing workspace

```text
Briefing | TrustMap | Runtime | Evidence | Proof Pack | Architecture | Settings
```

No new top-level tabs were added for V52.4.

## Current implemented build: V52.4

V52.4 fixes the TrustMap center anchor.  The CyberShield Core node now uses the actual MJC logo asset, sits over a digital portal/data-plane treatment, and labels the selected organization as its control plane.

V52.4 changes:

- replaces the generic core shield treatment with the real MJC logo asset
- adds a digital portal/data-plane base beneath the logo
- dynamically labels the core as `[Selected Company] Control Plane`
- preserves TrustMap overview, domain layer, and detail/action layer behavior
- preserves six-step onboarding and routed dashboard behavior
- adds no new top-level tabs

## Boundary

The current public build is a static advisory prototype.  It is not connected to live SIEM, EDR, IAM, Microsoft 365, GRC, CRM, cloud telemetry, Google Sheets sync, platform takedown systems, marketplace systems, ad platforms, ticketing systems, notification systems, domain-intelligence systems, identity verification systems, or production agent enforcement systems.

## Known V52.4 limitations

- the core now uses the actual logo asset, but the surrounding TrustMap visual-object language is still prototype-grade
- CSS remains inline or injected rather than fully extracted to a stylesheet
- model registry remains scaffold-level and demo-directional
- scoring is not statistically validated
- hands-on browser QA should be performed in Firefox, Brave, Android, and desktop after GitHub Pages deploys

## Next likely decision point

Run QA on V52.4.  Priority checks: MJC logo appears in the TrustMap core, the logo appears plugged into the digital portal/data plane, company control-plane label reflects onboarding, clicking the core still opens the domain layer, and no live enforcement/integration overclaims appear.
