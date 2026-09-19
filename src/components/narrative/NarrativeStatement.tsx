import { useState } from 'react';
import type { NarrativeStatementRecord } from '../../mock/narrative/mockData';
import { EvidenceTrace } from './EvidenceTrace';
import { AlertTriangle } from 'lucide-react';

interface NarrativeStatementProps {
  statement: NarrativeStatementRecord;
}

export function NarrativeStatement({ statement }: NarrativeStatementProps) {
  const [active, setActive] = useState(false);

  const hasEvidence = statement.traces && statement.traces.length > 0;

  return (
    <span className="relative inline-block my-1 mr-1">
      <span 
        className={`inline cursor-pointer transition-colors duration-200 rounded px-1 -ml-1
          ${hasEvidence 
            ? 'hover:bg-raven-accent/20 hover:text-raven-text-primary' 
            : 'text-raven-severity-medium border-b border-dashed border-raven-severity-medium'
          }
          ${active && hasEvidence ? 'bg-raven-accent/20 text-raven-text-primary ring-1 ring-raven-accent/50' : ''}
        `}
        onClick={() => setActive(!active)}
      >
        {statement.text}
      </span>
      
      {!hasEvidence && (
        <span className="inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 rounded bg-raven-severity-medium/10 text-raven-severity-medium text-[10px] font-bold uppercase tracking-wider relative top-[-2px]">
          <AlertTriangle size={10} />
          Needs Evidence
        </span>
      )}

      {active && hasEvidence && (
        <div className="block mt-2 mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {statement.traces.map((trace, idx) => (
            <EvidenceTrace key={idx} trace={trace} />
          ))}
        </div>
      )}
    </span>
  );
}
