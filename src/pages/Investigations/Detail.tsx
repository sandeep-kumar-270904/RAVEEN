import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, User, FileDigit } from 'lucide-react';
import { investigationService } from '../../services/investigationService';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import type { Investigation } from '../../mock/investigations/mockData';
import Placeholder from '../Placeholder';
import EvidenceTab from './Evidence';

const TABS = [
  'Overview',
  'Evidence',
  'Reconstruction',
  'Timeline',
  'Impact Analysis',
  'RARF Viewer',
  'Report'
];

export default function InvestigationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inv, setInv] = useState<Investigation | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    investigationService.getInvestigation(id).then(data => {
      setInv(data || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="text-raven-text-tertiary animate-pulse font-mono text-sm">Loading investigation data...</div>;
  }

  if (!inv) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-raven-text-primary mb-2">Investigation Not Found</h2>
        <p className="text-raven-text-secondary mb-6">No record exists with ID: {id}</p>
        <button onClick={() => navigate('/investigations')} className="text-raven-accent hover:underline">Return to List</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/investigations')} className="p-1 rounded text-raven-text-tertiary hover:text-raven-text-primary hover:bg-raven-bg-surface-2 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <span className="font-mono text-sm text-raven-text-secondary tracking-wider">{inv.id}</span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-raven-text-primary leading-tight">{inv.title}</h1>
          <div className="flex items-center gap-2 shrink-0">
            <Badge type="severity" value={inv.severity} label={inv.severity.toUpperCase()} />
            <Badge type="status" value={inv.status} label={inv.status.charAt(0).toUpperCase() + inv.status.slice(1)} />
          </div>
        </div>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-raven-text-secondary">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-raven-text-tertiary" />
            <span className="font-mono text-xs">{new Date(inv.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={14} className="text-raven-text-tertiary" />
            <span>Lead: {inv.analyst}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileDigit size={14} className="text-raven-text-tertiary" />
            <span>Evtx Status: <span className="text-raven-text-primary">{inv.evidenceStatus || 'Unknown'}</span></span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-raven-border-subtle overflow-x-auto custom-scrollbar">
        <nav className="flex space-x-6 px-1">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab 
                  ? 'border-raven-accent text-raven-accent' 
                  : 'border-transparent text-raven-text-tertiary hover:text-raven-text-primary hover:border-raven-border-strong'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 space-y-4">
              <h3 className="font-semibold text-raven-text-primary border-b border-raven-border-subtle pb-2">Status Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-raven-text-tertiary">Evidence</span>
                  <span className="font-medium text-raven-text-primary">{inv.evidenceStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-raven-text-tertiary">Attack Session</span>
                  <span className="font-medium text-raven-text-primary">{inv.attackSessionStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-raven-text-tertiary">Final Report</span>
                  <span className="font-medium text-raven-text-primary">{inv.reportStatus}</span>
                </div>
              </div>
            </Card>
            <Card className="col-span-1 md:col-span-2 flex items-center justify-center text-raven-text-tertiary min-h-[200px]">
              Overview widgets pending...
            </Card>
          </div>
        )}
        
        {activeTab === 'Evidence' && (
          <EvidenceTab investigationId={inv.id} />
        )}
        
        {activeTab !== 'Overview' && activeTab !== 'Evidence' && (
          <div className="mt-8 border border-dashed border-raven-border-strong rounded-lg p-12 bg-raven-bg-surface/50 text-center">
            <Placeholder title={activeTab} />
            <p className="mt-2 text-sm text-raven-text-tertiary">This module is scheduled for a future development phase.</p>
          </div>
        )}
      </div>
    </div>
  );
}
