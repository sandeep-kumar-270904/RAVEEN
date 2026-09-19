import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-raven-bg-base p-8 text-raven-text-primary">
      <div className="flex justify-between items-center mb-8 border-b border-raven-border-subtle pb-4">
        <h1 className="text-2xl font-bold">Analyst Dashboard</h1>
        <Button variant="secondary" onClick={logout}>Sign Out</Button>
      </div>
      <p className="text-raven-text-secondary">Welcome to the secure dashboard placeholder.</p>
    </div>
  );
}
