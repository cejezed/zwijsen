import type { Project, ProjectSnapshot } from '../types';

export const villavleuten: Project & {
  openMode: 'overlay';
  snapshot: ProjectSnapshot;
  typology?: string;
  categories?: string[];
} = {
  id: 9001,

  title: 'Villa Vleuten-De Meern',
  location: 'Vleuten-De Meern',
  slug: 'light-vleuten-villa',

  openMode: 'overlay',
  typology: 'Nieuwbouw villa',
  categories: ['nieuwbouw'],

  // Portfolio/kaart velden
  image: '/images/projecten/modene-wit-villa-vleuten-de-meern-architect-jules-zwijsen-bouwgrond.webp',
  size: 'wide',
  year: '2014',
  area: '245 m²',
  tag: 'Nieuwbouw',
  description:
    'Slimme inzet van regelgeving en uitbouwen: de woning werkt als "schild" tussen straat en tuin, met maximale licht- en zichtlijnen binnen.',

  // Overlay gebruikt dit als detailbeelden
  gallery: [
    '/images/projecten/modene-wit-villa-vleuten-de-meern-architect-jules-zwijsen-bouwgrond.webp',
    '/images/projecten/modene-witte-villa-vleuten-de-meern-architect-jules-zwijsen-kavel.webp',
    '/images/utrecht/Villa-kavel-Vleuten-utrecht-architect.webp',
    'https://www.zwijsen.net/wp-content/uploads/2014/05/IMG_0780_resize.jpg'
  ],

  snapshot: {
    idea:
      'Niet "meer bouwen", maar de kavelregels zó gebruiken dat ze een ruimtelijk voordeel worden.',
    extendedDescription:
      'Door slim gebruik te maken van de regelgeving in het bestemmingsplan gebruiken we de woning als een schild tussen de voor- en achterzijde. De uitbouwen aan beide zijde van de woning zijn daarbij integraal onderdeel van het geheel. Aan de oostzijde een prachtige eetkeuken met een hoog schuin dak en aan de westzijde de garage met overdekte doorgang naar de achtertuin. Ook binnen zorgt de aanbouw van de keuken voor een extra kwaliteit: vanuit de keuken is er zicht op de overloop op beide verdiepingen. Daarnaast zorgen strategisch geplaatste dakramen voor prachtig licht in de keuken en woonkamer.',
    logic: [
      {
        type: 'vraag',
        text:
          'Hoe kunnen we binnen de kavelregels toch een royale woonkeuken en een goede overgang tussen straat en tuin maken?',
      },
      {
        type: 'pijn',
        text:
          'De regelgeving drukt de massa naar een onhandige positie: risico op weinig privacy, rommelige zichtlijnen en verlies van daglicht.',
      },
      {
        type: 'oplossing',
        text:
          'De woning als “schild”: uitbouwen aan beide zijden maken een heldere scheiding straat/tuin; de eetkeuken krijgt een hoog schuin dak en strategische dakramen.',
      },
      {
        type: 'opbrengst',
        text:
          'Meer daglicht, meer ruimtelijkheid en een logisch daglichtplan; zichtlijnen over beide verdiepingen; kwaliteit zonder extra volume.',
      },
    ],
    yield: [
      'Heldere scheiding tussen straat en tuin zonder concessies.',
      'Extra daglicht via strategische dakramen in keuken en woonkamer.',
      'Sterke zichtlijnen door de woning voor ruimtelijke rust.',
    ],
  },
};
