import React, { useMemo } from 'react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  sway: number;
}

export const RosePetals: React.FC = () => {
  const petals: Petal[] = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      size: Math.random() * 14 + 16,
      duration: Math.random() * 12 + 16,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
      sway: Math.random() * 60 - 30,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute opacity-60"
          style={{
            left: `${petal.left}%`,
            top: '-40px',
            animation: `floatDown ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.2}
            viewBox="0 0 30 36"
            fill="none"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              filter: 'drop-shadow(0 2px 4px rgba(184,134,11,0.15))',
            }}
          >
            <path
              d="M15 2 C22 2, 28 8, 28 18 C28 28, 18 34, 15 34 C12 34, 2 28, 2 18 C2 8, 8 2, 15 2 Z"
              fill="url(#petalGrad)"
              opacity="0.85"
            />
            <path
              d="M15 4 C19 10, 20 22, 15 30"
              stroke="rgba(212, 175, 55, 0.4)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#FFFDF7" />
                <stop offset="100%" stopColor="#F7EEDD" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes floatDown {
          0% {
            transform: translateY(-40px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.75;
          }
          90% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(105vh) translateX(40px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
