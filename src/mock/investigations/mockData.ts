export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type Status = 'success' | 'pending' | 'error' | 'neutral';

export interface Investigation {
  id: string;
  title: string;
  status: Status;
  severity: Severity;
  createdAt: string;
  analyst: string;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  description: string;
  type: 'detection' | 'evidence' | 'report' | 'system';
}

export const MOCK_STATS = {
  activeInvestigations: 12,
  criticalSeverity: 3,
  recentDetections: 142,
  analyzedSessions: 28
};

export const MOCK_INVESTIGATIONS: Investigation[] = [
  { id: 'INV-2023-0891', title: 'LockBit 3.0 Ransomware Activity on AD Server', status: 'pending', severity: 'critical', createdAt: '2023-10-24T08:14:00Z', analyst: 'Jane Doe' },
  { id: 'INV-2023-0890', title: 'Suspicious PowerShell Execution (Invoke-Obfuscation)', status: 'pending', severity: 'high', createdAt: '2023-10-23T14:32:00Z', analyst: 'Jane Doe' },
  { id: 'INV-2023-0889', title: 'Mass File Extension Change (.enc) on FileShare01', status: 'success', severity: 'critical', createdAt: '2023-10-21T09:05:00Z', analyst: 'John Smith' },
  { id: 'INV-2023-0888', title: 'Unauthorized RDP Login from External IP', status: 'success', severity: 'medium', createdAt: '2023-10-20T11:22:00Z', analyst: 'System' },
  { id: 'INV-2023-0887', title: 'Defender AV Service Stopped Unexpectedly', status: 'neutral', severity: 'low', createdAt: '2023-10-18T16:45:00Z', analyst: 'Jane Doe' },
];

export const MOCK_ACTIVITY: ActivityItem[] = [
  { id: 'ACT-100', timestamp: '2023-10-24T09:12:33Z', description: 'New evidence evtx_app_log.evtx uploaded for INV-2023-0891', type: 'evidence' },
  { id: 'ACT-99', timestamp: '2023-10-24T08:45:10Z', description: 'High confidence detection: Shadow Copy Deletion via vssadmin', type: 'detection' },
  { id: 'ACT-98', timestamp: '2023-10-24T08:14:00Z', description: 'Investigation INV-2023-0891 created by System', type: 'system' },
  { id: 'ACT-97', timestamp: '2023-10-23T18:30:00Z', description: 'RARF Report generated for INV-2023-0889', type: 'report' },
  { id: 'ACT-96', timestamp: '2023-10-23T14:32:15Z', description: 'Initial detection: Encoded Command Line found in sysmon logs', type: 'detection' },
];
