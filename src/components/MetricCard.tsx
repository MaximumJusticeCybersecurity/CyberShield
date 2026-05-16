import type { Status } from '../data/platformData';
import { describeScore } from '../services/scoringEngine';
import { useCyberShield } from '../state/useCyberShieldState';

export function MetricCard({ label, value, suffix, status, detail }: { label: string; value: number; suffix: string; status: Status; detail: string }) {
  const { setAdvisor } = useCyberShield();
  return (
    <button
      className={`metric-card ${status}`}
      onClick={() => setAdvisor({
        title: label,
        status,
        meaning: detail,
        why: describeScore(value),
        next: value < 55 ? 'Assign an executive owner and create an immediate mitigation action.' : 'Confirm ownership and convert the signal into roadmap execution.',
        mjc: 'MJC can validate this score through an executive review and convert it into a practical governance roadmap.'
      })}
    >
      <span>{label}</span>
      <strong>{value}{suffix}</strong>
      <small>{describeScore(value)}</small>
    </button>
  );
}
