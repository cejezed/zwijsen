import type { RegioConfig } from '../types';
import { PROJECTS_DETAIL } from '../projecten';

// Converteer relevante projecten naar Project format voor de portfolio grid
const maarssenProjects = PROJECTS_DETAIL
  .filter(p => p && (
    p.slug === 'architect-loenen-aan-de-vecht-moderne-recreatiewoning-vecht' ||
    p.slug === 'moderne-villa-gebogen-gevel-gooi-en-vechtstreek' ||
    p.slug === 'architect-loenen-aan-de-vecht-verbouw-villa-kickestein' ||
    p.slug === 'herbestemming-boerderij-laag-keppel-achterhoek'
  ))
  .map((p, index) => {
    const sizes = ['wide', 'portrait', 'landscape', 'square'] as const;
    const size = sizes[index % 4];

    const locationLabel = 'locationLabel' in p ? p.locationLabel : ('location' in p ? p.location : '');
    const featuredImage = 'featuredImage' in p ? p.featuredImage : undefined;
    const regularImage = 'image' in p ? p.image : undefined;
    const heroImages = 'heroImages' in p ? p.heroImages : [];
    const subtitle = 'subtitle' in p ? p.subtitle : ('description' in p ? p.description : '');
    const categories = 'categories' in p ? p.categories : undefined;

    return {
      id: 600 + index,
      title: p.title,
      location: locationLabel,
      slug: p.slug,
      image: featuredImage?.url || (typeof regularImage === 'string' ? regularImage : regularImage?.url) || '',
      size: size,
      year: 'N.N.B.',
      area: 'N.N.B.',
      tag: categories?.[0] === 'nieuwbouw' ? 'Nieuwbouw' : categories?.[0] === 'verbouw' ? 'Verbouw' : 'Project',
      subtitle: subtitle,
      description: subtitle,
      gallery: heroImages.map(img => img.url)
    };
  });

export const maarssenConfig: Partial<RegioConfig> = {
  seoTitle: "Architect Maarssen | Nieuwbouw & Verbouw langs de Vecht | Jules Zwijsen",
  metaDescription: "Architect in Maarssen voor exclusieve nieuwbouw en verbouw van (monumentale) woningen. Jules Zwijsen: de specialist voor bouwen langs de Vecht in Stichtse Vecht.",
  canonicalUrl: "https://www.zwijsen.net/maarssen",

  breadcrumbs: [
    { label: "Maarssen", href: "/maarssen" }
  ],

  // Region-specific FAQs for SEO
  faqs: [
    {
      tag: "LOCATIE",
      q: "Wat zijn de uitdagingen van bouwen langs de Vecht in Maarssen?",
      a: "Bouwen langs de Vecht vraagt om een zorgvuldige balans tussen modern comfort en historisch respect. De gemeente Stichtse Vecht hanteert strikte regels voor zichtlijnen vanaf de rivier en de weg. Wij kennen deze kaders en weten hoe we de unieke kwaliteiten van een diepe tuin aan het water maximaal kunnen benutten.",
      color: "emerald"
    },
    {
      tag: "MONUMENT",
      q: "Hoe ga je om met een herenhuis of buitenplaats in Maarssen-Dorp?",
      a: "Maarssen kent veel rijks- en gemeentelijke monumenten. Voor verbouw of restauratie is een specifieke expertise nodig op het gebied van historisch materiaalgebruik en verduurzaming. Wij begeleiden het volledige traject van het eerste monumentenoverleg tot de uiteindelijke vergunning.",
      color: "stone"
    },
    {
      tag: "VERGUNNING",
      q: "Hoe lang duurt een omgevingsvergunning traject in Stichtse Vecht?",
      a: "Voor reguliere nieuwbouw of verbouw staat de wettelijke termijn op 8 weken, maar bij monumenten of complexe afwijkingen van het omgevingsplan kan dit langer zijn. Door een goed vooroverleg met de gemeente Maarssen/Stichtse Vecht proberen we dit proces te versnellen.",
      color: "amber"
    },
    {
      tag: "KOSTEN",
      q: "Zijn jullie ook beschikbaar voor een uitbouw in Maarssenbroek?",
      a: "Zeker. Of het nu gaat om een klassiek herenhuis aan de Vecht of een moderne vergroting van een gezinswoning in Maarssenbroek, wij brengen dezelfde aandacht voor detail en kwaliteit mee naar elk project in de regio.",
      color: "blue"
    }
  ],

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
