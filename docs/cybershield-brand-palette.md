# CyberShield True Blue Palette Doctrine

Date: 2026-05-27
Current palette doctrine: CyberShield True Blue

## Purpose

CyberShield is about trust.  The user should walk away feeling that CyberShield is credible, calm, protective, and operationally competent.

The palette is not chosen to look trendy.  It is chosen to convey trust first, then cyber capability.

## Design position

CyberShield should not look like a pale generic SaaS dashboard.  It should also not look like a black military command center.

The target feeling is:

- trusted night-sky blue
- executive calm
- modern cyber clarity
- digital-world mapping
- protective shield around the organization
- controlled neon accents only where interaction or focus matters

## Primary palette

```css
:root {
  --bg: #061726;
  --panel: #102F4B;
  --panel2: #0A2238;
  --panel3: #123A5A;
  --line: #24516F;
  --text: #EEF8FF;
  --muted: #AAC0D3;
  --blue: #42D7FF;
  --action: #0B75BB;
  --green: #76E4A1;
  --amber: #FFD166;
  --red: #FF7474;
  --purple: #B899FF;
}
```

## Usage rules

### Background

Use the deep blue foundation for the app background:

```css
background: radial-gradient(circle at 16% 0, rgba(66,215,255,.18), transparent 34rem),
            linear-gradient(180deg, #061726, #081d30 48%, #061726);
```

This should feel like a trusted night sky, not black space and not pale SaaS.

### Panels

Use darker blue panels with readable contrast:

```css
background: linear-gradient(180deg, rgba(18,58,90,.96), rgba(10,34,56,.98));
```

### TrustMap canvas

The TrustMap may be slightly darker and more dimensional than the rest of the app.  It represents a mapped digital world.

Use a subtle grid / node field background, not heavy AI art or military styling.

### Accent blue

Use `#42D7FF` only for:

- focus states
- selected edges
- connector dots
- active navigation
- high-value calls to action
- relationship hover glow

Do not flood the interface with neon.

### Status colors

Use:

- Green: strong trust / sufficient control
- Amber: moderate risk / review required
- Red: weak trust / blocked or high-risk relationship
- Purple: strategic/advisory context

## TrustMap object rules

The center object is the customer's organization shield.  It protects the organization and must stay visually on top.

First-level trust domains should be circular digital trust objects with recognizable symbols:

- Identities & Access: people icon
- Devices & Endpoints: monitor icon
- Applications & Data: data stack icon
- AI Systems & Agents: brain icon
- Cloud & Infrastructure: cloud icon
- Third Parties & Vendors: handshake icon
- Policy & Compliance: shield/check icon
- Evidence Substrate: evidence/folder icon
- Decision Record: check/record icon

Second-layer and third-layer objects should not crowd the default TrustMap.  They should appear only through drill-down from the first-layer trust object.

## Responsive behavior

Do not use cookies or browsing history to infer the device.  CyberShield should adapt through viewport size, CSS breakpoints, and client-side capability checks such as `window.innerWidth`, `matchMedia`, and touch capability detection.

On smaller screens:

- always keep the organization shield visible
- keep only first-layer trust domains on the map
- hide second-layer objects behind drill-down
- maintain readable node spacing
- do not allow overlapping primary objects

## What not to do

Do not revert to the V41 pale SaaS palette as the primary visual identity.

Do not use black command-center styling as the product default.

Do not use exaggerated neon glow that feels like 1980s arcade styling.

Do not expose CRM or internal admin workflows as user-facing features.

Do not use a user's cookie history to infer display behavior.

## Builder rule

Future builders must preserve CyberShield True Blue unless Dr. Max Justice explicitly replaces the brand palette.
