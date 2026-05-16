import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { operationalMetrics, topRisks, governanceTimeline } from '../data/platformData';
import { MetricCard } from './MetricCard';
import { AdvisorPane } from './AdvisorPane';
import { getPrioritizedActions } from '../services/recommendationEngine';
import { maturityTrend } from '../data/platformData';
import { useCyberShield } from '../state/useCyberShieldState';

export function Dashboard() {
  const { activeView, setAdvisor } = useCyberShield();
  const prioritized = getPrioritizedActions();

  return (
    <main className="dashboard-shell">
      <section className="metrics-strip">
        {operationalMetrics.map(metric => <MetricCard key={metric.label} {...metric} />)}
      </section>

      <section className="workspace-grid">
        <div className="panel priority-panel">
          <p className="eyebrow">Executive Priority Center</p>
          <h2>{activeView === 'action' ? 'Next-Best-Action Queue' : 'Top Operational Risks'}</h2>
          {(activeView === 'action' ? prioritized : topRisks).map((item: any) => (
            <button
              key={item.title}
              className={`risk-card ${item.status}`}
              onClick={() => setAdvisor({
                title: item.title,
                status: item.status,
                meaning: item.impact || item.rationale,
                why: `Owner: ${item.owner}. Urgency: ${item.urgency}. Confidence: ${item.confidence || 'Evidence-aware'}.`,
                next: item.rationale ? item.rationale : 'Assign ownership and convert this risk into a dated roadmap action.',
                mjc: 'MJC can provide vCISO-level execution guidance, executive translation, and governance operating model support.'
              })}
            >
              <span className="status-dot" />
              <div>
                <strong>{item.title}</strong>
                <p>{item.impact || item.rationale}</p>
                <small>Owner: {item.owner} · Urgency: {item.urgency}</small>
              </div>
            </button>
          ))}
        </div>

        <div className="panel intelligence-panel">
          <p className="eyebrow">Operational Intelligence Layer</p>
          <h2>{viewTitle(activeView)}</h2>
          {activeView === 'memory' ? <GovernanceMemory /> : activeView === 'ai' ? <AIGovernance /> : activeView === 'reports' ? <Reports /> : <OverviewChart />}
        </div>

        <AdvisorPane />
      </section>
    </main>
  );
}

function viewTitle(view: string) {
  const titles: Record<string, string> = {
    overview: 'Resilience Maturity Progression',
    action: 'Action Engine Logic',
    memory: 'Governance Memory Timeline',
    ai: 'AI Governance Control Boundary',
    reports: 'Executive Reporting Center'
  };
  return titles[view] || 'Operational Intelligence';
}

function OverviewChart() {
  return (
    <div className="chart-block">
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={maturityTrend}>
          <XAxis dataKey="month" stroke="rgba(255,255,255,.55)" />
          <YAxis stroke="rgba(255,255,255,.55)" domain={[40, 90]} />
          <Tooltip contentStyle={{ background: '#101b2f', border: '1px solid rgba(255,255,255,.15)', color: '#fff' }} />
          <Line type="monotone" dataKey="score" stroke="#7dd3fc" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
      <p>CyberShield is tracking improvement, but AI governance and ownership clarity remain the next operational constraints.</p>
    </div>
  );
}

function GovernanceMemory() {
  return (
    <div className="timeline-list">
      {governanceTimeline.map(item => <div key={item.date} className={`timeline-item ${item.status}`}><strong>{item.date}</strong><span>{item.event}</span></div>)}
    </div>
  );
}

function AIGovernance() {
  return (
    <div className="ai-grid">
      {['Shadow AI Risk', 'Prompt Leakage', 'Autonomy Exposure', 'Human Oversight', 'Evidence Retention', 'AI Vendor Governance'].map((label, index) => (
        <div key={label} className={`mini-card ${index < 3 ? 'critical' : 'moderate'}`}><strong>{label}</strong><p>{index < 3 ? 'Elevated' : 'Developing'}</p></div>
      ))}
      <div className="boundary-card">Control Boundary: AI systems require named owners, approval gates, evidence retention, and sensitive-data restrictions.</div>
    </div>
  );
}

function Reports() {
  const names = ['Executive Risk Summary', 'AI Governance Assessment', 'Operational Trust Assessment', 'Board Readiness Brief', 'Security Roadmap', 'Compliance Gap Summary'];
  return <div className="report-grid">{names.map(name => <button key={name} onClick={() => window.print()}>{name}<span>Preview / Print PDF</span></button>)}</div>;
}
