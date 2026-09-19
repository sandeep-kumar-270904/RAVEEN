import { useState, useEffect } from 'react';
import { DropZone } from '../../components/evidence/DropZone';
import { EvidenceList } from '../../components/evidence/EvidenceList';
import { evidenceService } from '../../services/evidenceService';
import type { EvidenceRecord } from '../../mock/evidence/mockData';

interface EvidenceProps {
  investigationId: string;
}

export default function EvidenceTab({ investigationId }: EvidenceProps) {
  const [records, setRecords] = useState<EvidenceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvidence();
  }, [investigationId]);

  const loadEvidence = async () => {
    setLoading(true);
    const data = await evidenceService.getEvidenceForInvestigation(investigationId);
    setRecords(data);
    setLoading(false);
  };

  const handleFilesSelected = (files: File[]) => {
    files.forEach(file => {
      // Start upload for each file
      evidenceService.uploadEvidence(investigationId, file, (updatedRecord) => {
        setRecords(prev => {
          // Replace if exists, else prepend
          const exists = prev.find(r => r.id === updatedRecord.id);
          if (exists) {
            return prev.map(r => r.id === updatedRecord.id ? updatedRecord : r);
          }
          return [updatedRecord, ...prev];
        });
      });
    });
  };

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-48 bg-raven-bg-surface-2 rounded-lg" />
      <div className="h-20 bg-raven-bg-surface-2 rounded-lg" />
    </div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-raven-text-primary mb-4">Add Evidence</h2>
        <DropZone onFilesSelected={handleFilesSelected} />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-raven-text-primary mb-4">Evidence Files</h2>
        <EvidenceList records={records} />
      </div>
    </div>
  );
}
