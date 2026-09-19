import { useState, useEffect } from 'react';
import { timelineService } from '../../services/timelineService';
import { Timeline } from '../../components/timeline/Timeline';
import type { TimelineEventRecord } from '../../mock/timeline/mockData';
import { Clock } from 'lucide-react';

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
    return (
      <div className="animate-pulse space-y-4 max-w-4xl">
        <div className="h-10 bg-raven-bg-surface-2 rounded-md mb-8 max-w-md" />
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-raven-bg-surface-2 shrink-0" />
            <div className="flex-1 h-12 bg-raven-bg-surface-2 rounded-md mb-2" />
          </div>
        ))}
      </div>
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
