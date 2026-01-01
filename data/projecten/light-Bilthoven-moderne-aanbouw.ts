import type { ProjectDetail } from '../types';

export const Bilthovenjaren30aanbouw: ProjectDetail = {
  slug: 'light-Bilthoven-verbouw-aanbouw-jaren30',

  title: 'Aanbouw/verbouw woning Bilthoven',
  subtitle:
    'Uitbreiding van een woning waarbij ook de woning zelf grondig aangepakt wordt zodat alles weer voldoet aan de huidige comfort-eisen. De uitbreiding vormt een contrast met de geslotenheid van de bestaande woning en geeft daardoor maximaal zicht op de fantastische tuin met vliegdennen.',
  locationLabel: 'Locatie: Bilthoven',
  tags: ['Nieuwbouw', 'Interieur', 'jaren dertig woning', 'Tuinkamer'],
  categories: ['Nieuwbouw', 'jaren30'],
  year: '2023',
  area: '212 m2',

  // Dit veld gebruik je straks om in PortfolioClient te sturen:
  // openMode: 'overlay' => overlay openen i.p.v. /portfolio/[slug]
  // (als je types dit veld nog niet kennen, voeg het later toe of gebruik "as any")
  openMode: 'overlay' as any,

  featuredImage: {
    url: 'https://www.zwijsen.net/wp-content/uploads/2020/03/Bilthoven-10.jpg',
    alt: 'Moderne aanbouw, verduurzaming en verbouw van een jaren dertig woning in Bilthoven.',
  },

  // 2–4 beelden is genoeg voor light projects
  heroImages: [
    { url: 'https://www.zwijsen.net/wp-content/uploads/2022/10/Moderne-aanbouw-en-verbouw-Bilthoven-architect-4.jpg', alt: 'Moderne aanbouw en verbouw Bilthoven architect 4' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2022/10/Moderne-aanbouw-en-verbouw-Bilthoven-architect-1.jpg', alt: 'De wit gepleisterde villa in Abcoude Land van Winkel, architect Jules Zwijsen.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2022/10/Moderne-aanbouw-en-verbouw-Bilthoven-architect-2.jpg', alt: 'kruislings verlijmd vurenhout als constructie van de woning' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2021/11/2023-01-23-10.39.27_resize.jpg', alt: 'Verbouw, verduurzaming en aanbouw van een jaren dertig woning in Bilthoven.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2022/10/Moderne-aanbouw-en-verbouw-Bilthoven-architect-5.jpg', alt: 'Verbouw, verduurzaming en aanbouw van een jaren dertig woning in Bilthoven.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2022/10/181_2160.jpg', alt: 'Verbouw, verduurzaming en aanbouw van een jaren dertig woning in Bilthoven.' },
    { url: '2022-10-31 11.32.29', alt: 'Verbouw, verduurzaming en aanbouw van een jaren dertig woning in Bilthoven.' }
  ]

  // Bewust géén:
  // - sections
  // - seo
  // - cta
};
