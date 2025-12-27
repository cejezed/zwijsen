import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[999] flex flex-col items-center justify-center mix-blend-difference"
      animate={{ x: mousePos.x, y: mousePos.y }}
      transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.2 }}
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 border border-white/40 rounded-full"
        />
      </div>
    </motion.div>
  );
};
