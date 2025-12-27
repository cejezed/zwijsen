
import React from 'react';
import { motion } from 'framer-motion';
import { Award, MoveRight } from 'lucide-react';
import { IMAGES } from '../data';
import { SafeImage, RotatingText } from './UIElements';

interface ArchitectProfileProps {
  onContactClick: () => void;
}

export const ArchitectProfile: React.FC<ArchitectProfileProps> = ({ onContactClick }) => {
  return (
    <section className="py-56 bg-stone-50 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-white shadow-2xl overflow-hidden rounded-sm border border-stone-100">
           <div className="lg:col-span-5 relative min-h-[600px] overflow-hidden group">
              <SafeImage localSrc={IMAGES.portrait} fallbackSrc={IMAGES.portrait} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[0.2]" alt="Jules Zwijsen" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
              <div className="absolute bottom-12 left-12">
                <div className="bg-amber-600 text-white p-6 inline-block shadow-xl">
                  <span className="mono text-[10px] uppercase tracking-[0.5em] font-black">Senior Architect</span>
                  <h4 className="text-3xl font-serif italic font-bold">Jules Zwijsen</h4>
                </div>
              </div>
           </div>
           <div className="lg:col-span-7 p-12 md:p-24 flex flex-col justify-center space-y-16 relative">
              <div className="absolute top-0 right-0 p-12 opacity-10"><RotatingText /></div>
              <div className="space-y-8">
                 <div className="flex items-center gap-6"><Award className="text-amber-600" size={32} /><span className="mono text-sm uppercase tracking-[0.4em] font-black text-stone-400">Geregistreerd Architect</span></div>
                 <h3 className="text-5xl md:text-7xl font-serif italic text-black leading-tight tracking-tighter">De architect als regisseur van <span className="text-amber-600">het samenspel.</span></h3>
              </div>
              <div className="space-y-10">
                 <p className="text-2xl text-stone-700 font-light leading-relaxed italic border-l-4 border-amber-600 pl-10">"Elk ontwerp begint met luisteren. Niet alleen naar wat u zegt, maar ook naar wat de kavel ons vertelt. Licht, materiaal en routing moeten in perfecte balans zijn om een woning écht tot leven te laten komen."</p>
                 <div className="grid grid-cols-2 gap-12 pt-8">
                    <div className="space-y-4"><span className="mono text-[10px] uppercase font-black text-amber-900 tracking-widest">Filosofie</span><p className="text-stone-500 font-light">Van binnenuit ontwerpen voor optimaal woongenot.</p></div>
                    <div className="space-y-4"><span className="mono text-[10px] uppercase font-black text-amber-900 tracking-widest">Missie</span><p className="text-stone-500 font-light">Luxe vertalen naar rust, ruimte en eenheid.</p></div>
                 </div>
              </div>
              <button onClick={onContactClick} className="flex items-center gap-8 bg-black text-white px-12 py-6 rounded-full mono text-sm uppercase tracking-[0.4em] font-black hover:bg-amber-600 transition-all self-start shadow-xl">Plan een kennismaking <MoveRight size={20}/></button>
           </div>
         </div>
      </div>
    </section>
  );
};
