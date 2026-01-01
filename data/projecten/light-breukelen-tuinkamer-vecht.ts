import type { ProjectDetail } from '../types';

export const Breukelentuinkamer: ProjectDetail = {
  slug: 'light-Breukelen-tuinkamer-vecht',

  title: 'Aanbouw woning aan de Vecht',
  subtitle:
    'De woning is van binnen geheel verduurzaamd en op een strategische plek aan de Vecht voorzien van een nieuwe tuinkamer. Die tuinkamer vormt de eetkamer en betrekt op die manier op een indrukwekkende manier de tuin en de vergezichten over de Vecht in de woning. Een eenvoudige ingreep met groots effect.',
  locationLabel: 'Locatie: Breukelen',
  tags: ['Nieuwbouw', 'veranda', 'jaren dertig woning', 'Tuinkamer'],
  categories: ['Nieuwbouw', 'veranda'],
  year: '2022',
  area: '50 m2',

  // Dit veld gebruik je straks om in PortfolioClient te sturen:
  // openMode: 'overlay' => overlay openen i.p.v. /portfolio/[slug]
  // (als je types dit veld nog niet kennen, voeg het later toe of gebruik "as any")
  openMode: 'overlay' as any,

  featuredImage: {
    url: 'https://www.zwijsen.net/wp-content/uploads/2021/10/20220120_125203_resize.jpg',
    alt: 'In de tuin opgenomen berging met tuinkamer onder overkragende overkapping.',
  },

  // 2–4 beelden is genoeg voor light projects
  heroImages: [
    { url: 'https://www.zwijsen.net/wp-content/uploads/2021/03/moderne-aanbouw-oude-woning-vecht-architect-verbouw.jpg', alt: 'Moderne aanbouw en verbouw Bilthoven architect 4' }
  ]

  // Bewust géén:
  // - sections
  // - seo
  // - cta
};
