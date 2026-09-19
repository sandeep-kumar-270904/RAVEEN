import { useState, useEffect } from 'react';
import { DropZone } from '../../components/evidence/DropZone';
import { EvidenceList } from '../../components/evidence/EvidenceList';
import { evidenceService } from '../../services/evidenceService';
import { useNotification } from '../../contexts/NotificationContext';
import { LoadingState } from '../../components/states/LoadingState';
import type { EvidenceRecord } from '../../mock/evidence/mockData';

interface EvidenceProps {
  investigationId: string;
}

export default function EvidenceTab({ investigationId }: EvidenceProps) {
  const [records, setRecords] = useState<EvidenceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotification();

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
          // Check for transitions to fire notifications
          const existing = prev.find(r => r.id === updatedRecord.id);
          
          if (updatedRecord.status === 'complete' && existing?.status !== 'complete') {
            notify({
              type: 'success',
              title: 'Upload Complete',
              message: `${updatedRecord.filename} processed successfully.`
            });
          } else if (updatedRecord.status === 'failed' && existing?.status !== 'failed') {
            notify({
              type: 'error',
              title: 'Upload Failed',
              message: `${updatedRecord.filename} encountered an error.`
            });
          }

          if (existing) {
            return prev.map(r => r.id === updatedRecord.id ? updatedRecord : r);
          }
          return [updatedRecord, ...prev];
        });
      });
    });
  };

  if (loading) {
    return <LoadingState message="Loading evidence..." />;
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
