import { operationalMetrics } from '../data/platformData';

export function getBand(score: number): 'Critical' | 'Developing' | 'Resilient' {
  if (score < 55) return 'Critical';
  if (score < 80) return 'Developing';
  return 'Resilient';
}

export function calculateExecutiveConfidence(): number {
  const average = operationalMetrics.reduce((sum, metric) => sum + metric.value, 0) / operationalMetrics.length;
  return Math.round(average);
}

export function describeScore(score: number): string {
  const band = getBand(score);
  if (band === 'Critical') return 'Executive attention required. Control confidence is not yet defensible.';
  if (band === 'Developing') return 'Operational capability exists, but governance consistency needs strengthening.';
  return 'Controls appear operationally mature based on available evidence.';
}
