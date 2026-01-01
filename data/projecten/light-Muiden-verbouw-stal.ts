import type { ProjectDetail } from '../types';

export const Muidenstal: ProjectDetail = {
  slug: 'light-Muiden-verbouw-stal',

  title: 'Verbouw stal bij boerderij in Muiden',
  subtitle:
    'Op het erf van een voormalig boerenbedrijf is de bestaande stal vervangen door een woonschuur: op deze manier wordt het klassieke voorhuis uitgebreid met een riante woonkeuken, slaapkamers en een “uitzichtkamer”. De woning ligt op een prachtige plek met uitzicht op het IJmeer, het kasteel van Muiden en vergezichten over de weilanden.De vormgeving verwijst naar de voormalige schuurfunctie van het bouwdeel. Privacy, zonwering en opwekking van energie zijn opgenomen in het beeldbepalende dak. De achterstal en het grootste gedeelte van de stal zijn gesloopt. Helaas waren ook de gebinten in de stal niet meer van voldoende kwaliteit om hand te haven dus er is voor gekozen om nieuwe eikenhouten gebinten te laten maken. Bijkomend voordeel van deze nieuwe gebinten is dat er ook meer vrijheid ontstaat in de hoogte van de verdiepingsvloer. In de nieuwe stalruimte bevindt zich een ruimte eetkeuken, die in verbinding staat met een serre aan de zuidkant. Die serre vormt een overgang tussen binnen- en buiten en dient als buffer voor de warme en koude dagen. Aan de achterzijde van de stal is een tuinkamer toegevoegd die een prachtig uitzicht over de achtergelegen weilanden mogelijk maakt. Ook hier zijn de eikenhouten gebinten beeldbepalend, nu echter aan de buitenzijde. ',
  locationLabel: 'Locatie: Buitengebied Muiden',
  tags: ['Verbouw', 'Interieur', 'Boerderij', 'Tuinkamer'],
  categories: ['Aanbouw', 'Verbouw', 'Boerderij' ],
  year: '2014',
  area: '215 m2',

  // Dit veld gebruik je straks om in PortfolioClient te sturen:
  // openMode: 'overlay' => overlay openen i.p.v. /portfolio/[slug]
  // (als je types dit veld nog niet kennen, voeg het later toe of gebruik "as any")
  openMode: 'overlay' as any,

  featuredImage: {
    url: 'https://www.zwijsen.net/wp-content/uploads/2014/05/WP_20170831_001.jpg',
    alt: 'Verbouw van een stal bij een boerderij in Muiden.',
  },

  // 2–4 beelden is genoeg voor light projects
  heroImages: [
    { url: 'https://www.zwijsen.net/wp-content/uploads/2014/05/DJI_0029_resize.jpg', alt: 'De glasachtige tuinkamer heeft prachtig uitzicht over de weilanden' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_0286_resize1.jpg', alt: 'De wit gepleisterde villa in Abcoude Land van Winkel, architect Jules Zwijsen.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_0279_resize1.jpg', alt: 'kruislings verlijmd vurenhout als constructie van de woning' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_0288_resize1.jpg', alt: 'Detail maatwerk en materiaalovergang' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_9377_resize.jpg', alt: 'Detail maatwerk en materiaalovergang' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_0283_resize1.jpg', alt: 'prefab clt opbouw klh oostenrijk' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_0275_resize1.jpg', alt: 'clt hout in het zicht' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_0277_resize1.jpg', alt: 'Detail maatwerk en materiaalovergang' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_0287_resize1.jpg', alt: 'prefab clt opbouw klh oostenrijk' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2014/05/DJI_0033_resize.jpg', alt: 'clt hout in het zicht' }

  ]

  // Bewust géén:
  // - sections
  // - seo
  // - cta
};
