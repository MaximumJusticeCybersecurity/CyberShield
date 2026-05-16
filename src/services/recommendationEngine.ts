import { actions } from '../data/platformData';

const urgencyWeight: Record<string, number> = { High: 3, Medium: 2, Low: 1 };
const statusWeight: Record<string, number> = { critical: 3, moderate: 2, resilient: 1 };

export function getPrioritizedActions() {
  return [...actions].sort((a, b) => {
    const aScore = urgencyWeight[a.urgency] + statusWeight[a.status];
    const bScore = urgencyWeight[b.urgency] + statusWeight[b.status];
    return bScore - aScore;
  });
}
