import type { Project, ProjectSnapshot } from '../types';

const snapshot: ProjectSnapshot = {
  idea: 'Een tuinkamer/veranda toevoegen als licht en beschut verlengstuk van de woning.',
  extendedDescription:
    'Een compacte berging met veranda en tuinkamer die het woonprogramma uitbreidt. Grote glasvlakken, houten accenten en een heldere kap geven licht en beschutting, met zicht op de tuin.',
  logic: [
    { type: 'vraag', text: 'Hoe voeg je extra woonkwaliteit toe zonder een grote aanbouw?' },
    { type: 'pijn', text: 'Beperkte buitenruimte en behoefte aan beschutte zitplek met licht en zicht.' },
    { type: 'oplossing', text: 'Tuinkamer met veranda, veel glas en hout, als verlengstuk van wonen en tuin.' },
    { type: 'opbrengst', text: 'Meer gebruiksmomenten buiten, extra licht en zichtlijnen vanuit de woning.' },
  ],
  yield: [
    'Beschutte veranda/tuinkamer die de tuin bij de woning betrekt.',
    'Veel glas voor licht en zichtlijnen.',
    'Compact volume met berging en zitplek in één gebaar.',
  ],
};

export const Bilthovenveranda: Project = {
  id: 9103,
  title: 'Berging met veranda Bilthoven',
  location: 'Bilthoven',
  slug: 'light-Bilthoven-tuinkamer-veranda',

  openMode: 'overlay',
  typology: 'Tuinkamer / veranda',

  image: 'https://www.zwijsen.net/wp-content/uploads/2015/04/veranda_resize.jpg',
  size: 'landscape',
  year: '2016',
  area: 'N.N.B.',
  tag: 'Aanbouw',
  description:
    'Tuinkamer/veranda met berging; veel glas, hout en beschutting voor een licht buitenverblijf.',

  gallery: [
    
    'https://www.zwijsen.net/wp-content/uploads/2016/12/Sketch183201737.jpg',
     ],

  snapshot,
};
