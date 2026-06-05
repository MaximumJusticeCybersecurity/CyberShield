function flashDemoStatus(message) {
  let status = document.querySelector('#demoLoadStatus');
  const workspace = document.querySelector('#workspace');
  if (!status && workspace) {
    status = document.createElement('div');
    status.id = 'demoLoadStatus';
    status.setAttribute('role', 'status');
    status.style.cssText = 'position:sticky;top:78px;z-index:30;margin:0 0 12px;padding:10px 14px;border:1px solid rgba(66,215,255,.55);border-left:5px solid #42d7ff;border-radius:12px;background:rgba(66,215,255,.12);color:#f7fbff;font-weight:700;box-shadow:0 10px 28px rgba(0,0,0,.25)';
    workspace.prepend(status);
  }
  if (status) {
    status.textContent = message;
    status.style.display = 'block';
    window.clearTimeout(flashDemoStatus.timer);
    flashDemoStatus.timer = window.setTimeout(() => { status.style.display = 'none'; }, 2600);
  }
}

function selectedDemoLabel() {
  const select = document.querySelector('#demoMode');
  return select?.selectedOptions?.[0]?.textContent?.trim() || 'selected demo';
}

function dispatchSelectedDemoLoad() {
  const select = document.querySelector('#demoMode');
  if (select) {
    select.dispatchEvent(new Event('change', { bubbles: true }));
    flashDemoStatus(`Loaded ${selectedDemoLabel()}.`);
  } else {
    flashDemoStatus('Use the Intake screen demo selector to load a different demo.');
  }
}

function applyDemoRouterFixes() {
  const loadDemoButton = document.querySelector('#loadDemo');
  if (loadDemoButton && !loadDemoButton.dataset.routerFixApplied) {
    loadDemoButton.textContent = 'Load Selected Demo';
    loadDemoButton.dataset.routerFixApplied = 'true';
    loadDemoButton.addEventListener('click', () => {
      window.setTimeout(() => flashDemoStatus(`Loaded ${selectedDemoLabel()}.`), 0);
    }, true);
  }

  const topButton = document.querySelector('#loadDemoTop');
  if (topButton && !topButton.dataset.routerFixApplied) {
    topButton.textContent = 'Reload Current Demo';
    topButton.dataset.routerFixApplied = 'true';
    topButton.addEventListener('click', dispatchSelectedDemoLoad, true);
  }

  const select = document.querySelector('#demoMode');
  if (select && !select.dataset.routerFixApplied) {
    select.dataset.routerFixApplied = 'true';
    select.addEventListener('change', () => {
      window.setTimeout(() => flashDemoStatus(`Loaded ${selectedDemoLabel()}.`), 0);
    });
  }
}

const observer = new MutationObserver(applyDemoRouterFixes);
observer.observe(document.body, { childList: true, subtree: true });
applyDemoRouterFixes();
