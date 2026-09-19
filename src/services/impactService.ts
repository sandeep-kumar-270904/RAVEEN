import { MOCK_IMPACT_DB } from '../mock/impact/mockData';
import type { ImpactData } from '../mock/impact/mockData';

export const impactService = {
  getImpactForInvestigation: async (investigationId: string): Promise<ImpactData | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_IMPACT_DB[investigationId] || null);
      }, 500);
    });
  }
};
