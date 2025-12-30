import type { RegioConfig } from '../types';
import { PROJECTS_DETAIL } from '../projecten';

// Converteer relevante projecten naar Project format voor de portfolio grid
const stichtseVechtProjects = PROJECTS_DETAIL
  .filter(p =>
    p.slug === 'architect-loenen-aan-de-vecht-torenwoning-cronenburgh' ||
    p.slug === 'architect-loenen-aan-de-vecht-verbouw-villa-kickestein' ||
    p.slug === 'architect-loenen-aan-de-vecht-moderne-recreatiewoning-vecht' ||
    p.slug === 'architect-poortwoning-cronenburgh-loenen-aan-de-vecht' ||
    p.slug === 'architect-loenen-aan-de-vecht-hofwoning-cronenburgh'
  )
  .map((p, index) => {
    const sizes = ['wide', 'portrait', 'landscape', 'square'] as const;
    const size = sizes[index % 4];

    return {
      id: 700 + index,
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

export const stichtseVechtConfig: Partial<RegioConfig> = {
  seoTitle: "Architect Stichtse Vecht | Loenen aan de Vecht, Breukelen, Maarssen, Nieuwersluis, Nigtevecht | Architectenbureau Jules Zwijsen",
  metaDescription: "Architect in Stichtse Vecht voor nieuwbouw, verbouw en monumentenzorg. Werkzaam in Loenen aan de Vecht, Breukelen, Maarssen, Nieuwersluis, Nigtevecht, Kockengen, Portengen, Tienhoven en Vreeland. Jules Zwijsen ontwerpt woningen met oog voor het karakteristieke karakter van de Vechtstreek.",

  projects: stichtseVechtProjects,

  heroSlides: [
    {
      url: "/images/stichtsevecht/nieuwbouw-landhuis-architekt-maarssen-stichtsevecht-luxe-villabouw-kavel-vervangende-nieuwbouw-ontwerp.webp",
      title: "ARCHITECT IN STICHTSE VECHT",
      subtitle: "Nieuwbouw, verbouw en monumentenzorg in de Vechtstreek"
    },
    {
      url: "/images/stichtsevecht/moderne-villa-vechtstreek-architect-stichtsevecht-luxe-villa-modern.webp",
      title: "VAN EERSTE SCHETS TOT OPLEVERING",
      subtitle: "Ontwerpen met respect voor het karakter van Stichtse Vecht"
    },
    {
      url: "/images/stichtsevecht/verduurzamen-woning-maarssen-rieten-kap-architectenbureau-luxe-verbouw-villa.webp",
      title: "VAKMANSCHAP EN AANDACHT",
      subtitle: "Begeleiding bij vergunningen en contact met gemeente Stichtse Vecht"
    }
  ],

  regio: {
    name: "Stichtse Vecht",

    intro: {
      h1: "Architect in Stichtse Vecht",
      paragraph: "U zoekt een architect in Stichtse Vecht voor een verbouwing, aanbouw of nieuwbouwwoning. Vanuit mijn basis in Loenen aan de Vecht werk ik al jaren met veel plezier samen met opdrachtgevers in de hele gemeente - van Loenen aan de Vecht, Breukelen en Maarssen tot Nieuwersluis, Nigtevecht, Kockengen, Portengen, Tienhoven en Vreeland. Het doel is een ontwerp dat uw wensen en levensritme vertaalt naar een thuis waar u zich volledig kunt ontplooien. Door kennis van bestemmingsplannen en ervaring met afwijkingsprocedures ontstaat vaak meer ruimte voor maatwerk dan u op het eerste gezicht zou verwachten."
    },

    footerIntro: {
      h2: "Architect in Stichtse Vecht nodig?",
      paragraph: "Denkt u na over een verbouwing, aanbouw of nieuwbouwwoning in Stichtse Vecht en wilt u daar met een architect over sparren? Neem contact op met Jules Zwijsen voor een vrijblijvend gesprek. Tijdens een afspraak op uw locatie wordt samen bekeken welke mogelijkheden er zijn voor uw woning en locatie in Loenen aan de Vecht, Breukelen, Maarssen, Nieuwersluis, Nigtevecht of een van de andere dorpen in de gemeente Stichtse Vecht."
    },

    collageImages: [
      {
        url: "/images/stichtsevecht/nieuwbouw-landhuis-architekt-maarssen-stichtsevecht-luxe-villabouw-kavel-vervangende-nieuwbouw-ontwerp.webp",
        alt: "Nieuwbouw landhuis in Stichtse Vecht, luxe villabouw op kavel door architect"
      },
      {
        url: "/images/stichtsevecht/moderne-villa-vechtstreek-architect-stichtsevecht-luxe-villa-modern.webp",
        alt: "Moderne villa in de Vechtstreek Stichtse Vecht, luxe ontwerp architect"
      },
      {
        url: "/images/stichtsevecht/verduurzamen-woning-maarssen-rieten-kap-architectenbureau-luxe-verbouw-villa.webp",
        alt: "Verduurzaming woning met rieten kap in Stichtse Vecht, luxe verbouw door architectenbureau"
      },
      {
        url: "/images/stichtsevecht/koetshuis-bij-monument-vechtstreek-nieuwbouw-klassiek-bijgebouw-maarssen.webp",
        alt: "Nieuwbouw klassiek koetshuis bij monument in Stichtse Vecht Vechtstreek"
      },
      {
        url: "/images/stichtsevecht/ontwerp-nieuwbouwwoning-modern-architect-maarssen-desgin-luxury-residence.webp",
        alt: "Ontwerp moderne nieuwbouwwoning in Stichtse Vecht, luxury residence architect"
      },
      {
        url: "/images/stichtsevecht/inrerieur-nieuwbouwwoning-modern-architect-maarssen-desgin-luxury-residence-interior-design.webp",
        alt: "Modern interieur nieuwbouwwoning in Stichtse Vecht, luxury residence interior design"
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
        description: "Specifieke regels voor monumentale panden in de Vechtstreek."
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
      h2: "Wat doet een architect in Stichtse Vecht?",
      paragraph: "Als architect in Stichtse Vecht ontwerpt Jules Zwijsen woningen met oog voor de rijke geschiedenis langs de Vecht. Van karakteristieke verbouwingen van historische panden in Loenen aan de Vecht, Breukelen en Maarssen tot hedendaagse nieuwbouw in Nieuwersluis, Nigtevecht, Kockengen, Portengen, Tienhoven en Vreeland - elk ontwerp respecteert het karakter van de Vechtstreek, met aandacht voor welstand en monumentenzorg waar nodig.",
      h3: "Architectonisch ontwerp in de Vechtstreek",
      h3_paragraph: "De gemeente Stichtse Vecht kent een bijzonder karakter door de ligging aan de Vecht en de vele monumentale panden. Van de historische bebouwing in Loenen aan de Vecht en Breukelen tot de landelijke dorpen Kockengen, Portengen en Tienhoven - elk dorp heeft zijn eigen identiteit. Bij elk ontwerp wordt rekening gehouden met de historische context, het straatbeeld en de landschappelijke kwaliteiten. Door jarenlange ervaring met de welstandscommissie en monumentencommissie weet Jules Zwijsen precies hoe u uw project succesvol door de procedures leidt. Via binnenplanse afwijkingen of een omgevingsvergunning in afwijking van het bestemmingsplan ontstaat vaak meer ruimte voor uw wensen dan het bestemmingsplan in eerste instantie laat zien - maatwerk dat past bij uw situatie en de Vechtstreek.",
      services: [
        "Ontwerp van nieuwbouwwoningen in Stichtse Vecht: Loenen aan de Vecht, Breukelen, Maarssen, Nieuwersluis, Nigtevecht, Kockengen, Portengen, Tienhoven en Vreeland",
        "Verbouw en renovatie van (monumentale) woningen aan de Vecht",
        "Aanbouw, uitbreiding en verduurzaming van bestaande woningen",
        "Begeleiding bij vergunningsaanvragen gemeente Stichtse Vecht",
        "Advies bij monumentale panden en welstandstoetsing"
      ]
    }
  }
};
