import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectTemplate } from '../components';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) {
    navigate('/portfolio');
    return null;
  }

  return (
    <ProjectTemplate
      slug={slug}
      onClose={() => navigate('/portfolio')}
    />
  );
};
