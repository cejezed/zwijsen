import { DEFAULT_CONFIG } from './base';
import type { RegioConfig } from './types';
import {
  loenenAanDeVechtConfig,
  loosdrechtConfig
} from './regions';

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

  // Breukelen - TODO: maak breukelen.ts aan in regions/
  // "breukelen": breukelenConfig,

  // Maarssen - TODO: maak maarssen.ts aan in regions/
  // "maarssen": maarssenConfig,

  // Vreeland - TODO: maak vreeland.ts aan in regions/
  // "vreeland": vreelandConfig,

  // Kortenhoef - TODO: maak kortenhoef.ts aan in regions/
  // "kortenhoef": kortenhoefConfig,

  // Hilversum - TODO: maak hilversum.ts aan in regions/
  // "hilversum": hilversumConfig,

  // Bilthoven - TODO: maak bilthoven.ts aan in regions/
  // "bilthoven": bilthovenConfig,

  // Blaricum - TODO: maak blaricum.ts aan in regions/
  // "blaricum": blaricumConfig,

  // Laren - TODO: maak laren.ts aan in regions/
  // "laren": larenConfig,

  // Stichtse Vecht - TODO: maak stichtse-vecht.ts aan in regions/
  // "stichtse-vecht": stichtseVechtConfig,

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
    heroSlides: regionConfig.heroSlides || DEFAULT_CONFIG.heroSlides,
    projects: regionConfig.projects || DEFAULT_CONFIG.projects,
    processSteps: regionConfig.processSteps || DEFAULT_CONFIG.processSteps,
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
