import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Feather } from 'lucide-react';

export const StorySection: React.FC = () => {
  const chapters = [
    {
      num: '01. The Serendipity',
      title: 'When Paths Crossed',
      description:
        'What began with warm smiles and kindred conversations blossomed into an unbreakable bond. Every shared laughter brought us closer to a lifetime of togetherness.',
      icon: Feather,
      featured: false,
    },
    {
      num: '02. The Promise',
      title: 'A Golden Bond',
      description:
        'Surrounded by whispering winds and white roses, we made a heartfelt pledge: to cherish, inspire, and walk hand-in-hand through life’s happiest horizons.',
      icon: Heart,
      featured: true,
    },
    {
      num: '03. The Poruwa',
      title: 'A Lifetime Together',
      description:
        'Now on January 20th, 2027, under the auspicious Poruwa canopy at Ruwanara Royal Majesty, we take our sacred vows before those we hold most dear.',
      icon: Sparkles,
      featured: false,
    },
  ];

  return (
    <section id="story" className="py-20 sm:py-28 relative overflow-hidden bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-2 mb-14"
        >
          <span className="font-royal text-xs uppercase tracking-[0.25em] text-[#8C6207] font-bold">
            Our Love Story
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18130E]">
            Two Hearts, One Sacred Journey
          </h2>
          <div className="flex items-center justify-center gap-3 text-[#B8860B] pt-1">
            <div className="w-12 h-[1px] bg-[#D4AF37]" />
            <Heart className="w-4 h-4 fill-[#B8860B] text-[#B8860B]" />
            <div className="w-12 h-[1px] bg-[#D4AF37]" />
          </div>
        </motion.div>

        {/* 3 Chapters with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chapters.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className={`rounded-2xl p-6 sm:p-8 space-y-4 text-center transition-all ${
                  ch.featured
                    ? 'glass-card-darker border-2 border-[#D4AF37]/60 shadow-lg'
                    : 'glass-card hover:border-[#D4AF37] shadow-sm'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto transition-transform group-hover:scale-110 ${
                    ch.featured
                      ? 'bg-[#18130E] text-[#FFE89E] shadow-md'
                      : 'bg-[#FAF0DC] border border-[#D4AF37]/40 text-[#8C6207]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${ch.featured ? 'fill-current' : ''}`} />
                </div>

                <div className="space-y-1">
                  <span className="font-royal text-xs tracking-widest uppercase text-[#8C6207] font-bold">
                    {ch.num}
                  </span>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1A140E]">
                    {ch.title}
                  </h3>
                </div>

                <p className="font-serif-luxury text-base text-[#473B2F] leading-relaxed font-medium">
                  {ch.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Romantic Calligraphic Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="mt-14 text-center max-w-2xl mx-auto p-8 rounded-2xl bg-white/70 border border-[#D4AF37]/40 shadow-sm"
        >
          <p className="font-signature text-3xl sm:text-4xl text-[#18130E] leading-relaxed">
            &ldquo;In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.&rdquo;
          </p>
          <p className="font-royal text-xs tracking-widest uppercase text-[#8C6207] font-bold mt-3">
            Avindu &amp; Yavishka
          </p>
        </motion.div>
      </div>
    </section>
  );
};
