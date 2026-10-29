import React, { useEffect } from 'react';
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
  <div className="map__frame">
    <div className="map__canvas" role="img" aria-label="Map of Fianarantsoa, Madagascar">
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
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[-21.451424, 47.085474]} icon={customIcon} />
      </MapContainer>
    </div>
  </div>
);

export default LocationCard;
