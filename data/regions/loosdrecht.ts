import { IMAGES } from '../../data';
import type { RegioConfig } from '../types';

export const loosdrechtConfig: Partial<RegioConfig> = {
  seoTitle: "Architect Loosdrecht | Architectenbureau Jules Zwijsen",
  metaDescription: "Architect in Loosdrecht voor nieuwbouw en verbouw aan de Loosdrechtse Plassen. Jules Zwijsen ontwerpt woningen met oog voor water en groene omgeving.",

  regio: {
    name: "Loosdrecht",

    // Intro sectie - H1 + intro tekst direct onder hero
    intro: {
      h1: "Architect in Loosdrecht",
      paragraph: "U zoekt een architect in Loosdrecht voor een verbouwing, aanbouw of nieuwbouwwoning aan de Loosdrechtse Plassen. Jules Zwijsen werkt aan woningen in Loosdrecht en omgeving, met oog voor de waterrijke en groene omgeving en de regels van de gemeente Wijdemeren. Het doel is een helder ontwerp dat optimaal gebruikmaakt van de unieke ligging en past in de omgeving."
    },

    // Footer intro - H2 + contacttekst in de footer
    footerIntro: {
      h2: "Architect in Loosdrecht nodig?",
      paragraph: "Denkt u na over een verbouwing, aanbouw of nieuwbouwwoning in Loosdrecht aan de Loosdrechtse Plassen en wilt u daar met een architect over sparren? Neem contact op met Jules Zwijsen voor een vrijblijvend gesprek. Tijdens een afspraak wordt samen bekeken welke mogelijkheden er zijn voor uw woning en locatie in Loosdrecht en omgeving."
    },

    municipalLinks: [
      {
        title: "Bestemmingsplan Wijdemeren",
        url: "https://www.ruimtelijkeplannen.nl/",
        description: "Controleer wat er mag op uw locatie volgens het gemeentelijke bestemmingsplan."
      },
      {
        title: "Welstandsnota Wijdemeren",
        url: "https://www.wijdemeren.nl/",
        description: "Inzicht in welstandscriteria en architectonische eisen voor uw bouwplan."
      },
      {
        title: "Leges en tarieven omgevingsvergunning",
        url: "https://www.wijdemeren.nl/",
        description: "Overzicht van gemeentelijke kosten voor vergunningaanvragen."
      },
      {
        title: "Vooroverleg gemeente Wijdemeren",
        url: "https://www.wijdemeren.nl/",
        description: "Neem vooraf contact op met de gemeente voor advies over uw plannen."
      }
    ],
    expertise: {
      h2: "Wat doet een architect in Loosdrecht?",
      paragraph: "Als architect in Loosdrecht ontwerpt Jules Zwijsen woningen met oog voor de unieke ligging aan de Loosdrechtse Plassen. Van waterwoningen tot landelijke villa's - elk ontwerp past bij de groene en waterrijke omgeving.",
      h3: "Architectonisch ontwerp aan de Plassen",
      h3_paragraph: "Loosdrecht kent een bijzonder karakter door de nabijheid van water en natuur. Bij elk ontwerp wordt rekening gehouden met het dorpse karakter en de landschappelijke kwaliteiten van de omgeving.",
      services: [
        "Ontwerp van nieuwbouwwoningen in Loosdrecht en omgeving",
        "Verbouw van woningen nabij de Loosdrechtse Plassen",
        "Aanbouw en uitbreiding van bestaande woningen",
        "Begeleiding bij vergunningsaanvragen gemeente Wijdemeren",
        "Projectbegeleiding en aannemer-overleg"
      ]
    }
  }
};
