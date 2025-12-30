import type { RegioConfig } from '../types';
import { PROJECTS_DETAIL } from '../projecten';

// Converteer relevante projecten naar Project format voor de portfolio grid
const breukelenProjects = PROJECTS_DETAIL
  .filter(p =>
    p.slug === 'moderne-villa-gebogen-gevel-gooi-en-vechtstreek' ||
    p.slug === 'herbestemming-boerderij-laag-keppel-achterhoek' ||
    p.slug === 'moderne-rietkapvilla-het-gooi' ||
    p.slug === 'architect-loenen-aan-de-vecht-moderne-recreatiewoning-vecht'
  )
  .map((p, index) => {
    const sizes = ['wide', 'portrait', 'landscape', 'square'] as const;
    const size = sizes[index % 4];

    return {
      id: 300 + index, // Unieke IDs voor deze projecten
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

export const breukelenConfig: Partial<RegioConfig> = {
  seoTitle: "Architect Breukelen | Nieuwbouw en Verbouw Architectenbureau Jules Zwijsen",
  metaDescription: "Architect in Breukelen voor nieuwbouw, verbouw en monumentenzorg aan de Vecht. Jules Zwijsen ontwerpt woningen met oog voor het karakteristieke karakter van de Vechtstreek.",

  // Projecten voor Breukelen - eerste 4 worden getoond in QuickProjectsGrid
  projects: breukelenProjects,

  // Hero slides voor Breukelen
  heroSlides: [
    {
      url: "/images/breukelen/verbouw-villa-aan-de-vecht-breukelen-moderne-woning-aanbouw-architect.webp",
      title: "ARCHITECT IN BREUKELEN",
      subtitle: "Nieuwbouw, verbouw en monumentenzorg aan de Vecht"
    },
    {
      url: "/images/breukelen/moderne-uitbreiding-monumentale-woning-vechtstreek-breukelen-architekt.webp",
      title: "VAN EERSTE SCHETS TOT OPLEVERING",
      subtitle: "Ontwerpen met respect voor het karakter van de Vechtstreek"
    },
    {
      url: "/images/breukelen/metamorfose-oude-woning-breukelen-zandpad-architect-luxe-villa.webp",
      title: "VAKMANSCHAP EN AANDACHT",
      subtitle: "Begeleiding bij vergunningen en contact met gemeente Stichtse Vecht"
    }
  ],

  regio: {
    name: "Breukelen",

    // Intro sectie - H1 + intro tekst direct onder hero
    intro: {
      h1: "Architect in Breukelen",
      paragraph: "U zoekt een architect in Breukelen voor een verbouwing, aanbouw of nieuwbouwwoning in de stad of aan de Vecht. Vanuit mijn basis in Loenen aan de Vecht werk ik met regelmaat in Breukelen en omgeving. Het doel is een ontwerp dat uw wensen en uw manier van leven vertaalt naar een woning waar u iedere dag met plezier thuiskomt. Met kennis van de regels en afwijkingsmogelijkheden van het bestemmingsplan ontstaan ontwerpen die respectvol zijn voor de historische context van Breukelen en tegelijk volop hedendaags wooncomfort bieden."
    },

    // Footer intro - H2 + contacttekst in de footer
    footerIntro: {
      h2: "Architect in Breukelen nodig?",
      paragraph: "Denkt u na over een verbouwing, aanbouw of nieuwbouwwoning in Breukelen en wilt u daar met een architect over sparren? Neem contact op met Jules Zwijsen voor een vrijblijvend gesprek. Tijdens een afspraak op uw locatie wordt samen bekeken welke mogelijkheden er zijn voor uw woning en locatie in Breukelen en omgeving. Dankzij de uitgebreide kennis over de geldende bestemmingsplannen en mogelijkheden tot afwijkingen kunnen we samen tot uw perfecte nieuwe thuis komen."
    },

    collageImages: [
      {
        url: "/images/breukelen/verbouw-villa-aan-de-vecht-breukelen-moderne-woning-aanbouw-architect.webp",
        alt: "Verbouw villa aan de Vecht in Breukelen met moderne aanbouw, ontwerp architect Jules Zwijsen"
      },
      {
        url: "/images/breukelen/moderne-uitbreiding-monumentale-woning-vechtstreek-breukelen-architekt.webp",
        alt: "Moderne uitbreiding van monumentale woning in de Vechtstreek Breukelen door architect"
      },
      {
        url: "/images/breukelen/metamorfose-oude-woning-breukelen-zandpad-architect-luxe-villa.webp",
        alt: "Metamorfose oude woning Breukelen Zandpad tot luxe villa door architect"
      },
      {
        url: "/images/breukelen/glazen-uitbouw-eetkamer-aan-de-vecht-straatweg-breukelen-verbouw-woning.webp",
        alt: "Glazen uitbouw eetkamer aan de Vecht Straatweg Breukelen, verbouw woning"
      },
      {
        url: "/images/breukelen/modern-interieur-verbouw-huis-aan-de-vecht-breukelen-architektenburo.webp",
        alt: "Modern interieur verbouw huis aan de Vecht in Breukelen door architectenbureau"
      },
      {
        url: "/images/breukelen/koetshuis-bij-monument-vechtstreek-nieuwbouw-klassiek-bijgebouw-maarssen.webp",
        alt: "Nieuwbouw klassiek koetshuis bij monument in de Vechtstreek nabij Breukelen"
      }
    ],

    municipalLinks: [
      {
        title: "Bestemmingsplan / Omgevingsplan",
        url: "https://omgevingswet.overheid.nl/regels-op-de-kaart/zoeken/locatie",
        description: "Controleer wat er mag op uw locatie volgens het gemeentelijke bestemmingsplan."
      },
      {
        title: "Welstandsnota Stichtse Vecht",
        url: "https://raadsinformatie.stichtsevecht.nl/Vergaderingen/Commissie-Fysiek-Domein/2024/26-november/19:30/Reclamemast-De-Corridor-25/Bijlage-6-Welstandsnota-Stichtse-Vecht-2013.pdf",
        description: "Inzicht in welstandscriteria en architectonische eisen voor uw bouwplan."
      },
      {
        title: "Leges en tarieven omgevingsvergunning",
        url: "https://lokaleregelgeving.overheid.nl/CVDR732544",
        description: "Overzicht van gemeentelijke kosten voor vergunningaanvragen."
      },
      {
        title: "Monumentenbeleid Stichtse Vecht",
        url: "https://www.monumenten.nl/gemeentes/stichtse-vecht",
        description: "Specifieke regels voor monumentale panden in Breukelen en de Vechtstreek."
      },
      {
        title: "Vooroverleg gemeente Stichtse Vecht",
        url: "https://www.stichtsevecht.nl/wonen-en-leefomgeving/bouwen-verbouwen-en-slopen",
        description: "Neem vooraf contact op met de gemeente voor advies over uw plannen."
      },
      {
        title: "Archief bouwtekeningen",
        url: "https://www.stichtsevecht.nl/wonen-en-leefomgeving/bouwen-verbouwen-en-slopen/bouwdossier-bekijken",
        description: "Bekijk in het archief of er tekeningen van de bestaande woning beschikbaar zijn."
      }
    ],

    expertise: {
      h2: "Wat doet een architect in Breukelen?",
      paragraph: "Als architect in Breukelen en omgeving ontwerpt Jules Zwijsen woningen met oog voor de rijke geschiedenis langs de Vecht. Van karakteristieke verbouwingen van historische panden tot hedendaagse nieuwbouw die past in de omgeving - elk ontwerp respecteert het karakter van Breukelen en de Vechtstreek, met aandacht voor welstand en monumentenzorg waar nodig.",
      h3: "Architectonisch ontwerp aan de Vecht",
      h3_paragraph: "Breukelen kent een bijzonder karakter door de ligging aan de Vecht en de vele monumentale panden. Bij elk ontwerp wordt rekening gehouden met de historische context, het straatbeeld en de landschappelijke kwaliteiten van de Vechtstreek. Door jarenlange ervaring met de welstandscommissie en monumentencommissie van gemeente Stichtse Vecht weet Jules Zwijsen precies hoe u uw project succesvol tot realisatie brengt.",
      services: [
        "Ontwerp van nieuwbouwwoningen in Breukelen en omgeving",
        "Verbouw en renovatie van (monumentale) woningen aan de Vecht",
        "Aanbouw, uitbreiding en verduurzaming van bestaande woningen",
        "Begeleiding bij vergunningsaanvragen gemeente Stichtse Vecht",
        "Advies bij monumentale panden en welstandstoetsing"
      ]
    }
  }
};
