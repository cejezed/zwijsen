
import { notFound } from 'next/navigation';
import { PROJECTS_DETAIL } from '../../../data/projecten';
import { ProjectClientWrapper } from './ProjectClientWrapper';

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

    const project = PROJECTS_DETAIL.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: 'Project Niet Gevonden | Architectenbureau Jules Zwijsen',
        };
    }

    const seo = 'seo' in project ? project.seo : undefined;
    const subtitle = 'subtitle' in project ? project.subtitle : ('description' in project ? project.description : '');
    const locationLabel = 'locationLabel' in project ? project.locationLabel : ('location' in project ? project.location : '');

    return {
        title: `${project.title} | Jules Zwijsen`,
        description: seo?.description || subtitle || `Bekijk ons project ${project.title} in ${locationLabel}.`,
    };
}

export default async function Page({ params }: RouteProps<ProjectParams>) {
    const slug = (await params)?.slug;

    if (!slug) {
        notFound();
    }

    // Check of project bestaat, zo niet 404 handled by component or return notFound()
    // Maar component handled het misschien zelf.
    // Voor nu geven we de slug door.
    return <ProjectClientWrapper slug={slug} />;
}
