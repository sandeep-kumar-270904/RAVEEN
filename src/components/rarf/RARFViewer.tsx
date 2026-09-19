import { FileJson, AlertCircle } from 'lucide-react';
import type { RARFDocument } from '../../types/rarf';
import { RARFSection } from './RARFSection';

interface RARFViewerProps {
  document: RARFDocument;
}

export function RARFViewer({ document }: RARFViewerProps) {
  // Extract keys to map generically, omitting ID and metadata fields handled separately
  const mainSections = Object.keys(document).filter(
    key => !['id', 'investigationId', 'reportMetadata'].includes(key)
  );

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-raven-bg-surface-2 border border-raven-border-strong rounded-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-raven-bg-surface border border-raven-border-subtle rounded text-raven-text-primary">
            <FileJson size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-raven-text-primary tracking-tight">RARF Document</h2>
            <div className="text-sm font-mono text-raven-text-secondary flex gap-3 mt-1">
              <span>{document.id}</span>
              <span>&bull;</span>
              <span>Generated: {new Date(document.reportMetadata.generatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="px-3 py-1 bg-raven-severity-medium/10 border border-raven-severity-medium/30 rounded text-raven-severity-medium text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
          <AlertCircle size={14} />
          Provisional Schema
        </div>
      </div>

      {/* Provisional Schema Warning */}
      <div className="text-xs text-raven-text-tertiary bg-raven-bg-surface-3 p-3 rounded-md border border-raven-border-subtle">
        <strong>NOTE:</strong> This viewer uses a provisional schema. The layout is dynamically generated based on the JSON payload structure. Real RARF fields can replace placeholder ones without a rewrite.
      </div>

      {/* Schema-Driven Sections */}
      <div className="space-y-4">
        {mainSections.map(key => (
          <RARFSection 
            key={key} 
            title={key} 
            data={document[key as keyof RARFDocument] as Record<string, any>} 
            defaultExpanded={true} 
          />
        ))}
      </div>
      
    </div>
  );
}
