export interface TraceableReference {
  timelineId?: string; // ID from TimelineEventRecord
  evidenceId: string;  // ID from EvidenceRecord
  description: string;
}

export interface NarrativeStatementRecord {
  id: string;
  text: string;
  traces: TraceableReference[];
}

export interface NarrativeSection {
  title: string;
  statements: NarrativeStatementRecord[];
}

export interface NarrativeData {
  investigationId: string;
  sections: NarrativeSection[];
}

export const MOCK_NARRATIVE_DB: Record<string, NarrativeData> = {
  'INV-2023-0891': {
    investigationId: 'INV-2023-0891',
    sections: [
      {
        title: 'What Happened?',
        statements: [
          {
            id: 'NS-01',
            text: 'Based on the correlated evidence, a highly privileged service account was compromised and utilized to deploy ransomware across the network.',
            traces: [
              { evidenceId: 'EV-99', timelineId: 'TL-101', description: 'Log of vssadmin.exe executed by NT AUTHORITY\\SYSTEM' }
            ]
          },
          {
            id: 'NS-02',
            text: 'The incident resulted in the encryption of core file shares.',
            traces: [
              { evidenceId: 'EV-100', timelineId: 'TL-105', description: 'Mass .lockbit file renaming' }
            ]
          },
          {
            id: 'NS-03',
            text: 'It required active intervention to contain outbound C2 beaconing.',
            traces: [
              { evidenceId: 'EV-99', timelineId: 'TL-102', description: 'Outbound connection to 185.12.34.56:443' }
            ]
          }
        ]
      },
      {
        title: 'How Did It Happen?',
        statements: [
          {
            id: 'NS-04',
            text: 'Following initial access, the actor utilized legitimate administrative tools to disable recovery options.',
            traces: [
              { evidenceId: 'EV-99', timelineId: 'TL-101', description: 'vssadmin.exe delete shadows /all /quiet' }
            ]
          },
          {
            id: 'NS-05',
            text: 'Before executing the primary encryption payload via batch scripts in temporary directories.',
            traces: [
              { evidenceId: 'EV-99', timelineId: 'TL-103', description: 'deploy.bat execution in C:\\Windows\\Temp' }
            ]
          }
        ]
      }
    ]
  }
};
