import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Sparkles, Download, ChevronDown } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface HeroSectionProps {
  wedding: WeddingData;
  guestName: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ wedding, guestName }) => {
  const targetDate = new Date('2027-01-20T09:42:00+05:30'); // Sri Lankan Time Poruwa

  const calculateTimeLeft = (): TimeLeft => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Avindu & Yavishka Wedding//EN',
      'BEGIN:VEVENT',
      'UID:wedding-avindu-yavishka-2027@celebration',
      'DTSTAMP:20261015T120000Z',
      'DTSTART:20270120T033000Z',
      'DTEND:20270120T100000Z',
      'SUMMARY:Avindu & Yavishka Royal Wedding Celebration',
      'DESCRIPTION:Celebrating the marriage of Avindu & Yavishka. Traditional Poruwa ceremony at 9:42 AM followed by wedding reception.',
      'LOCATION:Ruwanara Royal Majesty, Narammala, Sri Lanka',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Avindu_Yavishka_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="top" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background Animated Subtle Glow Orb */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-b from-[#FFF2CC] via-[#FFF9EE]/60 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Personal Guest Greeting */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <span className="inline-block px-5 py-1.5 rounded-full bg-[#FAF0DC] border border-[#D4AF37]/60 text-[#543D1A] font-royal text-xs tracking-wider uppercase font-bold shadow-xs">
              Dearest {guestName}, We Welcome You With Joy
            </span>
          </motion.div>
        )}

        {/* 2-Column Responsive Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Dark High-Contrast Typography & Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center lg:justify-start gap-2 text-xs font-royal tracking-[0.25em] uppercase font-bold text-[#7A5B12]"
              >
                <Sparkles className="w-4 h-4 text-[#B8860B]" />
                <span>The Royal Wedding Celebration</span>
              </motion.div>

              {/* Names in Luxury Calligraphy */}
              <h1 className="font-signature text-6xl sm:text-7xl lg:text-8xl text-[#18130E] leading-[1.08] tracking-normal drop-shadow-xs">
                Avindu &amp; Yavishka
              </h1>

              <p className="font-serif-luxury italic text-xl sm:text-2xl text-[#2F261F] font-semibold">
                Together with their beloved families
              </p>
            </div>

            {/* Deep Contrast Event Date & Poruwa Info Card with Foil Glint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="glass-card-darker rounded-2xl p-5 sm:p-6 border border-[#C5A059]/40 space-y-4 foil-glint-effect"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D4AF37]/30 text-center">
                {/* Date */}
                <div className="pt-2 sm:pt-0 sm:px-2">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-royal uppercase tracking-wider text-[#735310] font-bold">
                    <Calendar className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>Ceremony Date</span>
                  </div>
                  <p className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1A140E] mt-1">
                    20 January 2027
                  </p>
                  <p className="text-xs font-medium text-[#4D3F33]">Wednesday</p>
                </div>

                {/* Auspicious Poruwa Time with animated glowing badge */}
                <div className="pt-3 sm:pt-0 sm:px-2">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-royal uppercase tracking-wider text-[#735310] font-bold">
                    <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>Auspicious Time</span>
                  </div>
                  <p className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#8C6207] mt-1">
                    9:42 AM
                  </p>
                  <p className="text-xs font-medium text-[#4D3F33]">Poruwa Ceremony</p>
                </div>

                {/* Venue */}
                <div className="pt-3 sm:pt-0 sm:px-2">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-royal uppercase tracking-wider text-[#735310] font-bold">
                    <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>The Venue</span>
                  </div>
                  <p className="font-serif-luxury text-lg sm:text-xl font-bold text-[#1A140E] mt-1 line-clamp-1">
                    Ruwanara Royal
                  </p>
                  <p className="text-xs font-medium text-[#4D3F33]">Narammala, Sri Lanka</p>
                </div>
              </div>
            </motion.div>

            {/* Live Countdown Timer with animated scale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-xs font-royal tracking-wider text-[#5A4518] font-bold">
                <span className="uppercase">Countdown to Auspicious Poruwa Moment</span>
                <span className="tabular-nums">20.01.2027 · 09:42 AM</span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="bg-[#FFFDF9] border border-[#D4AF37]/50 rounded-xl p-3 text-center shadow-xs hover:border-[#D4AF37] hover:shadow-md transition-shadow"
                  >
                    <div className="font-royal text-2xl sm:text-4xl font-bold text-[#1A140E] tabular-nums">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] sm:text-xs font-royal tracking-widest uppercase text-[#735310] mt-1 font-semibold">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Interactive CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#rsvp"
                className="px-7 py-3 text-sm font-semibold tracking-wider uppercase font-royal text-white bg-gradient-to-r from-[#946F19] via-[#B8860B] to-[#7A5B12] rounded-xl shadow-md hover:shadow-xl hover:scale-102 transition-all cursor-pointer"
              >
                Confirm Your RSVP
              </a>

              <button
                onClick={handleAddToCalendar}
                className="px-5 py-3 text-sm font-medium tracking-wide font-royal text-[#2A2118] bg-white/80 border border-[#D4AF37]/50 hover:bg-[#FAF3E0] hover:scale-102 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4 text-[#946F19]" />
                <span>Add to Calendar</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Marquee Hero Portrait with White Roses & Gold Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none group">
              {/* Gold foil multi-layer border frame with animated aura */}
              <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-br from-[#D4AF37] via-[#FFF3C4] to-[#997314] opacity-80 blur-xs group-hover:opacity-100 transition-opacity" />

              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white aspect-[4/5] bg-[#EFECE6]">
                <img
                  src={wedding.heroImage}
                  alt="Avindu and Yavishka Royal Wedding Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700"
                />

                {/* Scrim overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Floating caption on image */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="font-royal text-[10px] tracking-[0.25em] uppercase text-[#EAD8B1] font-semibold">
                    The Auspicious Union
                  </p>
                  <p className="font-signature text-3xl sm:text-4xl text-white drop-shadow-md">
                    Avindu &amp; Yavishka
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 flex flex-col items-center justify-center text-xs font-royal text-[#735310] font-semibold gap-1"
        >
          <span>Scroll to Explore Invitation</span>
          <ChevronDown className="w-4 h-4 text-[#B8860B]" />
        </motion.div>
      </div>
    </section>
  );
};
