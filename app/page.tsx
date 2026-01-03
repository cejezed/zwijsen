import Script from 'next/script';
import { HomeClient } from './HomeClient';
import { getPageConfig, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, generateWebPageSchema } from '../data/index';

const BASE_URL = 'https://www.zwijsen.net';

export const metadata = {
    metadataBase: new URL(BASE_URL),
    title: 'Architectenbureau Jules Zwijsen | Van Binnen Naar Buiten',
    description: 'Architectenbureau Jules Zwijsen ontwerpt moderne, duurzame villa\'s en woningen. Van schets tot oplevering, volledig op maat.',
    alternates: {
        canonical: '/'
    },
    robots: {
        index: true,
        follow: true
    },
    openGraph: {
        type: 'website',
        url: BASE_URL,
        siteName: 'Zwijsen.net',
        title: 'Architectenbureau Jules Zwijsen | Van Binnen Naar Buiten',
        description: 'Architectenbureau Jules Zwijsen ontwerpt moderne, duurzame villa\'s en woningen. Van schets tot oplevering, volledig op maat.',
        images: [
            {
                url: `${BASE_URL}/images/logo.png`,
                width: 1200,
                height: 630,
                alt: 'Architectenbureau Jules Zwijsen'
            }
        ]
    }
};

export default function Page() {
    const pageConfig = getPageConfig('default');

    // Homepage structured data with @graph
    const homepageSchema = {
        "@context": "https://schema.org",
        "@graph": [
            ORGANIZATION_SCHEMA,
            WEBSITE_SCHEMA,
            generateWebPageSchema({
                pageName: 'Architectenbureau Jules Zwijsen - Homepage',
                pageUrl: BASE_URL,
                description: 'Architectenbureau voor exclusieve villabouw, verbouw en landhuizen. Van schets tot oplevering met volledige bouwbegeleiding.',
                image: `${BASE_URL}/images/logo.png`
            })
        ]
    };

    return (
        <>
            <Script id="schema-homepage" type="application/ld+json">
                {JSON.stringify(homepageSchema)}
            </Script>
            <HomeClient initialConfig={pageConfig} />
        </>
    );
}
