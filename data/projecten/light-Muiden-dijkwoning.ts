import type { Project, ProjectSnapshot } from '../types';

const snapshot: ProjectSnapshot = {
  idea: 'Een nieuwe dijkwoning met souterrain, verankerd in de dijk met zicht op IJmeer en weilanden.',
  extendedDescription:
    'Op de zuiderzeeroute vervangt een nieuwe dijkwoning het bestaande huis. Een in de dijk geschoven plint met souterrain zorgt voor privacy richting de drukke dijk en geeft verhoogd uitzicht over het IJmeer. Een zitkamer op de dakverdieping kijkt richting Amsterdam. Terugliggende kozijnen, slanke dakkapellen en hedendaagse luiken geven een kasteelachtige uitstraling.',
  logic: [
    { type: 'vraag', text: 'Hoe ontwerp je een robuuste dijkwoning met privacy én vergezichten?' },
    { type: 'pijn', text: 'Drukke dijk, behoefte aan privacy en zicht; bestaande woning bood weinig kwaliteit.' },
    { type: 'oplossing', text: 'Souterrain/plint in de dijk voor privacy; verhoogde woonverdieping en zitkamer op dak voor uitzicht.' },
    { type: 'opbrengst', text: 'Robuuste, terughoudende uitstraling met strategische openingen naar het landschap.' },
  ],
  yield: [
    'Verhoogd woonniveau met zicht over dijk en landschap.',
    'Souterrain/plint verankert de woning en schermt de dijk af.',
    'Kasteelachtige uitstraling met terugliggende kozijnen en slanke dakkapellen.',
  ],
};

export const Muidendijkwoning: Project = {
  id: 9405,
  title: 'Nieuwbouw dijkwoning Muiden',
  location: 'Buitengebied Muiden',
  slug: 'light-Muiden-dijkwoning',

  openMode: 'overlay',
  typology: 'Nieuwbouw dijkwoning',
  categories: ['nieuwbouw'],

  image: 'https://www.zwijsen.net/wp-content/uploads/2014/11/2018-04-26-16.08.38_resize.jpg',
  size: 'landscape',
  year: '2014',
  area: '275 m2',
  tag: 'Nieuwbouw',
  description:
    'Robuuste dijkwoning met souterrain en verhoogde woonlaag; privacy aan de dijk, vergezichten over IJmeer en weilanden.',

  gallery: [
    'https://www.zwijsen.net/wp-content/uploads/2018/06/dijkwoning-muiden-nieuwbouw-architect-villa.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2014/11/2018-04-26-16.06.48_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2014/11/2018-04-26-16.02.46_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2014/11/2018-04-26-15.51.22_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2014/11/2018-04-26-15.46.20_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2014/11/2018-04-26-16.11.49_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2014/11/2018-04-26-16.09.04_resize.jpg',
  ],

  snapshot,
};
