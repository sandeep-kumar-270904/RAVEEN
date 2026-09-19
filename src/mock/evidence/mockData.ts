export type EvidenceStatus = 'queued' | 'uploading' | 'processing' | 'complete' | 'failed';

export interface EvidenceRecord {
  id: string;
  investigationId: string;
  filename: string;
  sizeBytes: number;
  uploadedAt: string;
  status: EvidenceStatus;
  progress?: number; // 0-100 for uploading/processing
  errorMessage?: string;
}

export const MOCK_EVIDENCE_DB: Record<string, EvidenceRecord[]> = {
  'INV-2023-0891': [
    {
      id: 'EV-100',
      investigationId: 'INV-2023-0891',
      filename: 'evtx_app_log.evtx',
      sizeBytes: 1543021,
      uploadedAt: '2023-10-24T09:12:33Z',
      status: 'complete'
    },
    {
      id: 'EV-99',
      investigationId: 'INV-2023-0891',
      filename: 'sysmon_events_dc.evtx',
      sizeBytes: 8504312,
      uploadedAt: '2023-10-24T10:05:12Z',
      status: 'complete'
    }
  ],
  'INV-2023-0890': [
    {
      id: 'EV-98',
      investigationId: 'INV-2023-0890',
      filename: 'corrupted_dump.evtx',
      sizeBytes: 1024,
      uploadedAt: '2023-10-23T14:40:00Z',
      status: 'failed',
      errorMessage: 'Invalid file signature. Expected EVTX.'
    }
  ]
};
