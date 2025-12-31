import { DEFAULT_CONFIG } from './base';
import type { RegioConfig } from './types';
import {
  loenenAanDeVechtConfig,
  loosdrechtConfig,
  breukelenConfig,
  maarssenConfig,
  hilversumConfig,
  bilthovenConfig,
  stichtseVechtConfig,
  vinkeveenConfig
} from './regions';

// Export werkwijze content
export { WERKWIJZE_CONTENT } from './werkwijze';

// Export types
export type { RegioConfig, Project, HeroSlide, MunicipalLink, RegionalProject, ImageWithAlt, ProcessStep } from './types';

// Regio-specifieke configuraties
export const PAGE_CONFIG: Record<string, Partial<RegioConfig>> = {
  // Default config (homepage)
  default: DEFAULT_CONFIG,

  // Loenen aan de Vecht
  "loenen-aan-de-vecht": loenenAanDeVechtConfig,

  // Loosdrecht
  "loosdrecht": loosdrechtConfig,

  // Breukelen
  "breukelen": breukelenConfig,

  // Maarssen
  "maarssen": maarssenConfig,

  // Hilversum
  "hilversum": hilversumConfig,

  // Bilthoven
  "bilthoven": bilthovenConfig,

  // Stichtse Vecht
  "stichtse-vecht": stichtseVechtConfig,

  // Vinkeveen
  "vinkeveen": vinkeveenConfig,

  // Vreeland - TODO: maak vreeland.ts aan in regions/
  // "vreeland": vreelandConfig,

  // Kortenhoef - TODO: maak kortenhoef.ts aan in regions/
  // "kortenhoef": kortenhoefConfig,

  // Blaricum - TODO: maak blaricum.ts aan in regions/
  // "blaricum": blaricumConfig,

  // Laren - TODO: maak laren.ts aan in regions/
  // "laren": larenConfig,

  // Wijdemeren - TODO: maak wijdemeren.ts aan in regions/
  // "wijdemeren": wijdemerenConfig,

  // Het Gooi - TODO: maak het-gooi.ts aan in regions/
  // "het-gooi": hetGooiConfig,

  // Zandvoort - TODO: maak zandvoort.ts aan in regions/
  // "zandvoort": zandvoortConfig,
};

// Helper functie om configuratie op te halen met fallback
export const getPageConfig = (region: string = 'default'): RegioConfig => {
  const regionConfig = PAGE_CONFIG[region] || PAGE_CONFIG.default;

  // Merge met default config voor ontbrekende velden
  return {
    ...DEFAULT_CONFIG,
    ...regionConfig,
    seoTitle: regionConfig.seoTitle || DEFAULT_CONFIG.seoTitle,
    metaDescription: regionConfig.metaDescription || DEFAULT_CONFIG.metaDescription,
    heroSlides: regionConfig.heroSlides || DEFAULT_CONFIG.heroSlides,
    projects: regionConfig.projects || DEFAULT_CONFIG.projects,
    processSteps: regionConfig.processSteps || DEFAULT_CONFIG.processSteps,
    faqs: regionConfig.faqs || DEFAULT_CONFIG.faqs,
    testimonials: regionConfig.testimonials || DEFAULT_CONFIG.testimonials,
    breadcrumbs: [
      ...(DEFAULT_CONFIG.breadcrumbs || []),
      ...(regionConfig.breadcrumbs || [])
    ],
    regio: {
      ...DEFAULT_CONFIG.regio,
      ...(regionConfig.regio || {}),
      municipalLinks: regionConfig.regio?.municipalLinks || DEFAULT_CONFIG.regio.municipalLinks,
      collageImages: regionConfig.regio?.collageImages || DEFAULT_CONFIG.regio.collageImages,
      expertise: {
        ...DEFAULT_CONFIG.regio.expertise,
        ...(regionConfig.regio?.expertise || {})
      }
    }
  };
};

// Backwards compatibility - exporteer oude REGIO_DATA
export const REGIO_DATA = DEFAULT_CONFIG.regio;
