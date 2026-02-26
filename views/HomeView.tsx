import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { StatsTile } from '../components/StatsTile';
import { ViewState } from '../types';
import { PROFILE_IMAGE, MAP_TEXTURE } from '../constants';
import { motion } from 'framer-motion';

interface HomeViewProps {
  setView: (view: ViewState) => void;
}

const AboutPreview = () => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="glass-panel rounded-ios-lg p-8 mb-6 flex flex-col items-center text-center relative overflow-hidden shadow-ios-soft border border-outline-variant/20"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-tertiary/5 rounded-full blur-2xl"></div>

    <div className="relative mb-5 z-10">
      <div className="w-24 h-24 rounded-full p-1.5 bg-surface/80 dark:bg-surface-variant/80 backdrop-blur-md shadow-sm border border-outline-variant/30">
        <img src={PROFILE_IMAGE} alt="Profile" className="w-full h-full rounded-full object-cover" />
      </div>
      <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-surface dark:border-surface-variant rounded-full shadow-sm"></div>
    </div>
    <h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight z-10">Briefly About Me</h3>
    <p className="text-on-surface-variant/90 text-sm font-medium italic max-w-sm leading-relaxed z-10">
      "Focused on writing clean, maintainable code and building seamless user interfaces that drive real business value."
    </p>
  </motion.div>
);

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icon in react-leaflet
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map resize and fix grey tile issue
const MapUpdater = () => {
  const map = useMap();

  useEffect(() => {
    // Force a resize calculation shortly after mount
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    // Add window resize listener as fallback
    const handleResize = () => {
      map.invalidateSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  return null;
};

const LocationCard = () => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="w-full h-48 rounded-ios-lg relative overflow-hidden group shadow-ios-soft border border-outline-variant/20 bg-surface-variant/30 z-0"
  >
    <div className="absolute inset-0 grayscale-[80%] opacity-80 group-hover:grayscale-[40%] group-hover:opacity-100 transition-all duration-1000 z-0 pointer-events-none">
      <MapContainer
        center={[-21.451424, 47.085474]}
        zoom={13}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
        key="location-map"
      >
        <MapUpdater />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[-21.451424, 47.085474]} icon={customIcon}></Marker>
      </MapContainer>
    </div>

    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10"></div>

    <div className="absolute bottom-6 left-6 flex items-center gap-4 z-20 pointer-events-none">
      <div className="w-12 h-12 bg-primary/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg animate-bounce border border-white/20">
        <span className="material-icons-round text-white text-xl">location_on</span>
      </div>
      <div>
        <span className="text-white/80 text-xs font-bold uppercase tracking-wider block mb-0.5">Based In</span>
        <span className="text-white font-bold text-xl tracking-tight">Madagascar</span>
      </div>
    </div>
  </motion.div>
);

export const HomeView: React.FC<HomeViewProps> = ({ setView }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto pb-32"
    >
      <HeroSection setView={setView} />
      <StatsTile />
      <LocationCard />
    </motion.div>
  );
};
