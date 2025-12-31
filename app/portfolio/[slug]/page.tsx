
import { PROJECTS_DETAIL } from '../../../data/projecten';
import { ProjectClientWrapper } from './ProjectClientWrapper';

// Genereer metadata voor SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const project = PROJECTS_DETAIL.find((p) => p.slug === params.slug);

    if (!project) {
        return {
            title: 'Project Niet Gevonden | Architectenbureau Jules Zwijsen',
        };
    }

    return {
        title: `${project.title} | Jules Zwijsen`,
        description: project.seo?.description || project.subtitle || `Bekijk ons project ${project.title} in ${project.locationLabel}.`,
    };
}

export default function Page({ params }: { params: { slug: string } }) {
    // Check of project bestaat, zo niet 404 handled by component or return notFound()
    // Maar component handled het misschien zelf. 
    // Voor nu geven we de slug door.
    return <ProjectClientWrapper slug={params.slug} />;
}
