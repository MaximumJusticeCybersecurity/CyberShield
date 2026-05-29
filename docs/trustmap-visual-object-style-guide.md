# CyberShield TrustMap Visual Object Style Guide

Date: 2026-05-29
Applies to: V55.3 TrustMap Registry and Visual Object Stabilization
Product: CyberShield Executive OS

## Purpose

This guide defines the visual grammar for the CyberShield TrustMap so future builders do not drift back into cards, process flows, generic dashboards, cyber theater, or unreadable node maps.

The TrustMap is the emotional center and primary proof surface of CyberShield Executive OS. It must look like an executive operational trust map, not a compliance spreadsheet, attack map, process diagram, or decorative network graph.

## Visual references now stored in repo

Authoritative visual references for this build are stored under:

```text
assets/reference/trustmap-radar-constellation-reference.svg
assets/reference/operational-trust-workflow-reference.svg
assets/reference/dr-max-justice-leadership-reference.svg
```

These are compressed reference assets for builder guidance. They are not intended to be directly rendered inside the product UI unless explicitly approved.

## Primary TrustMap doctrine

```text
Radar = orientation, active scanning, situational awareness
Constellation = connected assets, dependencies, and trust relationships
Not process flow = no left-to-right workflow pretending to be a map
```

## Center doctrine

```text
Complexity lives at the edge. Trust is established at the center.
```

The center must feel calm, trusted, stable, and uncluttered.

## CyberShield Core rules

CyberShield Core is not a normal node. It is a trust kernel and shield boundary.

Required:

```text
clean neon shield boundary
MJC logo inside
CyberShield Core label
organization name
Trust Kernel label
click routes to Runtime/Core
no connector clutter inside shield
no connector visually passing through the shield interior
```

Avoid:

```text
funny bevels
shield as a generic circle
shield as a normal graph node
busy interior metrics
stacked labels
fake 3D that looks gimmicky
```

## Layer 1 domain object rules

Layer 1 domains must be neon-blue graphical trust objects, not cards.

Baseline Layer 1 domains that must stay visible:

```text
Cloud & Infrastructure
Identities & Access
Applications & Data
AI Systems & Agents
Third Parties & Vendors
Devices & Endpoints
```

Scenario domains such as CMMC & Compliance may appear, but they must not replace the baseline six domains.

Required object qualities:

```text
short label
clear icon metaphor
neon-blue object language
visible even when not scenario-active
scenario-active glow when relevant
not rectangular cards
not flat generic icons
not emoji-like
```

## Layer 2 asset rules

Layer 2 objects represent systems, vendors, data classes, workflows, or dependencies under a Layer 1 domain.

Required:

```text
small constellation nodes
status color by trust state
labels hidden or subdued in Fit Map
labels visible in Domain View, Object View, hover, or focus
click routes to detail
```

## Layer 3 tag rules

Layer 3 objects represent evidence, owner, consequence, action, risk, or verification points.

Required:

```text
visible as faint stars in Fit Map
labels hidden until hover, focus, or Object View
subtle enough to preserve orientation
active enough to prove operational depth exists
```

## Connector rules

Use straight constellation connectors. Do not use curved process-flow connectors.

Required:

```text
Core -> Layer 1: thickest, neon blue, straight point-to-point
Layer 1 -> Layer 2: medium, status-colored, straight point-to-point
Layer 2 -> Layer 3: thin, subtle, straight point-to-point
Cross-domain links: faint until selected or scenario-highlighted
```

Connector endpoints should visually connect perimeter-to-perimeter where possible. They should not run through object interiors.

## Color grammar

Use color to communicate trust status, not decoration.

```text
Strong: green / trusted enough for current purpose
Moderate: yellow / conditional or needs monitoring
Weak: orange / important verification gap
Critical: red / consequence, break, escalation, or refusal condition
Neon blue: CyberShield structure, trust relationship, radar, and core boundary
```

Do not turn every panel yellow or red. Over-warning creates fatigue and weakens executive attention.

## Layout grammar

Fit Map:

```text
orientation first
all baseline domains visible
Layer 3 stars visible but quiet
labels minimized
side panels remain outside map canvas
```

Domain View:

```text
interpret selected domain
show Layer 2 relationships
show relevant trust break drivers
```

Object View:

```text
show asset detail
evidence and ownership tags become readable
route to Evidence, Runtime, or Proof Pack when relevant
```

Proof Pack:

```text
document what was shown, decided, assumed, and limited
include model/version context and prototype boundary
```

## Reference interpretation

The dark TrustMap reference provides the strongest direction for the product surface:

```text
premium dark operational environment
central shield object
surrounding domain constellations
side panels outside the map
status colors used sparingly but clearly
executive command-center feel without hacker-map theater
```

The light operational workflow reference is useful for doctrine, onboarding, and Architecture explanation only. It should not replace the TrustMap with a process flow.

The Dr. Max Justice leadership reference is useful for brand tone:

```text
credible public-sector and board-level cybersecurity leadership
MJC shield as authority marker
clear ownership message
human accountability, not anonymous dashboarding
```

## What not to build

Do not build:

```text
left-to-right process flow as TrustMap
card grid pretending to be a map
full cinematic digital globe
hacker world map
sci-fi cyberpunk screen
emoji objects
static decorative diagram with dead clicks
new top-level tab for Purpose Protocol or Artifact Trust
```

## V55.3 implementation boundary

V55.3 may create registries and visual guidance. It may wire the registry for validation and future rendering. It must preserve V55.2 behavior unless a specific visual stabilization fix is necessary.

V55.3 must not claim:

```text
live enforcement
live evidence retrieval
live banking verification
live payment blocking
CMMC certification
healthcare compliance validation
live integrations
live internet claim verification
```

## Browser QA requirement

After GitHub Pages deploys, browser QA is required unless the builder can verify the live page directly.

Minimum browser QA:

```text
hard refresh live prototype
complete/reset onboarding
open TrustMap
confirm V55.3 metadata is present in Settings/admin context
confirm V55.2 TrustMap behavior remains intact
confirm no new top-level tab exists
confirm Purpose Protocol still works
confirm no live capability overclaims appear
confirm visual references and registry files exist in repo
```
