'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { mockBuddies } from '@/lib/constants';

export default function BuddySwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState(0);

  const handleSwipe = (direction) => {
    setExitX(direction === 'right' ? 500 : -500);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % mockBuddies.length);
      setExitX(0);
    }, 200);
  };

  return (
    <div className="relative h-[400px] w-[300px] mx-auto">
      {mockBuddies.slice(currentIndex, currentIndex + 1).map((buddy) => (
        <motion.div
          key={buddy.id}
          initial={{ scale: 0.95, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          exit={{ x: exitX, opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute inset-0 bg-background rounded-xl p-6 shadow-lg"
        >
          <div className="flex flex-col items-center h-full">
            <img 
              src={buddy.avatar} 
              alt={buddy.name}
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">{buddy.name}</h3>
            <p className="text-muted-foreground">{buddy.course}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {buddy.interests.map((interest) => (
                <span 
                  key={interest}
                  className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
            <div className="mt-auto flex gap-4">
              <Button 
                variant="destructive" 
                size="lg"
                onClick={() => handleSwipe('left')}
              >
                Pass
              </Button>
              <Button 
                variant="default" 
                size="lg"
                onClick={() => handleSwipe('right')}
              >
                Connect
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}