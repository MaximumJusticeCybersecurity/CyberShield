// CyberShield report capture configuration
// 2026061115-mjc-crm-capture-endpoint
//
// Google Apps Script Web App endpoint for prototype report capture.
// This URL is safe to expose in static front-end code. Never place Google
// credentials, API keys, service-account material, or secrets in front-end code.

import '../vercel-analytics.js';

const REPORT_CAPTURE_ENDPOINT = 'https://script.google.com/macros/s/AKfycbypKJ4PBpqtthGURqr4mebXMD6Sdv-BmbRIgwulQmewl6SSyVNx_cX5xbsh3HH6Xs5r/exec';
const CRM_SHEET_ID = '1SDfqw-rRuluqBdPUT6Ex4UIajO-CCEtny84OTMKhQ3w';
const REPORT_CAPTURE_MODE = REPORT_CAPTURE_ENDPOINT ? 'configured' : 'simulated';

export { REPORT_CAPTURE_ENDPOINT, CRM_SHEET_ID, REPORT_CAPTURE_MODE };
