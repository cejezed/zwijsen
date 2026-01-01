import type { ProjectDetail } from '../types';

export const villavleuten: ProjectDetail = {
  slug: 'light-vleuten-villa',

  title: 'villa Vleuten',
  subtitle:
    'Door slim gebruik te maken van de regelgeving in het bestemmingsplan gebruiken we de woning als een schild tussen de voor- en achterzijde. De uitbouwen aan beide zijde van de woning zijn daarbij integraal onderdeel van het geheel. Aan de oostzijde een prachtige eetkeuken met een hoog schuin dak en aan de westzijde de garage met overdekte doorgang naar de achtertuin. Ook binnen zorgt de aanbouw van de keuken voor een extra kwaliteit: vanuit de keuken is er zicht op de overloop op beide verdiepingen. Daarnaast zorgen strategisch geplaatste dakramen voor prachtig licht in de keuken en woonkamer.',
  locationLabel: 'Locatie: Vleuten De Meern',
  tags: ['Nieuwbouw', 'Interieur', 'Licht & zichtlijnen'],
  categories: ['nieuwbouw'],
  year: '2014',
  area: '245 m2',

  // Dit veld gebruik je straks om in PortfolioClient te sturen:
  // openMode: 'overlay' => overlay openen i.p.v. /portfolio/[slug]
  // (als je types dit veld nog niet kennen, voeg het later toe of gebruik "as any")
  openMode: 'overlay' as any,

  featuredImage: {
    url: '/images/projecten/modene-wit-villa-vleuten-de-meern-architect-jules-zwijsen-bouwgrond.webp',
    alt: 'Karakteristieke moderne wit gestucte villa met houten accenten.',
  },

  // 2–4 beelden is genoeg voor light projects
  heroImages: [
    { url: '/images/projecten/modene-wit-villa-vleuten-de-meern-architect-jules-zwijsen-bouwgrond.webp', alt: 'Een karakteristieke moderne wit gestucte villa met houten accenten.' },
    { url: '/images/projecten/modene-witte-villa-vleuten-de-meern-architect-jules-zwijsen-kavel.webp', alt: 'De wit gepleisterde villa in Vleuten De Meern, architect Jules Zwijsen.' },
    { url: '/images/utrecht/Villa-kavel-Vleuten-utrecht-architect.webp', alt: 'Detail maatwerk en materiaalovergang' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2014/05/IMG_0780_resize.jpg', alt: 'De wit gepleisterde villa in Vleuten De Meern, architect Jules Zwijsen.' }
  ]

  // Bewust géén:
  // - sections
  // - seo
  // - cta
};
