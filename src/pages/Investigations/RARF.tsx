import { useState, useEffect } from 'react';
import { rarfService } from '../../services/rarfService';
import type { RARFDocument } from '../../types/rarf';
import { RARFViewer } from '../../components/rarf/RARFViewer';
import { LoadingState } from '../../components/states/LoadingState';
import { EmptyState } from '../../components/states/EmptyState';
import { FileJson } from 'lucide-react';

interface RARFTabProps {
  investigationId: string;
}

export default function RARFTab({ investigationId }: RARFTabProps) {
  const [document, setDocument] = useState<RARFDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await rarfService.getRARFDocument(investigationId);
      setDocument(data);
      setLoading(false);
    }
    load();
  }, [investigationId]);

  if (loading) {
    return <LoadingState message="Generating RARF Document..." />;
  }

  if (!document) {
    return (
      <EmptyState 
        icon={<FileJson size={48} />}
        title="No RARF Document Available"
        description="A Risk & Response Framework document has not been generated for this investigation."
      />
    );
  }

  return <RARFViewer document={document} />;
}
