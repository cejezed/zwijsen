
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MoveLeft, ArrowUpRight, Plus, Filter, Info, MapPin, Hash } from 'lucide-react';
import { PROJECTS_DETAIL } from '../data/projecten';

interface PortfolioProps {
  onBack: () => void;
  onProjectClick: (slug: string) => void;
  onInquiryOpen?: () => void;
}

const ProjectCard = ({ project, idx, onClick }: { project: any; idx: number; onClick: () => void }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer bg-white shadow-sm hover:shadow-2xl transition-all duration-700"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={project.featuredImage?.url}
          alt={project.featuredImage?.alt}
          className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
        />

        {/* Flash UI Overlays (Blueprint View) - Only on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
           {/* Architectural Crosshairs */}
           <div className="absolute top-4 left-4 right-4 h-[1px] bg-white/40" />
           <div className="absolute bottom-4 left-4 right-4 h-[1px] bg-white/40" />
           <div className="absolute top-4 bottom-4 left-4 w-[1px] bg-white/40" />
           <div className="absolute top-4 bottom-4 right-4 w-[1px] bg-white/40" />

           {/* Technical Metadata */}
           <div className="absolute top-8 left-8 flex flex-col gap-1">
             <span className="mono text-[8px] text-white font-black tracking-[0.3em] uppercase bg-black/40 px-2 py-1">REF_0{idx + 1}</span>
             <span className="mono text-[8px] text-white/70 tracking-widest uppercase">LAT_52.1284 / LON_5.0234</span>
           </div>

           <div className="absolute bottom-8 right-8">
             <div className="bg-amber-600 text-white p-4 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <ArrowUpRight size={20} />
             </div>
           </div>
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
      </div>

      {/* Content Info - Below Image */}
      <div className="p-6 bg-white border-t border-stone-100">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="mono text-[8px] font-black uppercase tracking-[0.4em] text-amber-600">
              REF_0{idx + 1}
            </span>
            <span className="mono text-[8px] font-black uppercase tracking-[0.3em] text-stone-400">
              {project.locationLabel?.replace('Locatie: ', '')}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-serif text-black leading-tight group-hover:text-amber-700 transition-colors duration-500">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export const Portfolio: React.FC<PortfolioProps> = ({ onBack, onProjectClick, onInquiryOpen }) => {
  const [filter, setFilter] = useState<string>('all');
  const { scrollYProgress } = useScroll();
  const backgroundTextX = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const allCategories = ['all', ...Array.from(new Set(PROJECTS_DETAIL.flatMap(p => p.categories || [])))];
  const filteredProjects = filter === 'all'
    ? PROJECTS_DETAIL
    : PROJECTS_DETAIL.filter(p => p.categories?.includes(filter));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-stone-50 pt-24 pb-32 px-6 md:px-12 relative overflow-hidden selection:bg-amber-100"
    >
      {/* Background Decorator */}
      <motion.div 
        style={{ x: backgroundTextX }}
        className="fixed top-1/2 left-0 -translate-y-1/2 mono text-[20vw] font-black text-stone-200/30 whitespace-nowrap pointer-events-none z-0 select-none"
      >
        COLLECTIE // ARCHIEF
      </motion.div>

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-10 z-[500] flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto bg-black text-white px-8 py-4 rounded-full border border-white/10 hover:bg-amber-600 transition-all flex items-center gap-4 group shadow-2xl"
        >
          <MoveLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="mono text-[10px] font-extrabold uppercase tracking-[0.4em]">Home</span>
        </button>
        
        <div className="hidden md:flex items-center gap-8 bg-white/80 backdrop-blur-xl border border-stone-200 px-8 py-4 rounded-full shadow-sm pointer-events-auto">
           <div className="flex items-center gap-3 mono text-[10px] font-black text-stone-400">
              <Hash size={12} className="text-amber-500" />
              <span>{filteredProjects.length} PROJECTEN</span>
           </div>
        </div>
      </nav>

      <div className="max-w-[1700px] mx-auto relative z-10">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-10">
            <div className="flex items-center gap-6">
              <div className="w-12 h-[1px] bg-amber-600" />
              <span className="mono text-amber-700 text-[10px] font-black tracking-[0.6em] uppercase">PROJECT_ARCHIVE_V2.5</span>
            </div>
            <h1 className="text-6xl md:text-[8vw] font-serif italic tracking-tighter text-black leading-[0.85] uppercase">
              Vormgegeven <br/> <span className="text-stone-300">Ambities.</span>
            </h1>
          </div>

          <div className="flex flex-col gap-6 items-start md:items-end">
             <div className="flex items-center gap-4 mono text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">
                <Filter size={14} className="text-amber-500" /> Filter op type
             </div>
             <div className="flex flex-wrap md:justify-end gap-3">
               {allCategories.map((category) => (
                 <button
                   key={category}
                   onClick={() => setFilter(category)}
                   className={`px-8 py-3 rounded-full border-2 mono text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${
                     filter === category
                       ? 'bg-amber-600 text-white border-amber-600 shadow-xl'
                       : 'bg-white text-stone-500 border-stone-100 hover:border-amber-600/30'
                   }`}
                 >
                   {category.replace(/-/g, ' ')}
                 </button>
               ))}
             </div>
          </div>
        </header>

        {/* Uniform Dossier Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard 
                key={project.slug} 
                project={project} 
                idx={idx} 
                onClick={() => onProjectClick(project.slug)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-48 text-center space-y-10 border-2 border-dashed border-stone-200 rounded-3xl">
            <Info size={48} className="mx-auto text-stone-200" />
            <p className="text-2xl font-light italic text-stone-400">Er zijn momenteel geen dossiers gevonden in dit segment.</p>
          </div>
        )}
      </div>

      {/* Floating Action Button for Contact */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-10 right-10 z-[500]"
      >
        <button
          onClick={() => onInquiryOpen?.()}
          className="bg-black text-white px-10 py-6 rounded-full flex items-center gap-6 shadow-3xl hover:bg-amber-600 transition-all group"
        >
           <span className="mono text-[11px] font-black uppercase tracking-widest">Start uw dossier</span>
           <Plus size={20} className="group-hover:rotate-90 transition-transform" />
        </button>
      </motion.div>
    </motion.div>
  );
};
