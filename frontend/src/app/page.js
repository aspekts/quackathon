// app/(dashboard)/page.js
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion }  from 'framer-motion';
import { ChevronRight, MapPin, Calendar, Users } from 'lucide-react';

// Motion variants for animations
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-20 text-center"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={slideUp}>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Settle into University Life<br />
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                With Confidence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your all-in-one guide to navigating campus, connecting with peers, and<br /> 
              accessing essential resources
            </p>
            
            <div className="flex justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/buddy-match">
                <Button variant="outline" size="lg">
                  Find Buddies
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Thrive
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              variants={slideUp}
              initial="hidden"
              animate="visible"
            >
              <Link href="/map">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Interactive Campus Map</h3>
                  <p className="text-muted-foreground">
                    Never get lost with real-time navigation and key location markers
                  </p>
                </div>
              </Card>
              </Link>
            </motion.div>

            <motion.div 
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Link href="/buddy-match">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-blue-100 rounded-full mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Buddy Matching</h3>
                  <p className="text-muted-foreground">
                    Connect with compatible peers through our smart matching system
                  </p>
                </div>
              </Card>
              </Link>
            </motion.div>

            <motion.div 
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <Link href="/calendar">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-green-100 rounded-full mb-4">
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Event Calendar</h3>
                  <p className="text-muted-foreground">
                    Stay updated with university events, deadlines, and social activities
                  </p>
                </div>
              </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <Card className="p-8 bg-gradient-to-r from-primary to-blue-600 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-8">
                Join thousands of students who have already found their campus community
              </p>
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="gap-2">
                  Launch Your Dashboard
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}