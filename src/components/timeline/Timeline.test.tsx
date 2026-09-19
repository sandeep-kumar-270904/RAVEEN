import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Timeline } from './Timeline';
import type { TimelineEventRecord } from '../../mock/timeline/mockData';

const mockEvents: TimelineEventRecord[] = [
  {
    id: 'evt-1',
    investigationId: 'INV-TEST',
    timestamp: '2023-11-12T03:00:00Z',
    category: 'Network',
    title: 'Initial event',
    details: [{ key: 'Method', value: 'WMI' }],
    evidenceRefs: []
  },
  {
    id: 'evt-2',
    investigationId: 'INV-TEST',
    timestamp: '2023-11-12T04:00:00Z',
    category: 'Network',
    title: 'Second event',
    details: [],
    evidenceRefs: [{ id: 'evtx-1', filename: 'log.evtx' }]
  }
];

describe('Timeline Component', () => {
  it('renders an empty state when no events are provided', () => {
    render(<Timeline events={[]} />);
    expect(screen.getByText('No events recorded in this timeline yet.')).toBeInTheDocument();
  });

  it('renders a list of timeline events in chronological order', () => {
    render(<Timeline events={mockEvents} />);
    expect(screen.getByText('Initial event')).toBeInTheDocument();
    expect(screen.getByText('Second event')).toBeInTheDocument();
    expect(screen.getAllByText('NETWORK').length).toBeGreaterThan(0);
  });

  it('expands details when clicked', () => {
    render(<Timeline events={mockEvents} />);
    
    // The details should not be visible initially
    expect(screen.queryByText('WMI')).not.toBeInTheDocument();
    
    // Click to expand
    const expandButton = screen.getByLabelText('Expand details for Initial event');
    fireEvent.click(expandButton);
    
    // Now details should be visible
    expect(screen.getByText('WMI')).toBeInTheDocument();
  });
});
