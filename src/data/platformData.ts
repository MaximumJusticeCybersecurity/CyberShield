export type Status = 'critical' | 'moderate' | 'resilient';

export const maturityTrend = [
  { month: 'Jan', score: 52 },
  { month: 'Feb', score: 56 },
  { month: 'Mar', score: 61 },
  { month: 'Apr', score: 66 },
  { month: 'May', score: 72 }
];

export const operationalMetrics = [
  { label: 'Cyber Health', value: 72, suffix: '%', status: 'moderate' as Status, detail: 'Evidence-backed readiness is improving, but ownership gaps remain.' },
  { label: 'Governance Stability', value: 64, suffix: '%', status: 'moderate' as Status, detail: 'Some control ownership and policy reviews are aging.' },
  { label: 'AI Governance', value: 48, suffix: '%', status: 'critical' as Status, detail: 'Shadow AI and sensitive data exposure require executive action.' },
  { label: 'Operational Confidence', value: 68, suffix: '%', status: 'moderate' as Status, detail: 'Leadership can act, but evidence maturity is not yet board-ready.' }
];

export const topRisks = [
  {
    title: 'AI usage outside the control boundary',
    impact: 'Potential sensitive data leakage and weak evidentiary defensibility',
    owner: 'CIO + Legal',
    urgency: 'Elevated',
    confidence: 'Medium',
    status: 'critical' as Status
  },
  {
    title: 'Incident response ownership is underdefined',
    impact: 'Slower escalation during ransomware, fraud, or vendor compromise',
    owner: 'COO + Security Lead',
    urgency: 'Moderate',
    confidence: 'High',
    status: 'moderate' as Status
  },
  {
    title: 'Compliance evidence is aging',
    impact: 'Audit readiness declines as evidence, approvals, and control reviews stale out',
    owner: 'Compliance Owner',
    urgency: 'Moderate',
    confidence: 'High',
    status: 'moderate' as Status
  }
];

export const actions = [
  {
    title: 'Establish executive AI governance approval workflow',
    owner: 'CIO + Legal',
    urgency: 'High',
    effort: 'Medium',
    expectedReduction: '18%',
    rationale: 'Current AI usage lacks documented approval, boundary controls, and evidence retention.',
    status: 'critical' as Status
  },
  {
    title: 'Assign named incident decision owners',
    owner: 'CEO + COO',
    urgency: 'High',
    effort: 'Low',
    expectedReduction: '14%',
    rationale: 'A named owner reduces escalation delay and improves response confidence.',
    status: 'critical' as Status
  },
  {
    title: 'Refresh compliance evidence package',
    owner: 'Compliance Lead',
    urgency: 'Medium',
    effort: 'Medium',
    expectedReduction: '11%',
    rationale: 'Evidence older than 90 days weakens audit readiness and executive confidence.',
    status: 'moderate' as Status
  },
  {
    title: 'Create vendor compromise response playbook',
    owner: 'Security + Finance',
    urgency: 'Medium',
    effort: 'Medium',
    expectedReduction: '9%',
    rationale: 'Vendor compromise is a high-likelihood scenario for SMB and mid-market organizations.',
    status: 'moderate' as Status
  }
];

export const governanceTimeline = [
  { date: '2026-01-12', event: 'Baseline cyber readiness assessment completed', status: 'resilient' as Status },
  { date: '2026-02-08', event: 'Incident response policy owner left unassigned', status: 'moderate' as Status },
  { date: '2026-03-18', event: 'AI governance risk surfaced during executive review', status: 'critical' as Status },
  { date: '2026-04-27', event: 'Compliance evidence package exceeded 90-day freshness threshold', status: 'moderate' as Status },
  { date: '2026-05-15', event: 'Action Engine reprioritized AI governance workflow as top action', status: 'critical' as Status }
];

export const reports = [
  'Executive Risk Summary',
  'AI Governance Assessment',
  'Operational Trust Assessment',
  'Board Readiness Brief',
  'Security Roadmap',
  'Compliance Gap Summary'
];
