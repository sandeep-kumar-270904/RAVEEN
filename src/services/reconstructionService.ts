import { MOCK_RECONSTRUCTION_DB } from '../mock/reconstruction/mockData';
import type { AttackSession } from '../mock/reconstruction/mockData';

export const reconstructionService = {
  getReconstructionSession: async (investigationId: string): Promise<AttackSession | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return mock data if exists, otherwise generate a placeholder session
        if (MOCK_RECONSTRUCTION_DB[investigationId]) {
          resolve(MOCK_RECONSTRUCTION_DB[investigationId]);
        } else {
          // If no specific mock exists, return null or a generic empty one
          // We will return null to show an empty state
          resolve(null);
        }
      }, 600);
    });
  }
};
