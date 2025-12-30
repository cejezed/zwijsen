
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Instagram, Linkedin, Phone, Mail, ArrowRight, PhoneCall, ChevronDown } from 'lucide-react';
import { BRAND_NAME, ADDRESS, EMAIL, PHONE_NUMBER, PHONE_LINK } from '../data';
import { InquiryForm } from './Overlays';

interface FooterProps {
  footerRef: React.RefObject<HTMLDivElement>;
  parallaxText: any;
  opacity: any;
  regionFooterIntro?: {
    h2: string;
    paragraph: string;
  };
}

// SEO-friendly content met logische structuur
const FOOTER_LINKS = {
  werkgebieden: {
    title: "Onze Projecten in de Regio",
    subtitle: "Architectenbureau actief in",
    links: [
      { name: "Architect Loenen aan de Vecht", href: "#" },
      { name: "Architect Utrecht", href: "#" },
      { name: "Architect Bilthoven", href: "#" },
      { name: "Architect Gooi en Vechtstreek", href: "#" },
      { name: "Architect Midden-Nederland", href: "#" },
      { name: "Architect Hilversum", href: "#" },
      { name: "Architect Amersfoort", href: "#" },
      { name: "Architect Vinkeveen", href: "#" }
    ]
  },
  projecttypen: {
    title: "Type Projecten",
    subtitle: "Specialisaties",
    links: [
      { name: "Nieuwbouw Villa", href: "#" },
      { name: "Renovatie Woonhuis", href: "#" },
      { name: "Luxe Interieur", href: "#" },
      { name: "Moderne Villa", href: "#" },
      { name: "Landelijke Hofwoning", href: "#" },
      { name: "Stedelijke Woning", href: "#" },
      { name: "Boerderij Verbouw", href: "#" },
      { name: "Architectuur op Maat", href: "#" }
    ]
  },
  diensten: {
    title: "Diensten & Expertise",
    subtitle: "Wat wij doen",
    links: [
      { name: "Architectonisch Ontwerp", href: "#" },
      { name: "Interieurontwerp", href: "#" },
      { name: "Bouwbegeleiding", href: "#" },
      { name: "Projectregie", href: "#" },
      { name: "Vergunningsaanvraag", href: "#" },
      { name: "3D Visualisatie", href: "#" },
      { name: "Duurzaam Bouwen", href: "#" },
      { name: "Lichtplan & Materiaal", href: "#" }
    ]
  },
  stijl: {
    title: "Architectuur Stijl",
    subtitle: "Onze expertise",
    links: [
      { name: "Moderne Architectuur", href: "#" },
      { name: "Tijdloze Villa", href: "#" },
      { name: "Landelijk Modern", href: "#" },
      { name: "Minimalistische Woning", href: "#" },
      { name: "Glazen Gevel", href: "#" },
      { name: "Natuurlijke Materialen", href: "#" }
    ]
  }
};

export const Footer: React.FC<FooterProps> = ({ footerRef, parallaxText, opacity, regionFooterIntro }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <footer ref={footerRef} className="bg-white w-full relative z-10 overflow-hidden">

      {/* Regio-specifieke intro sectie (optioneel) */}
      {regionFooterIntro && (
        <div className="bg-stone-50 border-t border-stone-200 py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-black leading-tight">
              {regionFooterIntro.h2}
            </h2>
            <p className="text-xl md:text-2xl text-stone-700 leading-relaxed">
              {regionFooterIntro.paragraph}
            </p>
          </div>
        </div>
      )}

      {/* Bestaande Footer Content */}
      <div className="py-64 px-12 md:px-32">
       <motion.div style={{ x: parallaxText, opacity }} className="absolute top-148 md:top-99 left-0 whitespace-nowrap pointer-events-none select-none z-0">
          <span className="text-[20vw] font-serif italic text-stone-100/90 leading-none uppercase tracking-tighter">Licht • Ruimte • Materiaal • Visie • Balans • Ordening</span>
       </motion.div>
       <div className="max-w-screen-2xl mx-auto relative z-20 flex flex-col gap-48">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
           <div className="space-y-16">
             <div className="space-y-4"><span className="mono text-sm uppercase tracking-[0.8em] font-black text-amber-900 block">De Eerste Schets</span><div className="w-20 h-1.5 bg-amber-600" /></div>
             <h3 className="text-7xl md:text-[12vw] font-serif italic leading-[0.85] tracking-tighter text-black">Wat is uw <br/><span className="text-amber-600 underline decoration-stone-200 underline-offset-12">Droom?</span></h3>
             <p className="text-3xl md:text-4xl font-serif italic text-stone-400 max-w-2xl leading-relaxed">Laten we beginnen. Jules neemt persoonlijk contact met u op om uw plannen door te nemen. Vrijblijvend en zonder verplichtingen.</p>
           </div>
           <div className="bg-stone-50 p-12 md:p-20 border border-stone-200 shadow-2xl relative">
             <InquiryForm inline />
           </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch pt-32 border-t border-stone-200">
           {/* Kolom 1: Adres, Socials & Copyright */}
           <div className="space-y-12 flex flex-col justify-between">
             <motion.div style={{ x: parallaxText, opacity }} className="absolute bottom-0 left-0 whitespace-nowrap pointer-events-none select-none z-0">
               <span className="text-[10vw] font-serif italic text-stone-100/90 leading-none uppercase tracking-tighter">Laten we beginnen. Jules neemt persoonlijk contact met u o</span>
             </motion.div>

             <div className="space-y-12">
               {/* Bedrijfsnaam en adres */}
               <div className="space-y-8">
                 <h4 className="text-2xl font-serif italic text-black uppercase font-bold">{BRAND_NAME}</h4>
                 <div className="flex gap-4 text-stone-500">
                   <MapPin size={20} className="shrink-0 text-amber-600" />
                   <div className="space-y-1 mono text-sm font-black uppercase tracking-widest">
                     <p>{ADDRESS.street}</p>
                     <p>{ADDRESS.city}</p>
                   </div>
                 </div>
               </div>

               {/* Social media */}
               <div className="space-y-6">
                 <span className="mono text-sm uppercase tracking-widest font-black text-amber-900/40 block">Connectie</span>
                 <div className="flex gap-4 items-center">
                   <a href="#" className="p-5 border border-stone-200 rounded-full hover:bg-black hover:text-white transition-all group shadow-sm bg-white">
                     <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                   </a>
                   <a href="#" className="p-5 border border-stone-200 rounded-full hover:bg-black hover:text-white transition-all group shadow-sm bg-white">
                     <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                   </a>
                 </div>
               </div>

               {/* Studio Status */}
               <div className="space-y-4">
                 <span className="mono text-[10px] uppercase tracking-widest font-black text-amber-900/40 block">Studio Status</span>
                 <div className="flex gap-4 items-center p-6 bg-stone-50 border border-stone-200 rounded-xl">
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="mono text-[9px] uppercase tracking-[0.3em] font-black text-stone-600">Nu open voor inname</span>
                 </div>
               </div>
             </div>

             {/* Copyright */}
             <span className="mono text-[10px] text-stone-400 font-black uppercase tracking-widest pt-12">
               © {new Date().getFullYear()} JULES ZWIJSEN STUDIO
             </span>
           </div>

           {/* Kolom 2: Direct Contact */}
           <div className="bg-stone-900 text-white p-8 md:p-12 lg:p-16 rounded-sm relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-1 bg-amber-600" />
             <div className="relative z-10 space-y-6 md:space-y-10">
               <div className="flex justify-between items-start">
                 <span className="mono text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] text-amber-500 font-black">Direct Contact</span>
                 <PhoneCall className="text-amber-500 group-hover:rotate-12 transition-transform" size={32} />
               </div>
               <div className="space-y-3 md:space-y-4">
                 <h5 className="text-xl md:text-2xl lg:text-3xl font-serif italic text-stone-300">Spreek Jules direct.</h5>
                 <a href={PHONE_LINK} className="text-2xl md:text-4xl lg:text-6xl font-serif italic block hover:text-amber-500 transition-colors font-bold tracking-tighter">
                   {PHONE_NUMBER}
                 </a>
                 <p className="mono text-[10px] md:text-sm lg:text-base uppercase tracking-[0.2em] md:tracking-[0.4em] text-stone-500">De kortste weg van droom naar ontwerp</p>
               </div>
               <div className="pt-4 md:pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                 <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 md:gap-3 text-stone-400 hover:text-white transition-colors">
                   <Mail size={14} className="text-amber-600 shrink-0" />
                   <span className="mono text-xs md:text-base lg:text-lg uppercase tracking-tight md:tracking-wide font-black break-all">{EMAIL}</span>
                 </a>
               </div>
             </div>
           </div>
         </div>
       </div>
      </div>

      {/* SEO-Friendly Navigation Sectie - Helemaal onderaan */}
      <div className="border-t border-stone-200 bg-stone-50/50 py-20 px-8 md:px-32">
        <div className="max-w-screen-2xl mx-auto">

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-12 lg:gap-16">
            {Object.entries(FOOTER_LINKS).map(([key, section]) => (
              <div key={key} className="space-y-6">
                <div className="space-y-2">
                  <span className="mono text-[10px] uppercase tracking-[0.4em] text-stone-400 font-black block">
                    {section.subtitle}
                  </span>
                  <h4 className="text-lg font-serif italic text-black font-bold">
                    {section.title}
                  </h4>
                </div>
                <ul className="space-y-3">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="text-sm text-stone-600 hover:text-amber-600 transition-colors font-light hover:translate-x-1 inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile: Accordion Layout */}
          <div className="md:hidden space-y-4">
            {Object.entries(FOOTER_LINKS).map(([key, section]) => (
              <div key={key} className="border border-stone-200 bg-white rounded-sm overflow-hidden">
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="mono text-[9px] uppercase tracking-[0.4em] text-stone-400 font-black block">
                      {section.subtitle}
                    </span>
                    <h4 className="text-base font-serif italic text-black font-bold">
                      {section.title}
                    </h4>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSection === key ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-amber-600" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedSection === key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="p-6 pt-0 space-y-3 border-t border-stone-100">
                        {section.links.map((link, idx) => (
                          <li key={idx}>
                            <a
                              href={link.href}
                              className="text-sm text-stone-600 hover:text-amber-600 transition-colors font-light block"
                            >
                              {link.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
};
