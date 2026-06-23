// CyberShield Vercel Web Analytics loader
// Static-site integration for Vercel-hosted HTML routes.
// Page views are sent only when the Vercel Analytics endpoint is available.

const ANALYTICS_SCRIPT_ID = 'cybershield-vercel-analytics';

if (typeof document !== 'undefined' && !document.getElementById(ANALYTICS_SCRIPT_ID)) {
  const script = document.createElement('script');
  script.id = ANALYTICS_SCRIPT_ID;
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  script.dataset.sdk = 'vercel-analytics';
  document.head.appendChild(script);
}
