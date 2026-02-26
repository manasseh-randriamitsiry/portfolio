import React from 'react';
import { ViewState } from '../types';
import { motion } from 'framer-motion';

interface NavRailProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

export const NavRail: React.FC<NavRailProps> = ({ currentView, setView, toggleTheme, isDark }) => {
  const NavItem = ({ view, icon, label }: { view: ViewState; icon: string; label: string }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => setView(view)}
        className={`group flex flex-col items-center justify-center w-14 h-14 relative transition-all duration-300`}
      >
        {isActive && (
          <motion.div
            layoutId="nav-rail-indicator"
            className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-[1.25rem]"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span
          className={`material-icons-round text-[22px] relative z-10 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'
            }`}
        >
          {icon}
        </span>
        <span
          className={`text-[9px] font-bold mt-0.5 relative z-10 transition-colors duration-300 ${isActive ? 'text-primary opacity-100' : 'text-on-surface-variant opacity-70 group-hover:opacity-100'
            }`}
        >
          {label}
        </span>
      </button>
    );
  };

  return (
    <nav className="hidden md:flex flex-col items-center fixed left-6 top-1/2 -translate-y-1/2 z-50">
      <div className="glass-panel p-2 flex flex-col items-center gap-2 rounded-ios-lg shadow-ios-heavy">
        <NavItem view="home" icon="home" label="Home" />
        <NavItem view="works" icon="layers" label="Works" />
        <NavItem view="resume" icon="person" label="Resume" />
        <NavItem view="contact" icon="email" label="Contact" />

        <button
          onClick={toggleTheme}
          className="w-12 h-12 rounded-[1rem] hover:bg-surface-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all group"
        >
          <motion.span
            className="material-icons-round text-xl"
            initial={false}
            animate={{ rotate: isDark ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {isDark ? 'light_mode' : 'dark_mode'}
          </motion.span>
        </button>
      </div>
    </nav>
  );
};
