import { MOCK_INVESTIGATIONS, MOCK_STATS, MOCK_ACTIVITY } from '../mock/investigations/mockData';
import type { Investigation, ActivityItem } from '../mock/investigations/mockData';

export const investigationService = {
  getDashboardStats: async (): Promise<typeof MOCK_STATS> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_STATS), 600); // simulate network
    });
  },

  getRecentInvestigations: async (): Promise<Investigation[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_INVESTIGATIONS), 800);
    });
  },

  getActivityFeed: async (): Promise<ActivityItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_ACTIVITY), 700);
    });
  }
};
