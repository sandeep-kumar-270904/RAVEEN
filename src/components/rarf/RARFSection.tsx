import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface RARFSectionProps {
  title: string;
  data: Record<string, any>;
  defaultExpanded?: boolean;
}

export function RARFSection({ title, data, defaultExpanded = true }: RARFSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  // Formats camelCase keys to Title Case for generic rendering
  const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  const renderValue = (value: any): React.ReactNode => {
    if (value === null || value === undefined) return <span className="text-raven-text-tertiary italic">null</span>;
    if (typeof value === 'boolean') return <span className={value ? 'text-raven-status-success' : 'text-raven-severity-critical'}>{value.toString()}</span>;
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc pl-4 space-y-1">
          {value.map((v, i) => <li key={i}>{renderValue(v)}</li>)}
        </ul>
      );
    }
    if (typeof value === 'object') {
      return (
        <div className="pl-2 border-l border-raven-border-subtle ml-2 mt-1 space-y-1">
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <span className="text-raven-text-secondary">{formatKey(k)}:</span>
              <span className="text-raven-text-primary">{renderValue(v)}</span>
            </div>
          ))}
        </div>
      );
    }
    return <span className="text-raven-text-primary">{value.toString()}</span>;
  };

  return (
    <div className="border border-raven-border-subtle rounded-md bg-raven-bg-surface overflow-hidden">
      <div 
        className="flex items-center gap-2 p-3 bg-raven-bg-surface-2 cursor-pointer select-none hover:bg-raven-bg-surface-3 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <button className="text-raven-text-tertiary hover:text-raven-text-primary transition-colors">
          {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>
        <h3 className="font-semibold text-raven-text-primary">{formatKey(title)}</h3>
      </div>
      
      {expanded && (
        <div className="p-4 border-t border-raven-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {Object.entries(data).map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-raven-text-tertiary font-medium">
                {formatKey(k)}
              </span>
              <div className="text-sm font-mono bg-raven-bg-base p-2 rounded border border-raven-border-subtle/50 text-raven-text-primary overflow-x-auto custom-scrollbar">
                {renderValue(v)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
