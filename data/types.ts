// Hero slide type
export interface HeroSlide {
  url: string;
  title: string;
  subtitle: string;
  titleSize?: 'small' | 'medium' | 'large' | 'xlarge';  // Optioneel: grootte van de title
  subtitleSize?: 'small' | 'medium' | 'large';  // Optioneel: grootte van de subtitle
}

// FAQ type
export interface FAQ {
  tag: string;
  q: string;
  a: string;
  color: string;
}

// Testimonial type
export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  role: string;
  image: string;
}

// Image met alt tekst
export interface ImageWithAlt {
  url: string;
  alt: string;
}

// Snapshot types voor overlay projecten
export type SnapshotLogicType = 'vraag' | 'pijn' | 'oplossing' | 'opbrengst';

export interface ProjectSnapshot {
  idea?: string;
  extendedDescription?: string;
  logic: Array<{ type: SnapshotLogicType; text: string }>;
  yield: string[];
}

// Portfolio project type (volledige project info voor PortfolioSection)
export interface Project {
  id: number;
  title: string;
  location: string;
  slug?: string;  // Optioneel: slug voor link naar gedetailleerde projectpagina

  // Klikgedrag: overlay (light) of pagina (full)
  openMode?: 'page' | 'overlay';

  image: string | ImageWithAlt;
  size: 'wide' | 'portrait' | 'landscape' | 'square';
  year: string;
  area: string;
  tag: string;
  description: string;

  // Beelden (support zowel string als {url, alt})
  gallery: (string | ImageWithAlt)[];

  // Light overlay data (optioneel)
  snapshot?: ProjectSnapshot;

  // Optioneel: typologie label voor overlay footer
  typology?: string;

  // Optioneel: categorieën voor filtering
  categories?: string[];
}

// Regional project type (kleine project cards in RegionSection)
export interface RegionalProject {
  title: string;
  description: string;
}

// Project categorieën
export type ProjectCategory = string;

// Project Detail type voor gedetailleerde projectpagina's
export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  locationLabel: string;
  year?: string;
  area?: string;
  tags: string[];
  categories?: ProjectCategory[];  // Optioneel: categorieën voor filtering

  // ✅ nieuw: bepaalt of klik naar pagina gaat of overlay
  openMode?: 'page' | 'overlay';

  // Light overlay data (optioneel)
  snapshot?: ProjectSnapshot;

  // Optioneel: typologie label voor overlay footer
  typology?: string;

  // SEO & Meta data
  seo?: {
    title?: string;              // SEO title (fallback: project title)
    description?: string;         // Meta description
    keywords?: string[];          // Meta keywords
    ogImage?: string;             // Open Graph image URL
  };

  featuredImage: ImageWithAlt;
  heroImages: ImageWithAlt[];

  // ✅ light projects hebben geen sections nodig
  sections?: ProjectSection[];

  partners?: Array<{ label: string; name?: string; value?: string; href?: string }>;

  // ✅ light projects hebben geen CTA nodig
  cta?: {
    kicker: string;
    headline: string;
    buttonLabel: string;
    href: string;
  };
}

// Project Section types
export type ProjectSection =
  | { type: 'spacer'; size: 'sm' | 'md' | 'lg' }
  | { type: 'split'; layout: 'image-left' | 'image-right'; fullWidth: boolean; title: string; content: string; image: ImageWithAlt }
  | { type: 'role'; title: string; origin: string; values: string[]; roleItems: string[]; partners?: Array<{ label: string; value: string }> }
  | { type: 'sketches'; title: string; concepts: ImageWithAlt[]; floorPlan: ImageWithAlt }
  | { type: 'gallery'; layout: 'horizontal' | 'grid'; gallery: ImageWithAlt[] };

// Municipal link type
export interface MunicipalLink {
  title: string;
  url: string;
  description: string;
}

// Process step type
export interface ProcessStep {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  deliverables: string[];
  img: string;
}

// Type definitie voor regio configuratie
export interface RegioConfig {
  seoTitle: string;
  metaDescription?: string;
  ogImage?: string;       // Optionele specifieke OG image (1200x630)
  canonicalUrl?: string;  // Optionele handmatige canonical
  heroSlides?: HeroSlide[];
  projects?: Project[];
  processSteps?: ProcessStep[];
  faqs?: FAQ[];
  testimonials?: Testimonial[];
  breadcrumbs?: { label: string; href: string }[]; // Breadcrumbpad voor SEO
  regio: {
    name: string;
    geo?: {
      region?: string;
      position?: string;
      coordinates?: {
        latitude: number;
        longitude: number;
      };
    };
    municipality?: string; // e.g. "Wijdemeren"
    province?: string;     // e.g. "Noord-Holland"
    intro?: {
      h1: string;  // H1 titel, bijv. "Architect in Loenen aan de Vecht"
      paragraph: string;  // Intro tekst direct onder de hero
    };
    footerIntro?: {
      h2: string;  // H2 titel, bijv. "Architect in Loenen aan de Vecht nodig?"
      paragraph: string;  // Korte contacttekst in de footer
    };
    collageImages?: (string | ImageWithAlt)[];  // 6 afbeeldingen voor de collage
    municipalLinks?: MunicipalLink[];  // Handige links voor deze regio
    expertise: {
      h2: string;
      paragraph: string;
      h3: string;
      h3_paragraph: string;
      services: string[];
      regionalProjects?: RegionalProject[];  // Optioneel - wordt niet meer gebruikt
    };
  };
}
