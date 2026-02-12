import React from 'react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const NavItem = ({ view, icon, label }: { view: ViewState; icon: string; label: string }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => setView(view)}
        className={`flex flex-col items-center justify-center w-full gap-1 group transition-all ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
      >
        <div className={`px-5 py-1 rounded-full transition-all duration-300 ${isActive ? 'bg-primary-container' : 'group-hover:bg-surface-variant'}`}>
          <span className={`material-icons-round text-2xl transition-colors ${isActive ? 'text-on-primary-container' : 'text-on-surface-variant group-hover:text-on-surface'}`}>{icon}</span>
        </div>
        <span className={`text-[10px] uppercase tracking-wide font-bold transition-colors ${isActive ? 'text-on-surface' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 bg-surface-container-high/95 backdrop-blur-md shadow-xl shadow-shadow/20 border border-outline-variant/20 z-50 h-20 flex justify-evenly items-center px-2 rounded-full">
      <NavItem view="home" icon="home" label="Home" />
      <NavItem view="works" icon="grid_view" label="Works" />
      <NavItem view="resume" icon="person" label="Resume" />
      <NavItem view="contact" icon="email" label="Contact" />
    </div>
  );
};
