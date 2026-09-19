import type { RARFDocument } from '../../types/rarf';

export const MOCK_RARF_DB: Record<string, RARFDocument> = {
  'INV-2023-0891': {
    id: 'RARF-891-001',
    investigationId: 'INV-2023-0891',
    incidentInfo: {
      type: 'Ransomware / Lateral Movement',
      primaryAsset: 'DC-01 (Domain Controller)',
      severity: 'Critical',
      status: 'Contained'
    },
    attackSession: {
      durationHours: 1.2,
      originPoint: 'Compromised Service Account (svc_deploy)',
      mitreTactics: ['TA0002', 'TA0004', 'TA0008', 'TA0040']
    },
    detectionEvidence: {
      sourceCount: 2,
      sources: ['sysmon_events_dc.evtx', 'evtx_app_log.evtx'],
      alertsTriggered: 14
    },
    correlatedEvidence: {
      confidenceScore: 0.94,
      missingGaps: 'Initial foothold vector unconfirmed'
    },
    attackSequence: {
      totalStages: 6,
      highestSeverityStage: 'Mass File Activity'
    },
    timelineRef: {
      eventsCount: 5,
      timeSpan: '08:39:49Z - 08:43:09Z'
    },
    impactRef: {
      overallImpact: 'Critical',
      filesAffected: 15432,
      hostsAffected: 3
    },
    evidenceReferences: {
      nodes: ['EV-100', 'EV-99'],
      integrityValid: true
    },
    reportMetadata: {
      generatedAt: '2023-10-24T09:15:00Z',
      version: '1.0-draft',
      engine: 'RAVEN Core v2'
    }
  }
};
