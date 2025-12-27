
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { VISION_PILLARS, IMAGES } from '../data';
import { InteractiveImage, SafeImage, RotatingText } from './UIElements';
import { Award, MoveRight } from 'lucide-react';

export const VisionSection: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const horizontalRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ 
    target: horizontalRef, 
    offset: ["start start", "end end"] 
  });

  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]),
    { stiffness: 200, damping: 50, restDelta: 0.001 }
  );

  return (
    <div ref={horizontalRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        {/* Sectie Titel met gelaagd effect */}
        <div className="absolute top-24 md:top-32 left-8 md:left-32 z-50 pointer-events-none">
          <span className="absolute -top-10 -left-6 md:-top-20 md:-left-12 text-[15vw] md:text-[10vw] mono opacity-[0.05] text-amber-900 pointer-events-none uppercase font-black tracking-tighter">
            VISIE
          </span>
          <div className="relative z-10">
            <span className="mono text-amber-900 text-xs md:text-sm tracking-[0.8em] block uppercase font-black mb-2">
              De Filosofie
            </span>
            <h3 className="text-4xl md:text-6xl font-serif italic text-black tracking-tighter leading-none">Onze Visie.</h3>
          </div>
        </div>

        <motion.div 
          style={{ x }} 
          className="flex h-full w-[500vw]"
        >
          {/* De 4 Visie Pijlers */}
          {VISION_PILLARS.map((step, i) => (
            <div key={i} className={`h-screen w-screen flex-none flex flex-col justify-center px-8 md:px-32 pt-32 md:pt-40 relative overflow-hidden ${i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}`}>
              
              <div className="relative z-20 w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-24">
                 <div className="w-full md:w-1/2 relative z-40 mt-12 md:mt-0">
                   {/* Pillar Title met achtergrondtekst */}
                   <div className="relative mb-6 md:mb-10">
                      <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.05 }}
                        className="absolute -top-12 -left-6 md:-top-24 md:-left-12 text-[18vw] md:text-[14vw] mono text-black uppercase font-black tracking-tighter pointer-events-none whitespace-nowrap"
                      >
                        {step.title}
                      </motion.span>
                      <div className="relative z-10 space-y-4">
                        <span className="mono text-stone-600 text-xs md:text-sm tracking-[0.6em] block uppercase font-black">
                           {step.id} / {step.title}
                        </span>
                        <h3 className="text-4xl md:text-[6vw] font-serif italic text-black leading-[1.1] md:leading-none tracking-tighter">
                           {step.subtitle}
                        </h3>
                      </div>
                   </div>
                   
                   <p className="text-lg md:text-xl text-stone-800 leading-relaxed font-light max-w-lg italic">
                      {step.text}
                   </p>
                 </div>

                 <div className="w-full md:w-1/2 h-[35vh] md:h-[60vh] relative z-30 shadow-2xl rounded-sm overflow-hidden border border-stone-100">
                    <InteractiveImage src={step.img} label={step.title.toUpperCase()} />
                 </div>
              </div>
            </div>
          ))}

          {/* De 5e Slide: Architect Jules Zwijsen Profile */}
          <div className="h-screen w-screen flex-none relative overflow-hidden bg-stone-900 text-white flex flex-col md:flex-row-reverse">
            <div className="w-full md:w-5/12 h-[40vh] md:h-full relative overflow-hidden">
              <SafeImage
                localSrc={IMAGES.portrait}
                fallbackSrc={IMAGES.portrait}
                className="w-full h-full object-cover grayscale-[0.2] scale-105"
                alt="Jules Zwijsen"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-stone-900/40" />
              <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20">
                <div className="flex items-center gap-4 bg-amber-600 px-5 py-4 md:px-7 md:py-5 shadow-2xl">
                  <Award size={18} />
                  <span className="mono text-[11px] md:text-xs uppercase tracking-widest font-black">Geregistreerd Architect</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-7/12 p-8 md:p-24 flex flex-col justify-center relative">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none hidden lg:block">
                <RotatingText />
              </div>
              
              <div className="max-w-3xl space-y-8 md:space-y-12">
                <div className="space-y-4">
                  <span className="mono text-amber-500 text-xs md:text-sm tracking-[0.6em] block uppercase font-black">
                    Regisseur van het samenspel
                  </span>
                  <h3 className="text-5xl md:text-[7.5vw] font-serif italic leading-none tracking-tighter">
                    Jules Zwijsen.
                  </h3>
                </div>
                
                <p className="text-xl md:text-3xl text-stone-300 leading-relaxed font-light italic border-l-4 border-amber-600 pl-6 md:pl-10">
                  "Elk ontwerp begint met luisteren. Niet alleen naar wat u zegt, maar ook naar wat de kavel vertelt. Licht, materiaal en routing moeten in perfecte balans zijn."
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4 md:pt-8 border-t border-white/10">
                  <div className="space-y-2">
                    <span className="mono text-[11px] md:text-xs uppercase font-black text-amber-500 tracking-widest">Filosofie</span>
                    <p className="text-stone-300 font-light italic leading-relaxed text-base">Van binnenuit ontwerpen voor optimaal woongenot en een natuurlijke eenheid.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="mono text-[11px] md:text-xs uppercase font-black text-amber-500 tracking-widest">Missie</span>
                    <p className="text-stone-300 font-light italic leading-relaxed text-base">Luxe vertalen naar rust, ruimte en architecturale verfijning in het landschap.</p>
                  </div>
                </div>

                {/* Kennismaken knop verwijderd zoals gevraagd (te veel) */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
