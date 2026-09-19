import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { investigationService } from '../../services/investigationService';
import type { Severity } from '../../mock/investigations/mockData';

export default function InvestigationCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState<Severity>('medium');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setLoading(true);
    try {
      const newInv = await investigationService.createInvestigation(title, severity, 'SOC Analyst');
      navigate(`/investigations/${newInv.id}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/investigations')}
          className="p-1 rounded text-raven-text-tertiary hover:text-raven-text-primary hover:bg-raven-bg-surface-2 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-raven-text-primary">New Investigation</h1>
          <p className="text-sm text-raven-text-secondary mt-1">Initialize a case record</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-raven-text-secondary mb-1">Investigation Title</label>
            <Input 
              placeholder="e.g. Unusual lateral movement on Subnet B" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-raven-text-secondary mb-1">Initial Severity</label>
            <select 
              className="w-full h-9 px-3 rounded bg-raven-bg-surface-2 border border-raven-border-subtle text-raven-text-primary text-sm focus:outline-none focus:border-raven-accent cursor-pointer"
              value={severity}
              onChange={e => setSeverity(e.target.value as Severity)}
            >
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="info">Info</option>
            </select>
            <p className="mt-1 text-xs text-raven-text-tertiary">Severity can be adjusted later as the investigation evolves.</p>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-raven-border-subtle">
            <Button type="button" variant="secondary" onClick={() => navigate('/investigations')}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !title.trim()}>
              {loading ? 'Initializing...' : 'Create Case'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
