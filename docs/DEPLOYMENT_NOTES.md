# Deployment Notes

## Recommended GitHub repo flow

1. Unzip this package
2. Copy all files into your GitHub repository root
3. Run `npm install`
4. Run `npm run dev` for local review
5. Run `npm run build`
6. Deploy the `dist/` folder to GitHub Pages

## Squarespace integration note

For Maximum Justice Cybersecurity on Squarespace, use the GitHub Pages URL as the hosted app source and embed or link it in a way that feels native to the site.  The production experience should not feel like a separate GitHub prototype.

## Security note

This MVP is frontend-only.  Do not collect production-sensitive cybersecurity data until privacy, consent, secure storage, and backend controls are designed.
