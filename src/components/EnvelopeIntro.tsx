import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { playSealBreakSound } from '../utils/audio';

interface EnvelopeIntroProps {
  onOpen: () => void;
  guestName: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onOpen, guestName }) => {
  const [openingStage, setOpeningStage] = useState<'idle' | 'breaking' | 'opening' | 'revealed'>('idle');
  const [isHovered, setIsHovered] = useState(false);

  // Sparkle burst particles
  const particles: Particle[] = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i / 24) * 2 * Math.PI;
    const distance = Math.random() * 120 + 80;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: Math.random() * 6 + 4,
      delay: Math.random() * 0.1,
    };
  });

  const handleOpen = () => {
    if (openingStage !== 'idle') return;
    try {
      playSealBreakSound();
    } catch {
      // Audio fallback
    }

    setOpeningStage('breaking');

    setTimeout(() => {
      setOpeningStage('opening');
    }, 450);

    setTimeout(() => {
      setOpeningStage('revealed');
    }, 1200);

    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  const isTriggered = openingStage !== 'idle';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#140F0A] via-[#241A12] to-[#0E0A07] overflow-hidden"
    >
      {/* Dynamic ambient gold background glow */}
      <motion.div
        animate={{
          scale: isTriggered ? [1, 1.4, 1.6] : [1, 1.08, 1],
          opacity: isTriggered ? [0.4, 0.8, 0.3] : [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: isTriggered ? 0 : Infinity }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#D4AF37]/25 via-[#FFE699]/20 to-transparent blur-3xl" />
      </motion.div>

      <div className="relative w-full max-w-lg flex flex-col items-center">
        {/* Top Announcement */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-5 text-center"
        >
          <motion.div
            animate={{ letterSpacing: ['0.25em', '0.32em', '0.25em'] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="font-royal text-xs uppercase text-[#EAD8B1] font-bold flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Royal Wedding of Avindu &amp; Yavishka</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </motion.div>
          <p className="font-serif-luxury italic text-[#FFF7EC]/70 text-sm mt-1">
            Break the golden royal seal to reveal your personal invitation
          </p>
        </motion.div>

        {/* 3D Envelope Container with Perspective */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[440px] perspective-1000">
          {/* Physical Envelope Card Base */}
          <motion.div
            animate={{
              y: isTriggered ? [0, 8, -10] : [0, -6, 0],
              rotateX: isTriggered ? -8 : 0,
            }}
            transition={{
              duration: isTriggered ? 1.4 : 4,
              repeat: isTriggered ? 0 : Infinity,
              repeatType: 'mirror',
            }}
            className="relative w-full h-full bg-[#FAF6EE] rounded-2xl shadow-[0_30px_70px_-10px_rgba(0,0,0,0.8),0_0_50px_rgba(212,175,55,0.25)] border-2 border-[#D4AF37]/60 flex flex-col justify-between p-6 sm:p-8 select-none overflow-hidden"
          >
            {/* Fine Paper Texture Pattern */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, #C5A059 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Ornamental Gold Inner Filigree */}
            <div className="absolute inset-3 border border-[#D4AF37]/50 rounded-xl pointer-events-none flex flex-col justify-between p-2.5">
              <div className="flex justify-between items-center text-[#997314]">
                <Sparkles className="w-4 h-4 opacity-70" />
                <span className="font-royal text-[9px] tracking-[0.3em] font-bold uppercase text-[#8C6207]">
                  SACRED INVITATION · 20.01.2027
                </span>
                <Sparkles className="w-4 h-4 opacity-70" />
              </div>
              <div className="flex justify-between items-center text-[#997314] font-royal text-[9px] tracking-widest font-semibold">
                <span>NARAMMALA</span>
                <span>RUWANARA ROYAL</span>
              </div>
            </div>

            {/* Rising Inner Wedding Card when Flap Opens */}
            <motion.div
              initial={false}
              animate={{
                y: isTriggered ? -160 : 0,
                opacity: isTriggered ? 1 : 0,
                scale: isTriggered ? 1.05 : 0.95,
              }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="absolute inset-x-6 top-6 bottom-6 bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#FFF9F0] rounded-xl border-2 border-[#D4AF37] shadow-2xl p-5 z-20 flex flex-col items-center justify-center text-center pointer-events-none"
            >
              <span className="font-royal text-[9px] uppercase tracking-[0.3em] text-[#8C6207] font-bold">
                You Are Cordially Invited
              </span>
              <h3 className="font-signature text-4xl sm:text-5xl text-[#18130E] mt-1 font-semibold">
                Avindu &amp; Yavishka
              </h3>
              <p className="font-serif-luxury text-xs text-[#543D1A] font-bold mt-1 tracking-wider uppercase">
                Wednesday, January 20, 2027 · Poruwa 9:42 AM
              </p>
              <div className="mt-2 text-xs font-serif-luxury italic text-[#735310]">
                Ruwanara Royal Majesty, Narammala
              </div>
            </motion.div>

            {/* Addressee Info on Envelope Front */}
            <div className="relative z-10 text-center pt-2 sm:pt-4">
              <p className="font-royal text-[10px] uppercase tracking-[0.25em] text-[#8C6207] font-bold">
                Honored Guest
              </p>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#18130E] font-bold mt-1 tracking-wide drop-shadow-xs">
                {guestName || 'Respected Guest & Family'}
              </h2>
              <div className="w-28 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
            </div>

            {/* Envelope Center / 3D Wax Seal & Particle Burst */}
            <div className="relative z-30 flex flex-col items-center justify-center my-auto">
              {/* Particle Explosion on Crack */}
              {isTriggered && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {particles.map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: [1, 0.8, 0],
                        scale: [0, 1.2, 0.3],
                        x: p.x,
                        y: p.y,
                      }}
                      transition={{ duration: 0.9, delay: p.delay, ease: 'easeOut' }}
                      className="absolute rounded-full bg-gradient-to-tr from-[#FFE082] to-[#FFD54F] shadow-[0_0_8px_#FFD54F]"
                      style={{ width: p.size, height: p.size }}
                    />
                  ))}
                </div>
              )}

              {/* The Royal Gold Wax Seal */}
              <motion.button
                type="button"
                onClick={handleOpen}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                animate={{
                  scale: isTriggered ? [1, 1.3, 0] : isHovered ? 1.08 : [1, 1.04, 1],
                  rotate: isTriggered ? [0, -15, 25] : 0,
                  opacity: isTriggered ? [1, 1, 0] : 1,
                }}
                transition={{
                  duration: isTriggered ? 0.7 : 3,
                  repeat: isTriggered ? 0 : Infinity,
                  repeatType: 'mirror',
                }}
                className="relative group cursor-pointer focus:outline-none rounded-full"
                aria-label="Click to break wax seal and open invitation"
              >
                {/* Golden Radial Pulse Aura */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF3BF] to-[#B8860B] opacity-70 blur-md group-hover:opacity-95 transition-opacity" />

                {/* Metallic Wax Seal Coin */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#F5D77F] via-[#B8860B] to-[#5C3E02] p-1.5 shadow-[0_12px_30px_rgba(50,30,5,0.6),inset_0_2px_4px_rgba(255,255,255,0.8)] flex items-center justify-center">
                  {/* Beveled Edge */}
                  <div className="w-full h-full rounded-full border-2 border-[#FFEFA8]/70 flex flex-col items-center justify-center bg-gradient-to-br from-[#C5A059] to-[#785408] text-[#FFF9E6] shadow-inner p-2">
                    <span className="font-royal text-[8px] tracking-[0.25em] uppercase text-[#FFF2B2] font-bold">
                      AVINDU · YAVISHKA
                    </span>

                    {/* Monogram A & Y */}
                    <div className="font-signature text-3xl sm:text-4xl text-[#FFFFFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] leading-none my-0.5">
                      A &amp; Y
                    </div>

                    <span className="font-royal text-[8px] tracking-widest uppercase text-[#FFE89E] font-bold">
                      2027
                    </span>
                  </div>
                </div>
              </motion.button>

              {/* Guidance Indicator */}
              {!isTriggered && (
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="mt-3 flex items-center gap-1.5 text-xs font-royal uppercase tracking-wider text-[#735310] font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Click Seal to Unfold</span>
                </motion.div>
              )}
            </div>

            {/* Bottom Details Bar */}
            <div className="relative z-10 flex justify-between items-end border-t border-[#D4AF37]/30 pt-2 text-[#4A3B2C] text-xs font-serif-luxury">
              <span className="font-bold text-[#664C12]">Poruwa 9:42 AM</span>
              <span className="font-signature text-xl text-[#18130E] font-bold">Avindu &amp; Yavishka</span>
              <span className="font-bold text-[#664C12]">Ruwanara Royal Majesty</span>
            </div>
          </motion.div>
        </div>

        {/* Instant Skip Option */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={handleOpen}
          className="mt-4 px-5 py-2 rounded-full text-xs font-royal tracking-wider uppercase font-semibold text-[#FFF7EC]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          {isTriggered ? 'Opening your invitation...' : 'Open Invitation Directly →'}
        </motion.button>
      </div>
    </motion.div>
  );
};
