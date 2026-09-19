import { useState, useEffect } from 'react';
import { reconstructionService } from '../../services/reconstructionService';
import type { AttackSession } from '../../mock/reconstruction/mockData';
import { AttackStageCard } from '../../components/reconstruction/AttackStage';

import { LoadingState } from '../../components/states/LoadingState';
import { EmptyState } from '../../components/states/EmptyState';

interface ReconstructionProps {
  investigationId: string;
}

export default function ReconstructionTab({ investigationId }: ReconstructionProps) {
  const [session, setSession] = useState<AttackSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await reconstructionService.getReconstructionSession(investigationId);
      setSession(data);
      setLoading(false);
    }
    load();
  }, [investigationId]);

  if (loading) {
    return <LoadingState message="Loading attack reconstruction..." />;
  }

  if (!session) {
    return (
      <EmptyState 
        title="No reconstruction data available"
        description="Evidence must be processed before reconstruction can begin."
      />
    );
  }

  return (
    <div className="max-w-4xl pb-12">
      {/* Overview Card */}
      <div className="bg-raven-bg-surface-2 border border-raven-border-subtle rounded-lg p-5 mb-10">
        <h2 className="text-lg font-semibold text-raven-text-primary mb-2">Reconstruction Overview</h2>
        <p className="text-raven-text-secondary text-sm leading-relaxed">
          {session.summary}
        </p>
      </div>

      {/* Timeline of Stages */}
      <div>
        <h2 className="text-sm font-bold text-raven-text-tertiary uppercase tracking-wider mb-6 ml-16">
          Attack Sequence
        </h2>
        
        <div className="relative">
          {session.stages.map((stage, idx) => (
            <AttackStageCard 
              key={stage.id} 
              stage={stage} 
              isLast={idx === session.stages.length - 1} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
