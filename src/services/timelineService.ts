import { MOCK_TIMELINE_DB } from '../mock/timeline/mockData';
import type { TimelineEventRecord } from '../mock/timeline/mockData';

export const timelineService = {
  getTimelineForInvestigation: async (investigationId: string): Promise<TimelineEventRecord[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_TIMELINE_DB[investigationId] || []);
      }, 500);
    });
  }
};
