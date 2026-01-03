import type { Project, ProjectSnapshot } from '../types';

const snapshot: ProjectSnapshot = {
  idea: 'Een houten, rolstoeltoegankelijke villa met patio-achtige plekken en strategische zichtlijnen.',
  extendedDescription:
    'Deze houten villa op Rieteiland Oost benut de kavel door beschutte en open plekken te maken. De hoofdslaapkamer op de 2e verdieping kijkt via een groot raam richting Amsterdam en het Diemerpark. Massieve vurenhouten CLT-wanden en vloeren bepalen het interieur. Grote gevelopeningen op gekozen plekken zorgen voor rust, licht en vergezichten. De woning is volledig rolstoeltoegankelijk en levensloopbestendig.',
  logic: [
    { type: 'vraag', text: 'Hoe combineer je houtbouw, uitzicht en levensloopbestendigheid op een waterkavel?' },
    { type: 'pijn', text: 'Eenzijdige oriëntatie of geslotenheid kan licht en uitzicht beperken; toegankelijkheid moet worden geborgd.' },
    { type: 'oplossing', text: 'CLT-constructie met strategische openingen, patio-achtige plekken en volledige rolstoeltoegankelijkheid.' },
    { type: 'opbrengst', text: 'Rustig, licht interieur met vergezichten; toekomstbestendig door rolstoeltoegang en logische routing.' },
  ],
  yield: [
    'CLT-houtbouw met zichtlijnen naar Amsterdam en Diemerpark.',
    'Strategische gevelopeningen voor licht en privacy.',
    'Rolstoeltoegankelijke, levensloopbestendige indeling.',
  ],
};

export const villareo36: Project = {
  id: 9402,
  title: 'Houten villa Rieteiland Oost',
  location: 'Rieteiland Oost, IJburg',
  slug: 'light-rieteiland-oost-ijburg-villa-36',

  openMode: 'overlay',
  typology: 'Houtbouw / nieuwbouw',
  categories: ['nieuwbouw'],

  image: 'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-11.jpg',
  size: 'portrait',
  year: '2013',
  area: '215 m2',
  tag: 'Nieuwbouw',
  description:
    'CLT-houten villa met strategische zichtlijnen en patio-achtige plekken; volledig rolstoeltoegankelijk.',

  gallery: [
    'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-05.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-06.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-07.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-09.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-10.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-03.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-04.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-11.jpg',
  ],

  snapshot,
};
