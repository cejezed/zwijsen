import type { Project, ProjectSnapshot } from '../types';

const snapshot: ProjectSnapshot = {
  idea: 'Een oude stal transformeren tot woonschuur met uitzicht en comfort.',
  extendedDescription:
    'Op het erf van een voormalige boerderij is de stal vervangen door een woonschuur met eetkeuken, serre en tuinkamer. Nieuwe eiken gebinten geven vrijheid in verdiepingshoogte en sterke zichtlijnen. De serre aan de zuidkant vormt een binnen-buiten buffer, de tuinkamer achter biedt uitzicht over de weilanden.',
  logic: [
    { type: 'vraag', text: 'Hoe vervang je een verouderde stal door een lichte, comfortabele woonschuur?' },
    { type: 'pijn', text: 'Gebrekkige kwaliteit van oude gebinten, beperkte ruimte en comfort.' },
    { type: 'oplossing', text: 'Nieuwe eikenhouten gebinten, serre aan zuidzijde, tuinkamer met uitzicht; dak integreert privacy/zonwering/energie.' },
    { type: 'opbrengst', text: 'Ruime eetkeuken, serre als klimaatzone, tuinkamer met vergezichten.' },
  ],
  yield: [
    'Nieuwe gebinten voor ruimte en stabiliteit.',
    'Serre als buffer en lichtbrenger, tuinkamer met uitzicht.',
    'Woonschuur met moderne installaties en comfort.',
  ],
};

export const Muidenstal: Project = {
  id: 9404,
  title: 'Verbouw stal naar woonschuur Muiden',
  location: 'Buitengebied Muiden',
  slug: 'light-Muiden-verbouw-stal',

  openMode: 'overlay',
  typology: 'Verbouw boerderij',
  categories: ['verbouw'],

  image: 'https://www.zwijsen.net/wp-content/uploads/2014/05/WP_20170831_001.jpg',
  size: 'landscape',
  year: '2014',
  area: '215 m2',
  tag: 'Verbouw',
  description:
    'Stal vervangen door woonschuur met eetkeuken, serre en tuinkamer; nieuwe eiken gebinten en vergezichten.',

  gallery: [
    'https://www.zwijsen.net/wp-content/uploads/2014/05/DJI_0029_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_0286_resize1.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_0279_resize1.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_0288_resize1.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_9377_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_0283_resize1.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_0275_resize1.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_0277_resize1.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_0287_resize1.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2014/05/DJI_0033_resize.jpg',
  ],

  snapshot,
};
