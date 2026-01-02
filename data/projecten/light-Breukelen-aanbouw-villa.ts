import type { Project, ProjectSnapshot } from '../types';

const snapshot: ProjectSnapshot = {
  idea: 'De Vechtzijde openen met een royale aanbouw die licht en zichtlijnen maximaliseert.',
  extendedDescription:
    'De woning ligt direct aan de Vecht. Door de gevel 2,9 meter op te schuiven is aan de Vechtzijde een ruimere woonzone ontstaan met panoramisch uitzicht. De keuken verhuisde naar de tuinzijde en staat half-open met de vergrote woonkamer. Het grid van 2,9 x 2,9 m sluit aan op de bestaande maatvoering; maximale gevelopening richting de Vecht levert een licht interieur dat naadloos op de bestaande woning aansluit.',
  logic: [
    { type: 'vraag', text: 'Hoe geef je een bestaande woning aan de Vecht meer ruimte en uitzicht zonder het karakter te verliezen?' },
    { type: 'pijn', text: 'Groot woonoppervlak maar weinig ruimtelijk gevoel; beperkte zichtlijnen op de Vecht.' },
    { type: 'oplossing', text: 'Gevel opschuiven 2,9 m richting Vecht/noordzijde; keuken naar tuinzijde; gevelopeningen maximaliseren binnen bestaand grid.' },
    { type: 'opbrengst', text: 'Panoramisch uitzicht, licht interieur, moderne uitbreiding die het originele ritme behoudt.' },
  ],
  yield: [
    'Panoramische woonkamer aan de Vecht met veel licht.',
    'Keuken strategisch verplaatst voor betere routing en zichtlijnen.',
    'Uitbreiding in bestaand grid voor een naadloze aansluiting.',
  ],
};

export const Breukelenaanbouw: Project = {
  id: 9201,
  title: 'Aanbouw villa aan de Vecht',
  location: 'Breukelen',
  slug: 'light-Breukelen-aanbouw-villa',

  openMode: 'overlay',
  typology: 'Aanbouw / verbouw',

  image: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-04.jpg',
  size: 'landscape',
  year: '2013',
  area: '350 m2',
  tag: 'Verbouw',
  description:
    'Royale aanbouw aan de Vechtzijde; gevel 2,9 m opgeschoven voor licht, zicht en een ruim woonprogramma.',

  gallery: [
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-07.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-01.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-02.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-03.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-05.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-06.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-04.jpg',
  ],

  snapshot,
};
