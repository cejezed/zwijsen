import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveImageProps {
  src: string;
  label: string;
}

export const InteractiveImage: React.FC<InteractiveImageProps> = ({ src, label }) => (
  <motion.div className="h-full w-full relative overflow-hidden group">
    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }} className="h-full w-full">
      <img src={src} alt={label} className="w-full h-full object-cover" />
    </motion.div>
    <div className="absolute bottom-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
       <span className="mono text-[8px] text-white font-black uppercase tracking-[0.5em] bg-black/40 px-3 py-1 backdrop-blur-sm">{label}</span>
    </div>
  </motion.div>
);
