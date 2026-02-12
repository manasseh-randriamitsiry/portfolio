import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { StatsTile } from '../components/StatsTile';
import { ViewState } from '../types';
import { PROFILE_IMAGE, MAP_TEXTURE } from '../constants';

interface HomeViewProps {
  setView: (view: ViewState) => void;
}

const AboutPreview = () => (
  <div className="bg-secondary-container/30 dark:bg-surface-variant/30 rounded-[2.5rem] p-8 mb-4 flex flex-col items-center text-center relative overflow-hidden border border-outline-variant/20">
    <div className="relative mb-4">
      <div className="w-20 h-20 rounded-full p-1 bg-surface dark:bg-surface-variant shadow-md">
        <img src={PROFILE_IMAGE} alt="Profile" className="w-full h-full rounded-full object-cover" />
      </div>
      <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-surface dark:border-surface-variant rounded-full"></div>
    </div>
    <h3 className="text-lg font-bold text-on-surface mb-2">About Me</h3>
    <p className="text-on-surface-variant text-sm font-medium italic max-w-xs leading-relaxed">
      "Focused on writing clean, maintainable code and building seamless user interfaces that drive business value."
    </p>
  </div>
);

const LocationCard = () => (
  <div className="w-full h-40 rounded-[2.5rem] relative overflow-hidden group border border-outline-variant/20 shadow-sm">
    <div
      className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
      style={{ backgroundImage: `url('${MAP_TEXTURE}')` }}
    ></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
    <div className="absolute bottom-6 left-6 flex items-center gap-3">
      <div className="w-10 h-10 bg-primary dark:bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce">
        <span className="material-icons-round text-on-primary text-lg">location_on</span>
      </div>
      <span className="text-white font-bold text-lg">Based in Madagascar</span>
    </div>
  </div>
);

export const HomeView: React.FC<HomeViewProps> = ({ setView }) => {
  return (
    <div className="max-w-xl mx-auto pb-32">
      <HeroSection setView={setView} />
      <StatsTile />
      <AboutPreview />
      <LocationCard />
    </div>
  );
};
