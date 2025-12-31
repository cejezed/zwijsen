
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TESTIMONIALS, imageLocal } from '../data';
import type { Testimonial } from '../data/types';
import { SafeImage } from './UIElements';

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials = TESTIMONIALS }) => {
  const [hoveredReview, setHoveredReview] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-56 overflow-hidden z-10 bg-stone-50 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="mb-16 md:mb-40 text-center space-y-4 md:space-y-8">
          <span className="mono text-amber-900 text-[10px] md:text-sm tracking-[1em] uppercase font-black">
            Belevenissen
          </span>
          <h3 className="text-4xl md:text-[8vw] font-serif italic tracking-tighter text-black leading-none">
            Stem van de bewoner.
          </h3>
        </div>

        {/* Container: Flex-row met snap-scroll op mobiel, Grid op desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 md:grid md:grid-cols-2 gap-6 md:gap-16 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredReview(i)}
              onMouseLeave={() => setHoveredReview(null)}
              whileHover={{ y: -10 }}
              className="relative flex-none w-[85vw] md:w-auto snap-center p-8 md:p-16 shadow-xl border border-white flex flex-col justify-between min-h-[380px] md:min-h-[500px] transition-all duration-700 bg-white group overflow-hidden"
            >
              <div className="absolute inset-0 z-0">
                <AnimatePresence>
                  {(hoveredReview === i) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                      className="w-full h-full relative"
                    >
                      <SafeImage localSrc={imageLocal(t.image)} fallbackSrc={t.image} alt={t.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-stone-900/75 backdrop-blur-[2px]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-6 md:space-y-12 relative z-10">
                <Quote
                  className={`transition-colors duration-500 ${hoveredReview === i ? 'text-amber-500' : 'text-amber-700/20'}`}
                  size={32}
                />
                <p className={`text-xl md:text-3xl font-serif italic leading-relaxed transition-colors duration-500 ${hoveredReview === i ? 'text-white' : 'text-stone-900'}`}>
                  "{t.quote}"
                </p>
              </div>

              <div className={`pt-8 md:pt-16 border-t transition-colors duration-500 relative z-10 ${hoveredReview === i ? 'border-white/20' : 'border-stone-100'}`}>
                <h4 className={`font-black text-[10px] md:text-sm uppercase tracking-[0.3em] transition-colors duration-500 ${hoveredReview === i ? 'text-white' : 'text-black'}`}>
                  {t.name}
                </h4>
                <p className={`mono text-[10px] md:text-sm uppercase tracking-widest font-black transition-colors duration-500 mt-2 md:mt-3 ${hoveredReview === i ? 'text-amber-500' : 'text-stone-500'}`}>
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Kleine swipe indicatie voor mobiel */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-stone-300" />
          ))}
        </div>
      </div>
    </section>
  );
};
