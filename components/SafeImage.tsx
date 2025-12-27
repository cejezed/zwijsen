import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SafeImageProps {
  localSrc?: string;
  fallbackSrc: string;
  alt?: string;
  className?: string;
  motion?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  localSrc,
  fallbackSrc,
  alt = '',
  className,
  motion: useMotion = false
}) => {
  const [src, setSrc] = useState<string>(localSrc || fallbackSrc);

  const handleError = () => {
    if (src !== fallbackSrc) setSrc(fallbackSrc);
  };

  if (useMotion) {
    // @ts-ignore - framer-motion img element
    return <motion.img src={src} onError={handleError} alt={alt} className={className} />;
  }

  return <img src={src} onError={handleError} alt={alt} className={className} />;
};
