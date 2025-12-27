
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { HERO_SLIDES } from '../data';
import type { HeroSlide } from '../data/index';

interface HeroSectionProps {
  opacity: any;
  heroSlides?: HeroSlide[];
}

// Helper functies voor tekst groottes
const getTitleSizeClasses = (size?: 'small' | 'medium' | 'large' | 'xlarge') => {
  switch (size) {
    case 'small':
      return 'text-4xl md:text-6xl';
    case 'medium':
      return 'text-5xl md:text-7xl';
    case 'large':
      return 'text-6xl md:text-[9vw]';
    case 'xlarge':
      return 'text-7xl md:text-[11vw]';
    default:
      return 'text-6xl md:text-[9vw]'; // Default size
  }
};

const getSubtitleSizeClasses = (size?: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return 'text-[8px] md:text-sm';
    case 'medium':
      return 'text-[10px] md:text-lg';
    case 'large':
      return 'text-xs md:text-xl';
    default:
      return 'text-[10px] md:text-lg'; // Default size
  }
};

export const HeroSection: React.FC<HeroSectionProps> = ({ opacity, heroSlides = HERO_SLIDES }) => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, heroSlides]);

  const scrollToProces = () => {
    document.getElementById('proces')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="h-screen w-full relative bg-black overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <AnimatePresence mode="wait">
        <motion.div key={heroIndex} initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute inset-0 z-0">
          <motion.img src={heroSlides[heroIndex].url} className="w-full h-full object-cover" alt="Architectuur" initial={{ scale: 1.05 }} animate={{ scale: 1.15 }} transition={{ duration: 8, ease: "linear" }} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
      <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
        <AnimatePresence mode="wait">
          <motion.div key={heroIndex} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.8 }} className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center">
              <motion.h2 className={`text-white ${getTitleSizeClasses(heroSlides[heroIndex].titleSize)} font-serif leading-[0.8] tracking-tighter uppercase font-bold italic mb-6`}>{heroSlides[heroIndex].title}</motion.h2>
              <motion.p className={`mono text-white ${getSubtitleSizeClasses(heroSlides[heroIndex].subtitleSize)} uppercase tracking-[0.6em] max-w-2xl font-black leading-loose text-white/70`}>{heroSlides[heroIndex].subtitle}</motion.p>
            </div>

            <motion.button
              onClick={scrollToProces}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-amber-600 text-white px-10 md:px-14 py-4 md:py-5 rounded-full flex items-center gap-6 hover:bg-white hover:text-black transition-all group shadow-2xl"
            >
              <span className="mono text-xs md:text-sm uppercase tracking-[0.3em] font-black">Bekijk onze Werkwijze</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                <MoveRight size={16} />
              </div>
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
