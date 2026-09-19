import { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export function DropZone({ onFilesSelected, disabled = false }: DropZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
    }
    // reset input so the same file can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center transition-colors duration-200 ${
        disabled 
          ? 'opacity-50 cursor-not-allowed border-raven-border-subtle bg-raven-bg-surface' 
          : isDragActive 
            ? 'border-raven-accent bg-raven-accent/5 cursor-pointer' 
            : 'border-raven-border-strong hover:border-raven-text-tertiary bg-raven-bg-surface-2 cursor-pointer'
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleChange}
        disabled={disabled}
      />
      <UploadCloud size={40} className={`mb-4 ${isDragActive ? 'text-raven-accent' : 'text-raven-text-tertiary'}`} />
      <h3 className="text-lg font-semibold text-raven-text-primary mb-1">
        Upload Evidence Files
      </h3>
      <p className="text-sm text-raven-text-secondary max-w-sm mb-4">
        Drag and drop EVTX files here, or click to browse. Files will be queued for telemetry parsing.
      </p>
      
      <div className="flex gap-2">
        <span className="text-xs px-2 py-1 bg-raven-bg-base border border-raven-border-subtle rounded text-raven-text-tertiary font-mono">.evtx</span>
        <span className="text-xs px-2 py-1 bg-raven-bg-base border border-raven-border-subtle rounded text-raven-text-tertiary font-mono">Max: 100MB</span>
      </div>
    </div>
  );
}
