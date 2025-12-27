
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Ruler, ArrowRight, CheckCircle, Award } from 'lucide-react';
import { PROCESS_STEPS } from '../data';
import { SafeImage } from './UIElements';
import type { ProcessStep } from '../data/index';

interface ProcessSectionProps {
  processSteps?: ProcessStep[];
}

interface ProcessCardProps {
  step: ProcessStep;
  index: number;
  totalCards: number;
  smoothProgress: MotionValue<number>;
  hoveredStep: number | null;
  setHoveredStep: (index: number | null) => void;
}

// Separate component for each card so we can use hooks properly
const ProcessCard: React.FC<ProcessCardProps> = ({
  step,
  index,
  totalCards,
  smoothProgress,
  hoveredStep,
  setHoveredStep
}) => {
  const isLast = index === totalCards - 1;

  // Calculate keyframes for this card
  const cardStart = index === 0 ? 0 : index / totalCards;
  const cardEnd = (index + 1) / totalCards;
  const nextCardEnd = Math.min((index + 2) / totalCards, 1);

  // Now we can safely use hooks here since this is a component function
  const cardX = useTransform(
    smoothProgress,
    [cardStart, cardEnd],
    index === 0 ? ['0%', '0%'] : ['100%', '0%']
  );

  const cardScale = useTransform(
    smoothProgress,
    [cardStart, cardEnd, nextCardEnd],
    index === 0 ? [1, 1, 0.98] : [0.9, 1, isLast ? 1 : 0.98]
  );

  const cardOpacity = useTransform(
    smoothProgress,
    [cardStart, cardEnd, nextCardEnd],
    index === 0 ? [1, 1, 1] : [0, 1, isLast ? 1 : 1]
  );

  const textX = useTransform(
    smoothProgress,
    [cardStart, cardEnd],
    ['20%', '0%']
  );

  const imageScale = useTransform(
    smoothProgress,
    [cardStart, cardEnd],
    [1.1, 1]
  );

  return (
    <motion.div
      style={{
        x: isLast ? 0 : cardX,
        scale: cardScale,
        opacity: cardOpacity,
        zIndex: index + 10,
      }}
      className={`absolute flex items-center justify-center ${
        isLast ? 'inset-0 pt-0' : 'inset-8 md:inset-12 pt-32 md:pt-40'
      }`}
      onMouseEnter={() => setHoveredStep(index)}
      onMouseLeave={() => setHoveredStep(null)}
    >
      <div
        className={`relative overflow-hidden flex flex-col justify-center pointer-events-auto ${
          isLast
            ? 'text-white w-full h-full px-8 md:px-32'
            : 'text-black p-8 md:p-16 border-2 border-stone-100 rounded-sm shadow-2xl w-full max-w-7xl'
        }`}
        style={!isLast ? { aspectRatio: '16/9' } : undefined}
      >
        {/* White background layer - below image */}
        {!isLast && (
          <div className="absolute inset-0 bg-white z-0" />
        )}
        {isLast && (
          <div className="absolute inset-0 bg-stone-950 z-0" />
        )}

        {/* Background Image met parallax scale - always rendered */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <motion.div
            style={{
              scale: imageScale,
              opacity: (hoveredStep === index || isLast) ? (isLast ? 0.35 : 1) : 0.3
            }}
            className="w-full h-full transition-opacity duration-500"
          >
            <SafeImage
              localSrc={step.img}
              fallbackSrc={step.img}
              className="w-full h-full object-cover grayscale-[0.3]"
              alt={step.title}
            />
          </motion.div>
          <div className={`absolute inset-0 transition-all duration-500 ${isLast ? 'bg-gradient-to-r from-stone-950 via-stone-950/40 to-transparent' : hoveredStep === index ? 'bg-stone-900/10' : 'bg-stone-900/40'}`} />
        </div>

        {/* Phase Number Badge */}
        <div className={`absolute -top-4 -left-4 md:-top-6 md:-left-6 w-14 h-14 md:w-24 md:h-24 flex items-center justify-center font-serif italic text-xl md:text-4xl shadow-2xl z-30 pointer-events-none ${
          isLast ? 'bg-white text-black' : 'bg-amber-600 text-white'
        }`}>
          {step.id}
        </div>

        {/* Content met interne parallax */}
        <motion.div
          style={{ x: textX }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-16 relative z-30 items-center w-full pointer-events-none"
        >
          <div className={isLast ? 'lg:col-span-7 space-y-4 md:space-y-12' : 'lg:col-span-12 space-y-4 md:space-y-10'}>
            <div className="space-y-2 md:space-y-6">
              <h4 className={`font-serif italic leading-tight tracking-tighter transition-colors duration-500 ${
                isLast ? 'text-4xl md:text-8xl' : 'text-3xl md:text-6xl text-black'
              } ${hoveredStep === index && !isLast ? 'text-white' : ''}`}>
                {step.title}
              </h4>
              <p className={`mono text-[11px] md:text-sm uppercase tracking-[0.4em] md:tracking-[0.5em] font-black transition-colors duration-500 ${
                isLast ? 'text-amber-500' : 'text-amber-700'
              } ${hoveredStep === index && !isLast ? 'text-amber-400' : ''}`}>
                {step.subtitle}
              </p>
            </div>

            <p className={`font-light leading-relaxed italic transition-colors duration-500 ${
              isLast ? 'text-lg md:text-3xl text-stone-200 max-w-xl' : 'text-base md:text-xl text-stone-600'
            } ${hoveredStep === index && !isLast ? 'text-white' : ''}`}>
              {step.description}
            </p>

            {!isLast && (
               <div className={`pt-6 md:pt-12 border-t flex items-center gap-4 md:gap-8 transition-colors duration-500 ${hoveredStep === index ? 'border-white/30 text-amber-500' : 'border-stone-200 text-stone-400'}`}>
                  <Ruler size={20} />
                  <span className="mono text-[11px] md:text-xs uppercase tracking-[0.4em] font-black">FASE {step.id}</span>
               </div>
            )}
          </div>

          {isLast && (
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
               <div className="p-6 md:p-14 border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl md:rounded-[2rem] w-full text-left space-y-6 md:space-y-12 shadow-2xl">
                  <div className="space-y-3 md:space-y-4 pb-4 md:pb-6 border-b border-white/10">
                    <p className="text-stone-400 text-xs md:text-sm font-light italic leading-relaxed">
                      Elk project is uniek. Dit proces wordt flexibel op maat afgestemd op uw situatie en wensen.
                    </p>
                  </div>
                  <div className="space-y-2 md:space-y-4">
                    <span className="mono text-[11px] md:text-xs uppercase tracking-[0.4em] text-amber-500 font-black block">Meer Weten?</span>
                    <h5 className="text-xl md:text-4xl font-serif italic text-white leading-tight">Ontdek onze diensten en expertise in detail.</h5>
                  </div>
                  <p className="text-stone-300 text-sm md:text-base font-light italic leading-relaxed">
                    Van architectuur tot interieurontwerp en projectregie – lees meer over hoe ik u kan helpen bij uw droomproject.
                  </p>
                  <button
                    onClick={() => document.getElementById('info')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-4 md:gap-8 bg-white text-black px-8 py-4 md:px-14 md:py-7 rounded-full mono text-[11px] md:text-xs uppercase tracking-[0.4em] font-black hover:bg-amber-600 hover:text-white transition-all group w-full justify-center md:w-auto shadow-2xl pointer-events-auto"
                  >
                    Onze Diensten <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
               </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ProcessSection: React.FC<ProcessSectionProps> = ({ processSteps }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Use provided processSteps or fall back to default PROCESS_STEPS
  const steps = processSteps || PROCESS_STEPS;

  // 1. Progressie-beheer met Spring Physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Spring physics voor vloeiende, elastische beweging
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.001
  });

  // Mobiele optimalisatie: kortere scroll-afstand
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const totalCards = steps.length;

  // Title parallax transforms - moved outside of JSX
  const titleOpacity = useTransform(smoothProgress, [0, 0.1], [0.05, 0]);
  const titleX = useTransform(smoothProgress, [0, 0.15], [0, -100]);

  return (
    <div ref={containerRef} className={`relative ${isMobile ? 'h-[300vh]' : 'h-[400vh]'} bg-stone-50`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Trust Strip */}
        <div className="absolute top-8 left-0 w-full px-8 md:px-32 flex justify-between items-center z-50 pointer-events-none">
           <div className="flex items-center gap-3">
             <CheckCircle size={14} className="text-amber-800" />
             <span className="mono text-[11px] md:text-xs uppercase tracking-[0.3em] font-black text-stone-800">Geregistreerd Architect</span>
           </div>
           <div className="flex items-center gap-3">
             <Award size={14} className="text-amber-800" />
             <span className="mono text-[11px] md:text-xs uppercase tracking-[0.3em] font-black text-stone-800">20+ Jaar Ervaring</span>
           </div>
        </div>

        {/* Layered Title met Parallax */}
        <div className="absolute top-20 md:top-28 left-8 md:left-32 z-50 pointer-events-none">
          <motion.span
            style={{
              opacity: titleOpacity,
              x: titleX
            }}
            className="absolute -top-12 -left-4 md:-top-24 md:-left-12 text-[15vw] md:text-[12vw] mono text-amber-900 uppercase font-black tracking-tighter whitespace-nowrap"
          >
            PROCES
          </motion.span>
          <div className="relative z-10">
            <span className="mono text-amber-900 text-xs md:text-sm tracking-[0.8em] block uppercase font-black mb-2">
              De Blauwdruk, Volledig afgestemd op u
            </span>
            <h3 className="text-4xl md:text-7xl font-serif italic text-black tracking-tighter leading-none">
              Onze Werkwijze.
            </h3>
          </div>
        </div>

        {/* 2. Sticky Scroll-Stack met gelaagde cards */}
        <div className="absolute inset-0 flex items-center justify-center">
          {steps.map((step, i) => (
            <ProcessCard
              key={i}
              step={step}
              index={i}
              totalCards={steps.length}
              smoothProgress={smoothProgress}
              hoveredStep={hoveredStep}
              setHoveredStep={setHoveredStep}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
