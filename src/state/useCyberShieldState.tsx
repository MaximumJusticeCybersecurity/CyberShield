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

type CyberShieldState = {
  activeView: string;
  setActiveView: (view: string) => void;
  advisor: AdvisorContext;
  setAdvisor: (advisor: AdvisorContext) => void;
};

const defaultAdvisor: AdvisorContext = {
  title: 'Executive Operational Intelligence',
  status: 'moderate',
  meaning: 'CyberShield is synthesizing cyber readiness, AI governance, ownership, and evidence maturity into decision intelligence.',
  why: 'Leadership needs clarity on what matters, what happens next, and who owns the response.',
  next: 'Review the top three operational risks and confirm executive ownership.',
  mjc: 'MJC can translate these findings into an executive CyberShield Review, roadmap, and governance operating model.'
};

const CyberShieldContext = React.createContext<CyberShieldState | undefined>(undefined);

export function CyberShieldProvider({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = React.useState('overview');
  const [advisor, setAdvisor] = React.useState(defaultAdvisor);

  return (
    <CyberShieldContext.Provider value={{ activeView, setActiveView, advisor, setAdvisor }}>
      {children}
    </CyberShieldContext.Provider>
  );
}

export function useCyberShield() {
  const context = React.useContext(CyberShieldContext);
  if (!context) throw new Error('useCyberShield must be used inside CyberShieldProvider');
  return context;
}
