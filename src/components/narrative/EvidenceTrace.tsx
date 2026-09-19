import { Link, FileText, ArrowRight } from 'lucide-react';
import type { TraceableReference } from '../../mock/narrative/mockData';

interface EvidenceTraceProps {
  trace: TraceableReference;
}

export function EvidenceTrace({ trace }: EvidenceTraceProps) {
  return (
    <div className="bg-raven-bg-base border border-raven-border-subtle rounded-md p-3 my-2 shadow-lg">
      <div className="text-[10px] uppercase tracking-widest text-raven-text-tertiary mb-2 font-bold">
        Traceability Chain
      </div>
      
      <div className="flex items-center gap-3 text-sm flex-wrap">
        
        {/* Narrative Anchor */}
        <div className="flex items-center gap-1.5 px-2 py-1 bg-raven-bg-surface border border-raven-border-strong rounded text-raven-text-primary shrink-0">
          <Link size={12} className="text-raven-accent" />
          <span>Statement</span>
        </div>
        
        <ArrowRight size={14} className="text-raven-text-tertiary shrink-0" />
        
        {/* Timeline Event Link */}
        {trace.timelineId && (
          <>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-raven-bg-surface-2 hover:bg-raven-bg-surface-3 transition-colors border border-raven-border-subtle rounded text-raven-text-primary cursor-pointer shrink-0">
              <span className="font-mono text-xs">{trace.timelineId}</span>
            </div>
            <ArrowRight size={14} className="text-raven-text-tertiary shrink-0" />
          </>
        )}
        
        {/* Original Evidence Link */}
        <div className="flex items-center gap-1.5 px-2 py-1 bg-raven-bg-surface-2 hover:bg-raven-bg-surface-3 transition-colors border border-raven-border-subtle rounded text-raven-text-primary cursor-pointer shrink-0">
          <FileText size={12} className="text-raven-text-tertiary" />
          <span className="font-mono text-xs">{trace.evidenceId}</span>
        </div>

      </div>
      
      <p className="mt-3 text-xs text-raven-text-secondary border-t border-raven-border-subtle/50 pt-2">
        <span className="font-medium text-raven-text-primary">Extracted context:</span> {trace.description}
      </p>
    </div>
  );
}
