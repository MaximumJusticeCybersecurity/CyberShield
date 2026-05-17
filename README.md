# CyberShield OS v5.7 Static GitHub Pages Package

Clean static CyberShield package for GitHub Pages. No Vite, React, build step, TypeScript, or dependency installation required.

## v5.7 fixes

- Removed visible Bot / AI Brief button and moved platform summary into machine-readable hidden source content and metadata
- Added first-name personalization for the Executive Decision Brief
- Preserved organization name for organization-specific report and dashboard context
- Removed auto-recommend as the visible default preferred executive owner selection
- Added dynamic dashboard naming and bubble prioritization based on selected review goal
- Fixed report selector getting stuck after selecting one report
- Changed report active state to neon blue
- Improved white text contrast across executive view, dashboard, actions, and reports
- Changed owner labels to neon blue for visibility
- Added click detail modal so metric cards, bubbles, risks, actions, and reports visibly do something when selected
- Improved print CSS so report printing starts on the report content instead of wasting a blank first page

## Files to keep in repository root

- index.html
- styles.css
- app.js
- assets/mjc-logo-2026.png
- README.md
- robots.txt
- sitemap.xml

## Deployment

1. Delete old repository contents except `.git/`
2. Copy the contents of this package into the repository root
3. Commit and push
4. GitHub Pages source should be `main` branch and `/root`
5. Open the GitHub Pages URL
6. Hard refresh Firefox with `Ctrl + Shift + R`

