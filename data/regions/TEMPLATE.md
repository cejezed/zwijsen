# Template voor nieuwe regio's

Deze template gebruiken om een nieuwe regio toe te voegen aan de website.

## Stap 1: Creëer het regio configuratiebestand

Maak een nieuw bestand aan in `data/regions/` met de naam van de regio in kebab-case:

Bijvoorbeeld: `data/regions/hilversum.ts`

```typescript
import type { RegioConfig } from '../types';

export const hilversumConfig: Partial<RegioConfig> = {
  // SEO Configuratie (VERPLICHT voor Google vindbaarheid)
  seoTitle: "Architect Hilversum | Nieuwbouw, Verbouw en Verduurzaming Architectenbureau Jules Zwijsen",
  metaDescription: "Architect in Hilversum voor nieuwbouw, verbouw en monumenten. Jules Zwijsen ontwerpt woningen met oog voor locatie, regelgeving en detail.",

  // Hero slides - optioneel per regio (minimaal 1 aanbevolen)
  heroSlides: [
    {
      url: "/images/hilversum/hero-1.webp",
      title: "ARCHITECT IN HILVERSUM",
      subtitle: "Nieuwbouw, verbouw en monumentenzorg in 't Gooi"
    },
    {
      url: "/images/hilversum/hero-2.webp",
      title: "VAN EERSTE SCHETS TOT OPLEVERING",
      subtitle: "Ontwerpen met oog voor de karakteristieke omgeving"
    }
  ],

  // Portfolio projecten specifiek voor deze regio (optioneel)
  projects: [
    {
      id: 1,
      title: "Moderne Villa",
      location: "Hilversum",
      slug: "moderne-villa-hilversum",
      image: "https://example.com/project-image.jpg",
      size: "wide" as const,
      year: "2025",
      area: "350m²",
      tag: "Nieuwbouw",
      description: "Een moderne villa in Hilversum...",
      gallery: [
        "https://example.com/gallery-1.jpg",
        "https://example.com/gallery-2.jpg",
        "https://example.com/gallery-3.jpg"
      ]
    }
  ],

  // Regio-specifieke configuratie (VERPLICHT)
  regio: {
    name: "Hilversum",

    // Intro sectie - H1 + intro tekst direct onder hero (VERPLICHT voor SEO)
    intro: {
      h1: "Architect in Hilversum",
      paragraph: "U zoekt een architect in Hilversum voor een verbouwing, aanbouw of nieuwbouwwoning. Jules Zwijsen werkt aan woningen en villa's in Hilversum en 't Gooi, met oog voor de bosrijke omgeving en de regels van de gemeente Hilversum. Het doel is een helder ontwerp dat goed voelt in het dagelijks gebruik en past in de groene omgeving."
    },

    // Footer intro - H2 + contacttekst in de footer (VERPLICHT voor SEO)
    footerIntro: {
      h2: "Architect in Hilversum nodig?",
      paragraph: "Denkt u na over een verbouwing, aanbouw of nieuwbouwwoning in Hilversum of 't Gooi en wilt u daar met een architect over sparren? Neem contact op met Jules Zwijsen voor een vrijblijvend gesprek. Tijdens een afspraak in Hilversum wordt samen bekeken welke mogelijkheden er zijn voor uw woning en locatie."
    },

    // Collage afbeeldingen voor de rechterkant (6 afbeeldingen aanbevolen)
    collageImages: [
      {
        url: "/images/hilversum/collage-1.webp",
        alt: "Moderne architectuur in Hilversum"
      },
      {
        url: "/images/hilversum/collage-2.webp",
        alt: "Villa 't Gooi"
      },
      {
        url: "/images/hilversum/collage-3.webp",
        alt: "Interieur detail"
      },
      {
        url: "/images/hilversum/collage-4.webp",
        alt: "Gevelperspectief"
      },
      {
        url: "/images/hilversum/collage-5.webp",
        alt: "Renovatie detail"
      },
      {
        url: "/images/hilversum/collage-6.webp",
        alt: "Architect Hilversum project"
      }
    ],

    // Gemeentelijke links (VERPLICHT - belangrijk voor SEO en gebruikers)
    municipalLinks: [
      {
        title: "Bestemmingsplan / Omgevingsplan",
        url: "https://www.ruimtelijkeplannen.nl/",
        description: "Controleer wat er mag op uw locatie volgens het gemeentelijke bestemmingsplan."
      },
      {
        title: "Welstandsnota Hilversum",
        url: "https://www.hilversum.nl/welstand",
        description: "Inzicht in welstandscriteria en architectonische eisen voor uw bouwplan."
      },
      {
        title: "Omgevingsvergunning aanvragen",
        url: "https://www.hilversum.nl/omgevingsvergunning",
        description: "Informatie over het aanvragen van een omgevingsvergunning in Hilversum."
      }
    ],

    // Expertise sectie (VERPLICHT)
    expertise: {
      h2: "Wat doet een architect in Hilversum?",
      paragraph: "Als architect in Hilversum richt Jules Zwijsen zich op het ontwerpen en verbouwen van woningen in en rond de gemeente. Van een compacte uitbouw tot een complete nieuwbouwvilla in 't Gooi. Steeds met aandacht voor het groene karakter, de rijke architectuurgeschiedenis en de lokale regelgeving.",

      h3: "Architectonisch ontwerp en verbouw in 't Gooi",
      h3_paragraph: "In Hilversum en omgeving speelt de balans tussen traditie en vernieuwing een grote rol. Bij elk ontwerp wordt gekeken naar het villakarakter, de groene omgeving en de eisen van de gemeente Hilversum. Zo ontstaat een ontwerp dat past bij de locatie en voldoet aan alle welstandseisen.",

      services: [
        "Ontwerp van nieuwbouwwoningen in Hilversum en 't Gooi",
        "Verduurzaming, aanbouw en uitbouw van bestaande woningen",
        "Verbouw en herindeling van villa's",
        "Begeleiding bij vergunningsaanvragen bij gemeente Hilversum",
        "Actief in Hilversum, Laren, Blaricum en omgeving"
      ],

      regionalProjects: [
        {
          title: "Villa 't Gooi",
          description: "Moderne interpretatie van de Gooise villa"
        },
        {
          title: "Monumentale woning",
          description: "Zorgvuldige renovatie met respect voor historie"
        },
        {
          title: "Nieuwbouw bosperceel",
          description: "Eigentijdse architectuur in groene omgeving"
        }
      ]
    }
  }
};
```

## Stap 2: Exporteer de configuratie

Voeg de export toe aan `data/regions/index.ts`:

```typescript
export { hilversumConfig } from './hilversum';
```

## Stap 3: Registreer de regio in PAGE_CONFIG

Voeg de regio toe aan `PAGE_CONFIG` in `data/index.ts`:

```typescript
import {
  loenenAanDeVechtConfig,
  loosdrechtConfig,
  hilversumConfig  // ← Import toevoegen
} from './regions';

export const PAGE_CONFIG: Record<string, Partial<RegioConfig>> = {
  default: DEFAULT_CONFIG,
  "loenen-aan-de-vecht": loenenAanDeVechtConfig,
  "loosdrecht": loosdrechtConfig,
  "hilversum": hilversumConfig,  // ← Toevoegen
};
```

## Stap 4: Voeg route toe in App.tsx

**BELANGRIJK**: Voeg de directe route toe aan `App.tsx` zodat de pagina toegankelijk is via `/hilversum`:

```typescript
{/* Direct regio routes zonder /regios/ prefix */}
<Route path="/loenen-aan-de-vecht" element={<RegioDetail />} />
<Route path="/loosdrecht" element={<RegioDetail />} />
<Route path="/hilversum" element={<RegioDetail />} />  {/* ← TOEVOEGEN */}
```

## Stap 5: Test de regio

De nieuwe regio is nu beschikbaar op:
- **Direct**: `http://localhost:3002/hilversum`
- **Via overzicht**: `http://localhost:3002/regios` → klik op Hilversum kaart

## SEO Checklist

Zorg dat deze velden altijd ingevuld zijn voor optimale vindbaarheid:

✅ **seoTitle** - Optimale titel voor Google (max 60 karakters)
- Format: "Architect [Plaats] | [Diensten] Architectenbureau Jules Zwijsen"
- Voorbeeld: "Architect Hilversum | Nieuwbouw, Verbouw en Verduurzaming Architectenbureau Jules Zwijsen"

✅ **metaDescription** - Beschrijving voor Google snippets (max 160 karakters)
- Duidelijk, actionable en met kernwoorden
- Voorbeeld: "Architect in Hilversum voor nieuwbouw, verbouw en monumenten. Jules Zwijsen ontwerpt woningen met oog voor locatie, regelgeving en detail."

✅ **regio.name** - Exacte plaatsnaam zoals gebruikt in zoekgedrag
- Voorbeeld: "Hilversum", "Loenen aan de Vecht"

✅ **regio.intro** - H1 en intro paragraaf boven de vouw (VERPLICHT)
- **h1**: "Architect in [Plaats]" - belangrijkste keyword voor SEO
- **paragraph**: Lokaal gerichte intro tekst met diensten en locatie
- Voorbeeld H1: "Architect in Hilversum"
- Voorbeeld paragraph: "U zoekt een architect in Hilversum voor een verbouwing, aanbouw of nieuwbouwwoning..."

✅ **regio.footerIntro** - H2 en contacttekst in de footer (VERPLICHT)
- **h2**: "Architect in [Plaats] nodig?" - extra SEO keyword variatie
- **paragraph**: Nuchtere, concrete contacttekst met call-to-action
- Voorbeeld H2: "Architect in Hilversum nodig?"
- Voorbeeld paragraph: "Denkt u na over een verbouwing, aanbouw of nieuwbouwwoning in Hilversum..."

✅ **heroSlides** - Minimaal 1 afbeelding met alt-tekst
- Alt-tekst moet beschrijvend zijn voor SEO

✅ **municipalLinks** - Minimaal 3-5 relevante gemeentelijke links
- Helpt bezoekers en signaleert lokale relevantie aan Google

## Naamgeving conventies

**Slug** (URL): Altijd lowercase met koppeltekens
- ✅ Goed: `loenen-aan-de-vecht`, `het-gooi`, `stichtse-vecht`
- ❌ Fout: `Loenen_aan_de_Vecht`, `hetGooi`

**Config naam**: camelCase met Config suffix
- ✅ Goed: `loenenAanDeVechtConfig`, `hetGooiConfig`
- ❌ Fout: `loenen_config`, `hetgooi`

**Bestandsnaam**: Exact gelijk aan slug
- ✅ Goed: `loenen-aan-de-vecht.ts`, `het-gooi.ts`
- ❌ Fout: `LoenenAanDeVecht.ts`, `loenen_aan_de_vecht.ts`

## Afbeeldingen

Plaats afbeeldingen in: `public/images/[regio-slug]/`

Bijvoorbeeld:
```
public/images/hilversum/
  ├── hero-1.webp
  ├── hero-2.webp
  ├── collage-1.webp
  ├── collage-2.webp
  └── ...
```

## Veelgestelde vragen

**Q: Moet ik altijd `projects` opgeven?**
A: Nee, dit is optioneel. Als je geen regio-specifieke projecten opgeeft, worden de default projecten gebruikt.

**Q: Wat gebeurt er als ik geen `heroSlides` opgeef?**
A: Dan worden de default hero slides gebruikt van de homepage.

**Q: Hoe pas ik de werkwijze aan per regio?**
A: Je kunt `processSteps` toevoegen aan de config. Als je dit niet doet, worden de default stappen gebruikt.

**Q: Kan ik meerdere gemeentes onder één regio configureren?**
A: Ja! Je kunt bijvoorbeeld een "Stichtse Vecht" regio maken die meerdere plaatsen omvat. Gebruik dan `municipalLinks` om naar de relevante gemeentepagina's te linken.
