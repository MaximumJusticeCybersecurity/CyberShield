import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; message: string };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message || 'Unknown render error' };
  }

  componentDidCatch(error: Error) {
    console.error('CyberShield render failure:', error);
  }

  resetApplication = () => {
    try {
      localStorage.removeItem('cybershield:vnext');
      sessionStorage.clear();
    } catch (error) {
      console.warn('Storage cleanup failed:', error);
    }
    window.location.href = `${window.location.pathname}${window.location.search}`;
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="fatal-shell">
        <img src="./assets/mjc-logo-2026.png" alt="Maximum Justice Cybersecurity logo" className="fatal-logo" />
        <h1>CyberShield recovered from a bad state.</h1>
        <p>The prior session data could not be rendered safely. Resetting will clear local demo state and reload a clean dashboard.</p>
        <code>{this.state.message}</code>
        <button onClick={this.resetApplication}>Clear local state and reload</button>
      </main>
    );
  }
}
