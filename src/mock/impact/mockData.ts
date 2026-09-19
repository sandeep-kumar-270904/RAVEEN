import type { EvidenceRef } from '../reconstruction/mockData';

export type ImpactCategoryName = 'Files' | 'Processes' | 'Network Activity' | 'Other/Unsupported';

export interface ImpactCategoryData {
  category: ImpactCategoryName;
  affectedCount: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  evidenceRefs: EvidenceRef[];
}

export interface ImpactData {
  investigationId: string;
  demonstrationScore: number; // 0-10, labeled explicitly as mock
  overallSeverity: 'low' | 'medium' | 'high' | 'critical';
  categories: ImpactCategoryData[];
}

export const MOCK_IMPACT_DB: Record<string, ImpactData> = {
  'INV-2023-0891': {
    investigationId: 'INV-2023-0891',
    demonstrationScore: 8.7,
    overallSeverity: 'critical',
    categories: [
      {
        category: 'Files',
        affectedCount: 15432,
        severity: 'critical',
        description: 'Widespread file encryption (.lockbit) across primary file share and local directories.',
        evidenceRefs: [{ id: 'EV-99', filename: 'sysmon_events_dc.evtx' }]
      },
      {
        category: 'Processes',
        affectedCount: 4,
        severity: 'high',
        description: 'Malicious payload execution, shadow copy deletion (vssadmin), and defense evasion (stopping WinDefend).',
        evidenceRefs: [{ id: 'EV-100', filename: 'evtx_app_log.evtx' }]
      },
      {
        category: 'Network Activity',
        affectedCount: 21,
        severity: 'high',
        description: 'Sustained outbound C2 beaconing and lateral movement attempts (SMB scanning).',
        evidenceRefs: [{ id: 'EV-99', filename: 'sysmon_events_dc.evtx' }]
      },
      {
        category: 'Other/Unsupported',
        affectedCount: 1,
        severity: 'medium',
        description: 'Persistence mechanism established via Scheduled Task (WinUpdate_System_Task).',
        evidenceRefs: [{ id: 'EV-100', filename: 'evtx_app_log.evtx' }]
      }
    ]
  }
};
