import { RotateCcw, ShieldCheck } from 'lucide-react';
import { useCyberShield } from '../state/useCyberShieldState';

const nav = [
  ['overview', 'Overview'],
  ['action', 'Action Center'],
  ['memory', 'Governance Memory'],
  ['ai', 'AI Governance'],
  ['reports', 'Reports']
];

export function Header() {
  const { activeView, setActiveView, resetPlatformData } = useCyberShield();

  return (
    <header className="header-shell">
      <div className="brand-block">
        <img
          src="./assets/mjc-logo-2026.png"
          alt="Maximum Justice Cybersecurity logo"
          className="brand-logo"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
            const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = 'grid';
          }}
        />
        <div className="brand-logo-fallback" aria-hidden="true">MJC</div>
        <div>
          <p className="eyebrow">Maximum Justice Cybersecurity</p>
          <h1>CyberShield</h1>
        </div>
      </div>
      <nav className="nav-tabs" aria-label="CyberShield navigation">
        {nav.map(([id, label]) => (
          <button key={id} className={activeView === id ? 'active' : ''} onClick={() => setActiveView(id)}>
            {label}
          </button>
        ))}
      </nav>
      <div className="header-actions">
        <button className="reset-btn" onClick={resetPlatformData} title="Reset demo data safely">
          <RotateCcw size={16} /> Reset
        </button>
        <div className="header-status"><ShieldCheck size={18} /> Decision Intelligence MVP</div>
      </div>
    </header>
  );
}
