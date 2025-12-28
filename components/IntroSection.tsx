import React from 'react';
import { motion } from 'framer-motion';

interface IntroSectionProps {
  h1: string;
  paragraph: string;
  onCtaClick: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ h1, paragraph, onCtaClick }) => {
  return (
    <section className="relative bg-white py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* H1 Titel */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-black leading-[0.95] tracking-tight mb-8 md:mb-12"
        >
          {h1}
        </motion.h1>

        {/* Intro Tekst */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-2xl text-stone-700 leading-relaxed mb-10 md:mb-12 max-w-4xl"
        >
          {paragraph}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={onCtaClick}
          className="group inline-flex items-center gap-4 bg-amber-600 text-white px-10 py-5 rounded-full hover:bg-amber-700 transition-all shadow-lg hover:shadow-2xl"
        >
          <span className="mono text-xs font-black uppercase tracking-[0.3em]">
            Vrijblijvend kennismaken
          </span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.button>
      </div>
    </section>
  );
};
