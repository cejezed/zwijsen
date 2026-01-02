import type { Project, ProjectSnapshot } from '../types';

const snapshot: ProjectSnapshot = {
  idea: 'Met een tuinkamer aan de Vecht de woning verduurzamen én de tuin bij het wonen betrekken.',
  extendedDescription:
    'De woning is verduurzaamd en kreeg een strategische tuinkamer aan de Vechtzijde. De eetkamer in de tuinkamer trekt de tuin en de vergezichten naar binnen: een kleine ingreep met groots effect.',
  logic: [
    { type: 'vraag', text: 'Hoe voeg je licht en zicht op de Vecht toe zonder grote verbouwing?' },
    { type: 'pijn', text: 'Behoefte aan eetkamer met uitzicht; bestaande woning sluit de tuin af.' },
    { type: 'oplossing', text: 'Nieuwe tuinkamer/eetkamer aan de Vechtzijde met grote gevelopeningen.' },
    { type: 'opbrengst', text: 'Imposant uitzicht, meer daglicht en direct contact met tuin en rivier.' },
  ],
  yield: [
    'Eenvoudige tuinkamer die de rivier en tuin in de woning brengt.',
    'Verduurzaming gecombineerd met ruimtelijke winst.',
    'Kleine uitbreiding, groot effect op woonkwaliteit.',
  ],
};

export const Breukelentuinkamer: Project = {
  id: 9202,
  title: 'Tuinkamer aan de Vecht',
  location: 'Breukelen',
  slug: 'light-Breukelen-tuinkamer-vecht',

  openMode: 'overlay',
  typology: 'Tuinkamer / aanbouw',

  image: 'https://www.zwijsen.net/wp-content/uploads/2021/10/20220120_125203_resize.jpg',
  size: 'portrait',
  year: '2022',
  area: '50 m2',
  tag: 'Aanbouw',
  description:
    'Verduurzaming en tuinkamer/eetkamer aan de Vechtzijde; maximale relatie tussen wonen, tuin en uitzicht.',

  gallery: [
    'https://www.zwijsen.net/wp-content/uploads/2021/10/20220120_125203_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2021/03/moderne-aanbouw-oude-woning-vecht-architect-verbouw.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2021/03/moderne-aanbouw-oude-woning-vecht-architect-verbouw.jpg',
  ],

  snapshot,
};
