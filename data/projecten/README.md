# Projecten Directory

Deze directory bevat alle gedetailleerde project informatie voor de portfolio sectie.

## Structuur

```
projecten/
├── index.ts                                    # Centrale export van alle projecten
├── projects.ts                                 # Backwards compatibility (deprecated)
├── levensloopbestendige-seniorenwoningen-loenen.ts  # Individueel project
├── [nieuwe-project-naam].ts                    # Voeg hier nieuwe projecten toe
└── README.md                                   # Deze file
```

## Een nieuw project toevoegen

### Stap 1: Maak een nieuw bestand

Creëer een nieuw `.ts` bestand met een beschrijvende naam (gebruik kebab-case):

```bash
# Bijvoorbeeld:
data/projecten/moderne-villa-zandvoort.ts
```

### Stap 2: Definieer het project

Kopieer deze template en pas aan:

```typescript
import type { ProjectDetail } from '../types';

export const moderneVillaZandvoort: ProjectDetail = {
  slug: "moderne-villa-zandvoort",  // Unieke slug voor URL
  title: "Moderne Villa Zandvoort",
  subtitle: "Korte beschrijving van het project",
  locationLabel: "Locatie: Zandvoort",
  tags: ["Nieuwbouw", "Villa", "Zandvoort"],
  categories: ["nieuwbouw", "uitgelicht"],  // Optioneel: categorieën voor filtering

  // SEO & Meta data (optioneel maar sterk aanbevolen)
  seo: {
    title: "Moderne Villa Zandvoort | Architect Jules Zwijsen",
    description: "Unieke moderne villa in Zandvoort met innovatief design en hoogwaardige materialen. Ontworpen door architect Jules Zwijsen.",
    keywords: ["moderne villa", "Zandvoort", "architect", "nieuwbouw", "villa design"],
    ogImage: "https://example.com/social-share-image.jpg"  // Afbeelding voor social media
  },

  featuredImage: {
    url: "https://example.com/image.jpg",
    alt: "Beschrijving van afbeelding"
  },

  heroImages: [
    { url: "https://example.com/hero1.jpg", alt: "Hero 1" },
    { url: "https://example.com/hero2.jpg", alt: "Hero 2" }
  ],

  sections: [
    { type: "spacer", size: "md" },
    {
      type: "split",
      layout: "image-left",
      fullWidth: false,
      title: "Sectie titel",
      content: "Sectie inhoud...",
      image: { url: "https://example.com/section.jpg", alt: "Sectie afbeelding" }
    },
    // Voeg meer secties toe...
  ],

  cta: {
    kicker: "Call to action kicker",
    headline: "Call to action headline",
    buttonLabel: "Button tekst",
    href: "/contact"
  }
};
```

### Stap 3: Exporteer in index.ts

Voeg het nieuwe project toe aan `data/projecten/index.ts`:

```typescript
// 1. Exporteer de named export
export { moderneVillaZandvoort } from './moderne-villa-zandvoort';

// 2. Importeer voor de array
import { moderneVillaZandvoort } from './moderne-villa-zandvoort';

// 3. Voeg toe aan PROJECTS_DETAIL array
export const PROJECTS_DETAIL: ProjectDetail[] = [
  levensloopbestendigeniorenwoningenLoenen,
  moderneVillaZandvoort,  // <-- Voeg hier toe
  // ... meer projecten
];
```

### Stap 4: Test

Het project is nu beschikbaar via:
- De ProjectTemplate component (bij klik op project met slug)
- De PROJECTS_DETAIL array voor lijsten

## Section Types

Beschikbare section types:

### Spacer
```typescript
{ type: "spacer", size: "sm" | "md" | "lg" }
```

### Split (Afbeelding + Tekst)
```typescript
{
  type: "split",
  layout: "image-left" | "image-right",
  fullWidth: boolean,
  title: string,
  content: string,
  image: ImageWithAlt
}
```

### Role (Project Context)
```typescript
{
  type: "role",
  title: string,
  origin: string,
  values: string[],
  roleItems: string[],
  partners: Array<{ label: string; value: string }>
}
```

### Sketches (Concepten + Plattegrond)
```typescript
{
  type: "sketches",
  title: string,
  concepts: ImageWithAlt[],
  floorPlan: ImageWithAlt
}
```

### Gallery
```typescript
{
  type: "gallery",
  layout: "horizontal" | "grid",
  gallery: ImageWithAlt[]
}
```

## Categorieën

Projecten kunnen één of meerdere categorieën hebben voor filtering en organisatie:

### Beschikbare categorieën:

- **nieuwbouw** - Nieuwe bouwprojecten van scratch
- **verbouw** - Renovatie van bestaande woningen
- **verduurzaming** - Duurzaamheidsprojecten (isolatie, zonnepanelen, etc.)
- **aanbouw** - Uitbreidingen aan bestaande woningen
- **in-aanbouw** - Projecten die momenteel in uitvoering zijn
- **uitgelicht** - Speciale/featured projecten voor homepage

### Gebruik:

```typescript
categories: ["nieuwbouw", "verduurzaming", "uitgelicht"]
```

### Filter functies:

```typescript
import {
  filterByCategory,
  filterByCategories,
  getUniqueCategories,
  countByCategory,
  CATEGORY_LABELS,
  CATEGORY_COLORS
} from './data/projecten';

// Filter op één categorie
const nieuwbouwProjects = filterByCategory(PROJECTS_DETAIL, 'nieuwbouw');

// Filter op meerdere categorieën
const featured = filterByCategories(PROJECTS_DETAIL, ['uitgelicht', 'nieuwbouw']);

// Haal alle gebruikte categorieën op
const categories = getUniqueCategories(PROJECTS_DETAIL);

// Tel projecten per categorie
const counts = countByCategory(PROJECTS_DETAIL);

// Gebruik labels voor display
const label = CATEGORY_LABELS['nieuwbouw']; // "Nieuwbouw"

// Gebruik kleuren voor badges
const colors = CATEGORY_COLORS['nieuwbouw'];
// { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }
```

## SEO & Meta Data

Elk project kan optionele SEO en meta data bevatten voor betere vindbaarheid:

### Beschikbare SEO velden:

```typescript
seo: {
  title: string;              // SEO title tag (max 60 karakters aanbevolen)
  description: string;         // Meta description (max 160 karakters aanbevolen)
  keywords: string[];          // Keywords array voor meta keywords
  ogImage: string;             // URL naar Open Graph afbeelding (1200x630px aanbevolen)
}
```

### Automatische Fallbacks:

Als je geen SEO data opgeeft, gebruikt het systeem:
- **Title**: `{project.title} | Jules Zwijsen`
- **Description**: `{project.subtitle}`
- **Keywords**: `{project.tags}`
- **OG Image**: `{project.featuredImage.url}`

### Social Media Tags:

Het systeem genereert automatisch:
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Structured data voor zoekmachines

### Best Practices:

1. **Title**: Houd tussen 50-60 karakters, plaats belangrijkste keywords vooraan
2. **Description**: Schrijf 150-160 karakters, maak het aantrekkelijk en informatief
3. **Keywords**: 5-10 relevante keywords, niet te algemeen
4. **OG Image**: Gebruik hoogwaardige afbeelding 1200x630px voor beste resultaat op social media

## Tips

1. **Slug naamgeving**: Gebruik duidelijke, SEO-vriendelijke slugs
2. **Image Alt teksten**: Schrijf beschrijvende alt teksten voor toegankelijkheid
3. **Bestandsnaam**: Gebruik dezelfde naam als de export (kebab-case)
4. **Volgorde**: Projecten verschijnen in de volgorde van de PROJECTS_DETAIL array
5. **Categorieën**: Voeg relevante categorieën toe voor betere filtering
6. **Multiple categorieën**: Een project kan meerdere categorieën hebben (bijv. nieuwbouw + verduurzaming)
7. **SEO data**: Voeg altijd SEO data toe voor betere vindbaarheid in zoekmachines

## Voorbeeld Project Structuur

Zie `levensloopbestendige-seniorenwoningen-loenen.ts` voor een volledig voorbeeld met SEO data.
