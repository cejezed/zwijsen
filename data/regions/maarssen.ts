import type { RegioConfig } from '../types';
import { PROJECTS_DETAIL } from '../projecten';

// Converteer relevante projecten naar Project format voor de portfolio grid
const maarssenProjects = PROJECTS_DETAIL
  .filter(p =>
    p.slug === 'architect-loenen-aan-de-vecht-moderne-recreatiewoning-vecht' ||
    p.slug === 'moderne-villa-gebogen-gevel-gooi-en-vechtstreek' ||
    p.slug === 'architect-loenen-aan-de-vecht-verbouw-villa-kickestein' ||
    p.slug === 'herbestemming-boerderij-laag-keppel-achterhoek'
  )
  .map((p, index) => {
    const sizes = ['wide', 'portrait', 'landscape', 'square'] as const;
    const size = sizes[index % 4];

    return {
      id: 600 + index,
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

export const maarssenConfig: Partial<RegioConfig> = {
  seoTitle: "Architect Maarssen | Nieuwbouw en Verbouw Architectenbureau Jules Zwijsen",
  metaDescription: "Architect in Maarssen voor nieuwbouw, verbouw en monumentenzorg aan de Vecht. Jules Zwijsen ontwerpt woningen met oog voor het karakteristieke karakter van de Vechtstreek.",

  projects: maarssenProjects,

  heroSlides: [
    {
      url: "/images/maarssen/nieuwbouw-landhuis-architekt-maarssen-stichtsevecht-luxe-villabouw-kavel-vervangende-nieuwbouw-ontwerp.webp",
      title: "ARCHITECT IN MAARSSEN",
      subtitle: "Nieuwbouw, verbouw en monumentenzorg aan de Vecht"
    },
    {
      url: "/images/maarssen/moderne-villa-vechtstreek-architect-stichtsevecht-luxe-villa-modern.webp",
      title: "VAN EERSTE SCHETS TOT OPLEVERING",
      subtitle: "Ontwerpen met respect voor het karakter van de Vechtstreek"
    },
    {
      url: "/images/maarssen/verduurzamen-woning-maarssen-rieten-kap-architectenbureau-luxe-verbouw-villa.webp",
      title: "VAKMANSCHAP EN AANDACHT",
      subtitle: "Begeleiding bij vergunningen en contact met gemeente Stichtse Vecht"
    }
  ],

  regio: {
    name: "Maarssen",

    intro: {
      h1: "Architect in Maarssen",
      paragraph: "U zoekt een architect in Maarssen voor een verbouwing, aanbouw of nieuwbouwwoning aan de Vecht. Vanuit mijn basis in Loenen aan de Vecht werk ik met regelmaat in Maarssen en omgeving. Het uitgangspunt is uw verhaal - uw wensen, uw levensritme en hoe u wilt wonen. Met kennis van bestemmingsplanregels en de mogelijkheden om hiervan af te wijken ontstaat ruimte voor maatwerk dat past bij de Vechtstreek én bij wat u voor ogen heeft voor uw thuis."
    },

    footerIntro: {
      h2: "Architect in Maarssen nodig?",
      paragraph: "Denkt u na over een verbouwing, aanbouw of nieuwbouwwoning in Maarssen aan de Vecht en wilt u daar met een architect over sparren? Neem contact op met Jules Zwijsen voor een vrijblijvend gesprek. Tijdens een afspraak op uw locatie wordt samen bekeken welke mogelijkheden er zijn voor uw woning en locatie in Maarssen en de Vechtstreek."
    },

    collageImages: [
      {
        url: "/images/maarssen/nieuwbouw-landhuis-architekt-maarssen-stichtsevecht-luxe-villabouw-kavel-vervangende-nieuwbouw-ontwerp.webp",
        alt: "Nieuwbouw landhuis in Maarssen, luxe villabouw op kavel door architect"
      },
      {
        url: "/images/maarssen/moderne-villa-vechtstreek-architect-stichtsevecht-luxe-villa-modern.webp",
        alt: "Moderne villa in de Vechtstreek Maarssen, luxe ontwerp architect Stichtse Vecht"
      },
      {
        url: "/images/maarssen/verduurzamen-woning-maarssen-rieten-kap-architectenbureau-luxe-verbouw-villa.webp",
        alt: "Verduurzaming woning met rieten kap in Maarssen, luxe verbouw door architectenbureau"
      },
      {
        url: "/images/maarssen/koetshuis-bij-monument-vechtstreek-nieuwbouw-klassiek-bijgebouw-maarssen.webp",
        alt: "Nieuwbouw klassiek koetshuis bij monument in Maarssen Vechtstreek"
      },
      {
        url: "/images/maarssen/ontwerp-nieuwbouwwoning-modern-architect-maarssen-desgin-luxury-residence.webp",
        alt: "Ontwerp moderne nieuwbouwwoning in Maarssen, luxury residence architect"
      },
      {
        url: "/images/maarssen/inrerieur-nieuwbouwwoning-modern-architect-maarssen-desgin-luxury-residence-interior-design.webp",
        alt: "Modern interieur nieuwbouwwoning in Maarssen, luxury residence interior design"
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
        description: "Specifieke regels voor monumentale panden in Maarssen en de Vechtstreek."
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
      h2: "Wat doet een architect in Maarssen?",
      paragraph: "Als architect in Maarssen en omgeving ontwerpt Jules Zwijsen woningen met oog voor de rijke geschiedenis langs de Vecht. Van karakteristieke verbouwingen van historische panden tot hedendaagse nieuwbouw die past in de omgeving - elk ontwerp respecteert het karakter van Maarssen en de Vechtstreek, met aandacht voor welstand en monumentenzorg waar nodig.",
      h3: "Architectonisch ontwerp aan de Vecht",
      h3_paragraph: "Maarssen kent een bijzonder karakter door de ligging aan de Vecht en de vele karakteristieke panden. Bij elk ontwerp wordt rekening gehouden met de historische context, het straatbeeld en de landschappelijke kwaliteiten van de Vechtstreek. Door jarenlange ervaring met de welstandscommissie en monumentencommissie van gemeente Stichtse Vecht weet Jules Zwijsen precies hoe u uw project succesvol tot realisatie brengt.",
      services: [
        "Ontwerp van nieuwbouwwoningen in Maarssen en de Vechtstreek",
        "Verbouw en renovatie van (monumentale) woningen aan de Vecht",
        "Aanbouw, uitbreiding en verduurzaming van bestaande woningen",
        "Begeleiding bij vergunningsaanvragen gemeente Stichtse Vecht",
        "Advies bij monumentale panden en welstandstoetsing"
      ]
    }
  }
};
