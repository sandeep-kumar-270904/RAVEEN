

type BadgeSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
type BadgeStatus = 'success' | 'pending' | 'error' | 'neutral';

type BadgeProps = {
  type: 'severity' | 'status';
  value: BadgeSeverity | BadgeStatus;
  label: string;
  className?: string;
};

export function Badge({ type, value, label, className = '' }: BadgeProps) {
  let bgClass = '';
  let textClass = '';
  let borderClass = '';
  let dotColor = '';

  if (type === 'severity') {
    switch (value) {
      case 'critical': bgClass = 'bg-raven-severity-critical/15'; textClass = 'text-raven-severity-critical'; borderClass = 'border-raven-severity-critical/30'; break;
      case 'high': bgClass = 'bg-raven-severity-high/15'; textClass = 'text-raven-severity-high'; borderClass = 'border-raven-severity-high/30'; break;
      case 'medium': bgClass = 'bg-raven-severity-medium/15'; textClass = 'text-raven-severity-medium'; borderClass = 'border-raven-severity-medium/30'; break;
      case 'low': bgClass = 'bg-raven-severity-low/15'; textClass = 'text-raven-severity-low'; borderClass = 'border-raven-severity-low/30'; break;
      case 'info': bgClass = 'bg-raven-severity-info/15'; textClass = 'text-raven-severity-info'; borderClass = 'border-raven-severity-info/30'; break;
    }
    
    return (
      <span className={`inline-flex items-center h-5 px-2 rounded-full text-xs font-semibold border ${bgClass} ${textClass} ${borderClass} ${className}`}>
        {label}
      </span>
    );
  }

  // Status badges
  switch (value) {
    case 'success': dotColor = 'bg-raven-status-success'; break;
    case 'pending': dotColor = 'bg-raven-status-pending'; break;
    case 'error': dotColor = 'bg-raven-status-error'; break;
    case 'neutral': dotColor = 'bg-raven-status-neutral'; break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 h-5 px-2 rounded-full text-xs font-semibold bg-raven-bg-surface-2 text-raven-text-secondary border border-raven-border-subtle ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      {label}
    </span>
  );
}
