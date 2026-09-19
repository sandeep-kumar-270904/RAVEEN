import { MOCK_EVIDENCE_DB } from '../mock/evidence/mockData';
import type { EvidenceRecord } from '../mock/evidence/mockData';

// Mutable store for the session
const store: Record<string, EvidenceRecord[]> = { ...MOCK_EVIDENCE_DB };

export const evidenceService = {
  getEvidenceForInvestigation: async (investigationId: string): Promise<EvidenceRecord[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(store[investigationId] || []);
      }, 500);
    });
  },

  // Simulates uploading and processing
  uploadEvidence: async (
    investigationId: string, 
    file: File, 
    onUpdate: (updatedRecord: EvidenceRecord) => void
  ): Promise<EvidenceRecord> => {
    return new Promise((resolve) => {
      // Deterministic failure if filename includes 'fail'
      const willFail = file.name.toLowerCase().includes('fail');
      
      const newRecord: EvidenceRecord = {
        id: `EV-${Math.floor(Math.random() * 10000)}`,
        investigationId,
        filename: file.name,
        sizeBytes: file.size,
        uploadedAt: new Date().toISOString(),
        status: 'queued',
        progress: 0
      };

      if (!store[investigationId]) {
        store[investigationId] = [];
      }
      
      // Prepend to list
      store[investigationId] = [newRecord, ...store[investigationId]];
      
      // Notify immediate queue
      onUpdate({ ...newRecord });

      // Start upload simulation
      setTimeout(() => {
        newRecord.status = 'uploading';
        let progress = 0;
        
        const uploadInterval = setInterval(() => {
          progress += Math.floor(Math.random() * 20) + 10;
          if (progress >= 100) {
            clearInterval(uploadInterval);
            newRecord.progress = 100;
            newRecord.status = 'processing';
            onUpdate({ ...newRecord });
            
            // Start processing simulation
            setTimeout(() => {
              if (willFail) {
                newRecord.status = 'failed';
                newRecord.errorMessage = 'Simulated validation error. File format unrecognized.';
              } else {
                newRecord.status = 'complete';
              }
              delete newRecord.progress;
              onUpdate({ ...newRecord });
              resolve(newRecord);
            }, 1500);
          } else {
            newRecord.progress = progress;
            onUpdate({ ...newRecord });
          }
        }, 300);
      }, 500);
    });
  }
};
