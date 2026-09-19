import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setIsMobile(true);
        setSidebarCollapsed(false); // Mobile uses drawer style
      } else if (width < 1024) {
        setIsMobile(false);
        setSidebarCollapsed(true); // Tablet uses icon rail
        setMobileMenuOpen(false);
      } else {
        setIsMobile(false);
        setSidebarCollapsed(false); // Desktop uses full sidebar
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // init

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen w-full bg-raven-bg-base overflow-hidden">
      
      {/* Mobile Drawer Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#0A0E14]/80 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Responsive container) */}
      <div 
        className={`z-50 shrink-0 transition-transform duration-300 ease-in-out ${
          isMobile 
            ? `fixed inset-y-0 left-0 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}` 
            : 'relative translate-x-0'
        }`}
      >
        <Sidebar collapsed={!isMobile && sidebarCollapsed} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Topbar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <main className="flex-1 overflow-auto bg-raven-bg-base p-6">
          <div className="mx-auto max-w-[1440px]">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}
