import type { ImageWithAlt } from '../data/index';

/**
 * Helper functie om de URL uit een image te halen (string of ImageWithAlt object)
 */
export const getImageUrl = (image: string | ImageWithAlt | undefined): string => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  return image.url;
};

/**
 * Helper functie om de alt-tekst uit een image te halen
 */
export const getImageAlt = (image: string | ImageWithAlt | undefined, fallback: string = ''): string => {
  if (!image) return fallback;
  if (typeof image === 'string') return fallback;
  return image.alt;
};

/**
 * Helper functie om zowel URL als alt-tekst te krijgen
 */
export const getImageProps = (image: string | ImageWithAlt | undefined, fallbackAlt: string = '') => {
  return {
    src: getImageUrl(image),
    alt: getImageAlt(image, fallbackAlt)
  };
};
