import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProjectTemplate } from '../components';

export const ProjectDetail: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  if (!slug) {
    router.push('/portfolio');
    return null;
  }

  return (
    <ProjectTemplate
      slug={slug}
      onClose={() => router.push('/portfolio')}
    />
  );
};
