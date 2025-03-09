// app/map/page.js
import CampusMap from '@/app/components/CampusMap';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MapPage() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">University of Dundee Campus Map</h1>
        <Button asChild>
          <Link href="/dashboard">
            Back to Dashboard
          </Link>
        </Button>
      </div>
      <CampusMap />
    </div>
  );
}