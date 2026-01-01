import type { ProjectDetail } from '../types';

export const plantagehuis: ProjectDetail = {
  slug: 'light-plantagehuis-vreeland',

  title: 'Rijksmonument Plantagehuis Vreeland',
  subtitle:
    'Het plantagehuis in Vreeland heeft een nieuwe passende uitbreiding aan de tuinzijde gekregen. Dit rijksmonument wat al verschillende keren verbouwd en uitgebreid is, is voorzien van een transparante uitbouw die het interieur van de woning verbindt met het prachtige landschapspark langs de oude gekromde rivier de Vecht. De eetkamer is verplaatst naar deze zijde van de woning, de rest van het interieur is gerenoveerd en verduurzaamd.',
  locationLabel: 'Locatie: Vreeland stichtse vecht',
  tags: ['Aanbouw', 'Tuinkamer', 'Rijksmonument'],
  categories: ['aanbouw'],
  year: '2023',
  area: '40 m2',

  // Dit veld gebruik je straks om in PortfolioClient te sturen:
  // openMode: 'overlay' => overlay openen i.p.v. /portfolio/[slug]
  // (als je types dit veld nog niet kennen, voeg het later toe of gebruik "as any")
  openMode: 'overlay' as any,

  featuredImage: {
    url: 'https://www.zwijsen.net/wp-content/uploads/2024/08/2024-06-29-16.23.24.jpg',
    alt: 'Aanbouw tuinkamer bij rijksmonument Plantagehuis Vreeland.',
  },

  // 2–4 beelden is genoeg voor light projects
  heroImages: [
    { url: 'https://www.zwijsen.net/wp-content/uploads/2024/08/2024-06-29-16.23.20.jpg', alt: 'Aanbouw tuinkamer bij rijksmonument Plantagehuis Vreeland.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2024/08/2024-06-29-16.23.22.jpg', alt: 'Aanbouw tuinkamer bij rijksmonument Plantagehuis Vreeland, architect Jules Zwijsen.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2024/10/Schermafbeelding-2022-01-10-om-21.59.29.png', alt: 'Aanbouw tuinkamer bij rijksmonument Plantagehuis Vreeland' }
  ]

  // Bewust géén:
  // - sections
  // - seo
  // - cta
};
