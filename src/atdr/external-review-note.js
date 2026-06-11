function renderExternalReviewNote() {
  const side = document.querySelector('#side');
  if (!side || document.querySelector('#externalReviewNote')) return;
  const note = document.createElement('section');
  note.id = 'externalReviewNote';
  note.className = 'brief-card';
  note.innerHTML = `
    <span class="label">Controlled Demo Scope</span>
    <p>CyberShield is currently proving one workflow: AI-generated vendor-risk recommendation in, defensible AI Trust Decision Record out.</p>
    <p>This is a static prototype using deterministic analysis logic. It is not a production platform.</p>
    <p><a class="qa-link" href="internal-qa.html">Internal QA hub</a> · <a class="qa-link" href="record-contract.html">Record contract</a> · <a class="qa-link" href="route-manifest.html">Route manifest</a></p>
  `;
  side.appendChild(note);
}

const observer = new MutationObserver(renderExternalReviewNote);
observer.observe(document.body, { childList: true, subtree: true });
renderExternalReviewNote();

export { renderExternalReviewNote };
