import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import type { Notification } from '../../contexts/NotificationContext';

interface ToastContainerProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

export function ToastContainer({ notifications, removeNotification }: ToastContainerProps) {
  
  const getIcon = (type: Notification['type']) => {
    switch(type) {
      case 'success': return <CheckCircle2 size={18} className="text-raven-status-success" />;
      case 'error': return <AlertCircle size={18} className="text-raven-severity-critical" />;
      case 'warning': return <AlertTriangle size={18} className="text-raven-severity-high" />;
      case 'info': return <Info size={18} className="text-raven-severity-info" />;
    }
  };

  const getBorderColor = (type: Notification['type']) => {
    switch(type) {
      case 'success': return 'border-raven-status-success/50';
      case 'error': return 'border-raven-severity-critical/50';
      case 'warning': return 'border-raven-severity-high/50';
      case 'info': return 'border-raven-severity-info/50';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {notifications.map(n => (
        <div 
          key={n.id} 
          className={`pointer-events-auto bg-raven-bg-surface-2 border ${getBorderColor(n.type)} rounded-md shadow-lg p-4 min-w-[300px] max-w-md animate-in slide-in-from-right-8 fade-in duration-300`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">{getIcon(n.type)}</div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-raven-text-primary">{n.title}</h4>
              {n.message && <p className="text-xs text-raven-text-secondary mt-1">{n.message}</p>}
            </div>
            <button 
              onClick={() => removeNotification(n.id)}
              className="text-raven-text-tertiary hover:text-raven-text-primary transition-colors p-1"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
