function scenarioName() {
  const selected = document.querySelector('#demoMode')?.selectedOptions?.[0]?.textContent?.trim();
  if (selected) return selected;
  const recommendation = document.querySelector('#printDoc')?.textContent || '';
  if (/NIST|800-53|policy/i.test(recommendation)) return 'Compliance: NIST Control Claim';
  if (/vulnerability|exploit/i.test(recommendation)) return 'Security: Vulnerability Risk Acceptance';
  return 'Vendor Risk: Contradictory Evidence';
}

function executiveSummaryFor(name) {
  if (/Compliance/i.test(name)) {
    return 'CyberShield evaluated an AI-generated compliance conclusion and separated policy existence from implementation and test evidence. The record is intended to prevent a policy reference from being treated as proof of control effectiveness without review.';
  }
  if (/Security/i.test(name)) {
    return 'CyberShield evaluated an AI-generated security risk acceptance recommendation and separated exploit likelihood, asset exposure, compensating controls, remediation deferral, and risk ownership before action.';
  }
  return 'CyberShield evaluated an AI-generated vendor approval recommendation and separated SOC 2 existence, scope coverage, encryption claims, customer data use, subprocessors, and approval authority before action.';
}

function addExecutiveNotice() {
  const printDoc = document.querySelector('#printDoc .print-page');
  if (!printDoc || printDoc.querySelector('.atdr-export-polish')) return;
  const name = scenarioName();
  const summary = document.createElement('div');
  summary.className = 'print-callout atdr-export-polish';
  summary.innerHTML = `<p><strong>Scenario:</strong> ${name}</p><p><strong>Executive framing:</strong> ${executiveSummaryFor(name)}</p><p><strong>Decision doctrine:</strong> AI confidence is not evidence. The record separates what the AI claimed, what evidence says, what CyberShield inferred, and what the human reviewer decided.</p>`;
  const firstH2 = printDoc.querySelector('h2');
  if (firstH2) printDoc.insertBefore(summary, firstH2);
  else printDoc.appendChild(summary);
}

function addPrintStyles() {
  if (document.querySelector('#atdrExportPolishStyles')) return;
  const style = document.createElement('style');
  style.id = 'atdrExportPolishStyles';
  style.textContent = `
    @media print{
      .print-doc h1{letter-spacing:-.02em;color:#082033}
      .print-callout.atdr-export-polish{border-left-color:#0b6f95;background:#eef8fc;margin:10px 0 14px}
      .print-doc h2{color:#102a3b}
      .print-doc table{page-break-inside:auto}
      .print-doc tr{page-break-inside:avoid;page-break-after:auto}
    }
  `;
  document.head.appendChild(style);
}

function polish() {
  addPrintStyles();
  addExecutiveNotice();
}

new MutationObserver(polish).observe(document.body, { childList: true, subtree: true });
window.setTimeout(polish, 200);
