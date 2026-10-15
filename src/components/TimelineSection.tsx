import React from 'react';
import { motion } from 'motion/react';
import { Clock, Sparkles, Music, Utensils, Camera, Heart, Wine } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const events = [
    {
      time: '09:00 AM',
      title: 'Guest Arrival & Welcome Refreshments',
      description: 'Guests arrive at Ruwanara Royal Majesty. Enjoy morning welcome mocktails and traditional Sri Lankan sweetmeats.',
      icon: Clock,
      highlight: false,
    },
    {
      time: '09:42 AM',
      title: 'Auspicious Poruwa Ceremony',
      description: 'The sacred Poruwa ritual begins at the auspicious moment. Chanting of Jayamangala Gatha, exchange of betel leaves, and traditional blessings.',
      icon: Sparkles,
      highlight: true,
      tag: 'Sacred Nekath Timing',
    },
    {
      time: '10:45 AM',
      title: 'Traditional Blessings & Magul Bera',
      description: 'Resounding drum rhythms of Magul Bera, lighting of the traditional oil lamp, and heartfelt blessings from parents and elders.',
      icon: Music,
      highlight: false,
    },
    {
      time: '11:30 AM',
      title: 'Family & Friends Photo Sessions',
      description: 'Cherished group photography with the newlywed couple in front of the royal floral arch.',
      icon: Camera,
      highlight: false,
    },
    {
      time: '12:30 PM',
      title: 'Grand Royal Banquet Lunch',
      description: 'A lavish gourmet buffet lunch featuring exquisite culinary delights, live carving stations, and international desserts.',
      icon: Utensils,
      highlight: false,
    },
    {
      time: '02:00 PM',
      title: 'Cake Cutting, Champagne Toast & Dance',
      description: 'Cutting of the royal wedding cake, heartfelt toasts by the best man and maid of honor, followed by music and celebrations.',
      icon: Wine,
      highlight: false,
    },
    {
      time: '03:30 PM',
      title: 'Sending-off & Farewell',
      description: 'Warm congratulations and showering of flower petals as Avindu and Yavishka depart for their new beginning.',
      icon: Heart,
      highlight: false,
    },
  ];

  return (
    <section id="timeline" className="py-20 sm:py-28 relative bg-[#FFFDF9] border-y border-[#D4AF37]/30 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-2 mb-16"
        >
          <span className="font-royal text-xs uppercase tracking-[0.25em] text-[#8C6207] font-bold">
            Order of Events · 20 January 2027
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18130E]">
            The Day's Auspicious Timeline
          </h2>
          <p className="font-serif-luxury text-base text-[#473B2F] max-w-xl mx-auto font-medium">
            From the sacred Poruwa ceremony to the grand banquet celebrations, here is the itinerary for our special day.
          </p>
        </motion.div>

        {/* Timeline List with Illuminated Track */}
        <div className="relative border-l-2 border-[#D4AF37]/50 ml-4 sm:ml-32 space-y-8 pb-4">
          {events.map((event, idx) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="relative pl-6 sm:pl-8 group"
              >
                {/* Time badge for desktop aligned left */}
                <div className="hidden sm:block absolute -left-36 top-1 w-28 text-right font-royal text-sm font-bold text-[#735310] tabular-nums">
                  {event.time}
                </div>

                {/* Node marker */}
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    event.highlight
                      ? 'bg-[#18130E] border-[#D4AF37] text-[#FFE89E] scale-110 shadow-md ring-4 ring-[#FAF0DC] poruwa-pulse'
                      : 'bg-white border-[#B8860B] text-[#8C6207] group-hover:border-[#18130E] shadow-xs'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.div>

                {/* Content Card with Hover Lift */}
                <motion.div
                  whileHover={{ y: -3, x: 2 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className={`rounded-2xl p-5 sm:p-6 transition-all ${
                    event.highlight
                      ? 'glass-card-darker border-2 border-[#D4AF37] shadow-md'
                      : 'glass-card hover:border-[#D4AF37]/60 shadow-xs'
                  }`}
                >
                  {/* Mobile time display */}
                  <div className="sm:hidden font-royal text-xs font-bold text-[#8C6207] uppercase tracking-wider mb-1 tabular-nums">
                    {event.time}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#18130E]">
                      {event.title}
                    </h3>
                    {event.tag && (
                      <span className="px-3 py-1 rounded-full bg-[#18130E] text-[#FFE89E] font-royal text-[10px] tracking-wider uppercase font-bold shadow-xs">
                        {event.tag}
                      </span>
                    )}
                  </div>

                  <p className="font-serif-luxury text-sm sm:text-base text-[#473B2F] mt-2 leading-relaxed font-medium">
                    {event.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
