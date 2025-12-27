import { IMAGES } from '../../data';
import type { RegioConfig } from '../types';

export const loosdrechtConfig: Partial<RegioConfig> = {
  seoTitle: "Architect Loosdrecht | Architectenbureau Jules Zwijsen",
  regio: {
    name: "Loosdrecht",
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
      ],
      regionalProjects: [
        {
          title: "Villa aan de Plassen",
          description: "Moderne woning met zicht op water"
        },
        {
          title: "Gezinswoning Loosdrecht",
          description: "Duurzaam ontwerp in groene setting"
        },
        {
          title: "Verbouwing Dorpskern",
          description: "Modernisering met behoud van karakter"
        }
      ]
    }
  }
};
