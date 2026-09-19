import { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu, Globe, FileDigit, Settings } from 'lucide-react';
import type { TimelineEventRecord, EventCategory } from '../../mock/timeline/mockData';
import { EvidenceReference } from '../reconstruction/EvidenceReference';

function getCategoryStyles(category: EventCategory) {
  switch (category) {
    case 'Process':
      return { icon: Cpu, color: 'text-raven-severity-high', bg: 'bg-raven-severity-high/10', border: 'border-raven-severity-high/30' };
    case 'Network':
      return { icon: Globe, color: 'text-raven-status-success', bg: 'bg-raven-status-success/10', border: 'border-raven-status-success/30' };
    case 'File':
      return { icon: FileDigit, color: 'text-raven-severity-medium', bg: 'bg-raven-severity-medium/10', border: 'border-raven-severity-medium/30' };
    case 'System':
      return { icon: Settings, color: 'text-raven-severity-info', bg: 'bg-raven-severity-info/10', border: 'border-raven-severity-info/30' };
    default:
      return { icon: Settings, color: 'text-raven-text-tertiary', bg: 'bg-raven-bg-surface-2', border: 'border-raven-border-subtle' };
  }
}

export function TimelineEvent({ event, isLast }: { event: TimelineEventRecord; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const styles = getCategoryStyles(event.category);
  const Icon = styles.icon;

  return (
    <div className="relative flex gap-4 group">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute top-8 left-[15px] bottom-[-16px] w-[2px] bg-raven-border-subtle group-hover:bg-raven-border-strong transition-colors" />
      )}
      
      {/* Node */}
      <div className={`relative shrink-0 flex items-center justify-center w-8 h-8 rounded-full border ${styles.bg} ${styles.border} ${styles.color} z-10 mt-0.5`}>
        <Icon size={14} />
      </div>

      {/* Content */}
      <div className="flex-1 bg-raven-bg-surface border border-raven-border-subtle hover:border-raven-border-strong transition-colors rounded-md mb-4 overflow-hidden">
        
        {/* Header (Clickable for expand) */}
        <div 
          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 cursor-pointer select-none"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-raven-text-tertiary w-20 shrink-0">
              {new Date(event.timestamp).toLocaleTimeString([], { hour12: false })}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${styles.bg} ${styles.color}`}>
              {event.category}
            </span>
            <span className="font-medium text-raven-text-primary text-sm">
              {event.title}
            </span>
          </div>
          
          <div className="flex items-center gap-3 mt-2 sm:mt-0 ml-23 sm:ml-0">
            {event.evidenceRefs.length > 0 && (
              <span className="text-xs text-raven-text-tertiary flex items-center gap-1">
                {event.evidenceRefs.length} ref{event.evidenceRefs.length !== 1 ? 's' : ''}
              </span>
            )}
            <button className="text-raven-text-tertiary hover:text-raven-text-primary transition-colors p-1 rounded hover:bg-raven-bg-surface-2">
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div className="p-3 pt-0 border-t border-raven-border-subtle/50 bg-raven-bg-surface-2/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {event.details.map((detail, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-raven-text-tertiary mb-0.5">{detail.key}</span>
                  <span className="text-sm font-mono text-raven-text-primary bg-raven-bg-base px-2 py-1 rounded border border-raven-border-subtle/50">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            {event.evidenceRefs.length > 0 && (
              <div className="mt-4 pt-3 border-t border-raven-border-subtle/50 flex flex-wrap items-center gap-2">
                <span className="text-xs text-raven-text-tertiary mr-1">Supporting Evidence:</span>
                {event.evidenceRefs.map(ref => (
                  <EvidenceReference key={ref.id} reference={ref} />
                ))}
              </div>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
}
