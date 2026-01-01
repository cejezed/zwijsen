import type { ProjectDetail } from '../types';

export const Muidendijkwoning: ProjectDetail = {
  slug: 'light-Muiden-dijkwoning',

  title: 'Nieuwbouw dijkwoning in Muiden',
  subtitle:
    'Op een prachtig stukje zuiderzeeroute is een bestaand dijkhuis vervangen door een nieuwe. De kenmerkende eigenschap van bouwen op de dijk en het prachtige uitzicht over het IJmeer en weilanden hebben het ontwerp van de woning bepaald. De woning staat verankert in de dijk door een in de dijk geschoven plint met daarop een gemetseld huis. Door het maken van een souterrain ,dat aan de straatzijde half verdiept ligt, ontstaat een verhoogde woonverdieping. Door deze verhoging is er meer privacy richting de drukke dijk die onderdeel vormt van de zuiderzeeroute. Daarnaast ontstaat op deze manier de mogelijkheid om net over de dijk te kijken en aan de andere kant om ver het landschap in te kijken ter plekke van de tuinkamer aan de zuidzijde. Op de dakverdieping is de noordwest zijde bepaald door een zitkamer met een fantastisch uitzicht richting Amsterdam en over het IJmeer. De entreehal heeft extra hoogte en is daardoor de statige ontvangsthal vanwaaruit de woonverdieping en de slaapverdieping in het souterrain bereikbaar zijn. Het beeld van de woning is robuust en in zijn uitstraling terughoudend. Op die manier ontstaat er een interessante relatie tussen het naastgelegen rijksmomument. Door ver terugliggende kozijnen met hedendaagse luiken en slank gedetailleerde dakkapellen krijgt de woning een kasteelachtige uitstraling. Op strategische plekken zijn er openingen in de gevel om op die manier ten volle te kunnen genieten van het prachtige omringende landschap.',
  locationLabel: 'Locatie: Buitengebied Muiden',
  tags: ['Nieuwbouw', 'Interieur', 'dijkwoning', 'Tuinkamer'],
  categories: ['Nieuwbouw', 'dijkwoning'],
  year: '2014',
  area: '275 m2',

  // Dit veld gebruik je straks om in PortfolioClient te sturen:
  // openMode: 'overlay' => overlay openen i.p.v. /portfolio/[slug]
  // (als je types dit veld nog niet kennen, voeg het later toe of gebruik "as any")
  openMode: 'overlay' as any,

  featuredImage: {
    url: 'https://www.zwijsen.net/wp-content/uploads/2014/11/2018-04-26-16.08.38_resize.jpg',
    alt: 'Verbouw van een stal bij een boerderij in Muiden.',
  },

  // 2–4 beelden is genoeg voor light projects
  heroImages: [
    { url: 'https://www.zwijsen.net/wp-content/uploads/2018/06/dijkwoning-muiden-nieuwbouw-architect-villa.jpg', alt: 'De glasachtige tuinkamer heeft prachtig uitzicht over de weilanden' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2014/11/2018-04-26-16.06.48_resize.jpg', alt: 'De wit gepleisterde villa in Abcoude Land van Winkel, architect Jules Zwijsen.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2014/11/2018-04-26-16.02.46_resize.jpg', alt: 'kruislings verlijmd vurenhout als constructie van de woning' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2014/11/2018-04-26-15.51.22_resize.jpg', alt: 'Detail maatwerk en materiaalovergang' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2014/11/2018-04-26-15.46.20_resize.jpg', alt: 'Detail maatwerk en materiaalovergang' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2014/11/2018-04-26-16.11.49_resize.jpg', alt: 'prefab clt opbouw klh oostenrijk' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2014/11/2018-04-26-16.09.04_resize.jpg', alt: 'clt hout in het zicht' }

  ]

  // Bewust géén:
  // - sections
  // - seo
  // - cta
};
