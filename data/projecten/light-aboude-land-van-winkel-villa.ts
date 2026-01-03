import type { Project, ProjectSnapshot } from '../types';

const snapshot: ProjectSnapshot = {
  idea:
    'Met beperkte bouwruimte en strenge stedenbouwkundige randvoorwaarden toch een lichte, ruime villa realiseren.',
  extendedDescription:
    'Dure grond, strenge stedenbouwkundige eisen, geen gasaansluiting en kritische hypotheekverstrekkers: beperkingen vragen om slimme oplossingen. De woning benut de regels maximaal, met focus op daglicht, zichtlijnen en een helder volume.',
  logic: [
    {
      type: 'vraag',
      text: 'Hoe maak je een royale, lichte villa binnen krappe kavel- en bouwregels?',
    },
    {
      type: 'pijn',
      text: 'Beperkte footprint en strenge stedenbouw leiden snel tot een donkere, opgeknipte plattegrond.',
    },
    {
      type: 'oplossing',
      text: 'Heldere volumes met grote gevelopeningen en beschutte buitenruimte; slimme positionering van leefruimtes voor licht en privacy.',
    },
    {
      type: 'opbrengst',
      text: 'Ruimtelijke rust, veel licht en logische zichtlijnen, zonder de regels te overschrijden.',
    },
  ],
  yield: [
    'Slimme inzet van regels resulteert in een lichte woning met sterke zichtlijnen.',
    'Beschutte buitenruimte en privacy ondanks krappe bouwkavel.',
    'Consistente materialisatie voor een tijdloos geheel.',
  ],
};

export const villaabcoude: Project = {
  id: 9002,
  title: 'Villa Abcoude',
  location: 'Abcoude – Land van Winkel',
  slug: 'light-abcoude-land-van-winkel-villa',

  openMode: 'overlay',
  typology: 'Nieuwbouw villa',
  categories: ['nieuwbouw'],

  image: 'https://www.zwijsen.net/wp-content/uploads/2015/05/abcoude-kavel-architect-moderne-woning_resize.jpg',
  size: 'wide',
  year: '2015',
  area: '235 m2',
  tag: 'Nieuwbouw',
  description:
    'Moderne witgestucte villa met natuursteenaccenten, ontworpen voor maximale lichtinval binnen strenge stedenbouwkundige kaders.',

  gallery: [
    'https://www.zwijsen.net/wp-content/uploads/2015/05/abcoude-kavel-architect-moderne-woning-land-van-winkel.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2015/05/abcoude-kavel-architect-moderne-woning-land-van-winkel-vv.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2015/05/abcoude-kavel-architect-moderne-woning-land-van-winkel-tuin.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2015/05/abcoude-kavel-architect-moderne-woning_resize.jpg',
  ],

  snapshot,
};
