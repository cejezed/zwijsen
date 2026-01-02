import type { Project, ProjectSnapshot } from '../types';

const snapshot: ProjectSnapshot = {
  idea: 'Maximaal uitzicht en privacy op een kavel aan het water door slimme positionering en veranda.',
  extendedDescription:
    'Op een van de laatste kavels is deze woning zo geplaatst dat zichtlijnen richting water en groen optimaal zijn. Een diepe keuken met veranda en schuur schermt minder fraaie uitzichten af. Het hoge volume schuift dichter op de straat en valt daardoor op; binnen zorgen de woon- en slaapruimtes voor doorzichten richting water en vergezichten.',
  logic: [
    { type: 'vraag', text: 'Hoe benut je zicht op water/groen en scherm je storende uitzichten af?' },
    { type: 'pijn', text: 'Schuin achter minder fraai uitzicht; risico op verlies van privacy en licht.' },
    { type: 'oplossing', text: 'Diepe keuken met veranda/schuur als buffer; volume dichter bij straat; strategische plaatsing van woon- en slaapruimtes.' },
    { type: 'opbrengst', text: 'Optimale zichtlijnen naar water en groen, met privacy en een uitgesproken volume.' },
  ],
  yield: [
    'Panoramische zichtlijnen richting water/groen.',
    'Bufferende veranda/schuur voor privacy en lichtcontrole.',
    'Expressief volume dat opvalt in de straatwand.',
  ],
};

export const villareo59: Project = {
  id: 9401,
  title: 'Villa Rieteiland Oost IJburg',
  location: 'Rieteiland Oost, IJburg',
  slug: 'light-rieteiland-oost-ijburg-villa-59',

  openMode: 'overlay',
  typology: 'Nieuwbouw villa',

  image: 'https://www.zwijsen.net/wp-content/uploads/2015/04/Rieteiland-oost-kavel-architect-moderne-woning.jpg',
  size: 'landscape',
  year: '2015',
  area: '215 m2',
  tag: 'Nieuwbouw',
  description:
    'Waterkavelwoning met veranda-buffer; strategische plaatsing voor privacy en uitzicht.',

  gallery: [
    'https://www.zwijsen.net/wp-content/uploads/2015/06/IMG_3918_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2015/04/Rieteiland-oost-kavel-architect-moderne-woning-vv.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2015/06/2017-03-23-09.47.33_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2015/06/IMG_3927_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2015/06/2017-03-23-09.47.29_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2015/04/Rieteiland-oost-kavel-architect-moderne-woning.jpg',
  ],

  snapshot,
};
