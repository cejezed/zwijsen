import { IMAGES, HERO_SLIDES, PROJECTS, PROCESS_STEPS, FAQS, TESTIMONIALS } from '../data';
import type { RegioConfig } from './types';

// Default/Global configuratie (fallback voor alle regio's)
// PROJECTS array contains all portfolio items
export const DEFAULT_CONFIG: RegioConfig = {
  seoTitle: "Architectenbureau Jules Zwijsen | Architect voor uw droomwoning",
  metaDescription: "Architectenbureau Jules Zwijsen ontwerpt woningen op maat in de Vechtstreek en omgeving. Van nieuwbouw tot verbouw en monumentenzorg, met persoonlijke aandacht en vakmanschap.",
  heroSlides: HERO_SLIDES,
  projects: PROJECTS,
  processSteps: PROCESS_STEPS,
  faqs: FAQS,
  testimonials: TESTIMONIALS,
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Regio's", href: "/regios" }
  ],
  regio: {
    name: "Loenen aan de Vecht",
    collageImages: [
      IMAGES.blueprint,
      IMAGES.facade_modern,
      IMAGES.living_room,
      IMAGES.window_view,
      IMAGES.wood_detail,
      IMAGES.villa_forest
    ],
    municipalLinks: [
      {
        title: "Bestemmingsplan / Omgevingsplan",
        url: "https://www.ruimtelijkeplannen.nl/",
        description: "Controleer wat er mag op uw locatie volgens het gemeentelijke bestemmingsplan."
      },
      {
        title: "Welstandsnota Stichtse Vecht",
        url: "https://www.stichtsevecht.nl/",
        description: "Inzicht in welstandscriteria en architectonische eisen voor uw bouwplan."
      },
      {
        title: "Leges en tarieven omgevingsvergunning",
        url: "https://www.stichtsevecht.nl/",
        description: "Overzicht van gemeentelijke kosten voor vergunningaanvragen."
      },
      {
        title: "Monumentenbeleid",
        url: "https://www.stichtsevecht.nl/",
        description: "Specifieke regels voor monumentale panden in de Vechtstreek."
      },
      {
        title: "Vooroverleg gemeente",
        url: "https://www.stichtsevecht.nl/",
        description: "Neem vooraf contact op met de gemeente voor advies over uw plannen."
      }
    ],
    expertise: {
      h2: "Wat doet een architect in Loenen aan de Vecht?",
      paragraph: "Als architect in Loenen aan de Vecht richt Jules Zwijsen zich op het ontwerpen en verbouwen van woningen in en rond het dorp. Dat varieert van een compacte uitbouw aan een dijkhuis tot het zorgvuldig uitbreiden van een monumentaal pand of het ontwerpen van een nieuwe woning op een kavel in de Vechtstreek. Steeds met aandacht voor zichtlijnen, daglicht, materiaal en de relatie met tuin en straat.",
      h3: "Architectonisch ontwerp en verbouw in de Vechtstreek",
      h3_paragraph: "In de Vechtstreek speelt de samenhang tussen landschap, dorpsstructuur en bestaande architectuur een grote rol. Bij elk ontwerp wordt gekeken naar het straatbeeld, de maat en schaal van de omgeving en de regels van de gemeente Stichtse Vecht. Zo ontstaat een ontwerp dat ruim voelt, praktisch is in gebruik en vanzelfsprekend in de omgeving past.",
      services: [
        "Ontwerp van nieuwbouwwoningen in Loenen aan de Vecht en omgeving",
        "Aanbouw en uitbouw van bestaande woningen in Loenen en Vreeland",
        "Verbouw en herindeling van (monumentale) woningen",
        "Begeleiding bij vergunningsaanvragen bij gemeente Stichtse Vecht",
        "Overleg met aannemer tijdens de bouw"
      ],
      regionalProjects: [
        {
          title: "Dijkwoning Loenen",
          description: "Karakteristieke verbouwing aan de Vecht"
        },
        {
          title: "Landhuis Vreeland",
          description: "Klassiek landhuis met hedendaagse twist"
        },
        {
          title: "Villa Vechtstreek",
          description: "Moderne nieuwbouw in groene omgeving"
        }
      ]
    }
  }
};
