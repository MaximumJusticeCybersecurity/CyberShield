# CyberShield OS v5.6 Static GitHub Pages Package

Clean static package for MaximumJusticeCybersecurity/CyberShield.

## What changed in v5.6

- No scoring, posture values, confidence values, exposure values, or cost ranges appear during onboarding.
- After assessment submission, onboarding disappears and the user lands on a dedicated Executive View.
- Executive View is a short, low-scroll decision brief.
- Added likely cost exposure ranges based on organization value range, exposure, compliance pressure, and data sensitivity.
- Reintroduced 12 stoplight dashboard bubbles with heat bars and white position dots.
- Every highlighted/clickable bubble, card, metric, report, and action now does something.
- Added advisor-pane behavior for metrics, risks, actions, reports, and dashboard bubbles.
- Added ADA-conscious font stack, contrast, focus states, minimum 44px click targets, responsive layouts, reduced-motion support, and semantic structure.
- Added bot-readable metadata, JSON-LD, and AI/bot brief page.
- Static only: no Vite, React, build step, TypeScript, package.json, or dependency chain.

## Deploy

1. Keep `.git/`
2. Delete old repo files and folders from the repository root
3. Copy these files into the repository root
4. Commit and push to `main`
5. GitHub Pages source: `main` branch, `/root`
6. Hard refresh Firefox with `Ctrl + Shift + R`

## Files

- `index.html`
- `styles.css`
- `app.js`
- `assets/mjc-logo-2026.png`
- `robots.txt`
- `sitemap.xml`
