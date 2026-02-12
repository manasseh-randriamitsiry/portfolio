import React from 'react';
import { ViewState } from '../types';

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
        className={`group flex flex-col items-center gap-1 w-full py-3 relative transition-all duration-300 ${isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
      >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-primary-container text-on-primary-container' : 'group-hover:bg-surface-variant/30 text-on-surface-variant'}`}>
          <span className={`material-icons-round text-xl transition-colors`}>{icon}</span>
        </div>
        <span className={`text-[10px] font-medium transition-colors ${isActive ? 'font-bold text-on-surface' : 'text-on-surface-variant'}`}>{label}</span>
      </button>
    );
  };

  return (
    <nav className="hidden md:flex flex-col items-center fixed left-6 top-1/2 -translate-y-1/2 z-50">
      {/* Main Navigation Pill */}
      <div className="bg-surface-container-high/95 backdrop-blur-md shadow-xl shadow-shadow/20 border border-outline-variant/20 rounded-[2rem] p-3 flex flex-col items-center gap-2">
        {/* Navigation Items */}
        <NavItem view="home" icon="home" label="Home" />
        <NavItem view="works" icon="layers" label="Works" />
        <NavItem view="resume" icon="person" label="Resume" />
        <NavItem view="contact" icon="email" label="Contact" />

        {/* Divider */}
        <div className="w-8 h-[1px] bg-outline-variant/30 my-1"></div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-12 h-12 rounded-xl hover:bg-surface-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all"
        >
          <span className="material-icons-round text-xl">{isDark ? 'light_mode' : 'dark_mode'}</span>
        </button>

        {/* Profile Image */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9CrtA0d-eZnbauheoaM4sgUkvp7X29UYH5tS12RC7oUqPwpdzyBcy5WYQoAVJ5PUP2V3Q-7A0Xc0ro_Zh1BtnuwpzaRj1sdVt_9emd-KqZkq1Xf76U9yDYfUUMpTd9cqq_Ib_ShpaHBggjB2Zl6bqhS2XSBg1NXNma0ZIlYB7M2M4x2yTbJRhFjXgf4Xf6o-Ln6a4j03rdiZ2usCrBZYhcXIpcbFi8iMr8tq1Yup-YNkfOdsJTgA6eHiwR2OqzXmAefV7pVrJkg"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-outline-variant shadow-sm mt-1"
        />
      </div>
    </nav>
  );
};
