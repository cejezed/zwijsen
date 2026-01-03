'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProjectTemplate } from '../../../components';
import { PROJECTS_DETAIL } from '../../../data/projecten';
import { notFound } from 'next/navigation';

export function ProjectDetailClient({ slug }: { slug: string }) {
    const router = useRouter();
    const project = PROJECTS_DETAIL.find(p => p && p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <ProjectTemplate
            slug={slug}
            onClose={() => router.push('/portfolio')}
        />
    );
}
