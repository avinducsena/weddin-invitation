/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { WeddingData } from './types/wedding';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InvitationCardSection } from './components/InvitationCardSection';
import { StorySection } from './components/StorySection';
import { TimelineSection } from './components/TimelineSection';
import { GallerySection } from './components/GallerySection';
import { VenueSection } from './components/VenueSection';
import { RsvpSection } from './components/RsvpSection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { RosePetals } from './components/RosePetals';

// Fallback initial data in case of immediate rendering
const INITIAL_WEDDING: WeddingData = {
  coupleNames: "Avindu & Yavishka",
  groomName: "Avindu",
  brideName: "Yavishka",
  date: "2027-01-20",
  dateFormatted: "Wednesday, January 20, 2027",
  poruwaTime: "9:42 AM",
  ceremonyTime: "9:00 AM – 3:30 PM",
  venueName: "Ruwanara Royal Majesty",
  venueCity: "Narammala, Sri Lanka",
  mapsUrl: "https://www.google.com/maps/place/Ruwanara+Royal+Majestry/@7.4096942,80.2057845,17z/data=!3m1!4b1!4m9!3m8!1s0x3ae323a00180e845:0x1d5459078a749b5a!5m2!4m1!1i2!8m2!3d7.4096942!4d80.2057845!16s%2Fg%2F11fctc63w2!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MTAxMi4wIKXMDSoASAFQAw%3D%3D",
  contactAvindu: "0789481126",
  contactYavishka: "0760178126",
  heroImage: "/src/assets/images/wedding_hero_banner_1792088294742.jpg",
  gallery: [
    {
      id: "gal-1",
      title: "Eternal Promise",
      category: "Ceremony Moments",
      caption: "Surrounded by blooming white roses, beginning our journey of everlasting love.",
      imageUrl: "/src/assets/images/wedding_hero_banner_1792088294742.jpg"
    },
    {
      id: "gal-2",
      title: "A Garden Walk",
      category: "Love Story",
      caption: "Walking hand in hand through the serene paths of love and endless happiness.",
      imageUrl: "/src/assets/images/couple_romantic_stroll_1792088296007.jpg"
    },
    {
      id: "gal-3",
      title: "Golden Bond",
      category: "Pre-Shoot",
      caption: "Two golden rings, a bouquet of white roses, and hearts beating as one.",
      imageUrl: "/src/assets/images/couple_rings_hands_1792088296866.jpg"
    },
    {
      id: "gal-4",
      title: "Royal Banquet Setting",
      category: "Celebration",
      caption: "Majestic chandeliers, golden candlelights, and joyful reunions at Ruwanara Royal Majesty.",
      imageUrl: "/src/assets/images/wedding_venue_reception_1792088296294.jpg"
    }
  ]
};

export default function App() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [wedding, setWedding] = useState<WeddingData>(INITIAL_WEDDING);
  const [guestName, setGuestName] = useState<string>('');
  const [adminOpen, setAdminOpen] = useState(false);

  // Extract personalized guest name from URL parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get('to') || params.get('guest') || params.get('name') || '';
      if (toParam) {
        setGuestName(toParam);
      }
    }
  }, []);

  // Fetch updated wedding details from server
  useEffect(() => {
    fetch('/api/wedding-details')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.wedding) {
          setWedding(data.wedding);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241E19] relative selection:bg-[#E2C792] selection:text-[#18130E]">
      {/* Interactive Wax Sealed Royal Envelope Intro */}
      <AnimatePresence>
        {!envelopeOpen && (
          <EnvelopeIntro
            onOpen={() => setEnvelopeOpen(true)}
            guestName={guestName}
          />
        )}
      </AnimatePresence>

      {/* Subtle White Rose Petals Falling in Background */}
      <RosePetals />

      {/* Top Bar Navigation */}
      <Navbar
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenEnvelope={() => setEnvelopeOpen(false)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Live Countdown */}
        <HeroSection wedding={wedding} guestName={guestName} />

        {/* Sacred Formal Invitation Card Announcement */}
        <InvitationCardSection wedding={wedding} guestName={guestName} />

        {/* Love Story Journey */}
        <StorySection />

        {/* Ceremony Itinerary & Poruwa Timing */}
        <TimelineSection />

        {/* Interactive Photo Gallery with Lightbox */}
        <GallerySection photos={wedding.gallery} />

        {/* Venue Guide & Interactive Map */}
        <VenueSection wedding={wedding} />

        {/* Private RSVP Form */}
        <RsvpSection initialGuestName={guestName} />
      </main>

      {/* Quiet Footer */}
      <Footer
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenEnvelope={() => setEnvelopeOpen(false)}
      />

      {/* Admin Suite Modal */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        wedding={wedding}
        onUpdateWedding={(updated) => setWedding(updated)}
      />
    </div>
  );
}
