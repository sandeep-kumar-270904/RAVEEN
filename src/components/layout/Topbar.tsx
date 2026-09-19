import { useLocation } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { logout } = useAuth();
  const location = useLocation();

  // Basic breadcrumb title logic based on path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const title = pathParts.length > 0 
    ? pathParts[pathParts.length - 1].replace(/-/g, ' ') 
    : 'Dashboard';
  
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <header className="h-[56px] flex items-center justify-between px-6 bg-raven-bg-surface border-b border-raven-border-subtle shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-1 -ml-2 rounded text-raven-text-secondary hover:text-raven-text-primary hover:bg-raven-bg-surface-2 transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-raven-text-primary">
          {formattedTitle}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-raven-text-primary">SOC Analyst</span>
            <span className="text-xs text-raven-text-tertiary">Active Session</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-raven-accent-muted flex items-center justify-center border border-raven-border-strong text-raven-accent font-bold text-sm">
            SA
          </div>
        </div>
        
        <div className="w-px h-6 bg-raven-border-subtle mx-2" />
        
        <Button variant="secondary" size="small" onClick={logout} className="gap-2 text-raven-text-secondary hover:text-raven-text-primary border-transparent">
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
