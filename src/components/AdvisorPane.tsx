import { useCyberShield } from '../state/useCyberShieldState';

export function AdvisorPane() {
  const { advisor } = useCyberShield();
  return (
    <aside className={`advisor-pane ${advisor.status}`}>
      <p className="eyebrow">Advisor Intelligence Pane</p>
      <h3>{advisor.title}</h3>
      <div className="advisor-section"><strong>What this means</strong><p>{advisor.meaning}</p></div>
      <div className="advisor-section"><strong>Why it matters</strong><p>{advisor.why}</p></div>
      <div className="advisor-section"><strong>Next best action</strong><p>{advisor.next}</p></div>
      <div className="advisor-section"><strong>MJC value add</strong><p>{advisor.mjc}</p></div>
    </aside>
  );
}
