import type { RegioConfig } from '../types';
import { PROJECTS_DETAIL } from '../projecten';

// Converteer relevante projecten naar Project format voor de portfolio grid
const vinkeveenProjects = PROJECTS_DETAIL
  .filter(p =>
    p.slug === 'moderne-villa-gebogen-gevel-gooi-en-vechtstreek' ||
    p.slug === 'modern-paviljoen-water-reeuwijk' ||
    p.slug === 'moderne-rietkapvilla-het-gooi' ||
    p.slug === 'moderne-villa-rieten-kap-blaricum'
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

export const vinkeveenConfig: Partial<RegioConfig> = {
  seoTitle: "Architect Vinkeveen | Bouwen aan de Plassen | Jules Zwijsen",
  metaDescription: "Architect in Vinkeveen voor villa's en waterwoningen aan de Vinkeveense Plassen. Jules Zwijsen: specialist in luxe nieuwbouw en verbouw in De Ronde Venen.",
  canonicalUrl: "https://www.zwijsen.net/vinkeveen",

  breadcrumbs: [
    { label: "Vinkeveen", href: "/vinkeveen" }
  ],

  // Region-specific FAQs for SEO
  faqs: [
    {
      tag: "WATER",
      q: "Wat zijn de regels voor bouwen aan de Vinkeveense Plassen?",
      a: "Bouwen direct aan het water vraagt om specifieke kennis van de Keur van het Waterschap en de provinciale regels. Daarnaast kijkt de gemeente De Ronde Venen streng naar de bouwhoogte en kapvorm die past in het landschap. Wij begeleiden u bij de afstemming met alle instanties.",
      color: "blue"
    },
    {
      tag: "GROND",
      q: "Moet je in Vinkeveen altijd heien bij een aanbouw?",
      a: "De ondergrond in Vinkeveen bestaat uit dikke veenlagen. Bijna elke constructieve wijziging of uitbreiding vraagt om een gedegen funderingsadvies en meestal een nieuwe paalfundering om verzakking te voorkomen. Wij werken samen met gespecialiseerde constructeurs in de regio.",
      color: "emerald"
    },
    {
      tag: "RECREATIE",
      q: "Kan ik een recreatiewoning in Vinkeveen ombouwen tot permanente woning?",
      a: "Dit is een veelgestelde vraag. Het omgevingsplan van De Ronde Venen is hier over het algemeen zeer terughoudend in. We kunnen echter wel onderzoeken wat de maximale verruimingsmogelijkheden zijn voor het huidige gebruik of een modernisering van de bestaande bebouwing.",
      color: "stone"
    },
    {
      tag: "VERGUNNING",
      q: "Hoe adviseert de welstand in De Ronde Venen over moderne ontwerpen?",
      a: "De welstandscommissie in De Ronde Venen waardeert eigentijdse architectuur, mits deze respect toont voor de openheid van het veenweidelandschap. Wij presenteren onze ontwerpen met 3D-visualisaties om de commissie te overtuigen van de kwaliteit en inpassing.",
      color: "amber"
    }
  ],

  projects: vinkeveenProjects,

  heroSlides: [
    {
      url: "/images/vinkeveen/luxe-villa-architect-vinkeveen-moderne-woning-zwembad-luxury-living-architekt-wijdemeren.webp",
      title: "ARCHITECT IN VINKEVEEN",
      subtitle: "Woningen met oog voor water en veenweide aan de Vinkeveense Plassen"
    },
    {
      url: "/images/vinkeveen/moderne-villa-witte-gevels-architect-gelijkvloers-wonen-aan-het-water-ronde-venen-luxury-living.webp",
      title: "VAN EERSTE SCHETS TOT OPLEVERING",
      subtitle: "Ontwerpen die passen bij het karakter van Vinkeveen en De Ronde Venen"
    },
    {
      url: "/images/vinkeveen/moderne-stacaravan-recreatiewoning-eigentijds-architect-houten-schermen-vinkeveen-architect.webp",
      title: "VAKMANSCHAP EN AANDACHT",
      subtitle: "Begeleiding bij vergunningen en contact met gemeente De Ronde Venen"
    }
  ],

  regio: {
    name: "Vinkeveen",

    intro: {
      h1: "Architect in Vinkeveen",
      paragraph: "U zoekt een architect in Vinkeveen voor een verbouwing, aanbouw of nieuwbouwwoning aan de Vinkeveense Plassen of in het dorp. Vanuit mijn basis in Loenen aan de Vecht werk ik met regelmaat in Vinkeveen en omgeving. Het doel is een ontwerp dat uw leven bij het water optimaal maakt - een woning die past bij uw dromen en hoe u hier wilt genieten van de unieke veenweidelandschap. Door kennis van bestemmingsplannen en ervaring met afwijkingsprocedures ontstaat vaak meer ruimte voor maatwerk dan u op het eerste gezicht zou verwachten."
    },

    footerIntro: {
      h2: "Architect in Vinkeveen nodig?",
      paragraph: "Denkt u na over een verbouwing, aanbouw of nieuwbouwwoning in Vinkeveen en wilt u daar met een architect over sparren? Neem contact op met Jules Zwijsen voor een vrijblijvend gesprek. Tijdens een afspraak op uw locatie wordt samen bekeken welke mogelijkheden er zijn voor uw woning en locatie in Vinkeveen en gemeente De Ronde Venen."
    },

    collageImages: [
      {
        url: "/images/vinkeveen/luxe-villa-architect-vinkeveen-moderne-woning-zwembad-luxury-living-architekt-wijdemeren.webp",
        alt: "Luxe villa met zwembad in Vinkeveen, moderne architectuur door architect Jules Zwijsen"
      },
      {
        url: "/images/vinkeveen/rieten-kap-villa-vinkeveen-ronde-venen-architect-moderne-woning-kavel-architekt.webp",
        alt: "Moderne villa met rieten kap in Vinkeveen De Ronde Venen, ontwerp architect"
      },
      {
        url: "/images/vinkeveen/moderne-villa-witte-gevels-architect-gelijkvloers-wonen-aan-het-water-ronde-venen-luxury-living.webp",
        alt: "Moderne villa met witte gevels aan het water in De Ronde Venen, gelijkvloers wonen"
      },
      {
        url: "/images/vinkeveen/recreatiewoning-nieuwbouw-vinkeveen-architect-moderne-recreatie-woning.webp",
        alt: "Nieuwbouw recreatiewoning in Vinkeveen, modern ontwerp door architect"
      },
      {
        url: "/images/vinkeveen/moderne-stacaravan-recreatiewoning-eigentijds-architect-houten-schermen-vinkeveen-architect.webp",
        alt: "Moderne recreatiewoning met houten schermen in Vinkeveen, eigentijds ontwerp"
      },
      {
        url: "/images/vinkeveen/modern interieur gebogen villa luxe architect vinkeveen villa vrijstaand bouwen bouwgrond.webp",
        alt: "Modern interieur van gebogen villa in Vinkeveen, luxe vrijstaande woning op bouwgrond"
      }
    ],

    municipalLinks: [
      {
        title: "Bestemmingsplan / Omgevingsplan",
        url: "https://omgevingswet.overheid.nl/regels-op-de-kaart/zoeken/locatie",
        description: "Controleer wat er mag op uw locatie volgens het gemeentelijke bestemmingsplan."
      },
      {
        title: "Welstandsnota De Ronde Venen",
        url: "https://www.derondevenen.nl/dsresource?objectid=e880d12e-9c02-4f88-84a0-6508ac6a6c33&type=PDF",
        description: "Inzicht in welstandscriteria en architectonische eisen voor uw bouwplan."
      },
      {
        title: "Leges en tarieven omgevingsvergunning",
        url: "https://lokaleregelgeving.overheid.nl/CVDR731615",
        description: "Overzicht van gemeentelijke kosten voor vergunningaanvragen."
      },
      {
        title: "Vooroverleg gemeente De Ronde Venen",
        url: "https://www.derondevenen.nl/Wonen_en_leven/Bouwen_verbouwen_en_slopen/Omgevingswet/Vooroverleg",
        description: "Neem vooraf contact op met de gemeente voor advies over uw plannen."
      },
      {
        title: "Archief bouwtekeningen",
        url: "https://www.derondevenen.nl/",
        description: "Bekijk in het archief of er tekeningen van de bestaande woning beschikbaar zijn."
      }
    ],

    expertise: {
      h2: "Wat doet een architect in Vinkeveen?",
      paragraph: "Als architect in Vinkeveen en omgeving ontwerpt Jules Zwijsen woningen met oog voor de unieke ligging aan de Vinkeveense Plassen en het karakteristieke veenweidegebied. Van waterwoningen en recreatiewoningen tot vrijstaande villa's in het groen - elk ontwerp past bij de waterrijke omgeving die Vinkeveen en De Ronde Venen zo bijzonder maken. En natuurlijk bij uw wensen en dromen, zodat het uw thuis wordt.",
      h3: "Architectonisch ontwerp aan de Vinkeveense Plassen",
      h3_paragraph: "Vinkeveen kent een bijzonder karakter door de nabijheid van water, natuur en het veenweidegebied. Bij elk ontwerp wordt rekening gehouden met het dorpse karakter en de landschappelijke kwaliteiten van de omgeving. Jules Zwijsen heeft ervaring met de gemeente De Ronde Venen, de welstandscommissie en procedures voor afwijking van het bestemmingsplan. Via binnenplanse afwijkingen of een omgevingsvergunning in afwijking van het bestemmingsplan ontstaat vaak meer ruimte voor uw wensen dan het bestemmingsplan in eerste instantie laat zien - maatwerk dat past bij uw situatie en Vinkeveen.",
      services: [
        "Ontwerp van nieuwbouwwoningen in Vinkeveen en De Ronde Venen",
        "Verbouw van woningen nabij de Vinkeveense Plassen",
        "Recreatiewoningen en waterwoningen in veenweidegebied",
        "Aanbouw, uitbreiding en verduurzaming van bestaande woningen",
        "Begeleiding bij vergunningsaanvragen gemeente De Ronde Venen",
        "Advies bij landschappelijke inpassing en welstandstoetsing"
      ]
    }
  }
};
