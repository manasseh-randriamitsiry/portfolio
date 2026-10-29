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

/** The small-screen nav: four tabs along the bottom, home always first. */
export const TabBar: React.FC<TabBarProps> = ({ currentView, setView, preloadView }) => (
  <nav className="tabbar" aria-label="Sections">
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
        {label}
      </button>
    ))}
  </nav>
);
