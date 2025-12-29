
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SafeImage } from './UIElements';
import { imageLocal } from '../data';
import { ArrowUpRight, X, Layers, Ruler } from 'lucide-react';
import { getImageUrl, getImageAlt } from '../utils/imageHelpers';

export const MosaicItem: React.FC<{
  project: any;
  onOpen: (p: any) => void;
  height: string;
  width: string;
  offsetY?: string;
  isBottomRow?: boolean;
}> = ({ project, onOpen, height, width, offsetY = "0px", isBottomRow = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (project.slug) {
      // Als er een slug is, ga naar de projectdetail pagina
      navigate(`/projecten/${project.slug}`);
    } else {
      // Fallback naar overlay voor projecten zonder slug
      onOpen(project);
    }
  };

  return (
    <motion.div
      className="relative flex-none overflow-visible group cursor-pointer"
      style={{
        height,
        width,
        zIndex: isBottomRow ? 10 : 20,
      }}
      onClick={handleClick}
      whileHover={{
        zIndex: 100,
        scale: 1.05,
        transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }
      }}
    >
      <motion.div 
        className="w-full h-full overflow-hidden border-[0.5px] border-black/5 shadow-md group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-500 relative bg-stone-100"
        style={{ translateY: offsetY }}
      >
        <SafeImage
          localSrc={imageLocal(getImageUrl(project.image || project.featuredImage))}
          fallbackSrc={getImageUrl(project.image || project.featuredImage)}
          alt={getImageAlt(project.image || project.featuredImage, project.title)}
          className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-115"
        />

        <div className="absolute inset-0 p-10 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 bg-black/50 backdrop-blur-[2px]">
          <div className="flex justify-between items-start">
            <span className="mono text-[11px] text-white uppercase tracking-[0.4em] font-black bg-white/10 px-4 py-1.5">Archive_{project.id || project.slug}</span>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 45 }}
              className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center text-white shadow-2xl"
            >
              <ArrowUpRight size={24} />
            </motion.div>
          </div>
          <div>
            <h4 className="text-white text-5xl font-serif italic mb-2 leading-none tracking-tighter">{project.title}</h4>
            <p className="mono text-[11px] text-amber-400 uppercase tracking-[0.3em] font-black">{project.location || project.locationLabel?.replace('Locatie: ', '') || ''}</p>
          </div>
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-amber-600/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity -z-10 pointer-events-none" />
    </motion.div>
  );
};

export const ProjectDetailOverlay: React.FC<{ project: any; onClose: () => void }> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[200] bg-white overflow-y-auto"
    >
      <button onClick={onClose} className="fixed top-10 right-10 z-[210] p-6 bg-black text-white rounded-full hover:scale-110 transition-transform shadow-2xl"><X size={32} /></button>
      <div className="w-full">
        <div className="h-screen w-full relative">
           <SafeImage localSrc={imageLocal(project.image)} fallbackSrc={project.image} className="w-full h-full object-cover" alt={project.title} />
           <div className="absolute inset-0 bg-black/40" />
           <div className="absolute bottom-24 left-12 md:left-32 max-w-4xl text-white">
              <span className="mono text-xs md:text-sm uppercase tracking-[0.6em] font-black mb-6 block text-amber-500">Masterplan / {project.year}</span>
              <h2 className="text-8xl md:text-[10vw] font-serif italic leading-[0.8] tracking-tighter mb-12">{project.title}</h2>
              <div className="flex flex-wrap gap-12 md:gap-24 pt-12 border-t border-white/20">
                 <div className="flex flex-col gap-2"><span className="mono text-[11px] uppercase text-white/50 tracking-widest">Locatie</span><span className="text-2xl italic font-serif">{project.location}</span></div>
                 <div className="flex flex-col gap-2"><span className="mono text-[11px] uppercase text-white/50 tracking-widest">Gebruik</span><span className="text-2xl italic font-serif">{project.tag}</span></div>
                 <div className="flex flex-col gap-2"><span className="mono text-[11px] uppercase text-white/50 tracking-widest">Volume</span><span className="text-2xl italic font-serif">{project.area}</span></div>
              </div>
           </div>
        </div>
        <div className="py-64 px-12 md:px-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <div className="space-y-16">
              <div className="space-y-6">
                <span className="mono text-amber-800 text-xs tracking-[1em] block uppercase font-black">Filosofie</span>
                <h3 className="text-7xl font-serif italic text-black leading-[0.9] tracking-tighter">De kunst van het weglaten.</h3>
              </div>
              <p className="text-3xl text-stone-800 font-light leading-relaxed italic border-l-4 border-amber-600 pl-12">{project.description}</p>
              <div className="grid grid-cols-2 gap-12 pt-16 border-t border-stone-100">
                 <div className="flex items-center gap-6 text-stone-900"><Layers size={24} className="text-amber-600" /> <span className="mono text-[11px] uppercase tracking-widest font-black">Licht & Schaduw</span></div>
                 <div className="flex items-center gap-6 text-stone-900"><Ruler size={24} className="text-amber-600" /> <span className="mono text-[11px] uppercase tracking-widest font-black">Zichtlijnen</span></div>
              </div>
           </div>
            <div className="bg-stone-50 p-6 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-1000">
            <SafeImage
              localSrc={imageLocal(getImageUrl(project.gallery[1]))}
              fallbackSrc={getImageUrl(project.gallery[1])}
              className="w-full h-full object-cover"
              alt={getImageAlt(project.gallery[1], "Interieur detail")}
            />
          </div>
        </div>
        <div className="pb-64 px-12 md:px-32">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-7">
                  <SafeImage
                    localSrc={imageLocal(getImageUrl(project.gallery[2]))}
                    fallbackSrc={getImageUrl(project.gallery[2])}
                    className="w-full h-[90vh] object-cover shadow-xl"
                    alt={getImageAlt(project.gallery[2], "Perspectief 1")}
                  />
                </div>
                <div className="md:col-span-5 pt-32">
                  <SafeImage
                    localSrc={imageLocal(getImageUrl(project.gallery[0]))}
                    fallbackSrc={getImageUrl(project.gallery[0])}
                    className="w-full h-[70vh] object-cover shadow-xl"
                    alt={getImageAlt(project.gallery[0], "Perspectief 2")}
                  />
                </div>
           </div>
        </div>
        <div className="py-48 bg-black text-center flex flex-col items-center gap-12">
           <span className="mono text-amber-500 text-sm tracking-[1em] uppercase font-black">Contact</span>
           <h4 className="text-white text-6xl md:text-8xl font-serif italic leading-none">Vertaal uw droom <br/> naar architectuur.</h4>
           <button onClick={onClose} className="mt-12 px-20 py-10 bg-white text-black mono text-sm uppercase tracking-[0.6em] font-black hover:bg-amber-600 hover:text-white transition-all duration-500">Sluiten & Terug</button>
        </div>
      </div>
    </motion.div>
  );
};
