'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProjectTemplate } from '../../../components';

export const ProjectClientWrapper = ({ slug }: { slug: string }) => {
    const router = useRouter();

    return (
        <ProjectTemplate
            slug={slug}
            onClose={() => router.push('/portfolio')}
        />
    );
};
