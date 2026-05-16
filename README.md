# CyberShield OS v5.5 Static GitHub Pages Package

Clean static package for the CyberShield public GitHub Pages site.

## Files to keep in the repository root
- `index.html`
- `styles.css`
- `app.js`
- `assets/mjc-logo-2026.png`
- `README.md`
- `robots.txt`
- `sitemap.xml`

## Critical build correction
CyberShield must not show any scoring during onboarding.  This build locks all score, posture, exposure, confidence, and readiness values until the user submits the Executive Assessment.

## Deployment
1. Delete old repository contents except `.git/`
2. Copy this package into the repository root
3. Commit and push
4. GitHub Pages source should be `main` branch and `/root`
5. Hard refresh the site with `Ctrl + Shift + R`

## Validation checklist
- No score appears in onboarding before submission
- Assessment has six steps and shows progress
- Dashboard unlocks only after submission
- Advisor pane updates when clicking metrics, risks, actions, reports, services, and method cards
- Reports preview, download, email, and print
- MJC logo appears in the top-left corner
- No build tooling or package dependencies are required
