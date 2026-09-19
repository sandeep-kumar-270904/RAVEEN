import { useState, useEffect } from 'react';
import { timelineService } from '../../services/timelineService';
import { Timeline } from '../../components/timeline/Timeline';
import type { TimelineEventRecord } from '../../mock/timeline/mockData';
import { Clock } from 'lucide-react';
import { LoadingState } from '../../components/states/LoadingState';
import { EmptyState } from '../../components/states/EmptyState';

interface TimelineTabProps {
  investigationId: string;
}

export default function TimelineTab({ investigationId }: TimelineTabProps) {
  const [events, setEvents] = useState<TimelineEventRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await timelineService.getTimelineForInvestigation(investigationId);
      setEvents(data);
      setLoading(false);
    }
    load();
  }, [investigationId]);

  if (loading) {
    return <LoadingState message="Reconstructing timeline..." />;
  }

  if (events.length === 0) {
    return (
      <EmptyState 
        icon={<Clock size={48} />}
        title="No Timeline Events"
        description="No events have been correlated for this investigation yet."
      />
    );
  }

  return (
    <div className="pb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded bg-raven-bg-surface-2 border border-raven-border-subtle text-raven-text-primary">
          <Clock size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-raven-text-primary">Correlated Attack Timeline</h2>
          <p className="text-sm text-raven-text-secondary">Chronological sequence of reconstructed events</p>
        </div>
      </div>
      
      <Timeline events={events} />
    </div>
  );
}
