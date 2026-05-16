import { ArrowRight, Brain, FileText, Route, ShieldCheck } from 'lucide-react';

export function Landing() {
  return (
    <section className="landing-grid">
      <div className="hero-card">
        <p className="eyebrow">Executive cyber decision intelligence</p>
        <h2>Cybersecurity is not only a technical problem. It is an operational trust problem.</h2>
        <p className="hero-copy">
          CyberShield transforms cybersecurity, AI governance, compliance exposure, ownership gaps, and operational readiness into clear executive decisions, assigned next actions, and board-ready reporting.
        </p>
        <div className="hero-actions">
          <button className="primary-btn">Schedule Executive CyberShield Review <ArrowRight size={16} /></button>
          <button className="secondary-btn">View Executive Walkthrough</button>
        </div>
      </div>
      <div className="workflow-card">
        <h3>How CyberShield Works</h3>
        <div className="workflow-step"><ShieldCheck /> Profile cyber readiness and control maturity</div>
        <div className="workflow-step"><Brain /> Evaluate AI governance inside the control boundary</div>
        <div className="workflow-step"><Route /> Prioritize next-best-actions and ownership</div>
        <div className="workflow-step"><FileText /> Generate executive-ready reporting</div>
      </div>
    </section>
  );
}
