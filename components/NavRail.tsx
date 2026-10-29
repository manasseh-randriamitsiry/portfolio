import React from 'react';
import { ViewState } from '../types';

interface NavRailProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  preloadView: (view: ViewState) => Promise<unknown>;
  toggleTheme: () => void;
  isDark: boolean;
}

const LINKS: Array<{ view: ViewState; label: string }> = [
  { view: 'works', label: 'Work' },
  { view: 'resume', label: 'Resume' },
  { view: 'contact', label: 'Contact' }
];

export const NavRail: React.FC<NavRailProps> = ({
  currentView,
  setView,
  preloadView,
  toggleTheme,
  isDark
}) => {
  return (
    <header className="masthead">
      <div className="container masthead__bar">
        <p className="masthead__place">Fianarantsoa, Madagascar</p>

        <button
          type="button"
          className="masthead__mark"
          onClick={() => setView('home')}
          onPointerEnter={() => preloadView('home')}
          onFocus={() => preloadView('home')}
        >
          Manassé Randriamitsiry
        </button>

        <div className="masthead__tools">
          <button
            type="button"
            className="toggle"
            onClick={toggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? 'Switch to the light theme' : 'Switch to the dark theme'}
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>

      <div className="container masthead__nav">
        <nav className="masthead__links" aria-label="Sections">
          {LINKS.map(({ view, label }) => (
            <button
              key={view}
              type="button"
              className="navlink"
              aria-current={currentView === view ? 'page' : undefined}
              onClick={() => setView(view)}
              onPointerEnter={() => preloadView(view)}
              onFocus={() => preloadView(view)}
              onTouchStart={() => preloadView(view)}
            >
              {label}
            </button>
          ))}
        </nav>
        <p className="masthead__status">Available for projects</p>
      </div>
    </header>
  );
};
