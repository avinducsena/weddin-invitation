import React, { useState, useEffect } from 'react';
import { Lock, Heart, Volume2, VolumeX, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenEnvelope: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenEnvelope }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-card border-b border-gold-subtle shadow-sm py-3'
          : 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#D4AF37]/20 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#top"
          className="font-signature text-2xl sm:text-3xl text-[#1E1712] font-semibold hover:text-[#B8860B] transition-colors whitespace-nowrap shrink-0 tracking-wide"
        >
          Avindu &amp; Yavishka
        </a>

        {/* Zone 2: 5 Concise Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium tracking-wider uppercase font-royal text-[#332A24]">
          <a
            href="#invitation"
            className="hover:text-[#B8860B] transition-colors whitespace-nowrap shrink-0"
          >
            Invitation
          </a>
          <a
            href="#story"
            className="hover:text-[#B8860B] transition-colors whitespace-nowrap shrink-0"
          >
            Our Story
          </a>
          <a
            href="#timeline"
            className="hover:text-[#B8860B] transition-colors whitespace-nowrap shrink-0"
          >
            Ceremony
          </a>
          <a
            href="#gallery"
            className="hover:text-[#B8860B] transition-colors whitespace-nowrap shrink-0"
          >
            Gallery
          </a>
          <a
            href="#venue"
            className="hover:text-[#B8860B] transition-colors whitespace-nowrap shrink-0"
          >
            Venue
          </a>
        </nav>

        {/* Zone 3: Primary Action + Discreet Admin Login */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenEnvelope}
            title="View wax envelope again"
            className="hidden sm:inline-flex px-3 py-1.5 rounded-lg border border-[#D4AF37]/40 text-[#4A3B2C] text-xs font-royal hover:bg-[#D4AF37]/10 transition-colors whitespace-nowrap cursor-pointer"
          >
            Envelope
          </button>

          <a
            href="#rsvp"
            className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold tracking-wider uppercase font-royal text-white bg-gradient-to-r from-[#946F19] via-[#B8860B] to-[#7A5B12] rounded-lg shadow-sm hover:shadow-md hover:from-[#A87F1E] hover:to-[#8B6815] transition-all whitespace-nowrap shrink-0"
          >
            RSVP
          </a>

          {/* Discreet Admin Lock Button */}
          <button
            onClick={onOpenAdmin}
            title="Admin & Couple Access"
            aria-label="Admin Portal"
            className="p-2 text-[#7A6451] hover:text-[#1E1712] hover:bg-[#B8860B]/10 rounded-lg transition-colors cursor-pointer"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A3B2C] hover:bg-black/5 rounded-lg"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D4AF37]/20 bg-[#FAF7F2] px-6 py-4 space-y-3 font-royal text-xs uppercase tracking-wider text-[#332A24]">
          <a
            href="#invitation"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#B8860B]"
          >
            Invitation
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#B8860B]"
          >
            Our Story
          </a>
          <a
            href="#timeline"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#B8860B]"
          >
            Ceremony &amp; Timeline
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#B8860B]"
          >
            Photo Gallery
          </a>
          <a
            href="#venue"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#B8860B]"
          >
            Venue &amp; Map
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenEnvelope();
            }}
            className="block w-full text-left py-1 text-[#8C6D23]"
          >
            View Wax Envelope
          </button>
        </div>
      )}
    </header>
  );
};
