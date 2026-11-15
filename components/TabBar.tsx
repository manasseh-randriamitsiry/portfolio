import React from 'react';
import { ViewState } from '../types';

interface TabBarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  preloadView: (view: ViewState) => Promise<unknown>;
}

const TABS: Array<{ view: ViewState; label: string }> = [
  { view: 'home', label: 'Home' },
  { view: 'works', label: 'Work' },
  { view: 'resume', label: 'Resume' },
  { view: 'contact', label: 'Contact' }
];

const ICONS: Record<ViewState, React.ReactNode> = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.2 12 3l9 7.2" />
      <path d="M5 9.4V21h5v-6h4v6h5V9.4" />
    </svg>
  ),
  works: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 9h18" />
      <path d="M9 9v11" />
    </svg>
  ),
  resume: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.8 6.4 8.2 6.1 8.2-6.1" />
    </svg>
  )
};

/** The small-screen nav: a floating pill with a home button, the way huhu.to
 *  does it, restated in the page's own paper and ink. */
export const TabBar: React.FC<TabBarProps> = ({ currentView, setView, preloadView }) => {
  const active = Math.max(
    0,
    TABS.findIndex((tab) => tab.view === currentView)
  );

  return (
    <nav
      className="tabbar"
      aria-label="Sections"
      style={
        {
          '--tab-count': TABS.length,
          '--tab-active': active
        } as React.CSSProperties
      }
    >
      <span className="tabbar__pill" aria-hidden="true" />

      {TABS.map(({ view, label }) => (
        <button
          key={view}
          type="button"
          className="tabbar__tab"
          aria-current={currentView === view ? 'page' : undefined}
          onClick={() => setView(view)}
          onPointerEnter={() => preloadView(view)}
          onFocus={() => preloadView(view)}
        >
          {ICONS[view]}
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
};
