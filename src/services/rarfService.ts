import { MOCK_RARF_DB } from '../mock/rarf/mockData';
import type { RARFDocument } from '../types/rarf';

export const rarfService = {
  getRARFDocument: async (investigationId: string): Promise<RARFDocument | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_RARF_DB[investigationId] || null);
      }, 500);
    });
  }
};
