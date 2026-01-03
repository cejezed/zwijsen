import type { Project, ProjectSnapshot } from '../types';

const snapshot: ProjectSnapshot = {
  idea: 'Rijksmonument uitbreiden met een transparante tuinkamer aan de parkzijde.',
  extendedDescription:
    'Het plantagehuis in Vreeland kreeg een nieuwe, passende uitbreiding aan de tuinzijde. Een transparante uitbouw verbindt het interieur met het landschapspark langs de Vecht. De eetkamer verhuisde naar de uitbouw; het interieur is gerenoveerd en verduurzaamd.',
  logic: [
    { type: 'vraag', text: 'Hoe voeg je ruimte en licht toe aan een rijksmonument zonder het karakter te schaden?' },
    { type: 'pijn', text: 'Meerdere eerdere verbouwingen; behoefte aan verbinding met park/Vecht en meer licht.' },
    { type: 'oplossing', text: 'Transparante tuinkamer aan de tuinzijde, eetkamer verplaatst; renovatie + verduurzaming binnen monumentale grenzen.' },
    { type: 'opbrengst', text: 'Sterke relatie met park en rivier, meer daglicht en toekomstbestendige woonkwaliteit.' },
  ],
  yield: [
    'Tuinkamer met zicht op park en Vecht, passend bij monument.',
    'Eetkamer verplaatst naar lichtste plek; interieur verduurzaamd.',
    'Karakter behouden, comfort en licht toegevoegd.',
  ],
};

export const plantagehuis: Project = {
  id: 9302,
  title: 'Rijksmonument Plantagehuis Vreeland',
  location: 'Vreeland, Stichtse Vecht',
  slug: 'light-plantagehuis-vreeland',

  openMode: 'overlay',
  typology: 'Aanbouw / tuinkamer',
  categories: ['aanbouw'],

  image: 'https://www.zwijsen.net/wp-content/uploads/2024/08/2024-06-29-16.23.24.jpg',
  size: 'portrait',
  year: '2023',
  area: '40 m2',
  tag: 'Aanbouw',
  description:
    'Transparante tuinkamer aan het plantagehuis: eetkamer naar de tuin, zicht op de Vecht, renovatie en verduurzaming in één.',

  gallery: [
    'https://www.zwijsen.net/wp-content/uploads/2024/08/2024-06-29-16.23.20.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2024/08/2024-06-29-16.23.22.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2024/10/Schermafbeelding-2022-01-10-om-21.59.29.png',
    'https://www.zwijsen.net/wp-content/uploads/2024/08/2024-06-29-16.23.24.jpg',
  ],

  snapshot,
};
