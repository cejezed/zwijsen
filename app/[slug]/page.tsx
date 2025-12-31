
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageConfig, BRAND_NAME, ADDRESS, PHONE_NUMBER, EMAIL } from '../../data/index';
import { RegioDetailClient } from './RegioDetailClient';

type RegioParams = { slug: string };
type RouteProps<T> = { params: Promise<T> };

export async function generateMetadata({ params }: RouteProps<RegioParams>): Promise<Metadata> {
    const slug = (await params)?.slug;

    if (!slug) {
        return { title: 'Not Found' };
    }

    const config = getPageConfig(slug);

    if (!config.regio?.name) {
        return { title: 'Not Found' };
    }

    return {
        title: config.seoTitle || `${config.regio.name} | ${BRAND_NAME}`,
        description: config.metaDescription,
        openGraph: {
            title: config.seoTitle || `${config.regio.name} | ${BRAND_NAME}`,
            description: config.metaDescription,
            type: 'website',
            images: config.heroSlides?.[0]?.url ? [`https://www.zwijsen.net${config.heroSlides[0].url}`] : [],
        }
    };
}

export default async function Page({ params }: RouteProps<RegioParams>) {
    const slug = (await params)?.slug;

    if (!slug) {
        notFound();
    }

    const config = getPageConfig(slug);

    if (!config.regio?.name) {
        notFound();
    }

    // Schema.org generation
    const currentUrl = `https://www.zwijsen.net/${slug}`;

    const areaServed: any[] = [
        {
            "@type": "City",
            "name": config.regio?.name
        }
    ];

    if (config.regio?.municipality) {
        areaServed.push({
            "@type": "AdministrativeArea",
            "name": config.regio.municipality
        });
    }
    if (config.regio?.province) {
        areaServed.push({
            "@type": "AdministrativeArea",
            "name": config.regio.province
        });
    }

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": ["Architect", "LocalBusiness", "ProfessionalService"],
        "@id": "https://www.zwijsen.net/#architect",
        "name": BRAND_NAME,
        "description": config.metaDescription || `Architect in ${config.regio?.name} voor nieuwbouw, verbouw en verduurzaming`,
        "url": currentUrl,
        "image": config.ogImage || (config.heroSlides?.[0]?.url ? `https://www.zwijsen.net${config.heroSlides[0].url}` : "https://www.zwijsen.net/images/logo.png"),
        "logo": "https://www.zwijsen.net/images/logo.png",
        "telephone": PHONE_NUMBER,
        "email": EMAIL,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": ADDRESS.street,
            "addressLocality": ADDRESS.city.split(' ').slice(1).join(' '),
            "postalCode": ADDRESS.city.split(' ')[0],
            "addressCountry": "NL"
        },
        "geo": config.regio?.geo?.coordinates ? {
            "@type": "GeoCoordinates",
            "latitude": config.regio.geo.coordinates.latitude,
            "longitude": config.regio.geo.coordinates.longitude
        } : undefined,
        "areaServed": areaServed,
        "priceRange": "€€€",
        "openingHours": "Mo-Fr 09:00-17:00",
        "founder": {
            "@type": "Person",
            "name": "Jules Zwijsen"
        },
        "sameAs": [
            "https://www.linkedin.com/company/architectenbureau-jules-zwijsen"
        ]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": config.breadcrumbs?.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.label,
            "item": crumb.href.startsWith('http') ? crumb.href : `https://www.zwijsen.net${crumb.href}`
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <RegioDetailClient slug={slug} config={config} />
        </>
    );
}
