import { describe, it, expect } from 'vitest';
import { investigationService } from './investigationService';

describe('investigationService', () => {
  it('should return dashboard stats deterministically', async () => {
    const stats = await investigationService.getDashboardStats();
    expect(stats.activeInvestigations).toBe(12);
    expect(stats.criticalSeverity).toBe(3);
  });

  it('should retrieve a single investigation deterministically', async () => {
    const inv = await investigationService.getInvestigation('INV-2023-0891');
    expect(inv).toBeDefined();
    expect(inv?.title).toBe('LockBit 3.0 Ransomware Activity on AD Server');
    expect(inv?.severity).toBe('critical');
  });

  it('should handle missing investigations gracefully', async () => {
    const inv = await investigationService.getInvestigation('INV-DOES-NOT-EXIST');
    expect(inv).toBeUndefined();
  });

  it('should append a new investigation to the list', async () => {
    const newInv = await investigationService.createInvestigation('Test Threat', 'high', 'SA');
    expect(newInv).toBeDefined();
    expect(newInv.title).toBe('Test Threat');
    expect(newInv.severity).toBe('high');
    expect(newInv.status).toBe('pending');
    
    // Validate that it was added to the store
    const all = await investigationService.getAllInvestigations();
    expect(all[0].id).toBe(newInv.id);
  });
});
