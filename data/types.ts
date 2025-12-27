// Hero slide type
export interface HeroSlide {
  url: string;
  title: string;
  subtitle: string;
  titleSize?: 'small' | 'medium' | 'large' | 'xlarge';  // Optioneel: grootte van de title
  subtitleSize?: 'small' | 'medium' | 'large';  // Optioneel: grootte van de subtitle
}

// Image met alt tekst
export interface ImageWithAlt {
  url: string;
  alt: string;
}

// Portfolio project type (volledige project info voor PortfolioSection)
export interface Project {
  id: number;
  title: string;
  location: string;
  slug?: string;  // Optioneel: slug voor link naar gedetailleerde projectpagina
  image: string | ImageWithAlt;
  size: 'wide' | 'portrait' | 'landscape' | 'square';
  year: string;
  area: string;
  tag: string;
  description: string;
  gallery: (string | ImageWithAlt)[];
}

// Regional project type (kleine project cards in RegionSection)
export interface RegionalProject {
  title: string;
  description: string;
}

// Project categorieën
export type ProjectCategory =
  | 'nieuwbouw'
  | 'verbouw'
  | 'verduurzaming'
  | 'aanbouw'
  | 'in-aanbouw'
  | 'uitgelicht';

// Project Detail type voor gedetailleerde projectpagina's
export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  locationLabel: string;
  tags: string[];
  categories?: ProjectCategory[];  // Optioneel: categorieën voor filtering

  // SEO & Meta data
  seo?: {
    title?: string;              // SEO title (fallback: project title)
    description?: string;         // Meta description
    keywords?: string[];          // Meta keywords
    ogImage?: string;             // Open Graph image URL
  };

  featuredImage: ImageWithAlt;
  heroImages: ImageWithAlt[];
  sections: ProjectSection[];
  cta: {
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
  metaDescription?: string;  // SEO meta description voor deze regio
  heroSlides?: HeroSlide[];
  projects?: Project[];  // Portfolio projecten voor deze regio
  processSteps?: ProcessStep[];  // Werkwijze stappen (optioneel per regio)
  regio: {
    name: string;
    collageImages?: (string | ImageWithAlt)[];  // 6 afbeeldingen voor de collage
    municipalLinks?: MunicipalLink[];  // Handige links voor deze regio
    expertise: {
      h2: string;
      paragraph: string;
      h3: string;
      h3_paragraph: string;
      services: string[];
      regionalProjects: RegionalProject[];
    };
  };
}
