import { FolderTree, Cpu, Globe, Box } from 'lucide-react';
import type { ImpactCategoryData } from '../../mock/impact/mockData';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { EvidenceReference } from '../reconstruction/EvidenceReference';

function getCategoryIcon(category: string) {
  switch (category) {
    case 'Files': return FolderTree;
    case 'Processes': return Cpu;
    case 'Network Activity': return Globe;
    default: return Box;
  }
}

export function ImpactCategoryCard({ data }: { data: ImpactCategoryData }) {
  const Icon = getCategoryIcon(data.category);

  return (
    <Card className="flex flex-col h-full border-raven-border-subtle hover:border-raven-border-strong transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-raven-bg-surface-2 border border-raven-border-subtle text-raven-text-primary">
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-raven-text-primary leading-tight">{data.category}</h3>
            <span className="text-xs text-raven-text-tertiary">Asset Category</span>
          </div>
        </div>
        <Badge type="severity" value={data.severity} label={data.severity.toUpperCase()} />
      </div>

      <div className="flex items-baseline gap-2 mb-4 border-b border-raven-border-subtle pb-4">
        <span className="text-3xl font-mono font-bold text-raven-text-primary">
          {data.affectedCount.toLocaleString()}
        </span>
        <span className="text-sm font-medium text-raven-text-secondary">affected items</span>
      </div>

      <p className="text-sm text-raven-text-primary flex-1 mb-6">
        {data.description}
      </p>

      {data.evidenceRefs.length > 0 && (
        <div className="mt-auto pt-3 border-t border-raven-border-subtle/50 flex flex-wrap items-center gap-2">
          <span className="text-xs text-raven-text-tertiary mr-1 uppercase tracking-wider font-semibold">Supporting Evidence:</span>
          {data.evidenceRefs.map(ref => (
            <EvidenceReference key={ref.id} reference={ref} />
          ))}
        </div>
      )}
    </Card>
  );
}
