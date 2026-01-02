import type { Project, ProjectSnapshot } from '../types';

const snapshot: ProjectSnapshot = {
  idea: 'Jaren-30 woning verduurzamen en uitbreiden met een moderne aanbouw.',
  extendedDescription:
    'Aanbouw en verbouw met focus op isolatie, daglicht en een logisch woonritme. De bestaande woning is versterkt met een moderne uitbouw, grote gevelopeningen en slimme installaties, zonder het karakter te verliezen.',
  logic: [
    { type: 'vraag', text: 'Hoe voeg je moderne ruimte en comfort toe aan een jaren-30 woning?' },
    { type: 'pijn', text: 'Beperkte isolatie, gedateerde indeling en weinig licht in de bestaande woning.' },
    { type: 'oplossing', text: 'Moderne aanbouw met grote glasvlakken, betere isolatie en verduurzaming; routing herzien voor licht en zichtlijnen.' },
    { type: 'opbrengst', text: 'Meer comfort, lagere energielast en een open woonzone die aansluit op de tuin.' },
  ],
  yield: [
    'Moderne aanbouw met veel daglicht en zicht op tuin.',
    'Verduurzaming en verbeterde isolatie/ventilatie.',
    'Vernieuwd woonritme dat past bij hedendaags gebruik.',
  ],
};

export const Bilthovenjaren30aanbouw: Project = {
  id: 9102,
  title: 'Moderne aanbouw Bilthoven',
  location: 'Bilthoven',
  slug: 'light-Bilthoven-verbouw-aanbouw-jaren30',

  openMode: 'overlay',
  typology: 'Verbouw & aanbouw',

  image: 'https://www.zwijsen.net/wp-content/uploads/2020/03/Bilthoven-10.jpg',
  size: 'landscape',
  year: '2020',
  area: '240 m2',
  tag: 'Verbouw',
  description:
    'Aanbouw, verduurzaming en verbouw van een jaren-30 woning met grote glasvlakken en een frisse indeling.',

  gallery: [
    'https://www.zwijsen.net/wp-content/uploads/2020/03/Bilthoven-10.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2022/10/Moderne-aanbouw-en-verbouw-Bilthoven-architect-4.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2022/10/Moderne-aanbouw-en-verbouw-Bilthoven-architect-1.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2022/10/Moderne-aanbouw-en-verbouw-Bilthoven-architect-2.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2021/11/2023-01-23-10.39.27_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2022/10/Moderne-aanbouw-en-verbouw-Bilthoven-architect-5.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2022/10/181_2160.jpg',
  ],

  snapshot,
};
