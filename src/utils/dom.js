export const $ = selector => document.querySelector(selector);
export const $$ = selector => Array.from(document.querySelectorAll(selector));

export function activateView(viewId) {
  $$(".view").forEach(view => view.classList.toggle("active", view.id === viewId));
  $$("#mainNav button").forEach(button => button.classList.toggle("active", button.dataset.view === viewId));
}

export function renderFeedItem([title, body]) {
  return `<div class="feed-item"><strong>${title}</strong><span>${body}</span></div>`;
}
