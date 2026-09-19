import { Info } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ImpactScoreProps {
  score: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export function ImpactScore({ score, severity }: ImpactScoreProps) {
  let color = 'text-raven-text-primary';
  if (severity === 'critical') color = 'text-raven-severity-critical';
  if (severity === 'high') color = 'text-raven-severity-high';
  if (severity === 'medium') color = 'text-raven-severity-medium';
  if (severity === 'low') color = 'text-raven-severity-low';

  return (
    <Card className="flex flex-col md:flex-row items-center gap-6 justify-between border-raven-border-strong bg-raven-bg-surface-2/30">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center justify-center p-4 w-28 h-28 rounded-full border-[4px] border-raven-bg-surface-3 relative bg-raven-bg-base shadow-inner">
          <span className={`text-4xl font-mono font-bold tracking-tighter ${color}`}>
            {score.toFixed(1)}
          </span>
          <span className="text-[10px] text-raven-text-tertiary font-bold tracking-widest uppercase mt-1">/ 10.0</span>
        </div>
        
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-raven-text-primary">Impact Assessment</h2>
            <Badge type="severity" value={severity} label={severity.toUpperCase()} />
          </div>
          <p className="text-sm text-raven-text-secondary max-w-lg">
            This rating represents the combined severity of compromised assets across the network, filesystems, and core processes.
          </p>
        </div>
      </div>

      <div className="bg-raven-severity-info/10 border border-raven-severity-info/30 text-raven-text-primary p-3 rounded text-xs flex gap-2 items-start max-w-xs shrink-0">
        <Info size={16} className="text-raven-severity-info shrink-0 mt-0.5" />
        <div>
          <strong className="text-raven-severity-info block mb-0.5">Demonstration Score</strong>
          This value is a conceptual demonstration metric. No real mathematical impact formula is currently applied.
        </div>
      </div>
    </Card>
  );
}
