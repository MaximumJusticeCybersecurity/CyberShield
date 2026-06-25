// Shared trust-led conversion presentation safeguards.
// This module is imported by the existing static-site loader so public routes
// receive the same print-only correction without changing decision logic.

const PRINT_STYLE_ID = 'cybershield-trust-led-print-style';

if (typeof document !== 'undefined' && !document.getElementById(PRINT_STYLE_ID)) {
  const style = document.createElement('style');
  style.id = PRINT_STYLE_ID;
  style.textContent = `
    @media print {
      html,
      body {
        background: #fff !important;
      }

      .print-report > p:last-child {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}
