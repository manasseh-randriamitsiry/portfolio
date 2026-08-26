import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapUpdater = () => {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 100);
    const handleResize = () => map.invalidateSize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  return null;
};

const LocationCard: React.FC = () => (
  <motion.section
    aria-label="Location: Fianarantsoa, Madagascar"
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
        style={{ height: '100%', width: '100%' }}
      >
        <MapUpdater />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <Marker position={[-21.451424, 47.085474]} icon={customIcon} />
      </MapContainer>
    </div>

    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />

    <div className="absolute bottom-6 left-6 flex items-center gap-4 z-20 pointer-events-none">
      <div className="w-12 h-12 bg-primary/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg animate-bounce border border-white/20">
        <span className="material-icons-round text-white text-xl">location_on</span>
      </div>
      <div>
        <span className="text-white/80 text-xs font-bold uppercase tracking-wider block mb-0.5">Based In</span>
        <span className="text-white font-bold text-xl tracking-tight">Fianarantsoa, Madagascar</span>
      </div>
    </div>
  </motion.section>
);

export default LocationCard;
