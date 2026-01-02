import type { Project, ProjectSnapshot } from '../types';

const snapshot: ProjectSnapshot = {
  idea: 'Vergunningsvrij bouwen inzetten om een jaren-30 woning licht, ruim en logisch te maken.',
  extendedDescription:
    'Door slim gebruik te maken van vergunningsvrije regels werd de kleine jaren-30 woning uitgebreid. Naast de achterzijde is ook de zijkant benut, met daklichten en schuifdeuren voor flexibele indeling en sterke zichtlijnen. Eigen uitvoering in fijn timmerwerk geeft de verbouwing een rustige, moderne uitstraling.',
  logic: [
    { type: 'vraag', text: 'Hoe vergroot je een compacte jaren-30 woning zonder veel bestemmingsruimte?' },
    { type: 'pijn', text: 'Beperkte footprint en donkere gang; risico op versnipperde ruimtes.' },
    { type: 'oplossing', text: 'Zij-uitbreiding plus achteruitbouw, strategische daklichten en schuifdeuren voor flexibele zonering.' },
    { type: 'opbrengst', text: 'Meer licht, ruimtelijke schakering en moderne uitstraling met behoud van karakter.' },
  ],
  yield: [
    'Slim benutten van vergunningsvrij bouwen voor extra ruimte.',
    'Daglicht via daklichten en lange zichtlijnen in gang en leefruimtes.',
    'Rustige, moderne materialisatie door eigen afwerking.',
  ],
};

export const Bilthovenjaren30: Project = {
  id: 9101,
  title: 'Verbouw jaren 30 woning Bilthoven',
  location: 'Bilthoven',
  slug: 'light-Bilthoven-verbouw-aanbouw-jaren-dertig',

  openMode: 'overlay',
  typology: 'Verbouw & aanbouw',

  image: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-10.jpg',
  size: 'landscape',
  year: '2013',
  area: '275 m2',
  tag: 'Verbouw',
  description:
    'Jaren-30 woning uitgebouwd aan zij- en achterzijde met daklichten en flexibele indeling; modern en licht zonder bestemmingswijziging.',

  gallery: [
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-13.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-14.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-01.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-04.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-05.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-11.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-06.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-07.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-08.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-09.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-12.jpg',
  ],

  snapshot,
};
