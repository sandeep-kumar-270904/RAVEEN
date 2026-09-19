import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RARFSection } from './RARFSection';

describe('RARFSection Component', () => {
  const mockData = {
    frameworkVersion: '1.2.0',
    classification: { level: 'Restricted' },
    tags: ['malware', 'exfiltration']
  };

  it('renders the section title correctly formatted', () => {
    render(<RARFSection title="metaData" data={mockData} defaultExpanded={true} />);
    // "metaData" should be formatted as "Meta Data" by formatKey
    expect(screen.getByText('Meta Data')).toBeInTheDocument();
  });

  it('renders nested key-value pairs', () => {
    render(<RARFSection title="metaData" data={mockData} defaultExpanded={true} />);
    expect(screen.getByText('Framework Version')).toBeInTheDocument();
    expect(screen.getByText('1.2.0')).toBeInTheDocument();
    
    // Arrays render as list items
    expect(screen.getByText('malware')).toBeInTheDocument();
    expect(screen.getByText('exfiltration')).toBeInTheDocument();
  });

  it('toggles expansion state when header is clicked', () => {
    render(<RARFSection title="metaData" data={mockData} defaultExpanded={false} />);
    
    // Not visible initially
    expect(screen.queryByText('1.2.0')).not.toBeInTheDocument();
    
    // Click header
    const button = screen.getByRole('button', { expanded: false });
    fireEvent.click(button);
    
    // Visible now
    expect(screen.getByText('1.2.0')).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
