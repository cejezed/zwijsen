import type { ProjectDetail } from '../types';

export const villaabcoude: ProjectDetail = {
  slug: 'light-abcoude-land-van-winkel-villa',

  title: 'Light villa Abcoude',
  subtitle:
    'Dure grond, strenge stedenbouwkundige eisen, geen gasaansluiting en lastige hypotheekverstrekkers maken dat tot een ware uitdaging… Maar beperkingen leiden vaak tot bijzondere oplossingen!',
  locationLabel: 'Locatie: Abcoude Land van Winkel',
  tags: ['Nieuwbouw', 'Interieur', 'Licht & zichtlijnen'],
  categories: ['nieuwbouw'],
  year: '2015',
  area: '235 m2',

  // Dit veld gebruik je straks om in PortfolioClient te sturen:
  // openMode: 'overlay' => overlay openen i.p.v. /portfolio/[slug]
  // (als je types dit veld nog niet kennen, voeg het later toe of gebruik "as any")
  openMode: 'overlay' as any,

  featuredImage: {
    url: 'https://www.zwijsen.net/wp-content/uploads/2015/05/abcoude-kavel-architect-moderne-woning_resize.jpg',
    alt: 'Karakteristieke moderne wit gestucte villa met natuursteen accenten.',
  },

  // 2–4 beelden is genoeg voor light projects
  heroImages: [
    { url: 'https://www.zwijsen.net/wp-content/uploads/2015/05/abcoude-kavel-architect-moderne-woning-land-van-winkel.jpg', alt: 'abcoude kavel architect moderne woning land van winkel vv' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2015/05/abcoude-kavel-architect-moderne-woning-land-van-winkel-vv.jpg', alt: 'De wit gepleisterde villa in Abcoude Land van Winkel, architect Jules Zwijsen.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2015/05/abcoude-kavel-architect-moderne-woning-land-van-winkel-tuin.jpg', alt: 'Detail maatwerk en materiaalovergang' }

  ]

  // Bewust géén:
  // - sections
  // - seo
  // - cta
};
