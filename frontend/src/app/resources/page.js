// app/(dashboard)/page.js
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
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
      {/* Features Grid */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Essential Resources To Survive In University Of Dundee!
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              variants={slideUp}
              initial="hidden"
              animate="visible"
            >
              <Link href="https://www.dusa.co.uk/societies/a-z">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl font-semibold mb-2">Societies</h3>
                    <p className="text-muted-foreground">
                      Find a exciting new society for you!
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* Buddy Matching Card */}
            <motion.div 
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Link href="https://www.dundee.ac.uk/accommodation">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl font-semibold mb-2">University Accomodation</h3>
                    <p className="text-muted-foreground">
                      Find a cozy for your stay at Univeristy!
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* Event Calendar Card */}
            <motion.div 
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <Link href="https://www.dundee.ac.uk/sport-active-health"> 
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl font-semibold mb-2">Event Calendar</h3>
                    <p className="text-muted-foreground">
                      Stay updated with university events, deadlines, and social activities
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
              <Link href="https://www.dundee.ac.uk/sports-union/clubs"> 
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl font-semibold mb-2">Join A Sports Club</h3>
                    <p className="text-muted-foreground">
                      Stay fit with University Sports Clubs!
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
              <Link href="https://www.dundee.ac.uk/international-advice-service"> 
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl font-semibold mb-2">Support For International Students</h3>
                    <p className="text-muted-foreground">
                      Looking for help as an International Student? Find it here!
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
              <Link href="https://dundee.primo.exlibrisgroup.com/discovery/search?vid=44DUN_INST:dun&lang=en"> 
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl font-semibold mb-2">Library Services</h3>
                    <p className="text-muted-foreground">
                      Looking to unleash the full potential of the Library! Click here!
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Have more questions? Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <motion.div 
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold mb-2">Have more questions?</h3>
                <p className="text-muted-foreground mb-4">
                  Visit our external FAQ page for more information.
                </p>
                <a 
                  href="https://www.dundee.ac.uk/locations/enquiry-centre" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Go to FAQ
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}