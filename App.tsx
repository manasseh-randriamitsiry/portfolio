import React, { useState, useEffect } from 'react';
import { NavRail } from './components/NavRail';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { ProjectsView } from './views/ProjectsView';
import { ResumeView } from './views/ResumeView';
import { ContactView } from './views/ContactView';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // Check for saved preference or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class on mount and when isDark changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleMobilePreview = () => {
    setIsMobilePreview(!isMobilePreview);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView setView={setCurrentView} />;
      case 'works': return <ProjectsView />;
      case 'resume': return <ResumeView />;
      case 'contact': return <ContactView />;
      default: return <HomeView setView={setCurrentView} />;
    }
  };

  const appContent = (
    <>
      <NavRail
        currentView={currentView}
        setView={setCurrentView}
        toggleTheme={toggleTheme}
        isDark={isDark}
        toggleMobilePreview={toggleMobilePreview}
        isMobilePreview={isMobilePreview}
      />

      <main className={`flex-1 h-screen overflow-y-auto overflow-x-hidden relative ${isMobilePreview ? 'hidden md:block' : ''}`}>
        {/* Custom Mobile Header - Matches Screenshot 1 */}
        {currentView === 'home' && (
          <div className="md:hidden sticky top-0 z-40 bg-surface/90 dark:bg-surface/90 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg shadow-md shadow-primary/30">
                M
              </div>
              <span className="font-bold text-on-surface text-lg tracking-tight">Manassé</span>
            </div>
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-secondary-container dark:bg-surface-variant flex items-center justify-center text-on-secondary-container dark:text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors"
            >
              <span className="material-icons-round">{isDark ? 'light_mode' : 'dark_mode'}</span>
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-6 md:p-8 lg:p-12 max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>

      <BottomNav currentView={currentView} setView={setCurrentView} />
    </>
  );

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-300 font-sans">
      {isMobilePreview ? (
        /* iPhone Frame for Mobile Preview */
        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-surface-variant/30 to-surface-variant/10">
          <div className="relative" style={{ width: '390px', height: '844px' }}>
            {/* iPhone Bezel */}
            <div className="absolute inset-0 bg-gray-900 rounded-[60px] shadow-2xl p-3">
              {/* Screen */}
              <div className="relative w-full h-full bg-background rounded-[48px] overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-50"></div>

                {/* App Content */}
                <div className="w-full h-full overflow-hidden">
                  {appContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        appContent
      )}
    </div>
  );
};

export default App;
