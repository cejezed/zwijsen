
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Layers, MoveRight, Pencil, Home } from 'lucide-react';
import { SERVICES } from '../data';

export const ServicesSection: React.FC = () => {
  const scrollToProces = () => document.getElementById('proces')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* EXPERTISE STRIP */}
      <section className="bg-stone-50 py-10 border-b border-stone-200 overflow-hidden relative z-20">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
           <div className="flex items-center gap-6"><div className="w-12 h-12 rounded-full border border-amber-600/30 flex items-center justify-center text-amber-600"><CheckCircle size={20} /></div><div className="flex flex-col"><span className="mono text-[10px] uppercase font-black tracking-widest text-stone-400">Certificering</span><span className="text-black font-serif italic text-lg font-bold">Lid Architectenregister</span></div></div>
           <div className="flex items-center gap-6"><div className="w-12 h-12 rounded-full border border-amber-600/30 flex items-center justify-center text-amber-600"><Star size={20} /></div><div className="flex flex-col"><span className="mono text-[10px] uppercase font-black tracking-widest text-stone-400">Ervaring</span><span className="text-black font-serif italic text-lg font-bold">12+ Jaar Expertise</span></div></div>
           <div className="flex items-center gap-6"><div className="w-12 h-12 rounded-full border border-amber-600/30 flex items-center justify-center text-amber-600"><Layers size={20} /></div><div className="flex flex-col"><span className="mono text-[10px] uppercase font-black tracking-widest text-stone-400">Aanpak</span><span className="text-black font-serif italic text-lg font-bold">Full-Service Traject</span></div></div>
        </div>
      </section>

      {/* DIENSTEN HUB */}
      <section className="py-56 bg-white relative z-10 overflow-hidden" id="info">
         <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
               <div className="lg:col-span-5 space-y-12">
                  <span className="mono text-amber-900 text-sm tracking-[1.2em] block uppercase font-black underline decoration-amber-600 decoration-4 underline-offset-8">Onze Pijlers</span>
                  <h3 className="text-6xl md:text-8xl font-serif italic tracking-tighter text-black leading-[0.85]">Vormgeven <br/>aan uw visie.</h3>
                  <p className="text-xl text-stone-600 font-light leading-relaxed max-w-md italic">Wij begeleiden u in elke fase. Van de eerste ruwe schets tot de verfijnde afwerking van uw droomhuis.</p>
                  <button onClick={scrollToProces} className="flex items-center gap-6 group"><span className="mono text-sm uppercase font-black tracking-widest text-stone-400 group-hover:text-black transition-colors">Hoe we te werk gaan</span><div className="p-4 bg-stone-900 text-white rounded-full group-hover:bg-amber-600 transition-all"><MoveRight size={20} /></div></button>
               </div>
               <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {SERVICES.map((s, i) => (
                    <motion.div key={i} whileHover={{ y: -10 }} className={`p-12 border border-stone-100 bg-stone-50/30 shadow-sm flex flex-col justify-between min-h-[400px] group transition-all duration-500 ${i === 2 ? 'md:col-span-2' : ''}`}>
                       <div className="space-y-10">
                          <div className="w-16 h-16 rounded-full bg-white border border-stone-200 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors duration-500">
                             {i === 0 && <Pencil size={24} />}
                             {i === 1 && <Home size={24} />}
                             {i === 2 && <CheckCircle size={24} />}
                          </div>
                          <h4 className="text-4xl font-serif italic text-black">{s.title}</h4>
                          <p className="text-stone-500 leading-relaxed font-light">{s.description}</p>
                       </div>
                       <div className="flex flex-wrap gap-3 pt-12">
                          {s.features?.map(feature => (
                            <span
                              key={feature}
                              className="mono text-[10px] uppercase font-black tracking-widest border border-stone-200 px-3 py-1 rounded-full group-hover:border-amber-100 transition-colors"
                            >
                              {feature}
                            </span>
                          ))}
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
         </div>
      </section>
    </>
  );
};
