
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
    getPageConfig,
    BRAND_NAME,
    generateLocalBusinessSchema,
    generateBreadcrumbSchema
} from '../../data/index';
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

    // Generate structured data using centralized utilities
    const localBusinessSchema = generateLocalBusinessSchema({
        regionName: config.regio?.name || '',
        regionSlug: slug,
        description: config.metaDescription || `Architect in ${config.regio?.name} voor nieuwbouw, verbouw en verduurzaming`,
        image: config.ogImage || (config.heroSlides?.[0]?.url ? `https://www.zwijsen.net${config.heroSlides[0].url}` : undefined),
        geo: config.regio?.geo?.coordinates,
        municipality: config.regio?.municipality,
        province: config.regio?.province
    });

    const breadcrumbSchema = generateBreadcrumbSchema(config.breadcrumbs || []);

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
