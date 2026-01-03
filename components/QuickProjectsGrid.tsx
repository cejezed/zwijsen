
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../data/index';

interface QuickProjectsGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export const QuickProjectsGrid: React.FC<QuickProjectsGridProps> = ({ projects, onProjectClick }) => {
  // Take only first 4 projects
  const quickProjects = projects.slice(0, 4);

  return (
    <section className="relative bg-stone-50 py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Grid - 2x2 on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {quickProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onProjectClick(project)}
              className="group cursor-pointer"
            >
              {/* Image Card */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-500">
                <img
                  src={typeof project.image === 'string' ? project.image : project.image?.url || ''}
                  alt={typeof project.image === 'string' ? project.title : project.image?.alt || project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Tag */}
                {project.tag && (
                  <div className="absolute top-3 left-3 bg-amber-600 text-white px-3 py-1 rounded-full">
                    <span className="mono text-[9px] font-black uppercase tracking-wider">
                      {project.tag}
                    </span>
                  </div>
                )}

                {/* Content - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-sm md:text-base font-serif italic leading-tight mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/80 mono uppercase tracking-wider">
                    {project.location}
                  </p>

                  {/* Arrow - appears on hover */}
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight size={16} className="text-amber-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
