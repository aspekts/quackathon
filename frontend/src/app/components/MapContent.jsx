import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '@/img/marker-icon-2x-black.png',
  iconUrl: '@/img/marker-icon-violet.png',
  shadowUrl: '@/img/marker-shadow.png',
});

const MapContent = ({ center }) => {
  const [locations, setLocations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userPosition, setUserPosition] = useState(null);
  const map = useMap();

  // Fetch locations from Supabase
  useEffect(() => {
    const fetchLocations = async () => {
      let query = supabase
        .from('locations')
        .select('*');

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (!error) setLocations(data);
    };

    fetchLocations();
  }, [selectedCategory]);

  // Real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('map-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'locations'
      }, () => fetchLocations())
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // User geolocation
  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          map.flyTo([latitude, longitude], 18);
        },
        error => console.error('Geolocation error:', error),
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [map]);

  // Get emoji for location category
  const getCategoryIcon = (category, name) => {
    if (name.includes('DUSA')) return '🍻';
    switch(category) {
      case 'academic': return '🏛️';
      case 'recreation': return '🎉';
      case 'health': return '🏥';
      case 'services': return '💼';
      default: return '📍';
    }
  };

  return (
    <>
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-[1000] bg-white p-4 rounded-lg shadow-md space-y-2">
        <h3 className="font-semibold">Dundee Campus Map</h3>
        <select 
          className="border rounded px-2 py-1 w-full"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Locations</option>
          <option value="academic">Academic Buildings</option>
          <option value="recreation">Social Spaces</option>
          <option value="health">Health Services</option>
          <option value="services">Student Services</option>
        </select>
      </div>

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* University Locations */}
      <AnimatePresence>
        {locations.map(location => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Popup className="w-72">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {getCategoryIcon(location.category, location.name)}
                    </span>
                    <h3 className="font-bold text-lg">{location.name}</h3>
                  </div>
                  <p className="text-sm">{location.description}</p>
                  
                  {location.opening_hours && (
                    <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
                      <h4 className="font-medium">Opening Hours:</h4>
                      {location.opening_hours['24/7'] ? (
                        <p>Open 24/7</p>
                      ) : (
                        <ul className="list-disc pl-4">
                          {Object.entries(location.opening_hours).map(([day, hours]) => (
                            <li key={day}>{day}: {hours}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 mt-2">
                    <button
                      className="text-sm bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
                      onClick={() => {
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
                        );
                      }}
                    >
                      Get Directions
                    </button>
                  </div>
                </div>
              </Popup>
            </motion.div>
          </Marker>
        ))}
      </AnimatePresence>

      {/* User Position */}
      {userPosition && (
        <Marker position={userPosition}>
          <Popup className="text-sm">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">●</span>
              Your current location
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
};

const MapWrapper = ({ center }) => (
  <MapContainer center={center} zoom={13} className="h-full w-full">
    <MapContent center={center} />
  </MapContainer>
);

export default MapWrapper;