import { EvidenceCard } from './EvidenceCard';
import type { EvidenceRecord } from '../../mock/evidence/mockData';

interface EvidenceListProps {
  records: EvidenceRecord[];
}

export function EvidenceList({ records }: EvidenceListProps) {
  if (records.length === 0) {
    return (
      <div className="text-center py-8 text-raven-text-tertiary text-sm border-2 border-dashed border-raven-border-subtle rounded-lg">
        No evidence files have been uploaded yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {records.map(record => (
        <EvidenceCard key={record.id} record={record} />
      ))}
    </div>
  );
}
