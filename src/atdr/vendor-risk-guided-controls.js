import './vendor-risk-validators.js';

const STATE_KEY = 'cybershield_vendor_risk_guided_2026061029';
const DEFAULT_STATE = { step: 0, firstName: '', company: '', vendor: 'Vendor X', contradiction: 'all', email: '' };
const STEP_LABELS = ['Identify', 'Recommend', 'Contradict', 'Review', 'Decide', 'Record'];

function readState() {
  try { return { ...DEFAULT_STATE, ...JSON.parse(localStorage.getItem(STATE_KEY) || '{}') }; }
  catch { return { ...DEFAULT_STATE }; }
}

function writeState(state) {
  localStorage.setItem(STATE_KEY, JSON.stringify({ ...readState(), ...state }));
}

function resetDemo() {
  writeState(DEFAULT_STATE);
  location.reload();
}

function regenerateRecord() {
  writeState({ step: 5 });
  location.reload();
}

function installMobilePolishStyles() {
  if (document.querySelector('#guidedMobilePolishStyles')) return;
  const style = document.createElement('style');
  style.id = 'guidedMobilePolishStyles';
  style.textContent = `
    .mobile-step-cue{display:none;border:1px solid rgba(66,215,255,.35);border-left:5px solid var(--blue);background:rgba(66,215,255,.08);border-radius:14px;padding:10px 12px;margin:0 0 12px;color:var(--muted)}
    .mobile-step-cue strong{color:var(--text)}
    @media(max-width:960px){
      body{font-size:15.5px}
      .topbar{position:static;padding:12px 14px;gap:10px}
      .brand{align-items:flex-start}.brand img{width:40px;height:40px}.brand strong{font-size:1rem}.eyebrow{font-size:.68rem;letter-spacing:.06em}
      .topbar .actions{width:100%;display:grid;grid-template-columns:1fr;gap:8px;margin-top:4px}.topbar .actions button{width:100%;min-height:44px}
      .layout{width:min(100vw - 20px,680px);padding:12px 0 30px;gap:12px}.panel,.side{border-radius:16px}.panel{padding:15px}.side{padding:14px}
      .mobile-step-cue{display:block}.stepper{grid-template-columns:repeat(3,1fr)!important;gap:7px;margin:8px 0 12px}.step{min-height:48px;padding:8px 6px;font-size:.78rem;text-align:center}.step .chip{font-size:.68rem}
      h1{font-size:1.48rem}h2{font-size:1.12rem}h3{font-size:1rem}.metric{font-size:1.18rem}.brief-card{padding:11px;margin:8px 0}.callout{padding:10px 12px}
      input,select,button{min-height:44px}.actions{display:grid;grid-template-columns:1fr;gap:8px}.actions button{width:100%}
      .grid2,.grid3{grid-template-columns:1fr!important;gap:9px}.table-wrap{max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}table{min-width:640px}th,td{padding:8px;font-size:.86rem}
    }
    @media(max-width:430px){
      .stepper{grid-template-columns:repeat(2,1fr)!important}.layout{width:calc(100vw - 14px)}.panel{padding:13px}table{min-width:580px}.tag{font-size:.76rem}
    }
  `;
  document.head.appendChild(style);
}

function renderMobileStepCue() {
  const app = document.querySelector('#app');
  if (!app) return;
  const state = readState();
  let cue = document.querySelector('#mobileStepCue');
  if (!cue) {
    cue = document.createElement('div');
    cue.id = 'mobileStepCue';
    cue.className = 'mobile-step-cue';
    app.insertAdjacentElement('afterbegin', cue);
  }
  const stepIndex = Math.max(0, Math.min(STEP_LABELS.length - 1, Number(state.step || 0)));
  cue.innerHTML = `<strong>Step ${stepIndex + 1} of ${STEP_LABELS.length}: ${STEP_LABELS[stepIndex]}</strong><br>Vendor-risk demo path. Keep going until the Trust Decision Record is generated.`;
}

function syncStepClicks() {
  document.querySelectorAll('[data-step]').forEach(button => {
    if (button.dataset.mobilePolishBound === 'true') return;
    button.dataset.mobilePolishBound = 'true';
    button.addEventListener('click', () => {
      const nextStep = Number(button.dataset.step);
      if (!Number.isNaN(nextStep)) writeState({ step: nextStep });
      setTimeout(renderMobileStepCue, 0);
    });
  });
}

function refreshPolish() {
  installMobilePolishStyles();
  renderMobileStepCue();
  syncStepClicks();
}

document.querySelector('#resetDemo')?.addEventListener('click', resetDemo);
document.querySelector('#regenerateTop')?.addEventListener('click', regenerateRecord);
new MutationObserver(refreshPolish).observe(document.body, { childList: true, subtree: true });
refreshPolish();
