import React, { useState, useEffect, Suspense } from 'react';
import { NavRail } from './components/NavRail';
import { Colophon } from './components/Colophon';
import { TabBar } from './components/TabBar';
import { HomeView } from './views/HomeView';
import { SeoManager } from './components/SeoManager';
import { loadContactView, loadProjectsView, loadResumeView, preloadView } from './views/preloaders';
import { ViewState } from './types';

const ProjectsView = React.lazy(loadProjectsView);
const ResumeView = React.lazy(loadResumeView);
const ContactView = React.lazy(loadContactView);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', getComputedStyle(root).getPropertyValue('--color-paper-hex').trim());
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const navigateTo = (view: ViewState) => {
    preloadView(view);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'auto' });
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

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <SeoManager currentView={currentView} />
      <NavRail
        currentView={currentView}
        setView={navigateTo}
        preloadView={preloadView}
        toggleTheme={toggleTheme}
        isDark={isDark}
      />

      <main id="main">
        <Suspense fallback={<p className="container loading" role="status">Loading…</p>}>
          {renderView()}
        </Suspense>
      </main>

      <Colophon />

      <TabBar currentView={currentView} setView={navigateTo} preloadView={preloadView} />
    </>
  );
};

export default App;
