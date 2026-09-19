import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EvidenceTrace } from './EvidenceTrace';
import type { TraceableReference } from '../../mock/narrative/mockData';

describe('EvidenceTrace Component', () => {
  it('renders a complete trace chain including timeline and evidence links', () => {
    const trace: TraceableReference = {
      description: 'Test extraction context',
      evidenceId: 'EVTX-99',
      timelineId: 'EVT-55'
    };
    
    render(<EvidenceTrace trace={trace} />);
    
    expect(screen.getByText('Traceability Chain')).toBeInTheDocument();
    expect(screen.getByText('Statement')).toBeInTheDocument();
    expect(screen.getByText('EVT-55')).toBeInTheDocument();
    expect(screen.getByText('EVTX-99')).toBeInTheDocument();
    expect(screen.getByText(/Test extraction context/)).toBeInTheDocument();
  });

  it('omits timeline link if not provided in the trace', () => {
    const trace: TraceableReference = {
      description: 'Context without timeline',
      evidenceId: 'EVTX-100',
    };
    
    render(<EvidenceTrace trace={trace} />);
    
    expect(screen.getByText('EVTX-100')).toBeInTheDocument();
    expect(screen.queryByText('EVT-')).not.toBeInTheDocument();
  });
});
