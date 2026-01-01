import type { ProjectDetail } from '../types';

export const Breukelenaanbouw: ProjectDetail = {
  slug: 'light-Breukelen-aanbouw-villa',

  title: 'Aanbouw villa aan de Vecht',
  subtitle:
    'De woning ligt op een prachtige locatie direct aan de rivier de Vecht waarbij de woonkamer panoramisch uitzicht geeft op de tuin en de Vecht. De bestaande woning had een groot woonoppervlak maar bood aan de binnenzijde nergens een ruim gevoel. Om hierin verandering te brengen is de woning aan de Vechtzijde vergroot door de gevel 2,9 meter op te schuiven richting de Vecht en de noordzijde. De keuken is van de straatzijde verplaatst naar de tuinzijde en staat in half-open verbinding met de vergrootte woonkamer. De vormgeving en maatvoering van de uitbreiding volgt het grid van de bestaande maatvoering (2,9x2,9m) en sluit aan bij de vormgeving van de bestaand woning. De gevels zijn maximaal open richting de Vecht waardoor een zeer licht interieur ontstaat met een prachtig uitzicht. Op deze manier is een moderne, ruimtelijke en lichte uitbreiding ontstaan die naadloos aansluit op de bestaande woning.',
  locationLabel: 'Locatie: Breukelen',
  tags: ['verbouw', 'aanbouw', 'jaren dertig woning', 'Tuinkamer'],
  categories: ['Verbouw', 'Aanbouw'],
  year: '2013',
  area: '350 m2',

  // Dit veld gebruik je straks om in PortfolioClient te sturen:
  // openMode: 'overlay' => overlay openen i.p.v. /portfolio/[slug]
  // (als je types dit veld nog niet kennen, voeg het later toe of gebruik "as any")
  openMode: 'overlay' as any,

  featuredImage: {
    url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-04.jpg',
    alt: 'Grote aanbouw van de villa aan de Vecht in Breukelen in de stijl van de originele woning.',
  },

  // 2–4 beelden is genoeg voor light projects
  heroImages: [
    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-07.jpg', alt: 'rote aanbouw van de villa aan de Vecht in Breukelen in de stijl van de originele woning' },
        { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-01.jpg', alt: 'rote aanbouw van de villa aan de Vecht in Breukelen in de stijl van de originele woning' },
            { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-02.jpg', alt: 'rote aanbouw van de villa aan de Vecht in Breukelen in de stijl van de originele woning' },
                { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-03.jpg', alt: 'rote aanbouw van de villa aan de Vecht in Breukelen in de stijl van de originele woning' },
                    { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-05.jpg', alt: 'rote aanbouw van de villa aan de Vecht in Breukelen in de stijl van de originele woning' },
                        { url: 'https://www.zwijsen.net/wp-content/uploads/2013/11/moderne-aanbouw-villa-06.jpg', alt: 'rote aanbouw van de villa aan de Vecht in Breukelen in de stijl van de originele woning' }
  ]

  // Bewust géén:
  // - sections
  // - seo
  // - cta
};
