import { MOCK_INVESTIGATIONS, MOCK_STATS, MOCK_ACTIVITY } from '../mock/investigations/mockData';
import type { Investigation, ActivityItem, Severity } from '../mock/investigations/mockData';

// Mutable in-memory store for the session to simulate CRUD
let store = [...MOCK_INVESTIGATIONS];

export const investigationService = {
  getDashboardStats: async (): Promise<typeof MOCK_STATS> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_STATS), 600));
  },

  getRecentInvestigations: async (): Promise<Investigation[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(store.slice(0, 5)), 800));
  },

  getAllInvestigations: async (): Promise<Investigation[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...store]), 500));
  },

  getInvestigation: async (id: string): Promise<Investigation | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(store.find(inv => inv.id === id));
      }, 400);
    });
  },

  createInvestigation: async (title: string, severity: Severity, analyst: string): Promise<Investigation> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newInv: Investigation = {
          id: `INV-2023-${(892 + Math.floor(Math.random() * 100)).toString().padStart(4, '0')}`,
          title,
          severity,
          status: 'pending',
          createdAt: new Date().toISOString(),
          analyst,
          evidenceStatus: 'Pending Upload',
          attackSessionStatus: 'Identifying',
          reportStatus: 'Not Started'
        };
        store = [newInv, ...store];
        resolve(newInv);
      }, 700);
    });
  },

  getActivityFeed: async (): Promise<ActivityItem[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_ACTIVITY), 700));
  }
};
