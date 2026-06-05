function addOnce(root, id, html, beforeText) {
  if (!root || root.querySelector(`#${id}`)) return;
  const section = document.createElement('section');
  section.id = id;
  section.innerHTML = html;
  const marker = [...root.querySelectorAll('h2')].find(h => h.textContent.includes(beforeText));
  if (marker) marker.insertAdjacentElement('beforebegin', section);
  else root.appendChild(section);
}

function textAfter(root, label, fallback) {
  const node = [...root.querySelectorAll('p')].find(p => p.textContent.includes(label));
  return node ? node.textContent.replace(label, '').trim() : fallback;
}

function polishBrief() {
  const root = document.querySelector('#printDoc .print-page');
  if (!root) return;
  const action = textAfter(root, 'CyberShield Recommended Action:', 'Request Evidence');
  const risk = textAfter(root, 'Risk If Wrong:', 'High');
  const confidence = textAfter(root, 'Confidence Band:', 'Low confidence');
  const human = textAfter(root, 'Human Selected Action:', 'Not recorded');
  const override = textAfter(root, 'Override Status:', 'No human decision recorded');

  addOnce(root, 'v16-posture', `
    <div class="print-callout">
      <h3>Decision Posture</h3>
      <p><strong>Decision Readiness:</strong> Not Defensible Yet</p>
      <p><strong>CyberShield Recommended Action:</strong> ${action}</p>
      <p><strong>Human Selected Action:</strong> ${human}</p>
      <p><strong>Override Status:</strong> ${override}</p>
      <p><strong>Risk If Wrong:</strong> ${risk}</p>
      <p><strong>Confidence Band:</strong> ${confidence}</p>
    </div>`, 'Executive Summary');

  addOnce(root, 'v16-summary', `
    <h2>Executive Decision Assurance Summary</h2>
    <p>CyberShield reviewed an AI-generated recommendation to approve Vendor X. The recommendation is not defensible as written because the available evidence does not prove the evaluated AI service is covered by the provided SOC 2 materials, does not resolve customer data-use ambiguity, and does not provide complete AI subprocessor visibility. CyberShield recommends ${action} before approval.</p>
    <div class="print-callout">
      <h3>Key Findings</h3>
      <ul>
        <li>SOC 2 exists, but evaluated AI service scope is unclear.</li>
        <li>Customer data-use language requires additional review.</li>
        <li>AI analytics subprocessors are not fully identified.</li>
        <li>Business urgency does not reduce evidence requirements.</li>
        <li>Human review is required before approval.</li>
      </ul>
    </div>`, 'Recommendation Under Review');

  addOnce(root, 'v16-contradictions', `
    <h2>Executive Contradiction Table</h2>
    <table>
      <thead><tr><th>Claim</th><th>Evidence Conflict</th><th>Why It Matters</th><th>Required Next Step</th></tr></thead>
      <tbody>
        <tr><td>SOC 2 supports approval</td><td>The evaluated AI service is not clearly in scope.</td><td>Approval should not rely on a report unless the reviewed service is covered.</td><td>Request scope confirmation for the evaluated service.</td></tr>
        <tr><td>Customer data terms are acceptable</td><td>Provided language allows service improvement use.</td><td>Data-use ambiguity can change the decision posture.</td><td>Clarify data-use limits before approval.</td></tr>
        <tr><td>Subprocessor visibility is acceptable</td><td>AI analytics providers are not fully named.</td><td>Unknown providers create incomplete third-party visibility.</td><td>Request the complete AI provider list.</td></tr>
        <tr><td>Fast approval is justified</td><td>Business urgency is context, not evidence.</td><td>Timeline pressure does not replace decision evidence.</td><td>Route unresolved gaps to accountable reviewers.</td></tr>
      </tbody>
    </table>`, 'Material Claims');

  addOnce(root, 'v16-evidence-table', `
    <h2>Evidence Sufficiency Table</h2>
    <table>
      <thead><tr><th>Evidence Item</th><th>What It Supports</th><th>Sufficiency</th><th>Caveat</th></tr></thead>
      <tbody>
        <tr><td>SOC 2 Summary</td><td>SOC 2 existence</td><td>Partially supportive</td><td>Does not prove AI service scope.</td></tr>
        <tr><td>SOC 2 Scope Excerpt</td><td>Service coverage</td><td>Insufficient</td><td>AI service is not expressly listed.</td></tr>
        <tr><td>Encryption Architecture Note</td><td>Encryption claim</td><td>Partially sufficient</td><td>Metadata and log handling still need review.</td></tr>
        <tr><td>DPA Excerpt</td><td>Data-use terms</td><td>Ambiguous</td><td>Allows service improvement use.</td></tr>
        <tr><td>Subprocessor List</td><td>Third-party visibility</td><td>Insufficient</td><td>AI analytics providers are not fully identified.</td></tr>
      </tbody>
    </table>`, 'Material Claims');

  const limitationsHeader = [...root.querySelectorAll('h2')].find(h => h.textContent.trim() === 'Limitations');
  if (limitationsHeader && !root.querySelector('#v16-limit-1')) {
    const list = limitationsHeader.nextElementSibling;
    if (list && list.tagName === 'UL') {
      ['This record does not approve the vendor.', 'This record does not certify compliance.', 'This record documents the evidence available at the time of review.'].reverse().forEach((text, i) => {
        const li = document.createElement('li');
        li.id = i === 0 ? 'v16-limit-1' : '';
        li.textContent = text;
        list.insertBefore(li, list.firstChild);
      });
    }
  }
}

const host = document.querySelector('#printDoc');
if (host) new MutationObserver(polishBrief).observe(host, { childList: true, subtree: true });
window.addEventListener('beforeprint', polishBrief);
setTimeout(polishBrief, 300);
