import React from 'react';
import { ViewState } from '../types';
import { motion } from 'framer-motion';

interface BottomNavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  preloadView: (view: ViewState) => Promise<unknown>;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView, preloadView }) => {
  const NavItem = ({ view, icon, label }: { view: ViewState; icon: string; label: string }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => setView(view)}
        onPointerEnter={() => preloadView(view)}
        onFocus={() => preloadView(view)}
        onTouchStart={() => preloadView(view)}
        className="relative flex flex-col items-center justify-center w-16 h-16 group"
      >
        {isActive && (
          <motion.div
            layoutId="bottom-nav-indicator"
            className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-2xl"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span 
          className={`material-icons-round text-2xl relative z-10 transition-colors duration-300 ${
            isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'
          }`}
        >
          {icon}
        </span>
        <span 
          className={`text-[10px] font-bold mt-1 relative z-10 transition-colors duration-300 ${
            isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'
          }`}
        >
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
      <div className="glass-panel mx-auto max-w-sm rounded-[2rem] p-2 flex justify-between items-center shadow-ios-heavy">
        <NavItem view="home" icon="home" label="Home" />
        <NavItem view="works" icon="grid_view" label="Works" />
        <NavItem view="resume" icon="person" label="Resume" />
        <NavItem view="contact" icon="email" label="Contact" />
      </div>
    </div>
  );
};
