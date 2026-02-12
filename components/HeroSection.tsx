import React from 'react';
import { ViewState } from '../types';

interface HeroSectionProps {
  setView: (view: ViewState) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setView }) => {
  return (
    <div className="flex flex-col gap-6 md:gap-8 mb-8">
      {/* Badge */}
      <div className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container text-on-primary-container text-sm font-semibold border border-primary/20">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        Available for Projects
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface leading-[1.15] mb-4">
          Randriamitsiry<br />
          Valimbavaka<br />
          <span className="text-primary">Manassé</span>
        </h1>
        <p className="text-base md:text-lg text-on-surface-variant font-medium leading-relaxed max-w-md">
          FullStack Developer | Flutter, Symfony & React Expert crafting high-performance digital experiences.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <button
          onClick={() => setView('works')}
          className="h-14 px-8 bg-primary hover:bg-primary/90 text-on-primary rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-95"
        >
          Explore Projects
          <span className="material-icons-round">arrow_forward</span>
        </button>

        <a
          href="/assets/CV%20Randriamitsiry%20Valimbavaka%20Manasse.en.pdf"
          download
          className="h-14 px-8 bg-surface border-2 border-outline-variant text-on-surface rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all hover:bg-surface-variant/30 hover:border-primary/30 active:scale-95 shadow-sm"
        >
          Download CV
          <span className="material-icons-round text-primary">download</span>
        </a>
      </div>

      {/* Tech Expertise Row */}
      <div className="mt-4 p-5 bg-surface-container border border-outline-variant/20 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span className="material-icons-round text-sm">code</span>
          </div>
          <span className="font-bold text-on-surface text-sm">Tech Expertise</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Flutter', 'Symfony', 'React', 'Node.js', 'Tailwind'].map(tech => (
            <span key={tech} className="px-4 py-2 bg-surface-variant/30 rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/20 hover:border-primary/30 transition-colors cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
