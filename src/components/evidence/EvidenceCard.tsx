import { FileText, AlertCircle, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { Card } from '../ui/Card';
import type { EvidenceRecord } from '../../mock/evidence/mockData';

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function EvidenceCard({ record }: { record: EvidenceRecord }) {
  
  const getStatusDisplay = () => {
    switch (record.status) {
      case 'queued':
        return { icon: Clock, color: 'text-raven-text-tertiary', text: 'Queued' };
      case 'uploading':
        return { icon: Loader2, color: 'text-raven-accent', text: `Uploading ${record.progress}%`, spin: true };
      case 'processing':
        return { icon: Loader2, color: 'text-raven-severity-medium', text: 'Processing...', spin: true };
      case 'complete':
        return { icon: CheckCircle2, color: 'text-raven-status-success', text: 'Complete' };
      case 'failed':
        return { icon: AlertCircle, color: 'text-raven-severity-critical', text: 'Failed' };
    }
  };

  const status = getStatusDisplay();
  const StatusIcon = status.icon;

  return (
    <Card className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded bg-raven-bg-surface-2 border border-raven-border-subtle ${
          record.status === 'failed' ? 'text-raven-severity-critical' : 'text-raven-text-primary'
        }`}>
          <FileText size={20} />
        </div>
        <div>
          <h4 className="font-medium text-raven-text-primary">{record.filename}</h4>
          <div className="flex items-center gap-3 mt-1 text-xs text-raven-text-secondary font-mono">
            <span>{record.id}</span>
            <span>&bull;</span>
            <span>{formatBytes(record.sizeBytes)}</span>
            <span>&bull;</span>
            <span>{new Date(record.uploadedAt).toLocaleString()}</span>
          </div>
          {record.errorMessage && (
            <p className="text-xs text-raven-severity-critical mt-2 bg-raven-severity-critical/10 px-2 py-1 rounded inline-block">
              {record.errorMessage}
            </p>
          )}
        </div>
      </div>
      
      <div className="w-full sm:w-auto min-w-[120px] flex flex-col sm:items-end gap-2 shrink-0">
        <div className={`flex items-center gap-1.5 text-sm font-medium ${status.color}`}>
          <StatusIcon size={16} className={status.spin ? 'animate-spin' : ''} />
          {status.text}
        </div>
        
        {/* Progress Bar */}
        {(record.status === 'uploading' || record.status === 'processing') && (
          <div className="w-full sm:w-32 h-1.5 bg-raven-bg-surface-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${record.status === 'processing' ? 'bg-raven-severity-medium w-full animate-pulse' : 'bg-raven-accent'}`}
              style={{ width: record.status === 'uploading' ? `${record.progress}%` : '100%' }}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
