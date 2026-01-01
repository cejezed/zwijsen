import type { ProjectDetail } from '../types';

export const villareo59: ProjectDetail = {
  slug: 'light-rieteiland-oost-ijburg-villa-59',

  title: 'villa Rieteiland Oost IJburg',
  subtitle:
    'Op een van de laatste kavels staat deze woning die optimaal gebruik maakt van de plek. Een diepe keuken met veranda en schuur blokkeren het zicht op een minder fraai uitzicht schuin achter. Als een van de weinige kavels schuift de woning wat dichter op de straat: door het hoge volume valt deze daardoor extra op. De woonkamer en slaapkamers zijn zodanig geplaatst dat de zichtlijnen tussen de andere woningen door richting het water en groen optimaal benut worden.',
  locationLabel: 'Locatie: Rieteiland Oost IJburg',
  tags: ['Nieuwbouw', 'Interieur', 'Licht & zichtlijnen'],
  categories: ['nieuwbouw'],
  year: '2015',
  area: '215 m2',

  // Dit veld gebruik je straks om in PortfolioClient te sturen:
  // openMode: 'overlay' => overlay openen i.p.v. /portfolio/[slug]
  // (als je types dit veld nog niet kennen, voeg het later toe of gebruik "as any")
  openMode: 'overlay' as any,

  featuredImage: {
    url: 'https://www.zwijsen.net/wp-content/uploads/2015/04/Rieteiland-oost-kavel-architect-moderne-woning.jpg',
    alt: 'woning op het rieteiland oost Amsterdam IJburg, gevelcombinatie beplating en houten delen.',
  },

  // 2–4 beelden is genoeg voor light projects
  heroImages: [
    { url: 'https://www.zwijsen.net/wp-content/uploads/2015/06/IMG_3918_resize.jpg', alt: 'abcoude kavel architect moderne woning land van winkel vv' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2015/04/Rieteiland-oost-kavel-architect-moderne-woning-vv.jpg', alt: 'De wit gepleisterde villa in Abcoude Land van Winkel, architect Jules Zwijsen.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2015/06/2017-03-23-09.47.33_resize.jpg', alt: 'Detail maatwerk en materiaalovergang' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2015/06/IMG_3927_resize.jpg', alt: 'Detail maatwerk en materiaalovergang' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2015/06/2017-03-23-09.47.29_resize.jpg', alt: 'Detail maatwerk en materiaalovergang' }

  ]

  // Bewust géén:
  // - sections
  // - seo
  // - cta
};
