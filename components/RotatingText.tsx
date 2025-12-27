import React from 'react';
import { motion } from 'framer-motion';

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
