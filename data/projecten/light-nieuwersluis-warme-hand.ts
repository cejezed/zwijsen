import type { Project, ProjectSnapshot } from '../types';

const snapshot: ProjectSnapshot = {
  idea: 'Een historisch huis transformeren met een royale uitbouw en uitzicht op Zwemlust.',
  extendedDescription:
    'Ooit herberg, later verwaarloosd: De Warme Hand kreeg een grondige verbouw. Met slimme vrijstellingen in het bestemmingsplan is achter een ruime woon- en eetkamer toegevoegd met grote glazen puien richting Zwemlust. De kap is doorgetrokken en de zijkant opnieuw opgebouwd voor meer ruimte en modern comfort.',
  logic: [
    { type: 'vraag', text: 'Hoe maak je een karaktervolle maar verouderde woning ruim en licht zonder het verleden te verliezen?' },
    { type: 'pijn', text: 'Beperkte ruimte en comfort; weinig zicht op het water en vergezichten.' },
    { type: 'oplossing', text: 'Ruime uitbouw aan de achterzijde met grote puien; kap doortrekken en zijkant vernieuwen voor extra ruimte en comfort.' },
    { type: 'opbrengst', text: 'Lichte woon/eetkamer met uitzicht, moderne comforteisen en een logisch volume.' },
  ],
  yield: [
    'Woon/eetkamer met panoramische puien richting Zwemlust.',
    'Vergroot volume door kap en zijopbouw, passend bij de historie.',
    'Comfort op modern niveau zonder het karakter te verliezen.',
  ],
};

export const warmehand: Project = {
  id: 9301,
  title: 'Verbouw woning Nieuwersluis “De Warme Hand”',
  location: 'Nieuwersluis aan de Vecht',
  slug: 'light-nieuwersluis-warme-hand',

  openMode: 'overlay',
  typology: 'Verbouw & uitbouw',

  image: 'https://www.zwijsen.net/wp-content/uploads/2021/11/2024-10-22-08.53.51_resize.jpg',
  size: 'landscape',
  year: '2021',
  area: '261 m2',
  tag: 'Verbouw',
  description:
    'Rigoureuze verbouwing met royale uitbouw en grote puien naar Zwemlust; historisch huis met modern comfort en zichtlijnen.',

  gallery: [
    'https://www.zwijsen.net/wp-content/uploads/2021/11/2024-10-22-08.53.51_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2021/11/2023-03-13-16.59.12_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2021/11/2023-03-13-17.00.15_resize.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2022/10/pers-tuin.jpg',
    'https://www.zwijsen.net/wp-content/uploads/2022/10/pers-straat.jpg',
  ],

  snapshot,
};
