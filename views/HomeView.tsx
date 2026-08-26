import React, { Suspense, useEffect, useRef, useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { StatsTile } from '../components/StatsTile';
import { ViewState } from '../types';
import { PROFILE_IMAGE } from '../constants';
import { motion } from 'framer-motion';

const LocationCard = React.lazy(() => import('../components/LocationCard'));

const DeferredLocationCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: '300px 0px' }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
        <Suspense fallback={<div className="w-full h-48 rounded-ios-lg bg-surface-variant/40 animate-pulse" aria-label="Loading location" />}>
          <LocationCard />
        </Suspense>
      ) : (
        <div className="w-full h-48 rounded-ios-lg bg-surface-variant/40 border border-outline-variant/20 flex items-end p-6" aria-label="Fianarantsoa, Madagascar">
          <span className="text-on-surface-variant text-sm font-semibold">Fianarantsoa, Madagascar</span>
        </div>
      )}
    </div>
  );
};

interface HomeViewProps {
  setView: (view: ViewState) => void;
  preloadView: (view: ViewState) => Promise<unknown>;
}

const AboutPreview = () => (
  <motion.section
    aria-labelledby="about-manasseh"
    whileHover={{ scale: 1.02 }}
    className="glass-panel rounded-ios-lg p-8 mb-6 flex flex-col items-center text-center relative overflow-hidden shadow-ios-soft border border-outline-variant/20"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-tertiary/5 rounded-full blur-2xl"></div>

    <div className="relative mb-5 z-10">
      <div className="w-24 h-24 rounded-full p-1.5 bg-surface/80 dark:bg-surface-variant/80 backdrop-blur-md shadow-sm border border-outline-variant/30">
        <img src={PROFILE_IMAGE} alt="Manassé Randriamitsiry Valimbavaka, Malagasy full-stack developer" loading="lazy" decoding="async" className="w-full h-full rounded-full object-cover" />
      </div>
      <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-surface dark:border-surface-variant rounded-full shadow-sm"></div>
    </div>
    <h2 id="about-manasseh" className="text-xl font-bold text-on-surface mb-3 tracking-tight z-10">Malagasy developer, building for the web and mobile</h2>
    <p className="text-on-surface-variant/90 text-sm font-medium max-w-sm leading-relaxed z-10">
      I’m Manassé Randriamitsiry Valimbavaka—also known online as Manasseh Randriamitsiry. From Fianarantsoa, Madagascar, I create maintainable Flutter, Symfony, React, and PHP products for teams that value thoughtful user experiences.
    </p>
    <p lang="fr" className="text-on-surface-variant/80 text-sm mt-3 max-w-sm leading-relaxed z-10">
      Développeur malgache, je collabore aussi en français sur des applications mobiles Flutter et des produits web full-stack.
    </p>
  </motion.section>
);

export const HomeView: React.FC<HomeViewProps> = ({ setView, preloadView }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto pb-32"
    >
      <HeroSection setView={setView} preloadView={preloadView} />
      <AboutPreview />
      <StatsTile />
      <DeferredLocationCard />
    </motion.div>
  );
};
