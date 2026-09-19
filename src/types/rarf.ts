/**
 * PROVISIONAL SCHEMA - DO NOT TREAT AS FINAL
 * 
 * This file defines a placeholder RARF (Risk & Response Framework) schema.
 * It is completely provisional pending the final backend RARF definition.
 * Do not hardcode deep assumptions based on this structure; the UI should
 * ideally be driven dynamically via generic sections where practical.
 */

export interface RARFDocument {
  id: string;
  investigationId: string;
  incidentInfo: Record<string, any>;
  attackSession: Record<string, any>;
  detectionEvidence: Record<string, any>;
  correlatedEvidence: Record<string, any>;
  attackSequence: Record<string, any>;
  timelineRef: Record<string, any>;
  impactRef: Record<string, any>;
  evidenceReferences: Record<string, any>;
  reportMetadata: Record<string, any>;
}
