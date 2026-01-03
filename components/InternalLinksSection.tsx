'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Home, Briefcase } from 'lucide-react';
import Link from 'next/link';

interface InternalLink {
  title: string;
  description: string;
  href: string;
  icon?: 'region' | 'service' | 'project';
}

interface InternalLinksSectionProps {
  title?: string;
  subtitle?: string;
  links: InternalLink[];
  variant?: 'default' | 'compact';
}

export const InternalLinksSection: React.FC<InternalLinksSectionProps> = ({
  title = 'Gerelateerde Pagina\'s',
  subtitle,
  links,
  variant = 'default',
}) => {
  const getIcon = (type?: string) => {
    const iconProps = { size: 20, className: 'text-amber-600' };
    switch (type) {
      case 'region':
        return <MapPin {...iconProps} />;
      case 'project':
        return <Briefcase {...iconProps} />;
      case 'service':
      default:
        return <Home {...iconProps} />;
    }
  };

  if (variant === 'compact') {
    return (
      <section className="py-12 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap gap-4">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-full hover:border-amber-600 hover:bg-amber-50 transition-all duration-300 group"
              >
                {getIcon(link.icon)}
                <span className="text-sm font-medium text-stone-700 group-hover:text-amber-700">
                  {link.title}
                </span>
                <ArrowRight size={14} className="text-stone-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-amber-600" />
            <span className="mono text-amber-700 text-[10px] font-black tracking-[0.6em] uppercase">
              Meer ontdekken
            </span>
            <div className="w-12 h-[1px] bg-amber-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif italic text-black mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={link.href}
                className="block h-full bg-white border border-stone-200 p-8 hover:border-amber-600 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    {getIcon(link.icon)}
                    <h3 className="text-xl font-serif italic text-black group-hover:text-amber-700 transition-colors">
                      {link.title}
                    </h3>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    {link.description}
                  </p>
                  <div className="flex items-center gap-2 text-amber-600 font-medium text-sm mono uppercase tracking-wider">
                    <span>Meer info</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
