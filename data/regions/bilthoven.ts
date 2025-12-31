import type { RegioConfig } from '../types';
import { PROJECTS_DETAIL } from '../projecten';

// Converteer relevante projecten naar Project format voor de portfolio grid
const bilthovenProjects = PROJECTS_DETAIL
  .filter(p =>
    p.slug === 'moderne-rietkapvilla-het-gooi' ||
    p.slug === 'moderne-villa-rieten-kap-blaricum' ||
    p.slug === 'moderne-villa-gebogen-gevel-gooi-en-vechtstreek' ||
    p.slug === 'herbestemming-boerderij-laag-keppel-achterhoek'
  )
  .map((p, index) => {
    const sizes = ['wide', 'portrait', 'landscape', 'square'] as const;
    const size = sizes[index % 4];

    return {
      id: 500 + index,
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

export const bilthovenConfig: Partial<RegioConfig> = {
  seoTitle: "Architect Bilthoven | Villabouw op de Heuvelrug | Jules Zwijsen",
  metaDescription: "Architect in Bilthoven voor exclusieve nieuwbouw villa's en landhuizen. Jules Zwijsen ontwerpt met oog voor de bosrijke omgeving van the Utrechtse Heuvelrug.",
  canonicalUrl: "https://www.zwijsen.net/bilthoven",

  breadcrumbs: [
    { label: "Bilthoven", href: "/bilthoven" }
  ],

  // Region-specific FAQs for SEO
  faqs: [
    {
      tag: "BOS",
      q: "Wat zijn de belangrijkste regels voor bouwen in Bilthoven Noord?",
      a: "In Bilthoven Noord en de omliggende bosgebieden gelden strenge regels voor het bebouwingspercentage en het kappen van bomen. Wij zijn meesters in het ontwerpen van woningen die de omringende natuur omarmen, waarbij we binnen de kaders van de gemeente De Bilt het maximale uit uw kavel halen.",
      color: "emerald"
    },
    {
      tag: "WELSTAND",
      q: "Hoe kijkt de gemeente De Bilt naar moderne architectuur?",
      a: "De gemeente De Bilt waardeert hoogwaardige architectuur die past bij het karakter van de Utrechtse Heuvelrug. Wij maken gebruik van natuurlijke materialen zoals hout, natuursteen en grote glasoppervlakken om een ontwerp te creëren dat tijdloos is en de goedkeuring van de welstand draagt.",
      color: "amber"
    },
    {
      tag: "DUURZAAM",
      q: "Is het verduurzamen van een bestaande villa in Bilthoven rendabel?",
      a: "Zeker. Veel oudere villa's in Bilthoven hebben een prachtig karakter maar een slecht energielabel. Wij combineren architectonische verfraaiing (bijv. een nieuwe gevel of uitbouw) met hoogwaardige isolatie en installatietechnieken, waardoor uw woning klaar is voor de toekomst.",
      color: "blue"
    },
    {
      tag: "KOSTEN",
      q: "Begeleiden jullie ook de bouw van een villa in Bilthoven?",
      a: "Wij gaan verder dan alleen het ontwerp. Van de bestemmingsplan-check tot de selectie van de aannemer en de esthetische begeleiding tijdens de bouw: wij zorgen ervoor dat het resultaat exact wordt zoals we het samen bedacht hebben.",
      color: "stone"
    }
  ],

  projects: bilthovenProjects,

  heroSlides: [
    {
      url: "/images/bilthoven/luxury-living-architect-residence-bilthoven-new-villa-kavel.webp",
      title: "ARCHITECT IN BILTHOVEN",
      subtitle: "Villa's met oog voor de groene omgeving van de Utrechtse Heuvelrug"
    },
    {
      url: "/images/bilthoven/landhuis-bilthoven-nieuwe-rieten-kap-villa-architect-bilthoven-kavel-bouwgrond.webp",
      title: "VAN EERSTE SCHETS TOT OPLEVERING",
      subtitle: "Ontwerpen die passen bij het karakteristieke karakter van Bilthoven"
    },
    {
      url: "/images/bilthoven/bilthoven-aanbouw-oude-woning-architect-verbouw-woning-verduurzaming-moderne-lichte-aanbouw.webp",
      title: "VAKMANSCHAP EN AANDACHT",
      subtitle: "Begeleiding bij vergunningen en contact met gemeente De Bilt"
    }
  ],

  regio: {
    name: "Bilthoven",

    intro: {
      h1: "Architect in Bilthoven",
      paragraph: "U zoekt een architect in Bilthoven voor een verbouwing, aanbouw of nieuwbouwwoning op de Utrechtse Heuvelrug. Vanuit mijn basis in Loenen aan de Vecht werk ik met regelmaat in Bilthoven en omgeving. Het doel is een ontwerp waar u zich thuis voelt - een plek die aansluit bij hoe u wilt leven en waar u zich optimaal kunt ontplooien. Door kennis van regelgeving en ervaring met afwijkingsprocedures wordt vaak meer bereikt dan het bestemmingsplan in eerste instantie suggereert."
    },

    footerIntro: {
      h2: "Architect in Bilthoven nodig?",
      paragraph: "Denkt u na over een verbouwing, aanbouw of nieuwbouwwoning in Bilthoven en wilt u daar met een architect over sparren? Neem contact op met Jules Zwijsen voor een vrijblijvend gesprek. Tijdens een afspraak op uw locatie wordt samen bekeken welke mogelijkheden er zijn voor uw woning en locatie in Bilthoven en omgeving."
    },

    collageImages: [
      {
        url: "/images/bilthoven/luxury-living-architect-residence-bilthoven-new-villa-kavel.webp",
        alt: "Luxe nieuwbouw villa op kavel in Bilthoven, ontwerp architect Jules Zwijsen"
      },
      {
        url: "/images/bilthoven/landhuis-bilthoven-nieuwe-rieten-kap-villa-architect-bilthoven-kavel-bouwgrond.webp",
        alt: "Nieuw landhuis met rieten kap in Bilthoven op bouwgrond, architect ontwerp"
      },
      {
        url: "/images/bilthoven/architekt moderne villa in het bos luxe bosvilla architect glazen paviljoen bilthoven architektenburo.webp",
        alt: "Moderne bosvilla met glazen paviljoen in Bilthoven door architectenbureau"
      },
      {
        url: "/images/bilthoven/bilthoven-aanbouw-oude-woning-architect-verbouw-woning-verduurzaming-moderne-lichte-aanbouw.webp",
        alt: "Moderne lichte aanbouw oude woning in Bilthoven, verbouw en verduurzaming door architect"
      },
      {
        url: "/images/bilthoven/moderne-uitbouw-renovatie-woning-bilthoven-verduurzaming-architect.webp",
        alt: "Moderne uitbouw en renovatie woning in Bilthoven, verduurzaming door architect"
      },
      {
        url: "/images/bilthoven/villa-entree-brede-houten-deur-betonvilla-bilthoven-bouwgrond-architect-luxe nieuwbouw.webp",
        alt: "Villa entree met brede houten deur in Bilthoven, luxe nieuwbouw architect"
      }
    ],

    municipalLinks: [
      {
        title: "Bestemmingsplan / Omgevingsplan",
        url: "https://omgevingswet.overheid.nl/regels-op-de-kaart/zoeken/locatie",
        description: "Controleer wat er mag op uw locatie volgens het gemeentelijke bestemmingsplan."
      },
      {
        title: "Welstandsnota De Bilt",
        url: "https://www.debilt.nl/",
        description: "Inzicht in welstandscriteria en architectonische eisen voor uw bouwplan."
      },
      {
        title: "Leges en tarieven omgevingsvergunning",
        url: "https://www.debilt.nl/",
        description: "Overzicht van gemeentelijke kosten voor vergunningaanvragen."
      },
      {
        title: "Vooroverleg gemeente De Bilt",
        url: "https://www.debilt.nl/bouwen-verbouwen",
        description: "Neem vooraf contact op met de gemeente voor advies over uw plannen."
      }
    ],

    expertise: {
      h2: "Wat doet een architect in Bilthoven?",
      paragraph: "Als architect in Bilthoven ontwerpt Jules Zwijsen villa's en landhuizen met oog voor de groene, bosrijke omgeving van de Utrechtse Heuvelrug. Van nieuwbouw villa's tot zorgvuldige uitbreidingen en verduurzaming van bestaande woningen - elk ontwerp past bij het karakteristieke villakarakter van Bilthoven.",
      h3: "Architectonisch ontwerp op de Utrechtse Heuvelrug",
      h3_paragraph: "Bilthoven kent een bijzonder karakter door de ligging op de Utrechtse Heuvelrug en de vele villa's in groene, bosrijke omgeving. Bij elk ontwerp wordt rekening gehouden met de landschappelijke inpassing en de welstandscriteria. Door jarenlange ervaring met de welstandscommissie van gemeente De Bilt weet Jules Zwijsen precies hoe u uw project succesvol door de procedures leidt en tot realisatie brengt.",
      services: [
        "Ontwerp van nieuwbouw villa's in Bilthoven en omgeving",
        "Verbouw en uitbreiding van woningen in bosrijke omgeving",
        "Aanbouw en verduurzaming van bestaande woningen",
        "Begeleiding bij vergunningsaanvragen gemeente De Bilt",
        "Advies bij landschappelijke inpassing en welstandstoetsing"
      ]
    }
  }
};
