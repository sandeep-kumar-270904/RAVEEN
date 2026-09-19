import { AlertOctagon, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = 'Something went wrong', 
  message = 'An unexpected error occurred while loading this module.', 
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-raven-severity-critical/30 rounded-lg bg-raven-severity-critical/5">
      <div className="text-raven-severity-critical mb-4 bg-raven-bg-surface-2 p-3 rounded-full">
        <AlertOctagon size={32} />
      </div>
      <h3 className="text-lg font-semibold text-raven-text-primary mb-2">{title}</h3>
      <p className="text-sm text-raven-text-secondary max-w-sm mb-6">
        {message}
      </p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          <RefreshCw size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}
