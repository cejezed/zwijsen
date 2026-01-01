import type { Metadata } from 'next';
import Script from 'next/script';
import { VerbouwingWoningClient } from './VerbouwingWoningClient';

const BASE_URL = 'https://www.zwijsen.net';
const CANONICAL = `${BASE_URL}/verbouwing-woning`;

export const metadata: Metadata = {
  title: 'Verbouwing woning | Architect met grip op risico, kosten & vergunning',
  description:
    'Verbouwing woning met architect: voorkom verrassingen met duidelijke keuzes, goede detaillering en slimme vergunningstrategie. Gratis quickscan of kennismaking.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'website',
    url: CANONICAL,
    title: 'Verbouwing woning | Architect met grip op risico, kosten & vergunning',
    description:
      'Verbouwen zonder bouwstress: heldere keuzes, technische zekerheid en een vergunningstrategie die werkt. Start met een gratis quickscan.',
    images: [
      {
        url: `${BASE_URL}/images/verbouwing/verbouwing-woning-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Verbouwing woning – architect voor doordachte renovatie en uitbreiding',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verbouwing woning | Architect met grip op risico, kosten & vergunning',
    description:
      'Verbouwen zonder verrassingen. Duidelijke keuzes, technische samenhang en een werkende vergunningstrategie.',
    images: [`${BASE_URL}/images/verbouwing/verbouwing-woning-og.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Verbouwing woning',
        item: CANONICAL,
      },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Architectuur & ontwerpbegeleiding voor woningverbouwing',
    name: 'Verbouwing woning – architect',
    provider: {
      '@type': 'ProfessionalService',
      name: 'Architectenbureau Jules Zwijsen',
      url: BASE_URL,
      areaServed: 'NL',
    },
    url: CANONICAL,
    description:
      'Architectuur, ontwerp, vergunning en bouwbegeleiding voor woningverbouwingen: van eerste analyse en Programma van Eisen tot uitvoeringsgereed ontwerp.',
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Heb ik een vergunning nodig voor een verbouwing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Soms kan (een deel) vergunningsvrij, maar “vergunningsvrij” is niet “regelvrij”. Ook dan gelden technische eisen (Bbl), burenrecht en vaak welstand. In een quickscan bepalen we welke route het meest zeker is.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wanneer schakel ik het beste een architect in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Het liefst vóórdat je offertes opvraagt. Dan sturen we eerst op indeling, haalbaarheid, constructie en regelgeving, zodat aannemers hetzelfde uitgangspunt prijzen en je minder verrassingen krijgt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat kost een woningverbouwing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'De kosten hangen vooral af van doorbraken, fundering, installaties, isolatie-ambities en afwerkingsniveau. We maken vroeg inzichtelijk welke keuzes de grootste kostendrivers zijn, zodat je kunt prioriteren.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kunnen er scheuren of verzakkingen ontstaan door een verbouwing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Ja, vooral bij onderschatting van de bestaande bouw: fundering, draagstructuur en aansluitdetails. Daarom toetsen we constructie en detaillering vroeg en leggen we het eenduidig vast voor de uitvoering.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe voorkom ik gedoe met welstand of monumenten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Door vroeg te toetsen, een helder verhaal te bouwen en de juiste vormtaal te kiezen (geen “boter-nog-vis”). Bij complexe situaties werkt vooroverleg of een omgevingstafel vaak het snelst.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="ld-breadcrumbs-verbouwing-woning"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <Script
        id="ld-service-verbouwing-woning"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <Script
        id="ld-faq-verbouwing-woning"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <VerbouwingWoningClient />
    </>
  );
}
