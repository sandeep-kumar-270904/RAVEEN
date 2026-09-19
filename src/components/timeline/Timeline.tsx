import { TimelineEvent } from './TimelineEvent';
import type { TimelineEventRecord } from '../../mock/timeline/mockData';

export function Timeline({ events }: { events: TimelineEventRecord[] }) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-raven-border-subtle rounded-lg max-w-4xl">
        <p className="text-raven-text-tertiary text-sm">
          No events recorded in this timeline yet.
        </p>
      </div>
    );
  }

  // Ensure chronological order
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="max-w-4xl relative pt-2">
      {sortedEvents.map((event, idx) => (
        <TimelineEvent 
          key={event.id} 
          event={event} 
          isLast={idx === sortedEvents.length - 1} 
        />
      ))}
    </div>
  );
}
