import { useState, useEffect } from 'react';
import { rarfService } from '../../services/rarfService';
import type { RARFDocument } from '../../types/rarf';
import { RARFViewer } from '../../components/rarf/RARFViewer';
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
    return (
      <div className="animate-pulse space-y-4 max-w-4xl">
        <div className="h-24 bg-raven-bg-surface-2 rounded-lg mb-6" />
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-16 bg-raven-bg-surface-2 rounded-md" />
        ))}
      </div>
    );
  }

  if (!document) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-raven-border-subtle rounded-lg max-w-4xl">
        <FileJson size={32} className="mx-auto mb-4 text-raven-text-tertiary" />
        <p className="text-raven-text-primary text-sm font-semibold">
          No RARF Document generated for this investigation.
        </p>
      </div>
    );
  }

  return <RARFViewer document={document} />;
}
