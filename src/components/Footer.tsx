import React from 'react';
import { Heart, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenEnvelope: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenEnvelope }) => {
  return (
    <footer className="border-t border-[#D4AF37]/30 bg-[#16120E] text-[#D8CFBF] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Brand & Date */}
        <div>
          <span className="font-signature text-3xl sm:text-4xl text-[#FFF2CC] block">
            Avindu &amp; Yavishka
          </span>
          <p className="font-serif-luxury text-xs text-[#B5A895] mt-1">
            Wednesday, January 20, 2027 · Ruwanara Royal Majesty, Narammala
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-royal uppercase tracking-wider text-[#B5A895]">
          <a href="#invitation" className="hover:text-[#FFF2CC] transition-colors">
            Invitation
          </a>
          <a href="#story" className="hover:text-[#FFF2CC] transition-colors">
            Our Story
          </a>
          <a href="#timeline" className="hover:text-[#FFF2CC] transition-colors">
            Ceremony
          </a>
          <a href="#gallery" className="hover:text-[#FFF2CC] transition-colors">
            Gallery
          </a>
          <a href="#venue" className="hover:text-[#FFF2CC] transition-colors">
            Location
          </a>
          <button
            onClick={onOpenEnvelope}
            className="hover:text-[#FFF2CC] transition-colors cursor-pointer"
          >
            Wax Envelope
          </button>
        </div>

        {/* Quiet Admin & Copyright */}
        <div className="flex items-center gap-4 text-xs font-serif-luxury text-[#8C7D6B]">
          <span>&copy; 2027 Avindu &amp; Yavishka</span>
          <span>·</span>
          <button
            onClick={onOpenAdmin}
            className="hover:text-[#FFF2CC] flex items-center gap-1 transition-colors cursor-pointer"
            title="Couple &amp; Admin Sign In"
          >
            <Lock className="w-3 h-3" />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
