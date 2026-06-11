// CyberShield report capture configuration
// 2026061114-live-google-sheets-endpoint
//
// Google Apps Script Web App endpoint for prototype report capture.
// This URL is safe to expose in static front-end code. Never place Google
// credentials, API keys, service-account material, or secrets in front-end code.

const REPORT_CAPTURE_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyHqZTO1_zSepc8JVVx8P52Bvo78YY2IY3rVMKpfPIXEzwHAs9Rd2oR41PtU1GB4f8Q/exec';
const CRM_SHEET_ID = '1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw';
const REPORT_CAPTURE_MODE = REPORT_CAPTURE_ENDPOINT ? 'configured' : 'simulated';

export { REPORT_CAPTURE_ENDPOINT, CRM_SHEET_ID, REPORT_CAPTURE_MODE };
