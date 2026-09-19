import { useState, useEffect } from 'react';
import { impactService } from '../../services/impactService';
import type { ImpactData } from '../../mock/impact/mockData';
import { ImpactScore } from '../../components/impact/ImpactScore';
import { ImpactCategoryCard } from '../../components/impact/ImpactCategoryCard';
import { LoadingState } from '../../components/states/LoadingState';
import { EmptyState } from '../../components/states/EmptyState';
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
    return <LoadingState message="Calculating impact metrics..." />;
  }

  if (!impactData) {
    return (
      <EmptyState 
        icon={<Target size={48} />}
        title="No Impact Data Calculated"
        description="Reconstruction must complete before impact mapping is available."
      />
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
