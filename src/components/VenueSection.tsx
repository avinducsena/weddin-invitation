import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Compass, Car, Phone, ExternalLink, Sparkles } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface VenueSectionProps {
  wedding: WeddingData;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ wedding }) => {
  return (
    <section id="venue" className="py-20 sm:py-28 relative bg-[#FFFDF9] border-t border-[#D4AF37]/30 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-2 mb-12"
        >
          <span className="font-royal text-xs uppercase tracking-[0.25em] text-[#8C6207] font-bold">
            Venue &amp; Location Guide
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18130E]">
            Ruwanara Royal Majesty
          </h2>
          <p className="font-serif-luxury text-base text-[#473B2F] max-w-xl mx-auto font-medium">
            Narammala, Sri Lanka · A grand majestic destination for our sacred wedding celebrations.
          </p>
        </motion.div>

        {/* 2-Column Split: Map & Location Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Venue Details, Travel Directions, Contacts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div className="glass-card-darker rounded-2xl p-6 sm:p-8 space-y-6 border border-[#C5A059]/40 shadow-sm foil-glint-effect">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#18130E] text-[#FFE89E] shrink-0 shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#18130E]">
                    Ruwanara Royal Majesty
                  </h3>
                  <p className="font-serif-luxury text-base text-[#473B2F] mt-1 font-semibold">
                    Kurunegala Road, Narammala, North Western Province, Sri Lanka
                  </p>
                </div>
              </div>

              {/* Coordinates and Landmark */}
              <div className="border-t border-[#D4AF37]/25 pt-4 space-y-3 text-xs font-royal text-[#423326]">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#8C6207]" />
                  <span>GPS: 7.4096942° N, 80.2057845° E</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#8C6207]" />
                  <span>Convenient On-site Valet &amp; Reserved Guest Parking Available</span>
                </div>
              </div>

              {/* Direct Open in Google Maps */}
              <div className="pt-2">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={wedding.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-xl text-xs sm:text-sm font-royal uppercase tracking-wider font-bold text-white bg-gradient-to-r from-[#946F19] via-[#B8860B] to-[#7A5B12] hover:from-[#A87F1E] hover:to-[#8B6815] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps Navigation</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </motion.a>
              </div>
            </div>

            {/* Dress Code & Assistance */}
            <div className="glass-card rounded-2xl p-6 space-y-3 border border-[#D4AF37]/35 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-royal tracking-widest uppercase text-[#8C6207] font-bold">
                <Sparkles className="w-4 h-4 text-[#B8860B]" />
                <span>Wedding Attire &amp; Palette</span>
              </div>
              <p className="font-serif-luxury text-sm text-[#473B2F] font-medium leading-relaxed">
                Guests are warmly invited to join in <span className="font-bold text-[#18130E]">Traditional Sri Lankan, National, or Formal Evening Attire</span> in shades of cream, gold, champagne, and gentle floral accents.
              </p>
            </div>

            {/* Need Directions? Contact Phone */}
            <div className="glass-card rounded-2xl p-5 border border-[#D4AF37]/30 flex items-center justify-between gap-4 shadow-xs">
              <div>
                <p className="font-royal text-xs uppercase tracking-wider text-[#735310] font-bold">
                  Questions on Arrival?
                </p>
                <p className="font-serif-luxury text-sm text-[#473B2F] font-semibold">
                  Call our family coordinator on the day
                </p>
              </div>
              <div className="flex gap-2">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="tel:0789481126"
                  className="p-2.5 rounded-xl bg-[#FAF0DC] hover:bg-[#F3E5C2] text-[#8C6207] border border-[#D4AF37]/40 transition-colors shadow-xs"
                  title="Call Avindu"
                >
                  <Phone className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Embedded Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-xl bg-[#E8E4DC] flex-1 min-h-[360px] lg:min-h-full">
              <iframe
                title="Ruwanara Royal Majesty Location Map"
                src="https://maps.google.com/maps?q=7.4096942,80.2057845&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
              />

              {/* Map Floating Badge with soft shadow */}
              <div className="absolute top-4 left-4 glass-card-darker rounded-xl px-4 py-2 text-xs font-royal text-[#18130E] font-bold shadow-md flex items-center gap-2 border border-[#D4AF37]/50">
                <MapPin className="w-4 h-4 text-[#B8860B]" />
                <span>Ruwanara Royal Majesty · Narammala</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
