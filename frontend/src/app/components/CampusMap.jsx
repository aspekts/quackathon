// components/CampusMap.js
'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '@/img/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

export default function CampusMap() {
  const position = [56.4579, -2.9796]; // Dundee coordinates

  return (
    <div className="h-[400px] rounded-lg overflow-hidden">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={false}
        className="h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={position}>
          <Popup>
            University of Dundee Main Campus <br /> 
            Start your journey here!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}