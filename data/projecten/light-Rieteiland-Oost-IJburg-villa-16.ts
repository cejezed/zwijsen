import type { Project, ProjectSnapshot } from '../types';

const snapshot: ProjectSnapshot = {
  idea: 'Een T-vormige plattegrond om het waterzicht te maximaliseren en privacy te waarborgen.',
  extendedDescription:
    'Aan de noordzijde van Rieteiland Oost schuift de plattegrond in een T-vorm om zicht op water en openbare ruimte te benutten. Keuken als spil met aangrenzend entree, woonkamer en eetkamer aan de waterzijde. De woonkamer ligt centraal in de tuin voor ideale bezonning; eetkamer en terras liggen verhoogd voor weids uitzicht. Op de 2e verdieping een werk/kantoor met dakterrassen aan noord en zuid. Gevelopeningen zijn zo geplaatst dat zichtlijnen op eiland, tuin en water maximaal zijn zonder oververhitting.',
  logic: [
    { type: 'vraag', text: 'Hoe ontwerp je een waterkavelwoning met maximale zichtlijnen en comfort?' },
    { type: 'pijn', text: 'Risico op opwarming en beperkte zichtlijnen als openingen ongunstig liggen.' },
    { type: 'oplossing', text: 'T-vormige plattegrond; keuken als spil; verhoogde eetkamer/terras; gevelopeningen strategisch geplaatst.' },
    { type: 'opbrengst', text: 'Weids uitzicht, beschutte tuinplekken en gecontroleerd daglicht.' },
  ],
  yield: [
    'Keuken als spil met zicht op water en tuin.',
    'Verhoogde eetkamer/terras voor panoramisch uitzicht.',
    'Werk/kantoor met dakterrassen en doorkijk naar eiland en water.',
  ],
};

export const villareo16: Project = {
  id: 9403,
  title: 'Waterkant villa Rieteiland Oost',
  location: 'Rieteiland Oost, IJburg',
  slug: 'light-rieteiland-oost-ijburg-villa-16',

  openMode: 'overlay',
  typology: 'Nieuwbouw villa',
  categories: ['nieuwbouw'],

  image: 'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_3923_resize.jpg',
  size: 'landscape',
  year: '2013',
  area: '215 m2',
  tag: 'Nieuwbouw',
  description:
    'T-vormige plattegrond met verhoogde eetkamer en strategische gevelopeningen voor uitzicht en comfort.',

  gallery: [
    'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_3923_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-woning-rieteiland-oost-05.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-woning-rieteiland-oost-06.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-woning-rieteiland-oost-08.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-woning-rieteiland-oost-02.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-woning-rieteiland-oost-03.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-woning-rieteiland-oost-09.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-woning-rieteiland-oost-04.jpg',
  ],

  snapshot,
};
