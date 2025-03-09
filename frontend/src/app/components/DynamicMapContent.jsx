import dynamic from 'next/dynamic';

const MapContent = dynamic(() => import('./MapContent'), {
  ssr: false,
});

export default MapContent;