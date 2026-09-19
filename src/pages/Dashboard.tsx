import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, FileSearch, ShieldAlert, Activity, Plus, Upload, FolderOpen, FileText } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { investigationService } from '../services/investigationService';
import type { Investigation, ActivityItem } from '../mock/investigations/mockData';
import { LoadingState } from '../components/states/LoadingState';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [investigations, setInvestigations] = useState<Investigation[]>([]);
  const [feed, setFeed] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [statsData, invData, feedData] = await Promise.all([
          investigationService.getDashboardStats(),
          investigationService.getRecentInvestigations(),
          investigationService.getActivityFeed()
        ]);
        setStats(statsData);
        setInvestigations(invData);
        setFeed(feedData);
      } catch (e) {
        console.error("Failed to load dashboard data", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const statCards = [
    { label: 'Active Investigations', value: stats?.activeInvestigations, icon: FolderOpen, color: 'text-raven-text-primary' },
    { label: 'Critical Severity', value: stats?.criticalSeverity, icon: AlertCircle, color: 'text-raven-severity-critical' },
    { label: 'Recent Detections', value: stats?.recentDetections, icon: ShieldAlert, color: 'text-raven-severity-high' },
    { label: 'Analyzed Sessions', value: stats?.analyzedSessions, icon: Activity, color: 'text-raven-pulse' },
  ];

  if (loading) {
    return <LoadingState message="Loading dashboard metrics..." />;
  }

  // Calculate severity percentages for the stacked bar
  const totalInv = statCards[0].value || 1; // avoid div by 0
  const critPct = Math.round(((stats?.criticalSeverity || 0) / totalInv) * 100);
  const highPct = Math.round(((stats?.recentDetections || 0) / totalInv) * 100); // just using mock data for demo
  const medPct = 100 - critPct - highPct;

  return (
    <div className="space-y-8 pb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-raven-text-primary">Dashboard</h1>
          <p className="text-sm text-raven-text-secondary mt-1">Investigator overview and recent activity</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => navigate('/investigations')} variant="secondary" className="gap-2">
            <Plus size={16} /> New Investigation
          </Button>
          <Button onClick={() => navigate('/evidence')} variant="secondary" className="gap-2">
            <Upload size={16} /> Upload Evidence
          </Button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, i) => (
          <Card key={i} className={`flex flex-col justify-center ${i === 0 ? 'lg:col-span-2' : ''}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs font-medium text-raven-text-secondary uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`text-3xl font-mono font-bold ${stat.color}`}>
                  {stat.value !== undefined ? <AnimatedCounter value={stat.value} /> : '-'}
                </p>
                
                {/* Specific addition: Severity Stacked Bar for the main card */}
                {i === 0 && (
                  <div className="mt-4 pt-4 border-t border-raven-border-subtle">
                    <p className="text-[10px] text-raven-text-tertiary uppercase tracking-wider mb-2">Severity Distribution</p>
                    <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-raven-bg-surface-3">
                      <div className="bg-raven-severity-critical" style={{ width: `${critPct}%` }} title={`Critical: ${critPct}%`} />
                      <div className="bg-raven-severity-high" style={{ width: `${highPct}%` }} title={`High: ${highPct}%`} />
                      <div className="bg-raven-severity-medium" style={{ width: `${medPct}%` }} title={`Medium: ${medPct}%`} />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-2 bg-raven-bg-surface-2 rounded-md border border-raven-border-subtle ml-4 shrink-0">
                <stat.icon size={20} className="text-raven-text-tertiary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Recent Investigations */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-lg font-semibold text-raven-text-primary">Recent Investigations</h2>
            <Button variant="secondary" size="small" onClick={() => navigate('/investigations')}>View All</Button>
          </div>
          
          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-raven-text-tertiary uppercase bg-raven-bg-surface-2/50 border-b border-raven-border-subtle">
                  <tr>
                    <th className="px-5 py-3 font-semibold">ID / Title</th>
                    <th className="px-5 py-3 font-semibold">Severity</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold text-right">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-raven-border-subtle">
                  {investigations.map(inv => (
                    <tr key={inv.id} className="hover:bg-raven-bg-surface-2/50 transition-all duration-150 cursor-pointer group animate-in fade-in slide-in-from-bottom-2" onClick={() => navigate('/investigations')}>
                      <td className="px-5 py-3">
                        <div className="font-mono text-raven-text-secondary group-hover:text-raven-accent transition-colors mb-0.5">{inv.id}</div>
                        <div className="font-medium text-raven-text-primary truncate max-w-[280px] sm:max-w-md">{inv.title}</div>
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
                  ))}
                  {investigations.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-raven-text-tertiary">
                        No recent investigations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-lg font-semibold text-raven-text-primary">Activity Feed</h2>
          </div>
          
          <Card className="flex flex-col gap-4 max-h-[480px] overflow-y-auto custom-scrollbar">
            {feed.map((item, idx) => (
              <div key={item.id} className="relative pl-6 pb-4 last:pb-0">
                {/* Timeline connector */}
                {idx !== feed.length - 1 && (
                  <div className="absolute top-2 left-[7px] bottom-[-16px] w-[2px] bg-raven-border-subtle" />
                )}
                
                {/* Timeline node */}
                <div className={`absolute top-[5px] left-0 w-4 h-4 rounded-full border-2 border-raven-bg-surface flex items-center justify-center 
                  ${item.type === 'detection' ? 'bg-raven-severity-high' : 
                    item.type === 'evidence' ? 'bg-raven-accent' : 
                    item.type === 'report' ? 'bg-raven-severity-low' : 'bg-raven-text-tertiary'}`} 
                />
                
                <div className="text-xs font-mono text-raven-text-tertiary mb-1">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
                <div className="text-sm text-raven-text-primary">
                  {item.description}
                </div>
              </div>
            ))}
            {feed.length === 0 && (
              <div className="text-center py-6 text-raven-text-tertiary text-sm">
                No recent activity.
              </div>
            )}
          </Card>

          {/* Quick Shortcuts */}
          <div className="pt-2 flex gap-3">
            <Button variant="secondary" className="flex-1 text-xs" onClick={() => navigate('/reports')}>
              <FileText size={14} className="mr-2" /> View Reports
            </Button>
            <Button variant="secondary" className="flex-1 text-xs" onClick={() => navigate('/investigations')}>
              <FileSearch size={14} className="mr-2" /> All Cases
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
