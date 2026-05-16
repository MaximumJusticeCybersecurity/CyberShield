# CyberShield Clean Static GitHub Pages Package

This is a clean-slate static package for the CyberShield public GitHub Pages site.

It intentionally avoids Vite, React build tooling, TypeScript compilation, and package dependencies so GitHub Pages cannot white-screen because of a missing `/src/main.tsx` dev entrypoint.

## Files to keep in the repo root

- `index.html`
- `styles.css`
- `app.js`
- `assets/mjc-logo-2026.png`
- `README.md`
- `robots.txt`
- `sitemap.xml`

## Files and folders to delete before deploying this version

Delete these from the repository root if present:

- `src/`
- `dist/`
- `node_modules/`
- `public/`
- `architecture/`
- `docs/`
- `google-apps-script/`
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `tsconfig.json`
- `manifest.webmanifest`
- `assets-placeholder.txt`
- any old hashed `/assets/index-*.js` or `/assets/index-*.css` files

## Why this fixes the blank white screen

The prior repository mixed multiple application generations:

- Vite React source files
- old `app.js` and `styles.css`
- `public/assets`
- old `/assets` folders
- several configs and historical builds

GitHub Pages serves static files.  If `index.html` points to `/src/main.tsx`, the browser cannot execute that TypeScript source directly, and the page can render blank.

This package uses plain browser-safe files only:

```html
<link rel="stylesheet" href="styles.css">
<script src="app.js"></script>
<img src="assets/mjc-logo-2026.png">
```

## Deployment

1. Delete old repository contents except `.git/`
2. Copy the contents of this package into the repository root
3. Commit and push
4. GitHub Pages source should be `main` branch and `/root`
5. Open `https://maximumjusticecybersecurity.github.io/cybershield/`
6. Hard refresh with `Ctrl + Shift + R`

## Validation

Open `index.html` locally in a browser before pushing.  You should see the CyberShield page and the MJC logo in the top-left corner.
