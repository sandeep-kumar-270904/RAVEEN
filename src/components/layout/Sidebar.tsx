import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Database, 
  GitMerge, 
  Clock, 
  Activity, 
  FileJson, 
  FileText, 
  Settings, 
  UserCircle 
} from 'lucide-react';
import { Logo } from '../Logo';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Investigations', path: '/investigations', icon: Briefcase },
  { label: 'Evidence', path: '/evidence', icon: Database },
  { label: 'Attack Reconstruction', path: '/reconstruction', icon: GitMerge },
  { label: 'Timeline', path: '/timeline', icon: Clock },
  { label: 'Impact Analysis', path: '/impact', icon: Activity },
  { label: 'RARF Viewer', path: '/rarf', icon: FileJson },
  { label: 'Reports', path: '/reports', icon: FileText },
];

const BOTTOM_NAV_ITEMS = [
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Analyst Profile', path: '/profile', icon: UserCircle },
];

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  const renderLink = (item: any) => (
    <NavLink
      key={item.path}
      to={item.path}
      className={({ isActive }) => 
        `flex items-center gap-3 h-10 px-4 mx-1 rounded-sm transition-colors duration-150 ` +
        (isActive 
          ? 'bg-raven-accent-muted text-raven-accent border-l-[3px] border-raven-accent ' 
          : 'text-raven-text-secondary hover:bg-raven-bg-surface-2 hover:text-raven-text-primary border-l-[3px] border-transparent ') +
        (collapsed ? 'justify-center px-0 mx-2' : '')
      }
      title={collapsed ? item.label : undefined}
      aria-label={item.label}
    >
      <item.icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
    </NavLink>
  );

  return (
    <aside className={`flex flex-col h-full bg-raven-bg-surface border-r border-raven-border-subtle transition-all duration-200 ${collapsed ? 'w-16' : 'w-[240px]'}`}>
      <div className={`h-14 flex items-center border-b border-raven-border-subtle ${collapsed ? 'justify-center' : 'px-4'}`}>
        {collapsed ? (
          <div className="h-8 w-8 rounded bg-raven-light border border-raven-border shadow-sm flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-raven-accent">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
        ) : (
          <Logo />
        )}
      </div>

      <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {NAV_ITEMS.map(renderLink)}
      </nav>

      <div className="py-4 border-t border-raven-border-subtle flex flex-col gap-1">
        {BOTTOM_NAV_ITEMS.map(renderLink)}
      </div>
    </aside>
  );
}
