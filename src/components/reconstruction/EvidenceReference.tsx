import { FileText } from 'lucide-react';
import type { EvidenceRef } from '../../mock/reconstruction/mockData';

export function EvidenceReference({ reference }: { reference: EvidenceRef }) {
  return (
    <div 
      className="inline-flex items-center gap-1.5 px-2 py-1 bg-raven-bg-surface-3 border border-raven-border-subtle rounded-md text-xs text-raven-text-secondary hover:text-raven-text-primary hover:border-raven-border-strong transition-colors cursor-pointer"
      title={`Source: ${reference.filename}`}
    >
      <FileText size={12} className="text-raven-text-tertiary" />
      <span className="font-mono">{reference.id}</span>
    </div>
  );
}
