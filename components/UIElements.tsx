
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const RotatingText = () => (
  <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="w-48 h-48 relative">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
      <text className="text-[5.5px] uppercase font-black tracking-[0.2em] fill-amber-600 mono">
        <textPath xlinkHref="#circlePath">ARCHITECTENBUREAU JULES ZWIJSEN • ARCHITECTUUR • REALISATIE • ARCHITECTENBUREAU JULES ZWIJSEN •</textPath>
      </text>
    </svg>
  </motion.div>
);

export const InteractiveImage = ({ src, label }: { src: string; label: string }) => (
  <motion.div className="h-full w-full relative overflow-hidden group">
    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }} className="h-full w-full">
      <img src={src} alt={label} className="w-full h-full object-cover" />
    </motion.div>
    <div className="absolute bottom-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
       <span className="mono text-[11px] text-white font-black uppercase tracking-[0.4em] bg-black/50 px-4 py-1.5 backdrop-blur-sm">{label}</span>
    </div>
  </motion.div>
);

export const SafeImage: React.FC<{
  localSrc?: string;
  fallbackSrc: string;
  alt?: string;
  className?: string;
  motion?: boolean;
}> = ({ localSrc, fallbackSrc, alt = '', className, motion: useMotion = false }) => {
  const [src, setSrc] = useState<string>(localSrc || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && src !== fallbackSrc) {
      setHasError(true);
      setSrc(fallbackSrc);
    }
  };

  // Als er geen src is, render niets
  if (!src) return null;

  if (useMotion) {
    // @ts-ignore - framer-motion img element
    return <motion.img src={src} onError={handleError} alt={alt} className={className} />;
  }

  return <img src={src} onError={handleError} alt={alt} className={className} />;
};
