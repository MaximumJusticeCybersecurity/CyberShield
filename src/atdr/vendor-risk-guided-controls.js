const STATE_KEY = 'cybershield_vendor_risk_guided_2026061029';
const DEFAULT_STATE = { step: 0, firstName: '', company: '', vendor: 'Vendor X', contradiction: 'all', email: '' };

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

document.querySelector('#resetDemo')?.addEventListener('click', resetDemo);
document.querySelector('#regenerateTop')?.addEventListener('click', regenerateRecord);
