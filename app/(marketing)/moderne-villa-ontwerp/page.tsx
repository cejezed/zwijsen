import type { Metadata } from "next";
import Script from "next/script";
import { ModerneVillaOntwerpClient } from "./ModerneVillaOntwerpClient";

const SITE_NAME = "Zwijsen.net";
const BASE_URL = "https://www.zwijsen.net";
const PAGE_PATH = "/moderne-villa-ontwerp";
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

// OG-afbeelding: public/images/villa/moderne-villa-ontwerp-og.jpg (1200x630)
const OG_IMAGE_URL = `${BASE_URL}/images/villa/moderne-villa-ontwerp-og.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Moderne villa ontwerpen | Architect voor tijdloze villa’s | Jules Zwijsen",
  description:
    "Moderne villa laten ontwerpen? Heldere lijnen, ruimtelijke rust en doordachte keuzes. Architect voor moderne villa’s met samenhang tussen ontwerp, gebruik en context.",
  alternates: {
    canonical: PAGE_PATH,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: SITE_NAME,
    title: "Moderne villa ontwerpen | Tijdloos en doordacht maatwerk | Jules Zwijsen",
    description:
      "Architect voor moderne villa’s. Ontwerpen met rust in keuzes, oog voor detail en respect voor locatie en gebruik.",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Moderne villa ontwerp door architect Jules Zwijsen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moderne villa ontwerpen | Jules Zwijsen",
    description: "Architect voor moderne villa’s met focus op rust, samenhang en kwaliteit.",
    images: [OG_IMAGE_URL],
  },
};

export default function ModerneVillaOntwerpPage() {
  return (
    <>
      <Script id="schema-moderne-villa-ontwerp" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${BASE_URL}#organization`,
              name: "Architectenbureau Jules Zwijsen",
              url: BASE_URL,
              logo: {
                "@type": "ImageObject",
                url: `${BASE_URL}/images/logo.png`,
              },
            },
            {
              "@type": "WebSite",
              "@id": `${BASE_URL}#website`,
              url: BASE_URL,
              name: SITE_NAME,
              publisher: {
                "@id": `${BASE_URL}#organization`,
              },
            },
            {
              "@type": "WebPage",
              "@id": `${PAGE_URL}#webpage`,
              url: PAGE_URL,
              name: "Moderne villa ontwerpen",
              isPartOf: {
                "@id": `${BASE_URL}#website`,
              },
              about: {
                "@type": "Service",
                "@id": `${PAGE_URL}#service`,
              },
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: OG_IMAGE_URL,
              },
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${PAGE_URL}#breadcrumb`,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: BASE_URL,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Moderne villa ontwerpen",
                  item: PAGE_URL,
                },
              ],
            },
            {
              "@type": "Service",
              "@id": `${PAGE_URL}#service`,
              name: "Moderne villa ontwerpen",
              description:
                "Architectonisch ontwerp van moderne villa’s met focus op ruimtelijke rust, samenhang, materialisatie en relatie met de omgeving.",
              provider: {
                "@id": `${BASE_URL}#organization`,
              },
              serviceType: "Architectural Design",
              areaServed: {
                "@type": "Country",
                name: "Nederland",
              },
            },
            {
              "@type": "FAQPage",
              "@id": `${PAGE_URL}#faq`,
              isPartOf: {
                "@id": `${PAGE_URL}#webpage`,
              },
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Wat wordt verstaan onder een moderne villa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Een moderne villa is geen vast stijlrecept, maar een manier van ontwerpen waarbij verhoudingen, licht, ruimte en materialisatie samenkomen in een rustig, samenhangend geheel. Niet strak om het strak zijn, maar helder omdat het past bij de plek en het dagelijks gebruik.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is een moderne villa altijd een woning met plat dak?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Nee. Moderne architectuur kan zowel een plat dak als een kap hebben. De kwaliteit zit vooral in heldere volumes, goede verhoudingen en een doordachte detailopbouw, niet in één specifiek daktype.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is een moderne villa duurder dan een traditionele villa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Niet per definitie. De kosten worden vooral bepaald door volume, detaillering, materialisatie en technische ambities. Moderne architectuur vraagt wel om precisie in details; als die zorgvuldigheid ontbreekt, gaat kwaliteit verloren.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Past een moderne villa bij elke kavel?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Niet altijd. Oriëntatie, privacy, bezonning, uitzicht en regels (welstand/bestemmingsplan) bepalen hoeveel openheid en helderheid haalbaar is. Een goed modern ontwerp is altijd plaatsgebonden en reageert op de kavel.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Wanneer is een moderne villa minder geschikt?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Als de kavel weinig ontwerpvrijheid biedt, de oriëntatie ongunstig is, het budget geen ruimte laat voor zorgvuldige detaillering, of welstand sterk stuurt op traditionele beeldtaal. In die gevallen is een andere architectuurtaal vaak logischer en sterker.",
                  },
                },
              ],
            },
          ],
        })}
      </Script>

      <ModerneVillaOntwerpClient />
    </>
  );
}
