import type { RegioConfig } from '../types';
import { PROJECTS_DETAIL } from '../projecten';

// Converteer PROJECTS_DETAIL naar Project format voor de portfolio grid
const loenenProjects = PROJECTS_DETAIL
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
      id: 100 + index, // Unieke IDs voor deze projecten
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

export const loenenAanDeVechtConfig: Partial<RegioConfig> = {
  seoTitle: "Architect Loenen aan de Vecht | Nieuwbouw & Verbouw Vechtstreek | Jules Zwijsen",
  metaDescription: "Architect in Loenen aan de Vecht en Vreeland voor exclusieve nieuwbouw, verbouw en monumenten in Stichtse Vecht. Jules Zwijsen: de kortste weg van droom naar ontwerp.",
  canonicalUrl: "https://www.zwijsen.net/loenen-aan-de-vecht",

  breadcrumbs: [
    { label: "Loenen aan de Vecht", href: "/loenen-aan-de-vecht" }
  ],

  // Region-specific FAQs for SEO
  faqs: [
    {
      tag: "VERGUNNING",
      q: "Wanneer heb je een omgevingsvergunning nodig in Loenen aan de Vecht?",
      a: "Binnen de historische kern en het beschermd dorpsgezicht van Loenen aan de Vecht is vrijwel elke wijziging aan de buitenzijde vergunningsplichtig. Ook voor aanbouwen aan de achterzijde gelden in Stichtse Vecht specifieke regels. Wij verzorgen het volledige vergunningstraject en het vooroverleg met de gemeente.",
      color: "amber"
    },
    {
      tag: "WELSTAND",
      q: "Hoe streng is de welstand in Cronenburgh en het dorpslint?",
      a: "De welstandseisen in Cronenburgh zijn vastgelegd in een beeldkwaliteitsplan. In het dorpslint van Loenen en Vreeland wordt streng gekeken naar de aansluiting bij het historische karakter. Wij hebben veel ervaring met deze commissies en weten ontwerpen te maken die zowel eigentijds zijn als soepel door de welstandstoets komen.",
      color: "stone"
    },
    {
      tag: "MONUMENT",
      q: "Begeleiden jullie ook de verbouw van monumentale panden aan de Vecht?",
      a: "Jazeker. Wij zijn gespecialiseerd in het combineren van historisch erfgoed met modern wooncomfort. Of het nu gaat om een rijksmonument aan de Vecht of een gemeentelijk monument in het dorp, wij kennen de regels voor restauratie en herbestemming.",
      color: "emerald"
    },
    {
      tag: "KOSTEN",
      q: "Wat kost een architect bij verbouw in Stichtse Vecht?",
      a: "De kosten zijn afhankelijk van de schaal van de verbouwing. Wij werken met transparante fasen: van een eerste haalbaarheidsscan tot de definitieve bouwbegeleiding. Voor projecten in onze eigen regio (Loenen/Vreeland) kunnen we vaak zeer gericht en lokaal adviseren over aannemers en kosten.",
      color: "blue"
    }
  ],

  // Projecten voor Loenen aan de Vecht - eerste 4 worden getoond in QuickProjectsGrid
  projects: loenenProjects,

  // Hero slides - optioneel per regio
  heroSlides: [

    {
      url: "/images/loenen/renovatie-kickestein-loenen-aan-de-vecht-verbouw-karakteristieke-woning.webp",
      title: "VAN EERSTE SCHETS TOT OPLEVERING",
      subtitle: "Ontwerpen met oog voor de karakteristieke omgeving"
    },
    {
      url: "/images/loenen/verbouw woning aan de vecht nieuw bijgebouw architect loenen mijndensedijk.webp",
      title: "ARCHITECT IN LOENEN AAN DE VECHT",
      subtitle: "Nieuwbouw, verbouw en monumentenzorg in de Vechtstreek"
    },
    {
      url: "/images/loenen/modern-interieur-houten-spanten-sfeervol-nieuwbouw-woning.webp",
      title: "VAKMANSCHAP EN AANDACHT",
      subtitle: "Begeleiding bij vergunningen en contact met gemeente Stichtse Vecht"
    }
  ],

  // Werkwijze stappen - optioneel: alleen eerste stap aangepast voor regio
  // Je kunt alle stappen overschrijven of alleen specifieke stappen aanpassen
  processSteps: [
    {
      id: "01",
      title: "Kennismaking in Loenen aan de Vecht",
      subtitle: "Wensen & Levensritme",
      duration: "1-2 weken",
      description: "Een persoonlijk gesprek in Loenen aan de Vecht waarin ik uw wensen, stijl en levensritme leer kennen. Ter plaatse voel ik wat de kavel of bestaande woning vraagt. De start van uw ontwerp op maat – na dit gesprek weet u precies waar u aan toe bent en of er een klik is.",
      deliverables: ["Intakegesprek", "Locatie-analyse", "Budgetindicatie"],
      img: "/images/kennismaking_architect_werkwijze_kosten.jpg"
    },
    {
      id: "02",
      title: "Schetsontwerp",
      subtitle: "Inspiratie & Concept",
      duration: "4-6 weken",
      description: "Ik vertaal uw woonwensen naar een krachtig concept dat functioneert én inspireert. Een ontwerp waar u blij van wordt en wat energie geeft! Duidelijke schetsen en 3D visualisaties helpen u het eindresultaat al te ervaren.",
      deliverables: ["3D visualisaties", "Plattegronden", "Materiaalkeuze"],
      img: "/images/schetsontwerp_architect_moderne_villa_zandvoort_duinen.jpg"
    },
    {
      id: "03",
      title: "Voorlopig Ontwerp",
      subtitle: "Prijsvorming & Regie",
      duration: "3-4 weken",
      description: "De eerste set werkbare tekeningen gaat naar aannemers, constructeurs en installatie adviseurs. Ik regel de offertes en eventueel vooroverleg met de gemeente. Zo weet u tijdig wat het écht gaat kosten – en kunnen we bijsturen voordat het te laat is.",
      deliverables: ["Bouwtekeningen", "Offerteaanvraag", "Kostenraming"],
      img: "/images/bouwkundige_tekening_patio_villa_achterhoek.jpg"
    },
    {
      id: "04",
      title: "Definitief Ontwerp",
      subtitle: "Alles sluitend",
      duration: "2-3 weken",
      description: "Alle details worden uitgetekend: constructie, installaties, materialen en afwerkingen. Deze fase vertaalt het concept naar uitvoerbare bouwplannen die geen vragen openlaten.",
      deliverables: ["Constructietekeningen", "Installatieplan", "Detailtekeningen"],
      img: "/images/tekening_uitvoering_bouwvergunning_modern_landhuis.jpg"
    },
    {
      id: "05",
      title: "Vergunning & Uitvoering",
      subtitle: "Van Papier naar Werkelijkheid",
      duration: "Varieert",
      description: "De vergunningsaanvraag wordt ingediend en ik begeleid het bouwproces. Van de eerste schop in de grond tot de laatste verfstreek – u kunt op mij rekenen voor toezicht, overleg met de aannemer en kwaliteitscontrole.",
      deliverables: ["Omgevingsvergunning", "Bouwbegeleiding", "Oplevering"],
      img: "/images/begeleiding_uitvoering_modern_landhuis_realisatie.jpg"
    }
  ],

  regio: {
    name: "Loenen aan de Vecht",

    // Intro sectie - H1 + intro tekst direct onder hero
    intro: {
      h1: "Architect in Loenen aan de Vecht",
      paragraph: "U zoekt een architect in Loenen aan de Vecht voor een verbouwing, aanbouw of nieuwbouwwoning. Al jaren werk ik met veel plezier vanuit Loenen aan de Vecht samen met opdrachtgevers aan woningen en monumenten in het dorp en in Vreeland. Het doel is een ontwerp dat past bij uw wensen en dromen voor uw nieuwe thuis. Door kennis van de regels van gemeente Stichtse Vecht en ervaring met afwijkingsmogelijkheden van het bestemmingsplan blijkt er vaak meer mogelijk dan op het eerste gezicht lijkt."
    },

    // Footer intro - H2 + contacttekst in de footer
    footerIntro: {
      h2: "Architect in Loenen aan de Vecht nodig?",
      paragraph: "Denkt u na over een verbouwing, aanbouw of nieuwbouwwoning in Loenen aan de Vecht of Vreeland en wilt u daar met een architect over sparren? Neem contact op met Jules Zwijsen voor een vrijblijvend gesprek. Tijdens een afspraak op uw locatie wordt samen bekeken welke mogelijkheden er zijn voor uw woning en locatie."
    },

    collageImages: [
      {
        url: "/images/loenen/verbouw woning aan de vecht nieuw bijgebouw architect loenen mijndensedijk.webp",
        alt: "Verbouw woning aan de Vecht met nieuw bijgebouw aan de Mijndensedijk, ontwerp architect Loenen aan de Vecht"
      },
      {
        url: "/images/loenen/renovatie-kickestein-loenen-aan-de-vecht-verbouw-karakteristieke-woning.webp",
        alt: "Renovatie van karakteristieke woning Kickestein in Loenen aan de Vecht door architectenbureau Jules Zwijsen"
      },
      {
        url: "/images/loenen/modern-interieur-houten-spanten-sfeervol-nieuwbouw-woning.webp",
        alt: "Licht interieur met houten spanten in nieuwbouwwoning ontworpen door architect in Loenen aan de Vecht"
      },
      {
        url: "/images/loenen/nieuwbouw-villa-cronenburgh-poortwoning-special-west8-moderne-woning.webp",
        alt: "Moderne nieuwbouwvilla in Cronenburgh met grote glasgevel aan de tuinzijde, ontwerp architect Loenen aan de Vecht"
      },
      {
        url: "/images/loenen/verbouw-wame-hand-zwemlust-herberg-renovatie-architect.webp",
        alt: "Renovatie van karakteristiek pand bij voormalige herberg zwemlustlocatie, verbouw door architect in de Vechtstreek"
      },
      {
        url: "/images/loenen/verbouw-woning-rijksstraatweg-loenen-aan-de-vecht-architect-villa-modern.webp",
        alt: "Verbouwde villa aan de Rijksstraatweg in Loenen aan de Vecht met moderne uitbreiding door architect Jules Zwijsen"
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
        title: "Monumentenbeleid",
        url: "https://www.monumenten.nl/gemeentes/stichtse-vecht#:~:text=Monumentenzorg%20Stichtse%20Vecht&text=De%20adviseurs%20stellen%20beleid%20op,en%20plichten%20met%20zich%20mee.",
        description: "Specifieke regels voor monumentale panden in de Vechtstreek."
      },
      {
        title: "Vooroverleg gemeente",
        url: "https://www.stichtsevecht.nl/wonen-en-leefomgeving/bouwen-verbouwen-en-slopen",
        description: "Neem vooraf contact op met de gemeente voor advies over uw plannen."
      },
      {
        title: "Archief bouwtekeningen",
        url: "https://www.stichtsevecht.nl/wonen-en-leefomgeving/bouwen-verbouwen-en-slopen/bouwdossier-bekijken",
        description: "Bekijk in het archief of er tekeningen van de bestaande woning beschikbaar zijn, onmisbaar bij verbouw, renovatie, aanbouw of verduurzaming van uw woning in Loenen aan de Vecht."
      }
    ],
    expertise: {
      h2: "Wat doet een architect in Loenen aan de Vecht?",
      paragraph: "Als architect in Loenen aan de Vecht richt Jules Zwijsen zich op het ontwerpen en verbouwen van woningen in en rond het dorp. Dat varieert van een compacte uitbouw aan een bestaande woning tot het zorgvuldig uitbreiden van een monumentaal pand of het ontwerpen van een nieuwe woning op een kavel in de Vechtstreek. Steeds met aandacht voor zichtlijnen, daglicht, materiaal en de relatie met tuin en straat.",
      h3: "Architectonisch ontwerp en verbouw in de Vechtstreek",
      h3_paragraph: "In de Vechtstreek speelt de samenhang tussen landschap, dorpsstructuur en bestaande architectuur een grote rol. Bij elk ontwerp wordt gekeken naar het straatbeeld, de maat en schaal van de omgeving en de regels van de gemeente Stichtse Vecht. Door jarenlange ervaring met de welstandscommissie en monumentencommissie weet Jules Zwijsen precies hoe u uw project succesvol door de procedures leidt. Vaak is er meer mogelijk dan het bestemmingsplan aangeeft - via een binnenplanse afwijking of een buitenplanse omgevingsvergunning kunnen we samen met de gemeente kijken naar maatwerk dat past bij uw situatie. Zo ontstaat een ontwerp dat uw wensen vervult, ruim voelt, praktisch is in gebruik én vanzelfsprekend in de omgeving past.",
      services: [
        "Ontwerp van nieuwbouwwoningen in Loenen aan de Vecht en omgeving",
        "Verduurzaming, Aanbouw en uitbouw van bestaande woningen in Loenen en Vreeland",
        "Verbouw en herindeling van (monumentale) woningen",
        "Begeleiding bij vergunningsaanvragen bij gemeente Stichtse Vecht",
        "Gevestigd in Loenen aan de Vecht, actief in de gehele Vechtstreek"
      ]
    }
  }
};
