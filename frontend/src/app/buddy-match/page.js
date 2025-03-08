import BuddySwiper from '@/components/BuddySwiper';
import { Card } from '@/components/ui/card';

export default function BuddyMatchPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Find Your Campus Buddy</h1>
      <Card className="p-6">
        <BuddySwiper />
      </Card>
    </div>
  );
}