import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { GalleryPhoto } from '../types/wedding';

interface GallerySectionProps {
  photos: GalleryPhoto[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ photos }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = ['All', ...Array.from(new Set(photos.map((p) => p.category)))];

  const filteredPhotos = activeCategory === 'All'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! > 0 ? prev! - 1 : filteredPhotos.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! < filteredPhotos.length - 1 ? prev! + 1 : 0));
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 relative bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-2 mb-12"
        >
          <span className="font-royal text-xs uppercase tracking-[0.25em] text-[#8C6207] font-bold">
            Cherished Memories
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18130E]">
            Our Photo Gallery
          </h2>
          <p className="font-serif-luxury text-base text-[#473B2F] max-w-xl mx-auto font-medium">
            A glimpse into the magical journey of Avindu and Yavishka surrounded by white roses and golden memories.
          </p>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedPhotoIndex(null);
                }}
                className={`px-4 py-2 text-xs font-royal uppercase tracking-wider font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs ${
                  activeCategory === cat
                    ? 'bg-[#18130E] text-[#FFE89E] shadow-md border border-[#D4AF37]'
                    : 'bg-white/80 text-[#544234] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:text-[#18130E]'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Animated Photo Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedPhotoIndex(index)}
                className="group relative rounded-2xl overflow-hidden glass-card border border-[#D4AF37]/50 shadow-sm cursor-pointer aspect-[4/3] sm:aspect-[3/4] bg-[#F0EBE3]"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Scrim and Details overlay with smooth entrance */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between text-[#EAD8B1] text-[10px] font-royal uppercase tracking-widest font-semibold">
                    <span>{photo.category}</span>
                    <Maximize2 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-serif-luxury text-lg sm:text-xl font-bold leading-tight mt-1">
                    {photo.title}
                  </h3>
                  <p className="font-serif-luxury text-xs text-white/80 line-clamp-2 mt-1">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal with Animated Fade and Zoom */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-5 right-5 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer z-10"
              aria-label="Close photo lightbox"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Prev Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Image & Caption Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            >
              <div className="relative rounded-2xl overflow-hidden max-h-[70vh] border-2 border-[#D4AF37]/60 shadow-2xl bg-black">
                <img
                  src={filteredPhotos[selectedPhotoIndex].imageUrl}
                  alt={filteredPhotos[selectedPhotoIndex].title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="mt-4 text-center text-white max-w-xl">
                <span className="font-royal text-[10px] tracking-[0.25em] uppercase text-[#FFE89E] font-bold">
                  {filteredPhotos[selectedPhotoIndex].category}
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold mt-1 text-[#FFFDF8]">
                  {filteredPhotos[selectedPhotoIndex].title}
                </h3>
                <p className="font-serif-luxury text-sm text-neutral-300 mt-1 italic">
                  {filteredPhotos[selectedPhotoIndex].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
