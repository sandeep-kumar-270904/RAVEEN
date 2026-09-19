import { MOCK_NARRATIVE_DB } from '../mock/narrative/mockData';
import type { NarrativeData } from '../mock/narrative/mockData';

export const narrativeService = {
  getNarrativeForInvestigation: async (investigationId: string): Promise<NarrativeData | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_NARRATIVE_DB[investigationId] || null);
      }, 500);
    });
  }
};
