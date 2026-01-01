import type { ProjectDetail } from '../types';

export const villareo16: ProjectDetail = {
  slug: 'light-rieteiland-oost-ijburg-villa-16',

  title: 'Waterkant villa Rieteiland Oost IJburg',
  subtitle:
    'De kavel is gelegen op de noordzijde van het Rieteiland Oost. De plattegrond van de woning heeft een T-vorm waardoor er maximaal gebruik gemaakt wordt van het uitzicht op het water en de hoogwaardige openbare ruimte aan de voorzijde van de woning. De keuken vormt op de begane grond de spil van de plattegrond met aangrenzend de entree, woonkamer en de eetkamer aan de waterzijde. De woonkamer ligt midden in de tuin en heeft daardoor zicht op de hele kavel en een ideale bezonning. De eetkamer en het aangrenzende buitenterras liggen verhoogd om zo het uitzicht op het weidse water mogelijk te maken, over de door de gemeente aan te leggen natuurlijke erfafscheiding. Op de 2e verdieping bevindt zich een werk-/kantoorruimte met aan de noord- en zuidzijde dakterrassen, bereikbaar via grote schuifpuien. De openingen in de gevel zijn zo geplaatst dat de zichtlijnen op het eiland, de tuin en het water zoveel mogelijk benut worden, zonder last te hebben van teveel opwarming door de zon.',
  locationLabel: 'Locatie: Rieteiland Oost IJburg',
  tags: ['waterkant'],
  categories: ['nieuwbouw'],
  year: '2013',
  area: '215 m2',

  // Dit veld gebruik je straks om in PortfolioClient te sturen:
  // openMode: 'overlay' => overlay openen i.p.v. /portfolio/[slug]
  // (als je types dit veld nog niet kennen, voeg het later toe of gebruik "as any")
  openMode: 'overlay' as any,

  featuredImage: {
    url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_3923_resize.jpg',
    alt: 'woning op het rieteiland oost Amsterdam IJburg, gelegen aan de waterkant en uitgevoerd in metselwerk.',
  },

  // 2–4 beelden is genoeg voor light projects
  heroImages: [
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-woning-rieteiland-oost-05.jpg', alt: 'moderne woning rieteiland oost 05' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-woning-rieteiland-oost-06.jpg', alt: 'moderne woning rieteiland oost 06' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-woning-rieteiland-oost-08.jpg', alt: 'kruislings verlijmd vurenhout als constructie van de woning' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-woning-rieteiland-oost-02.jpg', alt: 'Detail maatwerk en materiaalovergang' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-woning-rieteiland-oost-03.jpg', alt: 'Detail maatwerk en materiaalovergang' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-woning-rieteiland-oost-09.jpg', alt: 'prefab clt opbouw klh oostenrijk' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-woning-rieteiland-oost-04.jpg', alt: 'clt hout in het zicht' }
  ],

  // Bewust geen:
  // - sections
  // - seo
  // - cta
};
