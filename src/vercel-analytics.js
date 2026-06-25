import './trust-led-conversion-ui.js';

// CyberShield Vercel Web Analytics loader and privacy-minimized conversion helper.
// Page views are sent only when the Vercel Analytics endpoint is available.
// Conversion events never include recommendation text, evidence, identity fields,
// email addresses, record identifiers, capture endpoints, or Sheet identifiers.

const ANALYTICS_SCRIPT_ID = 'cybershield-vercel-analytics';
const SAFE_PROPERTY_KEYS = new Set(['route', 'stage', 'choice', 'destination']);

if (typeof window !== 'undefined') {
  window.va = window.va || function (...args) {
    (window.vaq = window.vaq || []).push(args);
  };
}

if (typeof document !== 'undefined' && !document.getElementById(ANALYTICS_SCRIPT_ID)) {
  const script = document.createElement('script');
  script.id = ANALYTICS_SCRIPT_ID;
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  script.dataset.sdk = 'vercel-analytics';
  document.head.appendChild(script);
}

function sanitizeProperties(properties = {}) {
  return Object.fromEntries(
    Object.entries(properties)
      .filter(([key, value]) => SAFE_PROPERTY_KEYS.has(key) && ['string', 'number', 'boolean'].includes(typeof value))
      .slice(0, 4)
  );
}

export function trackConversion(name, properties = {}) {
  if (typeof window === 'undefined' || typeof name !== 'string' || !name.trim()) return;

  const safeProperties = sanitizeProperties(properties);
  const detail = { name: name.trim(), properties: safeProperties };

  try {
    window.dispatchEvent(new CustomEvent('cybershield:conversion', { detail }));
  } catch {
    // Local event visibility is useful for verification but must never break the journey.
  }

  try {
    if (typeof window.va === 'function') {
      window.va('event', { name: detail.name, data: safeProperties });
    }
  } catch {
    // Analytics availability is not required for the customer journey to function.
  }
}
