import { useState, useEffect } from 'react';
import { impactService } from '../../services/impactService';
import type { ImpactData } from '../../mock/impact/mockData';
import { ImpactScore } from '../../components/impact/ImpactScore';
import { ImpactCategoryCard } from '../../components/impact/ImpactCategoryCard';
import { Target } from 'lucide-react';

interface ImpactTabProps {
  investigationId: string;
}

export default function ImpactTab({ investigationId }: ImpactTabProps) {
  const [impactData, setImpactData] = useState<ImpactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await impactService.getImpactForInvestigation(investigationId);
      setImpactData(data);
      setLoading(false);
    }
    load();
  }, [investigationId]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 max-w-5xl">
        <div className="h-40 bg-raven-bg-surface-2 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-64 bg-raven-bg-surface-2 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!impactData) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-raven-border-subtle rounded-lg max-w-5xl">
        <Target size={32} className="mx-auto mb-4 text-raven-text-tertiary" />
        <p className="text-raven-text-primary text-sm font-semibold">
          No impact data calculated for this investigation.
        </p>
        <p className="text-raven-text-secondary text-xs mt-2">
          Reconstruction must complete before impact mapping is available.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-8 pb-12">
      <ImpactScore 
        score={impactData.demonstrationScore} 
        severity={impactData.overallSeverity} 
      />

      <div>
        <h2 className="text-lg font-semibold text-raven-text-primary mb-4">Affected Assets by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {impactData.categories.map((cat, idx) => (
            <ImpactCategoryCard key={idx} data={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}
