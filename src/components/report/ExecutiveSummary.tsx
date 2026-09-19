import type { Investigation } from '../../mock/investigations/mockData';
import { Badge } from '../ui/Badge';

interface ExecutiveSummaryProps {
  investigation: Investigation;
  summaryText: string;
}

export function ExecutiveSummary({ investigation, summaryText }: ExecutiveSummaryProps) {
  return (
    <div className="bg-raven-bg-surface-2 p-6 rounded-lg border border-raven-border-subtle mb-6">
      <div className="flex flex-wrap gap-x-12 gap-y-4 mb-6">
        <div>
          <div className="text-xs text-raven-text-tertiary uppercase tracking-wider mb-1">Investigation ID</div>
          <div className="font-mono text-raven-text-primary font-bold">{investigation.id}</div>
        </div>
        <div>
          <div className="text-xs text-raven-text-tertiary uppercase tracking-wider mb-1">Status</div>
          <Badge type="status" value={investigation.status} label={investigation.status.toUpperCase()} />
        </div>
        <div>
          <div className="text-xs text-raven-text-tertiary uppercase tracking-wider mb-1">Severity</div>
          <Badge type="severity" value={investigation.severity} label={investigation.severity.toUpperCase()} />
        </div>
        <div>
          <div className="text-xs text-raven-text-tertiary uppercase tracking-wider mb-1">Date Created</div>
          <div className="text-raven-text-primary">{new Date(investigation.createdAt).toLocaleDateString()}</div>
        </div>
      </div>
      
      <div>
        <div className="text-xs text-raven-text-tertiary uppercase tracking-wider mb-2">Summary</div>
        <p className="text-raven-text-primary leading-relaxed">
          {summaryText}
        </p>
      </div>
    </div>
  );
}
