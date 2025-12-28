
"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Zap, ChevronDown, ExternalLink, FileText, Target } from "lucide-react";
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

const MunicipalLinksAccordion: React.FC<{ regio: any }> = ({ regio }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const municipalLinks = regio.municipalLinks || [];

  return (
    <div className="border border-stone-200 bg-stone-50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-stone-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <FileText size={18} className="text-amber-600" />
          <span className="text-base font-serif italic text-stone-900">
            Gemeente {regio.name}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isAccordionOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} className="text-stone-400" />
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
            <div className="px-6 pb-6 pt-4 space-y-4 border-t border-stone-200">
              {municipalLinks.map((link: any, idx: number) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="flex items-start gap-3 p-3 border border-stone-200 hover:border-amber-600 hover:bg-white transition-all rounded">
                    <ExternalLink size={14} className="text-amber-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-sm font-serif italic text-stone-900 group-hover:text-amber-600 transition-colors mb-1">
                        {link.title}
                      </h4>
                      <p className="text-xs text-stone-500 font-light leading-relaxed">
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
  );
};

const ProjectCards: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* KavelRapport Card */}
      <a
        href="https://kavelarchitect.nl"
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="flex flex-col border-2 border-stone-200 bg-stone-50 hover:border-amber-600 hover:bg-white transition-all rounded-lg overflow-hidden h-full">
          {/* Image */}
          <div className="relative h-32 bg-gradient-to-br from-amber-100 to-amber-50 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Target size={40} className="text-amber-600/30" />
            </div>
            <div className="absolute top-3 right-3">
              <ExternalLink size={16} className="text-stone-400 group-hover:text-amber-600 transition-colors" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-2 flex-1 flex flex-col">
            <div className="space-y-1">
              <span className="mono text-[9px] uppercase tracking-[0.4em] text-amber-600 font-black block">
                Een stap eerder
              </span>
              <h4 className="text-lg font-serif italic text-stone-900 group-hover:text-amber-600 transition-colors">
                KavelRapport
              </h4>
            </div>
            <p className="text-xs text-stone-600 font-light leading-relaxed flex-1">
              Snel inzicht in regels, kansen en risico's vóór u kosten maakt.
            </p>
            <span className="mono text-[9px] uppercase tracking-[0.3em] text-amber-600/60 font-black">
              Kavel op het oog? →
            </span>
          </div>
        </div>
      </a>

      {/* Brikx Card */}
      <a
        href="https://brikxai.nl"
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="flex flex-col border-2 border-stone-200 bg-stone-50 hover:border-amber-600 hover:bg-white transition-all rounded-lg overflow-hidden h-full">
          {/* Image */}
          <div className="relative h-32 bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText size={40} className="text-blue-600/30" />
            </div>
            <div className="absolute top-3 right-3">
              <ExternalLink size={16} className="text-stone-400 group-hover:text-amber-600 transition-colors" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-2 flex-1 flex flex-col">
            <div className="space-y-1">
              <span className="mono text-[9px] uppercase tracking-[0.4em] text-amber-600 font-black block">
                Een stap eerder
              </span>
              <h4 className="text-lg font-serif italic text-stone-900 group-hover:text-amber-600 transition-colors">
                Brikx
              </h4>
            </div>
            <p className="text-xs text-stone-600 font-light leading-relaxed flex-1">
              Zet wensen en prioriteiten om in een helder PvE als basis voor ontwerp en aannemer.
            </p>
            <span className="mono text-[9px] uppercase tracking-[0.3em] text-amber-600/60 font-black">
              Al een woning/plan? →
            </span>
          </div>
        </div>
      </a>
    </div>
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
        className="absolute inset-0 bg-white z-0"
      />

      {/* Main RegionSection Content */}
      <div className="relative flex flex-col lg:flex-row">
        {/* LINKS: DOSSIER (STRICT 50%) */}
        <div className="w-full lg:w-1/2 relative z-20 border-r border-stone-200 flex flex-col items-center min-h-[150vh]">
          <div className="w-full px-8 md:px-12 lg:px-16 py-24 space-y-20">

            <div className="space-y-4 pt-12">
              <div className="flex items-center gap-2 text-amber-600 mono text-xs font-black tracking-widest">
                <Zap size={12} /> {regio.name.toUpperCase()}
              </div>
              <h2 className="text-4xl md:text-6xl font-serif italic text-stone-900 tracking-tight leading-none">{data.h2}</h2>
              <p className="text-lg md:text-xl text-stone-600 font-light italic leading-relaxed">{data.paragraph}</p>
            </div>

            <div className="space-y-8">
              <h3 className="mono text-xs text-stone-400 tracking-[0.5em] font-black uppercase">{data.h3}</h3>
              {data.h3_paragraph && (
                <p className="text-lg md:text-xl text-stone-600 font-light italic leading-relaxed">{data.h3_paragraph}</p>
              )}
              <div className="space-y-2">
                {data.services.map((s: string, i: number) => (
                  <div key={i} className="flex items-baseline gap-3 group cursor-default">
                    <span className="mono text-xs text-amber-600/60 font-black">0{i+1}</span>
                    <span className="text-xl font-serif italic text-stone-500 group-hover:text-stone-900 transition-colors">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Praktische Links Sectie */}
            <div className="pt-20 space-y-8">
              <div className="space-y-4">
                <span className="mono text-xs uppercase tracking-[0.5em] text-amber-600 font-black block">
                  Praktische start
                </span>
                <h3 className="text-3xl md:text-4xl font-serif italic text-stone-900 leading-tight">
                  Handige links voor uw bouwproject
                </h3>
                <p className="text-base text-stone-600 font-light italic leading-relaxed">
                  Voordat u begint is het handig om de gemeentelijke kaders te kennen.
                </p>
              </div>

              {/* Accordion */}
              <MunicipalLinksAccordion regio={regio} />
            </div>

            {/* Cards Sectie */}
            <div className="pt-12 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-serif italic text-stone-900 leading-tight">
                  Nog niet zover?
                </h3>
                <p className="text-sm text-stone-600 font-light leading-relaxed">
                  Start met een kavel of een helder programma van eisen.
                </p>
              </div>
              <ProjectCards />
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
    </div>
  );
};
