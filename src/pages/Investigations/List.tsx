import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { investigationService } from '../../services/investigationService';
import type { Investigation, Severity } from '../../mock/investigations/mockData';

export default function InvestigationList() {
  const navigate = useNavigate();
  const [investigations, setInvestigations] = useState<Investigation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await investigationService.getAllInvestigations();
      setInvestigations(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = investigations.filter(inv => {
    const matchesSearch = inv.id.toLowerCase().includes(search.toLowerCase()) || 
                          inv.title.toLowerCase().includes(search.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || inv.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-raven-text-primary">Investigations</h1>
          <p className="text-sm text-raven-text-secondary mt-1">Manage and track all security incidents</p>
        </div>
        <Button onClick={() => navigate('/investigations/new')} className="gap-2">
          <Plus size={16} /> Create Investigation
        </Button>
      </div>

      <Card className="p-0 overflow-hidden flex flex-col h-[calc(100vh-200px)]">
        {/* Filters */}
        <div className="p-4 border-b border-raven-border-subtle flex flex-col sm:flex-row gap-4 shrink-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-raven-text-tertiary" size={16} />
            <Input 
              className="pl-9" 
              placeholder="Search by ID or title..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="relative flex items-center shrink-0">
            <Filter className="absolute left-3 text-raven-text-tertiary" size={16} />
            <select 
              className="h-9 pl-9 pr-8 rounded bg-raven-bg-surface-2 border border-raven-border-subtle text-raven-text-primary text-sm focus:outline-none focus:border-raven-accent appearance-none cursor-pointer"
              value={severityFilter}
              onChange={e => setSeverityFilter(e.target.value as Severity | 'all')}
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-auto flex-1 custom-scrollbar">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-raven-text-tertiary uppercase bg-raven-bg-surface-2/50 border-b border-raven-border-subtle sticky top-0 z-10">
              <tr>
                <th className="px-5 py-3 font-semibold">ID / Title</th>
                <th className="px-5 py-3 font-semibold">Severity</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-raven-border-subtle">
              {loading ? (
                // Loading Skeleton
                [1,2,3,4,5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-5 py-4">
                      <div className="h-4 bg-raven-bg-surface-2 rounded w-24 mb-2"></div>
                      <div className="h-4 bg-raven-bg-surface-2 rounded w-64"></div>
                    </td>
                    <td className="px-5 py-4"><div className="h-5 bg-raven-bg-surface-2 rounded w-16"></div></td>
                    <td className="px-5 py-4"><div className="h-5 bg-raven-bg-surface-2 rounded w-20"></div></td>
                    <td className="px-5 py-4"><div className="h-4 bg-raven-bg-surface-2 rounded w-24 ml-auto"></div></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                // Empty State
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-raven-text-tertiary">
                    No investigations match your criteria.
                  </td>
                </tr>
              ) : (
                // Real Data
                filtered.map(inv => (
                  <tr 
                    key={inv.id} 
                    className="hover:bg-raven-bg-surface-2/50 transition-colors cursor-pointer group"
                    onClick={() => navigate(`/investigations/${inv.id}`)}
                  >
                    <td className="px-5 py-3">
                      <div className="font-mono text-raven-text-secondary group-hover:text-raven-accent transition-colors mb-0.5">{inv.id}</div>
                      <div className="font-medium text-raven-text-primary">{inv.title}</div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge type="severity" value={inv.severity} label={inv.severity.toUpperCase()} />
                    </td>
                    <td className="px-5 py-3">
                      <Badge type="status" value={inv.status} label={inv.status.charAt(0).toUpperCase() + inv.status.slice(1)} />
                    </td>
                    <td className="px-5 py-3 text-right text-raven-text-tertiary font-mono text-xs whitespace-nowrap">
                      {new Date(inv.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
