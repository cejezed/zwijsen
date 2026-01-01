import type { ProjectDetail } from '../types';

export const warmehand: ProjectDetail = {
  slug: 'light-nieuwersluis-warme-hand',

  title: 'Verbouw woning Nieuwersluis De Warme Hand',
  subtitle:
    'Een woning met een geschiedenis die ver terug gaat in de tijd, als herberg begonnen en als verwaarloosde woning weer hersteld. Door slim gebruik te maken van de vrijstellingen in het bestemmingsplan is de woning aan de achterzijde voorzien van een prachtige ruimte woon- en eetkamer met grote glazen puien die prachtig uitzicht geven op het achtergelegen Zwemlust en de vergezichten. Door de kap van de woning door te trekken en de zijkant opnieuw op te bouwen is er een ruime woning ontstaan die volledig aangepast is aan de comforteisen van de huidige tijd. .',
  locationLabel: 'Locatie: Nieuwersluis aan de Vecht',
  tags: ['waterkant'],
  categories: ['verbouw'],
  year: '2021',
  area: '261 m2',

  // Dit veld gebruik je straks om in PortfolioClient te sturen:
  // openMode: 'overlay' => overlay openen i.p.v. /portfolio/[slug]
  // (als je types dit veld nog niet kennen, voeg het later toe of gebruik "as any")
  openMode: 'overlay' as any,

  featuredImage: {
    url: 'https://www.zwijsen.net/wp-content/uploads/2021/11/2024-10-22-08.53.51_resize.jpg',
    alt: 'Rigoreus verbouwde en uitgebreide woning Nieuwersluis De Warme Hand.',
  },

  // 2–4 beelden is genoeg voor light projects
  heroImages: [
    { url: 'https://www.zwijsen.net/wp-content/uploads/2021/11/2023-03-13-16.59.12_resize.jpg', alt: 'moderne woning rieteiland oost 05' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2021/11/2023-03-13-17.00.15_resize.jpg', alt: 'moderne woning rieteiland oost 06' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2022/10/pers-tuin.jpg', alt: 'kruislings verlijmd vurenhout als constructie van de woning' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2022/10/pers-straat.jpg', alt: 'Detail maatwerk en materiaalovergang' }
  ],

  // Bewust geen:
  // - sections
  // - seo
  // - cta
};
