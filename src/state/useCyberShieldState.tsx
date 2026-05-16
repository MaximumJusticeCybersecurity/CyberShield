import React from 'react';
import type { Status } from '../data/platformData';

type AdvisorContext = {
  title: string;
  status: Status;
  meaning: string;
  why: string;
  next: string;
  mjc: string;
};

type PersistedState = {
  activeView: string;
  advisor?: AdvisorContext;
  resetCount?: number;
};

type CyberShieldState = {
  activeView: string;
  setActiveView: (view: string) => void;
  advisor: AdvisorContext;
  setAdvisor: (advisor: AdvisorContext) => void;
  resetPlatformData: () => void;
  resetCount: number;
};

const STORAGE_KEY = 'cybershield:vnext';
const validViews = new Set(['overview', 'action', 'memory', 'ai', 'reports']);
const validStatuses = new Set(['critical', 'moderate', 'resilient']);

export const defaultAdvisor: AdvisorContext = {
  title: 'Executive Operational Intelligence',
  status: 'moderate',
  meaning: 'CyberShield is synthesizing cyber readiness, AI governance, ownership, and evidence maturity into decision intelligence.',
  why: 'Leadership needs clarity on what matters, what happens next, and who owns the response.',
  next: 'Review the top three operational risks and confirm executive ownership.',
  mjc: 'MJC can translate these findings into an executive CyberShield Review, roadmap, and governance operating model.'
};

function isAdvisor(value: unknown): value is AdvisorContext {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.title === 'string' &&
    typeof candidate.meaning === 'string' &&
    typeof candidate.why === 'string' &&
    typeof candidate.next === 'string' &&
    typeof candidate.mjc === 'string' &&
    typeof candidate.status === 'string' &&
    validStatuses.has(candidate.status)
  );
}

function readPersistedState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { activeView: 'overview', advisor: defaultAdvisor, resetCount: 0 };
    const parsed = JSON.parse(raw) as PersistedState;
    return {
      activeView: validViews.has(parsed.activeView) ? parsed.activeView : 'overview',
      advisor: isAdvisor(parsed.advisor) ? parsed.advisor : defaultAdvisor,
      resetCount: Number.isFinite(parsed.resetCount) ? parsed.resetCount : 0
    };
  } catch (error) {
    console.warn('CyberShield ignored invalid local state:', error);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* no-op */ }
    return { activeView: 'overview', advisor: defaultAdvisor, resetCount: 0 };
  }
}

const CyberShieldContext = React.createContext<CyberShieldState | undefined>(undefined);

export function CyberShieldProvider({ children }: { children: React.ReactNode }) {
  const initial = React.useMemo(() => readPersistedState(), []);
  const [activeView, setActiveViewRaw] = React.useState(initial.activeView);
  const [advisor, setAdvisorRaw] = React.useState(initial.advisor || defaultAdvisor);
  const [resetCount, setResetCount] = React.useState(initial.resetCount || 0);

  React.useEffect(() => {
    const payload: PersistedState = { activeView, advisor, resetCount };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.warn('CyberShield could not persist local state:', error);
    }
  }, [activeView, advisor, resetCount]);

  const setActiveView = React.useCallback((view: string) => {
    setActiveViewRaw(validViews.has(view) ? view : 'overview');
  }, []);

  const setAdvisor = React.useCallback((nextAdvisor: AdvisorContext) => {
    setAdvisorRaw(isAdvisor(nextAdvisor) ? nextAdvisor : defaultAdvisor);
  }, []);

  const resetPlatformData = React.useCallback(() => {
    const cleanState: PersistedState = {
      activeView: 'overview',
      advisor: defaultAdvisor,
      resetCount: resetCount + 1
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanState));
    } catch (error) {
      console.warn('CyberShield reset could not write clean state:', error);
    }
    setActiveViewRaw('overview');
    setAdvisorRaw(defaultAdvisor);
    setResetCount(count => count + 1);
  }, [resetCount]);

  return (
    <CyberShieldContext.Provider value={{ activeView, setActiveView, advisor, setAdvisor, resetPlatformData, resetCount }}>
      {children}
    </CyberShieldContext.Provider>
  );
}

export function useCyberShield() {
  const context = React.useContext(CyberShieldContext);
  if (!context) throw new Error('useCyberShield must be used inside CyberShieldProvider');
  return context;
}
