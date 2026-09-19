export type StageName = 
  | 'Process Activity' 
  | 'Network Activity' 
  | 'File Activity' 
  | 'Mass File Activity' 
  | 'Sustained Activity' 
  | 'Impact';

export type InterpretationCategory = 'OBSERVED EVIDENCE' | 'DERIVED INTERPRETATION';

export interface EvidenceRef {
  id: string; // e.g., EV-100
  filename: string;
}

export interface ReconstructionStage {
  id: string;
  stageName: StageName;
  category: InterpretationCategory;
  description: string;
  timestamp: string;
  confidence: number; // 0-100
  severity: 'low' | 'medium' | 'high' | 'critical';
  evidenceRefs: EvidenceRef[];
  details: string[]; // e.g. correlated evidence, detection events
}

export interface AttackSession {
  investigationId: string;
  summary: string;
  stages: ReconstructionStage[];
}

export const MOCK_RECONSTRUCTION_DB: Record<string, AttackSession> = {
  'INV-2023-0891': {
    investigationId: 'INV-2023-0891',
    summary: 'Ransomware deployment session originating from compromised service account.',
    stages: [
      {
        id: 'RS-01',
        stageName: 'Process Activity',
        category: 'OBSERVED EVIDENCE',
        description: 'Execution of vssadmin.exe to delete volume shadow copies.',
        timestamp: '2023-10-24T08:14:00Z',
        confidence: 95,
        severity: 'high',
        evidenceRefs: [{ id: 'EV-100', filename: 'evtx_app_log.evtx' }],
        details: ['Event ID 4688: Process Creation', 'Command Line: vssadmin.exe delete shadows /all /quiet']
      },
      {
        id: 'RS-02',
        stageName: 'Network Activity',
        category: 'OBSERVED EVIDENCE',
        description: 'Outbound beaconing to known Cobalt Strike infrastructure.',
        timestamp: '2023-10-24T08:20:15Z',
        confidence: 88,
        severity: 'critical',
        evidenceRefs: [{ id: 'EV-99', filename: 'sysmon_events_dc.evtx' }],
        details: ['Destination IP: 185.x.x.x', 'Port: 443', 'Pattern: 30s jitter']
      },
      {
        id: 'RS-03',
        stageName: 'File Activity',
        category: 'OBSERVED EVIDENCE',
        description: 'Rapid creation of .bat scripts in temporary directories.',
        timestamp: '2023-10-24T08:25:30Z',
        confidence: 82,
        severity: 'medium',
        evidenceRefs: [{ id: 'EV-99', filename: 'sysmon_events_dc.evtx' }],
        details: ['File: C:\\Windows\\Temp\\deploy.bat', 'File: C:\\Windows\\Temp\\kill.bat']
      },
      {
        id: 'RS-04',
        stageName: 'Mass File Activity',
        category: 'DERIVED INTERPRETATION',
        description: 'Simultaneous file modification and extension changes indicating encryption phase.',
        timestamp: '2023-10-24T08:35:00Z',
        confidence: 92,
        severity: 'critical',
        evidenceRefs: [],
        details: ['High volume of file renames to .lockbit', 'Correlated with high CPU utilization pattern']
      },
      {
        id: 'RS-05',
        stageName: 'Sustained Activity',
        category: 'DERIVED INTERPRETATION',
        description: 'Persistence mechanism established via Scheduled Task.',
        timestamp: '2023-10-24T08:40:00Z',
        confidence: 75,
        severity: 'high',
        evidenceRefs: [{ id: 'EV-100', filename: 'evtx_app_log.evtx' }],
        details: ['Task Name: WinUpdate_System_Task', 'Action: execution of encrypted payload']
      },
      {
        id: 'RS-06',
        stageName: 'Impact',
        category: 'DERIVED INTERPRETATION',
        description: 'Loss of availability for 14 core file shares.',
        timestamp: '2023-10-24T09:00:00Z',
        confidence: 99,
        severity: 'critical',
        evidenceRefs: [],
        details: ['Affected scope: AD Server, FileShare01', 'Total encrypted files: ~15,000']
      }
    ]
  }
};
