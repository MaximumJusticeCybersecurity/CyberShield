# CyberShield vNext Phase 4 Hotfix Package

CyberShield is the Maximum Justice Cybersecurity Cyber Decision Intelligence Platform MVP.

This package includes fixes for two production blockers:

1. The reset button could corrupt local demo state and produce a blank screen
2. The official MJC logo was not reliably rendering in the top-left header on GitHub Pages

## Quick Start

```bash
npm install
npm run build
npm run preview
```

## Important Files

- `public/assets/mjc-logo-2026.png` — official MJC logo used by the header
- `src/components/Header.tsx` — top-left logo placement and safe reset button
- `src/state/useCyberShieldState.tsx` — guarded state persistence and reset logic
- `src/components/ErrorBoundary.tsx` — prevents blank-screen failure from bad local state
- `docs/HOTFIX_RESET_AND_LOGO.md` — details of the bug fixes

## GitHub Pages

The Vite config uses:

```ts
base: './'
```

This keeps assets working when deployed under:

```text
https://maximumjusticecybersecurity.github.io/cybershield/
```

## Validation

Run:

```bash
npm run build
```

The package has been build-tested successfully before delivery.
