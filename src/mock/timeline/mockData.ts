import type { EvidenceRef } from '../reconstruction/mockData';

export type EventCategory = 'Process' | 'Network' | 'File' | 'System';

export interface TimelineDetail {
  key: string;
  value: string;
}

export interface TimelineEventRecord {
  id: string;
  investigationId: string;
  timestamp: string;
  category: EventCategory;
  title: string;
  details: TimelineDetail[];
  evidenceRefs: EvidenceRef[];
}

export const MOCK_TIMELINE_DB: Record<string, TimelineEventRecord[]> = {
  'INV-2023-0891': [
    {
      id: 'TL-101',
      investigationId: 'INV-2023-0891',
      timestamp: '2023-10-24T08:39:49Z',
      category: 'Process',
      title: 'vssadmin.exe execution detected',
      details: [
        { key: 'Command Line', value: 'vssadmin.exe delete shadows /all /quiet' },
        { key: 'Parent Process', value: 'cmd.exe (PID: 4892)' },
        { key: 'User', value: 'NT AUTHORITY\\SYSTEM' }
      ],
      evidenceRefs: [{ id: 'EV-100', filename: 'evtx_app_log.evtx' }]
    },
    {
      id: 'TL-102',
      investigationId: 'INV-2023-0891',
      timestamp: '2023-10-24T08:40:15Z',
      category: 'Network',
      title: 'Outbound connection to known C2',
      details: [
        { key: 'Destination IP', value: '185.12.34.56' },
        { key: 'Destination Port', value: '443' },
        { key: 'Protocol', value: 'TCP' }
      ],
      evidenceRefs: [{ id: 'EV-99', filename: 'sysmon_events_dc.evtx' }]
    },
    {
      id: 'TL-103',
      investigationId: 'INV-2023-0891',
      timestamp: '2023-10-24T08:41:00Z',
      category: 'File',
      title: 'Rapid file creation in Temp directory',
      details: [
        { key: 'Directory', value: 'C:\\Windows\\Temp' },
        { key: 'File Names', value: 'deploy.bat, execute.ps1' },
        { key: 'Count', value: '2' }
      ],
      evidenceRefs: [{ id: 'EV-99', filename: 'sysmon_events_dc.evtx' }]
    },
    {
      id: 'TL-104',
      investigationId: 'INV-2023-0891',
      timestamp: '2023-10-24T08:42:30Z',
      category: 'System',
      title: 'Windows Defender Service Stopped',
      details: [
        { key: 'Service Name', value: 'WinDefend' },
        { key: 'State', value: 'Stopped' },
        { key: 'Reason', value: 'User initiated' }
      ],
      evidenceRefs: [{ id: 'EV-100', filename: 'evtx_app_log.evtx' }]
    },
    {
      id: 'TL-105',
      investigationId: 'INV-2023-0891',
      timestamp: '2023-10-24T08:43:09Z',
      category: 'File',
      title: 'Mass file renaming (.lockbit)',
      details: [
        { key: 'Directory', value: 'D:\\Shares\\Finance' },
        { key: 'Affected Files', value: 'approx 4,500 files' },
        { key: 'Duration', value: '14 seconds' }
      ],
      evidenceRefs: []
    }
  ]
};
