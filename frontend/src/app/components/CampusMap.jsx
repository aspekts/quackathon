'use client';
import { useState } from 'react';
import DynamicMapContent from './DynamicMapContent';

export default function CampusMap() {
  const [mapCenter] = useState([56.4579, -2.9796]); // Central Dundee campus

  return (
    <div className="h-[600px] rounded-xl overflow-hidden shadow-lg border">
      <DynamicMapContent center={mapCenter} />
    </div>
  );
}