import type { ProjectDetail } from '../types';

export const Bilthovenjaren30: ProjectDetail = {
  slug: 'light-Bilthoven-verbouw-aanbouw-jaren30',

  title: 'Verbouw jaren dertig woning Bilthoven',
  subtitle:
    'Door de nieuwe regelgeving omtrent vergunningsvrij bouwen is het nu makkelijker om zonder invloed van gemeente of bestemmingsplan de woning uit te breiden. Zo ook bij de jaren 30 woning in Bilthoven; eigenlijk te klein om in te blijven wonen maar toch mooi genoeg om te zoeken naar oplossingen. Het gemaakte voorstel maakt handig gebruik van de mogelijkheden van vergunningsvrij bouwen aangezien het bestemmingsplan op deze plek weinig ruimte geeft.Door niet alleen de achterzijde te bebouwen maar ook het verloren gedeelte naast de woning ontstaat er een prachtige ruimte binnen. Met name de lange gang bij de entree is versterkt door het verlengen hiervan en toevoegen van strategische daklichten. Door een aantal schuifdeuren is het mogelijk de woning op diverse manieren in te delen waardoor er een gewenste schakering kan ontstaan in privacy, openheid, ruimte, licht en zichtlijnen. Opdrachtgever en bewoner John is beroepsmatig met fijn timmerwerk bezig, dus de uitvoering ervan is in eigen beheer gedaan. Oog voor detail en combinaties van kleuren en materialen hebben geresulteerd in een rustig en modern vormgegeven geheel.',
  locationLabel: 'Locatie: Bilthoven',
  tags: ['Nieuwbouw', 'Interieur', 'jaren dertig woning', 'Tuinkamer'],
  categories: ['Nieuwbouw', 'jaren30'],
  year: '2013',
  area: '275 m2',

  // Dit veld gebruik je straks om in PortfolioClient te sturen:
  // openMode: 'overlay' => overlay openen i.p.v. /portfolio/[slug]
  // (als je types dit veld nog niet kennen, voeg het later toe of gebruik "as any")
  openMode: 'overlay' as any,

  featuredImage: {
    url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-10.jpg',
    alt: 'Verbouw, verduurzaming en aanbouw van een jaren dertig woning in Bilthoven.',
  },

  // 2–4 beelden is genoeg voor light projects
  heroImages: [
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-13.jpg', alt: 'De glasachtige tuinkamer heeft prachtig uitzicht over de weilanden' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-14.jpg', alt: 'De wit gepleisterde villa in Abcoude Land van Winkel, architect Jules Zwijsen.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-01.jpg', alt: 'kruislings verlijmd vurenhout als constructie van de woning' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-04.jpg', alt: 'Verbouw, verduurzaming en aanbouw van een jaren dertig woning in Bilthoven.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-05.jpg', alt: 'Verbouw, verduurzaming en aanbouw van een jaren dertig woning in Bilthoven.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-11.jpg', alt: 'Verbouw, verduurzaming en aanbouw van een jaren dertig woning in Bilthoven.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-06.jpg', alt: 'Verbouw, verduurzaming en aanbouw van een jaren dertig woning in Bilthoven.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-07.jpg', alt: 'Verbouw, verduurzaming en aanbouw van een jaren dertig woning in Bilthoven.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-08.jpg', alt: 'Verbouw, verduurzaming en aanbouw van een jaren dertig woning in Bilthoven.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-09.jpg', alt: 'Verbouw, verduurzaming en aanbouw van een jaren dertig woning in Bilthoven.' },
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-verbouw-en-aanbouw-jaren-dertig-woning-12.jpg', alt: 'Verbouw, verduurzaming en aanbouw van een jaren dertig woning in Bilthoven.' }
  ]

  // Bewust géén:
  // - sections
  // - seo
  // - cta
};
