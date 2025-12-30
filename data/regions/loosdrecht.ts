import type { RegioConfig } from '../types';
import { PROJECTS_DETAIL } from '../projecten';

// Converteer relevante projecten naar Project format voor de portfolio grid
const loosdrechtProjects = PROJECTS_DETAIL
  .filter(p =>
    p.slug === 'moderne-villa-gebogen-gevel-gooi-en-vechtstreek' ||
    p.slug === 'moderne-rietkapvilla-het-gooi' ||
    p.slug === 'modern-paviljoen-water-reeuwijk' ||
    p.slug === 'moderne-villa-rieten-kap-blaricum'
  )
  .map((p, index) => {
    const sizes = ['wide', 'portrait', 'landscape', 'square'] as const;
    const size = sizes[index % 4];

    return {
      id: 200 + index, // Unieke IDs voor deze projecten
      title: p.title,
      location: p.locationLabel,
      slug: p.slug,
      image: p.featuredImage.url,
      size: size,
      year: 'N.N.B.',
      area: 'N.N.B.',
      tag: p.categories?.[0] === 'nieuwbouw' ? 'Nieuwbouw' : p.categories?.[0] === 'verbouw' ? 'Verbouw' : 'Project',
      subtitle: p.subtitle,
      description: p.subtitle,
      gallery: p.heroImages.map(img => img.url)
    };
  });

export const loosdrechtConfig: Partial<RegioConfig> = {
  seoTitle: "Architect Loosdrecht, Nieuw Loosdrecht en Breukeleveen gemeente Wijdemeren | Nieuwbouw en Verbouw Architectenbureau Jules Zwijsen",
  metaDescription: "Architect in Loosdrecht, Nieuw-Loosdrecht en Breukeleveen voor nieuwbouw en verbouw aan de Loosdrechtse Plassen. Jules Zwijsen ontwerpt woningen met oog voor water en groene omgeving.",

  // Projecten voor Loosdrecht - eerste 4 worden getoond in QuickProjectsGrid
  projects: loosdrechtProjects,

  // Hero slides voor Loosdrecht
  heroSlides: [
    {
      url: "/images/loosdrecht/luxe-villa-architect-loosdrecht-moderne-woning-zwembad-luxury-living-architekt-wijdemeren.webp",
      title: "ARCHITECT IN LOOSDRECHT",
      subtitle: "Woningen met oog voor water en groene omgeving aan de Plassen"
    },
    {
      url: "/images/loosdrecht/moderne-villa-witte-gevels-architect-gelijkvloers-wonen-aan-het-water-wijdemeren-luxury-living.webp",
      title: "VAN EERSTE SCHETS TOT OPLEVERING",
      subtitle: "Ontwerpen die passen bij het karakter van Loosdrecht"
    },
    {
      url: "/images/loosdrecht/moderne-stacaravan-recreatiewoning-eigentijds-architect-houten-schermen-loosdrecht.webp",
      title: "VAKMANSCHAP EN AANDACHT",
      subtitle: "Begeleiding bij vergunningen en contact met gemeente Wijdemeren"
    }
  ],

  regio: {
    name: "Wijdemeren",

    // Intro sectie - H1 + intro tekst direct onder hero
    intro: {
      h1: "Architect in Loosdrecht",
      paragraph: "U zoekt een architect in Loosdrecht voor een verbouwing, aanbouw of nieuwbouwwoning aan de Loosdrechtse Plassen of in Nieuw Loosdrecht. Vanuit mijn basis in Loenen aan de Vecht werk ik met regelmaat in Loosdrecht en omgeving. Het doel is een ontwerp dat uw leven bij het water optimaal maakt - een woning die past bij uw dromen en hoe u hier wilt genieten van uw omgeving. Door ervaring met regelgeving en afwijkingsmogelijkheden ontstaat vaak meer ruimte dan verwacht om uw ideale woning te realiseren aan de Plassen."
    },

    // Footer intro - H2 + contacttekst in de footer
    footerIntro: {
      h2: "Architect in Loosdrecht of Breukeleveen nodig?",
      paragraph: "Denkt u na over een verbouwing, aanbouw of nieuwbouwwoning in Loosdrecht, Breukeleveen of Nieuw Loosdrecht en wilt u daar met een architect over sparren? Neem contact op met Jules Zwijsen voor een vrijblijvend gesprek. Tijdens een afspraak op uw locatie wordt samen bekeken welke mogelijkheden er zijn voor uw woning en locatie in gemeente Wijdemeren (of binnenkort gemeente Hilversum) en omgeving."
    },

    collageImages: [
      {
        url: "/images/loosdrecht/luxe-villa-architect-loosdrecht-moderne-woning-zwembad-luxury-living-architekt-wijdemeren.webp",
        alt: "Luxe villa met zwembad in Loosdrecht, moderne architectuur door architect Jules Zwijsen"
      },
      {
        url: "/images/loosdrecht/rieten-kap-villa-loosdrecht-wijdemeren-architect-moderne-woning-kavel-architekt.webp",
        alt: "Moderne villa met rieten kap in Loosdrecht, ontwerp architect Wijdemeren"
      },
      {
        url: "/images/loosdrecht/moderne-villa-witte-gevels-architect-gelijkvloers-wonen-aan-het-water-wijdemeren-luxury-living.webp",
        alt: "Moderne villa met witte gevels aan het water in Wijdemeren, gelijkvloers wonen"
      },
      {
        url: "/images/loosdrecht/recreatiewoning-nieuwbouw-loosdrecht-architect-moderne-recreatie-woning.webp",
        alt: "Nieuwbouw recreatiewoning in Loosdrecht, modern ontwerp door architect"
      },
      {
        url: "/images/loosdrecht/moderne-stacaravan-recreatiewoning-eigentijds-architect-houten-schermen-loosdrecht.webp",
        alt: "Moderne recreatiewoning met houten schermen in Loosdrecht, eigentijds ontwerp"
      },
      {
        url: "/images/loosdrecht/modern interieur gebogen villa luxe architect loosdrecht villa vrijstaand bouwen bouwgrond.webp",
        alt: "Modern interieur van gebogen villa in Loosdrecht, luxe vrijstaande woning op bouwgrond"
      }
    ],

    municipalLinks: [
      {
        title: "Bestemmingsplan Wijdemeren",
        url: "https://omgevingswet.overheid.nl/regels-op-de-kaart/zoeken/locatie",
        description: "Controleer wat er mag op uw locatie volgens het gemeentelijke bestemmingsplan."
      },
      {
        title: "Welstandsnota Wijdemeren",
        url: "https://www.wijdemeren.nl/nl/beleidsnota-s/Welstandsnota-2013-2MB.pdf",
        description: "Inzicht in welstandscriteria en architectonische eisen voor uw bouwplan."
      },
      {
        title: "Leges en tarieven omgevingsvergunning",
        url: "https://lokaleregelgeving.overheid.nl/CVDR733879/1",
        description: "Overzicht van gemeentelijke kosten voor vergunningaanvragen."
      },
      {
        title: "Vooroverleg gemeente Wijdemeren; Verken uw idee",
        url: "https://www.wijdemeren.nl/verkenuwidee",
        description: "Neem vooraf contact op met de gemeente voor advies over uw plannen."
      }
    ],
    expertise: {
      h2: "Wat doet een architect in Loosdrecht?",
      paragraph: "Als architect in Loosdrecht en omgeving ontwerpt Jules Zwijsen woningen met oog voor de unieke ligging aan de Loosdrechtse Plassen en het bijzondere veenlandschap. Van waterwoningen, recreatiewoningen tot landelijke villa's - elk ontwerp past bij de groene en waterrijke omgeving die de gemeente wijdemeren en hilversum zo uniek maken. En bovenal natuurlijk bij uw wensen en dromen zodat het uw thuis wordt.",
      h3: "Architectonisch ontwerp aan de Plassen",
      h3_paragraph: "Loosdrecht kent een bijzonder karakter door de nabijheid van water en natuur. Bij elk ontwerp wordt rekening gehouden met het dorpse karakter en de landschappelijke kwaliteiten van de omgeving. Jules Zwijsen heeft ruime ervaring met de gemeente Wijdemeren (binnenkort gemeente Hilversum), de welstandscommissie en procedures voor afwijking van het bestemmingsplan. Deze kennis zorgt ervoor dat uw project soepel tot realisatie komt en dat u optimaal kunt profiteren van de mogelijkheden die er zijn voor uw specifieke situatie.",
      services: [
        "Ontwerp van nieuwbouwwoningen in Loosdrecht, Nieuw Loosdrecht en Breukeleveen",
        "Verbouw van woningen nabij de Loosdrechtse Plassen",
        "Aanbouw, uitbreiding en verduurzaming van bestaande woningen",
        "Begeleiding bij vergunningsaanvragen gemeente Wijdemeren en gemeente Hilversum",
  
      ]
    }
  }
};
