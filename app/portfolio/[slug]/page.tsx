
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { PROJECTS_DETAIL } from '../../../data/projecten';
import { generateProjectSchema, generateImageGallerySchema, generateBreadcrumbSchema } from '../../../data';
import { ProjectClientWrapper } from './ProjectClientWrapper';

const BASE_URL = 'https://www.zwijsen.net';

type ProjectParams = { slug: string };
type RouteProps<T> = { params: Promise<T> };

// Genereer metadata voor SEO
export async function generateMetadata({ params }: RouteProps<ProjectParams>) {
    const slug = (await params)?.slug;
    if (!slug) {
        return {
            title: 'Project Niet Gevonden | Architectenbureau Jules Zwijsen',
        };
    }

    const project = PROJECTS_DETAIL.find((p) => p && p.slug === slug);

    if (!project) {
        return {
            title: 'Project Niet Gevonden | Architectenbureau Jules Zwijsen',
        };
    }

    const seo = 'seo' in project ? project.seo : undefined;
    const subtitle = 'subtitle' in project ? project.subtitle : ('description' in project ? project.description : '');
    const locationLabel = 'locationLabel' in project ? project.locationLabel : ('location' in project ? project.location : '');
    const featuredImage = 'featuredImage' in project ? project.featuredImage : undefined;
    const ogImage = seo?.ogImage || featuredImage?.url;

    return {
        metadataBase: new URL(BASE_URL),
        title: seo?.title || `${project.title} | Jules Zwijsen`,
        description: seo?.description || subtitle || `Bekijk ons project ${project.title} in ${locationLabel}.`,
        alternates: {
            canonical: `/portfolio/${slug}`
        },
        keywords: seo?.keywords,
        openGraph: {
            type: 'website',
            url: `${BASE_URL}/portfolio/${slug}`,
            title: seo?.title || project.title,
            description: seo?.description || subtitle,
            images: ogImage ? [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: featuredImage?.alt || project.title
                }
            ] : []
        }
    };
}

export default async function Page({ params }: RouteProps<ProjectParams>) {
    const slug = (await params)?.slug;

    if (!slug) {
        notFound();
    }

    const project = PROJECTS_DETAIL.find((p) => p && p.slug === slug);

    if (!project) {
        notFound();
    }

    // Light projects (openMode: 'overlay') should only be viewed in overlay, not as standalone pages
    // Redirect to portfolio page if someone tries to access them directly
    if ('openMode' in project && project.openMode === 'overlay') {
        notFound();
    }

    // Extract project data
    const subtitle = 'subtitle' in project ? project.subtitle : ('description' in project ? project.description : '');
    const locationLabel = 'locationLabel' in project ? project.locationLabel?.replace('Locatie: ', '') : ('location' in project ? project.location : '');
    const seo = 'seo' in project ? project.seo : undefined;
    const heroImages = 'heroImages' in project ? project.heroImages || [] : [];
    const categories = 'categories' in project ? project.categories : [];
    const category = categories?.[0] || 'project';

    // Prepare images for schema
    const images = heroImages.map(img => ({
        url: img.url,
        alt: img.alt
    }));

    // Generate structured data
    const projectSchema = generateProjectSchema({
        projectTitle: project.title,
        projectSlug: slug,
        description: seo?.description || subtitle || '',
        location: locationLabel || '',
        images: images,
        keywords: seo?.keywords,
        category: category
    });

    const imageGallerySchema = images.length > 0 ? generateImageGallerySchema({
        projectTitle: project.title,
        projectSlug: slug,
        images: images
    }) : null;

    const breadcrumbSchema = generateBreadcrumbSchema([
        { label: 'Home', href: '/' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: project.title, href: `/portfolio/${slug}` }
    ]);

    return (
        <>
            <Script id="schema-project" type="application/ld+json">
                {JSON.stringify(projectSchema)}
            </Script>
            {imageGallerySchema && (
                <Script id="schema-gallery" type="application/ld+json">
                    {JSON.stringify(imageGallerySchema)}
                </Script>
            )}
            <Script id="schema-breadcrumb" type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </Script>
            <ProjectClientWrapper slug={slug} />
        </>
    );
}
