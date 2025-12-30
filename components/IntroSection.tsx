import React from 'react';
import { motion } from 'framer-motion';
import { SafeImage } from './SafeImage';

interface IntroSectionProps {
  h1: string;
  paragraph: string;
  onCtaClick: () => void;
  image?: { url: string; alt: string };
}

export const IntroSection: React.FC<IntroSectionProps> = ({ h1, paragraph, onCtaClick, image }) => {
  return (
    <section className="relative bg-white py-24 md:py-40 overflow-hidden">
      {/* Subtiele achtergrond accenten */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-stone-50/30 -z-10" />

      <div className="max-w-screen-2xl mx-auto px-8 md:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          {/* Content */}
          <div className="space-y-10 md:space-y-16 relative">
            {/* Gelaagde achtergrondtekst - extract eerste woord */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.05 }}
              viewport={{ once: true }}
              className="absolute -top-20 -left-12 md:-top-32 md:-left-20 text-[20vw] md:text-[12vw] mono text-black uppercase font-black tracking-tighter pointer-events-none whitespace-nowrap"
            >
              {h1.split(' ')[0]}
            </motion.span>

            <div className="relative z-10 space-y-6 md:space-y-8">
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-3"
              >
                <span className="mono text-amber-900 text-xs md:text-sm tracking-[0.8em] uppercase font-black block">
                  Locatie & Expertise
                </span>
                <div className="w-20 h-1.5 bg-amber-600" />
              </motion.div>

              {/* H1 Titel */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-[6vw] font-serif italic text-black leading-[0.95] tracking-tighter"
              >
                {h1}
              </motion.h1>

              {/* Intro Tekst */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-stone-800 font-light leading-relaxed italic border-l-4 border-amber-600 pl-8 md:pl-12"
              >
                {paragraph}
              </motion.p>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                onClick={onCtaClick}
                className="group inline-flex items-center gap-4 bg-amber-600 text-white px-10 py-5 rounded-sm hover:bg-amber-700 transition-all shadow-lg hover:shadow-2xl mt-4"
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
          </div>

          {/* Afbeelding rechts */}
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[50vh] md:h-[70vh] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] rounded-sm overflow-hidden border border-stone-100"
            >
              <SafeImage
                localSrc={image.url}
                fallbackSrc={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
