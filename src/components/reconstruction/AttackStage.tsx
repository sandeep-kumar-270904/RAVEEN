import { FileSearch, BrainCircuit } from 'lucide-react';
import type { ReconstructionStage } from '../../mock/reconstruction/mockData';
import { ConfidenceIndicator } from './ConfidenceIndicator';
import { EvidenceReference } from './EvidenceReference';

export function AttackStageCard({ stage, isLast }: { stage: ReconstructionStage; isLast: boolean }) {
  const isObserved = stage.category === 'OBSERVED EVIDENCE';
  
  // Choose styles based on observation vs derived derivation
  const containerStyle = isObserved 
    ? 'bg-raven-observed-bg border-raven-observed-border'
    : 'bg-raven-derived-bg border-raven-derived-border';

  const headerTextStyle = isObserved
    ? 'text-raven-observed-text'
    : 'text-raven-derived-text';

  const Icon = isObserved ? FileSearch : BrainCircuit;

  return (
    <div className="relative flex gap-6">
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute top-10 left-[19px] bottom-[-24px] w-0.5 bg-raven-border-subtle" />
      )}
      
      {/* Icon Node */}
      <div className={`relative shrink-0 flex items-center justify-center w-10 h-10 rounded-full border-2 bg-raven-bg-base z-10 ${
        isObserved ? 'border-raven-observed-border text-raven-observed-text' : 'border-raven-derived-border text-raven-derived-text'
      }`}>
        <Icon size={18} />
      </div>

      {/* Card Content */}
      <div className={`flex-1 rounded-md border p-4 mb-6 transition-all ${containerStyle}`}>
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 border-b border-raven-border-subtle/30 pb-3">
          <div>
            <div className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${headerTextStyle}`}>
              {stage.category}
            </div>
            <h3 className="text-lg font-semibold text-raven-text-primary flex items-center gap-2">
              {stage.stageName}
            </h3>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xs font-mono text-raven-text-tertiary">{new Date(stage.timestamp).toLocaleTimeString()}</span>
            <ConfidenceIndicator score={stage.confidence} />
          </div>
        </div>

        {/* Description & Details */}
        <p className="text-sm text-raven-text-primary mb-4">
          {stage.description}
        </p>

        {stage.details.length > 0 && (
          <div className="bg-raven-bg-base/40 rounded p-3 mb-4 border border-raven-border-subtle/30">
            <ul className="space-y-1.5">
              {stage.details.map((detail, idx) => (
                <li key={idx} className="text-xs text-raven-text-secondary flex items-start gap-2">
                  <span className="text-raven-text-tertiary mt-0.5">&bull;</span>
                  <span className="font-mono">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Evidence References */}
        {stage.evidenceRefs.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-raven-border-subtle/30">
            <span className="text-xs font-medium text-raven-text-tertiary uppercase tracking-wider mr-2">References:</span>
            {stage.evidenceRefs.map(ref => (
              <EvidenceReference key={ref.id} reference={ref} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
