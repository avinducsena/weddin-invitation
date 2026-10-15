import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Phone } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface InvitationCardSectionProps {
  wedding: WeddingData;
  guestName: string;
}

export const InvitationCardSection: React.FC<InvitationCardSectionProps> = ({ wedding, guestName }) => {

  return (
    <section id="invitation" className="py-20 sm:py-28 relative bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-2 mb-12"
        >
          <span className="font-royal text-xs uppercase tracking-[0.25em] text-[#8C6207] font-bold">
            Traditional Formal Announcement
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1710]">
            The Sacred Wedding Invitation
          </h2>
          <div className="flex items-center justify-center gap-3 text-[#B8860B] pt-1">
            <div className="w-12 h-[1px] bg-[#D4AF37]" />
            <Sparkles className="w-4 h-4 text-[#B8860B]" />
            <div className="w-12 h-[1px] bg-[#D4AF37]" />
          </div>
        </motion.div>

        {/* The Cardstock Canvas with Foil Glint Animation */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-12 lg:p-16 shadow-[0_25px_60px_rgba(184,134,11,0.15)] border-2 border-[#C5A059]/60 foil-glint-effect transition-all"
        >
          {/* Lotus & Rose Floral Watermark in background */}
          <div className="absolute right-0 bottom-0 w-80 h-80 opacity-12 pointer-events-none translate-x-12 translate-y-12">
            <svg viewBox="0 0 200 200" fill="none" stroke="#8C6207" strokeWidth="1.5">
              <path d="M100 20 C120 60, 160 80, 180 120 C140 120, 110 90, 100 20 Z" />
              <path d="M100 20 C80 60, 40 80, 20 120 C60 120, 90 90, 100 20 Z" />
              <path d="M100 60 C120 90, 150 110, 160 150 C120 150, 110 110, 100 60 Z" />
              <path d="M100 60 C80 90, 50 110, 40 150 C80 150, 90 110, 100 60 Z" />
              <circle cx="100" cy="150" r="10" />
            </svg>
          </div>

          {/* Ornamental Inner Double Border */}
          <div className="border border-[#D4AF37]/50 rounded-2xl p-6 sm:p-10 text-center space-y-6 relative z-10">
            {/* Parents Section with dark high-contrast typography */}
            <div className="space-y-1 text-[#221A14]">
              <p className="font-serif-luxury text-lg sm:text-xl font-bold tracking-wide">
                Mr. Sugath Senanayaka &amp; Mrs. Renuka Wikramarachchi
              </p>
              <p className="font-serif-luxury italic text-sm text-[#735310] font-semibold">
                together with
              </p>
              <p className="font-serif-luxury text-lg sm:text-xl font-bold tracking-wide">
                Mr. Dishantha Kodikara &amp; Mrs. Thushari Hewamanage
              </p>
            </div>

            {/* Request Honour */}
            <p className="font-serif-luxury italic text-base sm:text-lg text-[#403328] font-medium pt-2">
              request the honor of the presence of
            </p>

            {/* Guest Personalization */}
            <div className="py-2">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="inline-block px-6 py-2.5 rounded-xl bg-[#FAF4E8] border border-[#D4AF37]/50 text-[#1B140D] font-serif-luxury text-xl sm:text-2xl font-bold tracking-wide shadow-xs"
              >
                {guestName || 'Mr / Mrs / Ms / Mr & Mrs / Family'}
              </motion.div>
            </div>

            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />

            {/* To Celebrate */}
            <p className="font-serif-luxury text-sm sm:text-base text-[#473B2F] tracking-wide font-medium">
              To Celebrate the wedding of their beloved Son and Daughter
            </p>

            {/* Couple Calligraphy with Gold Shimmer */}
            <div className="py-3">
              <h3 className="font-signature text-5xl sm:text-6xl lg:text-7xl text-[#18130E] font-normal tracking-wide drop-shadow-xs">
                Avindu &amp; Yavishka
              </h3>
            </div>

            {/* Date and Time Breakdown */}
            <div className="space-y-2 pt-2">
              <p className="font-royal text-xs uppercase tracking-[0.25em] text-[#8C6207] font-bold">
                ON
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[#1A140E]">
                <span className="font-serif-luxury text-lg sm:text-xl font-semibold border-b border-[#D4AF37]/50 pb-0.5">
                  Wednesday
                </span>

                <div className="px-5 py-1.5 rounded-lg bg-[#FAF0DC] border border-[#D4AF37]/60 shadow-xs">
                  <span className="font-royal text-2xl sm:text-3xl font-bold text-[#735310] tabular-nums">
                    January 20, 2027
                  </span>
                </div>

                <span className="font-serif-luxury text-lg sm:text-xl font-semibold border-b border-[#D4AF37]/50 pb-0.5">
                  at 9:00 am to 3:30 pm
                </span>
              </div>

              {/* Poruwa Auspicious Time Highlight */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1F1710] text-[#FFE89E] font-royal text-xs sm:text-sm font-semibold tracking-wider shadow-sm poruwa-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFE89E]" />
                  Auspicious Poruwa Ceremony at 9:42 AM
                </span>
              </div>
            </div>

            {/* Venue Location */}
            <div className="pt-4 space-y-1">
              <p className="font-royal text-xs uppercase tracking-[0.25em] text-[#8C6207] font-bold">
                AT
              </p>
              <h4 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#18130E]">
                Ruwanara Royal Majesty
              </h4>
              <p className="font-serif-luxury text-base text-[#473B2F] font-semibold">
                Narammala, Sri Lanka
              </p>
            </div>

            {/* Reception To Follow */}
            <div className="pt-4">
              <p className="font-signature text-3xl sm:text-4xl text-[#7A5B12] font-semibold">
                Reception To Follow
              </p>
            </div>

            {/* Family Contacts */}
            <div className="pt-6 border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-royal text-[#2A2118] font-bold">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>
                  Avindu: <a href="tel:0789481126" className="text-[#8C6207] hover:underline">0789481126</a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>
                  Yavishka: <a href="tel:0760178126" className="text-[#8C6207] hover:underline">0760178126</a>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
