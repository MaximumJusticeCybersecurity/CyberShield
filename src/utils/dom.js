export const $ = selector => document.querySelector(selector);
export const $$ = selector => Array.from(document.querySelectorAll(selector));

export function activateView(viewId) {
  $$(".view").forEach(view => view.classList.toggle("active", view.id === viewId));
  $$("#mainNav button").forEach(button => button.classList.toggle("active", button.dataset.view === viewId));
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderFeedItem([title, body, status = ""]) {
  const statusText = status ? `<span class="status">${escapeHtml(status)}</span>` : "";
  return `<div class="row" role="group"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(body)}</span>${statusText}</div>`;
}
