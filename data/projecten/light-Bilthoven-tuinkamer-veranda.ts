import type { ProjectDetail } from '../types';

export const Bilthovenveranda: ProjectDetail = {
  slug: 'light-Bilthoven-tuinkamer-veranda',

  title: 'Berging met veranda Bilthoven',
  subtitle:
    'Een tuin met natuurlijke hoogteverschillen die eigenlijk nauwelijks benut worden... De gewenste schuur hebben we de heuvel ingeschoven zodat deze nauwelijks opvalt. Door het dak van de berging door te trekken ontstaat er een prachtige veranda waar het heerlijk buiten zitten is. De avondzon schijnt precies onder het zwevende dak door, de hete middagzon wordt door het dak tegengehouden. Het houten scherm zorgt voor rugdekking en belemmert ook het zicht op een ruimte die toch ook wel erg fijn is: achter in de tuin is plek voor opslag van hout en ander materiaal zonder dat dat hinderlijk in het zicht staat.',
  locationLabel: 'Locatie: Bilthoven',
  tags: ['Nieuwbouw', 'veranda', 'jaren dertig woning', 'Tuinkamer'],
  categories: ['Nieuwbouw', 'veranda'],
  year: '2015',
  area: '50 m2',

  // Dit veld gebruik je straks om in PortfolioClient te sturen:
  // openMode: 'overlay' => overlay openen i.p.v. /portfolio/[slug]
  // (als je types dit veld nog niet kennen, voeg het later toe of gebruik "as any")
  openMode: 'overlay' as any,

  featuredImage: {
    url: 'https://www.zwijsen.net/wp-content/uploads/2015/04/veranda_resize.jpg',
    alt: 'In de tuin opgenomen berging met tuinkamer onder overkragende overkapping.',
  },

  // 2–4 beelden is genoeg voor light projects
  heroImages: [
    { url: 'https://www.zwijsen.net/wp-content/uploads/2016/12/Sketch183201737.jpg', alt: 'Moderne aanbouw en verbouw Bilthoven architect 4' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2016/12/perspectief-2.jpg', alt: 'De wit gepleisterde villa in Abcoude Land van Winkel, architect Jules Zwijsen.' }
  ]

  // Bewust géén:
  // - sections
  // - seo
  // - cta
};
