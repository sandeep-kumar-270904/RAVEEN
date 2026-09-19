import { useState } from 'react';
import { Link, FileText, ArrowRight } from 'lucide-react';
import type { TraceableReference } from '../../mock/narrative/mockData';

interface EvidenceTraceProps {
  trace: TraceableReference;
}

export function EvidenceTrace({ trace }: EvidenceTraceProps) {
  const [isTracing, setIsTracing] = useState(false);

  const handleTrace = () => {
    if (isTracing) return;
    setIsTracing(true);
    setTimeout(() => setIsTracing(false), 1500);
  };

  return (
    <div className={`relative bg-raven-bg-base border border-raven-border-subtle rounded-md p-3 my-2 shadow-lg overflow-hidden transition-colors duration-400 ${isTracing ? 'bg-raven-pulse/10' : ''}`}>
      
      {/* Animated trace line background effect */}
      {isTracing && (
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-raven-pulse opacity-50 shadow-[0_0_8px_rgba(110,86,245,0.8)] z-0 origin-left animate-in zoom-in-0 slide-in-from-left-full duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
      )}

      <div className="relative z-10 text-[10px] uppercase tracking-widest text-raven-text-tertiary mb-2 font-bold">
        Traceability Chain
      </div>
      
      <div className="relative z-10 flex items-center gap-3 text-sm flex-wrap">
        
        {/* Narrative Anchor */}
        <button 
          onClick={handleTrace}
          className={`flex items-center gap-1.5 px-2 py-1 border rounded text-raven-text-primary shrink-0 transition-all duration-300 ${isTracing ? 'bg-raven-pulse/20 border-raven-pulse shadow-[0_0_15px_rgba(110,86,245,0.4)] scale-[0.98]' : 'bg-raven-bg-surface border-raven-border-strong hover:border-raven-pulse'}`}
        >
          <Link size={12} className={isTracing ? 'text-raven-pulse' : 'text-raven-accent'} />
          <span>Statement</span>
        </button>
        
        <ArrowRight size={14} className={`shrink-0 transition-colors duration-300 ${isTracing ? 'text-raven-pulse delay-100' : 'text-raven-text-tertiary'}`} />
        
        {/* Timeline Event Link */}
        {trace.timelineId && (
          <>
            <button className={`flex items-center gap-1.5 px-2 py-1 transition-all duration-300 border rounded text-raven-text-primary shrink-0 focus-visible:ring-2 focus-visible:ring-raven-pulse focus-visible:outline-none ${isTracing ? 'bg-raven-pulse/20 border-raven-pulse shadow-[0_0_15px_rgba(110,86,245,0.4)] delay-150' : 'bg-raven-bg-surface-2 hover:bg-raven-bg-surface-3 border-raven-border-subtle'}`}>
              <span className="font-mono text-xs">{trace.timelineId}</span>
            </button>
            <ArrowRight size={14} className={`shrink-0 transition-colors duration-300 ${isTracing ? 'text-raven-pulse delay-200' : 'text-raven-text-tertiary'}`} />
          </>
        )}
        
        {/* Original Evidence Link */}
        <button className={`flex items-center gap-1.5 px-2 py-1 transition-all duration-300 border rounded text-raven-text-primary shrink-0 focus-visible:ring-2 focus-visible:ring-raven-pulse focus-visible:outline-none ${isTracing ? 'bg-raven-pulse/20 border-raven-pulse shadow-[0_0_15px_rgba(110,86,245,0.4)] delay-300 scale-105' : 'bg-raven-bg-surface-2 hover:bg-raven-bg-surface-3 border-raven-border-subtle'}`}>
          <FileText size={12} className={isTracing ? 'text-raven-pulse' : 'text-raven-text-tertiary'} />
          <span className="font-mono text-xs">{trace.evidenceId}</span>
        </button>

      </div>
      
      <p className="relative z-10 mt-3 text-xs text-raven-text-secondary border-t border-raven-border-subtle/50 pt-2">
        <span className="font-medium text-raven-text-primary">Extracted context:</span> {trace.description}
      </p>
    </div>
  );
}
