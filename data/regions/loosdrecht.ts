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
  seoTitle: "Architect Loosdrecht aan de Plassen | Nieuwbouw & Verbouw | Jules Zwijsen",
  metaDescription: "Architect in Loosdrecht, Nieuw-Loosdrecht en Breukeleveen voor exclusieve nieuwbouw en verbouw aan de Loosdrechtse Plassen. Jules Zwijsen: van schets tot vergunning in Wijdemeren.",
  canonicalUrl: "https://www.zwijsen.net/loosdrecht",

  breadcrumbs: [
    { label: "Loosdrecht", href: "/loosdrecht" }
  ],

  // Projecten voor Loosdrecht - eerste 4 worden getoond in QuickProjectsGrid
  projects: loosdrechtProjects,

  // Hero slides voor Loosdrecht
  heroSlides: [
    {
      url: "/images/loosdrecht/luxe-villa-architect-loosdrecht-moderne-woning-zwembad-luxury-living-architekt-wijdemeren.webp",
      title: "ARCHITECT IN LOOSDRECHT",
      subtitle: "Exclusieve woningen aan de Loosdrechtse Plassen"
    },
    {
      url: "/images/loosdrecht/moderne-villa-witte-gevels-architect-gelijkvloers-wonen-aan-het-water-wijdemeren-luxury-living.webp",
      title: "VAN SCHETS TOT VERGUNNING",
      subtitle: "Ontwerpen die het karakter van de Plassen versterken"
    },
    {
      url: "/images/loosdrecht/moderne-stacaravan-recreatiewoning-eigentijds-architect-houten-schermen-loosdrecht.webp",
      title: "VAKMANSCHAP AAN HET WATER",
      subtitle: "Uw droomhuis in gemeente Wijdemeren of Hilversum"
    }
  ],

  // Region-specific FAQs for SEO
  faqs: [
    {
      tag: "VERGUNNING",
      q: "Wanneer heb je een omgevingsvergunning nodig in Loosdrecht?",
      a: "Vrijwel elke structurele wijziging, uitbouw of nieuwbouw aan de Loosdrechtse Plassen is vergunningsplichtig. Vanwege de vigerende bestemmingsplannen en de status van Wijdemeren als waterrijk gebied, adviseren wij altijd een officieel vooroverleg ('Verken uw idee') bij de gemeente te starten. Wij begeleiden dit traject van de eerste schets tot de definitieve aanvraag.",
      color: "amber"
    },
    {
      tag: "WELSTAND",
      q: "Hoe streng is de welstand bij bouwprojecten in Wijdemeren?",
      a: "De welstandseisen in Loosdrecht zijn specifiek gericht op het behoud van het open karakter en de landschappelijke inpassing. In gebieden zoals Nieuw-Loosdrecht of de dijken gelden strenge regels voor dakvormen en materiaalgebruik (zoals riet of hout). Door onze ruime ervaring met de commissie ruimtelijke kwaliteit van Wijdemeren, weten we ontwerpen te maken die zowel modern zijn als vlot door de welstandstoets komen.",
      color: "stone"
    },
    {
      tag: "KOSTEN",
      q: "Wat kost een architect voor een villa in Loosdrecht?",
      a: "Ons honorarium is variabel en afhankelijk van de complexiteit van het ontwerp en de gewenste mate van bouwbegeleiding. Voor een luxe nieuwbouwvilla of ingrijpende verbouwing aan het water werken we vaak met een vast percentage of een honorarium per fase. Een eerste quickscan voor uw kavel bieden wij kosteloos aan om de haalbaarheid te toetsen.",
      color: "emerald"
    },
    {
      tag: "BESTEMMINGSPLAN",
      q: "Kan ik afwijken van het omgevingsplan in Loosdrecht?",
      a: "Ja, in veel gevallen zijn er afwijkingsmogelijkheden via een uitgebreide procedure of de zogenaamde 'kruimelgevallenregeling'. Dit biedt vaak kansen voor een grotere aanbouw of een hogere gootlijn dan het basisplan toestaat. Wij analyseren de juridische ruimte om de maximale potentie uit uw kavel aan de Plassen te halen.",
      color: "blue"
    }
  ],

  // Region-specific testimonials for SEO
  testimonials: [
    {
      name: "Dhr. van der Meer",
      location: "Loosdrechtse Plassen",
      quote: "Jules heeft voor onze kavel aan de plas een ontwerp gemaakt dat binnen de scherpe regels van Wijdemeren toch maximale transparantie en ruimte biedt. De verbinding met het water is precies wat we zochten.",
      role: "Nieuwbouw Villa aan het water",
      image: "/images/loosdrecht/recreatiewoning-nieuwbouw-loosdrecht-architect-moderne-recreatie-woning.webp"
    }
  ],

  regio: {
    name: "Loosdrecht",
    municipality: "Wijdemeren",
    province: "Noord-Holland",
    geo: {
      region: "NL-NH",
      position: "52.2167;5.1000",
      coordinates: {
        latitude: 52.2167,
        longitude: 5.1000
      }
    },

    // Intro sectie - H1 + intro tekst direct onder hero
    intro: {
      h1: "Architect Loosdrecht",
      paragraph: "U zoekt een architect in Loosdrecht voor een exclusieve verbouwing, aanbouw of nieuwbouwvilla aan de Loosdrechtse Plassen. Vanuit mijn passie voor water en architectuur help ik u bij het realiseren van een woning die het maximale haalt uit deze unieke locatie. Of het nu gaat om een modern paviljoen in Nieuw-Loosdrecht of een rietkapvilla in Breukeleveen, wij begeleiden het volledige proces bij gemeente Wijdemeren."
    },

    // Footer intro - H2 + contacttekst in de footer
    footerIntro: {
      h2: "Uw droomhuis in Loosdrecht realiseren?",
      paragraph: "Neem contact op voor een vrijblijvende kennismaking op uw locatie aan de Plassen. Samen verkennen we de mogelijkheden voor uw kavel of bestaande woning in Loosdrecht en omgeving."
    },

    collageImages: [
      {
        url: "/images/loosdrecht/luxe-villa-architect-loosdrecht-moderne-woning-zwembad-luxury-living-architekt-wijdemeren.webp",
        alt: "Luxe villa architect Loosdrecht, moderne woning met zwembad aan het water"
      },
      {
        url: "/images/loosdrecht/rieten-kap-villa-loosdrecht-wijdemeren-architect-moderne-woning-kavel-architekt.webp",
        alt: "Moderne rietkapvilla Loosdrecht, ontwerp architect Wijdemeren op eigen kavel"
      },
      {
        url: "/images/loosdrecht/moderne-villa-witte-gevels-architect-gelijkvloers-wonen-aan-het-water-wijdemeren-luxury-living.webp",
        alt: "Gelijkvloers wonen aan het water Loosdrecht, architectuur overzicht"
      },
      {
        url: "/images/loosdrecht/recreatiewoning-nieuwbouw-loosdrecht-architect-moderne-recreatie-woning.webp",
        alt: "Architect recreatiewoning Loosdrecht, modern ontwerp aan de Plassen"
      },
      {
        url: "/images/loosdrecht/moderne-stacaravan-recreatiewoning-eigentijds-architect-houten-schermen-loosdrecht.webp",
        alt: "Moderne recreatiewoning Loosdrecht met houten gevelbekleding"
      },
      {
        url: "/images/loosdrecht/modern interieur gebogen villa luxe architect loosdrecht villa vrijstaand bouwen bouwgrond.webp",
        alt: "Luxe interieur villa Loosdrecht, interieurarchitectuur Jules Zwijsen"
      }
    ],

    municipalLinks: [
      {
        title: "Omgevingsloket Loosdrecht",
        url: "https://omgevingswet.overheid.nl/regels-op-de-kaart/zoeken/locatie",
        description: "Controleer de bouwmogelijkheden op uw kavel in Loosdrecht via de officiële kanalen."
      },
      {
        title: "Welstandseisen Wijdemeren",
        url: "https://www.wijdemeren.nl/nl/beleidsnota-s/Welstandsnota-2013-2MB.pdf",
        description: "Inzicht in aan welke architectonische eisen uw bouwplan moet voldoen in Loosdrecht."
      },
      {
        title: "Leges Vergunning Wijdemeren",
        url: "https://lokaleregelgeving.overheid.nl/CVDR733879/1",
        description: "Wat zijn de gemeentelijke kosten voor een bouwaavraag in Loosdrecht?"
      },
      {
        title: "Vooroverleg Gemeente",
        url: "https://www.wijdemeren.nl/verkenuwidee",
        description: "Uw bouwplannen vooraf toetsen bij de gemeente Wijdemeren."
      }
    ],
    expertise: {
      h2: "Expertise als architect in Loosdrecht",
      paragraph: "Architect Jules Zwijsen combineert moderne architectuur met de specifieke landschappelijke kwaliteiten van de Loosdrechtse Plassen. Wij zijn gespecialiseerd in projecten waarbij de relatie tussen binnen en buiten cruciaal is.",
      h3: "Bouwen aan de Loosdrechtse Plassen",
      h3_paragraph: "De Plassen vragen om een architect die de regels van Wijdemeren kent maar ook durft te ontwerpen met visie. Onze ontwerpen kenmerken zich door grote glaspartijen, natuurlijke materialen en een vlekkeloze integratie in de omgeving. Bekijk ook onze projecten zoals de recreatiewoning in Loosdrecht voor inspiratie.",
      services: [
        "Nieuwbouw van villa's en landhuizen in Loosdrecht",
        "Verbouw en modernisering van woningen aan de Plassen",
        "Begeleiding vergunningen bij gemeente Wijdemeren en Hilversum",
        "Interieurontwerp en lichtplannen op maat",
        "Quickscan voor kavels en bestaande bouw"
      ]
    }
  }
};

