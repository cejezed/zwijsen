
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// StatCounter component voor de animatie van getallen
const StatCounter: React.FC<{ value: number; suffix?: string; label: string; sublabel: string }> = ({ value, suffix = "", label, sublabel }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="space-y-2 group flex-1">
      <div className="flex items-baseline gap-1">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl md:text-8xl font-serif italic text-amber-600 leading-none"
        >
          {count}
        </motion.span>
        <span className="text-3xl md:text-4xl font-serif italic text-amber-600">{suffix}</span>
      </div>
      <div className="space-y-1">
        <span className="mono text-[11px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-amber-500 font-black block">{label}</span>
        <p className="text-stone-300 text-[11px] md:text-xs font-light italic leading-relaxed max-w-[140px]">{sublabel}</p>
      </div>
    </div>
  );
};

export const PainRegieSection: React.FC = () => {
  const painPoints = [
    "U ziet door de bomen het bos niet meer bij het bouwproces.",
    "U zoekt een architect die luistert naar uw persoonlijke verhaal.",
    "U wilt rust en regie van schets tot de laatste steen."
  ];

  return (
    <section className="py-24 md:py-40 bg-white relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-50/50 -z-10" />
      <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-[0.5fr_1.5fr] gap-12 md:gap-16 items-stretch">
         
         <div className="space-y-12 md:space-y-16 py-6 md:py-12 flex flex-col justify-center">
            <div className="space-y-4 text-center md:text-left">
              <span className="mono text-amber-800 text-xs md:text-sm tracking-[1em] uppercase font-black block">De Opgave</span>
              <h3 className="text-4xl md:text-6xl font-serif italic tracking-tighter text-black leading-tight">Herkent u dit?</h3>
            </div>
            <div className="space-y-8 md:space-y-10">
              {painPoints.map((text, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  transition={{ delay: i * 0.1 }} 
                  className="flex gap-4 md:gap-6 group"
                >
                  <div className="mt-1.5 md:mt-2 h-5 w-5 md:h-6 md:w-6 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-amber-600 group-hover:bg-amber-50 transition-all shrink-0">
                    <div className="h-1.5 w-1.5 bg-amber-600 rounded-full" />
                  </div>
                  <p className="text-base md:text-xl text-stone-800 font-light leading-relaxed italic">{text}</p>
                </motion.div>
              ))}
            </div>
         </div>

         <div className="bg-stone-900 text-white p-8 md:p-24 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden rounded-sm flex flex-col justify-center">
           <div className="absolute top-0 left-0 w-full h-1 md:h-2 bg-amber-600" />
           <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-amber-600/10 blur-[100px] md:blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
           
           <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-24 relative z-10">
              <div className="flex-1 space-y-8 md:space-y-10 text-center md:text-left">
                <div className="space-y-4">
                  <h4 className="text-4xl md:text-7xl font-serif italic leading-none tracking-tighter">Kies voor de regie.</h4>
                  <span className="mono text-[11px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] text-amber-500 font-black block">Uw Visie, Onze Expertise</span>
                </div>
                <p className="text-stone-300 leading-relaxed font-light text-lg md:text-2xl italic max-w-xl mx-auto md:mx-0">
                  Wij combineren onuitputtelijke creativiteit met nuchtere technische expertise, zodat u zonder stress kunt bouwen aan uw toekomst.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 pt-8 border-t border-white/10 text-left">
                  <div className="flex flex-col gap-2 md:gap-3 group cursor-default">
                    <span className="mono text-[11px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-amber-500 font-black group-hover:translate-x-2 transition-transform block">De Aanpak</span>
                    <h5 className="text-xl md:text-2xl font-serif italic">Eén aanspreekpunt</h5>
                  </div>
                  <div className="flex flex-col gap-2 md:gap-3 group cursor-default">
                    <span className="mono text-[11px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-amber-500 font-black group-hover:translate-x-2 transition-transform block">De Garantie</span>
                    <h5 className="text-xl md:text-2xl font-serif italic">100% Maatwerk</h5>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:flex lg:flex-col gap-8 md:gap-12 lg:gap-20 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-20 w-full lg:w-auto">
                <StatCounter 
                  value={20} 
                  suffix="+" 
                  label="Jaar Ervaring" 
                  sublabel="Expertise in de top van de woningbouw."
                />
                <StatCounter 
                  value={100} 
                  suffix="+" 
                  label="Projecten" 
                  sublabel="Gerealiseerde droomhuizen door heel Nederland."
                />
              </div>
           </div>
         </div>
      </div>
    </section>
  );
};
