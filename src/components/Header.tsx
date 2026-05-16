import logoUrl from '../assets/MJC Logo 2026.png';
import { ShieldCheck } from 'lucide-react';
import { useCyberShield } from '../state/useCyberShieldState';

const nav = [
  ['overview', 'Overview'],
  ['action', 'Action Center'],
  ['memory', 'Governance Memory'],
  ['ai', 'AI Governance'],
  ['reports', 'Reports']
];

export function Header() {
  const { activeView, setActiveView } = useCyberShield();

  return (
    <header className="header-shell">
      <div className="brand-block">
        <img src={logoUrl} alt="Maximum Justice Cybersecurity logo" className="brand-logo" />
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
      <div className="header-status"><ShieldCheck size={18} /> Decision Intelligence MVP</div>
    </header>
  );
}
