import { PackageOpen } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-raven-border-subtle rounded-lg bg-raven-bg-surface-2/30">
      <div className="text-raven-text-tertiary mb-4">
        {icon || <PackageOpen size={48} strokeWidth={1} />}
      </div>
      <h3 className="text-lg font-semibold text-raven-text-primary mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-raven-text-secondary max-w-sm mb-6">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
