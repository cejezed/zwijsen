import type { Metadata } from "next";
import Script from "next/script";
import { NieuwbouwVillaClient } from "./NieuwbouwVillaClient";

const SITE_NAME = "Zwijsen.net";
const BASE_URL = "https://www.zwijsen.net";
const PAGE_PATH = "/nieuwbouw-villa";
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

// OG-afbeelding: public/images/villa/nieuwbouw-villa-og.jpg (1200x630)
const OG_IMAGE_URL = `${BASE_URL}/images/villa/nieuwbouw-villa-og.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title:
    "Nieuwbouw villa architect | Villa op maat, modern en tijdloos | Jules Zwijsen",
  description:
    "Architect voor nieuwbouw villa’s. Doordacht maatwerk, grip op kosten en begeleiding van schets tot realisatie. Vraag een gratis quickscan aan.",
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
    title:
      "Nieuwbouw villa architect | Doordacht maatwerk | Architect Jules Zwijsen",
    description:
      "Nieuwbouw villa laten ontwerpen door een architect? Ontwerp met rust in keuzes, grip op kosten en begeleiding tot en met de bouw.",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Nieuwbouw villa ontwerp door architect Jules Zwijsen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nieuwbouw villa architect | Jules Zwijsen",
    description:
      "Architect voor nieuwbouw villa’s met focus op maatwerk, kwaliteit en haalbaarheid.",
    images: [OG_IMAGE_URL],
  },
};

export default function NieuwbouwVillaPage() {
  return (
    <>
      {/* Structured data */}
      <Script id="schema-nieuwbouw-villa" type="application/ld+json">
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
              name: "Nieuwbouw villa architect",
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
                  name: "Nieuwbouw villa",
                  item: PAGE_URL,
                },
              ],
            },
            {
              "@type": "Service",
              "@id": `${PAGE_URL}#service`,
              name: "Nieuwbouw villa architect",
              description:
                "Architectonische begeleiding bij nieuwbouw villa’s: van Programma van Eisen en ontwerp tot vergunning en bouwbegeleiding.",
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
                  name: "Wat kost een nieuwbouw villa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "De kosten hangen sterk af van ontwerpkeuzes, materialisatie, technische ambities en de complexiteit van de kavel. Daarom sturen we al vroeg op haalbaarheid, zodat budget en verwachtingen realistisch blijven.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Wat is het verschil tussen een villa en een vrijstaande woning?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Een villa onderscheidt zich vooral door maatwerk: het ontwerp wordt volledig afgestemd op kavel, leefstijl en gebruik, in plaats van een standaard stramien.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Wanneer schakel je een architect in bij nieuwbouw villa’s?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Idealiter al vóór of direct na aankoop van een kavel, zodat indeling, kosten, regelgeving en haalbaarheid vanaf het begin goed worden afgestemd.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Begeleiden jullie ook het vergunningstraject en welstand?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Ja. We begeleiden het vergunningstraject en stemmen af met gemeente en adviseurs om vertraging en bijsturing te voorkomen.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Hoe maak je een nieuwbouw villa duurzaam en toekomstbestendig?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Door duurzaamheid vanaf het begin mee te nemen in oriëntatie, massa, schil, installaties en flexibiliteit van de plattegrond.",
                  },
                },
              ],
            },
          ],
        })}
      </Script>

      {/* Page content */}
      <NieuwbouwVillaClient />
    </>
  );
}
