import { Loader2 } from 'lucide-react';

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[200px]">
      <Loader2 size={32} className="text-raven-accent animate-spin mb-4" />
      <p className="text-sm text-raven-text-secondary font-medium tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
}
