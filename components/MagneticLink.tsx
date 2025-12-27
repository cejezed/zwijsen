import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticLinkProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export const MagneticLink: React.FC<MagneticLinkProps> = ({ children, href, onClick }) => {
  const ref = useRef<any>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? 'a' : 'button';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative"
    >
      <Component
        href={href}
        onClick={onClick}
        className="relative flex items-center gap-4 group py-6 px-12 border border-transparent transition-all"
      >
         <div className="absolute inset-0 border border-black/10 scale-90 group-hover:scale-100 group-hover:border-amber-600 group-hover:bg-amber-50/50 transition-all duration-500" />
         <div className="relative flex items-center gap-4 z-10">{children}</div>
      </Component>
    </motion.div>
  );
};
