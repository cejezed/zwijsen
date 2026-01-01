import type { Metadata } from 'next';
import Script from 'next/script';
import { AanbouwWoningClient } from './AanbouwWoningClient';

const SITE_NAME = 'Zwijsen.net';
const BASE_URL = 'https://www.zwijsen.net';
const PAGE_PATH = '/aanbouw-woning';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;
const OG_IMAGE_URL = `${BASE_URL}/images/aanbouw/aanbouw-woning-og.jpg`;

const FAQ_SCHEMA = [
  {
    q: 'Kan een aanbouw schade veroorzaken aan mijn woning?',
    a: 'Ja, dat kan — vooral als fundering, draagstructuur en aansluitdetails onderschat worden. Daarom starten we met een technische reality check zodat de ingreep constructief geborgd is.',
  },
  {
    q: 'Heb ik een vergunning nodig voor een aanbouw?',
    a: 'Niet altijd. Sommige aanbouwen vallen binnen vergunningsvrije kaders, maar dat betekent niet “regelvrij”. Ook dan moet het plan voldoen aan o.a. omgevingsplan en constructieve eisen. Soms kan beleid bovendien extra ruimte geven.',
  },
  {
    q: 'Wat kost een aanbouw aan een woning?',
    a: 'De kosten worden vooral bepaald door funderingstype, doorbraken, staal/constructie, detaillering, isolatie-ambitie, installaties en afwerkingsniveau. We maken die kosten-drivers vroeg inzichtelijk zodat je niet later hoeft terug te ontwerpen.',
  },
  {
    q: 'Wanneer schakel ik een architect in?',
    a: 'Idealiter vóórdat je aannemers benadert. Dan kunnen we haalbaarheid, regelgeving en constructieve impact goed neerzetten en voorkom je dat je al vast zit aan een plan dat later niet klopt.',
  },
  {
    q: 'Hoe voorkom ik dat een aanbouw een “los blok” wordt?',
    a: 'Door te ontwerpen vanuit samenhang: routing, licht, zichtlijnen, materialisatie en de binnen-buitenrelatie. Zo verbetert de aanbouw de woning als geheel — in plaats van alleen meters toe te voegen.',
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Aanbouw woning – doordacht ontwerp zonder structuurschade | Architect',
  description:
    'Architect voor aanbouw aan woningen. Doordacht ontwerp met aandacht voor constructie, vergunningen en bestaande bouw. Voorkom schade, vertraging en kostenverrassingen.',
  alternates: {
    canonical: PAGE_PATH,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: SITE_NAME,
    title: 'Aanbouw woning – veilig en doordacht uitbreiden | Architect Jules Zwijsen',
    description:
      'Een aanbouw ontwerpen zonder risico op scheuren, verzakking of vergunningproblemen. Van schets tot uitvoering met grip op constructie, regels en kosten.',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Aanbouw woning ontworpen door architect Jules Zwijsen',
      },
    ],
  },
};

export default function AanbouwWoningPage() {
  return (
    <>
      <Script id="schema-aanbouw-woning" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              '@id': `${BASE_URL}#organization`,
              name: 'Architectenbureau Jules Zwijsen',
              url: BASE_URL,
            },
            {
              '@type': 'WebSite',
              '@id': `${BASE_URL}#website`,
              url: BASE_URL,
              name: SITE_NAME,
              publisher: { '@id': `${BASE_URL}#organization` },
            },
            {
              '@type': 'WebPage',
              '@id': `${PAGE_URL}#webpage`,
              url: PAGE_URL,
              name: 'Aanbouw woning',
              isPartOf: { '@id': `${BASE_URL}#website` },
              about: { '@id': `${PAGE_URL}#service` },
              primaryImageOfPage: { '@id': `${PAGE_URL}#primaryimage` },
            },
            {
              '@type': 'ImageObject',
              '@id': `${PAGE_URL}#primaryimage`,
              url: OG_IMAGE_URL,
              width: 1200,
              height: 630,
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${PAGE_URL}#breadcrumb`,
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: `${BASE_URL}/`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Aanbouw woning',
                  item: PAGE_URL,
                },
              ],
            },
            {
              '@type': 'Service',
              '@id': `${PAGE_URL}#service`,
              name: 'Aanbouw woning architect',
              description:
                'Architectonische begeleiding bij aanbouwen aan bestaande woningen, met focus op constructieve veiligheid, vergunningen en integratie met de bestaande woning.',
              provider: { '@id': `${BASE_URL}#organization` },
              serviceType: 'Architectural Design',
              areaServed: { '@type': 'Country', name: 'Nederland' },
              termsOfService: `${BASE_URL}/voorwaarden`,
            },
            {
              '@type': 'FAQPage',
              '@id': `${PAGE_URL}#faq`,
              mainEntity: FAQ_SCHEMA.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ],
        })}
      </Script>

      <AanbouwWoningClient />
    </>
  );
}
