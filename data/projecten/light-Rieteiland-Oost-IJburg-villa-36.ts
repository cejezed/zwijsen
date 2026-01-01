import type { ProjectDetail } from '../types';

export const villareo36: ProjectDetail = {
  slug: 'light-rieteiland-oost-ijburg-villa-36',

  title: 'Houten villa Rieteiland Oost IJburg',
  subtitle:
    'Op deze manier ontstaan op de kavel verschillende plekken die beschut, bezond of open liggen en daardoor een divers gebruik mogelijk maken. Op de 2e verdieping bevindt zich de hoofdslaapkamer die door middel van een groot raam uitzicht heeft op het verderop gelegen Amsterdam en het naastgelegen Diemerpark. De woning is volledig ingericht op aanpasbaar bouwen en is daarom overal toegankelijk voor een rolstoel. Hierdoor is ook de levensloop-bestendigheid van de woning verzekerd. De materialisatie van de woning bestaat uit een vergrijsde houten bekleding in combinatie met grote gevelopeningen op strategische plekken die zorgen voor een rustig maar afwisselend beeld. De wanden en vloeren zijn gemaakt van massieve vurenhouten platen in diverse diktes. Deze bepalen in grote mate ook het interieur en wooncomfort van de woning',
  locationLabel: 'Locatie: Rieteiland Oost IJburg',
  tags: ['Nieuwbouw', 'Interieur', 'Hout', 'CLT bouwsysteem'],
  categories: ['nieuwbouw'],
  year: '2013',
  area: '215 m2',

  // Dit veld gebruik je straks om in PortfolioClient te sturen:
  // openMode: 'overlay' => overlay openen i.p.v. /portfolio/[slug]
  // (als je types dit veld nog niet kennen, voeg het later toe of gebruik "as any")
  openMode: 'overlay' as any,

  featuredImage: {
    url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-11.jpg',
    alt: 'woning op het rieteiland oost Amsterdam IJburg, opgebouwd in prefab cross laminated timber.',
  },

  // 2–4 beelden is genoeg voor light projects
  heroImages: [
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-05.jpg', alt: 'abcoude kavel architect moderne woning land van winkel vv' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-06.jpg', alt: 'De wit gepleisterde villa in Abcoude Land van Winkel, architect Jules Zwijsen.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-07.jpg', alt: 'kruislings verlijmd vurenhout als constructie van de woning' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-09.jpg', alt: 'Detail maatwerk en materiaalovergang' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-10.jpg', alt: 'Detail maatwerk en materiaalovergang' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-03.jpg', alt: 'prefab clt opbouw klh oostenrijk' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/modern-houten-huis-klh-04.jpg', alt: 'clt hout in het zicht' }

  ]

  // Bewust géén:
  // - sections
  // - seo
  // - cta
};
