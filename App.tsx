import React, { useState, useEffect, Suspense } from 'react';
import { NavRail } from './components/NavRail';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { SeoManager } from './components/SeoManager';
import { loadContactView, loadProjectsView, loadResumeView, preloadView } from './views/preloaders';
import { ViewState } from './types';
import { AnimatePresence, motion } from 'framer-motion';

const ProjectsView = React.lazy(loadProjectsView);
const ResumeView = React.lazy(loadResumeView);
const ContactView = React.lazy(loadContactView);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

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

  const navigateTo = (view: ViewState) => {
    preloadView(view);
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView setView={navigateTo} preloadView={preloadView} />;
      case 'works': return <ProjectsView />;
      case 'resume': return <ResumeView />;
      case 'contact': return <ContactView />;
      default: return <HomeView setView={navigateTo} preloadView={preloadView} />;
    }
  };

  const appContent = (
    <>
      <SeoManager currentView={currentView} />
      <NavRail
        currentView={currentView}
        setView={navigateTo}
        preloadView={preloadView}
        toggleTheme={toggleTheme}
        isDark={isDark}
      />

      <main className={`flex-1 h-screen overflow-y-auto overflow-x-hidden relative ${isMobilePreview ? 'hidden md:block' : ''}`}>

        {/* iOS 26 Style Mobile Header */}
        {currentView === 'home' && (
          <div className="md:hidden sticky top-0 z-40 glass-panel px-6 py-4 flex justify-between items-center border-b-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shadow-ios-soft bg-surface-variant/50 border border-outline-variant/30">
                <img src="https://avatars.githubusercontent.com/u/70688966?v=4&size=64" alt="Manassé" decoding="async" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-on-surface text-lg tracking-tight">Manassé</span>
            </div>
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-secondary-container dark:bg-surface-variant flex items-center justify-center text-on-secondary-container dark:text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <motion.span
                className="material-icons-round"
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {isDark ? 'light_mode' : 'dark_mode'}
              </motion.span>
            </button>
          </div>
        )}

        {/* Main Content Area with Page Transitions */}
        <div className="p-6 md:p-8 lg:p-12 max-w-7xl mx-auto pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <Suspense fallback={<div className="min-h-48 flex items-center justify-center text-on-surface-variant">Loading…</div>}>
                {renderView()}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <BottomNav currentView={currentView} setView={navigateTo} preloadView={preloadView} />
    </>
  );

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-500 font-sans selection:bg-primary/30 selection:text-primary">
      {isMobilePreview ? (
        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-surface-variant/30 to-surface-variant/10">
          <div className="relative" style={{ width: '390px', height: '844px' }}>
            <div className="absolute inset-0 bg-gray-900 rounded-[60px] shadow-2xl p-3">
              <div className="relative w-full h-full bg-background rounded-[48px] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-50"></div>
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
