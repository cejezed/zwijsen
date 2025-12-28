
"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Zap, Info, MapPin, ChevronDown, ExternalLink, FileText, Target } from "lucide-react";
import { IMAGES } from '../data';
import { getImageUrl, getImageAlt } from '../utils/imageHelpers';

const CollageItem: React.FC<{
  src: string;
  alt: string;
  index: number;
  progress: any;
  layout: { top: string; left: string; width: string; rotate: number; z: number }
}> = ({ src, alt, index, progress, layout }) => {
  const y = useTransform(progress, [0, 1], [0, (index % 2 === 0 ? -40 : 40)]);
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      style={{
        y, opacity,
        position: 'absolute',
        top: layout.top,
        left: layout.left,
        width: layout.width,
        rotate: layout.rotate,
        zIndex: layout.z
      }}
      className="shadow-md overflow-hidden bg-stone-100 border border-stone-200/50"
    >
      <img src={src} className="w-full h-full object-cover transition-all duration-500" alt={alt} />
    </motion.div>
  );
};

export const RegionSection: React.FC<{ regio: any }> = ({ regio }) => {
  // Hooks MOETEN voor alle early returns worden aangeroepen
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });

  // Fade in/out opacity voor de achtergrond (ook een hook!)
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  // Progress bar height (ook een hook!)
  const progressBarHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Nu pas checken op data (na ALLE hooks)
  const data = regio.expertise;
  if (!data) return null;

  // Gebruik region-specifieke afbeeldingen of fallback naar defaults
  const images = regio.collageImages || [
    IMAGES.blueprint,
    IMAGES.facade_modern,
    IMAGES.living_room,
    IMAGES.window_view,
    IMAGES.wood_detail,
    IMAGES.villa_forest
  ];

  const collageLayout = [
    { image: images[0], top: '0%', left: '5%', width: '55%', rotate: -1, z: 10 },
    { image: images[1], top: '5%', left: '55%', width: '50%', rotate: 1, z: 5 },
    { image: images[2], top: '35%', left: '50%', width: '55%', rotate: -0.5, z: 20 },
    { image: images[3], top: '60%', left: '0%', width: '55%', rotate: 0, z: 15 },
    { image: images[4], top: '35%', left: '-5%', width: '54%', rotate: -2, z: 8 },
    { image: images[5], top: '65%', left: '50%', width: '58%', rotate: 3, z: 25 },
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Animated Background Layer - spans both sections as one unified block */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-[#020617] z-0"
      />

      {/* Main RegionSection Content */}
      <div className="relative flex flex-col lg:flex-row">
        {/* LINKS: DOSSIER (STRICT 50%) */}
        <div className="w-full lg:w-1/2 relative z-20 border-r border-white/5 flex flex-col items-center min-h-[150vh]">
          <div className="w-full px-8 md:px-12 lg:px-16 py-24 space-y-20">

            <div className="space-y-4 pt-12">
              <div className="flex items-center gap-2 text-amber-600/60 mono text-xs font-black tracking-widest">
                <Zap size={12} /> {regio.name.toUpperCase()}
              </div>
              <h2 className="text-4xl md:text-6xl font-serif italic text-white tracking-tight leading-none">{data.h2}</h2>
              <p className="text-lg md:text-xl text-slate-400 font-light italic leading-relaxed">{data.paragraph}</p>
            </div>

            <div className="space-y-8">
              <h3 className="mono text-xs text-white/30 tracking-[0.5em] font-black uppercase">{data.h3}</h3>
              {data.h3_paragraph && (
                <p className="text-lg md:text-xl text-slate-400 font-light italic leading-relaxed">{data.h3_paragraph}</p>
              )}
              <div className="space-y-2">
                {data.services.map((s: string, i: number) => (
                  <div key={i} className="flex items-baseline gap-3 group cursor-default">
                    <span className="mono text-xs text-amber-600/40 font-black">0{i+1}</span>
                    <span className="text-xl font-serif italic text-white/50 group-hover:text-white transition-colors">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-20 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-white/20 mono text-xs uppercase tracking-widest">
                <MapPin size={14} className="text-amber-600" /> {regio.name}
              </div>
              <div className="flex items-center gap-3 text-white/20 mono text-xs uppercase tracking-widest">
                <Info size={14} className="text-amber-600" /> STATUS: ACTIEF
              </div>
            </div>
          </div>

          <motion.div
            style={{ height: progressBarHeight }}
            className="absolute right-0 top-0 w-px bg-amber-600/30 z-30"
          />
        </div>

        {/* RECHTS: MOODBOARD (STRICT 50%) */}
        <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0 bg-[#f9f9f9] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
               style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '25px 25px' }} />

          <div className="relative w-full h-full p-8">
             {collageLayout.map((item, idx) => (
               <CollageItem
                 key={idx}
                 src={getImageUrl(item.image)}
                 alt={getImageAlt(item.image, `Architectuur detail ${idx + 1}`)}
                 index={idx}
                 progress={smoothProgress}
                 layout={item}
               />
             ))}
          </div>
        </div>
      </div>

      {/* NIEUWE SECTIE: Praktische Info + Tools (volle breedte onderaan) */}
      <PracticalInfoSection regio={regio} />
    </div>
  );
};

const PracticalInfoSection: React.FC<{ regio: any }> = ({ regio }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Gebruik municipalLinks van regio config, met fallback naar lege array
  const municipalLinks = regio.municipalLinks || [];

  return (
    <div className="w-full relative border-t border-white/5">
      <div className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-16 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        {/* KOLOM 1: Praktische zaken accordion */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="mono text-xs uppercase tracking-[0.5em] text-amber-500 font-black block">
              Praktische start
            </span>
            <h3 className="text-3xl md:text-4xl font-serif italic text-white leading-tight">
              Handige links voor uw bouwproject
            </h3>
            <p className="text-base text-slate-400 font-light italic leading-relaxed">
              Voordat u begint is het handig om de gemeentelijke kaders te kennen.
            </p>
          </div>

          {/* Accordion */}
          <div className="border border-white/10 bg-white/5 rounded-lg overflow-hidden">
            <button
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-amber-500" />
                <span className="text-base font-serif italic text-white">
                  Gemeente {regio.name}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isAccordionOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} className="text-white/40" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isAccordionOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-4 space-y-4 border-t border-white/5">
                    {municipalLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="flex items-start gap-3 p-3 border border-white/5 hover:border-amber-600 hover:bg-white/5 transition-all rounded">
                          <ExternalLink size={14} className="text-amber-500 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="text-sm font-serif italic text-white group-hover:text-amber-500 transition-colors mb-1">
                              {link.title}
                            </h4>
                            <p className="text-xs text-slate-500 font-light leading-relaxed">
                              {link.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* KOLOM 2: KavelRapport */}
        <a
          href="https://kavelarchitect.nl"
          target="_blank"
          rel="noopener noreferrer"
          className="block group h-full"
        >
          <div className="h-full flex flex-col border-2 border-white/10 bg-white/5 hover:border-amber-600 hover:bg-white/10 transition-all rounded-lg overflow-hidden">
            {/* Image */}
            <div className="relative h-48 bg-gradient-to-br from-amber-900/20 to-stone-900/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Target size={64} className="text-amber-500/30" />
              </div>
              <div className="absolute top-4 right-4">
                <ExternalLink size={18} className="text-white/30 group-hover:text-amber-500 transition-colors" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-4">
              <div className="space-y-2">
                <span className="mono text-xs uppercase tracking-[0.5em] text-amber-500 font-black block">
                  Een stap eerder
                </span>
                <h4 className="text-2xl font-serif italic text-white group-hover:text-amber-500 transition-colors">
                  KavelRapport
                </h4>
              </div>
              <p className="text-base text-slate-400 font-light leading-relaxed">
                Snel inzicht in regels, kansen en risico's vóór u kosten maakt.
              </p>
              <span className="mono text-xs uppercase tracking-[0.3em] text-amber-500/60 font-black">
                Kavel op het oog? →
              </span>
            </div>
          </div>
        </a>

        {/* KOLOM 3: Brikx */}
        <a
          href="https://brikxai.nl"
          target="_blank"
          rel="noopener noreferrer"
          className="block group h-full"
        >
          <div className="h-full flex flex-col border-2 border-white/10 bg-white/5 hover:border-amber-600 hover:bg-white/10 transition-all rounded-lg overflow-hidden">
            {/* Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-900/20 to-stone-900/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText size={64} className="text-amber-500/30" />
              </div>
              <div className="absolute top-4 right-4">
                <ExternalLink size={18} className="text-white/30 group-hover:text-amber-500 transition-colors" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-4">
              <div className="space-y-2">
                <span className="mono text-xs uppercase tracking-[0.5em] text-amber-500 font-black block">
                  Een stap eerder
                </span>
                <h4 className="text-2xl font-serif italic text-white group-hover:text-amber-500 transition-colors">
                  Brikx
                </h4>
              </div>
              <p className="text-base text-slate-400 font-light leading-relaxed">
                Zet wensen en prioriteiten om in een helder PvE als basis voor ontwerp en aannemer.
              </p>
              <span className="mono text-xs uppercase tracking-[0.3em] text-amber-500/60 font-black">
                Al een woning/plan? →
              </span>
            </div>
          </div>
        </a>

      </div>
    </div>
  );
};
