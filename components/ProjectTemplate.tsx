'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { MoveLeft, ArrowRight, X, Maximize2, ChevronLeft, ChevronRight, Mail, Phone, ShieldCheck, Target, Layers, FileText, Users, PenTool } from 'lucide-react';
import { PROJECTS_DETAIL } from '../data/projecten';
import type { ProjectDetail, ProjectSection, ImageWithAlt } from '../data/types';
import { BRAND_NAME, EMAIL, PHONE_NUMBER } from '../data';
import { InquiryForm } from './Overlays';
import { RotatingText } from './RotatingText';
import { PortfolioSection } from './PortfolioSection';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const Lightbox: React.FC<{ images: ImageWithAlt[]; initialIndex: number; onClose: () => void }> = ({ images, initialIndex, onClose }) => {
  const [index, setIndex] = useState(initialIndex);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-20"
    >
      <button onClick={onClose} className="absolute top-10 right-10 z-[1010] text-white hover:text-amber-500 transition-colors p-4">
        <X size={40} />
      </button>

      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index].url}
            alt={images[index].alt}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-full max-h-full object-contain shadow-2xl"
          />
        </AnimatePresence>

        <button
          onClick={() => setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-6 text-white/30 hover:text-white transition-colors"
        >
          <ChevronLeft size={60} />
        </button>
        <button
          onClick={() => setIndex((prev) => (prev + 1) % images.length)}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-6 text-white/30 hover:text-white transition-colors"
        >
          <ChevronRight size={60} />
        </button>
      </div>
    </motion.div>
  );
};

const HorizontalFilmstrip: React.FC<{ images: ImageWithAlt[] }> = ({ images }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && stripRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const stripWidth = stripRef.current.scrollWidth;
        setConstraints({
          left: Math.min(0, -(stripWidth - containerWidth)),
          right: 0
        });
      }
    };

    const timer = setTimeout(updateConstraints, 500);
    window.addEventListener('resize', updateConstraints);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateConstraints);
    };
  }, [images]);

  return (
    <section className="py-12 bg-stone-50 overflow-hidden relative" ref={containerRef}>
      <div className="mb-10 px-6 md:px-24 flex items-end justify-between">
        <div className="space-y-3">
          <span className="mono text-amber-700 text-[11px] font-extrabold tracking-[0.4em] uppercase block">
            VISUAL INDEX // ARCHIVE
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic tracking-tighter text-black uppercase">
            Galerij van <span className="text-stone-300">Details.</span>
          </h2>
        </div>
        <div className="hidden md:block mono text-[10px] text-stone-500 font-bold tracking-widest uppercase opacity-60">
          [ SLEEP DOOR DE COLLECTIE ]
        </div>
      </div>

      <div className="relative cursor-grab active:cursor-grabbing">
        <motion.div
          ref={stripRef}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.05}
          dragTransition={{ power: 0.1, timeConstant: 200 }}
          className="flex gap-8 px-[10vw] w-max"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedIdx(i)}
              className="flex-none w-[65vw] md:w-[45vw] lg:w-[38vw] aspect-[4/3] md:aspect-[16/10] bg-stone-200 overflow-hidden relative cursor-zoom-in group rounded-sm shadow-xl pointer-events-auto select-none"
            >
              <img
                src={img.url}
                alt={img.alt}
                draggable="false"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 select-none"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700 pointer-events-none" />
              <div className="absolute top-8 right-8 p-4 bg-white/95 backdrop-blur text-black opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 pointer-events-none shadow-xl">
                <Maximize2 size={20} />
              </div>
              <div className="absolute bottom-6 left-6 mono text-[11px] text-white font-extrabold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none drop-shadow-md">
                FRAME_{i + 1}
              </div>
            </motion.div>
          ))}
          <div className="w-[10vw] flex-none" />
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <Lightbox images={images} initialIndex={selectedIdx} onClose={() => setSelectedIdx(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectHeroSlideshow: React.FC<{ project: ProjectDetail }> = ({ project }) => {
  const images = project.heroImages || (project.featuredImage ? [project.featuredImage] : []);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.img
            src={images[index].url}
            alt={images[index].alt}
            className="w-full h-full object-cover"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-start text-center pt-[15vh] md:pt-[20vh] px-6 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
          className="space-y-4"
        >
          {project.locationLabel && (
            <span className="mono text-amber-500 text-[10px] md:text-xs font-extrabold tracking-[0.8em] uppercase block">
              {project.locationLabel}
            </span>
          )}
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif italic tracking-tighter leading-tight uppercase max-w-5xl mx-auto drop-shadow-2xl">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-white/70 text-base md:text-xl font-light italic max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              {project.subtitle}
            </p>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-[1px] transition-all duration-1000 rounded-full ${i === index ? 'w-16 bg-amber-500' : 'w-6 bg-white/20'}`}
          />
        ))}
      </div>
    </section>
  );
};

const FlashUIDecorator: React.FC<{ layout: 'left' | 'right' }> = ({ layout }) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.8 }}
      className={`absolute top-4 ${layout === 'left' ? 'left-4' : 'right-4'} w-8 h-8 border-t-2 border-l-2 border-white/40 z-20`}
    />
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.8 }}
      className={`absolute bottom-4 ${layout === 'left' ? 'right-4' : 'left-4'} w-8 h-8 border-b-2 border-r-2 border-white/40 z-20`}
    />
  </>
);

const SectionRenderer: React.FC<{ section: ProjectSection; index: number }> = ({ section, index }) => {
  const getContextLabel = () => {
    if (section.type !== 'split') return '';
    const keywords = ['GEVEL', 'ARCHITECTUUR', 'CONCEPT', 'DETAIL'];
    return keywords[index % keywords.length];
  };

  switch (section.type) {
    case "role":
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
          }
        }
      };

      const itemVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
      };

      return (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full bg-white border-y border-stone-100 py-20 md:py-28 mb-0 overflow-hidden relative"
        >
          {/* Flash Scanning UI Line */}
          <motion.div
            animate={{ left: ["-100%", "200%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-[30%] bg-gradient-to-r from-transparent via-stone-50 to-transparent skew-x-12 pointer-events-none z-0"
          />

          <div className="max-w-[1700px] mx-auto px-6 md:px-12 relative z-10">
            <motion.header variants={itemVariants} className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-amber-600/20 flex items-center justify-center bg-amber-50/30">
                  <FileText size={18} className="text-amber-600" />
                </div>
                <div className="space-y-1">
                  <span className="mono text-amber-700 text-[10px] font-black tracking-[0.6em] block uppercase">DOSSIER_ENTRY</span>
                  <h2 className="text-3xl md:text-5xl font-serif italic text-black tracking-tighter uppercase leading-none">
                    {section.title}
                  </h2>
                </div>
              </div>
              <div className="mono text-[10px] text-stone-300 font-bold uppercase tracking-[0.4em] hidden md:block border-b border-stone-100 pb-2">
                PROJECT_CONTEXT_ID // ARCH_{new Date().getFullYear()}
              </div>
            </motion.header>

            {/* Main Dashboard Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-32 mb-20">
              {/* Kolom 1: Aanleiding */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-center gap-5">
                  <Target size={20} className="text-amber-600" />
                  <h4 className="mono text-[12px] font-black uppercase tracking-[0.3em] text-stone-400">Context & Vraag</h4>
                </div>
                <p className="text-lg md:text-xl text-black leading-relaxed font-light italic border-l-2 border-amber-600/20 pl-8">
                  {section.origin}
                </p>
              </motion.div>

              {/* Kolom 2: Kernwaarden */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-center gap-5">
                  <Layers size={20} className="text-amber-600" />
                  <h4 className="mono text-[12px] font-black uppercase tracking-[0.3em] text-stone-400">Ambities</h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {section.values.map((v, i) => (
                    <span key={i} className="mono text-[10px] font-extrabold uppercase tracking-widest bg-stone-50 border border-stone-100 px-5 py-2.5 rounded-sm text-stone-600 hover:bg-amber-600 hover:text-white transition-all duration-400 cursor-default">
                      {v}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Kolom 3: Rol */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-center gap-5">
                  <ShieldCheck size={20} className="text-amber-600" />
                  <h4 className="mono text-[12px] font-black uppercase tracking-[0.3em] text-stone-400">Architecten Rol</h4>
                </div>
                <div className="space-y-5">
                  {section.roleItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-5 group/item">
                      <span className="mono text-[10px] text-amber-600 font-black mt-1.5">0{i + 1}</span>
                      <span className="text-sm md:text-base font-light uppercase tracking-[0.2em] text-stone-500 italic leading-snug group-hover/item:text-black transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Kolom 4: Partners (Conditioneel) */}
            {section.partners && section.partners.length > 0 && (
              <motion.div variants={itemVariants} className="border-t border-stone-100 pt-16 mt-16">
                <div className="flex items-center gap-6 mb-10">
                  <Users size={20} className="text-stone-300" />
                  <h4 className="mono text-[12px] font-black uppercase tracking-[0.3em] text-stone-400">Gerealiseerd met</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
                  {section.partners.map((partner, i) => (
                    <div key={i} className="space-y-3 group/partner">
                      <span className="mono text-[9px] text-stone-300 font-black uppercase tracking-[0.2em] block group-hover/partner:text-amber-600 transition-colors">
                        {partner.label}
                      </span>
                      <p className="text-base font-serif italic text-black tracking-wide">
                        {partner.value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      );

    case "sketches":
      return (
        <section className="w-full bg-stone-50 py-24 md:py-12 overflow-hidden border-y border-stone-200 arch-grid">
          <div className="max-w-[1700px] mx-auto px-6 md:px-12">
            <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-amber-600/20 flex items-center justify-center bg-white shadow-xl">
                  <PenTool size={18} className="text-amber-600" />
                </div>
                <div className="space-y-1">
                  <span className="mono text-amber-700 text-[10px] font-black tracking-[0.6em] block uppercase">De achterliggende gedachtes en uitgangspunten.</span>
                  <h2 className="text-3xl md:text-5xl font-serif italic text-black tracking-tighter uppercase leading-none">
                    {section.title}
                  </h2>
                </div>
              </div>
              <p className="text-stone-1200 italic font-light mono text-[14px] uppercase tracking-widest max-w-xs">
                Van de eerste gedachte naar een ruimtelijk principe.
              </p>
            </header>

            {/* Alle schetsen in één grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Concept Schetsen */}
              {section.concepts.map((concept, i) => (
                <motion.div
                  key={`concept-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: i * 0.15 }}
                  className="space-y-4 group"
                >
                  <div className="aspect-[4/3] bg-white p-4 shadow-lg border border-stone-200 relative overflow-hidden">
                    <img src={concept.url} alt={concept.alt} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute top-2 right-2 mono text-[8px] text-stone-300 font-bold">[C_0{i + 1}]</div>
                  </div>
                  <p className="mono text-[9px] uppercase tracking-widest text-stone-500 font-extrabold italic text-center leading-relaxed group-hover:text-amber-600 transition-colors">
                    {concept.alt}
                  </p>
                </motion.div>
              ))}

              {/* Plattegrond Principe */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: section.concepts.length * 0.15 }}
                className="space-y-4 group"
              >
                <div className="aspect-[4/3] bg-white p-4 shadow-lg border border-stone-200 relative overflow-hidden">
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-stone-100 z-10" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-stone-100 z-10" />

                  <img
                    src={section.floorPlan.url}
                    alt={section.floorPlan.alt}
                    className="w-full h-full object-contain relative z-0 filter group-hover:drop-shadow-xl transition-all"
                  />

                  <div className="absolute top-2 right-2 mono text-[8px] text-amber-600 font-bold z-10">[PLAN]</div>
                </div>
                <p className="mono text-[9px] uppercase tracking-widest text-amber-600 font-extrabold italic text-center leading-relaxed">
                  Plattegrond Principe
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      );

    case "split":
      if (section.fullWidth) {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.8 }}
            className="w-full mb-16 md:mb-20 relative group"
          >
            <div className={`flex flex-col lg:flex-row items-stretch w-full ${section.layout === 'image-right' ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-[65%] aspect-[4/3] lg:aspect-auto lg:h-[70vh] overflow-hidden relative">
                <motion.img
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                  src={section.image.url}
                  alt={section.image.alt}
                  className="w-full h-full object-cover"
                />
                <FlashUIDecorator layout={section.layout === 'image-right' ? 'right' : 'left'} />
                <div className="absolute top-8 left-8 z-30 mono text-[10px] text-white/70 tracking-[0.4em] font-extrabold uppercase bg-black/20 backdrop-blur-sm px-4 py-2">
                  [ ANALYSIS // {getContextLabel()} ]
                </div>
              </div>

              <div className="w-full lg:w-[35%] p-10 md:p-14 lg:p-20 bg-white flex flex-col justify-center relative overflow-hidden border-b border-stone-100 lg:border-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                  className="relative z-10"
                >
                  <span className="mono text-amber-700 text-[11px] font-extrabold tracking-[0.5em] mb-8 block uppercase">
                    FOCUS PUNT
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-black mb-8 leading-tight tracking-tighter uppercase">
                    {section.title}
                  </h2>
                  <div className="w-12 h-[1px] bg-amber-600 mb-8" />
                  <p className="text-lg md:text-xl text-stone-600 leading-relaxed font-light italic">
                    {section.content}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="max-w-[1600px] mx-auto px-6 mb-20 md:mb-24 relative"
        >
          <div className={`flex flex-col lg:flex-row items-center relative ${section.layout === 'image-right' ? 'lg:flex-row-reverse' : ''}`}>

            <div className="w-full lg:w-[70%] overflow-hidden rounded-sm shadow-2xl aspect-[4/3] lg:aspect-[16/9] z-0 relative group">
              <motion.img
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 2.2, ease: "easeOut" }}
                src={section.image.url}
                alt={section.image.alt}
                className="w-full h-full object-cover"
              />
              <FlashUIDecorator layout={section.layout === 'image-left' ? 'left' : 'right'} />
            </div>

            <div className={`
              w-full lg:w-[45%] bg-white p-10 md:p-14 lg:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-sm z-10
              mt-[-40px] lg:mt-0 
              border border-stone-100
              ${section.layout === 'image-left' ? 'lg:-ml-24' : 'lg:-mr-24'}
            `}>
              <motion.div
                initial={{ opacity: 0, x: section.layout === 'image-left' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.8, delay: 0.6, ease: "easeOut" }}
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-8 h-[2px] bg-amber-600" />
                  <span className="mono text-[11px] font-extrabold uppercase tracking-[0.4em] text-stone-600">{getContextLabel()} // REF_0{index + 1}</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-black mb-8 leading-tight tracking-tighter uppercase">
                  {section.title}
                </h2>
                <p className="text-lg md:text-xl text-stone-600 leading-relaxed font-light italic">
                  {section.content}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      );

    case "gallery":
      if (section.layout === "horizontal") {
        return <HorizontalFilmstrip images={section.gallery} />;
      }
      return (
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {section.gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, delay: i * 0.1 }}
              className="aspect-[4/5] overflow-hidden bg-stone-50 border border-stone-100 shadow-xl group rounded-sm relative"
            >
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-3000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-1000" />
            </motion.div>
          ))}
        </div>
      );

    case "spacer":
      const sizes = { sm: "h-8", md: "h-12 md:h-16", lg: "h-16 md:h-20" };
      return <div className={sizes[section.size]} />;

    default:
      return null;
  }
};

const ProjectPage: React.FC<{ project: ProjectDetail; onBack: () => void }> = ({ project, onBack }) => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.slug]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white pb-0 selection:bg-amber-100 selection:text-amber-900"
    >
      <nav className="fixed bottom-0 left-0 p-6 md:p-10 z-[500] pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto bg-black text-white px-8 py-4 rounded-full border border-white/10 hover:bg-amber-600 transition-all shadow-2xl flex items-center gap-4 group"
        >
          <MoveLeft size={20} className="group-hover:-translate-x-2 transition-transform duration-500" />
          <span className="mono text-[10px] font-extrabold uppercase tracking-[0.4em]">Overzicht</span>
        </button>
      </nav>

      <main>
        <ProjectHeroSlideshow project={project} />

        {/* Visual Breadcrumbs Section */}
        <div className="max-w-7xl mx-auto px-6 pt-12">
          <nav className="flex items-center gap-3 text-[11px] tracking-[0.3em] text-stone-400 uppercase font-medium">
            <Link href="/" className="hover:text-amber-700 transition-colors">HOME</Link>
            <ChevronRight size={12} className="text-stone-300" />
            <Link href="/portfolio" className="hover:text-amber-700 transition-colors">PORTFOLIO</Link>
            <ChevronRight size={12} className="text-stone-300" />
            <span className="text-stone-800 border-b border-amber-500/30 pb-0.5">{project.title}</span>
          </nav>
        </div>

        <div className="pt-4">
          {project.sections.map((section, i) => (
            <SectionRenderer key={i} section={section} index={i} />
          ))}
        </div>

        {/* Portfolio Section - Gerelateerde Projecten */}
        <PortfolioSection
          projects={PROJECTS_DETAIL}
          onProjectClick={(selectedProject) => {
            router.push(`/portfolio/${selectedProject.slug}`);
            window.scrollTo(0, 0);
          }}
        />

        {/* Improved Footer with High-Contrast Contact and Glass Form */}
        <footer className="bg-white py-24 md:py-40 px-6 md:px-24 relative z-10 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none arch-grid" />
          <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-px bg-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.3)] z-0"
          />

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-24 lg:gap-32 relative z-10">
            <div className="space-y-16 w-full lg:w-1/2">
              <div className="space-y-10">
                <h3 className="text-6xl md:text-8xl font-serif italic text-black leading-[0.9] uppercase tracking-tighter">
                  Vertaal uw <br /><span className="text-amber-500">visie.</span>
                </h3>
                <p className="text-2xl md:text-3xl text-stone-600 font-light max-w-lg italic leading-relaxed">
                  Start vandaag het traject voor uw unieke woning samen met Jules Zwijsen.
                </p>
                <div className="pt-4">
                  <RotatingText />
                </div>
              </div>

              <div className="space-y-12">
                <div className="flex flex-col gap-10">
                  <a href={`mailto:${EMAIL}`} className="group flex items-center gap-8">
                    <div className="p-6 bg-stone-50 border border-stone-200 rounded-full group-hover:bg-amber-600 transition-all duration-500">
                      <Mail size={32} className="text-amber-600 group-hover:text-white" />
                    </div>
                    <div className="space-y-2">
                      <span className="mono text-[11px] uppercase font-extrabold text-stone-500 block tracking-[0.5em]">DIRECT CONTACT</span>
                      <span className="text-3xl md:text-4xl font-bold text-black border-b-2 border-transparent group-hover:border-amber-500 transition-all duration-500">{EMAIL}</span>
                    </div>
                  </a>

                  <a href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} className="group flex items-center gap-8">
                    <div className="p-6 bg-stone-50 border border-stone-200 rounded-full group-hover:bg-amber-600 transition-all duration-500">
                      <Phone size={32} className="text-amber-600 group-hover:text-white" />
                    </div>
                    <div className="space-y-2">
                      <span className="mono text-[11px] uppercase font-extrabold text-stone-500 block tracking-[0.5em]">BEL DE STUDIO</span>
                      <span className="text-3xl md:text-4xl font-bold text-black border-b-2 border-transparent group-hover:border-amber-500 transition-all duration-500">{PHONE_NUMBER}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative group">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-stone-50 backdrop-blur-2xl p-12 md:p-16 rounded-[2.5rem] border border-stone-200 shadow-[0_40px_100px_rgba(0,0,0,0.1)] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
                <div className="mb-12">
                  <span className="mono text-[11px] font-extrabold uppercase text-amber-600 tracking-[0.6em] block mb-4">INITIALIZE DOSSIER</span>
                  <h4 className="text-4xl font-serif italic text-black leading-none">Vorm uw plannen.</h4>
                </div>
                <div className="project-inquiry-form-wrapper">
                  <InquiryForm inline />
                </div>
              </motion.div>

              <div className="absolute -top-6 -right-6 w-24 h-24 border-r border-t border-amber-500/30 rounded-tr-3xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-l border-b border-amber-500/30 rounded-bl-3xl pointer-events-none" />
            </div>
          </div>

          <div className="mt-40 pt-16 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-10 mono text-[10px] uppercase tracking-[0.6em] text-stone-600 font-extrabold">
            <span className="text-stone-500 tracking-normal">{BRAND_NAME} © {new Date().getFullYear()}</span>
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-6">
              <a href="/" className="hover:text-amber-500 transition-colors">Home</a>
              <a href="/?view=portfolio" className="hover:text-amber-500 transition-colors">Collectie</a>
              <a href="#info" className="hover:text-amber-500 transition-colors">Studio</a>
            </div>
          </div>
        </footer>
      </main>

      <style>{`
        .project-inquiry-form-wrapper form textarea,
        .project-inquiry-form-wrapper form input {
          color: #1c1917 !important;
          border-color: #e7e5e4 !important;
          background-color: white !important;
        }
        .project-inquiry-form-wrapper form textarea:focus,
        .project-inquiry-form-wrapper form input:focus {
          border-color: #f59e0b !important;
        }
        .project-inquiry-form-wrapper form label {
          color: #78716c !important;
        }
        .project-inquiry-form-wrapper form button {
          background-color: #f59e0b !important;
          color: white !important;
        }
        .project-inquiry-form-wrapper form button:hover {
          background-color: #1c1917 !important;
          color: white !important;
        }
      `}</style>
    </motion.div>
  );
};

// Wrapper component that matches the expected interface from App.tsx
export const ProjectTemplate: React.FC<{ slug: string; onClose?: () => void }> = ({ slug, onClose }) => {
  const project = PROJECTS_DETAIL.find(p => p.slug === slug);

  if (!project) {
    console.error(`Project with slug "${slug}" not found`);
    return null;
  }

  const handleBack = () => {
    if (onClose) {
      onClose();
    }
    // Scroll to portfolio section after a short delay to let the close animation start
    setTimeout(() => {
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return <ProjectPage project={project} onBack={handleBack} />;
};