import { Header } from './components/Header';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { CyberShieldProvider } from './state/useCyberShieldState';
import './styles/global.css';

export default function App() {
  return (
    <CyberShieldProvider>
      <div className="app-shell">
        <Header />
        <Landing />
        <Dashboard />
      </div>
    </CyberShieldProvider>
  );
}
