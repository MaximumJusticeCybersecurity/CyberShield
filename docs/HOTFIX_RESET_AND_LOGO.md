# CyberShield Hotfix: Reset Blank Screen + MJC Logo Rendering

## Fixed Issues

### 1. Reset button caused a blank screen
Root cause class: unsafe local/session state handling can leave the app in an invalid render state after reset.

Fixes implemented:
- Added guarded localStorage parsing
- Added validation for allowed views and advisor status values
- Added a safe `resetPlatformData()` function that restores known-good defaults
- Added React ErrorBoundary recovery screen so bad local state cannot permanently blank the app
- Added a visible reset control in the header

### 2. Official MJC logo did not render
Root cause class: bundled asset path fragility, especially on GitHub Pages subpath deployments.

Fixes implemented:
- Copied the official logo into `public/assets/mjc-logo-2026.png`
- Header now references `./assets/mjc-logo-2026.png`, which works under GitHub Pages subpaths
- Added a fallback MJC block only if the image fails to load
- Preserved the logo in the top-left brand block

## Validation Performed

- `npm install` completed
- `npm run build` completed successfully
- Vite production build generated successfully in `/dist`
- Public logo asset included in production build path

## Deployment Notes

After pushing to GitHub:

1. Run `npm install`
2. Run `npm run build`
3. Deploy the `dist` folder to GitHub Pages or your existing GitHub Pages workflow
4. Hard refresh the browser
5. If prior local state is still corrupt, click the new Reset button once

